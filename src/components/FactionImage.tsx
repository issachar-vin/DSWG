import { useEffect, useRef } from 'react';
import { parseGIF, decompressFrame } from 'gifuct-js';
import type { ParsedFrame, ParsedGif } from 'gifuct-js';

interface Props {
  src: string;
  className?: string;
  /** While true, a finished GIF restarts; an in-flight one keeps playing untouched. */
  replayOn?: boolean;
}

type GifFrame = Parameters<typeof decompressFrame>[0];
type FrameMeta = Pick<ParsedFrame, 'dims' | 'disposalType'>;

/** GIF disposal type 2: restore the frame's region to background before the next frame. */
const DISPOSE_TO_BACKGROUND = 2;

/** Browsers render GIF delays of ≤10ms as 100ms; mirror that. */
const frameDelay = (frame: ParsedFrame) => (frame.delay > 10 ? frame.delay : 100);

async function fetchGif(src: string, signal: AbortSignal): Promise<ParsedGif | null> {
  const res = await fetch(src, { signal });
  if (!res.ok) return null;
  return parseGIF(await res.arrayBuffer());
}

/**
 * Composites GIF frames one at a time onto a native-size canvas and mirrors it onto the
 * display canvas with cover-fit. Frames are decompressed just-in-time: decoding a whole
 * GIF upfront blocks the main thread for hundreds of ms (76 frames × 1920×1080 RGBA
 * ≈ 600MB for the largest asset).
 */
class GifPlayer {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly gifCanvas = document.createElement('canvas');
  private readonly gifCtx = this.gifCanvas.getContext('2d')!;
  private readonly patchCanvas = document.createElement('canvas');
  private readonly patchCtx = this.patchCanvas.getContext('2d')!;
  private prevFrame: FrameMeta | null = null;
  private timer = 0;
  private stopped = false;
  private playing = false;
  private gif: ParsedGif | null = null;
  private frames: GifFrame[] = [];

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  /** Redraws the current composited frame; safe to call any time (e.g. on resize). */
  readonly draw = () => {
    const { canvas, ctx, gifCanvas } = this;
    const dpr = window.devicePixelRatio || 1;
    const cw = Math.round(canvas.offsetWidth * dpr);
    const ch = Math.round(canvas.offsetHeight * dpr);
    if (!cw || !ch || !gifCanvas.width) return;
    if (canvas.width !== cw || canvas.height !== ch) {
      canvas.width = cw;
      canvas.height = ch;
    }
    // Cover-fit, center-anchored: extreme aspect ratios (vernius is 2.8:1) would show
    // only an edge sliver if anchored to a side
    const scale = Math.max(cw / gifCanvas.width, ch / gifCanvas.height);
    const sw = gifCanvas.width * scale;
    const sh = gifCanvas.height * scale;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(gifCanvas, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
  };

  /** Plays all frames once, leaving the last frame on screen. */
  play(gif: ParsedGif) {
    const frames = gif.frames.filter((f): f is GifFrame => 'image' in f);
    if (!frames.length) return;

    this.gif = gif;
    this.frames = frames;
    this.gifCanvas.width = gif.lsd.width;
    this.gifCanvas.height = gif.lsd.height;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      void this.jumpToLastFrame(gif, frames);
      return;
    }

    this.run();
  }

  /** Restarts a finished run; does nothing while playback is still in flight. */
  replay() {
    if (this.playing || this.stopped || !this.gif) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.gifCtx.clearRect(0, 0, this.gifCanvas.width, this.gifCanvas.height);
    this.prevFrame = null;
    this.run();
  }

  stop() {
    this.stopped = true;
    clearTimeout(this.timer);
  }

  private run() {
    const { gif, frames } = this;
    if (!gif) return;
    this.playing = true;
    let i = 0;
    const step = () => {
      if (this.stopped) return;
      const frame = decompressFrame(frames[i], gif.gct, true);
      this.composite(frame);
      this.draw();
      i++;
      if (i < frames.length) {
        this.timer = window.setTimeout(step, frameDelay(frame));
      } else {
        this.playing = false;
      }
    };
    step();
  }

  /** Reduced motion: show the resting frame, yielding between chunks to avoid jank. */
  private async jumpToLastFrame(gif: ParsedGif, frames: GifFrame[]) {
    for (let i = 0; i < frames.length; i++) {
      if (this.stopped) return;
      this.composite(decompressFrame(frames[i], gif.gct, true));
      if (i % 8 === 7) await new Promise((r) => setTimeout(r));
    }
    this.draw();
  }

  private composite(frame: ParsedFrame) {
    const prev = this.prevFrame;
    if (prev?.disposalType === DISPOSE_TO_BACKGROUND) {
      this.gifCtx.clearRect(prev.dims.left, prev.dims.top, prev.dims.width, prev.dims.height);
    }
    const { dims } = frame;
    if (this.patchCanvas.width !== dims.width || this.patchCanvas.height !== dims.height) {
      this.patchCanvas.width = dims.width;
      this.patchCanvas.height = dims.height;
    }
    const imageData = this.patchCtx.createImageData(dims.width, dims.height);
    imageData.data.set(frame.patch);
    this.patchCtx.putImageData(imageData, 0, 0);
    this.gifCtx.drawImage(this.patchCanvas, dims.left, dims.top);
    this.prevFrame = { dims: frame.dims, disposalType: frame.disposalType };
  }
}

/**
 * Renders a faction background image. JPEG/PNG render as a plain <img>; GIFs are decoded
 * and played exactly once, freezing on the last frame — canvas.drawImage() only ever
 * yields a GIF's first frame (per HTML spec) and these GIFs loop infinitely, so the
 * browser's native playback can't be used.
 */
export default function FactionImage({ src, className, replayOn = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef<GifPlayer | null>(null);
  const isGif = src.endsWith('.gif');

  useEffect(() => {
    if (!isGif) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const player = new GifPlayer(canvas, ctx);
    playerRef.current = player;
    const controller = new AbortController();
    const resizeObserver = new ResizeObserver(player.draw);
    resizeObserver.observe(canvas);

    fetchGif(src, controller.signal)
      .then((gif) => {
        if (gif && !controller.signal.aborted) player.play(gif);
      })
      .catch(() => {}); // decorative art — a failed load just leaves the holo frame empty

    return () => {
      controller.abort();
      player.stop();
      resizeObserver.disconnect();
      playerRef.current = null;
    };
  }, [isGif, src]);

  useEffect(() => {
    if (replayOn) playerRef.current?.replay();
  }, [replayOn]);

  if (!isGif) return <img src={src} alt="" className={className} />;
  return <canvas ref={canvasRef} className={className} />;
}
