import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import './styles.css';

const projects = [
  { title: 'AI SaaS Experience', type: 'Product Design · AI', year: '2025', tone: 'sand' },
  { title: 'Learning Platform', type: 'Product Design · EdTech', year: '2025', tone: 'blue' },
  { title: 'Comski', type: 'Product · Web', year: '2025', tone: 'orange' },
];

const otherProjects = [
  ['AI product explorations', 'AI · Interaction · Visual'],
  ['Web & product experiments', 'Web · Systems · Prototyping'],
  ['Independent visual work', 'Art · Motion · Experiments'],
];

function App() {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.05 });
    let raf = 0;
    const frame = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(frame); };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  const go = (id: string) => { setMenu(false); document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <main>
      <header className="nav">
        <button className="brand" onClick={() => go('#home')}>Surya Kiran</button>
        <nav className={menu ? 'open' : ''}>
          <button onClick={() => go('#art')}>Art + Explorations</button>
          <button onClick={() => go('#about')}>About Me</button>
          <button onClick={() => go('#resume')}>Resume</button>
        </nav>
        <button className="menu-toggle" onClick={() => setMenu(v => !v)}>{menu ? 'Close' : 'Menu'}</button>
      </header>

      <section id="home" className="home shell">
        <div className="identity"><span>Surya Kiran</span><span>India · Product Designer</span></div>
        <div className="hero-orbit" aria-hidden="true"><div className="orbit-core">SK</div><i/><i/><i/></div>
        <div className="hero-copy">
          <motion.h1 initial={{ opacity: 0, y: 55 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease: [.22,1,.36,1] }}>
            Designing digital experiences that <span>make complex things feel simple.</span>
          </motion.h1>
          <motion.button className="see-work" onClick={() => go('#work')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .45 }}>See my work <b>↘</b></motion.button>
        </div>
      </section>

      <section id="work" className="work shell">
        <div className="section-label"><span>Selected work</span><span>01 — 03</span></div>
        <div className="featured">
          {projects.map((project, i) => (
            <motion.article key={project.title} className={`case ${project.tone}`} initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .8, ease: [.22,1,.36,1] }}>
              <div className="case-visual">
                <span className="case-number">0{i + 1}</span>
                <div className="fake-ui"><span/><strong/><span/><span/></div>
                <div className="visual-orb"/>
                <div className="visual-glass"/>
              </div>
              <div className="case-info"><div><h2>{project.title}</h2><p>{project.type}</p></div><span>{project.year}</span></div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="other shell">
        <div className="section-label"><span>Other Projects</span><span>More work</span></div>
        <div className="other-list">{otherProjects.map(([name, meta], i) => <div className="other-row" key={name}><span>0{i + 4}</span><div><h3>{name}</h3><p>{meta}</p></div><b>↗</b></div>)}</div>
      </section>

      <section id="about" className="about shell">
        <div className="section-label"><span>About Me</span><span>A little about me</span></div>
        <div className="about-grid">
          <div className="about-collage"><div className="collage-main">SK</div><div className="collage-small">PRODUCT<br/>DESIGN</div><div className="collage-note">CURIOUS<br/>BY DEFAULT.</div></div>
          <div className="about-copy"><p className="about-kicker">Hi, I am Surya</p><h2>I’m a product designer who enjoys turning complicated problems into clear experiences.</h2><p>I work across AI, SaaS and education, bringing together product thinking, visual design and interaction to create useful digital products.</p><p>I’m especially interested in the details that make an experience feel effortless — structure, motion, hierarchy and the moments between screens.</p><button className="text-link" onClick={() => go('#resume')}>More about me ↗</button></div>
        </div>
      </section>

      <section id="art" className="art shell">
        <div className="section-label"><span>Art + Explorations</span><span>Things I make</span></div>
        <div className="art-heading"><h2>AI, fun, visual experiments &amp; everything in between.</h2><p>A collection of side quests, experiments and visual ideas that live outside the usual product-design process.</p></div>
        <div className="art-grid"><div className="art-tile tile-one">AI</div><div className="art-tile tile-two">FUN</div><div className="art-tile tile-three">PAINT</div><div className="art-tile tile-four">MOTION</div></div>
      </section>

      <section id="resume" className="resume shell">
        <div className="section-label"><span>Resume</span><span>Experience · Skills · Tools</span></div>
        <div className="resume-grid"><div><h2>Product designer with an eye for systems and a love for details.</h2><a className="download" href="#contact">View resume ↗</a></div><div className="skill-columns"><div><small>Experience</small><p>Product Design<br/>AI SaaS<br/>EdTech<br/>Web Products</p></div><div><small>Skills</small><p>UX / UI Design<br/>Design Systems<br/>Prototyping<br/>Interaction Design<br/>Visual Design</p></div></div></div>
      </section>

      <footer id="contact" className="contact shell"><div className="section-label"><span>Get in touch</span><span>06 — Contact</span></div><h2>Let’s make something<br/><em>worth remembering.</em><br/><a href="mailto:hello@example.com">Say hello ↗</a></h2><div className="contact-bottom"><span>India · Available for select work</span><span>© 2026 Surya Kiran</span></div></footer>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
