import { SectionHeading } from '../components/ui/SectionHeading';

const securityServices = [
  {
    title: 'Vulnerability Assessment & Penetration Testing',
    description:
      'Offensive security experts deliver application, infrastructure, and mobile VAPT with prioritized remediation.',
  },
  {
    title: 'Managed Security Operations Center',
    description:
      '24/7 monitoring, triage, and threat hunting powered by AI-assisted detections and analyst expertise.',
  },
  {
    title: 'Cloud Security Hardening',
    description:
      'Blueprint cloud-native defenses with secure baselines, IaC scanning, and continuous compliance.',
  },
  {
    title: 'ISO 27001 & Compliance Programs',
    description:
      'Gap assessments, policy frameworks, and audit readiness so you can scale with trust.',
  },
  {
    title: 'AI Security Reports',
    description:
      'Executive-ready narratives that translate threat intelligence, attack simulations, and ROI into action.',
  },
];

const digitalWing = [
  {
    title: 'Social Media Command Center',
    description: 'Storytelling, scheduling, and analytics engineered for cybersecurity audiences.',
  },
  {
    title: 'Experience-led Website Development',
    description: 'UX, design systems, and secure builds that convert visitors into loyal advocates.',
  },
  {
    title: 'Brand Security Audit',
    description: 'Reputation monitoring and takedown playbooks to safeguard your digital identity.',
  },
];

export function ServicesPage() {
  return (
    <div className="page">
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Security Services"
            title="Strategic protection for every attack surface"
            description="Deploy outcome-driven security programs that integrate seamlessly with your teams."
          />
          <div className="card-grid">
            {securityServices.map((service) => (
              <article key={service.title} className="service-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionHeading
            eyebrow="Digital Wing"
            title="Build trusted experiences that scale"
            description="Our digital wing blends creativity, security, and analytics to amplify your brand voice."
          />
          <div className="card-grid card-grid--three">
            {digitalWing.map((service) => (
              <article key={service.title} className="service-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
