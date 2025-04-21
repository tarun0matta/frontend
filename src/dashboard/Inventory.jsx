import { useState, useEffect } from 'react';
import axios from 'axios';

const Inventory = () => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: '',
    barcode: ''
  });

  const [previewList, setPreviewList] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) setToken(stored);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddPreview = () => {
    if (!formData.name || !formData.quantity) return;

    setPreviewList(prev => [...prev, formData]);
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
      alert('✅ Inventory submitted successfully!');
      setPreviewList([]);
    } catch (err) {
      console.error('❌ Error:', err.response || err.message);
      alert(err.response?.data?.error || 'Submission failed.');
    }
  };

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto w-full">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4">📦 Inventory Manager</h2>

        {/* Form Fields */}
        <div className="space-y-4 mb-6">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Item Name"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price (optional)"
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            name="barcode"
            value={formData.barcode}
            onChange={handleChange}
            placeholder="Barcode (optional)"
            className="w-full px-4 py-2 border rounded-md"
          />
          <button
            onClick={handleAddPreview}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add to Preview
          </button>
        </div>

        {/* Preview Table */}
        {previewList.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-2">📝 Preview</h3>
            <table className="w-full border text-sm rounded-md overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Item</th>
                  <th className="px-4 py-2 text-left">Qty</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Barcode</th>
                </tr>
              </thead>
              <tbody>
                {previewList.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">{item.price || '-'}</td>
                    <td className="px-4 py-2">{item.barcode || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={handleSubmit}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Submit to Inventory
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
