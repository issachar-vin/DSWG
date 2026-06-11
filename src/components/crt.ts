/**
 * CRT screen animations shared by the home grid cards and the detail dashboard.
 *
 * crtBoot plays the power-off sequence in reverse (bright scanline expands sideways,
 * then opens vertically) and settles with the holographic flicker.
 */

export const crtBoot = (delay: number) => ({
  opacity: [0.9, 1, 1, 1, 0.3, 1, 0.6, 1],
  scaleX: [0, 1, 1, 1, 1, 1, 1, 1],
  scaleY: [0.012, 0.012, 1.04, 1, 1, 1, 1, 1],
  filter: [
    'brightness(6) blur(1px)',
    'brightness(4) blur(1px)',
    'brightness(2) blur(3px)',
    'brightness(1.5) blur(1px)',
    'brightness(0.7) blur(1px)',
    'brightness(1.5) blur(0px)',
    'brightness(0.85) blur(0px)',
    'brightness(1) blur(0px)',
  ],
  transition: {
    duration: 0.55,
    delay,
    times: [0, 0.28, 0.42, 0.52, 0.66, 0.8, 0.9, 1],
    ease: 'linear' as const,
  },
});

/** CRT power-off: flash bright, collapse to a scanline, then to a dot. */
export const crtOff = (delay: number) => ({
  scaleY: [1, 1.03, 0.012, 0.012],
  scaleX: [1, 1, 1, 0],
  opacity: [1, 1, 1, 0],
  filter: ['brightness(1)', 'brightness(2.2)', 'brightness(6)', 'brightness(0.5)'],
  transition: {
    duration: 0.3,
    delay,
    times: [0, 0.25, 0.55, 1],
    ease: 'easeIn' as const,
  },
});
