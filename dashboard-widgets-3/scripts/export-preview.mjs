import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const html = await readFile(resolve(projectRoot, 'dist/index.html'), 'utf8');
const scriptMatch = html.match(/<script[^>]*src="([^"]+)"[^>]*><\/script>/);
const cssMatch = html.match(/<link[^>]*href="([^"]+\.css)"[^>]*>/);
if (!scriptMatch || !cssMatch) throw new Error('Спочатку виконайте npm run build.');
const script = await readFile(resolve(projectRoot, 'dist', scriptMatch[1].replace(/^\//, '')), 'utf8');
const css = await readFile(resolve(projectRoot, 'dist', cssMatch[1].replace(/^\//, '')), 'utf8');
const standalone = html
  .replace(scriptMatch[0], () => `<script type="module">${script.replace(/<\/script/gi, '<\\/script')}</script>`)
  .replace(cssMatch[0], () => `<style>${css}</style>`);
const target = resolve(process.argv[2] ?? resolve(projectRoot, 'preview.html'));
await mkdir(dirname(target), { recursive: true });
await writeFile(target, standalone, 'utf8');
console.log(target);
