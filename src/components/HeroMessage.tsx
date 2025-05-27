import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface HeroMessageProps {
  title: string;
  description: string;
  className?: string;
}

const HeroMessage: React.FC<HeroMessageProps> = ({ title, description, className }) => {
  return (
    <motion.div
      className={clsx(
        'flex flex-col justify-center gap-5 p-5 select-none',
        className
      )}
      initial={{ opacity: 0, y: "50%" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      exit={{ opacity: 0, y: "50%" }}
    >
      <h1 className="font-cindie-L text-5xl">{title}</h1>
      <p className="max-w-[750px] font-montserrat text-lg">{description}</p>
    </motion.div>
  );
};

export default HeroMessage;
