import axios from 'axios';
import jwtDecode from 'jwt-decode';

const API_URL = 'http://localhost:5000/api';

// Set JWT token to axios default headers
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

// Register a new user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

// Login user
const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  if (response.data.token) {
    setAuthToken(response.data.token);
  }
  return response.data;
};

// Logout user
const logout = () => {
  setAuthToken(null);
};

// Get current user from token
const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      // Check if token is expired
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        logout();
        return null;
      }
      return decoded;
    } catch (error) {
      logout();
      return null;
    }
  }
  return null;
};

// Check if user is authenticated
const isAuthenticated = () => {
  return getCurrentUser() !== null;
};

// Check if user has a specific role
const hasRole = (role) => {
  const user = getCurrentUser();
  return user && user.role === role;
};

// Update password
const updatePassword = async (passwordData) => {
  const response = await axios.put(`${API_URL}/auth/update-password`, passwordData);
  return response.data;
};

// Get profile information
const getProfile = async () => {
  const response = await axios.get(`${API_URL}/auth/me`);
  return response.data;
};

// Initialize auth - call this when app loads
const initializeAuth = () => {
  const token = localStorage.getItem('token');
  if (token) {
    setAuthToken(token);
  }
};

export const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
  hasRole,
  updatePassword,
  getProfile,
  initializeAuth
};

export default authService;