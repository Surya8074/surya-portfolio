import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import GenesisHero from './GenesisHero';
import './genesis-hero.css';
import { ArrowDown, ArrowRight, BarChart3, Check, Eye, GitBranch, LayoutDashboard, ShieldCheck, Sparkles } from 'lucide-react';

const A='/surya-portfolio/genesis/';
const screens={
  project:A+'Project-Details.webp',
  inputs:A+'Input-Artifacts.webp',
  data:A+'Test-Data-Setup.webp',
  ai:A+'AI-Configuration.webp',
  review:A+'Review-Validate.webp',
  dashboard:A+'Dashboard.webp',
  reports:A+'Reports.webp',
};

function Reveal({children,delay=0,className='' }:{children:React.ReactNode;delay?:number;className?:string}){
  return <motion.div className={className} initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.16}} transition={{duration:.75,delay,ease:[.22,1,.36,1]}}>{children}</motion.div>;
}
function MagneticLink({children}:{children:React.ReactNode}){
  return <a className="v7-link" href="#top">{children}<ArrowRight size={15}/></a>;
}
function Screen({src,label,alt,zoom=false}:{src:string;label:string;alt:string;zoom?:boolean}){
  return <figure className={'v7-screen '+(zoom?'is-zoom':'')}>
    <div className="v7-browser"><span/><span/><span/><small>{label}</small></div>
    <div className="v7-screen-image"><img src={src} alt={alt} loading="lazy"/></div>
  </figure>;
}
function Reason({intent,decision,why,tradeoff}:{intent:string;decision:string;why:string;tradeoff:string}){
  return <div className="v7-reason">
    {[['INTENT',intent],['DECISION',decision],['WHY IT MATTERS',why],['TRADE-OFF',tradeoff]].map(([k,v])=><div key={k}><span>{k}</span><p>{v}</p></div>)}
  </div>;
}
function SectionLabel({num,label}:{num:string;label:string}){
  return <div className="v7-section-label"><span>{num}</span><b>{label}</b></div>;
}
function ChapterStamp({num,label,href}:{num:string;label:string;href:string}){
  return <a className="v7-chapter-stamp" href={href} aria-label={label}><span>{num}</span><b>{label}</b><i /></a>;
}

