import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout/RootLayout';
import { AuthLayout } from '@/layouts/AuthLayout/AuthLayout';
import { ProtectedRoute } from '@/components/common/ProtectedRoute/ProtectedRoute';
import { Login } from '@/pages/auth/Login';
import { Register } from '@/pages/auth/Register';
import { Dashboard } from '@/pages/Dashboard/Dashboard';
import { Timer } from '@/pages/Timer';
import { ProjectsList } from '@/pages/Projects/ProjectsList';
import { ProjectForm } from '@/pages/Projects/ProjectForm';
import { ClientsList } from '@/pages/Clients/ClientsList';
import { ClientForm } from '@/pages/Clients/ClientForm';
import { Reports } from '@/pages/Reports';

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
          { path: 'timer', element: <Timer /> },

          // Projects routes
          { path: 'projects', element: <ProjectsList /> },
          { path: 'projects/new', element: <ProjectForm /> },
          { path: 'projects/:id/edit', element: <ProjectForm /> },

          // Clients routes
          { path: 'clients', element: <ClientsList /> },
          { path: 'clients/new', element: <ClientForm /> },
          { path: 'clients/:id/edit', element: <ClientForm /> },

          // Other routes
          { path: 'time-entries', element: <div>Time Entries (Coming Soon)</div> },
          { path: 'reports', element: <Reports /> },
          { path: 'settings', element: <div>Settings (Coming Soon)</div> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);
