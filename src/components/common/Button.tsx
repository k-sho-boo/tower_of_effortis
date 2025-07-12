import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  className = '',
  type = 'button'
}: ButtonProps) => {
  const baseClass = variant === 'primary' ? 'game-button' : 'game-button-secondary';
  
  const sizeClasses = {
    sm: '!px-4 !py-2 text-sm',
    md: '',
    lg: '!px-8 !py-4 text-lg'
  };

  return (
    <button
      type={type}
      className={`${baseClass} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;