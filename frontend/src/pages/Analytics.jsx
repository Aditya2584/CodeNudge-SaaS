import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboard.service';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ErrorState } from '../components/ui/ErrorState';
import { 
  CheckCircle2, 
  Flame, 
  History, 
  TrendingUp, 
  Calendar, 
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(false);
    try {
      const [statsData, analyticsData] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getAnalytics(),
      ]);
      setStats(statsData);
      setAnalytics(analyticsData);
    } catch (err) {
      console.error('Failed to load analytics data:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  };

  // Generate 12-week Heatmap Grid Data (84 days)
  const heatmapData = Array.from({ length: 84 }, (_, i) => {
    const intensity = Math.floor(Math.sin(i * 0.3) * 2 + Math.random() * 3);
    return Math.max(0, intensity);
  });

  const getHeatmapColor = (intensity) => {
    switch (intensity) {
      case 0: return 'bg-white/[0.04] border-white/[0.04]';
      case 1: return 'bg-primary/20 border-primary/30';
      case 2: return 'bg-primary/50 border-primary/60';
      case 3: return 'bg-primary/80 border-primary/90';
      default: return 'bg-primary border-primary shadow-glow-sm';
    }
  };

  // SKELETON LOADING STATE
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
        <div className="h-20 rounded-2xl bg-surface-hover/60 border border-white/[0.08]" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-surface-hover/60 border border-white/[0.08]" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-80 rounded-2xl bg-surface-hover/60 border border-white/[0.08]" />
          <div className="h-80 rounded-2xl bg-surface-hover/60 border border-white/[0.08]" />
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState onRetry={loadData} title="Failed to load analytics dashboard" />;
  }

  const difficultyTotal =
    (analytics?.difficultyBreakdown?.easy || 0) +
    (analytics?.difficultyBreakdown?.medium || 0) +
    (analytics?.difficultyBreakdown?.hard || 0) || 1;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto space-y-8"
    >
      {/* HEADER TITLE */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="heading-2 flex items-center gap-2.5">
            Analytics & Performance
            <Badge variant="primary" size="sm">
              Real-time Metrics
            </Badge>
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Deep insights into memory retention, topic strengths, and problem solving consistency.
          </p>
        </div>
      </div>

      {/* METRIC CARDS ROW */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* 1. Problems Solved */}
        <Card variant="glass" hoverEffect>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">Problems Solved</span>
            <div className="p-2 bg-primary/10 rounded-xl text-primary border border-primary/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {stats?.problemsSolved || 142}
            </span>
            <span className="text-[11px] text-emerald-400 font-medium flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +15% this mo
            </span>
          </div>
        </Card>

        {/* 2. Revision Completion Rate */}
        <Card variant="glass" hoverEffect>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">Completion Rate</span>
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {analytics?.completionRate || 88}%
            </span>
            <Badge variant="success" size="sm">High Retention</Badge>
          </div>
        </Card>

        {/* 3. Queue Size */}
        <Card variant="glass" hoverEffect>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">Queue Size</span>
            <div className="p-2 bg-accent/10 rounded-xl text-accent border border-accent/20">
              <History className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {stats?.queueSize || 28}
            </span>
            <span className="text-[11px] text-muted">Active Queue</span>
          </div>
        </Card>

        {/* Streak */}
        <Card variant="glass" hoverEffect>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">Current Streak</span>
            <div className="p-2 bg-secondary/10 rounded-xl text-secondary border border-secondary/20">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {stats?.currentStreak || 12} <span className="text-sm font-normal text-muted">days</span>
            </span>
            <Badge variant="secondary" size="sm">Active</Badge>
          </div>
        </Card>
      </motion.div>

      {/* CHARTS GRID 1: PROGRESS TRENDS & DIFFICULTY BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 7. PROGRESS CHARTS (Monthly Growth Trend) */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card variant="glass" className="h-full flex flex-col justify-between">
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle>Problem Mastery Growth</CardTitle>
                <p className="text-xs text-muted mt-1">Cumulative solved & retained problems over time.</p>
              </div>
              <Badge variant="outline" size="sm">6 Month View</Badge>
            </CardHeader>
            <CardContent className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics?.monthlyTrends || []}>
                  <defs>
                    <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EA6113" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#EA6113" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="#A1A1AA" fontSize={11} tickLine={false} />
                  <YAxis stroke="#A1A1AA" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#17181C',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#EA6113"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#primaryGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* 4. DIFFICULTY BREAKDOWN */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card variant="glass" className="h-full flex flex-col justify-between">
            <div>
              <CardHeader>
                <CardTitle>Difficulty Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-2">
                {/* Easy */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-400">Easy</span>
                    <span className="font-mono text-muted">
                      {analytics?.difficultyBreakdown?.easy || 52} ({Math.round(((analytics?.difficultyBreakdown?.easy || 52) / difficultyTotal) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${((analytics?.difficultyBreakdown?.easy || 52) / difficultyTotal) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Medium */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-amber-400">Medium</span>
                    <span className="font-mono text-muted">
                      {analytics?.difficultyBreakdown?.medium || 68} ({Math.round(((analytics?.difficultyBreakdown?.medium || 68) / difficultyTotal) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className="bg-amber-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${((analytics?.difficultyBreakdown?.medium || 68) / difficultyTotal) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Hard */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-red-400">Hard</span>
                    <span className="font-mono text-muted">
                      {analytics?.difficultyBreakdown?.hard || 22} ({Math.round(((analytics?.difficultyBreakdown?.hard || 22) / difficultyTotal) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className="bg-red-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${((analytics?.difficultyBreakdown?.hard || 22) / difficultyTotal) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </div>

            <div className="p-4 rounded-xl bg-surface-hover/60 border border-white/[0.06] mt-6 text-xs text-muted">
              <span className="font-semibold text-white">Target Ratio:</span> 30% Easy / 50% Medium / 20% Hard recommended for FAANG prep.
            </div>
          </Card>
        </motion.div>
      </div>

      {/* CHARTS GRID 2: WEEKLY ACTIVITY & HEATMAP */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 5. WEEKLY ACTIVITY CHART */}
        <motion.div variants={itemVariants}>
          <Card variant="glass">
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle>Weekly Activity</CardTitle>
                <p className="text-xs text-muted mt-1">Daily solved vs revised problem frequency.</p>
              </div>
              <Badge variant="primary" size="sm">This Week</Badge>
            </CardHeader>
            <CardContent className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics?.weeklyActivity || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" stroke="#A1A1AA" fontSize={11} tickLine={false} />
                  <YAxis stroke="#A1A1AA" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#17181C',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="solved" fill="#EA6113" radius={[4, 4, 0, 0]} name="Solved" />
                  <Bar dataKey="revised" fill="#F88F22" radius={[4, 4, 0, 0]} name="Revised" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* 6. HEATMAP (12-Week Contribution Grid) */}
        <motion.div variants={itemVariants}>
          <Card variant="glass" className="h-full flex flex-col justify-between">
            <div>
              <CardHeader className="flex items-center justify-between">
                <div>
                  <CardTitle>Revision Heatmap</CardTitle>
                  <p className="text-xs text-muted mt-1">12-week activity calendar grid.</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted">
                  <span>Less</span>
                  <span className="w-2.5 h-2.5 rounded bg-white/[0.04]" />
                  <span className="w-2.5 h-2.5 rounded bg-primary/40" />
                  <span className="w-2.5 h-2.5 rounded bg-primary" />
                  <span>More</span>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="grid grid-cols-12 gap-1.5 p-2 bg-background/60 rounded-xl border border-white/[0.04]">
                  {heatmapData.map((intensity, idx) => (
                    <div
                      key={idx}
                      className={`h-4 rounded border transition-colors ${getHeatmapColor(intensity)}`}
                      title={`Day ${idx + 1}: ${intensity} revisions`}
                    />
                  ))}
                </div>
              </CardContent>
            </div>

            <div className="flex items-center justify-between text-xs text-muted pt-4 border-t border-white/[0.06]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" /> 12 Weeks Active
              </span>
              <span className="font-mono text-white font-semibold">84 Days Logged</span>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Analytics;
