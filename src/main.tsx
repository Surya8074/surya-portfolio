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
    const lenis = new Lenis({ smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="reference-page">
      <header className="reference-nav">
        <a className="reference-brand" href="#top"><span>Surya Kiran</span><small>India</small></a>
        <nav><a href="#work">Art</a><a href="#about">About Me</a><a href="/surya-portfolio/resume/">Resume</a></nav>
      </header>

      <main id="top">
        <section className="reference-hero">
          <div className="reference-hero-copy">
            <p className="reference-kicker">Product Designer · AI · SaaS</p>
            <h1>I design digital products that feel <em>simple</em>, useful and human.</h1>
            <p className="reference-hero-body">Product designer focused on thoughtful UX, AI-powered products and polished digital experiences.</p>
            <div className="reference-hero-actions"><a href="#work">View my work <span>↗</span></a><a href="#about">More about me</a></div>
          </div>
          <div className="reference-hero-art">
            <div className="hero-art-glow hero-art-glow-a" /><div className="hero-art-glow hero-art-glow-b" />
            <div className="hero-art-card"><img src={portraitUrl} alt="Surya Kiran portrait" /><span className="hero-art-label">Selected work · 2026</span></div>
          </div>
        </section>

        <section id="work" className="reference-work-section">
          <div className="work-intro"><p>SELECTED WORK</p><h2>A few products and experiences I've shaped.</h2></div>
          <GenesisCard />
          <div className="secondary-work-card"><div><p>02 / 04</p><h3>More work coming together.</h3></div><div className="work-placeholder"><span>CASE STUDY</span></div></div>
        </section>

        <section id="about" className="reference-about"><p>ABOUT ME</p><h2>Curious about people, systems and the details that make products click.</h2></section>
      </main>

      <Dock items={[{ icon: <VscHome />, label: 'Home', onClick: () => window.location.hash = 'top' }, { icon: <VscArchive />, label: 'Work', onClick: () => window.location.hash = 'work' }, { icon: <VscAccount />, label: 'About', onClick: () => window.location.hash = 'about' }, { icon: <VscSettingsGear />, label: 'Resume', onClick: () => window.location.href = '/surya-portfolio/resume/' }]} panelHeight={70} baseItemSize={50} magnification={70} />
      <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><ArrowUp size={17} /></button>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