export default function GenesisV7(){
  const {scrollYProgress}=useScroll();
  const [progress,setProgress]=useState(0);
  const [chaptersVisible,setChaptersVisible]=useState(false);
  useEffect(()=>scrollYProgress.on('change',v=>setProgress(v)),[scrollYProgress]);
  useEffect(()=>{
    const firstChapter=document.querySelector('#s01');
    const footer=document.querySelector('.v7-footer');
    if(!firstChapter || !footer) return;
    const updateVisibility=()=>{
      const firstRect=firstChapter.getBoundingClientRect();
      const footerRect=footer.getBoundingClientRect();
      const chapterStarted=firstRect.top <= window.innerHeight * .82;
      const footerStarted=footerRect.top <= window.innerHeight * .92;
      setChaptersVisible(chapterStarted && !footerStarted);
    };
    updateVisibility();
    window.addEventListener('scroll',updateVisibility,{passive:true});
    window.addEventListener('resize',updateVisibility);
    return()=>{
      window.removeEventListener('scroll',updateVisibility);
      window.removeEventListener('resize',updateVisibility);
    };
  },[]);
  return <main className="genesis-v7" id="top">
    <div className="v7-progress"><span style={{transform:`scaleX(${progress})`}}/></div>
    <GenesisHero />

    <section className="v7-intro" aria-label="Genesis case study introduction">
      <div className="v7-intro-inner">
        <div className="v7-intro-copy">
          <h2>From scattered QA work <em>to a controlled pipeline.</em></h2>
          <p>I shaped the product structure, workflow and interface around one constraint: automation only creates value when the people accountable for release quality can understand, review and trust what the system produces.</p>
        </div>
        <div className="v7-intro-meta">
          <div><span>ROLE</span><strong>Product / UI-UX Designer</strong></div>
          <div><span>PRODUCT</span><strong>Enterprise QA SaaS</strong></div>
          <div><span>PLATFORM</span><strong>Web · desktop-first</strong></div>
          <div><span>MY CONTRIBUTION</span><strong>Architecture · UX · UI</strong></div>
        </div>
        <a className="v7-intro-scroll" href="#s01"><span>SCROLL TO EXPLORE</span><i>↓</i></a>
      </div>
    </section>

    <div className="v7-layout">
      <aside className={`v7-chapters ${chaptersVisible ? '' : 'is-hidden'}`} aria-label="Case study chapters">
        <div className="v7-timestamp-line" aria-hidden="true" />
        <ChapterStamp num="01" label="PROBLEM" href="#s01" />
        <ChapterStamp num="02" label="USERS" href="#s02" />
        <ChapterStamp num="03" label="PRINCIPLES" href="#s03" />
        <ChapterStamp num="04" label="RESEARCH" href="#s04" />
        <ChapterStamp num="05" label="WORKFLOW" href="#s05" />
        <ChapterStamp num="06" label="DECISIONS" href="#s06" />
        <ChapterStamp num="07" label="MEASUREMENT" href="#s07" />
      </aside>

      <article className="v7-content">
        <section id="s01" className="v7-section v7-problem">
          <SectionLabel num="01" label="THE PROBLEM"/>
          <div className="v7-section-title"><h2>The hard part wasn't generating tests. <em>It was making them trustworthy.</em></h2></div>
          <div className="v7-copy-grid"><p>QA teams often assemble release confidence from several places: requirements, source code, test data, environment configuration, execution status and coverage reports.</p><p>The opportunity was to bring those dependencies into one guided experience without turning Genesis into an engineering console.</p></div>
          <Reveal><div className="v7-system">
            <div><span>INPUTS</span><b>Repository</b><b>Requirements</b><b>Test data</b></div>
            <div className="v7-system-core"><small>GENESIS PIPELINE</small><strong>Context <i>→</i> Configure <i>→</i> Generate <i>→</i> Validate <i>→</i> Run</strong></div>
            <div><span>OUTPUTS</span><b>Execution</b><b>Coverage</b><b>Reports</b></div>
          </div></Reveal>
        </section>

        <section id="s02" className="v7-section">
          <SectionLabel num="02" label="WHO IT'S FOR"/>
          <div className="v7-section-title"><h2>Different users.<br/><em>Shared operational picture.</em></h2></div>
          <div className="v7-cards three personas">
            {[
              [ShieldCheck,'QA LEAD','Owns release sign-off','Needs a fast, trustworthy read on pass rate, coverage and issues before approving a release.'],
              [Sparkles,'DEVELOPER','Ships features, writes some tests','Wants to connect a project and reach useful coverage without becoming a QA specialist.'],
              [GitBranch,'DEVOPS ENGINEER','Owns pipeline uptime','Needs infrastructure health and execution status separated from test-quality signals.']
            ].map(([Icon,k,h,p],i)=>{const C=Icon as React.ComponentType<any>;return <Reveal key={k as string} delay={i*.08}><article className="v7-persona"><C/><span>{k as string}</span><h3>{h as string}</h3><p>{p as string}</p></article></Reveal>})}
          </div>
        </section>

        <section id="s03" className="v7-section">
          <SectionLabel num="03" label="DESIGN PRINCIPLES"/>
          <div className="v7-section-title"><h2>Four rules kept the system coherent <em>as the workflow expanded.</em></h2></div>
          <div className="v7-principles">
            {[
              ['01','Progressive trust','Generated output reaches execution only after an explicit review state.'],
              ['02','Scan intent','Dashboard information is organized around pipeline and infrastructure health.'],
              ['03','Status before inventory','Cycles prioritize Ready, In progress and Pending so the default view answers what needs attention.'],
              ['04','One component system','Cards, status treatments, fields and table patterns are reused across the product.']
            ].map(([n,t,p],i)=><Reveal key={n} delay={i*.06}><article className="v7-principle"><b>{n}</b><h3>{t}</h3><p>{p}</p></article></Reveal>)}
          </div>
        </section>

        <section id="s04" className="v7-section v7-research-section">
          <SectionLabel num="04" label="RESEARCH & VALIDATION"/>
          <div className="v7-section-title"><h2>Assumptions were treated as <em>hypotheses, not defaults.</em></h2></div>
          <div className="v7-research-intro">
            <p>The core design risk was trust: whether a QA lead could rely on output they did not author. I used competitive teardown and structured critique to pressure-test where that trust could break, then translated the findings into interface hypotheses.</p>
            <div className="v7-research-note"><span>RESEARCH BASIS</span><b>Desk research · competitive teardown · structured design critique</b><small>Before a production build, this should be followed by direct interviews with QA leads and developers.</small></div>
          </div>

          <div className="v7-research-block">
            <div className="v7-research-heading"><span>01 / COMPETITIVE TEARDOWN</span><h3>Where does the system explain itself, and where can a human intervene?</h3></div>
            <div className="v7-competitors">
              <article><div className="v7-comp-top"><b>KATALON</b><span>AI-assisted testing</span></div><p>AI can help create and execute testing workflows while keeping human guidance and review visible at consequential moments.</p><strong>TAKE → Keep approval and evidence visible.</strong><a href="https://docs.katalon.com/katalon-platform/execute/manual-executions/create-a-manual-test-run" target="_blank" rel="noreferrer">Source ↗</a></article>
              <article><div className="v7-comp-top"><b>TESTIM</b><span>AI + stability</span></div><p>AI-powered smart locators make generated or maintained tests more resilient while keeping meaningful controls visible to users.</p><strong>TAKE → Hide implementation complexity, expose meaningful control.</strong><a href="https://www.testim.io/test-automation-tool/" target="_blank" rel="noreferrer">Source ↗</a></article>
              <article><div className="v7-comp-top"><b>MABL</b><span>Agentic lifecycle</span></div><p>mabl frames testing as a lifecycle spanning creation, execution, failure analysis and maintenance, with shared quality signals.</p><strong>TAKE → Design for the lifecycle, not one generation moment.</strong><a href="https://www.mabl.com/agentic-testing-for-software-development-mabl" target="_blank" rel="noreferrer">Source ↗</a></article>
              <article><div className="v7-comp-top"><b>SAUCE LABS AURA</b><span>Release assurance</span></div><p>AURA positions testing as a closed loop across intent, authoring, execution and analysis with human oversight.</p><strong>TAKE → Make release confidence the outcome, not generation.</strong><a href="https://saucelabs.com/why-sauce" target="_blank" rel="noreferrer">Source ↗</a></article>
            </div>
            <div className="v7-research-heading"><span>02 / ASSUMPTION MAPPING</span><h3>Every non-obvious decision started as a statement we could challenge.</h3></div>
            <div className="v7-assumptions">
              <div><span>HYPOTHESIS</span><b>“Users won't trust output they can't trace back to its context.”</b><small>→ Led to visible Input Artifacts and context-first setup.</small></div>
              <div><span>HYPOTHESIS</span><b>“AI configuration should describe intent, not model mechanics.”</b><small>→ Led to task-oriented controls instead of raw parameters.</small></div>
              <div><span>HYPOTHESIS</span><b>“A release decision needs a deliberate human checkpoint.”</b><small>→ Led to Review & Validate as a workflow state.</small></div>
              <div><span>HYPOTHESIS</span><b>“A dashboard should answer what needs attention before showing everything.”</b><small>→ Led to status-first triage and a two-tier information hierarchy.</small></div>
            </div>
          </div>

          <div className="v7-research-block">
            <div className="v7-research-heading"><span>03 / VALIDATION TARGETS</span><h3>Define the bar before the screen exists.</h3></div>
            <div className="v7-validation-grid">
              <article><span>INPUT CONTEXT</span><b>Can a user explain what information the AI is using?</b><p>Check through a cold-read walkthrough: ask the reviewer to identify the visible inputs before moving forward.</p></article>
              <article><span>AI CONFIGURATION</span><b>Can a user predict what changing a control will affect?</b><p>Check through a critique: remove implementation language and test whether the control's consequence is still understandable.</p></article>
              <article><span>REVIEW & VALIDATE</span><b>Is the human checkpoint understood as a required decision?</b><p>Check whether the state reads as inspect → correct → approve rather than a generic confirmation dialog.</p></article>
              <article><span>REPORTS</span><b>Can a QA lead move from pass/fail to the source of remaining risk?</b><p>Check whether the first scan naturally moves from headline metrics into coverage and failure detail.</p></article>
            </div>
          </div>

          <div className="v7-research-closing"><b>WHAT THIS RESEARCH DID — AND DID NOT — PROVE</b><p>This validation layer pressure-tests the design direction; it is not a substitute for formal discovery interviews. The next research input is direct conversation with QA leads and developers before a real production build.</p></div>
        </section>

        <section id="s05" className="v7-section v7-flow">
          <SectionLabel num="05" label="THE WORKFLOW"/>
          <div className="v7-section-title"><h2>From first login<br/><em>to release evidence.</em></h2></div>
          <div className="v7-flow-track">
            {['Access','Orient','Configure','Validate','Run','Report'].map((x,i)=><React.Fragment key={x}><div className={i===3?'active':''}><small>0{i+1}</small><b>{x}</b></div>{i<5&&<i>→</i>}</React.Fragment>)}
          </div>
          <div className="v7-flow-note"><span>THE PRODUCT IDEA</span><p>Every stage reduces ambiguity before the next one introduces more consequence. The interface becomes a sequence of decisions rather than a sequence of screens.</p></div>
        </section>

        <section id="s08" className="v7-decisions">
          <div className="v7-decisions-intro"><SectionLabel num="06" label="SCREEN DECISIONS"/><h2>Same product.<br/><em>Different questions.</em></h2><p>The real interface becomes the evidence for the product decisions behind Genesis.</p></div>

          <div className="v7-decision">
            <div className="v7-decision-copy"><span>01 / ORIENTATION</span><h3>Give two audiences one shared operational picture.</h3><Reason intent="Answer whether the testing pipeline and the platform supporting it are healthy." decision="Separate product KPIs from infrastructure health rather than creating role-specific dashboards." why="QA and DevOps users look for different signals on the same landing surface. Organizing by scan intent reduces filtering." tradeoff="A unified grid is visually simpler, but it makes users filter unrelated signals. The hierarchy spends visual space to reduce that work."/></div>
            <Reveal><Screen src={screens.dashboard} label="dashboard" alt="Genesis Dashboard" zoom/></Reveal>
          </div>

          <div className="v7-decision reverse">
            <Reveal><Screen src={screens.project} label="project details" alt="Genesis Project Details" zoom/></Reveal>
            <div className="v7-decision-copy"><span>02 / PROJECT CONTEXT</span><h3>Start with the system being tested—not the AI.</h3><Reason intent="Establish the product boundary before technical configuration begins." decision="Make project identity and purpose the first explicit setup decision." why="A clear project anchor gives every downstream artifact, data and AI decision a stable context." tradeoff="The first step is intentionally simple. Advanced configuration is deferred until the system being tested is understood."/></div>
          </div>

          <div className="v7-decision">
            <div className="v7-decision-copy"><span>03 / INPUT CONTEXT</span><h3>Make the information feeding the AI visible.</h3><Reason intent="Establish the context that downstream test generation depends on." decision="Treat source artifacts and documentation as first-class workflow objects." why="Users can reason about generated output more confidently when they can see what information established its context." tradeoff="Showing context adds another visible step. That friction is intentional because it makes the AI's starting point inspectable."/></div>
            <Reveal><Screen src={screens.inputs} label="input artifacts" alt="Genesis Input Artifacts" zoom/></Reveal>
          </div>

          <div className="v7-decision reverse">
            <Reveal><Screen src={screens.data} label="test data setup" alt="Genesis Test Data Setup" zoom/></Reveal>
            <div className="v7-decision-copy"><span>04 / TEST CONDITIONS</span><h3>Treat test data as part of the system, not an afterthought.</h3><Reason intent="Prepare the runtime conditions required for meaningful test execution." decision="Keep test-data configuration separate from artifact ingestion, but within the same guided setup." why="Requirements explain what to test; data explains the conditions under which it should be tested." tradeoff="An additional step makes setup longer, but prevents important runtime assumptions from disappearing into implementation."/></div>
          </div>

          <div className="v7-decision">
            <div className="v7-decision-copy"><span>05 / AI CONFIGURATION</span><h3>Expose meaningful control without exposing implementation.</h3><Reason intent="Give users control over behavior that materially influences generated tests." decision="Group configuration around user intent instead of raw model or engineering terminology." why="The interface communicates that AI is configurable while keeping the decision surface understandable." tradeoff="A single Generate action would be faster. Configuration remains explicit because some users need to inspect and tune the system."/></div>
            <Reveal><Screen src={screens.ai} label="ai configuration" alt="Genesis AI Configuration" zoom/></Reveal>
          </div>

          <div className="v7-review">
            <div><span>06 / HUMAN CONTROL</span><h2>Review is a workflow state,<br/><em>not a confirmation dialog.</em></h2><p>Genesis draws a boundary between AI-assisted generation and execution. Review & Validate gives users a deliberate place to inspect, correct and confirm before the system progresses.</p><div className="v7-checkpoint"><Check/><div><b>HUMAN CHECKPOINT</b><span>AI output → inspect → validate → execute</span></div></div></div>
            <Reveal><Screen src={screens.review} label="review & validate" alt="Genesis Review and Validate" zoom/></Reveal>
          </div>

          <div className="v7-decision reverse">
            <Reveal><Screen src={screens.reports} label="reports" alt="Genesis Reports" zoom/></Reveal>
            <div className="v7-decision-copy"><span>07 / EVIDENCE</span><h3>Turn execution into release evidence.</h3><Reason intent="Help a QA lead understand not only whether tests passed, but where coverage and risk sit." decision="Place headline metrics above the breakdown so users move from summary to diagnostic detail." why="Pass/fail alone does not explain the shape of remaining risk. Coverage and test-type breakdowns provide the next layer of evidence." tradeoff="More information creates a denser report. The hierarchy keeps the first read simple while preserving depth underneath."/></div>
          </div>
        </section>

        <section id="s07" className="v7-section v7-measure">
          <SectionLabel num="07" label="MEASUREMENT"/>
          <div className="v7-section-title"><h2>Define success before launch, <em>then measure the workflow.</em></h2></div>
          <div className="v7-measure-grid">
            <article><LayoutDashboard/><span>ACTIVATION</span><h3>Time to first test run</h3><p>Proposed launch metric: track the median time from project connection to a first meaningful run.</p></article>
            <article><BarChart3/><span>WORKFLOW HEALTH</span><h3>Completion by step</h3><p>Proposed funnel metric: identify the exact step where users pause, abandon or backtrack.</p></article>
            <article><Eye/><span>ADOPTION GUARDRAIL</span><h3>Reports checked before release</h3><p>Proposed adoption signal: measure how often reports are opened or referenced before release decisions.</p></article>
          </div>
        </section>
      </article>
    </div>

    <footer className="v7-footer">
      <div className="v7-footer-kicker">DESIGN REFLECTION</div>
      <h2>The central problem was not making AI feel intelligent. It was defining where <em>system capability ends and human accountability begins.</em></h2>
      <p>Inputs are visible. Configuration is intentional. Generated work is reviewable. Evidence remains available after execution.</p>
      <div className="v7-footer-bottom"><span>GENESIS / FINAL CASE STUDY</span><MagneticLink>Back to portfolio</MagneticLink></div>
    </footer>
  </main>;
}
