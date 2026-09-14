import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Lenis from '@studio-freight/lenis';
import { ArrowUp, FileText, Github, House, Linkedin, UserRound, WandSparkles } from 'lucide-react';
import './styles.css';
import './reference-home.css';

const portraitUrl = `${import.meta.env.BASE_URL}surya-portrait.svg`;

const navItems = [
  { id: 'home', label: 'Home', icon: House },
  { id: 'art', label: 'Art', icon: WandSparkles },
  { id: 'about', label: 'About Me', icon: UserRound },
  { id: 'resume', label: 'Resume', icon: FileText },
];

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.05 });
    let raf = 0;
    const render = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  const go = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main>
      <header className="reference-nav">
        <div className="reference-nav-inner">
          <button className="reference-brand" onClick={() => go('#home')}>
            <strong>Surya Kiran</strong>
            <span className="reference-brand-divider" />
            <span>India</span>
          </button>
          <nav>
            <button onClick={() => go('#art')}>Art</button>
            <button onClick={() => go('#about')}>About Me</button>
            <button onClick={() => go('#resume')}>Resume</button>
          </nav>
        </div>
      </header>

      <section id="home" className="reference-home">
        <div className="reference-home-viewport">
          <div className="reference-home-stage">
            <div className="reference-portrait" aria-label="Portrait of Surya Kiran">
              <img className="reference-portrait-image" src={portraitUrl} alt="Surya Kiran" />
            </div>

            <div className="reference-fade" />

            <div className="reference-head-animation" aria-hidden="true">
              <svg viewBox="0 0 260 130" className="head-animation-svg">
                <text className="head-animation-text" x="18" y="88">ART</text>
              </svg>
            </div>

            <div className="reference-hero-copy">
              <h1>
                <span>Designing how products earn trust,</span>
                <span>across <em>visual, product &amp; growth.</em></span>
              </h1>
              <button className="reference-work" onClick={() => go('#work')}>See my work</button>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="reference-work-section">
        <h2>Selected Work</h2>
        <article>
          <div><p>AI · Product Design</p><h3>AI SaaS Experience</h3></div>
          <div className="work-placeholder work-one">Your project image</div>
        </article>
        <article>
          <div><p>EdTech · Product Design</p><h3>Learning Platform</h3></div>
          <div className="work-placeholder work-two">Your project image</div>
        </article>
        <article>
          <div><p>Product · Web</p><h3>Comski</h3></div>
          <div className="work-placeholder work-three">Your project image</div>
        </article>
      </section>

      <section className="other-reference">
        <h2>Other Projects</h2>
        <div className="other-reference-grid">
          <article><h3>AI product explorations</h3><p>AI-assisted workflows, interaction and product design experiments.</p><div className="tags"><span>AI-Assisted</span><span>Spatial UX</span><span>Product Design</span></div></article>
          <article><h3>Web &amp; product experiments</h3><p>Small digital products exploring interaction, systems and prototyping.</p><div className="tags"><span>Web Design</span><span>Interaction Design</span><span>UX Design</span></div></article>
        </div>
      </section>

      <section id="about" className="simple-section"><h2>About Me</h2><p>Hi, I am Surya — a product designer working across AI, SaaS and education.</p></section>
      <section id="art" className="simple-section"><h2>Art + Explorations</h2><p>AI, fun, visual experiments and things I make outside product work.</p></section>
      <section id="resume" className="simple-section"><h2>Resume</h2><p>Product design · UX/UI · AI SaaS · EdTech · Prototyping</p></section>

      <footer className="reference-footer">
        <h2>Every pixel here was a decision.</h2>
        <p>Every word, a choice. Thanks for seeing it.</p>
        <div className="footer-icons"><Linkedin/><FileText/><Github/></div>
        <div className="footer-line" />
        <div className="footer-mark">≈≈≈</div>
        <strong>Surya Kiran © 2026</strong>
      </footer>

      <nav className="floating-nav" aria-label="Primary navigation">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => go(`#${id}`)} title={label}><Icon size={20} strokeWidth={1.7}/></button>
        ))}
      </nav>
      <button className="to-top" onClick={() => go('#home')} aria-label="Back to top"><ArrowUp size={19}/></button>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
