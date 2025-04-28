import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiBarChart2, FiPackage, FiClock, FiCloud, FiShield } from 'react-icons/fi';

const DashboardHome = ({ dashboardData }) => {
  const navigate = useNavigate();

  const quickActions = [
    { 
      label: 'New Sale', 
      icon: <FiShoppingCart size={20} />, 
      color: 'bg-indigo-600 hover:bg-indigo-700',
      action: () => navigate('/dashboard/pos')
    },
    { 
      label: 'View Reports', 
      icon: <FiBarChart2 size={20} />, 
      color: 'bg-purple-600 hover:bg-purple-700',
      action: () => navigate('/dashboard/reports')
    },
    { 
      label: 'Manage Inventory', 
      icon: <FiPackage size={20} />, 
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => navigate('/dashboard/inventory')
    },
  ];

  const features = [
    {
      title: "Real-time Inventory Management",
      description: "Keep track of your stock levels in real-time. Receive low stock alerts and automate reordering processes.",
      icon: <FiClock size={40} className="text-indigo-500" />,
    },
    {
      title: "Cloud-based Point of Sale",
      description: "Access your POS system from anywhere, on any device. Process transactions quickly and securely.",
      icon: <FiCloud size={40} className="text-blue-500" />,
    },
    {
      title: "Advanced Reporting & Analytics",
      description: "Gain insights into your business performance with detailed reports and customizable dashboards.",
      icon: <FiBarChart2 size={40} className="text-green-500" />,
    },
    {
      title: "Secure User Management",
      description: "Control access to your system with role-based permissions and multi-factor authentication.",
      icon: <FiShield size={40} className="text-purple-500" />,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Welcome to Infinity POS</h2>
        <p className="text-gray-600 mb-6">
          Streamline your business operations with our powerful point-of-sale system. 
          Manage inventory, process sales, and gain valuable insights all in one place.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-md text-white transition ${action.color}`}
            >
              {action.icon}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {dashboardData && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Key Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard title="Total Sales" value={`${dashboardData.totalSales.toFixed(2)}`} />
            <MetricCard title="Orders Today" value={dashboardData.ordersToday} />
            <MetricCard title="Low Stock Items" value={dashboardData.lowStockItems} />
            <MetricCard title="Active Employees" value={dashboardData.activeEmployees} />
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold mb-6">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex space-x-4">
              <div className="flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h4 className="text-sm font-medium text-gray-500 mb-1">{title}</h4>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

export default DashboardHome;