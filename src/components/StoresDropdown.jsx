import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { FiPlus } from 'react-icons/fi';
import CreateStore from './CreateStore';

const BASE_URL = "https://backend-production-9810.up.railway.app";

const StoresDropdown = () => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    const fetchStores = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/stores`, {
          headers: { Authorization: `Bearer ${token}` }
        });
    
        // Correct this line:
        setStores(response.data.stores || []); 
    
        if (response.data.stores && response.data.stores.length > 0) {
          setSelectedStore(response.data.stores[0].id);
        }
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch stores');
        setIsLoading(false);
      }
    };
    

    fetchStores();
  }, [token]);

  const handleStoreChange = (e) => {
    setSelectedStore(e.target.value);
    // You might want to add logic here to update the current store in your app's state
  };

  const handleStoreCreated = (newStoreId, newStoreName) => {
    setStores([...stores, { id: newStoreId, name: newStoreName }]);
    setSelectedStore(newStoreId);
    setIsCreateModalOpen(false);
  };

  if (isLoading) return <div>Loading stores...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative">
      <select
        value={selectedStore}
        onChange={handleStoreChange}
        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        {stores.map(store => (
          <option key={store.id} value={store.id}>{store.name}</option>
        ))}
      </select>
      {user.plan === 'premium' && (
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
        >
          <FiPlus className="mr-2" /> Create New Store
        </button>
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

export default StoresDropdown;