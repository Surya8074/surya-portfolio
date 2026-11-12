import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './portfolio-intro.css';

const projects = [
  {
    number: '01',
    name: 'Genesis',
    discipline: 'AI TEST AUTOMATION',
    image: '/surya-portfolio/genesis/Dashboard.webp',
    className: 'genesis',
  },
  {
    number: '02',
    name: 'ComSki',
    discipline: 'AI COMMUNICATION',
    image: '/surya-portfolio/comski/comski-skills-q30.webp',
    className: 'comski',
  },
  {
    number: '03',
    name: 'LaundroMart',
    discipline: 'OPERATIONS SAAS',
    image: '/surya-portfolio/laundromart/l11.webp',
    className: 'laundromart',
  },
];

function canShowIntro() {
  if (typeof window === 'undefined') return false;
  try {
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      && window.sessionStorage.getItem('surya-portfolio-intro-seen') !== '1';
  } catch {
    return true;
  }
}

export default function PortfolioIntro() {
  const [visible, setVisible] = useState(canShowIntro);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible || !rootRef.current) return;
    const root = rootRef.current;
    let hasFinished = false;
    const finish = () => {
      if (hasFinished) return;
      hasFinished = true;
      try { window.sessionStorage.setItem('surya-portfolio-intro-seen', '1'); } catch { /* storage may be unavailable */ }
      setVisible(false);
    };
    // A safety exit prevents a stalled animation from ever trapping the visitor.
    const safetyTimer = window.setTimeout(finish, 12000);
    document.body.classList.add('portfolio-intro-active');
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') finish(); };
    window.addEventListener('keydown', onKeyDown);

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ delay: 0.08, onComplete: finish });
      timeline
        .fromTo('.portfolio-intro__hello',
          { autoAlpha: 0, clipPath: 'inset(0 100% 0 0)', x: -16, filter: 'blur(8px)' },
          { autoAlpha: 1, clipPath: 'inset(0 0% 0 0)', x: 0, filter: 'blur(0px)', duration: 0.82, ease: 'power3.out' }
        )
        .fromTo('.portfolio-intro__hello-dot',
          { scale: 0, transformOrigin: 'center' },
          { scale: 1, duration: 0.3, ease: 'back.out(1.8)' }, '-=0.22'
        )
        .fromTo('.portfolio-intro__hello-mark',
          { scaleX: 0, transformOrigin: 'center' },
          { scaleX: 1, duration: 0.42, ease: 'power2.out' }, '-=0.22'
        )
        .to('.portfolio-intro__hello-group',
          { y: -34, scale: 0.98, autoAlpha: 0, filter: 'blur(3px)', duration: 0.42, ease: 'power2.inOut' }, '+=0.16'
        )
        .fromTo('.portfolio-intro__identity',
          { autoAlpha: 0, y: 18, filter: 'blur(5px)' },
          { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.58, ease: 'power3.out' }, '-=0.12'
        )
        .fromTo('.portfolio-intro__identity-rule',
          { scaleX: 0, transformOrigin: 'center' },
          { scaleX: 1, duration: 0.38, ease: 'power2.out' }, '-=0.24'
        )
        .to('.portfolio-intro__identity',
          { y: -28, autoAlpha: 0, filter: 'blur(3px)', duration: 0.38, ease: 'power2.inOut' }, '+=0.18'
        )
        .fromTo('.portfolio-intro__project-heading',
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.42, ease: 'power3.out' }, '-=0.08'
        )
        .fromTo('.portfolio-intro__project',
          { autoAlpha: 0, y: 48, rotateX: 10, scale: 0.94, filter: 'blur(5px)' },
          { autoAlpha: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)', duration: 0.78, stagger: 0.1, ease: 'power3.out' }, '-=0.08'
        )
        .to('.portfolio-intro__project--genesis', { y: -8, rotateZ: -2.5, duration: 0.38, ease: 'power2.inOut' }, '+=0.12')
        .to('.portfolio-intro__project--comski', { y: -16, rotateZ: 0, duration: 0.38, ease: 'power2.inOut' }, '<')
        .to('.portfolio-intro__project--laundromart', { y: -8, rotateZ: 2.5, duration: 0.38, ease: 'power2.inOut' }, '<')
        .to('.portfolio-intro__project',
          { autoAlpha: 0, scale: 1.035, y: -24, filter: 'blur(4px)', duration: 0.42, stagger: 0.025, ease: 'power2.in' }, '+=0.34'
        )
        .to('.portfolio-intro__project-heading', { autoAlpha: 0, y: -8, duration: 0.2 }, '<')
        .to(root, { clipPath: 'inset(0 0 100% 0 round 0px)', duration: 0.62, ease: 'power3.inOut' }, '-=0.04');
    }, root);

    return () => {
      context.revert();
      window.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(safetyTimer);
      document.body.classList.remove('portfolio-intro-active');
    };
  }, [visible]);

  if (!visible) return null;

  const skip = () => {
    if (!rootRef.current) return;
    gsap.killTweensOf(rootRef.current);
    gsap.to(rootRef.current, {
      autoAlpha: 0,
      duration: 0.35,
      ease: 'power2.out',
      onComplete: () => {
        try { window.sessionStorage.setItem('surya-portfolio-intro-seen', '1'); } catch { /* storage may be unavailable */ }
        setVisible(false);
      },
    });
  };

  return (
    <div className="portfolio-intro" ref={rootRef} role="dialog" aria-label="Welcome to Surya Kiran's portfolio" aria-modal="true">
      <div className="portfolio-intro__grain" aria-hidden="true" />
      <div className="portfolio-intro__topline">
        <span>SURYA KIRAN <i>®</i></span>
        <span>INDEPENDENT PRODUCT DESIGNER</span>
      </div>
      <button className="portfolio-intro__skip" onClick={skip}>Skip intro <span aria-hidden="true">↗</span></button>

      <div className="portfolio-intro__center">
        <div className="portfolio-intro__hello-group">
          <p className="portfolio-intro__micro">A LITTLE INTRODUCTION</p>
          <div className="portfolio-intro__hello">Hello<span className="portfolio-intro__hello-dot">.</span></div>
          <div className="portfolio-intro__hello-mark" />
        </div>

        <div className="portfolio-intro__identity">
          <p className="portfolio-intro__micro">DESIGNING WITH INTENT</p>
          <h1>Surya Kiran<span>.</span></h1>
          <div className="portfolio-intro__identity-rule" />
          <p>Product Designer <b>·</b> India</p>
        </div>

        <div className="portfolio-intro__projects">
          <div className="portfolio-intro__project-intro"><p className="portfolio-intro__micro">SELECTED WORK · 2025—26</p><p className="portfolio-intro__project-heading">A few things I’ve been building<span>.</span></p></div>
          <div className="portfolio-intro__project-stage">
            {projects.map((project) => (
              <article className={`portfolio-intro__project portfolio-intro__project--${project.className}`} key={project.number}>
                <div className="portfolio-intro__project-image">
                  <img src={project.image} alt="" loading="eager" decoding="async" fetchPriority="high" />
                  <span className="portfolio-intro__project-index">{project.number}</span>
                </div>
                <div className="portfolio-intro__project-meta">
                  <strong>{project.name}</strong>
                  <span>{project.discipline}</span>
                </div>
              </article>
            ))}
          </div>
          <p className="portfolio-intro__project-foot">SELECTED WORK <span>—</span> 2025 / 2026</p>
        </div>
      </div>

      <div className="portfolio-intro__bottomline">
        <span>THOUGHTFUL DIGITAL EXPERIENCES</span>
        <span>01 — 03</span>
      </div>
    </div>
  );
}
