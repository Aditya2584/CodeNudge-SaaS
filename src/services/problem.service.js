import api from './api';

export const problemService = {
  getProblems: async (params) => {
    try {
      const response = await api.get('/problems', { params });
      return response.data;
    } catch {
      return [
        {
          id: '1',
          number: 1,
          title: 'Two Sum',
          difficulty: 'Easy',
          topic: 'Arrays & Hashing',
          status: 'Completed',
          lastRevised: '2 days ago',
          retentionScore: 92,
          decayDays: 14,
          url: 'https://leetcode.com/problems/two-sum/',
        },
        {
          id: '2',
          number: 146,
          title: 'LRU Cache',
          difficulty: 'Medium',
          topic: 'Doubly Linked List & Hash Table',
          status: 'Due',
          lastRevised: '7 days ago',
          retentionScore: 68,
          decayDays: 1,
          url: 'https://leetcode.com/problems/lru-cache/',
        },
        {
          id: '3',
          number: 56,
          title: 'Merge Intervals',
          difficulty: 'Medium',
          topic: 'Sorting & Arrays',
          status: 'Due',
          lastRevised: '5 days ago',
          retentionScore: 74,
          decayDays: 2,
          url: 'https://leetcode.com/problems/merge-intervals/',
        },
        {
          id: '4',
          number: 76,
          title: 'Minimum Window Substring',
          difficulty: 'Hard',
          topic: 'Sliding Window',
          status: 'Due',
          lastRevised: '12 days ago',
          retentionScore: 54,
          decayDays: 0,
          url: 'https://leetcode.com/problems/minimum-window-substring/',
        },
        {
          id: '5',
          number: 200,
          title: 'Number of Islands',
          difficulty: 'Medium',
          topic: 'Graph BFS / DFS',
          status: 'Scheduled',
          lastRevised: '3 days ago',
          retentionScore: 88,
          decayDays: 5,
          url: 'https://leetcode.com/problems/number-of-islands/',
        },
      ];
    }
  },

  getRevisionQueue: async () => {
    try {
      const response = await api.get('/revision/today');
      return response.data;
    } catch {
      return [
        {
          id: '146',
          number: 146,
          title: 'LRU Cache',
          difficulty: 'Medium',
          topic: 'Hash Table & Doubly Linked List',
          decayRisk: 'Medium',
          queuePosition: 1,
          scheduledTime: '2 hours ago',
          solved: false,
          url: 'https://leetcode.com/problems/lru-cache/',
        },
        {
          id: '56',
          number: 56,
          title: 'Merge Intervals',
          difficulty: 'Medium',
          topic: 'Sorting & Arrays',
          decayRisk: 'Low',
          queuePosition: 2,
          scheduledTime: 'Today',
          solved: false,
          url: 'https://leetcode.com/problems/merge-intervals/',
        },
        {
          id: '76',
          number: 76,
          title: 'Minimum Window Substring',
          difficulty: 'Hard',
          topic: 'Sliding Window',
          decayRisk: 'High',
          queuePosition: 3,
          scheduledTime: 'Critical',
          solved: false,
          url: 'https://leetcode.com/problems/minimum-window-substring/',
        },
      ];
    }
  },

  getRevisionHistory: async () => {
    try {
      const response = await api.get('/revision/history');
      return response.data;
    } catch {
      return [
        {
          id: 'h1',
          number: 1,
          title: 'Two Sum',
          difficulty: 'Easy',
          completedAt: 'Today at 09:30 AM',
          retentionBoost: '+25%',
        },
        {
          id: 'h2',
          number: 215,
          title: 'Kth Largest Element in an Array',
          difficulty: 'Medium',
          completedAt: 'Yesterday at 04:15 PM',
          retentionBoost: '+18%',
        },
        {
          id: 'h3',
          number: 121,
          title: 'Best Time to Buy and Sell Stock',
          difficulty: 'Easy',
          completedAt: '2 days ago',
          retentionBoost: '+30%',
        },
      ];
    }
  },

  markRevised: async (problemId) => {
    try {
      const response = await api.post(`/problems/${problemId}/revise`);
      return response.data;
    } catch {
      return { success: true, message: 'Problem marked as revised' };
    }
  },
};

export default problemService;
