import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, ExternalLink, Code2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { EmptyState } from '../ui/EmptyState';

// TODO: Integrate with backend endpoint GET /api/v1/submissions/recent

export const RecentProblems = ({ problems = [], loading = false }) => {
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
          <CardTitle className="text-base font-semibold">Recent Accepted Problems</CardTitle>
          <p className="text-xs text-muted">Latest synchronized submissions from extension</p>
        </div>
        <Badge variant="outline" size="sm" icon={Code2}>
          Auto-Synced
        </Badge>
      </CardHeader>

      <CardContent>
        {problems.length === 0 ? (
          <EmptyState
            title="No Recent Submissions"
            description="Install the CodeNudge extension to automatically sync your accepted LeetCode solutions."
            icon={CheckCircle2}
          />
        ) : (
          <div className="space-y-2.5">
            {problems.map((problem, index) => {
              const difficultyVariant =
                problem.difficulty?.toLowerCase() === 'hard'
                  ? 'hard'
                  : problem.difficulty?.toLowerCase() === 'medium'
                  ? 'medium'
                  : 'easy';

              return (
                <motion.div
                  key={problem.id || index}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.04 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-surface-hover/60 border border-surface-border hover:border-white/15 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-xs font-semibold text-white">
                          {problem.name || problem.title || 'Untitled Problem'}
                        </h5>
                        <Badge variant={difficultyVariant} size="sm">
                          {problem.difficulty || 'Easy'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-muted mt-0.5">
                        <span>{problem.platform || 'LeetCode'}</span>
                        {problem.submittedAt && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" /> {problem.submittedAt}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {problem.url && (
                    <a
                      href={problem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-muted hover:text-white rounded-lg hover:bg-surface transition-colors"
                      title="Open problem link"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentProblems;
