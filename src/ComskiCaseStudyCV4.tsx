import React, { useEffect, useState } from 'react';

const BASE = '/surya-portfolio/comski/';

type ScreenProps = {
  src: string;
  alt: string;
  label: string;
  className?: string;
};

function Screen({ src, alt, label, className = '' }: ScreenProps) {
  return (
    <figure className={`cv4-screen ${className}`}>
      <div className="cv4-screen-window">
        <div className="cv4-screen-bar"><span></span><span></span><span></span><b>{label}</b></div>
        <img src={BASE + src} alt={alt} loading="lazy" />
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="cv4-step" id={`cv4-${n}`}>
      <div className="cv4-step-no">{n}</div>
      <div className="cv4-step-body">
        <div className="cv4-section-kicker">{title}</div>
        {children}
      </div>
    </section>
  );
}

function Chip({ children, tone = '' }: { children: React.ReactNode; tone?: string }) {
  return <span className={`cv4-chip ${tone}`}>{children}</span>;
}

export default function ComskiCaseStudyCV4() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <main className="cv4-page">
      <div className="cv4-progress"><span style={{ transform: `scaleX(${progress})` }} /></div>

      <nav className="cv4-nav">
        <a href="/surya-portfolio/" className="cv4-brand">
          <strong>Surya Kiran</strong>
          <span>Product Designer</span>
        </a>
        <div className="cv4-nav-links">
          <a href="/surya-portfolio/">Work</a>
          <a href="/surya-portfolio/#about">About</a>
          <a href="/surya-portfolio/#contact">Contact</a>
        </div>
        <a className="cv4-connect" href="mailto:hello@surya.design">Let's Connect</a>
      </nav>

      <header className="cv4-hero">
        <div className="cv4-hero-glow glow-a"></div>
        <div className="cv4-hero-glow glow-b"></div>
        <div className="cv4-hero-line"></div>

        <div className="cv4-hero-copy">
          <div className="cv4-hero-index"><span>01</span><b>Case Study — ComSki</b></div>
          <h1>Breaking the<br />Presentation-Freeze<br />Loop — Designing <em>ComSki.</em></h1>
          <p className="cv4-hero-lede">A solo, one-month end-to-end AI communication coach for two very different learners — one shared system, not two products.</p>
          <div className="cv4-meta">
            <div><small>ROLE</small><b>Product Designer</b></div>
            <div><small>TOOLS</small><b>Figma</b></div>
            <div><small>TEAM</small><b>Solo</b></div>
            <div><small>TIMELINE</small><b>1 Month</b></div>
          </div>
        </div>

        <div className="cv4-hero-device">
          <div className="cv4-laptop">
            <div className="cv4-laptop-screen">
              <img src={BASE + 'Desktop - 1.svg'} alt="ComSki product dashboard" />
            </div>
            <div className="cv4-laptop-base"></div>
          </div>
          <div className="cv4-callout callout-one">My Journey<br /><small>dashboard</small></div>
          <div className="cv4-callout callout-two">AI coach<br /><small>personalised practice</small></div>
        </div>
      </header>

      <div className="cv4-story">
        <Step n="02" title="Problem statement">
          <h2>Students freeze during presentations and debates, <em>then avoid reviewing their own recordings.</em></h2>
          <p>Feedback can become inconsistent — either over-praised or over-corrected — leaving learners without a clear middle ground for improving delivery and confidence.</p>
          <div className="cv4-quote-card">
            <div className="cv4-thought thought-a">What will<br />they think?</div>
            <div className="cv4-person">◡</div>
            <div className="cv4-thought thought-b">I keep<br />freezing...</div>
          </div>
        </Step>

        <Step n="03" title="Goal">
          <div className="cv4-goal">
            <div className="cv4-target">◎</div>
            <div>
              <h3>Build confidence through consistent, judgement-free practice.</h3>
              <p>Give both student and professional learners a structured path to practise communication without splitting the core system into separate products.</p>
            </div>
          </div>
        </Step>

        <Step n="04" title="Challenges">
          <div className="cv4-chips">
            <Chip tone="dark">Solo Product Designer</Chip>
            <Chip>One Month</Chip>
            <Chip tone="pink">No Engineering Team</Chip>
            <Chip tone="cream">No Existing Design System</Chip>
            <Chip tone="blue">Two Audiences, Almost Nothing in Common</Chip>
          </div>
        </Step>

        <Step n="05" title="Research">
          <div className="cv4-research-grid">
            <article><span className="cv4-icon">◌</span><h3>User Research</h3><p>Direct observation of practice sessions and the behaviours that surround communication anxiety.</p></article>
            <article className="pink"><span className="cv4-icon">◇</span><h3>Competitive Research</h3><p>Compared communication-learning patterns and how products frame practice, assessment and progress.</p></article>
            <article className="blue"><span className="cv4-icon">▤</span><h3>Usability Testing</h3><p>Moderated sessions using the Figma prototype to examine whether the journey and task model were understandable.</p></article>
          </div>
          <p className="cv4-note">Research details are kept qualitative here; no participant counts or unsupported percentages are presented.</p>
        </Step>

        <Step n="06" title="User persona">
          <div className="cv4-personas">
            <article>
              <div className="cv4-avatar avatar-student">●</div>
              <div>
                <h3>The Avoidant Presenter</h3>
                <ul><li>School / college student</li><li>Freezes in class and avoids presentations</li><li>Unlikely to rewatch recordings</li></ul>
                <blockquote>“I know what to say, but I just freeze when it’s my turn.”</blockquote>
              </div>
            </article>
            <article>
              <div className="cv4-avatar avatar-pro">●</div>
              <div>
                <h3>The Interview-Track Professional</h3>
                <ul><li>Job-seeker on a Google-style interview journey</li><li>Needs structured delivery feedback</li><li>Wants to sound clear, confident and natural</li></ul>
                <blockquote>“I know the content, but I need to deliver it better.”</blockquote>
              </div>
            </article>
          </div>
        </Step>

        <Step n="07" title="Design process">
          <div className="cv4-process">
            <div><b>Context</b><span>Understand the learner</span></div><i>→</i>
            <div className="pink-box"><b>Assessment</b><span>Make the skill visible</span></div><i>→</i>
            <div className="orange-box"><b>Practice</b><span>Turn insight into action</span></div><i>→</i>
            <div className="blue-box"><b>Progression</b><span>Keep the journey moving</span></div>
          </div>

          <div className="cv4-decision-table">
            <div><b>Decision</b><b>Why</b></div>
            <div><span>Context-first onboarding vs. generic setup</span><span>Personalises the experience for both audiences from the start.</span></div>
            <div><span>Shared assessment grammar vs. four separate patterns</span><span>Keeps the system consistent and easier to scale.</span></div>
            <div><span>Directional completion vs. neutral finish</span><span>Encourages continuous practice instead of one-time usage.</span></div>
            <div><span>One shared system vs. two products</span><span>Supports two audiences without duplicating the core experience.</span></div>
          </div>
        </Step>

        <Step n="08" title="Features & screens">
          <div className="cv4-screen-strip">
            <Screen src="Onboarding Intro.svg" alt="ComSki onboarding introduction" label="Onboarding Intro" />
            <Screen src="Onboarding 1st Question.svg" alt="ComSki onboarding question" label="Pick your Vibe" />
            <Screen src="Reading.svg" alt="ComSki reading experience" label="Reading" />
            <Screen src="Writing 1.svg" alt="ComSki writing experience" label="Writing" />
            <Screen src="Listening 1.svg" alt="ComSki listening experience" label="Listening" />
            <Screen src="Speaking 1.svg" alt="ComSki speaking experience" label="Speaking" />
          </div>
          <div className="cv4-skill-labels">
            <span>Reading</span><span>Writing</span><span>Listening</span><span>Speaking</span>
          </div>
        </Step>

        <Step n="09" title="Design outcomes">
          <div className="cv4-outcomes">
            <article><b>01</b><h3>One shared journey</h3><p>Student and professional experiences can enter through different context while still belonging to one product model.</p></article>
            <article><b>02</b><h3>Clearer skill handoffs</h3><p>Reading, Writing, Listening and Speaking become connected stages rather than isolated exercises.</p></article>
            <article><b>03</b><h3>More intentional progression</h3><p>Completion and next-step states are treated as part of the learning experience, not an afterthought.</p></article>
          </div>
        </Step>

        <Step n="10" title="Learnings">
          <div className="cv4-learning">
            <div><span>WHAT I’D DO DIFFERENTLY</span><h3>Validate both user contexts earlier, with a larger sample and more iteration around the assessment model.</h3></div>
            <div><span>WHAT’S NEXT</span><h3>Continue iterative validation, refine the skill model, and connect progress signals to a longer-term learning loop.</h3></div>
            <div className="cv4-flag">↗</div>
          </div>
        </Step>
      </div>

      <footer className="cv4-footer">
        <span>COMSKI · CASE STUDY / CV4</span>
        <h2>One product.<br /><em>Two learners.</em><br />One continuous journey.</h2>
        <a href="/surya-portfolio/">Back to portfolio ↗</a>
      </footer>
    </main>
  );
}