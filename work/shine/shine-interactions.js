(() => {
  "use strict";

  const start = () => {
    const header = document.querySelector(".site-header");
    const main = document.querySelector("#main");
    if (!header || !main) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const style = document.createElement("style");
    style.textContent = `
      .site-header { position: relative; justify-content: space-between; }
      .shine-menu-toggle {
        display: none;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-height: 40px;
        padding: 8px 13px;
        border: 1px solid var(--line, #e6e6e1);
        border-radius: 999px;
        background: #fff;
        color: var(--ink, #181915);
        cursor: pointer;
        font: inherit;
        font-size: 13px;
      }
      .shine-menu-toggle:hover { border-color: #bcbeb4; }
      .shine-menu-icon { display: inline-grid; gap: 4px; width: 15px; }
      .shine-menu-icon span { display: block; height: 1.5px; width: 15px; border-radius: 2px; background: currentColor; transition: transform .2s ease, opacity .2s ease; }
      .shine-menu-toggle[aria-expanded="true"] .shine-menu-icon span:first-child { transform: translateY(5.5px) rotate(45deg); }
      .shine-menu-toggle[aria-expanded="true"] .shine-menu-icon span:nth-child(2) { opacity: 0; }
      .shine-menu-toggle[aria-expanded="true"] .shine-menu-icon span:last-child { transform: translateY(-5.5px) rotate(-45deg); }
      .shine-mobile-menu {
        position: absolute;
        z-index: 30;
        top: calc(100% - 6px);
        right: 0;
        display: grid;
        width: min(280px, calc(100vw - 28px));
        gap: 3px;
        padding: 9px;
        border: 1px solid var(--line, #e6e6e1);
        border-radius: 16px;
        background: rgba(255,255,255,.98);
        box-shadow: 0 16px 42px rgba(24,25,21,.12);
        opacity: 0;
        transform: translateY(-6px) scale(.98);
        transform-origin: top right;
        transition: opacity .18s ease, transform .18s ease, visibility .18s ease;
        visibility: hidden;
      }
      .shine-mobile-menu[data-open="true"] { opacity: 1; transform: translateY(0) scale(1); visibility: visible; }
      .shine-mobile-menu a { display: block; padding: 10px 11px; border-radius: 9px; color: var(--ink, #181915); font-size: 13px; text-decoration: none; }
      .shine-mobile-menu a:hover, .shine-mobile-menu a:focus-visible { background: #f1f5f2; color: #075d47; }
      .shine-mobile-menu[hidden] { display: none !important; }
      .shine-scroll-progress { position: fixed; z-index: 100; inset: 0 0 auto; height: 3px; background: var(--green, #008b63); transform: scaleX(0); transform-origin: left center; pointer-events: none; }
      .shine-reveal { opacity: 0; transform: translateY(16px); transition: opacity .65s ease, transform .65s cubic-bezier(.2,.65,.25,1); }
      .shine-reveal.is-visible { opacity: 1; transform: translateY(0); }
      .shine-reveal--item { transition-delay: var(--shine-delay, 0ms); }
      @media (max-width: 700px) { .shine-menu-toggle { display: inline-flex; } }
      @media (min-width: 701px) { .shine-mobile-menu { display: none !important; } }
      @media (prefers-reduced-motion: reduce) {
        .shine-menu-icon span, .shine-mobile-menu, .shine-reveal { transition: none !important; }
        .shine-reveal { opacity: 1 !important; transform: none !important; }
      }
    `;
    document.head.append(style);

    // Create a small, keyboard-accessible mobile jump menu from headings already in the page.
    const menuButton = document.createElement("button");
    menuButton.className = "shine-menu-toggle";
    menuButton.type = "button";
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-controls", "shine-mobile-menu");
    menuButton.setAttribute("aria-label", "Open page menu");
    menuButton.innerHTML = '<span class="shine-menu-icon" aria-hidden="true"><span></span><span></span><span></span></span><span class="shine-menu-label">Menu</span>';

    const menu = document.createElement("nav");
    menu.id = "shine-mobile-menu";
    menu.className = "shine-mobile-menu";
    menu.setAttribute("aria-label", "Page sections");
    menu.hidden = true;

    const menuItems = [
      ["Overview", "#page-title"],
      ["Demo", "#demo-heading"],
      ["Context", "#context-heading"],
      ["Opportunity", "#opportunity-heading"],
      ["Research", "#research-heading"],
      ["Design principles", "#principles-heading"],
      ["Final concept", "#concept-heading"],
      ["Interactions", "#interaction-heading"],
      ["Industrial design", "#industrial-heading"],
      ["Technical details", "#architecture-heading"],
      ["Build log", "#buildlog-heading"],
      ["Reflection", "#reflection-heading"]
    ];

    for (const [label, href] of menuItems) {
      if (!document.querySelector(href)) continue;
      const link = document.createElement("a");
      link.href = href;
      link.textContent = label;
      menu.append(link);
    }

    header.append(menuButton, menu);

    const setMenuOpen = (open, { focusFirst = false, restoreFocus = false } = {}) => {
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close page menu" : "Open page menu");
      menuButton.querySelector(".shine-menu-label").textContent = open ? "Close" : "Menu";
      menu.dataset.open = String(open);
      menu.hidden = !open;
      if (open && focusFirst) menu.querySelector("a")?.focus();
      if (!open && restoreFocus) menuButton.focus();
    };

    menuButton.addEventListener("click", () => {
      const opening = menuButton.getAttribute("aria-expanded") !== "true";
      setMenuOpen(opening, { focusFirst: opening });
    });

    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) setMenuOpen(false);
    });

    document.addEventListener("click", (event) => {
      if (menuButton.getAttribute("aria-expanded") === "true" && !header.contains(event.target)) {
        setMenuOpen(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false, { restoreFocus: true });
      }
    });

    const desktopQuery = window.matchMedia("(min-width: 701px)");
    desktopQuery.addEventListener?.("change", (event) => {
      if (event.matches) setMenuOpen(false);
    });

    // A thin reading-progress indicator; its updates are coalesced to one per frame.
    const progress = document.createElement("div");
    progress.className = "shine-scroll-progress";
    progress.setAttribute("aria-hidden", "true");
    document.body.append(progress);
    let progressQueued = false;
    const updateProgress = () => {
      if (progressQueued) return;
      progressQueued = true;
      window.requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const fraction = scrollable > 0 ? window.scrollY / scrollable : 0;
        progress.style.transform = `scaleX(${Math.max(0, Math.min(1, fraction))})`;
        progressQueued = false;
      });
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    updateProgress();

    // Reveal major sections and selected cards as they enter view. Content stays visible
    // if reduced motion is preferred or IntersectionObserver is unavailable.
    const revealTargets = [
      ...document.querySelectorAll(".project-intro, .section, .attribution, .site-footer, .principle-card, .component-grid figure")
    ];
    revealTargets.forEach((element, index) => {
      element.classList.add("shine-reveal");
      if (element.matches(".principle-card, .component-grid figure")) {
        element.classList.add("shine-reveal--item");
        element.style.setProperty("--shine-delay", `${(index % 4) * 70}ms`);
      }
    });

    const showAll = () => revealTargets.forEach((element) => element.classList.add("is-visible"));
    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      showAll();
    } else {
      const observer = new IntersectionObserver((entries, currentObserver) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });
      revealTargets.forEach((element) => observer.observe(element));
      reducedMotion.addEventListener?.("change", (event) => {
        if (event.matches) {
          observer.disconnect();
          showAll();
        }
      });
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();