import StoreCard from './StoreCard';

const StoreList = ({ stores, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!stores || stores.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No stores found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stores.map(store => (
        <StoreCard key={store.id} store={store} />
      ))}
    </div>
  );
};

export default StoreList;