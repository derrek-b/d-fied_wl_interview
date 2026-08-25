# ADApose Opportunity Interview: Stage 1 Web Form (v3)

**Purpose.** Screen for Stage 2, and collect enough thinking to know what to ask when we get there.

**Ordering rule.** Not one approach for every question. Three patterns, applied by what the question is actually doing:

| Pattern                         | Used when                                                                    | Why                                                                                                                                                                                           |
| ------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Situational open → checkbox** | The question is load-bearing on an assumption and a real answer space exists | The situational prompt does its own priming, so we get a story rather than "because I wanted to." The checkbox afterward gives us something countable and catches anything the story left out |
| **Checkbox → open**             | The answer space is genuinely closed and short                               | No discovery value in making them generate the list. Pick one, then explain it                                                                                                                |
| **Open only**                   | No meaningful taxonomy exists                                                | An option list would just cap the answer                                                                                                                                                      |

Every checkbox has `Other (specify)`.

**Character gate.** Fields marked **[80]** require 80 characters minimum. Soft effort filter, and it does more screening work than the fraud check.

Target completion: 8 to 10 minutes for someone with something to say.

**Incentive copy (top of form):**

> Complete this form and you're entered to win $25 USDC.
> If you're open to a follow-up conversation, you're also entered for $100 USDC. We'll be picking people whose answers show they've actually been in the weeds.

---

## Section A: Gate

**A1.** Have you ever deposited liquidity into a pool on a DEX?
`Yes` → Section B · `No` → Section H

---

## Section B: Who you are

Clicks only. Sort fields.

**B1.** How long providing liquidity?
`Under 3 months` / `3 to 12 months` / `1 to 2 years` / `Over 2 years`

**B2.** Chains deployed on (multi)
`Ethereum` / `Arbitrum` / `Base` / `Optimism` / `Polygon` / `BNB` / `Solana` / `Cardano` / `Sui` / `Berachain` / `Other`

**B3.** DEXes used (multi)
`Uniswap v3/v4` / `Raydium` / `Orca` / `Meteora` / `Curve` / `Balancer` / `PancakeSwap` / `Aerodrome` / `Minswap` / `SundaeSwap` / `Other`

**B4.** Largest single position ever opened, at deployment:
`Under $1K` / `$1K to $10K` / `$10K to $50K` / `$50K to $250K` / `Over $250K`

**B5.** Total currently deployed across all positions:
`$0 right now` / `Under $1K` / `$1K to $10K` / `$10K to $50K` / `$50K to $250K` / `Over $250K`

**B6.** Whose capital have you deployed?
`My own` / `A fund or clients` / `A DAO or protocol treasury` / `A mix`

**B7.** Positions open at once, typically:
`1` / `2 to 5` / `6 to 20` / `More than 20`

**B8.** How recently have you had open positions?
`Right now` / `Within the last month` / `1 to 6 months ago` / `Over 6 months ago`

---

## Section C: What you actually do

**C1.** Which of these strategies have you ever run? (multi, checkbox only)
`Simple full-range or CPMM pools` / `Concentrated liquidity, managing in and out of range` / `Hedged or delta-neutral positions` / `Lend → borrow → LP loops` / `Leveraged LP` / `Active market making` / `Other`

**C2.** What does it actually take to keep the strategies you picked running well — and how often do you have to step in? **[80]**
_Open only. No taxonomy, and a list here would cap the answer at whatever we already thought of._

> Deliberately avoids "rebalance" or naming any specific maintenance action. A delta-neutral position on a constant-product pool has no range to manage and still needs constant attention. Naming out-of-range management specifically would design the question for one strategy and miss the rest.

**C3.** Which of your selected strategies has worked best, and why do you think that was? **[80]**
_Open only. Required — no longer optional now that it's gated behind C1 having more than one selection, since it now always applies to whoever sees it. Only shown if C1 has more than one selection._

