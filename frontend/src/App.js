import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
// import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import UpdatePasswordPage from './pages/Auth/UpdatePasswordPage';
import StoreListPage from './pages/Stores/StoreListPage';
import StoreDetailPage from './pages/Stores/StoreDetailPage';
import RatingPage from './pages/Ratings/RatingPage';
import UserRatingsPage from './pages/Ratings/UserRatingsPage';
import AdminDashboardPage from './pages/Dashboard/AdminDashboardPage';
import OwnerDashboardPage from './pages/Dashboard/OwnerDashboardPage';
import UserListPage from './pages/Users/UserListPage';
import UserDetailPage from './pages/Users/UserDetailPage';
import ManageStorePage from './pages/Stores/ManageStorePage';
import ManageUserPage from './pages/Users/ManageUserPage';
import ProtectedRoute from './components/Layout/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        {/* <Layout> */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/stores" element={<StoreListPage />} />
            <Route path="/stores/:id" element={<StoreDetailPage />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/update-password" element={<UpdatePasswordPage />} />
              <Route path="/ratings" element={<RatingPage />} />
              <Route path="/my-ratings" element={<UserRatingsPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/users" element={<UserListPage />} />
              <Route path="/admin/users/:id" element={<UserDetailPage />} />
              <Route path="/admin/users/new" element={<ManageUserPage />} />
              <Route path="/admin/users/edit/:id" element={<ManageUserPage />} />
              <Route path="/admin/stores/new" element={<ManageStorePage />} />
              <Route path="/admin/stores/edit/:id" element={<ManageStorePage />} />
              
              {/* Store Owner Routes */}
              <Route path="/owner/dashboard" element={<OwnerDashboardPage />} />
            </Route>
          </Routes>
        {/* </Layout> */}
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;