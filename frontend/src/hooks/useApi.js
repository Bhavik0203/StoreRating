import { useState } from 'react';

const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const request = async (...args) => {
    setIsLoading(true);
    try {
      const result = await apiFunc(...args);
      setData(result);
      setError(null);
      return result;
    } catch (err) {
      setError(err.message || 'Unexpected Error!');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    error,
    isLoading,
    request,
  };
};

export default useApi;