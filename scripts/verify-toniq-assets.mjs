import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = join('dist', 'toniq', 'reference-assets', 'legacy');
const required = [
  'jury-presentation.png',
  'redesign/toniq-logo.svg',
  'redesign/thesis-visual-1.png', 'redesign/thesis-visual-2.png',
  'redesign/journey-map-host.png', 'redesign/journey-map-attendee.png',
  'redesign/why-ai-section.svg',
  'redesign/quote-avatar-eleanor.png', 'redesign/quote-avatar-eleanor3.png',
  'redesign/quote-avatar-bhavneet.png', 'redesign/quote-avatar-thomas.png',
  'redesign/quote-avatar-abbassi.png', 'redesign/quote-avatar-christian.png',
  ...Array.from({length:7},(_,i)=>'redesign/sketches/sketch-'+(i+1)+'.png'),
  'redesign/why-ai-card-1.png','redesign/why-ai-card-2.png','redesign/why-ai-card-3.png',
  'redesign/system-screen-before-event.png','redesign/testing-synthesis.png','redesign/testing-card-sort.png',
  'redesign/piece-left.png','redesign/piece-middle.png','redesign/piece-right.png',
  'two-users/merged-shape-pain.svg','two-users/merged-shape-needs.svg',
];
const missing=[];
for(const file of required){
  const path=join(root,file);
  try{
    await access(path);
    const bytes=await readFile(path);
    if(!bytes.length) missing.push(file+' (empty)');
  }catch{missing.push(file);}
}
const fonts=['f06bf9da926bae75-s.p.3uuun_-7zsf1g.woff2','dae724c6f53a6034-s.p.194no9lggf1ej.woff2','Shii_Regular-s.p.0_m_2roxded69.otf'];
for(const file of fonts){
  try{const p=join('dist','toniq','reference-assets','fonts',file);await access(p);const b=await readFile(p);if(!b.length)missing.push('font '+file+' (empty)');}
  catch{missing.push('font '+file);}
}
const hero=['hero-avatar-anna-marie.png','hero-avatar-marcus.png','hero-avatar-maria.png','hero-avatar-pair-kristian-alexx.png','hero-avatar-matt-d.png','hero-avatar-amy-s.png','hero-avatar-you.png','hero-avatar-aria-l.png','hero-tag-party.png','hero-cube.png'];
for(const file of hero){try{await access(join('dist','toniq',file));}catch{missing.push('hero '+file);}}
if(missing.length){console.error('Toniq deployment assets missing:\n- '+missing.join('\n- '));process.exit(1);}
console.log('Verified '+required.length+' Toniq reference images/SVGs, '+fonts.length+' fonts, and '+hero.length+' hero assets in dist.');
