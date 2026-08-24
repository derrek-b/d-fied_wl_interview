import { OTHER_VALUE, type Answers, type Option, type Step } from './types';

function opt(label: string, value?: string): Option {
	return {
		value:
			value ??
			label
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '_')
				.replace(/^_+|_+$/g, ''),
		label
	};
}

function opts(labels: string[]): Option[] {
	return labels.map((label) => opt(label));
}

/**
 * True only when D3 is *exactly* 'None' — if a real platform (or 'Other') is
 * also checked, that's stronger evidence than the catch-all and wins, so this
 * deliberately isn't just `.includes('none')`.
 */
function usedNoPlatforms(a: Answers): boolean {
	return Array.isArray(a.D3) && a.D3.length === 1 && a.D3[0] === 'none';
}

/** A1 — the only step outside MAIN_STEPS / NONLP_STEPS. Always the first question. */
export const GATE_STEP: Step = {
	id: 'A1',
	type: 'single',
	prompt: 'Have you ever deposited liquidity into a pool on a DEX?',
	options: [opt('Yes', 'yes'), opt('No', 'no')]
};

// G2/G3 are identical wording on both the Yes and No paths — shared objects so
// the two branches can't drift apart in copy. Only G1 differs: the Yes path's
// "Forget LP management" preamble doesn't make sense for a cohort that was
// never asked deep LP-specific questions to forget.
const G2_STEP: Step = {
	id: 'G2',
	type: 'open',
	prompt: 'If someone built one thing that made your on-chain life easier, what would it be?'
};

const G3_STEP: Step = {
	id: 'G3',
	type: 'open',
	optional: true,
	prompt: 'Anything we should have asked and didn’t?'
};

