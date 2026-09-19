import { useState } from 'react';

interface Props {
  source: string;
  sourceUrl: string | null;
}

/**
 * Constraint 13: every displayed number carries a tappable citation. Kept in a
 * shared component so a statistic cannot be rendered without one by accident.
 */
export function SourceCitation({ source, sourceUrl }: Props): JSX.Element {
  const [expanded, setExpanded] = useState(false);

  return (
    <span className="inline-block">
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        className="rounded border border-line px-1.5 py-0.5 align-middle text-xs text-accent-400 transition hover:text-accent-100"
      >
        source
      </button>
      {expanded ? (
        <span className="mt-2 block rounded-lg border border-line bg-ink-900 p-3 text-xs leading-relaxed text-muted">
          {source}
          {sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-1 block break-all text-accent-400 underline"
            >
              {sourceUrl}
            </a>
          ) : null}
        </span>
      ) : null}
    </span>
  );
}
