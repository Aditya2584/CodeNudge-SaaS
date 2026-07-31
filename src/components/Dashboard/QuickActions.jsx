import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Play, BookOpen, User, Settings, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const QuickActions = ({ onSync }) => {
  const navigate = useNavigate();

  const actions = [
    {
      label: "Sync Problems",
      icon: RefreshCw,
      onClick: onSync || (() => navigate('/problems')),
      variant: "primary",
    },
    {
      label: "Today's Revision",
      icon: Play,
      onClick: () => navigate('/revision'),
      variant: "secondary",
    },
    {
      label: "Problems",
      icon: BookOpen ,
      onClick: () => navigate('/problems'),
      variant: "outline",
    },
    {
      label: "Profile",
      icon: User,
      onClick: () => navigate('/settings'),
      variant: "outline",
    },
    {
      label: "Settings",
      icon: Settings,
      onClick: () => navigate('/settings'),
      variant: "outline",
    },
  ];

  return (
    <div className="bg-surface/80 border border-surface-border rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-3.5 h-3.5 text-accent" />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">
          Quick Actions
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {actions.map((action) => (
          <motion.button
            key={action.label}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={action.onClick}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-hover hover:bg-white/[0.08] border border-surface-border text-xs font-medium text-white transition-all shadow-sm"
          >
            <action.icon className="w-3.5 h-3.5 text-muted" />
            <span>{action.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
