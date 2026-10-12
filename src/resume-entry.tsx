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
      <footer className="reference-footer"><strong>Ayushi Sharma © 2026</strong></footer>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><ResumeApp /></React.StrictMode>);
