import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, RefreshCw } from 'lucide-react';

export const DashboardHeader = ({ user, loading, onSync }) => {
  // Determine greeting based on current hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Formatted date string (e.g., "Friday, July 31, 2026")
  const currentDateFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  const displayName = user?.name || user?.username || user?.email?.split('@')[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-surface/80 border border-surface-border rounded-xl p-5 sm:p-6 shadow-sm"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* User Greeting & Info */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Calendar className="w-3.5 h-3.5" />
            <span>{currentDateFormatted}</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            {getGreeting()},{' '}
            {loading ? (
              <span className="inline-block w-32 h-6 bg-surface-hover animate-pulse rounded" />
            ) : (
              <span className="text-primary">{displayName || 'Engineer'}</span>
            )}
          </h1>

          <p className="text-xs text-muted">
            Track your spaced repetition queue and maintain problem-solving retention.
          </p>
        </div>

        {/* Header Metadata / Sync status */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          {user?.leetcodeUsername && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-hover border border-surface-border text-xs text-muted">
              <User className="w-3.5 h-3.5 text-accent" />
              <span>LeetCode: <strong className="text-white">{user.leetcodeUsername}</strong></span>
            </div>
          )}

          {onSync && (
            <button
              onClick={onSync}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-hover hover:bg-white/[0.08] border border-surface-border text-xs font-medium text-white transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-muted" />
              <span>Sync Status</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;
