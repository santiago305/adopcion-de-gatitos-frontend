import React from 'react';
import clsx from 'clsx';

interface SectionTitleProps {
  title: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, className }) => {
  return (
    <div className="w-full h-auto">
      <h3 className={clsx("font-cindie-O text-4xl mb-20", className)}>
        {title}
      </h3>
    </div>
  );
};

export default SectionTitle;
