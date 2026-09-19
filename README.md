# Steady

**Real talk about drugs. No lectures, just support.**

Steady is a mobile-first web app for an anti-drug awareness hackathon. It serves two audiences in one app:

| Mode | For | What it does |
|---|---|---|
| **Prevent** | Kids and teens | A choose-your-path party story, a "Say No" practice partner with instant coaching, and a Myth-or-Fact quiz |
| **Recover** | People struggling with addiction | A 10-minute craving rescue flow, a streak and money-saved tracker, and a personal support plan |
| **Help** | Everyone | Free, confidential hotlines, an "I'm not ready to quit" path, and safer-use basics |

## Run it

No install and no build step. It's a single file. It loads Tailwind and Motion from CDNs, so the first open needs an internet connection.

**Stack:** vanilla JS, [Tailwind CSS](https://tailwindcss.com) (play CDN) with shadcn-style design tokens and components, and [Motion](https://motion.dev) (the vanilla sibling of Framer Motion) for animation.

```bash
open index.html
```

Or serve it locally: `python3 -m http.server 8000` and visit http://localhost:8000.

## Project layout

```
index.html          the entire app (HTML + CSS + vanilla JS)
docs/IDEAS.md       brainstorm and why we chose this concept
docs/PRD.md         scope, users, features, roadmap
docs/PITCH.md       3-minute demo script and judging notes
docs/SAFETY.md      design principles and safety guardrails
```

## Design principles

1. **Kind, not scary.** Scare tactics tend to backfire. Steady is warm and practical.
2. **Rehearsal over lectures.** Practicing refusals is one of the few approaches prevention research supports.
3. **Private by default.** No accounts and no servers. Everything you type stays in the browser's `localStorage`.
4. **Always a path to a human.** Hotlines are one tap away on every screen.

## Status

Working prototype. Story branches and refusal coaching are rule-based, so they run instantly with no API key. See [docs/PRD.md](docs/PRD.md) for the roadmap, including LLM-powered dynamic stories and a companion chat.

> Educational tool only. Not medical advice. Hotline numbers are US-based; localize before any real deployment.
