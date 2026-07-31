import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, ListOrdered, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { EmptyState } from '../ui/EmptyState';

// TODO: Integrate with backend endpoint GET /api/v1/revision/upcoming

export const UpcomingQueue = ({ queue = [], loading = false }) => {
  if (loading) {
    return (
      <Card variant="glass" className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-surface-border">
          <div className="w-40 h-5 bg-surface-hover animate-pulse rounded" />
        </div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-surface-hover/60 border border-surface-border animate-pulse rounded-lg" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card variant="glass">
      <CardHeader className="flex items-center justify-between pb-3">
        <div>
          <CardTitle className="text-base font-semibold">Upcoming Revisions</CardTitle>
          <p className="text-xs text-muted">Queued problems for upcoming intervals</p>
        </div>
        <Badge variant="outline" size="sm" icon={ListOrdered}>
          Queue ({queue.length})
        </Badge>
      </CardHeader>

      <CardContent>
        {queue.length === 0 ? (
          <EmptyState
            title="Queue Clear"
            description="No upcoming revisions scheduled in your queue."
            icon={Clock}
          />
        ) : (
          <div className="space-y-2.5">
            {queue.map((item, index) => {
              const position = item.queuePosition || index + 1;
              const difficultyVariant =
                item.difficulty?.toLowerCase() === 'hard'
                  ? 'hard'
                  : item.difficulty?.toLowerCase() === 'medium'
                  ? 'medium'
                  : 'easy';

              return (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.04 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-surface-hover/60 border border-surface-border hover:border-white/15 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-surface border border-surface-border flex items-center justify-center text-xs font-mono font-bold text-muted">
                      #{position}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-xs font-semibold text-white">
                          {item.name || item.title || 'Untitled Problem'}
                        </h5>
                        <Badge variant={difficultyVariant} size="sm">
                          {item.difficulty || 'Medium'}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-muted flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3 text-muted" />
                        <span>Expected: {item.expectedRevision || item.scheduledTime || 'Tomorrow'}</span>
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-muted" />
                </motion.div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingQueue;
