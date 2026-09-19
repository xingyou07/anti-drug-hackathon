import { useState } from 'react';
import { ToolScreen } from '@/components/ToolScreen';
import { groundingContent } from '@/content';
import { useHaptics } from '@/lib/useHaptics';

export function Grounding(): JSX.Element {
  const haptic = useHaptics();
  const [index, setIndex] = useState(0);
  const [ticked, setTicked] = useState<number[]>([]);

  const step = groundingContent.steps[index];
  const isLast = index === groundingContent.steps.length - 1;

  const restart = (): void => {
    setIndex(0);
    setTicked([]);
  };

  if (!step) {
    return (
      <ToolScreen
        backTo="/recovery"
        title={groundingContent.completion.title}
        status={groundingContent.status}
      >
        <div className="px-4">
          <p className="leading-relaxed text-muted">{groundingContent.completion.body}</p>
          <button
            type="button"
            onClick={restart}
            className="tap-target mt-5 w-full rounded-xl2 bg-accent-600 px-4 py-3.5 text-lg font-semibold text-ink-950 transition hover:bg-accent-500"
          >
            Run it again
          </button>
        </div>
      </ToolScreen>
    );
  }

  return (
    <ToolScreen
      backTo="/recovery"
      title={groundingContent.title}
      lede={groundingContent.lede}
      status={groundingContent.status}
    >
      <div className="px-4">
        <div className="flex items-center gap-2" aria-hidden="true">
          {groundingContent.steps.map((s, i) => (
            <span
              key={s.sense}
              className={
                'h-1 flex-1 rounded-full ' + (i <= index ? 'bg-accent-400' : 'bg-ink-800')
              }
            />
          ))}
        </div>

        <p className="mt-6 text-sm text-subtle">
          Step {index + 1} of {groundingContent.steps.length}
        </p>
        <h2 className="mt-1 text-3xl font-bold tracking-tight">
          {step.count} {step.sense}
        </h2>
        <p className="mt-2 leading-relaxed text-muted">{step.hint}</p>

        {/* Ticking is optional. The counting is the point, not the record — so
            nothing here is stored, and moving on does not require a full set. */}
        <ul className="mt-6 flex flex-col gap-2">
          {Array.from({ length: step.count }, (_, i) => i).map((slot) => {
            const isTicked = ticked.includes(slot);
            return (
              <li key={slot}>
                <button
                  type="button"
                  aria-pressed={isTicked}
                  onClick={() => {
                    haptic(8);
                    setTicked(isTicked ? ticked.filter((t) => t !== slot) : [...ticked, slot]);
                  }}
                  className={
                    'tap-target flex w-full items-center gap-3 rounded-xl2 border px-4 py-3 text-left transition ' +
                    (isTicked
                      ? 'border-accent-400 bg-ink-800 text-muted'
                      : 'border-line bg-ink-900 hover:bg-ink-800')
                  }
                >
                  <span
                    aria-hidden="true"
                    className={
                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm ' +
                      (isTicked ? 'border-accent-400 text-accent-400' : 'border-line')
                    }
                  >
                    {isTicked ? '✓' : slot + 1}
                  </span>
                  <span>{isTicked ? 'Got one' : 'Find one'}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => {
            haptic();
            setTicked([]);
            setIndex(index + 1);
          }}
          className="tap-target mt-5 w-full rounded-xl2 bg-accent-600 px-4 py-3.5 text-lg font-semibold text-ink-950 transition hover:bg-accent-500"
        >
          {isLast ? 'Finish' : 'Next'}
        </button>
      </div>
    </ToolScreen>
  );
}
