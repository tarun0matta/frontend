import { Link, useLocation } from 'react-router-dom';

// simulate logged-in status (replace with actual auth logic later)
const isLoggedIn = () => {
  const protectedRoutes = ['/dashboard', '/inventory', '/pos', '/reports', '/employees'];
  const path = window.location.pathname;
  return protectedRoutes.some(route => path.startsWith(route));
};

const Navbar = () => {
  const location = useLocation();
  const loggedIn = isLoggedIn();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Infinity POS
        </Link>

        <nav className="space-x-4">
          {loggedIn ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                Dashboard
              </Link>
              <Link to="/inventory" className="text-gray-700 hover:text-blue-600 font-medium">
                Inventory
              </Link>
              <Link to="/pos" className="text-gray-700 hover:text-blue-600 font-medium">
                POS
              </Link>
              <Link to="/reports" className="text-gray-700 hover:text-blue-600 font-medium">
                Reports
              </Link>
              <Link to="/employees" className="text-gray-700 hover:text-blue-600 font-medium">
                Employees
              </Link>
              <button className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 font-medium hover:underline">
                Login
              </Link>
              <Link to="/plans" className="text-blue-600 font-medium hover:underline">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
