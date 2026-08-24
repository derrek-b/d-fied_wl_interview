<script lang="ts">
	let { current, total }: { current: number; total: number } = $props();

	let pct = $derived(total > 0 ? Math.round(((current + 1) / total) * 100) : 0);
</script>

<div class="track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
	<div class="fill" style:width="{pct}%"></div>
</div>

<style>
	.track {
		width: 100%;
		max-width: 32rem;
		height: 6px;
		border-radius: 999px;
		background: var(--color-border);
		overflow: hidden;
	}

	.fill {
		height: 100%;
		background: var(--color-crimson);
		transition: width 0.2s ease;
	}
</style>
