import api from './api';

export const problemService = {
  getProblems: async (params) => {
    // TODO: Integrate with backend endpoint GET /api/v1/problems
    try {
      const response = await api.get('/problems', { params });
      return response.data?.data || response.data || [];
    } catch (err) {
      console.warn('GET /problems endpoint is not yet implemented on backend.', err);
      return [];
    }
  },

  getTodaysRevision: async () => {
    try {
      const response = await api.get('/revision/today');
      return response.data?.data || response.data || [];
    } catch (error) {
      console.warn('Failed to fetch today revision from GET /revision/today:', error);
      return [];
    }
  },

  getRecentAcceptedProblems: async () => {
    // TODO: Integrate with backend endpoint GET /api/v1/submissions/recent
    try {
      const response = await api.get('/submissions/recent');
      return response.data?.data || response.data || [];
    } catch (err) {
      console.warn('GET /submissions/recent endpoint is not yet implemented on backend.', err);
      return [];
    }
  },

  getUpcomingRevisions: async () => {
    // TODO: Integrate with backend endpoint GET /api/v1/revision/upcoming
    try {
      const response = await api.get('/revision/upcoming');
      return response.data?.data || response.data || [];
    } catch (err) {
      console.warn('GET /revision/upcoming endpoint is not yet implemented on backend.', err);
      return [];
    }
  },

  getRevisionQueue: async () => {
    try {
      const response = await api.get('/revision/today');
      return response.data?.data || response.data || [];
    } catch (error) {
      console.warn('GET /revision/today error:', error);
      return [];
    }
  },

  getRevisionHistory: async () => {
    // TODO: Integrate with backend endpoint GET /api/v1/revision/history
    try {
      const response = await api.get('/revision/history');
      return response.data?.data || response.data || [];
    } catch (err) {
      console.warn('GET /revision/history is not yet implemented on backend.', err);
      return [];
    }
  },

  markRevised: async (problemId) => {
    try {
      const response = await api.post('/revision/complete', { problemId });
      return response.data;
    } catch (error) {
      console.error('POST /revision/complete error:', error);
      throw error;
    }
  },
};

export default problemService;
