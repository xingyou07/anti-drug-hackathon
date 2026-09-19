import type { AppAction, AppState } from './types';

export const initialState: AppState = {
  schemaVersion: 1,
  track: null,
  onboardingComplete: false,
  settings: {
    breathingDefault: 'box',
    hapticsEnabled: true,
    reduceMotion: 'system',
    quickExitEnabled: true,
    pin: null,
  },
  youth: {
    rouletteStep: null,
    scenariosCompleted: {},
    realityCheckGuess: null,
    quiz: { lastScore: null, completedOn: null, repromptOn: null },
  },
  recovery: {
    wavesRidden: {},
    sponsor: null,
    zones: [],
    fakeCallCaller: null,
  },
};

export function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'CHOOSE_TRACK':
      return { ...state, track: action.track };

    case 'COMPLETE_ONBOARDING':
      return { ...state, onboardingComplete: true };

    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.settings } };

    case 'SET_ROULETTE_STEP':
      return { ...state, youth: { ...state.youth, rouletteStep: action.step } };

    case 'RECORD_WAVE': {
      const current = state.recovery.wavesRidden[action.date] ?? 0;
      return {
        ...state,
        recovery: {
          ...state.recovery,
          wavesRidden: { ...state.recovery.wavesRidden, [action.date]: current + 1 },
        },
      };
    }

    case 'SET_FAKE_CALL_CALLER':
      return { ...state, recovery: { ...state.recovery, fakeCallCaller: action.caller } };

    case 'RESET_ALL':
      return initialState;
  }
}
