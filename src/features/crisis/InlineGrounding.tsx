import { useState } from 'react';
import { tap } from '@/lib/haptics';

/**
 * A compact 5-4-3-2-1 that lives inside the crisis sheet. The full Recovery
 * screen is richer; this one exists so the tool is reachable without leaving
 * the sheet, and it must work with no network.
 */
const STEPS = [
  { count: 5, sense: 'things you can see', hint: 'Name them out loud if you can.' },
  { count: 4, sense: 'things you can feel', hint: 'The floor, your sleeve, the air.' },
  { count: 3, sense: 'things you can hear', hint: 'Near ones and far ones.' },
  { count: 2, sense: 'things you can smell', hint: "Or two smells you'd recognise anywhere." },
  { count: 1, sense: 'thing you can taste', hint: 'Or one slow breath instead.' },
] as const;

export function InlineGrounding({ onDone }: { onDone: () => void }): JSX.Element {
  const [index, setIndex] = useState(0);
  const step = STEPS[index];

  if (!step) return <div />;

  const isLast = index === STEPS.length - 1;

  return (
    <div className="rounded-xl2 border border-line bg-ink-900 p-4">
      <p className="text-sm text-subtle">
        Step {index + 1} of {STEPS.length}
      </p>
      <p className="mt-1 text-2xl font-semibold">
        {step.count} {step.sense}
      </p>
      <p className="mt-1 text-sm text-muted">{step.hint}</p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="tap-target flex-1 rounded-lg bg-accent-600 px-4 py-2.5 font-semibold text-ink-950 transition hover:bg-accent-500"
          onClick={() => {
            tap();
            if (isLast) onDone();
            else setIndex(index + 1);
          }}
        >
          {isLast ? 'Done' : 'Next'}
        </button>
        <button
          type="button"
          className="tap-target rounded-lg border border-line px-4 py-2.5 text-muted transition hover:text-fg"
          onClick={onDone}
        >
          Close
        </button>
      </div>
    </div>
  );
}
