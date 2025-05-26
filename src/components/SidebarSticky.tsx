import React from 'react';

interface SidebarProps {
  imageSrc: string;
  imageAlt: string;
}

const SidebarSticky: React.FC<SidebarProps> = ({ imageSrc, imageAlt }) => {
  return (
    <div className="sticky top-0 h-screen w-1/5 z-10 flex flex-col justify-end">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full object-contain"
      />
    </div>
  );
};

export default SidebarSticky;
