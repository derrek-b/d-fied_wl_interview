import type { Answers } from './types';

type UpdatePayload = {
	answers: Answers;
	currentStepId: string;
	stepTiming?: { stepId: string; ms: number };
	pastedFields?: string[];
};

export async function createSession(): Promise<string | null> {
	try {
		const res = await fetch('/api/session', { method: 'POST' });
		if (!res.ok) return null;
		const { id } = await res.json();
		return id;
	} catch {
		return null;
	}
}

// Fire-and-forget: each write sends the full current answers, so a dropped
// request just leaves that one step's server copy briefly stale — the next
// successful write catches it up. Never block navigation on this.
export function updateSession(id: string, payload: UpdatePayload): void {
	fetch(`/api/session/${id}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ ...payload, isComplete: false })
	}).catch(() => {
		// draft-save (localStorage) already has the authoritative copy
	});
}

// Awaited — this is the one write that actually matters for payout/review.
export async function completeSession(id: string, payload: UpdatePayload): Promise<boolean> {
	try {
		const res = await fetch(`/api/session/${id}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ...payload, isComplete: true })
		});
		return res.ok;
	} catch {
		return false;
	}
}
