<script lang="ts">
	let {
		value,
		placeholder = 'Type your answer…',
		invalid = false,
		invalidMessage,
		onchange
	}: {
		value: string;
		placeholder?: string;
		invalid?: boolean;
		invalidMessage?: string;
		onchange: (value: string) => void;
	} = $props();
</script>

<div class="field">
	<input
		type="text"
		class:invalid
		{placeholder}
		{value}
		oninput={(e) => onchange((e.currentTarget as HTMLInputElement).value)}
		spellcheck="false"
		autocomplete="off"
	/>
	{#if invalid && invalidMessage}
		<p class="error">{invalidMessage}</p>
	{/if}
</div>

<style>
	.field {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		width: 100%;
	}

	input {
		width: 100%;
		padding: 0.85rem 1rem;
		border-radius: 12px;
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: inherit;
		font-size: 1rem;
		font-family: ui-monospace, 'SF Mono', 'IBM Plex Mono', monospace;
	}

	input:focus {
		outline: 2px solid var(--color-crimson);
		outline-offset: 1px;
	}

	input.invalid {
		border-color: var(--color-crimson);
	}

	.error {
		margin: 0;
		font-size: 0.85rem;
		color: var(--color-crimson);
	}
</style>
