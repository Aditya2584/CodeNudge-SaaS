import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, History, Flame, Mail } from 'lucide-react';
import { Badge } from '../ui/Badge';

// TODO: Integrate with backend endpoint GET /api/v1/dashboard/stats

export const StatsCard = ({ stats, loading }) => {
  const cards = [
    {
      id: 'problems-solved',
      title: 'Problems Solved',
      value: stats?.problemsSolved,
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20',
      description: 'Total solved across platforms',
    },
    {
      id: 'revision-queue',
      title: 'Revision Queue',
      value: stats?.queueSize ?? stats?.todayRevision,
      icon: History,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/20',
      description: 'Pending spaced repetition',
    },
    {
      id: 'current-streak',
      title: 'Current Streak',
      value: stats?.currentStreak,
      unit: 'days',
      icon: Flame,
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10 border-rose-500/20',
      description: 'Consecutive active days',
    },
    {
      id: 'emails-sent',
      title: 'Emails Sent',
      value: stats?.emailsSent,
      icon: Mail,
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/10 border-sky-500/20',
      description: 'Automated revision nudges',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
          whileHover={{ y: -2 }}
          className="bg-surface/80 hover:bg-surface-hover border border-surface-border p-4 sm:p-5 rounded-xl transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              {card.title}
            </span>
            <div className={`p-2 rounded-lg border ${card.bgColor} ${card.color}`}>
              <card.icon className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline justify-between">
            {loading ? (
              <div className="w-16 h-8 bg-surface-hover animate-pulse rounded" />
            ) : card.value !== undefined && card.value !== null ? (
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold tracking-tight text-white font-mono">
                  {card.value}
                </span>
                {card.unit && <span className="text-xs text-muted">{card.unit}</span>}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-muted font-mono text-sm">
                <span>--</span>
                <Badge variant="outline" size="sm">
                  Pending API
                </Badge>
              </div>
            )}
          </div>

          <p className="text-[11px] text-muted mt-2 truncate">{card.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCard;
