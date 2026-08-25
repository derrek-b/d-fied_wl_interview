<script lang="ts">
	import { hasAnswer } from '$lib/screener/flow';
	import { promptText } from '$lib/screener/questions';
	import type { Answers, MultiSelectStep, Step } from '$lib/screener/types';
	import SingleSelect from './SingleSelect.svelte';
	import MultiSelect from './MultiSelect.svelte';
	import OpenText from './OpenText.svelte';
	import TextField from './TextField.svelte';
	import StepField from './StepField.svelte';

	let {
		step,
		answers,
		compact = false,
		onpaste
	}: {
		step: Step;
		answers: Answers;
		compact?: boolean;
		onpaste?: (stepId: string) => void;
	} = $props();

	function asString(v: string | string[] | undefined): string {
		return typeof v === 'string' ? v : '';
	}

	function asArray(v: string | string[] | undefined): string[] {
		return Array.isArray(v) ? v : [];
	}

	function handleMultiChange(multiStep: MultiSelectStep, vals: string[], otherText: string) {
		const prevValues = asArray(answers[multiStep.id]);
		const removed = prevValues.filter((v) => !vals.includes(v));

		if (multiStep.followups) {
			for (const value of removed) {
				const fields = multiStep.followups[value];
				if (!fields) continue;
				const alreadyAnswered = fields.some((f) => hasAnswer(answers[f.id]));
				if (!alreadyAnswered) continue;

				const proceed = confirm(
					'Going back and removing this will also remove your answers to its follow-up questions. Continue?'
				);
				if (!proceed) return; // abort the whole change — selection stays as it was

				for (const f of fields) {
					delete answers[f.id];
					delete answers[`${f.id}__other`];
				}
			}
		}

		answers[multiStep.id] = vals;
		answers[`${multiStep.id}__other`] = otherText;
	}
</script>

<div class="step" class:compact>
	<svelte:element this={compact ? 'h3' : 'h2'} class="prompt"
		>{promptText(step, answers)}</svelte:element
	>
	{#if step.helper}
		<p class="helper">{step.helper}</p>
	{/if}

	{#key step.id}
		<div class="field">
			{#if step.type === 'single'}
				<SingleSelect
					options={typeof step.options === 'function' ? step.options(answers) : step.options}
					value={asString(answers[step.id])}
					onchange={(v) => (answers[step.id] = v)}
				/>
			{:else if step.type === 'multi'}
				<MultiSelect
					options={step.options}
					other={step.other ?? true}
					values={asArray(answers[step.id])}
					otherText={asString(answers[`${step.id}__other`])}
					onchange={(vals, otherText) => handleMultiChange(step, vals, otherText)}
				/>
			{:else if step.type === 'open'}
				<OpenText
					value={asString(answers[step.id])}
					minChars={step.minChars}
					onchange={(v) => (answers[step.id] = v)}
					onpaste={() => onpaste?.(step.id)}
				/>
			{:else if step.type === 'text'}
				{@const currentValue = asString(answers[step.id])}
				<TextField
					value={currentValue}
					placeholder={step.placeholder}
					invalid={currentValue.length > 0 &&
						!!step.validate &&
						!step.validate(currentValue, answers)}
					invalidMessage={step.invalidMessage}
					onchange={(v) => (answers[step.id] = v)}
				/>
			{:else}
				<div class="groups">
					{#each step.groups(answers) as group, i (group.label ?? i)}
						<div class="subgroup">
							{#if group.label}
								<p class="subgroup-label">{group.label}</p>
							{/if}
							{#each group.fields as field (field.id)}
								<StepField step={field} {answers} compact {onpaste} />
							{/each}
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/key}
</div>

<style>
	.step {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		max-width: 32rem;
	}

	.step.compact {
		gap: 0.6rem;
	}

	.prompt {
		margin: 0;
		font-size: 1.3rem;
		font-weight: 700;
		line-height: 1.35;
	}

	.compact > .prompt {
		font-size: 1.05rem;
	}

	.helper {
		margin: -0.6rem 0 0;
		font-size: 0.9rem;
		color: var(--color-muted-text);
	}

	.field {
		display: flex;
	}

	.groups {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		width: 100%;
	}

	.subgroup {
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
		padding-top: 1.25rem;
		border-top: 1px solid var(--color-border);
	}

	.subgroup:first-child {
		padding-top: 0;
		border-top: none;
	}

	.subgroup-label {
		margin: 0;
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--color-crimson);
	}
</style>
