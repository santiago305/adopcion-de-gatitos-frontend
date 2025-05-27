import React from 'react';
import clsx from 'clsx';
import SmartButton from '@/components/SmartButton';

interface TextBlockWithButtonProps {
  paragraphs: string[];
  buttonText: string;
  buttonTo: string;
  className?: string;
}

const TextBlockWithButton: React.FC<TextBlockWithButtonProps> = ({
  paragraphs,
  buttonText,
  buttonTo,
  className,
}) => {
  return (
    <div className={clsx('flex-1 flex flex-col', className)}>
      {paragraphs.map((text, idx) => (
        <p
          key={idx}
          className="font-montserrat text-lg leading-relaxed mb-6"
        >
          {text}
        </p>
      ))}

      <div className="w-full h-auto mt-10">
        <SmartButton
          className="bg-secondary mt-5"
          text={buttonText}
          to={buttonTo}
        />
      </div>
    </div>
  );
};

export default TextBlockWithButton;
