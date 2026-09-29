import { cubicBezier, type Transition, type Variants } from "motion/react";

export const cv2Easing = {
  standard: cubicBezier(0.2, 0.65, 0.3, 1),
  smooth: cubicBezier(0.22, 1, 0.36, 1),
  emphasized: cubicBezier(0.16, 1, 0.3, 1),
} as const;

export const cv2Motion = {
  duration: {
    fast: 0.18,
    normal: 0.42,
    slow: 0.72,
  },
  distance: {
    small: 10,
    medium: 22,
    large: 42,
  },
  transition: {
    fast: { duration: 0.18, ease: cv2Easing.standard },
    normal: { duration: 0.42, ease: cv2Easing.smooth },
    slow: { duration: 0.72, ease: cv2Easing.emphasized },
  } satisfies Record<"fast" | "normal" | "slow", Transition>,
} as const;

export const cv2RevealVariants: Variants = {
  hidden: { opacity: 0, y: cv2Motion.distance.medium },
  visible: {
    opacity: 1,
    y: 0,
    transition: cv2Motion.transition.normal,
  },
};

export const cv2ImageRevealVariants: Variants = {
  hidden: { opacity: 0, scale: 1.025, clipPath: "inset(0 0 8% 0)" },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: cv2Motion.transition.slow,
  },
};

export const cv2TextRevealVariants: Variants = {
  hidden: { opacity: 0, y: cv2Motion.distance.small },
  visible: {
    opacity: 1,
    y: 0,
    transition: cv2Motion.transition.normal,
  },
};

export const cv2PageVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: cv2Easing.smooth },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.24, ease: cv2Easing.standard },
  },
};

export const cv2Hover = {
  project: {
    y: -3,
    transition: cv2Motion.transition.fast,
  },
  image: {
    scale: 1.012,
    transition: cv2Motion.transition.normal,
  },
  link: {
    x: 3,
    transition: cv2Motion.transition.fast,
  },
} as const;
