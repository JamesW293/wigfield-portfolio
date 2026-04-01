import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const SKILL_GROUPS = [
  {
    category: 'Languages',
    icon: '💻',
    color: 'cyan',
    skills: ['Python', 'JavaScript', 'Java', 'Swift', 'SQL', 'HTML', 'CSS'],
  },
  {
    category: 'Frameworks & Libraries',
    icon: '⚙️',
    color: 'violet',
    skills: ['React', 'PyTorch', 'Next.js', 'Redux', 'Node.js'],
  },
  {
    category: 'Automation & Tools',
    icon: '⚡',
    color: 'emerald',
    skills: ['n8n', 'Power Automate', 'Google Apps Script', 'SharePoint', 'Jotform', 'Git'],
  },
  {
    category: 'AI & Concepts',
    icon: '🧠',
    color: 'rose',
    skills: ['Natural Language Processing', 'Computer Vision', 'Machine Learning', 'AI Agents', 'Deep Learning', 'SDLC'],
  },
];

export default function Skills() {
  const [headerRef, headerVisible] = useIntersectionObserver();

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div ref={headerRef} className={`section__header${headerVisible ? ' anim-slide-up' : ''}`}>
          <span className="section__label">// 04</span>
          <h2 className="section__title">Skills</h2>
        </div>

        <div className="skills__grid">
          {SKILL_GROUPS.map((group, gi) => (
            <SkillGroup key={group.category} group={group} groupIndex={gi} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillGroup({ group, groupIndex }) {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`skill-group glass-card glass-card--${group.color}${isVisible ? ' anim-slide-up' : ''}`}
      style={{ animationDelay: `${groupIndex * 0.12}s` }}
    >
      <div className="skill-group__header">
        <span className="skill-group__icon">{group.icon}</span>
        <h3 className={`skill-group__title text-${group.color}`}>{group.category}</h3>
      </div>
      <div className="skill-group__pills">
        {group.skills.map((skill, si) => (
          <span
            key={skill}
            className={`skill-pill skill-pill--${group.color}${isVisible ? ' skill-pill--visible' : ''}`}
            style={{ transitionDelay: `${groupIndex * 0.12 + si * 0.04 + 0.2}s` }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
