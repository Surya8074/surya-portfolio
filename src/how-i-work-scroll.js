(() => {
  "use strict";
  const SECTION_SELECTOR = "#tools-workflow .tw-workflow";
  const DESKTOP_QUERY = "(min-width: 1024px)";
  const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
  const REVEAL_POINTS = [0.08, 0.32, 0.56, 0.80];
  let workflow, stageList, stages = [], initialized = false, frameQueued = false;
  let documentTop = 0, animationRange = 0;
  const desktop = window.matchMedia(DESKTOP_QUERY);
  const reducedMotion = window.matchMedia(REDUCED_QUERY);

  function setup() {
    if (initialized) return true;
    workflow = document.querySelector(SECTION_SELECTOR);
    stageList = workflow && workflow.querySelector(".tw-stages");
    stages = stageList ? [...stageList.querySelectorAll(":scope > .tw-stage")] : [];
    if (!workflow || !stageList || stages.length !== 4) return false;
    initialized = true;
    workflow.classList.add("tw-workflow-scroll-enhanced");
    measure();
    update();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    desktop.addEventListener?.("change", onResize);
    reducedMotion.addEventListener?.("change", onResize);
    return true;
  }

  function measure() {
    if (!workflow || !stageList) return;
    if (!desktop.matches || reducedMotion.matches) {
      workflow.style.paddingBottom = "0";
      stages.forEach(card => card.classList.add("is-visible"));
      return;
    }
    stages.forEach(card => card.classList.remove("is-visible"));
    const previous = stageList.style.position;
    stageList.style.position = "relative";
    documentTop = window.scrollY + stageList.getBoundingClientRect().top;
    stageList.style.position = previous;
    animationRange = Math.round(window.innerHeight * 1.45);
    // Keep the sticky row pinned for the complete reveal sequence, then release it.
    workflow.style.paddingBottom = "190vh";
  }

  function update() {
    if (!initialized) return;
    if (!desktop.matches || reducedMotion.matches) {
      stages.forEach(card => card.classList.add("is-visible"));
      return;
    }
    const stickyTop = Math.round(window.innerHeight * .30);
    const progress = Math.max(0, Math.min(1,
      (window.scrollY - (documentTop - stickyTop)) / animationRange
    ));
    stages.forEach((card, index) => {
      card.classList.toggle("is-visible", progress >= REVEAL_POINTS[index]);
    });
  }

  function queueUpdate() {
    if (frameQueued) return;
    frameQueued = true;
    window.requestAnimationFrame(() => { frameQueued = false; update(); });
  }
  function onResize() { measure(); queueUpdate(); }
  function start() {
    if (setup()) return;
    const observer = new MutationObserver(() => { if (setup()) observer.disconnect(); });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();