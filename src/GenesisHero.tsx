import React, { useEffect, useState } from 'react';
import './genesis-hero.css';

const metadata = [
  ['Role', 'Product Designer'],
  ['Timeline', '6 months'],
  ['Users', 'QA Engineers · QE Leads · DevOps'],
  ['Scope', 'End-to-end UX/UI'],
];

export default function GenesisHero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className={`genesis-hero ${loaded ? 'is-loaded' : ''}`}>
      <div className="genesis-hero-glow genesis-hero-glow-one" />
      <div className="genesis-hero-glow genesis-hero-glow-two" />

      <div className="genesis-hero-shell">
        <div className="genesis-hero-top">
          <button className="genesis-back" onClick={() => window.history.back()}>
            <span>←</span> Back to projects
          </button>
          <span className="genesis-index">01 / 04</span>
        </div>

        <div className="genesis-hero-grid">
          <div className="genesis-hero-copy">
            <p className="genesis-eyebrow">AI · TEST AUTOMATION · SAAS</p>
            <h1>GENESIS</h1>
            <p className="genesis-subtitle">AI-powered test automation for modern QA teams.</p>
            <p className="genesis-description">
              Designing a guided workflow that helps teams configure AI-powered testing while keeping people in control of validation.
            </p>
            <div className="genesis-hero-meta">
              {metadata.map(([label, value]) => (
                <div key={label}><small>{label}</small><strong>{value}</strong></div>
              ))}
            </div>
          </div>

          <div className="genesis-product-stage" aria-label="Genesis product preview">
            <div className="genesis-stage-shadow" />
            <div className="genesis-browser">
              <div className="genesis-browser-bar">
                <div className="genesis-browser-dots"><i /><i /><i /></div>
                <span>genesis · dashboard</span>
                <div className="genesis-browser-actions"><b /><b /><b /></div>
              </div>
              <div className="genesis-dashboard">
                <aside>
                  <div className="genesis-brand"><span>G</span><strong>GENESIS</strong></div>
                  <div className="genesis-nav active"><em>⌂</em> Dashboard</div>
                  <div className="genesis-nav"><em>◫</em> Test Cycles</div>
                  <div className="genesis-nav"><em>◌</em> Test Data</div>
                  <div className="genesis-nav"><em>▱</em> Reports</div>
                  <div className="genesis-nav"><em>⚙</em> Settings</div>
                </aside>
                <div className="genesis-main-ui">
                  <div className="genesis-ui-heading"><div><small>PROJECT / GENESIS</small><h2>Welcome back, Alex</h2></div><button>+ New Project</button></div>
                  <div className="genesis-stat-grid">
                    <div><small>ACTIVE PROJECTS</small><strong>12</strong><span>↗ 8.4%</span></div>
                    <div><small>TEST CASES</small><strong>248</strong><span>↗ 12.2%</span></div>
                    <div><small>COVERAGE</small><strong>92%</strong><span>↗ 4.1%</span></div>
                    <div><small>OPEN ISSUES</small><strong>08</strong><span>↓ 2.3%</span></div>
                  </div>
                  <div className="genesis-chart-row">
                    <div className="genesis-panel genesis-chart"><div className="genesis-panel-title"><strong>Test Execution Trend</strong><span>Last 30 days⌄</span></div><svg viewBox="0 0 620 180" preserveAspectRatio="none" aria-hidden="true"><path d="M0 144 C40 132 52 95 92 111 S145 145 181 105 S224 64 267 90 S314 134 354 92 S410 45 454 74 S501 124 543 83 S581 40 620 54" /></svg></div>
                    <div className="genesis-panel genesis-donut-panel"><div className="genesis-panel-title"><strong>Test Results</strong><span>Today</span></div><div className="genesis-donut"><span>248<small>tests</small></span></div><div className="genesis-legend"><span><i /> Passed <b>72%</b></span><span><i /> Failed <b>08%</b></span><span><i /> Skipped <b>20%</b></span></div></div>
                  </div>
                  <div className="genesis-bottom-row">
                    <div className="genesis-panel genesis-table"><div className="genesis-panel-title"><strong>Recent Test Runs</strong><span>View all →</span></div><div className="genesis-table-line"><i className="ok"/><span>Regression Suite</span><b>Passed</b></div><div className="genesis-table-line"><i className="warn"/><span>API Validation</span><b>Running</b></div><div className="genesis-table-line"><i className="ok"/><span>Smoke Tests</span><b>Passed</b></div></div>
                    <div className="genesis-panel genesis-health"><div className="genesis-panel-title"><strong>AI Health</strong></div><div className="genesis-health-value">96<span>%</span></div><div className="genesis-health-bar"><i /></div><small>Model confidence across recent runs</small></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="genesis-floating-card genesis-card-left"><small>AI WORKFLOW</small><strong>Human-in-the-loop</strong><span>Review before execution</span></div>
            <div className="genesis-floating-card genesis-card-right"><small>01 — 05</small><strong>Configure</strong><span>Project → AI → Validate</span></div>
          </div>
        </div>

        <div className="genesis-scroll-hint"><span>Scroll to explore</span><i /></div>
      </div>
    </section>
  );
}
