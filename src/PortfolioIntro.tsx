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
    const finish = () => {
      try { window.sessionStorage.setItem('surya-portfolio-intro-seen', '1'); } catch { /* storage may be unavailable */ }
      setVisible(false);
    };
    document.body.classList.add('portfolio-intro-active');

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ delay: 0.18, onComplete: finish });
      timeline
        .fromTo('.portfolio-intro__hello',
          { autoAlpha: 0, clipPath: 'inset(0 100% 0 0)', x: -18, filter: 'blur(9px)' },
          { autoAlpha: 1, clipPath: 'inset(0 0% 0 0)', x: 0, filter: 'blur(0px)', duration: 1.05, ease: 'power3.out' }
        )
        .fromTo('.portfolio-intro__hello-mark',
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.62, ease: 'power3.inOut' }, '-=0.34'
        )
        .to('.portfolio-intro__hello-group', { y: -44, scale: 0.94, autoAlpha: 0, duration: 0.58, ease: 'power3.inOut' }, '+=0.48')
        .fromTo('.portfolio-intro__identity',
          { autoAlpha: 0, y: 26, filter: 'blur(8px)' },
          { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.76, ease: 'power3.out' }, '-=0.16'
        )
        .fromTo('.portfolio-intro__identity-rule',
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.6, ease: 'power3.inOut' }, '-=0.34'
        )
        .to('.portfolio-intro__identity', { y: -34, autoAlpha: 0, duration: 0.48, ease: 'power2.inOut' }, '+=0.42')
        .fromTo('.portfolio-intro__project-heading',
          { autoAlpha: 0, y: 18, letterSpacing: '0.24em' },
          { autoAlpha: 1, y: 0, letterSpacing: '0.14em', duration: 0.55, ease: 'power3.out' }, '-=0.1'
        )
        .fromTo('.portfolio-intro__project',
          { autoAlpha: 0, y: 74, rotateX: 18, rotateY: 0, scale: 0.88, filter: 'blur(8px)' },
          { autoAlpha: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)', duration: 1.08, stagger: 0.14, ease: 'power3.out' }, '-=0.12'
        )
        .to('.portfolio-intro__project--genesis', { y: -12, rotateZ: -3.2, duration: 0.58, ease: 'power2.inOut' }, '+=0.2')
        .to('.portfolio-intro__project--comski', { y: -20, rotateZ: 0, duration: 0.58, ease: 'power2.inOut' }, '<')
        .to('.portfolio-intro__project--laundromart', { y: -8, rotateZ: 3.2, duration: 0.58, ease: 'power2.inOut' }, '<')
        .to('.portfolio-intro__project', { y: -8, scale: 1.035, duration: 0.42, stagger: 0.045, ease: 'power2.in' }, '+=0.22')
        .to('.portfolio-intro__project', { autoAlpha: 0, scale: 1.12, y: -34, duration: 0.48, stagger: 0.035, ease: 'power2.in' }, '+=0.06')
        .to('.portfolio-intro__project-heading', { autoAlpha: 0, y: -12, duration: 0.28 }, '<')
        .to(root, { clipPath: 'inset(0 0 100% 0 round 0px)', duration: 0.88, ease: 'power4.inOut' }, '-=0.08');
    }, root);

    return () => {
      context.revert();
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
          <div className="portfolio-intro__hello">Hello<span>.</span></div>
          <div className="portfolio-intro__hello-mark" />
        </div>

        <div className="portfolio-intro__identity">
          <p className="portfolio-intro__micro">DESIGNING WITH INTENT</p>
          <h1>Surya Kiran<span>.</span></h1>
          <div className="portfolio-intro__identity-rule" />
          <p>Product Designer <b>·</b> India</p>
        </div>

        <div className="portfolio-intro__projects">
          <p className="portfolio-intro__project-heading">A FEW THINGS I'VE BEEN BUILDING</p>
          <div className="portfolio-intro__project-stage">
            {projects.map((project) => (
              <article className={`portfolio-intro__project portfolio-intro__project--${project.className}`} key={project.number}>
                <div className="portfolio-intro__project-image">
                  <img src={project.image} alt="" />
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
