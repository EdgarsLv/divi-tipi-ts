import { useAuth } from '../contexts/AuthContext';
import { ReactElement, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spinner } from '../components';
import Login from '@/auth/login';

export default function RequireAuth({ children }: { children: ReactElement }) {
  const { isAuthenticated, isInitialized } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<any>(null);

  if (!isInitialized) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
