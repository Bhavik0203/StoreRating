const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const submitRating = async (ratingData, token) => {
  const response = await fetch(`${API_URL}/ratings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(ratingData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to submit rating');
  }

  return await response.json();
};

export const getStoreRatings = async (storeId) => {
  const response = await fetch(`${API_URL}/ratings/store/${storeId}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch store ratings');
  }

  return await response.json();
};

export const getUserRating = async (storeId, token) => {
  const response = await fetch(`${API_URL}/ratings/user/store/${storeId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch user rating');
  }

  return await response.json();
};

export const deleteRating = async (ratingId, token) => {
  const response = await fetch(`${API_URL}/ratings/${ratingId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete rating');
  }

  return await response.json();
};