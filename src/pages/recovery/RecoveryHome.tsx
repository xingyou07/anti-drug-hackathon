import { Link } from 'react-router-dom';
import { ScreenHeader } from '@/components/ScreenHeader';
import { useAppState } from '@/state/AppStateContext';

interface Tile {
  to: string;
  title: string;
  detail: string;
  phase: string | null;
}

const TILES: Tile[] = [
  { to: '/recovery/urge-surf', title: 'Ride the wave', detail: 'Fifteen minutes. It comes down on its own.', phase: null },
  { to: '/recovery/breathe', title: 'Breathe', detail: 'Box breathing, or a physiological sigh.', phase: null },
  { to: '/recovery/grounding', title: 'Grounding', detail: '5-4-3-2-1, one sense at a time.', phase: null },
  { to: '/recovery/scripts', title: 'Refusal scripts', detail: 'Words for when one "no" is not enough.', phase: null },
  { to: '/recovery/fake-call', title: 'Fake call', detail: 'A reason to walk out of a room.', phase: null },
  { to: '/recovery', title: 'Trigger zones', detail: 'Simulated, never your real location.', phase: 'Phase 4' },
  { to: '/recovery', title: 'Sponsor', detail: 'One number, stored on this phone.', phase: 'Phase 4' },
];

export function RecoveryHome(): JSX.Element {
  const { state } = useAppState();
  const totalWaves = Object.values(state.recovery.wavesRidden).reduce((sum, n) => sum + n, 0);

  return (
    <>
      <ScreenHeader title="You're here" lede="Whatever today is, this is the right place to be." />

      {totalWaves > 0 ? (
        <div className="mx-4 mb-4 rounded-xl2 border border-line bg-ink-900 p-4">
          <p className="text-sm text-muted">Waves ridden</p>
          <p className="text-3xl font-bold tabular-nums">{totalWaves}</p>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 px-4">
        {TILES.map((tile) => (
          <Link
            key={tile.title}
            to={tile.to}
            aria-disabled={tile.phase !== null}
            className={
              'tap-target rounded-xl2 border border-line bg-ink-900 p-4 transition ' +
              (tile.phase === null ? 'hover:border-accent-400 hover:bg-ink-800' : 'opacity-60')
            }
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-lg font-semibold">{tile.title}</span>
              {tile.phase ? (
                <span className="shrink-0 rounded-full border border-line px-2 py-0.5 text-xs text-subtle">
                  {tile.phase}
                </span>
              ) : null}
            </div>
            <span className="mt-1 block text-sm leading-relaxed text-muted">{tile.detail}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
