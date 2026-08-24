# Stage 2 Live Interview Guide: Delegated Capital

**Cohort definition.** B6 = `A fund or clients`, `A DAO or protocol treasury`, or `A mix`. Any capital level.

Highest priority per interview, lowest expected volume. Treat every one of these as scarce.

---

## The split inside this cohort

B6 merges two buyers who have almost nothing in common. Establish which one you have in the first three minutes and run the matching branch.

|                | **Branch A: fund or client capital**             | **Branch B: DAO or protocol treasury**                          |
| -------------- | ------------------------------------------------ | --------------------------------------------------------------- |
| Goal           | Risk-adjusted return on someone else's money     | Depth, tight spreads, and orderly markets for their own token   |
| Success metric | Return versus benchmark, drawdown                | Slippage at size, price stability, cost of liquidity            |
| Fails when     | Underperformance, or a loss they have to explain | Their token becomes illiquid or gets dumped through thin books  |
| Answers to     | LPs, allocators, an IC                           | Token holders, governance, a foundation board                   |
| Pain shape     | Operational load across many positions           | Continuous obligation on one or two pairs, forever              |
| Buys           | Tooling that scales an existing process          | Outsourced management, often as a service with a human attached |

Branch B is where the observable revenue in this category sits. Arrakis and Gamma are largely serving protocols outsourcing their own token liquidity, not individuals seeking yield. If you land a Branch B interview, it is the most commercially informative conversation available to you in this entire study.

---

## Ground rules

**Shorter than the consumer script. 25 to 30 minutes, hard stop.** These people have calendars. Running long costs you the referral.

**Peer register, not researcher register.** They will engage with someone who understands mandates, custody constraints, and reporting obligations. They will disengage from a survey.

**Still do not pitch until the end.** Same rule as everywhere else. But when you do pitch, this is the one cohort where the conversation can convert directly, so leave five minutes for it and mean it.

**Ask about process, not preference.** Their behavior is governed by mandate documents, approval chains, and custody policy. What they personally want is close to irrelevant. What they are permitted to do is the entire constraint set.

**Money questions are normal here.** Unlike retail, asking what they pay, what the budget line is, and who signs is expected professional conversation. Do not soften it.

---

## Section 1: Establish the entity

- What is the vehicle: fund, DAO, foundation, family office, prop
- Whose money is it, and what did you tell them you would do with it
- Roughly what size is the book, and what portion is in LP positions
- How many people touch these decisions
- What is your role in that

Route to Branch A or B from here. If genuinely both, run Branch B first, since it is the scarcer and more commercially loaded conversation.

## Section 2: Current operation (shared)

- What are you running right now: pairs, venues, chains, sizes
- Walk me through how a position gets opened, from idea to deployed
- Who executes, and on what
- What happens when something needs adjusting at 3am
- Is there someone on call, or does it wait
- What breaks when the person who normally does this is unavailable

The key-person question is the sharpest operational pain probe for this cohort. Retail LPs absorb their own downtime. An institution cannot, and the gap between what their policy requires and what one human can actually cover is a durable, budgeted problem.

---

## Branch A: fund or client capital

- What return are you targeting, and against what benchmark
- How do you measure LP performance? Against holding the pair, against an index, against nothing
- Who sees that number and how often
- What does your mandate permit and forbid: chains, protocols, leverage, concentration limits
- How does a new protocol get approved for deployment
- Who has to sign off, and how long does that take
- Have you ever wanted to deploy somewhere and could not? What blocked it
- How do you handle attribution when a position underperforms
- What do you tell an allocator when an LP position loses to just holding
- How much of your team's time goes to position management versus everything else
- If that time went to zero, what would the team do instead

**The mandate and approval questions are the real product constraints.** A fund that needs a security review and an IC vote before touching a new protocol has a sales cycle measured in months and a set of documentation requirements that is itself part of the product. Find out what that list contains.

## Branch B: DAO or protocol treasury

- Is this your own token's liquidity, or diversified treasury deployment, or both
- What are you actually trying to achieve: depth, spread, price stability, runway
- How do you know if it is working? What do you measure
- Who complains when it is not working, and what do they say
- How is the liquidity currently managed: internally, a market maker, a protocol like Arrakis or Gamma, incentives
- If a market maker, what is the arrangement: loan, options, retainer
- What does that cost you per month, all in
- **What happens to your liquidity if that relationship ends tomorrow**
- How much of this is governance-approved versus operational discretion
- How often does the community weigh in on liquidity decisions
- Have you had a liquidity crisis? What happened
- Are you paying incentives to attract LPs? What is that costing, and is it working
- If you could stop paying incentives and get the same depth, what would that be worth

