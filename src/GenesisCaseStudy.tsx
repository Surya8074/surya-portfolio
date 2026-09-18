import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Check, CircleDot, Eye, FileText, Layers3, ShieldCheck, SlidersHorizontal, Sparkles, UploadCloud } from 'lucide-react';
import GenesisHero from './GenesisHero';
import './genesis-case-study.css';

const steps = [
  { n: '01', title: 'Project details', short: 'Define the project', text: 'Give Genesis enough context to understand what is being tested.', icon: Layers3 },
  { n: '02', title: 'Input artifacts', short: 'Bring product context', text: 'Add the requirements, API contracts or code the AI needs.', icon: UploadCloud },
  { n: '03', title: 'Test data setup', short: 'Prepare the data', text: 'Connect supporting data and decide whether synthetic data is needed.', icon: SlidersHorizontal },
  { n: '04', title: 'AI configuration', short: 'Set AI behaviour', text: 'Choose the language, model and capabilities used by the workflow.', icon: Sparkles },
  { n: '05', title: 'Review & validate', short: 'Stay in control', text: 'Review the configuration before Genesis starts generating test artifacts.', icon: ShieldCheck },
];

const screenDecisions = [
  {
    number: '03',
    eyebrow: 'SCREEN 01 · DASHBOARD',
    title: 'Turn test activity into an operational view.',
    context: 'After setup, the product has to move from configuration to continuous visibility. QA teams need to understand what is running, how quality is trending and where attention is required.',
    decision: 'I treated the dashboard as the control surface for the system — prioritising high-level quality signals first, then supporting activity and trend information.',
    why: 'The hierarchy keeps the first scan focused on status rather than forcing users to interpret raw test output.',
    outcome: 'The dashboard becomes the bridge between generated testing work and day-to-day QA decisions.',
    image: '/surya-portfolio/genesis/Dashboard.webp',
    alt: 'Genesis dashboard showing quality and testing activity',
  },
  {
    number: '04',
    eyebrow: 'SCREEN 02 · PROJECT DETAILS',
    title: 'Start with the system being tested — not the AI.',
    context: 'Genesis needs enough project context before it can reason about tests. Starting with AI settings would expose technical choices before users have defined the problem space.',
    decision: 'I made project identity and description the first commitment in the workflow, keeping the entry point simple and progressive.',
    why: 'This establishes a stable mental model: first define the product, then provide the context and controls the AI needs.',
    outcome: 'The first screen gives the workflow a clear anchor without front-loading technical configuration.',
    image: '/surya-portfolio/genesis/Project-Details.webp',
    alt: 'Genesis project details screen',
  },
  {
    number: '05',
    eyebrow: 'SCREEN 03 · INPUT ARTIFACTS',
    title: 'Make the AI’s source of truth explicit.',
    context: 'Test generation depends on the quality of the context supplied to Genesis — requirements, API contracts and source code are different inputs with different roles.',
    decision: 'I represented each artifact type as an explicit input rather than hiding ingestion behind a generic upload action.',
    why: 'Users can understand what Genesis is using as context before they move deeper into configuration.',
    outcome: 'The screen turns an invisible AI dependency — context quality — into a visible product decision.',
    image: '/surya-portfolio/genesis/Input-Artifacts.webp',
    alt: 'Genesis input artifacts screen',
  },
  {
    number: '06',
    eyebrow: 'SCREEN 04 · TEST DATA',
    title: 'Treat test data as part of the test system.',
    context: 'Generated scenarios are only useful when the conditions behind them are available. Data connections and synthetic data therefore belong inside the core setup flow.',
    decision: 'I separated data configuration from artifact ingestion so users can reason about product context and runtime conditions independently.',
    why: 'The separation reduces conceptual mixing while still keeping both decisions inside the same guided setup.',
    outcome: 'Test data becomes a first-class configuration layer instead of an implementation detail users discover later.',
    image: '/surya-portfolio/genesis/Test-Data-Setup.webp',
    alt: 'Genesis test data setup screen',
  },
  {
    number: '07',
    eyebrow: 'SCREEN 05 · AI CONFIGURATION',
    title: 'Expose the controls that change AI behaviour.',
    context: 'AI configuration is where the system can start to feel like a black box. Language, model and enabled capabilities directly affect what Genesis can produce.',
    decision: 'I surfaced those controls as explicit configuration choices and grouped related capabilities together.',
    why: 'Visible configuration gives technical users a model of what the system is going to do instead of asking them to trust an opaque automation layer.',
    outcome: 'AI becomes a configurable subsystem inside the product rather than a mysterious background process.',
    image: '/surya-portfolio/genesis/AI-Configuration.webp',
    alt: 'Genesis AI configuration screen',
  },
  {
    number: '08',
    eyebrow: 'SCREEN 06 · REVIEW & VALIDATE',
    title: 'Create a human checkpoint before execution.',
    context: 'Multiple configuration decisions have accumulated by this point. The user needs a moment to inspect the combined setup before the system acts on it.',
    decision: 'I consolidated the important choices into a review surface and made project creation the final explicit action.',
    why: 'Review works as a confidence boundary: users can validate the system configuration before handing control to automation.',
    outcome: 'The workflow preserves human agency at the exact transition where configuration becomes generated work.',
    image: '/surya-portfolio/genesis/Review-Validate.webp',
    alt: 'Genesis review and validate screen',
  },
  {
    number: '09',
    eyebrow: 'SCREEN 07 · REPORTS',
    title: 'Turn generated tests into evidence teams can act on.',
    context: 'The workflow ultimately has to produce more than test execution. Teams need a way to interpret outcomes, spot quality signals and understand what the automation is telling them.',
    decision: 'I designed reporting as the analytical layer after execution — moving from raw runs toward quality, coverage and actionable signals.',
    why: 'This closes the product loop: context goes in, tests are generated and executed, then the resulting evidence comes back to the team.',
    outcome: 'Reports complete the Genesis loop from setup → automation → evidence.',
    image: '/surya-portfolio/genesis/Reports.webp',
    alt: 'Genesis reports interface',
  },
];

