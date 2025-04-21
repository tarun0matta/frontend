import { useState } from 'react';

const Inventory = () => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: '',
    barcode: ''
  });

  const [previewList, setPreviewList] = useState([]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddPreview = () => {
    if (!formData.name || !formData.quantity) return;
    setPreviewList([...previewList, formData]);
    setFormData({ name: '', quantity: '', price: '', barcode: '' });
  };

  const handleSubmit = () => {
    // Placeholder: Send previewList to backend
    alert('Inventory added!');
    setPreviewList([]);
  };

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto w-full">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-2">📦 Inventory Manager</h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Add new stock items and view your inventory preview before submitting.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            name="price"
            placeholder="Unit Price (optional)"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="barcode"
            placeholder="Barcode (optional)"
            value={formData.barcode}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />

          <button
            onClick={handleAddPreview}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add to Preview
          </button>
        </div>

        {/* Preview Section */}
        {previewList.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">📝 Preview</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="px-4 py-2">Item</th>
                    <th className="px-4 py-2">Qty</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Barcode</th>
                  </tr>
                </thead>
                <tbody>
                  {previewList.map((item, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2">{item.price || '-'}</td>
                      <td className="px-4 py-2">{item.barcode || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={handleSubmit}
              className="mt-4 bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition"
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
