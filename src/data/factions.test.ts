import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { factionById, factions } from './factions';

describe('faction data integrity', () => {
  it('has unique ids', () => {
    expect(factionById.size).toBe(factions.length);
  });

  it('has unique accent colors in valid hex form', () => {
    const colors = factions.map((f) => f.color);
    expect(new Set(colors).size).toBe(colors.length);
    for (const color of colors) {
      expect(color).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it('gives every faction a matchup against every other faction and none against itself', () => {
    for (const faction of factions) {
      const enemyIds = faction.matchups.map((m) => m.enemyId);
      expect(new Set(enemyIds).size).toBe(enemyIds.length);
      expect(enemyIds).not.toContain(faction.id);
      const expected = factions.filter((f) => f.id !== faction.id).map((f) => f.id);
      expect(enemyIds.sort()).toEqual(expected.sort());
    }
  });

  it('only references existing factions from patent plans', () => {
    for (const faction of factions) {
      for (const dev of faction.devOrder) {
        for (const target of dev.patentPlan?.byEnemy ?? []) {
          expect(factionById.has(target.enemyId), `${faction.id} → ${target.enemyId}`).toBe(true);
        }
      }
    }
  });

  it('points every image at a file that exists in public/', () => {
    for (const faction of factions) {
      const path = join(process.cwd(), 'public', faction.image);
      expect(existsSync(path), `${faction.id}: ${faction.image}`).toBe(true);
    }
  });

  it('has non-empty strategy content everywhere', () => {
    for (const faction of factions) {
      expect(faction.buildOrder.length).toBeGreaterThan(0);
      expect(faction.devOrder.length).toBeGreaterThan(0);
      expect(faction.units.length).toBeGreaterThan(0);
      expect(faction.councilors.length).toBeGreaterThan(0);
      expect(faction.victoryPaths.length).toBeGreaterThan(0);
      expect(faction.gamePlan.early.length).toBeGreaterThan(0);
      expect(faction.gamePlan.mid.length).toBeGreaterThan(0);
      expect(faction.gamePlan.late.length).toBeGreaterThan(0);
    }
  });
});
