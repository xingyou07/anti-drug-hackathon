import { PlaceholderChip } from './PlaceholderChip';
import type { ContentStatus } from '@/content/types';

interface Props {
  title: string;
  lede?: string | undefined;
  status?: ContentStatus | undefined;
}

export function ScreenHeader({ title, lede, status }: Props): JSX.Element {
  return (
    <header className="px-4 pb-4 pt-6">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {lede ? <p className="mt-2 text-muted">{lede}</p> : null}
      {status ? (
        <div className="mt-3">
          <PlaceholderChip status={status} />
        </div>
      ) : null}
    </header>
  );
}
