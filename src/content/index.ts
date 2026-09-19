/**
 * Content is imported statically so it is bundled into the app shell. The
 * crisis sheet therefore renders synchronously with no network access and no
 * loading state, which is what constraints 1 and 3 require.
 */
import appMetaJson from './app-meta.json';
import breathingJson from './breathing.json';
import crisisJson from './crisis-resources.json';
import fakeCallJson from './fake-call.json';
import groundingJson from './grounding.json';
import legalExplainerJson from './legal-explainer.json';
import onboardingJson from './onboarding.json';
import privacyJson from './privacy.json';
import refusalJson from './refusal-scripts.json';
import urgeSurfJson from './urge-surf.json';
import type {
  AppMetaFile,
  BreathingFile,
  CrisisResourcesFile,
  FakeCallFile,
  GroundingFile,
  LegalExplainerFile,
  OnboardingFile,
  PrivacyFile,
  RefusalScriptsFile,
  UrgeSurfFile,
} from './types';

export const appMeta = appMetaJson as AppMetaFile;
export const breathingContent = breathingJson as BreathingFile;
export const crisisResources = crisisJson as CrisisResourcesFile;
export const fakeCallContent = fakeCallJson as FakeCallFile;
export const groundingContent = groundingJson as GroundingFile;
export const legalExplainerContent = legalExplainerJson as LegalExplainerFile;
export const onboardingContent = onboardingJson as OnboardingFile;
export const privacyContent = privacyJson as PrivacyFile;
export const refusalContent = refusalJson as RefusalScriptsFile;
export const urgeSurfContent = urgeSurfJson as UrgeSurfFile;
