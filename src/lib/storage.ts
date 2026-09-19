/**
 * localStorage is the app's only persistence (constraint 3). Every access is
 * guarded: Safari private mode throws on write, and a thrown error here must
 * never be allowed to take down the crisis path (constraint 1).
 */

export function readJson<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? null : (JSON.parse(raw) as T);
  } catch {
    return null;
  }
}

export function writeJson(key: string, value: unknown): boolean {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeKey(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* nothing recoverable to do, and nothing worth crashing over */
  }
}
