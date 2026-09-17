import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, ShieldCheck, Sparkles, LayoutDashboard, SlidersHorizontal, Eye, GitBranch, BarChart3 } from 'lucide-react';

const screens = {
  login: '/surya-portfolio/genesis/Project-Details.webp',
  inputs: '/surya-portfolio/genesis/Input-Artifacts.webp',
  data: '/surya-portfolio/genesis/Test-Data-Setup.webp',
  ai: '/surya-portfolio/genesis/AI-Configuration.webp',
  review: '/surya-portfolio/genesis/Review-Validate.webp',
  dashboard: '/surya-portfolio/genesis/Dashboard.webp',
  reports: '/surya-portfolio/genesis/Reports.webp',
};

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .7, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

function Screen({ src, label, alt }: { src: string; label: string; alt: string }) {
  return <figure className="v6-screen"><div className="v6-browser"><span/><span/><span/><small>{label}</small></div><img src={src} alt={alt} loading="lazy" /></figure>;
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="v6-meta-item"><span>{label}</span><strong>{children}</strong></div>;
}

function Section({ number, label, title, children }: { number: string; label: string; title: string; children: React.ReactNode }) {
  return <section className="v6-section"><div className="v6-section-head"><span>{number}</span><div><p className="v6-eyebrow">{label}</p><h2>{title}</h2></div></div>{children}</section>;
}

function ScreenReason({ intent, decision, why, tradeoff }: { intent: string; decision: string; why: string; tradeoff: string }) {
  return <div className="v6-reason"><div><span>INTENT</span><p>{intent}</p></div><div><span>DECISION</span><p>{decision}</p></div><div><span>WHY IT MATTERS</span><p>{why}</p></div><div><span>TRADE-OFF</span><p>{tradeoff}</p></div></div>;
}

