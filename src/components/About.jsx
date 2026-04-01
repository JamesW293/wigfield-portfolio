import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const STATS = [
  { label: 'GPA', value: '5.0/7.0', sub: 'Univ. of W. Australia', icon: '🎓', color: 'cyan' },
  { label: 'ATAR', value: '93.2', sub: 'Dux of the Year', icon: '🏆', color: 'violet' },
  { label: 'Study Abroad', value: 'Leeds, UK', sub: 'Semester 1, 2025', icon: '🌍', color: 'emerald' },
  { label: 'Startup', value: 'Co-Founder', sub: 'GoFlo Solutions', icon: '🚀', color: 'rose' },
];

const HIGHLIGHTS = [
  { icon: '🤖', label: 'AI & Machine Learning' },
  { icon: '⚡', label: 'Workflow Automation' },
  { icon: '🛠', label: 'Full-Stack Dev' },
  { icon: '👥', label: 'Team Leadership' },
];

export default function About() {
  const [headerRef, headerVisible] = useIntersectionObserver();
  const [textRef, textVisible] = useIntersectionObserver();
  const [statsRef, statsVisible] = useIntersectionObserver();

  return (
    <section id="about" className="section about">
      <div className="container">
        <div ref={headerRef} className={`section__header${headerVisible ? ' anim-slide-up' : ''}`}>
          <span className="section__label">// 01</span>
          <h2 className="section__title">About Me</h2>
        </div>

        <div className="about__grid">
          <div ref={textRef} className={`about__text${textVisible ? ' anim-slide-up' : ''}`}>
            <p>
              I'm a Computer Science student at the{' '}
              <strong className="text-cyan">University of Western Australia</strong>, majoring in{' '}
              <strong className="text-cyan">Artificial Intelligence</strong>. I love building
              systems that solve real problems — from custom AI agents to full automation
              pipelines and production web apps.
            </p>
            <p>
              In 2025 I studied abroad at the{' '}
              <strong className="text-violet">University of Leeds, UK</strong> — an experience
              that deepened my technical thinking and gave me a global perspective on technology
              and innovation.
            </p>
            <p>
              I co-founded <strong className="text-violet">GoFlo Solutions</strong>, an AI
              automation agency that helps small businesses reclaim their time. I also serve as
              IT Manager at RKMRS, where I led the digital transformation of internal operations
              from the ground up.
            </p>

            <div className="about__highlights">
              {HIGHLIGHTS.map((h) => (
                <span key={h.label} className="about__tag">
                  <span>{h.icon}</span>
                  {h.label}
                </span>
              ))}
            </div>
          </div>

          <div ref={statsRef} className="about__stats">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`stat-card stat-card--${s.color}${statsVisible ? ' anim-slide-up' : ''}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="stat-card__icon">{s.icon}</span>
                <span className="stat-card__value">{s.value}</span>
                <span className="stat-card__label">{s.label}</span>
                <span className="stat-card__sub">{s.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
