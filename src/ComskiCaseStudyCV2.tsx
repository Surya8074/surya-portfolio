import React,{useEffect,useState} from 'react';
import {CV2PageTransition,CV2TextReveal,CV2ImageReveal,CV2Reveal} from './cv2-design-system/motion-primitives';
import {ArrowDown,ArrowRight,BookOpen,Check,Clock3,Compass,Headphones,Mic2,PenLine,Play,Route,SlidersHorizontal,Sparkles,Target,UserRound} from 'lucide-react';

function SectionLabel({num,label}:{num:string;label:string}){return <div className="cs-label"><span>{num}</span><b>{label}</b></div>}
function Pill({children}:{children:React.ReactNode}){return <span className="cs-pill">{children}</span>}
function ScreenAnatomy({type}:{type:'onboarding'|'reading'|'listening'|'writing'|'speaking'|'completion'}) {
 const data={
  onboarding:{kicker:'PERSONALISED ONBOARDING',title:'The product learns about the learner before asking them to learn.',body:'The source screens show ComSki collecting context across vibe, goal, discovery source, available time, confidence and interests before the journey begins.',items:['Vibe','Goal','Time','Confidence','Interests']},
  reading:{kicker:'READING · 01',title:'Read It Like You Mean It',body:'A short passage is presented as the core task. The learner reads aloud, then moves through a five-question skill check.',items:['Read aloud','Question 1/5 → 5/5','Complete / retry','Continue to Listening']},
  listening:{kicker:'LISTENING · 02',title:'Listen Carefully',body:'A short audio clip can be a story, daily situation or informative message, followed by a quick comprehension question.',items:['Play audio','Question 1/5 → 5/5','Skip / next','Continue to Writing']},
  writing:{kicker:'WRITING · 03',title:'Express Your Thoughts Freely',body:'A short situation or question creates the writing prompt. The learner responds in their own words inside the response field.',items:['Read scenario','Compose response','Question progression','Continue to Speaking']},
  speaking:{kicker:'SPEAKING · 04',title:'Speak Freely, Be Yourself',body:'A short question or topic creates a low-pressure speaking prompt, with scenarios designed around personal expression.',items:['Read topic','Use natural voice','Respond in context','Move to next task']},
  completion:{kicker:'PROGRESSION',title:'Completion states turn four skills into one journey.',body:'The source screens explicitly hand the learner from one completed skill to the next, creating a visible sequence instead of four disconnected tests.',items:['Reading → Listening','Listening → Writing','Writing → Speaking','Retry when needed']}
 }[type];
 return <div className="cs-anatomy"><div className="anatomy-top"><span>{data.kicker}</span><i>{type==='onboarding'?<UserRound size={17}/>:type==='reading'?<BookOpen size={17}/>:type==='listening'?<Headphones size={17}/>:type==='writing'?<PenLine size={17}/>:type==='speaking'?<Mic2 size={17}/>:<Route size={17}/>}</i></div><h3>{data.title}</h3><p>{data.body}</p><div className="anatomy-list">{data.items.map((x,i)=><div key={x}><small>0{i+1}</small><b>{x}</b><span>{i===0?'Core interaction':'State / transition'}</span></div>)}</div></div>
}
function ActualScreen({src,alt,label,detail,variant='standard'}:{src:string;alt:string;label:string;detail?:string;variant?:'standard'|'large'|'crop'}){return <figure className={`cv2-screen cv2-screen-${variant}`}><div className="cv2-screen-frame"><img src={src} alt={alt}/></div><figcaption><span>{label}</span>{detail&&<b>{detail}</b>}</figcaption></figure>}

function ScreenFlow(){return <div className="cv2-screen-flow">
  <ActualScreen src="/surya-portfolio/comski/home.webp" alt="ComSki source product screen" label="01 · HOME" detail="Learner context" />
  <i><ArrowRight/></i>
  <ActualScreen src="/surya-portfolio/comski/journey.webp" alt="ComSki source journey screen" label="02 · JOURNEY" detail="Progression" />
  <i><ArrowRight/></i>
  <ActualScreen src="/surya-portfolio/comski/practice.webp" alt="ComSki source practice screen" label="03 · PRACTICE" detail="Task interaction" />
</div>}

