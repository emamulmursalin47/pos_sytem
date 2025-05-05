import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Rice (Premium)',
    barcode: '1000123456789',
    price: 85.00,
    category: 'Groceries',
    stock: 150,
    image: 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isWeighed: true
  },
  {
    id: '2',
    name: 'Chicken (Whole)',
    barcode: '1000234567891',
    price: 220.00,
    category: 'Meat & Poultry',
    stock: 35,
    image: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isWeighed: true,
    expiryDate: '2025-06-15'
  },
  {
    id: '3',
    name: 'Milk 1L',
    barcode: '1000345678912',
    price: 80.00,
    category: 'Dairy',
    stock: 72,
    image: 'https://images.pexels.com/photos/725998/pexels-photo-725998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    expiryDate: '2025-05-20'
  },
  {
    id: '4',
    name: 'Bread (White)',
    barcode: '1000456789123',
    price: 50.00,
    category: 'Bakery',
    stock: 45,
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    expiryDate: '2025-05-12'
  },
  {
    id: '5',
    name: 'Eggs (12pcs)',
    barcode: '1000567891234',
    price: 120.00,
    category: 'Dairy',
    stock: 60,
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    expiryDate: '2025-05-25'
  },
  {
    id: '6',
    name: 'Coca Cola 1.5L',
    barcode: '1000678912345',
    price: 90.00,
    category: 'Beverages',
    stock: 120,
    image: 'https://images.pexels.com/photos/8751806/pexels-photo-8751806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '7',
    name: 'Potato Chips',
    barcode: '1000789123456',
    price: 40.00,
    category: 'Snacks',
    stock: 85,
    image: 'https://images.pexels.com/photos/5848695/pexels-photo-5848695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    expiryDate: '2025-09-30'
  },
  {
    id: '8',
    name: 'Toothpaste',
    barcode: '1000891234567',
    price: 70.00,
    category: 'Personal Care',
    stock: 95,
    image: 'https://images.pexels.com/photos/6694656/pexels-photo-6694656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    expiryDate: '2026-02-15'
  },
  {
    id: '9',
    name: 'Tomato (1kg)',
    barcode: '1000912345678',
    price: 60.00,
    category: 'Produce',
    stock: 75,
    image: 'https://images.pexels.com/photos/1391487/pexels-photo-1391487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isWeighed: true
  },
  {
    id: '10',
    name: 'Cooking Oil 1L',
    barcode: '1001023456789',
    price: 180.00,
    category: 'Groceries',
    stock: 55,
    image: 'https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    expiryDate: '2025-12-10'
  },
  {
    id: '11',
    name: 'Shampoo 250ml',
    barcode: '1001123456789',
    price: 150.00,
    category: 'Personal Care',
    stock: 65,
    image: 'https://images.pexels.com/photos/2403300/pexels-photo-2403300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    expiryDate: '2026-01-15'
  },
  {
    id: '12',
    name: 'Yogurt 500g',
    barcode: '1001234567891',
    price: 85.00,
    category: 'Dairy',
    stock: 48,
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    expiryDate: '2025-05-18'
  }
];

// Category data for filters and organization
export const categories = [
  'All Categories',
  'Groceries',
  'Meat & Poultry',
  'Dairy',
  'Bakery',
  'Beverages',
  'Snacks',
  'Personal Care',
  'Produce'
];