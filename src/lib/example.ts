/** Clamps a score into the inclusive range [min, max]. */
export function clampScore(value: number, min: number, max: number): number {
  if (min > max) {
    throw new RangeError(`min (${min}) must not exceed max (${max})`);
  }
  return Math.min(Math.max(value, min), max);
}
