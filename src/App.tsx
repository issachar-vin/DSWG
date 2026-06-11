import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { factionById } from './data/factions';
import CockpitHud from './components/CockpitHud';
import FactionDetail from './components/FactionDetail';
import HomeView from './components/HomeView';
import SpaceBackdrop from './components/SpaceBackdrop';
import './App.css';

/** How long the CRT power-off sequence plays before the detail view commits. */
const SHUTDOWN_MS = 460;

const factionFromHash = () => {
  const id = window.location.hash.slice(1);
  return factionById.has(id) ? id : null;
};

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(factionFromHash);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const selected = selectedId ? factionById.get(selectedId) : undefined;
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
      <CockpitHud />
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
            <HomeView key="grid" pendingId={pendingId} onPick={pickFaction} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
