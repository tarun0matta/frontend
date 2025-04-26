import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';

const BASE_URL = "https://backend-production-9810.up.railway.app";

const Inventory = () => {
  const [formData, setFormData] = useState({ name: '', quantity: '', price: '', barcode: '' });
  const [previewList, setPreviewList] = useState([]);
  const [inventoryList, setInventoryList] = useState([]);
  const [token, setToken] = useState('');
  const [showInventory, setShowInventory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) setToken(stored);
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddPreview = () => {
    if (!formData.name || !formData.quantity) return;
    setPreviewList([...previewList, formData]);
    setFormData({ name: '', quantity: '', price: '', barcode: '' });
  };

  const handleSubmit = async () => {
    if (!previewList.length) return;
    setLoading(true);
    setError(null);
    try {
      await axios.post(
        `${BASE_URL}/inventory`,
        { items: previewList },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Inventory added!');
      setPreviewList([]);
      fetchInventory();
    } catch (err) {
      console.error(err);
      setError('Error submitting inventory');
    } finally {
      setLoading(false);
    }
  };

  const fetchInventory = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}/inventory`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInventoryList(res.data);
      setShowInventory(true);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch inventory.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setLoading(true);
      setError(null);
      try {
        await axios.delete(`${BASE_URL}/inventory/${itemId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchInventory();
      } catch (err) {
        console.error(err);
        setError('Failed to delete item');
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredInventory = inventoryList.filter(item =>
    item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.barcode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto w-full">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">📦 Inventory Manager</h2>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Item Name" className="w-full px-4 py-2 border rounded-md" />
          <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} placeholder="Quantity" className="w-full px-4 py-2 border rounded-md" />
          <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price (optional)" className="w-full px-4 py-2 border rounded-md" />
          <input name="barcode" value={formData.barcode} onChange={handleChange} placeholder="Barcode (optional)" className="w-full px-4 py-2 border rounded-md" />
        </div>
        <button onClick={handleAddPreview} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-6">
          <FiPlus className="inline mr-2" /> Add to Preview
        </button>

        {/* Preview Table */}
        {previewList.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">📝 Preview</h3>
            <table className="w-full text-sm border border-gray-300 rounded-md overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Item</th>
                  <th className="px-4 py-2">Qty</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Barcode</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {previewList.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">{item.price || '-'}</td>
                    <td className="px-4 py-2">{item.barcode || '-'}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => {
                          setFormData(item);
                          setPreviewList(previewList.filter((_, i) => i !== idx));
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        <FiEdit2 className="inline" />
                      </button>
                      <button
                        onClick={() => {
                          setPreviewList(previewList.filter((_, i) => i !== idx));
                        }}
                        className="text-red-600 hover:underline"
                      >
                        <FiTrash2 className="inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={handleSubmit}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        )}

        {/* View Inventory Button */}
        <button onClick={fetchInventory} className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 mb-4" disabled={loading}>
          {loading ? 'Loading...' : 'View Inventory'}
        </button>

        {/* Search Bar */}
        {showInventory && (
          <div className="flex items-center bg-white rounded-md shadow-sm mb-4">
            <FiSearch className="ml-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search inventory..."
              className="w-full p-2 rounded-md focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        {/* Inventory Table */}
        {showInventory && filteredInventory.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-2">📋 Your Inventory</h3>
            <table className="w-full text-sm border border-gray-300 rounded-md overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Item</th>
                  <th className="px-4 py-2">Qty</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Barcode</th>
                  <th className="px-4 py-2">Created</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2">{item.item_name}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">{item.price}</td>
                    <td className="px-4 py-2">{item.barcode}</td>
                    <td className="px-4 py-2">{new Date(item.created_at).toLocaleString()}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-600 hover:underline"
                      >
                        <FiTrash2 className="inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Inventory;