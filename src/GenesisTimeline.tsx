import React, { useEffect, useState } from 'react';
import './genesis-timeline.css';

const items = [
  ['overview', '00:00'],
  ['problem', '00:15'],
  ['question', '00:30'],
  ['workflow', '00:45'],
  ['step-01', '01:00'],
  ['step-02', '01:15'],
  ['step-03', '01:30'],
  ['step-04', '01:45'],
  ['step-05', '02:00'],
  ['insight', '02:15'],
  ['states', '02:30'],
  ['principles', '02:45'],
] as const;

export default function GenesisTimeline({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState('overview');

  useEffect(() => {
    const root = document.querySelector('.genesis-case-study');
    if (!root) return;
    const selectors: Record<string, string> = {
      overview: '.genesis-snapshot', problem: '.problem-section', question: '.question-section', workflow: '.workflow-section',
      insight: '.insight-section', states: '.states-section', principles: '.decisions-section',
    };
    const targets: [string, HTMLElement][] = [];
    Object.entries(selectors).forEach(([id, selector]) => {
      const element = root.querySelector(selector) as HTMLElement | null;
      if (element) { element.id = `genesis-${id}`; targets.push([id, element]); }
    });
    const chapters = Array.from(root.querySelectorAll('.chapter-section')) as HTMLElement[];
    chapters.slice(0, 5).forEach((element, index) => {
      const id = `step-0${index + 1}`;
      element.id = `genesis-${id}`;
      targets.push([id, element]);
    });
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id.replace('genesis-', ''));
    }, { rootMargin: '-18% 0px -62% 0px', threshold: [0.05, 0.2, 0.5] });
    targets.forEach(([, element]) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const jump = (id: string) => {
    document.getElementById(`genesis-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActive(id);
  };

  return (
    <div className="genesis-timeline-shell">
      <aside className="genesis-timeline" aria-label="Case study timeline">
        <nav>
          {items.map(([id, timestamp]) => (
            <button key={id} className={active === id ? 'is-active' : ''} onClick={() => jump(id)} aria-label={`Jump to ${id}`} aria-current={active === id ? 'location' : undefined}>
              <span className="timeline-time">{timestamp}</span>
              <span className="timeline-dot"><i /></span>
            </button>
          ))}
        </nav>
      </aside>
      <div className="genesis-timeline-content">{children}</div>
    </div>
  );
}
