import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BASE = '/surya-portfolio/comski/';

type ScreenProps = {
  src: string;
  alt: string;
  label: string;
  phase: string;
  goal: string;
  decision: string;
  accent?: string;
  wide?: boolean;
};

const screenData: ScreenProps[] = [
  { src: 'Onboarding Intro.svg', alt: 'ComSki onboarding introduction screen', label: '01 · Introduction', phase: 'ONBOARDING', goal: 'Understand ComSki before committing to the assessment journey.', decision: 'Use a low-pressure introduction to establish context before asking for personalisation.', accent: 'blue' },
  { src: 'Onboarding 1st Question.svg', alt: 'ComSki first onboarding question', label: '02 · Pick your Vibe', phase: 'ONBOARDING', goal: 'Feel that the experience can adapt to the learner.', decision: 'Ask one personalisation question at a time instead of presenting a long setup form.', accent: 'pink' },
  { src: 'Onboarding 3rd question.svg', alt: 'ComSki third onboarding question', label: '03 · Daily practice', phase: 'ONBOARDING', goal: 'Set a realistic practice expectation without increasing setup friction.', decision: 'Turn routine and availability into product context rather than another generic preference.', accent: 'sky' },
  { src: 'Reading.svg', alt: 'ComSki Reading assessment screen', label: '04 · Reading', phase: 'ASSESSMENT', goal: 'Demonstrate reading ability inside a familiar task structure.', decision: 'Keep the assessment grammar stable while changing only the skill-specific task.', accent: 'orange' },
  { src: 'Reading 1.svg', alt: 'ComSki Reading question state', label: '05 · Reading question', phase: 'ASSESSMENT', goal: 'Move through a focused reading task without unnecessary navigation.', decision: 'Use predictable progression so cognitive effort stays on the communication task.', accent: 'orange' },
  { src: 'Listening 1.svg', alt: 'ComSki Listening assessment screen', label: '06 · Listening', phase: 'ASSESSMENT', goal: 'Demonstrate listening comprehension with the same interaction rhythm.', decision: 'Change the input modality to audio while preserving familiar controls and progression.', accent: 'sky' },
  { src: 'Listening 2.svg', alt: 'ComSki Listening question state', label: '07 · Listening response', phase: 'ASSESSMENT', goal: 'Respond to spoken information without learning a new interaction model.', decision: 'Separate modality complexity from interface complexity.', accent: 'sky' },
  { src: 'Writing 1.svg', alt: 'ComSki Writing assessment screen', label: '08 · Writing', phase: 'ASSESSMENT', goal: 'Express an idea in writing inside a predictable frame.', decision: 'Let the task change while keeping progress, feedback and completion conventions consistent.', accent: 'pink' },
  { src: 'Writing 2.svg', alt: 'ComSki Writing response state', label: '09 · Writing response', phase: 'ASSESSMENT', goal: 'Review and complete a written response with clear progression.', decision: 'Make the learner action obvious before introducing any AI interpretation.', accent: 'pink' },
  { src: 'Speaking 1.svg', alt: 'ComSki Speaking assessment screen', label: '10 · Speaking', phase: 'ASSESSMENT', goal: 'Practise spoken delivery without turning the interface into a judgement surface.', decision: 'Frame recording as a practice action first; analysis follows as a separate system state.', accent: 'navy' },
  { src: 'Speaking 2.svg', alt: 'ComSki Speaking response state', label: '11 · Speaking response', phase: 'FEEDBACK', goal: 'Understand what happened after completing a spoken task.', decision: 'Create a clear handoff from user input to system analysis instead of hiding processing.', accent: 'navy' },
  { src: 'Desktop - 1.svg', alt: 'ComSki My Journey dashboard', label: '12 · My Journey', phase: 'PROGRESSION', goal: 'See progress as a continuous journey rather than isolated assessment scores.', decision: 'Connect four skills back to one persistent learner model and next action.', accent: 'blue', wide: true },
];

