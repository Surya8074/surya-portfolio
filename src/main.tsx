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
import GenesisMacBook from './GenesisMacBook';

const portraitUrl = '/surya-portfolio/surya-portrait.svg';
const genesisPath = '/surya-portfolio/work/genesis-v7/?v=phase4#s01';
const comskiPath = '/surya-portfolio/work/comski/';

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

        <GenesisMacBook />

        <div className="genesis-note genesis-note-top">Test<br />Smarter <span>↗</span></div>
        <div className="genesis-note genesis-note-bottom">Build<br />Better <span>↗</span></div>
      </div>
    </a>
  );
}


function ComskiCard() {
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
      className="comski-project-card"
      href={comskiPath}
      aria-label="Open ComSki case study"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="comski-project-copy">
        <div className="comski-project-index">02 <span>/ 04</span></div>
        <p className="comski-project-eyebrow">AI · EdTech · Product Design</p>
        <h3>ComSki</h3>
        <h4>One AI coach. Two very different learners.</h4>
        <p className="comski-project-description">
          Designing an adaptive communication-learning system for students and professionals without fragmenting the core product experience.
        </p>
        <div className="comski-project-action"><b>→</b><span>View Case Study</span></div>
      </div>

      <div className="comski-project-visual" aria-hidden="true">
        <div className="comski-scene-glow glow-one" />
        <div className="comski-scene-glow glow-two" />
        <div className="comski-scene-ring ring-one" />
        <div className="comski-scene-ring ring-two" />

        <div className="comski-laptop">
          <div className="comski-laptop-lid">
            <div className="comski-laptop-camera" />
            <div className="comski-screen">
              <div className="comski-screen-sidebar">
                <strong><span className="comski-brand-dot">⌣</span> ComSki</strong>
                <span className="selected">Home</span>
                <span>Practice</span>
                <span>My Journey</span>
                <span>Feedback</span>
              </div>
              <div className="comski-screen-content">
                <div className="comski-screen-top"><span>GOOD MORNING, SARAH</span><b>Student Plan⌄</b></div>
                <h5>Continue your journey</h5>
                <div className="comski-path-row">
                  <div className="comski-path-card"><b>Google SDE Journey</b><span>Build confidence for your next interview</span><i><em /></i><small>3 / 6 completed</small></div>
                  <div className="comski-score-card blue"><b>+20%</b><span>Confidence</span><i /></div>
                  <div className="comski-score-card purple"><b>+15%</b><span>Body Language</span><i /></div>
                </div>
                <div className="comski-practice-row">
                  <div className="comski-practice-tile"><div className="practice-avatar">◒</div><span>Practice in real scenarios</span><small>Interview: Software Engineer</small></div>
                  <div className="comski-mini-feedback"><b>✦ AI Feedback</b><span>Content Structure <i><em /></i></span><span>Confidence <i><em /></i></span><span>Body Language <i><em /></i></span></div>
                </div>
              </div>
            </div>
          </div>
          <div className="comski-laptop-base"><span /><span /><span /></div>
        </div>

        <div className="comski-floating-chip chip-student"><b>✦</b><span>Student</span><small>Build confidence</small></div>
        <div className="comski-floating-chip chip-pro"><b>▣</b><span>Professional</span><small>Unlock opportunities</small></div>

        <div className="comski-video-card">
          <div className="video-label"><span>● 00:45</span><b>Video Practice</b></div>
          <div className="video-person">◒</div>
          <div className="video-controls"><i /><i /><i /><i /><i /><i /><i /></div>
        </div>

        <div className="comski-feedback-card">
          <strong>✦ AI Feedback <span>View details →</span></strong>
          <div><label>Content Structure</label><i><em /></i><b>Great flow</b></div>
          <div><label>Confidence</label><i><em /></i><b>Keep going</b></div>
          <div><label>Body Language</label><i><em /></i><b>More eye contact</b></div>
          <div><label>Speech Clarity</label><i><em /></i><b>Slow down slightly</b></div>
        </div>
        <div className="comski-mascot"><span>⌣</span></div>
      </div>, { useEffect } from 'react';
import { ArrowUp, FileText, Github, Linkedin } from 'lucide-react';
import { createRoot } from 'react-dom/client';
import Lenis from '@studio-freight/lenis';
import { VscAccount, VscArchive, VscHome, VscSettingsGear } from 'react-icons/vsc';
import Dock from './Dock';
import ResumePage from './ResumePage';
import './styles.css';
import './reference-home.css';
import './genesis-card.css';
import GenesisMacBook from './GenesisMacBook';

const portraitUrl = '/surya-portfolio/surya-portrait.svg';
const genesisPath = '/surya-portfolio/work/genesis-v7/?v=phase4#s01';
const comskiPath = '/surya-portfolio/work/comski/';

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

        <GenesisMacBook />

        <div className="genesis-note genesis-note-top">Test<br />Smarter <span>↗</span></div>
        <div className="genesis-note genesis-note-bottom">Build<br />Better <span>↗</span></div>
      </div>
    </a>
  );
}


