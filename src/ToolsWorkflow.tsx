import React, { useMemo, useState } from 'react';
import { ShaderFloodLayer } from './ShaderFlood';
import {
  BrainCircuit,
  Clapperboard,
  Code2,
  Compass,
  Layers3,
  PenTool,
  ArrowRight,
} from 'lucide-react';
import './tools-workflow.css';
import './tools-workflow-scroll.css';
import './tools-workflow-scroll.js';

type ToolGroup = {
  number: string;
  title: string;
  description: string;
  tools: { name: string; logo: string; fallback: string }[];
  icon: React.ReactNode;
};

const groups: ToolGroup[] = [
  {
    number: '01',
    title: 'Product Design & Prototyping',
    description: 'Interface design, design systems, interaction design, wireframing, and high-fidelity prototyping.',
    tools: [{ name: 'Figma', logo: 'figma', fallback: 'F' }, { name: 'FigJam', logo: 'figma', fallback: 'Fj' }, { name: 'Framer', logo: 'framer', fallback: 'Fr' }, { name: 'Spline', logo: 'spline', fallback: 'S' }],
    icon: <PenTool aria-hidden="true" />,
  },
  {
    number: '02',
    title: 'AI-Assisted Design & Research',
    description: 'Research synthesis, concept exploration, UX writing, product specifications, and design iteration.',
    tools: [{ name: 'Claude', logo: 'anthropic', fallback: 'Cl' }, { name: 'ChatGPT', logo: 'openai', fallback: 'AI' }, { name: 'Perplexity', logo: 'perplexity', fallback: 'P' }],
    icon: <BrainCircuit aria-hidden="true" />,
  },
  {
    number: '03',
    title: 'Research & Product Strategy',
    description: 'User journeys, problem framing, competitor analysis, product discovery, documentation, and delivery planning.',
    tools: [{ name: 'Miro', logo: 'miro', fallback: 'M' }, { name: 'Notion', logo: 'notion', fallback: 'N' }, { name: 'Jira', logo: 'jira', fallback: 'J' }],
    icon: <Compass aria-hidden="true" />,
  },
  {
    number: '04',
    title: 'Frontend & Design Engineering',
    description: 'Interactive prototypes, responsive interfaces, design implementation, and browser-based validation.',
    tools: [{ name: 'React', logo: 'react', fallback: 'R' }, { name: 'HTML', logo: 'html5', fallback: 'H' }, { name: 'CSS', logo: 'css3', fallback: 'C' }, { name: 'JavaScript', logo: 'javascript', fallback: 'JS' }, { name: 'Vite', logo: 'vite', fallback: 'V' }],
    icon: <Code2 aria-hidden="true" />,
  },
  {
    number: '05',
    title: 'AI-Powered Development',
    description: 'AI-assisted coding, rapid prototyping, experimentation, and iterative product development.',
    tools: [{ name: 'Google Antigravity', logo: 'google', fallback: 'G' }, { name: 'Claude Code', logo: 'anthropic', fallback: 'CC' }, { name: 'Cursor', logo: 'cursor', fallback: 'Cu' }],
    icon: <Layers3 aria-hidden="true" />,
  },
  {
    number: '06',
    title: 'Motion & Visual Storytelling',
    description: 'Product walkthroughs, motion graphics, interaction demonstrations, and visual communication.',
    tools: [{ name: 'Premiere Pro', logo: 'adobepremierepro', fallback: 'Pr' }, { name: 'DaVinci Resolve', logo: 'blackmagicdesign', fallback: 'D' }, { name: 'Blender', logo: 'blender', fallback: 'B' }, { name: 'Canva', logo: 'canva', fallback: 'Ca' }],
    icon: <Clapperboard aria-hidden="true" />,
  },
];

const stages = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understand users, explore problems, and synthesize research.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Map workflows, explore concepts, and prototype in Figma.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Turn selected concepts into working experiences with React and AI-assisted development.',
  },
  {
    number: '04',
    title: 'Validate & deliver',
    description: 'Test interactions, refine usability, document specifications, and collaborate on implementation.',
  },
];

const floodPalettes: [string, string, string][] = [
  ['#0756b8','#3b9df5','#b9e5ff'],
  ['#4c168c','#a855f7','#f0abfc'],
  ['#087c75','#35c9b5','#c2fff0'],
  ['#0d4d87','#268bd2','#b9e4ff'],
  ['#1744a0','#537cf5','#c9d5ff'],
  ['#a33b19','#f28b45','#ffe0a8'],
];

function ToolGroupItem({ group }: { group: ToolGroup }) {
  const [active, setActive] = useState(false);
  const colors = useMemo(() => floodPalettes[Number(group.number) - 1] ?? floodPalettes[0], [group.number]);
  return (
    <article className="tw-group" onPointerEnter={() => setActive(true)} onPointerLeave={() => setActive(false)} onFocus={() => setActive(true)} onBlur={() => setActive(false)}>
      <ShaderFloodLayer active={active} colors={colors} />
      <div className="tw-group-top">
        <span className="tw-group-icon">{group.icon}</span>
        <span className="tw-group-number">{group.number}</span>
      </div>
      <h3>{group.title}</h3>
      <p className="tw-group-description">{group.description}</p>
      <ul className="tw-tool-list" aria-label={`${group.title} tools`}>
        {group.tools.map((tool) => (
          <li key={tool.name} className="tw-tool">
            <span className="tw-tool-logo" aria-hidden="true">
              <img
                src={`https://cdn.simpleicons.org/${tool.logo}`}
                alt=""
                loading="lazy"
                onError={(event) => { event.currentTarget.style.display = 'none'; }}
              />
              <span className="tw-tool-fallback">{tool.fallback}</span>
            </span>
            <span className="tw-tool-name">{tool.name}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function ToolsWorkflow() {
  return (
    <section className="tools-workflow" id="tools-workflow" aria-labelledby="tools-workflow-title">
      <div className="tw-inner">
        <header className="tw-heading">
          <p className="tw-eyebrow">TOOLS &amp; WORKFLOW</p>
          <h2 id="tools-workflow-title">The tools behind my process</h2>
          <p className="tw-intro">
            My toolkit brings together product thinking, AI-assisted exploration, interface design, and hands-on development to turn complex ideas into useful digital experiences.
          </p>
        </header>

        <div className="tw-groups">
          {groups.map((group) => <ToolGroupItem key={group.number} group={group} />)}
        </div>

        <div className="tw-workflow">
          <div className="tw-workflow-heading">
            <p className="tw-eyebrow">HOW I WORK</p>
            <h3>From problem to product</h3>
          </div>
          <ol className="tw-stages">
            {stages.map((stage, index) => (
              <li className="tw-stage" key={stage.number}>
                <div className="tw-stage-top">
                  <span className="tw-stage-number">{stage.number}</span>
                  {index < stages.length - 1 && <ArrowRight className="tw-stage-arrow" size={16} aria-hidden="true" />}
                </div>
                <h4>{stage.title}</h4>
                <p>{stage.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
