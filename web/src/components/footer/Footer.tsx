const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/cybersentra',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.983 3.5C4.983 4.60457 4.09001 5.5 2.983 5.5C1.87599 5.5 0.983002 4.60457 0.983002 3.5C0.983002 2.39543 1.87599 1.5 2.983 1.5C4.09001 1.5 4.983 2.39543 4.983 3.5Z"
          fill="currentColor"
        />
        <path
          d="M1.206 22H4.76V7.99999H1.206V22ZM8.257 7.99999H11.687V9.72599H11.738C12.216 8.81299 13.392 7.84999 15.106 7.84999C18.671 7.84999 19.309 10.122 19.309 13.204V22H15.754V13.996C15.754 12.452 15.727 10.466 13.739 10.466C11.723 10.466 11.416 12.165 11.416 13.882V22H7.861V7.99999H8.257Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/cybersentra',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="7" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/910000000000',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20.52 3.48198C18.56 1.52398 15.88 0.401977 13.02 0.401977C6.83 0.401977 1.92 5.31198 1.92 11.502C1.92 13.939 2.77 16.246 4.32 18.115L3.12 23.402L8.56 22.233C10.35 23.257 12.32 23.802 14.36 23.802H14.38C20.56 23.802 25.48 18.892 25.48 12.702C25.48 9.84298 24.36 7.16198 22.4 5.20198L20.52 3.48198ZM14.36 21.802C12.6 21.802 10.88 21.331 9.38 20.437L9.04 20.233L6.08 20.889L6.8 17.661L6.56 17.302C5.22 15.353 4.52 13.142 4.52 10.842C4.52 6.42298 8.28 2.66198 12.7 2.66198C14.88 2.66198 16.94 3.51198 18.53 5.04198C20.12 6.57198 20.96 8.63198 20.96 10.802C20.96 15.222 17.2 18.982 12.78 18.982H12.76C11.24 18.982 9.76 18.562 8.48 17.762L7.74 17.312L7.14 17.682"
          fill="currentColor"
          opacity="0.92"
        />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <img src="/logo-mark.svg" alt="CyberSentra Global icon" className="site-footer__logo" />
          <div>
            <p className="site-footer__title">CyberSentra Global</p>
            <p className="site-footer__subtitle">Security • Strategy • Skills</p>
          </div>
        </div>
        <div className="site-footer__columns">
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="/services">Services</a></li>
              <li><a href="/academy">Academy</a></li>
              <li><a href="/labs">Labs</a></li>
              <li><a href="/community">Community</a></li>
            </ul>
          </div>
          <div>
            <h4>Connect</h4>
            <ul>
              <li><a href="mailto:hello@cybersentra.global">hello@cybersentra.global</a></li>
              <li><a href="https://wa.me/910000000000" target="_blank" rel="noreferrer">WhatsApp</a></li>
              <li><a href="https://www.linkedin.com/company/cybersentra" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/cybersentra" target="_blank" rel="noreferrer">Instagram</a></li>
            </ul>
            <div className="site-footer__social">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.href} target="_blank" rel="noreferrer" aria-label={link.name}>
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} CyberSentra Global. All rights reserved.</p>
      </div>
    </footer>
  );
}
