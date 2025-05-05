
import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate,  } from 'react-router-dom';
import { 
  ShoppingCart, 
  Package, 
  Users, 
  BarChart, 
  Settings, 
  LogOut,
  Menu,
  X,
  BellDot,
  User,
  Shield
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { clsx } from 'clsx';

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  
  // Simulate occasional network issues - In a real app, this would be actual network detection
  React.useEffect(() => {
    const randomNetworkIssue = () => {
      const shouldGoOffline = Math.random() < 0.1; // 10% chance of going offline
      if (shouldGoOffline) {
        setIsOffline(true);
        setTimeout(() => setIsOffline(false), 5000);
      }
    };
    
    const interval = setInterval(randomNetworkIssue, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard/pos', icon: <ShoppingCart />, text: 'POS' },
    { to: '/dashboard/inventory', icon: <Package />, text: 'Inventory' },
    { to: '/dashboard/customers', icon: <Users />, text: 'Customers' },
    { to: '/dashboard/reports', icon: <BarChart />, text: 'Reports' },
    { to: '/dashboard/settings', icon: <Settings />, text: 'Settings' },
    ...(user?.role === 'ADMIN' ? [
      { to: '/dashboard/admin', icon: <Shield />, text: 'Admin' }
    ] : [])
  ];



  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top navigation */}
      <header className="z-10 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-4 text-gray-500 transition-colors hover:text-primary-600"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center">
              <ShoppingCart className="w-6 h-6 mr-2 text-primary-600" />
              <h1 className="hidden text-xl font-semibold text-gray-800 sm:block">Modern POS</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {isOffline && (
              <div className="flex items-center text-warning-600 animate-pulse-slow">
                <div className="flex items-center px-2 py-1 rounded bg-warning-100">
                  <span className="w-2 h-2 mr-2 rounded-full bg-warning-500"></span>
                  <span className="text-xs">Offline Mode</span>
                </div>
              </div>
            )}
            
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <BellDot size={20} className="text-gray-500" />
              </button>
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-primary-500"></span>
            </div>
            
            <div className="flex items-center">
              <div className="hidden mr-2 text-right md:block">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
              <div className="flex items-center justify-center rounded-full h-9 w-9 bg-primary-200 text-primary-700">
                <User size={18} />
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={clsx(
            "bg-white shadow-md z-10 flex flex-col transition-all duration-300 ease-in-out",
            isSidebarOpen ? "w-64" : "w-0 -ml-64 md:w-20 md:ml-0"
          )}
        >
          <nav className="flex-1 py-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => clsx(
                      "flex items-center px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors",
                      isActive && "bg-primary-50 text-primary-600 border-r-4 border-primary-500"
                    )}
                  >
                    <span className="inline-block w-6">{item.icon}</span>
                    <span className={clsx("ml-3", !isSidebarOpen && "md:hidden")}>
                      {item.text}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t">
            <button 
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-gray-700 transition-colors rounded-md hover:bg-gray-100"
            >
              <LogOut size={18} />
              <span className={clsx("ml-3", !isSidebarOpen && "md:hidden")}>Logout</span>
            </button>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;