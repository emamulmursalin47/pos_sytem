import { create } from 'zustand';
import { UserRole } from '../types';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Mock user data - in a real app, this would be authenticated against a backend
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'ADMIN' as UserRole
  },
  {
    id: '2',
    email: 'cashier@example.com',
    password: 'cashier123',
    name: 'Cashier User',
    role: 'CASHIER' as UserRole
  },
  {
    id: '3',
    email: 'manager@example.com',
    password: 'manager123',
    name: 'Manager User', 
    role: 'MANAGER' as UserRole
  }
];

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  
  login: async (email, password) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      set({ 
        isAuthenticated: true, 
        user: userWithoutPassword
      });
      return true;
    }
    
    return false;
  },
  
  logout: () => {
    set({ isAuthenticated: false, user: null });
  }
}));