/** Reachable only when A1 === 'yes'. */
export const MAIN_STEPS: Step[] = [
	// Section B — who you are
	{
		id: 'B1',
		type: 'single',
		prompt: 'How long have you been providing liquidity?',
		options: opts(['Under 3 months', '3 to 12 months', '1 to 2 years', 'Over 2 years'])
	},
	{
		id: 'B2',
		type: 'multi',
		prompt: 'Which chains have you deployed on?',
		options: opts([
			'Ethereum',
			'Arbitrum',
			'Base',
			'Optimism',
			'Polygon',
			'BNB',
			'Solana',
			'Cardano',
			'Sui',
			'Berachain'
		])
	},
	{
		id: 'B3',
		type: 'multi',
		prompt: 'Which DEXes have you used?',
		options: opts([
			'Uniswap v3/v4',
			'Raydium',
			'Orca',
			'Meteora',
			'Curve',
			'Balancer',
			'PancakeSwap',
			'Aerodrome',
			'Minswap',
			'SundaeSwap'
		])
	},
	{
		id: 'B4',
		type: 'single',
		prompt: 'Largest single position you’ve ever opened, at deployment:',
		options: opts(['Under $1K', '$1K to $10K', '$10K to $50K', '$50K to $250K', 'Over $250K'])
	},
	{
		id: 'B5',
		type: 'single',
		prompt: 'Total currently deployed across all positions:',
		options: opts([
			'$0 right now',
			'Under $1K',
			'$1K to $10K',
			'$10K to $50K',
			'$50K to $250K',
			'Over $250K'
		])
	},
	{
		id: 'B6',
		type: 'single',
		prompt: 'Whose capital have you deployed?',
		options: opts(['My own', 'A fund or clients', 'A DAO or protocol treasury', 'A mix'])
	},
	{
		id: 'B7',
		type: 'single',
		prompt: 'How many positions do you typically have open at once?',
		options: opts(['1', '2 to 5', '6 to 20', 'More than 20'])
	},
	{
		id: 'B8',
		type: 'single',
		prompt: 'How recently have you had open positions?',
		options: opts(['Right now', 'Within the last month', '1 to 6 months ago', 'Over 6 months ago'])
	},

	// Section C — what you actually do
	{
		id: 'C1',
		type: 'multi',
		prompt: 'Which of these strategies have you ever run?',
		options: opts([
			'Simple full-range or CPMM pools',
			'Concentrated liquidity, managing in and out of range',
			'Hedged or delta-neutral positions',
			'Lend → borrow → LP loops',
			'Leveraged LP',
			'Active market making'
		])
	},
	{
		id: 'C2',
		type: 'open',
		minChars: 80,
		prompt:
			'What does it actually take to keep the strategies you picked running well — and how often do you have to step in?'
	},
	{
		id: 'C3',
		type: 'open',
		minChars: 80,
		prompt: 'Which of your selected strategies has worked best, and why do you think that was?',
		visible: (a) => Array.isArray(a.C1) && a.C1.length > 1
	},
	{
		id: 'C4',
		type: 'multi',
		prompt: 'How do you track your deployed positions?',
		options: opts([
			'DEX interface',
			'Block explorer',
			'Spreadsheet',
			'Third-party dashboard',
			'Script, bot, or alert I built',
			'I don’t really track it'
		])
	},
	{
		id: 'C6',
		type: 'open',
		minChars: 80,
		prompt:
			'Tell us about the last time managing a position cost you money, time, or sleep. What happened?'
	},
	{
		id: 'C6a',
		type: 'multi',
		prompt: 'Closest description of what went wrong?',
		options: opts([
			'Position went out of range and sat idle while I wasn’t watching',
			'Hedge drifted out of balance',
			'Got liquidated or close to it',
			'Gas ate the returns',
			'Lost track of what I had where',
			'Fees or rewards went uncompounded',
			'Nothing like this has happened'
		])
	},

	// Section D — automation, wanted and tried
	{
		id: 'D7',
		type: 'single',
		prompt: 'Do you currently pay fees to any platform or tool for LP management or automation?',
		options: opts(['Yes', 'No'])
	},
	{
		id: 'D1',
		type: 'single',
		prompt: 'Have you ever gone looking for a tool to help manage or automate your positions?',
		options: [
			opt('Yes, found and used something', 'found'),
			opt('Yes, but nothing fit', 'nothing_fit'),
			opt('No, never looked', 'never_looked')
		]
	},
	{
		id: 'D2a',
		type: 'open',
		minChars: 80,
		prompt: 'You went looking for a tool. What were you looking for the tool to do?',
		visible: (a) => a.D1 === 'found'
	},
	{
		id: 'D2b',
		type: 'multi',
		prompt: 'What were you trying to fix?',
		visible: (a) => a.D1 === 'found',
		options: opts([
			'Positions going out of range unnoticed',
			'Time spent monitoring',
			'Gas cost of individual management',
			'Tracking across chains or protocols',
			'Executing multi-step strategies',
			'Compounding fees and rewards',
			'Keeping a hedge balanced'
		])
	},
	{
		id: 'D2c',
		type: 'open',
		minChars: 80,
		prompt: 'What functionality were you looking for that you couldn’t find?',
		visible: (a) => a.D1 === 'nothing_fit'
	},
	{
		id: 'D2d',
		type: 'multi',
		prompt: 'Closest reason nothing fit?',
		visible: (a) => a.D1 === 'nothing_fit',
		options: opts([
			'Didn’t support my chain or DEX',
			'Didn’t support my strategy',
			'Couldn’t set my own parameters',
			'Fees too high',
			'Custody or trust concerns',
			'Too complicated to set up',
			'Minimum position size too high'
		])
	},
	{
		id: 'D2e',
		type: 'single',
		prompt: 'Which is closest?',
		visible: (a) => a.D1 === 'never_looked',
		options: opts([
			'Hasn’t been enough of a problem',
			'Didn’t know tools like that existed',
			'Assumed they wouldn’t work well',
			'Don’t trust them with my funds',
			'I enjoy managing it myself',
			'My positions are too small to justify it'
		])
	},
	{
		id: 'D2f',
		type: 'open',
		minChars: 80,
		prompt: 'Please provide details.',
		visible: (a) => a.D1 === 'never_looked'
	},
	{
		id: 'D3',
		type: 'multi',
		prompt: 'Have you used any of these platforms to help manage or automate your positions?',
		other: true,
		options: [
			...opts([
				'vfat.io',
				'Krystal',
				'Revert',
				'Arrakis',
				'Gamma',
				'Steer',
				'ICHI',
				'Kamino',
				'HawkFi',
				'Charm',
				'Beefy'
			]),
			opt('None', 'none')
		]
	},
	{
		id: 'D4',
		type: 'single',
		prompt: 'Still using them?',
		// D3 = 'None' already implies this answer, so don't ask a question with no
		// information left in it — skip straight to the D5e/D5f "never used one" branch.
		visible: (a) => !usedNoPlatforms(a),
		options: [
			opt('Yes, actively', 'active'),
			opt('Used to, stopped', 'stopped'),
			opt('Tried briefly, didn’t stick', 'brief')
		]
	},
	{
		id: 'D5a',
		type: 'open',
		minChars: 80,
		prompt: 'What do they handle that you wouldn’t want to go back to doing yourself?',
		visible: (a) => a.D4 === 'active' && !usedNoPlatforms(a)
	},
	{
		id: 'D5b',
		type: 'multi',
		prompt: 'What justifies what they cost you?',
		visible: (a) => a.D4 === 'active' && !usedNoPlatforms(a),
		options: opts([
			'Saves me time',
			'Executes faster than I can',
			'Catches things I’d miss',
			'Cheaper than my own gas',
			'Does something I can’t do manually',
			'I’m not sure they justify it'
		])
	},
	{
		id: 'D5c',
		type: 'open',
		minChars: 80,
		prompt: 'What happened that made you decide to stop using them?',
		visible: (a) => (a.D4 === 'stopped' || a.D4 === 'brief') && !usedNoPlatforms(a)
	},
	{
		id: 'D5d',
		type: 'multi',
		prompt: 'Closest reason?',
		visible: (a) => (a.D4 === 'stopped' || a.D4 === 'brief') && !usedNoPlatforms(a),
		options: opts([
			'Returns didn’t justify the fees',
			'They did something I didn’t expect',
			'I lost money using them',
			'Too complicated to configure',
			'Moved to a chain or strategy they didn’t support',
			'Stopped LPing altogether',
			'Lost confidence in the team behind them'
		])
	},
	{
		id: 'D5e',
		type: 'multi',
		prompt: 'What’s kept you from trying?',
		visible: usedNoPlatforms,
		options: opts([
			'Don’t trust them with funds',
			'Fees',
			'Doesn’t support what I do',
			'Didn’t know they existed',
			'Prefer to manage it myself',
			'Positions too small',
			'Never got around to it'
		])
	},
	{
		id: 'D5f',
		type: 'open',
		prompt: 'Say more.',
		visible: usedNoPlatforms
	},
	{
		id: 'D6',
		type: 'open',
		minChars: 80,
		prompt: 'What would you want a tool to do that nothing you’ve seen does?'
	},

	// Section E — handoff and trust
	// Trimmed from 8 questions to 3. E2/E2a, E4a, E5, and E6 were cut — they're
	// duplicated, and answered more richly against revealed behavior rather than
	// hypotheticals, by Stage 2 (FOLLOW-UP_FRUSTRATED_MANAGER.md, Sections 7 & 8).
	// E1 and E4 stay because their aggregate skew is the only population-level
	// read on Assumptions 3 and 4 — Stage 2 only reaches whoever opts into a call.
	{
		id: 'E1',
		type: 'single',
		prompt:
			'If you are or were looking to fully automate your DeFi strategies, which would you prefer?',
		options: [
			opt('I set the parameters, something else automates the execution', 'set_parameters'),
			opt('I hand off the strategy decisions entirely', 'hand_off'),
			opt('Neither, I want to keep doing it myself', 'neither')
		]
	},
	{
		id: 'E3',
		type: 'single',
		prompt:
			'Would capital need to stay in an individual vault, or is a pooled vault with other users fine?',
		// "Neither" on E1 already implies the most negative possible read on
		// trust/handoff — asking vault/custody-trust mechanics past that point
		// would be forcing a hypothetical on someone who's rejected the premise.
		visible: (a) => a.E1 !== 'neither',
		options: opts(['Individually owned', 'Pooled is fine', 'Depends'])
	},
	{
		id: 'E3a',
		type: 'open',
		prompt: 'What would it depend on?',
		visible: (a) => a.E3 === 'depends' && a.E1 !== 'neither'
	},
	{
		id: 'E4',
		type: 'multi',
		prompt: 'What would a platform need before you’d let it manage your funds?',
		visible: (a) => a.E1 !== 'neither',
		options: opts([
			'Audits',
			'Time in operation',
			'TVL above some threshold',
			'Open source code',
			'Can only adjust positions, never withdraw',
			'Insurance or coverage',
			'Someone I know using it',
			'Nothing would'
		])
	},

	// Section G — open ground
	{
		id: 'G1',
		type: 'open',
		prompt: 'Forget LP management. What’s the most annoying part of using DeFi generally, for you?'
	},
	G2_STEP,
	G3_STEP
];

