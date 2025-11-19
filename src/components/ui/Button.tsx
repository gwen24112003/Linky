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
  const baseStyles = 'px-5 py-3 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-2xl';
  
  const variantStyles = {
    primary: 'bg-white text-teal-700 hover:scale-105',
    secondary: 'bg-transparent text-white border-2 border-white hover:bg-white/10 hover:scale-105'
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