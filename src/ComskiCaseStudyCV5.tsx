import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const BASE = '/surya-portfolio/comski/';

type Screen = { src: string; title: string; caption: string; alt: string };
const screens: Screen[] = [
  { src: 'Onboarding Intro.svg', title: 'Context first', caption: 'Onboarding establishes a low-pressure learning frame.', alt: 'ComSki onboarding introduction screen' },
  { src: 'Onboarding 1st Question.svg', title: 'Personalise the journey', caption: 'The first question starts shaping the learner context.', alt: 'ComSki first onboarding question screen' },
  { src: 'Reading.svg', title: 'Reading', caption: 'A shared assessment grammar begins with a focused task.', alt: 'ComSki Reading assessment screen' },
  { src: 'Listening 1.svg', title: 'Listening', caption: 'The same progression pattern adapts to a different input.', alt: 'ComSki Listening assessment screen' },
  { src: 'Writing 1.svg', title: 'Writing', caption: 'Practice remains task-led rather than score-led.', alt: 'ComSki Writing assessment screen' },
  { src: 'Speaking 1.svg', title: 'Speaking', caption: 'The system culminates in the highest-pressure modality.', alt: 'ComSki Speaking assessment screen' },
];

const decisions = [
  {
    n: '01',
    title: 'Context before content',
    body: 'Personalisation had to influence the learning journey, not become a profile form that users never see again.',
    result: 'Onboarding → goal-specific journey'
  },
  {
    n: '02',
    title: 'One grammar across four skills',
    body: 'Reading, Listening, Writing and Speaking needed different tasks without becoming four disconnected products.',
    result: 'Prompt → respond → feedback → next step'
  },
  {
    n: '03',
    title: 'Guidance before judgement',
    body: 'AI feedback is useful only when the learner can understand what to do next. Scores become evidence, not the headline.',
    result: 'Signal → explanation → action'
  },
];

const researchRows = [
  ['AI feedback', 'Explainability and calibrated confidence', 'Make reasoning, limitations and next action visible instead of presenting an opaque verdict.'],
  ['Personalisation', 'Goal/context-driven practice patterns in current AI learning products', 'Ask only for context that can change the content, tone or progression.'],
  ['Practice', 'Communication coaching products increasingly combine rehearsal with structured feedback', 'Design the loop around repeatable practice rather than a one-off assessment.'],
];

const challenges = [
  ['Multiple contexts', 'Students and professionals can arrive with very different goals.', 'Shared system, contextual content.'],
  ['AI uncertainty', 'A score can look authoritative even when the signal is imperfect.', 'Guidance and confidence must be separated.'],
  ['Four modalities', 'Different inputs can make the product feel like four mini-products.', 'One interaction grammar across skills.'],
  ['Onboarding friction', 'More personalisation can also mean more setup.', 'Progressive disclosure; every question earns its place.'],
  ['Trust', 'Users are giving the system vulnerable communication data.', 'Visible purpose, status, control and recoverability.'],
  ['Scalability', 'The model must survive new goals, skills and content.', 'Design rules and tokens before screen-by-screen polish.'],
];

