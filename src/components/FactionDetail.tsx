import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Faction } from '../data/factions';

const TABS = ['Overview', 'Mechanics', 'Military', 'Councilors', 'Game Plan', 'Victory'] as const;
type Tab = (typeof TABS)[number];

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0 },
};

interface Props {
  faction: Faction;
  onBack: () => void;
}

export default function FactionDetail({ faction, onBack }: Props) {
  const [tab, setTab] = useState<Tab>('Overview');

  return (
    <motion.section
      className="faction-detail"
      style={{ '--accent': faction.color } as React.CSSProperties}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="detail-banner">
        <button className="back-button" onClick={onBack}>
          ← All Factions
        </button>
        <motion.div className="faction-sigil large" layoutId={`sigil-${faction.id}`}>
          {faction.name.replace(/^(House |The )/, '').charAt(0)}
        </motion.div>
        <div className="detail-title">
          <h1>{faction.name}</h1>
          <p>
            {faction.archetype} · Led by {faction.leader}
          </p>
        </div>
      </header>

      <nav className="detail-tabs">
        {TABS.map((t) => (
          <button key={t} className={t === tab ? 'active' : ''} onClick={() => setTab(t)}>
            {t}
            {t === tab && <motion.span className="tab-underline" layoutId="tab-underline" />}
          </button>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          className="tab-content"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
        >
          {tab === 'Overview' && (
            <>
              <p className="overview-text">{faction.overview}</p>
              <motion.div className="two-column" variants={listVariants} initial="hidden" animate="visible">
                <div>
                  <h3>Strengths</h3>
                  <ul>
                    {faction.strengths.map((s) => (
                      <motion.li key={s} variants={itemVariants}>
                        {s}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Weaknesses</h3>
                  <ul className="weaknesses">
                    {faction.weaknesses.map((w) => (
                      <motion.li key={w} variants={itemVariants}>
                        {w}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </>
          )}

          {tab === 'Mechanics' && (
            <motion.div className="card-list" variants={listVariants} initial="hidden" animate="visible">
              {faction.mechanics.map((m) => (
                <motion.article key={m.name} className="info-card" variants={itemVariants}>
                  <h3>{m.name}</h3>
                  <p>{m.description}</p>
                </motion.article>
              ))}
            </motion.div>
          )}

          {tab === 'Military' && (
            <>
              <motion.div className="card-list units" variants={listVariants} initial="hidden" animate="visible">
                {faction.units.map((u) => (
                  <motion.article key={u.name} className="info-card" variants={itemVariants}>
                    <h3>{u.name}</h3>
                    <p>{u.role}</p>
                  </motion.article>
                ))}
              </motion.div>
              <h3 className="section-heading">Combat Doctrine</h3>
              <motion.ul className="tips-list" variants={listVariants} initial="hidden" animate="visible">
                {faction.combatTips.map((tip) => (
                  <motion.li key={tip} variants={itemVariants}>
                    {tip}
                  </motion.li>
                ))}
              </motion.ul>
            </>
          )}

          {tab === 'Councilors' && (
            <motion.div className="card-list" variants={listVariants} initial="hidden" animate="visible">
              {faction.councilors.map((c) => (
                <motion.article key={c.name} className="info-card" variants={itemVariants}>
                  <h3>{c.name}</h3>
                  <p>{c.effect}</p>
                </motion.article>
              ))}
            </motion.div>
          )}

          {tab === 'Game Plan' && (
            <motion.div className="card-list phases" variants={listVariants} initial="hidden" animate="visible">
              {(['early', 'mid', 'late'] as const).map((phase) => (
                <motion.article key={phase} className="info-card phase" variants={itemVariants}>
                  <h3>{phase === 'early' ? 'Early Game' : phase === 'mid' ? 'Mid Game' : 'Late Game'}</h3>
                  <p>{faction.gamePlan[phase]}</p>
                </motion.article>
              ))}
            </motion.div>
          )}

          {tab === 'Victory' && (
            <motion.div className="card-list" variants={listVariants} initial="hidden" animate="visible">
              {faction.victoryPaths.map((v) => (
                <motion.article
                  key={v.name}
                  className={`info-card victory ${v.recommended ? 'recommended' : ''}`}
                  variants={itemVariants}
                >
                  <h3>
                    {v.name}
                    {v.recommended && <span className="badge">Recommended</span>}
                  </h3>
                  <p>{v.note}</p>
                </motion.article>
              ))}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
