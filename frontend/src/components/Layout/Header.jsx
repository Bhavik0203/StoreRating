import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Header = () => {
  const { user, isAuthenticated, isAdmin, isStoreOwner, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          StoreRatings
        </Link>
        
        <nav className="flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link to="/stores" className="hover:text-blue-200 transition">
                Stores
              </Link>
              
              {isAdmin && (
                <>
                  <Link to="/admin/dashboard" className="hover:text-blue-200 transition">
                    Admin Dashboard
                  </Link>
                  <Link to="/admin/users" className="hover:text-blue-200 transition">
                    Users
                  </Link>
                </>
              )}
              
              {isStoreOwner && (
                <Link to="/owner/dashboard" className="hover:text-blue-200 transition">
                  Owner Dashboard
                </Link>
              )}
              
              <div className="relative group">
                <button className="flex items-center space-x-1 hover:text-blue-200 transition">
                  <span>{user?.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                  <Link to="/update-password" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">
                    Change Password
                  </Link>
                  <Link to="/my-ratings" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">
                    My Ratings
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200 transition">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-200 transition">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;