import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  const location = useLocation();
  
  if (!token) {
    // Save the attempted URL for redirection after login
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}