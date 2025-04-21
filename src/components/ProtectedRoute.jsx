import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  // If no token, redirect to login
  if (!token) return <Navigate to="/login" replace />;

  // Otherwise, allow access
  return children;
};

export default ProtectedRoute;
