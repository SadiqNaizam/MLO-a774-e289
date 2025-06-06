import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import NavigationMenu from '@/components/layout/NavigationMenu';
import AnimatedFinancialChart from '@/components/AnimatedFinancialChart';
import JointAccountDashboardCard from '@/components/JointAccountDashboardCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Home, Users, CreditCard, ArrowRight } from 'lucide-react'; // Example icons

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/', isActive: true },
  { id: 'joint-hub', label: 'Joint Hub', icon: Users, path: '/joint-account-hub' },
  { id: 'payments', label: 'Payments', icon: CreditCard, path: '/payment-initiation' },
];

const chartData = [
  { name: 'Jan', spending: 400, savings: 240 },
  { name: 'Feb', spending: 300, savings: 139 },
  { name: 'Mar', spending: 200, savings: 980 },
  { name: 'Apr', spending: 278, savings: 390 },
  { name: 'May', spending: 189, savings: 480 },
  { name: 'Jun', spending: 239, savings: 380 },
];

const MainDashboard: React.FC = () => {
  console.log('MainDashboard loaded');
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleViewJointDetails = (accountId: string) => {
    navigate(`/account-details/${accountId}?type=joint`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#131B33] text-white">
      <Header title="Main Dashboard" showNotifications showUserAvatar />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto px-4 py-8 space-y-8">
          <section aria-labelledby="financial-overview-title">
            <h2 id="financial-overview-title" className="text-2xl font-semibold mb-4">Financial Overview</h2>
            <AnimatedFinancialChart
              data={chartData}
              title="Monthly Spending vs. Savings"
              lines={[
                { dataKey: "spending", stroke: "#8884d8", name: "Spending" },
                { dataKey: "savings", stroke: "#82ca9d", name: "Savings" }
              ]}
            />
          </section>

          <section aria-labelledby="joint-accounts-title">
            <h2 id="joint-accounts-title" className="text-2xl font-semibold mb-4">Joint Accounts</h2>
            {/* Placeholder - In a real app, this would come from user data */}
            <JointAccountDashboardCard
              accountId="ja-123"
              accountName="Vacation Fund"
              balance={5780.50}
              currency="USD"
              membersCount={2}
              onViewDetails={handleViewJointDetails}
            />
            <Button 
              variant="outline" 
              className="mt-4 text-white border-white hover:bg-white/10"
              onClick={() => navigate('/joint-account-hub')}
            >
              Go to Joint Account Hub <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </section>

          <section aria-labelledby="quick-actions-title">
            <h2 id="quick-actions-title" className="text-2xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                    size="lg" 
                    className="bg-[#0051B4] hover:bg-[#004193] text-white"
                    onClick={() => navigate('/payment-initiation')}
                >
                    Make a Payment
                </Button>
                 <Button 
                    size="lg" 
                    variant="secondary"
                    onClick={() => navigate('/joint-account-setup')}
                    className="bg-green-600 hover:bg-green-700 text-white"
                >
                    Open New Joint Account
                </Button>
            </div>
          </section>
        </main>
      </ScrollArea>
      <NavigationMenu items={navItems} onNavigate={handleNavigation} />
    </div>
  );
};

export default MainDashboard;