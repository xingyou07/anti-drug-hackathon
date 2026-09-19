import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAppState } from '@/state/AppStateContext';
import type { Track } from '@/state/types';

/**
 * State is hydrated synchronously in useReducer's lazy init, so `track` is
 * already correct on the first render. The guard therefore returns a redirect
 * instead of children without ever painting the guarded screen — which is what
 * "no flash of roulette content" requires (constraint 12).
 */
function fallbackFor(track: Track | null): string {
  if (track === 'recovery') return '/recovery';
  if (track === 'youth') return '/youth';
  return '/onboarding';
}

export function RequireTrack({
  track,
  children,
}: {
  track: Track;
  children: ReactNode;
}): JSX.Element {
  const { state } = useAppState();
  if (state.track !== track) return <Navigate to={fallbackFor(state.track)} replace />;
  return <>{children}</>;
}

export function RequireOnboarded({ children }: { children: ReactNode }): JSX.Element {
  const { state } = useAppState();
  if (state.track === null) return <Navigate to="/onboarding" replace />;
  return <>{children}</>;
}

/** Sends a returning user to their own track's home. */
export function RootRedirect(): JSX.Element {
  const { state } = useAppState();
  return <Navigate to={fallbackFor(state.track)} replace />;
}
