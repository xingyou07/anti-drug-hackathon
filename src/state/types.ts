export type Track = 'youth' | 'recovery';

export interface Settings {
  breathingDefault: 'box' | 'sigh';
  hapticsEnabled: boolean;
  reduceMotion: 'system' | 'always';
  quickExitEnabled: boolean;
  /** A screen lock against a shoulder-surfer, not security. Stated as such in Settings. */
  pin: string | null;
}

export interface YouthState {
  /**
   * Progress only. There is deliberately no outcome, survival flag or counter
   * anywhere in this type — constraint 11 is enforced by the shape of the
   * state, so a "win state" has nowhere to be stored.
   */
  rouletteStep: 1 | 2 | 3 | 4 | null;
  scenariosCompleted: Record<string, { exitsFound: string[]; strategyScore: number }>;
  realityCheckGuess: number | null;
  quiz: { lastScore: number | null; completedOn: string | null; repromptOn: string | null };
}

export interface RecoveryState {
  /** Date -> count. No notes and no clock times, by design. */
  wavesRidden: Record<string, number>;
  sponsor: { name: string; number: string } | null;
  /** Normalised 0..1 coordinates on a static map graphic. Never lat/long. */
  zones: Array<{ id: string; label: string; x: number; y: number; radius: number }>;
  fakeCallCaller: string | null;
}

export interface AppState {
  schemaVersion: 1;
  track: Track | null;
  onboardingComplete: boolean;
  settings: Settings;
  youth: YouthState;
  recovery: RecoveryState;
}

export type AppAction =
  | { type: 'CHOOSE_TRACK'; track: Track }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'UPDATE_SETTINGS'; settings: Partial<Settings> }
  | { type: 'SET_ROULETTE_STEP'; step: YouthState['rouletteStep'] }
  | { type: 'RECORD_WAVE'; date: string }
  | { type: 'SET_FAKE_CALL_CALLER'; caller: string }
  | { type: 'RESET_ALL' };