function ComskiCard() {
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
      className="comski-project-card"
      href={comskiPath}
      aria-label="Open ComSki case study"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="comski-project-copy">
        <div className="comski-project-index">02 <span>/ 04</span></div>
        <p className="comski-project-eyebrow">AI · EdTech · Product Design</p>
        <h3>ComSki</h3>
        <h4>One AI coach. Two very different learners.</h4>
        <p className="comski-project-description">
          Designing an adaptive communication-learning system for students and professionals without fragmenting the core product experience.
        </p>
        <div className="comski-project-action"><b>→</b><span>View Case Study</span></div>
      </div>

      <div className="comski-project-visual" aria-hidden="true">
        <div className="comski-glow comski-glow-a" />
        <div className="comski-glow comski-glow-b" />

        <div className="comski-dashboard">
          <div className="comski-sidebar">
            <strong><span className="comski-mark">⌣</span> ComSki</strong>
            <span className="active">Home</span>
            <span>Practice</span>
            <span>My Journey</span>
            <span>Feedback</span>
          </div>
          <div className="comski-dashboard-main">
            <small>GOOD MORNING</small>
            <h5>Continue your journey</h5>
            <div className="comski-journey-row">
              <div className="comski-journey-card">
                <span>Google SDE Journey</span>
                <i><em /></i>
                <small>3 / 6 completed</small>
              </div>
              <div className="comski-metric"><b>+20%</b><span>Confidence</span><i /></div>
              <div className="comski-metric purple"><b>+15%</b><span>Body Language</span><i /></div>
            </div>
          </div>
        </div>

        <div className="comski-recording">
          <div className="comski-recording-top"><span>● 00:45</span><b>Video Practice</b></div>
          <div className="comski-person"><span>◒</span></div>
          <div className="comski-wave"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
        </div>

        <div className="comski-feedback">
          <strong>✦ AI Feedback</strong>
          <div><span>Content Structure</span><i><em /></i><b>Great flow</b></div>
          <div><span>Confidence</span><i><em /></i><b>Keep going</b></div>
          <div><span>Body Language</span><i><em /></i><b>More eye contact</b></div>
          <div><span>Speech Clarity</span><i><em /></i><b>Slow down slightly</b></div>
        </div>

        <div className="comski-role-chip comski-role-student"><span>✦</span><div><b>Student</b><small>Build confidence</small></div></div>
        <div className="comski-role-chip comski-role-professional"><span>↗</span><div><b>Professional</b><small>Interview prep</small></div></div>
        <div className="comski-practice-label">Practice in real scenarios <i>↙</i></div>
        <div className="comski-mascot"><span>⌣</span></div>
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
      <section id="work" className="reference-work-section"><div className="work-intro"><p>SELECTED WORK</p></div><GenesisCard /><ComskiCard /><article className="secondary-work-card"><div><p>Product · Web</p><h3>More work coming next</h3></div><div className="work-placeholder work-two">Next project</div></article></section>
      <section className="other-reference"><h2>Other Projects</h2><div className="other-reference-grid"><article><h3>AI product explorations</h3><p>AI-assisted workflows, interaction and product design experiments.</p><div className="tags"><span>AI-Assisted</span><span>Spatial UX</span><span>Product Design</span></div></article><article><h3>Web &amp; product experiments</h3><p>Small digital products exploring interaction, systems and prototyping.</p><div className="tags"><span>Web Design</span><span>Interaction Design</span><span>UX Design</span></div></article></div></section>
      <section id="about" className="simple-section"><h2>About Me</h2><p>Hi, I am Surya — a product designer working across AI, SaaS and education.</p></section><section id="art" className="simple-section"><h2>Art + Explorations</h2><p>AI, fun, visual experiments and things I make outside product work.</p></section>
      <ResumePage />
      <footer className="reference-footer"><h2>Every pixel here was a decision.</h2><p>Every word, a choice. Thanks for seeing it.</p><div className="footer-icons"><Linkedin/><FileText/><Github/></div><div className="footer-line" /><div className="footer-mark">≈≈≈</div><strong>Surya Kiran © 2026</strong></footer>
      <div className="portfolio-dock"><Dock items={items} panelHeight={70} baseItemSize={50} magnification={70} /></div><button className="to-top" onClick={() => go('#home')} aria-label="Back to top"><ArrowUp size={19}/></button>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
