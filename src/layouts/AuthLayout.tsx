import React from 'react';
import { Outlet } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8 animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary-100 p-3 mb-4">
              <ShoppingBag className="h-8 w-8 text-primary-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Modern POS System</h1>
          <p className="text-gray-500 mt-2">Streamline your retail operations</p>
        </div>
        
        <Outlet />
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Your Retail Company. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;