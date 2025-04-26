import axios from 'axios';

const API_URL = 'http://localhost:5000/api/ratings';

// Submit a new rating
const submitRating = async (ratingData) => {
  const response = await axios.post(API_URL, ratingData);
  return response.data;
};

// Get ratings for a store
const getStoreRatings = async (storeId) => {
  const response = await axios.get(`${API_URL}/store/${storeId}`);
  return response.data;
};

// Get user's rating for a specific store
const getUserRating = async (storeId) => {
  const response = await axios.get(`${API_URL}/user/store/${storeId}`);
  return response.data;
};

// Delete a rating
const deleteRating = async (ratingId) => {
  const response = await axios.delete(`${API_URL}/${ratingId}`);
  return response.data;
};

export const ratingService = {
  submitRating,
  getStoreRatings,
  getUserRating,
  deleteRating
};

export default ratingService;