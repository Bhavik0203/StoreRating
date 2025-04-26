import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { storeService } from '../services/storeService';
import { ratingService } from '../services/ratingService';
import { useAuth } from '../context/AuthContext';
import RatingForm from '../components/RatingForm';
import RatingList from '../components/RatingList';
import { HiStar, HiLocationMarker, HiMail, HiUser } from 'react-icons/hi';
import toast from 'react-hot-toast';

const StoreDetails = () => {
  const { id } = useParams();
  const { isAuthenticated, currentUser } = useAuth();
  const [store, setStore] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [userRating, setUserRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ratingStats, setRatingStats] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0
  });

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const [storeResponse, ratingsResponse] = await Promise.all([
          storeService.getStoreById(id),
          ratingService.getStoreRatings(id)
        ]);

        setStore(storeResponse.data);
        setRatings(ratingsResponse.data);

        // Calculate rating stats
        const stats = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        ratingsResponse.data.forEach(rating => {
          stats[rating.rating] = (stats[rating.rating] || 0) + 1;
        });
        setRatingStats(stats);

        // If user is authenticated, fetch their rating
        if (isAuthenticated) {
          try {
            const userRatingResponse = await ratingService.getUserRating(id);
            setUserRating(userRatingResponse.data);
          } catch (error) {
            // User hasn't rated this store yet, that's okay
            console.log('User has not rated this store yet');
          }
        }
      } catch (error) {
        console.error('Error fetching store data:', error);
        toast.error('Failed to load store details');
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [id, isAuthenticated]);

  const handleRatingSubmit = async () => {
    // Refetch the ratings and store data
    try {
      const [storeResponse, ratingsResponse, userRatingResponse] = await Promise.all([
        storeService.getStoreById(id),
        ratingService.getStoreRatings(id),
        isAuthenticated ? ratingService.getUserRating(id) : Promise.resolve(null)
      ]);

      setStore(storeResponse.data);
      setRatings(ratingsResponse.data);
      
      if (userRatingResponse) {
        setUserRating(userRatingResponse.data);
      }

      // Recalculate rating stats
      const stats = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      ratingsResponse.data.forEach(rating => {
        stats[rating.rating] = (stats[rating.rating] || 0) + 1;
      });
      setRatingStats(stats);
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  const handleDeleteRating = async (ratingId) => {
    if (!window.confirm('Are you sure you want to delete this rating?')) {
      return;
    }

    try {
      await ratingService.deleteRating(ratingId);
      toast.success('Rating deleted successfully');
      
      // Check if it was the user's own rating
      if (userRating && userRating.id === ratingId) {
        setUserRating(null);
      }
      
      // Refresh ratings and store data
      handleRatingSubmit();
    } catch (error) {
      toast.error('Failed to delete rating');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-2 text-gray-600">Loading store details...</p>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-700">Store not found</h2>
        <p className="mt-2 text-gray-600">The store you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  // Calculate percentage for rating bar chart
  const getRatingPercentage = (stars) => {
    if (store.totalRatings === 0) return 0;
    return (ratingStats[stars] / store.totalRatings) * 100;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Store Header */}
      <div className="card mb-8">
        <h1 className="text-3xl font-bold mb-4">{store.name}</h1>
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <HiLocationMarker className="h-5 w-5 text-gray-500" />
              <span>{store.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <HiMail className="h-5 w-5 text-gray-500" />
              <span>{store.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <HiUser className="h-5 w-5 text-gray-500" />
              <span>Owner: {store.owner?.name || 'Unknown'}</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <HiStar
                  key={index}
                  className={`h-8 w-8 ${
                    index < Math.round(store.averageRating) ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="ml-3">
              <div className="text-3xl font-bold">{store.averageRating.toFixed(1)}</div>
              <div className="text-sm text-gray-600">
                ({store.totalRatings} {store.totalRatings === 1 ? 'review' : 'reviews'})
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4">Rating Distribution</h2>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(stars => (
            <div key={stars} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-12">
                <span>{stars}</span>
                <HiStar className="h-4 w-4 text-yellow-500" />
              </div>
              <div className="flex-grow bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-yellow-500 h-3 rounded-full" 
                  style={{ width: `${getRatingPercentage(stars)}%` }}
                ></div>
              </div>
              <div className="w-12 text-right text-sm text-gray-600">
                {ratingStats[stars]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Rating Form */}
      {isAuthenticated && currentUser.role !== 'ADMIN' && currentUser.id !== store.ownerId && (
        <div className="mb-8">
          <RatingForm 
            storeId={store.id} 
            onRatingSubmit={handleRatingSubmit}
            existingRating={userRating} 
          />
        </div>
      )}

      {/* Ratings List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <RatingList 
          ratings={ratings} 
          onDeleteRating={handleDeleteRating} 
        />
      </div>
    </div>
  );
};

export default StoreDetails;