import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { FiPlus } from 'react-icons/fi';
import CreateStore from '../components/CreateStore';

const BASE_URL = "https://backend-production-9810.up.railway.app";

const fetchUserStores = async (token) => {
  console.log('Fetching stores with token:', token);
  try {
    const response = await axios.get(`${BASE_URL}/api/stores`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('API Response:', response);
    return response.data.stores || [];
  } catch (error) {
    console.error('Error fetching user stores:', error.response || error);
    throw error;
  }
};

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { user, token } = useContext(AuthContext);

  console.log('Stores component rendered. User:', user, 'Token:', token);

  useEffect(() => {
    const loadStores = async () => {
      console.log('loadStores called');
      setIsLoading(true);
      try {
        const fetchedStores = await fetchUserStores(token);
        console.log('Stores loaded:', fetchedStores);
        setStores(fetchedStores);
      } catch (error) {
        console.error('Error in loadStores:', error);
        setError('Failed to fetch stores: ' + (error.response?.data?.error || error.message));
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      loadStores();
    } else {
      console.log('No token available, skipping store fetch');
      setIsLoading(false);
    }
  }, [token]);

  const handleStoreCreated = (newStoreId, newStoreName) => {
    setStores(prevStores => [...prevStores, { id: newStoreId, name: newStoreName }]);
    setIsCreateModalOpen(false);
  };

  console.log('Before render - isLoading:', isLoading, 'error:', error, 'stores:', stores);

  if (isLoading) return <div className="text-center py-10">Loading stores...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Your Stores</h1>
      <p>Debug: Stores count: {stores.length}</p>
      {/* Rest of your component */}
      <div className="flex justify-between items-center mb-6">
        {user && user.plan === 'premium' && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <FiPlus className="mr-2" /> Create New Store
          </button>
        )}
      </div>

      {stores.length === 0 ? (
        <p className="text-center py-10">You don't have any stores yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stores.map(store => (
            <div key={store.id} className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">{store.name}</h2>
              {/* Add more store details here */}
            </div>
          ))}
        </div>
      )}

      {isCreateModalOpen && (
        <CreateStore
          onClose={() => setIsCreateModalOpen(false)}
          onStoreCreated={handleStoreCreated}
        />
      )}
    </div>
  );
};

export default Stores;