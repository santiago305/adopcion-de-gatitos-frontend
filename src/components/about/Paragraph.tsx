import { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface ParagraphProps {
  children: string;
  position: 'above' | 'visible' | 'below';
}

const getVariants = (position: ParagraphProps['position']) => {
  switch (position) {
    case 'visible':
      return { opacity: 1, y: 0 };
    case 'above':
      return { opacity: 0.3, y: -20 };
    case 'below':
      return { opacity: 0.3, y: 20 };
    default:
      return {};
  }
};

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ children, position }, ref) => {
    return (
      <motion.p
        ref={ref}
        animate={getVariants(position)}
        initial={{ opacity: 0.3, y: 20 }}
        transition={{ duration: 0.4 }}
        className="font-montserrat text-2xl md:text-3xl leading-relaxed mb-6"
      >
        {children}
      </motion.p>
    );
  }
);

export default Paragraph;
