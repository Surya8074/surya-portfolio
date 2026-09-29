import Lenis from "@studio-freight/lenis";

export type CV2ScrollController = {
  lenis: Lenis;
  destroy: () => void;
};

export function createCV2ScrollController(): CV2ScrollController {
  const lenis = new Lenis({
    duration: 1.05,
    smoothWheel: true,
    touchMultiplier: 1,
  });

  let frame = 0;
  const raf = (time: number) => {
    lenis.raf(time);
    frame = requestAnimationFrame(raf);
  };

  frame = requestAnimationFrame(raf);

  return {
    lenis,
    destroy() {
      cancelAnimationFrame(frame);
      lenis.destroy();
    },
  };
}
