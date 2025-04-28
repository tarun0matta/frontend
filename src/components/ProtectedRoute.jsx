import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  // ✅ If owner, allow access to everything
  if (user.role === 'owner') {
    return children;
  }

  // ✅ If no roles specified, allow any logged-in user
  if (allowedRoles.length === 0) {
    return children;
  }

  // ✅ Otherwise, check if user role is in allowedRoles
  if (allowedRoles.includes(user.role)) {
    return children;
  }

  // ❌ If none match, redirect to Unauthorized
  return <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
