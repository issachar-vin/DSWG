import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { factions, sources } from './data/factions';
import FactionCard from './components/FactionCard';
import FactionDetail from './components/FactionDetail';
import SpaceBackdrop from './components/SpaceBackdrop';
import './App.css';

const SHUTDOWN_MS = 460;

const factionFromHash = () => {
  const id = window.location.hash.slice(1);
  return factions.some((f) => f.id === id) ? id : null;
};

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(factionFromHash);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const selected = factions.find((f) => f.id === selectedId);
  const reduceMotion = useReducedMotion();
  const shutdownTimer = useRef(0);

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

  useEffect(() => () => window.clearTimeout(shutdownTimer.current), []);

  // Browser back/forward: the hash is the source of truth for which view is shown
  useEffect(() => {
    const onHashChange = () => {
      window.clearTimeout(shutdownTimer.current);
      setPendingId(null);
      setSelectedId(factionFromHash());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Pushes a history entry; the hashchange listener syncs state
  const showFaction = (id: string) => {
    window.location.hash = id;
  };

  const goHome = () => {
    // pushState instead of clearing location.hash — avoids a dangling '#' in the URL
    history.pushState(null, '', window.location.pathname + window.location.search);
    setSelectedId(null);
  };

  const pickFaction = (id: string) => {
    if (pendingId) return;
    if (reduceMotion) {
      showFaction(id);
      return;
    }
    setPendingId(id);
    shutdownTimer.current = window.setTimeout(() => {
      showFaction(id);
      setPendingId(null);
    }, SHUTDOWN_MS);
  };

  return (
    <div className="app">
      <SpaceBackdrop nx={nx} ny={ny} />
      <div className="cockpit" aria-hidden="true">
        <div className="cockpit-vignette" />
        <div className="cockpit-scanlines" />
        <span className="hud-corner tl" />
        <span className="hud-corner tr" />
        <span className="hud-corner bl" />
        <span className="hud-corner br" />
        <div className="hud-readout top-left">GUILD NAVCOM · ARRAKIS ORBIT</div>
        <div className="hud-readout top-right">SIG ▮▮▮▮▯ · LINK STABLE</div>
        <div className="hud-readout bottom-left">
          <span className="hud-pulse" />
          SPICE FLOW NOMINAL
        </div>
        <div className="hud-readout bottom-right">CHOAM UPLINK 88.4%</div>
      </div>
      <div className="hub">
        <AnimatePresence mode="wait">
          {selected ? (
            <FactionDetail
              key={selected.id}
              faction={selected}
              onBack={goHome}
              onSelect={showFaction}
            />
          ) : (
            <motion.main
              key="grid"
              className={pendingId ? 'powering-down' : undefined}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
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
                  <FactionCard
                    key={faction.id}
                    faction={faction}
                    onSelect={pickFaction}
                    shutdown={pendingId !== null && pendingId !== faction.id}
                    picked={pendingId === faction.id}
                    locked={pendingId !== null}
                  />
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
      </div>
    </div>
  );
}
