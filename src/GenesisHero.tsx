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
          <a className="genesis-back" href="/surya-portfolio/">
            <span>←</span> Back to portfolio
          </a>
        </div>

        <div className="genesis-hero-grid">
          <div className="genesis-hero-copy">
            <p className="genesis-eyebrow">AI · TEST AUTOMATION · SAAS</p>
            <h1>GENESIS</h1>
            <p className="genesis-subtitle">AI-powered test automation for modern QA teams.</p>
            <p className="genesis-description">
              The design problem: accelerate test creation without removing the human judgment that makes a release trustworthy.
            </p>
            <div className="genesis-hero-meta">
              <span>AI-ASSISTED TESTING</span>
              <span>HUMAN VALIDATION</span>
              <span>RELEASE EVIDENCE</span>
            </div>
          </div>

          <div className="genesis-product-stage" aria-label="Genesis dashboard presented in a laptop">
            <div className="genesis-stage-shadow" />
            <div className="genesis-laptop">
              <div className="genesis-laptop-lid">
                <div className="genesis-laptop-camera" />
                <div className="genesis-laptop-screen">
                  <img
                    src="/surya-portfolio/genesis/Dashboard.webp"
                    alt="Genesis Dashboard"
                    loading="eager"
                    decoding="async"
                    width="1920"
                    height="1478"
                  />
                </div>
              </div>
              <div className="genesis-laptop-base">
                <div className="genesis-laptop-deck">
                  <div className="genesis-keyboard" />
                  <div className="genesis-trackpad" />
                </div>
                <div className="genesis-laptop-front" />
              </div>
            </div>
          </div>
        </div>

        <div className="genesis-scroll-hint"><span>Scroll to explore</span><i /></div>
      </div>
    </section>
  );
}
