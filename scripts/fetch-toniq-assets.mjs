import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const origin = 'https://www.helloayushi.com';
const imageRoot = '/images/case-studies/toniq-ai/legacy/';
const files = [
  'redesign/toniq-logo.svg',
  'redesign/thesis-visual-1.png',
  'redesign/thesis-visual-2.png',
  'redesign/journey-map-host.png',
  'redesign/journey-map-attendee.png',
  'redesign/why-ai-section.svg',
  'redesign/quote-avatar-eleanor.png',
  'redesign/quote-avatar-bhavneet.png',
  'redesign/quote-avatar-eleanor3.png',
  'redesign/quote-avatar-thomas.png',
  'redesign/quote-avatar-abbassi.png',
  'redesign/quote-avatar-christian.png',
  'redesign/sketches/sketch-1.png',
  'redesign/sketches/sketch-2.png',
  'redesign/sketches/sketch-3.png',
  'redesign/sketches/sketch-4.png',
  'redesign/sketches/sketch-5.png',
  'redesign/sketches/sketch-6.png',
  'redesign/sketches/sketch-7.png',
  'redesign/why-ai-card-1.png',
  'redesign/why-ai-card-2.png',
  'redesign/why-ai-card-3.png',
  'redesign/system-screen-before-event.png',
  'redesign/testing-synthesis.png',
  'redesign/testing-card-sort.png',
  'redesign/piece-left.png',
  'redesign/piece-middle.png',
  'redesign/piece-right.png',
  'two-users/merged-shape-pain.svg',
  'two-users/merged-shape-needs.svg',
  'jury-presentation.png',
];

const fonts = [
  ['dae724c6f53a6034-s.p.194no9lggf1ej.woff2', '/_next/static/immutable/media/dae724c6f53a6034-s.p.194no9lggf1ej.woff2'],
  ['f06bf9da926bae75-s.p.3uuun_-7zsf1g.woff2', '/_next/static/immutable/media/f06bf9da926bae75-s.p.3uuun_-7zsf1g.woff2'],
  ['Shii_Regular-s.p.0_m_2roxded69.otf', '/_next/static/immutable/media/Shii_Regular-s.p.0_m_2roxded69.otf'],
];

const jobs = [
  ...files.map(path => ({
    url: origin + imageRoot + path,
    output: join('public', 'toniq', 'reference-assets', 'legacy', path),
    label: path,
  })),
  ...fonts.map(([name, path]) => ({
    url: origin + path,
    output: join('public', 'toniq', 'reference-assets', 'fonts', name),
    label: name,
  })),
];

async function download(job) {
  const response = await fetch(job.url, { headers: { 'user-agent': 'SuryaPortfolioAssetSync/1.0' } });
  if (!response.ok) throw new Error(`Toniq asset download failed (${response.status}): ${job.url}`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (!bytes.byteLength) throw new Error(`Toniq asset was empty: ${job.url}`);
  await mkdir(dirname(job.output), { recursive: true });
  await writeFile(job.output, bytes);
  return { label: job.label, bytes: bytes.byteLength };
}

const results = [];
for (let i = 0; i < jobs.length; i += 5) {
  results.push(...await Promise.all(jobs.slice(i, i + 5).map(download)));
}
const total = results.reduce((sum, item) => sum + item.bytes, 0);
console.log(`Synced ${results.length} Toniq reference assets (${(total / 1024 / 1024).toFixed(2)} MB) into public/toniq/reference-assets.`);
