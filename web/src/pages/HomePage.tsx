import { Link } from 'react-router-dom';

import { SectionHeading } from '../components/ui/SectionHeading';
import { PillarCard } from '../components/ui/PillarCard';

const pillars = [
  {
    title: 'Security Services',
    description: 'Enterprise-grade VAPT, 24/7 SOC operations, and compliance readiness for fast-growing teams.',
    items: ['Vulnerability Assessment & Penetration Testing', 'Managed SOC', 'ISO 27001 & GDPR compliance'],
    icon: '🛡️',
  },
  {
    title: 'Community Chapter',
    description: 'Empowering students with hands-on cybersecurity events, ambassador programs, and webinars.',
    items: ['Campus chapters', 'Monthly meetups', 'Live CTFs & webinars'],
    icon: '🌐',
  },
  {
    title: 'Digital Wing',
    description: 'High-impact digital experiences that amplify your brand presence and secure your digital footprint.',
    items: ['Social media management', 'Conversion-driven websites', 'Brand security audits'],
    icon: '🚀',
  },
  {
    title: 'Academy',
    description: 'Industry-backed internships and bootcamps designed for the next generation of cyber defenders.',
    items: ['4–8 week internships', 'Bootcamps & workshops', 'Global certifications'],
    icon: '🎓',
  },
  {
    title: 'Labs',
    description: 'AI-assisted final-year projects with production-ready code, documentation, and viva support.',
    items: ['Ready-to-ship projects', 'Custom AI builds', 'Internship combo plans'],
    icon: '🔬',
  },
];

export function HomePage() {
  return (
    <div className="page home-page">
      <section className="hero">
        <div className="container hero__content">
          <div className="hero__copy">
            <span className="hero__eyebrow">AI-powered cybersecurity ecosystem</span>
            <h1>CyberSentra Global</h1>
            <p>
              Secure your digital future with a full-stack cybersecurity partner. We combine threat-led
              security operations, digital innovation, and student-driven talent to accelerate trust.
            </p>
            <div className="hero__actions">
              <Link className="btn btn--primary" to="/services">Explore Services</Link>
              <Link className="btn btn--outline" to="/academy">Join Academy</Link>
            </div>
            <div className="hero__highlights">
              <div>
                <strong>6K+</strong>
                <span>LinkedIn followers</span>
              </div>
              <div>
                <strong>AI-Powered</strong>
                <span>Security solutions</span>
              </div>
              <div>
                <strong>Student-led</strong>
                <span>Innovation community</span>
              </div>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__badge">Security • Strategy • Skills</div>
            <img src="/hero-illustration.svg" alt="Cyber security illustration" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Five-Pillar Ecosystem"
            title="One platform for resilient digital growth"
            description="From enterprise security to community building, we orchestrate every capability needed to protect, educate, and accelerate your mission."
          />
          <div className="pillar-grid">
            {pillars.map((pillar) => (
              <PillarCard
                key={pillar.title}
                title={pillar.title}
                description={pillar.description}
                items={pillar.items}
                icon={<span aria-hidden>{pillar.icon}</span>}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container section__cta">
          <div>
            <h2>Ready to design the future securely?</h2>
            <p>
              Partner with CyberSentra Global to modernize your security operations, upskill your teams,
              and ship innovation with confidence.
            </p>
          </div>
          <a className="btn btn--primary" href="https://cal.com/placeholder" target="_blank" rel="noreferrer">
            Book a strategy call
          </a>
        </div>
      </section>
    </div>
  );
}
