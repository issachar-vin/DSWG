export interface Mechanic {
  name: string;
  description: string;
}

export type UnitRole = 'melee' | 'ranged' | 'stealth' | 'support' | 'siege' | 'elite';

export const ROLE_LABELS: Record<UnitRole, string> = {
  melee: 'Melee',
  ranged: 'Ranged',
  stealth: 'Stealth',
  support: 'Support',
  siege: 'Siege',
  elite: 'Elite',
};

export interface Unit {
  name: string;
  role: UnitRole;
  blurb: string;
  trait: string;
  beats: string;
  losesTo: string;
  stats?: string;
}

export interface BuildStep {
  title: string;
  detail: string;
}

export type DevTree = 'economy' | 'military' | 'statecraft' | 'expansion';

export interface DevStep {
  name: string;
  tree: DevTree;
  why: string;
  patentPlan?: {
    order: string[];
    byEnemy: { enemyId: string; picks: string }[];
  };
}

export interface BuildingCombo {
  name: string;
  pieces: string[];
  payoff: string;
}

export interface Councilor {
  name: string;
  effect: string;
  pick?: boolean;
}

export interface VictoryPath {
  name: string;
  recommended: boolean;
  note: string;
}

export interface Matchup {
  enemyId: string;
  expect: string;
  counter: string;
}

export interface Trait {
  label: string;
  detail: string;
}

export interface Faction {
  id: string;
  name: string;
  archetype: string;
  leader: string;
  color: string;
  image: string;
  difficulty: 1 | 2 | 3;
  tagline: string;
  overview: string;
  strengths: Trait[];
  weaknesses: Trait[];
  mechanics: Mechanic[];
  buildOrder: BuildStep[];
  devOrder: DevStep[];
  combos: BuildingCombo[];
  units: Unit[];
  combatTips: string[];
  councilors: Councilor[];
  gamePlan: { early: string[]; mid: string[]; late: string[] };
  victoryPaths: VictoryPath[];
  matchups: Matchup[];
}

export const DIFFICULTY_LABELS = ['Beginner', 'Intermediate', 'Advanced'] as const;

/** First letter of the faction's short name, used to render CSS sigils. */
export const sigilLetter = (name: string) => name.replace(/^(House |The )/, '').charAt(0);

