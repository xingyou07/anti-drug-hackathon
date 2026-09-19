# The 10% — project constitution

Display name: **The 10%**. Repo/package slug: `ten-percent`.

Singapore drug prevention + recovery support PWA. Hackathon prototype.

## The premise

With synthetic and laced substances, the same choice has two outcomes and the
user cannot know which one they get. The name is the hook; the app's actual
message is that the odds are UNKNOWABLE, not that they are 10%. The Roulette
Engine exists to make that unknowability felt, not to simulate a death.

## Stack

- Vite + React 18 + TypeScript + Tailwind CSS + React Router
- State: React Context + `useReducer`. Persistence: `localStorage` only.
- Installable PWA: manifest + service worker, full offline support.
- ZERO backend. ZERO network requests. No auth, no analytics, no
  third-party SDKs, no fonts from CDNs. Everything bundled.

## NON-NEGOTIABLE CONSTRAINTS

These are spec, not suggestions. If any feature below conflicts with one
of these, the constraint wins — flag it to me instead of working around it.

1. **Crisis path is sacred.** A "Get help now" affordance is fixed on every
   screen. One tap to the crisis sheet. Must render with no network, from a
   cold start, in under 1s. Never behind onboarding, a modal, or a loading state.
2. **No hotline number may appear in a component.** All of them live in
   `src/content/crisis-resources.json` with `hours` and `lastVerified`. The UI
   computes "Open now / Opens 9:00am" from `hours` at render time. NEVER invent
   or guess a number. If a number is not in the seed data below, do not render
   a `tel:` link for it.
3. **Zero personal data.** No accounts, no names, no email, no location, no
   network calls of any kind. Everything stays in `localStorage`. State this
   plainly on a Privacy screen written in plain English.
4. **No endorsement claims.** Persistent footer: "Independent prototype. Not
   affiliated with or endorsed by MOE, NCADA, CNB, SANA, NAMS, WE CARE or SPS."
   No logos of these organisations. No "certified counsellor" claims.
5. **Content/code separation.** Every piece of user-facing educational or
   clinical copy lives in `src/content/*.json`, each file carrying
   `{ "reviewedBy": null, "reviewedOn": null, "status": "UNREVIEWED_PLACEHOLDER" }`.
   Any screen rendering `UNREVIEWED_PLACEHOLDER` content shows a small amber
   "Demo content — pending clinical review" chip.
6. **Geofencing is SIMULATION ONLY.** Do not call the Geolocation API. Do not
   request location permission. The user places zones on a static styled map
   graphic; a "Simulate approach" button fires the alert. Zones are stored in
   `localStorage` and never leave the device. Explain this on the screen.
7. **Two tracks, hard fork.** First launch asks the user to choose
   **"I want to stay informed"** (Youth) or **"I'm in recovery"** (Recovery).
   Separate route trees, separate nav, separate tone. The ONLY shared surface
   is the crisis sheet. Switchable later from Settings, never cross-linked.
8. **Content safety.** No screen, script, or scenario may pair a substance name
   with a dose, route of administration, price, source, or effect description
   that reads as appealing. Scenarios teach exits, not pharmacology.
9. **Accessibility.** WCAG AA contrast, 44px minimum touch targets, respects
   `prefers-reduced-motion`, full keyboard nav, semantic headings, screen-reader
   labels on every icon button.
10. **Quick exit.** A small "Exit" control on Recovery screens clears the view
    and routes to a neutral weather-style placeholder page. Optional 4-digit
    PIN lock in Settings.
11. **The Roulette Engine never simulates survival.** There is no single dice
    roll and no per-player outcome. See the Roulette Engine spec. A build where
    the player can "get the safe outcome" is a failed build.
12. **The Roulette Engine is Youth-track only.** It must be unreachable from the
    Recovery track by any route, including deep links. A mortality simulation is
    actively harmful for someone in recovery. Enforce with a route guard, not
    just navigation design.
13. **No unsourced statistics anywhere.** Every number shown to a user carries a
    `source` and `sourceUrl` in the content JSON and renders a tappable citation.
    If you cannot source it, do not display it.

## Seed data — `src/content/crisis-resources.json`

Use exactly these. Do not add, substitute, or "improve" any number.

| Name | Number | Hours | Channel |
| --- | --- | --- | --- |
| SOS (Samaritans of Singapore) | 1767 | 24 hours | voice |
| SOS CareText | 9151 1767 | 24 hours | WhatsApp |
| Emergency Ambulance/Police | 995 | 24 hours | voice |
| National Mindline | 1771 | 24 hours | voice |
| IMH Mental Health Helpline | 6389 2000 | 24 hours | voice |
| NAMS Addictions Helpline | 1800 2255 227 | Mon–Fri 09:00–18:00 | voice |
| WE CARE Community Services | 3165 8017 | Mon–Fri 10:00–18:00 | voice |
| WE CARE (WhatsApp) | 8391 3023 | Mon–Fri 10:00–18:00 | WhatsApp |
| SANA Helpline | 1800 733 4444 | null | voice |
| Narcotics Anonymous Singapore | 8405 8432 | null | voice |

SANA carries `"lastVerified": null, "note": "Confirm with SANA before release"`.
Set `lastVerified: "2026-09-19"` on all except SANA. Anything with
`lastVerified: null` renders with a "Unconfirmed — call may not connect" note.

## Roulette Engine — forbidden

- Any depiction of the high as pleasant, interesting, or worth curiosity.
- Naming a substance alongside a dose, route, price, brand, or where to get it.
- A replay button, a "try again", a survival counter, or any win state.
- Real photographs of people, real case names, or real victims.
- No gore, no medical imagery, no sirens, no body horror. Silhouettes only.
- No audio.

## Acceptance criteria

- Airplane mode: app loads, crisis sheet renders, all numbers visible, every
  tool (breathing, grounding, urge surf, scripts, fake call) works.
- `grep -rn "tel:" src/components src/pages` returns nothing. All dial links
  originate from the content layer.
- No occurrence of `navigator.geolocation` anywhere in the repo.
- No `fetch`, `axios`, or `XMLHttpRequest` anywhere in the repo.
- Every `src/content/*.json` has a `status` field.
- Lighthouse: PWA installable, Accessibility >= 95.
- Cold start to crisis sheet <= 2 taps on every screen in the app.
- The Roulette Engine has no code path that produces a per-player outcome.
  `grep -rn "Math.random" src/features/roulette` returns nothing.
- Navigating directly to `/roulette` while in Recovery track redirects to the
  Recovery home with no flash of roulette content.
- Every statistic rendered anywhere has a visible, tappable source citation.

## House rules

- TypeScript strict. No `any`.
- Comment WHY, not what, and only where non-obvious.
- If you're unsure whether something is clinically appropriate, mark it
  `UNREVIEWED_PLACEHOLDER` and tell me. Do not invent clinical guidance.
- After each phase, stop and summarise what changed before continuing.
