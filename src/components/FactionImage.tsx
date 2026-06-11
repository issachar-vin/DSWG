import { useEffect, useRef } from 'react';
import { parseGIF, decompressFrame } from 'gifuct-js';
import type { ParsedFrame } from 'gifuct-js';

interface Props {
  src: string;
  className?: string;
}

type GifFrame = Parameters<typeof decompressFrame>[0];
type FrameMeta = Pick<ParsedFrame, 'dims' | 'disposalType'>;

// canvas.drawImage() on an animated GIF only ever yields the first frame (per HTML spec),
// and these GIFs loop forever (NETSCAPE loop count 0) — so playing once and freezing on the
// last frame requires decoding the frames ourselves. Frames are decompressed just-in-time
// during playback: decoding all upfront blocks the main thread for hundreds of ms per GIF
// (76 frames × 1920×1080 RGBA ≈ 600MB for atreides alone).
export default function FactionImage({ src, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isGif = src.endsWith('.gif');

  useEffect(() => {
    if (!isGif) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cancelled = false;
    let timer = 0;

    const gifCanvas = document.createElement('canvas');
    const gifCtx = gifCanvas.getContext('2d')!;
    const patchCanvas = document.createElement('canvas');
    const patchCtx = patchCanvas.getContext('2d')!;

    // Cover-fit, center-anchored: extreme aspect ratios (vernius is 2.8:1) would show only
    // an edge sliver if anchored right
    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const cw = Math.round(canvas.offsetWidth * dpr);
      const ch = Math.round(canvas.offsetHeight * dpr);
      if (!cw || !ch || !gifCanvas.width) return;
      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw;
        canvas.height = ch;
      }
      const scale = Math.max(cw / gifCanvas.width, ch / gifCanvas.height);
      const sw = gifCanvas.width * scale;
      const sh = gifCanvas.height * scale;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(gifCanvas, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
    };

    const resizeObserver = new ResizeObserver(draw);
    resizeObserver.observe(canvas);

    const compositeFrame = (frame: ParsedFrame, prev: FrameMeta | null) => {
      if (prev?.disposalType === 2) {
        gifCtx.clearRect(prev.dims.left, prev.dims.top, prev.dims.width, prev.dims.height);
      }
      const { dims } = frame;
      if (patchCanvas.width !== dims.width || patchCanvas.height !== dims.height) {
        patchCanvas.width = dims.width;
        patchCanvas.height = dims.height;
      }
      const imageData = patchCtx.createImageData(dims.width, dims.height);
      imageData.data.set(frame.patch);
      patchCtx.putImageData(imageData, 0, 0);
      gifCtx.drawImage(patchCanvas, dims.left, dims.top);
    };

    (async () => {
      const buf = await fetch(src).then((r) => r.arrayBuffer());
      if (cancelled) return;
      const gif = parseGIF(buf);
      const rawFrames = gif.frames.filter((f): f is GifFrame => 'image' in f);
      if (!rawFrames.length) return;

      gifCanvas.width = gif.lsd.width;
      gifCanvas.height = gif.lsd.height;

      let prev: FrameMeta | null = null;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Jump to the resting (last) frame; yield between chunks to keep the thread responsive
        for (let i = 0; i < rawFrames.length; i++) {
          if (cancelled) return;
          const frame = decompressFrame(rawFrames[i], gif.gct, true);
          compositeFrame(frame, prev);
          prev = { dims: frame.dims, disposalType: frame.disposalType };
          if (i % 8 === 7) await new Promise((r) => setTimeout(r));
        }
        draw();
        return;
      }

      let i = 0;
      const step = () => {
        if (cancelled) return;
        const frame = decompressFrame(rawFrames[i], gif.gct, true);
        compositeFrame(frame, prev);
        draw();
        prev = { dims: frame.dims, disposalType: frame.disposalType };
        i++;
        if (i < rawFrames.length) {
          // Browsers treat tiny GIF delays as 100ms; mirror that
          timer = window.setTimeout(step, frame.delay > 10 ? frame.delay : 100);
        }
      };
      step();
    })().catch(() => {});

    return () => {
      cancelled = true;
      clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [isGif, src]);

  if (!isGif) return <img src={src} alt="" className={className} />;
  return <canvas ref={canvasRef} className={className} />;
}
