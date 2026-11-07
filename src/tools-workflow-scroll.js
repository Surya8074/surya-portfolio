(() => {
  "use strict";

  const SECTION_SELECTOR = "#tools-workflow";
  const MOBILE_QUERY = "(max-width: 760px)";
  const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
  let initialized = false;
  let queued = false;
  let section;
  let grid;
  let cards = [];
  const mobile = window.matchMedia(MOBILE_QUERY);
  const reducedMotion = window.matchMedia(REDUCED_QUERY);

  function findSection() {
    if (initialized) return;
    section = document.querySelector(SECTION_SELECTOR);
    if (!section) return false;

    grid = section.querySelector(".tw-groups");
    cards = grid ? [...grid.querySelectorAll(":scope > .tw-group")] : [];
    if (!grid || cards.length === 0) return false;

    initialized = true;
    section.classList.add("tools-stack-enhanced");
    grid.classList.add("tw-stack-sticky");
    measureCards();
    updateState();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    mobile.addEventListener?.("change", onResize);
    reducedMotion.addEventListener?.("change", requestUpdate);
    return true;
  }

  function measureCards() {
    if (!grid || !cards.length) return;

    if (mobile.matches) {
      grid.classList.add("is-spread");
      cards.forEach((card) => {
        card.style.removeProperty("--tw-pile-x");
        card.style.removeProperty("--tw-pile-y");
        card.style.removeProperty("--tw-pile-r");
        card.style.removeProperty("--tw-stack-delay");
      });
      return;
    }

    grid.classList.add("tw-stack-measuring");
    void grid.offsetWidth;

    const gridRect = grid.getBoundingClientRect();
    const centerX = gridRect.left + gridRect.width / 2;
    const centerY = gridRect.top + gridRect.height / 2;
    const rotations = [-5, 4, -3, 5, -4, 2, -6, 3];
    const cardRects = cards.map((card) => card.getBoundingClientRect());

    cards.forEach((card, index) => {
      const rect = cardRects[index];
      const centerOffsetX = centerX - (rect.left + rect.width / 2);
      const centerOffsetY = centerY - (rect.top + rect.height / 2);
      const jitterX = ((index % 3) - 1) * 5;
      const jitterY = ((index % 2) ? -1 : 1) * 4;
      card.style.setProperty("--tw-pile-x", `${centerOffsetX + jitterX}px`);
      card.style.setProperty("--tw-pile-y", `${centerOffsetY + jitterY}px`);
      card.style.setProperty("--tw-pile-r", `${rotations[index % rotations.length]}deg`);
      card.style.setProperty("--tw-stack-delay", `${index * 45}ms`);
      card.style.zIndex = String(index + 1);
    });

    const stickyTop = Math.max(24, (window.innerHeight - gridRect.height) / 2);
    grid.style.setProperty("--tw-stack-sticky-top", `${stickyTop}px`);
    grid.classList.remove("tw-stack-measuring");
  }

  function updateState() {
    if (!initialized || !grid) return;

    if (mobile.matches || reducedMotion.matches) {
      grid.classList.add("is-spread");
      return;
    }

    const threshold = Math.min(190, window.innerHeight * 0.18);
    const spread = section.getBoundingClientRect().top <= -threshold;
    grid.classList.toggle("is-spread", spread);
  }

  function requestUpdate() {
    if (!initialized || queued) return;
    queued = true;
    window.requestAnimationFrame(() => {
      queued = false;
      updateState();
    });
  }

  function onResize() {
    if (!initialized) return;
    measureCards();
    requestUpdate();
  }

  function start() {
    if (findSection()) return;

    const observer = new MutationObserver(() => {
      if (findSection()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
