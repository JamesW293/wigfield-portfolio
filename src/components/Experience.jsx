import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const EXPERIENCES = [
  {
    company: 'GoFlo Solutions',
    url: null,
    role: 'Co-Founder & Lead Automation Engineer',
    period: 'Aug 2025 – Present',
    location: 'Perth, AU',
    color: 'violet',
    icon: '🚀',
    bullets: [
      'Co-founded an AI automation agency, leading technical scoping, architecture, and deployment of workflow solutions for small business clients.',
      'Designed custom automation scripts using Google Apps Script, n8n, Power Automate, and JavaScript to integrate fragmented business software.',
      'Managed the full SDLC for client projects — from requirements gathering and rapid prototyping through to final delivery within strict timelines.',
    ],
    tags: ['n8n', 'Power Automate', 'Google Apps Script', 'JavaScript', 'AI'],
  },
  {
    company: 'Rockingham Kwinana Mobility (RKMRS)',
    url: null,
    role: 'IT Manager',
    period: 'Feb 2024 – Present',
    location: 'Rockingham, AU',
    color: 'cyan',
    icon: '💼',
    bullets: [
      'Engineered a centralised Staff Portal, migrating 100% of paper-based forms to dynamic, logic-driven digital workflows via Jotform and SharePoint integration.',
      'Developed a custom AI agent to assist staff with internal queries, cutting information retrieval time significantly.',
      'Built a Progressive Web App for delivery drivers — mobile-first access to forms, the AI agent, and key resources, in the field.',
    ],
    tags: ['Jotform', 'SharePoint', 'PWA', 'AI Agent', 'JavaScript'],
  },
  {
    company: 'Ace Cinemas Rockingham',
    url: null,
    role: 'Location Team Leader',
    period: 'Jun 2019 – Jan 2025',
    location: 'Rockingham, AU',
    color: 'rose',
    icon: '🎬',
    bullets: [
      'Supervised a team of staff across a high-volume retail and entertainment environment, maintaining exceptional customer service standards.',
      'Owned conflict resolution, staff training programmes, and daily operations management over a 5+ year tenure.',
    ],
    tags: ['Leadership', 'Team Management', 'Training', 'Customer Service'],
  },
];

export default function Experience() {
  const [headerRef, headerVisible] = useIntersectionObserver();

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <div ref={headerRef} className={`section__header${headerVisible ? ' anim-slide-up' : ''}`}>
          <span className="section__label">// 02</span>
          <h2 className="section__title">Experience</h2>
        </div>

        <div className="timeline">
          {EXPERIENCES.map((exp, i) => (
            <TimelineItem key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ exp, index }) {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`timeline__item${isVisible ? ' anim-slide-up' : ''}`}
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      <div className={`timeline__dot timeline__dot--${exp.color}`} />

      <div className={`timeline__card glass-card glass-card--${exp.color}`}>
        <div className="timeline__meta">
          <span className="timeline__period">{exp.period}</span>
          <span className="timeline__location">{exp.location}</span>
        </div>

        <div className="timeline__header">
          <span className="timeline__icon">{exp.icon}</span>
          <div>
            <h3 className={`timeline__company text-${exp.color}`}>{exp.company}</h3>
            <p className="timeline__role">{exp.role}</p>
          </div>
        </div>

        <ul className="timeline__bullets">
          {exp.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>

        <div className="timeline__tags">
          {exp.tags.map((tag) => (
            <span key={tag} className={`pill pill--${exp.color}`}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
