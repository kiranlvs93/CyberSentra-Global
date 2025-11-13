import { SectionHeading } from '../components/ui/SectionHeading';

const features = [
  {
    title: 'Production-ready Codebases',
    description: 'Modular repositories with documentation, deployment scripts, and secure coding checklists.',
  },
  {
    title: 'AI-Assisted Custom Builds',
    description: 'Pair with CyberSentra engineers to co-create ML-powered solutions tailored to your use case.',
  },
  {
    title: 'Exam & Viva Readiness',
    description: 'Viva questions, presentation decks, and mentoring to defend your innovation with confidence.',
  },
  {
    title: 'Internship + Project Combo',
    description: 'Bundle your final-year project with a CyberSentra internship to extend learning into practice.',
  },
];

export function LabsPage() {
  return (
    <div className="page">
      <section className="hero hero--inner labs-hero">
        <div className="container hero__content">
          <div className="hero__copy">
            <span className="hero__eyebrow">CyberSentra Labs</span>
            <h1>AI-built final-year projects that stand out</h1>
            <p>
              Choose from ready-to-launch projects or collaborate on custom builds with AI guidance, detailed
              documentation, and delivery support.
            </p>
            <a
              className="btn btn--primary"
              href="https://forms.gle/placeholder"
              target="_blank"
              rel="noreferrer"
            >
              Request Project
            </a>
          </div>
          <div className="hero__visual">
            <img src="/labs-illustration.svg" alt="Labs innovation" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="What’s Included"
            title="Every project ships with more than code"
            description="We package engineering, documentation, and career leverage into every lab engagement."
          />
          <div className="card-grid card-grid--four">
            {features.map((feature) => (
              <article key={feature.title} className="service-card">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
