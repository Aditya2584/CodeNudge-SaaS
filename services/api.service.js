import { CONSTANTS } from '../utils/constants.js';
import { StorageUtil } from '../utils/storage.js';
import { Helpers } from '../utils/helpers.js';

export const ApiService = {
  async postSubmission(submissionData) {
    const endpoint = `${CONSTANTS.API_BASE_URL}/submissions`;
    
    try {
      Helpers.log('ApiService', `Preparing to POST submission to ${endpoint}`, submissionData);
      
      const token = await StorageUtil.get(CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN);
      
      if (!token) {
        const errorMsg = 'No access token found in storage. User must login first.';
        Helpers.error('ApiService', errorMsg);
        throw new Error(errorMsg);
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(submissionData)
      });

      if (!response.ok) {
        let errorData = null;
        try {
          errorData = await response.json();
        } catch (e) {
          errorData = { message: 'Could not parse error response body' };
        }
        
        Helpers.error('ApiService', 'API returned an error response', {
          url: endpoint,
          status: response.status,
          statusText: response.statusText,
          body: errorData
        });
        
        throw new Error(`API Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }

      const data = await response.json();
      Helpers.log('ApiService', 'Successfully posted submission', data);
      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
         Helpers.error('ApiService', 'Network Error: Backend is not running, URL is incorrect, or CORS failed', {
           url: endpoint,
           exception: error.message,
           stack: error.stack
         });
         throw new Error("Backend is not running or URL is incorrect.");
      }
      
      Helpers.error('ApiService', 'Exception caught during fetch', {
        url: endpoint,
        exception: error.message,
        stack: error.stack
      });
      throw error;
    }
  },
  
  async testBackendConnection() {
    // We try to reach the platform endpoint as a health check since there is no generic ping
    const endpoint = `${CONSTANTS.API_BASE_URL}/platform`;
    
    try {
      Helpers.log('ApiService', `Testing backend connection to ${endpoint}`);
      
      const token = await StorageUtil.get(CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN);
      
      if (!token) {
        throw new Error("No access token found. Please login to test connection.");
      }

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        let errorData = null;
        try {
          errorData = await response.json();
        } catch (e) {}
        
        Helpers.error('ApiService', 'Test connection returned an error', {
          url: endpoint,
          status: response.status,
          body: errorData
        });
        throw new Error(`Test failed with status ${response.status}`);
      }
      
      Helpers.log('ApiService', 'Test connection successful');
      return true;
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        Helpers.error('ApiService', 'Network Error during test connection', { url: endpoint });
        throw new Error("Backend is not running or URL is incorrect.");
      }
      
      Helpers.error('ApiService', 'Test connection failed', { exception: error.message });
      throw error;
    }
  }
};
