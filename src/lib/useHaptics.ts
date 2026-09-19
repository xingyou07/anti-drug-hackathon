import { useCallback } from 'react';
import { tap } from './haptics';
import { useAppState } from '@/state/AppStateContext';

/** Honours the user's haptics setting so every caller doesn't have to. */
export function useHaptics(): (pattern?: number | number[]) => void {
  const { state } = useAppState();
  const enabled = state.settings.hapticsEnabled;

  return useCallback(
    (pattern: number | number[] = 12) => {
      if (enabled) tap(pattern);
    },
    [enabled],
  );
}
