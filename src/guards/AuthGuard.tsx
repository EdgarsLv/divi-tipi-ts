import { useAuth } from '../contexts/AuthContext';
import { ReactElement, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spinner } from '../components';

export default function AuthGuard({ children }: { children: ReactElement }) {
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
    return <Navigate to='login' replace={true} />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
