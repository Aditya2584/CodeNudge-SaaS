import React from 'react';
import { Loader2, Code2 } from 'lucide-react';

export const Loader = ({
  fullPage = false,
  size = 'md',
  text = 'Loading...',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  if (fullPage) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary animate-pulse">
            <Code2 className="w-8 h-8" />
          </div>
          <div className="absolute inset-0 rounded-2xl border-2 border-primary border-t-transparent animate-spin" />
        </div>
        <p className="text-sm font-medium text-muted animate-pulse-subtle">{text}</p>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 text-muted ${className}`}>
      <Loader2 className={`${selectedSize} animate-spin text-primary`} />
      {text && <span className="text-sm font-medium">{text}</span>}
    </div>
  );
};

export default Loader;
