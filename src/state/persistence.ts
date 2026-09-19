import { readJson, removeKey, writeJson } from '@/lib/storage';
import { initialState } from './reducer';
import type { AppState } from './types';

export const STORAGE_KEY = 'ten-percent:state:v1';

/**
 * Read synchronously during useReducer's lazy init. Doing this before first
 * paint is what lets the track guards decide immediately, so a deep link to
 * /roulette in the Recovery track never flashes roulette content
 * (constraint 12 / acceptance criteria).
 */
export function loadState(): AppState {
  const stored = readJson<Partial<AppState>>(STORAGE_KEY);
  if (stored === null || stored.schemaVersion !== 1) return initialState;

  // Shallow-merge against defaults so a state written by an older build that
  // lacks a newer key still boots instead of crashing on undefined.
  return {
    ...initialState,
    ...stored,
    settings: { ...initialState.settings, ...stored.settings },
    youth: { ...initialState.youth, ...stored.youth },
    recovery: { ...initialState.recovery, ...stored.recovery },
    schemaVersion: 1,
  };
}

export function saveState(state: AppState): void {
  writeJson(STORAGE_KEY, state);
}

export function clearState(): void {
  removeKey(STORAGE_KEY);
}
