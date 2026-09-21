import React, { useEffect, useRef, useState } from 'react';
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
  ['exploration', '05 / EXPLORATION'],
  ['decisions', '06 / DECISIONS'],
  ['product', '07 / PRODUCT'],
  ['interaction', '08 / INTERACTION'],
  ['engineering', '09 / ENGINEERING'],
  ['outcome', '10 / OUTCOME'],
  ['reflection', '11 / REFLECTION'],
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
        <a key={id} className={active === id ? 'is-active' : ''} href={'#' + id} aria-current={active === id ? 'location' : undefined}>
          <span>{label.split(' / ')[0]}</span><b>{label.split(' / ')[1] || label}</b>
        </a>
      ))}
    </nav>
  );
}



function DesignTension() {
  const [trust, setTrust] = useState(52);
  return (
    <section className="v8-tension">
      <div className="v8-tension-copy">
        <span>DESIGN CHALLENGE</span>
        <h2>Speed without surrendering <em>trust.</em></h2>
        <p>AI can compress the work of creating tests. The interface still has to make intent, uncertainty and approval visible.</p>
      </div>
      <div className="v8-tension-model">
        <div className="v8-tension-scale">
          <div className="v8-tension-side"><Sparkles size={18}/><b>AI acceleration</b><small>Generate faster</small></div>
          <div className="v8-tension-track"><div style={{ width: trust + '%' }} /><input aria-label="Explore speed and trust balance" type="range" min="20" max="80" value={trust} onChange={e => setTrust(Number(e.target.value))}/></div>
          <div className="v8-tension-side"><ShieldCheck size={18}/><b>Human confidence</b><small>Validate before execution</small></div>
        </div>
        <div className="v8-tension-readout"><strong>{trust < 45 ? 'More automation' : trust > 60 ? 'More validation' : 'Balanced control'}</strong><span>Drag the control to explore the product tension.</span></div>
      </div>
    </section>
  );
}

const explorations = [
  { id: '01', title: 'Inventory first', body: 'The first direction exposed everything at once. Useful for completeness, but weak for prioritising the next decision.', tags: ['High density', 'Low prioritisation'], screen: screens.dashboard },
  { id: '02', title: 'Status first', body: 'The hierarchy moved execution state and attention signals above the full inventory.', tags: ['Clear state', 'Faster scanning'], screen: screens.dashboard },
  { id: '03', title: 'Decision oriented', body: 'The final direction connected status to action: what happened, what needs review and what can happen next.', tags: ['Actionable', 'Review gate'], screen: screens.review },
];

function ExplorationLab() {
  const [selected, setSelected] = useState(2);
  const item = explorations[selected];
  return (
    <section id="exploration" className="v8-section v8-exploration-section">
      <div className="v8-section-label"><span>05</span><b>EXPLORATION / LOW-FI → HIGH-FI</b></div>
      <div className="v8-title-row"><h2>Show the thinking.<br /><em>Not just the final screen.</em></h2><p>These frames make the design progression inspectable: each iteration changes the information hierarchy before visual polish enters the picture.</p></div>
      <div className="v8-exploration">
        <div className="v8-iteration-rail">
          {explorations.map((x, i) => <button key={x.id} onClick={() => setSelected(i)} className={selected === i ? 'is-selected' : ''}><span>{x.id}</span><b>{x.title}</b><i>{selected === i ? <Check size={13}/> : <Circle size={9}/>}</i></button>)}
        </div>
        <motion.div className="v8-exploration-stage" key={item.id} initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.45}}>
          <div className="v8-lowfi-wrap">
            <div className="v8-lowfi-label">WIREFRAME DIRECTION / {item.id}</div>
            <div className={'v8-lowfi v8-lowfi-' + item.id}>
              <div className="v8-lowfi-top"><i/><i/><i/><span>PROJECT / TEST CYCLE</span></div>
              <div className="v8-lowfi-body">
                <aside><b/><b/><b/><b/></aside>
                <div className="v8-lowfi-main">
                  <div className="v8-lowfi-summary"><i/><i/><i/></div>
                  <span/><span/><span/>
                  <div className="v8-lowfi-table"><i/><i/><i/><i/><i/><i/></div>
                  <div className="v8-lowfi-actions"><i/><i/></div>
                </div>
              </div>
            </div>
          </div>
          <div className="v8-exploration-notes"><span>ITERATION {item.id}</span><h3>{item.title}</h3><p>{item.body}</p><div>{item.tags.map(tag => <b key={tag}>{tag}</b>)}</div></div>
        </motion.div>
      </div>
    </section>
  );
}

