import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { PlaceholderChip } from './PlaceholderChip';
import type { ContentStatus } from '@/content/types';

interface Props {
  backTo: string;
  title: string;
  lede?: string | undefined;
  status?: ContentStatus | undefined;
  children: ReactNode;
}

export function ToolScreen({ backTo, title, lede, status, children }: Props): JSX.Element {
  return (
    <div className="pb-8">
      <div className="px-4 pt-5">
        <Link
          to={backTo}
          className="tap-target -ml-2 inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm text-muted transition hover:text-fg"
        >
          <span aria-hidden="true">←</span> Back
        </Link>
      </div>
      <header className="px-4 pb-4 pt-2">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {lede ? <p className="mt-2 leading-relaxed text-muted">{lede}</p> : null}
        {status ? (
          <div className="mt-3">
            <PlaceholderChip status={status} />
          </div>
        ) : null}
      </header>
      {children}
    </div>
  );
}
