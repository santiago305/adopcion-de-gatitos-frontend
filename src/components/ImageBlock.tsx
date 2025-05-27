import React from 'react';
import clsx from 'clsx';

interface ImageBlockProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageBlock: React.FC<ImageBlockProps> = ({
  src,
  alt,
  className,
}) => {
  return (
    <div className={clsx('w-full h-auto select-none flex justify-center items-center', className)}>
      <img
        src={src}
        alt={alt}
        className='w-full h-auto object-cover'
      />
    </div>
  );
};

export default ImageBlock;
