
import { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom';
import { ReactNode } from 'react';

export type ProtectedRouteProps = {
  children: ReactNode;
  requiredRole?: string;
};

// Base type for our custom route properties
type CustomRouteProps = {
  protected?: boolean;
  requiredRole?: string;
};

// Custom index route (no path)
type CustomIndexRouteObject = Omit<IndexRouteObject, 'element'> & 
  CustomRouteProps & {
    element?: ReactNode;
  };

// Custom non-index route (has path)
type CustomNonIndexRouteObject = Omit<NonIndexRouteObject, 'element' | 'children'> & 
  CustomRouteProps & {
    element?: ReactNode;
    children?: CustomRouteObject[];
  };

// Combined custom route type
export type CustomRouteObject = CustomIndexRouteObject | CustomNonIndexRouteObject;

export type RoutesConfig = CustomRouteObject[];