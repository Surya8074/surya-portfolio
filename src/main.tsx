import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import './styles.css';

const projects = [
  { title: 'AI SaaS Experience', tag: 'AI · Product Design', year: '2025', stat: 'Complex → clear', tone: 'sand' },
  { title: 'Learning Platform', tag: 'EdTech · UX/UI', year: '2025', stat: 'Human-centred flows', tone: 'blue' },
  { title: 'Comski', tag: 'Product · Web', year: '2025', stat: 'Product experience', tone: 'orange' },
];

const otherProjects = [
  ['AI product explorations', 'AI · Interaction · Visual'],
  ['Web & product experiments', 'Web · Systems · Prototyping'],
  ['Independent visual work', 'Art · Motion · Experiments'],
];

function App() {
  const [menu, setMenu] = useState(false);
  const [intro, setIntro] = useState(true);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 180, damping: 20 });
  const y = useSpring(mouseY, { stiffness: 180, damping: 20 });

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.1 });
    let raf = 0;
    const frame = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(frame); };
    raf = requestAnimationFrame(frame);
    const timer = window.setTimeout(() => setIntro(false), 850);
    return () => { cancelAnimationFrame(raf); window.clearTimeout(timer); lenis.destroy(); };
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => { mouseX.set(e.clientX - 6); mouseY.set(e.clientY - 6); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY]);

  const scrollTo = (id: string) => { setMenu(false); document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <main>
      <motion.div className="intro" initial={{ opacity: 1 }} animate={{ opacity: intro ? 1 : 0, pointerEvents: intro ? 'auto' : 'none' }} transition={{ duration: .5 }}>
        <span>SK</span><small>PRODUCT DESIGNER</small>
      </motion.div>

      <motion.div className="cursor" style={{ x, y }} />

      <header className="nav">
        <button className="brand" onClick={() => scrollTo('#home')}>Surya Kiran</button>
        <nav className={menu ? 'open' : ''}>
          <button onClick={() => scrollTo('#home')}>Home</button>
          <button onClick={() => scrollTo('#art')}>Art + Explorations</button>
          <button onClick={() => scrollTo('#about')}>About Me</button>
          <a href="#resume">Resume</a>
        </nav>
        <button className="menu-toggle" onClick={() => setMenu(v => !v)} aria-label="Toggle menu">{menu ? 'Close' : 'Menu'}</button>
      </header>

      <section id="home" className="home shell">
        <div className="identity"><span>Surya Kiran</span><span>India · Available for select work</span></div>
        <div className="hero-photo" aria-hidden="true"><div className="photo-glow"/><div className="photo-shape">SK</div></div>
        <div className="hero-copy">
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .55, duration: .8, ease: [.22,1,.36,1] }}>
            Designing how products <span>feel clear, useful &amp; human.</span>
          </motion.h1>
          <motion.button className="see-work" onClick={() => scrollTo('#work')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .9 }}>See my work <b>↘</b></motion.button>
        </div>
      </section>

      <section id="work" className="work shell">
        <div className="section-label"><span>Selected work</span><span>01 — 03</span></div>
        <div className="featured">
          {projects.map((project, i) => (
            <motion.article key={project.title} className={`case ${project.tone}`} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .7 }}>
              <div className="case-visual"><span className="case-number">0{i + 1}</span><div className="mock-window"><div/><div/><div/></div><div className="visual-orb"/></div>
              <div className="case-info"><div><h2>{project.title}</h2><p>{project.tag}</p></div><div className="case-stat"><strong>{project.stat}</strong><span>{project.year}</span></div></div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="other shell">
        <div className="section-label"><span>Other Projects</span><span>More experiments</span></div>
        <div className="other-list">{otherProjects.map(([name, meta], i) => <div className="other-row" key={name}><span>0{i + 4}</span><div><h3>{name}</h3><p>{meta}</p></div><b>↗</b></div>)}</div>
      </section>

      <section id="about" className="about shell">
        <div className="section-label"><span>About Me</span><span>Design · Systems · Stories</span></div>
        <div className="about-grid">
          <div className="about-image"><div className="portrait-placeholder"><span>YOUR<br/>PHOTO</span></div></div>
          <div className="about-copy"><p className="about-kicker">Hi, I am Surya</p><h2>I design with curiosity, structure and a little bit of obsession.</h2><p>I’m a product designer working across AI, SaaS and education. I enjoy turning complicated ideas into simple product experiences that people can understand and use.</p><p>I like exploring the space between product thinking, visual design and interaction — from early flows and systems to polished interfaces and motion.</p><button className="text-link">More about me ↗</button></div>
        </div>
      </section>

      <section id="art" className="art shell">
        <div className="section-label"><span>Art + Explorations</span><span>AI · Fun · Visual</span></div>
        <div className="art-heading"><h2>Curious by default.</h2><p>Side quests, visual experiments and things I make when I’m not solving product problems.</p></div>
        <div className="art-grid"><div className="art-tile tile-one">01</div><div className="art-tile tile-two">02</div><div className="art-tile tile-three">03</div><div className="art-tile tile-four">04</div></div>
      </section>

      <section id="resume" className="resume shell"><div className="section-label"><span>Experience &amp; Skills</span><span>Resume</span></div><div className="resume-grid"><div><h2>Product designer with an eye for systems and a love for details.</h2><a className="download" href="#contact">View resume ↗</a></div><div className="skill-columns"><div><small>Skills</small><p>Product Design<br/>UX Strategy<br/>UI Systems<br/>Prototyping<br/>Interaction Design<br/>Visual Design</p></div><div><small>Tools</small><p>Figma<br/>FigJam<br/>Framer<br/>Adobe CC<br/>Notion<br/>AI tools</p></div></div></div></section>

      <section id="contact" className="contact shell"><div className="section-label"><span>Let’s connect</span><span>06 — Contact</span></div><h2>Have a problem worth <em>solving?</em><br/><a href="mailto:hello@example.com">Let’s talk.</a></h2><div className="contact-bottom"><span>Based in India · Working globally</span><span>© 2026 Surya Kiran</span></div></section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
