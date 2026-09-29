import type { ReactNode } from "react";
import { motion, type MotionProps } from "motion/react";
import {
  cv2Hover,
  cv2ImageRevealVariants,
  cv2PageVariants,
  cv2RevealVariants,
  cv2TextRevealVariants,
} from "./motion";

type RevealProps = MotionProps & {
  children: ReactNode;
  className?: string;
};

export function CV2PageTransition({ children, className, ...props }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={cv2PageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function CV2Reveal({ children, className, ...props }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={cv2RevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function CV2TextReveal({ children, className, ...props }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={cv2TextRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function CV2ImageReveal({ children, className, ...props }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={cv2ImageRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function CV2Interactive({ children, className, ...props }: RevealProps) {
  return (
    <motion.div
      className={className}
      whileHover={cv2Hover.project}
      whileFocus={{ y: -2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function CV2ImageHover({ children, className, ...props }: RevealProps) {
  return (
    <motion.div className={className} whileHover={cv2Hover.image} {...props}>
      {children}
    </motion.div>
  );
}

export function CV2LinkMotion({ children, className, ...props }: RevealProps) {
  return (
    <motion.span className={className} whileHover={cv2Hover.link} {...props}>
      {children}
    </motion.span>
  );
}
