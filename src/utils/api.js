const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function for API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      // If unauthorized, clear token
      if (response.status === 401) {
        localStorage.removeItem('token');
      }
      
      let error;
      try {
        error = await response.json();
      } catch {
        error = { error: `HTTP ${response.status}: ${response.statusText}` };
      }
      throw new Error(error.error || 'Something went wrong');
    }

    return response.json();
  } catch (error) {
    // Handle network errors
    if (error.message.includes('fetch')) {
      throw new Error('Cannot connect to server. Please make sure the backend is running.');
    }
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: async (name, email, password, role) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    });
  },

  login: async (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  getCurrentUser: async () => {
    return apiRequest('/auth/me', {
      method: 'GET',
    });
  },
};

// Posts API
export const postsAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/posts${queryString ? `?${queryString}` : ''}`, {
      method: 'GET',
    });
  },

  getById: async (id) => {
    return apiRequest(`/posts/${id}`, {
      method: 'GET',
    });
  },

  create: async (postData) => {
    return apiRequest('/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  },

  update: async (id, postData) => {
    return apiRequest(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });
  },

  delete: async (id) => {
    return apiRequest(`/posts/${id}`, {
      method: 'DELETE',
    });
  },
};

// Applications API
export const applicationsAPI = {
  create: async (applicationData) => {
    return apiRequest('/applications', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  },

  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/applications${queryString ? `?${queryString}` : ''}`, {
      method: 'GET',
    });
  },

  update: async (id, status) => {
    return apiRequest(`/applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
};

// Saved Jobs API
export const savedJobsAPI = {
  getAll: async () => {
    return apiRequest('/saved-jobs', {
      method: 'GET',
    });
  },

  save: async (postId) => {
    return apiRequest('/saved-jobs', {
      method: 'POST',
      body: JSON.stringify({ postId }),
    });
  },

  remove: async (id) => {
    return apiRequest(`/saved-jobs/${id}`, {
      method: 'DELETE',
    });
  },
};

