import React, { useEffect, useState } from 'react';
import './genesis-hero.css';

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
        </div>

        <div className="genesis-hero-grid">
          <div className="genesis-hero-copy">
            <p className="genesis-eyebrow">AI · TEST AUTOMATION · SAAS</p>
            <h1>GENESIS</h1>
            <p className="genesis-subtitle">AI-powered test automation for modern QA teams.</p>
            <p className="genesis-description">
              Designing a guided workflow that helps teams configure AI-powered testing while keeping people in control of validation.
            </p>
          </div>

          <div className="genesis-product-stage" aria-label="Genesis result screen preview">
            <div className="genesis-stage-shadow" />
            <div className="genesis-browser genesis-result-browser">
              <div className="genesis-browser-bar">
                <div className="genesis-browser-dots"><i /><i /><i /></div>
                <span>genesis · results</span>
                <div className="genesis-browser-actions"><b /><b /><b /></div>
              </div>
              <div className="genesis-result-screen">
                <img
                  src="/surya-portfolio/genesis/Reports.webp"
                  alt="Genesis test results and reporting screen"
                  loading="eager"
                  decoding="async"
                  width="1920"
                  height="1478"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="genesis-scroll-hint"><span>Scroll to explore</span><i /></div>
      </div>
    </section>
  );
}
