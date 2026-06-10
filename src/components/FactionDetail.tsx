import { motion } from 'framer-motion';
import { factions, ROLE_LABELS } from '../data/factions';
import type { DevTree, Faction } from '../data/factions';
import HoverCard from './HoverCard';
import { AccentContext } from './accent';
import { RoleIcon } from './Icons';

const DIFFICULTY_LABELS = ['Beginner', 'Intermediate', 'Advanced'];

const TREE_LABELS: Record<DevTree, string> = {
  economy: 'Economy',
  military: 'Military',
  statecraft: 'Statecraft',
  expansion: 'Expansion',
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

const sigilLetter = (name: string) => name.replace(/^(House |The )/, '').charAt(0);

function Panel({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <motion.section className={`panel${className ? ` ${className}` : ''}`} variants={itemVariants}>
      <h2 className="panel-title">{title}</h2>
      {children}
    </motion.section>
  );
}

interface Props {
  faction: Faction;
  onBack: () => void;
}

export default function FactionDetail({ faction, onBack }: Props) {
  const enemies = faction.matchups.map((m) => ({
    matchup: m,
    enemy: factions.find((f) => f.id === m.enemyId)!,
  }));

  return (
    <AccentContext.Provider value={faction.color}>
      <motion.section
        className="faction-detail dashboard"
        style={{ '--accent': faction.color } as React.CSSProperties}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <header className="detail-banner dash-banner">
          <button className="back-button" onClick={onBack}>
            ← All Factions
          </button>
          <motion.div className="faction-sigil large" layoutId={`sigil-${faction.id}`}>
            {sigilLetter(faction.name)}
          </motion.div>
          <div className="detail-title">
            <h1>{faction.name}</h1>
            <p>
              {faction.archetype} · {faction.leader}
            </p>
            <div className="faction-difficulty">
              <span className="difficulty-pips">
                {[1, 2, 3].map((pip) => (
                  <span key={pip} className={`pip ${pip <= faction.difficulty ? 'filled' : ''}`} />
                ))}
              </span>
              {DIFFICULTY_LABELS[faction.difficulty - 1]}
            </div>
          </div>
          <div className="banner-side">
            <div className="victory-badges">
              {faction.victoryPaths.map((v) => (
                <HoverCard key={v.name} card={<p>{v.note}</p>} className="inline">
                  <span className={`victory-badge${v.recommended ? ' recommended' : ''}`}>
                    {v.recommended && <span className="star">★</span>}
                    {v.name}
                  </span>
                </HoverCard>
              ))}
            </div>
            <p className="banner-tagline">“{faction.tagline}”</p>
          </div>
          <div className="chip-rows">
            <div className="chip-row">
              {faction.mechanics.map((m) => (
                <HoverCard key={m.name} card={<p>{m.description}</p>} className="inline">
                  <span className="chip mechanic">{m.name}</span>
                </HoverCard>
              ))}
            </div>
            <div className="chip-row">
              {faction.strengths.map((s) => (
                <HoverCard key={s.label} card={<p>{s.detail}</p>} className="inline">
                  <span className="chip plus">+ {s.label}</span>
                </HoverCard>
              ))}
              {faction.weaknesses.map((w) => (
                <HoverCard key={w.label} card={<p>{w.detail}</p>} className="inline">
                  <span className="chip minus">− {w.label}</span>
                </HoverCard>
              ))}
            </div>
          </div>
        </header>

        <motion.div className="dash-grid" variants={listVariants} initial="hidden" animate="visible">
          <div className="dash-col">
            <Panel title="Opening Build Order">
              <ol className="step-list">
                {faction.buildOrder.map((step, i) => (
                  <li key={step.title}>
                    <HoverCard card={<p>{step.detail}</p>}>
                      <span className="step-num">{i + 1}</span>
                      <span className="step-title">{step.title}</span>
                    </HoverCard>
                  </li>
                ))}
              </ol>
            </Panel>

            <Panel title="Development Order">
              <ol className="step-list devs">
                {faction.devOrder.map((dev, i) => (
                  <li key={dev.name}>
                    <HoverCard
                      card={
                        <>
                          <p className="hover-kicker">{TREE_LABELS[dev.tree]} tree</p>
                          <p>{dev.why}</p>
                        </>
                      }
                    >
                      <span className="step-num">{i + 1}</span>
                      <span className={`tree-dot ${dev.tree}`} title={TREE_LABELS[dev.tree]} />
                      <span className="step-title">{dev.name}</span>
                    </HoverCard>
                  </li>
                ))}
              </ol>
              <div className="tree-legend">
                {(Object.keys(TREE_LABELS) as DevTree[]).map((tree) => (
                  <span key={tree}>
                    <span className={`tree-dot ${tree}`} /> {TREE_LABELS[tree]}
                  </span>
                ))}
              </div>
            </Panel>

            <Panel title="Combat Doctrine">
              <ul className="doctrine-list">
                {faction.combatTips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </Panel>
          </div>

          <div className="dash-col">
            <Panel title="Army">
              <div className="unit-list">
                {faction.units.map((u) => (
                  <HoverCard
                    key={u.name}
                    card={
                      <>
                        <p className="hover-kicker">
                          {ROLE_LABELS[u.role]}
                          {u.stats ? ` · ${u.stats}` : ''}
                        </p>
                        <p>{u.trait}</p>
                      </>
                    }
                  >
                    <div className="unit-row">
                      <RoleIcon role={u.role} />
                      <div className="unit-body">
                        <div className="unit-head">
                          <span className="unit-name">{u.name}</span>
                          <span className="unit-blurb">{u.blurb}</span>
                        </div>
                        <div className="unit-vs">
                          <span className="beats">▲ {u.beats}</span>
                          <span className="loses">▼ {u.losesTo}</span>
                        </div>
                      </div>
                    </div>
                  </HoverCard>
                ))}
              </div>
            </Panel>

            <Panel title="Build Together">
              <div className="combo-list">
                {faction.combos.map((combo) => (
                  <div key={combo.name} className="combo">
                    <span className="combo-name">{combo.name}</span>
                    <div className="combo-pieces">
                      {combo.pieces.map((piece, i) => (
                        <span key={piece}>
                          {i > 0 && <span className="combo-plus">+</span>}
                          <span className="chip piece">{piece}</span>
                        </span>
                      ))}
                    </div>
                    <p className="combo-payoff">{combo.payoff}</p>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Councilors">
              <div className="chip-row councilors">
                {faction.councilors.map((c) => (
                  <HoverCard key={c.name} card={<p>{c.effect}</p>} className="inline">
                    <span className={`chip councilor${c.pick ? ' pick' : ''}`}>
                      {c.pick && <span className="star">★</span>}
                      {c.name}
                    </span>
                  </HoverCard>
                ))}
              </div>
              <p className="panel-footnote">★ = recommended council picks</p>
            </Panel>
          </div>

          <div className="dash-col">
            <Panel title="Enemy Playbook" className="enemies">
              {enemies.map(({ matchup, enemy }) => (
                <HoverCard
                  key={enemy.id}
                  card={
                    <>
                      <p className="hover-kicker">vs {enemy.name}</p>
                      <p>
                        <strong>Expect:</strong> {matchup.expect}
                      </p>
                      <p>
                        <strong>Counter:</strong> {matchup.counter}
                      </p>
                    </>
                  }
                >
                  <div className="enemy-row" style={{ '--enemy': enemy.color } as React.CSSProperties}>
                    <span className="enemy-sigil">{sigilLetter(enemy.name)}</span>
                    <div className="enemy-body">
                      <span className="enemy-name">{enemy.name}</span>
                      <p className="enemy-line expect">
                        <span>Expect</span> {matchup.expect}
                      </p>
                      <p className="enemy-line counter">
                        <span>Counter</span> {matchup.counter}
                      </p>
                    </div>
                  </div>
                </HoverCard>
              ))}
            </Panel>
          </div>

          <Panel title="Game Plan" className="plan-strip">
            <div className="plan-phases">
              {(['early', 'mid', 'late'] as const).map((phase) => (
                <div key={phase} className="plan-phase">
                  <h3>{phase === 'early' ? 'Early' : phase === 'mid' ? 'Mid' : 'Late'}</h3>
                  <ul>
                    {faction.gamePlan[phase].map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Panel>
        </motion.div>
      </motion.section>
    </AccentContext.Provider>
  );
}
