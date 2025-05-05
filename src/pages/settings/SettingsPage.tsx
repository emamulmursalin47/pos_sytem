import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  ShieldCheck, 
  Receipt, 
  Store, 
  CreditCard, 
  Bell, 
  Printer, 
  Scale, 
  Server, 
  Database 
} from 'lucide-react';
import Card from '../../components/ui/Card';

interface SettingCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
}

const SettingCard: React.FC<SettingCardProps> = ({ icon, title, description, to }) => {
  return (
    <Link to={to}>
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-start">
          <div className="rounded-lg p-3 bg-primary-100 mr-4">
            {icon}
          </div>
          <div>
            <h3 className="font-medium text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

const SettingsPage: React.FC = () => {
  const settingGroups = [
    {
      title: 'General Settings',
      items: [
        {
          icon: <Users className="h-6 w-6 text-primary-600" />,
          title: 'User Management',
          description: 'Add, edit, or remove user accounts and permissions',
          to: '/dashboard/settings/users'
        },
        {
          icon: <Store className="h-6 w-6 text-primary-600" />,
          title: 'Store Information',
          description: 'Update store details, address, and contact information',
          to: '/dashboard/settings'
        },
        {
          icon: <ShieldCheck className="h-6 w-6 text-primary-600" />,
          title: 'Security Settings',
          description: 'Configure security settings and login requirements',
          to: '/dashboard/settings'
        }
      ]
    },
    {
      title: 'Payment & Receipts',
      items: [
        {
          icon: <CreditCard className="h-6 w-6 text-primary-600" />,
          title: 'Payment Methods',
          description: 'Configure payment methods and processors',
          to: '/dashboard/settings'
        },
        {
          icon: <Receipt className="h-6 w-6 text-primary-600" />,
          title: 'Receipt Templates',
          description: 'Customize receipt headers, footers, and formats',
          to: '/dashboard/settings'
        },
        {
          icon: <Printer className="h-6 w-6 text-primary-600" />,
          title: 'Printers',
          description: 'Configure receipt, kitchen, and label printers',
          to: '/dashboard/settings'
        }
      ]
    },
    {
      title: 'Integrations & Hardware',
      items: [
        {
          icon: <Scale className="h-6 w-6 text-primary-600" />,
          title: 'Weighing Scales',
          description: 'Connect and configure weighing scale devices',
          to: '/dashboard/settings'
        },
        {
          icon: <Server className="h-6 w-6 text-primary-600" />,
          title: 'External Systems',
          description: 'Integrate with accounting, ERP, and e-commerce platforms',
          to: '/dashboard/settings'
        },
        {
          icon: <Database className="h-6 w-6 text-primary-600" />,
          title: 'Backup & Restore',
          description: 'Configure automatic backups and recovery options',
          to: '/dashboard/settings'
        }
      ]
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: <Bell className="h-6 w-6 text-primary-600" />,
          title: 'Notification Settings',
          description: 'Configure alerts for low stock, sales, and system events',
          to: '/dashboard/settings'
        }
      ]
    }
  ];
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-600">Configure system settings, manage users, and customize preferences.</p>
      </div>
      
      <div className="space-y-8">
        {settingGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">{group.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.items.map((item, itemIndex) => (
                <SettingCard
                  key={itemIndex}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  to={item.to}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;