import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/motion';

/**
 * Box breathing, 4-4-4-4, inside the crisis sheet. The full Recovery screen
 * also offers the physiological sigh; here we keep one pattern so the sheet
 * stays a single decision.
 */
const PHASES = [
  { label: 'Breathe in', grow: true },
  { label: 'Hold', grow: true },
  { label: 'Breathe out', grow: false },
  { label: 'Hold', grow: false },
] as const;

const PHASE_SECONDS = 4;
const CYCLE_SECONDS = PHASES.length * PHASE_SECONDS;

export function InlineBreathing({ onDone }: { onDone: () => void }): JSX.Element {
  const [elapsed, setElapsed] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  // One counter, phase derived from it: no nested state updates, so React's
  // double-invoked updaters in StrictMode cannot skip or double a phase.
  useEffect(() => {
    const id = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const position = elapsed % CYCLE_SECONDS;
  const phase = PHASES[Math.floor(position / PHASE_SECONDS)] ?? PHASES[0];
  const remaining = PHASE_SECONDS - (position % PHASE_SECONDS);

  return (
    <div className="rounded-xl2 border border-line bg-ink-900 p-4 text-center">
      <div className="flex h-36 items-center justify-center" aria-hidden="true">
        {reducedMotion ? (
          // Constraint 9: no pulsing shape, just the count.
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-accent-400 text-3xl font-semibold tabular-nums">
            {remaining}
          </div>
        ) : (
          <div
            className={`h-28 w-28 rounded-full bg-accent-500/25 ring-2 ring-accent-400 transition-transform duration-[3800ms] ease-in-out ${
              phase.grow ? 'scale-100' : 'scale-50'
            }`}
          />
        )}
      </div>
      <p aria-live="polite" className="text-xl font-semibold">
        {phase.label}
        <span className="ml-2 tabular-nums text-muted">{remaining}</span>
      </p>
      <p className="mt-1 text-sm text-muted">Four in, four hold, four out, four hold.</p>
      <button
        type="button"
        className="tap-target mt-4 w-full rounded-lg border border-line px-4 py-2.5 text-muted transition hover:text-fg"
        onClick={onDone}
      >
        Close
      </button>
    </div>
  );
}
