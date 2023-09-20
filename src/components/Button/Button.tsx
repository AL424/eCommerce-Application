import React from 'react';

interface ButtonProps {
  title: string;
  classList?: string[];
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  classList = [],
  onClick,
  type = 'button',
  disabled = false
}) => {
  const className = `button ${classList?.join(' ')}`.trim();
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};
