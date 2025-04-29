import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const API_BASE = 'https://backend-production-9810.up.railway.app';

const Reports = () => {
  const [reportData, setReportData] = useState(null);
  const [yearlySales, setYearlySales] = useState([]);
  const [dailySales, setDailySales] = useState([]);
  const [hourlySales, setHourlySales] = useState([]);
  const [topItems, setTopItems] = useState([]);
  const [range, setRange] = useState('day'); // Changed default to 'day' to match backend
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
    fetchYearlySales();
    fetchHourlySales();
    fetchTopItems();
  }, [range]);

  const fetchReports = async () => {
    try {
      const res = await axios.get(`${API_BASE}/reports`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReportData(res.data);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  const fetchYearlySales = async () => {
    // Implement this endpoint in your backend
    const res = await axios.get(`${API_BASE}/reports/yearly-sales`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setYearlySales(res.data);
  };

  const fetchDailySales = async () => {
    // Implement this endpoint in your backend
    const res = await axios.get(`${API_BASE}/reports/daily-sales`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setDailySales(res.data);
  };

  const fetchHourlySales = async () => {
    // Implement this endpoint in your backend
    const res = await axios.get(`${API_BASE}/reports/hourly-sales`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setHourlySales(res.data);
  };

  const fetchTopItems = async () => {
    const res = await axios.get(`${API_BASE}/reports/top-items?range=${range}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTopItems(res.data);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const chartColors = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
    'rgba(201, 203, 207, 0.8)'
  ];

  const handleAIPredictorClick = () => {
    navigate('/dashboard/ai-predictor');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-700">📊 Sales Reports</h2>
      </div>

      {/* AI Future Predictor Button */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-purple-700">🔮 AI Inventory Predictor</h3>
        <p className="text-gray-600 mb-4">
          Use our AI-powered tool to predict your future inventory needs based on historical data.
        </p>
        <button
          onClick={handleAIPredictorClick}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          Predict Future Inventory
        </button>
      </div>

      {/* Filter */}
      <div className="mb-8 flex gap-4 bg-white p-4 rounded-lg shadow">
        {['day', 'week', 'year'].map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-4 py-2 rounded-md transition-colors ${
              range === r ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      {reportData && (
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <p className="text-sm text-gray-500 mb-1">Total Sales</p>
            <h4 className="text-3xl font-bold text-blue-700">{formatCurrency(reportData[range].total_sales)}</h4>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <p className="text-sm text-gray-500 mb-1">Transactions</p>
            <h4 className="text-3xl font-bold text-green-700">{reportData[range].total_transactions}</h4>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
            <p className="text-sm text-gray-500 mb-1">Avg Sale</p>
            <h4 className="text-3xl font-bold text-purple-700">{formatCurrency(reportData[range].avg_sale)}</h4>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Yearly Sales Trend */}
        <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
          <h4 className="text-xl font-semibold mb-4 text-gray-700">Yearly Sales Trend</h4>
          <Line
            data={{
              labels: yearlySales.map(item => item.month),
              datasets: [{
                label: 'Total Sales',
                data: yearlySales.map(item => item.total_sales),
                borderColor: 'rgba(59,130,246,1)',
                backgroundColor: 'rgba(59,130,246,0.2)',
                tension: 0.4,
              }]
            }}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => formatCurrency(value)
                  }
                }
              }
            }}
          />
        </div>

        {/* Daily Sales */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4 text-gray-700">Sales by Day of Week</h4>
          <Bar
            data={{
              labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              datasets: [{
                label: 'Total Sales',
                data: dailySales,
                backgroundColor: 'rgba(59,130,246,0.8)',
              }]
            }}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => formatCurrency(value)
                  }
                }
              }
            }}
          />
        </div>

        {/* Hourly Sales */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4 text-gray-700">Sales by Time of Day</h4>
          <Line
            data={{
              labels: hourlySales.map(item => item.hour),
              datasets: [{
                label: 'Total Sales',
                data: hourlySales.map(item => item.total_sales),
                borderColor: 'rgba(59,130,246,1)',
                backgroundColor: 'rgba(59,130,246,0.2)',
                tension: 0.4,
              }]
            }}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => formatCurrency(value)
                  }
                }
              }
            }}
          />
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4 text-gray-700">Sales by Top Items</h4>
          <Doughnut
            data={{
              labels: topItems.map((item) => item.item_name),
              datasets: [
                {
                  data: topItems.map((item) => item.total_revenue),
                  backgroundColor: chartColors,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'right' },
                title: { display: false }
              }
            }}
          />
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4 text-gray-700">Top 5 Items by Quantity</h4>
          <Bar
            data={{
              labels: topItems.map((i) => i.item_name),
              datasets: [
                {
                  label: 'Quantity Sold',
                  data: topItems.map((i) => i.total_qty),
                  backgroundColor: chartColors,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                title: { display: false }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Quantity'
                  }
                }
              }
            }}
          />
        </div>

        {/* Data Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4 text-gray-700">Top Items Details</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 font-semibold">Item</th>
                  <th className="p-3 font-semibold">Quantity</th>
                  <th className="p-3 font-semibold">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topItems.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3">{item.item_name}</td>
                    <td className="p-3">{item.total_qty}</td>
                    <td className="p-3">{formatCurrency(item.total_revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;