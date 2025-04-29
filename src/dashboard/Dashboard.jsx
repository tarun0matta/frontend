import { useState, useEffect, useContext } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiHome, FiBox, FiShoppingCart, FiBarChart2, FiUsers, FiLogOut, FiMenu,
  FiUser, FiShoppingBag, FiInfo, FiPhoneCall, FiFileText
} from 'react-icons/fi';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import logoImage from '../assets/pica logo.png';
import StoresDropdown from '../components/StoresDropdown'; // Import StoresDropdown

const BASE_URL = "https://backend-production-9810.up.railway.app";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, token, user } = useContext(AuthContext);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isOwner = user?.role === 'owner';
  const isPremium = user?.plan === 'premium';
  const isCashier = user?.role === 'cashier';
  const isStocker = user?.role === 'stocker';
  const isManager = user?.role === 'manager';

  const navItems = [
    { to: '/dashboard', icon: <FiHome size={24} />, label: 'Dashboard', roles: ['owner', 'cashier', 'stocker', 'manager'] },
    { to: '/dashboard/pos', icon: <FiShoppingCart size={24} />, label: 'POS', roles: ['owner', 'cashier', 'manager'] },
    { to: '/dashboard/inventory', icon: <FiBox size={24} />, label: 'Inventory', roles: ['owner', 'stocker', 'manager'] },
    { to: '/dashboard/reports', icon: <FiBarChart2 size={24} />, label: 'Reports', roles: ['owner'] },
    { to: '/dashboard/transactions', icon: <FiFileText size={24} />, label: 'Transactions', roles: ['owner', 'cashier', 'manager'] },
    { to: '/dashboard/employees', icon: <FiUsers size={24} />, label: 'Employees', roles: ['owner'] },
    { to: '/dashboard/account', icon: <FiUser size={24} />, label: 'Account', roles: ['owner', 'cashier', 'stocker', 'manager'] }
  ];

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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-xl transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} flex flex-col`}>
        <div className="flex items-center justify-between p-4 border-b">
          {isOpen && (
            <span className="text-xl font-bold text-indigo-600">
              Infinity POS
            </span>
          )}
          <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-200 transition">
            <FiMenu size={24} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col flex-grow">
          {navItems.map(item => {
            if (item.roles.includes(user?.role) && (!item.premiumOnly || (item.premiumOnly && isPremium))) {
              return (
                <SidebarLink
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  isOpen={isOpen}
                  isActive={location.pathname === item.to}
                />
              );
            }
            return null;
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition mt-auto"
        >
          <FiLogOut size={24} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {isOwner && isPremium && (
                <div className="w-48">
                  <StoresDropdown />
                </div>
              )}
            <div className="flex items-center space-x-4">
              <img src={logoImage} alt="Infinity POS Logo" className="h-8 w-auto" />
              
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/about" className="text-gray-600 hover:text-gray-900 flex items-center">
                <FiInfo size={20} className="mr-1" />
                About Us
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900 flex items-center">
                <FiPhoneCall size={20} className="mr-1" />
                Contact
              </Link>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, label, isOpen, isActive }) => (
  <Link
    to={to}
    className={`flex items-center gap-4 px-4 py-3 transition text-lg font-medium 
      ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
  >
    <span>{icon}</span>
    {isOpen && <span>{label}</span>}
  </Link>
);

export default Dashboard;
