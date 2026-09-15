// Downloads every asset used by the FintechX Framer clone into its namespaced public/ root.
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const SITE_KEY = 'fintechx-wbs-framer-website-097bbfaf';
const PAGE_KEY = 'root-8a5edab2';
const OUT_DIR = join('public', 'sites', SITE_KEY, PAGE_KEY, 'images');
const SEO_DIR = join('public', 'sites', SITE_KEY, PAGE_KEY, 'seo');
const CONCURRENCY = 4;

const SEO_FILES = new Set([
  'EBdfbfTQtw0prv0QiO0BDJN0BS8.png',
  'MPymOAajQW6O9EloMpkc71KNk.png',
  'XrDkrt4yFMIFJfRnydBqiTfMnk.jpg',
]);

async function downloadOne(url) {
  const name = url.split('/').pop();
  const dest = join(SEO_FILES.has(name) ? SEO_DIR : OUT_DIR, name);
  const res = await fetch(url, { headers: { referer: 'https://fintechx-wbs.framer.website/' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  return { url, dest, bytes: buf.length };
}

async function main() {
  const listPath = process.argv[2];
  if (!listPath) throw new Error('usage: node <script> <urls.txt>');
  const urls = (await readFile(listPath, 'utf8')).split('\n').map((l) => l.trim()).filter(Boolean);
  const results = [];
  const failures = [];
  for (let i = 0; i < urls.length; i += CONCURRENCY) {
    const batch = urls.slice(i, i + CONCURRENCY);
    const settled = await Promise.allSettled(batch.map(downloadOne));
    settled.forEach((s, j) => {
      if (s.status === 'fulfilled') results.push(s.value);
      else failures.push({ url: batch[j], error: String(s.reason) });
    });
  }
  console.log(`downloaded ${results.length}/${urls.length}`);
  console.log(`bytes: ${results.reduce((a, r) => a + r.bytes, 0)}`);
  if (failures.length) console.error('FAILURES:', JSON.stringify(failures, null, 2));
}

main();
