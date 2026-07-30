import api from './api';

export const dashboardService = {
  getStats: async () => {
    // const response = await api.get('/dashboard/stats');
    // return response.data;
    
    // Mock data for UI development
    return {
      problemsSolved: 142,
      queueSize: 28,
      todayRevision: 5,
      currentStreak: 12,
      emailsSent: 45,
      recentSync: '2 hours ago'
    };
  },
  getRecentActivity: async () => {
    // Mock data
    return [
      { id: 1, action: 'Solved', problem: 'Two Sum', time: '2h ago' },
      { id: 2, action: 'Revised', problem: 'LRU Cache', time: '5h ago' },
      { id: 3, action: 'Added', problem: 'Merge Intervals', time: '1d ago' },
    ];
  }
};