function DecisionMatrix() {
  const decisions = [
    ['Progressive trust', 'Expose AI output → review → execution as separate states.', 'Prevents generated output from feeling like an approved result.'],
    ['Status before inventory', 'Surface health, failures and attention before deep lists.', 'Supports scanning and release decisions.'],
    ['One component system', 'Use the same patterns for state, tables, controls and feedback.', 'Reduces cognitive overhead as the workflow grows.'],
  ];
  return (
    <section id="decisions" className="v8-section v8-decisions-section">
      <div className="v8-section-label"><span>06</span><b>KEY DECISIONS / TRADE-OFFS</b></div>
      <div className="v8-title-row"><h2>Every visual choice carries a <em>product consequence.</em></h2><p>The portfolio should show not only what changed, but why the change mattered to the workflow.</p></div>
      <div className="v8-decision-grid">{decisions.map(([title, decision, consequence], i) => <Reveal key={title} delay={i*.07}><article className="v8-decision-card"><span>0{i+1}</span><h3>{title}</h3><div><b>DECISION</b><p>{decision}</p></div><div><b>CONSEQUENCE</b><p>{consequence}</p></div></article></Reveal>)}</div>
    </section>
  );
}

function InteractionModel() {
  const states = [
    ['READY', 'Input is complete', 'The next action is available and the system explains what will happen.'],
    ['RUNNING', 'Work is in progress', 'Progress is visible without pretending the result is already known.'],
    ['FAILED', 'Action needs attention', 'The error is contextual, recoverable and tied to the affected step.'],
    ['BLOCKED', 'A dependency is missing', 'The interface explains what is missing and how to resolve it.'],
    ['EMPTY', 'No result yet', 'Empty states teach the next useful action instead of showing a dead end.'],
    ['REVIEW', 'Human decision required', 'Generated output stays separate from approved output until someone validates it.'],
  ];

  const [selected, setSelected] = useState(5);
  const item = states[selected];

  return (
    <section id="interaction" className="v8-section v8-interaction-section">
      <div className="v8-section-label"><span>08</span><b>INTERACTION MODEL / STATE SYSTEM</b></div>
      <div className="v8-title-row">
        <h2>Good automation needs<br /><em>visible states.</em></h2>
        <p>For an AI-heavy product, feedback is part of the product model. Users should always know whether the system is waiting, working, blocked, failed or asking for a decision.</p>
      </div>
      <div className="v8-state-system">
        <div className="v8-state-rail">
          {states.map(([label], i) => <button key={label} className={selected === i ? 'is-selected' : ''} onClick={() => setSelected(i)} aria-pressed={selected === i}><span>0{i + 1}</span><b>{label}</b></button>)}
        </div>
        <motion.div className="v8-state-detail" key={item[0]} initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{duration:.4}}>
          <div className="v8-state-visual">
            <div className="v8-state-window">
              <div className="v8-state-window-bar"><i/><i/><i/></div>
              <div className={'v8-state-pill state-' + item[0].toLowerCase()}>{item[0]}</div>
              <strong>{item[1]}</strong>
              <span>{item[2]}</span>
              <div className="v8-state-progress"><i/></div>
              <button>Continue <ArrowRight size={13}/></button>
            </div>
          </div>
          <div className="v8-state-copy"><span>STATE / {item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p><div><Check size={14}/> Clear feedback before the next decision</div></div>
        </motion.div>
      </div>
    </section>
  );
}

function EngineeringCollab() {
  const rows = [
    ['Design intent', 'Make generated output visibly distinct from approved output.', 'Review state + explicit validation gate'],
    ['Product constraint', 'AI should accelerate work without creating a false sense of certainty.', 'Progressive trust workflow'],
    ['Technical constraint', 'States must survive async generation, execution and failure.', 'Shared state vocabulary across screens'],
    ['Build handoff', 'Translate interaction rules into predictable component behavior.', 'Ready / Running / Failed / Blocked / Empty'],
  ];
  return (
    <section id="engineering" className="v8-section v8-engineering-section">
      <div className="v8-section-label"><span>09</span><b>ENGINEERING / COLLABORATION</b></div>
      <div className="v8-title-row">
        <h2>Design intent → constraint → <em>build decision.</em></h2>
        <p>The interface was treated as a system of states and rules, not a collection of static screens. That makes the design easier to implement and easier to extend.</p>
      </div>
      <div className="v8-engineering-table">
        <div className="v8-engineering-head"><span>DESIGN INPUT</span><span>CONSTRAINT</span><span>IMPLEMENTATION DIRECTION</span></div>
        {rows.map(([a,b,d], i) => <Reveal key={a} delay={i*.05}><div className="v8-engineering-row"><b>{a}</b><p>{b}</p><span>{d}</span></div></Reveal>)}
      </div>
      <div className="v8-engineering-note"><GitBranch size={17}/><span><b>Collaboration principle:</b> agree on the state model before polishing individual screens.</span></div>
    </section>
  );
}

