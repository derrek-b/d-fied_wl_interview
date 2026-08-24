<script lang="ts">
	import logoUrl from '$lib/assets/logo.svg';

	let { size = 160 }: { size?: number } = $props();
</script>

<img class="logo" src={logoUrl} alt="D-Fied" style:width="{size}px" style:height="{size}px" />

<style>
	.logo {
		display: block;
		object-fit: contain;
	}
</style>