**C4.** How do you track deployed positions? (multi, checkbox only)
`DEX interface` / `Block explorer` / `Spreadsheet` / `Third-party dashboard` / `Script, bot, or alert I built` / `I don't really track it` / `Other`

> Cut the former C5 ("walk us through the last time you checked on your positions") from the
> screener. It wasn't redundant with C2/C4/C6 exactly, but it wasn't screening-decision-relevant
> either — a routine, uneventful check-in doesn't tell you who's worth calling the way C6's
> costly-incident story does, and it's a question that gets richer live, with follow-ups, than it
> ever would in a gated text box. Moved to Stage 2 (`FOLLOW-UP_FRUSTRATED_MANAGER.md`, Section 1).

**C6.** Tell us about the last time managing a position cost you money, time, or sleep. What happened? **[80]**
_Open only._

**C6a.** Closest description of what went wrong? (multi)
`Position went out of range and sat idle while I wasn't watching` / `Hedge drifted out of balance` / `Got liquidated or close to it` / `Gas ate the returns` / `Lost track of what I had where` / `Fees or rewards went uncompounded` / `Nothing like this has happened` / `Other`

> Open first here, checkbox after. C6 gets the story, C6a makes it countable across respondents.

---

## Section D: Automation, wanted and tried

_Assumptions 1 and 2._

**D7.** Do you currently pay fees to any platform or tool for LP management or automation?
`Yes` / `No`

> Moved to the front of the section. It used to close Section D, but by then its answer was
> already substantially implied by D5b (assumes a cost exists) or D5d's "returns didn't
> justify the fees" stopping reason — asking it after all that narrative depth read as a
> non-sequitur. Up front it works as a clean, always-answered quantify-first anchor: the one
> directly comparable Yes/No every respondent gives, regardless of branch, before the
> branch-specific narrative starts.

**D1.** Have you ever gone looking for a tool to help manage or automate your positions?
`Yes, found and used something` / `Yes, but nothing fit` / `No, never looked`

### If "found and used something"

**D2a.** You went looking for a tool. What were you looking for the tool to do? **[80]** _(open)_

**D2b.** What were you trying to fix? (multi)
`Positions going out of range unnoticed` / `Time spent monitoring` / `Gas cost of individual management` / `Tracking across chains or protocols` / `Executing multi-step strategies` / `Compounding fees and rewards` / `Keeping a hedge balanced` / `Other`

### If "nothing fit"

**D2c.** What functionality were you looking for that you couldn't find? **[80]** _(open)_

**D2d.** Closest reason nothing fit? (multi)
`Didn't support my chain or DEX` / `Didn't support my strategy` / `Couldn't set my own parameters` / `Fees too high` / `Custody or trust concerns` / `Too complicated to set up` / `Minimum position size too high` / `Other`

### If "never looked"

**D2e.** Which is closest? (single) _(checkbox first, the space here is short and closed)_
`Hasn't been enough of a problem` / `Didn't know tools like that existed` / `Assumed they wouldn't work well` / `Don't trust them with my funds` / `I enjoy managing it myself` / `My positions are too small to justify it` / `Other`

**D2f.** Please provide details. **[80]** _(open)_

---

**D3.** Have you used any of these platforms to help manage or automate your positions? (multi)
`vfat.io` / `Krystal` / `Revert` / `Arrakis` / `Gamma` / `Steer` / `ICHI` / `Kamino` / `HawkFi` / `Charm` / `Beefy` / `Other` / `None`

**D4.** Still using them? — only asked if D3 named at least one real platform (or `Other`).
If D3 is _exactly_ `None` and nothing else, D4 is skipped entirely (its answer would already
be fully implied) and the respondent goes straight to the "never used one" branch below. A
platform pick alongside `None` always wins — it's stronger, more specific evidence than the
catch-all, so that combination still gets D4 normally.
`Yes, actively` / `Used to, stopped` / `Tried briefly, didn't stick`

