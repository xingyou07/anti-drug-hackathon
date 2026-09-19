import { useEffect, useMemo, useState } from 'react';
import { ToolScreen } from '@/components/ToolScreen';
import { breathingContent } from '@/content';
import type { BreathingPattern } from '@/content/types';
import { usePrefersReducedMotion } from '@/lib/motion';
import { useHaptics } from '@/lib/useHaptics';
import { useAppState } from '@/state/AppStateContext';

/** Walks the phase list from a single elapsed counter, so there is one timer. */
function phaseAt(pattern: BreathingPattern, elapsed: number): { index: number; remaining: number } {
  const cycle = pattern.phases.reduce((sum, p) => sum + p.seconds, 0);
  let position = cycle > 0 ? elapsed % cycle : 0;

  for (let i = 0; i < pattern.phases.length; i += 1) {
    const phase = pattern.phases[i];
    if (!phase) break;
    if (position < phase.seconds) return { index: i, remaining: phase.seconds - position };
    position -= phase.seconds;
  }

  return { index: 0, remaining: pattern.phases[0]?.seconds ?? 0 };
}

export function Breathing(): JSX.Element {
  const { state, dispatch } = useAppState();
  const haptic = useHaptics();
  const reducedMotion = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState<BreathingPattern['id']>(state.settings.breathingDefault);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const pattern = useMemo(
    () => breathingContent.patterns.find((p) => p.id === activeId) ?? breathingContent.patterns[0],
    [activeId],
  );

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  const { index, remaining } = pattern
    ? phaseAt(pattern, elapsed)
    : { index: 0, remaining: 0 };

  // Buzz on each phase change so the pattern can be followed with the screen off.
  useEffect(() => {
    if (running) haptic(10);
  }, [index, running, haptic]);

  if (!pattern) return <div />;

  const phase = pattern.phases[index] ?? pattern.phases[0];
  const isDefault = state.settings.breathingDefault === activeId;

  return (
    <ToolScreen
      backTo="/recovery"
      title="Breathe"
      lede="Two patterns. Neither is better than the other — pick the one that doesn't fight you."
      status={breathingContent.status}
    >
      <div className="px-4">
        <div role="tablist" aria-label="Breathing pattern" className="flex gap-2">
          {breathingContent.patterns.map((option) => (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={option.id === activeId}
              onClick={() => {
                setActiveId(option.id);
                setElapsed(0);
                setRunning(false);
              }}
              className={
                option.id === activeId
                  ? 'tap-target flex-1 rounded-xl2 border border-accent-400 bg-ink-800 px-3 py-3 text-left'
                  : 'tap-target flex-1 rounded-xl2 border border-line bg-ink-900 px-3 py-3 text-left transition hover:bg-ink-800'
              }
            >
              <span className="block font-semibold">{option.name}</span>
              <span className="mt-0.5 block text-xs text-muted">{option.summary}</span>
            </button>
          ))}
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted">{pattern.detail}</p>

        <div className="mt-6 flex h-56 items-center justify-center" aria-hidden="true">
          {reducedMotion ? (
            <div className="flex h-36 w-36 items-center justify-center rounded-full border-2 border-accent-400 text-5xl font-bold tabular-nums">
              {remaining}
            </div>
          ) : (
            <div
              className={
                'h-44 w-44 rounded-full bg-accent-500/20 ring-2 ring-accent-400 transition-transform ease-in-out ' +
                (phase?.grow ? 'scale-100' : 'scale-[0.45]')
              }
              style={{ transitionDuration: String(Math.max((phase?.seconds ?? 4) - 0.2, 0.2) * 1000) + 'ms' }}
            />
          )}
        </div>

        <p aria-live="polite" className="text-center text-2xl font-semibold">
          {running ? phase?.label : 'Ready when you are'}
          {running ? <span className="ml-2 tabular-nums text-muted">{remaining}</span> : null}
        </p>

        <button
          type="button"
          onClick={() => {
            haptic();
            if (running) {
              setRunning(false);
            } else {
              setElapsed(0);
              setRunning(true);
            }
          }}
          className="tap-target mt-6 w-full rounded-xl2 bg-accent-600 px-4 py-3.5 text-lg font-semibold text-ink-950 transition hover:bg-accent-500"
        >
          {running ? 'Stop' : 'Start'}
        </button>

        {isDefault ? (
          <p className="mt-4 text-center text-sm text-subtle">This is what the app opens with.</p>
        ) : (
          <button
            type="button"
            onClick={() =>
              dispatch({ type: 'UPDATE_SETTINGS', settings: { breathingDefault: activeId } })
            }
            className="tap-target mt-4 w-full rounded-xl2 border border-line px-4 py-3 text-sm font-medium text-muted transition hover:text-fg"
          >
            Open with {pattern.name} instead
          </button>
        )}
      </div>
    </ToolScreen>
  );
}
