import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { ArrowUp, FileText, Github, House, Linkedin, Sparkles, UserRound, WandSparkles } from 'lucide-react';
import './styles.css';

const projects = [
  { title: 'AI SaaS Experience', eyebrow: 'AI · Product Design', heading: 'Designing AI products that feel simple, useful and human.', copy: 'Turning complex AI workflows into clear product experiences, with thoughtful interaction and visual systems.', tone: 'lavender', visual: 'ai' },
  { title: 'Learning Platform', eyebrow: 'EdTech · Product Design', heading: 'Making learning feel clearer from the first interaction.', copy: 'Designing structured learning journeys, dashboards and flows around real user needs.', tone: 'blue', visual: 'edu' },
  { title: 'Comski', eyebrow: 'Product · Web', heading: 'Building a digital experience people can understand quickly.', copy: 'A product and website experience shaped around clarity, hierarchy and easy navigation.', tone: 'warm', visual: 'comski' },
];

const otherProjects = [
  { title: 'AI product explorations', copy: 'Experiments around AI-assisted workflows, interaction and visual communication.', tags: ['AI-Assisted', 'Interaction Design', 'Product Design'], tone: 'dots' },
  { title: 'Web & product experiments', copy: 'Small product ideas exploring interfaces, systems, motion and prototypes.', tags: ['Web Design', 'Prototyping', 'UX Design'], tone: 'blue-card' },
];

const navItems = [
  { id: 'home', label: 'Home', icon: House },
  { id: 'art', label: 'Art', icon: WandSparkles },
  { id: 'about', label: 'About', icon: UserRound },
  { id: 'resume', label: 'Resume', icon: FileText },
];

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.05 });
    let raf = 0;
    const frame = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(frame); };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  const go = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main>
      <button className="corner-button" onClick={() => go('#home')} aria-label="Back to top"><Sparkles size={18}/></button>
      <section id="home" className="hero page-shell">
        <div className="topline"><span>Surya Kiran</span><span>India · Product Designer</span></div>
        <div className="hero-gallery" aria-hidden="true"><div className="gallery-card gallery-a">AI</div><div className="gallery-card gallery-b">01</div><div className="gallery-card gallery-c">UX</div><div className="gallery-card gallery-d">↗</div><div className="portrait">SK</div><div className="gallery-card gallery-e">UI</div><div className="gallery-card gallery-f">02</div></div>
        <div className="hero-copy"><p className="hero-kicker">Product · AI · EdTech · Visual</p><h1>Designing how products <span>earn trust, clarity &amp; attention.</span></h1><button className="see-work" onClick={() => go('#work')}>See my work <span>↓</span></button></div>
      </section>

      <section id="work" className="featured page-shell"><div className="section-heading"><h2>Selected Work</h2><span>03 projects</span></div>
        {projects.map((project, index) => <motion.article className={`project ${project.tone}`} key={project.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .7 }}>
          <div className="project-copy"><p className="eyebrow">{project.eyebrow}</p><h3>{project.heading}</h3><p className="project-description">{project.copy}</p><div className="project-meta"><span>0{index + 1}</span><span>{project.title}</span><span>2025</span></div></div>
          <div className={`project-visual ${project.visual}`}>
            {project.visual === 'ai' && <><div className="window-card"><small>AI workspace</small><strong>What would you like to build?</strong><div className="line"/><div className="line short"/></div><div className="orb orb-purple"/><div className="mini-chip">✦</div></>}
            {project.visual === 'edu' && <><div className="phone"><div className="phone-top"/><div className="phone-title">Your learning path</div><div className="progress"><i/><i/><i/></div><div className="phone-card"/><div className="phone-card small"/></div><div className="edu-glow"/></>}
            {project.visual === 'comski' && <><div className="browser"><div className="browser-bar"/><div className="browser-title">COMSKI</div><div className="browser-block"/><div className="browser-block small"/></div><div className="comski-orb"/></>}
          </div>
        </motion.article>)}
      </section>

      <section className="other page-shell"><h2>Other Projects</h2><div className="other-grid">{otherProjects.map((project, i) => <article className={`other-card ${project.tone}`} key={project.title}><div><h3>{project.title}</h3><p>{project.copy}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><div className="card-decoration">{i === 0 ? '✦' : '✿'}</div></article>)}</div></section>

      <section id="about" className="about page-shell"><div className="section-heading"><h2>About Me</h2><span>A little about me</span></div><div className="about-layout"><div className="about-art"><div className="about-photo">SK</div><div className="about-note">CURIOUS<br/>BY DEFAULT.</div><div className="about-sticker">PRODUCT<br/>DESIGN</div></div><div className="about-copy"><p className="eyebrow">Hi, I am Surya</p><h3>I’m a product designer who enjoys turning complicated problems into clear experiences.</h3><p>I work across AI, SaaS and education, bringing together product thinking, visual design and interaction to create useful digital products.</p><p>I care about hierarchy, systems, motion and the tiny details that make an experience feel effortless.</p></div></div></section>

      <section id="art" className="art page-shell"><div className="section-heading"><h2>Art + Explorations</h2><span>AI + Fun + Visual + Experiments</span></div><div className="art-intro"><h3>Things I make when I’m not solving product problems.</h3><p>Visual experiments, AI explorations, motion studies and ideas that start simply because they are interesting.</p></div><div className="art-grid"><div className="art-piece one">AI</div><div className="art-piece two">FUN</div><div className="art-piece three">PAINT</div><div className="art-piece four">MOTION</div></div></section>

      <section id="resume" className="resume page-shell"><div className="section-heading"><h2>Resume</h2><span>Experience · Skills · Tools</span></div><div className="resume-layout"><div><h3>Product designer with an eye for systems and a love for details.</h3><a href="#contact">View resume <span>↗</span></a></div><div className="resume-columns"><div><small>Experience</small><p>Product Design<br/>AI SaaS<br/>EdTech<br/>Web Products</p></div><div><small>Skills</small><p>UX / UI Design<br/>Design Systems<br/>Prototyping<br/>Interaction Design<br/>Visual Design</p></div></div></div></section>

      <footer id="contact" className="footer page-shell"><div className="footer-main"><h2>Designed with intent.</h2><p>Thanks for taking the time to explore my work.</p><div className="socials"><a href="#" aria-label="LinkedIn"><Linkedin size={25}/></a><a href="#" aria-label="Resume"><FileText size={25}/></a><a href="#" aria-label="GitHub"><Github size={27}/></a></div></div><div className="footer-line"/><div className="footer-mark">≈≈≈</div><div className="copyright"><strong>Surya Kiran</strong> © 2026</div></footer>
      <nav className="floating-nav" aria-label="Primary navigation">{navItems.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => go(`#${id}`)} title={label}><Icon size={20} strokeWidth={1.7}/></button>)}</nav><button className="to-top" onClick={() => go('#home')} aria-label="Back to top"><ArrowUp size={19}/></button>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