### If "yes, actively"

**D5a.** What do they handle that you wouldn't want to go back to doing yourself? **[80]** _(open)_

**D5b.** What justifies what they cost you? (multi)
`Saves me time` / `Executes faster than I can` / `Catches things I'd miss` / `Cheaper than my own gas` / `Does something I can't do manually` / `I'm not sure they justify it` / `Other`

### If "stopped" or "didn't stick"

**D5c.** What happened that made you decide to stop using them? **[80]** _(open)_

**D5d.** Closest reason? (multi)
`Returns didn't justify the fees` / `They did something I didn't expect` / `I lost money using them` / `Too complicated to configure` / `Moved to a chain or strategy they didn't support` / `Stopped LPing altogether` / `Lost confidence in the team behind them` / `Other`

### If D3 = "None" (never used one — reached directly, D4 is skipped)

**D5e.** What's kept you from trying? (multi) _(checkbox first)_
`Don't trust them with funds` / `Fees` / `Doesn't support what I do` / `Didn't know they existed` / `Prefer to manage it myself` / `Positions too small` / `Never got around to it` / `Other`

**D5f.** Say more. **[80]** _(open)_

---

**D6.** What would you want a tool to do that nothing you've seen does? **[80]**
_Open only. Required, not optional — an honest "there's nothing" still has to be written out at 80 characters rather than skipped with one click. This question is too important to let people opt out of for free._

---

## Section E: Handoff and trust

_Assumptions 3 and 4. These two pull against each other and the form should make respondents resolve it rather than nodding at both._

Trimmed from 8 questions to 3. This screener was already pushing the length a respondent will tolerate, and most of what Section E used to ask is answered better elsewhere: E2/E2a and E5/E6 are duplicated — more richly, against revealed behavior rather than a hypothetical — by the Stage 2 script (`FOLLOW-UP_FRUSTRATED_MANAGER.md`, Sections 7 and 8; the routing rubric already said as much about E1 vs. Section 7 before this cut). E1 and E4 stay because Stage 2 only reaches whoever opts into a follow-up call, and their aggregate skew is the only population-level read this study gets on Assumptions 3 and 4 — without them there'd be no way to test those two assumptions against the full respondent pool, only the self-selected subset who agree to talk.

**E1.** If you are or were looking to fully automate your DeFi strategies, which would you prefer?
`I set the parameters, something else automates the execution` / `I hand off the strategy decisions entirely` / `Neither, I want to keep doing it myself`

> Reworded to give the question a concrete frame — "which is closer to what you'd want" had no stated context to react against.

**If "Neither, I want to keep doing it myself": E3 and E4 are skipped entirely.** A respondent
who rejects handoff outright has already given the most negative possible answer to
Assumptions 3 and 4 — asking them vault-structure and platform-trust questions past that point
would be forcing a hypothetical on someone who's explicitly rejected its premise, the same
failure mode already fixed elsewhere in this form (C3 before it was gated to C1's count, D4
before the D3 = "None" fix). Removing "Neither" as an option instead, to force everyone through
E3/E4, was considered and rejected — that manufactures answers rather than collecting real ones.

**E3.** Would capital need to stay in an individual vault, or is a pooled vault with other users fine?
`Individually owned` / `Pooled is fine` / `Depends`

**E3a.** What would it depend on? _(open, shown only if E3 = "Depends", no character gate)_

> "Haven't thought about it" removed — if a respondent hasn't thought about it, `Depends` with a thin E3a answer already captures that, and the extra option wasn't buying anything E3a doesn't already cover. `Depends` on its own was previously a dead end with no way to learn what it actually depended on.

**E4.** What would a platform need before you'd let it manage your funds? (multi) _(checkbox first, then specify)_
`Audits` / `Time in operation` / `TVL above some threshold` / `Open source code` / `Can only adjust positions, never withdraw` / `Insurance or coverage` / `Someone I know using it` / `Nothing would` / `Other`

