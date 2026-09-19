import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

interface CrisisSheetValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const CrisisSheetContext = createContext<CrisisSheetValue | null>(null);

/**
 * Deliberately separate from AppStateProvider and never persisted. The crisis
 * sheet must not depend on stored state being readable — if localStorage
 * throws, the help path still opens (constraint 1).
 */
export function CrisisSheetProvider({ children }: { children: ReactNode }): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return <CrisisSheetContext.Provider value={value}>{children}</CrisisSheetContext.Provider>;
}

export function useCrisisSheet(): CrisisSheetValue {
  const value = useContext(CrisisSheetContext);
  if (value === null) throw new Error('useCrisisSheet must be used inside CrisisSheetProvider');
  return value;
}
