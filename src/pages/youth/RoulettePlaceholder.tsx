import { ScreenHeader } from '@/components/ScreenHeader';

/**
 * Phase 3 builds the real four-step engine. The route and its Youth-only guard
 * exist from Phase 1 so the redirect behaviour required by constraint 12 is
 * testable before there is any content to leak.
 */
export function RoulettePlaceholder(): JSX.Element {
  return (
    <div className="px-4 pb-32">
      <ScreenHeader
        title="The hundred"
        lede="The Roulette Engine lands in Phase 3. This route exists now so its Youth-only guard can be tested."
      />
      <p className="px-0 text-sm leading-relaxed text-muted">
        If you reached this screen from the Recovery track, that is a bug worth reporting — the
        guard should have sent you home before this rendered.
      </p>
    </div>
  );
}
