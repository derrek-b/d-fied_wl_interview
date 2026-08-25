# LP Screener Flow — Yes Path

Question sequence for respondents who answer **A1 = Yes** (they've deposited liquidity
before) — Sections B through G, then Contact. Matches `src/lib/screener/questions.ts`
as of today. The "No" path (Section H) isn't covered here.

Legend:

- `[80]` = 80-character minimum required
- `(multi)` = checkbox, select any number
- `(single)` = pick one
- `optional` = can be left blank
- Indented bullets under a question = only shown if that specific answer was picked

---

## Section B — Who you are

8 questions, straight line, no branching.

1. **B1** — How long providing liquidity? (single)
2. **B2** — Chains deployed on? (multi)
3. **B3** — DEXes used? (multi)
4. **B4** — Largest single position ever opened? (single)
5. **B5** — Total currently deployed across all positions? (single)
6. **B6** — Whose capital have you deployed? (single)
7. **B7** — How many positions open at once, typically? (single)
8. **B8** — How recently have you had open positions? (single)

---

## Section C — What you run

6 or 8 questions. One conditional skip.

1. **C1** — Which of these strategies have you ever run? (multi)
2. **C2** — What does keeping your positions running well actually involve? (multi)
3. **C2a** — How often do you have to do any of the actions you selected? (single)
4. **IF C1 has more than one strategy checked:**
   - **C3** — Which of your selected strategies has worked best? (single — options are
     exactly whichever of C1's picks the respondent checked) — skipped entirely (not
     just optional) if only one strategy was checked on C1
   - **C3a** — Why did it work better than your other strategies? (multi) — same
     visibility as C3
5. **C4** — How do you track your deployed positions? (multi)
6. **C6** — Tell us about the last time managing a position cost you money, time, or
   sleep. `[80]`
6. **C6a** — Closest description of what went wrong? (multi)

> The former C5 ("walk through the last time you checked on your positions") was cut —
> not screening-decision-relevant, and better asked live where follow-ups make it richer.
> Moved to `FOLLOW-UP_FRUSTRATED_MANAGER.md`, Section 1.

---

## Section D — Automation, wanted and tried

7 core questions plus two **separate, independent** branch points. D1 and D3/D4 are not
nested inside each other — everyone answers D3 regardless of what they picked on D1.

1. **D7** — Do you currently pay fees to any platform or tool for LP management or automation?
   (single — Yes / No). **Moved to the front of the section** — a clean, always-answered
   quantify-first anchor, asked before the branch-specific narrative starts. It used to
   close the section, but by then its answer was already substantially implied by D5b or
   D5d.
2. **D1** — Have you ever gone looking for a tool to help manage or automate your
   positions? (single)
   - **IF "Yes, found and used something":**
     - **D2a** — You went looking for a tool. What were you looking for the tool to
       do? `[80]`
     - **D2b** — What were you trying to fix? (multi)
   - **IF "Yes, but nothing fit":**
     - **D2c** — What functionality were you looking for that you couldn't find? `[80]`
     - **D2d** — Closest reason nothing fit? (multi)
   - **IF "No, never looked":**
     - **D2e** — Which is closest? (single)
     - **D2f** — Please provide details. `[80]`
   - _(all three branches converge back into the same next question — D3)_
3. **D3** — Have you used any of these platforms to help manage or automate your positions? (multi — vfat.io, Krystal, Revert,
   Arrakis, Gamma, Steer, ICHI, Kamino, HawkFi, Charm, Beefy, None, Other). **Asked to
   everyone above, independent of D1** — including people who said "Nothing fit" or
   "Never looked."
4. **D4** — Still using them? (single) — **only asked if D3 named at least one real
   platform (or "Other").** If D3 is _exactly_ "None" and nothing else, D4 is skipped
   entirely (the answer is already fully implied) and the flow goes straight to the
   "never used one" branch below. A platform pick alongside "None" always wins — that
   combination still gets D4 normally, since a specific platform name is stronger
   evidence than the catch-all.
   - **IF "Yes, actively":**
     - **D5a** — What do they handle that you wouldn't want to go back to doing
       yourself? `[80]`
     - **D5b** — What justifies what they cost you? (multi)
   - **IF "Used to, stopped" OR "Tried briefly, didn't stick":**
     - **D5c** — What happened that made you decide to stop using them? `[80]`
     - **D5d** — Closest reason? (multi)
   - _(both branches converge back into the same next question — D6)_
   - **IF D3 = "None" (D4 skipped):**
     - **D5e** — What's kept you from trying? (multi)
     - **D5f** — Say more. (open, no gate)
     - _(also converges into D6)_
5. **D6** — What would you want a tool to do that nothing you've seen does? `[80]` —
   **required**, no skip, even if the honest answer is "nothing."

> **Why D3/D4 matters separately from D1:** D1 is the general "did you ever go
> looking" story. D3/D4 is specifically about the named-platform list. A respondent
> who never went looking at all (D1 = "Never looked") can still legitimately have
> used a platform someone else pointed them to, since D3 doesn't check D1's answer
> at all.

---

## Section E — Handoff and trust

1 to 3 questions depending on E1. Trimmed down from 8 — E2/E2a and E5/E6 were cut as
duplicates of Stage 2 Sections 7 and 8 (asked there against revealed behavior, not a
hypothetical); E1 and E4 stay as the only population-level read on Assumptions 3 and
4, since Stage 2 only reaches whoever opts into a call.

1. **E1** — If you are or were looking to fully automate your DeFi strategies, which
   would you prefer? (single)
   - **IF "Neither, I want to keep doing it myself":** E3 and E4 are both skipped —
     that answer already implies the most negative possible read on Assumptions 3
     and 4, so asking custody/vault-trust questions past that point would be forcing
     a hypothetical on someone who's rejected its premise.
   - **IF either other answer:**
     - **E3** — Would capital need to stay in an individual vault, or is a pooled
       vault with other users fine? (single — "Haven't thought about it" removed)
       - **IF "Depends":**
         - **E3a** — What would it depend on? (open, no character gate)
     - **E4** — What would a platform need before you'd let it manage your funds?
       (multi)

---

## Section G — Open ground

3 questions, straight line. Last before Contact, so it doesn't anchor earlier answers.

1. **G1** — Forget LP management. What's the most annoying part of using DeFi
   generally, for you? (open, optional)
2. **G2** — If someone built one thing that made your on-chain life easier, what
   would it be? (open, optional)
3. **G3** — Anything we should have asked and didn't? (open, optional)

---

## Contact — shared with the No path too

3 to 4 questions depending on network. Everyone lands here eventually regardless
of the A1 branch.

1. **I1** — Email or Telegram
2. **I2_network** — Which network is your wallet on (for USDC transfer if you win a raffle)? (single — Solana / EVM)
   - **IF "EVM":**
     - **I2_chain** — Which EVM chain would you like your USDC sent on? (single
       — Ethereum Mainnet, Base, Arbitrum, BNB Chain)
3. **I2** — Wallet address (single-line, format-validated against the network
   selected above — `0x` + 40 hex for EVM, base58 charset 32–44 chars for
   Solana; prompt names the specific chain, e.g. "Your Arbitrum wallet
   address")
4. **I3** — Open to a Zoom/Meets follow-up conversation? Everyone who does one is entered in the $100 USDC raffle. (single — Yes / No)

→ Thank-you screen.

---

Generated from the live implementation, not a rendered diagram — if this ever
disagrees with `questions.ts`, the code is the source of truth.
