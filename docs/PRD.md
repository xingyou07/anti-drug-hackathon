# Product Requirements: Steady

## Problem

Drug education for teens is usually a lecture, and lectures don't change behavior. People already struggling with addiction have almost no tool for the hardest moment: the craving at 11pm when nobody is around. Both groups need something that feels like support, not judgment.

## Users

| User | Situation | What they need |
|---|---|---|
| **Teen (13–18)** | Will face an offer at a party or online | Rehearsed responses, honest facts, an exit plan |
| **Person in recovery** | Fighting cravings, tracking progress | Something to do in the next 10 minutes, visible progress |
| **Person not ready to quit** | Still using | A non-judgmental route to talk to someone, safer-use basics |

## Goals

- A stranger understands the value within 10 seconds of opening the app.
- Every feature is usable in under a minute.
- Zero accounts, zero server, zero data collection.

## Non-goals

- Medical advice or diagnosis.
- Replacing treatment or crisis services.
- Social features or user-generated content (needs moderation).

## Features (MVP, shipped)

### Prevent
1. **The Party** is a branching story with 10 scenes and 5 endings. Each ending has a "Reality check" note. Good outcomes reward exit plans, humor, and calm refusals, not just abstinence.
2. **Say No Practice.** Pick a situation (vape, pill, drink). A simulated friend escalates pressure over three rounds. The coach scores each reply out of 3 stars on: clear "no", brevity, and offering an alternative or exit. It gives specific tips, not just a score.
3. **Myth or Fact.** Seven cards with short explanations.

### Recover
4. **Craving Rescue.** A 10-minute countdown with five steps: paced breathing, 5-4-3-2-1 grounding, a tap-the-dot distraction game, the user's own "why", and a one-tap text or call to a trusted contact.
5. **Progress tracker.** Days, money not spent, "that's about a concert ticket" framing, milestones from 1 day to 1 year, best-streak memory, and a gentle "start a fresh streak" flow instead of a shameful reset.
6. **Support plan.** The user's reason and trusted contact, stored locally and surfaced in the rescue flow.

### Help
7. Hotlines (SAMHSA, 988, Crisis Text Line, Poison Control, 911), an "I'm not ready to quit" path with harm-reduction basics, and guidance for worried friends and family.

## Technical approach

- Single `index.html`, vanilla JS, no dependencies, no build. Opens from a file or any static host.
- State in memory; persistent data in `localStorage` under the `steady:` prefix.
- Story content is data (`STORY` object), so adding branches needs no code changes.
- Light and dark themes via `prefers-color-scheme`.

## Roadmap

1. **LLM story engine.** Generate branches and consequences per playthrough via the Claude API, keeping the reality-check tone. Needs a small backend proxy to protect the API key.
2. **LLM friend and coach.** Replace regex coaching with a model that plays the pushy friend and gives nuanced feedback.
3. **Companion chat.** A late-night, non-judgmental listener with crisis detection that surfaces hotlines. Requires careful safety evaluation before shipping.
4. **Localization.** Hotlines by country, multiple languages, local currency.
5. **Slang and emoji decoder** for parents.
6. **PWA.** Installable, offline, with an optional daily check-in notification.

## Success metrics (post-hackathon)

- Share of story playthroughs that end on "Strong move" or "Course-corrected".
- Craving rescues completed vs. started.
- Streak retention at 7 and 30 days.
