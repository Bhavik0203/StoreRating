import { useEffect } from 'react';
import { useStore } from '../../../context/StoreContext';
import StoreCard from '../../../components/Stores/StoreCard';
import Loading from '../../../components/UI/Loading';

const StoreListPage = () => {
  const { stores, fetchStores, isLoading, error } = useStore();

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  if (isLoading) return <Loading />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">All Stores</h1>
        <p className="text-gray-600">Browse and rate your favorite stores</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map(store => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
      
      {stores.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No stores found</p>
        </div>
      )}
    </div>
  );
};

export default StoreListPage;