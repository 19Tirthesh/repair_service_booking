export const API_BASE_URL = (
  process.env.REACT_APP_API_URL || 'http://localhost:5001'
).replace(/\/$/, '');
export const apiPaths = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    profile: '/api/auth/profile',
  },
  users: {
    root: '/api/users',
    byId: (id) => `/api/users/${id}`,
  },
  repairRequests: {
    root: '/api/repair-requests',
    byId: (id) => `/api/repair-requests/${id}`,
  },
};
