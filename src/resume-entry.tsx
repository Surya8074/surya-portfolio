import React from 'react';
import { createRoot } from 'react-dom/client';
import ResumePage from './ResumePage';
import './styles.css';
import './resume-page.css';
import './resume-standalone.css';

const aboutImages = [
  { src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=700&q=80', alt: 'Technology and product design' },
  { src: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=700&q=80', alt: 'Product interface design' },
  { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80', alt: 'Analytics dashboard interface' },
  { src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=700&q=80', alt: 'Collaborative product planning' },
  { src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=700&q=80', alt: 'Interface design work' },
  { src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80', alt: 'Digital product workflow' },
  { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80', alt: 'Product analytics' },
  { src: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=700&q=80', alt: 'Product team collaboration' },
  { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=700&q=80', alt: 'Digital product team' },
  { src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=700&q=80', alt: 'Product workshop' },
  { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=700&q=80', alt: 'Team collaboration' },
  { src: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?auto=format&fit=crop&w=700&q=80', alt: 'Interface prototype' },
];

function ResumeApp() {
  return (
    <main className="resume-document-page">
      <header className="resume-nav">
        <div className="resume-nav-inner">
          <a className="resume-brand" href="/surya-portfolio/">
            <strong>Inagandla Adhi Surya Kiran</strong><span className="resume-brand-divider" /><span>Hyderabad, India</span>
          </a>
          <nav aria-label="Main navigation">
            <a href="/surya-portfolio/#art">Art</a>
            <a href="/surya-portfolio/#about">About Me</a>
            <a href="/surya-portfolio/resume/" aria-current="page">Resume</a>
          </nav>
        </div>
      </header>

      <section className="reference-about-intro" aria-label="About Surya">
        <div className="reference-about-gallery">
          <div className="reference-about-gallery-track">
            {aboutImages.map((item) => <figure key={item.src}><img src={item.src} alt={item.alt} loading="lazy" /></figure>)}
          </div>
        </div>
        <div className="reference-about-copy">
          <p className="reference-about-eyebrow">Product Designer · AI Products · UI/UX</p>
          <h1>Hi, I’m Surya</h1>
          <p>I’m a Product Designer focused on turning complex AI technology into intuitive, practical products. I’ve worked across AI test automation with Genesis, communication intelligence with ComSki, and AI-powered laundry management with LaundroMart.</p>
          <p>My work focuses on simplifying complex workflows, structuring product experiences around real user needs, and translating technical capabilities into clear, usable interfaces. From developer-focused automation to AI-driven communication insights, I enjoy making complex systems easier to understand and use.</p>
          <p>I’m continually exploring the intersection of product design, AI, and business to build products that solve meaningful problems.</p>
        </div>
      </section>

      <ResumePage />

      <footer className="reference-footer" role="contentinfo">
        <div className="reference-footer-top">
          <h2>Thanks for scrolling this far.</h2>
          <p>Most people don’t. Let’s talk.</p>
          <div className="reference-footer-socials" aria-label="Contact and social links">
            <a href="/surya-portfolio/resume/" aria-label="Resume" title="Resume"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7zM14 3v5h5M10 12h5M10 16h5" /></svg></a>
            <a href="https://github.com/Surya8074" aria-label="GitHub" title="GitHub"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4.5 1.4-4.5-2.5-6-3m12 6v-3.2a2.8 2.8 0 0 0-.8-2.2c2.7-.3 5.5-1.3 5.5-6A4.7 4.7 0 0 0 18.4 7a4.3 4.3 0 0 0-.1-3.2S17.3 3.5 15 5a12 12 0 0 0-6 0C6.7 3.5 5.7 3.8 5.7 3.8A4.3 4.3 0 0 0 5.6 7a4.7 4.7 0 0 0-1.3 3.6c0 4.7 2.8 5.7 5.5 6A2.8 2.8 0 0 0 9 18.8V22" /></svg></a>
          </div>
        </div>
        <div className="reference-footer-signature" aria-hidden="true">Surya Kiran</div>
        <div className="reference-footer-inner"><span><strong>Surya Kiran</strong> © 2026</span></div>
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
