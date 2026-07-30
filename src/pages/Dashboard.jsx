import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboard.service';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Play, CheckCircle2, TrendingUp, Mail, History } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await dashboardService.getStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-white animate-pulse">Loading dashboard...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="heading-2 mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's your revision overview for today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 font-medium">Problems Solved</h3>
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-bold text-white">{stats?.problemsSolved || 0}</p>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 font-medium">Current Streak</h3>
            <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-bold text-white">{stats?.currentStreak || 0} days</p>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 font-medium">Queue Size</h3>
            <div className="p-2 bg-accent/10 rounded-lg text-accent">
              <History className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-bold text-white">{stats?.queueSize || 0}</p>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 font-medium">Emails Sent</h3>
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-bold text-white">{stats?.emailsSent || 0}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Revision Quick View */}
        <div className="lg:col-span-2">
          <Card className="h-full border-primary/20 bg-background-light/90">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-3">Today's Revision</h2>
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {stats?.todayRevision || 0} left
              </span>
            </div>
            
            <div className="space-y-4">
              {/* Mock problem item */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-background-lighter border border-white/5 hover:border-white/10 transition-colors">
                <div>
                  <h4 className="font-semibold text-white text-lg mb-1">LRU Cache</h4>
                  <span className="text-sm text-yellow-400 font-medium">Medium</span>
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary" className="px-3 py-1.5 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Revised
                  </Button>
                  <Button className="px-3 py-1.5 text-sm flex items-center gap-2">
                    <Play className="w-4 h-4" /> Solve
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <h2 className="heading-3 mb-6">Recent Activity</h2>
            <div className="space-y-6">
              {/* Mock Activity List */}
              <div className="relative pl-6 border-l border-white/10 space-y-8">
                <div className="relative">
                  <div className="absolute -left-[29px] top-1 w-3 h-3 bg-primary rounded-full ring-4 ring-background-lighter"></div>
                  <p className="text-white font-medium mb-1">Solved Two Sum</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[29px] top-1 w-3 h-3 bg-secondary rounded-full ring-4 ring-background-lighter"></div>
                  <p className="text-white font-medium mb-1">Revised Merge Intervals</p>
                  <p className="text-sm text-gray-500">Yesterday</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[29px] top-1 w-3 h-3 bg-gray-600 rounded-full ring-4 ring-background-lighter"></div>
                  <p className="text-white font-medium mb-1">Sync from Extension</p>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
