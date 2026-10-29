(() => {
  "use strict";

  const SECTION_SELECTOR = "#tools-workflow .tw-workflow";
  const DESKTOP_QUERY = "(min-width: 1024px)";
  const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
  const POP_THRESHOLDS = [0.14, 0.37, 0.60, 0.83];
  const ROTATIONS = [-7, 5, -3, 6];
  const RANGE = 680;

  let workflow;
  let stageList;
  let stages = [];
  let initialized = false;
  let frameQueued = false;
  let documentTop = 0;

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

    if (desktop.matches && !reducedMotion.matches) {
      measure();
    } else {
      stages.forEach((stage) => stage.classList.add("is-popped"));
    }

    update();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    desktop.addEventListener?.("change", onResize);
    reducedMotion.addEventListener?.("change", onResize);
    return true;
  }

  function measure() {
    if (!stageList || !stages.length || !desktop.matches || reducedMotion.matches) {
      workflow?.style.removeProperty("--tw-stage-sticky-top");
      stages.forEach((stage) => {
        stage.style.removeProperty("--tw-stage-pile-x");
        stage.style.removeProperty("--tw-stage-pile-y");
        stage.style.removeProperty("--tw-stage-pile-r");
        stage.style.removeProperty("--tw-stage-delay");
        stage.classList.add("is-popped");
      });
      return;
    }

    stages.forEach((stage) => stage.classList.remove("is-popped"));
    stageList.classList.add("tw-stage-measuring");
    void stageList.offsetWidth;

    const rect = stageList.getBoundingClientRect();
    const centers = stages.map((stage) => {
      const box = stage.getBoundingClientRect();
      return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
    });
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    stages.forEach((stage, index) => {
      stage.style.setProperty("--tw-stage-pile-x", `${centerX - centers[index].x}px`);
      stage.style.setProperty("--tw-stage-pile-y", `${centerY - centers[index].y}px`);
      stage.style.setProperty("--tw-stage-pile-r", `${ROTATIONS[index]}deg`);
      stage.style.setProperty("--tw-stage-delay", `${index * 35}ms`);
      stage.style.zIndex = String(stages.length - index);
    });

    const stickyTop = Math.max(28, Math.round(window.innerHeight * 0.34));
    stageList.style.setProperty("--tw-stage-sticky-top", `${stickyTop}px`);
    documentTop = window.scrollY + stageList.getBoundingClientRect().top;
    stageList.classList.remove("tw-stage-measuring");
  }

  function update() {
    if (!initialized) return;

    if (!desktop.matches || reducedMotion.matches) {
      stages.forEach((stage) => stage.classList.add("is-popped"));
      return;
    }

    const stickyTop = Math.max(28, Math.round(window.innerHeight * 0.34));
    const startScroll = documentTop - stickyTop;
    const progress = Math.max(0, Math.min(1, (window.scrollY - startScroll) / RANGE));

    stages.forEach((stage, index) => {
      stage.classList.toggle("is-popped", progress >= POP_THRESHOLDS[index]);
    });
  }

  function queueUpdate() {
    if (frameQueued) return;
    frameQueued = true;
    window.requestAnimationFrame(() => {
      frameQueued = false;
      update();
    });
  }

  function onResize() {
    if (!initialized) return;
    measure();
    queueUpdate();
  }

  function start() {
    if (setup()) return;
    const observer = new MutationObserver(() => {
      if (setup()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