/** Reachable only when A1 === 'no'. */
const H2_OPTIONS: Option[] = [
	opt('Too complicated', 'too_complicated'),
	opt('Too much effort', 'too_much_effort'),
	opt('Returns don’t justify it', 'returns_dont_justify'),
	opt('Don’t trust myself to manage it', 'dont_trust_myself'),
	opt('Don’t trust the platforms', 'dont_trust_platforms'),
	opt('Risk of losing money on the position', 'risk_of_loss'),
	opt('Not enough capital to justify gas or fees', 'not_enough_capital'),
	opt('Don’t understand the mechanics well enough to judge the risk', 'dont_understand_mechanics'),
	opt('Didn’t know it was an option', 'didnt_know_option')
];

const H2_LABELS: Record<string, string> = Object.fromEntries(
	H2_OPTIONS.map((o) => [o.value, o.label])
);

const RETURN_RANGE_OPTIONS: Option[] = opts([
	'Under 1%',
	'1–5%',
	'5–10%',
	'10–20%',
	'20–30%',
	'Over 30%'
]);

/**
 * Every reason checked on H2 contributes its own entry here. Each becomes
 * its own follow-up page (see getH2FollowupSteps below) — a respondent who
 * checks 3 reasons gets 3 separate pages, not one page with everything on
 * it. A field's own `visible` still applies within its page, e.g. the APY
 * question below only shows once H2_returns_1 is answered "yes".
 */
