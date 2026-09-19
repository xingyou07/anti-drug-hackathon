# Pitch and Demo Script

**Length:** 3 minutes. **Setup:** open `index.html` on a phone-sized window.

## One-liner

> Steady is a judgment-free app that helps teens say no before it happens, and helps people in recovery get through the craving happening right now.

## Script

**0:00 – Hook (15s)**
"Most drug education is a lecture. Nobody's ever been talked out of a craving at 11pm. So we built something that helps in the actual moment."

**0:15 – Prevent: The Party (60s)**
- Open Prevent → *The Party*.
- Make the tempting choices on purpose: take the hit, then the pill. Land on the hospital ending. Read the "Reality check" aloud: *"Fake pills can contain fentanyl. You can't see or taste it."*
- Hit **Play again**, choose "Text your older sister." Point out that the good ending is the *exit plan*, not perfection.

**1:15 – Say No Practice (45s)**
- Pick *Vape*. Type a weak reply: "maybe later, sorry." Show the coach explaining why it invites more pressure.
- Type a strong one: "Nah, I'm good. Want to get food instead?" Show ★★★.
- Line: "Rehearsing refusals is one of the few things prevention research supports."

**2:00 – Recover: the rescue button (45s)**
- Switch to Recover → **I have a craving right now.**
- Show the countdown, the breathing circle, the dot game, then the user's own "why" and one-tap text to a trusted person.
- Finish: "You rode it out." Show it counted on the progress screen.

**2:45 – Close (15s)**
"Two audiences, one tone: kind, practical, private. No accounts, no data leaves the device, and a human hotline is always one tap away."

## Likely judge questions

| Question | Answer |
|---|---|
| Where's the AI? | The prototype is rule-based so it's instant and offline. The roadmap swaps in Claude for dynamic stories and richer coaching, behind a backend proxy. |
| Is it safe for kids? | No accounts, no data collection, no graphic content, and hotlines on every path. See [SAFETY.md](SAFETY.md). |
| Does it replace treatment? | No. It's a bridge to help. Every flow points to real people. |
| How would you measure impact? | Rescues completed, streak retention, and the share of story runs ending on refusal or exit-plan outcomes. |

## Demo checklist

- [ ] Clear `localStorage` first so the tracker starts blank (`localStorage.clear()`).
- [ ] Pre-fill a support plan with a fake contact for the rescue demo.
- [ ] Test on a phone if possible. Dark and light themes both work.
- [ ] Have the fallback plan ready: screenshots of each screen.
