import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import useVisibilityAnimation from '@/hooks/useVisibilityAnimation';

interface ParagraphProps {
  children: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ children }) => {
  const { ref, entry } = useVisibilityAnimation();
  const controls = useAnimation();

  useEffect(() => {
    const ratio = entry?.intersectionRatio ?? 0;

    if (ratio >= 0.5) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
      });
    } else {
      controls.start({
        opacity: 0.3,
        y: 20,
        transition: { duration: 0.5, ease: 'easeInOut' },
      });
    }
  }, [entry, controls]);

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={controls}
      className="font-montserrat text-3xl leading-relaxed mb-6"
    >
      {children}
    </motion.p>
  );
};

export default Paragraph;
