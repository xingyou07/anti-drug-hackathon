import { Link } from 'react-router-dom';
import { ScreenHeader } from '@/components/ScreenHeader';

export function NotFound(): JSX.Element {
  return (
    <div className="mx-auto w-full max-w-lg px-4 pb-32">
      <ScreenHeader title="Nothing here" lede="That page doesn't exist." />
      <Link
        to="/"
        className="tap-target inline-flex items-center rounded-xl2 bg-accent-600 px-4 py-3 font-semibold text-ink-950"
      >
        Back to start
      </Link>
    </div>
  );
}