const ease = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, className = '', delay = 0, once = true }: { children: React.ReactNode; className?: string; delay?: number; once?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, margin: '-100px' }}
      transition={reduce ? { duration: 0 } : { duration: 0.5, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function Stagger({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'show'}
      viewport={{ once: true, margin: '-80px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: delay } } }}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={reduce ? undefined : { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } } }}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

function Section({ n, title, children, tone = 'blue', className = '' }: { n: string; title: string; children: React.ReactNode; tone?: string; className?: string }) {
  return (
    <section className={`cv4-section tone-${tone} ${className}`} id={`s${n}`}>
      <div className="cv4-section-marker" aria-hidden="true"><span>{n}</span></div>
      <div className="cv4-section-content">
        <div className="cv4-section-kicker">{title}</div>
        {children}
      </div>
    </section>
  );
}

function Screen({ src, alt, label, wide = false, accent = 'blue' }: ScreenProps) {
  return (
    <figure className={`cv4-screen ${wide ? 'wide' : ''} accent-${accent}`}>
      <div className="cv4-screen-browser">
        <div className="cv4-browser-bar"><i/><i/><i/><span>{label}</span></div>
        <img src={BASE + src} alt={alt} loading="lazy" />
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function Table({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`cv4-table-wrap ${className}`}><table>{children}</table></div>;
}

function Pill({ children, tone = '' }: { children: React.ReactNode; tone?: string }) {
  return <span className={`cv4-pill ${tone}`}>{children}</span>;
}

function BlurReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={`rb-blur-reveal ${className}`} initial={reduce ? false : { opacity: 0, filter: 'blur(12px)', y: 18 }} whileInView={reduce ? undefined : { opacity: 1, filter: 'blur(0px)', y: 0 }} viewport={{ once: true, margin: '-12% 0px' }} transition={reduce ? { duration: 0 } : { duration: 0.7, ease }}>{children}</motion.div>;
}
function SpotlightCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const onMove = (event: React.PointerEvent<HTMLDivElement>) => { const node = ref.current; if (!node) return; const rect = node.getBoundingClientRect(); node.style.setProperty('--spot-x', `${event.clientX - rect.left}px`); node.style.setProperty('--spot-y', `${event.clientY - rect.top}px`); };
  return <div ref={ref} onPointerMove={onMove} className={`rb-spotlight ${className}`}>{children}</div>;
}
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const onMove = (event: React.PointerEvent<HTMLDivElement>) => { const node = ref.current; if (!node) return; const rect = node.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width - 0.5; const y = (event.clientY - rect.top) / rect.height - 0.5; node.style.setProperty('--tilt-x', `${(y * -5).toFixed(2)}deg`); node.style.setProperty('--tilt-y', `${(x * 5).toFixed(2)}deg`); };
  const reset = () => { const node = ref.current; if (!node) return; node.style.setProperty('--tilt-x', '0deg'); node.style.setProperty('--tilt-y', '0deg'); };
  return <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={`rb-tilt ${className}`}>{children}</div>;
}


function TechText({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(text);
  const [running, setRunning] = useState(false);

  const animate = () => {
    if (reduce) { setValue(text); return; }
    setRunning(true);
    const chars = '01<>[]{}/*+=#';
    let frame = 0;
    let timer = 0;
    const tick = () => {
      const resolved = Math.min(text.length, Math.floor(frame / 3));
      setValue(text.split('').map((char, i) => {
        if (i < resolved || char === ' ') return char;
        return chars[(frame + i * 7) % chars.length];
      }).join(''));
      frame += 1;
      if (resolved < text.length) {
        timer = window.setTimeout(tick, 55);
      } else {
        setValue(text);
        setRunning(false);
      }
    };
    tick();
    return () => window.clearTimeout(timer);
  };

  useEffect(() => {
    const timer = window.setTimeout(animate, 260);
    return () => window.clearTimeout(timer);
  }, [text, reduce]);

  return (
    <span
      className={`cv4-tech-text ${running ? 'is-running' : ''}`}
      aria-label={text}
      onMouseEnter={animate}
      onFocus={animate}
      tabIndex={0}
    >
      {value}
    </span>
  );
}

function GlowCursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const node = ref.current;
    if (!node) return;
    let x = -100, y = -100, tx = -100, ty = -100, raf = 0;
    const move = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; node.classList.add('is-visible'); };
    const tick = () => {
      x += (tx - x) * .16; y += (ty - y) * .16;
      node.style.transform = 'translate3d(' + (x - 18) + 'px,' + (y - 18) + 'px,0)';
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} className="cv4-glow-cursor" aria-hidden="true"><i /></div>;
}

function AccordionGallery({ activeScreen, setActiveScreen }: { activeScreen: number; setActiveScreen: (index: number) => void }) {
  return (
    <div className="cv4-accordion-gallery" role="tablist" aria-label="ComSki product journey screens">
      {screenData.map((screen, i) => (
        <button
          key={screen.src}
          type="button"
          role="tab"
          aria-selected={activeScreen === i}
          aria-label={screen.label}
          className={activeScreen === i ? 'is-active' : ''}
          onClick={() => setActiveScreen(i)}
        >
          <div className="cv4-gallery-media"><img src={BASE + screen.src} alt="" loading="lazy" /></div>
          <div className="cv4-gallery-label">
            <span>{String(i + 1).padStart(2,'0')}</span>
            <strong>{screen.label.split(' · ')[1]}</strong>
            <small>{screen.phase}</small>
            <i>↗</i>
          </div>
        </button>
      ))}
    </div>
  );
}


function AntigravityField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let raf = 0;
    let resizeObserver: ResizeObserver | null = null;
    let pointerX = 0;
    let pointerY = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;
    let disposed = false;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas, alpha: true, antialias: true, powerPreference: 'low-power',
        premultipliedAlpha: true,
      });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
    camera.position.set(0, 0, 12);

    const particleCount = window.matchMedia('(max-width: 767px)').matches ? 1800 : 3600;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);
    const drift = new Float32Array(particleCount);
    const palette = [
      new THREE.Color('#4285f4'), new THREE.Color('#34a853'),
      new THREE.Color('#fbbc05'), new THREE.Color('#ea4335'),
      new THREE.Color('#7b8490'),
    ];

    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 15.5;
      positions[i3 + 1] = (Math.random() - 0.5) * 8.8;
      positions[i3 + 2] = (Math.random() - 0.5) * 5.5;
      const color = palette[Math.floor(Math.random() * palette.length)];
      const saturation = 0.82 + Math.random() * 0.18;
      colors[i3] = color.r * saturation;
      colors[i3 + 1] = color.g * saturation;
      colors[i3 + 2] = color.b * saturation;
      sizes[i] = 0.7 + Math.random() * 2.1;
      phases[i] = Math.random() * Math.PI * 2;
      drift[i] = 0.25 + Math.random() * 0.85;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute('aDrift', new THREE.BufferAttribute(drift, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms: {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 1.75) },
      },
      vertexShader: `
        attribute vec3 aColor;
        attribute float aSize;
        attribute float aPhase;
        attribute float aDrift;
        uniform float uTime;
        uniform vec2 uPointer;
        uniform float uPixelRatio;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec3 p = position;
          float t = uTime * aDrift;
          p.x += sin(t * 0.42 + aPhase + p.y * 0.34) * (0.12 + abs(p.z) * 0.025);
          p.y += cos(t * 0.31 + aPhase + p.x * 0.22) * 0.11;
          p.z += sin(t * 0.24 + aPhase) * 0.16;
          vec2 pointerDelta = p.xy - uPointer * vec2(7.8, 4.6);
          float pointerDistance = length(pointerDelta);
          float influence = exp(-pointerDistance * 0.72);
          p.xy += normalize(pointerDelta + vec2(0.0001)) * influence * 0.22;
          vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = aSize * uPixelRatio * (22.0 / max(1.0, -mvPosition.z));
          vColor = aColor;
          vAlpha = 0.13 + (0.22 * influence) + (0.13 * (0.5 + 0.5 * sin(t + aPhase)));
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec2 point = gl_PointCoord - vec2(0.5);
          float distanceFromCenter = length(point);
          if (distanceFromCenter > 0.5) discard;
          float softEdge = 1.0 - smoothstep(0.18, 0.5, distanceFromCenter);
          float core = 1.0 - smoothstep(0.0, 0.22, distanceFromCenter);
          gl_FragColor = vec4(vColor, (softEdge * 0.58 + core * 0.18) * vAlpha);
        }
      `,
    });

    const particles = new THREE.Points(geometry, material);
    particles.frustumCulled = false;
    scene.add(particles);

    const resize = () => {
      if (!renderer) return;
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 600 ? 14.5 : 12;
      camera.updateProjectionMatrix();
      material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio || 1, 1.75);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      targetPointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetPointerY = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onPointerLeave = () => { targetPointerX = 0; targetPointerY = 0; };

    const clock = new THREE.Clock();
    const draw = () => {
      if (disposed || !renderer) return;
      pointerX += (targetPointerX - pointerX) * 0.055;
      pointerY += (targetPointerY - pointerY) * 0.055;
      material.uniforms.uTime.value = clock.getElapsedTime();
      material.uniforms.uPointer.value.set(pointerX, pointerY);
      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(draw);
    };

    resize();
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    raf = window.requestAnimationFrame(draw);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(raf);
      resizeObserver?.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      geometry.dispose();
      material.dispose();
      renderer?.dispose();
    };
  }, [reduce]);

  return <canvas ref={canvasRef} className="cv6-ag-field" aria-hidden="true" />;
}

