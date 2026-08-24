# Stage 2 Live Interview Guide: Frustrated Active Managers

**Cohort definition.** Currently deployed (B5 above $0, B8 = `Right now` or `Within the last month`) plus at least one of:

- Substantive pain described in C2 or C6
- D1 = `Yes, but nothing fit`
- D6 answered with a specific unmet need
- C4 includes `Script, bot, or alert I built` (self-builder, cross-cutting)

Largest cohort. Expect this to be the bulk of Stage 2. Target 30 to 40 minutes.

---

## Why this script is built defensively

This group self-selected into a form about LP automation, was paid to participate, and already told you in writing that they are frustrated. Every structural bias in the study points the same direction here.

The interview therefore is not asking whether the frustration is real. It is asking whether the frustration has ever **changed their behavior**. Frustration that has never cost them a decision is an opinion. Frustration that made them close a position, skip a deployment, build a script, or go searching is a market.

**Rules:**

- Do not describe ADApose until the interview is over. Same rule as every other cohort.
- Never use the words automation, rebalance, or dashboard before they do. Note when they first use each one, unprompted.
- Never ask what they would pay. Ask what they have paid, for what, and when they stopped.
- When they express frustration, do not sympathize. Ask what they did about it. Every time.
- If an answer arrives in the abstract, get back to a specific instance with a date attached.

---

## Section 1: Current state

- What are you running right now: positions, chains, pairs, roughly what size
- How long has the current setup been in place
- Walk me through this week. What did you actually do
- Walk me through the last time you checked in, even if you didn't act on anything — what made you look, what did you actually look at, what did you decide
- When did you last touch a position, and what made you touch it
- What are you not doing right now that you feel like you should be

The last one is quietly important. The gap between what they do and what they believe they should do is the shape of the product, and it is easier to elicit than a direct pain question.

## Section 2: The incident

Open with their own C6 answer read back to them. Then:

- Take me through what happened, start to finish
- When did you realize
- What could you have done differently if you had known earlier
- **What did it cost you?**
- How do you know that number
- Has anything like that happened since
- What did you change afterward

**The cost question is the pivot of the interview.** If they cannot produce a number and cannot describe how they would calculate one, note it. Pain that cannot be measured is pain that will not be paid to fix, and it means the product needs to make the cost visible before it can sell the cure. That is a different product with a different first feature.

If they _can_ produce a number, get the method. Someone who computed their LP performance against holding the assets has already built the analytical layer you would otherwise have to sell them.

## Section 3: Cost of the ongoing burden

- How many hours a week does this take
- What does it interrupt
- Have you ever checked positions in the middle of the night, on vacation, at work
- Have you ever missed something because you were unavailable
- Has managing this ever stopped you from opening a position you otherwise wanted
- Have you ever closed something early because you did not want to keep watching it
- Are you running fewer positions than you would if this were easier? How many would you run

The last three are behavioral proof of burden. A yes to any of them means the constraint is real and quantifiable in foregone capital deployment. That number is your addressable value, and it beats any stated willingness to pay.

## Section 4: What they have already done about it

- What have you tried
- What do you use today, including things not built for this
- Have you built anything yourself? Walk me through it
- What did you have to give up on
- What are you doing manually that you assume nothing can do

### If they built something

- What made you decide to build rather than find
- How long did it take
- Does it still run? Who maintains it
- What does it not do that you wish it did
- What would have to be true for you to throw it away and use something else

Self-builders have already paid in time, which is the only pre-revenue signal that is not cheap talk. The throw-it-away question is a direct read on switching cost and on what your product has to clear.

## Section 5: The search

- Have you gone looking for a tool? What did you search for, in what words
- What did you find
- What did you look at and reject? Why
- How far did you get with anything: read about it, signed up, connected a wallet, deposited
- What made you stop at that point

The depth of furthest progress is a funnel measurement on your competitors. Someone who connected a wallet and then backed out hit a specific objection at a specific step, and that objection is likely the same one that will hit you.

## Section 6: Money

