/* CV4.8 — lightweight runtime polish */
const initCV4Polish = () => {
  const root = document.querySelector('.cv4-page');
  if (!root) return;

  // Decode images as soon as they enter the viewport, then release layout pressure.
  const images = Array.from(root.querySelectorAll('img'));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        if (img instanceof HTMLImageElement) {
          img.decode?.().catch(() => {});
          img.setAttribute('data-ready', 'true');
        }
        obs.unobserve(img);
      });
    }, { rootMargin: '300px 0px' });
    images.forEach((img) => observer.observe(img));
  } else {
    images.forEach((img) => img.decode?.().catch(() => {}));
  }

  // Keep the gallery's tab semantics predictable for keyboard users.
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('.cv4-accordion-gallery button[role="tab"]'));
  tabs.forEach((tab, index) => {
    tab.setAttribute('aria-controls', 'comski-screen-panel');
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      tabs[next]?.focus();
      tabs[next]?.click();
    });
  });

  // Avoid an expensive cursor loop when the document is hidden.
  const cursor = root.querySelector<HTMLElement>('.cv4-glow-cursor');
  if (cursor) {
    document.addEventListener('visibilitychange', () => {
      cursor.style.display = document.hidden ? 'none' : '';
    });
  }

  // Give the browser a stable viewport after font/image/layout changes.
  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(() => {
      window.dispatchEvent(new Event('cv4:layoutchange'));
    });
    ro.observe(root);
    return () => ro.disconnect();
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCV4Polish, { once: true });
} else {
  initCV4Polish();
}
