import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './reference-home.css';
import './toniq-ai-page.css';
import { toniqReferenceAssets } from './toniq-reference-assets';

const base = 'https://www.helloayushi.com/images/case-studies/toniq-ai/';
const A = ({src,alt,caption}:{src:string;alt:string;caption?:string}) => <figure className="ta-figure"><img src={base+src} alt={alt} loading="lazy"/>{caption&&<figcaption>{caption}</figcaption>}</figure>;
const K = ({children}:{children:React.ReactNode}) => <p className="ta-kicker">{children}</p>;
function ToniqPage(){
 const [activeSketch, setActiveSketch] = React.useState<number | null>(null);
 return <div className="ta-page">
  <header className="reference-nav"><div className="reference-nav-inner"><a className="reference-brand" href="/surya-portfolio/"><strong>Surya Kiran</strong><span className="reference-brand-divider" /><span>India</span></a><nav><a href="/surya-portfolio/#art">Art</a><a href="/surya-portfolio/#about">About Me</a><a className="resume-nav-link" href="/surya-portfolio/resume/">Resume</a></nav></div></header>
  <main>
   <section className="ta-hero" id="top">
    <div className="ta-hero-visual" aria-label="Toniq virtual networking space">
     <div className="ta-float ta-float-anna" style={{left:'11.5%',top:'calc(14% + 5px)',width:88,animationDuration:'6.4s',animationDelay:'0s'}}><img className="ta-avatar" src={base+'redesign/hero-avatar-anna-marie.png'} alt="Attendee Anna Marie"/></div>
     <div className="ta-float ta-float-marcus" style={{left:'86%',top:'5%',width:88,animationDuration:'7.1s',animationDelay:'.5s'}}><img className="ta-avatar" src={base+'redesign/hero-avatar-marcus.png'} alt="Attendee Marcus"/></div>
     <div className="ta-float ta-float-maria" style={{left:'.5%',top:'47%',width:88,animationDuration:'7.6s',animationDelay:'.9s'}}><img className="ta-avatar" src={base+'redesign/hero-avatar-maria.png'} alt="Attendee Maria"/></div>
     <div className="ta-float ta-float-pair" style={{left:'70%',top:'32%',width:320,animationDuration:'6.8s',animationDelay:'.2s'}}><img className="ta-avatar" src={base+'redesign/hero-avatar-pair-kristian-alexx.png'} alt="Attendees Kristian and Alexx, glad to meet you here"/></div>
     <div className="ta-float ta-float-matt" style={{left:'5.5%',top:'69%',width:88,animationDuration:'6.1s',animationDelay:'.6s'}}><img className="ta-avatar" src={base+'redesign/hero-avatar-matt-d.png'} alt="Attendee Matt D"/></div>
     <div className="ta-float ta-float-amy" style={{left:'23%',top:'80%',width:88,animationDuration:'7.3s',animationDelay:'1.1s'}}><img className="ta-avatar" src={base+'redesign/hero-avatar-amy-s.png'} alt="Attendee Amy S"/></div>
     <div className="ta-float ta-float-you" style={{left:'66.5%',top:'73%',width:154,animationDuration:'6.6s',animationDelay:'.3s'}}><img className="ta-avatar" src={base+'redesign/hero-avatar-you.png'} alt="You"/></div>
     <div className="ta-float ta-float-aria" style={{left:'91.5%',top:'80%',width:88,animationDuration:'7.5s',animationDelay:'.8s'}}><img className="ta-avatar" src={base+'redesign/hero-avatar-aria-l.png'} alt="Attendee Aria L"/></div>
     <div className="ta-float" style={{left:'16.5%',top:'calc(22% + 16px)',animationDuration:'6.7s',animationDelay:'.2s'}}><span className="ta-hero-tag ta-tag-one" style={{background:'#649fa6',color:'#f9f9f9'}}>Anyone in SAAS?<i className="ta-tag-tail ta-tail-top"/></span></div>
     <div className="ta-float" style={{left:'calc(10.5% - 10px)',top:'66%',animationDuration:'6.3s',animationDelay:'.4s'}}><span className="ta-hero-tag ta-tag-two" style={{background:'#fdb201',color:'#f9f9f9'}}>You also love Tennis?<i className="ta-tag-tail ta-tail-bottom"/></span></div>
     <div className="ta-float" style={{left:'calc(13.5% + 28px)',top:'90.5%',animationDuration:'7s',animationDelay:'1s'}}><span className="ta-hero-tag ta-tag-three" style={{background:'#01c861',color:'#f9f9f9'}}>Yeah, Lets play?<i className="ta-tag-tail ta-tail-top ta-tail-right"/></span></div>
     <div className="ta-float" style={{left:'calc(72.5% + 15px)',top:'calc(72% - 45px)',animationDuration:'6.9s',animationDelay:'.5s'}}><span className="ta-hero-tag ta-tag-four" style={{background:'rgba(242,242,242,.9)',color:'#202a40',border:'1px solid #e2e2e2',padding:'9px 17px',fontSize:16}}>Open to collab<i className="ta-tag-tail ta-tail-circle"/></span></div>
     <img className="ta-party-tag" style={{left:'calc(83% + 34px)',top:'calc(67.5% + 45px)',width:112,animationDuration:'7.4s',animationDelay:'.9s'}} src={base+'redesign/hero-tag-party.png'} alt=""/>
    </div>
    <div className="ta-hero-copy">
     <div className="ta-hero-mark"><img src={base+'redesign/hero-cube.png'} alt="Toniq logo"/></div>
     <h1>Reimagining online events worth exploring</h1>
     <p className="ta-subtitle">Toniq AI combines spatial navigation with AI-powered connection, so online events feel alive</p>
    </div>
   </section>
   <section className="ta-dashboard-cta"><div className="ta-dashboard-cta-inner"><a className="ta-dashboard-preview" href="https://www.helloayushi.com/toniq-dashboard/index.html" aria-label="Open the live Toniq AI dashboard" target="_blank" rel="noopener noreferrer"><div className="ta-dashboard-preview-frame"><iframe title="Toniq AI live dashboard preview" loading="lazy" sandbox="allow-popups allow-top-navigation-by-user-activation allow-scripts allow-modals allow-popups allow-downloads allow-pointer-lock allow-presentation" scrolling="no" src={import.meta.env.BASE_URL + 'toniq-dashboard-preview.html'} /><div className="ta-dashboard-preview-overlay" aria-hidden="true"/><img className="ta-dashboard-preview-logo" src={base+'redesign/toniq-logo.svg'} alt="" aria-hidden="true"/><span className="ta-dashboard-preview-button">Try the LIVE dashboard</span></div></a></div></section>
   <section className="ta-meta"><div><span>Role</span><strong>Product Strategy, Product Design &amp; Visual Identity</strong></div><div><span>Timeline</span><strong>8 Months<br/><small>August 2025 – April 2026</small></strong></div><div><span>Mentor</span><strong>Blake Hudelson<br/><small>Co-Founder, BoomPop</small></strong></div></section>
   <section className="ta-section ta-problem">
    <div className="ta-section-inner ta-problem-inner">
     <div className="ta-problem-copy"><K>The problem</K><h2>Virtual networking events are broken</h2><div className="ta-problem-body"><p className="ta-lead">There’s a difference between being at an event and being in one.</p><p className="ta-copy">Online events solved attendance. What they never solved: the moment two strangers find each other, recognize a reason to talk, and walk away with something worth keeping.</p><p className="ta-copy">Toniq is an argument that the problem isn’t the video call. It’s the absence of a design.</p></div></div>
     <figure className="ta-figure ta-problem-visual"><img src={toniqReferenceAssets.jury} alt="Ayushi presenting Toniq at the jury review" loading="lazy"/><figcaption>Jury Presentation</figcaption></figure>
    </div>
   </section>
   <section className="ta-section ta-thesis">
    <div className="ta-section-inner ta-thesis-inner">
     <div className="ta-thesis-copy"><K>The thesis</K><h2>Rebuild the room</h2><div className="ta-thesis-body"><p className="ta-lead">Rebuild the room (spatial proximity, ambient awareness, the option to drift) and let AI handle what the room can’t (context, recall, follow-through).</p><p className="ta-copy">The connection problem stops being a UX problem and becomes a system problem worth solving.</p></div></div>
     <div className="ta-thesis-visual" aria-label="Spatial proximity translated into the Toniq canvas"><img src={base+'redesign/thesis-visual-1.png'} alt="People scattered at varying proximities in a real-world space" loading="lazy"/><img src={base+'redesign/thesis-visual-2.png'} alt="The same proximity replicated as avatar bubbles inside the Toniq spatial canvas" loading="lazy"/></div>
    </div>
   </section>
   <section className="ta-section ta-research"><K>Research</K><h2>We talked to 10+ people for our research</h2><p className="ta-lead">10 in-depth interviews across 6 sessions.</p><p className="ta-copy">Community organizers, event hosts, program emcees, repeat attendees, and graduate students raised on remote-first programs.</p>
    <div className="ta-quotes-window"><div className="ta-quotes">
     <article><h3>Camera-off culture is a load-bearing default</h3><blockquote>“I’m always kind of paranoid people are going to hear me talking, or like it’s going to be recorded.”</blockquote><div><img src={toniqReferenceAssets.quoteEleanor1} alt="Eleanor"/><span><b>Eleanor</b><small>Attendee</small></span></div></article>
     <article><h3>Breakout rooms fail at the seam</h3><blockquote>“Breakout rooms can do, but I don’t know how to use them. Physically you are aware when a person is done talking. Online? I’m not sure.”</blockquote><div><img src={toniqReferenceAssets.quoteBhavneet} alt="Bhavneet"/><span><b>Bhavneet</b><small>Attendee</small></span></div></article>
     <article><h3>Retaining connection</h3><blockquote>“If I just make one, just one friend from an event, I think for me the event is successful. But that doesn’t happen.”</blockquote><div><img src={toniqReferenceAssets.quoteEleanor2} alt="Eleanor"/><span><b>Eleanor</b><small>Attendee</small></span></div></article>
     <article><h3>The “one bridge person” barrier</h3><blockquote>“No one has made friends virtually through these sessions.”</blockquote><div><img src={toniqReferenceAssets.quoteThomas} alt="Thomas"/><span><b>Thomas</b><small>Facilitator</small></span></div></article>
     <article><h3>Facilitator burnout is invisible labor</h3><blockquote>“He would love an app that shows the relevant info of each person as they talk, from the worksheet they filled out.”</blockquote><div><img src={toniqReferenceAssets.quoteAbbassi} alt="Dr. Abbassi"/><span><b>Dr. Abbassi</b><small>Host &amp; Researcher</small></span></div></article>
     <article><h3>Connection evaporates within 72 hours</h3><blockquote>“Being able to listen to specific people or have side conversations would be interesting.”</blockquote><div><img src={toniqReferenceAssets.quoteChristian} alt="Christian"/><span><b>Christian</b><small>Content Creator &amp; Host</small></span></div></article>
    
     <article><h3>Camera-off culture is a load-bearing default</h3><blockquote>“I’m always kind of paranoid people are going to hear me talking, or like it’s going to be recorded.”</blockquote><div><img src={toniqReferenceAssets.quoteEleanor1} alt="Eleanor"/><span><b>Eleanor</b><small>Attendee</small></span></div></article>
     <article><h3>Breakout rooms fail at the seam</h3><blockquote>“Breakout rooms can do, but I don’t know how to use them. Physically you are aware when a person is done talking. Online? I’m not sure.”</blockquote><div><img src={toniqReferenceAssets.quoteBhavneet} alt="Bhavneet"/><span><b>Bhavneet</b><small>Attendee</small></span></div></article>
     <article><h3>Retaining connection</h3><blockquote>“If I just make one, just one friend from an event, I think for me the event is successful. But that doesn’t happen.”</blockquote><div><img src={toniqReferenceAssets.quoteEleanor1} alt="Eleanor"/><span><b>Eleanor</b><small>Attendee</small></span></div></article>
     <article><h3>The “one bridge person” barrier</h3><blockquote>“No one has made friends virtually through these sessions.”</blockquote><div><img src={toniqReferenceAssets.quoteThomas} alt="Thomas"/><span><b>Thomas</b><small>Facilitator</small></span></div></article>
     <article><h3>Facilitator burnout is invisible labor</h3><blockquote>“He would love an app that shows the relevant info of each person as they talk, from the worksheet they filled out.”</blockquote><div><img src={toniqReferenceAssets.quoteAbbassi} alt="Dr. Abbassi"/><span><b>Dr. Abbassi</b><small>Host &amp; Researcher</small></span></div></article>
     <article><h3>Connection evaporates within 72 hours</h3><blockquote>“Being able to listen to specific people or have side conversations would be interesting.”</blockquote><div><img src={toniqReferenceAssets.quoteChristian} alt="Christian"/><span><b>Christian</b><small>Content Creator &amp; Host</small></span></div></article>
    </div></div>
   </section>
   <section className="ta-section ta-journey">
    <div className="ta-section-inner ta-journey-inner">
     <div className="ta-journey-intro"><K>Journey mapping</K><h2>Two users, two parallel journeys</h2><p className="ta-lead">Two users experienced the same event through different interfaces. Every existing platform designed for one and assumed the other would benefit. They mapped differently.</p></div>
     <div className="ta-journey-map" aria-label="Journey maps for hosts and attendees">
      <div className="ta-journey-map-frame">
       <img className="ta-journey-map-host" src={toniqReferenceAssets.journeyHost} alt="Host journey map across Discover, Setup, Use, Reflection" loading="lazy"/>
       <img className="ta-journey-map-attendee" src={toniqReferenceAssets.journeyAttendee} alt="Attendee journey map across Discover, Setup, Use, Reflection" loading="lazy"/>
      </div>
     </div>
     <div className="ta-journey-evidence" aria-label="Journey map findings">
      <img src={toniqReferenceAssets.painPoints} alt="Pain points identified across the attendee and host journeys" loading="lazy"/>
      <img src={toniqReferenceAssets.needs} alt="Needs identified across the attendee and host journeys" loading="lazy"/>
     </div>
     <p className="ta-callout">What the map revealed: every breakdown was an information problem. The system knew who was there, who was talking, what was on profiles. It just wasn’t surfacing any of it to the people who needed it.</p>
    </div>
   </section>
   <section className="ta-sketch-section"><div className="ta-sketch-gallery">{[1,2,3,4,5,6,7].map(n=><button type="button" className="ta-sketch-zoom" key={n} aria-label={`Enlarge research synthesis sketch ${n}`} onClick={()=>setActiveSketch(n-1)}><img src={toniqReferenceAssets.sketches[n-1]} alt={`Research synthesis sketch ${n}`} loading="lazy"/></button>)}</div>{activeSketch !== null && <div className="ta-lightbox" role="dialog" aria-modal="true" aria-label="Research sketch enlarged" onClick={()=>setActiveSketch(null)}><button type="button" className="ta-lightbox-close" aria-label="Close enlarged sketch" onClick={(event)=>{event.stopPropagation();setActiveSketch(null)}}>×</button><img src={toniqReferenceAssets.sketches[activeSketch]} alt={`Research synthesis sketch ${activeSketch+1}`} onClick={(event)=>event.stopPropagation()}/></div>}</section>
   <section className="ta-section ta-ai"><K>System thinking</K><h2>Why AI and not something simpler?</h2><p className="ta-lead">The thoughtful question: why is AI the right intervention, and not better profiles, host-curated intros, or a smarter matching algorithm?</p><div className="ta-ai-graphic"><A src="redesign/why-ai-section.svg" alt="Visual explanation of why AI is appropriate for contextual event connections"/></div><div className="ta-ai-mobile-cards">{toniqReferenceAssets.whyAiCards.map((src, i)=><img key={src} src={src} alt={["Context changes per person and moment","Cold-start is the whole problem","Memory needs synthesis, not storage"][i]} loading="lazy"/>)}</div><p className="ta-callout">What AI is not doing: replacing THE moment. The conversations are still yours. The AI’s job ends when two people start talking.</p></section>
   <section className="ta-section ta-system">
    <div className="ta-section-inner ta-system-inner">
     <div className="ta-system-intro">
      <h3>2. System: AI as a continuous layer</h3>
      <div className="ta-system-copy"><p>Most products treat AI as a feature you open.</p><p>Toniq treats it as a layer that’s always running, doing four different jobs across four moments of the event.</p></div>
     </div>
     <div className="ta-system-demo">
      <div className="ta-system-tabs" role="tablist" aria-label="AI across the event">
       <button type="button" className="active" role="tab" aria-selected="true">Before Event</button>
       <button type="button" role="tab" aria-selected="false" disabled>Event Entry</button>
       <button type="button" role="tab" aria-selected="false" disabled>During Event</button>
       <button type="button" role="tab" aria-selected="false" disabled>After Event</button>
      </div>
      <div className="ta-system-panel">
       <p className="ta-system-panel-title">Before Event</p>
       <p>Intent capture: natural language, not a dropdown. The goal is to capture intent the way you’d describe it to a friend.</p>
       <p>Output: three ranked introductions, each with a specific reason.</p>
       <img src={toniqReferenceAssets.systemBeforeEvent} alt="Toniq AI before-event screen capturing attendee intent in natural language" loading="lazy"/>
      </div>
     </div>
    </div>
   </section>
   <section className="ta-section ta-principle">
    <div className="ta-principle-copy">
     <h3>3. Principle, designed (not stated)</h3>
     <div className="ta-principle-intro"><p>AI suggests. User decides. Always.</p><p>This sounded like a value statement until I had to build the screens where it lives. Three design decisions made the principle real:</p></div>
     <div className="ta-principle-decisions">
      <p><strong>1. The override is louder than the suggestion.</strong> Every AI suggestion shows a Not interested control with equal visual weight to Accept. Most products bury the decline. We made it parallel.</p>
      <p><strong>2. The system shows its reasoning.</strong> “Maria, Design Systems Lead at ABC Corp — because you mentioned design systems in your intent.” The italicized clause is non-optional. Without the why, there’s no informed consent.</p>
      <p><strong>3. The AI never initiates a conversation.</strong> It will suggest you meet Maria. It will not message Maria for you. The handoff from AI to human happens at the threshold of contact and stays there.</p>
     </div>
    </div>
    <div className="ta-principle-banner"><a href="https://www.helloayushi.com/toniq-dashboard/index.html" target="_blank" rel="noreferrer" aria-label="Open the live Toniq dashboard"><img src="https://www.helloayushi.com/images/case-study/assets/toniq-icon-black.png" alt="Toniq"/><span>Explore Toniq AI ↗</span></a></div>
   </section>
   <section className="ta-section ta-testing"><K>Testing</K><h2>Testing the product and what we measured</h2><p className="ta-lead">A few rounds of formative testing across the 4 months.</p><p className="ta-copy">But the numbers are directional, not statistical. Appropriate for a thesis, insufficient for a launch. The next study needs 30+ participants across at least two event types, and the host experience needs its own track.</p><div className="ta-two-figures"><figure className="ta-figure"><img src={toniqReferenceAssets.testingSynthesis} alt="Getting synthesis of the low fidelity" loading="lazy"/><figcaption>Getting synthesis of the low fidelity</figcaption></figure><figure className="ta-figure"><img src={toniqReferenceAssets.testingCardSort} alt="Card sorting techniques" loading="lazy"/><figcaption>Card sorting techniques</figcaption></figure></div></section>
   <section className="ta-section ta-ui"><K>Product details</K><h2>The pieces that make the product</h2><p className="ta-lead">Toniq is made of a lot of small decisions that add up. From the dashboard to the spatial canvas, the event card with its progress indicator and host detail, the collapsible sidebar that keeps navigation accessible without taking over the screen.</p><p className="ta-copy">The avatar bubbles show you who's talking without interrupting anyone. Small things, designed carefully.</p><div className="ta-ui-gallery"><div className="ta-ui-left"><A src="redesign/piece-left.png" alt="Toniq UI pieces: event card and app sidebar"/></div><div className="ta-ui-middle"><A src="redesign/piece-middle.png" alt="Toniq UI pieces: progress card, toolbar, and AI chat panel"/></div><div className="ta-ui-right"><A src="redesign/piece-right.png" alt="Toniq ongoing event card, avatar trio, and personalised picks"/></div></div></section>
   <section className="ta-section ta-reflection"><K>Reflection</K><h2>What I’d do differently</h2><div className="ta-reflection-list"><article><h3>Onboarding through movement, not instruction.</h3><p>Tutorial overlays got skipped by 4 of 5 testers. The entry zone should teach navigation through navigation — a guided drift that ends when you’re in the main canvas.</p></article><article><h3>An AI transparency layer that scales.</h3><p>At 8 users, a wrong suggestion is a shrug. At 800, it's a brand problem. The consent and explanation layer needs to be infrastructure, not garnish.</p></article><article><h3>A post-event experience worthy of the event.</h3><p>The recap is the lightest screen in the system. The moment after an event is when a connection becomes a relationship or disappears. The AI has every input it needs — context, conversation, intent — to make that moment do real work. We didn't ship that yet.</p></article><article><h3>The host product, properly.</h3><p>Most of our research was attendee-side. The bird's-eye host dashboard and mode-switching were designed from first principles, not from validated need. That's the first thing the next round fixes.</p></article></div><hr className="ta-reflection-divider"/><div className="ta-end"><a className="ta-live" href="https://www.helloayushi.com/toniq-dashboard/index.html" target="_blank" rel="noreferrer">Try the LIVE dashboard ↗</a><p>This is an iterative process. This is my personal project. I would love to know your thoughts and feedback.</p><p>Want to share feedback? <a href="https://www.linkedin.com/in/helloayushi/" target="_blank" rel="noreferrer">Connect on LinkedIn ↗</a></p></div></section>
   <footer className="ta-footer"><a href="/surya-portfolio/">← Back to portfolio</a><p>Surya Kiran © 2026</p></footer>
  </main>
 </div>
}
createRoot(document.getElementById('root')!).render(<ToniqPage/>);
