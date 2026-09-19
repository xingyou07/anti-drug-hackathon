import { appMeta } from '@/content';
import type { ContentStatus } from '@/content/types';

/** Constraint 5: anything rendering UNREVIEWED_PLACEHOLDER copy says so. */
export function PlaceholderChip({ status }: { status: ContentStatus }): JSX.Element | null {
  if (status !== 'UNREVIEWED_PLACEHOLDER') return null;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-flag-500/40 bg-flag-900 px-2.5 py-1 text-xs font-medium text-flag-200">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-flag-500" />
      {appMeta.placeholderChipLabel}
    </span>
  );
}
