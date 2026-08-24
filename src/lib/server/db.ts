import Database from 'better-sqlite3';
import { randomUUID } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { getAllLeafSteps } from '$lib/screener/questions';
import type { Answers } from '$lib/screener/types';

const DB_PATH = process.env.DATABASE_PATH ?? './data/screener.db';

mkdirSync(dirname(DB_PATH), { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

db.exec(`
	CREATE TABLE IF NOT EXISTS sessions (
		id TEXT PRIMARY KEY,
		started_at TEXT NOT NULL,
		updated_at TEXT NOT NULL,
		completed_at TEXT,
		current_step_id TEXT,
		answers TEXT NOT NULL DEFAULT '{}',
		step_timings TEXT NOT NULL DEFAULT '{}',
		pasted_fields TEXT NOT NULL DEFAULT '[]',
		min_length_flag_count INTEGER,
		duplicate_of_session_id TEXT,
		duplicate_reason TEXT
	);
	CREATE INDEX IF NOT EXISTS idx_sessions_completed ON sessions(completed_at);
`);

export type SessionPatch = {
	answers: Answers;
	currentStepId: string;
	stepTiming?: { stepId: string; ms: number };
	// The client's whole known-pasted-into-so-far set, sent in full each
	// write and merged/deduped here — simpler than trying to attribute one
	// paste to one wizard-step transition, which breaks for group pages
	// (a follow-up page's visible "step" id differs from its nested
	// fields' own ids).
	pastedFields?: string[];
};

type SessionRow = {
	id: string;
	started_at: string;
	updated_at: string;
	completed_at: string | null;
	current_step_id: string | null;
	answers: string;
	step_timings: string;
	pasted_fields: string;
	min_length_flag_count: number | null;
	duplicate_of_session_id: string | null;
	duplicate_reason: string | null;
};

function mergeStepData(
	row: Pick<SessionRow, 'step_timings' | 'pasted_fields'>,
	patch: SessionPatch
): { stepTimings: Record<string, number>; pastedFields: string[] } {
	const stepTimings: Record<string, number> = JSON.parse(row.step_timings);
	const pastedFields = new Set<string>(JSON.parse(row.pasted_fields));

	if (patch.stepTiming) {
		stepTimings[patch.stepTiming.stepId] = patch.stepTiming.ms;
	}
	for (const id of patch.pastedFields ?? []) {
		pastedFields.add(id);
	}

	return { stepTimings, pastedFields: [...pastedFields] };
}

export function createSession(): { id: string } {
	const id = randomUUID();
	const now = new Date().toISOString();
	db.prepare(`INSERT INTO sessions (id, started_at, updated_at) VALUES (?, ?, ?)`).run(
		id,
		now,
		now
	);
	return { id };
}

export function updateSession(id: string, patch: SessionPatch): boolean {
	const row = db
		.prepare('SELECT step_timings, pasted_fields FROM sessions WHERE id = ?')
		.get(id) as Pick<SessionRow, 'step_timings' | 'pasted_fields'> | undefined;
	if (!row) return false;

	const { stepTimings, pastedFields } = mergeStepData(row, patch);

	db.prepare(
		`UPDATE sessions
		 SET answers = ?, current_step_id = ?, step_timings = ?, pasted_fields = ?, updated_at = ?
		 WHERE id = ?`
	).run(
		JSON.stringify(patch.answers),
		patch.currentStepId,
		JSON.stringify(stepTimings),
		JSON.stringify(pastedFields),
		new Date().toISOString(),
		id
	);
	return true;
}

// EVM addresses are case-insensitive (checksum casing aside); Solana's
// base58 addresses are case-sensitive, so only EVM gets lowercased.
function normalizeWallet(answers: Answers): string {
	const raw = typeof answers.I2 === 'string' ? answers.I2.trim() : '';
	return answers.I2_network === 'evm' ? raw.toLowerCase() : raw;
}

function normalizeContact(answers: Answers): string {
	const raw = typeof answers.I1 === 'string' ? answers.I1.trim() : '';
	return raw.toLowerCase();
}

function findDuplicate(
	id: string,
	answers: Answers
): { duplicateOfSessionId: string | null; duplicateReason: string | null } {
	const wallet = normalizeWallet(answers);
	const contact = normalizeContact(answers);
	if (!wallet && !contact) return { duplicateOfSessionId: null, duplicateReason: null };

	const others = db
		.prepare('SELECT id, answers FROM sessions WHERE id != ? ORDER BY started_at ASC')
		.all(id) as Pick<SessionRow, 'id' | 'answers'>[];

	for (const other of others) {
		const otherAnswers: Answers = JSON.parse(other.answers);
		const otherWallet = normalizeWallet(otherAnswers);
		const otherContact = normalizeContact(otherAnswers);

		const walletMatch = Boolean(wallet) && wallet === otherWallet;
		const contactMatch = Boolean(contact) && contact === otherContact;

		if (walletMatch || contactMatch) {
			const reason = walletMatch && contactMatch ? 'both' : walletMatch ? 'wallet' : 'contact';
			return { duplicateOfSessionId: other.id, duplicateReason: reason };
		}
	}

	return { duplicateOfSessionId: null, duplicateReason: null };
}

function countExactMinLengthFields(answers: Answers): number {
	let count = 0;
	for (const step of getAllLeafSteps(answers)) {
		if (step.type !== 'open' || !step.minChars) continue;
		const value = answers[step.id];
		const length = typeof value === 'string' ? value.trim().length : 0;
		if (length === step.minChars) count++;
	}
	return count;
}

export function completeSession(
	id: string,
	patch: SessionPatch
): {
	minLengthFlagCount: number;
	duplicateOfSessionId: string | null;
	duplicateReason: string | null;
} | null {
	const row = db
		.prepare('SELECT step_timings, pasted_fields FROM sessions WHERE id = ?')
		.get(id) as Pick<SessionRow, 'step_timings' | 'pasted_fields'> | undefined;
	if (!row) return null;

	const { stepTimings, pastedFields } = mergeStepData(row, patch);
	const minLengthFlagCount = countExactMinLengthFields(patch.answers);
	const { duplicateOfSessionId, duplicateReason } = findDuplicate(id, patch.answers);
	const now = new Date().toISOString();

	db.prepare(
		`UPDATE sessions
		 SET answers = ?, current_step_id = ?, step_timings = ?, pasted_fields = ?,
		     updated_at = ?, completed_at = ?, min_length_flag_count = ?,
		     duplicate_of_session_id = ?, duplicate_reason = ?
		 WHERE id = ?`
	).run(
		JSON.stringify(patch.answers),
		patch.currentStepId,
		JSON.stringify(stepTimings),
		JSON.stringify(pastedFields),
		now,
		now,
		minLengthFlagCount,
		duplicateOfSessionId,
		duplicateReason,
		id
	);

	return { minLengthFlagCount, duplicateOfSessionId, duplicateReason };
}
