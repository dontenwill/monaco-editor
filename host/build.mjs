import * as esbuild from 'esbuild';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(HERE, 'dist');

fs.mkdirSync(DIST, { recursive: true });
for (const entry of fs.readdirSync(DIST)) {
	fs.rmSync(path.join(DIST, entry), { recursive: true, force: true });
}

await esbuild.build({
	entryPoints: [path.join(HERE, 'main.ts')],
	bundle: true,
	format: 'iife',
	target: 'es2020',
	minify: true,
	sourcemap: true,
	outfile: path.join(DIST, 'main.js'),
	loader: { '.ttf': 'file' },
	logLevel: 'info'
});

fs.copyFileSync(path.join(HERE, 'index.html'), path.join(DIST, 'index.html'));

console.log('host/dist ready');
