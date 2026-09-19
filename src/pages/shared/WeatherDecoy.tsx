import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '@/state/AppStateContext';

/**
 * Constraint 10: Quick Exit clears the view and lands here. The content is
 * inert filler chosen to look unremarkable on a glance at someone's screen —
 * it makes no claim about real weather and carries no `status` envelope,
 * unlike every other content file, because it isn't information the user
 * reads; it's a disguise. Nothing here is fetched or geolocated (constraint
 * 3/6 apply regardless of how mundane the screen looks).
 */
const FORECAST = [
  { day: 'Today', high: 32, low: 26, sky: 'Thundery showers' },
  { day: 'Tomorrow', high: 31, low: 25, sky: 'Partly cloudy' },
  { day: 'Wed', high: 33, low: 26, sky: 'Sunny' },
  { day: 'Thu', high: 31, low: 25, sky: 'Thundery showers' },
];

function PinPrompt({ pin, onUnlock, onCancel }: { pin: string; onUnlock: () => void; onCancel: () => void }): JSX.Element {
  const [entry, setEntry] = useState('');
  const [wrong, setWrong] = useState(false);

  function submit(): void {
    if (entry === pin) {
      onUnlock();
    } else {
      setWrong(true);
      setEntry('');
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      <div className="w-full max-w-xs rounded-2xl bg-white p-5 text-slate-800 shadow-xl">
        <h2 className="text-base font-semibold">Enter PIN</h2>
        <p className="mt-1 text-sm text-slate-500">to leave the weather app</p>
        <input
          type="password"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={4}
          value={entry}
          onChange={(event) => {
            setWrong(false);
            setEntry(event.target.value.replace(/\D/g, '').slice(0, 4));
          }}
          className="tap-target mt-4 w-full rounded-lg border border-slate-300 px-3 py-2 text-center text-2xl tracking-[0.5em]"
          aria-label="4-digit PIN"
          autoFocus
        />
        {wrong ? <p className="mt-2 text-sm text-red-600">That's not it.</p> : null}
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="tap-target flex-1 rounded-lg border border-slate-300 py-2 text-sm font-medium text-slate-600"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={entry.length !== 4}
            className="tap-target flex-1 rounded-lg bg-slate-800 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            Unlock
          </button>
        </div>
      </div>
    </div>
  );
}

export function WeatherDecoy(): JSX.Element {
  const { state } = useAppState();
  const navigate = useNavigate();
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const pin = state.settings.pin;
  const fallback = state.track === 'youth' ? '/youth' : '/recovery';

  function handleReturn(): void {
    if (pin) setShowPinPrompt(true);
    else navigate(fallback, { replace: true });
  }

  return (
    <div className="min-h-dvh bg-gradient-to-b from-sky-100 to-sky-50 px-5 pb-16 pt-10 text-slate-800">
      <p className="text-sm text-slate-500">Singapore</p>
      <h1 className="mt-1 text-6xl font-light tracking-tight">32°</h1>
      <p className="mt-1 text-lg text-slate-600">Thundery showers</p>
      <p className="mt-0.5 text-sm text-slate-400">H:32° L:26°</p>

      <div className="mt-8 rounded-2xl bg-white/60 p-4 backdrop-blur">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">4-day forecast</p>
        <ul className="mt-2 divide-y divide-slate-200">
          {FORECAST.map((f) => (
            <li key={f.day} className="flex items-center justify-between py-2.5 text-sm">
              <span className="w-20 text-slate-600">{f.day}</span>
              <span className="flex-1 text-slate-500">{f.sky}</span>
              <span className="tabular-nums text-slate-700">
                {f.high}° <span className="text-slate-400">{f.low}°</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-10 text-center text-xs text-slate-400">
        <button type="button" onClick={handleReturn} className="tap-target underline underline-offset-2">
          Back to app
        </button>
      </p>

      {showPinPrompt && pin ? (
        <PinPrompt
          pin={pin}
          onUnlock={() => navigate(fallback, { replace: true })}
          onCancel={() => setShowPinPrompt(false)}
        />
      ) : null}
    </div>
  );
}
