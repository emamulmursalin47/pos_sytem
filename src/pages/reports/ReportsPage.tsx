import React, { useState } from 'react';
import { Calendar, TrendingUp, Download, BarChart, PieChart } from 'lucide-react';
import { transactions } from '../../mock/transactions';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const ReportsPage: React.FC = () => {
  const [reportType, setReportType] = useState('sales');
  const [dateRange, setDateRange] = useState('today');
  
  // Calculate basic stats
  const totalSales = transactions
    .filter(t => t.status === 'COMPLETED')
    .reduce((sum, t) => sum + t.grandTotal, 0);
    
  const totalTransactions = transactions.filter(t => t.status === 'COMPLETED').length;
  
  const averageTicket = totalTransactions > 0
    ? totalSales / totalTransactions
    : 0;
    
  const refundAmount = transactions
    .filter(t => t.status === 'REFUNDED')
    .reduce((sum, t) => sum + t.grandTotal, 0);
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">View sales data, inventory reports, and business analytics.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white p-4">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-primary-100 mr-4">
              <TrendingUp className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Sales</p>
              <p className="text-2xl font-bold">৳{totalSales.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}</p>
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Transactions</p>
              <p className="text-2xl font-bold">{totalTransactions}</p>
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Avg. Ticket</p>
              <p className="text-2xl font-bold">৳{averageTicket.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}</p>
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
                  d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Refund Amount</p>
              <p className="text-2xl font-bold">৳{refundAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}</p>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <Card className="p-0 flex-1">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-800">Report Type</h3>
              <Button size="sm" variant="outline" leftIcon={<Download size={14} />}>
                Export
              </Button>
            </div>
            <div className="flex space-x-2 mt-4">
              <button
                className={`px-3 py-1.5 rounded-md text-sm ${
                  reportType === 'sales'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setReportType('sales')}
              >
                Sales
              </button>
              <button
                className={`px-3 py-1.5 rounded-md text-sm ${
                  reportType === 'inventory'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setReportType('inventory')}
              >
                Inventory
              </button>
              <button
                className={`px-3 py-1.5 rounded-md text-sm ${
                  reportType === 'customers'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setReportType('customers')}
              >
                Customers
              </button>
            </div>
          </div>
          
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-800">Date Range</h3>
              <div className="flex items-center text-primary-600">
                <Calendar size={16} className="mr-2" />
                <span className="text-sm">May 1-8, 2025</span>
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <button
                className={`px-3 py-1.5 rounded-md text-sm ${
                  dateRange === 'today'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setDateRange('today')}
              >
                Today
              </button>
              <button
                className={`px-3 py-1.5 rounded-md text-sm ${
                  dateRange === 'week'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setDateRange('week')}
              >
                This Week
              </button>
              <button
                className={`px-3 py-1.5 rounded-md text-sm ${
                  dateRange === 'month'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setDateRange('month')}
              >
                This Month
              </button>
              <button
                className={`px-3 py-1.5 rounded-md text-sm ${
                  dateRange === 'custom'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setDateRange('custom')}
              >
                Custom
              </button>
            </div>
          </div>
          
          <div className="p-4 h-96 flex items-center justify-center">
            {/* Placeholder for chart */}
            <div className="text-center">
              <BarChart size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">
                {reportType === 'sales' && 'Sales data visualization would appear here'}
                {reportType === 'inventory' && 'Inventory data visualization would appear here'}
                {reportType === 'customers' && 'Customer data visualization would appear here'}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Based on {dateRange === 'today' ? "today's" : dateRange === 'week' ? "this week's" : "this month's"} data
              </p>
            </div>
          </div>
        </Card>
        
        <div className="w-full md:w-80 flex flex-col gap-6">
          <Card className="p-4">
            <h3 className="font-medium text-gray-800 mb-4">Payment Methods</h3>
            
            <div className="flex items-center justify-center h-40">
              <PieChart size={120} className="text-gray-300" />
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-primary-500 mr-2"></div>
                <span className="text-sm text-gray-700">Cash</span>
                <span className="ml-auto text-sm font-medium">45%</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-secondary-500 mr-2"></div>
                <span className="text-sm text-gray-700">Credit/Debit Card</span>
                <span className="ml-auto text-sm font-medium">30%</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-accent-500 mr-2"></div>
                <span className="text-sm text-gray-700">bKash</span>
                <span className="ml-auto text-sm font-medium">15%</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-warning-500 mr-2"></div>
                <span className="text-sm text-gray-700">Nagad</span>
                <span className="ml-auto text-sm font-medium">10%</span>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <h3 className="font-medium text-gray-800 mb-4">Top Categories</h3>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-sm text-gray-700">Groceries</span>
                <span className="ml-auto text-sm font-medium">৳12,450</span>
                <div className="w-full bg-gray-200 rounded-full h-2.5 ml-2">
                  <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-700">Dairy</span>
                <span className="ml-auto text-sm font-medium">৳8,320</span>
                <div className="w-full bg-gray-200 rounded-full h-2.5 ml-2">
                  <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-700">Meat & Poultry</span>
                <span className="ml-auto text-sm font-medium">৳6,750</span>
                <div className="w-full bg-gray-200 rounded-full h-2.5 ml-2">
                  <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-700">Beverages</span>
                <span className="ml-auto text-sm font-medium">৳5,230</span>
                <div className="w-full bg-gray-200 rounded-full h-2.5 ml-2">
                  <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-700">Personal Care</span>
                <span className="ml-auto text-sm font-medium">৳4,180</span>
                <div className="w-full bg-gray-200 rounded-full h-2.5 ml-2">
                  <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <Card>
        <Card.Header>
          <h3 className="font-medium text-gray-800">Recent Transactions</h3>
        </Card.Header>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.slice(0, 5).map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(transaction.timestamp).toLocaleDateString('en-GB')}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(transaction.timestamp).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {transaction.items.length} items
                    </div>
                    <div className="text-xs text-gray-500">
                      {transaction.items.slice(0, 2).map(item => item.name).join(', ')}
                      {transaction.items.length > 2 && '...'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {transaction.paymentMethod.replace('_', ' ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ৳{transaction.grandTotal.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      transaction.status === 'COMPLETED' 
                        ? 'bg-success-100 text-success-800'
                        : transaction.status === 'VOIDED'
                        ? 'bg-warning-100 text-warning-800'
                        : 'bg-error-100 text-error-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ReportsPage;