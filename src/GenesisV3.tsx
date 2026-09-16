import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Check, Eye, Layers3, Sparkles, ShieldCheck, Timer, Zap } from 'lucide-react';
import GenesisHero from './GenesisHero';
import './genesis-v3.css';

const setup = [
  ['01','Project context','Define what is being tested before asking AI to act.'],
  ['02','Input artifacts','Give Genesis the product and code context it needs.'],
  ['03','Test data','Prepare the conditions behind realistic scenarios.'],
  ['04','AI configuration','Make model, language and capabilities explicit.'],
  ['05','Review & validate','Let the human verify the setup before creation.'],
] as const;

function Reveal({ children, className='' }: {children: React.ReactNode; className?: string}) {
  return <motion.div className={className} initial={{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.18}} transition={{duration:.65,ease:[.22,1,.36,1]}}>{children}</motion.div>;
}

function MiniUI({ type }: {type: 'dashboard'|'ai'|'review'|'report'}) {
  return <div className={`v3-ui v3-${type}`}>
    <div className="v3-bar"><span className="v3-brand">GENESIS</span><span>●</span></div>
    <div className="v3-ui-body">
      <div className="v3-side"><i/><i/><i/><i/><i/></div>
      <div className="v3-main">
        {type==='dashboard' && <><div className="v3-ui-title">Good morning, QA team.</div><div className="v3-kpis"><b>12<small>Active projects</small></b><b>47<small>Test cycles</small></b><b>94.2%<small>Pass rate</small></b><b>87.5%<small>Coverage</small></b></div><div className="v3-chart"><span/><span/><span/><span/><span/><span/></div></>}
        {type==='ai' && <><div className="v3-ui-title">Configure intelligence</div><div className="v3-option"><small>PROGRAMMING LANGUAGE</small><b>TypeScript <em>⌄</em></b></div><div className="v3-option"><small>LLM MODEL</small><b>GPT model <em>⌄</em></b></div><div className="v3-option"><small>CAPABILITIES</small><b><Check/> Test generation &nbsp; <Check/> Code analysis</b></div><div className="v3-ai-note"><Sparkles/> AI will use these choices when generating test artifacts.</div></>}
        {type==='review' && <><div className="v3-ui-title">Review before creation</div><div className="v3-review"><p>Project <b>Project Genesis</b><Check/></p><p>Language <b>TypeScript</b><Check/></p><p>LLM Model <b>GPT model</b><Check/></p><p>Synthetic data <b>Enabled</b><Check/></p><button>Create project <ArrowRight/></button></div></>}
        {type==='report' && <><div className="v3-ui-title">Testing insights</div><div className="v3-report-grid"><div><small>PASS RATE</small><b>94.2%</b></div><div><small>COVERAGE</small><b>87.5%</b></div><div className="v3-big-chart"><span/><span/><span/><span/><span/><span/><span/></div><div className="v3-bars"><i/><i/><i/><i/><i/></div></div></>}
      </div>
    </div>
  </div>;
}

function SectionTitle({eyebrow, title, children}:{eyebrow:string;title:string;children?:React.ReactNode}) { return <div className="v3-section-title"><div><span>{eyebrow}</span><h2>{title}</h2></div>{children&&<p>{children}</p>}</div> }

