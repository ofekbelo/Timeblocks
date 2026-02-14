import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout/RootLayout';
import { AuthLayout } from '@/layouts/AuthLayout/AuthLayout';
import { ProtectedRoute } from '@/components/common/ProtectedRoute/ProtectedRoute';
import { Login } from '@/pages/auth/Login';
import { Register } from '@/pages/auth/Register';
import { Dashboard } from '@/pages/Dashboard/Dashboard';

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="/auth/login" replace /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'timer', element: <div>Timer Page (Coming Soon)</div> },
          { path: 'projects', element: <div>Projects Page (Coming Soon)</div> },
          { path: 'clients', element: <div>Clients Page (Coming Soon)</div> },
          { path: 'time-entries', element: <div>Time Entries Page (Coming Soon)</div> },
          { path: 'reports', element: <div>Reports Page (Coming Soon)</div> },
          { path: 'settings', element: <div>Settings Page (Coming Soon)</div> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);
