import React from 'react';
import { createRoot } from 'react-dom/client';
import ResumePage from './ResumePage';
import './styles.css';
import './resume-page.css';
import './resume-standalone.css';

const aboutImages = [
  { src: 'https://www.helloayushi.com/images/about/carousel-1.jpg', alt: 'Second masters at 31, 2025' },
  { src: 'https://www.helloayushi.com/images/about/carousel-2.jpg', alt: 'Apple Park Visit, 2025' },
  { src: 'https://www.helloayushi.com/images/about/carousel-3.jpg', alt: 'Presenting my app idea, 2025' },
  { src: 'https://www.helloayushi.com/images/about/carousel-4.jpg', alt: 'Cohort 11, CCA - 2025' },
  { src: 'https://www.helloayushi.com/images/about/carousel-5.jpg', alt: 'Refining final presentation, 2025' },
  { src: 'https://www.helloayushi.com/images/about/carousel-6.jpg', alt: 'Exhibited my art, India - 2022' },
  { src: 'https://www.helloayushi.com/images/about/carousel-7.jpg', alt: "Final Onari AI presentation, 2025" },
  { src: 'https://www.helloayushi.com/images/about/carousel-8.jpg', alt: 'Collaborating with classmates, 2026' },
  { src: 'https://www.helloayushi.com/images/about/carousel-9.jpg', alt: 'Crocheting a scarf, 2026' },
  { src: 'https://www.helloayushi.com/images/about/carousel-10.jpg', alt: 'Painting landscape, 2024' },
  { src: 'https://www.helloayushi.com/images/about/carousel-11.jpg', alt: 'Ceramic work, 2025' },
  { src: 'https://www.helloayushi.com/images/about/carousel-12.jpg', alt: 'Figma Commons, 2025' },
];

function ResumeApp() {
  return (
    <main className="resume-document-page">
      <header className="resume-nav">
        <div className="resume-nav-inner">
          <a className="resume-brand" href="/surya-portfolio/">
            <strong>Ayushi Sharma</strong><span className="resume-brand-divider" /><span>San Francisco, US</span>
          </a>
          <nav aria-label="Main navigation">
            <a href="/surya-portfolio/#art">Art</a>
            <a href="/surya-portfolio/#about">About Me</a>
            <a href="/surya-portfolio/resume/" aria-current="page">Resume</a>
          </nav>
        </div>
      </header>

      <section className="reference-about-intro" aria-label="About Ayushi">
        <div className="reference-about-gallery">
          <div className="reference-about-gallery-track">
            {aboutImages.map((item) => <figure key={item.src}><img src={item.src} alt={item.alt} loading="lazy" /></figure>)}
          </div>
        </div>
        <div className="reference-about-copy">
          <p className="reference-about-eyebrow">Second masters at 31, 2025</p>
          <h1>Hi, I am Ayushi</h1>
          <p>Before I was a designer, I was a marketer. That's why I think more about people: their needs, what they trust, what makes them click, tap, or stay.</p>
          <p>That instinct carried into design. I've been a meaningful part of the design &amp; leadership team at Paytm Money (India's fintech giant), founded my own studio. Right now I'm exploring how AI can create experiences that actually feel human.</p>
          <p>I'm a perpetual student at heart. I like hard problems, and I go in with my heart.</p>
          <p>When I'm not designing, I'm painting skies, throwing pottery, or tinkering with ESP32 boards. Also, I never say no to coffee. Time of day has never once been a factor.</p>
        </div>
      </section>

      <ResumePage />

      <footer className="reference-footer" role="contentinfo">
        <div className="reference-footer-top">
          <h2>Thanks for scrolling this far.</h2>
          <p>Most people don’t. Let’s talk.</p>
          <div className="reference-footer-socials" aria-label="Contact and social links">
            <a href="https://www.linkedin.com/" aria-label="LinkedIn" title="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9v10M5 5.5v.1M10 19v-6a4 4 0 0 1 8 0v6M10 9v10M3 9h4M3 19h4M8 5.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" /></svg></a>
            <a href="/surya-portfolio/resume/" aria-label="Resume" title="Resume"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7zM14 3v5h5M10 12h5M10 16h5" /></svg></a>
            <a href="https://github.com/Surya8074" aria-label="GitHub" title="GitHub"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4.5 1.4-4.5-2.5-6-3m12 6v-3.2a2.8 2.8 0 0 0-.8-2.2c2.7-.3 5.5-1.3 5.5-6A4.7 4.7 0 0 0 18.4 7a4.3 4.3 0 0 0-.1-3.2S17.3 3.5 15 5a12 12 0 0 0-6 0C6.7 3.5 5.7 3.8 5.7 3.8A4.3 4.3 0 0 0 5.6 7a4.7 4.7 0 0 0-1.3 3.6c0 4.7 2.8 5.7 5.5 6A2.8 2.8 0 0 0 9 18.8V22" /></svg></a>
          </div>
        </div>
        <div className="reference-footer-signature" aria-hidden="true">A.</div>
        <div className="reference-footer-inner"><span><strong>Ayushi Sharma</strong> © 2026</span></div>
      </footer>
      <nav className="reference-bottom-nav" aria-label="Quick navigation">
        <a href="/surya-portfolio/" aria-label="Home" title="Home"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" /></svg></a>
        <a href="/surya-portfolio/#art" aria-label="Art" title="Art"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 4 6 6M4 20l4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10zM3 5v4M1 7h4" /></svg></a>
        <a href="/surya-portfolio/#about" aria-label="About me" title="About me"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7" r="4"/><path d="M4 21v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2z"/></svg></a>
        <a href="/surya-portfolio/resume/" aria-label="Resume" title="Resume"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7zM14 3v5h5M10 12h5M10 16h5" /></svg></a>
      </nav>
      <button className="reference-scroll-top" type="button" aria-label="Scroll to top" title="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 14 6-6 6 6" /></svg>
      </button>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><ResumeApp /></React.StrictMode>);
