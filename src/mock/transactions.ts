import { Transaction } from '../types';
import { products } from './products';

// Helper function to create cart items from products
const createCartItems = (productIds: string[], quantities: number[]) => {
  return productIds.map((id, index) => {
    const product = products.find(p => p.id === id);
    if (!product) return null;
    
    const quantity = quantities[index];
    return {
      ...product,
      quantity,
      subtotal: product.price * quantity
    };
  }).filter(Boolean);
};

export const transactions: Transaction[] = [
  {
    id: 'TRX-10001',
    items: createCartItems(['1', '3', '7'], [2, 1, 3]),
    total: 380,
    discount: 0,
    tax: 19,
    grandTotal: 399,
    paymentMethod: 'CASH',
    cashierId: '2',
    customerId: '1',
    timestamp: '2025-05-03T14:22:18Z',
    status: 'COMPLETED'
  },
  {
    id: 'TRX-10002',
    items: createCartItems(['2', '5', '8'], [1, 1, 2]),
    total: 480,
    discount: 20,
    tax: 23,
    grandTotal: 483,
    paymentMethod: 'CREDIT_CARD',
    cashierId: '2',
    customerId: '4',
    timestamp: '2025-05-03T15:45:30Z',
    status: 'COMPLETED'
  },
  {
    id: 'TRX-10003',
    items: createCartItems(['4', '6', '10'], [2, 3, 1]),
    total: 550,
    discount: 0,
    tax: 27.5,
    grandTotal: 577.5,
    paymentMethod: 'BKASH',
    cashierId: '2',
    timestamp: '2025-05-03T16:12:45Z',
    status: 'COMPLETED'
  },
  {
    id: 'TRX-10004',
    items: createCartItems(['9', '11', '12'], [2, 1, 2]),
    total: 500,
    discount: 50,
    tax: 22.5,
    grandTotal: 472.5,
    paymentMethod: 'CASH',
    cashierId: '2',
    customerId: '6',
    timestamp: '2025-05-03T17:05:22Z',
    status: 'COMPLETED'
  },
  {
    id: 'TRX-10005',
    items: createCartItems(['3', '5', '7'], [2, 1, 1]),
    total: 320,
    discount: 0,
    tax: 16,
    grandTotal: 336,
    paymentMethod: 'NAGAD',
    cashierId: '3',
    timestamp: '2025-05-03T18:30:15Z',
    status: 'VOIDED'
  },
  {
    id: 'TRX-10006',
    items: createCartItems(['1', '2', '8', '12'], [1, 1, 1, 2]),
    total: 530,
    discount: 25,
    tax: 25.25,
    grandTotal: 530.25,
    paymentMethod: 'SPLIT',
    cashierId: '3',
    customerId: '2',
    timestamp: '2025-05-03T19:15:40Z',
    status: 'COMPLETED'
  },
  {
    id: 'TRX-10007',
    items: createCartItems(['6', '7', '10'], [2, 3, 1]),
    total: 400,
    discount: 0,
    tax: 20,
    grandTotal: 420,
    paymentMethod: 'CASH',
    cashierId: '2',
    timestamp: '2025-05-04T10:22:35Z',
    status: 'COMPLETED'
  },
  {
    id: 'TRX-10008',
    items: createCartItems(['4', '9', '12'], [3, 2, 1]),
    total: 335,
    discount: 15,
    tax: 16,
    grandTotal: 336,
    paymentMethod: 'CREDIT_CARD',
    cashierId: '3',
    customerId: '8',
    timestamp: '2025-05-04T11:40:12Z',
    status: 'REFUNDED'
  }
];