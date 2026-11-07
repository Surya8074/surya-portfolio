(() => {
  "use strict";

  const section = document.querySelector("#tools-workflow");
  if (!section) return;

  const grid = section.querySelector(".tw-groups");
  const cards = grid ? [...grid.querySelectorAll(":scope > .tw-group")] : [];
  if (!grid || !cards.length) return;

  const mobile = window.matchMedia("(max-width: 760px)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let queued = false;

  function measureCards() {
    if (mobile.matches || reducedMotion.matches) {
      grid.classList.remove("tw-stack-sticky");
      grid.classList.add("is-spread");
      cards.forEach((card) => {
        ["--tw-pile-x", "--tw-pile-y", "--tw-pile-r", "--tw-stack-delay"].forEach((name) => card.style.removeProperty(name));
        card.style.removeProperty("z-index");
      });
      return;
    }

    grid.classList.add("tw-stack-measuring");
    void grid.offsetWidth;
    const gridRect = grid.getBoundingClientRect();
    const centerX = gridRect.left + gridRect.width / 2;
    const centerY = gridRect.top + gridRect.height / 2;
    const rotations = [-5, 4, -3, 5, -4, 2];
    const rects = cards.map((card) => card.getBoundingClientRect());

    cards.forEach((card, index) => {
      const rect = rects[index];
      const dx = centerX - (rect.left + rect.width / 2);
      const dy = centerY - (rect.top + rect.height / 2);
      card.style.setProperty("--tw-pile-x", `${dx + ((index % 3) - 1) * 5}px`);
      card.style.setProperty("--tw-pile-y", `${dy + (index % 2 ? -4 : 4)}px`);
      card.style.setProperty("--tw-pile-r", `${rotations[index % rotations.length]}deg`);
      card.style.setProperty("--tw-stack-delay", `${index * 55}ms`);
      card.style.zIndex = String(index + 1);
    });

    grid.style.setProperty("--tw-stack-sticky-top", `${Math.max(24, (window.innerHeight - gridRect.height) / 2)}px`);
    grid.classList.add("tw-stack-sticky");
    grid.classList.remove("tw-stack-measuring");
  }

  function updateState() {
    if (mobile.matches || reducedMotion.matches) {
      grid.classList.add("is-spread");
      return;
    }
    const gridTop = grid.getBoundingClientRect().top;
    const trigger = Math.max(90, window.innerHeight * 0.42);
    grid.classList.toggle("is-spread", gridTop <= trigger);
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
})();