const decisions = [
  ['Progressive disclosure', 'I split a complex setup into focused stages so users only solve the decision in front of them.'],
  ['AI made visible', 'Language, model and capabilities are explicit choices instead of hidden system behaviour.'],
  ['Human in the loop', 'Review & Validate is a deliberate checkpoint before AI-generated work moves forward.'],
  ['Setup connects to insight', 'The dashboard and reports continue the story after configuration instead of feeling like a separate product.'],
];

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function SectionHeader({ number, eyebrow, title, copy }: { number: string; eyebrow: string; title: string; copy: string }) {
  return (
    <div className="genesis-section-heading">
      <div className="genesis-section-number"><span>{number}</span><i /></div>
      <div>
        <p className="genesis-section-kicker">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="genesis-section-copy">{copy}</p>
      </div>
    </div>
  );
}

function ProjectSnapshot() {
  return (
    <section className="genesis-snapshot">
      <div className="snapshot-intro">
        <p className="genesis-section-kicker">THE PROJECT, IN ONE MINUTE</p>
        <h2>Genesis is an AI-powered test automation workflow designed to help QA teams move from product context to test artifacts with less manual setup.</h2>
        <p>My role was to shape the end-to-end product experience as the sole designer — especially the moments where technical configuration, AI behaviour and human judgement meet.</p>
      </div>
      <div className="snapshot-facts">
        <div><span>ROLE</span><strong>Product Designer · Sole designer</strong></div>
        <div><span>TIMELINE</span><strong>Aug 2025 — Jan 2026</strong></div>
        <div><span>USERS</span><strong>QA · Test automation · QE · DevOps</strong></div>
        <div><span>FOCUS</span><strong>AI-assisted testing workflow</strong></div>
      </div>
    </section>
  );
}

function BeforeAfterStory() {
  return (
    <div className="genesis-before-after">
      <div className="story-column before">
        <div className="story-label"><span>BEFORE THE PRODUCT EXPERIENCE</span><b>01</b></div>
        <h3>Too many things had to make sense at once.</h3>
        <p>The testing workflow brings together project information, product artifacts, test data, AI configuration and validation. If all of that is presented as one large form, the interface becomes a checklist instead of a guided workflow.</p>
        <div className="fragment-stack">
          <span>Requirements</span><span>API / code</span><span>Test data</span><span>AI settings</span><span>Validation</span>
        </div>
      </div>
      <div className="story-arrow"><ArrowRight size={20} /></div>
      <div className="story-column after">
        <div className="story-label"><span>THE DESIGN DIRECTION</span><b>02</b></div>
        <h3>Turn the complexity into a sequence people can follow.</h3>
        <p>I structured setup as five connected decisions. Each step has a clear purpose, a visible place in the journey and a natural hand-off to the next one.</p>
        <div className="sequence-mini">{steps.map((step) => <span key={step.n}><b>{step.n}</b>{step.short}</span>)}</div>
      </div>
    </div>
  );
}

function WorkflowMap() {
  return (
    <div className="genesis-workflow-map">
      <div className="workflow-line" />
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <motion.article key={step.n} whileHover={{ y: -7 }} className={`workflow-node workflow-node-${index + 1}`}>
            <span className="workflow-number">{step.n}</span>
            <div className="workflow-icon"><Icon size={18} /></div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </motion.article>
        );
      })}
    </div>
  );
}

