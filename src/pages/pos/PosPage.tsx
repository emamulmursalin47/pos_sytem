import React, { useState } from 'react';
import { Search, ShoppingCart, Plus, Minus, X, User, Tag, CreditCard, Banknote } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { products, categories } from '../../mock/products';
import { customers } from '../../mock/customers';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const PosPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<string | undefined>();
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [transactionComplete, setTransactionComplete] = useState(false);
  
  const { 
    items, 
    subtotal, 
    discount, 
    tax, 
    total, 
    addItem, 
    updateItemQuantity, 
    removeItem,
    applyDiscount,
    clearCart,
    setCustomer 
  } = useCartStore();
  
  const filteredProducts = products.filter(product => {
    // Filter by category
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    
    // Filter by search query
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.barcode.includes(searchQuery);
    
    return matchesCategory && matchesSearch;
  });
  
  const handleAddToCart = (product: typeof products[0]) => {
    addItem(product, 1);
  };
  
  const handleQuantityChange = (id: string, change: number) => {
    const item = items.find(item => item.id === id);
    if (item) {
      updateItemQuantity(id, item.quantity + change);
    }
  };
  
  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomer(customerId);
    setCustomer(customerId);
    setShowCustomerModal(false);
  };
  
  const selectedCustomerData = selectedCustomer 
    ? customers.find(c => c.id === selectedCustomer) 
    : undefined;
    
  const handlePayment = () => {
    setPaymentProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentProcessing(false);
      setTransactionComplete(true);
      
      // Simulate receipt printing delay then reset
      setTimeout(() => {
        clearCart();
        setSelectedCustomer(undefined);
        setTransactionComplete(false);
        setShowPaymentModal(false);
      }, 2000);
    }, 1500);
  };
  
  return (
    <div className="h-full max-h-[calc(100vh-180px)]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        {/* Left side - Products */}
        <div className="md:col-span-2 flex flex-col h-full">
          <Card className="mb-4 flex-shrink-0">
            <div className="flex flex-col space-y-4">
              {/* Search and categories */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products by name or scan barcode..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex overflow-x-auto pb-2 hide-scrollbar">
                <div className="flex space-x-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`px-3 py-1.5 rounded-full whitespace-nowrap text-sm ${
                        selectedCategory === category
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
          
          {/* Products grid */}
          <div className="overflow-y-auto flex-grow bg-white rounded-md shadow">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
                    onClick={() => handleAddToCart(product)}
                  >
                    <div className="relative h-32 bg-gray-100">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <ShoppingCart className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                      {product.isWeighed && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="warning" size="sm">Weight</Badge>
                        </div>
                      )}
                      {product.expiryDate && new Date(product.expiryDate) < new Date('2025-06-01') && (
                        <div className="absolute bottom-2 right-2">
                          <Badge variant="error" size="sm">Expiring</Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-800 truncate">{product.name}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-primary-600 font-semibold">৳{product.price.toFixed(2)}</span>
                        <span className="text-xs text-gray-500">Stock: {product.stock}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-8 text-center text-gray-500">
                  No products found. Try a different search or category.
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Right side - Cart */}
        <div className="flex flex-col h-full">
          <Card className="flex-grow flex flex-col overflow-hidden">
            <Card.Header>
              <h2 className="text-lg font-semibold">Current Sale</h2>
              {selectedCustomerData ? (
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => setShowCustomerModal(true)}
                >
                  <User size={16} className="text-primary-500 mr-1" />
                  <span className="text-sm">{selectedCustomerData.name}</span>
                </div>
              ) : (
                <Button 
                  size="sm" 
                  variant="outline"
                  leftIcon={<User size={16} />}
                  onClick={() => setShowCustomerModal(true)}
                >
                  Add Customer
                </Button>
              )}
            </Card.Header>
            
            <Card.Body className="flex-grow overflow-y-auto">
              {items.length > 0 ? (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center p-2 border-b border-gray-100">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{item.name}</h4>
                        <p className="text-xs text-gray-500">
                          ৳{item.price.toFixed(2)} {item.isWeighed && ' / kg'}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                          onClick={() => handleQuantityChange(item.id, -1)}
                        >
                          <Minus size={16} className="text-gray-600" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          <Plus size={16} className="text-gray-600" />
                        </button>
                      </div>
                      <div className="ml-4 text-right">
                        <div className="text-sm font-medium">৳{item.subtotal.toFixed(2)}</div>
                        <button
                          className="p-1 text-gray-400 hover:text-error-500"
                          onClick={() => removeItem(item.id)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <ShoppingCart size={48} className="mb-4 opacity-20" />
                  <p className="text-center">Your cart is empty</p>
                  <p className="text-center text-sm">Add products by clicking on items from the left panel</p>
                </div>
              )}
            </Card.Body>
            
            <Card.Footer>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>৳{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <span>Discount</span>
                    <button 
                      className="ml-2 text-xs text-primary-600"
                      onClick={() => {
                        const amount = prompt('Enter discount amount:');
                        if (amount && !isNaN(Number(amount))) {
                          applyDiscount(Number(amount));
                        }
                      }}
                    >
                      <Tag size={14} className="inline mr-1" />
                      Apply
                    </button>
                  </div>
                  <span>৳{discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (5%)</span>
                  <span>৳{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>৳{total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => clearCart()}
                  disabled={items.length === 0}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => setShowPaymentModal(true)}
                  disabled={items.length === 0}
                >
                  Pay
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
      
      {/* Customer selection modal */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Select Customer</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowCustomerModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search customers..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div className="overflow-y-auto max-h-[50vh]">
                <div className="space-y-2">
                  {customers.map((customer) => (
                    <div
                      key={customer.id}
                      className={`p-3 rounded-md cursor-pointer hover:bg-gray-50 ${
                        selectedCustomer === customer.id ? 'bg-primary-50 border border-primary-200' : 'border border-gray-200'
                      }`}
                      onClick={() => handleSelectCustomer(customer.id)}
                    >
                      <div className="flex justify-between">
                        <h4 className="font-medium">{customer.name}</h4>
                        <Badge variant="primary">
                          {customer.loyaltyPoints} points
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">
                        <p>{customer.phone}</p>
                        {customer.email && <p>{customer.email}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button variant="outline" className="mr-2" onClick={() => setShowCustomerModal(false)}>
                  Cancel
                </Button>
                <Button>New Customer</Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Payment modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Payment</h3>
              {!paymentProcessing && !transactionComplete && (
                <button 
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => setShowPaymentModal(false)}
                >
                  <X size={20} />
                </button>
              )}
            </div>
            
            <div className="p-4">
              {paymentProcessing ? (
                <div className="py-8 flex flex-col items-center">
                  <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-700 font-medium">Processing payment...</p>
                </div>
              ) : transactionComplete ? (
                <div className="py-8 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-success-100 flex items-center justify-center mb-4">
                    <span className="text-2xl">✓</span>
                  </div>
                  <h3 className="text-xl font-semibold text-success-700 mb-2">Payment Successful!</h3>
                  <p className="text-gray-600">Transaction ID: TRX-{Math.floor(10000 + Math.random() * 90000)}</p>
                  <p className="text-gray-600 mt-1">Printing receipt...</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="bg-gray-50 p-3 rounded-md mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Items</span>
                        <span className="font-medium">{items.length}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Subtotal</span>
                        <span>৳{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Discount</span>
                        <span>৳{discount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Tax (5%)</span>
                        <span>৳{tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                        <span>Total</span>
                        <span>৳{total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <h4 className="font-medium mb-2">Select Payment Method</h4>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <button className="border border-gray-200 rounded-md p-3 flex flex-col items-center hover:bg-gray-50 active:bg-gray-100">
                        <Banknote className="h-6 w-6 text-success-600 mb-1" />
                        <span className="text-sm">Cash</span>
                      </button>
                      <button className="border border-gray-200 rounded-md p-3 flex flex-col items-center hover:bg-gray-50 active:bg-gray-100">
                        <CreditCard className="h-6 w-6 text-primary-600 mb-1" />
                        <span className="text-sm">Card</span>
                      </button>
                      <button className="border border-gray-200 rounded-md p-3 flex flex-col items-center hover:bg-gray-50 active:bg-gray-100">
                        <svg className="h-6 w-6 text-pink-600 mb-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17 3H7c-2.21 0-4 1.79-4 4v10c0 2.21 1.79 4 4 4h10c2.21 0 4-1.79 4-4V7c0-2.21-1.79-4-4-4zm-5 14c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                          <path d="M13.25 9.08c-.96-.43-1.92-.43-2.5 0-.58.43-.5 1.1.15 1.5.65.39 1.43.82 1.43.82s.78-.43 1.43-.82c.65-.39.73-1.07.15-1.5-.58-.43-1.54-.43-2.5 0z" />
                        </svg>
                        <span className="text-sm">bKash</span>
                      </button>
                      <button className="border border-gray-200 rounded-md p-3 flex flex-col items-center hover:bg-gray-50 active:bg-gray-100">
                        <svg className="h-6 w-6 text-orange-600 mb-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                        </svg>
                        <span className="text-sm">Nagad</span>
                      </button>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={handlePayment}
                  >
                    Complete Payment (৳{total.toFixed(2)})
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PosPage;