**The incentive spend question is the pricing anchor for this entire branch.** A protocol emitting six figures a month in token incentives to rent liquidity has a budget line that already exists and that they would rather not be spending. That is a far easier sale than convincing a retail LP to pay a performance fee, and it is denominated in numbers they already track.

---

## Section 3: Constraints (shared)

- Where do the assets custody: multisig, MPC, institutional custodian, hot wallet
- Who are the signers, and how many
- Can a smart contract take discretionary action over those funds today? Under what limits
- What is your policy on token approvals
- Would a system that can adjust positions but never withdraw be treated differently by your policy than one that can withdraw
- What security review does a new contract have to pass
- Has legal or compliance ever killed something you wanted to use

That fourth question is the one to press. If non-custodial, adjust-only architecture materially shortens their approval path, that is a design requirement rather than a marketing point, and it is worth knowing before you build.

## Section 4: Reporting and attribution (shared)

- What reporting do you have to produce, to whom, how often
- How do you produce it today
- How long does that take
- What is hardest to report accurately
- Does anyone ask questions you struggle to answer from the data you have
- Do you need any of this in a form an accountant or auditor accepts

Reporting is frequently the unglamorous pain that actually gets budget approved in this cohort, and it is invisible in the retail script. If a treasury lead is spending two days a month assembling a liquidity report by hand, that is a concrete, defensible purchase.

## Section 5: Buying (shared)

- Have you bought any tooling for this? What, and how did that go
- Who decides, who signs, where does the budget come from
- Is there a line item for this, or does it come out of something else
- What does procurement look like: trial, pilot, security review, contract
- How long from first conversation to deployed
- What is the smallest amount you could spend without a full approval process
- What killed the last vendor conversation you had
- Do you prefer a tool your team runs, or a service with a human accountable for it

The last question separates software from managed service, and this cohort frequently wants the second even when the first is cheaper. Arrakis and Gamma's positioning suggests the market has already answered this, but confirm it directly.

## Section 6: Close

- What is the biggest operational risk in how you do this today
- If you could hand one part of this to someone else permanently, what would it be
- What would have to be true for you to try something new here
- Who else should I be talking to

Referral last, as always, and in this cohort it is the most valuable question in the script. One warm introduction from a treasury lead is worth more than the entire rest of your recruiting funnel for this segment.

---

## After discovery: the pitch

Leave five minutes. Mark the transition explicitly. Then describe what you are building and ask three things:

- Is this solving a problem you have, or a problem you would have to be convinced you have
- What is the first thing your team would ask about it
- What would kill it internally

The third question is the one that pays. They know their own approval process and they will tell you where you die in it.

---

## Recruiting note

This cohort will not come through YouTube comments, Discord, or Reddit. A null result from the social funnel is expected and is not evidence the segment does not exist.

Reaching them requires a separate motion: DAO governance forums and treasury working groups, protocol Discords via the core team rather than the general channel, the Draper network, other founders' investor bases, and warm introductions from anyone in this cohort you do manage to interview.

Do not let a zero here quietly talk you out of the segment. Per the category fee data, it is where the revenue is.

---

## Reading the aggregate

**Branch split.** Track A versus B counts. If B dominates among respondents with real budget, the company is a B2B liquidity service and the retail product is a distribution channel at best.

**Approval path length.** Median time from first conversation to deployed, across the cohort. This is your sales cycle and it belongs in the deck.

**Custody architecture as a gate.** Count how many say adjust-only, non-custodial materially changes their approval path. If most do, that is a v1 architectural requirement, not a differentiator.

**Existing spend.** For Branch B, incentive spend per month. For Branch A, tooling spend and headcount time. Both give you a price ceiling grounded in an existing budget line rather than in stated willingness to pay.

**Reporting burden.** Hours per month spent producing liquidity reports by hand. Frequently the easiest thing to sell and the least discussed.

---

## Per-interview capture

- Cohort tag: `delegated_capital`, plus branch `fund` or `treasury` or `both`
- Entity type, book size, LP allocation, headcount touching decisions
- Mandate constraints: permitted chains, protocols, leverage, concentration limits
- Approval process: steps, signers, typical duration
- Custody architecture and signer count
- Adjust-only versus withdraw-capable: does it change the approval path, yes or no
- Current management approach: internal, market maker, protocol, incentives
- Current all-in monthly spend, and what it covers
- For treasuries: incentive emissions per month, and stated effectiveness
- Reporting obligations: to whom, how often, hours to produce
- Key-person risk: what breaks when the operator is unavailable
- Last vendor conversation and what killed it
- Software versus managed service preference, with quote
- Post-pitch: stated internal blocker
- Referrals offered
