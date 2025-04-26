import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';

const Layout = ({ children }) => {
  const { currentUser, isAuthenticated, logout, hasRole } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Store Ratings</Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX size={24} /> : <HiOutlineMenuAlt3 size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-gray-200">Home</Link>
            
            {isAuthenticated ? (
              <>
                {hasRole('ADMIN') && (
                  <div className="relative group">
                    <button className="hover:text-gray-200">Admin</button>
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                      <Link to="/admin/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Dashboard</Link>
                      <Link to="/admin/stores" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Manage Stores</Link>
                      <Link to="/admin/users" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Manage Users</Link>
                    </div>
                  </div>
                )}
                
                {hasRole('STORE_OWNER') && (
                  <Link to="/store-owner/dashboard" className="hover:text-gray-200">Store Dashboard</Link>
                )}
                
                <Link to="/dashboard" className="hover:text-gray-200">My Dashboard</Link>
                <Link to="/profile" className="hover:text-gray-200">Profile</Link>
                <button onClick={handleLogout} className="hover:text-gray-200">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-200">Login</Link>
                <Link to="/register" className="btn btn-secondary">Register</Link>
              </>
            )}
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden bg-primary border-t border-white/20">
            <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
              <Link to="/" className="text-white py-2 hover:text-gray-200" onClick={() => setMenuOpen(false)}>Home</Link>
              
              {isAuthenticated ? (
                <>
                  {hasRole('ADMIN') && (
                    <>
                      <Link to="/admin/dashboard" className="text-white py-2 hover:text-gray-200" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link>
                      <Link to="/admin/stores" className="text-white py-2 hover:text-gray-200" onClick={() => setMenuOpen(false)}>Manage Stores</Link>
                      <Link to="/admin/users" className="text-white py-2 hover:text-gray-200" onClick={() => setMenuOpen(false)}>Manage Users</Link>
                    </>
                  )}
                  
                  {hasRole('STORE_OWNER') && (
                    <Link to="/store-owner/dashboard" className="text-white py-2 hover:text-gray-200" onClick={() => setMenuOpen(false)}>Store Dashboard</Link>
                  )}
                  
                  <Link to="/dashboard" className="text-white py-2 hover:text-gray-200" onClick={() => setMenuOpen(false)}>My Dashboard</Link>
                  <Link to="/profile" className="text-white py-2 hover:text-gray-200" onClick={() => setMenuOpen(false)}>Profile</Link>
                  <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-white py-2 text-left hover:text-gray-200">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-white py-2 hover:text-gray-200" onClick={() => setMenuOpen(false)}>Login</Link>
                  <Link to="/register" className="text-white py-2 hover:text-gray-200" onClick={() => setMenuOpen(false)}>Register</Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>

      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Store Ratings</h3>
              <p className="text-gray-400">Rate and review your favorite stores</p>
            </div>
            <div>
              <p>&copy; {new Date().getFullYear()} Store Ratings. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;