import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor — attach JWT token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('innovathon-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        // Token expired or invalid — clear and redirect
        localStorage.removeItem('innovathon-token');
        localStorage.removeItem('innovathon-user');
        window.location.href = '/login';
      }

      return Promise.reject({
        status,
        message: data?.error || 'Something went wrong',
        details: data?.details
      });
    }

    if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        status: 408,
        message: 'Request timed out. Please try again.'
      });
    }

    return Promise.reject({
      status: 0,
      message: 'Network error. Please check your connection.'
    });
  }
);

// ============================================================
// AUTH API
// ============================================================

export const authAPI = {
  // Register with username + email + password
  register: (data) =>
    api.post('/api/auth/register', data),

  // Login with username/email + password
  login: (data) =>
    api.post('/api/auth/login', data),

  // Google Sign-In (sends Firebase ID token, gets back our JWT)
  googleLogin: (idToken) =>
    api.post('/api/auth/google', { idToken }),

  // Get current user profile
  getProfile: () =>
    api.get('/api/auth/me'),

  // Search users by email, username, or name
  searchUsers: (query) =>
    api.get('/api/auth/search', { params: { q: query } }),

  // Check if username is available
  checkUsername: (username) =>
    api.get('/api/auth/check-username', { params: { username } })
};

// ============================================================
// TEAMS API
// ============================================================

export const teamsAPI = {
  create: (teamData) =>
    api.post('/api/teams', teamData),

  getMyTeam: () =>
    api.get('/api/teams/my'),

  getAllTeams: () =>
    api.get('/api/teams'),

  // Join a team using invite code
  joinByInviteCode: (inviteCode) =>
    api.post('/api/teams/join', { inviteCode }),

  // Preview team info by invite code (before joining)
  getTeamByInviteCode: (code) =>
    api.get(`/api/teams/invite/${code}`)
};

// ============================================================
// PAYMENT API
// ============================================================

export const paymentAPI = {
  createOrder: () =>
    api.post('/api/payment/create-order'),

  verifyPayment: (paymentData) =>
    api.post('/api/payment/verify', paymentData)
};

// ============================================================
// SUBMISSIONS API
// ============================================================

export const submissionsAPI = {
  submit: (data) =>
    api.post('/api/submissions', data),

  getMy: () =>
    api.get('/api/submissions/my'),

  getByTeam: (teamId) =>
    api.get(`/api/submissions/${teamId}`)
};

// ============================================================
// ADMIN API
// ============================================================

export const adminAPI = {
  getStats: () =>
    api.get('/api/admin/stats'),

  getTeams: (params = {}) =>
    api.get('/api/admin/teams', { params }),

  getUsers: (params = {}) =>
    api.get('/api/admin/users', { params }),

  exportCSV: () =>
    api.get('/api/admin/export-csv', { responseType: 'blob' }),

  toggleLeaderboard: (enabled) =>
    api.put('/api/admin/toggle-leaderboard', { enabled })
};

// ============================================================
// LEADERBOARD API
// ============================================================

export const leaderboardAPI = {
  get: () =>
    api.get('/api/leaderboard')
};

// ============================================================
// SCORES API
// ============================================================

export const scoresAPI = {
  submit: (data) =>
    api.post('/api/scores', data),

  getByTeam: (teamId) =>
    api.get(`/api/scores/team/${teamId}`),

  getByJudge: (judgeId) =>
    api.get(`/api/scores/judge/${judgeId}`)
};

export default api;
