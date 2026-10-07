import React, { useEffect, useState } from 'react';

const BASE = '/surya-portfolio/comski/';

function Screen({src,alt,label,wide=false}:{src:string;alt:string;label:string;wide?:boolean}) {
  return <figure className={`cv4-screen ${wide?'wide':''}`}>
    <div className="cv4-screen-frame">
      <div className="cv4-screen-top"><span/><span/><span/><b>{label}</b></div>
      <img src={BASE+src} alt={alt} loading="lazy"/>
    </div>
    <figcaption>{label}</figcaption>
  </figure>;
}
function Number({n}:{n:string}){return <div className="cv4-num">{n}</div>}
function Section({n,title,children,accent='blue'}:{n:string;title:string;children:React.ReactNode;accent?:string}){
 return <section className={`cv4-section accent-${accent}`} id={`s${n}`}><Number n={n}/><div className="cv4-section-body"><div className="cv4-kicker">{title}</div>{children}</div></section>;
}
function Tag({children,tone='' }:{children:React.ReactNode;tone?:string}){return <span className={`cv4-tag ${tone}`}>{children}</span>}
function Decision({title,why,alt,tradeoff}:{title:string;why:string;alt:string;tradeoff:string}){
 return <article className="cv4-decision"><b>{title}</b><p><strong>Why</strong>{why}</p><p><strong>Alternative</strong>{alt}</p><p><strong>Trade-off</strong>{tradeoff}</p></article>
}

