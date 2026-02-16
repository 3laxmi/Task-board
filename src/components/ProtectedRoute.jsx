import React from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import Login from './Login.jsx';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;