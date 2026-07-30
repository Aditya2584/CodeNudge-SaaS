import React from 'react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick, 
  ...props 
}) => {
  const baseClasses = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  
  return (
    <button 
      className={`${baseClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
