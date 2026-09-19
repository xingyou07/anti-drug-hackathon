# Safety and Design Guardrails

An app about drugs is used by vulnerable people. These are the rules the current build follows and any future work must keep.

## Tone

- **No scare tactics or graphic imagery.** Fear-based messaging tends to backfire with teens. Consequences are shown honestly and calmly.
- **No shame.** Slips are framed as part of recovery. The tracker keeps the best streak and offers a "fresh streak", never a "you failed" screen.
- **Reward good moves, not just abstinence.** Exit plans, humor, and changing your mind mid-night are all celebrated in the story.

## Accuracy

- Claims are kept general and defensible (e.g. "pills not from a pharmacy can contain fentanyl", not specific statistics that go stale). Verify any number before adding it.
- Cravings are described as rising, peaking, and fading, not as lasting exactly N minutes.
- The tracker warns that quitting some substances (alcohol, benzodiazepines) suddenly can be medically dangerous.

## Privacy

- No accounts, analytics, or network requests. All data lives in `localStorage` under the `steady:` prefix.
- User text (practice replies, the "why" note, contact details) never leaves the device and is HTML-escaped before rendering.
- **If an LLM is added,** route calls through a backend proxy, don't log conversations, and tell users their text is sent to a model provider.

## Crisis handling

- Hotlines are reachable from the tab bar on every screen and from the end of the rescue flow.
- The Help tab includes a non-judgmental path for people who aren't ready to quit, with harm-reduction basics.
- Emergency guidance ("call 911 if someone won't wake up") is stated plainly.
- **If a companion chat is added:** it must detect crisis language (self-harm, overdose, "I can't do this") and immediately surface 988 and emergency options. It must never give dosing or medical advice.

## Known limitations

- Hotline numbers are US-only.
- The refusal coach is keyword-based, so it can misjudge unusual phrasing. It never blocks the user and always explains its reasoning.
- Not reviewed by clinicians or prevention specialists. Do that before any real-world deployment.

## Resources referenced

- SAMHSA National Helpline: 1-800-662-4357
- 988 Suicide & Crisis Lifeline: call or text 988
- Crisis Text Line: text HOME to 741741
- Poison Control: 1-800-222-1222
