import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  customerId?: string;
  
  addItem: (product: Product, quantity: number) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  applyDiscount: (amount: number) => void;
  setCustomer: (customerId?: string) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  subtotal: 0,
  discount: 0,
  tax: 0,  // Assuming 5% tax rate
  total: 0,
  customerId: undefined,
  
  addItem: (product, quantity) => {
    const { items } = get();
    const existingItem = items.find(item => item.id === product.id);
    
    let newItems;
    
    if (existingItem) {
      newItems = items.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity, subtotal: (item.quantity + quantity) * item.price } 
          : item
      );
    } else {
      const newItem = { 
        ...product, 
        quantity,
        subtotal: quantity * product.price
      };
      newItems = [...items, newItem];
    }
    
    const subtotal = calculateSubtotal(newItems);
    const tax = subtotal * 0.05; // 5% tax
    
    set({ 
      items: newItems,
      subtotal,
      tax,
      total: subtotal + tax - get().discount
    });
  },
  
  updateItemQuantity: (itemId, quantity) => {
    const { items } = get();
    
    if (quantity <= 0) {
      return get().removeItem(itemId);
    }
    
    const newItems = items.map(item => 
      item.id === itemId 
        ? { ...item, quantity, subtotal: quantity * item.price } 
        : item
    );
    
    const subtotal = calculateSubtotal(newItems);
    const tax = subtotal * 0.05; // 5% tax
    
    set({ 
      items: newItems,
      subtotal,
      tax,
      total: subtotal + tax - get().discount
    });
  },
  
  removeItem: (itemId) => {
    const { items } = get();
    const newItems = items.filter(item => item.id !== itemId);
    
    const subtotal = calculateSubtotal(newItems);
    const tax = subtotal * 0.05; // 5% tax
    
    set({ 
      items: newItems,
      subtotal,
      tax,
      total: subtotal + tax - get().discount
    });
  },
  
  clearCart: () => {
    set({ 
      items: [],
      subtotal: 0,
      discount: 0,
      tax: 0,
      total: 0,
      customerId: undefined
    });
  },
  
  applyDiscount: (amount) => {
    set(state => ({ 
      discount: amount,
      total: state.subtotal + state.tax - amount
    }));
  },
  
  setCustomer: (customerId) => {
    set({ customerId });
  }
}));

const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.subtotal, 0);
};