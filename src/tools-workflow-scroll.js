(() => {
  "use strict";

  function init() {
    const section = document.querySelector("#tools-workflow");
    if (!section) return false;

    const grid = section.querySelector(".tw-groups");
    const cards = grid ? [...grid.querySelectorAll(":scope > .tw-group")] : [];
    if (!grid || cards.length !== 6) return false;
    if (grid.dataset.stackReady === "true") return true;
    grid.dataset.stackReady = "true";

    const mobile = window.matchMedia("(max-width: 760px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let queued = false;

    function measureCards() {
      if (mobile.matches || reducedMotion.matches) {
        grid.classList.remove("tw-stack-sticky", "tw-stack-measuring");
        grid.classList.add("is-spread");
        cards.forEach((card) => {
          ["--tw-pile-x", "--tw-pile-y", "--tw-pile-r", "--tw-stack-delay"].forEach((name) => card.style.removeProperty(name));
          card.style.removeProperty("z-index");
        });
        return;
      }

      grid.classList.add("tw-stack-measuring");
      void grid.offsetWidth;
      const rect = grid.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotations = [-5, 4, -3, 5, -4, 2];
      const positions = cards.map((card) => card.getBoundingClientRect());

      cards.forEach((card, index) => {
        const item = positions[index];
        const dx = centerX - (item.left + item.width / 2);
        const dy = centerY - (item.top + item.height / 2);
        card.style.setProperty("--tw-pile-x", `${dx + ((index % 3) - 1) * 5}px`);
        card.style.setProperty("--tw-pile-y", `${dy + (index % 2 ? -4 : 4)}px`);
        card.style.setProperty("--tw-pile-r", `${rotations[index]}deg`);
        card.style.setProperty("--tw-stack-delay", `${index * 55}ms`);
        card.style.zIndex = String(6 - index);
      });

      grid.style.setProperty("--tw-stack-sticky-top", `${Math.max(24, (window.innerHeight - rect.height) / 2)}px`);
      grid.classList.remove("tw-stack-measuring");
      grid.classList.add("tw-stack-sticky");
      grid.classList.remove("is-spread");
    }

    function updateState() {
      if (mobile.matches || reducedMotion.matches) {
        grid.classList.add("is-spread");
        return;
      }
      const trigger = Math.max(100, window.innerHeight * 0.40);
      const reached = grid.getBoundingClientRect().top <= trigger;
      grid.classList.toggle("is-spread", reached);
    }

    function requestUpdate() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        updateState();
      });
    }

    measureCards();
    updateState();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", () => { measureCards(); requestUpdate(); }, { passive: true });
    mobile.addEventListener?.("change", () => { measureCards(); requestUpdate(); });
    reducedMotion.addEventListener?.("change", () => { measureCards(); requestUpdate(); });
    return true;
  }

  function start() {
    if (init()) return;
    const observer = new MutationObserver(() => {
      if (init()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