export default function ComskiCaseStudyCV2(){
 const [progress,setProgress]=useState(0);
 useEffect(()=>{const fn=()=>{const h=document.documentElement.scrollHeight-innerHeight;setProgress(h?scrollY/h:0)};addEventListener('scroll',fn,{passive:true});fn();return()=>removeEventListener('scroll',fn)},[]);
 return <CV2PageTransition className="cv2-motion-page"><main className="comski-case cv2-case" id="top">
  <div className="cs-progress"><span style={{transform:'scaleX('+progress+')'}}/></div>
  <nav className="cs-nav"><a href="/surya-portfolio/"><b>Surya Kiran</b><span>ComSki / Case Study</span></a><a href="/surya-portfolio/">Back to portfolio ↗</a></nav>

  <header className="cs-hero">
   <div className="cs-hero-bg"/>
   <div className="cs-hero-inner">
    <div className="cs-kicker"><span>02 / 04</span><span>AI · COMMUNICATION · PRODUCT DESIGN</span></div>
    <CV2TextReveal className="cs-hero-copy">
     <p>COMSKI</p>
     <h1>Designing a communication coach that <em>starts with the learner.</em></h1>
     <div className="cs-hero-grid">
      <p>ComSki combines personalised onboarding with four communication skill checks — Reading, Listening, Writing and Speaking — and turns them into one continuous learning journey.</p>
      <div className="cs-meta"><div><small>ROLE</small><b>Product Designer</b></div><div><small>PRODUCT</small><b>AI communication coach</b></div><div><small>CORE EXPERIENCE</small><b>Personalisation + skill assessment</b></div><div><small>TOOLS</small><b>Figma · interaction design</b></div></div>
     </div>
    </CV2TextReveal>
    <a className="cs-scroll" href="#s01"><span>EXPLORE THE CASE STUDY</span><ArrowDown size={15}/></a>
   </div>
   <CV2ImageReveal className="cs-hero-visual cv2-hero-product">
    <div className="cv2-product-window">
      <div className="cv2-window-bar"><span>COMSKI</span><span>PRODUCT EXPERIENCE / 01</span></div>
      <img src="/surya-portfolio/comski/home.webp" alt="ComSki learner home product screen"/>
    </div>
    <div className="cv2-hero-secondary"><img src="/surya-portfolio/comski/journey.webp" alt="ComSki journey product screen"/><span>Journey / progression</span></div>
   </CV2ImageReveal>
  </header>

  <CV2Reveal className="cs-intro-reveal">
   <section className="cs-intro"><div><span>THE PRODUCT</span><h2>Personalisation is not a feature on top of the product. <em>It is the entry point.</em></h2></div><p>The supplied ComSki screens show a deliberate sequence: establish who the learner is, understand what they want from communication, understand how much time they can give, establish confidence and interests, then move into a structured four-skill assessment journey.</p></section>
  </CV2Reveal>

  <CV2Reveal className="cs-snapshot-reveal">
   <section className="cs-snapshot"><div className="cs-snapshot-head"><span>AT A GLANCE</span><p>The strongest product story is the relationship between onboarding, assessment and progression.</p></div><div className="cs-snapshot-grid"><div><small>ENTRY</small><b>Personalised onboarding</b><span>Context before content</span></div><div><small>ASSESSMENT</small><b>4 communication skills</b><span>Reading · Listening · Writing · Speaking</span></div><div><small>STRUCTURE</small><b>5-question skill checks</b><span>Consistent progression and completion states</span></div><div><small>HANDOFF</small><b>One skill leads to the next</b><span>Completion screens make the journey explicit</span></div></div></section>
  </CV2Reveal>

  <CV2Reveal className="cv2-evidence-wrap">
  <section className="cv2-evidence" aria-labelledby="evidence-title">
   <div className="cv2-evidence-head">
    <div><span>PRODUCT EVIDENCE</span><h2 id="evidence-title">Show the product before explaining the system.</h2></div>
    <p>Selected source screens establish the visual language of ComSki: a learner-facing home, journey, practice and feedback experience.</p>
   </div>
   <div className="cv2-evidence-grid">
    <figure className="cv2-evidence-main"><img src="/surya-portfolio/comski/home.webp" alt="ComSki learner home screen" /><figcaption><b>01</b><span>Home · learner context</span></figcaption></figure>
    <div className="cv2-evidence-side">
      <figure><img src="/surya-portfolio/comski/journey.webp" alt="ComSki learning journey screen" /><figcaption><b>02</b><span>Journey · progression</span></figcaption></figure>
      <figure><img src="/surya-portfolio/comski/practice.webp" alt="ComSki practice screen" /><figcaption><b>03</b><span>Practice · task interaction</span></figcaption></figure>
    </div>
   </div>
  </section>
  </CV2Reveal>

  <CV2Reveal className="cv2-visual-story-wrap">
   <section className="cv2-visual-story">
    <div className="cv2-story-head"><div><span>THE PRODUCT AS EVIDENCE</span><h2>Show the system, not a pile of screenshots.</h2></div><p>These are the actual ComSki screens. Their role here is to explain how the product moves from context to journey to interaction.</p></div>
    <ScreenFlow/>
    <div className="cv2-screen-note"><span>READ THE FLOW</span><b>Context → Journey → Practice</b><small>The presentation changes scale instead of forcing every screen into the same mockup. The UI remains untouched.</small></div>
   </section>
  </CV2Reveal>

  
  <article className="cs-layout">
   <aside className="cs-chapters">
    <a href="#context">01 <b>CONTEXT</b></a>
    <a href="#evidence">02 <b>EVIDENCE</b></a>
    <a href="#journey">03 <b>JOURNEY</b></a>
    <a href="#architecture">04 <b>ARCHITECTURE</b></a>
    <a href="#decisions">05 <b>DECISIONS</b></a>
    <a href="#interaction">06 <b>INTERACTION</b></a>
    <a href="#product">07 <b>FINAL PRODUCT</b></a>
    <a href="#reflection">08 <b>REFLECTION</b></a>
   </aside>
   <div className="cs-content">

    <section id="context" className="cs-section">
     <SectionLabel num="01" label="CONTEXT"/>
     <h2>Personalisation is not a feature added later. <em>It is ComSki's first interaction.</em></h2>
     <div className="cv2-context-strip">
      <div><small>ROLE</small><b>Product Designer</b></div>
      <div><small>PRODUCT</small><b>AI communication coach</b></div>
      <div><small>DESIGN FOCUS</small><b>Personalised onboarding + assessment</b></div>
      <div><small>CORE MODEL</small><b>Context → assessment → practice → progress</b></div>
     </div>
     <div className="cs-two" style={{marginTop:48}}>
      <p>ComSki is designed around four communication skills: <strong>Reading, Listening, Writing and Speaking.</strong> The important product decision is what happens before those skills begin: the learner provides context that can shape the journey.</p>
      <p>The case study therefore follows one question: <strong>how can personal context become a continuous product experience rather than disappear after onboarding?</strong></p>
     </div>
    </section>

    <section id="evidence" className="cs-section">
     <SectionLabel num="02" label="EVIDENCE"/>
     <h2>Show the product before explaining the system.</h2>
     <ScreenFlow/>
     <div className="cv2-evidence-board" style={{marginTop:56}}>
      <div className="cv2-evidence-column">
       <span>OBSERVED IN THE SOURCE SCREENS</span>
       <b>Onboarding captures learner context before assessment.</b>
       <ul><li>Vibe / tone</li><li>Communication goal</li><li>Discovery source</li><li>Available daily time</li><li>Confidence</li><li>Interests / topics</li></ul>
      </div>
      <div className="cv2-evidence-column cv2-evidence-muted">
       <span>EVIDENCE BOUNDARY</span>
       <b>What is not claimed.</b>
       <ul><li>No invented participant counts</li><li>No fabricated quotes</li><li>No synthetic survey percentages</li><li>No unsupported business metrics</li></ul>
      </div>
      <div className="cv2-evidence-source"><ActualScreen src="/surya-portfolio/comski/journey.webp" alt="ComSki journey screen" label="PRODUCT EVIDENCE" detail="The learner's progression surface" variant="large"/></div>
     </div>
    </section>

    <section id="journey" className="cs-section">
     <SectionLabel num="03" label="USER JOURNEY"/>
     <h2>From “who am I?” to “what do I do next?”</h2>
     <p className="cs-lead">This map describes the journey visible in the supplied product screens, not a fabricated research journey.</p>
     <div className="cv2-journey-map">
      <div className="cv2-journey-row cv2-journey-header"><span>STAGE</span><span>ACTION</span><span>DESIGN TENSION</span><span>OPPORTUNITY</span></div>
      <div className="cv2-journey-row"><b>01 · Context</b><span>Answer onboarding questions</span><span>Setup can add friction</span><strong>Make setup expressive and lightweight</strong></div>
      <div className="cv2-journey-row"><b>02 · Orientation</b><span>Understand the assessment</span><span>Testing can feel judgemental</span><strong>Frame assessment as understanding</strong></div>
      <div className="cv2-journey-row"><b>03 · Skill check</b><span>Read, listen, write or speak</span><span>Modalities change</span><strong>Keep the interaction grammar stable</strong></div>
      <div className="cv2-journey-row"><b>04 · Completion</b><span>Finish or retry</span><span>A stopping point creates uncertainty</span><strong>Make the next action explicit</strong></div>
      <div className="cv2-journey-row"><b>05 · Progression</b><span>Move to the next skill</span><span>Four tests could feel disconnected</span><strong>Connect them as one journey</strong></div>
     </div>
    </section>

    <section id="architecture" className="cs-section">
     <SectionLabel num="04" label="PRODUCT ARCHITECTURE"/>
     <h2>The screens are different. <em>The underlying interaction grammar stays familiar.</em></h2>
     <div className="cv2-architecture-map">
      <div className="cv2-arch-band"><small>LEARNER CONTEXT</small><b>Vibe · Goal · Time · Confidence · Interests</b></div>
      <div className="cv2-arch-connector">↓</div>
      <div className="cv2-arch-band active"><small>ASSESSMENT ORCHESTRATION</small><b>Prepare → Skill check → Question progression → Completion</b></div>
      <div className="cv2-arch-connector">↓</div>
      <div className="cv2-arch-modules">
       <div><BookOpen/><b>Reading</b><small>Read → understand → respond</small></div>
       <div><Headphones/><b>Listening</b><small>Listen → understand → respond</small></div>
       <div><PenLine/><b>Writing</b><small>Prompt → compose → submit</small></div>
       <div><Mic2/><b>Speaking</b><small>Prompt → speak → continue</small></div>
      </div>
      <div className="cv2-arch-connector">↓</div>
      <div className="cv2-arch-band"><small>PROGRESSION</small><b>Complete · Retry · Continue to next skill</b></div>
     </div>
    </section>

    <section id="decisions" className="cs-section">
     <SectionLabel num="05" label="DESIGN DECISIONS"/>
     <h2>Make the reasoning visible, not just the polished interface.</h2>
     <div className="cv2-decision-ledger">
      <div className="cv2-decision-row"><span>01</span><div><small>DECISION</small><b>Context-first onboarding</b></div><div><small>ALTERNATIVE</small><b>Generic account setup</b></div><div><small>TRADE-OFF</small><b>More setup, richer learner context</b></div><div><small>WHY</small><b>Personalisation begins before assessment.</b></div></div>
      <div className="cv2-decision-row"><span>02</span><div><small>DECISION</small><b>Shared assessment grammar</b></div><div><small>ALTERNATIVE</small><b>Four independent test patterns</b></div><div><small>TRADE-OFF</small><b>Less novelty, more predictability</b></div><div><small>WHY</small><b>Only the modality changes; the mental model remains stable.</b></div></div>
      <div className="cv2-decision-row"><span>03</span><div><small>DECISION</small><b>Directional completion</b></div><div><small>ALTERNATIVE</small><b>Neutral skill finish</b></div><div><small>TRADE-OFF</small><b>More opinionated navigation</b></div><div><small>WHY</small><b>The next skill becomes part of the experience.</b></div></div>
     </div>
    </section>

    <section id="interaction" className="cs-section">
     <SectionLabel num="06" label="INTERACTION DESIGN"/>
     <h2>Four skills. One interaction language.</h2>
     <div className="cs-grid-4">
      <ScreenAnatomy type="reading"/><ScreenAnatomy type="listening"/><ScreenAnatomy type="writing"/><ScreenAnatomy type="speaking"/>
     </div>
     <div className="cv2-framing-chain" style={{marginTop:56}}>
      <div><span>READING</span><b>Text-led comprehension</b></div><i>→</i>
      <div><span>LISTENING</span><b>Audio-led comprehension</b></div><i>→</i>
      <div><span>WRITING</span><b>Prompt-led expression</b></div><i>→</i>
      <div><span>SPEAKING</span><b>Voice-led expression</b></div>
     </div>
    </section>

    <section id="product" className="cs-section">
     <SectionLabel num="07" label="FINAL PRODUCT"/>
     <h2>Show the system at different scales.</h2>
     <ActualScreen src="/surya-portfolio/comski/home.webp" alt="ComSki home screen" label="HOME" detail="Learner context" variant="large"/>
     <div className="cv2-screen-flow" style={{marginTop:48}}>
      <ActualScreen src="/surya-portfolio/comski/journey.webp" alt="ComSki journey screen" label="JOURNEY" detail="Progression"/>
      <i><ArrowRight/></i>
      <ActualScreen src="/surya-portfolio/comski/practice.webp" alt="ComSki practice screen" label="PRACTICE" detail="Task interaction"/>
      <i><ArrowRight/></i>
      <ActualScreen src="/surya-portfolio/comski/feedback.webp" alt="ComSki feedback screen" label="FEEDBACK" detail="Response / assessment"/>
     </div>
     <div className="cv2-exploration-note" style={{marginTop:48}}>
      <div><span>REAL SOURCE</span><b>Final product surfaces</b><small>Home · Journey · Practice · Feedback · Record</small></div>
      <div><span>NOT FABRICATED</span><b>Missing exploration artifacts</b><small>The supplied source set does not contain dated wireframes or alternative concepts, so they are not invented here.</small></div>
      <ActualScreen src="/surya-portfolio/comski/record.webp" alt="ComSki record screen" label="RECORD" detail="Real product screen" variant="large"/>
     </div>
    </section>

    <section id="reflection" className="cs-section">
     <SectionLabel num="08" label="OUTCOME / REFLECTION"/>
     <h2>The design establishes a continuous model: <em>who the learner is → what they practise → how they progress.</em></h2>
     <div className="cs-grid-3">
      <article><Target/><b>PERSONALISATION</b><h3>Context enters before assessment.</h3><p>The onboarding model gives the product learner-specific inputs before the four-skill journey begins.</p></article>
      <article><Route/><b>STRUCTURE</b><h3>Four modalities share one journey.</h3><p>Reading, Listening, Writing and Speaking remain distinct while using a consistent progression model.</p></article>
      <article><Sparkles/><b>CONTINUITY</b><h3>Completion leads somewhere.</h3><p>The handoffs connect individual skill checks into a coherent sequence.</p></article>
     </div>
     <div className="cs-reflection"><span>DESIGN REFLECTION</span><p>The strongest design move is not a single screen. It is the system connecting <em>personal context → assessment → practice → progression</em> without making the learner relearn the interface at every step.</p></div>
    </section>
   </div>
  </article>
<footer className="cs-footer"><span>COMSKI / CASE STUDY</span><h2>Designing the journey from <em>personal context to communication confidence.</em></h2><a href="/surya-portfolio/">Back to portfolio <ArrowRight size={17}/></a></footer>
 </main></CV2PageTransition>
}
