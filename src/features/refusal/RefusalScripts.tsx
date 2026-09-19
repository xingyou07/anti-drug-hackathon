import { useMemo, useState } from 'react';
import { ToolScreen } from '@/components/ToolScreen';
import { refusalContent } from '@/content';
import type { RefusalContext, RefusalTone } from '@/content/types';
import { copyText } from '@/lib/clipboard';
import { useHaptics } from '@/lib/useHaptics';

const TONE_ORDER: RefusalTone[] = ['light', 'flat', 'firm'];

interface Props {
  /** Youth mounts this same library at its own route with its own filter. */
  backTo: string;
  tagFilter?: string | undefined;
  title?: string | undefined;
  lede?: string | undefined;
}

function LadderRow({
  line,
  label,
  step,
}: {
  line: string;
  label: string;
  step: number;
}): JSX.Element {
  const haptic = useHaptics();
  const [copied, setCopied] = useState(false);

  return (
    <li className="rounded-xl2 border border-line bg-ink-900 p-4">
      <p className="text-xs uppercase tracking-wide text-subtle">
        {step}. {label}
      </p>
      <p className="mt-1.5 text-lg leading-snug">&ldquo;{line}&rdquo;</p>
      <button
        type="button"
        onClick={() => {
          haptic();
          void copyText(line).then((ok) => {
            if (!ok) return;
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
          });
        }}
        className="tap-target mt-3 inline-flex items-center rounded-lg border border-line px-3 py-2 text-sm font-medium text-muted transition hover:text-fg"
      >
        {copied ? 'Copied' : 'Copy'}
        <span className="sr-only"> this line</span>
      </button>
    </li>
  );
}

export function RefusalScripts({ backTo, tagFilter, title, lede }: Props): JSX.Element {
  const contexts = useMemo<RefusalContext[]>(
    () =>
      tagFilter === undefined
        ? refusalContent.contexts
        : refusalContent.contexts.filter((c) => c.tags.includes(tagFilter)),
    [tagFilter],
  );

  const [activeContextId, setActiveContextId] = useState<string>(contexts[0]?.id ?? '');
  const [tone, setTone] = useState<RefusalTone>('flat');

  const active = contexts.find((c) => c.id === activeContextId) ?? contexts[0];

  return (
    <ToolScreen
      backTo={backTo}
      title={title ?? 'Refusal scripts'}
      lede={
        lede ??
        'One "no" rarely ends it, so each of these comes with the next two lines. Pick a tone, copy the line, use your own words if they fit better.'
      }
      status={refusalContent.status}
    >
      <div className="px-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-subtle">Where</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {contexts.map((context) => (
            <button
              key={context.id}
              type="button"
              aria-pressed={context.id === active?.id}
              onClick={() => setActiveContextId(context.id)}
              className={
                'tap-target rounded-full border px-4 py-2 text-sm font-medium transition ' +
                (context.id === active?.id
                  ? 'border-accent-400 bg-ink-800 text-fg'
                  : 'border-line bg-ink-900 text-muted hover:text-fg')
              }
            >
              {context.label}
            </button>
          ))}
        </div>

        {active ? (
          <>
            <p className="mt-3 text-sm leading-relaxed text-muted">{active.blurb}</p>

            <h2 className="mt-6 text-sm font-semibold uppercase tracking-wide text-subtle">
              How it should land
            </h2>
            <div role="tablist" aria-label="Tone" className="mt-2 flex gap-2">
              {TONE_ORDER.map((option) => (
                <button
                  key={option}
                  type="button"
                  role="tab"
                  aria-selected={option === tone}
                  onClick={() => setTone(option)}
                  className={
                    'tap-target flex-1 rounded-xl2 border px-3 py-2.5 text-sm font-semibold transition ' +
                    (option === tone
                      ? 'border-accent-400 bg-ink-800 text-fg'
                      : 'border-line bg-ink-900 text-muted hover:text-fg')
                  }
                >
                  {refusalContent.toneLabels[option]}
                </button>
              ))}
            </div>

            <ul className="mt-4 flex flex-col gap-2">
              {active.tones[tone].map((line, i) => (
                <LadderRow
                  key={line}
                  line={line}
                  step={i + 1}
                  label={refusalContent.ladderLabels[i] ?? ''}
                />
              ))}
            </ul>

            <p className="mt-5 text-sm leading-relaxed text-subtle">
              The third line is an exit, not an argument. You are allowed to use it first.
            </p>
          </>
        ) : null}
      </div>
    </ToolScreen>
  );
}
