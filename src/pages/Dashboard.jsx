import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboard.service';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorState } from '../components/ui/ErrorState';
import { 
  Play, 
  CheckCircle2, 
  Mail, 
  History, 
  Flame, 
  Clock,
  ArrowUpRight,
  Plus,
  RefreshCw,
  FolderOpen
} from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [revisions, setRevisions] = useState([
    {
      id: 1,
      title: '146. LRU Cache',
      difficulty: 'Medium',
      topic: 'Hash Table & Doubly Linked List',
      decayRisk: 'Medium',
      scheduled: 'Scheduled 2h ago',
      solved: false,
    },
    {
      id: 2,
      title: '56. Merge Intervals',
      difficulty: 'Medium',
      topic: 'Sorting & Arrays',
      decayRisk: 'Low',
      scheduled: 'Scheduled today',
      solved: false,
    },
    {
      id: 3,
      title: '76. Minimum Window Substring',
      difficulty: 'Hard',
      topic: 'Sliding Window',
      decayRisk: 'High',
      scheduled: 'High Decay Risk',
      solved: false,
    },
  ]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadDashboardData = async () => {
    setLoading(true);
    setError(false);
    try {
      const [statsData, activityData] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getRecentActivity ? dashboardService.getRecentActivity() : Promise.resolve([])
      ]);
      setStats(statsData);
      setActivities(activityData || []);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleMarkRevised = (id) => {
    setRevisions((prev) => prev.map((item) => (item.id === id ? { ...item, solved: true } : item)));
  };

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  };

  // SKELETON LOADING STATE
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
        {/* Banner Skeleton */}
        <div className="h-44 rounded-2xl bg-surface-hover/60 border border-white/[0.08]" />

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-surface-hover/60 border border-white/[0.08]" />
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 rounded-2xl bg-surface-hover/60 border border-white/[0.08]" />
          <div className="lg:col-span-1 h-96 rounded-2xl bg-surface-hover/60 border border-white/[0.08]" />
        </div>
      </div>
    );
  }

  // ERROR STATE
  if (error) {
    return <ErrorState onRetry={loadDashboardData} title="Failed to load dashboard statistics" />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto space-y-8"
    >
      {/* 1. WELCOME CARD BANNER */}
      <motion.div variants={itemVariants}>
        <Card variant="glass" className="relative overflow-hidden p-6 sm:p-8 border-primary/30 shadow-2xl">
          {/* Subtle Ambient Background Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <Badge variant="primary" size="sm" icon={Flame}>
                  {stats?.currentStreak || 0} Day Streak Active
                </Badge>
                <Badge variant="outline" size="sm">
                  {stats?.recentSync ? `Synced ${stats.recentSync}` : 'Sync Ready'}
                </Badge>
              </div>

              <h1 className="heading-2 text-2xl sm:text-4xl">
                Welcome back, <span className="text-gradient-brand">LeetCoder!</span>
              </h1>

              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                You have <span className="text-white font-semibold">{stats?.todayRevision || 0} revisions</span> scheduled today. Complete them now to maintain your retention memory curve.
              </p>
            </div>

            {/* 8. QUICK ACTIONS */}
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" size="sm" leftIcon={<Play className="w-3.5 h-3.5" />}>
                Start Session
              </Button>
              <Button variant="secondary" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
                Sync Extension
              </Button>
              <Button variant="ghost" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                Add Problem
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* METRIC CARDS GRID */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* 3. Problems Solved */}
        <Card variant="glass" hoverEffect className="relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">Problems Solved</span>
            <div className="p-2 bg-primary/10 rounded-xl text-primary border border-primary/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {stats?.problemsSolved || 0}
            </span>
            <span className="text-[11px] text-emerald-400 font-medium flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +12% this week
            </span>
          </div>
        </Card>

        {/* 4. Revision Queue */}
        <Card variant="glass" hoverEffect className="relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">Revision Queue</span>
            <div className="p-2 bg-accent/10 rounded-xl text-accent border border-accent/20">
              <History className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {stats?.queueSize || 0}
            </span>
            <span className="text-[11px] text-muted font-medium">Pending Review</span>
          </div>
        </Card>

        {/* 6. Current Streak */}
        <Card variant="glass" hoverEffect className="relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">Current Streak</span>
            <div className="p-2 bg-secondary/10 rounded-xl text-secondary border border-secondary/20">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {stats?.currentStreak || 0} <span className="text-sm font-normal text-muted">days</span>
            </span>
            <Badge variant="secondary" size="sm">Personal Best</Badge>
          </div>
        </Card>

        {/* 5. Emails Sent */}
        <Card variant="glass" hoverEffect className="relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">Nudges Sent</span>
            <div className="p-2 bg-sky-500/10 rounded-xl text-sky-400 border border-sky-500/20">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {stats?.emailsSent || 0}
            </span>
            <span className="text-[11px] text-muted">Auto Reminders</span>
          </div>
        </Card>
      </motion.div>

      {/* MAIN TWO COLUMN SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2. TODAY'S REVISION QUEUE & 9. RECENT PROBLEMS */}
        <div className="lg:col-span-2 space-y-8">
          {/* Today's Revision Queue */}
          <motion.div variants={itemVariants}>
            <Card variant="glass" className="flex flex-col">
              <CardHeader className="flex items-center justify-between">
                <div>
                  <CardTitle>Today's Revision Queue</CardTitle>
                  <p className="text-xs text-muted mt-1">Review these problems before retention memory degrades.</p>
                </div>
                <Badge variant="primary" size="md">
                  {revisions.filter((r) => !r.solved).length} Due Today
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                {revisions.length === 0 ? (
                  /* 11. Empty State */
                  <EmptyState
                    title="No Revisions Due Today"
                    description="Great job! Your revision queue is clear for today. Keep solving on LeetCode."
                    icon={CheckCircle2}
                  />
                ) : (
                  revisions.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.005 }}
                      className={`p-4 rounded-xl border transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                        item.solved 
                          ? 'bg-surface/30 border-white/[0.04] opacity-60' 
                          : 'bg-surface-hover/80 border-white/[0.08] hover:border-primary/40'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className={`text-sm font-semibold text-white ${item.solved ? 'line-through text-muted' : ''}`}>
                            {item.title}
                          </h4>
                          <Badge
                            variant={item.difficulty === 'Hard' ? 'hard' : 'medium'}
                            size="sm"
                          >
                            {item.difficulty}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted flex items-center gap-2">
                          <span>{item.topic}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-muted" /> {item.scheduled}
                          </span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        {item.solved ? (
                          <Badge variant="success" size="md" icon={CheckCircle2}>
                            Completed
                          </Badge>
                        ) : (
                          <>
                            <Button
                              variant="secondary"
                              size="sm"
                              className="flex-1 sm:flex-initial"
                              onClick={() => handleMarkRevised(item.id)}
                              leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                            >
                              Revised
                            </Button>
                            <a
                              href="https://leetcode.com"
                              target="_blank"
                              rel="noreferrer"
                              className="flex-1 sm:flex-initial"
                            >
                              <Button
                                variant="primary"
                                size="sm"
                                className="w-full"
                                leftIcon={<Play className="w-3.5 h-3.5" />}
                              >
                                Solve
                              </Button>
                            </a>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* 9. RECENT PROBLEMS TABLE / LIST */}
          <motion.div variants={itemVariants}>
            <Card variant="glass">
              <CardHeader className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Problems</CardTitle>
                  <p className="text-xs text-muted mt-1">Recently synced problems from LeetCode extension.</p>
                </div>
                <Badge variant="outline" size="sm">Auto Synced</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-background/60 border border-white/[0.04]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold">
                        E
                      </div>
                      <div>
                        <h5 className="text-xs font-semibold text-white">1. Two Sum</h5>
                        <span className="text-[11px] text-muted">Arrays & Hashing</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-emerald-400">Accepted</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-background/60 border border-white/[0.04]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-mono text-xs font-bold">
                        M
                      </div>
                      <div>
                        <h5 className="text-xs font-semibold text-white">200. Number of Islands</h5>
                        <span className="text-[11px] text-muted">BFS / DFS Graph</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-emerald-400">Accepted</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* 7. RECENT ACTIVITY TIMELINE */}
        <div className="lg:col-span-1">
          <motion.div variants={itemVariants} className="h-full">
            <Card variant="glass" className="h-full flex flex-col justify-between">
              <div>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  {activities.length === 0 ? (
                    <EmptyState
                      title="No Activity Yet"
                      description="Your recent solved and revised activities will appear here."
                      icon={FolderOpen}
                    />
                  ) : (
                    <div className="relative pl-6 border-l border-white/[0.1] space-y-6 my-2">
                      {activities.map((act) => (
                        <div key={act.id} className="relative">
                          <div className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 bg-primary rounded-full ring-4 ring-surface" />
                          <p className="text-xs font-semibold text-white">
                            {act.action} {act.problem}
                          </p>
                          <p className="text-[11px] text-muted mt-0.5">{act.time}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </div>

              {/* Footer Widget */}
              <div className="p-4 rounded-xl bg-surface-hover/60 border border-white/[0.06] mt-6">
                <p className="text-xs font-semibold text-white mb-1">Spaced Repetition Tip</p>
                <p className="text-[11px] text-muted leading-relaxed">
                  Revising a problem within 24 hours boosts retention memory by up to 80%.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
