import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiCamera } from 'react-icons/fi';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

const BASE_URL = "https://backend-production-9810.up.railway.app";

const Inventory = () => {
  const [formData, setFormData] = useState({ name: '', quantity: '', price: '', barcode: '' });
  const [previewList, setPreviewList] = useState([]);
  const [inventoryList, setInventoryList] = useState([]);
  const [token, setToken] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('add');
  const [editingItem, setEditingItem] = useState(null);
  const [showScanner, setShowScanner] = useState(false);

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
    try {
      await axios.post(`${BASE_URL}/inventory`, { items: previewList }, { headers: { Authorization: `Bearer ${token}` } });
      alert('Inventory added successfully!');
      setPreviewList([]);
    } catch (err) {
      setError('Error submitting inventory');
    } finally {
      setLoading(false);
    }
  };

  const handleScan = (err, result) => {
    if (result) {
      setSearchTerm(result.text);
      setShowScanner(false);
    }
  };

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/inventory`, { headers: { Authorization: `Bearer ${token}` } });
      setInventoryList(res.data);
    } catch (err) {
      setError('Failed to fetch inventory.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (item) => {
    setEditingItem({ ...item });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleUpdateItem = async (itemId) => {
    if (!editingItem) return;
  
    const updatedData = {
      item_name: editingItem.item_name,
      quantity: parseInt(editingItem.quantity),
      price: parseFloat(editingItem.price),
      barcode: editingItem.barcode || null
    };
  
    setLoading(true);
    try {
      const res = await axios.put(`${BASE_URL}/inventory/${itemId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Update success:', res.data);
      alert('Item updated successfully');
      fetchInventory();
      setEditingItem(null);
    } catch (err) {
      console.error('Update error:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Failed to update item. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setLoading(true);
      try {
        await axios.delete(`${BASE_URL}/inventory/${itemId}`, { headers: { Authorization: `Bearer ${token}` } });
        alert('Item deleted successfully');
        fetchInventory();
      } catch (err) {
        setError('Failed to delete item. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredInventory = inventoryList.filter(item =>
    item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.barcode && item.barcode.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto w-full">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">📦 Inventory Manager</h2>

      <div className="flex mb-6 space-x-4">
        {['add', 'view'].map(tab => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              if (tab === 'view') fetchInventory();
            }}
            className={`px-4 py-2 rounded-t-lg ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Inventory
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {activeTab === 'add' && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Add New Items</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {['name', 'quantity', 'price', 'barcode'].map(field => (
                <input
                  key={field}
                  name={field}
                  type={field === 'quantity' || field === 'price' ? 'number' : 'text'}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)}${field === 'price' || field === 'barcode' ? ' (optional)' : ''}`}
                  className="w-full px-4 py-2 border rounded-md"
                />
              ))}
            </div>
            <button onClick={handleAddPreview} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-6">
              <FiPlus className="inline mr-2" /> Add to Preview
            </button>

            {previewList.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-2">📝 Preview</h4>
                <table className="w-full text-sm border border-gray-300 rounded-md overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      {['Item', 'Qty', 'Price', 'Barcode', 'Actions'].map(header => (
                        <th key={header} className="px-4 py-2">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewList.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">{item.quantity}</td>
                        <td className="px-4 py-2">{item.price || '-'}</td>
                        <td className="px-4 py-2">{item.barcode || '-'}</td>
                        <td className="px-4 py-2">
                          <button onClick={() => { setFormData(item); setPreviewList(previewList.filter((_, i) => i !== idx)); }} className="text-blue-600 hover:underline">
                            <FiEdit2 className="inline" />
                          </button>
                          <button onClick={() => { setPreviewList(previewList.filter((_, i) => i !== idx)); }} className="text-red-600 hover:underline">
                            <FiTrash2 className="inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button onClick={handleSubmit} className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'view' && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">View Inventory</h3>
            <div className="flex items-center bg-white rounded-md shadow-sm mb-4">
              <FiSearch className="ml-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search inventory..."
                className="w-full p-2 rounded-md focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={() => setShowScanner(!showScanner)}
                className="p-2 text-blue-600 hover:text-blue-800"
              >
                <FiCamera size={20} />
              </button>
            </div>

            {showScanner && (
              <div className="mb-4">
                <BarcodeScannerComponent
                  width={500}
                  height={300}
                  onUpdate={handleScan}
                />
              </div>
            )}

            {loading ? (
              <p className="text-gray-600">Loading inventory...</p>
            ) : filteredInventory.length > 0 ? (
              <table className="w-full text-sm border border-gray-300 rounded-md overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    {['Item', 'Qty', 'Price', 'Barcode', 'Created', 'Actions'].map(header => (
                      <th key={header} className="px-4 py-2">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map(item => (
                    <tr key={item.id} className={editingItem && editingItem.id === item.id ? 'bg-blue-50' : ''}>
                      <td className="px-4 py-2">
                        {editingItem && editingItem.id === item.id ? (
                          <input type="text" value={editingItem.item_name} onChange={(e) => setEditingItem(prev => ({ ...prev, item_name: e.target.value }))} className="w-full px-2 py-1 border rounded" />
                        ) : item.item_name}
                      </td>
                      <td className="px-4 py-2">
                        {editingItem && editingItem.id === item.id ? (
                          <input type="number" value={editingItem.quantity} onChange={(e) => setEditingItem(prev => ({ ...prev, quantity: e.target.value }))} className="w-full px-2 py-1 border rounded" />
                        ) : item.quantity}
                      </td>
                      <td className="px-4 py-2">
                        {editingItem && editingItem.id === item.id ? (
                          <input type="number" value={editingItem.price} onChange={(e) => setEditingItem(prev => ({ ...prev, price: e.target.value }))} className="w-full px-2 py-1 border rounded" />
                        ) : item.price}
                      </td>
                      <td className="px-4 py-2">
                        {editingItem && editingItem.id === item.id ? (
                          <input type="text" value={editingItem.barcode || ''} onChange={(e) => setEditingItem(prev => ({ ...prev, barcode: e.target.value }))} className="w-full px-2 py-1 border rounded" />
                        ) : (item.barcode || '-')}
                      </td>
                      <td className="px-4 py-2">{new Date(item.created_at).toLocaleString()}</td>
                      <td className="px-4 py-2">
                        {editingItem && editingItem.id === item.id ? (
                          <>
                            <button onClick={() => handleUpdateItem(item.id)} className="text-green-600 hover:underline" disabled={loading}>Save</button>
                            <button onClick={handleCancelEdit} className="text-gray-600 hover:underline ml-2">Cancel</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleEditClick(item)} className="text-blue-600 hover:underline"><FiEdit2 className="inline" /></button>
                            <button onClick={() => handleDeleteItem(item.id)} className="text-red-600 hover:underline ml-2"><FiTrash2 className="inline" /></button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-600">No inventory items found.</p>
            )}
          </div>
        )}

        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Inventory;