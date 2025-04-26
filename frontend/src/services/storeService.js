const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getAllStores = async () => {
  const response = await fetch(`${API_URL}/stores`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch stores');
  }

  return await response.json();
};

export const getStoreById = async (id) => {
  const response = await fetch(`${API_URL}/stores/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch store');
  }

  return await response.json();
};

export const createStore = async (storeData, token) => {
  const response = await fetch(`${API_URL}/stores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(storeData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create store');
  }

  return await response.json();
};

export const updateStore = async (id, storeData, token) => {
  const response = await fetch(`${API_URL}/stores/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(storeData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update store');
  }

  return await response.json();
};

export const deleteStore = async (id, token) => {
  const response = await fetch(`${API_URL}/stores/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete store');
  }

  return await response.json();
};

export const getStoreDashboard = async (token) => {
  const response = await fetch(`${API_URL}/stores/dashboard/owner`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch dashboard data');
  }

  return await response.json();
};