export const factions: Faction[] = [
  {
    id: 'atreides',
    name: 'House Atreides',
    archetype: 'Diplomacy & Politics',
    leader: 'Duke Leto Atreides',
    color: '#4caf7d',
    image: '/faction_animations/atreides.gif',
    difficulty: 1,
    tagline: 'Win the war before a shot is fired.',
    overview:
      'The noble house of Caladan plays the long political game: peaceful village ' +
      'annexation, elevated Landsraad standing, and Charter bonuses that convert ' +
      'political dominance into economic power. The best faction for learning the game.',
    strengths: [
      {
        label: 'Peaceful annexation',
        detail:
          'Villages join willingly — no militia losses, no war declaration, no combat risk.',
      },
      {
        label: 'Landsraad power',
        detail:
          'Higher starting standing and outsized influence make Atreides the kingmaker of every session.',
      },
      {
        label: 'Charter economy at 5k',
        detail:
          'At 5,000 Hegemony, resource bonuses scale with every favorable Landsraad resolution in play.',
      },
      {
        label: 'Elite late defense',
        detail: 'Wardens and Heavy Weapon Squads form one of the hardest lines in the game to break.',
      },
      {
        label: 'Flexible win paths',
        detail: 'Viable on political, hegemony, and economic routes — pivot as the game demands.',
      },
    ],
    weaknesses: [
      {
        label: 'No pillaging',
        detail: 'Cannot pillage neutral villages, cutting off an early Solari income everyone else gets.',
      },
      {
        label: 'Average units',
        detail: 'Standard troops lack the raw power of Harkonnen or Fremen equivalents — win with synergy.',
      },
      {
        label: 'Slow expansion',
        detail: 'Peaceful annexation is slower and more Authority-hungry than conquest.',
      },
    ],
    mechanics: [
      {
        name: 'Peaceful Annexation',
        description:
          'Villages join the Duke willingly. Costs more Authority and takes time, but spends no ' +
          'militia and triggers no fight — expansion without attrition.',
      },
      {
        name: 'Landsraad Favor',
        description:
          'Elevated standing makes Atreides the kingmaker of every Landsraad session. Winning ' +
          'positive resolutions feeds directly into faction-wide production bonuses.',
      },
      {
        name: 'Hegemony Charter',
        description:
          'At 5,000 Hegemony, Atreides gains escalating resource bonuses based on how many ' +
          'favorable Landsraad resolutions are active — politics becomes economy.',
      },
    ],
    buildOrder: [
      {
        title: 'Council: Thufir Hawat + Duncan Idaho',
        detail:
          'Duncan cuts annexation Authority cost by 10% — your whole opening is annexation. ' +
          'Thufir compounds agent value. Swap Gurney in only if you expect early war.',
      },
      {
        title: 'Ornithopter scouts in a spiral',
        detail:
          'Mark spice, plascrete, and water villages plus your neighbors’ capitals. ' +
          'Atreides plans two annexations ahead — vision is the plan.',
      },
      {
        title: 'Train Trooper + Ranger',
        detail:
          'A token pair: they clear rebels and deter opportunists while annexation does the real work.',
      },
      {
        title: 'Annex the nearest spice village',
        detail:
          'Queue it immediately — annexation takes time, so the earlier it starts the earlier spice flows.',
      },
      {
        title: 'Refinery, harvester on Auto Recall',
        detail:
          'Spice pays the Imperial Tax and converts to Solari on the CHOAM market. Auto Recall ' +
          'saves the harvester from worm signs without babysitting.',
      },
      {
        title: 'Windtrap in the capital',
        detail:
          'Water gates expansion. Surplus water qualifies you for the Water Sellers Union ' +
          'charter: +2 Solari per surplus water per day.',
      },
      {
        title: 'Annex a plascrete village second',
        detail: 'Every building wants plascrete. A plascrete node village is the best second grab.',
      },
      {
        title: 'Influence before the first Landsraad',
        detail:
          'Get Influence production running before the first session — winning the first two ' +
          'resolutions snowballs standing for the rest of the game.',
      },
    ],
    devOrder: [
      {
        name: 'Composite Materials',
        tree: 'expansion',
        why: 'Cheaper buildings accelerate everything that follows — the standard universal opener.',
      },
      {
        name: 'Local Dialect Studies',
        tree: 'expansion',
        why: 'Opens the path to Local Hubs and smooths village relations for annexation.',
      },
      {
        name: 'Atreides Sympathizers',
        tree: 'statecraft',
        why: 'Faction-unique standing climb — your Landsraad edge is the whole strategy.',
      },
      {
        name: 'Water Sellers Contacts',
        tree: 'economy',
        why: 'Turns your Windtrap surplus into Solari and supports the Water Sellers Union charter.',
      },
      {
        name: 'Local Hubs',
        tree: 'expansion',
        why: '+0.2 Knowledge per village per day — a free research engine that scales with annexation.',
      },
      {
        name: 'Call to Arms',
        tree: 'military',
        why: '+10% Manpower and unlocks the elite tier for the late-game Warden wall.',
      },
    ],
    combos: [
      {
        name: 'Charter economy',
        pieces: ['Windtrap', 'Dew Collectors', 'Water Sellers Union charter'],
        payoff: 'Stacked water surplus becomes flat daily Solari — income with zero spice exposure.',
      },
      {
        name: 'Spice core',
        pieces: ['Refinery', 'Maintenance Center', 'Wholesale Market'],
        payoff:
          'Maintenance Center cuts regional Solari upkeep 25%, so the spice region runs nearly free.',
      },
      {
        name: 'Border bastion',
        pieces: ['Military Base', 'Recruitment Office'],
        payoff:
          '+20% unit power in the region and faster training, exactly where the Warden line will stand.',
      },
    ],
    units: [
      {
        name: 'Trooper',
        role: 'melee',
        blurb: 'Coordinated melee line',
        trait: 'Coordination — +10% Power for each nearby ally bonus in effect.',
        beats: 'Even frontline grinds once buffed',
        losesTo: 'Armor-shredding demolition fire',
        stats: 'Power 18 · Armor 5 · Melee',
      },
      {
        name: 'Ranger',
        role: 'ranged',
        blurb: 'Focus-fire ranged support',
        trait: 'Focus Fire — nearby allies gain +5% Power. Pinned (weaker) when caught in melee.',
        beats: 'Priority targets under concentrated fire',
        losesTo: 'Melee engages that pin it',
        stats: 'Power 15 · Armor 3 · Range 30',
      },
      {
        name: 'Support Drone',
        role: 'support',
        blurb: 'Healing aura, no worm aggro',
        trait: 'Medkits — nearby allies regenerate 20% health. Does not attract sandworms.',
        beats: 'Long attrition fights',
        losesTo: 'Burst damage before heals tick',
        stats: 'Power 8 · Armor 8 · Range 20',
      },
      {
        name: 'Heavy Weapons Squad',
        role: 'siege',
        blurb: 'Armor cracker',
        trait: 'Disruption stacks plus 30% armor destruction on hit. Pinned in melee.',
        beats: 'Armored elites — Sardaukar, Wardens, Knights',
        losesTo: 'Anything that reaches melee',
        stats: 'Power 7 · Armor 5 · Range 20',
      },
      {
        name: 'Warden',
        role: 'elite',
        blurb: 'Late-game wall',
        trait: 'Bulwark — nearby allies gain +2 Armor. The anchor of the defensive line.',
        beats: 'Sustained assaults on your territory',
        losesTo: 'Supply and poison attrition that ignores armor',
        stats: 'Power 18 · Armor 8 · Melee',
      },
    ],
    combatTips: [
      'Concentrate fire: Troopers and Rangers all target the same enemy unit — delete threats one at a time.',
      'Always bring a Support Drone; Atreides wins through sustain, not raw stats.',
      'Late game, Warden + Trooper + Heavy Weapons is nearly unbreakable on defense.',
      'Fight defensively while the political and economic engines win the game.',
    ],
    councilors: [
      {
        name: 'Thufir Hawat',
        effect: 'Agents gain extra traits; villages get +20% production while targeted by an operation.',
        pick: true,
      },
      {
        name: 'Duncan Idaho',
        effect: 'Boosts Sietch relations and reduces village annexation Authority cost by 10%.',
        pick: true,
      },
      {
        name: 'Lady Jessica',
        effect: 'Bene Gesserit influence accelerates diplomacy and Landsraad maneuvering.',
      },
      {
        name: 'Gurney Halleck',
        effect: 'Military councilor for players who want Atreides armies to hit harder.',
      },
    ],
    gamePlan: {
      early: [
        'Queue peaceful annexations on spice and water villages back to back',
        'Influence production online before the first Landsraad session',
        'Token Trooper/Ranger defense — nobody profits from attacking you yet',
      ],
      mid: [
        'Win every Landsraad session: buff your economy, hamstring your strongest rival',
        'Cross 5,000 Hegemony to switch on the Charter bonuses',
        'Start the Warden line if a neighbor looks hungry',
      ],
      late: [
        'Push the Governorship political victory or ride the charter economy to Hegemony',
        'Operations and counterintelligence protect the lead',
        'Fight only defensive battles — time is on your side',
      ],
    },
    victoryPaths: [
      {
        name: 'Political (Governorship)',
        recommended: true,
        note: 'The signature Atreides win — superior standing makes the Landsraad route fastest.',
      },
      {
        name: 'Hegemony',
        recommended: true,
        note: 'Charter bonuses snowball production into a reliable hegemony engine.',
      },
      {
        name: 'Domination',
        recommended: false,
        note: 'Possible with Wardens late, but you fight uphill against true military factions.',
      },
    ],
    matchups: [
      {
        enemyId: 'harkonnen',
        expect:
          'An early rush timed before your annexations finish, then permanent war — their wounded units hit harder the longer a fight drags.',
        counter:
          'Garrison border villages, field Trooper + Ranger + Support Drone early, and focus-fire wounded units down fast — never let a grind develop. Use the Landsraad to strip their standing and arm their rivals.',
      },
      {
        enemyId: 'fremen',
        expect:
          'Harvester raids out of deep desert you cannot chase, and a quiet Hegemony snowball from Sietch alliances.',
        counter:
          'Harvesters on Auto Recall, Rangers stationed at spice fields, and win the political game they cannot contest — resolutions that tax their lean economy hurt them most.',
      },
      {
        enemyId: 'smugglers',
        expect:
          'Underworld HQs siphoning your fat peaceful economy and bounties flipping resolutions you needed.',
        counter:
          'Keep agents on counterintelligence from mid-game, and out-spend their bounties with raw standing — you vote harder than their money talks.',
      },
      {
        enemyId: 'corrino',
        expect:
          'A tall six-region economy racing you to CHOAM and Hegemony behind artillery chokepoints and an airlifted elite army.',
        counter:
          'Expand wider than they can punish and win resolutions that drain their Solari. Never assault their chokepoints — if war comes, force fights in open ground away from Airstrips.',
      },
      {
        enemyId: 'ecaz',
        expect:
          'Sanctuary rings locking away neutral villages you wanted, plus a genuine rival in the standing race.',
        counter:
          'Annex contested neutral villages before rings close — denying one bordering region stops a Sanctuary forever. In the Landsraad you still outvote them; make standing the battlefield.',
      },
      {
        enemyId: 'vernius',
        expect:
          'A tech sprint to 10,000 Hegemony, then obfuscation nullifying the development your plan leans on.',
        counter:
          'Slow their Hegemony with Landsraad penalties and contest neutral spice their drones harvest. Spread your power across charters and resolutions — obfuscation can only hit developments.',
      },
    ],
  },
  {
    id: 'harkonnen',
    name: 'House Harkonnen',
    archetype: 'Military & Oppression',
    leader: 'Baron Vladimir Harkonnen',
    color: '#e0452f',
    image: '/faction_animations/harkonnen.gif',
    difficulty: 1,
    tagline: 'Fear is a resource. Spend it freely.',
    overview:
      'Giedi Prime rules through terror: the strongest standard military in the game, ' +
      'casualties as fuel, and Oppression squeezing burst production out of villages. ' +
      'Troops get stronger as they get hurt. Point them at a capital and push.',
    strengths: [
      {
        label: 'Strongest standard army',
        detail: 'The best baseline military units in the game — fair fights favor you.',
      },
      {
        label: 'Stronger when wounded',
        detail: 'Berserkers: troops gain power as health drops. A bleeding army hits hardest.',
      },
      {
        label: 'Oppression bursts',
        detail: 'Crack down on a village to spike its resource output on demand.',
      },
      {
        label: 'Militia economy',
        detail: '+5% village resource production per active militia stationed in it.',
      },
      {
        label: 'Hegemony power spike',
        detail: '+10% unit power at 5,000 Hegemony while villages are under Oppression.',
      },
    ],
    weaknesses: [
      {
        label: '-10% production start',
        detail: 'A flat early economy penalty — offset it with militia, pillaging, and Oppression.',
      },
      {
        label: 'Rebellion risk',
        detail: 'Careless Oppression breeds rebellions that cost more than the burst gained.',
      },
      {
        label: 'No political game',
        detail: 'Weak diplomatic position; the Landsraad route is mostly closed.',
      },
    ],
    mechanics: [
      {
        name: 'Oppression',
        description:
          'Crack down on a village to spike its resource production for a time. Manage the ' +
          'rebellion risk and the Baron extracts more from less territory than anyone.',
      },
      {
        name: 'Pain Tolerance',
        description:
          'Harkonnen units gain combat bonuses the lower their health gets. A bleeding army is ' +
          'more dangerous than a fresh one — never retreat at half health.',
      },
      {
        name: 'Combat Drugs Operation',
        description:
          'Transforms wounded soldiers into monstrous berserkers. Time it as your line starts ' +
          'taking damage to turn a grinding fight into a rout.',
      },
    ],
    buildOrder: [
      {
        title: 'Council: Iakin Nefud + Feyd-Rautha',
        detail:
          'Nefud refunds 50% of every dead unit — he makes permanent war cheaper than peace. ' +
          'Feyd turns Oppression rebellions into Influence and corrupts resolutions.',
      },
      {
        title: 'Scout for victims, not just villages',
        detail:
          'Mark the nearest weak villages and your first target’s capital. The opening plan ' +
          'ends with someone else’s territory.',
      },
      {
        title: 'Train 2 Troopers + Gunner immediately',
        detail: 'Your army is your economy. Three units take any neutral village without losses.',
      },
      {
        title: 'Pillage, then capture the spice village',
        detail:
          'Pillage villages you do not intend to keep for instant Solari, then take the spice ' +
          'village by force — conquest is faster than anyone’s annexation.',
      },
      {
        title: 'Refinery + militia garrison',
        detail:
          'Harvester on Auto Recall. Stack militia in every village: +5% production each offsets ' +
          'the -10% faction penalty and defends for free.',
      },
      {
        title: 'Second village by day ~20',
        detail: 'Plascrete or water. Keep the army moving village to village — idle troops are wasted upkeep.',
      },
      {
        title: 'Oppress your best village',
        detail:
          'Burst output from your highest-production village. Watch rebellion risk — crushing one ' +
          'is fine (Feyd profits), losing the village is not.',
      },
      {
        title: 'Pick a war by day ~40',
        detail:
          'Military Base + Recruitment Office at the border, then march. With Nefud refunds, the ' +
          'army pays for itself in pillage and territory.',
      },
    ],
    devOrder: [
      {
        name: 'Composite Materials',
        tree: 'expansion',
        why: 'Cheaper buildings — the universal opener still applies to warmongers.',
      },
      {
        name: 'Local Dialect Studies',
        tree: 'expansion',
        why: 'Smooths early expansion and opens Local Hubs for knowledge later.',
      },
      {
        name: 'Instill Fear',
        tree: 'statecraft',
        why: 'Faction-unique: ready exactly when your starting Authority runs dry — keeps conquest rolling.',
      },
      {
        name: 'Call to Arms',
        tree: 'military',
        why: '+10% Manpower and the elite tier — Executioners feed on the corpse piles you create.',
      },
      {
        name: 'Gridex Plane',
        tree: 'economy',
        why: 'Extra harvester crew means more spice per trip — the war chest deepens.',
      },
      {
        name: 'Local Hubs',
        tree: 'expansion',
        why: 'Knowledge per village scales with your conquests — wide empires research fast.',
      },
    ],
    combos: [
      {
        name: 'Militia engine',
        pieces: ['Recruitment Office', 'Military Base', 'Militia garrisons'],
        payoff:
          'Cheap militia everywhere: +5% production per body, instant defense, and a power aura where it matters.',
      },
      {
        name: 'Tax the pain',
        pieces: ['Oppression', 'Feyd-Rautha', 'Instill Fear'],
        payoff: 'Rebellions become Influence and Authority instead of problems — oppress on cooldown.',
      },
      {
        name: 'Lean spice region',
        pieces: ['Refinery', 'Maintenance Center'],
        payoff: 'The 25% upkeep cut directly offsets the faction-wide production penalty.',
      },
    ],
    units: [
      {
        name: 'Trooper',
        role: 'melee',
        blurb: 'Berserker melee core',
        trait: 'Berserkers — up to +50% Power from missing health. Wounded means dangerous.',
        beats: 'Anything in a long grind',
        losesTo: 'Focus fire that deletes units before they ramp',
        stats: 'Power 19 · Armor 4 · Melee',
      },
      {
        name: 'Gunner',
        role: 'ranged',
        blurb: 'Anti-regen fire support',
        trait: 'Shrapnel — target regeneration cut 50%, plus 30% armor destruction. Pinned in melee.',
        beats: 'Regen units (Scavengers, drone-healed lines) and armor',
        losesTo: 'Melee engages that pin it',
        stats: 'Power 11 · Armor 3 · Range 20',
      },
      {
        name: 'Cerberus',
        role: 'melee',
        blurb: 'Death is a feature',
        trait: 'Last Stand — splits into 3 Unchained on death. Wasted damage for the enemy either way.',
        beats: 'Armies that overcommit damage into it',
        losesTo: 'Area damage that clears the splits',
        stats: 'Power 16 · Armor 2 · Melee',
      },
      {
        name: 'Stealth Probe',
        role: 'stealth',
        blurb: 'Sacrificial spotter',
        trait: 'Fight Analysis — allies gain +10% Power when the probe dies. Camouflaged while unseen.',
        beats: 'The vision game before the fight',
        losesTo: 'Detection — and that is fine, it pays on death',
        stats: 'Power 8 · Armor 2 · Range 20',
      },
      {
        name: 'Executioner',
        role: 'elite',
        blurb: 'Feeds on corpses',
        trait: 'Head Hunter — +3% Power and regen per nearby unit death, stacking to 10.',
        beats: 'Big messy battles — every death feeds it, yours or theirs',
        losesTo: 'Hit-and-run skirmishing that denies kills',
        stats: 'Power 18 · Armor 7 · Melee',
      },
    ],
    combatTips: [
      'Never pull wounded units back — low health means bonus damage. Push through.',
      'Fire Combat Drugs mid-fight, once units are damaged, for maximum berserker value.',
      'Casualties are acceptable: Nefud refunds half the cost of every unit that dies.',
      'Sacrificial plays are on the table — baiting a sandworm into both armies trades in your favor.',
    ],
    councilors: [
      {
        name: 'Iakin Nefud',
        effect: 'Refunds 50% of unit cost when units die — sustains permanent military pressure.',
        pick: true,
      },
      {
        name: 'Feyd-Rautha',
        effect: 'Corrupts Landsraad resolutions and gains Influence for killing rebels under Oppression.',
        pick: true,
      },
      {
        name: 'Piter De Vries',
        effect: 'Twisted Mentat who sharpens espionage and operations.',
      },
      {
        name: 'Glossu Rabban',
        effect: 'Pure military muscle for the all-in domination push.',
      },
    ],
    gamePlan: {
      early: [
        'Take villages by force, pillage the rest — offset the production penalty with militia and Oppression',
        'Three-unit army from minute one; pick your first victim while others build',
        'Instill Fear ready when starting Authority runs out',
      ],
      mid: [
        'Permanent war: with Nefud refunds, fighting is cheaper than peace',
        'Oppress aggressively past 5,000 Hegemony for the +10% power spike',
        'Crush rebellions for Feyd-Rautha influence',
      ],
      late: [
        'March on capitals — Combat Drugs plus berserker bonuses break any line',
        'Eliminate rivals one at a time before their economic or political clocks run out',
        'Keep Gunners in the stack for enemy elites and walls',
      ],
    },
    victoryPaths: [
      {
        name: 'Domination',
        recommended: true,
        note: 'The Harkonnen way — the strongest army on Arrakis exists to be used.',
      },
      {
        name: 'Hegemony',
        recommended: false,
        note: 'Achievable through conquest and Oppression spikes, but slower than just winning the war.',
      },
      {
        name: 'Political',
        recommended: false,
        note: 'Only via Feyd-Rautha resolution corruption — a gimmick, not a plan.',
      },
    ],
    matchups: [
      {
        enemyId: 'atreides',
        expect:
          'Landsraad resolutions stripping your standing and buffing their economy, then a Warden wall if you wait too long.',
        counter:
          'Hit before the wall exists — your day-30 army beats their day-60 politics. Bring Gunners to crack Warden armor and let Feyd corrupt the worst resolutions.',
      },
      {
        enemyId: 'fremen',
        expect:
          'Raids that dissolve into desert you cannot chase, against a melee line tougher than yours unit for unit.',
        counter:
          'Do not chase — park the army on their villages and make them come to you. Focus-fire Warriors down before Sand Tactics math wins; never fight at low supply in deep desert.',
      },
      {
        enemyId: 'smugglers',
        expect:
          'Underworld HQs leeching your villages while Snipers pick at your stacks from stealth.',
        counter:
          'Your units dying is fine; your economy bleeding is not. Keep counterintelligence up, oppress to outrun the siphon, and rush them early — pre-mercenary Smugglers have the weakest army in the game.',
      },
      {
        enemyId: 'corrino',
        expect:
          'A turtle behind cliff artillery racing economy while you waste Troopers on chokepoints.',
        counter:
          'Never break a choke head-on — raid outlying regions to force Airstrip responses, then swarm the small elite force in the open. They cannot replace Sardaukar the way you replace Troopers.',
      },
      {
        enemyId: 'ecaz',
        expect:
          'Sanctuary rings you legally cannot attack and a 100-standing fine if you smash a Masterpiece.',
        counter:
          'Take ring-completing regions before circles close — one bordering region denies the Sanctuary. Eat the Masterpiece standing hit only if its bonus is winning them the game; you were not winning the Landsraad anyway.',
      },
      {
        enemyId: 'vernius',
        expect:
          'A drone economy you cannot starve and a tech curve that flips the late game against you.',
        counter:
          'Cut the Network — take or raid Neural Node regions and their army fights untethered and weak. Punish before 5,000 Hegemony: pre-patent Vernius is the softest military target on the map.',
      },
    ],
  },
  {
    id: 'fremen',
    name: 'The Fremen',
    archetype: 'Guerrilla & Desert Power',
    leader: 'Liet-Kynes',
    color: '#4f9ec4',
    image: '/faction_animations/fremen.gif',
    difficulty: 2,
    tagline: 'The desert is not your enemy. It is theirs.',
    overview:
      'The natives of Arrakis turn the planet into a weapon: armies that cross open desert ' +
      'without supply loss, spice fields that harvest themselves, and thumpers that call ' +
      'sandworms down on pursuers. Hit, vanish, repeat.',
    strengths: [
      {
        label: 'True desert mobility',
        detail: 'Units drain 30% less supply and far less water — attack from angles no one defends.',
      },
      {
        label: 'Toughest basic troops',
        detail: 'Warriors carry 50% more health than other factions’ basic line units.',
      },
      {
        label: 'Self-harvesting spice',
        detail: 'Spice fields collect on their own — no harvester to raid, no refinery required.',
      },
      {
        label: 'Direct Sietch alliances',
        detail: 'Befriend Sietches without agents; each alliance feeds Hegemony and opens the deep desert.',
      },
      {
        label: 'Hegemony scaling',
        detail: 'Unit power scales with Hegemony past 10,000 — the army grows with the empire.',
      },
    ],
    weaknesses: [
      {
        label: 'No Landsraad presence',
        detail: 'Minimal influence — the political game costs real effort better spent elsewhere.',
      },
      {
        label: 'No airfields',
        detail: 'Logistics run on legs and worms; no conventional air redeployment.',
      },
      {
        label: 'Lean early economy',
        detail: 'Over-expansion without water planning stalls the start.',
      },
    ],
    mechanics: [
      {
        name: 'Desert Power',
        description:
          'Fremen traverse deep desert with minimal supply drain. Attack from angles no one ' +
          'defends, retreat through terrain no one can follow, and pick every engagement.',
      },
      {
        name: 'Thumpers & Sandworms',
        description:
          'Summon sandworms with thumpers to ride across the map or to devastate a region. ' +
          'Worm-riding replaces airfields as strategic mobility.',
      },
      {
        name: 'Sietch Alliances',
        description:
          'Befriend hidden Sietch communities without agents. Each alliance feeds Hegemony and ' +
          'unlocks the deep desert as friendly territory.',
      },
    ],
    buildOrder: [
      {
        title: 'Council: Stilgar + Otheym',
        detail:
          'Stilgar reveals Sietches on village conquest and adds Authority per spice field. ' +
          'Otheym’s +10% speed makes the raiding game untouchable.',
      },
      {
        title: 'Scout wide, immediately',
        detail:
          'Mark Sietches plus spice, plascrete, fuel-cell, and water-well villages. Your cheap ' +
          'movement makes distant targets viable for everyone else’s prices.',
      },
      {
        title: 'Two Warriors, take the first village',
        detail: 'Warrior health wins early fights other factions avoid. Spice village first.',
      },
      {
        title: 'No refinery needed — build water instead',
        detail:
          'Your spice harvests itself. Spend the early plascrete on Windtraps and water — water ' +
          'is the real Fremen expansion ceiling.',
      },
      {
        title: 'Ally the first Sietch ASAP',
        detail: 'Hegemony, deep-desert access, and Fremen recruits. Every Sietch compounds.',
      },
      {
        title: 'Expand faster than anyone',
        detail:
          'Plascrete and fuel-cell villages next. Your units cost less to move — out-claim the map.',
      },
      {
        title: 'Plascrete Factory + forward Military Base',
        detail: 'Sustainable growth plus a power aura near the contested zone you plan to raid from.',
      },
      {
        title: 'Start raiding by day ~40',
        detail:
          'Hit harvesters and weak villages, then dissolve into the desert before the counterattack lands.',
      },
    ],
    devOrder: [
      {
        name: 'Survival Training',
        tree: 'expansion',
        why: 'Even less supply drain — your mobility edge becomes absolute.',
      },
      {
        name: 'Composite Materials',
        tree: 'expansion',
        why: 'Cheaper buildings for a faction that starts plascrete-poor.',
      },
      {
        name: 'Water Sellers Contacts',
        tree: 'economy',
        why: 'Water is your bottleneck — this dev plus Windtraps unblocks expansion.',
      },
      {
        name: 'Local Dialect Studies',
        tree: 'expansion',
        why: 'Path to Local Hubs; village relations help the wide game.',
      },
      {
        name: 'Call to Arms',
        tree: 'military',
        why: 'Unlocks Fedaykin — the rearguard that makes every retreat a trap.',
      },
      {
        name: 'Local Hubs',
        tree: 'expansion',
        why: 'Knowledge per village — and you will have more villages than anyone.',
      },
    ],
    combos: [
      {
        name: 'Water engine',
        pieces: ['Windtrap', 'Dew Collectors', 'Water Sellers Contacts'],
        payoff: 'Breaks the water ceiling that gates Fremen expansion — then surplus becomes Solari.',
      },
      {
        name: 'Sietch web',
        pieces: ['Sietch alliances', 'Stilgar', 'Deep desert routes'],
        payoff:
          'Each alliance adds Hegemony and friendly desert — the map shrinks for you and grows for everyone else.',
      },
      {
        name: 'Wide empire upkeep',
        pieces: ['Plascrete Factory', 'Maintenance Center'],
        payoff: 'Cheap construction and reduced upkeep keep a sprawling village network profitable.',
      },
    ],
    units: [
      {
        name: 'Warrior',
        role: 'melee',
        blurb: 'Toughest line on Arrakis',
        trait: 'Sand Tactics — enemies fighting it suffer -15% Power (Disoriented). +50% health vs peers.',
        beats: 'Melee grinds and holding ground',
        losesTo: 'Massed ranged kiting on open rock',
        stats: 'Power 18 · Armor 3 · Melee',
      },
      {
        name: 'Skirmisher',
        role: 'stealth',
        blurb: 'Stealth harassment',
        trait: 'Fremen Oppression — stacking +1 Power per target debuff (max 5), 30% armor destruction.',
        beats: 'Armored imperial elites, harvester escorts',
        losesTo: 'Getting caught by a real frontline',
        stats: 'Power 8 · Armor 2 · Range 20',
      },
      {
        name: 'Infiltrator',
        role: 'stealth',
        blurb: 'Backline assassin',
        trait: 'Weakness Revealed — first strike +40 damage and target takes +20% damage after.',
        beats: 'Enemy ranged backlines (they pin and panic)',
        losesTo: 'Detection and anything armored',
        stats: 'Power 20 · Armor 0 · Melee',
      },
      {
        name: 'Fedaykin',
        role: 'elite',
        blurb: 'Stronger outnumbered',
        trait: 'Against the Odds — +10% Power and +1 Armor per engaged enemy, stacking to 5.',
        beats: 'Being swarmed — rearguards and last stands',
        losesTo: 'Single duels where the bonus never stacks',
        stats: 'Power 20 · Armor 5 · Melee',
      },
      {
        name: 'Altar',
        role: 'siege',
        blurb: 'Siege artillery',
        trait: 'Siege Weapons — large area damage, 50% armor destruction, +100% vs flying.',
        beats: 'Clustered armies and fortified positions',
        losesTo: 'Fast flankers that reach it',
        stats: 'Power 22 · Armor 4 · Range 20',
      },
    ],
    combatTips: [
      'Lead with Warriors — their health pool wins melee grinds other factions must avoid.',
      'Sneak an Infiltrator into the backline and collapse their ranged units first.',
      'A single Fedaykin rearguard punches far above its weight when outnumbered.',
      'Fight in deep desert where enemy supply bleeds and yours barely moves.',
    ],
    councilors: [
      {
        name: 'Stilgar',
        effect: 'Village conquest reveals nearby Sietches; +1 Authority production per spice field.',
        pick: true,
      },
      {
        name: 'Otheym',
        effect: '+10% speed to all units; solo units gain +20% power and +2 armor.',
        pick: true,
      },
      {
        name: 'Mother Ramallo',
        effect: 'Strengthens Sietch relations for faster alliances and Hegemony.',
      },
      {
        name: 'Chani',
        effect: 'Sharpens guerrilla operations and raid efficiency.',
      },
    ],
    gamePlan: {
      early: [
        'Two-Warrior village grabs: spice, plascrete, fuel cells, water wells — in that order',
        'Survival Training → Composite Materials → Water Sellers Contacts',
        'Expand faster than anyone; your units are cheap to move',
      ],
      mid: [
        'Ally every Sietch you find — Hegemony plus friendly deep desert',
        'Raid harvesters and weak villages, vanish before the counterattack',
        'Plascrete Factories and a forward Military Base near contested zones',
      ],
      late: [
        'Past 10,000 Hegemony your units outscale everyone — push the advantage',
        'Snowball alliances and territory into the Hegemony win',
        'Or worm-ride armies straight onto capitals for Domination',
      ],
    },
    victoryPaths: [
      {
        name: 'Hegemony',
        recommended: true,
        note: 'Sietch alliances, auto-harvested spice, and wide expansion stack Hegemony fast.',
      },
      {
        name: 'Domination',
        recommended: true,
        note: 'Hegemony-scaled units plus worm mobility make late military pushes devastating.',
      },
      {
        name: 'Political',
        recommended: false,
        note: 'Your Landsraad presence is an afterthought — leave the voting to the Great Houses.',
      },
    ],
    matchups: [
      {
        enemyId: 'atreides',
        expect:
          'Peaceful annexation eating neutral villages fast, and a political race you cannot enter.',
        counter:
          'Out-grab them — two Warriors conquer faster than their Authority cooldowns annex. Raid their spice so the charter economy starves; the Landsraad cannot vote away 10,000-Hegemony units.',
      },
      {
        enemyId: 'harkonnen',
        expect:
          'An early rush at your villages and endless replacement armies that fight better wounded.',
        counter:
          'Fight where their supply bleeds: deep desert, your terrain. Focus-fire Troopers down before Berserker bonuses ramp, and thump a worm into their reinforcement line.',
      },
      {
        enemyId: 'smugglers',
        expect:
          'HQs in your villages and supply-poison Wreckers trying to win the attrition desert war you usually own.',
        counter:
          'You out-desert everyone including them — your supply discount beats their poison math. Sweep stealth with Ornithopters and raid the rich villages funding their network.',
      },
      {
        enemyId: 'corrino',
        expect:
          'A compact fortress economy with nothing exposed to raid, racing Hegemony tall against your wide.',
        counter:
          'Their wealth sits in six regions; yours is everywhere. Raid harvesters and anything outside the core, dodge the deathball with worm rides, and win the Hegemony race on breadth.',
      },
      {
        enemyId: 'ecaz',
        expect:
          'Rings closing around the same neutral villages you want — without ever declaring war on you.',
        counter:
          'Conquer ring-completing regions first; village conquest is cheap for you and Stilgar pays bonuses on it. Their truces are permanent for them only — truce when convenient, you alone can break it.',
      },
      {
        enemyId: 'vernius',
        expect:
          'Drones harvesting spice you considered yours, and tech scaling that races your Hegemony curve.',
        counter:
          'Their harvesters ignore worms but their Nodes do not ignore Warriors — cut tether regions and the drone army wilts. Past 10,000 Hegemony your scaling beats their tech.',
      },
    ],
  },
  {
    id: 'smugglers',
    name: 'The Smugglers',
    archetype: 'Economy & Subterfuge',
    leader: 'Esmar Tuek',
    color: '#e8923a',
    image: '/faction_animations/smuggler.gif',
    difficulty: 3,
    tagline: "Every faction on Arrakis works for you. They just don't know it.",
    overview:
      'Organized crime with a flag: Underworld Headquarters siphoning rival economies, ' +
      'Black Market spice at 4:1, and attrition units that punish low-supply enemies. ' +
      'A slow-burn faction that converts money and intelligence into victory.',
    strengths: [
      {
        label: 'Siphon rival economies',
        detail: 'Underworld HQs drain resources directly from enemy villages into your coffers.',
      },
      {
        label: 'Black Market 4:1',
        detail: 'Trade Solari for spice at a favorable ratio — cash covers the tax man.',
      },
      {
        label: 'Fast Hegemony',
        detail: 'Pillaging and infiltration both feed Hegemony rapidly.',
      },
      {
        label: 'Snipers',
        detail: 'High power, extreme range, and stealth — the best pick-off unit in the game.',
      },
      {
        label: 'Mercenaries at 10k',
        detail: 'An elite roster unlocked at 10,000 Hegemony, bought with the Solari you hoarded.',
      },
    ],
    weaknesses: [
      {
        label: 'Weakest fair fight',
        detail: 'Standard units lose straight battles — never take one.',
      },
      {
        label: 'Low starting standing',
        detail: 'The Landsraad starts cold to criminals.',
      },
      {
        label: 'Slow spin-up',
        detail: 'The engine needs infiltration and capital before it pays.',
      },
    ],
    mechanics: [
      {
        name: 'Underworld Headquarters',
        description:
          "Install hidden HQs in any faction's villages to drain their resources into your " +
          "coffers. Your rivals' growth literally funds yours.",
      },
      {
        name: 'Black Market & Contraband',
        description:
          'Convert Solari to spice at 4:1 and ride contraband events for bonus resources and ' +
          'Hegemony. Cash is your true resource; everything else is bought.',
      },
      {
        name: 'Bounties',
        description:
          "Place bounties on Landsraad resolutions and targets, weaponizing other factions' " +
          'ambitions without fielding an army.',
      },
    ],
    buildOrder: [
      {
        title: 'Council: Staban Tuek + Drisq',
        detail:
          'Staban pays per HQ and per HQ adjacency — he is the engine. Drisq’s Merchant ' +
          'agents add Solari to every infiltration.',
      },
      {
        title: 'Scout rich rivals, not just neutrals',
        detail:
          'Mark every fat rival village as a future HQ host and every disposable neutral as pillage income.',
      },
      {
        title: 'Pillage the first throwaway village',
        detail: 'Instant Solari and Hegemony. Keep only villages with resources you need.',
      },
      {
        title: 'Capture spice village + Refinery',
        detail: 'You still need a real spice base — the Black Market supplements, it does not replace.',
      },
      {
        title: 'Water and plascrete next',
        detail: 'Standard economy spine while the espionage engine spins up.',
      },
      {
        title: 'Agents into rival infrastructure',
        detail: 'Every infiltration pays Solari with Drisq and sets up HQ placement.',
      },
      {
        title: 'First Underworld HQ in the richest village',
        detail: 'Then cluster the next ones adjacent — Staban pays +5 Solari per neighboring HQ pair.',
      },
      {
        title: 'Black Market only on tax day',
        detail: 'Hold Solari; buy spice at 4:1 when the Imperial Tax bill lands, not before.',
      },
    ],
    devOrder: [
      {
        name: 'Composite Materials',
        tree: 'expansion',
        why: 'Cheaper buildings while the economy is still honest.',
      },
      {
        name: 'Local Dialect Studies',
        tree: 'expansion',
        why: 'Village relations and the Local Hubs path.',
      },
      {
        name: 'Sniper unlock',
        tree: 'military',
        why: 'Snipers are your defense, offense, and assassination program in one unit.',
      },
      {
        name: 'Intelligence Network → Spying Logistics',
        tree: 'statecraft',
        why: 'More agents, faster infiltration — the HQ network scales with espionage capacity.',
      },
      {
        name: 'Water Sellers Contacts',
        tree: 'economy',
        why: 'Another Solari stream for a faction that converts cash into everything.',
      },
      {
        name: 'Call to Arms',
        tree: 'military',
        why: 'Elite tier and Manpower for the mercenary endgame.',
      },
    ],
    combos: [
      {
        name: 'HQ cluster',
        pieces: ['Underworld HQs (adjacent)', 'Staban Tuek'],
        payoff: '+0.5 Influence per HQ and +5 Solari per adjacency — the network pays compound interest.',
      },
      {
        name: 'Tax-day arbitrage',
        pieces: ['Black Market', 'Solari reserves', 'Spice tax'],
        payoff: 'Never stockpile spice — hold cash and buy the tax bill at 4:1 when it lands.',
      },
      {
        name: 'Free money district',
        pieces: ['Wholesale Market', 'Maintenance Center'],
        payoff: 'Trickle Solari with near-zero upkeep in every village you actually keep.',
      },
    ],
    units: [
      {
        name: 'Scavenger',
        role: 'melee',
        blurb: 'Regenerating frontline',
        trait: 'Scavengers — +5% health regen per nearby death, stacking to 5. Wins long fights.',
        beats: 'Attrition wars nobody else can sustain',
        losesTo: 'Gunner shrapnel (-50% regen) and burst damage',
        stats: 'Power 17 · Armor 4 · Melee',
      },
      {
        name: 'Wrecker',
        role: 'ranged',
        blurb: 'Supply poisoner',
        trait: 'Chemical Weapons — poisons drain 20% supply, plus 30% armor destruction.',
        beats: 'Armor and anyone far from resupply',
        losesTo: 'Fast melee closing the gap',
        stats: 'Power 6 · Armor 2 · Range 20',
      },
      {
        name: 'Sniper',
        role: 'stealth',
        blurb: 'Stealth artillery',
        trait: 'Elimination Shots — +30% vs non-mechanical targets, range 50, stealthed. Pinned in melee.',
        beats: 'Infantry backlines — outranges everything in the game',
        losesTo: 'Detection, drones and mechs, melee engages',
        stats: 'Power 20 · Armor 2 · Range 50',
      },
      {
        name: 'Free Company',
        role: 'elite',
        blurb: 'Mercenary cleanup crew',
        trait: 'Sharpen Swords — up to +100% Power vs weakened targets. Stealthy and fast near combat.',
        beats: 'Wounded, retreating armies',
        losesTo: 'Fresh full-health deathballs',
        stats: 'Power 20 · Armor 5 · Melee',
      },
      {
        name: 'Wraith',
        role: 'support',
        blurb: 'Walking toxin aura',
        trait: 'Toxic Gases — nearby enemies lose 1% max health and supply per second.',
        beats: 'Clumped armies in long sieges',
        losesTo: 'Focus fire — it cannot fight back',
        stats: 'Power 0 · Armor 5 · Range 20',
      },
    ],
    combatTips: [
      "Never take a fair fight — you decide when battles happen, or they don't.",
      'Drag engagements into the desert: your units punish low-supply enemies.',
      'Scavenger regeneration wins wars of attrition that would break any other faction.',
      'At 10,000 Hegemony, buy the mercenary army your economy was always building toward.',
    ],
    councilors: [
      {
        name: 'Staban Tuek',
        effect: '+0.5 Influence per Underworld HQ; HQs produce +5 Solari when adjacent to other HQs.',
        pick: true,
      },
      {
        name: 'Drisq',
        effect: 'Agents gain the Merchant trait — more Solari from every infiltration.',
        pick: true,
      },
      {
        name: 'Lingar Bewt',
        effect: 'Water reserves reduce HQ installation and village annexation costs.',
      },
      {
        name: 'Bannerjee',
        effect: 'Improves pillaging rewards, adding Plascrete income to raids.',
      },
    ],
    gamePlan: {
      early: [
        'Pillage everything you will not keep; take spice and water villages',
        'Composite Materials and the Sniper unlock first',
        'Agents into rival infrastructure from minute one',
      ],
      mid: [
        'Blanket rival territory with clustered Underworld HQs',
        'Black Market the tax bill; work bounties instead of armies',
        'Let rival economies pay your bills',
      ],
      late: [
        'Poison reserves and timed ceasefires keep conquerors weak',
        'Buy the mercenary roster at 10,000 Hegemony',
        'Ride pillage-fueled Hegemony across the line before the network is untangled',
      ],
    },
    victoryPaths: [
      {
        name: 'Hegemony',
        recommended: true,
        note: 'Pillaging and infiltration mechanics feed Hegemony — this is the natural win.',
      },
      {
        name: 'Political',
        recommended: false,
        note: "Viable once Influence flows from HQ networks, but it's a backup plan.",
      },
      {
        name: 'Domination',
        recommended: false,
        note: 'Only late, with mercenaries, against already-bled opponents.',
      },
    ],
    matchups: [
      {
        enemyId: 'atreides',
        expect:
          'Peaceful annexation shrinking your pillage buffet, counterintelligence on your agents, and a standing race you start behind in.',
        counter:
          'Pillage fast before the neutrals disappear, then HQ their fat peaceful core — quiet empires are the best hosts. Buy resolutions with bounties instead of contesting standing directly.',
      },
      {
        enemyId: 'harkonnen',
        expect:
          'An early rush your roster cannot face in the open, and competition for every pillage target.',
        counter:
          'Pay for peace: ceasefires and bounties that point the Baron elsewhere. If war comes, keep range — Wreckers drain the supply their marches need and Snipers never let them close.',
      },
      {
        enemyId: 'fremen',
        expect:
          'Desert raids with mobility better than yours, and a lean economy that makes poor HQ hosts.',
        counter:
          'Siphon someone richer and bounty the Fremen instead. Garrison your harvesters, keep detection up against Skirmishers, and never chase them into deep desert.',
      },
      {
        enemyId: 'corrino',
        expect:
          'Six hyper-rich regions — the best HQ hosts on Arrakis — behind an elite army you must never fight.',
        counter:
          'Your dream matchup: blanket their tall regions with HQs and let the Emperor fund your Hegemony. Avoid the deathball entirely; you never needed their land, just their ledger.',
      },
      {
        enemyId: 'ecaz',
        expect:
          'Authority-rich expansion locking the map and Masterpiece money pooling in showcase villages.',
        counter:
          'Their permanent-truce rule is your shield — settle a truce early and operate in total safety. Then HQ the Garden Resort cluster where the Solari pools deepest.',
      },
      {
        enemyId: 'vernius',
        expect:
          'A knowledge economy with thin Solari villages early, drones on every spice field, and patents at 5,000 Hegemony.',
        counter:
          'Pillage and HQ the fuel-cell regions feeding the Network. Note: Snipers lose their +30% against drones — lean on Wrecker armor destruction when their army comes.',
      },
    ],
  },
  {
    id: 'corrino',
    name: 'House Corrino',
    archetype: 'Imperial Elite & Economy',
    leader: 'Emperor Shaddam IV',
    color: '#d9b54a',
    image: '/faction_animations/corrino.gif',
    difficulty: 3,
    tagline: 'Ten thousand years of rule. A few regions of sand.',
    overview:
      'The Imperial House plays tall, not wide: steep Authority penalties punish distant ' +
      'expansion, but every village gets an extra building slot. A compact empire of 6-7 ' +
      'hyper-optimized regions backed by a small, elite army that fights shoulder to shoulder.',
    strengths: [
      {
        label: 'Extra building slot',
        detail: 'Every village holds one more building than anyone else’s — unmatched per-region output.',
      },
      {
        label: 'Elite proximity bonuses',
        detail: 'Infantry gain power fighting near one another — one fist, not two hands.',
      },
      {
        label: 'Airstrip mobility',
        detail: 'The single army teleports anywhere it is needed, fast.',
      },
      {
        label: 'Imperial taxation',
        detail: 'Administration and tax extract a towering Solari economy from the spice trade.',
      },
      {
        label: 'Artillery chokepoints',
        detail: 'Artillery on cliffs and ridges holds passes almost indefinitely.',
      },
    ],
    weaknesses: [
      {
        label: 'Expansion penalties',
        detail: 'Severe Authority costs for anything far from the main base — stay compact.',
      },
      {
        label: 'Losses hurt',
        detail: 'A small elite army means every casualty matters more than for anyone else.',
      },
      {
        label: 'Conquest fights itself',
        detail: 'Military victory works against the faction’s own expansion limits.',
      },
    ],
    mechanics: [
      {
        name: 'Compact Empire',
        description:
          'Expansion beyond the core is punishingly expensive, but the bonus building slot per ' +
          "village means 6 Corrino regions out-produce 10 of anyone else's.",
      },
      {
        name: 'Imperial Administration',
        description:
          'Stack four same-colored buildings in a zone for a 10% production bonus. Zone ' +
          'specialization is the entire Corrino economy — plan every slot.',
      },
      {
        name: 'Imperial Taxation',
        description:
          "The Emperor's administration extracts wealth from the spice trade itself, compounding " +
          'the tall economy with every passing day.',
      },
    ],
    buildOrder: [
      {
        title: 'Council: Wensicia + Fendaric',
        detail:
          'Wensicia lets you double a building in a zone with no extra upkeep — the engine of the ' +
          'entire tall economy. Fendaric covers defense and exploration. Skip Aramsham.',
      },
      {
        title: 'Scout deliberately, choose 6-7 regions',
        detail:
          'Plascrete and Rare Elements first. Every region must justify its Authority cost ' +
          'forever — choose like an Emperor.',
      },
      {
        title: 'Spice village #1 + Refinery',
        detail: 'Harvester on Auto Recall — you cannot afford to lose it or replace armies escorting it.',
      },
      {
        title: 'Plan every slot before building',
        detail:
          'The extra slot per village rewards planning: map out the four-same-color stack for ' +
          'each zone before placing anything.',
      },
      {
        title: 'Adjacent villages only',
        detail: 'Distant grabs are Authority suicide. The empire is a tight cluster around the base.',
      },
      {
        title: 'Processing Plant on Rare Elements',
        detail: '+20 Solari production for the region — the cornerstone of the money district.',
      },
      {
        title: 'Four-color stacks (Imperial Administration)',
        detail: 'Complete a same-colored four-stack in your best zone for the +10% production bonus.',
      },
      {
        title: 'Airstrips before armies',
        detail:
          'Your one elite force defends everything via Airstrip teleports — build the network ' +
          'before the threat arrives.',
      },
    ],
    devOrder: [
      {
        name: 'Composite Materials',
        tree: 'expansion',
        why: 'You will build more buildings per village than anyone — the discount compounds hardest for you.',
      },
      {
        name: 'Local Dialect Studies',
        tree: 'expansion',
        why: 'Smooths the early grabs; opens Local Hubs.',
      },
      {
        name: 'Megalopolis',
        tree: 'economy',
        why: '+20% production in heavily built villages — your extra slot makes every village qualify.',
      },
      {
        name: 'Solid Materials',
        tree: 'economy',
        why: 'Reduced building upkeep across a building-dense empire is a permanent raise.',
      },
      {
        name: 'Call to Arms',
        tree: 'military',
        why: 'Sardaukar unlock — the few units you field must be the best ones.',
      },
      {
        name: 'Local Hubs',
        tree: 'expansion',
        why: 'Knowledge per village; modest for you, but everything else is already done.',
      },
    ],
    combos: [
      {
        name: 'Imperial Administration stack',
        pieces: ['4 same-colored buildings', 'One zone'],
        payoff: 'The defining combo: +10% production. Plan every zone around completing a color.',
      },
      {
        name: 'Wensicia doubles',
        pieces: ['Wensicia', 'Your best building ×2'],
        payoff: 'Duplicate the strongest building in a zone with zero added upkeep.',
      },
      {
        name: 'Money district',
        pieces: ['Processing Plant', 'Wholesale Market', 'Maintenance Center'],
        payoff: 'Rare Elements income, trickle Solari, and a 25% upkeep cut in one orange zone.',
      },
    ],
    units: [
      {
        name: 'Conscript Swordsman',
        role: 'melee',
        blurb: 'Formation anchor',
        trait: 'Protection Support — nearby allies take -5% damage per stack (max 5) while it has armor.',
        beats: 'Holding formation fights',
        losesTo: 'Armor shred and area damage',
        stats: 'Power 14 · Armor 4 · Melee',
      },
      {
        name: 'Conscript Rifleman',
        role: 'ranged',
        blurb: 'Armored marksman',
        trait: 'Targeting Support — +30% Power while at 3+ armor. Pinned in melee.',
        beats: 'Nearly everything while the armor holds',
        losesTo: 'Armor destruction stripping the bonus, melee engages',
        stats: 'Power 14 · Armor 4 · Range 20',
      },
      {
        name: 'Incinerator',
        role: 'melee',
        blurb: 'Chokepoint flamethrower',
        trait: 'Flamethrowers — frontal cone damage that ignores enemy armor entirely.',
        beats: 'Clumped melee in a pass — armor means nothing',
        losesTo: 'Long-range kiting',
        stats: 'Power 8 · Armor 4 · Range 10',
      },
      {
        name: 'Artillery Drone',
        role: 'siege',
        blurb: 'Range-80 siege engine',
        trait: 'Siege Engine — must deploy; 50% armor destruction; +100% vs flying.',
        beats: 'Chokepoints, sieges, anything that approaches',
        losesTo: 'Flankers while deployed',
        stats: 'Power 20 · Armor 6 · Range 80',
      },
      {
        name: 'Sardaukar',
        role: 'elite',
        blurb: 'The Emperor’s terror troops',
        trait: 'Executioner — instantly kills enemies below 20% health; threshold stacks to 5.',
        beats: 'Wounded lines — no berserker survives the execute',
        losesTo: 'Mass cheap units trading up against limited elites',
        stats: 'Power 18 · Armor 6 · Melee',
      },
    ],
    combatTips: [
      'Never split the army — proximity bonuses make one fist stronger than two hands.',
      'Use Airstrips to teleport the single elite force wherever the threat is.',
      'Artillery on cliffs over chokepoints; let attackers break against it.',
      'Fight defensive battles on your terrain; the economy wins every war you don’t lose.',
    ],
    councilors: [
      {
        name: 'Wensicia',
        effect:
          'Allows doubling up buildings in a zone with no increased upkeep — the engine of the ' +
          'entire tall economy. The standout pick.',
        pick: true,
      },
      {
        name: 'Fendaric',
        effect: 'Defensive bonuses and exploration benefits — the solid second slot.',
        pick: true,
      },
      {
        name: 'Count Fenring',
        effect: 'Espionage and assassination reach for an otherwise stationary empire.',
      },
      {
        name: 'Captain Otto Aramsham',
        effect: "Military discounts — skip it; cheap armies aren't the Corrino plan.",
      },
    ],
    gamePlan: {
      early: [
        'Claim 6-7 close regions rich in Plascrete and Rare Elements — nothing distant',
        'Harvesters on Auto Recall; plan every building slot before placing',
        'Wensicia online early to start doubling key buildings',
      ],
      mid: [
        'Pair buildings with zone traits; complete four-color Imperial Administration stacks',
        'Tech Megalopolis and Solid Materials; pillage zones you don’t want',
        'Artillery on the chokepoints into the core',
      ],
      late: [
        'Propaganda Office on, Kronos-class defense garrisoned at home',
        'Ride the tallest economy on Arrakis to Hegemony or CHOAM shares',
        'Let rivals exhaust themselves fighting over sand',
      ],
    },
    victoryPaths: [
      {
        name: 'Hegemony',
        recommended: true,
        note: 'Hyper-optimized regions generate Hegemony faster than sprawling empires.',
      },
      {
        name: 'Economic (CHOAM)',
        recommended: true,
        note: 'The Solari engine makes the shares buyout a natural second route.',
      },
      {
        name: 'Domination',
        recommended: false,
        note: 'Expansion penalties fight you the whole way — conquest is the trap option.',
      },
    ],
    matchups: [
      {
        enemyId: 'atreides',
        expect:
          'Resolution warfare aimed at your Solari and standing, plus a CHOAM race from the political direction.',
        counter:
          'Out-tall them: buy CHOAM shares early and keep standing merely serviceable. Fenring operations can kneecap their influence engine. You defend 6 regions; they must defend 10+.',
      },
      {
        enemyId: 'harkonnen',
        expect:
          'The matchup you fear: an early rush into your small, expensive, irreplaceable army.',
        counter:
          'Win with geometry — Artillery on cliffs, Riflemen behind, Incinerators plugging the gap. Sardaukar execute their wounded berserkers at 20% before the damage bonus peaks. Your walls only need to not lose.',
      },
      {
        enemyId: 'fremen',
        expect:
          'Raids on anything outside the core and a wide Hegemony race against your tall one.',
        counter:
          'Keep nothing outside the core. Harvesters on Auto Recall, Airstrip-react to raids, and race the economy — Megalopolis production against their Sietch web is a fair fight you can win.',
      },
      {
        enemyId: 'smugglers',
        expect:
          'You are the single best HQ target in the game — six hyper-rich villages begging to be siphoned.',
        counter:
          'Counterintelligence is not optional: agents stay home. Your tall economy can outlast the drain longer than their patience, but never let Free Company catch a wounded Sardaukar in the open.',
      },
      {
        enemyId: 'ecaz',
        expect:
          'A parallel builder racing CHOAM and political wins with Sanctuaries and compounding Masterpieces.',
        counter:
          'Race the economy — doubled buildings out-produce galleries on raw Solari. Their Masterpiece deterrent costs you nothing if you never attack; win on CHOAM timing and let Fenring harass their councilors.',
      },
      {
        enemyId: 'vernius',
        expect:
          'The tech-race twin: patents at 5,000, and at 10,000 an obfuscation that can null Megalopolis itself.',
        counter:
          'Beat them to 5,000 Hegemony — your per-region curve is steeper early. Spread bonuses across charters and councilors so no single obfuscation cripples you.',
      },
    ],
  },
  {
    id: 'ecaz',
    name: 'House Ecaz',
    archetype: 'Culture & Sanctuaries',
    leader: 'Archduke Armand Ecaz',
    color: '#a266c9',
    image: '/faction_animations/ecaz.jpg',
    difficulty: 2,
    tagline: 'Beauty is leverage. Art is territory.',
    overview:
      'The artisan house wins through patronage, not plunder: neutral villages ringed into ' +
      'untouchable Sanctuaries, Masterpieces rivals cannot afford to destroy, and the ' +
      'strongest economic-political engine on the map. It cannot restart wars after a truce ' +
      '— build accordingly.',
    strengths: [
      {
        label: 'Untouchable Sanctuaries',
        detail: '+1 Authority per day each, and other factions cannot attack them at all.',
      },
      {
        label: 'Doubled village traits',
        detail: 'Regions adjacent to a Sanctuary gain an extra instance of its village traits.',
      },
      {
        label: 'Masterpiece deterrent',
        detail: 'Destroying one costs the attacker 100 Landsraad standing — culture defends itself.',
      },
      {
        label: 'Garden Resort hub',
        detail: 'One designated village compounds bonuses from adjacent Sanctuaries and Masterpieces.',
      },
      {
        label: 'Authority economy',
        detail: 'Excellent Authority income fuels constant expansion.',
      },
    ],
    weaknesses: [
      {
        label: 'Permanent truces',
        detail: 'Cannot initiate conflict after agreeing to a truce — diplomacy is one-way.',
      },
      {
        label: 'No demolition',
        detail: 'Direct capital assaults are off the table — eliminate rivals by other means.',
      },
      {
        label: 'Fragile webs',
        detail: 'Lose one bordering region and the Sanctuary ring collapses.',
      },
    ],
    mechanics: [
      {
        name: 'Sanctuaries',
        description:
          'Control every region bordering a neutral village to convert it into a Sanctuary: +1 ' +
          'Authority daily, immunity from rival attack, and doubled village traits in every ' +
          'adjacent region. Map-edge villages need only 2-3 bordering regions.',
      },
      {
        name: 'Masterpieces',
        description:
          'Two-slot buildings that unlock faction-wide bonuses. Rivals who destroy one lose 100 ' +
          'Landsraad standing — your culture is its own deterrent.',
      },
      {
        name: 'Garden Resort',
        description:
          'Designate a single village as the Garden Resort, gaining stacking bonuses from ' +
          'adjacent Sanctuaries and Masterpieces — plan its placement from turn one.',
      },
    ],
    buildOrder: [
      {
        title: 'Council: Sanya Ecaz + Rivvy Dinari',
        detail:
          'Sanya makes Masterpieces 40% cheaper and income-positive. Rivvy’s free upkeep on ' +
          'max-level units sustains the defensive army. Mesa is the alternative for faster builds.',
      },
      {
        title: 'Ornithopters scan the whole map',
        detail:
          'Do not commit before seeing everything — the Sanctuary plan is a map-wide puzzle ' +
          'solved before the first expansion.',
      },
      {
        title: 'Mark map-edge neutral villages',
        detail: 'Edge villages need only 2-3 bordering regions to ring — the cheapest Sanctuaries first.',
      },
      {
        title: 'Spice village + Refinery',
        detail: 'The conventional economy still pays the tax while the web is under construction.',
      },
      {
        title: 'Expand toward ring completion',
        detail:
          'Every region claimed should border a future Sanctuary. Your Authority surplus sustains ' +
          'a faster expansion clip than anyone expects.',
      },
      {
        title: 'First Masterpiece under Sanya',
        detail: 'Two slots, faction-wide bonus, +15 Solari a day — start it as soon as plascrete allows.',
      },
      {
        title: 'Garden Resort where the web clusters',
        detail: 'Place it where Sanctuaries and Masterpieces stack adjacency — plan, then commit.',
      },
      {
        title: 'Stay at war with land you need',
        detail:
          'Never truce a neighbor whose regions complete your rings — every truce is permanent peace for you.',
      },
    ],
    devOrder: [
      {
        name: 'Composite Materials',
        tree: 'expansion',
        why: 'Masterpieces are expensive two-slot builds — the discount matters double.',
      },
      {
        name: 'Local Dialect Studies',
        tree: 'expansion',
        why: 'Village relations support the ringing strategy; opens Local Hubs.',
      },
      {
        name: 'Water Sellers Contacts',
        tree: 'economy',
        why: 'Solari stream to fund Masterpieces alongside Sanya’s discount.',
      },
      {
        name: 'Local Hubs',
        tree: 'expansion',
        why: 'Knowledge scales with your unusually wide village count.',
      },
      {
        name: 'Call to Arms',
        tree: 'military',
        why: 'Knights anchor the web defense — elite tier is your insurance policy.',
      },
      {
        name: 'Statecraft influence line',
        tree: 'statecraft',
        why: 'Influence production feeds the political victory your Masterpieces point at.',
      },
    ],
    combos: [
      {
        name: 'Sanctuary adjacency',
        pieces: ['Sanctuary', 'Adjacent region buildings'],
        payoff:
          'Adjacent regions get doubled village traits — place trait-scaling buildings next to rings.',
      },
      {
        name: 'Resort cluster',
        pieces: ['Garden Resort', 'Sanctuaries', 'Masterpieces'],
        payoff: 'Stacking adjacency bonuses turn one village into a compounding economic hub.',
      },
      {
        name: 'Standing engine',
        pieces: ['Masterpieces', 'Ibbo Vipp'],
        payoff: 'Every completed Masterpiece buys Landsraad standing — culture votes.',
      },
    ],
    units: [
      {
        name: 'Squire',
        role: 'melee',
        blurb: 'Armor stripper',
        trait: 'Crusher — targets suffer -4 Armor, setting up everyone else’s damage.',
        beats: 'Armored frontlines (after the debuff lands)',
        losesTo: 'Ranged kiting',
        stats: 'Power 12 · Armor 5 · Melee',
      },
      {
        name: 'Musketeer',
        role: 'ranged',
        blurb: 'Target marker',
        trait: 'Thunder — targets take +10% damage from all sources. Pinned in melee.',
        beats: 'Priority targets marked for the army',
        losesTo: 'Melee engages',
        stats: 'Power 15 · Armor 3 · Range 30',
      },
      {
        name: 'War Banner',
        role: 'support',
        blurb: 'Battlefield standard',
        trait: 'Inspiring Sight — Ecazi allies +10% Power, enemies -10% Power.',
        beats: 'Any army-versus-army fight it attends',
        losesTo: 'Assassins reaching the standard',
        stats: 'Power 8 · Armor 8 · Range 20',
      },
      {
        name: 'Knight',
        role: 'elite',
        blurb: 'Unkillable with escort',
        trait: 'Nobility — -20% damage taken per nearby Ecazi unit; nearly immortal in formation.',
        beats: 'Everything while the retinue stands',
        losesTo: 'Area damage clearing the escort first',
        stats: 'Power 25 · Armor 3 · Melee',
      },
      {
        name: 'Siren',
        role: 'ranged',
        blurb: 'Drone killer',
        trait: 'Alluring Song — mechanical targets take +30% damage; 30% armor destruction.',
        beats: 'Vernius drones and anything mechanical',
        losesTo: 'Fast infantry',
        stats: 'Power 12 · Armor 5 · Range 20',
      },
    ],
    combatTips: [
      'Fight only to complete or defend Sanctuary rings — territory is the win condition, not kills.',
      'You cannot demolish capitals; remove rivals through assassination operations instead.',
      'Keep wars alive with neighbors you still need land from — truces are forever.',
      'Late game, shift agents to Counterintelligence; everyone will probe the web.',
    ],
    councilors: [
      {
        name: 'Sanya Ecaz',
        effect: 'Masterpieces cost 40% less and generate 15 Solari daily each.',
        pick: true,
      },
      {
        name: 'Rivvy Dinari',
        effect: 'Units start with bonus experience; max-level units require no Solari upkeep.',
        pick: true,
      },
      {
        name: 'Mesa Ecaz',
        effect: 'Doubles Masterpiece construction speed; refunds Authority when abandoning villages.',
      },
      {
        name: 'Ibbo Vipp',
        effect: 'Immunity to one Landsraad resolution; completed Masterpieces grant Landsraad standing.',
      },
    ],
    gamePlan: {
      early: [
        'Scan the whole map before committing; mark map-edge neutral villages',
        'Expand on Authority surplus toward ring completion',
        'Keep conflicts open with neighbors whose land you need',
      ],
      mid: [
        'Complete Sanctuary rings; Masterpieces under Sanya',
        'Garden Resort where Sanctuaries and Masterpieces cluster',
        'Truce only distant factions — every truce is permanent',
      ],
      late: [
        'Run Influence and Solari in parallel toward political or economic victory',
        'Counter-spy relentlessly; the web is the target',
        'Remove existential threats with assassinations, not armies',
      ],
    },
    victoryPaths: [
      {
        name: 'Political',
        recommended: true,
        note: 'Masterpiece standing bonuses and a fat Influence economy point straight at the Landsraad.',
      },
      {
        name: 'Economic (CHOAM)',
        recommended: true,
        note: 'Garden Resort plus Masterpiece income makes the shares route equally strong.',
      },
      {
        name: 'Domination',
        recommended: false,
        note: 'No demolition and one-way diplomacy make conquest structurally unavailable.',
      },
    ],
    matchups: [
      {
        enemyId: 'atreides',
        expect:
          'The mirror politics race — and at face value they vote harder than you.',
        counter:
          'Ibbo Vipp immunity cancels their worst resolution while Masterpiece standing compounds. Close rings early because peaceful annexation eats neutral villages fast; keep CHOAM as the backup win.',
      },
      {
        enemyId: 'harkonnen',
        expect:
          'A rush that does not care how pretty your buildings are — and any truce you sign is permanent for you only.',
        counter:
          'Anchor defense on Sanctuaries (they cannot be attacked) with Household Guard and War Banners behind militia. Assassinate, never counter-invade. If you must truce, extract a long one — you can never restart it.',
      },
      {
        enemyId: 'fremen',
        expect:
          'Fast village conquest racing your ring plans and raids melting out of the desert.',
        counter:
          'Prioritize map-edge rings they cannot easily contest, garrison the ring regions, and pay them in truce terms only when your web no longer needs their land.',
      },
      {
        enemyId: 'smugglers',
        expect:
          'HQs in your Solari-fat showcase villages and bounties graffiti-ing your Landsraad plans.',
        counter:
          'Counterintelligence early — your compact rich villages are prime hosts. Out-vote their bounties with Masterpiece standing; they cannot match your Influence curve.',
      },
      {
        enemyId: 'corrino',
        expect:
          'The other tall builder, racing you to CHOAM and political finishes with raw Solari.',
        counter:
          'Garden Resort compounding beats flat administration late — survive the mid-game spike. Contest Rare Element regions during expansion and out-vote them; the Emperor has money, you have standing.',
      },
      {
        enemyId: 'vernius',
        expect:
          'A tech racer whose drones harvest freely and whose obfuscation can null a development you lean on.',
        counter:
          'Your Sirens hard-counter their mechanical army (+30% damage) if war comes. Spread bonuses across Masterpieces — obfuscation cannot touch culture.',
      },
    ],
  },
  {
    id: 'vernius',
    name: 'House Vernius of Ix',
    archetype: 'Technology & Drones',
    leader: 'Earl Rhombur Vernius',
    color: '#43c6c0',
    image: '/faction_animations/vernius.gif',
    difficulty: 2,
    tagline: 'The desert is a network problem.',
    overview:
      'The Ixian confederacy fights with machines where others spend men: a Nodal Network ' +
      'across Arrakis, worm-immune harvester drones that need no refinery, and a tech race ' +
      'toward patents that buy — and obfuscation that denies — the galaxy’s innovations.',
    strengths: [
      {
        label: 'Worm-immune harvesters',
        detail: 'Harvester drones cannot be eaten — contest spice fields everyone else abandons.',
      },
      {
        label: 'No refinery needed',
        detail: 'Drones harvest any owned or neutral spice field within network reach.',
      },
      {
        label: 'Fastest research',
        detail: 'Knowledge-focused play out-techs every other faction.',
      },
      {
        label: 'Patents at 5k',
        detail: 'Buy unique developments for 600 Solari each at 5,000 Hegemony.',
      },
      {
        label: 'Obfuscation at 10k',
        detail: 'Nullify one development for every rival — delete the tech their plan leans on.',
      },
    ],
    weaknesses: [
      {
        label: 'Network dependence',
        detail: 'Severed tethers shut down whole regions — the empire is the network.',
      },
      {
        label: 'Fuel Cell hunger',
        detail: 'Energy logistics replace Manpower; losing fuel production is losing the army.',
      },
      {
        label: 'Unforgiving positioning',
        detail: 'Drones trade differently than infantry and punish sloppy placement.',
      },
    ],
    mechanics: [
      {
        name: 'Nodal Network',
        description:
          'The S-Vault main base anchors a network extended by Neural Nodes in controlled ' +
          'regions. Units and harvesters must stay Tethered to function at full strength — the ' +
          'empire is the network.',
      },
      {
        name: 'Drone Harvesting',
        description:
          'Remotely-operated harvesters ignore sandworms entirely and need no refinery, ' +
          'collecting from any owned or neutral spice field within network reach.',
      },
      {
        name: 'Patents & Obfuscation',
        description:
          'At 5,000 Hegemony, patent unique developments for 600 Solari. At 10,000, spend 20 ' +
          'standing to obfuscate a development, nullifying its effects for all players — deny ' +
          "your rivals' best tech.",
      },
    ],
    buildOrder: [
      {
        title: 'Council: Bronso + Bolig Avati',
        detail:
          'Bronso accelerates Knowledge — the tech rush is the strategy. Bolig strengthens the ' +
          'drone economy and network infrastructure that carries it.',
      },
      {
        title: 'Scout for Geothermal Vents',
        detail:
          'Fuel Cells are your Manpower. Regions with vents (free Fuel Cell production) define ' +
          'where the empire goes.',
      },
      {
        title: 'Take spice-adjacent regions',
        detail:
          'Drones harvest owned AND neutral fields in network range — you need reach, not ' +
          'ownership of the field itself.',
      },
      {
        title: 'Neural Node with every expansion',
        detail: 'Extend the Network as you claim — an untethered region is a dead region.',
      },
      {
        title: 'Water Batteries if no vents',
        detail: 'Research Water Batteries and build Dew Collectors when geography denies you geothermal.',
      },
      {
        title: 'Knowledge buildings, then more knowledge',
        detail: 'Out-research everyone — the Solari from drone spice funds a tech pace no one matches.',
      },
      {
        title: 'Spacing Guild Branch early',
        detail: 'Air deterrence protects the network spine from the harassment you are inviting.',
      },
      {
        title: 'Bank 1,800+ Solari before 5,000 Hegemony',
        detail: 'Patents cost 600 each — arrive at the milestone able to buy three immediately.',
      },
    ],
    devOrder: [
      {
        name: 'Composite Materials',
        tree: 'expansion',
        why: 'Nodes and infrastructure everywhere — the discount applies to the whole network.',
      },
      {
        name: 'Water Batteries',
        tree: 'economy',
        why: 'Faction-critical when Geothermal Vents are scarce — water becomes energy.',
      },
      {
        name: 'Local Dialect Studies',
        tree: 'expansion',
        why: 'Village relations and the Local Hubs path.',
      },
      {
        name: 'Local Hubs',
        tree: 'expansion',
        why: 'Knowledge per village stacks with the fastest research engine in the game.',
      },
      {
        name: 'Call to Arms',
        tree: 'military',
        why: 'Elite drones for the late game — by then your tech makes them monsters.',
      },
      {
        name: 'Patent targets (post-5k)',
        tree: 'economy',
        why:
          'After 5,000 Hegemony the dev order becomes: whatever 600 Solari buys that rivals wanted. ' +
          'Only developments no rival has researched yet can be patented — your research lead means the ' +
          'deep tree is yours to fence off. Patents lock the tree slot, so faction-unique developments ' +
          'sitting in that slot are blocked too.',
        patentPlan: {
          order: [
            'Call to Arms — every late-game army wants Tier 4 units; taxes every war plan on the map',
            'CHOAM Hegemony — the late Solari engine every economic path runs through',
            'High Command — the command-point/armor capstone all warmongers need',
            'Riches of Arrakis — special-region Solari most rivals bank on for the endgame',
            'Airfield Network — late logistics relief everyone grabs; cheap rent forever',
          ],
          byEnemy: [
            {
              enemyId: 'atreides',
              picks:
                'Both Atreides Delegation slots (statecraft + economy) — their relationship economy and treaty leverage die without them.',
            },
            {
              enemyId: 'harkonnen',
              picks:
                'Martial Economy — the −30% upkeep their army math assumes; then Central Command to blunt the late push.',
            },
            {
              enemyId: 'fremen',
              picks:
                'Spice Hegemony and Spice Market — the crew-stacked harvesting engine is their whole economy.',
            },
            {
              enemyId: 'smugglers',
              picks:
                'Underworld Contacts — Headquarters skimming 20% of village spice; then Guerrilla Tactics before night pushes start.',
            },
            {
              enemyId: 'corrino',
              picks:
                'Imperial Protocols — the Mandate power spike; save Megalopolis for the 10k obfuscation instead.',
            },
            {
              enemyId: 'ecaz',
              picks:
                'Artistic Aspirations — the Masterpiece Solari engine; then National Mythos to deny the War Banner.',
            },
          ],
        },
      },
    ],
    combos: [
      {
        name: 'Network spine',
        pieces: ['Neural Nodes', 'Fuel Cell Factory', 'Geothermal Vents'],
        payoff: 'Tethered range plus the energy to feed it — the army and economy both live here.',
      },
      {
        name: 'Refinery-free spice',
        pieces: ['Harvester drones', 'Neutral spice fields', 'Network reach'],
        payoff: 'Income from fields you never had to conquer, immune to worms and most raids.',
      },
      {
        name: 'Research engine',
        pieces: ['Research Hub', 'Local Hubs', 'Bronso'],
        payoff: 'Stacked Knowledge per village converts directly into the patent war chest.',
      },
    ],
    units: [
      {
        name: 'Suboid Soldier',
        role: 'melee',
        blurb: 'Disposable bodies',
        trait: 'Cheap to produce and maintain, decent in groups — but zero armor.',
        beats: 'Ranged lines it locks down in melee',
        losesTo: 'Literally any armored opposition',
      },
      {
        name: 'Fighting Mek',
        role: 'melee',
        blurb: 'Self-learning combat drone',
        trait: '+3 Power while Tethered; scanner gear adds damage vs non-mechanical targets.',
        beats: 'Infantry inside your Network',
        losesTo: 'Fights beyond the tether; anti-mech (Sirens)',
      },
      {
        name: 'Railgun Drone',
        role: 'ranged',
        blurb: 'Electromagnetic ranged fire',
        trait: 'Coil-accelerated projectiles; strongest while Tethered to the Network.',
        beats: 'Armored targets at range',
        losesTo: 'Melee flankers and untethered operations',
      },
      {
        name: 'Resonance Drone',
        role: 'support',
        blurb: 'Electrostatic support',
        trait: 'Field effects that tilt engagements — the force multiplier of the drone army.',
        beats: 'Tipping big tethered battles',
        losesTo: 'Focus fire',
      },
    ],
    combatTips: [
      'Fight inside the Network — Tethered units operate at full strength, stranded ones don’t.',
      'Extend Neural Nodes toward objectives before the army moves, not after.',
      'Your harvesters ignore worms: contest spice fields other factions are forced to abandon.',
      'Protect Fuel Cell production like others protect water — it is your manpower.',
    ],
    councilors: [
      {
        name: 'Bronso Vernius',
        effect: 'Accelerates Knowledge output for the tech-rush core strategy.',
        pick: true,
      },
      {
        name: 'Bolig Avati',
        effect: 'Strengthens the drone economy and network infrastructure.',
        pick: true,
      },
      {
        name: 'Tessia Vernius',
        effect: 'Bene Gesserit councilor with unique espionage abilities.',
      },
      {
        name: 'Cammar Pilru',
        effect: 'Diplomatic reach for an otherwise insular technocracy.',
      },
    ],
    gamePlan: {
      early: [
        'Fuel Cell regions first — energy is manpower',
        'Neural Nodes with every expansion; drones on every reachable spice field',
        'Water Batteries + Dew Collectors if geography denies geothermal',
      ],
      mid: [
        'Rush the tech tree on drone-spice Solari and stacked Knowledge',
        'Stretch the Network toward contested spice and future battlegrounds',
        'Bank Solari ahead of the 5,000 Hegemony patent milestone',
      ],
      late: [
        'Buy patents aggressively at 600 Solari each',
        'At 10,000, obfuscate the development your strongest rival depends on',
        'Convert the tech lead into Hegemony — or drone armies nobody out-engineers',
      ],
    },
    victoryPaths: [
      {
        name: 'Hegemony',
        recommended: true,
        note: 'Patents, tech pace, and uncontested spice income compound straight into Hegemony.',
      },
      {
        name: 'Economic (CHOAM)',
        recommended: false,
        note: 'The Solari engine supports it, but it competes with patent spending.',
      },
      {
        name: 'Domination',
        recommended: false,
        note: 'Drone armies are capable but the Network leash limits deep offensives.',
      },
    ],
    matchups: [
      {
        enemyId: 'atreides',
        expect:
          'Landsraad resolutions taxing your Hegemony pace and a charter economy racing your tech curve.',
        counter:
          'You cannot outvote them — outrun them. Drone-harvest neutral spice they cannot touch, hit 5,000 first, and patent the economic developments their charter plan assumed.',
      },
      {
        enemyId: 'harkonnen',
        expect:
          'A rush aimed at the window before your tech matters, targeting Neural Node regions to wilt your army.',
        counter:
          'Defend the spine: garrison node regions, fight only tethered, and use Railgun range behind Suboid screens. Survive to 5,000 Hegemony and the game inverts permanently.',
      },
      {
        enemyId: 'fremen',
        expect:
          'Raids on nodes and fuel-cell regions from desert angles, and a Hegemony race that scales their units.',
        counter:
          'Your harvesters shrug off their favorite target — worms and harvester raids do nothing. Overlap node coverage so one severed region never strands the army; obfuscate their scaling development at 10,000.',
      },
      {
        enemyId: 'smugglers',
        expect:
          'HQs on your fuel-cell economy and Wreckers shredding drone armor in skirmishes.',
        counter:
          'Their Snipers lose +30% against your mechanical army — your drones are structurally sniper-proof. Keep counterintel on the network core and patent the espionage developments before they reach them.',
      },
      {
        enemyId: 'corrino',
        expect:
          'The mirror tech-economy race, tall administration against your network, both eyeing 10,000 first.',
        counter:
          'Your spice has no harvester to escort and no refinery to bomb — out-expand their Authority-capped core with cheap nodes. Obfuscate Megalopolis at 10,000 and watch the tall economy sag.',
      },
      {
        enemyId: 'ecaz',
        expect:
          'Sanctuary rings spreading passively while Sirens — the one hard counter to drones — wait in their garrisons.',
        counter:
          'Avoid their army; you never need their land. Network past their rings to neutral spice, race Hegemony against their slower cultural curve, and obfuscate their economic keystone late.',
      },
    ],
  },
];

