import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Eye, GitBranch, Layers3, ShieldCheck, SlidersHorizontal, Sparkles, Users } from 'lucide-react';
import GenesisHero from './GenesisHero';
import './genesis-case-study.css';
import './genesis-original-screens.css';
import './genesis-v5.css';

const screens = {
  context: '/surya-portfolio/genesis/Project-Details.webp',
  inputs: '/surya-portfolio/genesis/Input-Artifacts.webp',
  data: '/surya-portfolio/genesis/Test-Data-Setup.webp',
  ai: '/surya-portfolio/genesis/AI-Configuration.webp',
  review: '/surya-portfolio/genesis/Review-Validate.webp',
  dashboard: '/surya-portfolio/genesis/Dashboard.webp',
  reports: '/surya-portfolio/genesis/Reports.webp',
};

function Reveal({ children, delay = 0, className = '' }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .65, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

function Section({ number, eyebrow, title, copy, children, className = '' }) {
  return <section className={`v5-section ${className}`}>
    <div className="v5-heading"><div className="v5-index"><span>{number}</span><i /></div><div><p className="v5-kicker">{eyebrow}</p><h2>{title}</h2>{copy && <p className="v5-copy">{copy}</p>}</div></div>
    {children}
  </section>;
}

function Screen({ src, alt, label }) {
  return <div className="v5-screen"><div className="v5-screen-top"><span /><span /><span /><small>{label}</small></div><img src={src} alt={alt} loading="lazy" decoding="async" width="1920" /></div>;
}

function Context() {
  return <section className="v5-context">
    <div className="v5-context-lead"><p className="v5-kicker">THE PROJECT</p><h2>Genesis was not a feature to design. It was a new way to move through testing.</h2><p>I designed the end-to-end experience for an AI-powered test automation product — shaping how teams set context, configure AI, validate generated work, execute tests and understand results.</p></div>
    <div className="v5-meta">
      <div><span>ROLE</span><strong>Product Designer<br />Sole designer</strong></div>
      <div><span>TEAM</span><strong>PM · Engineers<br />Stakeholders</strong></div>
      <div><span>PRODUCT</span><strong>AI test automation<br />SaaS platform</strong></div>
      <div><span>DESIGN SCOPE</span><strong>End-to-end product<br />experience</strong></div>
    </div>
  </section>;
}

function SystemModel() {
  const steps = [
    ['01', 'Understand', 'Product context', Layers3],
    ['02', 'Prepare', 'Inputs + data', GitBranch],
    ['03', 'Configure', 'AI behaviour', SlidersHorizontal],
    ['04', 'Validate', 'Human checkpoint', ShieldCheck],
    ['05', 'Observe', 'Execution + reporting', Eye],
  ];
  return <div className="v5-system">
    <div className="v5-system-line" />
    {steps.map(([n, title, sub, Icon]) => <motion.article key={n} whileHover={{ y: -7 }} className="v5-system-node"><span>{n}</span><div><Icon size={18} /></div><h3>{title}</h3><p>{sub}</p></motion.article>)}
  </div>;
}

function Tension({ icon: Icon, number, title, copy, detail }) {
  return <article className="v5-tension"><div className="v5-tension-top"><span>{number}</span><Icon size={18} /></div><h3>{title}</h3><p>{copy}</p><div className="v5-tension-detail"><b>DESIGN RESPONSE</b><span>{detail}</span></div></article>;
}

function Decision({ number, eyebrow, title, copy, src, alt, label, reverse = false, children }) {
  return <section className={`v5-decision ${reverse ? 'reverse' : ''}`}>
    <div className="v5-decision-copy"><span className="v5-decision-number">{number}</span><p className="v5-kicker">{eyebrow}</p><h2>{title}</h2><p>{copy}</p>{children}</div>
    <Reveal className="v5-decision-visual"><Screen src={src} alt={alt} label={label} /></Reveal>
  </section>;
}

function Tradeoffs() {
  return <div className="v5-tradeoffs">
    <div className="v5-tradeoff"><span>01</span><div><b>Automation ↔ control</b><p>More automation only helps if users can see where it came from and intervene when it matters.</p></div></div>
    <div className="v5-tradeoff"><span>02</span><div><b>Configuration ↔ speed</b><p>AI settings need enough visibility to build confidence without turning setup into a technical wall.</p></div></div>
    <div className="v5-tradeoff"><span>03</span><div><b>System depth ↔ clarity</b><p>Genesis contains a complex testing lifecycle, so each screen needs one clear job inside the larger system.</p></div></div>
  </div>;
}

export default function GenesisV5() {
  return <main className="genesis-case-study genesis-v5">
    <GenesisHero />
    <Context />

    <Section number="01" eyebrow="THE PROBLEM" title="The hard part was not generating tests. It was everything around them." copy="Testing involves a chain of decisions before and after execution. Genesis created an opportunity to compress repetitive work while making the important decisions easier to understand.">
      <Reveal><div className="v5-problem"><div className="v5-problem-old"><span>BEFORE</span><h3>Testing work is distributed across tools, files and manual steps.</h3><div className="v5-chip-row"><b>Requirements</b><b>API / code</b><b>Test data</b><b>Configuration</b><b>Execution</b><b>Reports</b></div></div><div className="v5-problem-arrow"><ArrowRight size={19} /></div><div className="v5-problem-new"><span>OPPORTUNITY</span><h3>Bring the lifecycle into one guided product experience.</h3><div className="v5-flow"><b>Context</b><i>→</i><b>AI</b><i>→</i><b>Review</b><i>→</i><b>Results</b></div></div></div></Reveal>
    </Section>

    <Section number="02" eyebrow="THE DESIGN CHALLENGE" title="How do we make AI do more of the work without letting it decide everything?" copy="This question became the filter for the product experience. The goal was not to hide complexity behind AI, but to decide where automation helps and where human judgement needs to remain visible.">
      <Reveal><div className="v5-question"><div><Sparkles size={21} /><span>AI SHOULD</span><h3>Accelerate repetitive work.</h3></div><div><Users size={21} /><span>PEOPLE SHOULD</span><h3>Own consequential decisions.</h3></div><div><ShieldCheck size={21} /><span>THE PRODUCT SHOULD</span><h3>Make the boundary obvious.</h3></div></div></Reveal>
    </Section>

    <Section number="03" eyebrow="UNDERSTANDING THE SYSTEM" title="I treated Genesis as a system, not a collection of screens." copy="Before refining individual surfaces, I mapped the product around the user's progression from context to confidence. That model became the backbone for the case study and the interface architecture.">
      <Reveal><SystemModel /></Reveal>
    </Section>

    <Section number="04" eyebrow="DESIGN TENSIONS" title="Three tensions shaped the experience." copy="These were the recurring trade-offs behind the interface decisions. They helped keep the product useful for technical users without turning AI into a black box.">
      <div className="v5-tension-grid"><Tension number="01" icon={ShieldCheck} title="Automation without blind trust" copy="Generated work needs a visible path back to the information Genesis used." detail="Expose inputs and keep a deliberate validation step." /><Tension number="02" icon={SlidersHorizontal} title="Power without configuration overload" copy="Technical controls are valuable only when users understand why they are changing them." detail="Group configuration around meaningful AI capabilities." /><Tension number="03" icon={Eye} title="Complexity without visual noise" copy="The product has many moving parts, but each screen should answer one immediate question." detail="Use progressive disclosure and strong workflow hierarchy." /></div>
    </Section>

    <Decision number="05" eyebrow="DECISION 01 · INPUTS" title="Make the AI's starting point visible." copy="Instead of treating generation as magic, the product makes the source material explicit. Requirements, APIs and source-code context become tangible inputs that users can understand before the AI produces work." src={screens.inputs} alt="Genesis Input Artifacts screen" label="input artifacts" reverse>
      <div className="v5-note"><Check size={15} /><span>Decision: show what the system knows before asking users to trust what it generates.</span></div>
    </Decision>

    <Decision number="06" eyebrow="DECISION 02 · AI CONFIGURATION" title="Give users control over how AI behaves." copy="The configuration experience exposes the choices behind generation — language, model and capabilities — so the user is not left with a single opaque action. The interface turns an abstract AI layer into something configurable and legible." src={screens.ai} alt="Genesis AI Configuration screen" label="ai configuration">
      <div className="v5-note"><Check size={15} /><span>Decision: make important AI choices visible without making the user understand the underlying model technology.</span></div>
    </Decision>

    <Decision number="07" eyebrow="DECISION 03 · HUMAN CONTROL" title="Put a deliberate checkpoint between generation and action." copy="Review & Validate is where the product returns the decision to the person. Important configuration and project context are brought together before the workflow moves forward." src={screens.review} alt="Genesis Review and Validate screen" label="review & validate" reverse>
      <div className="v5-note"><Check size={15} /><span>Decision: make approval a designed product moment, not an accidental consequence of the flow.</span></div>
    </Decision>

    <Section number="08" eyebrow="THE REST OF THE LIFECYCLE" title="The setup flow only matters if the product continues to carry context." copy="After configuration, Genesis needs to help teams understand execution and results. Dashboard and reporting surfaces complete the loop from setup to ongoing quality visibility.">
      <Reveal><div className="v5-results-grid"><Screen src={screens.dashboard} alt="Genesis Dashboard screen" label="dashboard" /><Screen src={screens.reports} alt="Genesis Reports screen" label="reports" /></div></Reveal>
    </Section>

    <Section number="09" eyebrow="TRADE-OFFS" title="What I would protect when the product grows." copy="These are the principles I would carry into future iterations because they describe the product behaviour, not just the current visual design.">
      <Reveal><Tradeoffs /></Reveal>
    </Section>

    <section className="v5-outcome"><div className="v5-outcome-inner"><p className="v5-kicker">OUTCOME</p><h2>Genesis became a product experience where AI accelerates the workflow — while the user can still see, configure and validate what is happening.</h2><div className="v5-outcome-points"><div><b>01</b><span>Less emphasis on a single “Generate” moment.</span></div><div><b>02</b><span>More visibility into the context behind AI-assisted work.</span></div><div><b>03</b><span>Clearer human checkpoints across the lifecycle.</span></div></div></div></section>

    <section className="v5-reflection"><div><p className="v5-kicker">REFLECTION</p><h2>The hardest part was not designing an AI interface. It was deciding where the AI should be trusted, where it should be transparent, and where the user needed to remain responsible for the decision.</h2><p>This is the part of the project I would carry into the next AI product: good AI UX is not about making the system look intelligent. It is about making the relationship between system capability and human judgement clear.</p></div></section>

    <footer className="genesis-footer"><span>GENESIS / V5</span><h2>Designing AI to make testing lighter — without making the human role invisible.</h2><a href="../../">Back to portfolio <ArrowRight size={16} /></a></footer>
  </main>;
}