> "manage" instead of "move" — "move your funds" reads as a withdrawal/theft framing; "manage" is the actual ask.

---

## Section G: Open ground

Exists so a respondent who kills our assumptions can still hand us something. Last, so it doesn't anchor earlier answers.

**G1.** Forget LP management. What's the most annoying part of using DeFi generally, for you?
_Open only._

**G2.** If someone built one thing that made your on-chain life easier, what would it be?
_Open only._

**G3.** Anything we should have asked and didn't?
_Open only. Optional._

---

## Section H: Non-LP path

Separate cohort. Checkbox-first for H2, since we know this answer space. Multi-select, and every reason checked gets its own tailored follow-up (not just the primary one) — this cohort is smaller, so we take the depth over keeping it short.

**H1.** Have you considered providing liquidity?
`Looked into it, decided against` / `Still considering` / `Never really considered it`

**H3.** Which of these have you done in DeFi? (multi)
`Staking (native or liquid staking)` / `Lending & borrowing` / `Yield farming or vaults (not LPing)` / `Other` / `None of these`

Calibration this path was missing: A1 = No only tells us someone never LP'd, not whether they're DeFi-native and simply skipped LPing, or brand new to DeFi entirely — two very different populations for reading H2's reasons and H4's trust answer. Trading/swapping tokens was deliberately left off — it's close to universal for anyone with a wallet, so including it would make "None of these" rare and dilute the signal.

**H3a.** Curious to get started, or is DeFi just not something you're interested in? — shown only if H3 is _exactly_ "None of these" (a real activity checked alongside it wins, same exclusivity rule as D3/D4).
`Curious, just haven't yet` / `Not something I'm interested in`

**H2.** Main thing(s) keeping you out? Check all that apply. (multi)
`Too complicated` / `Too much effort` / `Returns don't justify it` / `Don't trust myself to manage it` / `Don't trust the platforms` / `Risk of losing money on the position` / `Not enough capital to justify gas or fees` / `Don't understand the mechanics well enough to judge the risk` / `Didn't know it was an option` / `Other`

"Risk of losing money on the position" deliberately doesn't name impermanent loss. If a respondent names it unprompted in their own follow-up answer, that's a real signal they know what it is — priming the term in the checkbox label would launder that signal away.

Each option selected below gets its own follow-up page, in the order shown — a respondent who checks 2 reasons sees 2 follow-up pages, each holding just that reason's own pair (or triple) of questions. All of them converge on H4 at the end, asked once regardless of how many were selected.

If someone goes back to H2 and unchecks a reason they'd already answered follow-ups for, they get a confirmation before those answers are discarded — closes off the easy version of "select several, then quietly back out of the extra work" without blocking legitimate corrections.

**If "Too complicated":**

- What specifically is too complicated? _(open)_
- What would a less complex system look like to you? _(open)_

**If "Too much effort":**

- What about it is too much effort? _(open)_
- What would an effortless system look like to you? _(open)_

**If "Returns don't justify it":**

- Are you currently earning DeFi rewards outside of LP positioning? `Yes` / `No`
- **If yes:** What are you using to earn that yield? (multi) `Staking (native or liquid staking)` / `Managed vaults (e.g. Yearn, Beefy)` / `Lending markets (e.g. Aave, Compound)` / `Holding stablecoins or other assets on a CEX for interest or rewards` / `Airdrops or points programs` / `Other`
- **If yes:** What's your current APY? (single) `Under 1%` / `1–5%` / `5–10%` / `10–20%` / `20–30%` / `Over 30%`
- What level of return would make LP management worth it to you? (single) same range options

Both range questions share the same option list — closed-range instead of open text, since the answer space is genuinely bounded and an 80-char narrative gate doesn't fit a number. No "haven't thought about it" catch-all on either — reaching this branch already required selecting "returns don't justify it," which presupposes some opinion about returns.

