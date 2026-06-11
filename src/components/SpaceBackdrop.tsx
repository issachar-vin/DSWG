import { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

const STAR_TINTS: [number, number, number][] = [
  [255, 255, 255],
  [255, 255, 255],
  [198, 218, 255],
  [255, 230, 200],
  [255, 204, 158],
];

interface Star {
  x: number;
  y: number;
  r: number;
  a: number;
  sp: number;
  ph: number;
  tint: [number, number, number];
}

function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const stars: Star[] = Array.from({ length: 480 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() ** 2.2 * 1.5 + 0.25,
      a: 0.25 + Math.random() * 0.75,
      sp: 0.4 + Math.random() * 1.8,
      ph: Math.random() * Math.PI * 2,
      tint: STAR_TINTS[Math.floor(Math.random() * STAR_TINTS.length)],
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        const drift = reduceMotion ? 0 : t * 0.0000035 * s.sp;
        const x = ((s.x + drift) % 1) * width;
        const y = s.y * height;
        const tw = reduceMotion ? 1 : 0.65 + 0.35 * Math.sin(t * 0.001 * s.sp + s.ph);
        const [r, g, b] = s.tint;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${(s.a * tw).toFixed(3)})`;
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.r > 1.25) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${(s.a * tw * 0.12).toFixed(3)})`;
          ctx.arc(x, y, s.r * 3.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [reduceMotion]);

  return <canvas ref={ref} className="starfield" />;
}

interface Props {
  nx: MotionValue<number>;
  ny: MotionValue<number>;
}

export default function SpaceBackdrop({ nx, ny }: Props) {
  const farX = useTransform(nx, [-0.5, 0.5], [6, -6]);
  const farY = useTransform(ny, [-0.5, 0.5], [4, -4]);
  const midX = useTransform(nx, [-0.5, 0.5], [14, -14]);
  const midY = useTransform(ny, [-0.5, 0.5], [9, -9]);
  const nearX = useTransform(nx, [-0.5, 0.5], [24, -24]);
  const nearY = useTransform(ny, [-0.5, 0.5], [15, -15]);

  return (
    <div className="space-backdrop" aria-hidden="true">
      <motion.div className="space-layer" style={{ x: farX, y: farY }}>
        <Starfield />
        <div className="nebula nebula-violet" />
        <div className="nebula nebula-teal" />
        <div className="nebula nebula-spice" />
        <div className="galaxy" />
      </motion.div>
      <motion.div className="space-layer" style={{ x: midX, y: midY }}>
        <div className="gas-giant" />
        <div className="moon-shard" />
        <div className="planet-arrakis" />
      </motion.div>
      <motion.div className="space-layer" style={{ x: nearX, y: nearY }}>
        <div className="ship ship-freighter" />
        <div className="ship ship-runner" />
        <div className="ship ship-skiff" />
        <div className="comet" />
      </motion.div>
    </div>
  );
}
