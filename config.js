// API Configuration
// Update this file with your backend URL

const API_CONFIG = {
  // Local development
  LOCAL: 'http://localhost:5000/api',
  
  // Azure Production
  AZURE: 'https://voting-system-api.azurewebsites.net/api',
  
  // Use this based on environment
  BASE_URL: 'http://localhost:5000/api' // Change to AZURE production URL when ready
};

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { API_CONFIG, apiCall };
}