const H2_FOLLOWUPS: Record<string, Step[]> = {
	too_complicated: [
		{
			id: 'H2_complicated_1',
			type: 'open',
			minChars: 80,
			prompt: 'What specifically is too complicated?'
		},
		{
			id: 'H2_complicated_2',
			type: 'open',
			minChars: 80,
			prompt: 'What would a less complex system look like to you?'
		}
	],
	too_much_effort: [
		{ id: 'H2_effort_1', type: 'open', minChars: 80, prompt: 'What about it is too much effort?' },
		{
			id: 'H2_effort_2',
			type: 'open',
			minChars: 80,
			prompt: 'What would an effortless system look like to you?'
		}
	],
	returns_dont_justify: [
		{
			id: 'H2_returns_1',
			type: 'single',
			prompt: 'Are you currently earning DeFi rewards outside of LP positioning?',
			options: opts(['Yes', 'No'])
		},
		{
			id: 'H2_returns_sources',
			type: 'multi',
			prompt: 'What are you using to earn that yield?',
			visible: (a) => a.H2_returns_1 === 'yes',
			options: opts([
				'Staking (native or liquid staking)',
				'Managed vaults (e.g. Yearn, Beefy)',
				'Lending markets (e.g. Aave, Compound)',
				'Holding stablecoins or other assets on a CEX for interest or rewards',
				'Airdrops or points programs'
			])
		},
		{
			id: 'H2_returns_2',
			type: 'single',
			prompt: 'What’s your current APY?',
			visible: (a) => a.H2_returns_1 === 'yes',
			options: RETURN_RANGE_OPTIONS
		},
		{
			id: 'H2_returns_3',
			type: 'single',
			prompt: 'What level of return would make LP management worth it to you?',
			options: RETURN_RANGE_OPTIONS
		}
	],
	dont_trust_myself: [
		{
			id: 'H2_trust_self_1',
			type: 'open',
			minChars: 80,
			prompt: 'What specifically do you not trust in yourself to manage LP positions?'
		},
		{
			id: 'H2_trust_self_2',
			type: 'open',
			minChars: 80,
			prompt: 'What could a platform or service do to help get you over that?'
		}
	],
	dont_trust_platforms: [
		{
			id: 'H2_trust_platforms_1',
			type: 'open',
			minChars: 80,
			prompt: 'What platforms have you looked into and found untrustworthy?'
		},
		{
			id: 'H2_trust_platforms_2',
			type: 'open',
			minChars: 80,
			prompt: 'What didn’t you trust about them?'
		},
		{
			id: 'H2_trust_platforms_3',
			type: 'open',
			minChars: 80,
			prompt: 'What could those platforms do to earn your trust?'
		}
	],
	risk_of_loss: [
		{
			id: 'H2_risk_1',
			type: 'open',
			minChars: 80,
			prompt: 'What specific risks concern you?'
		},
		{
			id: 'H2_risk_2',
			type: 'open',
			minChars: 80,
			prompt: 'What would make you feel like that risk was actually being managed?'
		}
	],
	not_enough_capital: [
		{
			id: 'H2_capital_1',
			type: 'open',
			minChars: 80,
			prompt: 'What amount would you need before it felt worth it?'
		},
		{
			id: 'H2_capital_pooling',
			type: 'single',
			prompt:
				'Would you consider pooling your capital with other users to reach a size that’s worth managing?',
			options: opts(['Yes', 'No'])
		}
	],
	dont_understand_mechanics: [
		{
			id: 'H2_mechanics_1',
			type: 'open',
			minChars: 80,
			prompt: 'What parts of how it works are not clear to you?'
		},
		{
			id: 'H2_mechanics_2',
			type: 'open',
			minChars: 80,
			prompt: 'What would help you feel confident enough to evaluate it yourself?'
		}
	],
	didnt_know_option: [
		{
			id: 'H2_unaware_1',
			type: 'open',
			minChars: 80,
			prompt: 'What would you want to understand about it before trying?'
		}
	]
	// 'other' deliberately has no entry — its free-text specify field is the only follow-up.
};

