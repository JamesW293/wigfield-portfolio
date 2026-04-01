import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const PROJECTS = [
  {
    title: 'NLP Sentiment Analysis',
    category: 'Machine Learning',
    type: 'University Project',
    icon: '🧠',
    color: 'violet',
    description:
      'Built a deep learning model to classify text sentiment using NLP in PyTorch. Implemented a Variational Siamese Auto-Encoder (VSAE) with a focus on data normalisation, tokenisation, and bespoke architecture design for high validation accuracy.',
    tags: ['Python', 'PyTorch', 'NLP', 'VSAE', 'Deep Learning'],
  },
  {
    title: 'RKMRS AI Staff Agent',
    category: 'AI Development',
    type: 'Professional',
    icon: '🤖',
    color: 'cyan',
    description:
      'Developed a custom AI agent that handles internal staff queries at RKMRS, dramatically reducing time spent on manual information retrieval. Integrated with the Staff Portal for a seamless single-interface experience.',
    tags: ['AI Agent', 'Python', 'JavaScript', 'API Integration'],
  },
  {
    title: 'Digital Staff Portal',
    category: 'Full-Stack Development',
    type: 'Professional',
    icon: '📋',
    color: 'emerald',
    description:
      'Engineered a centralised staff portal for RKMRS that replaced 100% of paper-based workflows. Built dynamic, logic-based digital forms via Jotform and SharePoint integration, eliminating manual paperwork across the organisation.',
    tags: ['SharePoint', 'Jotform', 'Workflow Automation', 'Logic Forms'],
  },
  {
    title: 'Driver PWA',
    category: 'Mobile Development',
    type: 'Professional',
    icon: '📱',
    color: 'rose',
    description:
      'Created a Progressive Web App for RKMRS delivery drivers, giving instant mobile access to forms, the AI agent, and key resources in the field. Mobile-first design ensures usability under any conditions.',
    tags: ['PWA', 'JavaScript', 'HTML/CSS', 'Mobile-First'],
  },
  {
    title: 'GoFlo Automation Pipelines',
    category: 'Automation Engineering',
    type: 'Startup',
    icon: '⚡',
    color: 'amber',
    description:
      'Designed and deployed multi-step automation pipelines for small business clients at GoFlo Solutions, connecting disparate tools and systems. Each solution is scoped, architected, and delivered end-to-end.',
    tags: ['n8n', 'Power Automate', 'Google Apps Script', 'JavaScript'],
  },
];

export default function Projects() {
  const [headerRef, headerVisible] = useIntersectionObserver();

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div ref={headerRef} className={`section__header${headerVisible ? ' anim-slide-up' : ''}`}>
          <span className="section__label">// 03</span>
          <h2 className="section__title">Projects</h2>
        </div>

        <div className="projects__grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`project-card glass-card glass-card--${project.color}${isVisible ? ' anim-slide-up' : ''}`}
      style={{ animationDelay: `${(index % 3) * 0.1}s` }}
    >
      <div className="project-card__top">
        <span className="project-card__icon">{project.icon}</span>
        <span className={`pill pill--${project.color} pill--sm`}>{project.type}</span>
      </div>
      <p className="project-card__category">{project.category}</p>
      <h3 className={`project-card__title text-${project.color}`}>{project.title}</h3>
      <p className="project-card__desc">{project.description}</p>
      <div className="project-card__tags">
        {project.tags.map((tag) => (
          <span key={tag} className="pill pill--ghost">{tag}</span>
        ))}
      </div>
    </div>
  );
}
