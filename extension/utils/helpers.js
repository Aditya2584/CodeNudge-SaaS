export const Helpers = {
  /**
   * Log messages to console in a standard format
   */
  log(module, message, data = null) {
    const timestamp = new Date().toISOString();
    if (data) {
      console.log(`[CodeNudge ${timestamp}] [${module}] ${message}`, data);
    } else {
      console.log(`[CodeNudge ${timestamp}] [${module}] ${message}`);
    }
  },

  /**
   * Log error messages to console
   */
  error(module, message, error) {
    const timestamp = new Date().toISOString();
    console.error(`[CodeNudge ${timestamp}] [${module}] ${message}`, error);
  },
  
  /**
   * Format date for display
   */
  formatDate(dateString) {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  }
};
