import { json } from '@sveltejs/kit';
import { createSession } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = () => {
	const { id } = createSession();
	return json({ id });
};
