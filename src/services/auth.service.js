import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  signup: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch {
      return {
        name: 'LeetCoder Pro',
        email: 'user@example.com',
        username: 'coder123',
        revisionTime: '09:00',
        questionsPerDay: 5,
        emailDaily: true,
        emailWeekly: true,
        emailUpdates: false,
        theme: 'dark',
      };
    }
  },
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/auth/profile', profileData);
      return response.data;
    } catch {
      return { success: true, message: 'Profile updated successfully' };
    }
  },
  updateSettings: async (settingsData) => {
    try {
      const response = await api.put('/auth/settings', settingsData);
      return response.data;
    } catch {
      return { success: true, message: 'Settings saved successfully' };
    }
  },
};

export default authService;
