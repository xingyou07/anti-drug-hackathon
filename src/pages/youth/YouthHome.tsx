import { Link } from 'react-router-dom';
import { ScreenHeader } from '@/components/ScreenHeader';

interface Tile {
  to: string;
  title: string;
  detail: string;
  phase: string | null;
}

const TILES: Tile[] = [
  {
    to: '/roulette',
    title: 'The hundred',
    detail: "One choice, a hundred versions of you. You don't get to know which one you were.",
    phase: null,
  },
  { to: '/youth', title: 'Pressure scenarios', detail: 'Practise getting out of a moment.', phase: 'Phase 3' },
  { to: '/youth', title: 'Reality check', detail: 'What you think everyone does, versus what they do.', phase: 'Phase 3' },
  { to: '/youth', title: 'Literacy challenge', detail: 'Ten questions. No trick answers.', phase: 'Phase 3' },
];

export function YouthHome(): JSX.Element {
  return (
    <>
      <ScreenHeader title="Stay informed" lede="Short things, none of them a lecture." />
      <div className="flex flex-col gap-3 px-4">
        {TILES.map((tile) => (
          <Link
            key={tile.title}
            to={tile.to}
            aria-disabled={tile.phase !== null}
            className={`tap-target rounded-xl2 border border-line bg-ink-900 p-4 transition ${
              tile.phase === null ? 'hover:border-accent-400 hover:bg-ink-800' : 'opacity-60'
            }`}
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
