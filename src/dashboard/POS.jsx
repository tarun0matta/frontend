import { useState, useEffect } from 'react';
import axios from 'axios';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { FiSearch, FiCamera, FiShoppingCart, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

const API_BASE = 'https://backend-production-9810.up.railway.app';

const POS = () => {
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [token, setToken] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) setToken(stored);
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const res = await axios.post(`${API_BASE}/inventory/search`, { query }, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      console.log('Search results:', res.data);
      setSearchResults(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (err) {
      console.error('Search error:', err);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim()) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const addItemToCart = (item) => {
    const existing = cart.find((i) => i.barcode === item.barcode);
    if (existing) {
      setCart(cart.map((i) => i.barcode === item.barcode ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    setQuery('');
    setSearchResults([]);
  };

  const handleScan = (err, result) => {
    if (result) {
      setScanning(false);
      setQuery(result.text);
      handleSearch();
    } else if (err) {
      console.error('Scan error:', err);
    }
  };

  const handleQuantityChange = (index, change) => {
    const updated = [...cart];
    updated[index].quantity = Math.max(1, updated[index].quantity + change);
    setCart(updated);
  };

  const handleRemoveItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleConfirmSale = async () => {
    if (!cart.length) return alert('Cart is empty');
    const total = cart.reduce((sum, i) => sum + i.quantity * i.price, 0);
    try {
      await axios.post(`${API_BASE}/transactions`, {
        items: cart.map((item) => ({
          item_name: item.item_name,
          quantity: item.quantity,
          price: item.price,
        })),
        total,
      }, { headers: { Authorization: `Bearer ${token}` } });
      alert('✅ Sale completed');
      setCart([]);
    } catch (err) {
      console.error(err);
      alert('❌ Failed to complete sale');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-1 p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">POS Terminal</h2>
            
            {/* Search / Scan */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Enter item name or barcode"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                
                {/* Dropdown for search results */}
                {searchResults.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {searchResults.map((item, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => addItemToCart(item)}
                      >
                        {item.item_name} - ${item.price.toFixed(2)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button 
                onClick={() => setScanning(true)} 
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300 flex items-center"
              >
                <FiCamera className="mr-2" /> Scan
              </button>
            </div>

            {/* Scanner */}
            {scanning && (
              <div className="mb-6">
                <BarcodeScannerComponent width={500} height={300} onUpdate={handleScan} />
                <button
                  onClick={() => setScanning(false)}
                  className="mt-2 text-sm text-red-600 hover:underline"
                >
                  Cancel Scan
                </button>
              </div>
            )}

            {/* Cart Preview */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <FiShoppingCart className="mr-2" /> Cart Preview
              </h3>
              {cart.length === 0 ? (
                <p className="text-gray-500">No items in cart</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                      <tr>
                        <th scope="col" className="px-6 py-3 rounded-tl-lg">Item</th>
                        <th scope="col" className="px-6 py-3">Qty</th>
                        <th scope="col" className="px-6 py-3">Price</th>
                        <th scope="col" className="px-6 py-3">Total</th>
                        <th scope="col" className="px-6 py-3 rounded-tr-lg">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item, i) => (
                        <tr key={i} className="bg-white border-b">
                          <td className="px-6 py-4 font-medium text-gray-900">{item.item_name}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <button onClick={() => handleQuantityChange(i, -1)} className="text-gray-500 hover:text-gray-700">
                                <FiMinus />
                              </button>
                              <span>{item.quantity}</span>
                              <button onClick={() => handleQuantityChange(i, 1)} className="text-gray-500 hover:text-gray-700">
                                <FiPlus />
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4">${item.price.toFixed(2)}</td>
                          <td className="px-6 py-4">${(item.quantity * item.price).toFixed(2)}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleRemoveItem(i)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <FiTrash2 />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Total and Confirm Section */}
          <div className="md:w-1/3 bg-gray-800 p-6 text-white">
            <h3 className="text-2xl font-semibold mb-6">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%)</span>
                <span>${(cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${(cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 1.1).toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleConfirmSale}
              className="mt-8 w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Confirm Sale
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POS;