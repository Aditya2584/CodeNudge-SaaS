import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { authService } from '../services/auth.service';
import { dashboardService } from '../services/dashboard.service';
import { problemService } from '../services/problem.service';
import { ErrorState } from '../components/ui/ErrorState';

import {
  DashboardHeader,
  StatsCard,
  RevisionCard,
  RecentProblems,
  UpcomingQueue,
  QuickActions,
} from '../components/Dashboard';

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [todaysRevisions, setTodaysRevisions] = useState([]);
  const [recentProblems, setRecentProblems] = useState([]);
  const [upcomingQueue, setUpcomingQueue] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch all dashboard data from real backend endpoints
  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      // 1. Fetch User Profile for Welcome Banner
      const profilePromise = authService.getProfile();

      // 2. Fetch Progress Stats Overview (TODO: GET /api/v1/dashboard/stats)
      const statsPromise = dashboardService.getStats();

      // 3. Fetch Today's Revision Queue (GET /api/v1/revision/today)
      const todaysRevisionPromise = problemService.getTodaysRevision();

      // 4. Fetch Recent Accepted Problems (TODO: GET /api/v1/submissions/recent)
      const recentProblemsPromise = problemService.getRecentAcceptedProblems();

      // 5. Fetch Upcoming Queued Revisions (TODO: GET /api/v1/revision/upcoming)
      const upcomingQueuePromise = problemService.getUpcomingRevisions();

      const [profileData, statsData, todayData, recentData, upcomingData] = await Promise.all([
        profilePromise,
        statsPromise,
        todaysRevisionPromise,
        recentProblemsPromise,
        upcomingQueuePromise,
      ]);

      setUserProfile(profileData);
      setStats(statsData);
      setTodaysRevisions(Array.isArray(todayData) ? todayData : []);
      setRecentProblems(Array.isArray(recentData) ? recentData : []);
      setUpcomingQueue(Array.isArray(upcomingData) ? upcomingData : []);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Handler to mark a problem as revised (POST /api/v1/revision/complete)
  const handleMarkRevised = async (problemId) => {
    try {
      await problemService.markRevised(problemId);
      // Optimistically update local state or re-fetch today's queue
      setTodaysRevisions((prev) =>
        prev.map((item) =>
          (item.id === problemId || item._id === problemId) ? { ...item, solved: true } : item
        )
      );
    } catch (err) {
      console.error('Failed to mark problem as revised:', err);
    }
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-10 px-4">
        <ErrorState onRetry={fetchDashboardData} title="Failed to load dashboard data" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto space-y-6 p-4 sm:p-6 lg:p-8"
    >
      {/* 1. Welcome Back Header */}
      <DashboardHeader
        user={userProfile}
        loading={loading}
        onSync={fetchDashboardData}
      />

      {/* 2. Today's Revision (Primary Section) */}
      <RevisionCard
        revisions={todaysRevisions}
        loading={loading}
        onMarkRevised={handleMarkRevised}
        onRetry={fetchDashboardData}
      />

      {/* 3. Progress Overview Cards */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted px-1">
          Progress Overview
        </h2>
        <StatsCard stats={stats} loading={loading} />
      </div>

      {/* 4. Two-Column Layout for Recent Accepted & Upcoming Revisions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Accepted Problems */}
        <RecentProblems problems={recentProblems} loading={loading} />

        {/* Upcoming Queued Revisions */}
        <UpcomingQueue queue={upcomingQueue} loading={loading} />
      </div>

      {/* 5. Quick Actions Bar */}
      <QuickActions onSync={fetchDashboardData} />
    </motion.div>
  );
};

export default Dashboard;
