export interface Mechanic {
  name: string;
  description: string;
}

export interface Unit {
  name: string;
  role: string;
}

export interface Councilor {
  name: string;
  effect: string;
}

export interface VictoryPath {
  name: string;
  recommended: boolean;
  note: string;
}

export interface Faction {
  id: string;
  name: string;
  archetype: string;
  leader: string;
  color: string;
  difficulty: 1 | 2 | 3;
  tagline: string;
  overview: string;
  strengths: string[];
  weaknesses: string[];
  mechanics: Mechanic[];
  units: Unit[];
  combatTips: string[];
  councilors: Councilor[];
  gamePlan: { early: string; mid: string; late: string };
  victoryPaths: VictoryPath[];
}

export const factions: Faction[] = [
  {
    id: 'atreides',
    name: 'House Atreides',
    archetype: 'Diplomacy & Politics',
    leader: 'Duke Leto Atreides',
    color: '#4caf7d',
    difficulty: 1,
    tagline: 'Win the war before a shot is fired.',
    overview:
      'The noble house of Caladan plays the long political game. Atreides annexes ' +
      'villages peacefully, starts with elevated Landsraad standing, and converts ' +
      'political dominance into economic power. A balanced faction that can pivot ' +
      'between political, hegemony, and economic victories — the best choice for ' +
      'learning the game.',
    strengths: [
      'Peacefully annex neutral villages without a fight — no militia losses, no war',
      'Higher starting Landsraad standing and outsized influence in resolutions',
      'Resource bonuses at 5,000 Hegemony tied to winning Landsraad resolutions',
      'Strong late-game special units: Wardens and Heavy Weapon Squads',
      'Flexible — viable on nearly every victory path',
    ],
    weaknesses: [
      'Cannot pillage neutral villages, cutting off an early Solari income source',
      'Standard military units lack the raw power of Harkonnen or Fremen troops',
      'Peaceful annexation is slower and Authority-hungry compared to conquest',
    ],
    mechanics: [
      {
        name: 'Peaceful Annexation',
        description:
          'Villages join the Duke willingly. Annexation costs more Authority and takes ' +
          'time, but spends no militia and triggers no fight — expansion without attrition.',
      },
      {
        name: 'Landsraad Favor',
        description:
          'Elevated standing makes Atreides the kingmaker of every Landsraad session. ' +
          'Winning positive resolutions feeds directly into faction-wide production bonuses.',
      },
      {
        name: 'Hegemony Charter',
        description:
          'At 5,000 Hegemony, Atreides gains escalating resource bonuses based on how ' +
          'many favorable Landsraad resolutions are active — politics becomes economy.',
      },
    ],
    units: [
      { name: 'Trooper', role: 'Reliable melee line that anchors concentrated fire tactics' },
      { name: 'Ranger', role: 'Ranged support — focus-fire priority targets with Troopers' },
      { name: 'Support Drone', role: 'Heals and sustains the line, multiplying unit synergies' },
      { name: 'Warden', role: 'Late-game defensive wall requiring sustained heavy fire to crack' },
    ],
    combatTips: [
      'Concentrate fire: have Troopers and Rangers all target the same enemy unit and delete threats one at a time.',
      'Bring Support Drones — Atreides wins through synergy and sustain, not raw stats.',
      'Late game, a Warden + Trooper front line is one of the hardest formations in the game to break.',
      'Fight defensively while your political and economic engines win the game.',
    ],
    councilors: [
      {
        name: 'Thufir Hawat',
        effect:
          'Agents gain additional traits; villages get +20% production while targeted by an operation.',
      },
      {
        name: 'Duncan Idaho',
        effect: 'Boosts Sietch relations and reduces village annexation Authority cost by 10%.',
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
      early:
        'Scout with your Ornithopter and queue peaceful annexations on spice and water ' +
        'villages. Push Influence production early — your Landsraad edge is your weapon. ' +
        'Keep a token defense; nobody profits from attacking you yet.',
      mid:
        'Dominate every Landsraad session: stack standing, win resolutions that buff your ' +
        'economy and hamstring your strongest rival. Cross 5,000 Hegemony to switch on the ' +
        'Charter bonuses. Build the Warden line if a neighbor looks hungry.',
      late:
        'Convert political dominance into the win: push for the Governorship political ' +
        'victory, or ride your resolution-boosted economy to hegemony. Use operations and ' +
        'counterintelligence to protect your lead.',
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
  },
  {
    id: 'harkonnen',
    name: 'House Harkonnen',
    archetype: 'Military & Oppression',
    leader: 'Baron Vladimir Harkonnen',
    color: '#e0452f',
    difficulty: 1,
    tagline: 'Fear is a resource. Spend it freely.',
    overview:
      'Giedi Prime rules through terror. Harkonnen fields the strongest military units ' +
      'in the game, treats casualties as fuel, and squeezes villages with Oppression for ' +
      'burst production. Troops get stronger as they get hurt. Point them at a capital ' +
      'and push.',
    strengths: [
      'Strongest standard military units in the game',
      'Troops gain power as their health drops — wounded armies hit harder',
      'Oppression temporarily boosts village resource output on demand',
      '+5% village resource production per active militia in each village',
      '+10% unit power at 5,000 Hegemony while villages are under Oppression',
    ],
    weaknesses: [
      'Starts with a -10% resource production penalty — the early economy lags',
      'Oppression breeds rebellion if pushed carelessly',
      'Weak diplomatic position; the Landsraad route is mostly closed',
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
          'Harkonnen units gain combat bonuses the lower their health gets. A bleeding ' +
          'Harkonnen army is more dangerous than a fresh one — never retreat at half health.',
      },
      {
        name: 'Combat Drugs Operation',
        description:
          'Transforms wounded soldiers into monstrous berserkers. Time it as your line ' +
          'starts taking damage to turn a grinding fight into a rout.',
      },
    ],
    units: [
      { name: 'Trooper', role: 'Cheap, brutal melee core that improves as it bleeds' },
      { name: 'Vanguard', role: 'Shock melee that leads every assault' },
      { name: 'Gunner', role: 'Ranged fire support behind the meat wall' },
      { name: 'Stealth Probe', role: 'Reveals targets for the next oppressive push' },
    ],
    combatTips: [
      'Do not pull wounded units back — low health means bonus damage. Push through.',
      'Fire Combat Drugs mid-fight, once units are damaged, for maximum berserker value.',
      'Casualties are acceptable: Iakin Nefud refunds half the cost of every unit that dies.',
      'Sacrificial plays are on the table — even baiting a sandworm into both armies trades in your favor.',
    ],
    councilors: [
      {
        name: 'Iakin Nefud',
        effect: 'Refunds 50% of unit cost when units die — sustains permanent military pressure.',
      },
      {
        name: 'Feyd-Rautha',
        effect: 'Corrupts Landsraad resolutions and gains Influence for killing rebels under Oppression.',
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
      early:
        'Eat your nearest neutral villages by force — pillage first where useful. Offset the ' +
        '-10% production penalty with militia bonuses and early Oppression. Pick your first ' +
        'victim while everyone else is still building.',
      mid:
        'Roll a permanent army. With Nefud refunding casualties, constant war is cheaper for ' +
        'you than peace. Oppress aggressively once you cross 5,000 Hegemony for the +10% ' +
        'power spike, and crush rebellions for Feyd-Rautha influence.',
      late:
        'March on capitals. Combat Drugs plus low-health bonuses make your late assaults ' +
        'nearly unstoppable in a straight fight. Eliminate rivals one at a time before their ' +
        'economic or political clocks run out.',
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
  },
  {
    id: 'fremen',
    name: 'The Fremen',
    archetype: 'Guerrilla & Desert Power',
    leader: 'Liet-Kynes',
    color: '#4f9ec4',
    difficulty: 2,
    tagline: 'The desert is not your enemy. It is theirs.',
    overview:
      'The natives of Arrakis turn the planet itself into a weapon. Fremen armies cross ' +
      'open desert without supply loss, spice fields harvest themselves, and thumpers call ' +
      'sandworms down on anyone foolish enough to follow. Hit, vanish, repeat.',
    strengths: [
      'Military units drain 30% less supply and far less water — true desert mobility',
      'Warriors have 50% more health than other factions\' basic troops',
      'Spice fields collect on their own, no harvester required',
      'Ally with Sietches directly, no agent infiltration needed',
      'Unit power scales with Hegemony past 10,000 — the army grows with the empire',
    ],
    weaknesses: [
      'Minimal Landsraad influence — the political game costs you real effort',
      'No conventional airfields; logistics run on legs and worms',
      'Economy is lean early; over-expansion without water planning stalls you',
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
          'Befriend hidden Sietch communities without agents. Each alliance feeds Hegemony ' +
          'and unlocks the deep desert as friendly territory.',
      },
    ],
    units: [
      { name: 'Warrior', role: 'Melee line with +50% health — the toughest basic troop on Arrakis' },
      { name: 'Skirmisher', role: 'Mobile harassment and territorial defense' },
      { name: 'Infiltrator', role: 'Stealth unit — slip behind enemy lines onto their ranged units' },
      { name: 'Fedaykin', role: 'Elite death commandos; massive bonuses when fighting outnumbered' },
    ],
    combatTips: [
      'Lead with Warriors — their health pool lets you win melee grinds other factions avoid.',
      'Sneak an Infiltrator into the enemy backline and collapse their ranged units first.',
      'A single Fedaykin as rearguard punches far above its weight when outnumbered.',
      'Fight in deep desert where enemy supply bleeds and yours barely moves.',
    ],
    councilors: [
      {
        name: 'Stilgar',
        effect:
          'Village conquest reveals nearby Sietches; +1 Authority production per spice field.',
      },
      {
        name: 'Otheym',
        effect: '+10% speed to all units; solo units gain +20% power and +2 armor.',
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
      early:
        'Scout immediately, take your first village with two Warriors, and prioritize spice, ' +
        'plascrete, fuel cell, and water-well villages. Tech Survival Training → Composite ' +
        'Materials → Water Sellers Contacts. Expand faster than anyone — your units are cheap to move.',
      mid:
        'Build Plascrete Factories for sustainable growth and a military base near contested ' +
        'zones. Ally every Sietch you find. Start raiding: hit harvesters and weak villages, ' +
        'then dissolve into the desert before the counterattack lands.',
      late:
        'Past 10,000 Hegemony your units outscale everyone. Either snowball Sietch alliances ' +
        'and territory into a hegemony win, or use worm-riding mobility to strike capitals ' +
        'directly for domination.',
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
  },
  {
    id: 'smugglers',
    name: 'The Smugglers',
    archetype: 'Economy & Subterfuge',
    leader: 'Esmar Tuek',
    color: '#e8923a',
    difficulty: 3,
    tagline: 'Every faction on Arrakis works for you. They just don\'t know it.',
    overview:
      'Organized crime with a flag. Smugglers plant Underworld Headquarters inside rival ' +
      'villages and siphon their economies, trade through the Black Market, and field ' +
      'attrition units that punish low-supply enemies. A slow-burn faction that converts ' +
      'money and intelligence into victory.',
    strengths: [
      'Underworld Headquarters siphon resources directly from enemy villages',
      'Black Market trades Solari for spice at a favorable 4:1 ratio',
      'Rapid Hegemony gains through pillaging and infiltration',
      'Snipers offer high power, extreme range, and stealth',
      'Elite mercenary roster unlocked at 10,000 Hegemony, bought with Solari',
    ],
    weaknesses: [
      'Standard military units are among the weakest in a fair fight',
      'Low initial Landsraad standing',
      'Slow start — the engine needs infiltration and capital to spin up',
    ],
    mechanics: [
      {
        name: 'Underworld Headquarters',
        description:
          'Install hidden HQs in any faction\'s villages to drain their resources into your ' +
          'coffers. Your rivals\' growth literally funds yours.',
      },
      {
        name: 'Black Market & Contraband',
        description:
          'Convert Solari to spice at 4:1 and ride contraband events for bonus resources ' +
          'and Hegemony. Cash is your true resource; everything else is bought.',
      },
      {
        name: 'Bounties',
        description:
          'Place bounties on Landsraad resolutions and targets, weaponizing other factions\' ' +
          'ambitions without fielding an army.',
      },
    ],
    units: [
      { name: 'Scavenger', role: 'Frontline with inherent regeneration — wins long attrition fights' },
      { name: 'Sniper', role: 'Stealth ranged killer with extreme reach' },
      { name: 'Wrecker', role: 'Shreds armor and drains enemy supply' },
      { name: 'Free Company', role: 'Late-game mercenary cleanup crew, paid in Solari' },
    ],
    combatTips: [
      'Never take a fair fight — you decide when and where battles happen, or you don\'t fight.',
      'Drag engagements into the desert: many of your units deal bonus damage to low-supply enemies.',
      'Scavenger regeneration wins wars of attrition that would break any other faction.',
      'At 10,000 Hegemony, buy the mercenary army your economy was always building toward.',
    ],
    councilors: [
      {
        name: 'Staban Tuek',
        effect:
          '+0.5 Influence per Underworld HQ; HQs produce +5 Solari when adjacent to other HQs.',
      },
      {
        name: 'Lingar Bewt',
        effect: 'Water reserves reduce HQ installation and village annexation costs.',
      },
      {
        name: 'Drisq',
        effect: 'Agents gain the Merchant trait — more Solari from every infiltration.',
      },
      {
        name: 'Bannerjee',
        effect: 'Improves pillaging rewards, adding Plascrete income to raids.',
      },
    ],
    gamePlan: {
      early:
        'Scout aggressively and pillage everything you don\'t intend to keep. Take spice and ' +
        'water villages, research Composite Materials and sniper tech, and start placing ' +
        'agents in rival infrastructure.',
      mid:
        'Blanket enemy territory with Underworld HQs — cluster them for Staban Tuek adjacency ' +
        'bonuses. Convert Solari through the Black Market, work bounties, and let rivals\' ' +
        'economies pay your bills.',
      late:
        'Use poison reserves and well-timed ceasefires to keep would-be conquerors weak. ' +
        'Upgrade to the mercenary roster and ride pillage-fueled Hegemony across the finish ' +
        'line before anyone untangles your network.',
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
        note: 'Viable once Influence flows from HQ networks, but it\'s a backup plan.',
      },
      {
        name: 'Domination',
        recommended: false,
        note: 'Only late, with mercenaries, against already-bled opponents.',
      },
    ],
  },
  {
    id: 'corrino',
    name: 'House Corrino',
    archetype: 'Imperial Elite & Economy',
    leader: 'Emperor Shaddam IV',
    color: '#d9b54a',
    difficulty: 3,
    tagline: 'Ten thousand years of rule. A few regions of sand.',
    overview:
      'The Imperial House plays tall, not wide. Steep Authority penalties punish distant ' +
      'expansion, but every Corrino village gets an extra building slot — a compact empire ' +
      'of 6-7 hyper-optimized regions backed by small, elite Sardaukar-grade armies that ' +
      'fight shoulder to shoulder.',
    strengths: [
      'Extra building slot in every village — unmatched per-region output',
      'Elite infantry gain power bonuses for fighting near one another',
      'Airstrip transport repositions the army anywhere, fast',
      'Imperial administration and taxation feed a towering Solari economy',
      'Artillery on cliffs and ridges holds chokepoints almost indefinitely',
    ],
    weaknesses: [
      'Severe Authority penalties for expanding far from the main base',
      'Small army count — losses hurt more than for any other faction',
      'Military victory fights against the faction\'s own expansion limits',
    ],
    mechanics: [
      {
        name: 'Compact Empire',
        description:
          'Expansion beyond the core is punishingly expensive, but the bonus building slot ' +
          'per village means 6 Corrino regions out-produce 10 of anyone else\'s.',
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
          'The Emperor\'s administration extracts wealth from the spice trade itself, ' +
          'compounding the tall economy with every passing day.',
      },
    ],
    units: [
      { name: 'Imperial Infantry', role: 'Elite line troops that grow stronger packed together' },
      { name: 'Sardaukar', role: 'The Emperor\'s legendary terror troops — few, but decisive' },
      { name: 'Artillery', role: 'Positioned on cliffs and ridges, it locks down entire chokepoints' },
      { name: 'Kronos', role: 'Late-game defensive anchor for the home regions' },
    ],
    combatTips: [
      'Never split the army — infantry proximity bonuses make one fist stronger than two hands.',
      'Use Airstrips to teleport your single elite force wherever the threat is.',
      'Set artillery on cliffs over chokepoints and let attackers break against it.',
      'Fight defensive battles on your terrain; your economy wins every war you don\'t lose.',
    ],
    councilors: [
      {
        name: 'Wensicia',
        effect:
          'Allows doubling up buildings in a zone with no increased upkeep — the engine of ' +
          'the entire tall economy. The standout pick.',
      },
      {
        name: 'Fendaric',
        effect: 'Defensive bonuses and exploration benefits — the solid second slot.',
      },
      {
        name: 'Count Fenring',
        effect: 'Espionage and assassination reach for an otherwise stationary empire.',
      },
      {
        name: 'Captain Otto Aramsham',
        effect: 'Military discounts — skip it; cheap armies aren\'t the Corrino plan.',
      },
    ],
    gamePlan: {
      early:
        'Scout deliberately and claim 6-7 close regions rich in Plascrete and Rare Elements. ' +
        'Put harvesters on Auto Recall. Every region you take must justify its Authority ' +
        'cost forever — choose like an Emperor.',
      mid:
        'Execute precise village builds: pair buildings with matching zone traits, stack four ' +
        'same-colored buildings for Imperial Administration, and tech Megalopolis (+20% ' +
        'production) and Solid Materials (reduced upkeep). Pillage zones you don\'t want.',
      late:
        'Activate the Propaganda Office, garrison Kronos units at home, and tune production. ' +
        'Ride the tallest economy on Arrakis to a hegemony or CHOAM shares victory while ' +
        'rivals exhaust themselves fighting over sand.',
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
  },
  {
    id: 'ecaz',
    name: 'House Ecaz',
    archetype: 'Culture & Sanctuaries',
    leader: 'Archduke Armand Ecaz',
    color: '#a266c9',
    difficulty: 2,
    tagline: 'Beauty is leverage. Art is territory.',
    overview:
      'The artisan house wins through patronage, not plunder. Ecaz rings neutral villages ' +
      'to convert them into untouchable Sanctuaries, erects Masterpieces that rivals ' +
      'cannot afford to destroy, and quietly assembles the strongest economic-political ' +
      'engine on the map. It cannot restart wars after a truce — build accordingly.',
    strengths: [
      'Sanctuaries grant +1 Authority per day and cannot be attacked by other factions',
      'Regions adjacent to a Sanctuary gain an extra instance of its village traits',
      'Destroying a Masterpiece costs the attacker 100 Landsraad standing',
      'Garden Resort designation turns one village into a compounding economic hub',
      'Excellent Authority economy fuels constant expansion',
    ],
    weaknesses: [
      'Cannot initiate conflict after agreeing to a truce — diplomacy is one-way',
      'No demolition capability — direct capital assaults are off the table',
      'Sanctuary webs collapse if you lose even one bordering region',
    ],
    mechanics: [
      {
        name: 'Sanctuaries',
        description:
          'Control every region bordering a neutral village to convert it into a Sanctuary: ' +
          '+1 Authority daily, immunity from rival attack, and doubled village traits in ' +
          'every adjacent region. Map-edge villages need only 2-3 bordering regions.',
      },
      {
        name: 'Masterpieces',
        description:
          'Two-slot buildings that unlock faction-wide bonuses. Rivals who destroy one lose ' +
          '100 Landsraad standing — your culture is its own deterrent.',
      },
      {
        name: 'Garden Resort',
        description:
          'Designate a single village as the Garden Resort, gaining stacking bonuses from ' +
          'adjacent Sanctuaries and Masterpieces — plan its placement from turn one.',
      },
    ],
    units: [
      { name: 'Ornithopter Corps', role: 'Aggressive early scouting to plan the Sanctuary map' },
      { name: 'Household Guard', role: 'Defensive line protecting the Sanctuary web' },
      { name: 'Veteran Retinue', role: 'With Rivvy Dinari, max-level units cost no Solari upkeep' },
    ],
    combatTips: [
      'Fight only to complete or defend Sanctuary rings — territory is your win condition, not kills.',
      'You cannot demolish capitals; eliminate rivals through assassination operations instead.',
      'Keep wars alive with neighbors you still need land from — once you truce, you can never restart.',
      'Late game, shift agents to Counterintelligence; everyone will be probing your web.',
    ],
    councilors: [
      {
        name: 'Sanya Ecaz',
        effect: 'Masterpieces cost 40% less and generate 15 Solari daily each.',
      },
      {
        name: 'Rivvy Dinari',
        effect: 'Units start with bonus experience; max-level units require no Solari upkeep.',
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
      early:
        'Train Ornithopters and scan the whole map before committing. Mark map-edge neutral ' +
        'villages — they need only 2-3 bordering regions to ring. Expand on Authority ' +
        'surplus and keep conflicts open with neighbors whose land you need.',
      mid:
        'Complete Sanctuary rings and start Masterpieces under Sanya Ecaz. Place the Garden ' +
        'Resort where Sanctuaries and Masterpieces cluster. Negotiate truces with distant ' +
        'factions only — remember, every truce is permanent peace.',
      late:
        'Run Influence and Solari production in parallel toward political or economic ' +
        'victory. Defend the web, counter-spy relentlessly, and remove existential threats ' +
        'with assassinations rather than armies.',
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
  },
  {
    id: 'vernius',
    name: 'House Vernius of Ix',
    archetype: 'Technology & Drones',
    leader: 'Earl Rhombur Vernius',
    color: '#43c6c0',
    difficulty: 2,
    tagline: 'The desert is a network problem.',
    overview:
      'The Ixian confederacy fights with machines where others spend men. Vernius spreads ' +
      'a Nodal Network across Arrakis, harvests spice with worm-immune drones that need no ' +
      'refinery, and races down the tech tree to patent — and deny — the galaxy\'s ' +
      'innovations.',
    strengths: [
      'Harvester drones are immune to sandworm attacks',
      'Drones harvest any owned or neutral spice field with no refinery required',
      'Fastest research potential in the game with Knowledge-focused play',
      'Patents at 5,000 Hegemony buy unique developments for 600 Solari each',
      'At 10,000 Hegemony, obfuscate a development to nullify it for every rival',
    ],
    weaknesses: [
      'Everything depends on the Network — severed tethers shut down whole regions',
      'Runs on Fuel Cells far more than Manpower; energy logistics are life and death',
      'Drone units trade differently than infantry and punish sloppy positioning',
    ],
    mechanics: [
      {
        name: 'Nodal Network',
        description:
          'The S-Vault main base anchors a network extended by Neural Nodes in controlled ' +
          'regions. Units and harvesters must stay Tethered to function at full strength — ' +
          'the empire is the network.',
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
          'standing to obfuscate a development, nullifying its effects for all players — ' +
          'deny your rivals\' best tech.',
      },
    ],
    units: [
      { name: 'Fighting Mek', role: 'Self-learning combat drone forming the front line' },
      { name: 'Railgun Drone', role: 'Electromagnetic projectiles at range' },
      { name: 'Resonance Drone', role: 'Electrostatic support effects that tilt engagements' },
    ],
    combatTips: [
      'Fight inside your Network — Tethered units operate at full strength, stranded ones don\'t.',
      'Extend Neural Nodes toward objectives before the army moves, not after.',
      'Your harvesters ignore worms: contest spice fields other factions are forced to abandon.',
      'Protect Fuel Cell production like other factions protect water — it is your manpower.',
    ],
    councilors: [
      {
        name: 'Tessia Vernius',
        effect: 'Bene Gesserit councilor with unique espionage abilities.',
      },
      {
        name: 'Bronso Vernius',
        effect: 'Accelerates Knowledge output for the tech-rush core strategy.',
      },
      {
        name: 'Bolig Avati',
        effect: 'Strengthens the drone economy and network infrastructure.',
      },
      {
        name: 'Cammar Pilru',
        effect: 'Diplomatic reach for an otherwise insular technocracy.',
      },
    ],
    gamePlan: {
      early:
        'Prioritize regions with Fuel Cell Factory slots — Fuel Cells are your Manpower. ' +
        'Without Geothermal Vents, research Water Batteries and build Dew Collectors. Lay ' +
        'Neural Nodes as you expand and put drones on every reachable spice field.',
      mid:
        'Rush the tech tree on Solari and Knowledge production. Your worm-immune, ' +
        'refinery-free harvesting funds research no one else can match. Stretch the Network ' +
        'toward contested spice and future battlegrounds.',
      late:
        'At 5,000 Hegemony, buy patents aggressively at 600 Solari each. At 10,000, ' +
        'obfuscate the development your strongest rival depends on. Convert the tech lead ' +
        'into hegemony — or into drone armies nobody can out-engineer.',
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
  },
];

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
    label: 'Dune: Spice Wars Wiki — Factions',
    url: 'https://dunespicewars.fandom.com/wiki/Factions',
  },
];
