/**
 * Open/closed is computed at render time from the `hours` field in the content
 * layer (constraint 2). Nothing about opening times is ever hardcoded in a
 * component, and no status is ever cached — a sheet left open across 6pm must
 * be wrong for at most one render.
 */

export type Hours =
  | { kind: 'always' }
  | { kind: 'weekly'; days: number[]; open: string; close: string }
  | null;

export type OpenState =
  | { kind: 'always'; label: string }
  | { kind: 'open'; label: string }
  | { kind: 'closed'; label: string }
  | { kind: 'unknown'; label: string };

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
};

const WEEKDAY_NAME = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

/**
 * Helplines here are Singapore services, so their hours are Singapore hours.
 * Reading the device clock directly would tell a traveller in London that NAMS
 * is closed when it is open. Intl is built into the runtime — no network.
 */
export function singaporeNow(now: Date = new Date()): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Singapore',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);

  const get = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((p) => p.type === type)?.value ?? '';

  const day = WEEKDAY_INDEX[get('weekday')] ?? 0;
  const hour = Number.parseInt(get('hour'), 10);
  const minute = Number.parseInt(get('minute'), 10);

  // Intl renders midnight as "24" in some engines under hour12:false.
  const safeHour = Number.isFinite(hour) ? hour % 24 : 0;
  const safeMinute = Number.isFinite(minute) ? minute : 0;

  return { day, minutes: safeHour * 60 + safeMinute };
}

function toMinutes(hhmm: string): number {
  const [h = '0', m = '0'] = hhmm.split(':');
  return Number.parseInt(h, 10) * 60 + Number.parseInt(m, 10);
}

export function formatClock(minutes: number): string {
  const h24 = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  const suffix = h24 < 12 ? 'am' : 'pm';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, '0')}${suffix}`;
}

export function getOpenState(hours: Hours, now: Date = new Date()): OpenState {
  if (hours === null) return { kind: 'unknown', label: 'Hours unconfirmed' };
  if (hours.kind === 'always') return { kind: 'always', label: 'Open 24 hours' };

  const { day, minutes } = singaporeNow(now);
  const open = toMinutes(hours.open);
  const close = toMinutes(hours.close);

  if (hours.days.includes(day) && minutes >= open && minutes < close) {
    return { kind: 'open', label: `Open until ${formatClock(close)}` };
  }

  // Walk forward to the next opening, at most a week out.
  for (let ahead = 0; ahead <= 7; ahead += 1) {
    const candidateDay = (day + ahead) % 7;
    if (!hours.days.includes(candidateDay)) continue;
    if (ahead === 0 && minutes >= open) continue;

    if (ahead === 0) return { kind: 'closed', label: `Opens ${formatClock(open)}` };
    if (ahead === 1) return { kind: 'closed', label: `Opens tomorrow ${formatClock(open)}` };
    return { kind: 'closed', label: `Opens ${WEEKDAY_NAME[candidateDay]} ${formatClock(open)}` };
  }

  return { kind: 'unknown', label: 'Hours unconfirmed' };
}

/** Currently-open lines sort first (crisis sheet spec); seed order breaks ties. */
export function openStateRank(state: OpenState): number {
  switch (state.kind) {
    case 'always':
      return 0;
    case 'open':
      return 1;
    case 'unknown':
      return 2;
    case 'closed':
      return 3;
  }
}
