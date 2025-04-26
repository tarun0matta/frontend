import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Public pages
import Welcome from './pages/Welcome';
import Plans from './pages/Plans';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
// Dashboard & subpages
import DashboardLayout from './dashboard/Dashboard';
import Inventory from './dashboard/Inventory';
import POS from './dashboard/POS';
import Reports from './dashboard/Reports';
import Employees from './dashboard/Employees';
import YourAccount from './dashboard/YourAccount';
import ProtectedRoute from './components/ProtectedRoute';

// Shared layout (includes Navbar)
import MainLayout from './components/MainLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages with Navbar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Route>

        {/* Protected dashboard layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<div>Welcome to the Dashboard!</div>} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="pos" element={<POS />} />
          <Route path="reports" element={<Reports />} />
          <Route path="employees" element={<Employees />} />
          <Route path="account" element={<YourAccount />} />
        </Route>

        {/* Catch-all: redirect to dashboard if unknown route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
