import api from './api';

export const dashboardService = {
  getStats: async () => {
    // TODO: Integrate with backend endpoint GET /api/v1/dashboard/stats
    try {
      const response = await api.get('/dashboard/stats');
      return response.data?.data || response.data;
    } catch (err) {
      console.warn('GET /dashboard/stats is not yet available on backend.', err);
      return null;
    }
  },

  getRecentActivity: async () => {
    // TODO: Integrate with backend endpoint GET /api/v1/dashboard/activity
    try {
      const response = await api.get('/dashboard/activity');
      return response.data?.data || response.data;
    } catch (err) {
      console.warn('GET /dashboard/activity is not yet available on backend.', err);
      return [];
    }
  },

  getAnalytics: async () => {
    // TODO: Integrate with backend endpoint GET /api/v1/dashboard/analytics
    try {
      const response = await api.get('/dashboard/analytics');
      return response.data?.data || response.data;
    } catch (err) {
      console.warn('GET /dashboard/analytics is not yet available on backend.', err);
      return null;
    }
  },
};

export default dashboardService;
