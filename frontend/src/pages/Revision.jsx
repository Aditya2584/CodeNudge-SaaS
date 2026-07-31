import React, { useState, useEffect } from 'react';
import { problemService } from '../services/problem.service';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorState } from '../components/ui/ErrorState';
import { 
  CheckCircle2, 
  Play, 
  CalendarCheck, 
  Flame, 
  Clock, 
  History, 
  Award,
  Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Revision = () => {
  const [queue, setQueue] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [markingId, setMarkingId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(false);
    try {
      const [queueData, historyData] = await Promise.all([
        problemService.getRevisionQueue(),
        problemService.getRevisionHistory(),
      ]);
      setQueue(queueData || []);
      setHistory(historyData || []);
    } catch (err) {
      console.error('Failed to load revision queue:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleMarkComplete = async (id) => {
    setMarkingId(id);
    try {
      await problemService.markRevised(id);
      setQueue((prev) =>
        prev.map((item) => (item.id === id ? { ...item, solved: true } : item))
      );
    } catch (err) {
      console.error('Failed to mark complete:', err);
    } finally {
      setMarkingId(null);
    }
  };

  // Progress Calculations
  const completedCount = queue.filter((q) => q.solved).length;
  const totalCount = queue.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 100;
  const isAllCompleted = totalCount > 0 && completedCount === totalCount;

  // SKELETON LOADING STATE
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
        <div className="h-36 rounded-2xl bg-surface-hover/60 border border-white/[0.08]" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 rounded-2xl bg-surface-hover/60 border border-white/[0.08]" />
          <div className="lg:col-span-1 h-96 rounded-2xl bg-surface-hover/60 border border-white/[0.08]" />
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState onRetry={loadData} title="Failed to load revision queue" />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* HEADER BANNER WITH PROGRESS BAR */}
      <Card variant="glass" className="p-6 sm:p-8 border-primary/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm" icon={CalendarCheck}>
                Daily Revision Queue
              </Badge>
              <Badge variant="secondary" size="sm" icon={Flame}>
                7 Day Streak
              </Badge>
            </div>

            <h1 className="heading-2 text-2xl sm:text-4xl">
              Today's <span className="text-gradient-brand">Revision Schedule</span>
            </h1>

            <p className="text-xs sm:text-sm text-muted">
              Review your scheduled problems before memory decay sets in.
            </p>
          </div>

          {/* PROGRESS BAR WIDGET */}
          <div className="w-full md:w-72 bg-surface/80 p-4 rounded-xl border border-white/[0.08] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">Daily Goal Progress</span>
              <span className="font-mono font-bold text-primary">{progressPercent}%</span>
            </div>

            <div className="w-full bg-white/[0.08] h-2.5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
              />
            </div>

            <p className="text-[11px] text-muted text-right">
              {completedCount} of {totalCount} completed
            </p>
          </div>
        </div>
      </Card>

      {/* COMPLETION CELEBRATION ANIMATION */}
      <AnimatePresence>
        {isAllCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.4 }}
            className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-surface to-surface border border-emerald-500/30 flex items-center justify-between gap-4 shadow-glow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  All Today's Revisions Completed! 🎉
                </h3>
                <p className="text-xs text-muted">
                  Outstanding work! You have strengthened your long-term memory retention for today.
                </p>
              </div>
            </div>
            <Badge variant="success" size="md">
              100% Done
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* TODAY'S REVISION PROBLEMS LIST */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="heading-3">Due Problems</h2>
            <span className="text-xs text-muted font-mono">{queue.length} Queue Items</span>
          </div>

          {queue.length === 0 ? (
            <EmptyState
              title="No Revisions Scheduled"
              description="Your revision queue is empty right now. Solve problems on LeetCode to auto-schedule reviews."
              icon={CalendarCheck}
            />
          ) : (
            queue.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
              >
                <Card
                  variant="glass"
                  className={`p-5 border transition-all duration-200 ${
                    item.solved 
                      ? 'bg-surface/30 border-white/[0.04] opacity-60' 
                      : 'bg-surface-hover/80 border-white/[0.08] hover:border-primary/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {/* QUEUE POSITION BADGE */}
                        <Badge variant="outline" size="sm" className="font-mono">
                          Queue #{item.queuePosition || index + 1}
                        </Badge>
                        <Badge
                          variant={
                            item.difficulty === 'Easy'
                              ? 'easy'
                              : item.difficulty === 'Hard'
                              ? 'hard'
                              : 'medium'
                          }
                          size="sm"
                        >
                          {item.difficulty}
                        </Badge>
                      </div>

                      <h3 className={`text-base font-semibold text-white ${item.solved ? 'line-through text-muted' : ''}`}>
                        {item.number}. {item.title}
                      </h3>

                      <p className="text-xs text-muted flex items-center gap-2">
                        <span>{item.topic}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-muted" /> {item.scheduledTime || 'Due today'}
                        </span>
                      </p>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex items-center gap-2.5 shrink-0">
                      {item.solved ? (
                        <Badge variant="success" size="md" icon={CheckCircle2}>
                          Completed
                        </Badge>
                      ) : (
                        <>
                          <Button
                            variant="secondary"
                            size="sm"
                            isLoading={markingId === item.id}
                            onClick={() => handleMarkComplete(item.id)}
                            leftIcon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                          >
                            Mark Complete
                          </Button>
                          <a href={item.url || 'https://leetcode.com'} target="_blank" rel="noreferrer">
                            <Button
                              variant="primary"
                              size="sm"
                              leftIcon={<Play className="w-3.5 h-3.5" />}
                            >
                              Solve
                            </Button>
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* REVISION HISTORY SIDEBAR */}
        <div className="lg:col-span-1">
          <Card variant="glass" className="h-full flex flex-col justify-between">
            <div>
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <History className="w-4 h-4 text-primary" /> Revision History
                </CardTitle>
                <Badge variant="outline" size="sm">Recent</Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                {history.length === 0 ? (
                  <EmptyState
                    title="No History"
                    description="Completed revisions will be recorded here."
                    icon={History}
                  />
                ) : (
                  history.map((h) => (
                    <div
                      key={h.id}
                      className="p-3.5 rounded-xl bg-background/60 border border-white/[0.04] space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white">
                          #{h.number} {h.title}
                        </span>
                        <Badge
                          variant={
                            h.difficulty === 'Easy'
                              ? 'easy'
                              : h.difficulty === 'Hard'
                              ? 'hard'
                              : 'medium'
                          }
                          size="sm"
                        >
                          {h.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-muted">
                        <span>{h.completedAt}</span>
                        <span className="text-emerald-400 font-mono font-semibold">{h.retentionBoost}</span>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </div>

            {/* Motivational Footer Note */}
            <div className="p-4 rounded-xl bg-surface-hover/60 border border-white/[0.06] mt-6 flex items-center gap-3">
              <Award className="w-6 h-6 text-primary shrink-0" />
              <p className="text-xs text-muted leading-relaxed">
                Consistency is key to mastering technical interviews. Keep reviewing daily!
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Revision;