**If "Don't trust myself to manage it":**

- What specifically do you not trust in yourself to manage LP positions? _(open)_
- What could a platform or service do to help get you over that? _(open)_

**If "Don't trust the platforms":**

- What platforms have you looked into and found untrustworthy? _(open)_
- What didn't you trust about them? _(open)_
- What could those platforms do to earn your trust? _(open)_

**If "Risk of losing money on the position":**

- What specific risks concern you? _(open)_
- What would make you feel like that risk was actually being managed? _(open)_

**If "Not enough capital to justify gas or fees":**

- What amount would you need before it felt worth it? _(open)_
- Would you consider pooling your capital with other users to reach a size that's worth managing? `Yes` / `No`

> Replaced the old open "what would make it worth doing at a smaller size" — the answer to that was already implied by the reason itself (bigger returns relative to fees). Pooling is the one concrete thing worth asking about instead.

**If "Don't understand the mechanics well enough to judge the risk":**

- What parts of how it works are not clear to you? _(open)_
- What would help you feel confident enough to evaluate it yourself? _(open)_

**If "Didn't know it was an option":**

- What would you want to understand about it before trying? _(open)_

**If "Other":** the respondent's own specify text from H2 becomes this page's heading (same as every other reason's page shows its reason as the heading), followed by one generic open question — "Can you explain that in more detail?"

Every H2 follow-up is gated at 80 characters, same as C/D/E's narrative prompts — these answers matter enough to hold to the same bar, even when only one reason ends up selected.

**H4.** Would you trust an experienced team to manage your LP positions for you?
`Absolutely` / `Probably` / `Maybe` / `Probably not` / `Never`

Deliberately doesn't ask respondents to distinguish a platform from an AI from a human expert — this cohort has never LP'd, so they're very unlikely to have a differentiated opinion about the mechanism, only about whether _someone_ trustworthy is running it. Asked once, at the end, regardless of which reason(s) were selected — this used to be duplicated across the "don't trust myself" and "risk of loss" pages, which worked but meant the signal was only present for people who picked those specific reasons. Asking it once here gives every non-LP respondent the same directly comparable answer.

**G1.** What's the most annoying part of using DeFi generally, for you?
_Open only._

> Same question as the Yes path's G1, minus the "Forget LP management" preamble — that instruction only makes sense for a cohort that's spent 30+ questions deep in LP-specific mechanics. This cohort never was, so there's nothing to tell them to forget.

**G2.** If someone built one thing that made your on-chain life easier, what would it be?
_Open only._

**G3.** Anything we should have asked and didn't?
_Open only. Optional._

> All three exist here for the same reason they exist on the Yes path — a safety valve against tunnel vision, so a respondent whose real DeFi pain has nothing to do with LP hesitancy can still hand us something. Previously this cohort got none of that; the No path went straight from H4 to Contact. Last, before Contact, so it doesn't anchor the reason-specific answers before it.

Then Section I.

---

## Section I: Contact

**I1.** Email or Telegram

**I2_network.** Which network is your wallet on (for USDC transfer if you win a raffle)?
`Solana` / `EVM (Ethereum, Base, Arbitrum, BNB Chain, etc.)`

**I2_chain.** Which EVM chain would you like your USDC sent on? _(shown only if I2_network = EVM)_
`Ethereum Mainnet` / `Base` / `Arbitrum` / `BNB Chain (BSC)`

**I2.** Your [chain] wallet address _(single-line, not the narrative textarea style)_

> For your USDC payout if you're selected. Any wallet works — doesn't need to be your primary one.

Validated by format, not just presence — `0x` + 40 hex characters for any EVM chain, a base58-charset string of 32 to 44 characters for Solana. This is a lightweight shape check (catches an obviously wrong or malformed entry) rather than a full address checksum or on-chain existence check, which isn't warranted for a screener field. The prompt itself names the specific chain selected (e.g. "Your Arbitrum wallet address") rather than staying generic, so respondents can confirm they're pasting the right thing before submitting.

Tron and Hyperliquid were considered and left out of v1: Tron's addresses are Base58 (`T...`), not the `0x` hex format the rest of "EVM" shares, so it isn't a drop-in addition to this chain list — it would need its own separate address-format branch. Hyperliquid's HyperEVM is technically a normal `0x`-format EVM chain, but was left out on audience grounds (smaller, newer chain relative to Base/Arbitrum/BSC for where this respondent pool is likely to already hold funds), not a technical one — revisit if the actual respondent pool skews toward Hyperliquid-native traders.

**I3.** Open to a Zoom/Meets follow-up conversation? Everyone who does one is entered in the $100 USDC raffle.
`Yes` / `No`

---

## Routing: who gets a call

Sort by depth of written answers first, filters second. A short answer from a whale is worth less than a detailed one from someone running $5K, because Stage 2 is a conversation and we need people who talk.

**Call first.** Substantive C2 or C6. Anyone who built their own tooling at C4. `Yes, but nothing fit` at D1. Anyone who stopped at D4 and gave a real D5c.

**Call second.** B6 = fund or DAO treasury at any size. Small cohort, different buyer, possibly a different company.

**Call third.** Non-LPs with substantive H3. Anyone whose G1 or G2 pointed somewhere unexpected.

**Skip.** Vague C-section. Gated fields padded to exactly minimum. Under two minutes total.

> Used to also weigh in a wrong answer on F1, a validation question that's since been cut — the doc's own read on it was already "second check is passive," with the gated fields doing most of the actual fraud-screening work. Removing it leans further into that: the char-gated open answers are now the sole line of defense against fakers, not a backstop to a knowledge check.

---

## Appendix: assumption tracking

Branch points, not gates. The third column is the part that matters, because an assumption dying is a redirection rather than an ending.

| Assumption                                   | Reads as failing when                                                                                                                | Then look at                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. LP managers want automation               | Respondents with real capital mostly answer `never looked` at D1, D2e clusters on "hasn't been a problem," and C6 answers are shrugs | Whether the pain is unfelt or just unnamed. If C2's cadence answer shows people stepping in often while reporting no pain, that's an awareness gap, which is positioning rather than product                                                                                                                                                                                                                                                                                                                                                             |
| 2. Current solutions are limited             | D5d clusters on fees and complexity rather than missing capability, and D6 comes back thin                                           | The complaint may be onboarding and UX rather than functionality. Different product, smaller, still real                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 3. Managers prefer managed over self-managed | E1 skews to `set the parameters` or `myself`                                                                                         | Build the tooling layer, not the manager. Execution infrastructure for people who want to keep deciding. The finer-grained "why" (what specifically makes handoff uncomfortable) now comes from Stage 2 Section 7, not from this form — E2a was cut when Section E was trimmed                                                                                                                                                                                                                                                                           |
| 4. Managers will trust a position manager    | E4 skews to `nothing would` or `can only adjust, never withdraw`                                                                     | The product may be a verification and custody-safety product with automation attached, rather than the reverse. Read G1 and G2 here too, since trust complaints spill into them. The month-one capital commitment read (formerly E5) now comes from Stage 2 Section 8 instead. Note the denominator: E4 is skipped for E1 = `Neither`, so its skew reads against the subset already open to some handoff, not the full sample — a `Neither` answer is itself the strongest possible negative signal on this assumption and doesn't need E4 to confirm it |

**On sample size.** No percentage thresholds under roughly 30 responses in a cohort. At low N, read for the same specific complaint appearing unprompted across unrelated respondents. Three strangers independently describing the same failure is stronger evidence than 60% agreement on a multiple choice. Percentages become usable once one person moving doesn't swing the number more than a few points.

**On weighting.** The clicks tell us who someone is. The gated open fields tell us whether there's a business. When they disagree, the writing wins.
