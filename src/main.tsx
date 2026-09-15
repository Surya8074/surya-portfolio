import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUp, FileText, Github, Linkedin } from 'lucide-react';
import Lenis from '@studio-freight/lenis';
import { VscAccount, VscArchive, VscHome, VscSettingsGear } from 'react-icons/vsc';
import Dock from './Dock';
import './styles.css';
import './reference-home.css';
import './genesis-card.css';

const portraitUrl = '/surya-portfolio/surya-portrait.svg';
const genesisPath = '/surya-portfolio/work/genesis/';

function GenesisCard() {
  return (
    <a className="genesis-project-card" href={genesisPath} aria-label="Open Genesis case study">
      <div className="genesis-project-glow genesis-project-glow-one" />
      <div className="genesis-project-glow genesis-project-glow-two" />
      <div className="genesis-project-card-inner">
        <div className="genesis-project-copy">
          <div className="genesis-project-index">01 <span>/ 04</span></div>
          <p className="genesis-project-eyebrow">AI · Product Design</p>
          <h3>Genesis</h3>
          <h4>AI-powered test automation platform</h4>
          <p className="genesis-project-description">Designing an AI-driven testing workflow that helps QA teams move faster while keeping humans in control.</p>
          <div className="genesis-project-action"><span>View Case Study</span><b>→</b></div>
          <div className="genesis-project-tags"><span>UX/UI</span><span>AI</span><span>SaaS</span><span>Enterprise Tool</span></div>
        </div>
        <div className="genesis-project-visual">
          <div className="genesis-visual-orb genesis-orb-one" />
          <div className="genesis-visual-orb genesis-orb-two" />
          <div className="genesis-mini-window">
            <div className="genesis-window-bar"><span /><span /><span /><em>GENESIS</em><i>⌕</i></div>
            <div className="genesis-mini-sidebar"><span className="mini-logo">✦ GENESIS</span><span className="mini-active">Dashboard</span><span>Projects</span><span>Test Execution</span><span>Reports</span></div>
            <div className="genesis-mini-content">
              <div className="mini-heading-row"><div><b>Welcome back, Alex</b><small>Here's what's happening with your tests.</small></div><strong>+ New Project</strong></div>
              <div className="mini-kpis"><span><small>Active Projects</small><b>12</b></span><span><small>Test Runs</small><b>48</b></span><span><small>Pass Rate</small><b>92%</b></span><span><small>Critical Issues</small><b>3</b></span></div>
              <div className="mini-chart-row"><div className="mini-chart"><small>Test Execution Trend</small><svg viewBox="0 0 300 78" preserveAspectRatio="none"><path d="M0 59 C30 50 43 62 65 44 S106 20 132 38 S172 59 197 34 S236 24 258 41 S283 48 300 26" /></svg></div><div className="mini-donut"><div className="donut-ring" /><small>Test Results</small></div></div>
              <div className="mini-bottom-row"><div><small>Recent Test Runs</small><span>E-commerce Platform <b>Completed</b></span><span>Mobile App <b>Running</b></span></div><div><small>Environments</small><span>Production <b>Healthy</b></span><span>Staging <b>Healthy</b></span></div></div>
            </div>
          </div>
        </div>
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
      <section id="work" className="reference-work-section"><div className="work-intro"><p>SELECTED WORK</p><h2>Building useful, intelligent products.</h2></div><GenesisCard /><article className="secondary-work-card"><div><p>EdTech · Product Design</p><h3>Learning Platform</h3></div><div className="work-placeholder work-two">Your project image</div></article><article className="secondary-work-card"><div><p>Product · Web</p><h3>Comski</h3></div><div className="work-placeholder work-three">Your project image</div></article></section>
      <section className="other-reference"><h2>Other Projects</h2><div className="other-reference-grid"><article><h3>AI product explorations</h3><p>AI-assisted workflows, interaction and product design experiments.</p><div className="tags"><span>AI-Assisted</span><span>Spatial UX</span><span>Product Design</span></div></article><article><h3>Web &amp; product experiments</h3><p>Small digital products exploring interaction, systems and prototyping.</p><div className="tags"><span>Web Design</span><span>Interaction Design</span><span>UX Design</span></div></article></div></section>
      <section id="about" className="simple-section"><h2>About Me</h2><p>Hi, I am Surya — a product designer working across AI, SaaS and education.</p></section><section id="art" className="simple-section"><h2>Art + Explorations</h2><p>AI, fun, visual experiments and things I make outside product work.</p></section><section id="resume" className="simple-section"><h2>Resume</h2><p>Product design · UX/UI · AI SaaS · EdTech · Prototyping</p></section>
      <footer className="reference-footer"><h2>Every pixel here was a decision.</h2><p>Every word, a choice. Thanks for seeing it.</p><div className="footer-icons"><Linkedin/><FileText/><Github/></div><div className="footer-line" /><div className="footer-mark">≈≈≈</div><strong>Surya Kiran © 2026</strong></footer>
      <div className="portfolio-dock"><Dock items={items} panelHeight={70} baseItemSize={50} magnification={70} /></div><button className="to-top" onClick={() => go('#home')} aria-label="Back to top"><ArrowUp size={19}/></button>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