export default function ComskiCaseStudyCV4(){
 const [progress,setProgress]=useState(0);
 useEffect(()=>{const f=()=>{const m=document.documentElement.scrollHeight-innerHeight;setProgress(m>0?scrollY/m:0)};f();addEventListener('scroll',f,{passive:true});return()=>removeEventListener('scroll',f)},[]);
 return <main className="cv4-page">
  <div className="cv4-progress"><span style={{transform:`scaleX(${progress})`}}/></div>
  <nav className="cv4-nav">
   <a className="cv4-brand" href="/surya-portfolio/"><strong>Surya Kiran</strong><span>Product Designer</span></a>
   <div className="cv4-nav-links"><a href="#s01">Case study</a><a href="#s06">Process</a><a href="#s16">Outcomes</a></div>
   <a className="cv4-connect" href="mailto:hello@surya.design">Let's Connect</a>
  </nav>

  <header className="cv4-hero">
   <div className="cv4-hero-orb orb-a"/><div className="cv4-hero-orb orb-b"/>
   <div className="cv4-hero-copy">
    <div className="cv4-index"><span>01</span><b>Case Study — ComSki</b></div>
    <h1>Breaking the<br/>presentation-freeze<br/>loop — designing <em>ComSki.</em></h1>
    <p className="cv4-hero-lede">A communication coach designed around learner context, four communication skills and a continuous practice loop — rather than treating assessment as a one-off test.</p>
    <div className="cv4-meta"><div><small>ROLE</small><b>Product Designer</b></div><div><small>SCOPE</small><b>End-to-end product design</b></div><div><small>TEAM</small><b>Solo ownership</b></div><div><small>TIMELINE</small><b>1 month</b></div></div>
    <div className="cv4-evidence-note"><b>Evidence boundary</b><span>Project screens and product artefacts are factual. Research findings, outcomes and metrics that were not recorded are presented as hypotheses or proposed validation—not as verified results.</span></div>
   </div>
   <div className="cv4-hero-device">
    <div className="cv4-laptop"><div className="cv4-laptop-screen"><img src={BASE+'Desktop - 1.svg'} alt="ComSki product dashboard"/></div><div className="cv4-laptop-base"/></div>
    <div className="cv4-callout callout-one">My Journey<small>progression surface</small></div>
    <div className="cv4-callout callout-two">AI coach<small>practice + feedback</small></div>
   </div>
  </header>

  <div className="cv4-toc"><span>THE STORY</span><a href="#s01">Problem</a><a href="#s02">Users</a><a href="#s03">Research</a><a href="#s04">Synthesis</a><a href="#s05">Competition</a><a href="#s06">Process</a><a href="#s10">AI UX</a><a href="#s16">Impact</a></div>

  <div className="cv4-story">
   <Section n="01" title="Problem framing">
    <h2>The product had to solve a confidence problem without turning communication practice into another high-pressure test.</h2>
    <div className="cv4-problem-grid">
     <article><span>USER PROBLEM</span><h3>Knowing what to say is not the same as being able to deliver it.</h3><p>Students and professionals can enter a presentation, interview or conversation with the content prepared, then freeze when delivery becomes the task.</p></article>
     <article><span>PRODUCT PROBLEM</span><h3>Four skills can easily become four disconnected exercises.</h3><p>If Reading, Listening, Writing and Speaking behave as separate destinations, context gathered during onboarding has little product value.</p></article>
     <article><span>OPPORTUNITY</span><h3>Turn context into a continuous learning loop.</h3><p>Use learner intent to shape the starting point, keep assessment consistent, and make every completion state point toward the next useful action.</p></article>
    </div>
    <div className="cv4-hmw"><span>HOW MIGHT WE</span><strong>How might we help learners practise communication with less judgement and cognitive friction, while giving the product a reusable system for personalised progression?</strong></div>
   </Section>

   <Section n="02" title="Users + jobs to be done" accent="pink">
    <div className="cv4-persona-grid">
     <article className="cv4-persona"><div className="cv4-avatar student">A</div><div><span>PRIMARY CONTEXT</span><h3>The Avoidant Presenter</h3><p>Student / early-career learner who knows the content but avoids speaking situations where delivery is evaluated.</p><div className="cv4-mini-list"><b>Goal</b><span>Feel prepared enough to speak without freezing.</span><b>Behavior</b><span>Prefers low-pressure repetition and short tasks.</span><b>Success</b><span>Can practise, understand feedback and try again.</span></div></div></article>
     <article className="cv4-persona"><div className="cv4-avatar pro">P</div><div><span>SECONDARY CONTEXT</span><h3>The Interview-Track Professional</h3><p>Job-seeker or working professional preparing for high-stakes communication where clarity and delivery matter.</p><div className="cv4-mini-list"><b>Goal</b><span>Translate expertise into confident delivery.</span><b>Behavior</b><span>Values targeted practice over generic lessons.</span><b>Success</b><span>Sees a specific gap and knows what to practise next.</span></div></div></article>
    </div>
    <div className="cv4-jtbd"><div><span>JOB 01</span><b>When I know what I want to say but hesitate to say it, I want a safe way to practise, so I can build confidence before the real situation.</b></div><div><span>JOB 02</span><b>When I am preparing for a high-stakes conversation, I want targeted feedback, so I can improve delivery rather than relearn my content.</b></div><div><span>JOB 03</span><b>When I finish a practice task, I want to know what comes next, so improvement feels continuous rather than random.</b></div></div>
    <div className="cv4-implications"><b>DESIGN IMPLICATIONS</b><span>Context should shape the journey.</span><span>Feedback should be specific and non-judgemental.</span><span>Progression should reduce decision-making after every task.</span></div>
   </Section>

   <Section n="03" title="Research strategy" accent="orange">
    <div className="cv4-research-intro"><h2>Separate what we know from what we still need to prove.</h2><p>The available project material supports a strong product hypothesis, but it does not contain a verified participant dataset or quantitative study. The research model below therefore combines documented product evidence with secondary research and a clearly labelled validation plan.</p></div>
    <div className="cv4-research-cards">
     <article><span>01 · SECONDARY RESEARCH</span><h3>Personalisation is moving closer to the learning loop.</h3><p>Speak's current product supports custom lessons around goals, situations and interests, and its onboarding interests can feed personalised lesson recommendations.</p><small>Source: Speak Help Center, 2025–26</small></article>
     <article><span>02 · SECONDARY RESEARCH</span><h3>AI coaching works best when feedback is tied to a rubric or goal.</h3><p>Yoodli exposes configurable Coach Bots and rubrics so feedback can be aligned to a learning objective rather than presented as a generic score.</p><small>Source: Yoodli Help Center, 2026</small></article>
     <article><span>03 · DOMAIN PATTERN</span><h3>Judgement-free practice is a product differentiator.</h3><p>Yoodli positions private, consistent practice and feedback as a way to reinforce skills without replacing human coaching.</p><small>Source: Yoodli product documentation, 2026</small></article>
    </div>
    <div className="cv4-research-loop"><div><span>RESEARCH OBJECTIVE</span><b>Understand where communication practice breaks down and what context the system needs to make practice relevant.</b></div><div><span>QUESTIONS</span><b>What triggers avoidance? Which feedback feels actionable? How much onboarding context is worth the effort? What makes a next step obvious?</b></div><div><span>PROPOSED METHODS</span><b>Contextual interviews · workflow walkthroughs · competitive benchmarking · prototype usability tests · post-task confidence rating.</b></div></div>
    <p className="cv4-source-note">External research is used to strengthen product reasoning; it is not presented as direct research conducted with ComSki customers.</p>
   </Section>

   <Section n="04" title="Research synthesis" accent="blue">
    <div className="cv4-synthesis"><div className="raw"><span>OBSERVATIONS</span><b>Users enter with different goals.</b><b>Practice can feel evaluative.</b><b>AI feedback varies by product.</b><b>Learning products increasingly personalise content.</b></div><i>→</i><div><span>THEMES</span><b>Context matters</b><b>Confidence is fragile</b><b>Consistency builds trust</b><b>Next-step clarity reduces friction</b></div><i>→</i><div className="insight"><span>INSIGHTS</span><b>Personalisation should affect the journey, not just the welcome screen.</b><b>Assessment needs a shared grammar across skills.</b><b>AI feedback needs boundaries and recovery paths.</b></div></div>
    <div className="cv4-opportunities"><span>OPPORTUNITY AREAS</span><Tag>Context-aware onboarding</Tag><Tag tone="pink">Judgement-free assessment</Tag><Tag tone="orange">Skill handoffs</Tag><Tag tone="blue">Explainable feedback</Tag><Tag>Progressive disclosure</Tag></div>
   </Section>

   <Section n="05" title="Competitive landscape" accent="pink">
    <p className="cv4-section-lede">The competitive question is not “who has the most features?” It is “where does each product place the learner inside the practice loop?”</p>
    <div className="cv4-matrix">
     <div className="matrix-head"><b>Capability</b><b>ELSA</b><b>Yoodli</b><b>Speak</b><b>ComSki direction</b></div>
     <div><span>Personalisation</span><span>Pronunciation-focused</span><span>Goal / coach customisation</span><span>Goals, interests, custom lessons</span><strong>Context shapes the whole journey</strong></div>
     <div><span>Core practice</span><span>Speech / pronunciation</span><span>Roleplay / presentation</span><span>Conversation / lessons</span><strong>Four connected skills</strong></div>
     <div><span>Feedback</span><span>Speech sounds, stress, intonation</span><span>Rubric / coach feedback</span><span>Corrections + tutor guidance</span><strong>Feedback framed as next practice</strong></div>
     <div><span>Progression</span><span>Skill improvement</span><span>Programs / scenarios</span><span>Learning path</span><strong>Reading → Listening → Writing → Speaking</strong></div>
     <div><span>Opportunity</span><span>Deep speech analysis</span><span>Deep communication coaching</span><span>Adaptive language learning</span><strong>One shared communication system for different learner contexts</strong></div>
    </div>
    <div className="cv4-competitive-callout"><b>COMPETITIVE OPPORTUNITY</b><strong>ComSki can differentiate through the relationship between learner context, multi-skill assessment and explicit progression — not by trying to out-feature specialised competitors.</strong></div>
   </Section>

   <Section n="06" title="Senior design process" accent="orange">
    <div className="cv4-process-grid">
     <article><b>01</b><h3>Understand</h3><p>Context, business intent, learner scenarios, evidence and constraints.</p></article>
     <article><b>02</b><h3>Frame</h3><p>Problem definition, JTBD, opportunity areas and design principles.</p></article>
     <article><b>03</b><h3>Explore</h3><p>IA, task flows, journey models and alternative interaction directions.</p></article>
     <article><b>04</b><h3>Converge</h3><p>Trade-offs across user value, feasibility, clarity and scalability.</p></article>
     <article><b>05</b><h3>Structure</h3><p>Navigation, states, content hierarchy, edge cases and handoffs.</p></article>
     <article><b>06</b><h3>Design</h3><p>Wireframes, high-fidelity UI, components and responsive behavior.</p></article>
     <article><b>07</b><h3>Validate</h3><p>Prototype testing, heuristic review and iteration.</p></article>
     <article><b>08</b><h3>Deliver</h3><p>Reusable components, interaction specs and implementation-ready states.</p></article>
    </div>
    <div className="cv4-principles"><span>DESIGN PRINCIPLES</span><b>Context before content</b><b>Consistency before complexity</b><b>Feedback should lead to action</b><b>AI assists; the learner stays in control</b></div>
   </Section>

   <Section n="07" title="Exploration + trade-offs" accent="blue">
    <div className="cv4-directions">
     <article><span>DIRECTION A</span><h3>Separate products for students and professionals</h3><p>Strong audience specificity, but duplicates the interaction model and increases system complexity.</p><em>Rejected — audience context can vary without splitting the core product.</em></article>
     <article><span>DIRECTION B</span><h3>One generic assessment engine</h3><p>Highly scalable, but risks making every skill feel mechanically identical and losing the context of communication.</p><em>Rejected — consistency should live in the grammar, not in identical tasks.</em></article>
     <article className="selected"><span>FINAL DIRECTION</span><h3>One shared system with contextual entry + skill-specific tasks</h3><p>Preserves a reusable interaction model while allowing Reading, Listening, Writing and Speaking to behave according to their medium.</p><em>Selected — strongest balance of personalisation, scalability and cognitive simplicity.</em></article>
    </div>
   </Section>

   <Section n="08" title="Information architecture + flow" accent="pink">
    <div className="cv4-ia">
     <div className="ia-node primary">COMSKI</div><div className="ia-arrow">↓</div>
     <div className="ia-row"><div>Onboarding</div><div>Home / Journey</div><div>Practice</div><div>Insights</div></div>
     <div className="ia-connector">↓</div>
     <div className="ia-row skills"><div>Reading</div><div>Listening</div><div>Writing</div><div>Speaking</div></div>
     <div className="ia-connector">↓</div>
     <div className="ia-row states"><div>Feedback</div><div>Completion</div><div>Retry</div><div>Next skill</div></div>
    </div>
    <div className="cv4-flow-copy"><div><span>ENTRY</span><b>Learner completes contextual onboarding.</b></div><div><span>DECISION</span><b>System uses context to establish the appropriate journey.</b></div><div><span>ACTION</span><b>Learner completes a skill-specific task.</b></div><div><span>FEEDBACK</span><b>System explains performance and offers a next action.</b></div><div><span>COMPLETION</span><b>Progression points to the next useful skill or retry.</b></div></div>
   </Section>

   <Section n="09" title="Onboarding strategy" accent="orange">
    <div className="cv4-onboarding-grid">
     <div><h2>Ask only for context that can change the experience.</h2><p>The source screens establish a sequence around vibe, communication goal, discovery source, available time, confidence and interests. The product value is not the questionnaire itself; it is the ability to carry that context into the learning loop.</p></div>
     <div className="cv4-onboarding-rules"><b>COLLECT</b><span>Goal · confidence · time · interests</span><b>DEFER</b><span>Low-value profile detail that does not affect the first session</span><b>EXPLAIN</b><span>Why the product is asking and how the answer will shape practice</span><b>ALLOW CONTROL</b><span>Skip or edit when the answer is uncertain</span></div>
    </div>
    <Screen src="Onboarding Intro.svg" alt="ComSki onboarding introduction" label="Onboarding / first-value moment" wide/>
   </Section>

   <Section n="10" title="AI UX — trust, feedback and control" accent="blue">
    <div className="cv4-ai-hero"><div><span>AI INTERACTION MODEL</span><h2>The interface should make AI feel like a coach, not an authority.</h2></div><p>AI feedback is inherently probabilistic. The experience should communicate what was observed, what the system recommends and what the learner can do next—without implying that an AI score is an absolute judgement.</p></div>
    <div className="cv4-ai-grid">
     <article><b>01</b><h3>Explain the signal</h3><p>Show the dimension being evaluated and connect it to an observable behavior.</p></article>
     <article><b>02</b><h3>Keep the learner in control</h3><p>Feedback should be actionable, dismissible and recoverable rather than forcing a single interpretation.</p></article>
     <article><b>03</b><h3>Make uncertainty legible</h3><p>Where confidence is low or input quality is poor, the system should avoid overclaiming.</p></article>
     <article><b>04</b><h3>Turn feedback into the next rep</h3><p>The most useful output is not a score; it is a clear next practice action.</p></article>
    </div>
   </Section>

   <Section n="11" title="Features & screens" accent="pink">
    <div className="cv4-screen-intro"><h2>From onboarding to a four-skill practice loop.</h2><p>These are the actual ComSki screens available in the project assets. The presentation explains the interaction model without inventing replacement UI.</p></div>
    <div className="cv4-screen-grid">
     <Screen src="Onboarding 1st Question.svg" alt="ComSki onboarding question" label="01 · Pick your Vibe"/>
     <Screen src="Reading.svg" alt="ComSki reading experience" label="02 · Reading"/>
     <Screen src="Listening 1.svg" alt="ComSki listening experience" label="03 · Listening"/>
     <Screen src="Writing 1.svg" alt="ComSki writing experience" label="04 · Writing"/>
     <Screen src="Speaking 1.svg" alt="ComSki speaking experience" label="05 · Speaking"/>
     <Screen src="Desktop - 1.svg" alt="ComSki desktop journey" label="06 · Journey / progress"/>
    </div>
    <div className="cv4-screen-anatomy"><div><span>USER GOAL</span><b>Complete a focused communication task.</b></div><div><span>DESIGN DECISION</span><b>Keep one primary action visible and reduce competing controls.</b></div><div><span>FEEDBACK</span><b>Make state, completion and next action explicit.</b></div><div><span>EDGE CASE</span><b>Support retry, interruption and incomplete input without losing context.</b></div></div>
   </Section>

   <Section n="12" title="Interaction model" accent="orange">
    <div className="cv4-interaction">
     <div className="interaction-track"><span className="active">Context</span><i>→</i><span>Task</span><i>→</i><span>Input</span><i>→</i><span>AI / System analysis</span><i>→</i><span>Feedback</span><i>→</i><span>Next action</span></div>
     <div className="interaction-notes"><article><b>System state</b><p>Loading, listening, recording, processing and completion states must be visible.</p></article><article><b>Error recovery</b><p>Permission failures, low-quality input and interruptions should return the learner to a recoverable state.</p></article><article><b>Progression</b><p>Completion should reduce the decision cost of choosing what to do next.</p></article></div>
    </div>
   </Section>

   <Section n="13" title="Design system + scalability" accent="blue">
    <div className="cv4-system-grid">
     <div className="cv4-system-visual"><span>FOUNDATION</span><div className="token-row"><i/><i/><i/><i/><i/></div><div className="type-sample">Aa <small>Communication that feels human.</small></div><div className="spacing"><b>8</b><b>16</b><b>24</b><b>32</b><b>48</b></div></div>
     <div className="cv4-system-copy"><h2>Consistency is an interaction tool.</h2><p>A reusable system keeps the four skill experiences recognisable while allowing each medium to have its own interaction pattern.</p><div><b>Tokens</b><span>Color, type, spacing, radius and elevation.</span><b>Components</b><span>Buttons, cards, progress, feedback, navigation and states.</span><b>Responsive</b><span>Fluid layout with deliberate mobile stacking and touch targets.</span><b>Accessibility</b><span>Semantic hierarchy, visible focus, readable contrast and reduced-motion support.</span></div></div>
    </div>
   </Section>

   <Section n="14" title="Usability validation" accent="pink">
    <div className="cv4-validation-banner"><b>VALIDATION STATUS</b><span>Proposed / interview-ready test plan. The source material does not contain a verified participant count or quantitative usability dataset, so no invented results are presented as fact.</span></div>
    <div className="cv4-validation-grid">
     <article><span>HYPOTHESIS</span><h3>Contextual onboarding will feel worth the effort if learners understand why questions are being asked.</h3><b>Task</b><p>Complete onboarding and explain what the answers will change.</p></article>
     <article><span>HYPOTHESIS</span><h3>A shared assessment grammar will make the four skills easier to understand.</h3><b>Task</b><p>Move through two skills and identify where to go next.</p></article>
     <article><span>HYPOTHESIS</span><h3>Feedback is more useful when paired with a next practice action.</h3><b>Task</b><p>Review feedback and choose the next action without facilitator help.</p></article>
    </div>
    <div className="cv4-severity"><span>SEVERITY FRAME</span><Tag tone="red">Critical · blocks completion</Tag><Tag tone="orange">High · creates repeated friction</Tag><Tag>Medium · slows task</Tag><Tag tone="blue">Low · polish / clarity</Tag></div>
   </Section>

   <Section n="15" title="Accessibility + technical collaboration" accent="orange">
    <div className="cv4-tech-grid">
     <article><span>ACCESSIBILITY</span><h3>Make the learning loop operable for more people.</h3><ul><li>Semantic heading hierarchy and labelled controls.</li><li>Visible keyboard focus and focus not obscured by sticky UI.</li><li>Contrast and non-text contrast checked against WCAG 2.2 guidance.</li><li>Motion reduced when the user prefers reduced motion.</li><li>Touch targets and error messages designed for recovery.</li></ul></article>
     <article><span>ENGINEERING COLLABORATION</span><h3>Design the states, not just the happy path.</h3><ul><li>Reusable components and design tokens.</li><li>Responsive rules for desktop, tablet and mobile.</li><li>Loading / empty / error / permission states.</li><li>API-driven content and AI processing states.</li><li>Interaction specs and design QA against implementation.</li></ul></article>
    </div>
    <p className="cv4-access-source">Accessibility reference: W3C WCAG 2.2 guidance on visible focus and focus appearance.</p>
   </Section>

   <Section n="16" title="Outcomes + impact measurement" accent="blue">
    <div className="cv4-outcome-grid">
     <article><span>USER OUTCOME</span><h3>Less ambiguity about what to practise next.</h3><p>Connected skill handoffs and explicit completion states can reduce the decision burden between tasks.</p></article>
     <article><span>PRODUCT OUTCOME</span><h3>One interaction model can support multiple learner contexts.</h3><p>Contextual entry avoids maintaining separate products while preserving audience-specific intent.</p></article>
     <article><span>BUSINESS VALUE</span><h3>A stronger activation → practice → retention loop.</h3><p>Future measurement should test whether personalisation increases onboarding completion and meaningful practice.</p></article>
    </div>
    <div className="cv4-metrics"><span>IMPACT MEASUREMENT FRAMEWORK</span><div><b>Activation</b><small>Onboarding completion · first practice start</small></div><div><b>Engagement</b><small>Practice frequency · skill completion · retry behavior</small></div><div><b>UX</b><small>Task completion · time-on-task · comprehension · confidence</small></div><div><b>Retention</b><small>7/30-day return · continued practice</small></div><div><b>Business</b><small>Conversion · paid practice adoption · support demand</small></div></div>
   </Section>

   <Section n="17" title="Role + ownership" accent="pink">
    <div className="cv4-role"><div><span>MY RESPONSIBILITIES</span><b>Problem framing · UX strategy · information architecture · interaction design · visual design · prototyping · design system thinking · validation planning.</b></div><div><span>MY OWNERSHIP</span><b>I owned the product-design direction and translated the concept into a coherent system rather than presenting isolated screens.</b></div><div><span>IMPLEMENTATION MINDSET</span><b>I designed reusable components, responsive behavior and system states with technical feasibility and handoff in mind.</b></div></div>
   </Section>

   <Section n="18" title="Learnings + what I would do next" accent="orange">
    <div className="cv4-learnings">
     <article><b>01</b><h3>Complexity is not the same as capability.</h3><p>Personalisation only creates value when the additional context changes the experience. Otherwise onboarding becomes a tax.</p></article>
     <article><b>02</b><h3>AI changes the interaction contract.</h3><p>The interface must communicate system state, uncertainty, user control and recovery—not simply display an AI answer.</p></article>
     <article><b>03</b><h3>Information architecture is product strategy.</h3><p>The relationship between four skills determines whether ComSki feels like one coach or four disconnected tools.</p></article>
     <article><b>04</b><h3>Feedback should create the next rep.</h3><p>A score has limited value unless the learner can translate it into a concrete action.</p></article>
     <article><b>05</b><h3>Consistency should live in the system grammar.</h3><p>Shared patterns make the product scalable while skill-specific interactions preserve the meaning of each medium.</p></article>
    </div>
    <div className="cv4-next"><span>WHAT I WOULD DO NEXT</span><b>Run moderated prototype testing with both learner contexts, instrument onboarding and skill progression, validate AI feedback comprehension, and iterate the personalisation model against real retention behavior.</b></div>
   </Section>

   <section className="cv4-interview" id="interview">
    <div className="cv4-kicker">INTERVIEW DECISION LEDGER</div><h2>Be able to defend the design, not just present it.</h2>
    <div className="cv4-decision-grid">
     <Decision title="Why contextual onboarding?" why="Because learner intent is one of the strongest inputs available before practice begins." alt="Generic profile setup." tradeoff="More onboarding effort; mitigated by progressive disclosure and collecting only actionable context."/>
     <Decision title="Why four skills in one system?" why="Communication is multi-modal, but the learner should not have to learn four separate products." alt="One generic skill or separate products." tradeoff="Requires a shared interaction grammar plus skill-specific task behavior."/>
     <Decision title="Why directional completion?" why="A completed task should reduce the next decision rather than create a dead end." alt="Neutral completion state." tradeoff="More opinionated navigation; can be balanced with retry and exploration controls."/>
     <Decision title="Why AI feedback with boundaries?" why="AI output is probabilistic and should support, not replace, learner judgement." alt="Single authoritative score." tradeoff="Slightly more interface complexity in exchange for trust and recovery."/>
    </div>
   </section>
  </div>

  <footer className="cv4-footer"><span>COMSKI · CASE STUDY / CV4</span><h2>One product.<br/><em>Two learner contexts.</em><br/>One continuous journey.</h2><p>Designed as a system: context → practice → feedback → progression.</p><a href="/surya-portfolio/">Back to portfolio ↗</a></footer>
 </main>
}
