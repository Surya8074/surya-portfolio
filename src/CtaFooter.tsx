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
      <div className="cta-footer__inner">
        <div className="cta-footer__callout">
          <div className="cta-footer__callout-copy">
            <p className="cta-footer__eyebrow">HAVE A GOOD PROBLEM TO SOLVE?</p>
            <h2 className="cta-footer__heading">Let’s make something<br /><span>useful together.</span></h2>
            <p className="cta-footer__description">I’m open to product design opportunities and thoughtful collaborations.</p>
          </div>
          <div className="cta-footer__actions">
            <a className="cta-footer__button cta-footer__button--primary" href="#work">Explore my work <span aria-hidden="true">↗</span></a>
            <a className="cta-footer__button cta-footer__button--secondary" href="/surya-portfolio/resume/">View resume</a>
          </div>
        </div>
        <footer className="cta-footer__panel">
          <div className="cta-footer__footer-top">
            <div className="cta-footer__identity">
              <a className="cta-footer__brand" href="#home">Surya Kiran<span className="cta-footer__brand-mark">.</span></a>
              <p className="cta-footer__newsletter-title">Product Designer<br />based in India.</p>
              <p className="cta-footer__newsletter-copy">Making digital products clearer, more useful and easier to use.</p>
              <span className="cta-footer__availability"><i /> Open to product design opportunities</span>
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
            <span>© {new Date().getFullYear()} Surya Kiran</span>
            <a href="#home">Back to top <span aria-hidden="true">↑</span></a>
          </div>
        </footer>
      </div>
    </section>
  );
}
