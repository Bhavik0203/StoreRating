import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ratingService } from '../../services/ratingService';
import { useAuth } from '../../context/AuthContext';
import { HiStar } from 'react-icons/hi';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [userRatings, setUserRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  // This would normally be an API endpoint but we'll need to simulate it since the backend doesn't have this
  useEffect(() => {
    const fetchUserRatings = async () => {
      try {
        // In a real implementation, you would have a dedicated API endpoint for this
        // For now, we'll use the existing endpoints to get store ratings and filter them
        // This is just a simulation for demonstration purposes
        
        // You should create a proper API endpoint for this functionality
        setTimeout(() => {
          // Mock data since we don't have a direct API to get user's ratings
          const mockRatings = [
            {
              id: 1,
              storeId: 1,
              userId: currentUser.id,
              rating: 4,
              comment: "Great products and service!",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              Store: {
                id: 1,
                name: "Tech Store",
                address: "123 Main St, Tech City, TC 12345",
                email: "info@techstore.com"
              }
            },
            {
              id: 2,
              storeId: 2,
              userId: currentUser.id,
              rating: 5,
              comment: "Amazing selection and helpful staff!",
              createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
              updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
              Store: {
                id: 2,
                name: "Fashion Boutique",
                address: "456 Style Ave, Fashion District, FD 67890",
                email: "contact@fashionboutique.com"
              }
            }
          ];
          
          setUserRatings(mockRatings);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching user ratings:', error);
        toast.error('Failed to load your ratings');
        setLoading(false);
      }
    };

    fetchUserRatings();
  }, [currentUser.id]);

  const handleDeleteRating = async (ratingId) => {
    if (!window.confirm('Are you sure you want to delete this rating?')) {
      return;
    }

    try {
      await ratingService.deleteRating(ratingId);
      setUserRatings(userRatings.filter(rating => rating.id !== ratingId));
      toast.success('Rating deleted successfully');
    } catch (error) {
      toast.error('Failed to delete rating');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
      
      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        <div className="space-y-3">
          <div className="flex flex-col md:flex-row md:items-center">
            <span className="font-medium w-24">Name:</span>
            <span>{currentUser.name}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <span className="font-medium w-24">Email:</span>
            <span>{currentUser.email}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <span className="font-medium w-24">Role:</span>
            <span className="capitalize">{currentUser.role.toLowerCase().replace('_', ' ')}</span>
          </div>
        </div>
        <div className="mt-4">
          <Link to="/profile" className="btn btn-primary">
            Edit Profile
          </Link>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">My Ratings</h2>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-2 text-gray-600">Loading your ratings...</p>
          </div>
        ) : (
          <>
            {userRatings.length === 0 ? (
              <div className="text-center py-8 card">
                <p className="text-gray-600">You haven't rated any stores yet.</p>
                <Link to="/" className="btn btn-primary mt-4 inline-block">
                  Explore Stores
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userRatings.map(rating => (
                  <div key={rating.id} className="card">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <div>
                        <Link to={`/store/${rating.storeId}`} className="text-lg font-semibold text-primary hover:underline">
                          {rating.Store.name}
                        </Link>
                        
                        <div className="flex items-center mt-2">
                          {[...Array(5)].map((_, index) => (
                            <HiStar
                              key={index}
                              className={`h-5 w-5 ${
                                index < rating.rating ? 'text-yellow-500' : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">
                            Rated on {new Date(rating.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        
                        {rating.comment && (
                          <div className="mt-3 text-gray-700">{rating.comment}</div>
                        )}
                      </div>
                      
                      <div className="mt-4 md:mt-0 flex space-x-2">
                        <Link to={`/store/${rating.storeId}`} className="btn btn-secondary text-sm">
                          View Store
                        </Link>
                        <button 
                          onClick={() => handleDeleteRating(rating.id)}
                          className="btn bg-error hover:bg-error/90 text-white text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;