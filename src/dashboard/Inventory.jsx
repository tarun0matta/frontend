import { useState, useEffect } from 'react';
import axios from 'axios';

const Inventory = () => {
  const [formData, setFormData] = useState({ name: '', quantity: '', price: '', barcode: '' });
  const [previewList, setPreviewList] = useState([]);
  const [inventoryList, setInventoryList] = useState([]);
  const [token, setToken] = useState('');
  const [showInventory, setShowInventory] = useState(false);

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
    try {
      await axios.post(
        'https://backend-production-9810.up.railway.app/inventory',
        { items: previewList },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Inventory added!');
      setPreviewList([]);
      fetchInventory(); // optional auto-refresh
    } catch (err) {
      console.error(err);
      alert('Error submitting inventory');
    }
  };

  const fetchInventory = async () => {
    try {
      const res = await axios.get('https://backend-production-9810.up.railway.app/inventory', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInventoryList(res.data);
      setShowInventory(true);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch inventory.');
    }
  };

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto w-full">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">📦 Inventory Manager</h2>

        {/* Form Inputs */}
        <div className="space-y-4 mb-6">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Item Name" className="w-full px-4 py-2 border rounded-md" />
          <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} placeholder="Quantity" className="w-full px-4 py-2 border rounded-md" />
          <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price (optional)" className="w-full px-4 py-2 border rounded-md" />
          <input name="barcode" value={formData.barcode} onChange={handleChange} placeholder="Barcode (optional)" className="w-full px-4 py-2 border rounded-md" />
          <button onClick={handleAddPreview} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add to Preview</button>
        </div>

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
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setPreviewList(previewList.filter((_, i) => i !== idx));
                        }}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={handleSubmit}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        )}


        {/* View Inventory Button */}
        <button onClick={fetchInventory} className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 mb-4">
          View Inventory
        </button>

        {/* Inventory Table */}
        {showInventory && inventoryList.length > 0 && (
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
                </tr>
              </thead>
              <tbody>
                {inventoryList.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2">{item.item_name}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">{item.price}</td>
                    <td className="px-4 py-2">{item.barcode}</td>
                    <td className="px-4 py-2">{new Date(item.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
