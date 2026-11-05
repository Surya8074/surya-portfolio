(() => {
  "use strict";
  const SECTION_SELECTOR = "#tools-workflow .tw-workflow";
  const DESKTOP_QUERY = "(min-width: 1024px)";
  const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
  const REVEAL_POINTS = [0.02, 0.26, 0.50, 0.74];
  const SCROLL_DISTANCE = 560;
  let workflow, stageList, stages = [], initialized = false, frameQueued = false;
  let documentTop = 0, stickyTop = 0, animationRange = SCROLL_DISTANCE;
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
    const oldPosition = stageList.style.position;
    const oldTop = stageList.style.top;
    stageList.style.position = "relative";
    stageList.style.top = "auto";
    documentTop = window.scrollY + stageList.getBoundingClientRect().top;
    stageList.style.position = oldPosition;
    stageList.style.top = oldTop;
    stickyTop = Math.round(window.innerHeight * 0.30);
    animationRange = SCROLL_DISTANCE;
    const runway = animationRange + stickyTop + stageList.offsetHeight + 100;
    workflow.style.paddingBottom = runway + "px";
  }

  function update() {
    if (!initialized) return;
    if (!desktop.matches || reducedMotion.matches) {
      stages.forEach(card => card.classList.add("is-visible"));
      return;
    }
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
  function onResize() { if (!initialized) return; measure(); queueUpdate(); }
  function start() {
    if (setup()) return;
    const observer = new MutationObserver(() => { if (setup()) observer.disconnect(); });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();