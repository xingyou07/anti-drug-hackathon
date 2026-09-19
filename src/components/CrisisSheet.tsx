import { useEffect, useMemo, useRef, useState } from 'react';
import { CrisisResourceRow } from './CrisisResourceRow';
import { crisisResources } from '@/content';
import { InlineBreathing } from '@/features/crisis/InlineBreathing';
import { InlineGrounding } from '@/features/crisis/InlineGrounding';
import { getOpenState, openStateRank } from '@/lib/hours';
import { useCrisisSheet } from '@/state/CrisisSheetContext';

type InlineTool = 'none' | 'ground' | 'breathe';

export function CrisisSheet(): JSX.Element | null {
  const { isOpen, close } = useCrisisSheet();
  const [tool, setTool] = useState<InlineTool>('none');
  const panelRef = useRef<HTMLDivElement>(null);
  const headingId = 'crisis-sheet-heading';

  /**
   * Sorted at render time, not at build time: a line that opens at 9am has to
   * move to the top at 9am without the app being rebuilt or reloaded.
   */
  const sorted = useMemo(
    () =>
      [...crisisResources.resources].sort(
        (a, b) => openStateRank(getOpenState(a.hours)) - openStateRank(getOpenState(b.hours)),
      ),
    // Recomputed whenever the sheet opens, which is the only time it is seen.
    [isOpen],
  );

  useEffect(() => {
    if (!isOpen) {
      setTool('none');
      return;
    }
    panelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label="Close help sheet"
        onClick={close}
        className="absolute inset-0 bg-black/70"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        tabIndex={-1}
        className="relative flex max-h-[92vh] w-full max-w-lg flex-col rounded-t-xl2 border-t border-line bg-ink-950 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3 border-b border-line p-4">
          <div>
            <h2 id={headingId} className="text-xl font-bold">
              Get help now
            </h2>
            <p className="mt-1 text-sm text-muted">
              Open lines first. Everything here works without internet.
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className="tap-target rounded-lg border border-line px-3 text-muted transition hover:text-fg"
          >
            <span aria-hidden="true">✕</span>
            <span className="sr-only">Close help sheet</span>
          </button>
        </div>

        <div className="overflow-y-auto p-4">
          <section aria-label="Tools you can use right now" className="mb-5">
            {tool === 'none' ? (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTool('ground')}
                  className="tap-target rounded-xl2 border border-line bg-ink-900 px-3 py-3 text-left font-semibold transition hover:bg-ink-800"
                >
                  Ground me
                  <span className="mt-0.5 block text-xs font-normal text-muted">5-4-3-2-1</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTool('breathe')}
                  className="tap-target rounded-xl2 border border-line bg-ink-900 px-3 py-3 text-left font-semibold transition hover:bg-ink-800"
                >
                  Breathe with me
                  <span className="mt-0.5 block text-xs font-normal text-muted">4-4-4-4</span>
                </button>
              </div>
            ) : null}
            {tool === 'ground' ? <InlineGrounding onDone={() => setTool('none')} /> : null}
            {tool === 'breathe' ? <InlineBreathing onDone={() => setTool('none')} /> : null}
          </section>

          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-subtle">
            Talk to someone
          </h3>
          <ul className="flex flex-col gap-2">
            {sorted.map((resource) => (
              <CrisisResourceRow key={resource.id} resource={resource} />
            ))}
          </ul>

          <p className="mt-4 text-xs leading-relaxed text-subtle">
            Nobody at this app sees that you opened this sheet or tapped a number. Your phone
            places the call, not us.
          </p>
        </div>
      </div>
    </div>
  );
}
