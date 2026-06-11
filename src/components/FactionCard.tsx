import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { DIFFICULTY_LABELS, sigilLetter } from '../data/factions';
import type { Faction } from '../data/factions';
import { crtBoot, crtOff } from './crt';
import FactionImage from './FactionImage';

interface Props {
  faction: Faction;
  onSelect: (id: string) => void;
  shutdown: boolean;
  picked: boolean;
  locked: boolean;
}

export default function FactionCard({ faction, onSelect, shutdown, picked, locked }: Props) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      className="faction-card"
      style={{ '--accent': faction.color }}
      variants={{
        hidden: { opacity: 0 },
        // CRT power-on (the off sequence reversed) settling into the holo flicker;
        // random delay per card like the dashboard panels, 0.4s base so the hero lands first
        visible: reduceMotion ? { opacity: 1 } : () => crtBoot(0.4 + Math.random() * 0.45),
        off: () => crtOff(Math.random() * 0.12),
        picked: {
          scale: [1, 1.035, 1.02],
          filter: ['brightness(1)', 'brightness(1.7)', 'brightness(1.25)'],
          transition: { duration: 0.4, ease: 'easeOut' as const },
        },
      }}
      animate={shutdown && !reduceMotion ? 'off' : picked && !reduceMotion ? 'picked' : undefined}
      whileHover={locked ? undefined : { y: -8, transition: { duration: 0.2 } }}
      whileTap={locked ? undefined : { scale: 0.97 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => !locked && onSelect(faction.id)}
    >
      <div className="faction-img-wrap" aria-hidden="true">
        <FactionImage src={faction.image} className="faction-img" replayOn={hovered} />
      </div>
      <motion.div className="faction-sigil" layoutId={`sigil-${faction.id}`}>
        {sigilLetter(faction.name)}
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
