import { SectionHeading } from '../components/ui/SectionHeading';

export function ContactPage() {
  return (
    <div className="page">
      <section className="section">
        <div className="container contact-grid">
          <div className="contact-grid__info">
            <SectionHeading
              eyebrow="Contact"
              title="Let’s design your security roadmap"
              description="Reach out to our team for partnerships, project requests, or media collaborations."
            />
            <div className="contact-card">
              <h3>Connect with us</h3>
              <ul>
                <li>
                  <span>Email</span>
                  <a href="mailto:hello@cybersentra.global">hello@cybersentra.global</a>
                </li>
                <li>
                  <span>WhatsApp</span>
                  <a href="https://wa.me/910000000000" target="_blank" rel="noreferrer">
                    +91 00000 00000
                  </a>
                </li>
                <li>
                  <span>LinkedIn</span>
                  <a href="https://www.linkedin.com/company/cybersentra" target="_blank" rel="noreferrer">
                    CyberSentra Global
                  </a>
                </li>
                <li>
                  <span>Instagram</span>
                  <a href="https://www.instagram.com/cybersentra" target="_blank" rel="noreferrer">
                    @cybersentra
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="contact-grid__form">
            <form className="contact-form">
              <h3>Project Inquiry</h3>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input id="name" name="name" type="text" placeholder="Jane Doe" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="you@company.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="organization">Organization</label>
                <input id="organization" name="organization" type="text" placeholder="Company / Institute" />
              </div>
              <div className="form-group">
                <label htmlFor="message">How can we help?</label>
                <textarea id="message" name="message" placeholder="Tell us about your requirements" rows={4} />
              </div>
              <button
                className="btn btn--primary btn--full"
                type="submit"
                formaction="https://forms.gle/placeholder"
              >
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
