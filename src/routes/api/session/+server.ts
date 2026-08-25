import { json } from '@sveltejs/kit';
import { createSession } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	let source: string | undefined;
	try {
		const body = await request.json();
		if (typeof body?.source === 'string') {
			source = body.source.trim().slice(0, 100) || undefined;
		}
	} catch {
		// No body (or invalid JSON) sent — source stays unset.
	}

	const { id } = createSession(source);
	return json({ id });
};
