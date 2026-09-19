import { useEffect, useState } from 'react';
import { WaveCurve } from './WaveCurve';
import { ToolScreen } from '@/components/ToolScreen';
import { urgeSurfContent } from '@/content';
import { formatDuration, singaporeDateKey } from '@/lib/time';
import { useHaptics } from '@/lib/useHaptics';
import { useAppState } from '@/state/AppStateContext';
import { useCrisisSheet } from '@/state/CrisisSheetContext';

type Phase = 'idle' | 'riding' | 'paused' | 'done' | 'stopped';

const PROMPT_INTERVAL_SECONDS = 45;

/** Below this, there is nothing much to have ridden; above it, it counts. */
const MIN_SECONDS_TO_COUNT = 60;

export function UrgeSurf(): JSX.Element {
  const { state, dispatch } = useAppState();
  const { open: openCrisisSheet } = useCrisisSheet();
  const haptic = useHaptics();
  const [phase, setPhase] = useState<Phase>('idle');
  const [elapsed, setElapsed] = useState(0);

  const total = urgeSurfContent.durationSeconds;
  const progress = Math.min(elapsed / total, 1);
  const remaining = Math.max(total - elapsed, 0);
  const totalWaves = Object.values(state.recovery.wavesRidden).reduce((sum, n) => sum + n, 0);

  useEffect(() => {
    if (phase !== 'riding') return;
    const id = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'riding' || elapsed < total) return;
    setPhase('done');
    haptic([20, 60, 20]);
    dispatch({ type: 'RECORD_WAVE', date: singaporeDateKey() });
  }, [phase, elapsed, total, dispatch, haptic]);

  const stopEarly = (): void => {
    // Riding part of a wave is still riding it, so short sessions count too.
    // Nothing here is allowed to read as a failure.
    if (elapsed >= MIN_SECONDS_TO_COUNT) {
      dispatch({ type: 'RECORD_WAVE', date: singaporeDateKey() });
    }
    setPhase('stopped');
  };

  const restart = (): void => {
    setElapsed(0);
    setPhase('idle');
  };

  const promptIndex =
    Math.floor(elapsed / PROMPT_INTERVAL_SECONDS) % urgeSurfContent.prompts.length;
  const prompt = urgeSurfContent.prompts[promptIndex] ?? urgeSurfContent.prompts[0];

  if (phase === 'done' || phase === 'stopped') {
    const copy = phase === 'done' ? urgeSurfContent.completion : urgeSurfContent.earlyStop;
    return (
      <ToolScreen
        backTo="/recovery"
        title={copy.title}
        status={urgeSurfContent.status}
      >
        <div className="px-4">
          <p className="leading-relaxed text-muted">{copy.body}</p>
          <div className="mt-5 rounded-xl2 border border-line bg-ink-900 p-4">
            <p className="text-sm text-muted">{urgeSurfContent.completion.counterLabel}</p>
            <p className="text-3xl font-bold tabular-nums">{totalWaves}</p>
          </div>
          <button
            type="button"
            onClick={restart}
            className="tap-target mt-5 w-full rounded-xl2 border border-line px-4 py-3 font-semibold transition hover:bg-ink-800"
          >
            Ride another one
          </button>
        </div>
      </ToolScreen>
    );
  }

  return (
    <ToolScreen
      backTo="/recovery"
      title={urgeSurfContent.title}
      lede={phase === 'idle' ? urgeSurfContent.lede : undefined}
      status={urgeSurfContent.status}
    >
      <WaveCurve progress={progress} />

      <div className="mt-5 px-4 text-center">
        <p className="text-5xl font-bold tabular-nums tracking-tight" aria-live="off">
          {formatDuration(remaining)}
        </p>
        <p className="mt-1 text-sm text-muted">
          {phase === 'idle' ? `${formatDuration(total)} to ride` : 'left'}
        </p>
      </div>

      {phase !== 'idle' ? (
        <div className="mx-4 mt-5 min-h-[92px] rounded-xl2 border border-line bg-ink-900 p-4">
          <p className="text-xs uppercase tracking-wide text-subtle">Something else to do</p>
          <p aria-live="polite" className="mt-1.5 leading-relaxed">
            {prompt}
          </p>
        </div>
      ) : null}

      <div className="mt-5 flex flex-col gap-2 px-4">
        {phase === 'idle' ? (
          <button
            type="button"
            onClick={() => {
              haptic();
              setPhase('riding');
            }}
            className="tap-target w-full rounded-xl2 bg-accent-600 px-4 py-3.5 text-lg font-semibold text-ink-950 transition hover:bg-accent-500"
          >
            {urgeSurfContent.startLabel}
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPhase(phase === 'riding' ? 'paused' : 'riding')}
              className="tap-target flex-1 rounded-xl2 border border-line px-4 py-3 font-semibold transition hover:bg-ink-800"
            >
              {phase === 'riding' ? 'Pause' : 'Resume'}
            </button>
            <button
              type="button"
              onClick={stopEarly}
              className="tap-target flex-1 rounded-xl2 border border-line px-4 py-3 font-semibold transition hover:bg-ink-800"
            >
              I'm done
            </button>
          </div>
        )}

        {/* Spec: always visible, at every phase of the timer. */}
        <button
          type="button"
          onClick={openCrisisSheet}
          className="tap-target w-full rounded-xl2 bg-crisis-600 px-4 py-3.5 text-lg font-semibold text-white transition hover:bg-crisis-500"
        >
          Call someone
        </button>
      </div>
    </ToolScreen>
  );
}
