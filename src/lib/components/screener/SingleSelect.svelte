<script lang="ts">
	import type { Option } from '$lib/screener/types';

	let {
		options,
		value,
		onchange
	}: {
		options: Option[];
		value?: string;
		onchange: (value: string) => void;
	} = $props();
</script>

<div class="options" role="radiogroup">
	{#each options as option (option.value)}
		<button
			type="button"
			class="option"
			class:selected={value === option.value}
			role="radio"
			aria-checked={value === option.value}
			onclick={() => onchange(option.value)}
		>
			{option.label}
		</button>
	{/each}
</div>

<style>
	.options {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		width: 100%;
	}

	.option {
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
</style>
