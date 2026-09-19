import { appMeta } from '@/content';

/** Constraint 4: this text is persistent and must not be dismissible. */
export function AppFooter(): JSX.Element {
  return (
    <footer className="border-t border-line px-4 pb-24 pt-5 text-center text-xs leading-relaxed text-subtle">
      {appMeta.disclaimer}
    </footer>
  );
}