export default function GenesisV6() {
  return <main className="genesis-v6">
    <header className="v6-hero">
      <div className="v6-topline"><span>PRODUCT DESIGN CASE STUDY</span><span>GENESIS / V6</span></div>
      <div className="v6-hero-copy"><p className="v6-eyebrow">AI-POWERED TEST AUTOMATION · ENTERPRISE SAAS</p><h1>Turning a manual QA workflow into a <em>five-step AI pipeline.</em></h1><p className="v6-lead">Genesis is an enterprise test-automation platform built around a simple product constraint: automation only creates value when the people responsible for release quality can understand, review and trust what the system produces.</p></div>
      <div className="v6-meta-grid"><Meta label="ROLE">Product / UI-UX designer</Meta><Meta label="PRODUCT">Enterprise SaaS · QA tooling</Meta><Meta label="PLATFORM">Web · desktop-first</Meta><Meta label="TOOLS">Figma</Meta></div>
      <div className="v6-hero-line"><span>SCROLL TO EXPLORE</span><i/></div>
    </header>

    <Section number="01" label="THE PROBLEM" title="The challenge wasn't generating tests. It was making automated testing trustworthy enough to operate as a release workflow.">
      <div className="v6-two-col"><p>QA teams often assemble release confidence from several places: requirements, source code, test data, environment configuration, execution status and coverage reports. The product opportunity was to bring those dependencies into one guided experience without turning the interface into an engineering console.</p><p>The harder design problem was trust. If AI generates part of the test suite, users need to understand the context behind that output and have a deliberate point where they can review it before execution.</p></div>
      <Reveal><div className="v6-problem-map"><div><span>INPUTS</span><b>Repository</b><b>Requirements</b><b>Test data</b></div><ArrowRight/><div className="v6-highlight"><span>GENESIS PIPELINE</span><strong>Context → Configure → Generate → Validate → Run</strong></div><ArrowRight/><div><span>OUTPUTS</span><b>Execution</b><b>Coverage</b><b>Reports</b></div></div></Reveal>
    </Section>

    <Section number="02" label="GOALS" title="Two goal sets. One interaction model.">
      <div className="v6-goals"><article><span>USER GOALS</span><h3>Move from codebase to running tests with less setup.</h3><p>Developers need a low-friction path through the workflow while QA leads need enough visibility to understand and control the AI-assisted decisions.</p></article><article><span>BUSINESS GOALS</span><h3>Make automated coverage part of the release process.</h3><p>The product needs to support repeatable test creation, execution and reporting rather than functioning as a one-off AI generation tool.</p></article><article className="v6-tension"><span>THE DESIGN TENSION</span><h3>Configurability ↔ simplicity</h3><p>More controls can increase confidence for technical users, but every additional decision increases setup friction. The wizard resolves this through progressive disclosure.</p></article></div>
    </Section>

    <Section number="03" label="WHO IT'S FOR" title="Different users, shared workflow, different scan intent.">
      <div className="v6-personas"><article><ShieldCheck/><span>QA LEAD</span><h3>Owns release sign-off</h3><p>Needs a fast, trustworthy read on pass rate, coverage and issues before approving a release.</p></article><article><Sparkles/><span>DEVELOPER</span><h3>Ships features, writes some tests</h3><p>Wants to connect a project and reach useful coverage without becoming a QA specialist.</p></article><article><GitBranch/><span>DEVOPS ENGINEER</span><h3>Owns pipeline uptime</h3><p>Needs infrastructure health and execution status separated from test-quality signals.</p></article></div>
    </Section>

    <Section number="04" label="DESIGN PRINCIPLES" title="Four principles kept the system coherent as the workflow expanded.">
      <div className="v6-principles"><article><b>01</b><h3>Progressive trust before automation</h3><p>Generated output reaches execution only after an explicit review state. The gate is a product rule, not merely a screen.</p></article><article><b>02</b><h3>Segment by scan intent</h3><p>Dashboard information is organized around pipeline health and infrastructure health instead of rigid role-based views.</p></article><article><b>03</b><h3>Status before inventory</h3><p>Test cycles prioritize Ready, In progress and Pending states so the default view answers what needs attention now.</p></article><article><b>04</b><h3>One component system</h3><p>Cards, status treatments, fields and table patterns are reused across the wizard, Dashboard and Reports.</p></article></div>
    </Section>

    <Section number="05" label="THE FLOW" title="From first login to a release-readiness report.">
      <Reveal><div className="v6-pipeline"><div><span>01</span><b>Login / SSO</b><small>Enterprise access</small></div><i>→</i><div><span>02</span><b>Dashboard</b><small>Pipeline overview</small></div><i>→</i><div className="active"><span>03</span><b>Setup wizard</b><small>Five decisions</small></div><i>→</i><div><span>04</span><b>Test cycles</b><small>Run & monitor</small></div><i>→</i><div><span>05</span><b>Reports</b><small>Coverage & evidence</small></div></div></Reveal>
    </Section>

    <section className="v6-screen-story">
      <div className="v6-screen-intro"><p className="v6-eyebrow">SCREEN BY SCREEN</p><h2>Each surface answers one question.</h2><p>Rather than presenting the UI as a collection of finished screens, this section shows the product decision behind each one — what the user needs, what the interface prioritizes and what friction was intentionally accepted.</p></div>

      <div className="v6-screen-block"><div className="v6-screen-copy"><span>01 / ACCESS</span><h3>Enterprise auth comes first, not as an afterthought.</h3><ScreenReason intent="Get an enterprise user into the product through the authentication method their organization already requires." decision="Lead with enterprise authentication options and keep the credential path visible as an alternative." why="For an enterprise QA product, access requirements are part of the product experience. Authentication is not separate from the adoption story." tradeoff="More options make the first screen heavier than a consumer login. That complexity is deliberate because the user is entering an enterprise environment."/></div><Reveal><Screen src={screens.login} label="project context" alt="Genesis product interface"/></Reveal></div>

      <div className="v6-screen-block reverse"><Reveal><Screen src={screens.dashboard} label="dashboard" alt="Genesis Dashboard"/></Reveal><div className="v6-screen-copy"><span>02 / ORIENTATION</span><h3>Give two audiences one shared operational picture.</h3><ScreenReason intent="Answer whether the testing pipeline and the platform supporting it are healthy." decision="Separate product KPIs from infrastructure health rather than creating role-specific dashboards." why="QA and DevOps users look for different signals on the same landing surface. Organizing by scan intent keeps the information shared without making it indistinguishable." tradeoff="A unified grid is visually simpler to build, but it makes users filter unrelated signals. The two-layer hierarchy spends visual space to reduce that filtering."/></div></div>

      <div className="v6-screen-block"><div className="v6-screen-copy"><span>03 / TRIAGE</span><h3>Prioritize what needs action before what merely exists.</h3><ScreenReason intent="Show what is ready, in progress or waiting, and let the user act from the same surface." decision="Group cycles by current status and expose bulk execution with an estimated run time." why="QA work is often organized around a release window. The primary question is usually what should run now, not which project contains a cycle." tradeoff="Status grouping is less efficient for occasional name-based lookup. The design favors the daily triage task over the occasional search task."/></div><Reveal><Screen src={screens.data} label="test cycles / data" alt="Genesis Test Data Setup"/></Reveal></div>

      <div className="v6-wizard-stage"><div><span>04 / SETUP WIZARD</span><h2>The centerpiece: ordered by decision weight, not convenience.</h2><p>The wizard moves from low-effort context gathering toward the decisions that materially affect AI output. The sequence creates momentum before asking for technical configuration, then inserts a deliberate review gate before execution.</p></div><div className="v6-step-rail"><b>01 <span>Project details</span></b><b>02 <span>Input artifacts</span></b><b>03 <span>Test data</span></b><b className="active">04 <span>AI configuration</span></b><b>05 <span>Review & validate</span></b></div></div>

      <div className="v6-screen-block reverse"><Reveal><Screen src={screens.inputs} label="input artifacts" alt="Genesis Input Artifacts"/></Reveal><div className="v6-screen-copy"><span>04 / INPUT CONTEXT</span><h3>Make the information feeding the AI visible.</h3><ScreenReason intent="Establish the project context that downstream test generation depends on." decision="Treat source artifacts and documentation as first-class workflow objects rather than hidden dependencies." why="Users can reason about generated output more confidently when they can see what information established its context." tradeoff="Showing context adds another visible step. That friction is intentional because it makes the AI's starting point inspectable."/></div></div>

      <div className="v6-screen-block"><div className="v6-screen-copy"><span>05 / AI CONFIGURATION</span><h3>Expose meaningful control without exposing the implementation.</h3><ScreenReason intent="Give users control over the behavior that materially influences generated tests." decision="Group configuration around user intent instead of exposing raw model or engineering terminology." why="The interface needs to communicate that AI is configurable while keeping the decision surface understandable." tradeoff="A single Generate action would be faster for simple users. Configuration is retained as an explicit step because some users need to inspect and tune the system."/></div><Reveal><Screen src={screens.ai} label="ai configuration" alt="Genesis AI Configuration"/></Reveal></div>

      <div className="v6-review"><div className="v6-review-copy"><span>06 / HUMAN CONTROL</span><h2>Review is a workflow state, not a confirmation dialog.</h2><p>The product draws a boundary between AI-assisted generation and execution. Review & Validate brings the relevant project context and configuration together so the user can inspect, correct and confirm before the system progresses.</p><div className="v6-control"><Check/><div><b>HUMAN CHECKPOINT</b><span>AI output → inspect → validate → execute</span></div></div></div><Reveal><Screen src={screens.review} label="review & validate" alt="Genesis Review and Validate"/></Reveal></div>

      <div className="v6-screen-block reverse"><Reveal><Screen src={screens.reports} label="reports" alt="Genesis Reports"/></Reveal><div className="v6-screen-copy"><span>07 / EVIDENCE</span><h3>Reports turn execution into release evidence.</h3><ScreenReason intent="Help a QA lead understand not only whether tests passed, but where coverage and risk sit." decision="Place headline metrics above the breakdown so users can move from summary to diagnostic detail." why="A binary pass/fail answer does not explain the shape of the remaining risk. Coverage and test-type breakdowns provide the next layer of evidence." tradeoff="More information creates a denser report. The hierarchy keeps the first read simple while preserving diagnostic depth underneath."/></div></div>
    </section>

    <Section number="06" label="MEASUREMENT PLAN" title="Real product numbers should come from the product, not the portfolio.">
      <div className="v6-measure"><article><LayoutDashboard/><span>ACTIVATION</span><h3>Time to first test run</h3><p>Measures whether the setup sequence gets a new project to a meaningful first execution without unnecessary friction.</p></article><article><BarChart3/><span>WORKFLOW HEALTH</span><h3>Wizard completion by step</h3><p>Shows where users leave the workflow and makes the individual decision points measurable rather than treating onboarding as one number.</p></article><article><Eye/><span>ADOPTION GUARDRAIL</span><h3>Reports checks before release</h3><p>Tests whether the product becomes part of the release-readiness habit instead of being used only for initial setup.</p></article></div>
    </Section>

    <section className="v6-closing"><p className="v6-eyebrow">DESIGN REFLECTION</p><h2>The central design problem was not how to make AI feel intelligent. It was defining where system capability ends and human accountability begins.</h2><p>Genesis became a useful design exercise in making an AI-assisted workflow understandable: inputs are visible, configuration is intentional, generated work is reviewable and operational evidence remains available after execution.</p><div className="v6-end"><span>GENESIS / V6</span><a href="../../">Back to portfolio <ArrowRight size={16}/></a></div></section>
  </main>;
}
