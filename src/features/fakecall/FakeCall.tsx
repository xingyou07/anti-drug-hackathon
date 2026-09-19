import { useEffect, useState } from 'react';
import { IncomingCall } from './IncomingCall';
import { ToolScreen } from '@/components/ToolScreen';
import { fakeCallContent } from '@/content';
import { formatDuration } from '@/lib/time';
import { useAppState } from '@/state/AppStateContext';

type Stage = 'setup' | 'armed' | 'ringing';

export function FakeCall(): JSX.Element {
  const { state, dispatch } = useAppState();
  const [stage, setStage] = useState<Stage>('setup');
  const [caller, setCaller] = useState(state.recovery.fakeCallCaller ?? 'Mum');
  const [delay, setDelay] = useState(15);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (stage !== 'armed') return;
    const id = window.setInterval(() => {
      setCountdown((value) => {
        if (value > 1) return value - 1;
        setStage('ringing');
        return 0;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [stage]);

  if (stage === 'ringing') {
    return <IncomingCall caller={caller} onEnd={() => setStage('setup')} />;
  }

  if (stage === 'armed') {
    return (
      <ToolScreen backTo="/recovery" title="Armed" status={fakeCallContent.status}>
        <div className="px-4 text-center">
          <p className="text-6xl font-bold tabular-nums">{formatDuration(countdown)}</p>
          <p className="mt-3 leading-relaxed text-muted">{fakeCallContent.armedLabel}</p>
          <p className="mt-1 text-sm text-subtle">
            {caller} will call. Leave this screen open.
          </p>
          <button
            type="button"
            onClick={() => setStage('setup')}
            className="tap-target mt-6 w-full rounded-xl2 border border-line px-4 py-3 font-semibold transition hover:bg-ink-800"
          >
            Cancel
          </button>
        </div>
      </ToolScreen>
    );
  }

  return (
    <ToolScreen
      backTo="/recovery"
      title={fakeCallContent.title}
      lede={fakeCallContent.lede}
      status={fakeCallContent.status}
    >
      <div className="px-4">
        <label htmlFor="caller-name" className="text-sm font-semibold uppercase tracking-wide text-subtle">
          Who's calling
        </label>
        <input
          id="caller-name"
          type="text"
          value={caller}
          maxLength={24}
          onChange={(event) => setCaller(event.target.value)}
          className="tap-target mt-2 w-full rounded-xl2 border border-line bg-ink-900 px-4 py-3 text-lg text-fg placeholder:text-subtle"
          placeholder="Mum"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {fakeCallContent.callerPresets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setCaller(preset)}
              className={
                'tap-target rounded-full border px-4 py-2 text-sm font-medium transition ' +
                (preset === caller
                  ? 'border-accent-400 bg-ink-800 text-fg'
                  : 'border-line bg-ink-900 text-muted hover:text-fg')
              }
            >
              {preset}
            </button>
          ))}
        </div>

        <h2 className="mt-6 text-sm font-semibold uppercase tracking-wide text-subtle">
          Ring in
        </h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {fakeCallContent.delayOptions.map((option) => (
            <button
              key={option.seconds}
              type="button"
              aria-pressed={option.seconds === delay}
              onClick={() => setDelay(option.seconds)}
              className={
                'tap-target rounded-full border px-4 py-2 text-sm font-medium transition ' +
                (option.seconds === delay
                  ? 'border-accent-400 bg-ink-800 text-fg'
                  : 'border-line bg-ink-900 text-muted hover:text-fg')
              }
            >
              {option.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          disabled={caller.trim().length === 0}
          onClick={() => {
            dispatch({ type: 'SET_FAKE_CALL_CALLER', caller: caller.trim() });
            setCountdown(delay);
            setStage('armed');
          }}
          className="tap-target mt-6 w-full rounded-xl2 bg-accent-600 px-4 py-3.5 text-lg font-semibold text-ink-950 transition hover:bg-accent-500 disabled:opacity-50"
        >
          Set it up
        </button>

        <div className="mt-5 rounded-xl2 border border-line bg-ink-900 p-4">
          <p className="text-sm leading-relaxed text-muted">{fakeCallContent.audioNote}</p>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-subtle">
          When it rings, the line to use is: &ldquo;{fakeCallContent.exitLine}&rdquo;
        </p>
      </div>
    </ToolScreen>
  );
}
