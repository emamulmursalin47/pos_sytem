import React, { useState } from 'react';
import { Search, Plus, Filter, ArrowUpDown, Edit, Trash2, Mail, Phone } from 'lucide-react';
import { customers } from '../../mock/customers';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const CustomersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<{field: string, direction: 'asc' | 'desc'}>({
    field: 'name',
    direction: 'asc'
  });
  
  const handleSort = (field: string) => {
    setSortOption(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };
  
  // Filter and sort customers
  const filteredCustomers = customers
    .filter(customer => {
      // Filter by search query
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery) ||
        (customer.email && customer.email.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesSearch;
    })
    .sort((a, b) => {
      const field = sortOption.field as keyof typeof a;
      
      // Handle numeric and string sorts
      if (typeof a[field] === 'number' && typeof b[field] === 'number') {
        return sortOption.direction === 'asc'
          ? (a[field] as number) - (b[field] as number)
          : (b[field] as number) - (a[field] as number);
      }
      
      // Default string sort
      const aValue = String(a[field] || '').toLowerCase();
      const bValue = String(b[field] || '').toLowerCase();
      
      return sortOption.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Customer Management</h1>
        <p className="text-gray-600">Manage your customers, their profile information, and loyalty points.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-white p-4">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-primary-100 mr-4">
              <svg
                className="h-6 w-6 text-primary-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Customers</p>
              <p className="text-2xl font-bold">{customers.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-white p-4">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-secondary-100 mr-4">
              <svg
                className="h-6 w-6 text-secondary-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold">৳{customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-white p-4">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-accent-100 mr-4">
              <svg
                className="h-6 w-6 text-accent-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Avg. Spending</p>
              <p className="text-2xl font-bold">
                ৳{Math.round(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      </div>
      
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="w-full md:w-1/3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search customers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button leftIcon={<Plus size={16} />}>
              Add Customer
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    <span>Customer</span>
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('phone')}
                >
                  <div className="flex items-center">
                    <span>Contact</span>
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('loyaltyPoints')}
                >
                  <div className="flex items-center">
                    <span>Loyalty Points</span>
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('lastPurchase')}
                >
                  <div className="flex items-center">
                    <span>Last Purchase</span>
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('totalSpent')}
                >
                  <div className="flex items-center">
                    <span>Total Spent</span>
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                        {customer.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-xs text-gray-500">ID: {customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      <div className="flex items-center mb-1">
                        <Phone size={14} className="mr-1" />
                        {customer.phone}
                      </div>
                      {customer.email && (
                        <div className="flex items-center">
                          <Mail size={14} className="mr-1" />
                          {customer.email}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="primary">
                      {customer.loyaltyPoints} points
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {customer.lastPurchase && new Date(customer.lastPurchase).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ৳{customer.totalSpent.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-800 mr-3">
                      <Edit size={16} />
                    </button>
                    <button className="text-error-600 hover:text-error-800">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredCustomers.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              No customers found. Try a different search.
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-4 px-6 py-3 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredCustomers.length}</span> of{' '}
            <span className="font-medium">{customers.length}</span> customers
          </div>
          <div className="flex space-x-2">
            <button
              className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CustomersPage;