export type Answers = Record<string, string | string[] | undefined>;

export type StepType = 'single' | 'multi' | 'open' | 'group' | 'text';

export type StepBase = {
	id: string;
	prompt: string | ((answers: Answers) => string);
	helper?: string;
	type: StepType;
	/** Defaults to true (always visible) when omitted. */
	visible?: (answers: Answers) => boolean;
	/** Defaults to true (required) when omitted. */
	optional?: boolean;
};

export type Option = { value: string; label: string };

export type SingleSelectStep = StepBase & {
	type: 'single';
	/** A function is used when the option set depends on a prior answer — e.g. "which of these" drawn from a previous multi-select's picks. */
	options: Option[] | ((answers: Answers) => Option[]);
};

export type MultiSelectStep = StepBase & {
	type: 'multi';
	options: Option[];
	/** Defaults to true (adds an "Other (specify)" option) when omitted. */
	other?: boolean;
	/**
	 * Per-option-value follow-up fields, rendered together on a group step
	 * elsewhere in the flow. Also used to warn before an uncheck would
	 * silently discard already-answered follow-ups for that value.
	 */
	followups?: Record<string, Step[]>;
};

export type OpenTextStep = StepBase & {
	type: 'open';
	/** Minimum character count required, if gated. */
	minChars?: number;
};

/**
 * Short single-line input — for structured values like a wallet address,
 * not narrative answers. Distinct from OpenTextStep, which renders as a
 * multi-line textarea meant for prose.
 */
export type TextStep = StepBase & {
	type: 'text';
	placeholder?: string;
	/** Format check beyond "non-empty" — e.g. does this look like a valid address for the selected chain. */
	validate?: (value: string, answers: Answers) => boolean;
	/** Shown when validate() fails on a non-empty value. */
	invalidMessage?: string;
};

/**
 * Renders a dynamic set of sub-fields together on one screen — e.g. every
 * follow-up question for whichever reasons were checked on a prior
 * multi-select, so answering several doesn't mean paging through several
 * screens. Valid only once every currently-resolved sub-field is valid.
 */
export type GroupStep = StepBase & {
	type: 'group';
	groups: (answers: Answers) => { label?: string; fields: Step[] }[];
};

export type Step = SingleSelectStep | MultiSelectStep | OpenTextStep | GroupStep | TextStep;

export const OTHER_VALUE = 'other';
