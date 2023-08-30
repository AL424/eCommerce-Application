import React from 'react';

interface ButtonProps {
  title: string;
  classList?: string[];
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  classList,
  onClick
}) => {
  const className = `button ${classList?.join(' ')}`;
  return (
    <button type="button" className={className} onClick={onClick}>
      {title}
    </button>
  );
};
