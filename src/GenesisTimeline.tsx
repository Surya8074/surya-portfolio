import React, { useEffect, useState } from 'react';
import './genesis-timeline.css';

const items = [
  ['overview', 'Overview'],
  ['problem', 'The problem'],
  ['question', 'Design question'],
  ['workflow', 'Core idea'],
  ['step-01', 'Project details'],
  ['step-02', 'Input artifacts'],
  ['step-03', 'Test data'],
  ['step-04', 'AI configuration'],
  ['step-05', 'Review & validate'],
  ['insight', 'After setup'],
  ['states', 'Trust & states'],
  ['principles', 'Design principles'],
] as const;

export default function GenesisTimeline({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState('overview');

  useEffect(() => {
    const map: Record<string, string> = {
      overview: '.genesis-snapshot',
      problem: '.problem-section',
      question: '.question-section',
      workflow: '.workflow-section',
      'step-01': '.chapter-section:nth-of-type(1)',
      'step-02': '.chapter-section:nth-of-type(2)',
      'step-03': '.chapter-section:nth-of-type(3)',
      'step-04': '.chapter-section:nth-of-type(4)',
      'step-05': '.chapter-section:nth-of-type(5)',
      insight: '.insight-section',
      states: '.states-section',
      principles: '.decisions-section',
    };

    const root = document.querySelector('.genesis-case-study');
    if (!root) return;

    const targets = Object.entries(map).map(([id, selector]) => {
      const element = root.querySelector(selector) as HTMLElement | null;
      if (element) element.id = `genesis-${id}`;
      return [id, element] as const;
    }).filter(([, element]) => element);

    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) {
        const id = visible[0].target.id.replace('genesis-', '');
        setActive(id);
      }
    }, { rootMargin: '-18% 0px -62% 0px', threshold: [0.05, 0.2, 0.5] });

    targets.forEach(([, element]) => observer.observe(element!));
    return () => observer.disconnect();
  }, []);

  const jump = (id: string) => {
    document.getElementById(`genesis-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActive(id);
  };

  return (
    <div className="genesis-timeline-shell">
      <aside className="genesis-timeline" aria-label="Case study sections">
        <div className="genesis-timeline-title">CASE STUDY</div>
        <nav>
          {items.map(([id, label], index) => (
            <button key={id} className={active === id ? 'is-active' : ''} onClick={() => jump(id)} aria-current={active === id ? 'location' : undefined}>
              <span className="timeline-dot"><i /></span>
              <span className="timeline-label"><b>{String(index + 1).padStart(2, '0')}</b>{label}</span>
            </button>
          ))}
        </nav>
      </aside>
      <div className="genesis-timeline-content">{children}</div>
    </div>
  );
}