function ScreenDecision({ screen, index }: { screen: typeof screenDecisions[number]; index: number }) {
  return (
    <section className={`genesis-screen-decision ${index % 2 ? 'screen-decision-reverse' : ''}`}>
      <div className="screen-decision-header">
        <div className="screen-decision-index">
          <span>{screen.number}</span>
          <i />
        </div>
        <div className="screen-decision-title">
          <p className="genesis-section-kicker">{screen.eyebrow}</p>
          <h2>{screen.title}</h2>
        </div>
      </div>

      <div className="screen-decision-context">
        <div><span>CONTEXT</span><p>{screen.context}</p></div>
        <div><span>DECISION</span><p>{screen.decision}</p></div>
      </div>

      <Reveal className="screen-decision-ui">
        <div className="screen-ui-label"><span>UI · REAL PRODUCT SCREEN</span><b>GENESIS</b></div>
        <div className="screen-image-wrap">
          <img src={screen.image} alt={screen.alt} loading={index > 1 ? 'lazy' : 'eager'} />
        </div>
      </Reveal>

      <div className="screen-decision-bottom">
        <div><span>WHY</span><p>{screen.why}</p></div>
        <div><span>OUTCOME</span><p>{screen.outcome}</p></div>
      </div>
    </section>
  );
}

function StateStrip() {
  const states = [
    ['Empty', 'Enter your email', 'neutral'],
    ['Input', 'alex@company.com', 'active'],
    ['Error', 'Enter a valid email', 'error'],
    ['Success', 'alex@company.com', 'success'],
  ];
  return <div className="genesis-state-strip">{states.map(([title, value, type]) => <motion.div key={title} whileHover={{ y: -5 }} className={`state-card ${type}`}><small>{title}</small><div>{value}</div><span>{type === 'error' ? '!' : type === 'success' ? '✓' : '•'}</span></motion.div>)}</div>;
}

export default function GenesisCaseStudy() {
  return (
    <main className="genesis-case-study">
      <GenesisHero />
      <ProjectSnapshot />

      <section className="genesis-case-section problem-section">
        <SectionHeader number="01" eyebrow="THE PROBLEM" title="QA was being asked to move at product speed — but the testing workflow was still fragmented." copy="Genesis was built around a simple opportunity: use AI to reduce the manual effort involved in creating and managing tests. The design challenge was making that power usable for technical teams without turning the product into a black box." />
        <Reveal><BeforeAfterStory /></Reveal>
      </section>

      <section className="genesis-case-section question-section">
        <div className="big-question">
          <p className="genesis-section-kicker">THE DESIGN QUESTION</p>
          <h2>How might we make AI-assisted testing feel <em>guided, transparent and controllable?</em></h2>
          <p>That question became the filter for the experience: guide users through complexity, expose important AI decisions and keep a human checkpoint before work moves forward.</p>
        </div>
      </section>

      <section className="genesis-case-section workflow-section">
        <SectionHeader number="02" eyebrow="THE CORE IDEA" title="I turned setup into five connected decisions." copy="Instead of asking users to understand the entire system up front, the product introduces complexity progressively. The sequence mirrors the way a testing workspace actually gets prepared." />
        <Reveal><WorkflowMap /></Reveal>
      </section>

      <section className="genesis-screen-decisions">
        <div className="screen-decisions-intro">
          <p className="genesis-section-kicker">PHASE 3 · SCREEN DECISIONS</p>
          <h2>The screens are where the system becomes tangible.</h2>
          <p>Rather than walking through the interface as a feature tour, I use each screen to explain one product decision: what the user needs, what the interface exposes, and why that structure matters.</p>
        </div>
        {screenDecisions.map((screen, index) => <ScreenDecision key={screen.number} screen={screen} index={index} />)}
      </section>

      <section className="genesis-case-section states-section">
        <SectionHeader number="10" eyebrow="DETAILS THAT BUILD TRUST" title="I designed the states around the same principle: tell the user what is happening." copy="Empty, input, error and success states are small moments, but they shape whether a technical workflow feels predictable. They make the system's response visible instead of leaving users to guess." />
        <Reveal><StateStrip /></Reveal>
      </section>

      <section className="genesis-case-section decisions-section">
        <SectionHeader number="11" eyebrow="WHAT SHAPED THE DESIGN" title="Four principles kept the experience coherent." copy="These were the recurring design decisions behind the screens — not isolated UI tricks." />
        <div className="genesis-decision-grid">{decisions.map(([title, text], i) => <Reveal key={title} delay={i * 0.05}><motion.article whileHover={{ y: -6 }}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p><ArrowRight size={17} /></motion.article></Reveal>)}</div>
      </section>

      <section className="genesis-case-section outcome-section">
        <div className="genesis-outcome-grid">
          <Reveal><div><p className="genesis-section-kicker">THE RESULT</p><h2>A structured path from product context to AI-assisted testing.</h2><p>I designed the experience around a clear sequence: define the project, bring the right context, prepare test data, configure the AI, review the setup, then move into monitoring and reporting.</p></div></Reveal>
          <Reveal delay={0.1}><div><p className="genesis-section-kicker">WHAT I LEARNED</p><h2>Good AI UX is not about making the AI disappear.</h2><p>It is about making the system understandable at the moments where users need confidence. Genesis reinforced a principle I now carry into AI product work: automate the effort, but keep the important decisions visible and human-controlled.</p></div></Reveal>
        </div>
        <div className="genesis-end-mark"><ArrowDown size={18} /><span>End of case study · back to selected work</span></div>
      </section>
    </main>
  );
}
