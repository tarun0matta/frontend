import { useState, useEffect, useContext } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiHome, FiBox, FiShoppingCart, FiBarChart2, FiUsers, FiLogOut, FiMenu,
  FiPackage, FiClock, FiCloud, FiShield, FiUser, FiInfo, FiPhoneCall
} from 'react-icons/fi';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import logoImage from '../assets/pica logo.png';
import YourAccount from './YourAccount';

const BASE_URL = "https://backend-production-9810.up.railway.app";

const navItems = [
  { to: '/dashboard', icon: <FiHome size={24} />, label: 'Dashboard' },
  { to: '/dashboard/inventory', icon: <FiBox size={24} />, label: 'Inventory' },
  { to: '/dashboard/pos', icon: <FiShoppingCart size={24} />, label: 'POS' },
  { to: '/dashboard/reports', icon: <FiBarChart2 size={24} />, label: 'Reports' },
  { to: '/dashboard/employees', icon: <FiUsers size={24} />, label: 'Employees' },
  { to: '/dashboard/account', icon: <FiUser size={24} />, label: 'Account' }
];

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, token } = useContext(AuthContext);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/dashboard-data`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setDashboardData(res.data);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
        logout();
        navigate('/login');
      }
    };

    fetchData();
  }, [token, logout, navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-xl transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} flex flex-col`}>
        <div className="flex items-center justify-between p-4 border-b">
          {isOpen && (
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Infinity POS
              </span>
            </div>
          )}
          <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-200 transition">
            <FiMenu size={24} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-2 p-4 flex-grow">
          {navItems.map(item => (
            <SidebarLink
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isOpen={isOpen}
              isActive={location.pathname === item.to}
            />
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-md mt-auto text-lg font-medium"
          >
            <FiLogOut size={24} />
            {isOpen && 'Logout'}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="w-24"></div> {/* Empty div for spacing */}
            <Link to="/dashboard" className="flex items-center justify-center">
              <img src={logoImage} alt="Infinity POS Logo" className="h-10 w-auto" />
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/about" className="text-gray-600 hover:text-gray-900 flex items-center">
                <FiInfo className="mr-1" />
                About Us
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900 flex items-center">
                <FiPhoneCall className="mr-1" />
                Contact
              </Link>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {location.pathname === '/dashboard' ? (
              <DashboardHome dashboardData={dashboardData} />
            ) : location.pathname === '/dashboard/account' ? (
              <YourAccount />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <Outlet />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`flex flex-col items-center justify-center space-y-2 px-4 py-3 rounded-md text-white transition ${action.color}`}
            >
              {action.icon}
              <span className="text-sm">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

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

const SidebarLink = ({ to, icon, label, isOpen, isActive }) => (
  <Link
    to={to}
    className={`flex items-center gap-4 px-4 py-3 rounded-md transition text-lg font-medium 
      ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
  >
    <span>{icon}</span>
    {isOpen && <span>{label}</span>}
  </Link>
);

export default Dashboard;