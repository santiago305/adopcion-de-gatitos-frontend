import React from 'react';
import clsx from 'clsx';

interface SidebarStickyProps extends React.ComponentProps<'div'> {
  imageSrc: string;
  imageAlt: string;
  className?: string;
}

const SidebarSticky: React.FC<SidebarStickyProps> = ({
  imageSrc,
  imageAlt,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'sticky top-0 h-screen w-1/5 z-10 flex-col justify-end',
        className
      )}
      {...props}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full object-contain"
      />
    </div>
  );
};

export default SidebarSticky;
