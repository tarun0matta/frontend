import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const BASE_URL = "https://backend-production-9810.up.railway.app";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/dashboard');
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/login`, { email, password }, {
        headers: { 'Content-Type': 'application/json' }
      });
      const { token, user } = res.data;
      login(token, user);
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Login error:', err);
      alert(err.response?.data?.error || 'Login failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Find your account</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-6">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
        <h2 className="text-xl text-center mt-6">
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default ForgotPassword;
