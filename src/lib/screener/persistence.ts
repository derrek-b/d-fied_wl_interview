import { browser } from '$app/environment';
import type { Answers } from './types';

const STORAGE_KEY = 'dfied-screener-draft-v1';

export type Draft = { answers: Answers; currentStepId: string; sessionId: string };

export function loadDraft(): Draft | null {
	if (!browser) return null;
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as Draft) : null;
	} catch {
		return null;
	}
}

export function saveDraft(draft: Draft): void {
	if (!browser) return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
	} catch {
		// storage unavailable (private mode, quota) — draft-save is a nicety, fail silently
	}
}

export function clearDraft(): void {
	if (!browser) return;
	try {
		localStorage.removeItem(STORAGE_KEY);
	} catch {
		// nothing to do
	}
}
