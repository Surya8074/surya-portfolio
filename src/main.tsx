import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Lenis from '@studio-freight/lenis';
import { ArrowUp, FileText, Github, House, Linkedin, UserRound, WandSparkles } from 'lucide-react';
import './styles.css';

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
    const render = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(render); };
    raf = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  const go = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main>
      <button className="corner-button" onClick={() => go('#home')} aria-label="Back to top">●</button>

      <section id="home" className="reference-home">
        <header className="reference-nav">
          <button className="reference-brand" onClick={() => go('#home')}><strong>Surya Kiran</strong><span>India</span></button>
          <nav><button onClick={() => go('#art')}>Art</button><button onClick={() => go('#about')}>About Me</button><button onClick={() => go('#resume')}>Resume</button></nav>
        </header>

        <div className="reference-hero-copy">
          <h1>Designing how products earn trust,<br/><span>across visual, product &amp; growth.</span></h1>
          <button className="reference-work" onClick={() => go('#work')}>See my work</button>
        </div>

        <div className="reference-portrait-stage">
          <div className="portrait-placeholder" role="img" aria-label="Replace this temporary portrait with your photo"><div className="portrait-head"/><div className="portrait-body"/></div>
          <svg className="reference-doodle" viewBox="0 0 420 150" aria-hidden="true">
            <path className="doodle-line" d="M18 92 C45 35 64 121 91 73 S142 45 161 86 S203 126 223 72 S273 36 296 84 S342 117 365 57 S394 38 407 71"/>
            <path className="doodle-line second" d="M26 106 C57 69 72 128 104 91 S150 63 177 101 S215 124 242 91 S286 55 316 99 S355 117 394 81"/>
          </svg>
        </div>
      </section>

      <section id="work" className="reference-work-section"><h2>Selected Work</h2><article><div><p>AI · Product Design</p><h3>AI SaaS Experience</h3></div><div className="work-placeholder work-one">Your project image</div></article><article><div><p>EdTech · Product Design</p><h3>Learning Platform</h3></div><div className="work-placeholder work-two">Your project image</div></article><article><div><p>Product · Web</p><h3>Comski</h3></div><div className="work-placeholder work-three">Your project image</div></article></section>
      <section className="other-reference"><h2>Other Projects</h2><div className="other-reference-grid"><article><h3>AI product explorations</h3><p>AI-assisted workflows, interaction and product design experiments.</p><div className="tags"><span>AI-Assisted</span><span>Spatial UX</span><span>Product Design</span></div></article><article><h3>Web &amp; product experiments</h3><p>Small digital products exploring interaction, systems and prototyping.</p><div className="tags"><span>Web Design</span><span>Interaction Design</span><span>UX Design</span></div></article></div></section>
      <section id="about" className="simple-section"><h2>About Me</h2><p>Hi, I am Surya — a product designer working across AI, SaaS and education.</p></section>
      <section id="art" className="simple-section"><h2>Art + Explorations</h2><p>AI, fun, visual experiments and things I make outside product work.</p></section>
      <section id="resume" className="simple-section"><h2>Resume</h2><p>Product design · UX/UI · AI SaaS · EdTech · Prototyping</p></section>
      <footer className="reference-footer"><h2>Every pixel here was a decision.</h2><p>Every word, a choice. Thanks for seeing it.</p><div className="footer-icons"><Linkedin/><FileText/><Github/></div><div className="footer-line"/><div className="footer-mark">≈≈≈</div><strong>Surya Kiran © 2026</strong></footer>
      <nav className="floating-nav" aria-label="Primary navigation">{navItems.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => go(`#${id}`)} title={label}><Icon size={20} strokeWidth={1.7}/></button>)}</nav><button className="to-top" onClick={() => go('#home')} aria-label="Back to top"><ArrowUp size={19}/></button>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
