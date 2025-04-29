import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'https://backend-production-9810.up.railway.app';

const AIPredictor = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    getPrediction();
  }, []);

  const getPrediction = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE}/predict-inventory`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPrediction(response.data);
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-100">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">🔮 AI Inventory Predictor</h2>
      
      {loading && <p className="text-gray-600">Loading prediction...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {prediction && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Predicted Inventory for Next Month</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-purple-100">
                  <th className="p-3 font-semibold">Item</th>
                  <th className="p-3 font-semibold">Current Stock</th>
                  <th className="p-3 font-semibold">Predicted Demand</th>
                  <th className="p-3 font-semibold">Suggested Order</th>
                </tr>
              </thead>
              <tbody>
                {prediction.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3">{item.item_name}</td>
                    <td className="p-3">{item.current_stock}</td>
                    <td className="p-3">{item.predicted_demand.toFixed(2)}</td>
                    <td className="p-3">{item.suggested_order}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPredictor;