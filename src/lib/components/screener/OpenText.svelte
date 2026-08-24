<script lang="ts">
	let {
		value,
		minChars,
		placeholder = 'Type your answer…',
		onchange,
		onpaste
	}: {
		value: string;
		minChars?: number;
		placeholder?: string;
		onchange: (value: string) => void;
		onpaste?: () => void;
	} = $props();

	let count = $derived(value.trim().length);
</script>

<div class="field">
	<textarea
		{placeholder}
		{value}
		oninput={(e) => onchange((e.currentTarget as HTMLTextAreaElement).value)}
		onpaste={() => onpaste?.()}
		rows={minChars ? 5 : 3}></textarea>
	{#if minChars}
		<p class="counter" class:met={count >= minChars}>
			{count} / {minChars} characters minimum
		</p>
	{/if}
</div>

<style>
	.field {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		width: 100%;
	}

	textarea {
		width: 100%;
		padding: 0.85rem 1rem;
		border-radius: 12px;
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: inherit;
		font-size: 1rem;
		font-family: inherit;
		resize: vertical;
	}

	textarea:focus {
		outline: 2px solid var(--color-crimson);
		outline-offset: 1px;
	}

	.counter {
		margin: 0;
		font-size: 0.85rem;
		color: var(--color-muted-text);
	}

	.counter.met {
		color: var(--color-crimson);
	}
</style>
