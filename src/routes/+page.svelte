<script lang="ts">
	import { resolve } from '$app/paths';
	import Logo from '$lib/components/Logo.svelte';
</script>

<svelte:head>
	<title>D-Fied</title>
</svelte:head>

<main>
	<div class="brand">
		<Logo size={160} />
		<p class="wordmark"><span class="mark">D</span>-fied Labs</p>
	</div>

	<p class="tagline">
		DeFi management questionaire. Help shape the future of DeFi. Take a shot at $25 USDC. The best
		respondents will have a chance at $100 USDC.
	</p>

	<a class="cta" href={resolve('/interview')}>Start the Interview</a>
</main>

<style>
	main {
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		padding: 2rem;
		text-align: center;
	}

	.brand {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.wordmark {
		margin: 0;
		font-size: 1.85rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		color: var(--color-text);
		text-shadow: 0 2px 8px rgb(0 0 0 / 15%);
	}

	.wordmark .mark {
		color: var(--color-text);
	}

	.tagline {
		max-width: 32rem;
		margin: 0;
		font-size: 1.15rem;
		color: var(--color-muted-text);
	}

	.cta {
		display: inline-block;
		padding: 0.85rem 2rem;
		border-radius: 999px;
		border: none;
		background: var(--color-accent);
		color: var(--color-accent-contrast);
		font-size: 1rem;
		font-weight: 600;
		text-decoration: none;
		cursor: pointer;
	}

	.cta:hover {
		opacity: 0.9;
	}
</style>
