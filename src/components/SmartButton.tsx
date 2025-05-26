import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

interface SmartButtonProps {
  text: string;
  onClick?: () => void;
  href?: string;
  to?: string;
  className?: string;
}

const baseClasses = "px-4 py-2 rounded-full border border-black font-montserrat select-none cursor-pointer";

const SmartButton: React.FC<SmartButtonProps> = ({ text, onClick, href, to, className }) => {
  const combinedClassName = clsx(baseClasses, className);

  if (to) {
    return (
      <Link to={to} className={combinedClassName}>
        {text}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClassName} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={combinedClassName}>
      {text}
    </button>
  );
};

export default SmartButton;
