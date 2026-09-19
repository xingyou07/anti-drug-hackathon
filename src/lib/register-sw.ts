/**
 * Registration only. The worker itself is a static file in /public so it is
 * served at the app's scope root. No build-time plugin, so nothing about the
 * offline behaviour is hidden from review.
 */
export function registerServiceWorker(): void {
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Offline support is an enhancement; failing to register must never
      // break the app or the crisis path.
    });
  });
}
