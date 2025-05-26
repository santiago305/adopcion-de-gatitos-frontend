import React from 'react';
import clsx from 'clsx';

interface HeroMessageProps {
  title: string;
  description: string;
  className?: string;
}

const HeroMessage: React.FC<HeroMessageProps> = ({ title, description, className }) => {
  return (
    <div
      className={clsx(
        'flex flex-col justify-center gap-5 p-5 select-none',
        className
      )}
    >
      <h1 className="font-cindie-L text-5xl">{title}</h1>
      <p className="max-w-[750px] font-montserrat text-lg">{description}</p>
    </div>
  );
};

export default HeroMessage;
