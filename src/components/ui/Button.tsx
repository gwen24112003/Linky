import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick,
  className = '' 
}) => {
  const baseStyles = 'px-7 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:shadow-lg';
  
  const variantStyles = {
    primary: 'bg-white text-teal-700 hover:bg-gray-50',
    secondary: 'bg-transparent text-white border-2 border-white hover:bg-white/10'
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};