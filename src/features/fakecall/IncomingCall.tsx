import { useEffect, useState } from 'react';
import { fakeCallContent } from '@/content';
import { usePrefersReducedMotion } from '@/lib/motion';
import { formatDuration } from '@/lib/time';
import { useHaptics } from '@/lib/useHaptics';

/**
 * Deliberately silent — see `audioNote` in the content file. The screen has to
 * survive a glance from across a table, so it covers everything including the
 * crisis button, which is the one place in the app that is allowed to happen:
 * the whole point is that it looks like the phone's own call screen.
 */
export function IncomingCall({
  caller,
  onEnd,
}: {
  caller: string;
  onEnd: () => void;
}): JSX.Element {
  const haptic = useHaptics();
  const reducedMotion = usePrefersReducedMotion();
  const [answered, setAnswered] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (answered) return;
    // Repeating buzz stands in for a ringtone.
    const id = window.setInterval(() => haptic([400, 200, 400]), 2000);
    haptic([400, 200, 400]);
    return () => window.clearInterval(id);
  }, [answered, haptic]);

  useEffect(() => {
    if (!answered) return;
    const id = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(id);
  }, [answered]);

  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-between bg-ink-950 px-6 py-16">
      <div className="flex flex-col items-center">
        <p className="text-sm uppercase tracking-[0.2em] text-subtle">
          {answered ? 'Call in progress' : 'Incoming call'}
        </p>
        <div
          aria-hidden="true"
          className={
            'mt-8 flex h-28 w-28 items-center justify-center rounded-full bg-ink-800 text-4xl font-semibold ' +
            (answered || reducedMotion ? '' : 'motion-safe:animate-pulse')
          }
        >
          {caller.trim().charAt(0).toUpperCase() || '?'}
        </div>
        <h1 className="mt-6 text-3xl font-semibold">{caller}</h1>
        <p className="mt-2 tabular-nums text-muted">
          {answered ? formatDuration(seconds) : 'mobile'}
        </p>
      </div>

      {answered ? (
        <p className="max-w-xs text-center text-sm leading-relaxed text-subtle">
          Nobody is on the line. Say the words you need to say and walk.
        </p>
      ) : (
        <p className="max-w-xs text-center text-sm leading-relaxed text-subtle">
          &ldquo;{fakeCallContent.exitLine}&rdquo;
        </p>
      )}

      <div className="flex w-full max-w-xs items-center justify-around">
        {answered ? (
          <button
            type="button"
            onClick={onEnd}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-crisis-600 text-2xl text-white transition hover:bg-crisis-500"
          >
            <span aria-hidden="true">✕</span>
            <span className="sr-only">End call</span>
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={onEnd}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-crisis-600 text-2xl text-white transition hover:bg-crisis-500"
            >
              <span aria-hidden="true">✕</span>
              <span className="sr-only">Decline call</span>
            </button>
            <button
              type="button"
              onClick={() => {
                haptic();
                setAnswered(true);
              }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-600 text-2xl text-ink-950 transition hover:bg-accent-500"
            >
              <span aria-hidden="true">✆</span>
              <span className="sr-only">Answer call</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
