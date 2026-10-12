import React from 'react';
import { createRoot } from 'react-dom/client';
import ResumePage from './ResumePage';
import './styles.css';
import './resume-page.css';
import './resume-standalone.css';

function ResumeApp() {
  return (
    <main className="resume-document-page">
      <header className="reference-nav"><div className="reference-nav-inner"><a className="reference-brand" href="/surya-portfolio/"><strong>Surya Kiran</strong><span className="reference-brand-divider" /><span>India</span></a><nav><a href="/surya-portfolio/#art">Art</a><a href="/surya-portfolio/#about">About Me</a><a href="/surya-portfolio/resume/" aria-current="page">Resume</a></nav></div></header>
      <ResumePage />
      <footer className="reference-footer"><strong>Ayushi Sharma © 2026</strong></footer>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><ResumeApp /></React.StrictMode>);
