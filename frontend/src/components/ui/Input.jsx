import React, { forwardRef } from 'react';

export const Input = forwardRef(({
  label,
  error,
  helperText,
  icon: Icon,
  rightElement,
  type = 'text',
  className = '',
  wrapperClassName = '',
  required = false,
  ...props
}, ref) => {
  return (
    <div className={`w-full ${wrapperClassName}`}>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
          {label} {required && <span className="text-primary">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-muted pointer-events-none flex items-center justify-center">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={`w-full bg-surface/60 border border-white/[0.1] text-white placeholder:text-muted/60 text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl py-2.5 px-4 transition-all duration-200 ${
            Icon ? 'pl-10' : ''
          } ${rightElement ? 'pr-10' : ''} ${
            error ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500' : ''
          } ${className}`}
          required={required}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3.5 flex items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>
      {error ? (
        <p className="mt-1.5 text-xs text-red-400 font-medium">{error}</p>
      ) : helperText ? (
        <p className="mt-1.5 text-xs text-muted">{helperText}</p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
