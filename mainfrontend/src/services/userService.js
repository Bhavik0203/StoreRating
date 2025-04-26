import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

// Get all users (admin only)
const getAllUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get user by ID (admin only)
const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create user (admin only)
const createUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

// Update user (admin only)
const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_URL}/${id}`, userData);
  return response.data;
};

// Delete user (admin only)
const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Get dashboard stats (admin only)
const getDashboardStats = async () => {
  const response = await axios.get(`${API_URL}/dashboard-stats`);
  return response.data;
};

export const userService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getDashboardStats
};

export default userService;