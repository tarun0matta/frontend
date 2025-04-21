import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          Welcome to <span className="text-blue-600">Infinity POS</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-10">
          Simplify your inventory and sales process. Designed for modern businesses with smart insights, real-time control, and multi-store power.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/plans">
            <button className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition duration-300">
              Get Started
            </button>
          </Link>
          <Link to="/login">
            <button className="px-6 py-3 text-blue-600 border border-blue-600 hover:bg-blue-50 rounded-md font-medium transition duration-300">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
