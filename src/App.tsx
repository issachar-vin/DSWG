import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { factions, sources } from './data/factions';
import FactionCard from './components/FactionCard';
import FactionDetail from './components/FactionDetail';
import './App.css';

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = factions.find((f) => f.id === selectedId);
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const nx = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const ny = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY, reduceMotion]);

  const hubRotateY = useTransform(nx, [-0.5, 0.5], [-2.5, 2.5]);
  const hubRotateX = useTransform(ny, [-0.5, 0.5], [2, -2]);
  const farX = useTransform(nx, [-0.5, 0.5], [7, -7]);
  const farY = useTransform(ny, [-0.5, 0.5], [5, -5]);
  const midX = useTransform(nx, [-0.5, 0.5], [14, -14]);
  const midY = useTransform(ny, [-0.5, 0.5], [9, -9]);
  const nearX = useTransform(nx, [-0.5, 0.5], [22, -22]);
  const nearY = useTransform(ny, [-0.5, 0.5], [14, -14]);
  const skyX = useTransform(nx, [-0.5, 0.5], [32, -32]);
  const skyY = useTransform(ny, [-0.5, 0.5], [20, -20]);

  return (
    <div className="app">
      <div className="dunes-backdrop" aria-hidden="true">
        <motion.div className="stars stars-far" style={{ x: farX, y: farY }} />
        <motion.div className="stars stars-mid" style={{ x: midX, y: midY }} />
        <motion.div className="stars stars-near" style={{ x: nearX, y: nearY }} />
        <motion.div className="sky-bodies" style={{ x: skyX, y: skyY }}>
          <div className="planet-distant" />
          <div className="moon moon-first" />
          <div className="moon moon-second" />
        </motion.div>
        <div className="shooting-star" />
      </div>
      <motion.div
        className="hub"
        style={{ rotateX: hubRotateX, rotateY: hubRotateY, transformPerspective: 1400 }}
      >
        <AnimatePresence mode="wait">
          {selected ? (
            <FactionDetail
              key={selected.id}
              faction={selected}
              onBack={() => setSelectedId(null)}
              onSelect={setSelectedId}
            />
          ) : (
            <motion.main
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <header className="hero">
                <motion.p
                  className="hero-kicker"
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Dune: Spice Wars
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Faction Strategy Compendium
                </motion.h1>
                <motion.p
                  className="hero-subtitle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  Pick your faction for an in-game battle card: build orders, development
                  priorities, unit matchups, and a counter plan for every enemy on the map.
                </motion.p>
              </header>
              <motion.div
                className="faction-grid"
                variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } } }}
                initial="hidden"
                animate="visible"
              >
                {factions.map((faction) => (
                  <FactionCard key={faction.id} faction={faction} onSelect={setSelectedId} />
                ))}
              </motion.div>
              <footer className="sources">
                <h2>Sources</h2>
                <ul>
                  {sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noreferrer">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </footer>
            </motion.main>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
