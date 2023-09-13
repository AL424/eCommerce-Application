import React from 'react';

interface ButtonProps {
  title: string;
  classList?: string[];
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export const Button: React.FC<ButtonProps> = ({
  title,
  classList = [],
  onClick,
  type = 'button'
}) => {
  const className = `button ${classList?.join(' ')}`.trim();
  return (
    <button type={type} className={className} onClick={onClick}>
      {title}
    </button>
  );
};
