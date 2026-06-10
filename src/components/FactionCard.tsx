import { motion } from 'framer-motion';
import type { Faction } from '../data/factions';

const DIFFICULTY_LABELS = ['Beginner', 'Intermediate', 'Advanced'];

interface Props {
  faction: Faction;
  onSelect: (id: string) => void;
}

export default function FactionCard({ faction, onSelect }: Props) {
  return (
    <motion.button
      className="faction-card"
      style={{ '--accent': faction.color } as React.CSSProperties}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(faction.id)}
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
