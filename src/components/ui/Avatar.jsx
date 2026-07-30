import React from 'react';

export const Avatar = ({
  src,
  name = '',
  size = 'md',
  status = null, // 'online' | 'offline' | 'busy'
  className = '',
  ...props
}) => {
  const getInitials = (name) => {
    if (!name) return 'CN';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  };

  const statusColors = {
    online: 'bg-emerald-500',
    offline: 'bg-zinc-500',
    busy: 'bg-red-500',
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className="relative inline-block">
      <div
        className={`${selectedSize} rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 border border-white/20 flex items-center justify-center font-bold text-white overflow-hidden shadow-sm ${className}`}
        {...props}
      >
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>
      {status && (
        <span
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background ${
            statusColors[status] || statusColors.online
          }`}
        />
      )}
    </div>
  );
};

export default Avatar;
