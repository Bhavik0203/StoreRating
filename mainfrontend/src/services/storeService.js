import axios from 'axios';

const API_URL = 'http://localhost:5000/api/stores';

// Get all stores
const getAllStores = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get store by ID
const getStoreById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create store (admin only)
const createStore = async (storeData) => {
  const response = await axios.post(API_URL, storeData);
  return response.data;
};

// Update store (admin only)
const updateStore = async (id, storeData) => {
  const response = await axios.put(`${API_URL}/${id}`, storeData);
  return response.data;
};

// Delete store (admin only)
const deleteStore = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Get store dashboard (store owner only)
const getStoreDashboard = async () => {
  const response = await axios.get(`${API_URL}/dashboard/owner`);
  return response.data;
};

export const storeService = {
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
  getStoreDashboard
};

export default storeService;