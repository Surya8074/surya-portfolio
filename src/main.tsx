import React, { useEffect } from 'react';
import { ArrowUp, FileText, Github, Linkedin } from 'lucide-react';
import { createRoot } from 'react-dom/client';
import Lenis from '@studio-freight/lenis';
import { VscAccount, VscArchive, VscHome, VscSettingsGear } from 'react-icons/vsc';
import Dock from './Dock';
import ResumePage from './ResumePage';
import './styles.css';
import './reference-home.css';
import './genesis-card.css';

const portraitUrl = '/surya-portfolio/surya-portrait.svg';
const genesisPath = '/surya-portfolio/work/genesis-v7/?v=phase4#s01';

function GenesisCard() {
  const handlePointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    event.currentTarget.style.setProperty('--mx', x.toFixed(3));
    event.currentTarget.style.setProperty('--my', y.toFixed(3));
  };

  const resetPointer = (event: React.PointerEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.setProperty('--mx', '0');
    event.currentTarget.style.setProperty('--my', '0');
  };

  return (
    <a
      className="genesis-project-card"
      href={genesisPath}
      aria-label="Open Genesis case study"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="genesis-project-copy">
        <div className="genesis-project-index">01 <span>/ 04</span></div>
        <p className="genesis-project-eyebrow">AI · Product Design</p>
        <h3>Genesis</h3>
        <h4>AI-powered test automation platform</h4>
        <p className="genesis-project-description">Designing an AI-driven testing workflow that helps QA teams move faster while keeping humans in control.</p>
        <div className="genesis-project-action"><b>→</b><span>View Case Study</span></div>
      </div>

      <div className="genesis-project-visual" aria-hidden="true">
        <div className="genesis-visual-orbit genesis-orbit-one" />
        <div className="genesis-visual-orbit genesis-orbit-two" />

        <div className="genesis-float-screen genesis-float-input">
          <span>Input Artifacts</span>
          <img src="/surya-portfolio/genesis/Input-Artifacts.webp" alt="" />
        </div>

        <div className="genesis-float-screen genesis-float-config">
          <span>AI Configuration</span>
          <img src="/surya-portfolio/genesis/AI-Configuration.webp" alt="" />
        </div>

        <div className="genesis-float-screen genesis-float-reports">
          <span>Reports</span>
          <img src="/surya-portfolio/genesis/Reports.webp" alt="" />
        </div>

        <div className="genesis-laptop">
          <div className="genesis-laptop-screen">
            <img src="/surya-portfolio/genesis/Dashboard.webp" alt="Genesis dashboard" loading="lazy" />
          </div>
          <div className="genesis-laptop-base">
            <div className="genesis-laptop-keyboard" />
            <div className="genesis-laptop-trackpad" />
          </div>
        </div>

        <div className="genesis-note genesis-note-top">Test<br />Smarter <span>↗</span></div>
        <div className="genesis-note genesis-note-bottom">Build<br />Better <span>↗</span></div>
      </div>
    </a>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.05 });
    let raf = 0;
    const render = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(render); };
    raf = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  const go = (id: string) => { const target = document.querySelector(id); if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const items = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => go('#home') },
    { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => go('#work') },
    { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => go('#about') },
    { icon: <VscSettingsGear size={18} />, label: 'Settings', onClick: () => go('#resume') },
  ];

  return (
    <main>
      <header className="reference-nav"><div className="reference-nav-inner"><button className="reference-brand" onClick={() => go('#home')}><strong>Surya Kiran</strong><span className="reference-brand-divider" /><span>India</span></button><nav><button onClick={() => go('#art')}>Art</button><button onClick={() => go('#about')}>About Me</button><button onClick={() => go('#resume')}>Resume</button></nav></div></header>
      <section id="home" className="reference-home"><div className="reference-home-viewport"><div className="reference-home-stage"><div className="reference-portrait" aria-label="Portrait of Surya Kiran"><img className="reference-portrait-image" src={portraitUrl} alt="Surya Kiran" /></div><div className="reference-fade" /><div className="reference-head-animation" aria-hidden="true"><svg viewBox="0 0 260 130" className="head-animation-svg"><text className="head-animation-text" x="18" y="88">ART</text></svg></div><div className="reference-hero-copy"><h1><span>Designing how products earn trust,</span><span>across <em>visual, product &amp; growth.</em></span></h1><button className="reference-work" onClick={() => go('#work')}>See my work</button></div></div></div></section>
      <section id="work" className="reference-work-section"><div className="work-intro"><p>SELECTED WORK</p></div><GenesisCard /><article className="secondary-work-card"><div><p>EdTech · Product Design</p><h3>Learning Platform</h3></div><div className="work-placeholder work-two">Your project image</div></article><article className="secondary-work-card"><div><p>Product · Web</p><h3>Comski</h3></div><div className="work-placeholder work-three">Your project image</div></article></section>
      <section className="other-reference"><h2>Other Projects</h2><div className="other-reference-grid"><article><h3>AI product explorations</h3><p>AI-assisted workflows, interaction and product design experiments.</p><div className="tags"><span>AI-Assisted</span><span>Spatial UX</span><span>Product Design</span></div></article><article><h3>Web &amp; product experiments</h3><p>Small digital products exploring interaction, systems and prototyping.</p><div className="tags"><span>Web Design</span><span>Interaction Design</span><span>UX Design</span></div></article></div></section>
      <section id="about" className="simple-section"><h2>About Me</h2><p>Hi, I am Surya — a product designer working across AI, SaaS and education.</p></section><section id="art" className="simple-section"><h2>Art + Explorations</h2><p>AI, fun, visual experiments and things I make outside product work.</p></section>
      <ResumePage />
      <footer className="reference-footer"><h2>Every pixel here was a decision.</h2><p>Every word, a choice. Thanks for seeing it.</p><div className="footer-icons"><Linkedin/><FileText/><Github/></div><div className="footer-line" /><div className="footer-mark">≈≈≈</div><strong>Surya Kiran © 2026</strong></footer>
      <div className="portfolio-dock"><Dock items={items} panelHeight={70} baseItemSize={50} magnification={70} /></div><button className="to-top" onClick={() => go('#home')} aria-label="Back to top"><ArrowUp size={19}/></button>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
