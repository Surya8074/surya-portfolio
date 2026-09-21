import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, Check, Circle, GitBranch, ShieldCheck, Sparkles } from 'lucide-react';
import GenesisMacBook from './GenesisMacBook';

const A = '/surya-portfolio/genesis/';
const screens = {
  dashboard: A + 'Dashboard.webp',
  inputs: A + 'Input-Artifacts.webp',
  ai: A + 'AI-Configuration.webp',
  review: A + 'Review-Validate.webp',
  reports: A + 'Reports.webp',
};

const chapters = [
  ['context', 'CONTEXT'],
  ['problem', '01 / PROBLEM'],
  ['goals', '02 / GOALS'],
  ['users', '03 / USERS'],
  ['system', '04 / SYSTEM'],
];

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ChapterNav({ active }: { active: string }) {
  return (
    <nav className="v8-chapter-nav" aria-label="Case study chapters">
      {chapters.map(([id, label]) => (
        <a key={id} className={active === id ? 'is-active' : ''} href={'#' + id}>
          <span>{label.split(' / ')[0]}</span><b>{label.split(' / ')[1] || label}</b>
        </a>
      ))}
    </nav>
  );
}

function ProductAnatomy() {
  const nodes = [
    ['INPUTS', 'Repository', 'Requirements', 'Test data'],
    ['AI LAYER', 'Configure', 'Generate', 'Validate'],
    ['OUTPUTS', 'Tests', 'Execution', 'Reports'],
  ];
  return (
    <div className="v8-anatomy" aria-label="Genesis product anatomy">
      {nodes.map(([title, ...items], i) => (
        <React.Fragment key={title}>
          <motion.div
            className="v8-anatomy-group"
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          >
            <span>{title}</span>
            {items.map(item => <b key={item}>{item}</b>)}
          </motion.div>
          {i < 2 && <div className="v8-anatomy-arrow" aria-hidden="true">→</div>}
        </React.Fragment>
      ))}
    </div>
  );
}

