import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import JointAccountSetupWizard from '@/components/JointAccountSetupWizard'; // The custom wizard component
import type { PermissionItem } from '@/components/PermissionsToggleSuite'; // Import type if needed by page
import NavigationMenu from '@/components/layout/NavigationMenu'; // Added for consistency
import { ScrollArea } from '@/components/ui/scroll-area';
import { Home, Users, CreditCard } from 'lucide-react';

// Default nav items, wizard might hide this or it's for overall app structure
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/' },
  { id: 'joint-hub', label: 'Joint Hub', icon: Users, path: '/joint-account-hub' },
  { id: 'payments', label: 'Payments', icon: CreditCard, path: '/payment-initiation' },
];

// Initial permissions for the wizard, could be fetched or default
const initialPermissions: PermissionItem[] = [
  { id: 'viewBalance', label: 'View Balance', description: 'Partner can see the account balance.', enabled: true },
  { id: 'makeTransactions', label: 'Make Transactions', description: 'Partner can initiate payments up to a set limit.', enabled: false },
  { id: 'manageAlerts', label: 'Manage Alerts', description: 'Partner can set up or change account notifications.', enabled: true },
  { id: 'viewStatements', label: 'View Statements', description: 'Partner can view monthly statements.', enabled: true },
];

const JointAccountSetupWizardPage: React.FC = () => {
  console.log('JointAccountSetupWizardPage loaded');
  const navigate = useNavigate();

  const handleSetupComplete = (formData: any) => {
    console.log('Joint Account Setup Completed on Page:', formData);
    // Here you would typically send formData to a backend API
    alert(`Joint account "${formData.accountName}" setup initiated!`);
    navigate('/joint-account-hub'); // Navigate to hub after setup
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100"> {/* Neutral background for the wizard focus */}
      <Header title="Create New Joint Account" />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto px-4 py-8 flex justify-center items-start">
          <JointAccountSetupWizard
            onSetupComplete={handleSetupComplete}
            initialPermissions={initialPermissions}
          />
        </main>
      </ScrollArea>
      {/* NavigationMenu might be contextually hidden by the wizard's modal nature, 
          but included if the wizard is part of a standard page flow. 
          The custom component itself doesn't have a nav menu.
      */}
      <NavigationMenu items={navItems} onNavigate={handleNavigation} />
    </div>
  );
};

export default JointAccountSetupWizardPage;