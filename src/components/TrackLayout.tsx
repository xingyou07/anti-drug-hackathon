import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AppFooter } from './AppFooter';
import { useAppState } from '@/state/AppStateContext';

export interface NavItem {
  to: string;
  label: string;
  icon: string;
}

/**
 * Youth and Recovery get separate nav sets and separate route trees
 * (constraint 7). Nothing here links from one track into the other.
 */
export function TrackLayout({ items }: { items: NavItem[] }): JSX.Element {
  const { state } = useAppState();
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col">
      {/* Constraint 10: Quick Exit is Recovery-only, and always present — not
          a settings toggle — because that's when someone may need it fastest. */}
      {state.track === 'recovery' ? (
        <div className="flex justify-end px-4 pt-3">
          <button
            type="button"
            onClick={() => navigate('/exit')}
            className="tap-target rounded-lg border border-line px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-subtle transition hover:text-fg"
          >
            Exit
          </button>
        </div>
      ) : null}
      <main className="flex-1">
        <Outlet />
      </main>
      <AppFooter />
      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-lg border-t border-line bg-ink-900/95 backdrop-blur"
      >
        <ul className="flex">
          {items.map((item) => (
            <li key={item.to} className="flex-1">
              <NavLink
                to={item.to}
                end
                className={({ isActive }) =>
                  `tap-target flex flex-col items-center justify-center gap-0.5 px-1 py-2 text-xs transition ${
                    isActive ? 'text-accent-400' : 'text-subtle hover:text-fg'
                  }`
                }
              >
                <span aria-hidden="true" className="text-lg leading-none">
                  {item.icon}
                </span>
                {item.label}
              </NavLink>
            </li>
          ))}
          {/* Space kept clear so the fixed crisis button never covers a nav item. */}
          <li aria-hidden="true" className="w-24" />
        </ul>
      </nav>
    </div>
  );
}