- What do you pay today for anything related to this
- What is the most you have ever paid a tool in a month
- Have you ever declined something specifically over price
- What do you pay for that is not LP related but that you would call essential
- If something removed this problem entirely, what does that have to be worth before it is obviously worth paying for

Only ask the last one after all the others. It is stated preference and it is the weakest data in the section, so it goes where it can do the least damage.

## Section 7: Control versus handoff

_Assumption 3. Do not let them agree with both sides._

- If you could hand off one part of this permanently, what would it be
- What would you never hand off
- **What is the last decision you made about a position that you would have been uncomfortable letting something else make?**
- Would you rather set the rules and have them executed, or have something else decide
- Does it matter to you whether you understand how it decided
- If it did something you disagreed with but it turned out profitable, how would you feel

The last question is a good discriminator. Someone who says they would still be uncomfortable is a control user and will churn from any managed product regardless of returns. Someone who says results are what matter is a genuine handoff candidate. The form cannot distinguish these and this question can.

## Section 8: Trust

_Assumption 4._

- What is the largest amount you have ever let a smart contract control
- What made you comfortable with that
- Have you ever revoked approvals? What prompted it
- Does it matter whether something can withdraw your funds versus only adjust a position in place
- What would you put into something new in month one, and what would move that number up
- What would you need to see after three months to double it
- Have you lost money to an exploit or a malfunction? What did you change

The month-one-to-month-three escalation path is the thing to capture. It defines the onboarding sequence and tells you whether the business can survive its own trust curve.

## Section 9: Close

- If this problem disappeared tomorrow, what would you do with the time or the capital
- What else in your on-chain life annoys you more than this does
- Anything I should have asked
- Who else should I be talking to

**The second question is deliberately dangerous and worth asking.** If something else is a bigger problem for them than LP management, you need to hear it, and this is the only cohort with the standing to tell you.

---

## After the interview is over

Once discovery is closed, you can describe what you are building and show D-fied if it is useful. Two conditions: it happens after every question above is answered, and you explicitly mark the transition, out loud, so you know which of their statements to discount later.

Anything they say after this point is reaction, not discovery. Tag it separately in the record. It is useful for positioning and messaging. It is not evidence about the problem.

---

## Reading the aggregate

**Behavioral proof rate.** Percentage of this cohort who answered yes to any of: built something, searched for a tool, closed a position early to avoid managing it, ran fewer positions than they wanted, paid for anything. A cohort of frustrated people where most answer no across all five means the frustration is real but inert, and inert frustration does not convert.

**Cost visibility rate.** Percentage who could produce a number for what a specific incident cost them. Low visibility means the analytics layer has to come before, or with, the automation layer.

**Unprompted vocabulary.** For each interview, log whether they said automation, rebalance, or dashboard before you did. High unprompted usage means the category is legible to them and you are selling into an existing frame. Low usage means you are doing category education, which is slower and more expensive than the deck currently assumes.

**Control versus handoff split.** Section 7 gives a cleaner read on Assumption 3 than the E1 checkbox. If this cohort splits hard toward control, the product is parameterized execution infrastructure, not a manager, and that changes the architecture.

**Saturation.** Stop when three consecutive interviews produce no new pain, no new tool name, and no new workaround. That is usually somewhere between eight and twelve in a cohort this homogeneous. Spend the remaining budget on the thinner cohorts instead.

---

## Per-interview capture

- Cohort tag: `frustrated_active`, plus `self_builder` where applicable
- Current positions, chains, DEXes, capital range, strategy types
- Incident described, verbatim
- Incident cost: stated number, method, or `unable to quantify`
- Weekly hours claimed
- Behavioral proof flags: built, searched, closed early, ran fewer, paid
- Foregone deployment: positions they would run if it were easier, minus what they run
- Furthest progress with a competing tool, and the step where they stopped
- Tools rejected, with reason for each
- Most ever paid per month, and for what
- Control versus handoff classification, with the quote that decided it
- Trust ceiling month one, and stated conditions to raise it
- Unprompted use of automation / rebalance / dashboard: yes or no, each
- Bigger problem named at close, if any
- Post-reveal reactions, tagged separately from discovery
