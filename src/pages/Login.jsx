import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
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
            <NavButton to="/plans" variant="solid">Sign up</NavButton>
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

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const BASE_URL = "https://backend-production-9810.up.railway.app";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const googleButtonRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/dashboard');

    // Initialize Google OAuth
    if (window.google && googleButtonRef.current) {
      window.google.accounts.id.initialize({
        client_id: '937500943501-poolgbhil5a4vjcbkand61d4r7p6910u.apps.googleusercontent.com', // Replace with your actual Google Client ID
        callback: handleGoogleLogin
      });
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: 'outline',
        size: 'large',
        width: googleButtonRef.current.offsetWidth
      });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${BASE_URL}/login`, { email, password }, {
        headers: { 'Content-Type': 'application/json' }
      });
      const { token, user } = res.data;
      login(token, user);
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Login error:', err);
      setError(err.response?.data?.error || 'Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (googleResponse) => {
    setLoading(true);
    setError('');
    
    if (!googleResponse.credential) {
      console.error('No credential received from Google');
      setError('Google Login failed. Please try again.');
      setLoading(false);
      return;
    }
  
    try {
      const res = await axios.post(`${BASE_URL}/google-login`, 
        { token: googleResponse.credential }, 
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      const { token, user } = res.data;
      
      if (!token || !user) {
        throw new Error('Invalid response from server');
      }
  
      login(token, user);
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Google Login error:', err);
      if (err.response) {
        console.error('Server responded with:', err.response.data);
      }
      setError(err.response?.data?.error || 'Google Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-16 w-auto" src={logoImage} alt="Infinity POS" />
          <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
            Welcome back to{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              Infinity POS
            </span>
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Log in to streamline your operations and boost your business
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
  <div>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaEnvelope className="text-indigo-500" />
      </div>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pl-10"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  </div>

  <div>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaLock className="text-indigo-500" />
      </div>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pl-10"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  </div>

  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <input
        id="remember-me"
        name="remember-me"
        type="checkbox"
        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
        Remember me
      </label>
    </div>

    <div className="text-sm">
      <Link to="/forgotpassword" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out">
        Forgot your password?
      </Link>
    </div>
  </div>

  {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

  <div>
    <button
      type="submit"
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
      disabled={loading}
    >
      {loading ? 'Logging in...' : 'Log in'}
    </button>
  </div>
</form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="col-span-3">
                  <div ref={googleButtonRef} className="w-full h-10"></div>
                </div>
               
                
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;