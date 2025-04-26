import React, { useState, useEffect } from 'react';
import StoreCard from '../components/StoreCard';
import { storeService } from '../services/storeService';
import { HiSearch } from 'react-icons/hi';
import toast from 'react-hot-toast';

const Home = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await storeService.getAllStores();
        setStores(response.data);
        setFilteredStores(response.data);
      } catch (error) {
        console.error('Error fetching stores:', error);
        toast.error('Failed to load stores');
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = stores.filter(store => 
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStores(filtered);
    } else {
      setFilteredStores(stores);
    }
  }, [searchTerm, stores]);

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Find and Rate Your Favorite Stores</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover top-rated stores in your area and share your experiences with others.
        </p>
      </div>

      <div className="max-w-xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for stores by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
          <HiSearch className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-2 text-gray-600">Loading stores...</p>
        </div>
      ) : (
        <>
          {filteredStores.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No stores found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStores.map(store => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;