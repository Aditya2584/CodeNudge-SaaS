import React from 'react';

export const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon = null,
  className = '',
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-primary/15 text-primary border-primary/30',
    secondary: 'bg-secondary/15 text-secondary border-secondary/30',
    accent: 'bg-accent/15 text-accent border-accent/30',
    outline: 'bg-transparent text-muted border-white/20',
    success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    danger: 'bg-red-500/15 text-red-400 border-red-500/30',
    info: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    easy: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    hard: 'bg-red-500/15 text-red-400 border-red-500/30',
  };

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 rounded-md gap-1 font-semibold uppercase tracking-wider',
    md: 'text-xs px-2.5 py-1 rounded-lg gap-1.5 font-medium',
  };

  const selectedVariant = variantClasses[variant] || variantClasses.primary;
  const selectedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <span
      className={`inline-flex items-center border ${selectedVariant} ${selectedSize} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-3 h-3" />}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
