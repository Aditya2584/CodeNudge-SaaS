import React from 'react';

export const Card = ({ children, className = '', variant = 'glass-card' }) => {
  return (
    <div className={`${variant} ${className}`}>
      {children}
    </div>
  );
};
