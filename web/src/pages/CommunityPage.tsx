import { SectionHeading } from '../components/ui/SectionHeading';

const highlights = [
  {
    title: 'College Chapters',
    description: 'Launch a CyberSentra chapter on your campus with playbooks, mentorship, and event toolkits.',
  },
  {
    title: 'Capture the Flag (CTF) Series',
    description: 'Competitive challenges that sharpen red-team and blue-team instincts with live leaderboards.',
  },
  {
    title: 'Webinars & Fireside Chats',
    description: 'Monthly expert talks on AI security, incident response, and emerging cyber careers.',
  },
  {
    title: 'Student Ambassador Program',
    description: 'Build influence, host events, and access exclusive resources as a CyberSentra ambassador.',
  },
];

export function CommunityPage() {
  return (
    <div className="page">
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Community First"
            title="The most vibrant student-led cybersecurity network"
            description="We mobilize cyber talent across campuses with mentorship, events, and collaborative learning."
          />
          <div className="card-grid card-grid--four">
            {highlights.map((item) => (
              <article key={item.title} className="service-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container community__cta">
          <div>
            <h2>Host your next cyber event with us</h2>
            <p>
              From ideation to promotion, the CyberSentra community team co-creates immersive experiences that
              attract learners and industry leaders alike.
            </p>
          </div>
          <a
            className="btn btn--primary"
            href="https://forms.gle/placeholder"
            target="_blank"
            rel="noreferrer"
          >
            Partner with CyberSentra
          </a>
        </div>
      </section>
    </div>
  );
}
