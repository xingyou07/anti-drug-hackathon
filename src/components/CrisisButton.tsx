import { useCrisisSheet } from '@/state/CrisisSheetContext';

/**
 * Fixed on every screen, rendered outside every route guard and every loading
 * path (constraint 1). One tap opens the sheet.
 */
export function CrisisButton(): JSX.Element {
  const { open, isOpen } = useCrisisSheet();

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
