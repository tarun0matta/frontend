import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const API_BASE = 'https://backend-production-9810.up.railway.app';

const Reports = () => {
  const [summary, setSummary] = useState(null);
  const [hourly, setHourly] = useState([]);
  const [topItems, setTopItems] = useState([]);
  const [range, setRange] = useState('today');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchSummary();
    fetchHourly();
    fetchTopItems();
  }, [range]);

  const fetchSummary = async () => {
    const res = await axios.get(`${API_BASE}/reports/summary?range=${range}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSummary(res.data);
  };

  const fetchHourly = async () => {
    const res = await axios.get(`${API_BASE}/reports/sales-by-hour`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setHourly(res.data);
  };

  const fetchTopItems = async () => {
    const res = await axios.get(`${API_BASE}/reports/top-items?range=${range}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTopItems(res.data);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">📊 Sales Reports</h2>

      {/* Filter */}
      <div className="mb-4 flex gap-4">
        {['today', 'week', 'month'].map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-4 py-2 rounded-md border ${
              range === r ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            {r.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 shadow rounded">
            <p className="text-sm text-gray-500">Total Sales</p>
            <h4 className="text-2xl font-bold">₹{summary.total_sales.toFixed(2)}</h4>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <p className="text-sm text-gray-500">Transactions</p>
            <h4 className="text-2xl font-bold">{summary.total_transactions}</h4>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <p className="text-sm text-gray-500">Avg Sale</p>
            <h4 className="text-2xl font-bold">₹{summary.avg_sale.toFixed(2)}</h4>
          </div>
        </div>
      )}

      {/* Line Chart */}
      <div className="bg-white p-4 shadow rounded mb-8">
        <h4 className="text-lg font-semibold mb-2">Sales by Hour</h4>
        <Line
          data={{
            labels: hourly.map((h) => `${h.hour}:00`),
            datasets: [
              {
                label: 'Total Sales',
                data: hourly.map((h) => h.total_sales),
                borderColor: 'rgba(59,130,246,1)',
                backgroundColor: 'rgba(59,130,246,0.2)',
                tension: 0.4,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: { legend: { position: 'top' } },
          }}
        />
      </div>

      {/* Top Items Bar Chart */}
      <div className="bg-white p-4 shadow rounded">
        <h4 className="text-lg font-semibold mb-2">Top 5 Items Sold</h4>
        <Bar
          data={{
            labels: topItems.map((i) => i.item_name),
            datasets: [
              {
                label: 'Quantity Sold',
                data: topItems.map((i) => i.total_qty),
                backgroundColor: 'rgba(34,197,94,0.6)',
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Reports;
