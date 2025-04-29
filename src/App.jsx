import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Welcome from './pages/Welcome';
import Plans from './pages/Plans';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './dashboard/Dashboard';
import Support from './pages/Support';
import DashboardHome from './dashboard/DashboardHome'; // Import the new DashboardHome component
import POS from './dashboard/POS';
import Inventory from './dashboard/Inventory';
import Reports from './dashboard/Reports';
import Employees from './dashboard/Employees';
import Unauthorized from './dashboard/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute'; // Import corrected ProtectedRoute
import YourAccount from './dashboard/YourAccount';
import Transactions from './dashboard/Transactions'; // Add this import
import ChatbotAssistant from './components/ChatbotAssistant'; // Add this import
import AIPredictor from './dashboard/AIPredictor';
function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/support" element={<Support />} /> {/* Add this line */}
        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardHome />} />
          <Route path="pos" element={
            <ProtectedRoute allowedRoles={['cashier', 'manager']}>
              <POS />
            </ProtectedRoute>
          } />
          <Route path="inventory" element={
            <ProtectedRoute allowedRoles={['stocker', 'manager']}>
              <Inventory />
            </ProtectedRoute>
          } />
          <Route path="reports" element={<Reports />} />
          <Route path="employees" element={<Employees />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="/dashboard/account" element={<YourAccount />} />
          <Route path="/dashboard/ai-predictor" element={<AIPredictor />} />
        </Route>
        
        {/* Catch all - redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
