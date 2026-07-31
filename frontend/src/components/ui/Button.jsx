import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon = null,
  rightIcon = null,
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  ...props
}) => {
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    danger: 'btn-danger',
    outline: 'bg-transparent border border-white/20 hover:bg-white/5 text-white font-medium rounded-xl transition-all duration-200',
  };

  const sizeClasses = {
    sm: 'text-xs py-1.5 px-3 rounded-lg gap-1.5',
    md: 'text-sm py-2.5 px-5 rounded-xl gap-2',
    lg: 'text-base py-3.5 px-7 rounded-xl gap-2.5 font-semibold',
  };

  const selectedVariant = variantClasses[variant] || variantClasses.primary;
  const selectedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.015 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      type={type}
      className={`${selectedVariant} ${selectedSize} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        leftIcon && <span className="flex items-center">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </motion.button>
  );
};

export default Button;
