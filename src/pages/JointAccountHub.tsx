import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import NavigationMenu from '@/components/layout/NavigationMenu';
import InvitationStatusIndicator from '@/components/InvitationStatusIndicator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Home, Users, CreditCard, PlusCircle, Settings } from 'lucide-react'; // Example icons

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/' },
  { id: 'joint-hub', label: 'Joint Hub', icon: Users, path: '/joint-account-hub', isActive: true },
  { id: 'payments', label: 'Payments', icon: CreditCard, path: '/payment-initiation' },
];

// Placeholder data for joint accounts
const jointAccounts = [
  { id: 'ja-123', name: 'Vacation Fund', balance: 5780.50, members: 2, status: 'active' as const, invitation: null },
  { id: 'ja-456', name: 'Household Bills', balance: 1250.75, members: 2, status: 'active' as const, invitation: null },
  { id: 'ja-789', name: 'Emergency Fund', balance: 10000.00, members: 1, status: 'pending_invite' as const, invitation: { partner: 'user@example.com', status: 'pending' as const } },
];

const JointAccountHub: React.FC = () => {
  console.log('JointAccountHub loaded');
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white"> {/* Dark theme base */}
      <Header title="Joint Account Hub" />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto px-4 py-8 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#00A8E1]">Your Joint Accounts</h1>
            <Button 
              className="bg-[#0051B4] hover:bg-[#004193] text-white"
              onClick={() => navigate('/joint-account-setup')}
            >
              <PlusCircle className="mr-2 h-5 w-5" /> Create New Joint Account
            </Button>
          </div>

          {jointAccounts.length === 0 && (
            <Card className="bg-[#003974] border-[#00A8E1]">
              <CardContent className="pt-6 text-center">
                <p className="text-lg">You don't have any joint accounts yet.</p>
                <p className="text-sm text-slate-300">Click the button above to create one!</p>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jointAccounts.map(account => (
              <Card key={account.id} className="bg-[#003974] border-[#00A8E1] flex flex-col">
                <CardHeader>
                  <CardTitle className="text-[#00A8E1]">{account.name}</CardTitle>
                  <CardDescription className="text-slate-300">
                    Balance: ${account.balance.toFixed(2)} - Members: {account.members}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  {account.invitation && (
                    <div className="mt-2">
                      <p className="text-sm text-slate-400">Invite to {account.invitation.partner}:</p>
                      <InvitationStatusIndicator status={account.invitation.status as "pending" | "accepted" | "declined"} />
                    </div>
                  )}
                   {account.status === 'active' && <p className="text-sm text-green-400">Account Active</p>}
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" className="text-[#00A8E1] hover:bg-[#00A8E1]/10" onClick={() => navigate(`/account-details/${account.id}?type=joint`)}>
                    View Details
                  </Button>
                   <Button variant="ghost" size="sm" className="text-slate-300 hover:bg-slate-700" onClick={() => alert(`Settings for ${account.name}`)}>
                    <Settings className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </ScrollArea>
      <NavigationMenu items={navItems} onNavigate={handleNavigation} />
    </div>
  );
};

export default JointAccountHub;