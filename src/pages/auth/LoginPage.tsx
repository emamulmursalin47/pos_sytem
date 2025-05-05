import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { LockKeyhole, Mail } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // For demo purposes, provide sample login credentials
  const sampleUsers = [
    { role: 'Admin', email: 'admin@example.com', password: 'admin123' },
    { role: 'Cashier', email: 'cashier@example.com', password: 'cashier123' },
    { role: 'Manager', email: 'manager@example.com', password: 'manager123' }
  ];
  
  const fillLoginForm = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };
  
  return (
    <div >
      <h2 className="mb-6 text-xl font-semibold text-gray-800">Sign in to your account</h2>
      
      {error && (
        <div className="p-3 mb-4 text-sm border rounded-md bg-error-50 border-error-200 text-error-700">
          {error}
        </div>
      )}
      
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail className="w-5 h-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LockKeyhole className="w-5 h-5 text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full px-4 py-2 font-medium text-white transition-colors rounded-md shadow bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      
      <div className="mt-8">
        <h3 className="mb-2 text-sm font-medium text-gray-700">Demo Accounts</h3>
        <div className="p-3 text-sm rounded-md bg-gray-50">
          <div className="grid grid-cols-1 gap-2">
            {sampleUsers.map((user, index) => (
              <div 
                key={index}
                className="p-2 transition-colors bg-white border border-gray-200 rounded cursor-pointer hover:border-primary-300 hover:bg-primary-50"
                onClick={() => fillLoginForm(user.email, user.password)}
              >
                <div className="font-medium text-gray-800">{user.role}</div>
                <div className="text-xs text-gray-500">
                  {user.email} / {user.password}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;