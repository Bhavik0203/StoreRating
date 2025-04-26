import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Public Pages
import Home from './pages/Home';
import StoreDetails from './pages/StoreDetails';

// User Pages
import UserDashboard from './pages/user/Dashboard';
import UserProfile from './pages/user/Profile';

// Store Owner Pages
import StoreOwnerDashboard from './pages/storeOwner/Dashboard';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminStores from './pages/admin/Stores';
import AdminUsers from './pages/admin/Users';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/store/:id" element={<Layout><StoreDetails /></Layout>} />

        {/* Protected Routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Layout><UserProfile /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout><UserDashboard /></Layout>
          </ProtectedRoute>
        } />

        {/* Store Owner Routes */}
        <Route path="/store-owner/dashboard" element={
          <RoleRoute role="STORE_OWNER">
            <Layout><StoreOwnerDashboard /></Layout>
          </RoleRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <RoleRoute role="ADMIN">
            <Layout><AdminDashboard /></Layout>
          </RoleRoute>
        } />
        <Route path="/admin/stores" element={
          <RoleRoute role="ADMIN">
            <Layout><AdminStores /></Layout>
          </RoleRoute>
        } />
        <Route path="/admin/users" element={
          <RoleRoute role="ADMIN">
            <Layout><AdminUsers /></Layout>
          </RoleRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;