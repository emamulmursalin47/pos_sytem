import React, { useState } from 'react';
import { Shield, Users, Settings, Activity, Database, Bell, Lock, Server } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}

// Mock audit log data
const auditLogs: AuditLog[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Admin User',
    action: 'USER_CREATE',
    details: 'Created new user account for "John Doe"',
    timestamp: '2025-05-05T10:30:00Z',
    ipAddress: '192.168.1.100'
  },
  {
    id: '2',
    userId: '1',
    userName: 'Admin User',
    action: 'PERMISSION_UPDATE',
    details: 'Updated permissions for role "Manager"',
    timestamp: '2025-05-05T10:15:00Z',
    ipAddress: '192.168.1.100'
  },
  {
    id: '3',
    userId: '2',
    userName: 'Manager User',
    action: 'PRICE_OVERRIDE',
    details: 'Price override on item #1234 from ৳100 to ৳90',
    timestamp: '2025-05-05T09:45:00Z',
    ipAddress: '192.168.1.101'
  },
  {
    id: '4',
    userId: '3',
    userName: 'Cashier User',
    action: 'VOID_TRANSACTION',
    details: 'Voided transaction #TRX-10005',
    timestamp: '2025-05-05T09:30:00Z',
    ipAddress: '192.168.1.102'
  },
  {
    id: '5',
    userId: '1',
    userName: 'Admin User',
    action: 'SYSTEM_CONFIG',
    details: 'Updated system tax rate from 5% to 7.5%',
    timestamp: '2025-05-05T09:00:00Z',
    ipAddress: '192.168.1.100'
  }
];

interface SystemMetric {
  name: string;
  value: string;
  status: 'success' | 'warning' | 'error';
}

const systemMetrics: SystemMetric[] = [
  { name: 'CPU Usage', value: '45%', status: 'success' },
  { name: 'Memory Usage', value: '3.2GB / 8GB', status: 'warning' },
  { name: 'Disk Space', value: '120GB / 500GB', status: 'success' },
  { name: 'Network Latency', value: '45ms', status: 'success' },
  { name: 'Active Users', value: '12', status: 'success' },
  { name: 'Background Jobs', value: '2 running', status: 'success' }
];

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const getStatusBadgeVariant = (status: SystemMetric['status']) => {
    switch (status) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };
  
  const getActionBadgeVariant = (action: string) => {
    switch (action) {
      case 'USER_CREATE':
      case 'PERMISSION_UPDATE':
        return 'primary';
      case 'PRICE_OVERRIDE':
      case 'SYSTEM_CONFIG':
        return 'warning';
      case 'VOID_TRANSACTION':
        return 'error';
      default:
        return 'default';
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">System Administration</h1>
        <p className="text-gray-600">Monitor system health, manage configurations, and view audit logs.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white p-4">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-primary-100 mr-4">
              <Server className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">System Status</p>
              <p className="text-2xl font-bold text-success-600">Healthy</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-white p-4">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-secondary-100 mr-4">
              <Users className="h-6 w-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Active Sessions</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-white p-4">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-warning-100 mr-4">
              <Activity className="h-6 w-6 text-warning-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">CPU Load</p>
              <p className="text-2xl font-bold">45%</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-white p-4">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-error-100 mr-4">
              <Bell className="h-6 w-6 text-error-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Active Alerts</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold">System Audit Log</h2>
              <Button size="sm" variant="outline">Export Log</Button>
            </Card.Header>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IP Address
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(log.timestamp).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{log.userName}</div>
                        <div className="text-xs text-gray-500">ID: {log.userId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={getActionBadgeVariant(log.action)}>
                          {log.action.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{log.details}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.ipAddress}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold">System Metrics</h2>
            </Card.Header>
            
            <div className="p-4 space-y-4">
              {systemMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{metric.name}</span>
                  <div className="flex items-center">
                    <Badge variant={getStatusBadgeVariant(metric.status)}>
                      {metric.value}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold">Quick Actions</h2>
            </Card.Header>
            
            <div className="p-4 space-y-3">
              <Button variant="outline" className="w-full justify-start" leftIcon={<Database size={16} />}>
                Backup Database
              </Button>
              <Button variant="outline" className="w-full justify-start" leftIcon={<Lock size={16} />}>
                Security Scan
              </Button>
              <Button variant="outline" className="w-full justify-start" leftIcon={<Settings size={16} />}>
                System Settings
              </Button>
              <Button variant="outline" className="w-full justify-start text-error-600 hover:text-error-700 hover:bg-error-50" leftIcon={<Shield size={16} />}>
                Emergency Mode
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;