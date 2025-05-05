import { BrowserRouter, RouteObject, useRoutes } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { ReactNode } from 'react';
import authRoutes from './authRoutes';
import dashboardRoutes from './dashboardRoutes';
import { RoutesConfig, CustomRouteObject } from './types';
import { Navigate } from 'react-router-dom';

// Protected route component
const ProtectedRoute = ({ children, requiredRole }: { children: ReactNode, requiredRole?: string }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

// Type guard to check if route is non-index (has path)
const isNonIndexRoute = (route: CustomRouteObject): boolean => {
  return 'path' in route;
};

// Convert custom route config to React Router compatible routes
const buildRoutes = (routes: RoutesConfig): RouteObject[] => {
  return routes.map((route) => {
    // Extract our custom properties
    const { protected: isProtected, requiredRole, ...rest } = route;
    
    const element = isProtected ? (
      <ProtectedRoute requiredRole={requiredRole}>
        {route.element}
      </ProtectedRoute>
    ) : route.element;

    const result: RouteObject = {
      ...rest,
      element,
    };

    // Only add children if this route has a path and children
    if (isNonIndexRoute(route) && 'children' in route && route.children) {
      result.children = buildRoutes(route.children);
    }

    return result;
  });
};

const AppRoutes = () => {
  const allRoutes = buildRoutes([...authRoutes, ...dashboardRoutes]);
  const element = useRoutes(allRoutes);

  return element;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default AppRouter;