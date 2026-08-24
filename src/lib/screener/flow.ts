import { CONTACT_STEPS, GATE_STEP, MAIN_STEPS, NONLP_STEPS, getH2FollowupSteps } from './questions';
import { OTHER_VALUE, type Answers, type Step } from './types';

export function getVisibleSteps(answers: Answers): Step[] {
	const steps: Step[] = [GATE_STEP];

	if (answers.A1 === 'yes') {
		steps.push(...MAIN_STEPS.filter((s) => !s.visible || s.visible(answers)));
	} else if (answers.A1 === 'no') {
		const nonlpSteps = NONLP_STEPS.filter((s) => !s.visible || s.visible(answers));
		const h2Index = nonlpSteps.findIndex((s) => s.id === 'H2');
		if (h2Index === -1) {
			steps.push(...nonlpSteps);
		} else {
			steps.push(
				...nonlpSteps.slice(0, h2Index + 1),
				...getH2FollowupSteps(answers),
				...nonlpSteps.slice(h2Index + 1)
			);
		}
	} else {
		return steps;
	}

	steps.push(...CONTACT_STEPS.filter((s) => !s.visible || s.visible(answers)));
	return steps;
}

function selectedValues(step: Step, answers: Answers): string[] {
	const raw = answers[step.id];
	return Array.isArray(raw) ? raw : raw ? [raw] : [];
}

export function hasAnswer(raw: string | string[] | undefined): boolean {
	if (Array.isArray(raw)) return raw.length > 0;
	return typeof raw === 'string' && raw.trim().length > 0;
}

function checkField(step: Step, answers: Answers): boolean {
	if (step.type === 'single') {
		return selectedValues(step, answers).length > 0;
	}

	if (step.type === 'multi') {
		const values = selectedValues(step, answers);
		if (values.length === 0) return false;
		if (values.includes(OTHER_VALUE)) {
			const otherText = answers[`${step.id}__other`];
			return typeof otherText === 'string' && otherText.trim().length > 0;
		}
		return true;
	}

	if (step.type === 'open') {
		const text = answers[step.id];
		const value = typeof text === 'string' ? text.trim() : '';
		if (step.optional) return true;
		if (!value) return false;
		return value.length >= (step.minChars ?? 0);
	}

	if (step.type === 'text') {
		const text = answers[step.id];
		const value = typeof text === 'string' ? text.trim() : '';
		if (step.optional) return true;
		if (!value) return false;
		return !step.validate || step.validate(value, answers);
	}

	// group — valid once every currently-resolved sub-field is valid
	return step
		.groups(answers)
		.flatMap((g) => g.fields)
		.every((field) => checkField(field, answers));
}

export function isStepValid(step: Step, answers: Answers): boolean {
	return checkField(step, answers);
}
