import React, { useState } from 'react';
import { Search, Plus, Filter, ArrowUpDown, Edit, Trash2, AlertCircle } from 'lucide-react';
import { products, categories } from '../../mock/products';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const InventoryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
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
  
  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      // Filter by category
      const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
      
      // Filter by search query
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.barcode.includes(searchQuery);
      
      return matchesCategory && matchesSearch;
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
      const aValue = String(a[field]).toLowerCase();
      const bValue = String(b[field]).toLowerCase();
      
      return sortOption.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
    
  // Check for low stock items
  const lowStockCount = products.filter(p => p.stock < 50).length;
  
  // Count expiring items (within next 30 days)
  const today = new Date();
  const thirtyDaysLater = new Date(today);
  thirtyDaysLater.setDate(today.getDate() + 30);
  
  const expiringCount = products.filter(p => {
    if (!p.expiryDate) return false;
    const expiryDate = new Date(p.expiryDate);
    return expiryDate > today && expiryDate <= thirtyDaysLater;
  }).length;
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Inventory Management</h1>
        <p className="text-gray-600">Manage your products, stock levels, and inventory settings.</p>
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
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Products</p>
              <p className="text-2xl font-bold">{products.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-white p-4">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-warning-100 mr-4">
              <AlertCircle className="h-6 w-6 text-warning-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Low Stock Items</p>
              <p className="text-2xl font-bold">{lowStockCount}</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-white p-4">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-error-100 mr-4">
              <svg
                className="h-6 w-6 text-error-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Expiring Soon</p>
              <p className="text-2xl font-bold">{expiringCount}</p>
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
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <select
                className="appearance-none pl-3 pr-10 py-2 border border-gray-300 rounded-md bg-white focus:ring-primary-500 focus:border-primary-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <Button leftIcon={<Plus size={16} />}>
              Add Product
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
                    <span>Product Name</span>
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center">
                    <span>Category</span>
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center">
                    <span>Price</span>
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('stock')}
                >
                  <div className="flex items-center">
                    <span>Stock</span>
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
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
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded bg-gray-100 overflow-hidden">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full w-full bg-gray-200 text-gray-500">
                            ?
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.barcode}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">৳{product.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      product.stock < 30 ? 'text-error-600' :
                      product.stock < 50 ? 'text-warning-600' :
                      'text-gray-900'
                    }`}>
                      {product.stock}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {product.isWeighed && (
                        <Badge variant="secondary" size="sm">Weighed</Badge>
                      )}
                      {product.stock < 30 && (
                        <Badge variant="error" size="sm">Low Stock</Badge>
                      )}
                      {product.stock >= 30 && product.stock < 50 && (
                        <Badge variant="warning" size="sm">Reorder</Badge>
                      )}
                      {product.expiryDate && (
                        <Badge 
                          variant={
                            new Date(product.expiryDate) < new Date('2025-06-01')
                              ? 'error'
                              : 'primary'
                          } 
                          size="sm"
                        >
                          Exp: {new Date(product.expiryDate).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: '2-digit'
                          })}
                        </Badge>
                      )}
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
          
          {filteredProducts.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              No products found. Try a different search or category.
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-4 px-6 py-3 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredProducts.length}</span> of{' '}
            <span className="font-medium">{products.length}</span> products
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

export default InventoryPage;