const process = ['Understand', 'Frame', 'Explore', 'Converge', 'Structure', 'Design', 'Validate', 'Deliver', 'Measure'];

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={reduce ? { duration: 0 } : { duration: .55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Section({ number, eyebrow, title, intro, children, tone = 'white' }: {
  number: string; eyebrow: string; title: string; intro?: string; children: React.ReactNode; tone?: string;
}) {
  return (
    <section className={`cv5-section cv5-tone-${tone}`} id={`s${number}`}>
      <div className="cv5-section-index"><span>{number}</span></div>
      <div className="cv5-section-main">
        <div className="cv5-eyebrow">{eyebrow}</div>
        <h2>{title}</h2>
        {intro && <p className="cv5-intro">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

function ScreenViewer() {
  const [active, setActive] = useState(0);
  const [openReasoning, setOpenReasoning] = useState(true);
  const screen = screens[active];

  const reasoning = [
    ['USER GOAL', 'Understand what the product is asking before committing to practice.'],
    ['UX PROBLEM', 'A new learner needs context without turning onboarding into a long setup form.'],
    ['DESIGN DECISION', 'Ask for context progressively, then carry it forward into the journey.'],
    ['WHY', 'Personalisation only earns its cost when it changes what the learner sees next.'],
  ];

  return (
    <div className="cv5-viewer">
      <div className="cv5-viewer-main">
        <motion.div
          className="cv5-browser"
          layout
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: .55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="cv5-browserbar"><i/><i/><i/><span>ComSki · {screen.title}</span></div>
          <img src={BASE + screen.src} alt={screen.alt} />
        </motion.div>

        <div className="cv5-viewer-caption">
          <div><span>SCREEN {String(active + 1).padStart(2, '0')}</span><strong>{screen.title}</strong></div>
          <p>{screen.caption}</p>
        </div>

        <motion.div
          className="cv5-screen-accordion"
          layout
          initial={false}
          animate={{ opacity: 1 }}
        >
          <button
            className="cv5-screen-accordion-trigger"
            onClick={() => setOpenReasoning(v => !v)}
            aria-expanded={openReasoning}
          >
            <span>SCREEN REASONING</span>
            <b>{openReasoning ? '−' : '+'}</b>
          </button>
          <AnimatePresence initial={false}>
            {openReasoning && (
              <motion.div
                className="cv5-screen-accordion-body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: .35, ease: [0.16, 1, 0.3, 1] }}
              >
                {reasoning.map(([label, value]) => (
                  <div key={label}><span>{label}</span><p>{value}</p></div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="cv5-filmstrip-wrap">
        <div className="cv5-filmstrip-label"><span>PRODUCT WALKTHROUGH</span><small>Choose a screen to inspect the design decision.</small></div>
        <div className="cv5-filmstrip">
          {screens.map((item, i) => (
            <motion.button
              key={item.src}
              className={i === active ? 'active' : ''}
              onClick={() => { setActive(i); setOpenReasoning(true); }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: .985 }}
              aria-label={`Show ${item.title}`}
            >
              <img src={BASE + item.src} alt="" />
              <span>{String(i + 1).padStart(2, '0')} · {item.title}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
function ComskiCaseStudyCV5() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let ctx: gsap.Context | undefined;

    if (!reduceMotion) {
      ctx = gsap.context(() => {
        const trail = document.querySelector('.cv5-trail-fill');
        if (trail) {
          gsap.to(trail, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: '.cv5-story',
              start: 'top top',
              end: 'bottom bottom',
              scrub: .5,
            },
          });
        }

        gsap.utils.toArray<HTMLElement>('.cv5-process-step').forEach((step, index) => {
          gsap.fromTo(step,
            { opacity: .18, scale: .96 },
            {
              opacity: 1,
              scale: 1,
              scrollTrigger: {
                trigger: '.cv5-process',
                start: 'top 72%',
                end: 'bottom 34%',
                scrub: .7,
                onUpdate: self => {
                  const threshold = index / 8;
                  const local = Math.max(0, Math.min(1, (self.progress - threshold) * 8));
                  gsap.set(step, { opacity: .18 + local * .82, scale: .96 + local * .04 });
                },
              },
              duration: .4,
            }
          );
        });
      });
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      ctx?.revert();
    };
  }, []);

  return (
    <main className="cv5-page">
      <div className="cv5-progress" style={{ transform: `scaleX(${progress})` }} />

      <nav className="cv5-nav">
        <a href="/surya-portfolio/">← Portfolio</a>
        <div className="cv5-nav-center"><span>COMSKI</span><b>CASE STUDY / CV5</b></div>
        <a href="#s20">Jump to outcome ↓</a>
      </nav>

      <header className="cv5-hero">
        <div className="cv5-hero-grid">
          <motion.div
            className="cv5-hero-copy"
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={reduce ? { duration: 0 } : { duration: .35 }}
          >
            <motion.div className="cv5-kicker" initial={reduce ? false : { opacity: 0, y: 12 }} animate={reduce ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .4, delay: 0, ease: [0.16, 1, 0.3, 1] }}><span>AI</span><span>EdTech</span><span>Product Design</span></motion.div>
            <p className="cv5-overline">COMSKI · COMMUNICATION COACH</p>
            <motion.h1 initial={reduce ? false : { opacity: 0, y: 18 }} animate={reduce ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .5, delay: .1, ease: [0.16, 1, 0.3, 1] }}>Designing a communication coach that adapts to <em>who you are</em> — not just what you say.</motion.h1>
            <motion.p className="cv5-hero-lede" initial={reduce ? false : { opacity: 0, y: 16 }} animate={reduce ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .4, delay: .2, ease: [0.16, 1, 0.3, 1] }}>A case study in turning four communication skills into one continuous practice system: personalised onboarding, consistent assessment grammar, explainable AI feedback and a clear next action.</p>
            <motion.div className="cv5-meta" initial={reduce ? false : { opacity: 0 }} animate={reduce ? undefined : { opacity: 1 }} transition={{ duration: .3, delay: .3 }}>
              <div><small>ROLE</small><strong>Product Designer</strong></div>
              <div><small>OWNERSHIP</small><strong>Research · IA · UX · UI · Validation</strong></div>
              <div><small>PROJECT</small><strong>AI communication learning</strong></div>
              <div><small>TIMEFRAME</small><strong>1 month</strong></div>
            </div>
            <motion.div className="cv5-evidence-note" initial={reduce ? false : { opacity: 0, y: 10 }} animate={reduce ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .4, delay: .4, ease: [0.16, 1, 0.3, 1] }}><b>Evidence boundary</b><span>Design decisions are grounded in the project material and available product screens. Where measured research or business metrics are not preserved, I label the item as proposed rather than inventing results.</span></div>
          </motion.div>

          <motion.div className="cv5-hero-art" initial={reduce ? false : { opacity: 0, x: 35 }} animate={reduce ? undefined : { opacity: 1, x: 0 }} transition={{ duration: .6, delay: .2, ease: [0.16, 1, 0.3, 1] }}>
            <div className="cv5-hero-orbit orbit-a">PERSONALISE</div>
            <div className="cv5-hero-orbit orbit-b">PRACTISE</div>
            <div className="cv5-hero-orbit orbit-c">IMPROVE</div>
            <div className="cv5-hero-device">
              <div className="cv5-device-top"><i/><i/><i/><span>My Journey</span></div>
              <img src={BASE + 'Desktop - 1.svg'} alt="ComSki My Journey dashboard" />
            </div>
          </div>
        </div>
        <div className="cv5-hero-bottom">
          <span>THE SHORT VERSION</span>
          <strong>I did not design six screens. I designed the rules that make the six screens feel like one product.</strong>
          <a href="#s03">See the three decisions ↓</a>
        </div>
      </header>

      <div className="cv5-story">
        <svg className="cv5-trail" aria-hidden="true" viewBox="0 0 24 1000" preserveAspectRatio="none">
          <path className="cv5-trail-base" d="M12 0 V1000" />
          <path className="cv5-trail-fill" d="M12 0 V1000" pathLength="1" />
        </svg>
        <Section number="01" eyebrow="Problem / opportunity" title="The product problem was bigger than “make an AI coach.”" intro="ComSki needed to make communication practice feel repeatable, relevant and safe across two very different learner contexts. The design challenge was to create a system that could adapt without fragmenting.">
          <div className="cv5-problem-grid">
            <article><span>USER PROBLEM</span><h3>Practice feels exposed when the feedback loop feels like judgement.</h3><p>The product needs to make rehearsal feel safe enough to repeat, while still giving the learner useful evidence.</p></article>
            <article><span>BUSINESS PROBLEM</span><h3>A broad communication product can easily become a collection of disconnected tools.</h3><p>Without a coherent journey, every new skill or audience adds another surface rather than strengthening the product.</p></article>
            <article><span>OPPORTUNITY</span><h3>Use learner context to decide what practice should feel like.</h3><p>Goal, interests and confidence can shape the journey so personalisation becomes product behaviour.</p></article>
            <article><span>DESIGN CHALLENGE</span><h3>Make one system work for different moments of communication.</h3><p>The interaction grammar must stay stable while the content, stakes and feedback adapt.</p></article>
          </div>
          <div className="cv5-hmw"><span>HOW MIGHT WE</span><strong>Help people practise communication repeatedly, privately and purposefully — while making AI feedback feel like coaching rather than judgement?</strong></div>
        </Section>

        <Section number="02" eyebrow="Constraints" title="The constraint set shaped the architecture." intro="I treated the constraints as product-design inputs, not a checklist at the end.">
          <div className="cv5-constraint-grid">
            {challenges.map(([title, why, implication]) => (
              <article key={title}>
                <div className="cv5-constraint-top"><span>CHALLENGE</span><b>{title}</b></div>
                <p><strong>Why:</strong> {why}</p>
                <p><strong>Implication:</strong> {implication}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section number="03" eyebrow="The three decisions" title="Three decisions carried most of the product." intro="Instead of asking the case study to prove seniority through volume, these are the decisions I would defend in an interview.">
          <div className="cv5-decision-stack">
            {decisions.map((d, i) => (
              <Reveal key={d.n} className="cv5-decision" delay={i * .05}>
                <div className="cv5-decision-number">{d.n}</div>
                <div><h3>{d.title}</h3><p>{d.body}</p></div>
                <div className="cv5-decision-result"><span>DESIGN CONSEQUENCE</span><strong>{d.result}</strong></div>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section number="04" eyebrow="Research" title="Research became a decision filter — not a research theatre." intro="The available project material supports secondary research, competitor review and moderated prototype testing. Exact participant counts and quantitative results are not preserved in the source material, so I do not manufacture them.">
          <div className="cv5-research-layout">
            <div>
              <div className="cv5-mini-label">SECONDARY RESEARCH → UX IMPLICATION</div>
              <div className="cv5-research-list">
                {researchRows.map(([finding, evidence, implication]) => (
                  <article key={finding}>
                    <div><span>FINDING</span><h3>{finding}</h3></div>
                    <p><b>Evidence / source:</b> {evidence}</p>
                    <p><b>UX implication:</b> {implication}</p>
                  </article>
                ))}
              </div>
            </div>
            <aside className="cv5-research-boundary">
              <span>WHAT I WOULD NOT CLAIM</span>
              <h3>No invented participant counts. No invented conversion lift. No invented satisfaction score.</h3>
              <p>The stronger portfolio move is to show the evidence boundary clearly and then define the measurement plan that would close it.</p>
              <div className="cv5-proposed"><b>PROPOSED VALIDATION</b><span>Task completion · time-to-first-practice · feedback comprehension · repeat practice · journey progression</span></div>
            </aside>
          </div>
        </Section>

        <Section number="05" eyebrow="Users + JTBD" title="Two contexts. One underlying job." intro="These are context personas rather than demographic profiles: they describe the product situations the design needs to support.">
          <div className="cv5-persona-grid">
            <article className="cv5-persona"><div className="cv5-avatar">A</div><div><span>CONTEXT PERSONA</span><h3>The Avoidant Presenter</h3><p>Needs private rehearsal before a presentation, debate or high-stakes classroom moment.</p><ul><li>Needs a low-pressure entry point.</li><li>Wants a clear fix, not a vague score.</li><li>Success means returning to practise again.</li></ul></div></article>
            <article className="cv5-persona dark"><div className="cv5-avatar">P</div><div><span>CONTEXT PERSONA</span><h3>The Interview-Track Professional</h3><p>Needs realistic rehearsal mapped to a named outcome such as an interview.</p><ul><li>Values relevance over generic lessons.</li><li>Wants targeted practice against a goal.</li><li>Success means visible progression toward the outcome.</li></ul></div></article>
          </div>
          <div className="cv5-jtbd"><span>CORE JTBD</span><strong>When I have a communication moment that matters, help me rehearse the right skill in a way that feels safe, relevant and actionable — so I can perform with more confidence when it counts.</strong></div>
          <div className="cv5-needs"><div><b>FUNCTIONAL</b><span>Modality-specific practice and useful feedback.</span></div><div><b>EMOTIONAL</b><span>Judgement-free repetition.</span></div><div><b>USABILITY</b><span>One clear next action.</span></div><div><b>TRUST</b><span>Understand why the system says something.</span></div></div>
        </Section>

        <Section number="06" eyebrow="Competition" title="The opportunity sits between specialists." intro="The strategy is not to beat every specialist feature-for-feature. It is to connect the practice loop they often own separately.">
          <div className="cv5-competitive">
            <div className="cv5-competitor-head"><span>CAPABILITY</span><b>DUOLINGO</b><b>ELSA</b><b>YOODLI</b><b>ORAI</b><strong>COMSKI</strong></div>
            {[
              ['Language mechanics','●','●','—','—','●'],
              ['Pronunciation / accent','—','●','●','●','●'],
              ['Spoken delivery','—','●','●','●','●'],
              ['Four-skill journey','●','●','—','—','●'],
              ['Goal-specific practice','●','●','●','●','●'],
              ['Continuous learner context','◐','◐','◐','◐','●'],
            ].map(row => <div className="cv5-competitor-row" key={row[0]}>{row.map((cell, i) => i === 0 ? <span key={i}>{cell}</span> : <b key={i} className={i === 5 ? 'ours' : ''}>{cell}</b>)}</div>)}
          </div>
          <div className="cv5-opportunity"><span>COMPETITIVE OPPORTUNITY</span><strong>Own the connective tissue: learner context → practice → AI feedback → next action → progression across four skills.</strong></div>
        </Section>

        <Section number="07" eyebrow="Synthesis" title="From observations to a system." intro="The synthesis compresses research into rules that can survive beyond a single screen.">
          <div className="cv5-synthesis">
            {[
              ['OBSERVATIONS','Different learner contexts · modality differences · AI trust questions'],
              ['THEMES','Relevance · safety · consistency · clarity · progression'],
              ['INSIGHTS','Personalisation must change behaviour · feedback needs explanation · four skills need one grammar'],
              ['OPPORTUNITIES','Contextual journeys · guidance-first AI · reusable interaction patterns'],
              ['PRINCIPLES','Context before content · action before score · consistency before complexity'],
            ].map((item, i) => <React.Fragment key={item[0]}><article className={i === 4 ? 'final' : ''}><span>{item[0]}</span><strong>{item[1]}</strong></article>{i < 4 && <i>→</i>}</React.Fragment>)}
          </div>
        </Section>

        <Section number="08" eyebrow="Journey + architecture" title="The future state is a loop, not a funnel." intro="The architecture connects onboarding context to a repeatable practice loop.">
          <div className="cv5-journeys">
            <div className="cv5-journey-row current"><span>CURRENT-STATE HYPOTHESIS</span><div><b>Need</b><strong>Search / discover</strong><small>Generic starting point</small></div><div><b>Practice</b><strong>Pick a tool</strong><small>Modality-led entry</small></div><div><b>Feedback</b><strong>See result</strong><small>Score can dominate</small></div><div><b>Next</b><strong>Decide alone</strong><small>Weak continuity</small></div></div>
            <div className="cv5-journey-arrow">↓ redesign the loop around context</div>
            <div className="cv5-journey-row future"><span>FUTURE-STATE DESIGN</span><div><b>01 · CONTEXT</b><strong>Onboard</strong><small>Goal · confidence · interests</small></div><div><b>02 · PRACTISE</b><strong>Choose skill</strong><small>Reading · Listening · Writing · Speaking</small></div><div><b>03 · IMPROVE</b><strong>AI feedback</strong><small>Evidence → explanation → action</small></div><div><b>04 · CONTINUE</b><strong>Next best practice</strong><small>Progress carries forward</small></div></div>
          </div>
          <div className="cv5-system-map">
            <div className="map-node context">LEARNER<br/><small>goal + context</small></div>
            <div className="map-line"/>
            <div className="map-node">PERSONALISED<br/>JOURNEY</div>
            <div className="map-branch"><span>READING</span><span>LISTENING</span><span>WRITING</span><span>SPEAKING</span></div>
            <div className="map-line"/>
            <div className="map-node ai">AI FEEDBACK<br/><small>signal + explanation</small></div>
            <div className="map-line"/>
            <div className="map-node next">NEXT ACTION<br/><small>practice again</small></div>
          </div>
        </Section>

        <Section number="09" eyebrow="Exploration" title="I explored three directions before converging." intro="The rejected directions are part of the design story because they explain what the final system optimises for.">
          <div className="cv5-directions">
            <article><span>DIRECTION A</span><h3>Toolbox</h3><p>Four polished skill modules presented as independent tools.</p><em>Rejected: strong modality clarity, weak continuity and personalisation.</em></article>
            <article><span>DIRECTION B</span><h3>Coach-first</h3><p>A conversational AI coach sits above the entire product.</p><em>Rejected: expressive, but risks hiding task structure and assessment intent.</em></article>
            <article className="selected"><span>DIRECTION C · SELECTED</span><h3>Journey-first</h3><p>A personalised journey connects four skills with a consistent task grammar.</p><em>Selected: strongest balance of context, discoverability, repeat practice and scalable IA.</em></article>
          </div>
          <div className="cv5-tradeoff"><b>TRADE-OFF</b><span>A journey-first system requires more upfront information architecture. I accepted that cost because it makes every future skill, goal and content addition easier to place.</span></div>
        </Section>

        <Section number="10" eyebrow="Information architecture" title="The architecture makes the product feel like one coach." intro="The key move was separating the stable product structure from the variable learner context.">
          <div className="cv5-process">
            {process.map((step, i) => (
              <div className="cv5-process-step" key={step}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
          <div className="cv5-process-note"><b>PROCESS LOGIC</b><span>The sequence moves from evidence to structure to validation. The visual treatment stays deliberately quiet until the final stages, where decisions become implementation-ready.</span></div>
          <div className="cv5-ia">
            <div className="ia-root">COMSKI<br/><small>communication coach</small></div>
            <div className="ia-connector"/>
            <div className="ia-grid">
              <div><b>Onboarding</b><span>Context · goal · confidence · interests</span></div>
              <div><b>My Journey</b><span>Progress · recommended practice · outcomes</span></div>
              <div><b>Four Skills</b><span>Reading · Listening · Writing · Speaking</span></div>
              <div><b>AI Feedback</b><span>Evidence · explanation · next action</span></div>
            </div>
          </div>
          <div className="cv5-flow"><span>START</span><b>Context</b><i>→</i><b>Goal</b><i>→</i><b>Skill</b><i>→</i><b>Task</b><i>→</i><b>AI check</b><i>→</i><b>Next practice</b><span>LOOP</span></div>
        </Section>

        <Section number="11" eyebrow="Real product screens" title="The screens are the proof. The system is the story." intro="These are the original ComSki product screens supplied for the case study — not recreated UI. The viewer below makes the cross-screen interaction grammar visible.">
          <ScreenViewer />
          <div className="cv5-screen-reasoning">
            <article><span>ONBOARDING</span><h3>Ask for context only when it can change the experience.</h3><p>Goal and learner context become inputs to the journey.</p></article>
            <article><span>SKILLS</span><h3>Keep the mental model stable across modalities.</h3><p>Each skill can vary its task without changing the overall progression logic.</p></article>
            <article><span>PROGRESSION</span><h3>Make completion lead somewhere.</h3><p>A finished task should create the next useful action rather than a dead-end score.</p></article>
          </div>
        </Section>

        <Section number="12" eyebrow="AI UX" title="The AI is not the interface. The feedback loop is." intro="The design goal is calibrated usefulness: the learner should understand the signal, understand its limits and know what to do next.">
          <div className="cv5-ai-model">
            <div className="ai-input"><span>INPUT</span><strong>Learner response</strong><small>text · audio · interaction</small></div>
            <i>→</i>
            <div className="ai-engine"><span>AI LAYER</span><strong>Analyse</strong><small>detect signal + uncertainty</small></div>
            <i>→</i>
            <div className="ai-output"><span>OUTPUT</span><strong>Explain</strong><small>evidence + guidance</small></div>
            <i>→</i>
            <div className="ai-action"><span>ACTION</span><strong>Practise</strong><small>next best step</small></div>
          </div>
          <div className="cv5-ai-principles">
            <article><b>01</b><h3>Explain</h3><p>Translate a model signal into learner-readable reasoning.</p></article>
            <article><b>02</b><h3>Calibrate</h3><p>Do not make uncertainty look like certainty.</p></article>
            <article><b>03</b><h3>Control</h3><p>Let users understand and recover from system states.</p></article>
            <article><b>04</b><h3>Act</h3><p>Every feedback state should suggest a useful next move.</p></article>
          </div>
          <div className="cv5-before-after">
            <div><span>WEAK AI UX</span><strong>“Score: 72”</strong><small>Information without a decision.</small></div>
            <div className="arrow">→</div>
            <div><span>DESIGNED AI UX</span><strong>“Your answer was clear. Next, tighten the opening sentence.”</strong><small>Signal → explanation → action.</small></div>
          </div>
        </Section>

        <Section number="13" eyebrow="Design system" title="The design system was the scalability layer." intro="The visual system exists to keep a growing set of AI states, skill modules and content surfaces coherent.">
          <div className="cv5-system">
            <div className="cv5-token-board">
              <span>VISUAL TOKENS</span>
              <div className="cv5-swatches"><i/><i/><i/><i/><i/></div>
              <div className="cv5-hex"><b>#3B5BDB</b><b>#17264A</b><b>#EEF5FF</b><b>#F6DCE8</b><b>#F6E4C8</b></div>
              <div className="cv5-type"><b>Display</b><strong>Section heading</strong><span>Body copy for reasoning</span><small>Metadata / labels</small></div>
              <div className="cv5-spacing"><i>8</i><i>16</i><i>24</i><i>32</i><i>48</i></div>
            </div>
            <div className="cv5-system-rules">
              <div><b>01 · COMPONENTS</b><span>Reusable cards, states, controls and feedback patterns rather than one-off styling.</span></div>
              <div><b>02 · STATES</b><span>Default · hover · selected · loading · empty · error · completed.</span></div>
              <div><b>03 · RESPONSIVE</b><span>Grid collapse and interaction priority are defined before breakpoint polish.</span></div>
              <div><b>04 · ACCESSIBILITY</b><span>Semantic hierarchy, visible focus, touch targets, contrast and reduced motion.</span></div>
            </div>
          </div>
        </Section>

        <Section number="14" eyebrow="Validation" title="Validation is where the case study should stay honest." intro="The project material does not preserve a complete quantitative usability dataset. I separate observed evidence from the validation framework I would run next.">
          <div className="cv5-validation">
            <div className="cv5-validation-card"><span>AVAILABLE EVIDENCE</span><h3>Moderated prototype testing is referenced in the project material.</h3><p>The exact sample size, task timings and success rates are not retained in the available source. They should not be invented for a portfolio.</p></div>
            <div className="cv5-validation-card proposed"><span>PROPOSED STUDY</span><h3>Test the four highest-risk assumptions.</h3><ol><li>Can a new learner understand why onboarding asks each question?</li><li>Can users explain what an AI feedback state means?</li><li>Can they identify the next action without facilitator help?</li><li>Can they move between skills without losing the mental model?</li></ol></div>
          </div>
          <div className="cv5-metrics"><span>SUCCESS SIGNALS</span><b>Task completion</b><b>Time to first practice</b><b>Feedback comprehension</b><b>Next-action selection</b><b>Repeat practice</b><b>Journey progression</b></div>
        </Section>

        <Section number="15" eyebrow="Accessibility + implementation" title="Good UX survives contact with the real product." intro="The handoff model focuses on states, constraints and component behaviour — not just static pixels.">
          <div className="cv5-implementation">
            <div><span>ACCESSIBILITY</span><ul><li>Semantic heading hierarchy and landmarks.</li><li>Keyboard-visible focus and logical navigation.</li><li>Contrast-aware text and controls.</li><li>Touch targets sized for repeated interaction.</li><li>Errors explained in context with recovery.</li><li>Reduced-motion alternative for animated states.</li></ul></div>
            <div><span>TECHNICAL COLLABORATION</span><ul><li>Tokenised spacing, type and colour primitives.</li><li>Component states documented before implementation.</li><li>Loading, empty and error states treated as product states.</li><li>Responsive rules defined around content priority.</li><li>AI data states separated from presentation.</li><li>QA against behaviour, not only visual parity.</li></ul></div>
          </div>
        </Section>

        <Section number="16" eyebrow="Outcome" title="The strongest outcome is a product system that can keep growing." intro="Because measured business outcomes are not preserved in the project material, the outcome here is framed as design impact and a measurement framework — not invented ROI.">
          <div className="cv5-outcome-grid">
            <article><span>USER VALUE</span><strong>Practice becomes more relevant and repeatable.</strong><p>Context informs the journey; feedback points toward action.</p></article>
            <article><span>PRODUCT VALUE</span><strong>Four skills share one mental model.</strong><p>New skills and content can inherit the same interaction grammar.</p></article>
            <article><span>BUSINESS VALUE</span><strong>The system creates clearer activation and retention levers.</strong><p>Measure time-to-first-practice, repeat sessions, skill progression and goal completion.</p></article>
          </div>
          <div className="cv5-measurement"><span>MEASUREMENT FRAMEWORK</span><div><b>ACQUISITION</b><small>Onboarding start</small></div><div><b>ACTIVATION</b><small>First completed practice</small></div><div><b>ENGAGEMENT</b><small>Repeat practice / week</small></div><div><b>RETENTION</b><small>Return to journey</small></div><div><b>OUTCOME</b><small>Goal completion</small></div></div>
        </Section>

        <Section number="17" eyebrow="Learnings" title="What changed in how I design AI products." intro="These are the principles I would carry into the next product.">
          <div className="cv5-learnings">
            {[
              ['01','AI quality is not enough.','The interface has to translate intelligence into a decision the user can make.'],
              ['02','Personalisation must earn its cost.','Every question should change content, sequencing, tone or recommendation.'],
              ['03','Consistency beats novelty.','A stable interaction grammar reduces cognitive load across modalities.'],
              ['04','Evidence boundaries build trust.','A case study is stronger when it says what is known, unknown and proposed.'],
              ['05','Systems create leverage.','Tokens and component rules make new product surfaces cheaper to design well.'],
              ['06','Senior design is visible in trade-offs.','The strongest story is not how many screens I made; it is what I chose not to make.'],
            ].map(([n,t,b]) => <article key={n}><b>{n}</b><h3>{t}</h3><p>{b}</p></article>)}
          </div>
        </Section>

        <Section number="18" eyebrow="Next" title="What I would do next." intro="The next phase would move the case study from a strong design system to measurable product evidence.">
          <div className="cv5-next">
            <article><b>01</b><h3>Instrument the journey</h3><p>Track onboarding completion, first practice, skill progression and repeat sessions.</p></article>
            <article><b>02</b><h3>Validate AI comprehension</h3><p>Test whether users can correctly interpret feedback and choose the intended next action.</p></article>
            <article><b>03</b><h3>Close the personalisation loop</h3><p>Compare goal-specific recommendations against generic practice to test whether context changes behaviour.</p></article>
            <article><b>04</b><h3>Expand the content system</h3><p>Use the same grammar to add new goals and scenarios without creating new product paradigms.</p></article>
          </div>
        </Section>

        <Section number="19" eyebrow="My role" title="What I actually owned." intro="I worked across the product-design loop rather than only producing the final UI.">
          <div className="cv5-role">
            <div><span>DISCOVERY</span><strong>Problem framing · research synthesis · competitive analysis · JTBD</strong></div>
            <div><span>PRODUCT STRUCTURE</span><strong>IA · user flows · onboarding strategy · skill architecture</strong></div>
            <div><span>DESIGN</span><strong>Interaction model · visual system · component logic · responsive behaviour</strong></div>
            <div><span>AI UX</span><strong>Feedback hierarchy · transparency · uncertainty · user control · recovery</strong></div>
            <div><span>DELIVERY</span><strong>Prototype validation · handoff logic · accessibility considerations · measurement plan</strong></div>
          </div>
        </Section>

        <Section number="20" eyebrow="Interview lens" title="The one-minute story I would tell a hiring manager.">
          <div className="cv5-interview">
            <p>“ComSki looked like a communication-learning product, but the real design problem was continuity. I focused the system around learner context, then used one interaction grammar across Reading, Listening, Writing and Speaking. The biggest AI UX decision was to move from score-first feedback to guidance-first feedback: show the signal, explain it and give the learner a next action. I deliberately keep the evidence boundary honest — where measured outcomes are unavailable, I show the measurement framework I would use rather than inventing numbers. The result is a scalable product model, not just a collection of polished screens.”</p>
            <div className="cv5-interview-bottom"><span>CASE STUDY COMPLETE</span><a href="/surya-portfolio/">Back to portfolio →</a></div>
          </div>
        </Section>
      </div>

      <footer className="cv5-footer">
        <div><span>COMSKI / CV5</span><h2>Design the system.<br/><em>Then prove it.</em></h2><p>Surya Kiran · Product Designer</p><a href="/surya-portfolio/">View the full portfolio →</a></div>
      </footer>
    </main>
  );
}

export default ComskiCaseStudyCV5;
