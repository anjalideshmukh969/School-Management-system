import { motion } from "framer-motion";

/**
 * Scroll-triggered fade + slide-up wrapper. Animates once when the element
 * enters the viewport (not on every scroll pass — reads as intentional,
 * not jittery). `delay` lets sibling elements stagger slightly.
 */
const FadeIn = ({ children, delay = 0, className = "", y = 24 }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default FadeIn;
