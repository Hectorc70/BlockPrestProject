/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { routeNames } from '@/router/routes';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const RequireAuth = ({ children }: any) => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true)
        setLoading(false)
        setIsAuthenticated(true)
      } catch (error:any) {
        setLoading(false)
        setIsAuthenticated(false)
        navigate(routeNames.initPage)
      }
    };
    checkAuth();
  }, [navigate]);

  if (loading) {
    return null; // Renderizar nada durante el estado de carga
  }

  return isAuthenticated ? children : null; // Render children only if authenticated
};

export default RequireAuth;