function OutcomeSection() {
  const evidence = [
    ['PRODUCT OUTCOME', 'A guided workflow connects context, generation, validation, execution and reporting instead of treating AI generation as the destination.'],
    ['UX OUTCOME', 'The hierarchy shifts attention toward status, review and next action—reducing the need to reconstruct system state from multiple surfaces.'],
    ['DESIGN SYSTEM OUTCOME', 'Shared state, table and feedback patterns create a consistent interaction language across the workflow.'],
  ];
  return (
    <section id="outcome" className="v8-section v8-outcome-section">
      <div className="v8-section-label"><span>10</span><b>OUTCOME / EVIDENCE</b></div>
      <div className="v8-title-row">
        <h2>What changed beyond<br /><em>the pixels?</em></h2>
        <p>Where measured production data is not available in the case-study source material, the outcome is stated qualitatively rather than inventing a metric.</p>
      </div>
      <div className="v8-evidence-grid">
        {evidence.map(([label, body], i) => <Reveal key={label} delay={i*.06}><article className="v8-evidence-block"><span>{label}</span><p>{body}</p></article></Reveal>)}
      </div>
      <div className="v8-measurement">
        <span>IF I WERE MEASURING THIS IN PRODUCTION</span>
        <div><b>Time to first useful test</b><b>Review-to-run conversion</b><b>Failure recovery time</b><b>Coverage visibility</b></div>
      </div>
    </section>
  );
}

function ReflectionSection() {
  return (
    <section id="reflection" className="v8-section v8-reflection-section">
      <div className="v8-section-label"><span>11</span><b>REFLECTION</b></div>
      <div className="v8-reflection-grid">
        <div><span>WHAT I LEARNED</span><h2>AI UX is less about <em>automation.</em> More about confidence.</h2></div>
        <div className="v8-reflection-copy">
          <p>The strongest design move was not adding more intelligence to the interface. It was making the boundary between generated, reviewed and executed work unmistakable.</p>
          <p>That principle can scale beyond Genesis: when automation becomes more capable, the interface needs to become more explicit about intent, state and responsibility.</p>
          <a href="#context">Revisit the system <ArrowRight size={15}/></a>
        </div>
      </div>
    </section>
  );
}

function ProductWalkthrough() {
  const gallery = [
    ['Dashboard', screens.dashboard, 'What needs attention?', 'Status, coverage and active work are surfaced before inventory.'],
    ['Project Details', A + 'Project-Details.webp', 'What am I working on?', 'Project context anchors the workflow before users enter configuration or execution.'],
    ['Input Artifacts', screens.inputs, 'What context is available?', 'Inputs establish the evidence Genesis can work from.'],
    ['Test Data Setup', A + 'Test-Data-Setup.webp', 'Is the test ready for realistic data?', 'Data setup makes an important execution dependency visible before generation.'],
    ['AI Configuration', screens.ai, 'How should AI behave?', 'Configuration makes generation intent explicit rather than hidden.'],
    ['Review & Validate', screens.review, 'Is this safe to run?', 'Review becomes a visible human checkpoint before execution.'],
    ['Reports', screens.reports, 'What happened?', 'Execution becomes evidence that can be inspected and shared.'],
  ];
  const [selected, setSelected] = useState(0);
  const item = gallery[selected];
  return (
    <section id="product" className="v8-section v8-product-section">
      <div className="v8-section-label"><span>07</span><b>PRODUCT WALKTHROUGH</b></div>
      <div className="v8-title-row"><h2>One product.<br /><em>Different questions.</em></h2><p>Explore the actual Genesis interfaces through the question each surface is responsible for answering.</p></div>
      <div className="v8-product-tabs" role="tablist" aria-label="Genesis product screens">{gallery.map((x,i)=><button key={x[0]} role="tab" aria-selected={selected===i} className={selected===i?'is-selected':''} onClick={()=>setSelected(i)}>{x[0]}</button>)}</div>
      <motion.div className="v8-product-view" role="tabpanel" key={item[0]} initial={{opacity:0,scale:.985}} animate={{opacity:1,scale:1}} transition={{duration:.45}}>
        <div className="v8-product-image"><img src={item[1]} alt={'Genesis '+item[0]+' screen'}/></div>
        <div className="v8-product-question"><span>QUESTION</span><h3>{item[2]}</h3><p>{item[3]}</p><div className="v8-product-state"><Check size={15}/> Designed around one clear decision</div></div>
      </motion.div>
    </section>
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

      <DesignTension />

      <section id="system" className="v8-section v8-system-section">
        <div className="v8-section-label"><span>04</span><b>THE SYSTEM / WORKFLOW</b></div>
        <div className="v8-title-row"><h2>One pipeline.<br /><em>Six decision points.</em></h2><p>Explore the workflow. Each stage pairs a real Genesis interface with the product question it is designed to answer.</p></div>
        <WorkflowExplorer />
      </section>

      <ExplorationLab />
      <DecisionMatrix />
      <ProductWalkthrough />
      <InteractionModel />
      <EngineeringCollab />
      <OutcomeSection />
      <ReflectionSection />

      <footer className="v8-footer">
        <div>
          <span>GENESIS / V8 CASE STUDY</span>
          <h2>Designed to make complex product thinking <em>visible.</em></h2>
          <div className="v8-footer-meta"><b>PRODUCT DESIGN</b><b>AI / QA SAAS</b><b>UX · UI · SYSTEMS</b></div>
        </div>
        <a href="/surya-portfolio/">Back to portfolio <ArrowRight size={16} /></a>
      </footer>
    </main>
  );
}
