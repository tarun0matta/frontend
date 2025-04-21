import { useState, useEffect, useContext } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiHome, FiBox, FiShoppingCart, FiBarChart2, FiUsers, FiLogOut
} from 'react-icons/fi';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const BASE_URL = "https://backend-production-9810.up.railway.app";

const navItems = [
  { to: '/dashboard', icon: <FiHome />, label: 'Dashboard' },
  { to: '/dashboard/inventory', icon: <FiBox />, label: 'Inventory' },
  { to: '/dashboard/pos', icon: <FiShoppingCart />, label: 'POS' },
  { to: '/dashboard/reports', icon: <FiBarChart2 />, label: 'Reports' },
  { to: '/dashboard/employees', icon: <FiUsers />, label: 'Employees' }
];

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, token, user } = useContext(AuthContext);

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
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <div className={`bg-white shadow-md transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} flex flex-col relative`}>
        <div
          onClick={toggleSidebar}
          className="px-4 py-4 border-b cursor-pointer hover:bg-gray-100 transition"
        >
          {isOpen && (
            <>
              <h2 className="text-xl font-bold text-blue-600">Infinity POS</h2>
              {user && <p className="text-sm text-gray-500 mt-1">Hi, {user.name}</p>}
            </>
          )}
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
            className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md mt-auto"
          >
            <FiLogOut />
            {isOpen && 'Logout'}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          {dashboardData ? (
            <>
              <p className="text-lg mb-1">👋 {dashboardData.message}</p>
              <p className="text-sm text-gray-500">Email: {dashboardData.email}</p>
              <p className="text-sm text-gray-500 mb-4">Plan: {dashboardData.plan}</p>
            </>
          ) : (
            <p className="text-sm text-gray-500">Loading...</p>
          )}

          {/* Render nested route pages */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, label, isOpen, isActive }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-100 transition font-medium 
      ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
  >
    <span>{icon}</span>
    {isOpen && <span>{label}</span>}
  </Link>
);

export default Dashboard;
