import { motion, useReducedMotion } from 'framer-motion';
import { factions, sources } from '../data/factions';
import { crtBoot } from './crt';
import FactionCard from './FactionCard';

interface Props {
  pendingId: string | null;
  onPick: (id: string) => void;
}

export default function HomeView({ pendingId, onPick }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.main
      className={pendingId ? 'powering-down' : undefined}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.12 } }}
    >
      <motion.header
        className="hero"
        initial={{ opacity: 0 }}
        animate={reduceMotion ? { opacity: 1 } : crtBoot(0.05)}
      >
        <div className="hero-readouts" aria-hidden="true">
          <span>Landsraad War Archive</span>
          <span>
            <span className="hud-pulse" />
            Records 7 of 7 · Decrypted
          </span>
        </div>
        <p className="hero-kicker">Dune: Spice Wars</p>
        <h1>War Council Archives</h1>
        <p className="hero-subtitle">
          Every Great House schemes for the spice. Choose your banner and receive its
          battle doctrine: opening builds, research priorities, unit counters, and a plan
          for every rival in the war.
        </p>
      </motion.header>
      <motion.div className="faction-grid" initial="hidden" animate="visible">
        {factions.map((faction) => (
          <FactionCard
            key={faction.id}
            faction={faction}
            onSelect={onPick}
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
  );
}
