<script lang="ts">
	import { onMount } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import Logo from '$lib/components/Logo.svelte';
	import ProgressBar from '$lib/components/screener/ProgressBar.svelte';
	import StepField from '$lib/components/screener/StepField.svelte';
	import { getVisibleSteps, isStepValid } from '$lib/screener/flow';
	import { clearDraft, loadDraft, saveDraft, type Draft } from '$lib/screener/persistence';
	import { GATE_STEP } from '$lib/screener/questions';
	import { completeSession, createSession, updateSession } from '$lib/screener/session-api';
	import type { Answers } from '$lib/screener/types';

	let answers = $state<Answers>({});
	let currentStepId = $state<string>(GATE_STEP.id);
	let completed = $state(false);

	let resumeDraft: Draft | null = null;
	let showResumePrompt = $state(false);

	// Server-side session tracking — separate from the local draft above.
	// Fire-and-forget by design: a respondent's actual experience never
	// waits on this beyond the final completion write.
	let sessionId: string | null = null;
	let stepEnteredAt = Date.now();
	const pastedStepIds = new SvelteSet<string>();

	async function ensureSession() {
		if (sessionId) return;
		sessionId = await createSession();
		if (sessionId) {
			saveDraft({ answers, currentStepId, sessionId });
		}
	}

	onMount(() => {
		const draft = loadDraft();
		if (draft && Object.keys(draft.answers).length > 0) {
			resumeDraft = draft;
			showResumePrompt = true;
		} else {
			ensureSession();
		}
	});

	function resume() {
		if (resumeDraft) {
			answers = resumeDraft.answers;
			currentStepId = resumeDraft.currentStepId;
			sessionId = resumeDraft.sessionId ?? null;
		}
		showResumePrompt = false;
		stepEnteredAt = Date.now();
		if (!sessionId) ensureSession();
	}

	function startOver() {
		clearDraft();
		showResumePrompt = false;
		stepEnteredAt = Date.now();
		ensureSession();
	}

	function onPasteInStep(stepId: string) {
		pastedStepIds.add(stepId);
	}

	let visibleSteps = $derived(getVisibleSteps(answers));
	let currentIndex = $derived.by(() => {
		const idx = visibleSteps.findIndex((s) => s.id === currentStepId);
		return idx === -1 ? 0 : idx;
	});
	let currentStep = $derived(visibleSteps[currentIndex]);
	let canAdvance = $derived(currentStep ? isStepValid(currentStep, answers) : false);
	let isLastStep = $derived(currentIndex === visibleSteps.length - 1);

	function leavingStepPayload(leavingStepId: string, targetStepId: string) {
		const ms = Date.now() - stepEnteredAt;
		return {
			answers,
			currentStepId: targetStepId,
			stepTiming: { stepId: leavingStepId, ms },
			pastedFields: [...pastedStepIds]
		};
	}

	async function next() {
		if (!currentStep || !canAdvance) return;
		const leavingStepId = currentStep.id;

		if (isLastStep) {
			if (sessionId) {
				await completeSession(sessionId, leavingStepPayload(leavingStepId, leavingStepId));
			}
			clearDraft();
			completed = true;
			return;
		}

		const targetStepId = visibleSteps[currentIndex + 1].id;
		if (sessionId) updateSession(sessionId, leavingStepPayload(leavingStepId, targetStepId));
		currentStepId = targetStepId;
		stepEnteredAt = Date.now();
		if (sessionId) saveDraft({ answers, currentStepId, sessionId });
	}

	function back() {
		if (currentIndex <= 0 || !currentStep) return;
		const leavingStepId = currentStep.id;
		const targetStepId = visibleSteps[currentIndex - 1].id;
		if (sessionId) updateSession(sessionId, leavingStepPayload(leavingStepId, targetStepId));
		currentStepId = targetStepId;
		stepEnteredAt = Date.now();
		if (sessionId) saveDraft({ answers, currentStepId, sessionId });
	}
</script>

<svelte:head>
	<title>D-fied Labs — Screener</title>
</svelte:head>

<main>
	{#if showResumePrompt}
		<div class="resume">
			<p>Looks like you started this before. Want to pick up where you left off?</p>
			<div class="resume-actions">
				<button class="secondary" onclick={startOver}>Start over</button>
				<button class="primary" onclick={resume}>Resume</button>
			</div>
		</div>
	{:else if completed}
		<div class="brand">
			<Logo size={96} />
		</div>
		<h1 class="thanks">Thanks — you’re in.</h1>
		<p class="thanks-copy">
			You’re entered to win $25 USDC. If you are selected and participate in a follow-up
			conversation you will receive an entry in the $100 USDC raffle.
		</p>
	{:else if currentStep}
		<div class="brand small">
			<Logo size={56} />
		</div>
		<ProgressBar current={currentIndex} total={visibleSteps.length} />

		<StepField step={currentStep} {answers} onpaste={onPasteInStep} />

		<div class="nav">
			<button class="secondary" onclick={back} disabled={currentIndex === 0}>Back</button>
			<button class="primary" onclick={next} disabled={!canAdvance}>
				{isLastStep ? 'Submit' : 'Next'}
			</button>
		</div>
	{/if}
</main>

<style>
	main {
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		padding: 2rem 1.5rem;
		text-align: center;
	}

	.brand {
		display: flex;
		justify-content: center;
	}

	.brand.small {
		margin-bottom: -0.5rem;
	}

	.thanks {
		margin: 0;
		font-size: 1.8rem;
	}

	.thanks-copy {
		max-width: 30rem;
		margin: 0;
		color: var(--color-muted-text);
		font-size: 1.05rem;
	}

	.nav {
		display: flex;
		justify-content: space-between;
		width: 100%;
		max-width: 32rem;
		gap: 1rem;
	}

	.primary,
	.secondary {
		padding: 0.75rem 1.75rem;
		border-radius: 999px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		border: none;
	}

	.primary {
		background: var(--color-accent);
		color: var(--color-accent-contrast);
		margin-left: auto;
	}

	.primary:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.secondary {
		background: transparent;
		color: var(--color-text);
		border: 1px solid var(--color-border);
	}

	.secondary:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.resume {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		max-width: 26rem;
	}

	.resume-actions {
		display: flex;
		justify-content: center;
		gap: 1rem;
	}
</style>
