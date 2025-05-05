import { RoutesConfig } from './types';
import DashboardLayout from '../layouts/DashboardLayout';
import PosPage from '../pages/pos/PosPage';
import InventoryPage from '../pages/inventory/InventoryPage';
import CustomersPage from '../pages/customers/CustomersPage';
import ReportsPage from '../pages/reports/ReportsPage';
import SettingsPage from '../pages/settings/SettingsPage';
import UserManagementPage from '../pages/settings/UserManagementPage';
import AdminPage from '../pages/admin/AdminPage';
import { Navigate } from 'react-router-dom';

const dashboardRoutes: RoutesConfig = [
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    protected: true,
    children: [
      { index: true, element: <Navigate to="/dashboard/pos" replace /> },
      { path: 'pos', element: <PosPage /> },
      { path: 'inventory', element: <InventoryPage /> },
      { path: 'customers', element: <CustomersPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'settings/users', element: <UserManagementPage /> },
      { 
        path: 'admin', 
        element: <AdminPage />,
        requiredRole: 'ADMIN'
      },
    ],
  },
];

export default dashboardRoutes;