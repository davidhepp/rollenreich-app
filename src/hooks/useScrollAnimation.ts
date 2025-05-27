import { useInView } from "framer-motion";
import { useRef } from "react";

interface UseScrollAnimationOptions {
  amount?: number;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const ref = useRef(null);
  const { amount = 0.1, triggerOnce = true } = options;

  const isInView = useInView(ref, {
    amount,
    once: triggerOnce,
  });

  return {
    ref,
    isInView,
    animate: isInView ? "visible" : "hidden",
  };
};
