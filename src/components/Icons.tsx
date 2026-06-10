import type { ReactNode } from 'react';
import type { UnitRole } from '../data/factions';
import { ROLE_LABELS } from '../data/factions';

const ROLE_PATHS: Record<UnitRole, ReactNode> = {
  melee: (
    <>
      <path d="M3 13 13 3M5 3H3v2M11 13h2v-2" />
      <path d="M3 3l10 10" />
    </>
  ),
  ranged: (
    <>
      <circle cx="8" cy="8" r="4.5" />
      <path d="M8 1v3M8 12v3M1 8h3M12 8h3" />
    </>
  ),
  stealth: (
    <>
      <path d="M2 8c1.6-2.6 3.6-4 6-4s4.4 1.4 6 4c-1.6 2.6-3.6 4-6 4S3.6 10.6 2 8Z" />
      <path d="M3 14 13 2" />
    </>
  ),
  support: (
    <>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 5v6M5 8h6" />
    </>
  ),
  siege: (
    <>
      <circle cx="6" cy="10" r="3.5" />
      <path d="M8.5 7.5 13 3M13 3h-3M13 3v3" />
    </>
  ),
  elite: (
    <path d="M8 1.5 9.9 5.8l4.6.4-3.5 3 1.1 4.5L8 11.3l-4.1 2.4 1.1-4.5-3.5-3 4.6-.4L8 1.5Z" />
  ),
};

export function RoleIcon({ role }: { role: UnitRole }) {
  return (
    <svg
      className={`role-icon role-${role}`}
      viewBox="0 0 16 16"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={ROLE_LABELS[role]}
    >
      <title>{ROLE_LABELS[role]}</title>
      {ROLE_PATHS[role]}
    </svg>
  );
}
