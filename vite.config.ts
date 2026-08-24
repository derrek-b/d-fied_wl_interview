import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// adapter-node, not adapter-auto — this app needs a real persistent
			// Node process (better-sqlite3 is a native module, and the SQLite
			// file lives on a mounted volume), which rules out serverless
			// targets. Builds to build/index.js, run via `npm start`.
			adapter: adapter()
		})
	]
});
