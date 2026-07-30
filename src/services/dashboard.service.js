import api from './api';

export const dashboardService = {
  getStats: async () => {
    try {
      const response = await api.get('/dashboard/stats');
      return response.data;
    } catch {
      return {
        problemsSolved: 142,
        queueSize: 28,
        todayRevision: 5,
        currentStreak: 12,
        emailsSent: 45,
        recentSync: '2 hours ago',
        completionRate: 88,
      };
    }
  },
  getRecentActivity: async () => {
    try {
      const response = await api.get('/dashboard/activity');
      return response.data;
    } catch {
      return [
        { id: 1, action: 'Solved', problem: 'Two Sum', time: '2h ago' },
        { id: 2, action: 'Revised', problem: 'LRU Cache', time: '5h ago' },
        { id: 3, action: 'Added', problem: 'Merge Intervals', time: '1d ago' },
      ];
    }
  },
  getAnalytics: async () => {
    try {
      const response = await api.get('/dashboard/analytics');
      return response.data;
    } catch {
      return {
        completionRate: 88,
        difficultyBreakdown: {
          easy: 52,
          medium: 68,
          hard: 22,
        },
        weeklyActivity: [
          { day: 'Mon', solved: 4, revised: 3 },
          { day: 'Tue', solved: 6, revised: 5 },
          { day: 'Wed', solved: 3, revised: 4 },
          { day: 'Thu', solved: 8, revised: 6 },
          { day: 'Fri', solved: 5, revised: 4 },
          { day: 'Sat', solved: 9, revised: 7 },
          { day: 'Sun', solved: 7, revised: 5 },
        ],
        monthlyTrends: [
          { month: 'Jan', count: 25 },
          { month: 'Feb', count: 42 },
          { month: 'Mar', count: 68 },
          { month: 'Apr', count: 95 },
          { month: 'May', count: 120 },
          { month: 'Jun', count: 142 },
        ],
      };
    }
  },
};

export default dashboardService;
