import React, { useEffect, useState } from 'react';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BookOpen, Check, Clock3,
  Compass, Headphones, Mic2, PenLine, Route, Sparkles, Target, UserRound
} from 'lucide-react';

const ASSET_BASE = '/surya-portfolio/comski/';
const asset = (name: string) => ASSET_BASE + encodeURIComponent(name);

function SectionLabel({ num, label }: { num: string; label: string }) {
  return <div className="cs-label"><span>{num}</span><b>{label}</b></div>;
}

function Screen({
  file, alt, className = '', caption, eager = false
}: {
  file: string; alt: string; className?: string; caption?: string; eager?: boolean
}) {
  return (
    <figure className={`cs-screen ${className}`}>
      <div className="cs-screen-frame">
        <img
          src={asset(file)}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={eager ? 'high' : 'auto'}
        />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`cs-reveal ${className}`}>{children}</div>;
}

export default function ComskiCaseStudy() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.cs-reveal');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach(node => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="comski-case" id="top">
      <div className="cs-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>

      <nav className="cs-nav" aria-label="Case study navigation">
        <a className="cs-brand" href="/surya-portfolio/" aria-label="Surya Kiran portfolio">
          <span className="cs-brand-mark">s.</span>
          <span><b>Surya Kiran</b><small>Product design portfolio</small></span>
        </a>
        <a className="cs-back" href="/surya-portfolio/"><span>Back to portfolio</span><ArrowUpRight size={15} /></a>
      </nav>

      <header className="cs-hero">
        <div className="cs-hero-wash" aria-hidden="true" />
        <div className="cs-hero-inner">
          <div className="cs-eyebrow-row">
            <span><i /> CASE STUDY / 02</span>
            <span>AI · COMMUNICATION · PRODUCT DESIGN</span>
          </div>
          <div className="cs-hero-grid">
            <div className="cs-hero-copy">
              <p className="cs-overline">COMSKI — PERSONAL COMMUNICATION BUDDY</p>
              <h1>Communication<br />starts with <em>the person.</em></h1>
              <p className="cs-hero-deck">A communication coach that brings personal context and four distinct skill assessments into one connected experience.</p>
              <a className="cs-text-link" href="#s01">Explore the case study <ArrowDownRight size={17} /></a>
            </div>
            <div className="cs-hero-art" aria-label="Original ComSki product screens">
              <div className="cs-art-index">THE LEARNER JOURNEY <span>01 — 04</span></div>
              <Screen file="My Journey.svg" alt="Original ComSki My Journey screen" className="cs-hero-main-screen" caption="MY JOURNEY" eager />
              <Screen file="Onboarding Intro.svg" alt="Original ComSki onboarding introduction screen" className="cs-hero-float-screen" caption="START WITH CONTEXT" eager />
              <span className="cs-hero-stamp"><Sparkles size={14} /> Built around the learner</span>
            </div>
          </div>
          <div className="cs-meta-row">
            <div><small>ROLE</small><b>Product Designer</b></div>
            <div><small>PRODUCT</small><b>AI communication coach</b></div>
            <div><small>DESIGN FOCUS</small><b>Onboarding · assessment · progression</b></div>
            <div><small>TOOLS</small><b>Figma · interaction design</b></div>
          </div>
        </div>
      </header>

      <section className="cs-opening" id="s01">
        <div className="cs-opening-index">01 <span>THE PRODUCT PREMISE</span></div>
        <Reveal className="cs-opening-content">
          <h2>Not another lesson library.<br /><em>A more personal starting point.</em></h2>
          <div className="cs-opening-copy">
            <p>ComSki introduces itself as a “personal communication buddy”. Instead of opening on a lesson or score, the experience begins by asking about the learner.</p>
            <p>From there, the product moves into Reading, Listening, Writing and Speaking assessments. The design question is how to connect those different tasks without losing the sense that one learner is moving through one experience.</p>
          </div>
        </Reveal>
      </section>

      <section className="cs-context-section">
        <div className="cs-section-shell cs-context-grid">
          <div className="cs-context-heading">
            <SectionLabel num="01" label="PRODUCT AT A GLANCE" />
            <h2>Personal context<br />before <em>practice.</em></h2>
            <p>The strongest story in the available screens is the relationship between onboarding, skill assessment and the learner's next step.</p>
          </div>
          <div className="cs-context-list">
            <div><span>01</span><div><b>Start with the learner</b><p>Onboarding collects context around goals, time, confidence and interests.</p></div></div>
            <div><span>02</span><div><b>Move into four skills</b><p>Reading, Listening, Writing and Speaking use different task formats.</p></div></div>
            <div><span>03</span><div><b>Make progress visible</b><p>My Journey and the assessment handoffs provide a broader frame for the individual tasks.</p></div></div>
          </div>
        </div>
      </section>

      <div className="cs-reading-layout">
        <aside className="cs-chapters" aria-label="Case study sections">
          <a href="#s02"><span>02</span> Evidence</a>
          <a href="#s03"><span>03</span> Personalisation</a>
          <a href="#s04"><span>04</span> Assessment design</a>
          <a href="#s05"><span>05</span> Progression</a>
          <a href="#s06"><span>06</span> Outcome</a>
        </aside>

        <div className="cs-story">
          <section id="s02" className="cs-section cs-evidence">
            <SectionLabel num="02" label="EVIDENCE & CONSTRAINTS" />
            <div className="cs-section-heading">
              <h2>Start with what the<br /><em>work can prove.</em></h2>
              <p>The available project material includes original interface exports across onboarding, four skill areas and My Journey. These screens make it possible to examine the product structure and interaction states directly.</p>
            </div>
            <Reveal className="cs-evidence-spread">
              <Screen file="sticky-notes 1.svg" alt="ComSki sticky-note working artifact" className="cs-sticky-screen" caption="WORKING ARTIFACT · CONTEXT TO VERIFY" />
              <div className="cs-evidence-note">
                <span className="cs-note-mark">/</span>
                <h3>Artifact-led, not research theatre.</h3>
                <p>The repository does not currently establish a formal research methodology or measured usability outcomes. This case study therefore separates what is visible in the designs from hypotheses that still need validation.</p>
                <p className="cs-small-note">No interview counts, user quotes or performance metrics are claimed here.</p>
              </div>
            </Reveal>
          </section>

          <section id="s03" className="cs-section cs-decision">
            <SectionLabel num="03" label="DESIGN DECISION 01" />
            <div className="cs-decision-heading">
              <div><span className="cs-decision-index">01 / ONBOARDING</span><h2>Personalisation<br />before <em>practice.</em></h2></div>
              <p>The onboarding flow collects several kinds of context before the learner enters the assessment experience.</p>
            </div>
            <div className="cs-onboarding-feature">
              <Screen file="Onboarding Intro.svg" alt="ComSki onboarding introduction" className="cs-onboarding-intro" caption="INTRODUCTION" />
              <div className="cs-onboarding-copy">
                <p className="cs-quote">“Pick the vibe that feels most like you today.”</p>
                <p>The onboarding screens move through vibe, communication goals, discovery source, available time, confidence and interests. The sequence frames the experience around the person entering ComSki, rather than beginning with a skill score.</p>
                <div className="cs-signal-list">
                  <span><UserRound size={15} /> Personal tone</span>
                  <span><Target size={15} /> Communication goals</span>
                  <span><Clock3 size={15} /> Available time</span>
                  <span><Compass size={15} /> Interests and context</span>
                </div>
              </div>
            </div>
            <div className="cs-onboarding-sequence">
              <Screen file="Onboarding 1st Question.svg" alt="ComSki first onboarding question, default state" caption="01 / DEFAULT STATE" />
              <Screen file="Onboarding 3rd question.svg" alt="ComSki onboarding question with selectable options" caption="02 / CHOICE DESIGN" />
              <Screen file="Onboarding 3rd question-1.svg" alt="ComSki onboarding question variant" caption="03 / VARIANT" />
            </div>
            <p className="cs-annotation">Design question to confirm: how do the answers influence the learner's next experience, and what trade-offs shaped the length of onboarding?</p>
          </section>

          <section id="s04" className="cs-section cs-decision cs-decision-alt">
            <SectionLabel num="04" label="DESIGN DECISION 02" />
            <div className="cs-decision-heading">
              <div><span className="cs-decision-index">02 / TASK DESIGN</span><h2>Different tasks.<br /><em>Distinct interactions.</em></h2></div>
              <p>Each skill asks the learner to work with a different input and response format. The interface should make the task clear without forcing every activity into the same layout.</p>
            </div>
            <div className="cs-skill-feature">
              <div className="cs-skill-feature-copy">
                <span className="cs-feature-label">FOUR COMMUNICATION MODES</span>
                <h3>One recognisable system, four task formats.</h3>
                <p>Reading centers on a passage, Listening on an audio clip, Writing on a prompt and response field, and Speaking on a spoken response to a topic. The content changes with the task while the wider assessment journey remains recognisable.</p>
              </div>
              <div className="cs-skill-showcase">
                <Screen file="Reading 1.svg" alt="ComSki Reading assessment screen" caption="READING" />
                <Screen file="Listening 1.svg" alt="ComSki Listening assessment screen" caption="LISTENING" />
                <Screen file="Writing 1.svg" alt="ComSki Writing assessment screen" caption="WRITING" />
                <Screen file="Speaking 1.svg" alt="ComSki Speaking assessment screen" caption="SPEAKING" />
              </div>
            </div>
            <div className="cs-task-rows">
              <div><span>READING</span><p>Read a passage aloud, then respond to comprehension questions.</p><BookOpen size={18} /></div>
              <div><span>LISTENING</span><p>Listen to an audio clip, then answer a question about what was heard.</p><Headphones size={18} /></div>
              <div><span>WRITING</span><p>Respond in the learner's own words to a short prompt or situation.</p><PenLine size={18} /></div>
              <div><span>SPEAKING</span><p>Respond to a topic with a natural voice rather than aiming for perfection.</p><Mic2 size={18} /></div>
            </div>
            <p className="cs-annotation">Design question to confirm: which interaction patterns were intentionally shared across skills, and which differences were required by the task itself?</p>
          </section>

          <section id="s05" className="cs-section cs-decision">
            <SectionLabel num="05" label="DESIGN DECISION 03" />
            <div className="cs-decision-heading">
              <div><span className="cs-decision-index">03 / PROGRESSION</span><h2>Make the next step<br /><em>visible.</em></h2></div>
              <p>Progression is expressed through the relationship between skill assessments and the My Journey screen, rather than through isolated completion moments alone.</p>
            </div>
            <Reveal className="cs-journey-feature">
              <Screen file="My Journey.svg" alt="ComSki My Journey screen" className="cs-journey-screen" caption="MY JOURNEY · ORIGINAL SCREEN" />
              <div className="cs-journey-copy">
                <span className="cs-feature-label">FROM INDIVIDUAL TASKS TO A WIDER JOURNEY</span>
                <h3>Help the learner understand where they are.</h3>
                <p>The My Journey asset gives this section a real product anchor. It should be used to explain the progress model visible in the screen itself, without assuming functionality beyond what the interface shows.</p>
                <div className="cs-journey-sequence">
                  <div><b>01</b><span>Enter a skill</span></div><ArrowRight size={15} /><div><b>02</b><span>Complete the task</span></div><ArrowRight size={15} /><div><b>03</b><span>See the next step</span></div>
                </div>
              </div>
            </Reveal>
            <div className="cs-completion-spread">
              <Screen file="Reading 4.svg" alt="ComSki Reading assessment later state" caption="ASSESSMENT STATE" />
              <Screen file="Listening 4.svg" alt="ComSki Listening assessment later state" caption="ASSESSMENT STATE" />
              <Screen file="Writing 4.svg" alt="ComSki Writing assessment later state" caption="ASSESSMENT STATE" />
            </div>
            <p className="cs-annotation">The exact completion, retry and next-skill labels must be verified against these screens before they are described as implemented behavior.</p>
          </section>

          <section id="s06" className="cs-section cs-outcome">
            <SectionLabel num="06" label="OUTCOME & REFLECTION" />
            <div className="cs-outcome-grid">
              <div><span>DELIVERABLE</span><h3>A connected product narrative</h3><p>The available designs bring onboarding and four communication skill areas into one documented experience.</p></div>
              <div><span>DESIGN SYSTEM</span><h3>Different tasks, shared context</h3><p>The case study makes the relationship between learner context, task-specific interactions and progression visible.</p></div>
              <div><span>NEXT VALIDATION</span><h3>Test comprehension and continuity</h3><p>Next, validate whether learners understand the onboarding choices, complete each task, and know what to do after an assessment.</p></div>
            </div>
            <div className="cs-reflection">
              <span>REFLECTION</span>
              <p>The central design challenge is not simply creating four assessment screens. It is making the transitions between them feel understandable — from who the learner is, to what they practise, to how they find their next step.</p>
            </div>
          </section>
        </div>
      </div>

      <footer className="cs-footer">
        <div className="cs-footer-inner">
          <span>COMSKI / CASE STUDY</span>
          <h2>Designing from<br /><em>personal context to practice.</em></h2>
          <p>Four communication skills. One connected learner journey.</p>
          <a href="/surya-portfolio/">Back to portfolio <ArrowRight size={16} /></a>
        </div>
      </footer>
    </main>
  );
}