function FragmentedWorkflow() {
  const [unified, setUnified] = useState(false);
  const fragments = [
    ['01', 'Requirements', 'context'],
    ['02', 'Configuration', 'setup'],
    ['03', 'Execution', 'status'],
    ['04', 'Reports', 'evidence'],
  ];
  return (
    <div className={'v8-fragmented ' + (unified ? 'is-unified' : '')}>
      <div className="v8-fragment-header">
        <span>{unified ? 'GENESIS PIPELINE' : 'BEFORE / FRAGMENTED FLOW'}</span>
        <button onClick={() => setUnified(v => !v)} aria-pressed={unified}>
          {unified ? 'Show fragmented' : 'Unify workflow'} <ArrowRight size={14} />
        </button>
      </div>
      <div className="v8-fragment-canvas">
        {fragments.map(([n, title, detail], i) => (
          <motion.div
            key={n}
            className="v8-fragment"
            animate={unified
              ? { x: i * 8, y: 0, rotate: 0, scale: 1 }
              : { x: [i * 16 - 24, i % 2 ? 28 : -18, i * 16 - 24], y: [0, -12, 0], rotate: [i % 2 ? 3 : -3, 0, i % 2 ? 3 : -3] }
            }
            transition={unified ? { type: 'spring', stiffness: 130, damping: 18 } : { duration: 5 + i * .3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span>{n}</span><strong>{title}</strong><small>{detail}</small>
          </motion.div>
        ))}
        <div className="v8-fragment-line" />
      </div>
    </div>
  );
}

const workflow = [
  ['01', 'Context', 'Bring requirements, repository context and test data into one working surface.', screens.inputs],
  ['02', 'Configure', 'Expose the controls needed to shape how Genesis should generate and execute.', screens.ai],
  ['03', 'Generate', 'Use AI to accelerate test creation without hiding the source of the decision.', screens.ai],
  ['04', 'Review', 'Make human validation an explicit gate before generated output reaches execution.', screens.review],
  ['05', 'Run', 'Move from approved intent to execution with clear state and feedback.', screens.dashboard],
  ['06', 'Report', 'Turn execution into evidence teams can use for release decisions.', screens.reports],
];

function WorkflowExplorer() {
  const [selected, setSelected] = useState(3);
  const item = workflow[selected];
  return (
    <div className="v8-workflow">
      <div className="v8-workflow-rail">
        {workflow.map(([n, label], i) => (
          <button key={n} className={selected === i ? 'is-selected' : ''} onClick={() => setSelected(i)} aria-pressed={selected === i}>
            <span>{n}</span><b>{label}</b><i />
          </button>
        ))}
      </div>
      <motion.div className="v8-workflow-stage" key={selected} initial={{ opacity: 0, x: 24, filter: 'blur(8px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} transition={{ duration: .55, ease: [0.22,1,.36,1] }}>
        <div className="v8-screen-frame">
          <div className="v8-screen-bar"><span /><span /><span /><small>GENESIS · {item[1].toUpperCase()}</small></div>
          <img src={item[3]} alt={'Genesis ' + item[1] + ' interface'} />
        </div>
        <div className="v8-workflow-copy">
          <span>STAGE {item[0]}</span>
          <h3>{item[1]}</h3>
          <p>{item[2]}</p>
          {selected === 3 && <div className="v8-trust-callout"><ShieldCheck size={17} /><span>Human review remains an explicit decision point.</span></div>}
        </div>
      </motion.div>
    </div>
  );
}

export default function GenesisV8() {
  const [active, setActive] = useState('context');
  const heroRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-1, 1], [2, -2]), { stiffness: 120, damping: 22 });
  const rotateY = useSpring(useTransform(pointerX, [-1, 1], [-2, 2]), { stiffness: 120, damping: 22 });

  useEffect(() => {
    const sections = chapters.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-28% 0px -55% 0px', threshold: [0, .2, .5, .8] });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handlePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set(((event.clientX - rect.left) / rect.width - .5) * 2);
    pointerY.set(((event.clientY - rect.top) / rect.height - .5) * 2);
  };

  const resetPointer = () => { pointerX.set(0); pointerY.set(0); };

  return (
    <main className="genesis-v8" onPointerMove={handlePointer} onPointerLeave={resetPointer}>
      <div className="v8-progress" />
      <ChapterNav active={active} />

      <section className="v8-hero" ref={heroRef}>
        <div className="v8-hero-noise" />
        <div className="v8-hero-grid">
          <div className="v8-hero-copy">
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }}>AI · TEST AUTOMATION · SAAS</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 28, letterSpacing: '.02em' }} animate={{ opacity: 1, y: 0, letterSpacing: '-.075em' }} transition={{ duration: 1, delay: .25, ease: [0.22,1,.36,1] }}>GENESIS</motion.h1>
            <motion.h2 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .42 }}>AI-powered test automation for modern QA teams.</motion.h2>
            <motion.p className="v8-hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .62 }}>I designed a guided workflow that accelerates testing while keeping human validation at the center of consequential decisions.</motion.p>
            <div className="v8-hero-meta"><span>PRODUCT / UI-UX DESIGN</span><span>ENTERPRISE QA SAAS</span><span>WEB · DESKTOP-FIRST</span></div>
          </div>
          <motion.div className="v8-hero-product" style={{ rotateX, rotateY }}>
            <GenesisMacBook />
          </motion.div>
        </div>
        <a className="v8-scroll-cue" href="#context"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
      </section>

      <section id="context" className="v8-section v8-context">
        <div className="v8-section-intro">
          <span>CONTEXT</span>
          <h2>From scattered QA work <em>to a controlled pipeline.</em></h2>
          <p>Genesis brings the inputs, AI-assisted decisions and operational evidence into one guided product system.</p>
        </div>
        <ProductAnatomy />
      </section>

      <section id="problem" className="v8-section v8-dark-section">
        <div className="v8-section-label"><span>01</span><b>THE PROBLEM</b></div>
        <div className="v8-title-row"><h2>The hard part wasn't generating tests. <em>It was making them trustworthy.</em></h2><p>QA teams assemble release confidence across requirements, code, data, execution and reports. The design opportunity was to unify that chain without turning Genesis into an engineering console.</p></div>
        <FragmentedWorkflow />
      </section>

      <section id="goals" className="v8-section">
        <div className="v8-section-label"><span>02</span><b>GOALS & SUCCESS CRITERIA</b></div>
        <div className="v8-title-row"><h2>Two goal sets.<br /><em>One interaction model.</em></h2><p>Speed for the people creating tests; visibility and control for the people accountable for release quality.</p></div>
        <div className="v8-goals">
          {[
            ['USER GOAL', 'Move from codebase to useful tests with less setup.', 'Developers need momentum while QA leads need confidence in AI-assisted decisions.'],
            ['BUSINESS GOAL', 'Make automated coverage part of the release process.', 'Genesis should support repeatable creation, execution and reporting—not a one-off generation moment.'],
            ['SUCCESS CRITERIA', 'Make the next decision obvious.', 'Every major surface should answer what happened, what needs attention and what the user can safely do next.'],
          ].map(([eyebrow, title, body], i) => (
            <Reveal key={eyebrow} delay={i * .07}><article className="v8-goal-card"><span>{eyebrow}</span><h3>{title}</h3><p>{body}</p><ArrowRight /></article></Reveal>
          ))}
        </div>
      </section>

      <section id="users" className="v8-section v8-user-section">
        <div className="v8-section-label"><span>03</span><b>USERS & MENTAL MODELS</b></div>
        <div className="v8-title-row"><h2>Different users.<br /><em>Shared operational picture.</em></h2><p>The system organizes information around the decisions users need to make—not around a collection of role-specific screens.</p></div>
        <div className="v8-users">
          {[
            [ShieldCheck, 'QA LEAD', 'What is safe to release?', 'Pass rate, coverage, issues and explicit review states.'],
            [Sparkles, 'DEVELOPER', 'What changed?', 'Project context, generated tests and actionable execution feedback.'],
            [GitBranch, 'DEVOPS', 'Is the system healthy?', 'Pipeline state and infrastructure signals separated from quality signals.'],
          ].map(([Icon, label, question, body], i) => {
            const C = Icon as React.ComponentType<{ size?: number }>;
            return <Reveal key={label as string} delay={i * .07}><article className="v8-user-card"><C size={20} /><span>{label as string}</span><h3>{question as string}</h3><p>{body as string}</p><i>↗</i></article></Reveal>;
          })}
        </div>
      </section>

      <section id="system" className="v8-section v8-system-section">
        <div className="v8-section-label"><span>04</span><b>THE SYSTEM / WORKFLOW</b></div>
        <div className="v8-title-row"><h2>One pipeline.<br /><em>Six decision points.</em></h2><p>Explore the workflow. Each stage pairs a real Genesis interface with the product question it is designed to answer.</p></div>
        <WorkflowExplorer />
      </section>

      <footer className="v8-footer">
        <div><span>GENESIS / V8 FOUNDATION</span><h2>Designed to make complex product thinking <em>visible.</em></h2></div>
        <a href="/surya-portfolio/">Back to portfolio <ArrowRight size={16} /></a>
      </footer>
    </main>
  );
}
