import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
  children,
  className = '',
  variant = 'glass',
  hoverEffect = false,
  onClick,
  ...props
}) => {
  const variantClasses = {
    glass: 'bg-surface/90 backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 shadow-surface',
    glow: 'bg-surface/90 backdrop-blur-md border border-primary/30 shadow-glow rounded-2xl p-6',
    solid: 'bg-surface border border-surface-border rounded-2xl p-6',
    interactive: 'bg-surface/80 hover:bg-surface-hover backdrop-blur-md border border-white/[0.08] hover:border-primary/40 transition-all duration-300 rounded-2xl p-6 cursor-pointer shadow-surface',
    'glass-card': 'bg-surface/90 backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 shadow-surface', // backwards-compat
  };

  const selectedVariant = variantClasses[variant] || variantClasses.glass;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hoverEffect || variant === 'interactive' ? { y: -2, transition: { duration: 0.2 } } : {}}
      className={`${selectedVariant} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`heading-3 ${className}`}>{children}</h3>
);

export const CardDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-muted mt-1 ${className}`}>{children}</p>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`pt-4 border-t border-white/[0.06] mt-4 flex items-center justify-between ${className}`}>
    {children}
  </div>
);

export default Card;
