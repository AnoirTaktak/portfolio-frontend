import { useScroll, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-blue-500 to-cyan-400 origin-left z-[999]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
