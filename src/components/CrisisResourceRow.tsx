import { appMeta } from '@/content';
import type { CrisisResource } from '@/content/types';
import { dialHref, dialVerb, displayNumber } from '@/lib/dial';
import { getOpenState } from '@/lib/hours';
import type { OpenState } from '@/lib/hours';

const STATUS_STYLES: Record<OpenState['kind'], string> = {
  always: 'bg-accent-500/15 text-accent-100 border-accent-400/40',
  open: 'bg-accent-500/15 text-accent-100 border-accent-400/40',
  closed: 'bg-ink-800 text-muted border-line',
  unknown: 'bg-flag-900 text-flag-200 border-flag-500/40',
};

export function CrisisResourceRow({ resource }: { resource: CrisisResource }): JSX.Element {
  const openState = getOpenState(resource.hours);
  const isUnconfirmed = resource.lastVerified === null;

  return (
    <li className="rounded-xl2 border border-line bg-ink-900">
      <a
        href={dialHref(resource)}
        className="tap-target flex items-center gap-3 p-4 transition hover:bg-ink-800"
        {...(resource.channel === 'whatsapp'
          ? { target: '_blank', rel: 'noreferrer noopener' }
          : {})}
      >
        <div className="min-w-0 flex-1">
          <p className="font-semibold leading-snug">{resource.name}</p>
          <p className="mt-0.5 text-lg font-bold tabular-nums tracking-wide text-accent-400">
            {displayNumber(resource)}
          </p>
          <p className="mt-1 text-sm leading-snug text-muted">{resource.blurb}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[openState.kind]}`}
            >
              {openState.label}
            </span>
            {resource.channel === 'whatsapp' ? (
              <span className="rounded-full border border-line bg-ink-800 px-2 py-0.5 text-xs text-muted">
                Opens WhatsApp
              </span>
            ) : null}
          </div>
          {isUnconfirmed ? (
            <p className="mt-2 text-xs text-flag-200">{appMeta.unconfirmedNumberNote}</p>
          ) : null}
        </div>
        <span
          aria-hidden="true"
          className="shrink-0 rounded-lg bg-accent-600 px-3 py-2 text-sm font-semibold text-ink-950"
        >
          {dialVerb(resource)}
        </span>
        <span className="sr-only">
          {dialVerb(resource)} {resource.name} on {displayNumber(resource)}
        </span>
      </a>
    </li>
  );
}
