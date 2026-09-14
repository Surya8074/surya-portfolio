import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import './styles.css';

const projects = [
  { title: 'AI SaaS Experience', meta: 'Product Design · 2025', accent: '01' },
  { title: 'Learning Platform', meta: 'UX/UI · EdTech', accent: '02' },
  { title: 'Comski', meta: 'Product · Web', accent: '03' },
  { title: 'Independent Experiments', meta: 'Interaction · Visual', accent: '04' },
];

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true, touchMultiplier: 1.15 });
    let raf = 0;
    const frame = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(frame); };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  return (
    <main>
      <header className="nav">
        <a href="#top" className="brand">SK</a>
        <nav>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <span className="availability"><i /> Available for select work</span>
      </header>

      <section id="top" className="hero section-pad">
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>PRODUCT DESIGNER · INDIA</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .08 }}>
          I design digital products that feel <span>clear, human &amp; alive.</span>
        </motion.h1>
        <motion.div className="hero-bottom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .4 }}>
          <p>Product designer working across AI, SaaS and education. I turn complex problems into useful, expressive experiences.</p>
          <a className="round-link" href="#work">Explore work ↘</a>
        </motion.div>
      </section>

      <section id="work" className="work section-pad">
        <div className="section-head"><span>01 — Selected work</span><span>Scroll to explore</span></div>
        <div className="projects">
          {projects.map((project, index) => (
            <motion.a
              className="project"
              href={`#project-${index}`}
              key={project.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .18 }}
              transition={{ duration: .7, delay: index * .05 }}
            >
              <div className="project-art"><span>{project.accent}</span><div className="orb orb-a"/><div className="orb orb-b"/></div>
              <div className="project-meta"><div><h2>{project.title}</h2><p>{project.meta}</p></div><span className="arrow">↗</span></div>
            </motion.a>
          ))}
        </div>
      </section>

      <section id="about" className="about section-pad">
        <div className="section-head"><span>02 — A little about me</span><span>Design · Systems · Stories</span></div>
        <div className="about-grid">
          <div className="about-display">Designing with intent,<br/><em>curiosity</em> and care.</div>
          <div className="about-copy">
            <p className="lead">I’m Surya, a product designer who enjoys finding the simplest shape for complicated ideas.</p>
            <p>I work end-to-end: understanding the problem, shaping flows, designing interfaces, prototyping motion and collaborating with teams to ship better experiences.</p>
            <div className="chips"><span>AI / SaaS</span><span>UX Strategy</span><span>UI Systems</span><span>Prototyping</span><span>Motion</span></div>
          </div>
        </div>
      </section>

      <section className="marquee" aria-hidden="true"><div>THINK · MAKE · TEST · REFINE · THINK · MAKE · TEST · REFINE ·</div></section>

      <section className="contact section-pad" id="contact">
        <div className="section-head"><span>03 — Let’s make something useful</span></div>
        <h2>Have a product, problem or wild idea? <a href="mailto:hello@example.com">Let’s talk.</a></h2>
        <div className="contact-foot"><span>Based in India · Working globally</span><a href="#top">Back to top ↑</a></div>
      </section>

      <footer>© 2026 Surya Kiran <span>Designed &amp; built with intention.</span></footer>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
