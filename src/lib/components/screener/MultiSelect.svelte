<script lang="ts">
	import { OTHER_VALUE, type Option } from '$lib/screener/types';

	let {
		options,
		other = true,
		values,
		otherText,
		onchange
	}: {
		options: Option[];
		other?: boolean;
		values: string[];
		otherText: string;
		onchange: (values: string[], otherText: string) => void;
	} = $props();

	let allOptions = $derived(other ? [...options, { value: OTHER_VALUE, label: 'Other' }] : options);

	function toggle(value: string) {
		const next = values.includes(value) ? values.filter((v) => v !== value) : [...values, value];
		onchange(next, otherText);
	}
</script>

<div class="options" role="group">
	{#each allOptions as option (option.value)}
		<button
			type="button"
			class="option"
			class:selected={values.includes(option.value)}
			role="checkbox"
			aria-checked={values.includes(option.value)}
			onclick={() => toggle(option.value)}
		>
			<span class="box" aria-hidden="true"></span>
			{option.label}
		</button>
	{/each}

	{#if other && values.includes(OTHER_VALUE)}
		<input
			class="other-input"
			type="text"
			placeholder="Specify"
			value={otherText}
			oninput={(e) => onchange(values, (e.currentTarget as HTMLInputElement).value)}
			aria-label="Specify other"
		/>
	{/if}
</div>

<style>
	.options {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		width: 100%;
	}

	.option {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		width: 100%;
		text-align: left;
		padding: 0.85rem 1.1rem;
		border-radius: 12px;
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: inherit;
		font-size: 1rem;
		cursor: pointer;
		transition:
			background 0.15s ease,
			border-color 0.15s ease;
	}

	.option:hover {
		background: var(--color-border);
	}

	.option.selected {
		border-color: var(--color-crimson);
		background: color-mix(in srgb, var(--color-crimson) 8%, var(--color-surface));
	}

	.box {
		flex: none;
		width: 18px;
		height: 18px;
		border-radius: 5px;
		border: 1.5px solid var(--color-border);
	}

	.option.selected .box {
		border-color: var(--color-crimson);
		background: var(--color-crimson);
	}

	.other-input {
		width: 100%;
		padding: 0.75rem 1rem;
		border-radius: 12px;
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: inherit;
		font-size: 1rem;
		font-family: inherit;
	}

	.other-input:focus {
		outline: 2px solid var(--color-crimson);
		outline-offset: 1px;
	}
</style>
