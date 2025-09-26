import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import api from '../utils/api';

export default function PrivateRoute({ children }) {
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValidating(false);
        return;
      }

      try {
        await api.get('/api/auth/validate');
        setIsValid(true);
      } catch (error) {
        localStorage.removeItem('token');
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token]);

  if (isValidating) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
    </div>;
  }

  if (!isValid || !token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}