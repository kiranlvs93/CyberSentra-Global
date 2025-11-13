import { SectionHeading } from '../components/ui/SectionHeading';

const programs = [
  {
    title: 'Cybersecurity Internship (4–8 Weeks)',
    description:
      'Mentored rotations across VAPT, SOC, and governance with real client projects and blue-team tooling.',
  },
  {
    title: 'AI-Driven Security Bootcamps',
    description:
      'Weekend intensives covering cloud defense, purple teaming, and automation with industry practitioners.',
  },
  {
    title: 'Certification Fast Tracks',
    description:
      'Structured learning paths aligned to global certs like CEH, CompTIA Security+, and AZ-500.',
  },
];

export function AcademyPage() {
  return (
    <div className="page">
      <section className="hero hero--inner">
        <div className="container hero__content">
          <div className="hero__copy">
            <span className="hero__eyebrow">CyberSentra Academy</span>
            <h1>Launch your cybersecurity career with expert mentorship</h1>
            <p>
              From foundational sprints to advanced certifications, CyberSentra Academy powers emerging talent
              with real-world case studies, AI labs, and industry-grade collaboration tools.
            </p>
            <a
              className="btn btn--primary"
              href="https://forms.gle/placeholder"
              target="_blank"
              rel="noreferrer"
            >
              Apply Now
            </a>
          </div>
          <div className="hero__visual">
            <img src="/academy-illustration.svg" alt="Academy students" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Programs"
            title="Choose your growth sprint"
            description="Every program blends technical depth, community, and portfolio-ready outcomes."
          />
          <div className="card-grid">
            {programs.map((program) => (
              <article key={program.title} className="service-card">
                <h3>{program.title}</h3>
                <p>{program.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container academy__cta">
          <div>
            <h2>Built with mentors from global cyber teams</h2>
            <p>
              Collaborate with analysts, researchers, and founders who ship security at scale. Join the
              CyberSentra Academy to access exclusive labs, mock interviews, and career navigation support.
            </p>
          </div>
          <a
            className="btn btn--outline"
            href="https://discord.gg/placeholder"
            target="_blank"
            rel="noreferrer"
          >
            Join the community
          </a>
        </div>
      </section>
    </div>
  );
}
