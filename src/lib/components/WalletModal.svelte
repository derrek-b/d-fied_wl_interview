<script lang="ts">
	let { open = $bindable(false) }: { open?: boolean } = $props();

	// Placeholder options — real connectors get wired in once we've scoped which
	// chains ship at launch (EVM + Solana likely via Reown AppKit; Cardano/Sui/XRP
	// need separate chain-specific connectors).
	const walletOptions = ['MetaMask', 'WalletConnect', 'Phantom', 'Coinbase Wallet'];

	function close() {
		open = false;
	}

	function selectWallet(name: string) {
		console.log(`TODO: connect wallet — ${name}`);
		close();
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
	}
</script>

<svelte:window onkeydown={open ? onKeydown : undefined} />

{#if open}
	<div class="backdrop" role="presentation" onclick={close} onkeydown={onKeydown}>
		<div
			class="modal"
			role="dialog"
			aria-modal="true"
			aria-labelledby="wallet-modal-title"
			tabindex="-1"
			onclick={(e) => e.stopPropagation()}
		>
			<header>
				<h2 id="wallet-modal-title">Connect a wallet</h2>
				<button class="close" onclick={close} aria-label="Close">&times;</button>
			</header>

			<ul class="options">
				{#each walletOptions as name (name)}
					<li>
						<button class="option" onclick={() => selectWallet(name)}>{name}</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		background: rgb(0 0 0 / 50%);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		z-index: 100;
	}

	.modal {
		width: 100%;
		max-width: 360px;
		background: var(--color-surface);
		color: var(--color-text);
		border-radius: 16px;
		padding: 1.5rem;
		box-shadow: 0 20px 60px rgb(0 0 0 / 25%);
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
	}

	h2 {
		font-size: 1.1rem;
		margin: 0;
	}

	.close {
		background: none;
		border: none;
		font-size: 1.5rem;
		line-height: 1;
		cursor: pointer;
		color: inherit;
		padding: 0.25rem;
	}

	.options {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.option {
		width: 100%;
		text-align: left;
		padding: 0.75rem 1rem;
		border-radius: 10px;
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: inherit;
		font-size: 1rem;
		cursor: pointer;
		transition: background 0.15s ease;
	}

	.option:hover {
		background: var(--color-border);
	}
</style>
