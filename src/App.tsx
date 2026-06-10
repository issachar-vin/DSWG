import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { factions, sources } from './data/factions';
import FactionCard from './components/FactionCard';
import FactionDetail from './components/FactionDetail';
import './App.css';

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = factions.find((f) => f.id === selectedId);

  return (
    <div className="app">
      <div className="dunes-backdrop" aria-hidden="true" />
      <AnimatePresence mode="wait">
        {selected ? (
          <FactionDetail key={selected.id} faction={selected} onBack={() => setSelectedId(null)} />
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
                Battle-tested strategies for all seven factions — mechanics, councilors,
                phase-by-phase game plans, and the victory paths that actually win.
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
    </div>
  );
}
