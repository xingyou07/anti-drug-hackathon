import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlaceholderChip } from '@/components/PlaceholderChip';
import { onboardingContent } from '@/content';
import { useAppState } from '@/state/AppStateContext';
import type { Track } from '@/state/types';

export function Onboarding(): JSX.Element {
  const [index, setIndex] = useState(0);
  const { dispatch } = useAppState();
  const navigate = useNavigate();
  const step = onboardingContent.steps[index];

  if (!step) return <div />;

  const choose = (track: Track): void => {
    dispatch({ type: 'CHOOSE_TRACK', track });
    dispatch({ type: 'COMPLETE_ONBOARDING' });
    navigate(track === 'youth' ? '/youth' : '/recovery', { replace: true });
  };

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4 pb-32 pt-10">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-400">
        The 10%
      </p>

      <div className="mt-8 flex-1">
        <div className="flex items-center gap-2" aria-hidden="true">
          {onboardingContent.steps.map((s, i) => (
            <span
              key={s.id}
              className={`h-1 flex-1 rounded-full ${i <= index ? 'bg-accent-400' : 'bg-ink-800'}`}
            />
          ))}
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight">{step.title}</h1>
        <div className="mt-4 flex flex-col gap-3 text-lg leading-relaxed text-muted">
          {step.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-4">
          <PlaceholderChip status={onboardingContent.status} />
        </div>

        {step.options ? (
          <div className="mt-8 flex flex-col gap-3">
            {step.options.map((option) => (
              <button
                key={option.track}
                type="button"
                onClick={() => choose(option.track)}
                className="tap-target rounded-xl2 border border-line bg-ink-900 p-4 text-left transition hover:border-accent-400 hover:bg-ink-800"
              >
                <span className="block text-lg font-semibold">{option.label}</span>
                <span className="mt-1 block text-sm text-muted">{option.detail}</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {step.options ? null : (
        <button
          type="button"
          onClick={() => setIndex(index + 1)}
          className="tap-target mt-8 w-full rounded-xl2 bg-accent-600 px-4 py-3.5 text-lg font-semibold text-ink-950 transition hover:bg-accent-500"
        >
          Continue
        </button>
      )}
    </div>
  );
}
