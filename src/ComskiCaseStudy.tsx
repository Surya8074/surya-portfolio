import React,{useEffect,useState} from 'react';
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
export default function ComskiCaseStudy(){
 const [progress,setProgress]=useState(0);
 useEffect(()=>{const fn=()=>{const h=document.documentElement.scrollHeight-innerHeight;setProgress(h?scrollY/h:0)};addEventListener('scroll',fn,{passive:true});fn();return()=>removeEventListener('scroll',fn)},[]);
 return <main className="comski-case" id="top">
  <div className="cs-progress"><span style={{transform:'scaleX('+progress+')'}}/></div>
  <nav className="cs-nav"><a href="/surya-portfolio/"><b>Surya Kiran</b><span>ComSki / Case Study</span></a><a href="/surya-portfolio/">Back to portfolio ↗</a></nav>

  <header className="cs-hero">
   <div className="cs-hero-bg"/>
   <div className="cs-hero-inner">
    <div className="cs-kicker"><span>02 / 04</span><span>AI · COMMUNICATION · PRODUCT DESIGN</span></div>
    <div className="cs-hero-copy">
     <p>COMSKI</p>
     <h1>Designing a communication coach that <em>starts with the learner.</em></h1>
     <div className="cs-hero-grid">
      <p>ComSki combines personalised onboarding with four communication skill checks — Reading, Listening, Writing and Speaking — and turns them into one continuous learning journey.</p>
      <div className="cs-meta"><div><small>ROLE</small><b>Product Designer</b></div><div><small>PRODUCT</small><b>AI communication coach</b></div><div><small>CORE EXPERIENCE</small><b>Personalisation + skill assessment</b></div><div><small>TOOLS</small><b>Figma · interaction design</b></div></div>
     </div>
    </div>
    <a className="cs-scroll" href="#s01"><span>EXPLORE THE CASE STUDY</span><ArrowDown size={15}/></a>
   </div>
   <div className="cs-hero-visual">
    <div className="cs-hero-orbit o1"/><div className="cs-hero-orbit o2"/>
    <div className="cs-skill-cluster">
     <div className="skill-core"><Sparkles size={22}/><b>ComSki</b><span>Personal communication buddy</span></div>
     <div className="skill-node n-reading"><BookOpen/><b>Reading</b><small>Read it like you mean it</small></div>
     <div className="skill-node n-listening"><Headphones/><b>Listening</b><small>Listen carefully</small></div>
     <div className="skill-node n-writing"><PenLine/><b>Writing</b><small>Express your thoughts</small></div>
     <div className="skill-node n-speaking"><Mic2/><b>Speaking</b><small>Speak freely</small></div>
     <div className="skill-line l1"/><div className="skill-line l2"/><div className="skill-line l3"/><div className="skill-line l4"/>
    </div>
   </div>
  </header>

  <section className="cs-intro"><div><span>THE PRODUCT</span><h2>Personalisation is not a feature on top of the product. <em>It is the entry point.</em></h2></div><p>The supplied ComSki screens show a deliberate sequence: establish who the learner is, understand what they want from communication, understand how much time they can give, establish confidence and interests, then move into a structured four-skill assessment journey.</p></section>

  <section className="cs-snapshot"><div className="cs-snapshot-head"><span>AT A GLANCE</span><p>The strongest product story is the relationship between onboarding, assessment and progression.</p></div><div className="cs-snapshot-grid"><div><small>ENTRY</small><b>Personalised onboarding</b><span>Context before content</span></div><div><small>ASSESSMENT</small><b>4 communication skills</b><span>Reading · Listening · Writing · Speaking</span></div><div><small>STRUCTURE</small><b>5-question skill checks</b><span>Consistent progression and completion states</span></div><div><small>HANDOFF</small><b>One skill leads to the next</b><span>Completion screens make the journey explicit</span></div></div></section>

  <article className="cs-layout">
   <aside className="cs-chapters"><a href="#s01">01 <b>PRODUCT PREMISE</b></a><a href="#s02">02 <b>PERSONALISATION</b></a><a href="#s03">03 <b>ASSESSMENT MODEL</b></a><a href="#s04">04 <b>FOUR SKILLS</b></a><a href="#s05">05 <b>INTERACTION SYSTEM</b></a><a href="#s06">06 <b>PROGRESSION</b></a><a href="#s07">07 <b>REFLECTION</b></a></aside>

   <div className="cs-content">
    <section id="s01" className="cs-section">
     <SectionLabel num="01" label="PRODUCT PREMISE"/>
     <h2>The core design problem was not “how do we teach English?” <em>It was how do we make practice feel relevant to one person?</em></h2>
     <div className="cs-two"><p>ComSki introduces itself as a “personal communication buddy”. That framing matters: the first interaction is not a lesson, score or dashboard. It is a conversation about the learner.</p><p>The screens then move from personal context into a structured assessment. This creates a product narrative where the system first gathers context and then asks the learner to demonstrate communication across multiple modes.</p></div>
     <div className="cs-principle"><b>DESIGN PRINCIPLE</b><strong>Build the learner model first. <em>Then build the learning journey around it.</em></strong></div>
    </section>

    <section id="s02" className="cs-section">
     <SectionLabel num="02" label="PERSONALISED ONBOARDING"/>
     <h2>Six onboarding moments create a <em>learner context layer.</em></h2>
     <p className="cs-lead">The supplied Figma exports show onboarding as a sequence of contextual questions rather than a generic sign-up form. Each screen asks for a different signal about the person entering ComSki.</p>
     <ScreenAnatomy type="onboarding"/>
     <div className="cs-input-grid">
      <article><UserRound/><small>01 · VIBE</small><h3>“Pick the vibe that feels most like you today.”</h3><p>ComSki opens with an expressive, character-led choice. The selected avatar becomes a lightweight way to establish identity and tone before more functional questions begin.</p></article>
      <article><Target/><small>02 · GOAL</small><h3>“What’s your big goal for English & communication skills?”</h3><p>The goal options include interviews, speaking confidence, professional communication, becoming an influencer, expressing ideas more fluently and communicating with AI.</p></article>
      <article><Compass/><small>03 · DISCOVERY</small><h3>“How did you discover me?”</h3><p>Friend recommendation, social media, college community and self-discovery are represented as explicit acquisition contexts in the source screens.</p></article>
      <article><Clock3/><small>04 · TIME</small><h3>“How much time can you give me every day?”</h3><p>The learner chooses between 10 minutes, 20 minutes, 1 hour or a flexible routine. The product acknowledges that consistency has to fit the learner’s real schedule.</p></article>
      <article><SlidersHorizontal/><small>05 · CONFIDENCE</small><h3>“How confident are you in your communication right now?”</h3><p>The source provides Beginner, Intermediate, Advanced and Professional states before the learner selects “Personalise my journey”.</p></article>
      <article><Sparkles/><small>06 · INTERESTS</small><h3>“What topics or activities do you enjoy exploring?”</h3><p>Technology, travel, gaming, career and skills, music and movies, fitness and other interests are surfaced as content context.</p></article>
     </div>
     <div className="cs-anatomy-note"><b>WHY THIS MATTERS</b><span>These inputs create a richer starting state than proficiency alone: the product learns the learner’s <em>goal, availability, confidence, personality and interests</em> before the skill checks begin.</span></div>
    </section>

    <section id="s03" className="cs-section">
     <SectionLabel num="03" label="ASSESSMENT MODEL"/>
     <h2>The assessment is framed as <em>understanding, not judgement.</em></h2>
     <div className="cs-assessment">
      <div className="assessment-copy"><span>ASSESSMENT INTRO</span><h3>“This test helps ComSki understand your unique communication style — not to judge you, but to build a personalized roadmap just for you.”</h3><p>The source screens also ask learners to find a calm spot and confirm that their mic and speakers are working. That preparation is part of the experience, because several skill checks depend on listening and spoken interaction.</p></div>
      <div className="assessment-steps"><div><b>01</b><span>Prepare environment</span><small>Calm spot · mic · speakers</small></div><div><b>02</b><span>Run skill check</span><small>Five questions per skill</small></div><div><b>03</b><span>Complete or retry</span><small>Explicit completion state</small></div><div><b>04</b><span>Continue journey</span><small>Next assessment is surfaced</small></div></div>
     </div>
     <div className="cs-five"><span>SHARED ASSESSMENT GRAMMAR</span><div><b>01</b><span>Orientation</span></div><div><b>02</b><span>Task</span></div><div><b>03</b><span>Question progression</span></div><div><b>04</b><span>Completion</span></div><div><b>05</b><span>Next skill</span></div></div>
    </section>

    <section id="s04" className="cs-section">
     <SectionLabel num="04" label="FOUR SKILLS"/>
     <h2>Four different cognitive tasks.<br/><em>One consistent product grammar.</em></h2>
     <div className="cs-skill-grid">
      <article className="skill-reading"><BookOpen/><small>01 · READING</small><h3>Read It Like You Mean It</h3><p>The learner reads a passage aloud, then works through comprehension questions. The source copy explicitly asks the learner to focus on clarity, flow and expression.</p><Pill>Voice + comprehension</Pill></article>
      <article className="skill-listening"><Headphones/><small>02 · LISTENING</small><h3>Listen Carefully</h3><p>A short audio clip can be a story, daily situation or informative message. The learner listens, then answers a quick question about what they heard.</p><Pill>Audio + comprehension</Pill></article>
      <article className="skill-writing"><PenLine/><small>03 · WRITING</small><h3>Express Your Thoughts Freely</h3><p>A short question or situation creates the writing task. The learner responds in their own words, with the interface keeping the writing surface central.</p><Pill>Written expression</Pill></article>
      <article className="skill-speaking"><Mic2/><small>04 · SPEAKING</small><h3>Speak Freely, Be Yourself</h3><p>A short question or topic gives the learner something concrete to talk about. The instruction explicitly encourages natural voice rather than perfection.</p><Pill>Spoken expression</Pill></article>
     </div>
     <div className="cs-skill-matrix"><div><b>SKILL</b><span>INPUT</span><span>PRIMARY TASK</span><span>OUTPUT</span></div><div><b>Reading</b><span>Text</span><span>Read aloud + answer</span><span>Comprehension / expression</span></div><div><b>Listening</b><span>Audio</span><span>Listen + answer</span><span>Comprehension</span></div><div><b>Writing</b><span>Text / scenario</span><span>Compose response</span><span>Written expression</span></div><div><b>Speaking</b><span>Prompt</span><span>Speak naturally</span><span>Spoken expression</span></div></div>
    </section>

    <section className="cs-deep">
      <div className="deep-intro"><span>DEEP DIVE</span><h2>Same shell.<br/><em>Different behaviour.</em></h2><p>The strength of the system is not that every skill looks identical. It is that the learner can recognise the structure while the task changes.</p></div>
      <div className="deep-card"><ScreenAnatomy type="reading"/><div><span>01 / READING</span><h3>Reading turns the interface into a guided performance.</h3><p>The passage is the primary visual object. The instruction establishes the expected behaviour — read aloud with natural voice, with emphasis on clarity, flow and expression. The question layer then changes the mode from performance to comprehension.</p><ul><li><b>Task framing:</b> clear instruction before the passage.</li><li><b>Progression:</b> Question 1/5 through Question 5/5.</li><li><b>Completion:</b> “Continue to Listening Assessment” makes the next step explicit.</li></ul></div></div>
      <div className="deep-card reverse"><div><span>02 / LISTENING</span><h3>Listening separates input from response.</h3><p>The learner first receives information through audio. The interface then asks for a quick answer, creating a simple input → comprehension → response loop.</p><ul><li><b>Input:</b> short audio clip.</li><li><b>Context:</b> story, daily situation or informative message.</li><li><b>Navigation:</b> play, answer, skip or continue.</li></ul></div><ScreenAnatomy type="listening"/></div>
      <div className="deep-card"><ScreenAnatomy type="writing"/><div><span>03 / WRITING</span><h3>Writing gives the learner room to construct the answer.</h3><p>Instead of forcing the learner into predefined choices, the writing task creates a scenario and leaves the response surface open. That changes the interaction from recognition to expression.</p><ul><li><b>Prompt:</b> a short question or situation.</li><li><b>Response:</b> learner-generated text.</li><li><b>Feedback opportunity:</b> the written answer becomes an artefact that can be evaluated and revisited.</li></ul></div></div>
      <div className="deep-card reverse"><div><span>04 / SPEAKING</span><h3>Speaking is framed around expression, not perfection.</h3><p>The prompt examples ask the learner to talk about emotions, experiences and places. The copy explicitly says to use a natural voice and not worry about perfection — a small but important interaction decision for a communication product.</p><ul><li><b>Prompt:</b> question or topic.</li><li><b>Context:</b> personal experience and imagined situations.</li><li><b>Behaviour:</b> speak naturally, then progress.</li></ul></div><ScreenAnatomy type="speaking"/></div>
    </section>

    <section id="s05" className="cs-section">
     <SectionLabel num="05" label="INTERACTION SYSTEM"/>
     <h2>The system keeps the <em>mental model stable</em> while the communication mode changes.</h2>
     <div className="cs-system-architecture">
      <div className="arch-core"><Sparkles/><small>COMSKI CORE</small><h3>Understand → Practice → Respond → Progress</h3><p>Every skill sits inside the same broader journey. The learner does not need to relearn navigation every time the input modality changes.</p></div>
      <div className="arch-rows"><div><b>ORIENTATION</b><span>What am I about to do?</span></div><div><b>TASK</b><span>What do I need to say, hear, read or write?</span></div><div><b>PROGRESS</b><span>Where am I inside the five-question check?</span></div><div><b>COMPLETION</b><span>What did I finish, and what happens next?</span></div></div>
     </div>
     <div className="cs-decision-grid">
      <article><span>DECISION 01</span><h3>Keep the skill navigation visible.</h3><p>The four test categories remain recognisable across the source screens, helping learners understand where they are in the broader assessment.</p></article>
      <article><span>DECISION 02</span><h3>Use the same progress language.</h3><p>Question counts such as 1/5 and 5/5 establish a predictable rhythm across skill types.</p></article>
      <article><span>DECISION 03</span><h3>Make completion directional.</h3><p>Completion states do more than celebrate. They point toward the next assessment and provide a retry path.</p></article>
     </div>
    </section>

    <section id="s06" className="cs-section">
     <SectionLabel num="06" label="PROGRESSION"/>
     <h2>The real product architecture appears in the <em>handoffs.</em></h2>
     <p className="cs-lead">The completion screens reveal a deliberate sequence: finishing one skill immediately exposes the next skill assessment. This makes the four modules behave like a journey rather than a library of disconnected tests.</p>
     <div className="cs-journey"><div className="journey-node"><BookOpen/><b>Reading</b><small>Skill check</small></div><i>→</i><div className="journey-node"><Headphones/><b>Listening</b><small>Skill check</small></div><i>→</i><div className="journey-node"><PenLine/><b>Writing</b><small>Skill check</small></div><i>→</i><div className="journey-node"><Mic2/><b>Speaking</b><small>Skill check</small></div></div>
     <div className="cs-completion"><ScreenAnatomy type="completion"/><div><span>DESIGN PATTERN</span><h3>Celebrate the current state, then remove the question “what now?”</h3><p>The source completion screens use three useful elements together: recognition of completion, a forward path and a retry option. That is a small interaction pattern with a large effect on continuity.</p><div className="completion-points"><b><Check/> Completion is acknowledged</b><b><ArrowRight/> Next skill is surfaced</b><b><Route/> Retry remains available</b></div></div></div>
    </section>

    <section id="s07" className="cs-section">
     <SectionLabel num="07" label="OUTCOME & REFLECTION"/>
     <h2>The strongest outcome is a product that makes <em>personalisation visible in the journey.</em></h2>
     <div className="cs-outcome-grid"><article><Target/><b>PERSONALISATION</b><h3>Context is collected before practice.</h3><p>Goal, confidence, available time, interests and personal tone are established before the assessment experience begins.</p></article><article><Route/><b>STRUCTURE</b><h3>Four modalities share one journey.</h3><p>Reading, Listening, Writing and Speaking are distinct tasks, but the assessment grammar and progression model remain familiar.</p></article><article><Sparkles/><b>CONTINUITY</b><h3>Completion leads somewhere.</h3><p>The handoff from one skill to the next turns isolated exercises into a coherent assessment sequence.</p></article></div>
     <div className="cs-reflection"><span>DESIGN REFLECTION</span><p>ComSki pushed the work beyond designing individual screens. The more important design problem was connecting the screens into a system: <em>who the learner is → why they are here → what they practise → how each skill progresses → what they do next.</em></p></div>
    </section>
   </div>
  </article>
  <footer className="cs-footer"><span>COMSKI / CASE STUDY</span><h2>Designing the journey from <em>personal context to communication confidence.</em></h2><a href="/surya-portfolio/">Back to portfolio <ArrowRight size={17}/></a></footer>
 </main>
}
