// User Types
export type UserRole = 'ADMIN' | 'MANAGER' | 'CASHIER' | 'INVENTORY';

export interface Product {
  id: string;
  name: string;
  barcode: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
  expiryDate?: string;
  isWeighed?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  subtotal: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  loyaltyPoints: number;
  lastPurchase?: string;
  totalSpent: number;
}

export interface Transaction {
  id: string;
  items: CartItem[];
  total: number;
  discount: number;
  tax: number;
  grandTotal: number;
  paymentMethod: PaymentMethod;
  cashierId: string;
  customerId?: string;
  timestamp: string;
  status: 'COMPLETED' | 'VOIDED' | 'REFUNDED';
}

export type PaymentMethod = 
  | 'CASH' 
  | 'CREDIT_CARD' 
  | 'DEBIT_CARD' 
  | 'BKASH' 
  | 'NAGAD'
  | 'ROCKET'
  | 'GIFT_CARD'
  | 'STORE_CREDIT'
  | 'SPLIT';