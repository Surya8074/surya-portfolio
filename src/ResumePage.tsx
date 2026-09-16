import React from 'react';
import './resume-page.css';

const experience = [
  { role: 'UI/UX Designer', company: 'Transpoze', period: '2024 — Present', description: 'Designing product experiences across AI-powered SaaS and education products, translating complex workflows into clear, usable interfaces.', tags: ['Product Design', 'AI SaaS', 'EdTech'] },
  { role: 'UI/UX Designer', company: 'Comski', period: 'Previous Experience', description: 'Worked across web and product experiences, contributing to user flows, visual systems, responsive interfaces and interactive prototypes.', tags: ['UX/UI', 'Web Design', 'Prototyping'] },
];
const skills = ['Product Design', 'UX Design', 'UI Design', 'Interaction Design', 'Design Systems', 'Prototyping', 'AI Product Design', 'Responsive Design'];
const tools = ['Figma', 'FigJam', 'Adobe Creative Cloud', 'Framer', 'GitHub', 'AI Design Tools'];

export default function ResumePage() {
  return <section id="resume" className="resume-page">
    <div className="resume-page-inner">
      <header className="resume-hero">
        <div><p className="resume-eyebrow">RESUME · 2026</p><h2>Designer building<br /><em>products people trust.</em></h2></div>
        <div className="resume-hero-side"><p>UI/UX & Product Designer focused on AI, SaaS and education experiences.</p><a href="/surya-portfolio/resume.pdf" className="resume-download">Download Resume <span>↗</span></a></div>
      </header>
      <div className="resume-rule" />
      <section className="resume-block"><div className="resume-label">01 / EXPERIENCE</div><div className="resume-experience">{experience.map(item => <article className="resume-experience-item" key={item.company}><div className="resume-date">{item.period}</div><div><h3>{item.role}</h3><h4>{item.company}</h4><p>{item.description}</p><div className="resume-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}</div></section>
      <section className="resume-split resume-block"><div><div className="resume-label">02 / SKILLS</div><div className="resume-skill-list">{skills.map((skill, index) => <span key={skill}><b>{String(index + 1).padStart(2, '0')}</b>{skill}</span>)}</div></div><div><div className="resume-label">03 / TOOLS</div><div className="resume-tool-list">{tools.map(tool => <span key={tool}>{tool}</span>)}</div></div></section>
      <section className="resume-split resume-block resume-bottom"><div><div className="resume-label">04 / EDUCATION</div><h3>Bachelor's Degree</h3><p className="resume-muted">Add university · graduation year</p></div><div><div className="resume-label">05 / CURRENT FOCUS</div><p className="resume-focus">AI-native products, thoughtful interaction design, design systems and cinematic digital experiences.</p></div></section>
    </div>
  </section>;
}
