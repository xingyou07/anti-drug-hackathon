import type { Hours } from '@/lib/hours';

/** Every content file carries a review status (constraint 5). */
export type ContentStatus = 'UNREVIEWED_PLACEHOLDER' | 'SEED_VERIFIED';

export interface ContentEnvelope {
  status: ContentStatus;
  reviewedBy: string | null;
  reviewedOn: string | null;
}

export interface CrisisResource {
  id: string;
  name: string;
  number: string;
  channel: 'voice' | 'whatsapp';
  blurb: string;
  hours: Hours;
  lastVerified: string | null;
  note?: string;
}

export interface CrisisResourcesFile extends ContentEnvelope {
  note: string;
  todo: string;
  resources: CrisisResource[];
}

export interface OnboardingOption {
  track: 'youth' | 'recovery';
  label: string;
  detail: string;
}

export interface OnboardingStep {
  id: string;
  title: string;
  body: string[];
  options?: OnboardingOption[];
}

export interface OnboardingFile extends ContentEnvelope {
  todo: string;
  steps: OnboardingStep[];
}

export interface PrivacyFile extends ContentEnvelope {
  todo: string;
  title: string;
  summary: string;
  sections: Array<{ heading: string; body: string }>;
}

export interface AppMetaFile extends ContentEnvelope {
  displayName: string;
  disclaimer: string;
  placeholderChipLabel: string;
  unconfirmedNumberNote: string;
}

export interface UrgeSurfFile extends ContentEnvelope {
  todo: string;
  durationSeconds: number;
  curveNote: string;
  title: string;
  lede: string;
  startLabel: string;
  prompts: string[];
  completion: { title: string; body: string; counterLabel: string };
  earlyStop: { title: string; body: string };
}

export interface BreathingPhase {
  label: string;
  seconds: number;
  grow: boolean;
}

export interface BreathingPattern {
  id: 'box' | 'sigh';
  name: string;
  summary: string;
  detail: string;
  phases: BreathingPhase[];
}

export interface BreathingFile extends ContentEnvelope {
  todo: string;
  patterns: BreathingPattern[];
  defaultPrompt: string;
}

export interface GroundingFile extends ContentEnvelope {
  todo: string;
  title: string;
  lede: string;
  steps: Array<{ count: number; sense: string; hint: string }>;
  completion: { title: string; body: string };
}

export type RefusalTone = 'light' | 'flat' | 'firm';

export interface RefusalContext {
  id: string;
  label: string;
  blurb: string;
  tags: string[];
  tones: Record<RefusalTone, string[]>;
}

export interface RefusalScriptsFile extends ContentEnvelope {
  todo: string;
  toneLabels: Record<RefusalTone, string>;
  ladderLabels: string[];
  contexts: RefusalContext[];
}

export interface FakeCallFile extends ContentEnvelope {
  todo: string;
  title: string;
  lede: string;
  audioNote: string;
  callerPresets: string[];
  delayOptions: Array<{ seconds: number; label: string }>;
  armedLabel: string;
  exitLine: string;
}

export interface LegalExplainerFile extends ContentEnvelope {
  todo: string;
  title: string;
  body: string[];
  crisisNote: string;
}
