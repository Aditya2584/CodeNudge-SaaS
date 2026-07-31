import React from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle2, Clock, AlertCircle, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { EmptyState } from '../ui/EmptyState';
import { useNavigate } from 'react-router-dom';

// Uses GET /revision/today

export const RevisionCard = ({
  revisions = [],
  loading = false,
  error = false,
  onMarkRevised,
  onRetry,
}) => {
  const navigate = useNavigate();

  const pendingCount = revisions.filter((r) => !r.solved && !r.completed).length;
  const completedCount = revisions.filter((r) => r.solved || r.completed).length;
  const isStarted = completedCount > 0 && pendingCount > 0;

  // Breakdown of difficulties in today's queue
  const easyCount = revisions.filter((r) => r.difficulty?.toLowerCase() === 'easy').length;
  const mediumCount = revisions.filter((r) => r.difficulty?.toLowerCase() === 'medium').length;
  const hardCount = revisions.filter((r) => r.difficulty?.toLowerCase() === 'hard').length;

  if (loading) {
    return (
      <Card variant="glass" className="space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-surface-border">
          <div className="w-48 h-6 bg-surface-hover animate-pulse rounded" />
          <div className="w-20 h-6 bg-surface-hover animate-pulse rounded" />
        </div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-surface-hover/60 border border-surface-border animate-pulse rounded-xl" />
          ))}
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card variant="glass" className="p-6 text-center space-y-3 border-red-500/20">
        <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
        <h4 className="text-sm font-semibold text-white">Failed to load Today's Revision</h4>
        <p className="text-xs text-muted">Unable to reach endpoint GET /revision/today</p>
        {onRetry && (
          <Button variant="secondary" size="sm" onClick={onRetry}>
            Retry
          </Button>
        )}
      </Card>
    );
  }

  return (
    <Card variant="glass" className="border-primary/20 bg-surface/90 shadow-md">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle>Today's Revision Queue</CardTitle>
            <Badge variant="primary" size="sm">
              {pendingCount} Pending
            </Badge>
          </div>
          <p className="text-xs text-muted mt-1">
            spaced repetition schedule based on your memory retention curve
          </p>
        </div>

        {/* Difficulty Breakdown & Action buttons */}
        <div className="flex items-center gap-2">
          {easyCount > 0 && <Badge variant="easy" size="sm">{easyCount} Easy</Badge>}
          {mediumCount > 0 && <Badge variant="medium" size="sm">{mediumCount} Med</Badge>}
          {hardCount > 0 && <Badge variant="hard" size="sm">{hardCount} Hard</Badge>}

          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/revision')}
            leftIcon={<Play className="w-3.5 h-3.5" />}
          >
            {isStarted ? 'Continue Session' : 'Start Revision'}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {revisions.length === 0 ? (
          <EmptyState
            title="No Revisions Scheduled Today"
            description="Your revision queue is clear! Solve new problems or check back tomorrow."
            icon={CheckCircle2}
          />
        ) : (
          revisions.map((item, index) => {
            const isDone = item.solved || item.completed;
            const difficultyVariant =
              item.difficulty?.toLowerCase() === 'hard'
                ? 'hard'
                : item.difficulty?.toLowerCase() === 'medium'
                ? 'medium'
                : 'easy';

            return (
              <motion.div
                key={item.id || item._id || index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={`p-3.5 rounded-xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isDone
                    ? 'bg-surface/30 border-surface-border opacity-50'
                    : 'bg-surface-hover/80 border-surface-border hover:border-primary/40'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-semibold text-muted">
                      #{item.number || index + 1}
                    </span>
                    <h4 className={`text-xs font-semibold text-white ${isDone ? 'line-through text-muted' : ''}`}>
                      {item.title || item.name || 'Untitled Problem'}
                    </h4>
                    <Badge variant={difficultyVariant} size="sm">
                      {item.difficulty || 'Medium'}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-muted">
                    {item.topic && <span>{item.topic}</span>}
                    {item.topic && <span>•</span>}
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-muted" /> Scheduled Today
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {isDone ? (
                    <Badge variant="success" size="md" icon={CheckCircle2}>
                      Done
                    </Badge>
                  ) : (
                    <>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-muted hover:text-white px-2.5 py-1.5 rounded-lg bg-surface hover:bg-surface-hover border border-surface-border transition-colors"
                        >
                          <span>Solve</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onMarkRevised && onMarkRevised(item.id || item._id)}
                        leftIcon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      >
                        Mark Revised
                      </Button>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};

export default RevisionCard;