export const NONLP_STEPS: Step[] = [
	{
		id: 'H1',
		type: 'single',
		prompt: 'Have you considered providing liquidity?',
		options: opts([
			'Looked into it, decided against',
			'Still considering',
			'Never really considered it'
		])
	},
	{
		id: 'H2',
		type: 'multi',
		prompt: 'Main thing(s) keeping you out? Check all that apply.',
		options: H2_OPTIONS,
		followups: H2_FOLLOWUPS
	},

	// Shared closing question, regardless of which reason(s) were selected.
	// Actual position is dynamic — flow.ts inserts one follow-up page per
	// selected H2 reason directly before this step.
	{
		id: 'H4',
		type: 'single',
		prompt: 'Would you trust an experienced team to manage your LP positions for you?',
		options: opts(['Absolutely', 'Probably', 'Maybe', 'Probably not', 'Never'])
	},

	// Open ground — same safety-valve purpose as the Yes path's Section G,
	// last so it doesn't anchor the reason-specific answers before it.
	{
		id: 'G1',
		type: 'open',
		prompt: 'What’s the most annoying part of using DeFi generally, for you?'
	},
	G2_STEP,
	G3_STEP
];

/**
 * One group step per reason selected on H2, each holding just that
 * reason's own follow-up questions — a respondent who checks 2 reasons
 * gets 2 follow-up pages, not one page with everything bundled together.
 * Order follows H2_OPTIONS, not click order, so the sequence is stable.
 */
export function getH2FollowupSteps(answers: Answers): Step[] {
	const selected = Array.isArray(answers.H2) ? answers.H2 : [];
	const steps: Step[] = H2_OPTIONS.filter(
		(o) => selected.includes(o.value) && H2_FOLLOWUPS[o.value]
	).map((o) => ({
		id: `H2_followups_${o.value}`,
		type: 'group',
		prompt: 'A bit more on that.',
		groups: (a: Answers) => [
			{
				label: H2_LABELS[o.value],
				fields: H2_FOLLOWUPS[o.value].filter((f) => !f.visible || f.visible(a))
			}
		]
	}));

	if (selected.includes(OTHER_VALUE)) {
		steps.push({
			id: 'H2_followups_other',
			type: 'group',
			prompt: 'A bit more on that.',
			groups: (a: Answers) => {
				const otherText = a['H2__other'];
				const label = typeof otherText === 'string' && otherText.trim() ? otherText : 'Other';
				return [
					{
						label,
						fields: [
							{
								id: 'H2_other_1',
								type: 'open',
								minChars: 80,
								prompt: 'Can you explain that in more detail?'
							}
						]
					}
				];
			}
		});
	}

	return steps;
}

