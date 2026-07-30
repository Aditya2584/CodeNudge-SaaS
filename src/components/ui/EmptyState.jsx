import React from 'react';
import { FolderOpen } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = FolderOpen,
  title = 'No items found',
  description = 'There is nothing to display right now.',
  action = null,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-dashed border-white/[0.1] rounded-2xl bg-surface/30 ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-surface/80 border border-white/[0.08] flex items-center justify-center text-muted mb-4 shadow-sm">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="heading-3 mb-2">{title}</h3>
      <p className="text-sm text-muted max-w-sm mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
