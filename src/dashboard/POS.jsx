import { useState, useEffect } from 'react';
import axios from 'axios';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

const API_BASE = 'https://backend-production-9810.up.railway.app';

const POS = () => {
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) setToken(stored);
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await axios.post(
        `${API_BASE}/inventory/search`,
        { query },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const found = res.data;

      const existing = cart.find((i) => i.barcode === found.barcode);
      if (existing) {
        setCart(
          cart.map((i) =>
            i.barcode === found.barcode
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        );
      } else {
        setCart([...cart, { ...found, quantity: 1 }]);
      }

      setQuery('');
    } catch (err) {
      alert(err.response?.data?.error || 'Item not found');
    }
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

  const handleQuantityChange = (index, qty) => {
    const updated = [...cart];
    updated[index].quantity = Math.max(1, qty);
    setCart(updated);
  };

  const handleConfirmSale = async () => {
    if (!cart.length) return alert('Cart is empty');

    const total = cart.reduce((sum, i) => sum + i.quantity * i.price, 0);

    try {
      await axios.post(
        `${API_BASE}/transactions`,
        {
          items: cart.map((item) => ({
            item_name: item.item_name,
            quantity: item.quantity,
            price: item.price,
          })),
          total,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('✅ Sale completed');
      setCart([]);
    } catch (err) {
      console.error(err);
      alert('❌ Failed to complete sale');
    }
  };

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto w-full">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">🛒 POS Terminal</h2>

      {/* Scanner */}
      {scanning && (
        <div className="mb-4">
          <BarcodeScannerComponent
            width={500}
            height={300}
            onUpdate={handleScan}
          />
          <button
            onClick={() => setScanning(false)}
            className="mt-2 text-sm text-red-600 hover:underline"
          >
            Cancel Scan
          </button>
        </div>
      )}

      {/* Search / Scan */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter item name or barcode"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-md"
        />
        <button onClick={handleSearch} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
          Search
        </button>
        <button onClick={() => setScanning(true)} className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
          Scan
        </button>
      </div>

      {/* Cart Preview */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">🧾 Cart Preview</h3>
        {cart.length === 0 ? (
          <p className="text-gray-500">No items in cart</p>
        ) : (
          <table className="min-w-full text-sm border border-gray-300 rounded">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">Item</th>
                <th className="px-4 py-2">Qty</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2">{item.item_name}</td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={(e) =>
                        handleQuantityChange(i, parseInt(e.target.value))
                      }
                      className="w-16 border rounded px-2 py-1"
                    />
                  </td>
                  <td className="px-4 py-2">₹{item.price}</td>
                  <td className="px-4 py-2">
                    ₹{(item.quantity * item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="mt-4 flex justify-between items-center">
          <p className="text-lg font-bold">
            Total: ₹
            {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
          </p>
          <button
            onClick={handleConfirmSale}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
          >
            Confirm Sale
          </button>
        </div>
      </div>
    </div>
  );
};

export default POS;
