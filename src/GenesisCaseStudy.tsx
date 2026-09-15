import React from 'react';
import GenesisHero from './GenesisHero';
import './genesis-case-study.css';

const steps = [
  ['01', 'Project setup', 'A guided setup flow brings project details, source artifacts and test data into one clear sequence.'],
  ['02', 'AI configuration', 'Language, model and AI capabilities are separated so technical choices stay understandable.'],
  ['03', 'Review & validate', 'A final review gives the team visibility and control before the project is created.'],
];

export default function GenesisCaseStudy() {
  return (
    <main className="genesis-case-study">
      <GenesisHero />

      <section className="genesis-case-section genesis-overview">
        <div className="genesis-section-label">
          <span>01</span>
          <small>OVERVIEW</small>
        </div>
        <div className="genesis-section-content">
          <p className="genesis-section-kicker">THE PROJECT</p>
          <h2>Making AI-powered testing easier to configure, understand and control.</h2>
          <p>
            Genesis is a SaaS product focused on simplifying software testing workflows. My role was to design the product experience from the setup journey through configuration and validation, working as the product designer alongside developers, a product manager and stakeholders.
          </p>
          <div className="genesis-facts">
            <div><small>ROLE</small><strong>Product Designer</strong></div>
            <div><small>TIMELINE</small><strong>6 months</strong></div>
            <div><small>TEAM</small><strong>Developers · PM · Stakeholders</strong></div>
            <div><small>FOCUS</small><strong>UX/UI · AI · SaaS</strong></div>
          </div>
        </div>
      </section>

      <section className="genesis-case-band">
        <div className="genesis-band-inner">
          <div>
            <p className="genesis-section-kicker">THE CHALLENGE</p>
            <h2>AI can make testing faster — but the workflow still needs to feel clear and controllable.</h2>
          </div>
          <p>
            The product needed to support technical users through several setup decisions without making the experience feel overwhelming. The design challenge was to create a guided flow that made the AI configuration understandable while keeping people in control of what would happen next.
          </p>
        </div>
      </section>

      <section className="genesis-case-section genesis-approach">
        <div className="genesis-section-label">
          <span>02</span>
          <small>APPROACH</small>
        </div>
        <div className="genesis-section-content">
          <p className="genesis-section-kicker">DESIGNING THE FLOW</p>
          <h2>One clear journey instead of a collection of disconnected setup screens.</h2>
          <div className="genesis-step-list">
            {steps.map(([number, title, description]) => (
              <article key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="genesis-case-section genesis-next">
        <div className="genesis-section-label"><span>03</span><small>THE WORK</small></div>
        <div className="genesis-section-content">
          <p className="genesis-section-kicker">PRODUCT SCREENS</p>
          <h2>The next part of the story: how the setup flow, dashboard and reporting experience came together.</h2>
          <div className="genesis-screen-placeholder">Genesis screens will be placed here from the supplied project screens.</div>
        </div>
      </section>
    </main>
  );
}
