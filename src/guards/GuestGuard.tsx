import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { ReactElement } from 'react';

export default function GuestGuard({ children }: { children: ReactElement }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  return <>{children}</>;
}
