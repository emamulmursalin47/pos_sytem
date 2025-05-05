import { RoutesConfig } from './types';
import AuthLayout from '../layouts/AuthLayout';
import LoginPage from '../pages/auth/LoginPage';
import { Navigate } from 'react-router-dom';

const authRoutes: RoutesConfig = [
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },
];

export default authRoutes;