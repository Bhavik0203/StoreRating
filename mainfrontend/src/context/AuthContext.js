import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize auth when component mounts
    authService.initializeAuth();
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authService.login({ email, password });
      setCurrentUser(authService.getCurrentUser());
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    toast.success('Logged out successfully');
  };

  const updatePassword = async (currentPassword, newPassword) => {
    try {
      const data = await authService.updatePassword({ currentPassword, newPassword });
      toast.success('Password updated successfully');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password update failed');
      throw error;
    }
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    hasRole: (role) => currentUser && currentUser.role === role,
    login,
    register,
    logout,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}