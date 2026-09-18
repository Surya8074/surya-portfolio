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
function TimelineStamp({time, href}:{time:string;href:string}){
  return <a className="v7-timestamp" href={href} aria-label={time}><span>{time}</span><i /></a>;
}

export default function GenesisV7(){
  const {scrollYProgress}=useScroll();
  const [progress,setProgress]=useState(0);
  const heroY=useTransform(scrollYProgress,[0,.2],[0,-80]);
  useEffect(()=>scrollYProgress.on('change',v=>setProgress(v)),[scrollYProgress]);
  return <main className="genesis-v7" id="top">
    <div className="v7-progress"><span style={{transform:`scaleX(${progress})`}}/></div>
    <header className="v7-nav">
      <a href="../../" className="v7-brand">SURYA KIRAN</a>
      <span>GENESIS / V7</span>
      <a href="../../">BACK TO WORK</a>
    </header>

    <GenesisHero />

    <div className="v7-layout">
      <aside className="v7-chapters" aria-label="Case study timeline">
        <div className="v7-timestamp-line" aria-hidden="true" />
        <TimelineStamp time="00:00" href="#s01" />
        <TimelineStamp time="00:15" href="#s02" />
        <TimelineStamp time="00:30" href="#s03" />
        <TimelineStamp time="00:45" href="#s04" />
        <TimelineStamp time="01:00" href="#s05" />
        <TimelineStamp time="01:15" href="#s06" />
        <TimelineStamp time="01:30" href="#s07" />
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
          <SectionLabel num="02" label="GOALS"/>
          <div className="v7-section-title"><h2>Two goal sets.<br/><em>One interaction model.</em></h2></div>
          <div className="v7-cards three">
            <Reveal><article className="v7-hover-card"><span>USER GOAL</span><h3>Get from codebase to running tests with less setup.</h3><p>Developers need momentum. QA leads need visibility and control over AI-assisted decisions.</p><div className="v7-card-arrow"><ArrowRight/></div></article></Reveal>
            <Reveal delay={.08}><article className="v7-hover-card"><span>BUSINESS GOAL</span><h3>Make automated coverage part of the release process.</h3><p>Genesis should support repeatable creation, execution and reporting—not a one-off generation moment.</p><div className="v7-card-arrow"><ArrowRight/></div></article></Reveal>
            <Reveal delay={.16}><article className="v7-hover-card dark"><span>DESIGN TENSION</span><h3>Configurability ↔ simplicity</h3><p>More controls increase confidence for technical users, but every decision adds setup friction. Progressive disclosure became the answer.</p><div className="v7-card-arrow"><ArrowRight/></div></article></Reveal>
          </div>
        </section>

        <section id="s03" className="v7-section">
          <SectionLabel num="03" label="WHO IT'S FOR"/>
          <div className="v7-section-title"><h2>Different users.<br/><em>Shared operational picture.</em></h2></div>
          <div className="v7-cards three personas">
            {[
              [ShieldCheck,'QA LEAD','Owns release sign-off','Needs a fast, trustworthy read on pass rate, coverage and issues before approving a release.'],
              [Sparkles,'DEVELOPER','Ships features, writes some tests','Wants to connect a project and reach useful coverage without becoming a QA specialist.'],
              [GitBranch,'DEVOPS ENGINEER','Owns pipeline uptime','Needs infrastructure health and execution status separated from test-quality signals.']
            ].map(([Icon,k,h,p],i)=>{const C=Icon as React.ComponentType<any>;return <Reveal key={k as string} delay={i*.08}><article className="v7-persona"><C/><span>{k as string}</span><h3>{h as string}</h3><p>{p as string}</p></article></Reveal>})}
          </div>
        </section>

        <section id="s04" className="v7-section">
          <SectionLabel num="04" label="DESIGN PRINCIPLES"/>
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

        <section id="s05" className="v7-section v7-flow">
          <SectionLabel num="05" label="THE WORKFLOW"/>
          <div className="v7-section-title"><h2>From first login<br/><em>to release evidence.</em></h2></div>
          <div className="v7-flow-track">
            {['Access','Orient','Configure','Validate','Run','Report'].map((x,i)=><React.Fragment key={x}><div className={i===3?'active':''}><small>0{i+1}</small><b>{x}</b></div>{i<5&&<i>→</i>}</React.Fragment>)}
          </div>
          <div className="v7-flow-note"><span>THE PRODUCT IDEA</span><p>Every stage reduces ambiguity before the next one introduces more consequence. The interface becomes a sequence of decisions rather than a sequence of screens.</p></div>
        </section>

        <section id="s06" className="v7-decisions">
          <div className="v7-decisions-intro"><SectionLabel num="06" label="SCREEN DECISIONS"/><h2>Same product.<br/><em>Different questions.</em></h2><p>The UI is shown as a set of product decisions—not a gallery of finished screens.</p></div>

          <div className="v7-decision">
            <div className="v7-decision-copy"><span>01 / ORIENTATION</span><h3>Give two audiences one shared operational picture.</h3><Reason intent="Answer whether the testing pipeline and the platform supporting it are healthy." decision="Separate product KPIs from infrastructure health rather than creating role-specific dashboards." why="QA and DevOps users look for different signals on the same landing surface. Organizing by scan intent reduces filtering." tradeoff="A unified grid is visually simpler, but it makes users filter unrelated signals. The hierarchy spends visual space to reduce that work."/></div>
            <Reveal><Screen src={screens.dashboard} label="dashboard" alt="Genesis Dashboard" zoom/></Reveal>
          </div>

          <div className="v7-decision reverse">
            <Reveal><Screen src={screens.inputs} label="input artifacts" alt="Genesis Input Artifacts" zoom/></Reveal>
            <div className="v7-decision-copy"><span>02 / CONTEXT</span><h3>Make the information feeding the AI visible.</h3><Reason intent="Establish the project context that downstream test generation depends on." decision="Treat source artifacts and documentation as first-class workflow objects." why="Users can reason about generated output more confidently when they can see what information established its context." tradeoff="Showing context adds another visible step. That friction is intentional because it makes the AI's starting point inspectable."/></div>
          </div>

          <div className="v7-decision">
            <div className="v7-decision-copy"><span>03 / AI CONFIGURATION</span><h3>Expose meaningful control without exposing implementation.</h3><Reason intent="Give users control over behavior that materially influences generated tests." decision="Group configuration around user intent instead of raw model or engineering terminology." why="The interface communicates that AI is configurable while keeping the decision surface understandable." tradeoff="A single Generate action would be faster. Configuration remains explicit because some users need to inspect and tune the system."/></div>
            <Reveal><Screen src={screens.ai} label="ai configuration" alt="Genesis AI Configuration" zoom/></Reveal>
          </div>

          <div className="v7-review">
            <div><span>04 / HUMAN CONTROL</span><h2>Review is a workflow state,<br/><em>not a confirmation dialog.</em></h2><p>Genesis draws a boundary between AI-assisted generation and execution. Review & Validate gives users a deliberate place to inspect, correct and confirm before the system progresses.</p><div className="v7-checkpoint"><Check/><div><b>HUMAN CHECKPOINT</b><span>AI output → inspect → validate → execute</span></div></div></div>
            <Reveal><Screen src={screens.review} label="review & validate" alt="Genesis Review and Validate" zoom/></Reveal>
          </div>

          <div className="v7-decision reverse">
            <Reveal><Screen src={screens.reports} label="reports" alt="Genesis Reports" zoom/></Reveal>
            <div className="v7-decision-copy"><span>05 / EVIDENCE</span><h3>Turn execution into release evidence.</h3><Reason intent="Help a QA lead understand not only whether tests passed, but where coverage and risk sit." decision="Place headline metrics above the breakdown so users move from summary to diagnostic detail." why="Pass/fail alone does not explain the shape of remaining risk. Coverage and test-type breakdowns provide the next layer of evidence." tradeoff="More information creates a denser report. The hierarchy keeps the first read simple while preserving depth underneath."/></div>
          </div>

          <div className="v7-gallery">
            <Reveal><Screen src={screens.project} label="project details" alt="Genesis Project Details" zoom/></Reveal>
            <Reveal delay={.08}><Screen src={screens.data} label="test data setup" alt="Genesis Test Data Setup" zoom/></Reveal>
          </div>
        </section>

        <section id="s07" className="v7-section v7-measure">
          <SectionLabel num="07" label="MEASUREMENT"/>
          <div className="v7-section-title"><h2>Measure the workflow, <em>not vanity metrics.</em></h2></div>
          <div className="v7-measure-grid">
            <article><LayoutDashboard/><span>ACTIVATION</span><h3>Time to first test run</h3><p>Shows whether the setup sequence gets a new project to meaningful execution without unnecessary friction.</p></article>
            <article><BarChart3/><span>WORKFLOW HEALTH</span><h3>Completion by step</h3><p>Reveals where users leave the workflow instead of collapsing onboarding into one number.</p></article>
            <article><Eye/><span>ADOPTION GUARDRAIL</span><h3>Reports checked before release</h3><p>Tests whether Genesis becomes part of release readiness rather than a one-time setup tool.</p></article>
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
