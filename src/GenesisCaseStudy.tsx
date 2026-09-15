import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Check, ChevronRight, CircleDot, Eye, Layers3, Sparkles, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import GenesisHero from './GenesisHero';
import './genesis-case-study.css';

const flow = [
  { n: '01', title: 'Project', icon: Layers3, text: 'Define what is being tested.' },
  { n: '02', title: 'Artifacts', icon: CircleDot, text: 'Bring in the product context.' },
  { n: '03', title: 'Test data', icon: SlidersHorizontal, text: 'Configure supporting data.' },
  { n: '04', title: 'AI', icon: Sparkles, text: 'Choose how AI should work.' },
  { n: '05', title: 'Validate', icon: ShieldCheck, text: 'Review before proceeding.' },
];

const decisions = [
  ['Progressive disclosure', 'Complex configuration is divided into manageable stages.'],
  ['AI as a dedicated stage', 'AI configuration gets its own context instead of being buried inside inputs.'],
  ['Human validation', 'Review and validation remain explicit steps in the workflow.'],
  ['Configuration → visibility', 'Configuration and reporting are connected so users can understand what happens next.'],
];

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
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

function FlowDiagram() {
  return (
    <div className="genesis-flow-diagram">
      <div className="genesis-flow-path" />
      {flow.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.n}
            className={`genesis-flow-node node-${index + 1}`}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <span className="genesis-node-number">{item.n}</span>
            <div className="genesis-node-icon"><Icon size={15} /></div>
            <strong>{item.title}</strong>
            <small>{item.text}</small>
          </motion.div>
        );
      })}
    </div>
  );
}

function WizardDiagram() {
  return (
    <div className="genesis-wizard-card">
      <div className="genesis-wizard-top"><span>Create New Project</span><span className="wizard-live">Live flow</span></div>
      <div className="genesis-wizard-progress">
        {flow.map((item, index) => <React.Fragment key={item.n}><div className={index === 0 ? 'active' : ''}><span>{item.n}</span>{item.title}</div>{index < flow.length - 1 && <ChevronRight size={13} />}</React.Fragment>)}
      </div>
      <div className="genesis-wizard-body">
        <div className="wizard-field"><small>PROJECT NAME</small><div>Genesis Test Workspace</div></div>
        <div className="wizard-field"><small>DESCRIPTION</small><div>Automated testing for a commerce web application</div></div>
        <div className="wizard-choice-row"><span className="selected"><Check size={12} /> Web application</span><span>Mobile application</span><span>API</span></div>
        <div className="wizard-actions"><span>Cancel</span><b>Next →</b></div>
      </div>
    </div>
  );
}

function AIConfigDiagram() {
  return (
    <div className="genesis-ai-diagram">
      <div className="ai-panel ai-panel-main">
        <div className="ai-panel-head"><Sparkles size={14} /><span>AI configuration</span><small>04 / 05</small></div>
        <div className="ai-row"><span>Language</span><b>TypeScript</b><ChevronRight size={13} /></div>
        <div className="ai-row"><span>LLM model</span><b>GPT model</b><ChevronRight size={13} /></div>
        <div className="ai-capabilities"><small>AI CAPABILITIES</small><div><span className="on"><Check size={11} /> Test case generation</span><span className="on"><Check size={11} /> Code analysis</span><span><Eye size={11} /> Bug detection</span></div></div>
      </div>
      <motion.div className="ai-orbit orbit-one" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="ai-orbit orbit-two" animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} />
      <div className="ai-core"><Sparkles size={17} /></div>
    </div>
  );
}

function StateStrip() {
  const states = [
    ['Empty', 'Enter your email', 'neutral'],
    ['Input', 'alex@company.com', 'active'],
    ['Error', 'Enter a valid email', 'error'],
    ['Success', 'alex@company.com', 'success'],
  ];
  return <div className="genesis-state-strip">{states.map(([title, value, type]) => <motion.div key={title} whileHover={{ y: -4 }} className={`state-card ${type}`}><small>{title}</small><div>{value}</div><span>{type === 'error' ? '!' : type === 'success' ? '✓' : '•'}</span></motion.div>)}</div>;
}

function DashboardMini({ reports = false }: { reports?: boolean }) {
  return (
    <div className="genesis-mini-dashboard">
      <div className="mini-sidebar"><b>G</b><span /><span /><span /><span /><span /></div>
      <div className="mini-main">
        <div className="mini-head"><div><small>{reports ? 'REPORTS' : 'DASHBOARD'}</small><strong>{reports ? 'Quality overview' : 'Welcome back, Alex'}</strong></div><i /></div>
        <div className="mini-stats"><span /><span /><span /><span /></div>
        <div className="mini-charts"><div className="mini-chart"><svg viewBox="0 0 300 90"><path d="M0 74 C35 62 55 78 84 52 S130 72 156 45 S204 55 226 29 S265 43 300 16" /></svg></div><div className="mini-donut" /></div>
        <div className="mini-lines"><span /><span /><span /><span /></div>
      </div>
    </div>
  );
}

