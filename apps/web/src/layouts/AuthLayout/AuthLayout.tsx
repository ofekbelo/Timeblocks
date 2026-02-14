import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

export function AuthLayout() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
