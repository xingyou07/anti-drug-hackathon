/** Vibration is a progressive enhancement; most iOS browsers have no API. */
export function tap(pattern: number | number[] = 12): void {
  try {
    navigator.vibrate?.(pattern);
  } catch {
    /* ignore */
  }
}
