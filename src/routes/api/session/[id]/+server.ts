import { error, json } from '@sveltejs/kit';
import { completeSession, updateSession, type SessionPatch } from '$lib/server/db';
import type { RequestHandler } from './$types';

type Body = SessionPatch & { isComplete?: boolean };

export const POST: RequestHandler = async ({ params, request }) => {
	let body: Body;
	try {
		body = await request.json();
	} catch {
		throw error(400, 'Invalid JSON body');
	}

	if (!body.answers || typeof body.currentStepId !== 'string') {
		throw error(400, 'Missing answers or currentStepId');
	}

	const patch: SessionPatch = {
		answers: body.answers,
		currentStepId: body.currentStepId,
		stepTiming: body.stepTiming,
		pastedFields: body.pastedFields
	};

	if (body.isComplete) {
		const result = completeSession(params.id, patch);
		if (!result) throw error(404, 'Session not found');
		return json(result);
	}

	const updated = updateSession(params.id, patch);
	if (!updated) throw error(404, 'Session not found');
	return json({ ok: true });
};
