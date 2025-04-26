import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as authLogin, register as authRegister, getCurrentUser, updatePassword as authUpdatePassword } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const userData = await getCurrentUser(token);
          setUser(userData);
        } catch (err) {
          logout();
        }
      }
      setIsLoading(false);
    };
    loadUser();
  }, [token]);

  const login = async (credentials) => {
    try {
      const { user, token } = await authLogin(credentials);
      setUser(user);
      setToken(token);
      localStorage.setItem('token', token);
      setError(null);
      return user;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const { user, token } = await authRegister(userData);
      setUser(user);
      setToken(token);
      localStorage.setItem('token', token);
      setError(null);
      return user;
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    }
  };

  const updatePassword = async (passwordData) => {
    try {
      await authUpdatePassword(passwordData, token);
      setError(null);
      return true;
    } catch (err) {
      setError(err.message || 'Password update failed');
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'ADMIN';
  const isStoreOwner = user?.role === 'STORE_OWNER';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        error,
        login,
        register,
        updatePassword,
        logout,
        isAuthenticated,
        isAdmin,
        isStoreOwner,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);