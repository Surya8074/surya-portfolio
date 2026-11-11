import React from "react";
import "./cta-footer.css";

const columns = [
  { title: "Explore", links: [{ label: "Selected work", href: "#work" }, { label: "Other projects", href: "#art" }] },
  { title: "About", links: [{ label: "About me", href: "#about" }, { label: "Tools & workflow", href: "#tools" }] },
  { title: "More", links: [{ label: "Resume", href: "/surya-portfolio/resume/" }, { label: "GitHub", href: "https://github.com/Surya8074" }] },
];

export default function CtaFooter() {
  return (
    <section id="contact" className="cta-footer" aria-label="Contact and portfolio footer">
      <div className="cta-footer__glow" aria-hidden="true" />
      <div className="cta-footer__callout">
        <p className="cta-footer__eyebrow">HAVE A GOOD CHALLENGE IN MIND?</p>
        <h2 className="cta-footer__heading">Have a product idea?<br /><span>Let’s make it meaningful.</span></h2>
        <p className="cta-footer__description">I’m always interested in thoughtful problems, ambitious products and opportunities to create useful digital experiences.</p>
        <div className="cta-footer__actions">
          <a className="cta-footer__button cta-footer__button--primary" href="#work">Explore my work <span aria-hidden="true">↗</span></a>
          <a className="cta-footer__button cta-footer__button--secondary" href="/surya-portfolio/resume/">View resume</a>
        </div>
      </div>

      <footer className="cta-footer__panel">
        <div className="cta-footer__footer-top">
          <div className="cta-footer__identity">
            <a className="cta-footer__brand" href="#home" aria-label="Surya Kiran home">
              <span className="cta-footer__monogram">S</span><span>Surya Kiran</span>
            </a>
            <h3 className="cta-footer__newsletter-title">Product Designer<br />based in India.</h3>
            <p className="cta-footer__newsletter-copy">Designing thoughtful digital experiences, from the first problem to the final interaction.</p>
            <span className="cta-footer__availability"><i /> OPEN TO PRODUCT DESIGN OPPORTUNITIES</span>
          </div>
          <nav className="cta-footer__columns" aria-label="Footer navigation">
            {columns.map((column) => (
              <div className="cta-footer__column" key={column.title}>
                <h3>{column.title}</h3>
                <ul>{column.links.map(link => <li key={link.label}><a href={link.href}>{link.label}</a></li>)}</ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="cta-footer__bottom">
          <span>© {new Date().getFullYear()} Surya Kiran. Designed with intention.</span>
          <a href="#home">Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </footer>
    </section>
  );
}
