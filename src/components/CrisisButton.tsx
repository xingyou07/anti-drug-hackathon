import { useCrisisSheet } from '@/state/CrisisSheetContext';

interface Props {
  /**
   * True only on the quick-exit decoy screen. Constraint 1 requires help to be
   * reachable in one tap from every screen with no exception, but a red
   * "Get help now" pill sitting on a page whose entire purpose is to look like
   * a weather app defeats that page's purpose the moment anyone glances at the
   * screen. This keeps the same one-tap guarantee — same handler, same sheet —
   * behind a control styled to pass as part of the decoy instead of announcing
   * itself. Flagged to the project owner as a judgment call between two
   * non-negotiable constraints (1 and 10), not a silent workaround.
   */
  disguised?: boolean;
}

/**
 * Fixed on every screen, rendered outside every route guard and every loading
 * path (constraint 1). One tap opens the sheet.
 */
export function CrisisButton({ disguised = false }: Props): JSX.Element {
  const { open, isOpen } = useCrisisSheet();

  if (disguised) {
    return (
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Get help now"
        className="tap-target fixed bottom-4 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/70 text-slate-500 shadow-sm backdrop-blur transition hover:bg-white focus-visible:ring-slate-400"
      >
        <span aria-hidden="true" className="text-lg leading-none">↻</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={open}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      className="tap-target fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-crisis-600 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-black/40 transition hover:bg-crisis-500 focus-visible:ring-crisis-100"
    >
      <span aria-hidden="true" className="text-lg leading-none">✆</span>
      Get help now
    </button>
  );
}
