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
            <h2>What if better communication started with understanding yourself?</h2>
            <p>ComSki began with an interest in how AI could help people become more intentional communicators. Rather than treating communication as a single skill, the product explores how people listen, write, read and express themselves.</p>
            <p>That led to a central design question: <em>What if technology could help people understand not only what they communicate, but how they listen, interpret information and express their thoughts?</em></p>
            <p>ComSki’s experience is organised around three core areas — listening, writing and reading — supported by onboarding and personalisation. The challenge was to make these different communication tasks feel like one coherent, approachable journey.</p>
            <p><strong>My contribution:</strong> Led product design across the core experience, designed onboarding and personalisation flows, and shaped the listening, writing and reading experiences.</p>
          </div>
          <div className="cv6-reference-visual">
            <img className="cv6-reference-image" alt="Reference project presentation artwork" src="data:image/webp;base64,UklGRsh7AABXRUJQVlA4WAoAAAAQAAAAewEARQIAQUxQSIMBAAABgBXJttzmQHgQLpQHQRDEII9BxMBmIDNwGFwID8KFIAjX2bR9nawnIiYAO5ehzT2SwuH3qRactzx70tmbnaN6ktrrcdWT2DEcY57knu2ApyXpHeNe5ZIUv+xTepK82w4WSfOwTRZJ9ChbelK9l3WXJPtl1Zh0byss+LbYZ3MS3j8ZkvL1o+Ccf1CT9PWds84BWNK+AI13E+C8c5QkfqnMGybmtTvzZmdeD+ZFyv/yv/wv/8v/8r/8L//L//K//C//y//yv/wv/8v/8r/8L//L//K//C//y//yv/wv/8v/8r/8L//L//K//C//y//yv/wv/8v/8r/8L//L//K//C///+s9mBedeX5j3suVedPAvKEwr8B514GJdw0ovDMAzjoHgMq68R2cc4EPK+fGj+CMm/GpLXxb7DM0vjWsvbFtxurSuRZlHSyYFoatFjwLw3YLlnXDnuXGsVvBzo1gS8P+dmeXGw4dg1lRcfjorPKKU9q18ymmivPacPVOoiXu19HwBQkAVlA4IB56AABwAAKdASp8AUYCPpFAmUklo6ImKTYcMMASCWlqVKY9HMm7I4Rwg02h3Uo2alkCcE80bnqz5Jukzv6B/R/8jwb/SvfY2dv5nFP734Gf2f+bf+fXd9cnjn+5/5f7pewd+uf630Kf7O234zzF/IXnbf2+dX8J/3elTwcv4XqH+UT/6fvj6qP4L/1/vR7uZiDDiNgYZkmt6Y+btMs2sWt6yW8waJT+U8QDU4dRP30Urf8lR1ZdZfpba95t9S/zDl1vPtawV1rr+4GlpDPMgj9PvmXhY/EHGZ1cpPkdV+XSwya7HMa/iUdNxO+FkxNyRIZbwnQk6tdKE9FivrdUIjuHU/G/ku9zbaI8Tv/IoqF6ugVxpDd+VBipcgQmWxlH8bbsNVcd6jYgkQbGW6pc6bqKgxrpwa+zpNcf3/fAFk3EAiiXbOaZKM9kwaeBWOyPhz2TNpF0EVdJcumZPqIpNcNMb7Q7SpEyWvKarWRcmvXAOp/TIzcd3DeA9BWotdsoLcxYZL7Epk0MQ0AKYAY/vNTZehMN1heFkrtiZWbJ+2CAC7TqXAED3m5nlpAxiPvvitXdSuR+TxRz1+NipIt8GjxRC9hrwRJg1gh4JxbhV3669q65gz7wcGLc4xddDwnz3kXBXef9E+iUOxUX08M9CwlM41hGEHx5J9wv1h7sD6EnPoWx4Vpcsa1M4uNZY/vgond+isxH2N2bO4yUXqhg2TVqrXrjX3p2x6QZLaKCokjTTPHt65jgwE1BWN5m4hIEjavf0/x9n1AbWeMacMtUoJYB/QSG6FJ3hQn3tba7JFH0PAUoBR8TLTcgPjxh5qY1i9fN5Ex4nOGHsXPYfjjciioGa3SEVBUT0a7oqPrs9qYW9t8b8i8xQW7QKubYQ98qwYMCaBluP/9mb/fE0HaAE5AXs7laHBkhXUv/aG+4b/eQzG3VW5by7z43cd45yKUmvE01TOCIx2Jr9LlCgd39a3K/xBfpj1Lb5c7PP6UgKoPOXISDmg0GrwtN5hdNRn0oiw7pzzp+wjn8oArYLa1yyExLrUFal6rP34RFpv3FhDpUs4bEFujZEw15AVM1Zy3WzWI11AwLNdJQlNLCJ1GKBTaNvS8X4FcL0gcGQlwx4/9QvJOb5s9nhJX8kHPjps8jrb6wqJy1zxw9Av604BhmOv3j3iZeWXIZ/Q1IgxS9lMFGHbNetbj0HIDO1ocdKf95L6koF33kKq7gUxFNr9fsBNLrBH+Q7HnpMv9rNC8lY0VASK2ciDVwx0hBHD01x89aorlCfyDpax0KSi14bJh82IM7rniee2uz/qxGrmIlhYEpQLmi3sllCoQWskbdNgaUjr8HMJGF/BSRP6kpinomFHWhNtdDT8o5J/kg9UgN+dr4BLd/Ul4cDc36QhWhDq9IGnhWjaB99Eo12vHEPBwAhvjSxp5pVYcmhlpuLVINJ7beW8rVu5d1AmeqzxybrcCCagqvL0DR0s+4vsKAJtYGbyo+7YCDhs9PW3Q3SonMRExW95FZ4jfr8rOI//CnCKEDQbDTQuT5XmSGwhjTbYx6zPUVRhoUdmeC7aV0bTippzK+se5Owu/XhWF1cwuw3Af14lWp8/wshGooLTq+RNLCPGq5r40P839bt+4xQcn7qBeKkr6+QHu8fyNa2TUQD/0vgnGEC0j82evjuPnX6brkMqBayQQELOnDxqu9gmE4NunwhtEATyNPjTx5REvCzbLqQwbj2vOa7LfdAfdIvwm3/jb8hAZyJbaiEz6WsGJiiMn42cA4VWe0MelHrjuro/lThNJVhvRns9CJ8lYhGPhqUJtwrrMcVV/Xcscyay9PU1EOkIVFCSHWLXJ5alSYLtixiN8/T/8cG6kA4Yl3uB4Ho+J1P86bKbAL2mdllH9MLIIVSMnlGhHkEZ+a+d+qXpz2eGPod9i2vsmTYMX8Mb4dimZ+qwEbZvW5hlUsNGYTwoobEoashBqEN18ffGleOO/I2ySfJtQBjCstJzZ6OjkfnNkKNLg1pidRbfdiTSTXSSiwWbGvQQogaoj6/f5QavYLnZC+Egl6zBQrfSfMJR749HfYWL9slTKNZYNyMzEE5TwxyhQSJbcEbrvBKWsbURHMKcDZQTL97h8AZxEhFOe58pnTGNbBSKUXFkqO1bBiTTtbEJaj6bKXyRQOgRoB2KiCp5afSqPHlo0H5vLw4EKnLl29rXffBkZkzSAnNo9t8W/m7PHrYK0n0mq6AuxXJ5FDzp9ndzpCFc70G8LUK7gnks1wPaieSjpYBwn0BzBA19sFL46Ei5o/MDTrlvtb7sZlvvHA0IxlijCjk0BYSEuyTuJSFh/UdAKxt3P72MWV4/9ZZXnqiOMHGNAUPPoM+aebw8P5RFgssdPOeABQFouvfOEWtg+gRcz0ByN1XeOhra/OmRqR6AEeI61m1dvVNzrp4XfTao6q65nSDHHHasqnG+4tNcVFUVyCCXUjt2+OvH9sBz7P0LR9bwNRWW8Pb8xbC04KnvYaJjXNdhxZ60jjaQKlibDlK7W54i0WYmcdvBkeh7/LW6Db/4dx+zSvS3smIVK8vhK6q1q4LX040Xmobhwy+g0WUv2UOxDFzbPYWjXfFfu7vNJ2H0YUJjcT/02QQQiz3i9MgXnZSZI5mO4coZE8QWZ9+ivnMYwExH1KRylQPYvZrdCyDzHxXg0LcYWWp1ZmQDNYiXw5luCoYXgyx3gOYBt8248Zl9O55ziHgUmqsVSb4OAufZZTXUMLI/8ET2Wgqfy4E0SeFkyjq6DBXMNtck6hvFpbEIiUP7sXBJtL7gwB3uqOEQbWT11+MWX5+ZtPBaPiDTuqd44VF+gxmNm1hb5gzq4A3tKODASRLIS6SeHo9EqjnKLM9eOxN+wmm1j0jrkRjJQSK/ae2hu/8Ny7Mr0xaMMMVEF6q443sd54/Y4UE4f5Q63HXY9j3YTFsQDFL6lpnvvqNSkzgaJ3hfHGomjd7Ar1nZ4Hy6l2UvPjElSHlR9yqo66q1zBb434u7pAbQ9ZiAEjJfo/Z9E5Aoy4EZPiFKzGJlaPRjOtP0UXltiS30r3Jx2DVwFwAEGJqdF/yG/I/iohSMdRGF6TOsV2eQWw5fwoT2NpIw4vGRhAdPqBob3uYiIkGYrKU+6BVgjjpuGLF3vDtNDLL30AkNWu2lf0m5QT3NQvyAlKRjIIbhUaEAM/pEs/ViPeAcBPhwuIcZHtRsDsT5tM5jrUjVCCV38Zft370RJgOdJsJSWKspQgd2mvO2XFFxvwI+7ybaGQBBb2dGzIpEsCTR8VuK+mATZycMAhPQEkKK4y2sv5JM/Kb01P6e3VNWH38P6K/2mxF3J6J6YtrHv4iGN0VToLT9ZOTvc9YObzNeW3dOsXxV34yBE5tXhPOK3ZPHa8iQERe/direi5g91N8UUpXY5k0wvF6pU6ZrjlvxbC7s+1eCqkLC505bti/xxMaWKrRbLKq8lXTZqUXLzcMjNtORQ5tS08LS5/9+I21rbWxYf6duZoDBS8WPVRofnj84SZqWe8E37zmxaJHyW43u/IdO1a+i63KgF0YAr2hE4tSEcdwG2HDmve4acMNG1Sc6byd/yVtdrpHmvV5Emg6fyREW1VYRODPo4R/B3fsAkpFLVxwBryclKGstUft8XVcejwKgrz67JnOFntw9vdjn0hojkQMAOJyw08eemdK4tgHYff1jcBTLG/lLbDseNrodhwTBla0wBSkelF1Omyr/QY1JGsVciy1jEJXckDZJZljD98stzQozwKdiLp2l2VqVVPqjJt/uL3k5N8lHFbLN9zynZgWBUkpSxen03b12ktu8erXqLYG4LxTWgqmZFTTJzp2JQz3Wqp12k9LSZzAFCn3fyDDOwoyICaHUzTkFi9A97kqDSWZ0qiyq15M7lPsEeCN09Bnv02GlnXMXgTeFPbchX9frq/qRlvUzy59JSFg+JijcFpbFBgqxkrqelYTI87fPf/9U515t/CIjr4HpaABz7hiuwGr9rEyjl48yVnnwEhWI/zS36Tww85H853fK71v193WiiVWuzsXyyr2oPwGEjteS9V5337lLe0PHO6e5ns4R8zxLtMWbMTqjBWs4FVAkX/MzhwdywpaK8xg2uLyasiHKFf9mQnXJ3JwvcWpXLKAE5MoVIqoS8dFr5a58MpEZVgN/Y8sRKy4F2ZWfNgHEuxprDpR9DUd4gvpNZkmCpr059vg6NQHpRqiUou2VBN2hwkcfKF7gDrqS61O09tGpu4BThzxkQe1Lbw6VUv68K60DejkfiA7GjfpNG2vlPbI5ycrMNXWaX4hjEnN8NxP0Gg8ZNu/us5IjKG+kADMVkBPfmgHZW15J/jlXYT4uvV4J32Z7sFg8OS5dr7iH1SaNWL81ktQub4XkY8PijSOCX9YzbY1HZm6Sk5U7GgqWXF3/dLlW1+qtbL0bx8pi+CDzazSsyV6sVRKtPibrB7kEt/SsRawQIGSxkNXkRn9NavBSktZ5Y6TQNqNwNW8xXfjU7HhK6um/CjWEf+N2yaNm4cLTLCgOKYQMjpDQg+udeMr8/E9em2HG5oVmfGas9SDY/SVA+cAfbIXFRsqi2xfdAV6IBf2ha/sVXe6uqIQ2RMXxpoaRv796sR0ZIXZNS094vrkcgtRt61tnyeGlFf1Hgh3y8Mm+Uh75IqIa4G9mk/zEifrYURkVDOIB2LsFGaR7iqP3EXAK71Ilu7sYFLiVRG+bD1/ND7/gGcQZ7b5tnMKYUevIcdX8wTqAMSgvaXxKMbJ+Mx884JXDT2wmAPTSqBm+aNa2uQeXIFiXVTVz/2v3SKrwIU+6AO2Ke5g+tUYUdYvbtR8bDOAjqI7I8YB7axiFlI+gXjeY0y4D+m+IG8jSRCHPi1E2Wm9Dg/pjjibXcZxebqXBV8DQTBha7BI2wYL+vO60Ddmbp2wDzRukI7hFsrOYJw3i/d+BrYwbDAHC/WdHMuFnvwTM2+8qUlHcF3Lsqg4MqUdSV2PkfeImX3taE4bqIuQj0oB+POfbj8+apj9qkC+qo4Z230P1/ZaLBf269z3esaIoV/rVOjQzpAdZonEpklnel8XzkyH77nzwvRQjGe+sco105LlUCKgEP0cWXCGhB2kNVdUbeoI6aCdBGb2UB0/KyceiNNj7bgG8XUC7WyuMNAsZH/MfATI8D6w4UMnifWBXeWc792ch76TrpVe3kAyg2/tQ+BHiaKmfhtf7mUhVXO81R/75QB+35fW6XNZv68gc5TMRW0zXEVjvqGlGAjFJ2fdxApVGrED6PHDZxby1llM6wWW0/Bq2u4zXH/EJYVZRy/yMY9pkwAo56itK5DwixyzXUYTKXsVfDOcgp4W05mk8A79TMCSMNwAnoyRgx+630Ltj3C5itA8V8l1StCBPStSulKwzcgZHetmG2OcPub8k/BGGJ6ycprUhatM0FtZ8tJ9mEzoBGMhVUxnSJqyoA85zssYCdE4ZZAzHwZrolH0M/kaGVICh9AAP7+JsPSwUBgyrm8ww1FbnOjh9cG4T52vpe7o/jD43zXcD2sNvwgbP9RGX4oeq8PfvzEI2Y27JwFAEWmymxjyLjeNIbRvDXy4LkS3qu3ThxsFxktHpw3XA/DcoSItfCCG9lwk21u/k1LUXA2V+7mEMyBaRkxhP8yFrvDCJbFG39sDJaFVv6oTtqldcduC9/BuqzC6YXBXb3b0W3iZMEn9kTJiGnn+3Bkw6d8uPY/MkR7W01hDulv/VZ6eKX9CsLTtohh720c/AisVpjRrSmWyNCu07ePg82pkC76dueskHyd9cu+yatpBrwXUcrspqO/ib1dYRMUAc/bHsfxDQAaZ6RmFr3iWJs/vdAI1zRvPqnX5Y4JggphHtv+HaRzfUftEL1HrdKsvejH+GJx0lWHdZjZKv9mJTDKdj75rQ+r9Od8QOO8uv2XrgUwVPXYO0kRcglGzvL6IGBPd0NIYSPXygbV39yzm92VEDn+juryT6XoR3+c2mSUkWrZ4KNgO1sLI2fDB3oI1QL4rpEtHIZSu63mRuEFYj2kk91bfW/RZ8yncloVxpNoxFR7PvayvZYJzC3qPuiKiEA6HXr9N5vYjHkqXS36P02cAFjNMrvjqvzEsd3hB/oNC5JhuVuur1hlOwJb+hVHtE5hZdnTQ1MBdAktWFw9eE2qR4xHu5Jz65J6n/mqI+pj1wpYlYVj44dSuDD5hLuOzblOx2K2b3sySPwaB7tiPAMnHoJzZKXtEAFoqN+qW/hTqqtCjvqsep40vmvqfihFjyiO2QBxKLPteHQZdbwJs8umnzDhJl27jXfd/jeIw/8HBycEB7BTljV4UwkZH/UbQ8KEhfP7T3fFeaAGCvJBNJ7x0bkoyLoXOOLJFpZrtbwJ7dyfQKlPKLn9MDuYrRw8VxcLjpMcas4rsGS8gZXl02lTs3HRXlk4qA+3U4PZpIi63WKCYnZqm3UNFZhee+mt+OF28T7udh6GV6Eh6iUzd/q5PJ6mXjC0LM0bMVAF1ie+62Jm1Fc3/DPWh4ri1QYcrYZ3zGIIZ+ya4EVYlqAf8BHKjdIzQ5Izw1dob9edwF2g7wEfs2qT2RLQYsDH3bI99sSCbz93iEWd+jDzd+5tRXaBZ9/NtINUm5+9du+n7tLIVHAx3uvpuhftn0a8x8p/lsE9EYcNiUHWHmKGS5ZbQQvq4fdlDGVem4BaTS2EvMnxR/kGRxRn+MQBjbB0tGZjF1//Edkpero0RUxWvZWBObJ0JJ1SBbR/cUITXe2PqLaF24wel4s+rDzs+tItNAPY7hoh0gmFIZzw8/mse+n7iwJoc8/V6S4VfVF41eDtxbCGj24seXIW+NQ8z1cwCFgOuCWdJgSlb/m1YKY0w885i2LSYZdH0HaS5v1WKSYr2lIjQWR3VgHqw6ShulI/+5vhguKHgC0ZZDHtDxQv44kG1UTfUPRci+nzQ2xO1Ckkm8fHjgGSkWeIevSS8cPfpf1Jo7NeS6LLAPyeTadxiAjQP4ew/OkBmCz1vdPDWptqEusjzkY6JydBM8GsC2nE9NbFwC4DueD/fDEndqk9/kXw12ttCc5CsTzUDj0ZI6Y6Jf2Vyaei8AEQFqGgNE7A5Mw9t95GXaatfUnnjS9Dmfw+lITuLJTa2axiyz496Tshqx/OoLY10dxjgoPBpMB3myyDbDH3Xat4kNzAo2fHli10dfto0j4T1xNTjoj6hEnpGoN8sfD8XWnm69sBKz1m3WSdZPDOAhOVA9nmXZiBebxQBz/bsZtFTV9TCjTt3cysWiEGJkQbRiWqdb9zuSiPq8cVhACxi5wWI/APY0DTxG2jbk+46gAh2JLCMSQqa/hESCxT3u1nsjILgYINt3K37qH86jgrY/Q3NnT/NmysHjA4HM7km8Nc+4GhYrYJAvtm3fbEeK1Y1pBMR8zaIpAFKZ4jK46kQbzkk86dgQMUISU2ipt9hMiqJ2DjKBpkE9PI0ar25I/Ud7p8s4ujLckpQAua3MJAU1CecfpYcyR9db1Ykwd2T7Qhe27U1YGT356Q8MJU5ksuXQEIHFlmZT3J7Bf0VGnYKgAyZnE0VSdCVViQdMz0XN3Zgnq5Gd0TLXkEdEVpxkIISHcAU4jDMVbiL2QVmdfYWeyjG3AXmxhb/OZB7OdDFY7aMdzpc6mNcTaNCSnfFLEZru3n/yBQuCrqQp4/7EBmInX0fQmvCzm508MUEfaQr+fYP7DFqj1DMQI38OSNQ/KE1fqanBybQoe5C0a3L6mp7UK4JgTYkkXtN7Ms/PZ/jiPFHFRSSaZEn5lXmMKbUPn1G8sixtJ9hx6446pbRDbJwJCqMhLwpSxwSIa0/zeB0wNpGVTnkC5MBy+0QuFjWOiCZYaa7d5ei8H2Pm9/fqzMXXl/4w4327JkIr6Squ8QVZ5lrCg9HrYfCIp+ujBo0xvCaATLrywdtReMSntv9YUp0jraGBqFeoGeu7R6jevnkxwvQqzGWCpWr9QT7xvpdFTxGddaDPd8D/1AECcLEt5PlvYteULDUaUYzhGrfu6/KqGsdczYHCN3y6QyImKkaXgYO4dWOnkf0gfYLoLj2gQ9+oTHgNPX9mejTw5H28eZz1CVca53D1MZa+hXPYVdRPFlIAdwmw9x94mDeQyG4aNcq05NXJ2FhAcDVgZOmLqtxCppKCnsdV+Rj6SCwJ1Kyp2NwrlMZPFcgxpCg2JhFR8QdEDeMsMtgev5w457IjUwC4+pbSEEW121ZocCeCUL/uozW9LSGQMX4xTnCepbf6yJeQ84wHiTiIiZntSoIqHQFFJFv8yoepJYJAF7rL78vhQ9KLnsriLDbvgS3XtVuk5j35vbFxJW2iuj52AKbf+M+FrEuaoSH64puucnRyxCkAWE5biPmz15wFL2N3T+hZLlQTtBftBiWBfJYpF6IqS+TQRE17lGYcB8aaGUIczWhkvu2oolJYrxJxJA2oE9ufJKKqpVYl55HMe4dOCqwNA7bztD9+9SQNkdyadVcnyBtOMHwKxtcHgzD7EJM9DG6oIJJgxHlJbnLBWcE7BB0TOJ6Sf16I/WhI9zW6Zr2WmU27me3oAZPxf7oBW5uf+3JbDb4WLw9AHYBbU9gkV3sqGICUeWvYlZ2SnDe+arTkPNfumQZiPgTHPuNoqf4MLIwAlJb8+Qe7sZpq6+faJMzxQu0cYeKxWVvExEMrTme1nLH2sAbWYOoNVgBeEKI08j0qErG8LMuvoCewJjXLYC9c3IsqSJUA5ikUWahe3PchJa3DP+hbYTp/mn5nr6+OfZC69CG5yjcIXh9d6Sq5rR3VqY92Njr6pLnPGGgyBGZaX7y9F/KV+P+ra4ceeTKfwCUgJRFZPtKc4QSduS7brqFQ0pZf2IAPNqFpkxXhK00D70/5W4Git9cgyMQjY+lZ/bXOlRP165LnIy0m9TXnlPGg8Sh9GiubScnPQJZ2H68aI/DEl1J84Y78UDD8rNu2emmVkmncVPVs+0ZM0rGZCaZTc/Jw5RFtmO2Bwbbaf58MGMViAJjkEVcS3mkFFamReWobonfUmibUtAWVw8jzmycoRM4tx04jPznuMOb2LbTJ6jhnp1C9HCc9jPoq6JrjhA6eDhnHR1C2L2JcTlLVFCkA0ou3AQ7SZ0SSVWbyu5VPFiMre2yIZPVN+Yymb2PmuRjvMsGw1S6q88ZWwH1/jqiiGAkThmsEDs0/gk8fcnhz/geOvSe9JlDcBfhGaJqFX758iAO3Q5FUGNzgJgnZ6pvJsZFbrM9S39SNIMsB9S5miwxCEoXtQlYGMQMC6+9sP+xYA9xjrIjrPzoZEItT66ZvisFnVUlxal8dZp2HsLKJp2ROFsfTFwMKZsEITbZmnkwfKH6++EIv/gRy8YUVEkdYyVu49WvGCu5Hj5lMvcNkCb/pf+GVVCInKwL9aMhUcDt0o4zYwlH2sR7v8ioJt4IsqV6+iahPM5EdMYPtIcVZyWt4QEXMiDemnKnmjEB++rMQ3ijOQqA66iLt3NIzVhnI0THmfQ6ptbS7WovTjYAAiKFtdfLhdm9a1o0wfs0b5uOQWPoZqG6RHCR9OsD/jQtvUv1WVOsBInx2XAHguak9rr5Y9rZCmOzo28SHb7cc8ayK1OZtKFHZV5JkGUbNewd0GUi7ruCIUcdNRtB98SOtwx9QLGwajZk5wXxWqcuqiti2E5mAyrkIoC3NMALxxT5uMq5r2R5Nuo1VA5WBodEMG9jGJvq7HnhJFWTm+MkM4AUEVvRXYSZHR905uQ2utIFLLlj2Niz1a3ckzBCZpYv0jF9K0BBLc25y0mUtMGvPCTbV5GX/QsDcNYoEFotUcmLf4frb4AEL6Wf48bYHGuPztqNn5YEI4AfJNSrlTK5G2NI71+OwCnr0HHTWp0NlvlOs1lK6vrRTuxqssL9aAN6+5PmZUw3PLuzgGbtx50x8hE4VRVRMINPy2v93+EivzWCLeBKQl+ORJ6Xy2SBSQEP3vjITzGJ9FSvjKphMRMibfcHrhlSWXgW9OV85jtWOr0cChS64tbQQKg9IHbUybL/cx+nsgtSmTMy4Hg/PiE5LgfcRDNrUUirY4vtR73XNeKX7Dbike/sNM2NrwqVgiLHtJs3s36AXCV2llEfQ1954gs4WfT9kAl2xjYFXQ0yuibZABT1Y4R32mnmERVtTB4JAsFWtvuCoKEapZRuxwJob++Oja2oGesMu8h54/iulVzL3WNFV1BhNwLbOH8sVReggits2MOaKbWtxdJ9FmGCZLKkj48KSwzQPqFEPDL6/zA7VitcjyeEQ9YDZskBcYcTybFDdD79s77DEgX9bacPE4TdZKsonz9zIuGNqxtgrrefnqjcDCRQy+c3oKfV17lXAXqpeTWc6Ed9gnvDOAdh3L8hjrh/doczXzivQgF0ffX4QPOKMhgLjBtggZv2T7GDvdY4fizWB4iniZJx9QIFHeIAXGjjuhodm/GLVMR3l3N1bh0RIZxbXK4+ACmMC871e1XHblkc1Jf9d3yupFHsT3yciYp+fJZeeFrhqeLDqCgIy3shm+d1h4kOknEvYP6FO6ZxWj7xwMVbnLUHhz/ZY5rlrEPLvT0mDiD/b8uErhodx180Y+ckCFXC5HD6xTzc6wbnJAOKE/gs8+GqpdluxNkYo96WZSghmgHGsGyOZEB/GKXEWQv1CQhMBrc027Br84lUw/3XJueQ4A8GE/7oeZ41a5miwypEmSp0aypg6ahaY8qUyezjVVfpXnJ6HP8igCzFpsbEYmvm6ApVJI9WWERZjVR0hoS8q2Fi9SkcY/LVN/g1XGpNgfEJDhxd0Nmc8eKFZbS6fang59sJQaj7ueN3vX+szN2hiz3uIjhCyc4fY2+om7Xt6MbAVG3I3dBqBYpT6jazZRWtyneQAMP15OGXjFC1yI5yVe9ipKPXn9yeTPZXZBYl3QqiYQzV2vEySU3i/Rb+ITPy+6CdXe7AxxHaZ4rXkobqhOKVax+CuMcBnvGd62Bz14b+3xY+LTCKJ4P/Jexm9CS+6UEPHrpy/J7QshtImviinABNSXH12D/v0W325GCZ56kvR27n879kn0icDzq30Wu4ZlDqgAP9U3vtt5aEyHO5Km/B99hMpIQVg/Qu6NnSddkRbMt9SDElVX4gX2OGuZ+lcpm2cKGsYbo21uVBVLdOiUKWlg2enBZJ5k/EE//WCttc25qQ53gb06/uQ0LNcAssnP5p+ZmAzLn43Wu2NHNYr1QV/Dp24S5a1oIf6mdzNby59aM9OEp7gRSSMIP/z3kLA7ohs0MUTdq89IME9PVxzcsjo0gYNNnPFNf4GQ43XCbxG1TWx0+jRF10sO5PPzobjWoi11IgtuSlt1RY0A5RfIuvs2P98LKQ+RfkCRexzKoCARiFqYLgJ2w16N4kQGheSntxNj/Xmf0JM1FwTY57a7G7AwE3TV+KYWP+VFbZ1XmgapIqU6gIKROy3DqtwFOQlqoL4SX1bpMM8v42jOKekh+DHph24tR1wq2SJJNM/FRu0Y6VtlFwjOS6WlNlW672/YhNoRr0fFHW9G90m4NwVHF5VWaujuBFRch7MM8N6sY3nUBYhloJcdEqyFsZuJcVXH4DpoUjZ7U4NlcOEavFymTNCCDrxa/vpHagSkdMIcnYcFZuhoH7fgWMi2GbNfHG1y3852WzWYRCg8O9M5SDuu9gVY0Ll6ug53fhKz6bkfA92haBacye7XQsbO5dhSH6wokAB/pKy/sehicbN1CrWMRwVTM7CcLIjJgyVYEc3IVWO9svboC/FV0hM/HOOjLTOiEawpiEnlbyVvTCH2cVs+BVNV5WwhMEYqUS9VvRIuB481poMlrN8s6HLnN080bPsEAsTENzWGLTTDDrGWYwF8OzEKPKrUNUEAdtsuxYdmxq5/43ibKbBzHpVUxkXBMd0OQR/Qu6hohlAWwJiZTirqp/PkzH9bsU0UV1kaZJtfiJSi7WI0sCgsN2hmo/4FgOQU265puzJEzsBgBp4LE4987Be8db2ypxI0CIkG5JSLn89LR2uyb/goFa39vZzneSrHIpPThdYlTyoH1emcD0SBmROaU4AZh6S4lb/AJ+nPQz1UuAKHl0ZCI8l33tREsEDdmBsxiXnF7A2zGg8koHj/a7xWfc0dmkCpZJD6RPJuirQFtvboJs9VgN0Lz0WdKqct9iMAvBXyVUrm+ydkuu+DoEX7Ermqf4dTN8OxcNZAh4G7OvaduabIAbgkaLXeRKvPuAzeh/wn2ru8n7AWQs2LQ4W8xAp9JEbrTxImFrTmJTRn0LUhdO5X9+AultYZwkx504I5rwhcnca519rwrX8U4tAjqq4xDeg92TJQz4jjTTqt4WWCRk1Sp3S2/abHHgssQ0jI21dLkEtd6qJM4Vdw83omXaCuU6oXGvirUTbC4IplNdM3ruY1tqSQ1JWoZl6GqGpg/83o/SCFPgr9b6x9UVHP/xsW7P9Uaay1oMkj+9q9jaHDNDFScyd4JVIiuFyXvK423PHhTbEPaVTPRiOJpiJ6BiQ1mQxsXif/aHdLSxorqLbhzDZsioI7Uo2J0BL03PHro9dE5pqVgF05S6IOQwCmp4N6P+HdGvHfwn6IIaI2l8vcbWpnuIX0AJPpNCUjCMQ1gv09uuKWJV4pl4Cn+DqdRaz1xwJE2UYyTu/I9vq94lixF5V1Xt5TAEFDt/kBGCNfTm+RlSVXBX1Y+yzWy1uVleHoKEaRYpl9ABaTzlvCILJypvCIJUm4Pevaq/RzoYeLKnW863wMsVP7xmKVv8mZWuxOcX3nLlzxYoNs/WbVsUvHvWbjbpeV5PogPgDfrw+bghM+5cAyQI+Dg+xYcDn3jxf3KH7yYDNEl/by31js6S0vgb6ZeqST6/qtgcwFbFY2Ij+rKBBRLCTGF4D8i+X/iIoodai2pwqXtEGnVPjxILsmnnuRcKBM8me+y0/Zq2XCRusk4j8DKbdW+dAwpxJIkW9tOdjq33NXYYUqs2VgEcuncQ7MnrbL/O7fy5TWTXtDBhWlLeTjAQIedYPwKzpR47H+7Da8M/qZWlScCPX6jroc+y+IirNgvPZ4UvdqHQAahIAI9f8l3dmB6GpQkkeZ4U0FMYEkf1jNYvGdgK/vQ/I1oZtD12JoL4GYM1YD9CWNAwbuwsm4/6yaJNzO6XwrLq8M+jSN/+0X06OXN/kC5tvEkr8ZUw+SZOZCk9JnqEKm3FNhqg6vi5dCgr4IF1NhlTNu5fagIQrs5r+MrKS/WU+xnk5NjOznuSiGlxAhJ1Gi5GQjtWLhbbeVAfNDY1+G8bGiZfhmJJhEw3/w7tl/KA1BQudj5rtkhNEyJ0c7gHRGF3S6yVTMRjsskjlbuV/AZMBCTfvQZiQazcQPZnuf7Cd+HrQEgZQVu/7pmmGCoZ1gKSxjLYXUKuqPGC8+y1sMh3demd/JMmhs/+ZpoaDRmcqWvxf7c2XgVozN0ewwnLprl+P+FgO01nIkRvPcFzZJW9YDljgaN5F+OD15GVzJOq1uSpydxQqKGONITnm2woSuzU/ymTL3ob51iS7KjIm+GtWsEs6j9qKUmHNqVolCbloaXtFcn8Na4BGhAAQg/tCSIIVDCg/T0ByimiljeHo/ZLxg10S4u9c0PT/tql95X+TkjB45axZpDLVwJf9/ytRivX1RF2rLGSWp8twloSgexSlA71aabfRAjq/L4peLui0Mqz2pE0oyLTi03UzdqX6O19iUpnFMUFEQ7/1xlu3l3j+3R4svIZQwBURgCHCzlquYKRlRBN5zHJ/RtxRmdE9Mh3PnL7/hfYkhvoupwIbO8bSCODcwb2ejVURG4RlU0rD/slGIGVizR7hJHpfQQ0ecNxQSAp8YN+Sc8c7NyS5qWxppaNx8fE96BovGBQnSeHx2Oa4JOxhv/zb/G/Q7mpWk8y8GwGOyiuery5D7FMvtoGsdAvXSq5Zu7DK1N6C92VKH6ZLT1yTCZrHJeXQGb2hLwfaq+Vlt9Tund3ng9w5NXSz7AzDd5POj+HBO8x3DQUOz6QQmqPhTEeCC88Utqz48GjRCYutddgC1CzvQrrIa4+NoTZNFAvsTE57iBHDG7Gnskqo1PpP7gXgz6Zf7fGE5oqu3e5R9iqZTm/WpDHMF0nlfbmaM/nE8PbcSS1tU/d67Vonp4yU1k2yUFNyRcYEb5cEVo15frhs/MNp1S8b4waopw5RCinHJwaMDY/7Ivz+8t0C5Dg60ilZa4XO980rL23/dvvjNNnrr9jZ4F98qDIlXRgszUf5633tjRxk1QOVW6fyuFzf10Nxe+ZDZ3rXlIqOhoF1yeH+gGwqa2yuCS+FH2OUmwT+LktvVaIzoKN5ajQC5LH+Zrlad037wc9c6n5uDGT5Brq+gO8gm5UvmyMvL1P1NVJXvCb2BRwNScUOvsbXpXCirrs0Q1bO7mI4q4vBHCWD6livUtvfZQAOnver10Dg0kRXEKDiNYupnz6RTGCAOQC834XQQmMbYBo+LueXIPcqypbiVu0J9JW5M7Sky3WFb0WDQAmPkNhFaxxpilzc1j9hk41LpYdLQgKgvkw87tXh9pLkHjLbC3LNYgFwV8bXuZUL/PyQWcCt0IfUwdUJd9FBYiAVzU3a49xB+YIek4iJMPlW/ANp45vWm6ugLvoBABJWEKuv1BOY7cFTvSvqj/2WL0IcVKmQUi/FcCD5prpJbiFQsvigfcsaZb+C+m/myPA6AgMG1zavqcHZf+/r0+6YI0gzOrHpc2CuAJrl6zJtLCdPqDF5fQcFD7JPVFo/tb2J96bXMG57ZQLjogLu/IxL/qYj55WqfuMMzTCb11WFZGQAdxeWDV+yx4FlRYtp9yeTxjk4b9HhlXSzdfE2nv6J454p/aiz4h0aglAhW5tfU9buArqBJu17WKE3Zz4VTCmpMdxCFQIGo+0fl3k8WvHtRLgOcJTFs/UyknOfDNCHPg/oBZTWGSYCVGTyV7B/vo9kv+7Gw6iOxRafL9hXdsgld3F608NXHJkLgPnSm+DHUcuWUwB1yeR3uecTD5HcF06rtHq2/Yc4x6OkjkUFXRwn8W67fogUUF0sgJvyeotZiNC+Uqp5IHpzkR7nvfvV5Y+Gogs28i4RS5J8fTwYVMhZn8dwHAOJbzb4UcYXuYcZciX2A/mAYVGwJzyY5RgpaL7r/lJ8vpm6Lyx2ihMNCPQalAhGKpPhwTCYqeQAc9apvRUzZwNWYWzWn4HgDpq7fHYShnJsfl/ilboQOUl7Pmo00YXg7w2gy9Y+9ESmNsxPAIlWUNpV5rh0V+/m9HQ+NCo5XKk3BYINMX7NQYv74SNNvy6wuWDfftXagj0K0tEvSHwZtYIhnDKUYgIwKl1s8d2hwfRAtW6uq2a+fqXkYULsBMivAz//GsNCiCfM1JUcJ67fzXw1xLJy5NlyKrBaZZvYuzU208R5dvfKFdgwWGIFadFNTOoVPh4lsLGIFX+nKMN2P7bwyBei4rdQ3pI+A8Ik/DrpaWJhTbTfLQ1PfFu16Y0zNz5HWIYZoCLIC1z+pQ5aOj/OMKhmZQXuW3fsK5UqeZOvUYFu9cJ2oLf4ptkfBR3deRrjy670nfSPkZ1a0xUF/+Gkez/MgIxQIYFKIA6fC2DafH/cZmH3VKlVzTf5rngqj4guVeG8/qcd3b+dwZAQrTy6YTaT/A1OJJuIPnONBhv2GXk+KLfXSBSCfZThDLZzwUWzg/0goSxF5c9FvtwCVJqIuu0yLEVvlFrf0XHvysXXbaYwrgOtEOVjY59MPTP3Gc9kTIVATA+DpzyR8Tqs25pZc+vfQu6aYfxJ/gMnj7+PaHGsGv9A/sY44KMCP4ACBPjv0WwcQ/nz6dtvFXtJLMwi6BfLEkr9EtnpaYefr29j/k5djco7fC/B8jR0O3uq4hL2lDw3Ld85PL7mPIbCNyJ1UElMbNakQQFBXSllpu4aftI8fLyI7adrpHTdEVwNwwe5W3xPhYVT0gR4C2SxK5SrzdLUt17I+qEko53ejSms2rFcqa7Elx5VMXnOMINS+SExEuaesNZhIZisPHy6Jp4HV681ebJbx6zY5nsdLxiTlFLkP2tG8WRQi66KYGkzWetMxpoJec2s6EUPvROxrPaW7YFacHvphfUiL7rLo56HMLvHCt8qvqY0cHVnf2HC+r5NuzwL2/FRkfwFqFHOpi2HFvXdGnao9AaOCCHY2keYYeE56CZ4hZHun8lGVmg+mGvjXQireaxhIKYTZzEnFZ2oxnEvY3xfB2F3TK02daYRMwHEeXlYrGo+ZGZI9YhV1Vx0nDPNegjUuvELuOFllpDmp3Gc9JobNvDdXiRdogbcnbX5mbxxfUjQVz5pJTrqF2UYTokSzAj5gQu3Z8ZUNprp4IreD7pFDeo87GJbCiuYjIq78KqubaFGUwLBN7m/XpM58i6id9/jqNGz9+OCW4sQ22hFSOjGotrRC5Ha4Z5nkRhfZTU5iMhl9WWepgZjwwMee/cjedXhRYs+V9xQvKekOiboEBtV8ESmJYWTqmRiefkOrX8X2yCpcgwdQm4M9iTf7ntAsuK/EePep+BMHDDTa6uobfYtpXtVI8qN5dPTXoqP0LgDPplDDny7XqeakaPMBSs9BkUkURQqrhkN2eXZYE2MFDg6ecLtBkubc38h79cjLqVXT6KvClJW/K8fDAfNaFUNGzHcMKOLUzd03trqtOlpeN8OJ79oNWU9TI03HDwhx3h77CVHDJPpUdZ0Fj+T321aWz8ZVPRBUhOVMrJV5bOsV/rFFkqKksFpqvZLvt3yFQCxq8fz+zETowFIohPmKACcnIS20m3wWqCtDsfUwitvq8NSlVkTA71GSKOkQEeXZ/i9NDIMrDvYSww07CUF0/6KnpDRG/1Q0Ecv42cKnliX7MLxmXC2dP3en6+tn1zQwwdbHEnociSWGFB2MEDEMz3IoQeDACCGwyQhTYgS8FMvL7bNc2FBOITyl4CJefoFmTz0DOSoafQWgsOTeZLlQgJ+pMcPRn657qjLgB0ENEZN5ItVOCLhXuUAsOvVjuuWhx+db0UZznRrxLVC+zXv81yz/jTQOZMYEHMwLPH7WiqUi4Tbt4WOYUjf3T5vPE9tY5ylLc/3xdKwc+1dDGE0OtGR9Pc1K+9z3mJ5sjHYAV7mbCZ7qpAkLg8JQaPvg0jHAgWPd4pI2dOH6a3kusVBUy0obtAqO2pN7sQUd2gZ/bxpzdq8KfvDy1myLoEecdMkDvRUJCOBW/NV02ZyGyBkPt4i+/sm1ZSK2IxYcWdxFoxA8GxR/nWlQVk0B+SEtgm6Zbh98EF6r0tzUzBYu729kvfks2/9vfrd+32uWmUayYPMfczAbZEQQBX2HQySXw3Qwpn3e4lw/PQU3fzaNeYxoEmR5M4dK0Q0Q9+s0XvV3KwNSgC1U8DzTaRCjPDHmu4blwBdl1eXgsD1q2r/OmuR2QsIpImsmupFzLz8U2ehWRaZg83ItBnUCiH9/YJ1KZ26sixmR+91g/DnE0wqKhcd0Uw7dKisI5taZbKDjRZ3/JTWLq0BOi5CkpZHfZacq+9plKkfG6EpPQaCtxfrgo8+wjpJvYHUwldy47m4/r3rqyy8859LnLByPfcxcuh8g2Zq3FX2CradrctXn7TLDBOs/vJvL5WScBQ2hMoKVSap+5BWZ+VaOGiva+9lQ16uFe6WSVOZPoKAgcp73FU/ZMKIXpXq4iu8ClkylBXBaBzpr2fpf+ov60LuWLy54/zB7GAwNuHNfIWnkt8Zq5yO2ak0f97tC2pC99ZjjYRoMuGtWZtYj907XotJ1BdpEqzZUpyhzELzyWy5vmatOKnRoMJqoN3l9AWmM0GQxhgVCx/30LwnZZOD6ROEF0S0wGriuxclGue0oKXZr2tkyBPVuXM2+zT7oDl7EsIXnPitnJx5YJltoOCE7KhKLE8ShT82ZXE4ebW8iwVMrkzw1158IZcfodUlIQl9SvXKeQo5faaJZ+T8DgGK+uNIgnm5dfB3k/Rmh9kfH4DY2VowP3AKQTqCbM0P6VcfF6GzExJJtH2KKVNe7AQodrg3fvFu6Lh9x7dZqEaKbdAztvuzkEdX0ZO75A8X2WKEt4KZqeonXPRAQou+d9pQfaKX2/hsJEm7Ze95SVocLv90KXXyKEZ53nadkoxNgFqq2B+j2Fbt//mE6glStcERNlW+buUEQm9NNJdBQSejy11RwM1o9L5vTptbPw+zl6nu725j5X9Mgz9U+LcXE4695ysc0ou53kahCCr+Iy6LYMHM/F9LvZmI+ztce7AZqLusae0xt1lmhRWogeLEMHuaRogntwVJuSiKyk/MMYRgHhAtqIQ0xaAwAbRBxIcF55l6g1NvV6ZVwxE1tttryiB+ZPBhkJZcLiKyqPqQk3sT92lpgu8nIM06nlV0ErMSnw/Qwq6YxZne357+4yKWHrQoYPrkRZ7Z2KaG+/mBXqUf9qWkLAfpNd96mebRKZ7g7inRz0yeVMFn1E16CzuGDm6JxonHkA4EsMbkBq5yzuyatN4aaZS0jISdFNmGi9pEmRX719zuyX76ZE1frXhkRZEmVZYiVngXYks0geEjUfqKsDm4kY6kcN2IkK9CIIoFvQL2AYaduUQjyKG3UAgbeLzPdFFovOyNSc+3UrLqqrIUWNGN2Xfpt+DkrvAcLGL5TizFmUnGtMdkxORsX3PXUPy1awNhYcqAoBaggziC2BDTYliQUOyT+gqAH30b/VxF323g52QxeG6JoWct7/ym8fFg34g4qD+Mxe0q8M0tKXU7XNH0w2kMxHNVJPdNT9z0goUqy9WkmRZuitZK3ceEb6vQu+FTqtIOJ3OLhcJTTbbwR2Hn5jeoyvsT9mM+oMXzmTF6NtgATmg+xLhiB3irwSol90fsRXTJb1Rj5oZ6JFQ4cuOaA6N12TkqU0NUs4iba0p+amOYk4DLQtmOs74bSYyNPOBUBmTAQyY4XdWgH4uFC4Z6VTSsnFxxSjzCHDu8RbA7LEYv481ObOXW0QJROsFZGFfrw2QG2uyHXnYNTlUUbhSYM19Cy9ZlNdZXrAiwJ1pQMDAtpyo4bgN9yoJ/S70l2JvUuY0AvkRMuf899Zwg5WlIaLIA1zIL/cOoYkVwueGhpJeq/pwQuf/j1NDizJzCRbRTIrpIFCKxKo2yl49UnpI7ojRYSQ/aNNAIVa3XALvdah/AQxYY3PpXFiQywA5BUb/1MI8Qs1KyHcVTYqApyYsA2WepHLz1S4L0e/F4DGHQZhlQnJVlDq5OCOShnCzurZ811R4z3ELjafS0i4wZ2IA5qIIMNsiykcCGPF7fyoLPmS+51I3Hl3yK/MqRqvoy6Lk03ihCWWCCvKZ3bK8CLLUhcyY97NgwQ6nvpwokhLZAuvkzprB5Iaf2lAn+2rTuJ0DD2tG723B2zX2zi0EpYevpsxnLxbNXJKuLIOwMhGY1YaHQten8xEL15jDDUJaXFV29TyccreZ5P6taY4ed6kvffLhvlXoTi/ueDBckHKY6rjfMUK1Qwtvq4AuxWS4TvUO+OkD/RMYcAsw3M0jGBd9o7sHY01AI3eppEJAHb99VbpFWZGCXxhF37OFHXrkmsv3Mzp6LTRWrmg5a5Qu4bPMHkGRsCKipJSuZh/2c6i6xbYgTPpAC5ZbNqnsQy38n30WeXr31K1jZ9Yx7R8jQkCQIb/RVlaDu9OgkAVwaNfLrB3yueA4I2ZLK2VtdvHZJkC77mh1fru87qVG2tfj2YY2ZB94JlQAoRKSVbVoogIuMM7umGFVa67oLuCD71fqPajRJQBuHEzjp4JeYydHUP/xi47rh8mBOjVb66jbGQ4Xd2QE/zoeYPoWZdE2kdvdmf9bkzT7dH2oey0kgUT2Bp0pBQFmxuoapK3+r+C9Nxe1P82vyu8S44IuSAaBWUaTifrFp7KKn7gDUrELm5X0D43r/auxfDPLac+pPBabWIllzUMPfjSgDzQCXgJ9nf5BxnUC5Br227PQ2VyJg8vswPn29jLtFph8jiPbTxaYT0w45zFiUc0jY+ehvqgMHmNviaNb2nn8ZsLvrhnrmLAtLr9eqeU8F8Km5MMT86bD8gxvbeQAA7NavLqlo9ObaSgnmh0EzF3A+oEcul/KSAGPnM/oZrKQ1+zusFgNvyrJuAE2BMto0Ut01QAGZQrA28pdfEnXHZzd3SkzYVSctNEphst2LynhoX2DPtpV8hMFe623WfAsNvBNe7EWugzjDopa+rannhIqhBdTqQlxuXI6uvuiTPVonW5OtZlSm5JuRRB32WHl0YsxFiLr1rHD8OteTA6fslXoqf6M7QYSfJD/lVeYRByOSiuugb4zLfOKh3b+u1yvQs4K24wsoVFFfHspu78pBetFNdJqMYd/sXtNU2jKKfmj8aU14D5jRnGbE46MlgY9V9Yq0vRBcaM7PZ9R0Q1PeAw2JrltJ3C/aisMwmGhGJFuzJaQdwapi6HHklp0rXf/J+uIBdQ4XqGkhMurVruCtMafq35Xb/OKYSOf1teIiwNlNbT133x0xiTT8nyb7QNL3RoftWTc6pebn4qrT/DHMriTjP9EC0Qjdm0haWPeGpKTvSngCZtBCkw8QgYCfYPYn1hsxY/oGiKiNPQWT7+TGO1E4e+IB8E0JmH3OWpt0aQizgovNB3l/bn5mvnqljDxg99/rn8nHh+ixEk3o4MiOD1QOsMuNY0D2oNm1Oa4GYJVKwn7iaUFAfrPO2+yOydjJL42pBd764IoSk+srVk8kd28XNrWByiJnZtHxaJ8QAOTF30Z6jnsQrlQ2QYBbilvme3ncGijFe6n31OMMto/XPAyGYmjuUrpJ6hM1cksnVMFfXZPIx3lh4DamSk6wyMCAIthqh2LJ4hGBLtsfM7yVYBm/Ll7bqJXEI+IWM99DX8P3MG3Aow3RF+vxoFOzW7u4IVxzFyR6wOfrx+JAPCxlDZz9iI5bre/Z5F2fespp9+HQmMspoYPiu4ZZsidlzxZacAgTB35LqLhUbyYsfXaF7b5wVifxFrmo732ZC2mrKT18t9znjcbbHLIbcE5XDjq1TKnoTPjXG3mejhwXp+95Jqn+kyP32wSdwxnfFJH0GWM3Xbh4LdGaCxNRiNpj7zEuFCJYCE3pQRSpaA3FAO5i/+vx8kgmnhTfyDLBcbHD572dwbaKkPh8dw3WV+rgmArbBwyqLzftc9GT61YYKLbpbdcTEDVuOd2TNysY5yDi8f/4EKoeRvR2o5PgdyaXnTba4sEjSpVc0mp24+E5bHqoeVqd8Dwp4VfhZle36DS3pOCniCnpvufYLAbYoYGvguZtC7HaQcBNYChkKAKTnE2uiS2jLsutXmnRv/O8DTNilNBdZnq5UIE9jdrRlFP9TcGqyZyYfihTyMJtyYbixaLXe14mMunJSJ7CYTDA/TWH06Z0nqgMU2Zlv3PXOgGLwQSj8qusrIz1wUfRZAD/leEZNqGWjqOUdpK4eVrUDVuJMLxNqpKsX+g3Ro4G5iVLxPZ3A+cBhNXiiuAe8MIARY79jrIef5Kl0KzbNJak3BBC6Jua8/AThBMlk0m7K5YMaQw3Fqc6lMm3i2H5hV5J+hnYaV9toyKb3/Hr4dtgQ329AqdAkzKsV8T/CH08XPGdGAxY/09leIpoNu6Sp9GcKcLeXlywL4FsG1x2birhDiNgZbIgoaE04mrg7JwteMoewLUNvg0R3Cd0/7tRMr7F3XGbQAmnEoyHMM2SDjdNyPrxGPRiFpaO9/7XCZcIRqVedGhg83tpBJ8/mr4FEZlm6c5ygBWj03XusYZ0b/g+iLwxzVUijGHsp7oNX/CDktQOBrL+uF1qn0Zev7gmOD+Hd9kNoz1vWDpl+9K8/bPjhSgwCgaEnIlo7H1yQboIGDFU5xa3Eosc+/vn9Jya5ZH2I/y7MZnej41Q1QzWWKR4Tw3ZWGo6aKIAbAKDX9Q7dW2aHW/tWHpvT4MXZSUtcGtYgD7KsnVQTx/ZzLKP4m4+/J62vpA2o87X//O+oBVErFjIxZ2cVDgQr97EY5x1cGjCai/mbxme7EVNPvtTzfAaKXuXIIQ856HPx91etx6Ipod7RXyp6kKbzch6j4FvEZAat4FhUYMnkR6BHr5ICxbrmMhcQ+dRXm+jGBkCYcUUbwUlfHmQtIvv+mlWChRRJSW8T+hkiEECDcMZr6zBiRSDK2gdcZh+zcbcc81AKOmo6zoOy/CieCGhWf65UB4E4oS9vyjOkCKkeZBz51zA3mOy6UlhxvOmPhQPXg35hFUsPEcJYQPN9WJS9AAF2jKKkJwywVEGjW8ac21lQ6/SOqyOtgdUKQ2jOXddo6sdHElW/buu5hvtUl697t/EZrckk5I5V9OdIKU/hhSA7V83HIVdYfUXGZM6sMGB+trNo+VDmoEqjKT2gfaZDW7aOTFyvhfeacHdQEWzRWIthNCzD7Mn37hu9M74STq7CFtw9AjrlMshDA1utXHuZmEo2Pn/+KGEWfYgS++LmpZuUpzqi1tK8q+Kl6sQGGu7LAuZbFu7LVUOac8PkJm6sV+GcJri3cXiG40s6BNO52nGCEWZXaV7L68XoFPKijB7VBSTwBV+ZPV15rg2C8xia51xBubSRXZFI2xwVDIsHGLcOD3EH4MgrY857aAH4jFhVzNkl3SSNFj/VzCd8AnX1srInQnJE70tDuRt3a68lay1PlOLcB/1v+gpoO+KbVavV632v8N7mhaKJtXC5TRHjsmNf/3YI1ALhhNbIK/2OWKvcqX8VznE6N9P3gKb8hVzOpflJgAVNn5I++X9FwbVrNeU3hcR78oaW4HQUQcWkx5WPCMZTX41w7G1do+b5IkMwTimP0r+SdYB4KeN5f8s3a00PB64PAYkiEx/ycSYO2F0ItRjXmYgdvLYjr8DHQdzIvxoavLzym63CaZi95HESMc3bfYK8TZILA4qBxyUW/1QT3qf+Xb7gCui8IjgOqs2BxO0Ynl/2TB/xTwKMa5BbeYOEfmKvgMD8C3Ec34aW/U5xj0g2gJsVUuqYIRgSkSXNmUYXAEVg3DCLIsF+kyrKeFVlUHVosSYmVmuXUm5ir5ER0n1cqtF97e846Xn5/Zsgla43FLcFCd5awyBNXB9u636YC8rPkhS4YJd5XTT91FFkn29BMRA7Z5LqxOwSpd30n+cE/CaA2DK3wXvwv+5GVLvDXKpOBT/rT9dE5945dURdruLQPkL7/TbJPYb/64oX7ZVbyp0xGRdr0Q6FIycdzJFmAAMoNCibTQQwc+G8H1t07I9vgkbLC/SSJ9W0S590JyHDpsghyPgZ1qHAkWAmYXNIMJLF9+BThrmMz0DqNstNWV9PFJgtnQAIaVf0PWrECb3kUAQAeTVwARu8kTkT9rTb7GSt9oPf63GUCwL+lfkba589zM1MMJzeVSURNcMNTfYTHMB3TfmeMuOGUUe5VgloZ+dp35K2QGyxQKqEmRJZrjzcl9zPT70mCme47406EDJyDlXGNGcJ60a5R0zqxCMWIDACoMoYZ6c9uN8Ki0aM39U8GSDKPM+30gngTeY+/TjuGqfv6oS6ZPRCt7VpwMceliFQVX8BTF+UdhbSfrxHD22Y2u7ARp78bBwZQDDHMYV6WXBuzsyldHngORjbgHI6jU17GriDAIjNudiVqh+QS87wMO4bgwgmaAySD17ZWX3b713ZjzBraj1tTafCeI7rx618Q+NhVDyhxjFKMJN62D+1OP+XB3qgCWV2ojWMUiZWjBvxu7kkQmhhFiwrpH2tBfjpuIlgb/ZyrJ8TnH/wdQOw8rIdAkLcKQ17ER5c3acY2WK0Nqcys/6AshYTCMCCW8YB5BFOGZiKHiNvBWQh++aMHSmsNrViRoE2D9h/8fVSmL9enYaOf7kq73UxrDJdTDwsc1OwtYSq+5LJzf8DTnfjEPULs7w4ih+1cssTDlhppXXe+8Dl4F4R9lnCXSyzZw/Y1/+gb4RLrtTj6LLJzLqAXCeBc1zQIbCQeEEQE/VqkllYTnyN3igkHGEjpuuoIlOjYxjKyma/XKCV5IsnjLfDrTPwLeF8oifTC5MW24N1oncDT/7urOFEeKeXkpy0uIPhkQ5wNw8kOOdwgTwL6rM218fSHkjwOP18BkVKBAsKv8Aaexl51yC20ejeP3V1caZb+IhZQtvouKewWLi/ccHTlrwpMLV74LuhfnLzWXoJG6XvbzYSN7UB1fSR6NW9TJVG5F/oKSxTamv18AhWdbXK/PLhdqXecRDqQOMnqrunFIQQKNg+lzZon9icTcwvgAJDV+Im3Id28nwXjNRf3cflLI7v2ny0TpOPZD8xjgH2qlJ2/PlHihWGzfZyuinnQFAyOY549jhta5PWr7VqJk0yK45FgSryEzqOnPb7fx3X9aoAQvlUhLRqMHJqlMCFTnOfEwQPp5on4iq51dv2LGFJTlIu6/+rNof4CnNDvJ2sDkrQ4Ay6W3DNilvn/Kfb0hl56oEpoAvXKQiQQJhcIL7J7uAU5iDieknr20ErhR7fVnYFVb/WQyUYOG6kTaM3o6q/LRQqW7t4+cJib+Q0vDiOOqJJ56paYWQ/6VnMMh/2cWVnzxvDyHlJ9yo2LAAZnvGloijE7YlsFvHpGAAitqSvbUTwSfdrm9X98mhcgv+MabMhVzE8FI7GDouJMcr/EC7K8Qx6VR71M36KJQYCkhK4wU35O2ITGhGMGZzD5lCrOaXszEFkBZ98G9ePqfC6Orv36JQFGWYeLH1az06eA5o/hUscQwwiO4vKdHe61PmJg3tdL1os6W/otqbBhU2vbgwI3TYPsJypHyRs0pkjA4zZoLAHuOjtqXpvUFEoZ3bT7cutvywXMFNye6GpzLJL7iiMqZDYH4FFpjjHBiKsHgsenYP//r0+7w+owC4UAnKgO3D9uE0TdJA2QuIx40ftUqcdN0jIDSubNrM2+dUgqCIVsRFkzkXpxIXNEMkAzaAeUPN3Mh/JzP5ACxNl1VE/CsgyJHB9XIAM3UMtAdwB+El7hAwtMxR7Qda1lfcCRVcpsevlDB3S8gu8Pp8ysXi30zqLGvZrxBtWvn8N6Zfr0xDiUmAvbwKR2vVCyqdyqobZdc0b1zUEGMiCLALhs1ce2eGsr/XtoVcIZ28QH/f+KbyJKXlbyhBfnuRhKvF7RYRRVraYm9gyI/qQ6dAXIRFng0IoKLRebfeQ3r3Pu81jfc+xdZzyF3in49Pqain45WnLjq7P24gqXRPC/jWQYJMGADVfMCf7v/hE0W8y0dkVdRZFSHfMnM5RdPc/dUwUDBsMOpxiw6jnBPWcmBj093sabVdyOwE1qI//9tQL2g7YFoxVYdyzwMf2Cxgyhz8Iyw78dG+xN5huAhm4SjCATjjzDYGWweNaUYhug/4rgtMI4/j/ICeFPJoDh+EyUKOEtbzJ8sWo0982akxaQbq4d+AMvgZWgUUBQomoLEpmg1tzMBqMo2DShIk1ZjQ4olscTAHbLZWdqGzXCrCp9MEBYf9/DzVSY1yAeUweap8X6/7vJhd2oTmuS9Ypp5xSgTzclLbYC6l+k1ZvLqBftd623U9255y5fUFiErC9fELDIcfPuDkpd326f3qtupY7hqEgXM5SmlUj7ofgHvbAT8Cgcqg18hhNrPlsvgFokPhsLfP+1OFLSziP9PzywDIXX/zrKcoxj9S7UCCE1BudahN4XcFLTbWrx5bkc997fIAqDgXcJYHZtKQrLyxrZKhBYZelQRmAPwJtyY9dHYrTiJL029I7Ym0YFQl6fK7aM42V8LnpMpFIV9sXNhQZLlHdiQftpEzQNvkwoFnAC91HeJftYmcirJIe4HGllPhwX4UmcZi4lAV5vtT4GbJebBLw6NQMuG2RE3vkghtgmZeXX0kVP0B+5oO0v36lhB0z+HjnIGKGGxGkVeohPyNaRfCAB/bPfKwm6YAm0PolLlDNVv/JdZJTlUS1McU9F17A3JUOFRpr3lyzHTi0Byb0iU/y+m2ThdF6tbXD5Z3uCo1ckvitBfMgGCgEKp7oX6kvgUlc9zZ0kszOC2rBmzkGYj7uokeEXA6Unj38gpXKT5MAXwoD70L5NLa4odWkfXqq70ncQrdiJOsaPqRdwSkvgem2l3skRUmyWYaubK+GCyKBVKxExXrshW4YL8Nuqs1YNGjvRfAgRkGY7AythOBA6VQjkhKDY1VC+C4RtlXjh5lhu7scqD/m55RbmEVWszN6Vwf0YNR4XEAiQrQRikR94RrCWoKH1a4W2cLy7y4uJPBlh8PGxNGq647wLdLBAzmg9JnOxYl2EdvAtuZ8K+bi5csrxw6P+ZX5p3n3O4k9SvatHp1Mq52lWnDuUeBiMMrKdKv0hs0JYb3ncO9TKDL+5u3zyK6HYWpfPZUj4GufOb9aXabe5bI6GGVDukWfRDFtoV0nO/gxAHO/CPtjpqA7RGO3ql3NaAnzm8a/khVhLXsbxpym1X45GCUlcmx3pCsto3YodrW8c02FdU4IwGqm2hkJnsygiST/kKxXCvtGMkzXFmeA/0cwRdIut/LtNnqpvYVG/1N4UPG8QGv2HKBpUVCthhjJvacz3A36Ivl0+f86tOgxNVcUQFkOls+C0yp8s4DAjmbidJ4HQmTwRJLmWKhmEXY3/O3RR+3WSFQOiD9kvo7uXEi2PkcEqkFX8rDC9qm06RjalZ84ITBZsGuMwAO0EGMmp022XheUh/KBXyi78xLjfi0sU2vDHW1nxC40fNrSVWSNQkIcnC1XE0EnhrYvLZ3N7sKMVRvooCL/9PSjU65dDymF6opBK5BfX+KA69SHZVpY6RSZOQJlh35J3OIPyU+8gvfT+nsTQYYXUnDPVfEMhDAYIY7a2z4XbUgjZM9hnCan7uX3Aes6Vve542O8VF3Jsy8zyhzckH0OlMpmcjmV//zsp7UiFKTdPtJZDDP7JE/qpALBApafDJ0Gc6kN8dUKux2k7RNBxuxIM7wuNALwgWd2pbkt6nlWRAfSfubQka1E2a0Kdc8QvZ8HpJlVrCVxX0K/uvfObgXEx94DoQsaVHjh8eb2OD76u33rFUO67Iu2K/MBnpUIaID0exixrtW9VVl5o/Ex9aCxmA7ImE1Lq7WHX6cEQC8MK5oR6FL7/hNgKM7WcEaeXkI4P7+GNKM1Q0Q1B9mqSlQemuIylX/rFSEToRXBh6fS2aHvLmJRI8XymSFfSSlzOiC/OlwXP4WcremAX0TmzitGgdb99ryaxKASbisCOA7fjUxSCgEIi5h9rBUgkDmBf9T0p6RBF69ig0KVmHdAogj/z0/kgwMZFdePvptTdXOqAIge3YfI8CvRc1vcmuKF5h/lOREQed6wPCUKNhqKejo8V7Xsd4zxmEyuOFR7TE0R/NflBU23R6EFCXOlor6x0gm3ifDv4WeVe7A6bxNnCzOtO7MIpLFYcUBqI1wFAD70Vs3kxgGx9OBoKbvPoGuXnpuQKBZAOnvaKCuHtpTbg3eERE264j5Sz+vKfBHVNLDvntzjq3XI5RgFW4o8mFFAkM813lcMd3JIJwJDRlKOZmA0S8xr0gwV4G3AkNcoaPtCS4xWXg64S0cHrN9sMSyUS2/wru5alM6YNpMV33BRCsXWjykcwLI0UfQiruPHSntfhV0smZb35EM3/pXS2H5mBa/b0ZcnJ/3yOptuDkl0SJcRK7l8vAzndbtgOjJuD6NjFa4msEme2OkxGtUPEGAhnCnRdfQq/Qvw9g/Wy8fB8j1+RY/dg5HGmNy+PQo2cEt7JN+g956ghC4nhirhIEtE1LdIkqfyHve/NdG99HWw6ZzAp9RLJ+CM6pja0QALA52+hDdGuMr0BJzRaA/Ui5nciGruEK6nlKLIfcZsc0tDDh0YTlSHNAkY1Qk9X2gU6PkxvfUXYBZ1fgROHatexspkksaHDtLNeWtSatab18JUpzirWHKYjTjGfiVw4lLREO6jVjUwMnY+3QMqcD7aOTywX6DvYwq8Za0FXecesRzCL2i4j2qADJmeFe8x4av7kJlflz/o091fxV8XqgoWRBGTTuQGLWyB6hqOCTpgwRvlhXmC932HYAGWwnC4OIGkj4x7Wtgw6AYMLDzrPN9pNuDPnRUHVlJgpqtEHujXjGWpufiUcbKA2qOItr21X084PJY4Utbb858ANoYsRBYuELFeDe8C9qAPdxVUlgNW/Jjgm3SuPm+pnOKkOvJOBl9loTIQLtvDm/2YqxR5w6i0rbVKEAA9P+fYiq83S85GrbNEct3QXuD95QU3T2pzPijP/S5vLu/X0LmKldE34Ch4m8HgAM9/h/lIQZJN5ThR3tFpWdMCXT3rWpEuE5EZWE7UsOrDNsqUS4IiSzBn+NIHfrfYhqz9bvvuEsIrr7v0mn/FeopjuTUXj0Oe2Fb+Qt89nkO29jWQ57+4pk3bZu12/mrDOpM2gwxaIdK4u93s3AAFekWJZG1fbr+BcS29dcE7ATyNTPqZG51ZKxGren5ZI3iybvHCW89DgmTLYmCB5nMAUUBMv+H1iaUrDhN7rXqNlfVniHuj2OUD0iWWgM/n0Sr56ahbB1RLTscKha6ZfaF9jSx0Dlxly4d4kDGNSh0mVvM+FuLp4FcaC5WjTBNA9QjdcJBLuVdKGfMgGP+xjGjBaCtngblcPI28LHtTofANoeuekRpe+66FBV1VMdGesYoQL9x5Yl/zV3E7JCh6Ob1RIG/wBW/FMMXtQEf+saDjikVxmPw0or7vtLixF+m59Zg1n62v+Wwd5gfGNxl0TpX4OLtl7Uh0Wh9Zwca2a2YM8vdYQrFhxdXD2fQsKlpHGtHPOOiM8Tj8y55qtiRpNS2gbf4JBkpgxz06hc/Y0xZhARKM7LZ3f1zmmL+hs827uiYscNnox4EWLaay/64pfi1+lr7H0NgRfRJR2F0pe8keR8yBhOn9y72ap9NVuYbMvX1iYh3hN7DSZ1KFcGLM8XNCidR2T2DTTQIJiOvzS3bhoRGkwiiykmYdfvHH5M+gsBhZCJHkmOgCaEBjbsUF+DlL2NvxzbD2q9O2n4lpQjlsffz0eNffzb2jXIOA2Ex6wzrDS2ybREuHCRe4m5ooTgNgyhjGltzGWMqIXy2dD0aAtl+EAtzwyS/m5c+AkLXzxh4XV2kGMitKFs/Aaic5yoPxJF5mLowWobwlxw1TI5Olt0RnIhHvsmNwKVIVsRpfNEvhFMjlKgUry2lCghWaigRsO0+1uIU/qi1OZXh1Qe7kWLKOEaK/WyH36Ebw/g0prCQmcwxk7Oz3/4P7ksNnDD7pyw7y8AhRdhx4QMHRwJmmiGiHt9os5Xw9Eeoi2/wKkAu1aN7QQf5iVhR79yUnB/jdSB+mvmU0sjhdvWAg2g4gSvrlMEEmx+lQSyEtOBS6yKzoCDWut3ZyNFBE19LRFjU3YvG3LPXJhkiHWbCsKgTn9S7LEmucS5owJ7XI5nLGf9SdQFhYJfHCVv4/+0irdsFLwT5BqIDSXJ9l4tt41m361/ES2OSZ/uDYhzM0tw/ngcVODYLDDHYqZUaTPdU7z1DacnXvFWoPoaup9saP9iLXr3QMCQAH3BLxbB3HTNe6BMSSOzdoXwJOKQ2Dcv+c7YP9b2wMF5N5BAu925VavIQKPiHgJg/5+MJfFXHe95Rn8bYojgs2+xBRisD376o5LtVKPZ67lWkJo1Hj7fGOdu/cOnwhy9VkGf1Xn3B05xV8zBcqUiRejLW2LOVtu0jb/Vde9P90FGsdbFVv6yEYyOm4TnVlLaufuOn8wJwtbJBesfqex7oQ20gPhMb8VbyQu7dfsr8Ac8rS4XnFzq2vI6UeR8E7SZZ+kyZS8Uat3OqcJplnhluYjoaBQO1Z3Nj60X5ROmCjVw7D9Rp95PDepx5JBxPaYRv9fU1PtBEVzcZg4odj6zEm5Hod6AFMYB9PMbh0yWm1Cg125ckzngDU/6el16nQrw0b/uD0sM5vGnj76vJyiqTcBWbBKPpayqS0xiiajTKat9jH2k3DxjGqHkWoL3tyjGOvEyrPB8fuFp934O5aY6pKlAxwFN2w/X5bf/rwbgA+eFmi6ECSQGUHkGcDPOhnuME1yMXb5CZR15utHJhd56Buxt9tMNrdQKtB93YDp9HD1JXTsMju8p6puSJEAWly4V66G/WoepW+G8K2WYXVydI1IOBBiRYn1CWrLD09+1/8V0JfvL01f7lXjh/+o86Jlom7pY4m4TSJ085EEGmFdreRw8jQOMMMv0FLW1vEqXN5DRmwuexJxM6mVkd5JtxIUFmIFVPCboe6vxVEO4VOZHahHj+EDjfEyb3RT9dmRygB2lKtZhO15JJKsWY0wrAiH5IUfCdd5zfSS/jLVD/ElZcC4e6puKDhBNwr8SpxwQ0IAZkX96mSdGGCE0B9RU6jvOy0K1h0sK8poP9ET7SmZ0AEnHrgMJSpsY1rR2wmGD2hNpnm5utMdFnNHte0qBOMn1HeyLY5UFWVDAetF6deKYyrjITTzu7RbgTWNgvyzkwoDgzevVzvseE88oSS9kzgA01PNM7ahKYjCRAwXYb0esHokTUsSPwu/SclMP4YvKPxuQTtJiXD1u9XMIxUAajFRzRnmqqvp6jG+JGwK8n67O1xla38JZ0yTeLB/MSHcl68AEL18m8FLjVkd1vyhiwNq4kgQDHTgzU/15d2TSkVOGeRW1kZ4xyx/j+efGExWiAmN2kG8mKHXxCyjdtG1aE+xyCnV8zcxpvJbHDn+TsjlS9BVMM3Wvgeojl2ShsBQa22QsYHdsO4caoiZe//H0bWQBU70WNQflQ0+H1IgoJLfLegIenq+xbyM78uDmRevL04S4h1yNwzISjTdB6D6qRpT/ybKJqUcBfc2fMdfbWVQrtC6ZAX1+WNKDcRkwKAaKR1zAunM3pRQEuxAlTD9YF/JGZV3h9j9yb5NOc+IM1WCl540e38qS5Q4X1WruHMcv7X7szD4sv4rsrmY9WGeqU8tvNcC1qKfugpxITsbokYQl007lOZ+kpb6xPf46TEouKNAXpG1Ir7bCRFqbFulFQfkCYB3XK0NpnGkjDF4CJAdzLEcRCgQsP8wa0wZy04+PZ5oQZRSa16YnwmOv3lWDM1oPvhP89EzVc2eaBMyj7aNBm3a9qTlYUjujn/PWzU53WCB1NTmbFcrRDkZ1KBG93LPSt1dyWXvyFukRdbOfb+FQ33MT3Ijv35iGhbUJgWUR+V38NWdi0e8HhNErzxUTGg5uqk07Q3KAixRgDTfSJvx+1bw4VlKDXSel5JF0oYWZcFpu0MNraC7qC5K7hzTYRqqODu7SwgMKca7xlVe2rFNZNZAS+t1r3H63plfhVPqx+87YTB63gOHRfl1nuMUSJCCoAbVdijfx7eIrHq7c4mzkm7tu16QeQroyAOnoqwAUl/uKhYXvpbdi3e0DGeCdkVPUCzVxZhn7X50qPBmGMKZn+xDSXZQGSF2+65e/xJ9Ala2dtgAsxyXzoFSvB6kcco1E//F0JuRUIphFyZ4YzA+IgJI75+x4opZqhkpVbOKmFMTcKTBnpc+04i6nRV1H2CfxA3EyO434mCPniOEgKIGMxmnP42d4vhFbZnFDnxnY5fo3tjpYRAkfivwayUvovx9kLDQev4Zxyazrxpm2xD4dLurr+3hx/T1FtF7J+4agPW39CKQtyVaIeKD05xPZ9/q9UQGd8KaU+WF153scWMr1tITCFF9MHkrVAEm5clfcdza889zCiGkigbuqQjwxP/Zjy68+a2EwuQaFi0HkFgrRvtxtF5zE+MmhqaJlUhi9jHry18J4pRGWgkJ72qb23NAPy5WmXSuzmxJc8kkp5MLyzH+xlyW4R+BjepNglOCFmUCNPqWjqYlpmvAPWSOyxLnEPaRw/a9dlFu1EmosSe+Zhj8PDy/S0JVjZJhD+Sts5v9jnhxLp3RDaMPg/AMjjJoAQhA7ENe1AmK4VEXxhLS3uMDRUEW8tOBzTnCRn1MVj7ReNr+6EVZSUlhJGOtWSoim9/EIqE7eUnNSUES3ous3ppGUY3LVwF9Ywgtk+/dBDH+Pa23Fm86T/j5o6NuVn7RJvcxFyC0mnMXUQT9T17dG7Vl+iTfqXS17Mbr7PPUj7W/iMZYa+qcpq+m4sgdqKXWvFoGrX5SsqUlXscBosuaNrY4DG6w2Cs+iFeBW0Aw2QRvyh4+UJiKcJQ48M4cnA0B9dylJWKgr+vwJFAU+kfuXyAzdiTpE4HzfmmKuN6zDSuFjsXU3wzw3gvKo3mNuiosa14zGGOdJsEU1D3OmCdasG33JtvnZSttttvx7HuuAcedgUKhPVjT/L4FBhlmmPLkFnRy7xZga5Y9LSbYB6O9ZaODr6IIKuBJhamYhG2dJpMW3Pn2GkPNxN3/UEMOnpHzYOjStSIA501ZRdz7pyFC6s8V8HS+4jTO1c6lGaNeb9lsbpVWX7jXMK8Ux3JeJV70/ylykFexcvZbtpx1NWGFQ64brO3GgU3mVGSKPVCeasCohXvnd4cmP3FgVGFZi+GFze+kMDRD9PWY8VsYl3ScnsHWI4FETLXSW6OQXT8nPMsDELwSiwJ89OrYhplHdKQcBwBLbYet/DkWJs4TlPZsIQreoS2hKz5WNIwa/nU42ZHxpTMpFoFWqLGKXvYA9NCL0xEaSBZzcuTK2LFEJAIsuMhmWIH8eCZb5CfOQfqt564eEb1/vYRGGECqNmmPTnaM/s0ra0VRBTbE/FmlIe7RVoLtyYhqGI4HAuMoxWx0dFvteObaxo2VC4NufyoZXSUKtbrcVC9aP3aCkD6aBZ+PPUmRV7rlFysPjc9zCxpcSeQuqFJ9ZuX/160XROXm9jFWBKFU7CJWH4f+M4/OpBIIIv++kE99R2hXKjN7o2rTXzb/oCvTZbm07NTWaIdXDZJiWcglTmbw3ZDOM5gc1OroyexufL48C+Jrn1njfZXXmZg3zkRdYPz1qWkz6C/zM04h6f/oc4FZpvJSROKhUx2z4joqjmsoMgSKOu40VrHPxikCJZRYQkeaiP4A3fD3GAds16vHED1bHibpzsMtlDnA6xdqAny78PJnkSxuidICbxINPDfUo4BbJzjAbiuKz/24DIVkIE2dqPIGsUGU04YqTI8c5TtYXNja6RRXF0RkSwaKIKUkPUrllAXjaTt+zYccql8/RZq34JEDuokigkUswbf7pPeooihotMwG79uc0iCDjHrRlrywqFNsR+xR/nhp/hQ6DZgeCgOn0gHRIc3mYAhZhAWQTn5SuphMAm1xk2GBXQbBSJOPVlfDCXAGICkpEHVupxRVs2nh3+wHxPyC9xUMGrPxJvaWVAo/vfUyyrlr2OvUU6apnr1eNp4DTQql4Y7h8PNDU6bKh552t7IjwAGgEohbtjOY/Z8UZf+sVOVrA+nAzbzEbT1t8V6JaRnFtA9nmZgm05mhLIaWOrMMxIP8rMsP6qvuqj/JhL9YwF1hjixPpbMu1OU+DgguCUHDdWGVo9biuBeOM2qst9ba1jED5vg1zquH6HBZx7/EskjnzYzrFnMx89WAQYaSDY6J8FQ9TtWM80b6L0KYUU5QgEBd7P0xniIlOhuSAyHqESBcszmU9Qoy2CMkiZjQ8pSFCZZ3CJKXUmYV3xdvXmnGAU3SVq+28yYRKKS9Y4dJCg0aJt2+2RgOROCP3IZGedU9geu+kv+82a6YfIp6KagkCUXKNXiCkSdhAscc9RR7T7Jsz94OSezRAgWjV6dX4kFFf8sagcjpx0bsPxbuL1dR9nzORfFXgC15mZoirANcTp10TDcFrcakZ7VT4fsZOON7Dzn1IFWHsV2HSRhfKyBI9+2pbIUn8WmQHzBqdr2+3JOHYl4GdPzvRaR7RmMzyejUSjwe1kJhtLQkaIYQZeHpyAgzSVAgDE3Q9O7xtufc1v/k/dDLOQegRSMd2VabjqxJNobfpAgwbIt1IS1mOJV42S1nSz8cBbQ4vI2zKA1eOCROoVNglZ17ur8KwSj6GXzxBJ0IurGrJ/hTHmlnRr4ocrEpPb+fV+FnYIgncZLhlC3p5laZpFPcYmHL2MktZvjDoYxyV+6rZW+bL4eeaMrrhrrPumrHaHuDu1f0XMdElTAy9FO4oL1mX/pL2HIiSEe9WEgcQDS35VtJFONAvkZbp1W6TAXdEmDlzYPZIM9/Y6OgSrP1BbX6tDd0c3EXVbdQtpx0qxsCgsdryt8nCDd0G3L9pax+xFtQuFANKvAoe0hRTa2d6PlURagy4QCiclayyQdEMQob9fP+SM3AeAKdhdQupxrNEEfQ+MY0v9Flw7fhgcNKJ/S5TWnhDNuctPmA0nCrCPzjYS0b09haugmBu6Ev45MuDVeK8Gu+vbgUhnMXNGxqljcXEG2i3qbKPXKk4qV+HRuYRVkNGJEJ+18BX4Os1b2R0A388oHNlX++z8uTkahglrtGgDRAY8sYCahM+SpuEoazJJdqbuupqVwzCqcIa5+AHX6ulnB8fySvgovVOoTTw7LSk1dhgApTWmRZMIAEU1m9XeAEzex3xviM/9ApUeNGSu90qfb4tvtN+ag5/Kp/a/uip5O2hdLQRVdRydiRbxkFYekTaeOj/SMOl98vhY5GxIMHBShHGPtydAKXERNE2AzT/YrhIXjSy+MwUgPDoEU6swjgYn3Yp3ScTnqlQe9K2A65lYBRyoRt2c5DqMESfJ6hwAVtovICytx8qg4Qp5kSfSeGFujYAvlzxpW1HwBA+0TAUC+d10BzhelNbyogGZ8N2UO53c4yM1H9pgpDIFFQ65SJx1wx9ChNcl3VEbElTmIdXbSSBv2Mg573dhOiI+mPJxzxFkH6svmV/jxqa2SorugxN73gJ2V8gnIqq6WixYFPAxRQSDIOVJfWnTr2mQIa9A/0HLh7vH1BFGhwr6LQiWWQ3nDqonqZxk16uYfCJl6uO0t7T57oaLFrlajpYNaSL9VCN2rLI8lBkPIfzNx7XyiA1L9H3iv2eIjwXMA7WHJYdq8i60Xepu9FpTox7RlXPjkH5td9hpYHT3Z6yG7CeBGrgimiiAHEO+OYsQmEArFUuVScECG+9R00CinDCdkrZO334AccVrXuCm97Y51inRtfFsE3l8sqKP5XrnqqaPeqSpwn27wIzzDwm+vD85xaM3316Utj6Wtpn/qEGpM65Aka1hmhM9sgPfEf2JZ+ii89xjOIgolR6BeCwgDIvjxJJul3vj2wmoZRQHP1KFCvpWQfmYX9y9JHLZVzlJI2mDbOcD7c/M7p8WsvhVbD9W8/WhthH/Q6r7QspIMpoL/55wzsnbzQNVg/GkD1s6rnbNLIcBcnbIvcFfqK8Zh4w+VCwNMxD0/x159cA7l/q74A3e71XDEfL4tqmojWaNrEVjbReW4teQ+SWOo2eExCF5OC5TZJDLK7mN4PSxbGEQRIuQ84VsBgNIcQaGQ881oD13KESNoCwISMJ8Sv4pqMonavWKw4el82euZS3L4t0B2dURggSFSRAZR8Ud9OgZMoYTSo4rp9pKHhddG/FxHTOFP6O5qiXdTOdrpdTXAgQSw6IaALkE9Xsn/iClIyL4ZDRdzluWVirOl9vIrny2/LNna7c11dLLV2PYlMc3qmuDgslU3UbW5OpLAntPBTj0CwP20aIwKL6sYEIaw1JsmrTFLDwp9lwcefeb3wlSgrbqoRqjLyQlhhnGdLSnnVdQmA6jV0ERsylWvik+9ULsYbLanTYVBTcB5LipFIoXP1ThihDaZIYhRkxBwRJX+LLunFc563BWTEP5Xdw0MIXOr9tCCVkoeorKT8gkigyDaaLKMA+T6Fyw1J+KFCrtIUYcp9nUWFauqos1nY6u/HES2Wpkgn62LstQSmg92iu2l3LDpCFbiQSb3f2yULa7xI6xRCPVNmi0NsfgHVJDmaAt9oPdlfIp5jmoMKSXyHDSfHs3JySeNt7DrP6i7vDr3+f+4tOCJ087ZMkOf984CgbQtmtpHKiTRTF/lweH2fshD1ZkJF1f3Zy5GJFYpzDBp/uP7TaxWHK/cA14/z/dZze85TLlTksq0oygIU0LhK6AkFPCtG+u1f71OE+ELPYoBRHqGH8iqbryUwH0Vh8p6LX9nrWJLL1ZngcZ9tAoy6WKYWAI+9vH+R9h6BvVfGk5E3QaUqtXXDx1AHlTE9uvS5fLza4AtiCLF4LuAa/tyJd69pz2zReBrPyM+8BiVp9ZLiT3yKfE4m7Ozsd6iRC2odm+aL+IJNvyvX0BS8UzH6Wf8tfRJYEg2kFsfHVsSNxDnFeOLi8FxeqxVCfWH2q0ZO2Y5g2piX4msntejIpATILiif7zR66gT3X7PdlJGk6lxmQz4reiJr+K13688vkMx9lCtNZ8GruR67C5Vu9vTFQj/SGSda8y5gQld5IiDBusbUWo4gsAnkwoZdKeMbEzoSJYNBceAbp/7BOr/fK7oW+iIP37VEjPAB0E8IFVAlxr3i5rH6jllFU6CVBEZbuAygvC2r9DKofxAOp6GDgo8qi8hcxo0j6FrED+hKmTl0Tpo88zajcXj8AEJaNah9qo8acGyZvR45HUonR6HpCrD0wRlLgGtAgdqlCX7rphD+uOm8XSmFYqJViBQcHfwkTLlpOF+RTg+TWZ3WFfn6Mrt5y2A9/+QG2+7CKM+xNmtcTI7qsmEZQZ8lvNWaT2wUAfdNMRJ/PnwNQRpuN0asAZowu3/UQ9WM291eu5EuLsrRPdDqye9zpQUrFOjN7j0yRzFr9B6zdcWJn+YIj0773x8bQO+0FevrY0B2P7CO1oDNIa0i5ym9xgRzCI3Noz6clAC00X1BHAHB+4oJQ7QNucONkEuGvn9LGieDhXWL110qZwMibcpgPOzFsbs5uuALGuCCQx1Vgs2Y68GkQr+O8IOZr1ZFbP1eJN9NTyJLjnH39UEmKUeD3IdTc4/7/0LQIG50b2BukdSNUM7bYYWS9ZX+L5Cn8PwHyK3I5vyLwAtLi7LOx/CKSf+Qd+rDeen9YwTSS8LXAdp1R1B2CM2GhFKRshm8eFJ/Z6jA50KZIqVGfcaPTIaLFTslhrPPNoFjlEvzXzGUWRBqvvg6HUxhAAoOHTK3Nfc+UWIahWbPFTbvEVSSogA/ui09dobqDqK8V91t6aIdNNYuyOExtG+ZDXd6jERHyaXlBazYwEHVUIEwowWwjaHTal7E2sIzPUEx+jtrc2yGjjzxLoicZT9tzv0Avu6sds34y9RFaozaTuIQ0Tn0bArwCvITrdq1ZvTU+Xm2CfdvoZBKqYRHQ2ILJDH5mxpIYAq6NnenHf3qV978ble6rEWcvqsRW+xDSwxPbMfkXIQqfVISqQvp2RZ/2U37u5guhlatyTgv4q4oDDLEjfwcEfY7PmEp2x1Me+LUy1Cmn2Dyvogy6tA5qGb+DtHRL0CDI6DQCQYYQa7/VbJEI8U6I/zd8uAQutgnc1IwJHv1x9TRYejQe3y+xDLvTN0FzxdH7vC/M5VqV+zJ1yI9nkmg0zdpLagrKRzCu3yKE37IiYcGMTC04XwbXAIoZRrqB7fhKkVQkfRaPU7yWxjgipzyX1ko0O/oXty0r0rqMeJz2kvT4GzZK0pd8jOnBPft80DvKu0xm6OCltwXy+HmHYvB7DFSm+OvKk3ZW2wRIXJ7xNA46f5vbocUW4gnqZfFovrKDNrED+FQ6gt0Qtz/VdgYsalTigSNDr8+GimR0uTVJGFNWVAOYziF+Joeun/53y7dcPvbNK9AedMkAE2D/9yCmOUtI5VgNoKO4LwVo7CyM4sQ9GIrLN/yrepSKSZi1/0QijpbNO91Hz4zfdhrahsg69QWM35FoJRn2YGbnCjczRRZbBe/kvtADXouOcNhUVVXaht6yfzcJnS3UVXhjd/kIgcPsDz2nPzVj/3eIu4RPHGVUpKXXrzvgacccoikj55Xw4pv8NWMPjCdRoJ+xWYeNA9ZQq6N2+qOPmcxvmhRavRnNoMtSOxuxUHQzqyba/20PTNS1HCQowNMgDQUKHmEzHsSTONdNUxgzy4vSMeOa/SwFQjQfw1lkKmXwPXawEcKlzjWqDL6kH8pM3DUmsBI+Na0Ecc7EbQ4vEtNX/Aea12URfcD8NvzzFMdCMB20oWbOHtNl2YkzKWEvWHd0xImf14fRppDHKmzC9s6ygccj24t0uhKNALSjG6MiewxymZetYsjDVITUlgUOMbBe6lIQ4TMOHHI0ezN/N6iNrykX3Eipi5csRO0PwLveFgF3K8O5WoSnAyI45H4OHHCUc2fQ9HydsC6pTSUd6DtLEuV14dJiOcOsO7QSXucbKToqu4s01RME8VvChkp/QNPD8ponPPqQlcgvZwSDayirC7j1T81G0ijq++3Gb8rfOmMF1Ou+173u/kemuiCjM8g6tQdeBtN2cekXYkYRQ504+ZyH3fTtYcGBjAQfwpV8Cpy9l0UkEhBSTNtSTN0iUt3IoBUZJ+q/HgX1fLr+Wkfp804yiZH9nYpM7T8GujnN/gqmoVEjAHKOXsWsF12SUYFdlIURacqT0KOZOwdzyJ4nSJTNUIJgRVoNXfZEJfBSLnpSCxyC+ha+rxzPDY0rwOteyjqtlaPtjcRGIbpqnIex2fZPH1oFzo4c0oKoEl2PcblQm0/yT6iCs2XqbR1QMhn6SMOx7Dkl1ZW9RO55U3jF7pt/34CuOxlO40HHGsASg7XYabs6r5rDM2VMQsqbu83i6yZVJ1i0qxNo6ZqDx7BhUdNWKUY7k9/sgFHIFTBm8+qhMEW5BRbcQdgMDvOppAG3/J0O8gtbQLBAUfkP1bOueToqPGfstvSkz/n8hhycgC+IDMZI5VNm+u8Lz8Whl6kNGzvzuibpl6NtLpa17V4uspMERhJ/0UEWLKjYITbTbowOMU0eGILNQd7tloDTIAyd845xeC2ZWlvlbyfyLMw7puChUwFDnaAVcGm/NeokJTh+VLZAri2pFnj32HGxYXyv9K0p/fpKfQ86uATawMw+LJJ4cl7ooTRn5tOBba/1VktB9qS32nnbrrtK3ZNPQ4l8ALJSJsn0t9rM8tLUURSJ4z0lBgArAQF/wG4x8Cmr/eHM9bgMQHBVPusAMwA3FNcQG/pdiE324OLWVzl/gI+/+nxTfImk1FDQyNF4tcNTHEyxdqG8R+tatika3BkEOlokreA+Q61u34NrqMi7//uovHRafkSD7uz34pjPIyuAabIB36iD821rTosLvOLKExoZlm3NpuDHg+V6aQlBBVjndf6m8Xi1iH1fcEY2Omo6rczqpDpTNKXnlmf6cO62moGyrUm8WNWtZ8RD8k4e8VzezX35YJV9nMh/y/u1op+/rjkX0xTFlXI4rbnq0MXO/mOi87KvrV4bI5PqkjIPq4JEYmWC6zc/21x7RnvdImj2eBCISSUbbkYrihvJnEt5lNxL+ocSTNxMAyhvT9CW9Z/EZV6iVH3PUGdgmYflgAqmo9NaE5pM0ZwC47D4g0/k7532G/T6ThxBhGA5UhIMq1GRp+aRS4TLB+KnY6Zs8931DZhuX4wm6pfSWErLysW8+teDnW6qTUqdAtd2bcx/AhGPFigyc3IdH+NH9713w/5ToPpnPzrybkQ+sCal8ttAOA4a/TlXOWxJljB666ZNSoWqKGWrZT1X9IO1tB+q2z2SCytIJ0G0qzXkos5Xj6O4Wj49Qfkbsqds7x8AOS/AJ667xnF3dR48NENXOYoVzmfBbBCywsOm1kGj3Z86Dno0bGesbb1Gz1UJjIFJnucAg5jhzzdUAcSznIo8C4qlYzQ9O9J+LVdLRXe1mvxBeMHDNuRAP+NOeMcPVP3+P+LLna6hlL399wV85HfhGsEffuydgHtiFlzQ8/6U3NnoyRrRQkUVHvH+mc5OmFanO8JdXTU4g15qyGudcgBqrTJ7xeS1J7mXuBSR4tnTlGkT9SSAMixIH0N/duWciCARY0OBnTYe5v6gIQFGe/5KXV5aEP5gOBN7mOWvwSWJbz5PTdE9CAzZO+V/OICPWs+uem5xGXa95/xsj3VY+slKCrMFCE63uJ3CyyqlkGkRHwY8aA3nUMUerfSHZUC5XDIicsHSEXZ/US7ZLokM8dn1wFXejEh8QqTX2sg0NPIQN0+yXnaCFFZ07DEUMtppG0SXQG6zjdhqOh3tVwDPu3OBtZTjLgNUJ8+HFdF2oTdFhIrBOOXg58COySfFp7aOykMnyvA8QWnBUr6y8MOfQn+iJz61nW4oTh2UNTzIw7MpKWXrAygLD26SwER66YBtRzXc8HRq5FIskofcnNAGZUcPjSZFukfoLjQZf6VEiD8EnQN0Yj/op/Zx8X7VKBuwJSjASrpAT1KhgeV80CRPj1AWjGXB4JmGfEmlQ8fz1vKribDp5fDoiXaAUjUyK8pUS3e0Rnhnor2GruR5VBMqG30seSK3s2SeFKyfEstSgP+ZlvMeBt5wo8FMZRJe3CcjZ+JOtZc0c4NGKHUSTqj/GaGVVevZvjzJt9n36CqVw3mtQVly1QmSd5dG05bQUwvdPhzueK8Zc2tham8nugxHsWSg4pMwy9ZoDAVuYFZ3qC2JPR4AhDi+J1HxdGzRk/mRdzs4WqUKpRLRK+u/x+jY/49QpiDI473+ZDGAZ6+8Us7jwRj+PX41mLezyb9WH50U5g4VFAGeuZbGwhQG5Z8JbUMJ6h7GeLDd4kyROu9X2tNKS03L8cagoFjB15lFKq0jOAks+nQJ+6O0VpOnvzNYo69X0dNZMsLEBgXJk/hPehq772wkPN6Xn5rdxayYB9iMMpwLB0TOPIWOZhl8L6bHhtsa+0gsR+KvVT/d3xOjEDWAmURro4xbt/5OBzRhJHfQqiELlhsoq8VFWRCgX4VkgEodemeHDwcoCPKYW25YWly06Q77wKhM0fcCLy4VFRZAJqsbKrMPhrUfjp4Mxhcf8vFXqsXF7DlQoEFzf7V7f/y7Q1SptU98W2EYeqpsEojeO0swbWA0sGcy/PE2yy1tPKuBgiHUsMrrehH/LU5mRkOacm8v0RNjd3kpwabzB9fTKuIWhUHJ9CHM6tRkJRHxITV/ALo55qfDb1UTXvA0giK+QnvYk7h6iNGEYAkOH4egECefelD/jkgoB5kkyt6Hz1elVoAhBNQmu4iuHGtl6su3lwRnm3cdoHpDZ28mgMDZQFnLmfIfwXg33q9F98fhP32nL8uxCD9b/pdCSalJLYkVYS9K+vQ9Mbqh2fg/zVG+7Cm3PN3vAEVK1zlU+NthssAjU1GVIANQH8PboSPKizF2bmOpaMkK7SLKbEEMzNYdB4T3+x+AHNYfOwH94pb4jWor9Y5C2Bsr+omA25P4wPUJ/axeRvhQvua6oc8f36EaJ+Aa0TTjSI0cNVzQcp6Z5aXNOboH/8pe71CRY4OhxH/pwaAEF33ZVS97UCPpSLO567xTZJEQhXdiXk0BGjNgNahcjWTX6XTn3pPQwyERi7owMzD2nfbZO5raH5x0fb4gBslw+ULN2eelgOPKJYl1c91drLxOf0GVX9TB9Z8x7ujDneRagq8yOQpfAKL/W9oJTA7XKJgDfM8sloE5SZ8XBzEdikxCmp4gxu9BYbiafXVNIuVqBNZf2+MZiR/0v53HCP95RLrAe9FWCBA8McOKXFYRUNu2jubo3Te3bhmwJmKvHt12MDgUQ7tUVfpAKQLbO+uWVi5hFTSRpeDFOr09y3NY17ldZAYixd0R3PjpeuHJ0MHDj79lylv4MWVQBn/3pdFUMeqs/R2uwmNpiEOAovG8+wGdTXcrNLAc9MSa35BK1AHrRq+B0BcHxvUOkEcnB21DOaIhox0k4ovN7gUSHAKCqIIsWTAleeBm9+q4A5of/d/gAAAAA==" />
          </div>
        </div>
      </section>

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
