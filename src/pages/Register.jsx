import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';
import { FaUser, FaEnvelope, FaLock, FaCalendar, FaPhone, FaBuilding } from 'react-icons/fa';
import logoImage from '../assets/pica logo.png';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logoImage} alt="Infinity POS Logo" className="h-12 w-auto" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Infinity POS
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/features">Features</NavLink>
            <NavLink to="/pricing">Pricing</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
          <div className="flex items-center space-x-4">
            <NavButton to="/login" variant="outline">Log in</NavButton>
            <NavButton to="/register" variant="solid">Sign up</NavButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }) => (
  <Link to={to} className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
    {children}
  </Link>
);

const NavButton = ({ to, children, variant }) => (
  <Link
    to={to}
    className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md transition duration-150 ease-in-out ${
      variant === 'solid'
        ? 'border-transparent text-white bg-indigo-600 hover:bg-indigo-700'
        : 'border-indigo-600 text-indigo-600 bg-white hover:bg-indigo-50'
    }`}
  >
    {children}
  </Link>
);

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const selectedPlan = queryParams.get('plan') || 'standard';

  const BASE_URL = "https://backend-production-9810.up.railway.app";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    phone: '',
    plan: selectedPlan,
    business_name: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${BASE_URL}/register`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('✅ Registered:', res.data);
      navigate('/business-details');
    } catch (err) {
      console.error('❌ Registration error:', err);
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <animated.div style={fadeIn} className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto h-16 w-auto" src={logoImage} alt="Infinity POS" />
            <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
              Create your account in{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                Infinity POS
              </span>
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Register to streamline your operations and boost your business
            </p>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <InputField
                  icon={<FaUser className="text-indigo-500" />}
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
              />
              <InputField
                icon={<FaEnvelope className="text-indigo-500" />}
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <InputField
                icon={<FaLock className="text-indigo-500" />}
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <InputField
                icon={<FaCalendar className="text-indigo-500" />}
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
              <InputField
                icon={<FaPhone className="text-indigo-500" />}
                type="tel"
                name="phone"
                placeholder="Phone Number (optional)"
                value={formData.phone}
                onChange={handleChange}
              />
              <div className="relative">
                <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500" />
                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pl-10"
                  required
                >
                  <option value="standard">Standard Plan</option>
                  <option value="premium">Premium Plan</option>
                </select>
              </div>
              <InputField
                icon={<FaBuilding className="text-indigo-500" />}
                type="text"
                name="business_name"
                placeholder="Business Name"
                value={formData.business_name}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                disabled={loading}
              >
                {loading ? 'Creating your account...' : 'Get Started'}
              </button>
            </div>
          </form>
        </div>
        
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out">
            Log in
          </Link>
        </p>
      </animated.div>
    </div>
  </div>
);
};

const InputField = ({ icon, type, name, placeholder, value, onChange, required }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {icon}
    </div>
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pl-10"
    />
  </div>
);

export default Register;