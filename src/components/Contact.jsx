import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function Contact() {
  const [headerRef, headerVisible] = useIntersectionObserver();
  const [bodyRef, bodyVisible] = useIntersectionObserver();

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div ref={headerRef} className={`section__header${headerVisible ? ' anim-slide-up' : ''}`}>
          <span className="section__label">// 05</span>
          <h2 className="section__title">Get In Touch</h2>
        </div>

        <div ref={bodyRef} className={`contact__body${bodyVisible ? ' anim-slide-up' : ''}`}>
          <p className="contact__intro">
            I'm always open to new opportunities, collaborations, or just a great conversation
            about AI and technology. Whether you have a project in mind or just want to connect —
            my inbox is open.
          </p>

          <div className="contact__cards">
            <a href="mailto:jameswigfield1@gmail.com" className="contact-card glass-card glass-card--cyan">
              <span className="contact-card__icon">✉️</span>
              <span className="contact-card__label">Email</span>
              <span className="contact-card__value">jameswigfield1@gmail.com</span>
              <span className="contact-card__arrow">→</span>
            </a>
            <a href="tel:+61455887910" className="contact-card glass-card glass-card--violet">
              <span className="contact-card__icon">📱</span>
              <span className="contact-card__label">Phone</span>
              <span className="contact-card__value">0455 887 910</span>
              <span className="contact-card__arrow">→</span>
            </a>
          </div>

          <a href="mailto:jameswigfield1@gmail.com" className="btn btn--primary contact__cta">
            Say Hello &nbsp;→
          </a>
        </div>
      </div>
    </section>
  );
}
