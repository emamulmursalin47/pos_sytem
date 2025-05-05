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
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Sign in to your account</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-error-50 border border-error-200 text-error-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LockKeyhole className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md shadow transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      
      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Demo Accounts</h3>
        <div className="bg-gray-50 rounded-md p-3 text-sm">
          <div className="grid grid-cols-1 gap-2">
            {sampleUsers.map((user, index) => (
              <div 
                key={index}
                className="p-2 border border-gray-200 rounded bg-white hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-colors"
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