export const factionById = new Map(factions.map((f) => [f.id, f]));

/** Fail fast on broken cross-references (e.g. a matchup pointing at a missing faction). */
export function getFaction(id: string): Faction {
  const faction = factionById.get(id);
  if (!faction) throw new Error(`Unknown faction id: ${id}`);
  return faction;
}

export const sources = [
  {
    label: 'TheGamer — Faction Combat Strategies',
    url: 'https://www.thegamer.com/dune-spice-wars-complete-combat-guide-faction-strategies/',
  },
  {
    label: 'GameSkinny — Factions Guide: Strengths, Weaknesses & Councilors',
    url: 'https://www.gameskinny.com/tips/dune-spice-wars-factions-guide-strengths-weaknesses-bonuses-and-best-councilors/',
  },
  {
    label: 'TheGamer — House Ecaz Strategy Guide',
    url: 'https://www.thegamer.com/dune-spice-wars-house-ecaz-strategy-guide/',
  },
  {
    label: 'TheGamer — House Vernius of Ix Strategy Guide',
    url: 'https://www.thegamer.com/dune-spice-wars-house-vernius-ix-strategy-guide/',
  },
  {
    label: 'MyGamingTutorials — Smugglers Faction Guide',
    url: 'https://mygamingtutorials.com/2025/06/03/dune-spice-wars-smugglers-faction-guide/',
  },
  {
    label: 'MyGamingTutorials — Fremen Best Start Guide',
    url: 'https://mygamingtutorials.com/2025/06/03/fremen-best-start-guide-dune-spice-wars/',
  },
  {
    label: 'MyGamingTutorials — House Corrino Economic Optimization',
    url: 'https://mygamingtutorials.com/2025/05/03/house-corrino-economic-optimization-guide-dune-spice-wars/',
  },
  {
    label: 'MyGamingTutorials — Beginner Economic Build Guide',
    url: 'https://mygamingtutorials.com/2025/05/03/beginners-economic-build-guide-for-dune-spice-wars/',
  },
  {
    label: 'GameRant — Best Buildings to Construct First',
    url: 'https://gamerant.com/dune-spice-wars-best-buildings-construct-first/',
  },
  {
    label: 'DUNE.io — Community Unit Stats Reference',
    url: 'https://dunespicewars.github.io/units.html',
  },
  {
    label: 'Steam Community — Harkonnen Guide 1.0',
    url: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3070223508',
  },
  {
    label: 'Dune: Spice Wars Wiki — Factions',
    url: 'https://dunespicewars.fandom.com/wiki/Factions',
  },
];
