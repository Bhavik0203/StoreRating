import { useState, useEffect } from 'react';

const StoreForm = ({ initialData = null, onSubmit, isSubmitting }) => {
  const [storeData, setStoreData] = useState({
    name: '',
    email: '',
    address: '',
    ownerId: ''
  });

  useEffect(() => {
    if (initialData) {
      setStoreData({
        name: initialData.name,
        email: initialData.email,
        address: initialData.address,
        ownerId: initialData.ownerId
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(storeData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? 'Edit Store' : 'Add New Store'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Store Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={storeData.name}
            onChange={handleChange}
            required
            minLength="20"
            maxLength="60"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={storeData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={storeData.address}
            onChange={handleChange}
            required
            maxLength="400"
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="ownerId" className="block text-sm font-medium text-gray-700 mb-1">
            Owner ID
          </label>
          <input
            type="number"
            id="ownerId"
            name="ownerId"
            value={storeData.ownerId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md text-white transition ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isSubmitting ? 'Submitting...' : initialData ? 'Update Store' : 'Add Store'}
        </button>
      </form>
    </div>
  );
};

export default StoreForm;