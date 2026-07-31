import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/signin', credentials);
    return response.data;
  },
  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },
  getProfile: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data?.data || response.data;
    } catch (error) {
      console.warn('GET /auth/me is not authenticated or returned error:', error);
      return null;
    }
  },
  updateProfile: async (profileData) => {
    // TODO: Integrate with backend endpoint PUT /api/v1/auth/profile
    try {
      const response = await api.put('/auth/profile', profileData);
      return response.data;
    } catch (error) {
      console.warn('PUT /auth/profile is not yet available on backend.');
      throw error;
    }
  },
};

export default authService;
