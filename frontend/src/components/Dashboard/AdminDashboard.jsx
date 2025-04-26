import { useEffect } from 'react';
import { useStore } from '../../../context/StoreContext';

const AdminDashboard = () => {
  const { dashboardData, fetchDashboard, isLoading, error } = useStore();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (isLoading) return <div>Loading dashboard...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500">Total Stores</h3>
          <p className="text-3xl font-bold mt-2">{dashboardData?.totalStores || 0}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500">Total Users</h3>
          <p className="text-3xl font-bold mt-2">{dashboardData?.totalUsers || 0}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500">Total Ratings</h3>
          <p className="text-3xl font-bold mt-2">{dashboardData?.totalRatings || 0}</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
        {dashboardData?.recentActivity && dashboardData.recentActivity.length > 0 ? (
          <ul className="space-y-3">
            {dashboardData.recentActivity.map((activity, index) => (
              <li key={index} className="border-b pb-2 last:border-0 last:pb-0">
                <p className="text-gray-600">{activity.message}</p>
                <p className="text-sm text-gray-400">{new Date(activity.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recent activity</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;