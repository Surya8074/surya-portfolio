import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Check, ChevronRight, CircleDot, Eye, FileText, Layers3, ShieldCheck, SlidersHorizontal, Sparkles, UploadCloud } from 'lucide-react';
import GenesisHero from './GenesisHero';
import './genesis-case-study.css';

const steps = [
  { n: '01', title: 'Project details', short: 'Define the project', text: 'Give Genesis enough context to understand what is being tested.', icon: Layers3 },
  { n: '02', title: 'Input artifacts', short: 'Bring product context', text: 'Add the requirements, API contracts or code the AI needs.', icon: UploadCloud },
  { n: '03', title: 'Test data setup', short: 'Prepare the data', text: 'Connect supporting data and decide whether synthetic data is needed.', icon: SlidersHorizontal },
  { n: '04', title: 'AI configuration', short: 'Set AI behaviour', text: 'Choose the language, model and capabilities used by the workflow.', icon: Sparkles },
  { n: '05', title: 'Review & validate', short: 'Stay in control', text: 'Review the configuration before Genesis starts generating test artifacts.', icon: ShieldCheck },
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

function ScreenFrame({ type }: { type: 'project' | 'artifacts' | 'ai' | 'review' | 'reports' }) {
  if (type === 'project') return (
    <div className="screen-frame project-screen">
      <div className="screen-chrome"><span /><span /><span /><small>Create New Project</small></div>
      <div className="screen-layout"><aside><b>G</b><i /><i /><i /><i /></aside><div className="screen-content"><small>01 / 05 · PROJECT DETAILS</small><h4>Tell Genesis what you are testing.</h4><label>PROJECT NAME<div>Project Genesis</div></label><label>DESCRIPTION<div>AI-assisted testing workspace</div></label><button>Next <ChevronRight size={13} /></button></div></div>
    </div>
  );
  if (type === 'artifacts') return (
    <div className="screen-frame artifacts-screen">
      <div className="screen-chrome"><span /><span /><span /><small>Input Artifacts</small></div>
      <div className="artifact-content"><small>02 / 05 · INPUT ARTIFACTS</small><h4>Bring the context the AI needs.</h4><div className="artifact-grid"><div><FileText size={19} /><b>User Stories</b><span>Requirements & acceptance criteria</span></div><div><CircleDot size={19} /><b>API Contracts</b><span>OpenAPI / Swagger</span></div><div><UploadCloud size={19} /><b>GitHub Repository</b><span>Source code context</span></div></div></div>
    </div>
  );
  if (type === 'ai') return (
    <div className="screen-frame ai-screen">
      <div className="screen-chrome"><span /><span /><span /><small>AI Configuration</small></div>
      <div className="ai-screen-content"><small>04 / 05 · AI CONFIGURATION</small><h4>Make the AI a visible decision.</h4><div className="ai-setting"><span>Programming language</span><b>TypeScript</b><ChevronRight size={14} /></div><div className="ai-setting"><span>LLM model</span><b>GPT model</b><ChevronRight size={14} /></div><div className="ai-capability"><span><Check size={13} /> Test case generation</span><span><Check size={13} /> Code analysis</span><span><Eye size={13} /> Bug detection</span></div></div>
    </div>
  );
  if (type === 'review') return (
    <div className="screen-frame review-screen">
      <div className="screen-chrome"><span /><span /><span /><small>Review & Validate</small></div>
      <div className="review-content"><small>05 / 05 · REVIEW & VALIDATE</small><h4>Give the user the final say.</h4><div className="review-summary"><div><span>Language</span><b>TypeScript</b></div><div><span>LLM model</span><b>GPT model</b></div><div><span>Synthetic data</span><b>Enabled</b></div><div><span>Setup time</span><b>~ 15 min</b></div></div><button>Create Project <ArrowRight size={13} /></button></div>
    </div>
  );
  return (
    <div className="screen-frame reports-screen">
      <div className="screen-chrome"><span /><span /><span /><small>Genesis Dashboard</small></div>
      <div className="dashboard-content"><small>QUALITY OVERVIEW</small><h4>See what needs attention.</h4><div className="dashboard-kpis"><span><b>12</b>Active projects</span><span><b>47</b>Test cycles</span><span><b>94.2%</b>Pass rate</span><span><b>87.5%</b>Coverage</span></div><div className="dashboard-charts"><div><span>Testing activity</span><svg viewBox="0 0 360 90"><path d="M0 72 C35 60 50 78 86 55 S140 68 168 45 S220 55 250 30 S300 42 360 14" /></svg></div><div className="donut"><i>94%</i></div></div></div>
    </div>
  );
}

function StoryChapter({ number, eyebrow, title, copy, visual, reverse = false }: { number: string; eyebrow: string; title: string; copy: string; visual: React.ReactNode; reverse?: boolean }) {
  return (
    <section className={`genesis-case-section chapter-section ${reverse ? 'chapter-reverse' : ''}`}>
      <div className="chapter-copy">
        <div className="chapter-number">{number}</div>
        <p className="genesis-section-kicker">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
      <Reveal className="chapter-visual">{visual}</Reveal>
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

      <StoryChapter number="03" eyebrow="STEP 01 · PROJECT DETAILS" title="Start with the thing being tested — not the AI." copy="The first step establishes the project context. This gives the user a clear starting point and prevents AI configuration from arriving before the basic problem is defined." visual={<ScreenFrame type="project" />} />

      <StoryChapter number="04" eyebrow="STEP 02 · INPUT ARTIFACTS" title="Give the AI the context it needs." copy="Genesis accepts the product information that shapes testing: user stories, API contracts and source code. The interface makes those inputs explicit so users understand what the system will work from." visual={<ScreenFrame type="artifacts" />} reverse />

      <StoryChapter number="05" eyebrow="STEP 03 · TEST DATA" title="Prepare the conditions the tests will depend on." copy="Test creation is not only about generating scenarios. The workflow also accounts for the data behind those scenarios, including database connections and the option to enable synthetic test data." visual={<div className="test-data-visual"><div className="data-card"><span>03 / 05</span><h3>Test Data Setup</h3><p>Connect the data your test scenarios need.</p><div className="data-row"><b>Database connection</b><small>Configured</small></div><div className="toggle-row"><b>Enable synthetic test data</b><i className="toggle-on" /></div></div><div className="data-orbit"><CircleDot size={18} /></div></div>} />

      <StoryChapter number="06" eyebrow="STEP 04 · AI CONFIGURATION" title="Make the AI understandable before asking it to act." copy="Language, model and capabilities are separated into visible choices. This is where the product communicates that AI is a configurable part of the workflow — not magic happening somewhere behind the interface." visual={<ScreenFrame type="ai" />} reverse />

      <StoryChapter number="07" eyebrow="STEP 05 · REVIEW & VALIDATE" title="Keep the human in control at the moment that matters." copy="Before a project is created, the user gets a consolidated view of the choices made across the workflow. Review becomes a deliberate confidence checkpoint rather than an invisible system action." visual={<ScreenFrame type="review" />} />

      <section className="genesis-case-section insight-section">
        <SectionHeader number="08" eyebrow="AFTER SETUP" title="The story does not end when the project is created." copy="Once the workspace is configured, Genesis needs to help teams understand activity, quality and areas that need attention. The dashboard and reports turn the generated work into something the team can monitor." />
        <Reveal><ScreenFrame type="reports" /></Reveal>
      </section>

      <section className="genesis-case-section states-section">
        <SectionHeader number="09" eyebrow="DETAILS THAT BUILD TRUST" title="I designed the states around the same principle: tell the user what is happening." copy="Empty, input, error and success states are small moments, but they shape whether a technical workflow feels predictable. They make the system's response visible instead of leaving users to guess." />
        <Reveal><StateStrip /></Reveal>
      </section>

      <section className="genesis-case-section decisions-section">
        <SectionHeader number="10" eyebrow="WHAT SHAPED THE DESIGN" title="Four principles kept the experience coherent." copy="These were the recurring design decisions behind the screens — not isolated UI tricks." />
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