export default function GenesisCaseStudy() {
  return (
    <main className="genesis-case-study">
      <GenesisHero />

      <section className="genesis-case-section context-section">
        <SectionHeader number="01" eyebrow="THE CONTEXT" title="Traditional QA workflows struggle to keep up." copy="As software teams move faster, QA teams face repetitive test creation, maintenance overhead, multiple tools and complex environments. Genesis explores how generative AI can simplify this workflow — from project setup to validation and reporting." />
        <div className="genesis-context-grid">
          {[
            ['01', 'Slow', 'Manual test creation and repetitive work consume time.'],
            ['02', 'Fragile', 'Automation can be difficult to maintain as software changes.'],
            ['03', 'Fragmented', 'Testing involves multiple inputs, environments and tools.'],
            ['04', 'Trust', 'AI-generated testing still needs human review and control.'],
          ].map(([n, title, text], index) => <Reveal key={n} delay={index * 0.06}><article className="context-card"><span>{n}</span><h3>{title}</h3><p>{text}</p><div className="context-scan" /></article></Reveal>)}
        </div>
      </section>

      <section className="genesis-case-section challenge-section">
        <Reveal><SectionHeader number="02" eyebrow="MY DESIGN CHALLENGE" title="Simplifying complexity without hiding it." copy="The workflow involved multiple inputs — projects, application artifacts, test data, AI configuration, generated outputs and validation. Presenting everything at once would make the experience difficult to understand and navigate." /></Reveal>
        <Reveal delay={0.08}><FlowDiagram /></Reveal>
      </section>

      <section className="genesis-case-section workflow-section">
        <Reveal><SectionHeader number="03" eyebrow="UNDERSTANDING THE WORKFLOW" title="A five-step experience, designed as one connected system." copy="Instead of treating setup as a collection of screens, I mapped the journey as a sequence where each stage explains what comes next and why the user needs to provide it." /></Reveal>
        <Reveal delay={0.1}><div className="genesis-step-rail">{flow.map((item, index) => <div key={item.n} className={index === 0 ? 'active' : ''}><span>{item.n}</span><b>{item.title}</b><small>{item.text}</small></div>)}</div></Reveal>
        <Reveal delay={0.12}><WizardDiagram /></Reveal>
      </section>

      <section className="genesis-case-section ai-section">
        <div className="genesis-two-col">
          <Reveal><SectionHeader number="04" eyebrow="AI CONFIGURATION" title="Make the AI understandable before asking it to act." copy="Language, model and capabilities are separated into visible choices. The interface makes the AI configuration feel like a decision the user owns — not a black box." /></Reveal>
          <Reveal delay={0.12}><AIConfigDiagram /></Reveal>
        </div>
      </section>

      <section className="genesis-case-section insight-section">
        <Reveal><SectionHeader number="05" eyebrow="FROM CONFIGURATION TO INSIGHT" title="The experience shifts from setup to visibility." copy="Once the environment is configured, the product needs to help users understand what the system is doing and where attention is needed." /></Reveal>
        <div className="genesis-product-row">
          <Reveal><DashboardMini /></Reveal>
          <Reveal delay={0.1}><DashboardMini reports /></Reveal>
        </div>
        <div className="genesis-metric-row">{['Project status', 'Testing activity', 'Coverage', 'Execution', 'Overall health'].map((x, i) => <motion.div key={x} whileHover={{ y: -5 }}><span>0{i + 1}</span><b>{x}</b><i style={{ '--bar': `${54 + i * 8}%` } as React.CSSProperties} /></motion.div>)}</div>
      </section>

      <section className="genesis-case-section states-section">
        <Reveal><SectionHeader number="06" eyebrow="DESIGNING FOR STATES" title="Not just the happy path." copy="Small interaction states carry a lot of the product experience. I treated empty, input, error and success states as part of the system rather than afterthoughts." /></Reveal>
        <Reveal delay={0.1}><StateStrip /></Reveal>
      </section>

      <section className="genesis-case-section decisions-section">
        <Reveal><SectionHeader number="07" eyebrow="KEY DESIGN DECISIONS" title="A few choices shaped the experience." copy="The goal was not to remove complexity. It was to sequence it, explain it and make the moments that require human judgment obvious." /></Reveal>
        <div className="genesis-decision-grid">{decisions.map(([title, text], i) => <Reveal key={title} delay={i * 0.05}><motion.article whileHover={{ y: -6 }}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p><ArrowRight size={15} /></motion.article></Reveal>)}</div>
      </section>

      <section className="genesis-case-section outcome-section">
        <div className="genesis-outcome-grid">
          <Reveal><div><p className="genesis-section-kicker">OUTCOME</p><h2>A clearer path from setup to AI-assisted testing.</h2><p>I designed the end-to-end experience around a structured sequence that guides users from project setup and input artifacts through AI configuration, validation and reporting.</p></div></Reveal>
          <Reveal delay={0.1}><div><p className="genesis-section-kicker">WHAT I LEARNED</p><h2>AI should reduce complexity, not hide it.</h2><p>Genesis changed how I think about AI product design: the interface needs to communicate what the system needs, what the AI is doing and where the human remains responsible for the final decision.</p></div></Reveal>
        </div>
        <div className="genesis-end-mark"><ArrowDown size={18} /><span>End of case study · back to selected work</span></div>
      </section>
    </main>
  );
}
