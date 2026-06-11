import { motion, useReducedMotion } from 'framer-motion';
import type { Faction } from '../data/factions';

const DIFFICULTY_LABELS = ['Beginner', 'Intermediate', 'Advanced'];

interface Props {
  faction: Faction;
  onSelect: (id: string) => void;
  shutdown: boolean;
  picked: boolean;
  locked: boolean;
}

export default function FactionCard({ faction, onSelect, shutdown, picked, locked }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      className="faction-card"
      style={{ '--accent': faction.color } as React.CSSProperties}
      variants={{
        hidden: { opacity: 0, y: 26 },
        visible: {
          opacity: reduceMotion ? 1 : [0, 0.9, 0.35, 1],
          y: 0,
          transition: { duration: 0.45 },
        },
        // CRT power-off: flash bright, collapse to a scanline, then to a dot
        off: () => ({
          scaleY: [1, 1.03, 0.012, 0.012],
          scaleX: [1, 1, 1, 0],
          opacity: [1, 1, 1, 0],
          filter: ['brightness(1)', 'brightness(2.2)', 'brightness(6)', 'brightness(0.5)'],
          transition: {
            duration: 0.3,
            delay: Math.random() * 0.12,
            times: [0, 0.25, 0.55, 1],
            ease: 'easeIn' as const,
          },
        }),
        picked: {
          scale: [1, 1.035, 1.02],
          filter: ['brightness(1)', 'brightness(1.7)', 'brightness(1.25)'],
          transition: { duration: 0.4, ease: 'easeOut' as const },
        },
      }}
      animate={shutdown && !reduceMotion ? 'off' : picked && !reduceMotion ? 'picked' : undefined}
      whileHover={locked ? undefined : { y: -8, transition: { duration: 0.2 } }}
      whileTap={locked ? undefined : { scale: 0.97 }}
      onClick={() => !locked && onSelect(faction.id)}
    >
      <motion.div className="faction-sigil" layoutId={`sigil-${faction.id}`}>
        {faction.name.replace(/^(House |The )/, '').charAt(0)}
      </motion.div>
      <h2>{faction.name}</h2>
      <p className="faction-archetype">{faction.archetype}</p>
      <p className="faction-tagline">“{faction.tagline}”</p>
      <div className="faction-difficulty">
        <span className="difficulty-pips">
          {[1, 2, 3].map((pip) => (
            <span key={pip} className={`pip ${pip <= faction.difficulty ? 'filled' : ''}`} />
          ))}
        </span>
        {DIFFICULTY_LABELS[faction.difficulty - 1]}
      </div>
    </motion.button>
  );
}
