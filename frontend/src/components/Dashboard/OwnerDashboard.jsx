import { useEffect } from 'react';
import { useStore } from '../../../context/StoreContext';
import RatingStars from '../UI/RatingStars';

const OwnerDashboard = () => {
  const { dashboardData, fetchDashboard, isLoading, error } = useStore();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (isLoading) return <div>Loading dashboard...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Store Owner Dashboard</h1>
      
      {dashboardData?.store ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-500">Store Rating</h3>
              <div className="flex items-center mt-2">
                <RatingStars rating={dashboardData.store.averageRating} />
                <span className="ml-2 text-xl font-bold">
                  {dashboardData.store.averageRating.toFixed(1)}
                </span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-500">Total Ratings</h3>
              <p className="text-3xl font-bold mt-2">{dashboardData.store.totalRatings}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-500">Recent Visitors</h3>
              <p className="text-3xl font-bold mt-2">{dashboardData.recentVisitors}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Recent Ratings</h3>
            {dashboardData.recentRatings && dashboardData.recentRatings.length > 0 ? (
              <div className="space-y-3">
                {dashboardData.recentRatings.map(rating => (
                  <div key={rating.id} className="border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center">
                      <RatingStars rating={rating.rating} />
                      <span className="ml-2 text-sm text-gray-500">
                        {new Date(rating.createdAt).toLocaleString()}
                      </span>
                    </div>
                    {rating.comment && (
                      <p className="mt-1 text-gray-600">{rating.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No recent ratings</p>
            )}
          </div>
        </>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600">You don't have a store assigned yet.</p>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;