import { createContext, useContext, useState, useEffect } from 'react';
import { getAllStores, getStoreById, createStore, updateStore, deleteStore, getStoreDashboard } from '../services/storeService';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [stores, setStores] = useState([]);
  const [currentStore, setCurrentStore] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStores = async () => {
    setIsLoading(true);
    try {
      const storesData = await getAllStores();
      setStores(storesData);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch stores');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStoreById = async (id) => {
    setIsLoading(true);
    try {
      const storeData = await getStoreById(id);
      setCurrentStore(storeData);
      setError(null);
      return storeData;
    } catch (err) {
      setError(err.message || 'Failed to fetch store');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const addStore = async (storeData, token) => {
    setIsLoading(true);
    try {
      const newStore = await createStore(storeData, token);
      setStores(prev => [...prev, newStore]);
      setError(null);
      return newStore;
    } catch (err) {
      setError(err.message || 'Failed to create store');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const editStore = async (id, storeData, token) => {
    setIsLoading(true);
    try {
      const updatedStore = await updateStore(id, storeData, token);
      setStores(prev => prev.map(store => store.id === id ? updatedStore : store));
      setCurrentStore(updatedStore);
      setError(null);
      return updatedStore;
    } catch (err) {
      setError(err.message || 'Failed to update store');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const removeStore = async (id, token) => {
    setIsLoading(true);
    try {
      await deleteStore(id, token);
      setStores(prev => prev.filter(store => store.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to delete store');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDashboard = async (token) => {
    setIsLoading(true);
    try {
      const data = await getStoreDashboard(token);
      setDashboardData(data);
      setError(null);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch dashboard data');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        stores,
        currentStore,
        dashboardData,
        isLoading,
        error,
        fetchStores,
        fetchStoreById,
        addStore,
        editStore,
        removeStore,
        fetchDashboard,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);