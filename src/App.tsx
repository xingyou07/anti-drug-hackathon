import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { CrisisButton } from '@/components/CrisisButton';
import { CrisisSheet } from '@/components/CrisisSheet';
import { RequireOnboarded, RequireTrack, RootRedirect } from '@/components/TrackGuards';
import { TrackLayout } from '@/components/TrackLayout';
import type { NavItem } from '@/components/TrackLayout';
import { Onboarding } from '@/features/onboarding/Onboarding';
import { NotFound } from '@/pages/NotFound';
import { Breathing } from '@/features/breathing/Breathing';
import { FakeCall } from '@/features/fakecall/FakeCall';
import { Grounding } from '@/features/grounding/Grounding';
import { RefusalScripts } from '@/features/refusal/RefusalScripts';
import { UrgeSurf } from '@/features/urgesurf/UrgeSurf';
import { LegalExplainer } from '@/pages/recovery/LegalExplainer';
import { Privacy } from '@/pages/shared/Privacy';
import { Settings } from '@/pages/shared/Settings';
import { WeatherDecoy } from '@/pages/shared/WeatherDecoy';
import { RecoveryHome } from '@/pages/recovery/RecoveryHome';
import { RoulettePlaceholder } from '@/pages/youth/RoulettePlaceholder';
import { YouthHome } from '@/pages/youth/YouthHome';

const YOUTH_NAV: NavItem[] = [
  { to: '/youth', label: 'Home', icon: '◈' },
  { to: '/youth/settings', label: 'Settings', icon: '⚙' },
  { to: '/youth/privacy', label: 'Privacy', icon: '◇' },
];

const RECOVERY_NAV: NavItem[] = [
  { to: '/recovery', label: 'Home', icon: '◈' },
  { to: '/recovery/settings', label: 'Settings', icon: '⚙' },
  { to: '/recovery/privacy', label: 'Privacy', icon: '◇' },
];

export function App(): JSX.Element {
  // Constraint 10's Quick Exit and constraint 1's "help on every screen" pull
  // against each other on exactly one route: a visible "Get help now" pill
  // would out the disguise. See CrisisButton's `disguised` prop for the
  // reasoning; this is the only place that prop is set.
  const location = useLocation();
  const isDecoyRoute = location.pathname === '/exit';

  return (
    <>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Quick Exit destination. Deliberately outside RequireOnboarded and
            outside both track trees — it must render even if state is odd. */}
        <Route path="/exit" element={<WeatherDecoy />} />

        <Route
          path="/youth"
          element={
            <RequireTrack track="youth">
              <TrackLayout items={YOUTH_NAV} />
            </RequireTrack>
          }
        >
          <Route index element={<YouthHome />} />
          <Route path="settings" element={<Settings />} />
          <Route path="privacy" element={<Privacy />} />
        </Route>

        <Route
          path="/recovery"
          element={
            <RequireTrack track="recovery">
              <TrackLayout items={RECOVERY_NAV} />
            </RequireTrack>
          }
        >
          <Route index element={<RecoveryHome />} />
          <Route path="urge-surf" element={<UrgeSurf />} />
          <Route path="breathe" element={<Breathing />} />
          <Route path="grounding" element={<Grounding />} />
          <Route path="scripts" element={<RefusalScripts backTo="/recovery" />} />
          <Route path="fake-call" element={<FakeCall />} />
          <Route path="legal" element={<LegalExplainer />} />
          <Route path="settings" element={<Settings />} />
          <Route path="privacy" element={<Privacy />} />
        </Route>

        {/* Constraint 12: guarded at the route, not merely hidden from nav. */}
        <Route
          path="/roulette"
          element={
            <RequireTrack track="youth">
              <div className="mx-auto w-full max-w-lg">
                <RoulettePlaceholder />
              </div>
            </RequireTrack>
          }
        />

        <Route
          path="/privacy"
          element={
            <RequireOnboarded>
              <Navigate to="/youth/privacy" replace />
            </RequireOnboarded>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {/*
        Rendered outside every Route and every guard so the help path exists on
        literally every screen, including onboarding and 404 (constraint 1).
      */}
      <CrisisButton disguised={isDecoyRoute} />
      <CrisisSheet />
    </>
  );
}