function ComskiCaseStudyCV4() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [activeScreen, setActiveScreen] = useState(0);
  const [activeSection, setActiveSection] = useState('01');
  const processRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.cv4-section[id]'));
    if (!sections.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id.replace('s', ''));
    }, { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.15, 0.35, 0.6] });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      const fill = trailRef.current?.querySelector('.cv4-trail-fill');
      if (fill) {
        const length = (fill as SVGPathElement).getTotalLength();
        gsap.set(fill, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(fill, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.cv4-story', start: 'top top', end: 'bottom bottom', scrub: 0.5 }
        });
      }
      if (processRef.current) {
        const stages = processRef.current.querySelectorAll('.process-stage');
        const arrows = processRef.current.querySelectorAll('.process-arrow');
        gsap.set(stages, { opacity: 0.18, scale: 0.96 });
        gsap.set(arrows, { opacity: 0.15 });
        ScrollTrigger.create({
          trigger: processRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1,
          onUpdate: self => {
            const p = self.progress;
            stages.forEach((node, i) => {
              const threshold = i / stages.length;
              const local = Math.max(0, Math.min(1, (p - threshold) * stages.length));
              gsap.set(node, { opacity: 0.18 + local * 0.82, scale: 0.96 + local * 0.04 });
              if (arrows[i]) gsap.set(arrows[i], { opacity: Math.max(0.15, local) });
            });
          }
        });
      }
    });
    return () => ctx.revert();
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      const bars = document.querySelectorAll<HTMLElement>('.cv4-ai-before-after .score-bar span, .cv4-ai-before-after .guide-bar span');
      gsap.fromTo(bars, { scaleX: 0 }, {
        scaleX: 1,
        transformOrigin: 'left center',
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.14,
        scrollTrigger: { trigger: '.cv4-ai-before-after', start: 'top 78%', once: true }
      });

      const swatches = document.querySelectorAll<HTMLElement>('.cv4-token-sheet .swatches i');
      gsap.fromTo(swatches, { opacity: 0, y: 12, scale: .82 }, {
        opacity: 1, y: 0, scale: 1,
        duration: .45, ease: 'back.out(1.7)', stagger: .06,
        scrollTrigger: { trigger: '.cv4-token-sheet', start: 'top 78%', once: true }
      });

      const outcomeCards = document.querySelectorAll<HTMLElement>('.cv4-outcomes article');
      gsap.fromTo(outcomeCards, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: .5, ease: 'power3.out', stagger: .1,
        scrollTrigger: { trigger: '.cv4-outcomes', start: 'top 78%', once: true }
      });

      const screen = document.querySelector<HTMLElement>('.cv4-feature-main .cv4-screen-browser');
      if (screen) {
        const move = (event: PointerEvent) => {
          const r = screen.getBoundingClientRect();
          const x = (event.clientX - r.left) / r.width - .5;
          const y = (event.clientY - r.top) / r.height - .5;
          screen.style.setProperty('--screen-rx', `${(-y * 2.2).toFixed(2)}deg`);
          screen.style.setProperty('--screen-ry', `${(x * 2.2).toFixed(2)}deg`);
          screen.style.setProperty('--screen-mx', `${(x * 10).toFixed(1)}px`);
          screen.style.setProperty('--screen-my', `${(y * 10).toFixed(1)}px`);
        };
        const reset = () => {
          screen.style.setProperty('--screen-rx','0deg');
          screen.style.setProperty('--screen-ry','0deg');
          screen.style.setProperty('--screen-mx','0px');
          screen.style.setProperty('--screen-my','0px');
        };
        screen.addEventListener('pointermove', move);
        screen.addEventListener('pointerleave', reset);
        return () => {
          screen.removeEventListener('pointermove', move);
          screen.removeEventListener('pointerleave', reset);
        };
      }
    });
    return () => ctx.revert();
  }, [reduce, activeScreen]);

  // Premium motion system: keep native scrolling, but choreograph depth from scroll position.
  useEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      const hero = document.querySelector<HTMLElement>('.cv4-hero');
      const heroVisual = document.querySelector<HTMLElement>('.cv4-hero-visual');
      const heroCopy = document.querySelector<HTMLElement>('.cv4-hero-copy');
      const story = document.querySelector<HTMLElement>('.cv4-story');
      const gallery = document.querySelector<HTMLElement>('.cv4-accordion-gallery');
      const footer = document.querySelector<HTMLElement>('.cv4-footer');

      if (hero && heroVisual && heroCopy) {
        gsap.to(heroVisual, { yPercent: -10, rotateZ: -0.35, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.8 } });
        gsap.to(heroCopy, { yPercent: 5, opacity: 0.82, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.8 } });
      }

      gsap.utils.toArray<HTMLElement>('.cv4-section-content').forEach((section) => {
        const heading = section.querySelector<HTMLElement>('h2');
        if (!heading) return;
        gsap.fromTo(heading, { y: 22, opacity: 0.55 }, { y: 0, opacity: 1, ease: 'power3.out', scrollTrigger: { trigger: heading, start: 'top 88%', end: 'top 58%', scrub: 0.65 } });
      });

      if (story) {
        gsap.utils.toArray<HTMLElement>('.cv4-section').forEach((section) => {
          const media = section.querySelector<HTMLElement>('.cv4-screen-browser, .cv4-system, .cv4-table-wrap, .cv4-opportunity');
          if (!media) return;
          gsap.fromTo(media, { y: 28, scale: 0.985 }, { y: 0, scale: 1, ease: 'power2.out', scrollTrigger: { trigger: section, start: 'top 82%', end: 'top 35%', scrub: 0.7 } });
        });
      }

      if (gallery) {
        gsap.to(gallery, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: gallery, start: 'top 82%', end: 'bottom 22%', scrub: 0.7 } });
      }

      if (footer) {
        gsap.fromTo(footer, { y: 24 }, { y: 0, ease: 'none', scrollTrigger: { trigger: footer, start: 'top bottom', end: 'top 65%', scrub: 0.8 } });
      }

      ScrollTrigger.refresh();
    });
    return () => ctx.revert();
  }, [reduce]);

  const active = useMemo(() => screenData[activeScreen], [activeScreen]);

  return (
    <main className="cv4-page"><GlowCursor />
      <div className="cv4-mobile-progress" style={{ transform: `scaleX(${progress})` }} />
      <header className="cv4-hero cv6-ag-hero">
        <AntigravityField />
        <div className="cv6-ag-hero-inner">
          <motion.div className="cv6-ag-copy" initial={reduce ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
            <div className="cv6-ag-brand">COMSKI<span className="cv6-ag-brand-mark">●</span></div>
            <BlurReveal className="cv6-ag-title-wrap">
              <motion.h1 initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12, duration: 0.65 }}>
                Communication gets better when practice feels <em>natural.</em>
              </motion.h1>
            </BlurReveal>
            <motion.p className="cv6-ag-subtitle" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.55, ease }}>
              A calmer way to build confidence across Reading, Listening, Writing and Speaking — shaped around each learner.
            </motion.p>
            <motion.div className="cv6-ag-actions" initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.5, ease }}>
              <a className="cv6-ag-primary" href="#s01">Explore case study <span>↗</span></a>
              <a className="cv6-ag-secondary" href="#s03">How it works <span>↓</span></a>
            </motion.div>
          </motion.div>
        </div>
      </header>

      <aside className="cv4-section-nav" aria-label="Case study sections">
        <div className="cv4-section-nav-line" />
        {[['01','Problem'],['02','Constraints'],['03','Research'],['04','Users'],['05','Competition'],['06','Synthesis'],['07','Journey'],['08','Process'],['09','Exploration'],['10','IA + Flow'],['11','Screens'],['12','AI UX'],['13','System'],['14','Validation'],['15','Build'],['16','Outcomes'],['17','Business'],['18','Learnings'],['19','Next'],['20','Role']].map(([n,label]) => (
          <a
            key={n}
            href={`#s${n}`}
            className={activeSection === n ? 'active' : ''}
            aria-label={`${n} ${label}`}
          >
            <span>{n}</span><b>{label}</b>
          </a>
        ))}
      </aside>

      <div className="cv4-story-wrap">
        <svg className="cv4-trail" ref={trailRef} viewBox="0 0 40 1000" preserveAspectRatio="none" aria-hidden="true">
          <path className="cv4-trail-base" d="M20 0 V1000" />
          <path className="cv4-trail-fill" d="M20 0 V1000" />
        </svg>

        <div className="cv4-story">
          <Section n="01" title="Problem framing">
            <Reveal><h2>The failure point wasn't instruction. It was the moment practice started to feel like judgement.</h2></Reveal>
            <Stagger className="cv4-four-blocks rb-stagger-grid">
              <SpotlightCard><article><label>User problem</label><h3>People who need to communicate under pressure lack a reliable, private practice loop.</h3><p>Students presenting in class and professionals preparing for interviews can know their content and still freeze when delivery becomes the task.</p></article></SpotlightCard>
              <article><label>Business problem</label><h3>Communication coaching is fragmented by modality and audience.</h3><p>Language mechanics, pronunciation and spoken delivery are commonly split across products, while school and professional contexts are rarely unified.</p></article>
              <article><label>Product opportunity</label><h3>Build one coaching system across Reading, Listening, Writing and Speaking.</h3><p>Keep the interaction model coherent while allowing content and scenarios to adapt to the learner's context.</p></article>
              <article><label>Design challenge</label><h3>Serve a class debate and a technical interview without making either audience feel generic.</h3><p>The architecture needed shared interaction grammar with divergent content, tone and goal framing.</p></article>
            </Stagger>
            <Reveal className="cv4-hmw"><label>HOW MIGHT WE</label><strong>How might we help learners build real communication confidence through consistent, low-pressure practice — without the fear of judgement that stops people practicing?</strong></Reveal>
          </Section>

          <Section n="02" title="Challenges & design complexity" tone="pink">
            <Reveal><h2>Senior design work starts by making the constraint set explicit.</h2></Reveal>
            <Table className="cv4-challenge-table">
              <thead><tr><th>Challenge</th><th>Why it mattered</th><th>Design implication</th><th>How I approached it</th></tr></thead>
              <tbody>
                {[
                  ['Multiple user types', 'Students need encouragement; professionals need realism and outcome relevance.', 'Shared interaction grammar; divergent content and tone.', 'Kept four-skill progression identical; varied onboarding framing and named goal journeys.'],
                  ['AI uncertainty', 'A confidence score can be technically correct and still mislead users about what to do.', 'Actionable guidance must lead; scores become secondary.', 'Reworked feedback hierarchy around what to improve next.'],
                  ['Four modalities', 'Different inputs can make the product feel like four mini-products.', 'One interaction grammar across modalities.', 'Locked prompt → respond → check → completion before designing individual skills.'],
                  ['Onboarding complexity', 'Personalisation needs context, but every extra question is drop-off risk.', 'Progressive disclosure and reversible answers.', 'Conversational, one-question-at-a-time onboarding with back navigation.'],
                  ['Trust in AI feedback', 'Users will not engage with feedback they cannot understand or trust.', 'Earn trust before vulnerable input.', 'Explicit judgement-free framing and visible system status.'],
                  ['Control vs assessment integrity', 'Exiting mid-assessment can compromise incomplete skill data.', 'Bounded control rather than blanket control.', 'Opt-out before start; once started, assessment exit is intentionally constrained.']
                ].map(row => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th key={i}>{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}
              </tbody>
            </Table>
          </Section>

          <Section n="03" title="Research — secondary + user" tone="orange">
            <Reveal><h2>Research was used to test the product logic, not decorate the case study.</h2><p className="cv4-lede">The project material confirms direct observation, moderated prototype testing and competitor review. Exact participant counts and quantitative results are not recorded, so they are not invented here.</p></Reveal>
            <div className="cv4-research-tables">
              <div>
                <h3>Secondary research</h3>
                <Table>
                  <thead><tr><th>Finding</th><th>Evidence / source</th><th>UX implication</th></tr></thead>
                  <tbody>
                    <tr><th>AI transparency is a UX problem.</th><td>Nielsen Norman Group — explainable AI and AI feature guidance.</td><td>Show why and what to do next, not only a confidence number.</td></tr>
                    <tr><th>Human-AI systems should support correction and avoid overstating confidence.</th><td>Microsoft Research — Guidelines for Human-AI Interaction.</td><td>Frame feedback as guidance and make uncertainty recoverable.</td></tr>
                    <tr><th>AI systems should avoid authoritative overclaiming.</th><td>Google — design principles for AI experiences.</td><td>Keep the learner in the loop rather than presenting verdicts.</td></tr>
                    <tr><th>Personalised practice can use goals, situations and interests.</th><td>Speak custom lessons / personalised learning documentation.</td><td>Onboarding context should influence content, not remain profile data.</td></tr>
                    <tr><th>Rubrics and coach configuration can make AI practice goal-specific.</th><td>Yoodli Coach Bot / rubric documentation.</td><td>Feedback should map to a named objective.</td></tr>
                  </tbody>
                </Table>
              </div>
              <div>
                <h3>User research structure</h3>
                <Table>
                  <thead><tr><th>Research question</th><th>Evidence available</th><th>Design interpretation</th><th>Validation implication</th></tr></thead>
                  <tbody>
                    <tr><th>What makes practice feel safe enough to repeat?</th><td>The project framing identifies judgement and presentation pressure as core risks; participant-level evidence is not preserved in the source material.</td><td>Treat psychological safety as a product requirement, not a tone-of-voice detail.</td><td>Test whether judgement-free framing increases practice completion and repeat intent.</td></tr>
                    <tr><th>What makes AI feedback actionable?</th><td>The available case-study material prioritises understandable, next-step feedback over raw scoring.</td><td>Feedback hierarchy should answer “what happened?” and “what should I do next?”</td><td>Measure feedback comprehension and next-action selection in usability testing.</td></tr>
                    <tr><th>Where can the prototype fail?</th><td>Potential failure modes include processing uncertainty, score fixation and unclear next steps; no participant-level frequency is claimed.</td><td>Design explicit system status, explainability and recovery states before relying on AI output.</td><td>Test loading, uncertain, low-confidence and error states as first-class flows.</td></tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </Section>

          <Section n="04" title="Personas + JTBD" tone="blue">
            <div className="cv4-personas">
              <Reveal className="cv4-persona"><div className="avatar student">A</div><div><label>PROPOSED CONTEXT PERSONA</label><h3>The Avoidant Presenter</h3><p>Middle/high-school learner facing presentations, debates or Model UN.</p><ul><li><b>Goal:</b> practise privately before a graded attempt.</li><li><b>Behavior:</b> may prefer low-pressure, private rehearsal before public performance.</li><li><b>Success:</b> completes a practice loop and can identify a concrete next improvement.</li></ul><strong>Design implication</strong><p>Feedback should be synthesised and guidance-first, with the learner retaining control over when to retry.</p></div></Reveal>
              <Reveal className="cv4-persona"><div className="avatar pro">P</div><div><label>PROPOSED CONTEXT PERSONA</label><h3>The Interview-Track Professional</h3><p>Job-seeker preparing for a named high-stakes outcome such as a technical interview.</p><ul><li><b>Goal:</b> rehearse communication against a specific outcome.</li><li><b>Behavior:</b> likely to value targeted practice over a generic course sequence.</li><li><b>Success:</b> can see the gap to the chosen goal and a clear next practice action.</li></ul><strong>Design implication</strong><p>Frame progress around a named outcome while keeping the underlying four-skill interaction model consistent.</p></div></Reveal>
            </div>
            <Reveal className="cv4-jtbd-block">
              <label>JOBS TO BE DONE · PROPOSED</label>
              <ol>
                <li>When I am assigned to present tomorrow, I want to practise without anyone watching, so I can catch mistakes privately before it is real.</li>
                <li>When feedback is not specific, I want to know exactly what to fix next, so I do not just feel judged without a path forward.</li>
                <li>When preparing for a high-stakes interview, I want realistic rehearsal, so I have already felt the pressure once.</li>
                <li>When I have practised for weeks, I want visible proof I am improving, so I stay motivated.</li>
                <li>When I face four skills at once, I want the product to tell me where to start, so I am not overwhelmed.</li>
              </ol>
              <Table><thead><tr><th>Need type</th><th>What the product requires</th></tr></thead><tbody><tr><th>Functional</th><td>Accurate, modality-specific feedback.</td></tr><tr><th>Emotional</th><td>A judgement-free space, explicitly framed.</td></tr><tr><th>Usability</th><td>A clear next action and minimal setup friction.</td></tr><tr><th>Trust</th><td>Understanding why feedback says what it says and confidence that practice is private.</td></tr></tbody></Table>
            </Reveal>
          </Section>

          <Section n="05" title="Competitive research & opportunity" tone="pink">
            <Reveal><h2>ComSki is not trying to beat specialists at their own modality.</h2></Reveal>
            <Table className="cv4-competitive">
              <thead><tr><th>Capability</th><th>Duolingo</th><th>ELSA Speak</th><th>Yoodli</th><th>Orai</th><th>ComSki direction</th></tr></thead>
              <tbody>
                <tr><th>Core modality</th><td>Language mechanics</td><td>Pronunciation / accent</td><td>Spoken delivery</td><td>Spoken delivery</td><td>Reading + Listening + Writing + Speaking</td></tr>
                <tr><th>Primary audience</th><td>Language learners</td><td>English learners</td><td>Working professionals</td><td>Public speakers</td><td>Students + professionals</td></tr>
                <tr><th>AI feedback</th><td>Correctness</td><td>Pronunciation accuracy</td><td>Pacing, filler, confidence</td><td>Filler, pace, energy, clarity</td><td>Modality-specific + unified progression</td></tr>
                <tr><th>Judgement-free framing</th><td>Gamified</td><td>Not explicit</td><td>Explicit</td><td>Not explicit</td><td>Explicit in-product copy</td></tr>
                <tr><th>Progress tracking</th><td>Streaks / XP</td><td>Score-based</td><td>Dashboard / benchmarks</td><td>Scorecards / history</td><td>Sessions, goal journey and skill progression</td></tr>
                <tr><th>Onboarding personalisation</th><td>Placement</td><td>Accent / goal</td><td>Audience / practice</td><td>Minimal</td><td>Vibe, goal, time, confidence, interests</td></tr>
                <tr><th>School-context design</th><td>No</td><td>No</td><td>No</td><td>No</td><td>Debate, Model UN and in-class scenarios</td></tr>
              </tbody>
            </Table>
            <Reveal className="cv4-opportunity"><label>COMPETITIVE OPPORTUNITY</label><strong>One coherent system spanning four communication modalities and both K-12 and professional contexts — a structural position rather than a feature-parity race.</strong></Reveal>
          </Section>

          <Section n="06" title="Research synthesis" tone="orange">
            <Reveal><h2>Raw observation → theme → insight → design opportunity.</h2></Reveal><p className="cv4-evidence-flag">Evidence boundary · observations below are design hypotheses unless directly supported by the preserved project material.</p><div className="cv4-synthesis-flow">
              <article><label>OBSERVATION / HYPOTHESIS</label><b>Judgement can increase avoidance.</b><b>Processing uncertainty can feel like a black box.</b><b>Numeric scores can compete with actionable guidance.</b><b>Four skills can increase perceived scope.</b></article>
              <i>→</i>
              <article><label>THEME</label><b>Low confidence / trust</b><b>Lack of system status</b><b>Misplaced information hierarchy</b><b>Onboarding / scope complexity</b></article>
              <i>→</i>
              <article><label>INSIGHT</label><b>The barrier is emotional cost, not only skill.</b><b>Visibility is part of trust.</b><b>Correct AI output can still fail the product goal.</b><b>Shared grammar reduces felt complexity.</b></article>
              <i>→</i>
              <article className="final"><label>DESIGN OPPORTUNITY</label><b>Guidance-first review</b><b>Explicit processing state</b><b>Score secondary to action</b><b>One interaction pattern across four skills</b></article>
            </div>
          </Section>

          <Section n="07" title="Current → future journey" tone="blue">
            <Reveal><h2>Move the learner from an avoidance loop into a visible practice loop.</h2></Reveal>
            <div className="cv4-journey current">
              <div className="journey-label">CURRENT STATE</div>
              {[
                ['1', 'Assigned to speak', 'Prepares alone', 'No objective practice signal', 'Anxious'],
                ['2', 'Performs live', 'Freezes / underperforms', 'No chance to course-correct', 'Exposed'],
                ['3', 'After performing', 'Avoids rewatching', 'Review confronts the failure directly', 'Ashamed / avoidant'],
                ['4', 'Seeks feedback', 'Gets inconsistent input', 'No reliable signal on what to fix', 'Confused']
              ].map(x => <article key={x[0]}><b>{x[0]}</b><h3>{x[1]}</h3><span>Action</span><p>{x[2]}</p><span>Friction</span><p>{x[3]}</p><span>Emotion</span><p>{x[4]}</p></article>)}
            </div>
            <div className="cv4-journey future">
              <div className="journey-label">FUTURE STATE · COMSKI</div>
              {['Record', 'AI Analysis', 'Feedback', 'Progress'].map((x, i) => <article key={x}><b>0{i + 1}</b><strong>{x}</strong><span>{['Practice a low-stakes rep', 'System status stays visible', 'Guidance leads; score is secondary', 'Progress compounds over time'][i]}</span></article>)}
            </div>
          </Section>

          <Section n="08" title="Design process · 9 phases" tone="orange" className="cv4-process-section">
            <Reveal><h2>Understand → Frame → Explore → Converge → Structure → Design → Validate → Deliver → Measure.</h2></Reveal>
            <div className="cv4-process-grid" ref={processRef}>
              {['Understand','Frame','Explore','Converge','Structure','Design','Validate','Deliver','Measure'].map((name, i) => (
                <React.Fragment key={name}>
                  <div className="process-stage"><span>0{i + 1}</span><strong>{name}</strong><small>{[
                    'Context, users, evidence, constraints.',
                    'Problem, HMW, opportunity.',
                    'IA, flows, alternatives.',
                    'Trade-offs and decision criteria.',
                    'States, edge cases, handoffs.',
                    'Wireframes → high fidelity.',
                    'Prototype testing + heuristics.',
                    'Tokens, components, specs.',
                    'Metrics and falsifiable hypotheses.'
                  ][i]}</small></div>
                  {i < 8 && <div className="process-arrow" aria-hidden="true">→</div>}
                </React.Fragment>
              ))}
            </div>
          </Section>

          <Section n="09" title="Exploration & design alternatives" tone="blue">
            <Stagger className="cv4-directions">
              <TiltCard><article><label>DIRECTION A</label><h3>Two separate products</h3><p><b>Strength:</b> maximum audience specificity.</p><p><b>Weakness:</b> two IAs, two onboarding systems and duplicated components.</p><p><b>Risk:</b> divergent quality and no shared learning.</p><em>Rejected because the underlying job — practice → feedback → improve → progress — is shared.</em></article></TiltCard>
              <TiltCard><article><label>DIRECTION B</label><h3>Single diagnostic assessment</h3><p><b>Strength:</b> smaller scope.</p><p><b>Weakness:</b> measures the problem but does not solve repeated avoidance.</p><p><b>Risk:</b> accurate diagnosis with no behavior change.</p><em>Rejected because the core opportunity is an ongoing practice relationship.</em></article></TiltCard>
              <TiltCard><article className="selected"><label>FINAL DIRECTION</label><h3>One shared system + four-skill entry + coached practice loop</h3><p><b>Strength:</b> addresses avoidance while remaining achievable in one design cycle.</p><p><b>Trade-off:</b> shared architecture might underserve one audience.</p><p><b>Mitigation:</b> define a falsifiable post-launch segment comparison.</p><em>Selected because it best matches the identified job for both audiences.</em></article></TiltCard>
            </Stagger>
          </Section>

          <Section n="10" title="Information architecture + user flow" tone="pink">
            <Reveal><h2>Structure the system around roles, then keep the learner path shallow.</h2></Reveal>
            <div className="cv4-ia-diagram">
              <div className="ia-top">COMSKI</div><div className="ia-line"/>
              <div className="ia-role-grid"><div><b>Student</b><span>Onboarding</span><span>Assessment</span><span>Practice</span><span>My Journey</span><span>Results</span></div><div><b>Teacher / Institution</b><span>Assign / recommend</span><span>Cohort progress</span><span>Gap visibility</span></div><div><b>Admin</b><span>Institution config</span><span>User management</span><span>Aggregate reporting</span></div></div>
            </div>
            <div className="cv4-user-flow">
              {[
                ['Assessment entry', 'Preview all four tests', 'Start now / later'],
                ['Reading', 'Prompt → respond → 5 questions', 'Previous / Next / Skip'],
                ['Listening', 'Audio → comprehension', 'Previous / Next / Skip'],
                ['Writing', 'Compose → structured check', 'Previous / Next / Skip'],
                ['Speaking', 'Voice response → completion', 'Directional handoff']
              ].map((x, i) => <article key={x[0]}><span>0{i + 1}</span><b>{x[0]}</b><p>{x[1]}</p><small>{x[2]}</small></article>)}
            </div>
            <p className="cv4-note">Confirmed interaction decisions include an opt-out before assessment and no back/close once the assessment begins. Resume-vs-restart after interruption remains an open product decision.</p>
          </Section>

          <Section n="11" title="Features & screens" tone="orange">
            <Reveal><h2>From personalisation to practice to progress — the interface keeps the grammar stable while the task changes.</h2><p className="cv4-lede">These are the original ComSki exports now integrated into the case study. Twelve representative states show the learner journey across onboarding, assessment, feedback and progression without replacing the product with invented UI.</p></Reveal>
            <AccordionGallery activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
            <div className="cv4-feature-selected">
              <div className="cv4-screen-context"><span>{active.phase}</span><b>{String(activeScreen + 1).padStart(2,'0')} / {String(screenData.length).padStart(2,'0')}</b></div>
              <Screen {...active} wide />
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeScreen} className="cv4-screen-reasoning rb-glass-panel" initial={reduce ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={reduce ? undefined : { opacity: 0, height: 0 }} transition={{ duration: 0.35, ease }}>
                <div><label>USER GOAL</label><strong>{active.goal}</strong></div>
                <div><label>DESIGN DECISION</label><strong>{active.decision}</strong></div>
                <div><label>SYSTEM ROLE</label><strong>{active.phase} · Recognition over recall · Progressive disclosure · Consistency</strong></div>
              </motion.div>
            </AnimatePresence>
          </Section>

          <Section n="12" title="AI UX / intelligent system design" tone="blue">
            <Reveal>
              <h2>Design the AI as a visible loop — input, analysis, uncertainty, guidance, next action.</h2>
              <p className="cv4-lede">The preserved ComSki screens establish the learner journey, but they do not provide a confirmed AI result or low-confidence state. The system below is therefore a proposed interaction model, explicitly separated from the exported UI.</p>
            </Reveal>

            <div className="cv4-ai-system" aria-label="Proposed ComSki AI interaction model">
              <div className="cv4-ai-node input">
                <span>01 · USER INPUT</span>
                <strong>Practice</strong>
                <p>Reading, listening, writing or speaking response</p>
                <i>Captured task + learner context</i>
              </div>
              <div className="cv4-ai-connector" aria-hidden="true">↓</div>
              <div className="cv4-ai-node processing">
                <span>02 · SYSTEM STATUS</span>
                <strong>Analysing</strong>
                <div className="cv4-ai-pulse"><i/><i/><i/></div>
                <p>Keep processing visible; do not imply certainty while the model is still evaluating.</p>
              </div>
              <div className="cv4-ai-connector" aria-hidden="true">↓</div>
              <div className="cv4-ai-split">
                <div className="cv4-ai-node confidence">
                  <span>03 · CONFIDENCE</span>
                  <strong>Signal quality</strong>
                  <p>High-quality input → proceed to coaching.</p>
                  <p className="muted">Low-quality / ambiguous input → ask for a clearer attempt.</p>
                </div>
                <div className="cv4-ai-node transparency">
                  <span>03 · EXPLANATION</span>
                  <strong>Why this feedback?</strong>
                  <p>Show the evidence behind a suggestion where the product can support it.</p>
                  <p className="muted">Never turn an inferred signal into a definitive judgement.</p>
                </div>
              </div>
              <div className="cv4-ai-connector" aria-hidden="true">↓</div>
              <div className="cv4-ai-node guidance">
                <span>04 · COACHING OUTPUT</span>
                <strong>What to improve next</strong>
                <div className="cv4-ai-guidance-row"><b>Clarity</b><span><i style={{width:'74%'}}/></span><em>Practice one concise answer</em></div>
                <div className="cv4-ai-guidance-row"><b>Delivery</b><span><i style={{width:'58%'}}/></span><em>Slow the opening sentence</em></div>
                <small>Proposed hierarchy: actionable guidance first; score secondary.</small>
              </div>
              <div className="cv4-ai-connector" aria-hidden="true">↓</div>
              <div className="cv4-ai-node next">
                <span>05 · NEXT ACTION</span>
                <strong>Practice again</strong>
                <p>Convert feedback into one small, repeatable action and return the learner to the journey.</p>
                <button type="button" tabIndex={-1}>Start next practice →</button>
              </div>
            </div>

            <div className="cv4-ai-principles">
              <article><span>01</span><h3>Explainability over confidence display</h3><p>Lead with “what to improve next”; use scores as secondary confirmation rather than the main hierarchy.</p><small>Design principle</small></article>
              <article><span>02</span><h3>System status</h3><p>During AI processing, show what the system is doing so the learner does not experience a black box.</p><small>Interaction principle</small></article>
              <article><span>03</span><h3>Human-in-the-loop</h3><p>AI coaches the next action; it does not replace learner agency or present an opaque verdict.</p><small>Control principle</small></article>
              <article><span>04</span><h3>Bounded automation</h3><p>Assessment integrity can justify constrained exit after commitment, while preserving a clear opt-out beforehand.</p><small>Product-specific trade-off</small></article>
            </div>

            <div className="cv4-ai-before-after">
              <div><label>BEFORE · PROBLEM</label><div className="score-bar"><b>Score</b><span style={{ width: '92%' }}/></div><p>Numeric confidence dominates attention.</p></div>
              <div className="arrow">→</div>
              <div><label>AFTER · TARGET HIERARCHY</label><div className="guide-bar"><b>What to improve next</b><span style={{ width: '72%' }}/></div><p>Guidance becomes the primary decision surface.</p></div>
            </div>

            <div className="cv4-ai-state-grid">
              <article><span>CONFIRMED</span><strong>Original exports define the learner journey.</strong><p>Onboarding, skill tasks and My Journey are real ComSki screens now integrated above.</p></article>
              <article><span>PROPOSED</span><strong>Low-confidence recovery.</strong><p>“We’re not sure yet. Try a clearer response.” Give the learner a recoverable next step instead of a false-precision score.</p></article>
              <article><span>PROPOSED</span><strong>AI failure recovery.</strong><p>Explain that analysis could not complete, preserve the learner’s work, and offer retry / continue options.</p></article>
            </div>
          </Section>

          <Section n="13" title="Design system" tone="pink">
            <Reveal><h2>A system was needed because four skills should feel like one product.</h2></Reveal>
            <div className="cv4-system">
              <div className="cv4-token-sheet">
                <label>COLOR</label>
                <div className="swatches"><i style={{background:'#3B5BDB'}}/><i style={{background:'#1A1D29'}}/><i style={{background:'#F2A04A'}}/><i style={{background:'#E9A6C8'}}/><i style={{background:'#B9DDFF'}}/><i style={{background:'#17264A'}}/></div>
                <div className="hexes"><span>#3B5BDB</span><span>#1A1D29</span><span>Orange</span><span>Pink</span><span>Light blue</span><span>Navy</span></div>
                <label>TYPE SCALE</label><div className="type-scale"><b>Display · 56/64</b><strong>Heading · 43/48</strong><span>Body · 17/28</span><small>Caption · 13/18</small></div>
                <label>SPACING</label><div className="spacing-scale">{[4,8,12,16,24,32,48,64,96,128].map(x => <i key={x} style={{width: Math.max(8, x * .65)}}><b>{x}</b></i>)}</div>
              </div>
              <div className="cv4-system-copy"><label>IMPLEMENTATION BACKBONE</label><h3>One component grammar, parameterised by skill.</h3><div><b>GRID</b><span>12-column desktop · 4-column mobile · 768 / 1024 / 1440 breakpoints.</span></div><div><b>COMPONENTS</b><span>Step tracker, question counter, Pro Tips panel, directional completion.</span></div><div><b>RATIONALE</b><span>Structural familiarity transfers even when content and input modality change.</span></div><div><b>ACCESSIBILITY</b><span>Focus visibility, contrast verification, touch-target review and reduced-motion behavior.</span></div></div>
            </div>
          </Section>

          <Section n="14" title="Usability testing & findings" tone="orange">
            <Reveal><h2>Validation is separated from inference — so the case study stays credible.</h2><p className="cv4-lede">The preserved project material does not contain participant counts, task results or validated before/after findings. Rather than inventing evidence, this section shows the testable hypotheses and the protocol I would use.</p></Reveal>
            <div className="cv4-test-meta"><div><label>AVAILABLE EVIDENCE</label><strong>Prototype + interaction decisions</strong><span>Start → task → feedback → next action can be evaluated, but participant-level results are not preserved here.</span></div><div><label>PROPOSED PROTOCOL</label><strong>Completion · time-on-task · navigation errors · feedback comprehension</strong><span>Track severity, observation, design response and repeat intent without fabricating a sample.</span></div></div>
            <Table className="cv4-findings">
              <thead><tr><th>Finding</th><th>Severity</th><th>Status</th><th>Design response</th></tr></thead>
              <tbody>
                <tr><th>Hypothesis: invisible processing state could make the AI step feel broken.</th><td><Pill tone="high">High</Pill></td><td><span className="status open">○ Validate</span></td><td>Prototype explicit processing status and test comprehension.</td></tr>
                <tr><th>Hypothesis: a dominant score could compete with guidance.</th><td><Pill tone="critical">Critical</Pill></td><td><span className="status open">○ Validate</span></td><td>Test guidance-first hierarchy against score-first hierarchy.</td></tr>
                <tr><th>No visible validation state on free-text / name fields.</th><td><Pill tone="medium">Medium</Pill></td><td><span className="status open">○ Open</span></td><td>Add validation and recovery states.</td></tr>
                <tr><th>Numeric feedback screen is not confirmed in the current export.</th><td><Pill tone="medium">Medium</Pill></td><td><span className="status open">○ Needs confirmation</span></td><td>Do not claim a specific before/after screen until verified.</td></tr>
              </tbody>
            </Table>
          </Section>

          <Section n="15" title="Accessibility + technical collaboration" tone="blue">
            <div className="cv4-two-col">
              <Reveal><h3>Accessibility checklist</h3><ul className="check-list"><li>Contrast of light-blue Listening accent requires explicit verification.</li><li>Keyboard focus and navigation need verification across back/next flows.</li><li>Onboarding avatar targets should meet a 44px minimum for younger users.</li><li>Listening needs a caption / transcript fallback for deaf and hard-of-hearing learners.</li><li>Motion should respect prefers-reduced-motion.</li></ul></Reveal>
              <Reveal><h3>Technical collaboration</h3><ul className="check-list"><li>Shared interaction grammar reduces the component surface area.</li><li>One parameterised skill-check component can support four modalities.</li><li>Loading, processing, error and empty states are first-class design states.</li><li>Tokens, breakpoints and states are specified for implementation handoff.</li><li>Responsive behavior is defined across desktop and mobile.</li></ul></Reveal>
            </div>
          </Section>

          <Section n="16" title="Outcomes + impact measurement" tone="pink">
            <Reveal><h2>The strongest outcomes are decisions that became more defensible.</h2></Reveal>
            <div className="cv4-outcomes">
              <article><span>USER</span><strong>Two high-risk interaction hypotheses were made explicit and turned into testable design decisions.</strong><small>Status visibility + score hierarchy.</small></article>
              <article><span>PRODUCT</span><strong>One reusable interaction grammar spans four structurally different skill checks.</strong><small>Lower component surface area than four bespoke patterns.</small></article>
              <article><span>DESIGN SYSTEM</span><strong>A token-level specification makes the product implementation-ready.</strong><small>Color · type · spacing · grid · states.</small></article>
            </div>
            <Table className="cv4-impact"><thead><tr><th>Metric</th><th>What it validates</th></tr></thead><tbody>
              <tr><th>Practice-session completion rate</th><td>Whether the Practice → Analysis → Feedback loop works end to end.</td></tr>
              <tr><th>Student vs professional completion / return rate</th><td>Whether the shared architecture holds across segments.</td></tr>
              <tr><th>Onboarding completion rate</th><td>Whether personalisation is value-add or drop-off risk.</td></tr>
              <tr><th>Feedback-to-action rate</th><td>Whether users act on “what to improve next”.</td></tr>
            </tbody></Table>
          </Section>

          <Section n="17" title="Business value" tone="orange" className="quiet-section">
            <Reveal><p className="cv4-business">A product spanning four communication modalities and both education and professional audiences can occupy a positioning gap that specialised competitors do not fully own. The shared-system architecture also creates a cost-efficiency argument: one design system and feedback model can serve multiple markets. For institutional use, the Teacher/Institution layer could reduce manual review load, but that operational benefit remains forward-looking until validated.</p></Reveal>
          </Section>

          <Section n="18" title="Learnings" tone="blue">
            <Stagger className="cv4-learnings">
              {[
                ['01','Complexity is not the same as capability.','Four skills can share one grammar without flattening their modality-specific depth.'],
                ['02','AI changes the interaction model.','Correct output and useful AI UX are different problems.'],
                ['03','Control is a scoped decision.','Assessment integrity can justify bounded control when autonomy is preserved before commitment.'],
                ['04','IA is a product decision.','The Teacher / Institution layer reflects a scaling constraint, not sitemap decoration.'],
                ['05','A shared architecture is a hypothesis.','The correct response to risk is a falsifiable post-launch test.'],
                ['06','Competition is positioning input.','Studying direct competitors sharpened the multi-modal, dual-audience differentiation.'],
                ['07','Validated findings beat polished screens.','Status visibility and score hierarchy are stronger evidence of design thinking than a single hero mockup.']
              ].map(([n,h,b]) => <article key={n}><b>{n}</b><h3>{h}</h3><p>{b}</p></article>)}
            </Stagger>
          </Section>

          <Section n="19" title="What's next" tone="pink" className="quiet-section">
            <Reveal><ul className="cv4-next-list"><li>Run the proposed usability protocol with a tracked participant count and formal task metrics.</li><li>Resolve accessibility gaps before launch.</li><li>Confirm and design the real AI Feedback / score screen.</li><li>Define and test a low-confidence AI state.</li><li>Execute segment-comparison measurement after launch.</li><li>Extend onboarding personalisation into ongoing content recommendation.</li></ul></Reveal>
          </Section>

          <Section n="20" title="My role & contribution" tone="blue" className="quiet-section">
            <Reveal><div className="cv4-role-grid">
              <div><label>RESPONSIBILITIES</label><strong>End-to-end product design ownership: research framing, IA, interaction, visual design and usability validation.</strong></div>
              <div><label>DECISIONS</label><strong>Shared architecture, shared assessment grammar, feedback hierarchy, control trade-off and design-token system.</strong></div>
              <div><label>DELIVERABLES</label><strong>Figma screen set across onboarding, four skills and dashboard; component/token specification; decision log; heuristic evaluation.</strong></div>
              <div><label>COLLABORATION</label><strong>Solo product-design ownership across the preserved design material; implementation and research-team participation are not claimed where the record is incomplete.</strong></div>
              <div className="honest"><label>WHAT I DID NOT DO</label><strong>I did not build, ship or launch the product, and I did not run a statistically powered usability study.</strong></div>
            </div></Reveal>
          </Section>
        </div>
      </div>

      <footer className="cv4-footer">
        <div className="cv4-footer-inner">
          <span>COMSKI · CASE STUDY 02 / 04</span>
          <h2>Designing systems<br/>people can <em>trust.</em></h2>
          <p>Product design · AI UX · Communication learning</p>
          <a className="cv4-cta" href="mailto:hello@surya.design">Get in touch →</a>
          <div className="cv4-footer-nav"><a href="/surya-portfolio/">← Portfolio</a><a href="/surya-portfolio/work/genesis-v8/">Next project →</a></div>
        </div>
      </footer>
    </main>
  );
}

export default ComskiCaseStudyCV4;
