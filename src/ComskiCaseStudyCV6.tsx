import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import BlackGlassReveal from '@crazygl/hero-black-glass-reveal';
import CV6ParticleBackdrop from './CV6ParticleBackdrop';
import './cv6-liquid-glass-hero.css';
import './cv6-project-snapshot.css';
import './cv6-reference-intro.css';
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
        {title && <div className="cv4-section-kicker">{title}</div>}
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
    let disposed = false;
    let pointerX = 0, pointerY = 0, targetPointerX = 0, targetPointerY = 0;
    let lastFrame = 0;
    let elapsed = 0;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas, alpha: true, antialias: true, powerPreference: 'high-performance',
        premultipliedAlpha: true,
      });
    } catch { return; }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
    camera.position.set(0, 0, 12);

    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const particleCount = mobile ? 1500 : 3600;
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);
    const depths = new Float32Array(particleCount);
    const angles = new Float32Array(particleCount);
    const radii = new Float32Array(particleCount);
    const lanes = new Float32Array(particleCount);

    // A deliberate radial fan, biased to the right so the copy remains legible.
    // The seeded geometry stays ordered; only gentle waves and cursor forces move it.
    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3;
      const angle = (Math.random() * Math.PI * 1.92) - Math.PI * 0.96;
      const radius = 0.65 + Math.pow(Math.random(), 0.72) * (mobile ? 5.1 : 7.4);
      const lane = Math.round((Math.random() - 0.5) * 22) / 22;
      angles[i] = angle;
      radii[i] = radius;
      lanes[i] = lane;
      positions[i3] = 2.35 + Math.cos(angle) * radius;
      positions[i3 + 1] = Math.sin(angle) * radius * 0.84;
      positions[i3 + 2] = (Math.random() - 0.5) * 2.5;
      sizes[i] = 0.65 + Math.pow(Math.random(), 1.8) * 2.15;
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.35 + Math.random() * 0.45;
      depths[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
    geometry.setAttribute('aDepth', new THREE.BufferAttribute(depths, 1));
    geometry.setAttribute('aAngle', new THREE.BufferAttribute(angles, 1));
    geometry.setAttribute('aRadius', new THREE.BufferAttribute(radii, 1));
    geometry.setAttribute('aLane', new THREE.BufferAttribute(lanes, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms: {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 1.5) },
        uColor: { value: new THREE.Color('#3B5BDB') },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aPhase;
        attribute float aSpeed;
        attribute float aDepth;
        attribute float aAngle;
        attribute float aRadius;
        attribute float aLane;
        uniform float uTime;
        uniform vec2 uPointer;
        uniform float uPixelRatio;
        varying float vAlpha;
        varying float vAngle;
        varying float vDepth;

        void main() {
          float t = uTime;
          float angle = aAngle + sin(t * 0.16 + aPhase) * 0.018;
          float radius = aRadius + sin(t * 0.42 + aPhase + aLane) * 0.045;
          vec3 p = position;
          p.x = 2.35 + cos(angle) * radius;
          p.y = sin(angle) * radius * 0.84;
          // Traveling waves create a smooth, shared flow while preserving the radial lanes.
          float wave = sin(radius * 1.25 - t * 0.72 + aPhase * 0.18);
          p.x += sin(angle + 0.5) * wave * 0.12;
          p.y += cos(angle) * wave * 0.12;
          p.x += sin(t * 0.24 + aPhase) * (0.025 + aDepth * 0.035);
          p.y += cos(t * 0.21 + aPhase * 0.8) * (0.025 + aDepth * 0.035);

          vec2 pointerTarget = uPointer * vec2(5.4, 3.8);
          vec2 delta = p.xy - (vec2(2.35, 0.0) + pointerTarget);
          float distanceToPointer = length(delta);
          float influence = exp(-distanceToPointer * 0.72);
          vec2 direction = delta / max(distanceToPointer, 0.001);
          p.xy += direction * influence * 0.16;
          p.xy += vec2(-direction.y, direction.x) * influence * sin(t * 0.8 + aPhase) * 0.045;

          vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = aSize * uPixelRatio * (23.0 / max(1.0, -mvPosition.z));
          vAlpha = (0.18 + 0.5 * aDepth) * (0.78 + 0.22 * (0.5 + 0.5 * sin(t * 0.55 + aPhase)));
          vAngle = angle;
          vDepth = aDepth;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;
        varying float vAngle;
        varying float vDepth;
        void main() {
          vec2 p = gl_PointCoord - vec2(0.5);
          float c = cos(vAngle);
          float s = sin(vAngle);
          vec2 rotated = vec2(c * p.x + s * p.y, -s * p.x + c * p.y);
          float dash = length(vec2(rotated.x * 0.64, rotated.y * 2.5));
          if (dash > 0.5) discard;
          float halo = exp(-dash * 8.0) * 0.28;
          float core = 1.0 - smoothstep(0.03, 0.34, dash);
          float edge = 1.0 - smoothstep(0.22, 0.5, dash);
          float alpha = (edge * 0.48 + core * 0.48 + halo) * vAlpha;
          vec3 blueLight = mix(uColor, vec3(0.56, 0.62, 1.0), smoothstep(0.18, 0.5, dash) * 0.24);
          gl_FragColor = vec4(blueLight, alpha);
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
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 600 ? 14.5 : 12;
      camera.updateProjectionMatrix();
      material.uniforms.uPixelRatio.value = pixelRatio;
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      targetPointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetPointerY = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onPointerLeave = () => { targetPointerX = 0; targetPointerY = 0; };

    const draw = (now: number) => {
      if (disposed || !renderer) return;
      const delta = lastFrame ? Math.min((now - lastFrame) / 1000, 0.033) : 0.016;
      lastFrame = now;
      elapsed += delta;
      // Frame-rate-independent easing avoids pointer jitter on fast or slow displays.
      const smoothing = 1 - Math.exp(-delta * 4.2);
      pointerX += (targetPointerX - pointerX) * smoothing;
      pointerY += (targetPointerY - pointerY) * smoothing;
      material.uniforms.uTime.value = elapsed;
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
      <header className="cv4-hero cv6-ag-hero cv6-comski-device-hero cv6-liquid-hero" onPointerMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty("--hero-pointer-x", `${((event.clientX - rect.left) / rect.width - 0.5).toFixed(3)}`); event.currentTarget.style.setProperty("--hero-pointer-y", `${((event.clientY - rect.top) / rect.height - 0.5).toFixed(3)}`); }} onPointerLeave={(event) => { event.currentTarget.style.setProperty("--hero-pointer-x", "0"); event.currentTarget.style.setProperty("--hero-pointer-y", "0"); }}>
        <a className="cv6-back-home" href="/surya-portfolio/" aria-label="Back to portfolio home"><span aria-hidden="true">←</span><span>Back to home</span></a>
        <CV6ParticleBackdrop />
        <div className="cv6-liquid-atmosphere" aria-hidden="true">
          <div className="cv6-liquid-ring cv6-liquid-ring-a" />
          <div className="cv6-liquid-ring cv6-liquid-ring-b" />
          <div className="cv6-liquid-pedestal"><span /><i /></div>
          <div className="cv6-liquid-sphere cv6-sphere-a" />
          <div className="cv6-liquid-sphere cv6-sphere-b" />
          <div className="cv6-liquid-sphere cv6-sphere-c" />
          <div className="cv6-liquid-sphere cv6-sphere-d" />
          <div className="cv6-liquid-sphere cv6-sphere-e" />
        </div>
        <div className="cv6-liquid-copy">
          <div className="cv6-liquid-eyebrow"><span className="cv6-wave-icon" aria-hidden="true">⌁</span><span>AI Communication Platform</span><i /></div>
          <h1>ComSki</h1>
          <p className="cv6-liquid-tagline">Practice. Get feedback. Communicate better.</p>
          <p className="cv6-liquid-description">An AI-powered platform to improve communication through<br className="cv6-desktop-break" /> personalized practice, real-time feedback and measurable growth.</p>
          <div className="cv6-liquid-chips">
            <span><i>✳</i>AI Feedback</span><span><i>▥</i>Personalized Practice</span><span><i>♙</i>Measurable Growth</span>
          </div>
        </div>
        <div className="cv6-liquid-feature cv6-feature-left-top"><span className="cv6-feature-icon">⌁</span><span>Speak<br/>with confidence</span></div>
        <div className="cv6-liquid-feature cv6-feature-left-bottom"><span className="cv6-feature-icon">▣</span><span>Practice<br/>real scenarios</span></div>
        <div className="cv6-liquid-feature cv6-feature-right-top"><span className="cv6-feature-icon">▥</span><span>Track<br/>your progress</span></div>
        <div className="cv6-liquid-feature cv6-feature-right-bottom"><span className="cv6-feature-icon">♧</span><span>Grow<br/>in every conversation</span></div>
        <div className="cv6-original-black-glass-stage" aria-hidden="true">
          <BlackGlassReveal
            contentType="custom"
            content={<span aria-hidden="true" />}
            screenshot="/surya-portfolio/comski/My%20Journey.svg"
            screenshotScale={1.02}
            screenshotTilt={-4}
            screenEmissive={1.15}
            frameColor="#3B5BDB"
            frameMetalness={0.78}
            frameRoughness={0.2}
            sweepPeriod={7}
            sweepIntensity={0}
            sweepColor="#7890FF"
            revealFloor={0.08}
            parallaxStrength={0.42}
            floorReflection={0.08}
            transparentBackground={true}
          />
        </div>
        <div className="cv6-ag-hero-inner cv6-comski-device-hero-inner" aria-hidden="true" />
      </header>

      {/* Compact project metadata panel, matching the supplied reference layout. */}
      <section className="cv6-project-snapshot" aria-label="ComSki project details">
        <div className="cv6-snapshot-item">
          <span>Role</span>
          <p>Product Designer</p>
        </div>
        <div className="cv6-snapshot-item">
          <span>Team</span>
          <p>Solo product-design ownership</p>
        </div>
        <div className="cv6-snapshot-item">
          <span>Timeline</span>
          <p>4 months</p>
        </div>
        <div className="cv6-snapshot-item">
          <span>Tools</span>
          <p>Claude<br />Figma<br />Figma MCP<br />ElevenLabs<br />Gemini</p>
        </div>
      </section>

      <section className="cv6-reference-intro" aria-label="Reference case study introduction">
        <div className="cv6-reference-intro-inner">
          <div className="cv6-reference-copy">
            <h2>What if AI could help people become better communicators?</h2>
            <p>ComSki was created to explore the potential of AI to support everyday communication.</p>
            <p>Our team became fascinated by a specific question: <em>What if AI could help people understand how they listen, write, read, and express themselves?</em></p>
            <p>This led us to bring listening, writing, and reading into one personalized communication experience, supported by onboarding designed to make the journey feel clear and approachable.</p>
            <p><strong>My contribution:</strong> Led product design. Designed all onboarding screens and the core listening, writing, and reading experiences.</p>
          </div>
          <div className="cv6-reference-visual">
            <img className="cv6-reference-image" alt="Surya, product designer" src="/surya-portfolio/comski-communication-challenge%20(1).webp" />
          </div>
        </div>
      </section>

      <section className="cv6-problem-section" id="s01" aria-labelledby="cv6-problem-title">
        <div className="cv6-problem-inner">
          <div className="cv6-problem-copy">
            <h2 id="cv6-problem-title">The problem</h2>
            <p>People use different tools to improve how they communicate. They practise speaking to build confidence, use writing assistants to find the right words, and rely on reading tools to understand information. But these experiences are often disconnected, leaving people without one place to understand and improve how they listen, write, read, and express themselves.</p>
            <p><strong>The result?</strong> People struggle to communicate with confidence in everyday conversations, often without understanding where they need support or how to improve.</p>
            <p><strong>Our core insight:</strong> Better communication starts with understanding yourself. By bringing listening, writing, and reading into one personalized AI-powered experience, ComSki helps people recognize their communication patterns and build confidence one interaction at a time.</p>
          </div>
          <div className="cv6-problem-cards" aria-label="The human side of communication statistics">
            <article className="cv6-problem-card cv6-stat-speaking" tabIndex={0} aria-label="Speaking: 68 percent find it hard to express their thoughts clearly."><div className="cv6-stat-copy"><p className="cv6-stat-title">Speaking</p><p className="cv6-stat-metric">68<span>%</span></p><p className="cv6-stat-caption">find it hard to express their thoughts clearly.</p></div></article>
            <article className="cv6-problem-card cv6-stat-writing" tabIndex={0} aria-label="Writing: 54 percent struggle to structure their ideas in writing."><div className="cv6-stat-copy"><p className="cv6-stat-title">Writing</p><p className="cv6-stat-metric">54<span>%</span></p><p className="cv6-stat-caption">struggle to structure their ideas in writing.</p></div></article>
            <article className="cv6-problem-card cv6-stat-listening" tabIndex={0} aria-label="Listening: 62 percent miss key points during conversations."><div className="cv6-stat-copy"><p className="cv6-stat-title">Listening</p><p className="cv6-stat-metric">62<span>%</span></p><p className="cv6-stat-caption">miss key points during conversations.</p></div></article>
            <article className="cv6-problem-card cv6-stat-reading" tabIndex={0} aria-label="Reading: 47 percent find it difficult to stay consistent while reading."><div className="cv6-stat-copy"><p className="cv6-stat-title">Reading</p><p className="cv6-stat-metric">47<span>%</span></p><p className="cv6-stat-caption">find it difficult to stay consistent while reading.</p></div></article>
          </div>
          <p className="cv6-stat-footnote">*Source links below</p>
        </div>
      </section>

      <section className="cv6-research-section" id="s-research" aria-labelledby="cv6-research-title">
        <div className="cv6-research-shell">
          <header className="cv6-research-header">
            <div className="cv6-research-eyebrow"><span>01</span><i aria-hidden="true" /><span>RESEARCH</span></div>
            <h2 id="cv6-research-title">Understanding people<br /><em>and the opportunity</em></h2>
            <p>We conducted user research to understand real communication challenges and analyzed the market to identify opportunities for an AI-powered solution like ComSki.</p>
          </header>

          <div className="cv6-research-panels">
            <article className="cv6-research-panel cv6-user-research">
              <div className="cv6-research-panel-hero">
                <img src="/surya-portfolio/comski/speaking-background.jpg" alt="A person sharing ideas in a group discussion" loading="lazy" />
                <div className="cv6-research-panel-intro">
                  <h3>User Research</h3>
                  <p className="cv6-research-subtitle">Listening to real people, real struggles</p>
                  <p>We spoke with students, working professionals, and educators to understand how they communicate in real life, where they struggle, and what kind of support they need.</p>
                </div>
              </div>
              <div className="cv6-research-metrics" aria-label="User research metrics">
                <div><strong>25+</strong><span>User interviews</span></div>
                <div><strong>3</strong><span>Key user groups</span></div>
                <div><strong>50+</strong><span>Pain points identified</span></div>
                <div><strong>8</strong><span>Usability tests</span></div>
              </div>
              <div className="cv6-personas-heading"><h4>Key User Personas</h4><span>Illustrative profiles</span></div>
              <div className="cv6-persona-grid">
                <article className="cv6-persona-card">
                  <img src="/surya-portfolio/comski/speaking-background.jpg" alt="" loading="lazy" />
                  <div className="cv6-persona-copy"><h5>Students</h5><span className="cv6-persona-age">18–24 years</span><p>“I get nervous while speaking in front of others.”</p><div className="cv6-persona-tags"><span>Presentations</span><span>Confidence</span></div></div>
                </article>
                <article className="cv6-persona-card">
                  <img src="/surya-portfolio/comski/writing-background.jpg" alt="" loading="lazy" />
                  <div className="cv6-persona-copy"><h5>Working Professionals</h5><span className="cv6-persona-age">24–35 years</span><p>“I find it hard to structure my thoughts in meetings.”</p><div className="cv6-persona-tags"><span>Clear communication</span><span>Writing emails</span></div></div>
                </article>
                <article className="cv6-persona-card">
                  <img src="/surya-portfolio/comski/reading-background.jpg" alt="" loading="lazy" />
                  <div className="cv6-persona-copy"><h5>Educators</h5><span className="cv6-persona-age">28–50 years</span><p>“My students struggle to express their ideas clearly.”</p><div className="cv6-persona-tags"><span>Student engagement</span><span>Feedback tools</span></div></div>
                </article>
              </div>
              <p className="cv6-research-integrity">Draft research metrics, age ranges, and persona quotes are illustrative until verified against original research notes.</p>
            </article>

            <article className="cv6-research-panel cv6-market-research">
              <div className="cv6-research-panel-hero">
                <img src="/surya-portfolio/comski/listening-background.jpg" alt="Research and analytics workspace" loading="lazy" />
                <div className="cv6-research-panel-intro">
                  <h3>Market Research</h3>
                  <p className="cv6-research-subtitle">Validating the opportunity</p>
                  <p>We analyzed existing solutions, market trends, and emerging opportunities to understand the competitive landscape and validate the need for ComSki.</p>
                </div>
              </div>
              <div className="cv6-research-metrics" aria-label="Market research draft metrics">
                <div><strong>$28B</strong><span>Global edtech market (2024)</span></div>
                <div><strong>12%</strong><span>Annual growth rate (CAGR)</span></div>
                <div><strong>Low</strong><span>Focus on holistic communication</span></div>
                <div><strong>High</strong><span>Opportunity for AI-powered feedback</span></div>
              </div>
              <div className="cv6-market-lower">
                <div className="cv6-landscape">
                  <h4>Competitive Landscape <span>Conceptual positioning</span></h4>
                  <svg className="cv6-landscape-chart" viewBox="0 0 360 250" role="img" aria-label="Conceptual competitor map comparing comprehensive communication skills vertically and AI-powered personalization horizontally">
                    <defs><marker id="cv6-research-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#8392B5" /></marker></defs>
                    <path d="M72 18 V205 H340" fill="none" stroke="#8392B5" strokeWidth="1.2" markerEnd="url(#cv6-research-arrow)" />
                    <path d="M72 18 H68" stroke="#8392B5" />
                    <text x="8" y="28" className="axis-end">High</text><text x="8" y="205" className="axis-end">Low</text>
                    <text x="72" y="225" className="axis-end">Low</text><text x="325" y="225" className="axis-end">High</text>
                    <text x="188" y="246" textAnchor="middle" className="axis-label">AI-Powered Personalization</text>
                    <text x="15" y="104" className="axis-label" transform="rotate(-90 15 104)" textAnchor="middle">Comprehensive Communication Skills</text>
                    <g className="cv6-competitor competitor-elsa"><circle cx="139" cy="83" r="12" /><text x="139" y="87" textAnchor="middle">✦</text><text x="139" y="104" className="competitor-label" textAnchor="middle">ELSA Speak</text></g>
                    <g className="cv6-competitor competitor-grammarly"><circle cx="195" cy="134" r="11" /><text x="195" y="138" textAnchor="middle">G</text><text x="195" y="154" className="competitor-label" textAnchor="middle">Grammarly</text></g>
                    <g className="cv6-competitor competitor-duolingo"><circle cx="108" cy="168" r="11" /><text x="108" y="172" textAnchor="middle">●</text><text x="108" y="188" className="competitor-label" textAnchor="middle">Duolingo</text></g>
                    <g className="cv6-competitor competitor-speechify"><circle cx="265" cy="164" r="11" /><text x="265" y="168" textAnchor="middle">↗</text><text x="265" y="184" className="competitor-label" textAnchor="middle">Speechify</text></g>
                    <g className="cv6-competitor competitor-comski"><circle cx="290" cy="64" r="25" /><circle cx="290" cy="64" r="37" className="comski-ring" /><text x="290" y="69" textAnchor="middle">⌕</text><text x="290" y="105" className="competitor-label" textAnchor="middle">ComSki</text></g>
                  </svg>
                  <p className="cv6-chart-note">Positions are illustrative, not measured competitor scores.</p>
                </div>
                <div className="cv6-research-insights">
                  <h4>Key Insights</h4>
                  <ol>
                    <li><span>1</span><p>Most tools focus on one skill, such as speaking or writing.</p></li>
                    <li><span>2</span><p>Limited real-time, personalized feedback across all four skills.</p></li>
                    <li><span>3</span><p>Growing demand for AI-powered communication tools in education and corporate training.</p></li>
                    <li><span>4</span><p>Opportunity to create a unified platform for speaking, listening, writing, and reading.</p></li>
                  </ol>
                </div>
              </div>
              <p className="cv6-research-integrity">Market figures require source verification before publication. Competitor positions are qualitative, not validated rankings.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="cv6-philosophy-section" id="s-philosophy" aria-labelledby="cv6-philosophy-title">
        <div className="cv6-philosophy-inner">
          <p className="cv6-philosophy-eyebrow"><span>02</span><span>DESIGN PHILOSOPHY</span></p>
          <h2 id="cv6-philosophy-title">Design philosophy</h2>
          <div className="cv6-philosophy-copy">
            <p>We wanted ComSki to feel like a supportive communication coach—not a tool that judges every mistake. A place where people can practise, reflect, and improve without the pressure of getting everything right the first time.</p>
            <p>The experience brings speaking, writing, listening, and reading into one coherent journey. Each skill has its own needs, but the interaction should remain familiar, approachable, and easy to follow.</p>
            <p>This shaped our core principle: <strong>make practice approachable, feedback actionable, and progress clear.</strong></p>
          </div>
          <div className="cv6-philosophy-steps cv6-philosophy-journey" aria-label="ComSki design principles">
            <article className="cv6-philosophy-step cv6-philosophy-understand">
              <div className="cv6-journey-head"><span className="cv6-journey-index">01</span><span className="cv6-philosophy-step-icon"><img src="/surya-portfolio/comski/philosophy-icons/understand-ear.svg" alt="" /></span></div>
              <h3>Understand</h3>
              <p>Start with the learner—their needs, goals, and context.</p>
              <div className="cv6-journey-footer"><span className="cv6-journey-dot" />Learner first</div>
            </article>
            <article className="cv6-philosophy-step cv6-philosophy-connect">
              <div className="cv6-journey-head"><span className="cv6-journey-index">02</span><span className="cv6-philosophy-step-icon"><img src="/surya-portfolio/comski/philosophy-icons/connect-nodes.svg" alt="" /></span></div>
              <h3>Connect</h3>
              <p>Bring speaking, writing, listening, and reading into one journey.</p>
              <div className="cv6-journey-footer"><span className="cv6-journey-dot" />Four skills, one flow</div>
            </article>
            <article className="cv6-philosophy-step cv6-philosophy-identify">
              <div className="cv6-journey-head"><span className="cv6-journey-index">03</span><span className="cv6-philosophy-step-icon"><img src="/surya-portfolio/comski/philosophy-icons/identify-target.svg" alt="" /></span></div>
              <h3>Identify</h3>
              <p>Make strengths and growth areas easier to recognise.</p>
              <div className="cv6-journey-footer"><span className="cv6-journey-dot" />Clear insight</div>
            </article>
            <article className="cv6-philosophy-step cv6-philosophy-guide">
              <div className="cv6-journey-head"><span className="cv6-journey-index">04</span><span className="cv6-philosophy-step-icon"><img src="/surya-portfolio/comski/philosophy-icons/guide-feedback.svg" alt="" /></span></div>
              <h3>Guide</h3>
              <p>Turn observations into kind, specific, actionable feedback.</p>
              <div className="cv6-journey-footer"><span className="cv6-journey-dot" />Support, not judgement</div>
            </article>
            <article className="cv6-philosophy-step cv6-philosophy-improve">
              <div className="cv6-journey-head"><span className="cv6-journey-index">05</span><span className="cv6-philosophy-step-icon"><img src="/surya-portfolio/comski/philosophy-icons/improve-arrow.svg" alt="" /></span></div>
              <h3>Improve</h3>
              <p>Make the next practice step clear and achievable.</p>
              <div className="cv6-journey-footer"><span className="cv6-journey-dot" />Progress over perfection</div>
            </article>
          </div>
      
          <div className="cv6-philosophy-application">
            <h2>Turning principles into product decisions.</h2>
            <p className="cv6-philosophy-application-intro">These decisions show how ComSki’s learner-first principles shaped the actual experience.</p>
            <div className="cv6-challenge-cards" aria-label="Four ComSki design challenges">
            <article className="cv6-challenge-card">
              <div className="cv6-challenge-copy">
                <p className="cv6-challenge-label">CHALLENGE 01</p>
                <h3>Personalisation without friction.</h3>
                <p>Understand each learner’s goals and context without turning onboarding into a long setup form.</p>
              </div>
              <div className="cv6-challenge-art cv6-challenge-art-onboarding">
                <img src={BASE + 'comski-personalisation-card.webp'} alt="ComSki personalised onboarding screen showing learner goals on a phone" loading="lazy" />
              </div>
              <span className="cv6-challenge-plus" aria-hidden="true">+</span>
            </article>
            <article className="cv6-challenge-card">
              <div className="cv6-challenge-copy">
                <p className="cv6-challenge-label">CHALLENGE 02</p>
                <h3>Four skills. One coherent journey.</h3>
                <p>Speaking, writing, listening and reading needed distinct tasks without feeling like separate products.</p>
              </div>
              <div className="cv6-challenge-art cv6-challenge-art-journey">
                <img src={BASE + '2nd%20card.png'} alt="ComSki second challenge card visual showing the unified learning journey" loading="lazy" />
              </div>
              <span className="cv6-challenge-plus" aria-hidden="true">+</span>
            </article>
            <article className="cv6-challenge-card">
              <div className="cv6-challenge-copy">
                <p className="cv6-challenge-label">CHALLENGE 03</p>
                <h3>AI feedback that earns trust.</h3>
                <p>Feedback had to feel understandable and useful—not like a score that judges every mistake.</p>
              </div>
              <div className="cv6-challenge-art cv6-challenge-art-feedback">
                <img src="https://raw.githubusercontent.com/Surya8074/surya-portfolio/main/public/comski/3rd%20card%20c.png" alt="ComSki learner receiving supportive AI communication feedback" loading="lazy" />
              </div>
              <span className="cv6-challenge-plus" aria-hidden="true">+</span>
            </article>
            <article className="cv6-challenge-card">
              <div className="cv6-challenge-copy">
                <p className="cv6-challenge-label">CHALLENGE 04</p>
                <h3>Practice without pressure.</h3>
                <p>Make the experience supportive enough for learners to try, reflect, and try again with confidence.</p>
              </div>
              <div className="cv6-challenge-art cv6-challenge-art-reading">
                <img src="https://raw.githubusercontent.com/Surya8074/surya-portfolio/main/public/comski/4th%20card.png" alt="ComSki learner practising communication with supportive AI guidance" loading="lazy" />
              </div>
              <span className="cv6-challenge-plus" aria-hidden="true">+</span>
            </article>
            </div>
          </div>
        </div>
      </section>

          <Section n="13" title="" tone="blue" className="cv6-design-system-section">
            <div className="cv6-ios-system">
              <div className="cv6-ios-system-intro">
                <h2>A calm, consistent system. <em>Built for everyday progress.</em></h2>
                <p className="cv6-ios-system-lede">A light, tactile interface gives four communication skills one recognisable home. Clear hierarchy does the heavy lifting; colour, depth and motion are used only when they help learners understand what to do next.</p>
              </div>

              <div className="cv6-ios-system-board">
                <article className="cv6-ios-system-panel cv6-ios-palette-panel">
                  <div className="cv6-ios-panel-head"><div><span className="cv6-ios-overline">01 / COLOUR</span><h3>Meaning before decoration.</h3></div><span className="cv6-ios-panel-icon">◒</span></div>
                  <p className="cv6-ios-panel-copy">A restrained base keeps the experience quiet. Blue signals action, while skill accents distinguish content without changing the interaction grammar.</p>
                  <div className="cv6-ios-swatches">
                    <div className="cv6-ios-swatch swatch-primary"><span>Action blue</span><b>#3B5BDB</b></div>
                    <div className="cv6-ios-swatch swatch-ink"><span>Ink</span><b>#1A1D29</b></div>
                    <div className="cv6-ios-swatch swatch-paper"><span>Warm white</span><b>#FFFEFB</b></div>
                    <div className="cv6-ios-swatch swatch-listening"><span>Listening</span><b>#B9DDFF</b></div>
                    <div className="cv6-ios-swatch swatch-writing"><span>Writing</span><b>#E9A6C8</b></div>
                    <div className="cv6-ios-swatch swatch-speaking"><span>Speaking</span><b>#17264A</b></div>
                  </div>
                </article>

                <article className="cv6-ios-system-panel cv6-ios-type-panel">
                  <div className="cv6-ios-panel-head"><div><span className="cv6-ios-overline">02 / TYPOGRAPHY</span><h3>Readable at a glance.</h3></div><span className="cv6-ios-panel-icon">Aa</span></div>
                  <div className="cv6-ios-type-specimen">
                    <span>DISPLAY / 48–64</span>
                    <strong>Make progress<br/><em>feel possible.</em></strong>
                    <div className="cv6-ios-type-meta"><span>Semibold · Tight leading</span><span>−4% tracking</span></div>
                  </div>
                  <div className="cv6-ios-type-rows">
                    <div><span>Heading / 28–36</span><b>One skill at a time</b></div>
                    <div><span>Body / 16–18</span><p>Small, clear steps keep attention on the practice.</p></div>
                    <div><span>Label / 11–13</span><small>ASSESSMENT · STEP 02 OF 04</small></div>
                  </div>
                </article>

                <article className="cv6-ios-system-panel cv6-ios-components-panel">
                  <div className="cv6-ios-panel-head"><div><span className="cv6-ios-overline">03 / COMPONENTS</span><h3>Familiar patterns, every time.</h3></div><span className="cv6-ios-panel-icon">⌘</span></div>
                  <p className="cv6-ios-panel-copy">Controls keep the same shape and feedback across reading, listening, writing and speaking.</p>
                  <div className="cv6-ios-component-preview">
                    <div className="cv6-ios-preview-top"><span>YOUR PRACTICE</span><span>02 <i>/ 04</i></span></div>
                    <div className="cv6-ios-progress"><span/></div>
                    <div className="cv6-ios-preview-question"><span className="cv6-ios-skill-icon">✳</span><div><b>Keep going, at your pace.</b><small>Your next step is ready when you are.</small></div></div>
                    <div className="cv6-ios-preview-actions"><span>Save for later</span><b>Continue <i>↗</i></b></div>
                  </div>
                  <div className="cv6-ios-chip-row"><span>Progress</span><span>Feedback</span><span>Recovery state</span></div>
                </article>

                <article className="cv6-ios-system-panel cv6-ios-layout-panel">
                  <div className="cv6-ios-panel-head"><div><span className="cv6-ios-overline">04 / SPACING & LAYOUT</span><h3>Room to think.</h3></div><span className="cv6-ios-panel-icon">↔</span></div>
                  <p className="cv6-ios-panel-copy">A predictable spacing rhythm and responsive grid give content room without wasting the learner’s attention.</p>
                  <div className="cv6-ios-layout-demo">
                    <div className="cv6-ios-layout-bar"><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/></div>
                    <div className="cv6-ios-layout-content"><div/><div/><div/><div/></div>
                    <div className="cv6-ios-spacing-scale"><div><i style={{width:'4px'}}/><span>4</span></div><div><i style={{width:'8px'}}/><span>8</span></div><div><i style={{width:'12px'}}/><span>12</span></div><div><i style={{width:'16px'}}/><span>16</span></div><div><i style={{width:'24px'}}/><span>24</span></div><div><i style={{width:'32px'}}/><span>32</span></div><div><i style={{width:'48px'}}/><span>48</span></div></div>
                  </div>
                  <div className="cv6-ios-breakpoints"><span>Mobile <b>4 columns</b></span><span>Desktop <b>12 columns</b></span></div>
                </article>
              </div>

              <div className="cv6-ios-system-footer">
                <div><span className="cv6-ios-overline">THE SYSTEM RULE</span><h3>One familiar interface.<br/><em>Four distinct ways to practise.</em></h3></div>
                <p>Shared navigation, progress, spacing and feedback patterns lower the learning cost. Skill-specific content and input controls can change without making ComSki feel like four separate products.</p>
                <div className="cv6-ios-principle-tags"><span>Consistency</span><span>Progressive disclosure</span><span>Accessible states</span><span>Reduced motion</span></div>
              </div>
            </div>
          </Section>

          <Section n="" title="" tone="pink" className="cv6-information-architecture">
            <div className="cv6-ia-editorial-grid">
            <Reveal className="cv6-ia-intro">
              <h2>System architecture</h2>
              <p className="cv4-lede">ComSki connects learner context, communication practice, AI-supported feedback and progress in one experience. Four distinct skill areas share a familiar structure, while each task adapts to the way learners communicate.</p>
         
            </Reveal>
            </div>

            <div className="cv6-ia-architecture-hero cv6-ia-architecture-reference" aria-label="ComSki system architecture diagram">
              <div className="cv6-ia-reference-inputs">
                <article className="cv6-ia-reference-node input-blue"><span className="cv6-ia-reference-icon">♙</span><div><b>Learner profile</b><small>Goals, proficiency level,<br/>interests</small></div></article>
                <article className="cv6-ia-reference-node input-pink"><span className="cv6-ia-reference-icon">▤</span><div><b>Learning context</b><small>School / exam / personal<br/>growth</small></div></article>
                <article className="cv6-ia-reference-node input-orange"><span className="cv6-ia-reference-icon">▥</span><div><b>Practice history</b><small>Past performance<br/>and behaviour</small></div></article>
              </div>
              <span className="cv6-ia-reference-arrow" aria-hidden="true">→</span>
              <div className="cv6-ia-reference-core">
                <div className="cv6-ia-reference-brand"><span>✦</span><strong>ComSki</strong></div>
                <p className="cv6-ia-reference-subtitle">AI-powered communication practice</p>
                <div className="cv6-ia-reference-skills">
                  <article className="skill-speaking"><span>🎙</span><b>Speaking</b><small>Real-time conversation<br/>practice</small></article>
                  <article className="skill-writing"><span>✎</span><b>Writing</b><small>Structured writing tasks<br/>and feedback</small></article>
                  <article className="skill-listening"><span>♬</span><b>Listening</b><small>Audio comprehension<br/>and response</small></article>
                  <article className="skill-reading"><span>▱</span><b>Reading</b><small>Reading comprehension<br/>and analysis</small></article>
                </div>
                <div className="cv6-ia-reference-engine"><b>✦ &nbsp; AI Analysis Engine</b><small>Analyses responses, identifies strengths and areas to improve</small></div>
              </div>
              <div className="cv6-ia-reference-analysis">
                <article className="analysis-pattern"><span>⌁</span><b>Pattern<br/>detection</b></article>
                <article className="analysis-performance"><span>☷</span><b>Performance<br/>assessment</b></article>
                <article className="analysis-correlation"><span>⌘</span><b>Skill<br/>correlation</b></article>
              </div>
              <span className="cv6-ia-reference-arrow" aria-hidden="true">→</span>
              <div className="cv6-ia-reference-outputs">
                <article className="output-green"><span>▥</span><div><b>Personalised insights</b><small>Clear and understandable<br/>feedback</small></div></article>
                <article className="output-blue"><span>◎</span><div><b>Actionable guidance</b><small>What to improve<br/>next</small></div></article>
                <article className="output-purple"><span>☆</span><div><b>Progress tracking</b><small>Track growth across<br/>all skills</small></div></article>
              </div>
            </div>
            <div className="cv6-ia-reference-steps">
              <article><span>01</span><div><b>Input</b><small>Learner data &amp; context</small></div></article><i aria-hidden="true">⟶</i>
              <article><span>02</span><div><b>Practice</b><small>Four communication skills<br/>with a consistent experience</small></div></article><i aria-hidden="true">⟶</i>
              <article><span>03</span><div><b>Analysis</b><small>AI-powered feedback<br/>and skill insights</small></div></article><i aria-hidden="true">⟶</i>
              <article><span>04</span><div><b>Output</b><small>Personalised guidance<br/>and measurable progress</small></div></article>
            </div>
            <p className="cv6-ia-arch-note">Conceptual system map of ComSki’s learner inputs, four practice modes, AI analysis and feedback outcomes.</p>

            <div className="cv6-ia-block cv6-ia-primary">
              <div className="cv6-ia-block-heading">
                <span>01 / INFORMATION ARCHITECTURE</span>
                <p>One learner experience, organised around a repeatable practice loop.</p>
              </div>
              <div className="cv6-ia-map" role="img" aria-label="ComSki information architecture: onboarding leads into four communication skills, then feedback and My Journey progression.">
                <div className="cv6-ia-root"><span>COMSKI</span><b>Communication practice</b></div>
                <div className="cv6-ia-stem" aria-hidden="true"/>
                <div className="cv6-ia-lanes">
                  <article className="cv6-ia-lane cv6-ia-onboarding">
                    <span className="cv6-ia-lane-index">01</span><div><b>Onboarding</b><small>Introduction · Personalisation · Practice preferences</small></div>
                  </article>
                  <div className="cv6-ia-connector" aria-hidden="true"><i/></div>
                  <article className="cv6-ia-lane cv6-ia-skills">
                    <span className="cv6-ia-lane-index">02</span><div className="cv6-ia-lane-main"><b>Skill practice</b><small>Four distinct tasks, one familiar interaction model</small>
                      <div className="cv6-ia-skill-nodes">
                        <span>Speaking</span><span>Writing</span><span>Listening</span><span>Reading</span>
                      </div>
                    </div>
                  </article>
                  <div className="cv6-ia-connector" aria-hidden="true"><i/></div>
                  <div className="cv6-ia-outcomes">
                    <article><span className="cv6-ia-lane-index">03</span><div><b>Feedback</b><small>Review the response</small></div></article>
                    <span className="cv6-ia-join" aria-hidden="true">→</span>
                    <article><span className="cv6-ia-lane-index">04</span><div><b>My Journey</b><small>See progress · Continue practising</small></div></article>
                  </div>
                </div>
              </div>
              <p className="cv6-ia-caption">The committed screens show onboarding, all four skill areas, a speaking-response feedback state and the My Journey dashboard. The shared feedback-to-progress relationship is presented as the organising model; confirm the exact post-task sequence for each skill before describing it as fully implemented.</p>

            </div>

            <div className="cv6-architecture-screen-story" aria-labelledby="cv6-architecture-screen-title">
              <div className="cv6-architecture-screen-intro">
                <span className="cv6-architecture-screen-eyebrow">FROM SYSTEM TO EXPERIENCE</span>
                <h3 id="cv6-architecture-screen-title">How the system shows up in the interface.</h3>
                <p>Architecture only matters when it makes the next action feel clear. Explore the original ComSki screens to see how learner context, focused practice and ongoing progress translate into product decisions.</p>
              </div>

              <div className="cv6-architecture-screen-feature">
                <div className="cv6-architecture-screen-visual">
                  <div className="cv6-architecture-screen-meta">
                    <span>{active.phase}</span>
                    <span>{String(activeScreen + 1).padStart(2, '0')} / {String(screenData.length).padStart(2, '0')}</span>
                  </div>
                  <Screen {...active} wide />
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScreen}
                    className="cv6-architecture-screen-decision"
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: reduce ? 0 : 0.28, ease }}
                  >
                    <span className="cv6-architecture-screen-index">DECISION STORY · {String(activeScreen + 1).padStart(2, '0')}</span>
                    <h4>{active.label.split(' · ')[1]}</h4>
                    <div className="cv6-architecture-decision-block">
                      <span>THE USER NEED</span>
                      <p>{active.goal}</p>
                    </div>
                    <div className="cv6-architecture-decision-block">
                      <span>THE DESIGN DECISION</span>
                      <p>{active.decision}</p>
                    </div>
                    <div className="cv6-architecture-decision-block">
                      <span>WHY IT MATTERS</span>
                      <p>{[
                        'Establishes context before commitment, so learners understand the value of the experience before investing effort.',
                        'Progressive personalisation reduces the perceived cost of setup while still giving the product useful learner context.',
                        'A realistic practice cadence helps align the experience with the learner’s routine instead of creating an aspirational but fragile plan.',
                        'A consistent assessment structure lets learners focus on the communication task rather than repeatedly learning new interface patterns.',
                        'Predictable progression lowers navigation effort and makes the next step easier to anticipate.',
                        'Familiar controls preserve continuity when the interaction shifts from reading text to interpreting audio.',
                        'Separating modality-specific work from shared navigation keeps the interface learnable as the task changes.',
                        'A stable task frame gives learners room to focus on expressing an idea rather than decoding a new workflow.',
                        'Clear action hierarchy helps learners understand what to complete before the system interprets their response.',
                        'A practice-first framing helps the recording interaction feel like rehearsal, not a judgement or final performance.',
                        'A visible transition between response and analysis helps prevent AI processing from feeling like a black box.',
                        'A persistent journey view connects individual practice moments to broader progress and a meaningful next step.'
                      ][activeScreen]}</p>
                    </div>
                    <div className="cv6-architecture-screen-tags">
                      <span>{active.phase}</span><span>Consistent interaction model</span><span>Progressive disclosure</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="cv6-architecture-screen-picker" role="tablist" aria-label="Explore ComSki screens">
                {screenData.map((screen, index) => (
                  <button
                    key={screen.src}
                    type="button"
                    role="tab"
                    aria-selected={activeScreen === index}
                    aria-controls="cv6-architecture-screen-title"
                    className={activeScreen === index ? 'is-active' : ''}
                    onClick={() => setActiveScreen(index)}
                  >
                    <span className="cv6-architecture-picker-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="cv6-architecture-picker-copy"><strong>{screen.label.split(' · ')[1]}</strong><small>{screen.phase}</small></span>
                    <span className="cv6-architecture-picker-arrow" aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>
              <p className="cv6-architecture-screen-note">Original ComSki design exports. The decision stories describe the intent visible in these screens; unverified AI-result and recovery states are not presented as shipped UI.</p>
            </div>

          </Section>

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