const EVM_CHAIN_OPTIONS: Option[] = [
	opt('Ethereum Mainnet', 'ethereum'),
	opt('Base', 'base'),
	opt('Arbitrum', 'arbitrum'),
	opt('BNB Chain (BSC)', 'bsc')
];

const EVM_CHAIN_LABELS: Record<string, string> = Object.fromEntries(
	EVM_CHAIN_OPTIONS.map((o) => [o.value, o.label])
);

const EVM_ADDRESS_PATTERN = /^0x[a-fA-F0-9]{40}$/;
// Lightweight base58 charset + length check, not a full base58 decode and
// 32-byte verification — good enough to catch an obviously wrong or
// malformed entry without pulling in a decode library for a screener field.
const SOLANA_ADDRESS_PATTERN = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

function isValidWalletAddress(value: string, answers: Answers): boolean {
	if (answers.I2_network === 'solana') return SOLANA_ADDRESS_PATTERN.test(value);
	if (answers.I2_network === 'evm') return EVM_ADDRESS_PATTERN.test(value);
	return false;
}

/** Always last, once the main-vs-nonlp branch resolves. */
export const CONTACT_STEPS: Step[] = [
	{
		id: 'I1',
		type: 'open',
		prompt: 'Email or Telegram',
		helper:
			'So we can reach you if you’re selected for a follow-up conversation and the $100 USDC raffle.'
	},
	{
		id: 'I2_network',
		type: 'single',
		prompt: 'Which network is your wallet on (for USDC transfer if you win a raffle)?',
		options: [
			opt('Solana', 'solana'),
			opt('EVM (Ethereum, Base, Arbitrum, BNB Chain, etc.)', 'evm')
		]
	},
	{
		id: 'I2_chain',
		type: 'single',
		prompt: 'Which EVM chain would you like your USDC sent on?',
		visible: (a) => a.I2_network === 'evm',
		options: EVM_CHAIN_OPTIONS
	},
	{
		id: 'I2',
		type: 'text',
		prompt: (a) => {
			if (a.I2_network === 'solana') return 'Your Solana wallet address';
			const chainValue = typeof a.I2_chain === 'string' ? a.I2_chain : undefined;
			const chainLabel = chainValue ? EVM_CHAIN_LABELS[chainValue] : undefined;
			return chainLabel ? `Your ${chainLabel} wallet address` : 'Your EVM wallet address';
		},
		helper:
			'For your USDC payout if you’re selected. Any wallet works — doesn’t need to be your primary one.',
		placeholder: 'Paste your wallet address',
		validate: isValidWalletAddress,
		invalidMessage: 'That doesn’t look like a valid address for the network you selected.'
	},
	{
		id: 'I3',
		type: 'single',
		prompt:
			'Open to a Zoom/Meets follow-up conversation? Everyone who does one is entered in the $100 USDC raffle.',
		options: opts(['Yes', 'No'])
	}
];

export function isMultiSelectStep(step: Step): step is Step & { type: 'multi'; options: Option[] } {
	return step.type === 'multi';
}

export function isSingleSelectStep(
	step: Step
): step is Step & { type: 'single'; options: Option[] } {
	return step.type === 'single';
}

export function promptText(step: Step, answers: Answers): string {
	return typeof step.prompt === 'function' ? step.prompt(answers) : step.prompt;
}

/**
 * Every leaf-level field, across both branches, with group steps (the H2
 * follow-up pages) resolved into their nested fields. Used server-side to
 * look up which fields carry a minChars gate for a given completed
 * response — safe to call with any answers object, since branches/pages
 * the respondent never saw just won't have a matching key in `answers`.
 */
export function getAllLeafSteps(answers: Answers): Step[] {
	const flatten = (steps: Step[]): Step[] =>
		steps.flatMap((s) =>
			s.type === 'group' ? flatten(s.groups(answers).flatMap((g) => g.fields)) : [s]
		);

	return flatten([
		GATE_STEP,
		...MAIN_STEPS,
		...NONLP_STEPS,
		...getH2FollowupSteps(answers),
		...CONTACT_STEPS
	]);
}
