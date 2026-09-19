import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenHeader } from '@/components/ScreenHeader';
import { useAppState } from '@/state/AppStateContext';
import type { Track } from '@/state/types';

function PinSection(): JSX.Element {
  const { state, dispatch } = useAppState();
  const [draft, setDraft] = useState('');
  const hasPin = state.settings.pin !== null;

  function setPin(): void {
    if (draft.length !== 4) return;
    dispatch({ type: 'UPDATE_SETTINGS', settings: { pin: draft } });
    setDraft('');
  }

  function removePin(): void {
    dispatch({ type: 'UPDATE_SETTINGS', settings: { pin: null } });
  }

  return (
    <section className="rounded-xl2 border border-line bg-ink-900 p-4">
      <h2 className="font-semibold">PIN lock</h2>
      <p className="mt-1 text-sm leading-relaxed text-muted">
        This is a screen lock against someone glancing at your phone, not real security. Anyone
        who can unlock your phone another way can still get in. Used to return from Quick Exit.
      </p>
      {hasPin ? (
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-sm text-fg">A PIN is set.</span>
          <button
            type="button"
            onClick={removePin}
            className="tap-target rounded-lg border border-line px-3 py-2 text-sm font-medium text-muted transition hover:text-fg"
          >
            Remove PIN
          </button>
        </div>
      ) : (
        <div className="mt-3 flex items-center gap-2">
          <input
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            value={draft}
            onChange={(event) => setDraft(event.target.value.replace(/\D/g, '').slice(0, 4))}
            placeholder="4 digits"
            aria-label="Set a 4-digit PIN"
            className="tap-target w-28 rounded-lg border border-line bg-ink-950 px-3 py-2 text-center tracking-[0.4em] text-fg"
          />
          <button
            type="button"
            onClick={setPin}
            disabled={draft.length !== 4}
            className="tap-target rounded-lg bg-accent-600 px-4 py-2 text-sm font-semibold text-ink-950 disabled:opacity-40"
          >
            Set PIN
          </button>
        </div>
      )}
    </section>
  );
}

function TrackSection(): JSX.Element {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();
  const [confirming, setConfirming] = useState(false);
  const other: Track = state.track === 'youth' ? 'recovery' : 'youth';
  const otherLabel = other === 'youth' ? 'I want to stay informed' : "I'm in recovery";

  function switchTrack(): void {
    dispatch({ type: 'CHOOSE_TRACK', track: other });
    navigate(other === 'youth' ? '/youth' : '/recovery', { replace: true });
  }

  return (
    <section className="rounded-xl2 border border-line bg-ink-900 p-4">
      <h2 className="font-semibold">Track</h2>
      <p className="mt-1 text-sm leading-relaxed text-muted">
        You're on {state.track === 'youth' ? '"I want to stay informed"' : '"I\'m in recovery"'}.
        Switching doesn't erase anything on either side.
      </p>
      {confirming ? (
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={switchTrack}
            className="tap-target flex-1 rounded-lg bg-accent-600 px-4 py-2 text-sm font-semibold text-ink-950"
          >
            Yes, switch to {otherLabel}
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className="tap-target rounded-lg border border-line px-4 py-2 text-sm text-muted"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="tap-target mt-3 rounded-lg border border-line px-4 py-2 text-sm font-medium text-muted transition hover:text-fg"
        >
          Switch to {otherLabel}
        </button>
      )}
    </section>
  );
}

function DeleteEverythingSection(): JSX.Element {
  const { dispatch } = useAppState();
  const navigate = useNavigate();
  const [confirming, setConfirming] = useState(false);

  function eraseAll(): void {
    dispatch({ type: 'RESET_ALL' });
    navigate('/onboarding', { replace: true });
  }

  return (
    <section className="rounded-xl2 border border-crisis-600/40 bg-ink-900 p-4">
      <h2 className="font-semibold">Delete everything</h2>
      <p className="mt-1 text-sm leading-relaxed text-muted">
        Clears your track choice, settings, waves ridden count, sponsor, and everything else this
        app has stored on this device. Instant, and there is no copy anywhere else to recover it
        from.
      </p>
      {confirming ? (
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={eraseAll}
            className="tap-target flex-1 rounded-lg bg-crisis-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Tap again to erase everything
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className="tap-target rounded-lg border border-line px-4 py-2 text-sm text-muted"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="tap-target mt-3 rounded-lg border border-crisis-600/50 px-4 py-2 text-sm font-medium text-crisis-500 transition hover:bg-crisis-600/10"
        >
          Delete everything
        </button>
      )}
    </section>
  );
}

export function Settings(): JSX.Element {
  return (
    <>
      <ScreenHeader title="Settings" lede="What's stored on this device, and how to change or clear it." />
      <div className="flex flex-col gap-4 px-4">
        <TrackSection />
        <PinSection />
        <DeleteEverythingSection />
      </div>
    </>
  );
}