export default function GenesisV3(){
 return <main className="genesis-v3">
  <GenesisHero />

  <section className="v3-opening">
    <Reveal><span className="v3-eyebrow">THE PROJECT / IN ONE VIEW</span><h2>Testing moves fast.<br/><em>The work around it often doesn't.</em></h2></Reveal>
    <Reveal className="v3-opening-copy"><p>Genesis is an AI-powered test automation platform designed to reduce repetitive work across the testing lifecycle — from understanding product context and preparing inputs to generating, validating, executing and reporting on tests.</p><div className="v3-facts"><span><b>ROLE</b>Product Designer · Sole designer</span><span><b>TEAM</b>PM · Engineers · Stakeholders</span><span><b>FOCUS</b>AI · SaaS · Test automation</span><span><b>SCOPE</b>End-to-end product experience</span></div></Reveal>
  </section>

  <section className="v3-problem">
    <SectionTitle eyebrow="01 / WHY GENESIS" title="The problem wasn't just testing. It was everything people had to do around testing." >Software teams spend time moving between requirements, APIs, data, automation, execution and results. Genesis was created to bring that work into one AI-assisted product experience.</SectionTitle>
    <div className="v3-workload"><div className="v3-workload-label">BEFORE / MANUAL EFFORT</div>{['Understand requirements','Create test cases','Prepare test data','Configure automation','Run & investigate','Track coverage & results'].map((x,i)=><Reveal key={x} className="v3-work-item"><span>0{i+1}</span><b>{x}</b><i/></Reveal>)}</div>
  </section>

  <section className="v3-bigidea">
    <Reveal><span className="v3-eyebrow">02 / DESIGN CHALLENGE</span><h2>How do you make AI<br/><em>do more</em> without letting it<br/>decide everything?</h2></Reveal>
    <Reveal className="v3-ai-model"><div className="v3-ai-orbit"><span>AI</span><i/><i/><i/></div><div className="v3-ai-columns"><div><b>AI ASSISTS</b><p>Analyze context<br/>Generate artifacts<br/>Recommend actions</p></div><div><b>HUMANS DECIDE</b><p>Review<br/>Modify<br/>Approve</p></div></div></Reveal>
    <p className="v3-bigidea-note">The product experience was designed around a simple principle: <strong>use AI to remove repetitive work, while keeping consequential decisions visible and reviewable.</strong></p>
  </section>

  <section className="v3-system">
    <SectionTitle eyebrow="03 / PRODUCT SYSTEM" title="Genesis is more than a setup flow." >The five-step setup is one part of a larger system that connects preparation, AI assistance, execution and insight.</SectionTitle>
    <div className="v3-system-map"><div className="v3-system-line"/><div className="v3-system-node"><Layers3/><b>CONTEXT</b><span>Requirements<br/>Source code<br/>APIs</span></div><div className="v3-system-node active"><Sparkles/><b>AI ASSISTANCE</b><span>Generate<br/>Analyze<br/>Recommend</span></div><div className="v3-system-node"><ShieldCheck/><b>HUMAN CONTROL</b><span>Review<br/>Validate<br/>Approve</span></div><div className="v3-system-node"><Zap/><b>EXECUTION</b><span>Run tests<br/>Track results</span></div><div className="v3-system-node"><Eye/><b>INSIGHT</b><span>Coverage<br/>Reports</span></div></div>
  </section>

  <section className="v3-setup">
    <SectionTitle eyebrow="04 / SETUP, DECONSTRUCTED" title="Five steps. One job: give the AI enough context to be useful." >The setup sequence isn't the story by itself. It is the control layer that prepares the product before AI-generated work begins.</SectionTitle>
    <div className="v3-steps">{setup.map(([n,t,d],i)=><Reveal key={n} className="v3-step"><div className="v3-step-num">{n}</div><div><span>{t}</span><p>{d}</p></div><div className="v3-step-arrow">{i<4?<ArrowRight/>:<Check/>}</div></Reveal>)}</div>
  </section>

  <section className="v3-feature">
    <Reveal className="v3-feature-copy"><span className="v3-eyebrow">05 / AI CONFIGURATION</span><h2>Make the intelligence visible before it acts.</h2><p>AI settings can feel abstract when hidden behind a single “Generate” action. Genesis makes the important choices explicit: programming language, model and capabilities.</p><div className="v3-callout"><Sparkles/><span><b>DESIGN DECISION</b>Separate AI configuration from AI execution so users can understand the setup before committing to it.</span></div></Reveal>
    <Reveal><MiniUI type="ai"/></Reveal>
  </section>

  <section className="v3-feature v3-feature-reverse">
    <Reveal><MiniUI type="review"/></Reveal>
    <Reveal className="v3-feature-copy"><span className="v3-eyebrow">06 / HUMAN CONTROL</span><h2>Review is not a confirmation screen. It's a trust mechanism.</h2><p>Before the project is created, Genesis brings the important choices together. This gives the user a clear checkpoint between AI-assisted configuration and action.</p><div className="v3-control-flow"><span>AI recommends</span><ArrowRight/><span>Human reviews</span><ArrowRight/><span>Project proceeds</span></div></Reveal>
  </section>

  <section className="v3-dashboard">
    <SectionTitle eyebrow="07 / AFTER SETUP" title="The product doesn't end when the project is created." >Once the work is automated, the next problem is visibility. Teams need to know what is running, what is passing and where attention is required.</SectionTitle>
    <Reveal className="v3-dashboard-visual"><MiniUI type="dashboard"/></Reveal>
    <div className="v3-metrics"><div><Timer/><b>Less repetitive setup</b><span>Move recurring preparation into a guided workflow.</span></div><div><Zap/><b>Faster AI-assisted work</b><span>Use AI for generation and analysis instead of starting from zero.</span></div><div><Eye/><b>Clearer testing visibility</b><span>Bring activity, quality signals and coverage into view.</span></div></div>
  </section>

  <section className="v3-report">
    <Reveal className="v3-report-copy"><span className="v3-eyebrow">08 / FROM EXECUTION TO INSIGHT</span><h2>Automation creates data.<br/><em>Reporting turns it into decisions.</em></h2><p>Reports extend the experience beyond execution with trends, coverage, dependencies and logs so teams can understand what happened rather than simply seeing a pass/fail result.</p></Reveal>
    <Reveal><MiniUI type="report"/></Reveal>
  </section>

  <section className="v3-states"><SectionTitle eyebrow="09 / DESIGNING FOR TRUST" title="AI products need states that explain what is happening." /><div className="v3-state-grid">{[['EMPTY','Nothing has happened yet.'],['INPUT','The product needs context.'],['PROCESSING','AI is working on the request.'],['ERROR','Something needs attention.'],['SUCCESS','The action completed.']].map(([a,b])=><div key={a}><span>{a}</span><b>{b}</b><i/></div>)}</div></section>

  <section className="v3-outcome"><Reveal><span className="v3-eyebrow">10 / WHAT I DESIGNED</span><h2>A product that treats AI as a collaborator — not a black box.</h2><p>My contribution was to shape the experience around clarity, control and reduced manual effort: from the information architecture and setup flow to AI configuration, validation, monitoring and reporting surfaces.</p></Reveal><Reveal className="v3-outcome-list">{['End-to-end testing workflow','Human-in-the-loop AI interaction','Progressive disclosure of technical complexity','Dashboard & reporting experience','System states and feedback'].map((x,i)=><div key={x}><span>0{i+1}</span><b>{x}</b><Check/></div>)}</Reveal></section>

  <footer className="v3-footer"><span>GENESIS / PRODUCT CASE STUDY</span><h2>The goal wasn't to make testing more complicated with AI.<br/><em>It was to make the work around testing lighter.</em></h2><a href="../../">Back to portfolio <ArrowRight/></a></footer>
 </main>
}
