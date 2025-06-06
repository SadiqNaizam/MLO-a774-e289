import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Home, Users, CreditCard, ArrowLeft, Filter } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/' },
  { id: 'joint-hub', label: 'Joint Hub', icon: Users, path: '/joint-account-hub' },
  { id: 'payments', label: 'Payments', icon: CreditCard, path: '/payment-initiation' },
];

// Placeholder transaction data
const sampleTransactions = [
  { id: 'txn1', date: '2024-07-20', description: 'Grocery Store', amount: -55.20, type: 'Debit' },
  { id: 'txn2', date: '2024-07-19', description: 'Salary Deposit', amount: 2500.00, type: 'Credit' },
  { id: 'txn3', date: '2024-07-18', description: 'Online Subscription', amount: -12.99, type: 'Debit' },
  { id: 'txn4', date: '2024-07-17', description: 'Restaurant Bill', amount: -78.50, type: 'Debit' },
  { id: 'txn5', date: '2024-07-15', description: 'Transfer from Savings', amount: 500.00, type: 'Credit' },
];

interface AccountDetails {
  name: string;
  balance: number;
  currency: string;
  type: 'Personal' | 'Joint';
}

const AccountDetailsScreen: React.FC = () => {
  console.log('AccountDetailsScreen loaded');
  const navigate = useNavigate();
  const { accountId } = useParams<{ accountId: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const accountTypeParam = queryParams.get('type');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(null);

  useEffect(() => {
    // Simulate fetching account details
    console.log(`Fetching details for account ID: ${accountId}, type: ${accountTypeParam}`);
    setAccountDetails({
      name: accountTypeParam === 'joint' ? `Joint Account ${accountId}` : `Personal Account ${accountId}`,
      balance: Math.random() * 10000,
      currency: 'USD',
      type: accountTypeParam === 'joint' ? 'Joint' : 'Personal',
    });
  }, [accountId, accountTypeParam]);


  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const filteredTransactions = sampleTransactions.filter(tx =>
    tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.amount.toString().includes(searchTerm)
  );

  if (!accountDetails) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white items-center justify-center">
            <p>Loading account details...</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header title={accountDetails.name || "Account Details"} />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto px-4 py-8 text-white">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 text-white hover:bg-gray-700">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          
          <section className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-2">{accountDetails.name}</h2>
            <p className="text-xl text-gray-300 mb-1">{accountDetails.type} Account</p>
            <p className="text-4xl font-semibold text-green-400">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: accountDetails.currency }).format(accountDetails.balance)}
            </p>
            <p className="text-sm text-gray-400">Available Balance</p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-4">Transaction History</h3>
            <div className="mb-4 flex gap-2">
              <Input
                type="text"
                placeholder="Filter transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Button variant="outline" className="text-white border-gray-700 hover:bg-gray-700">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <Table className="min-w-full">
                <TableHeader className="bg-gray-800">
                  <TableRow>
                    <TableHead className="text-white">Date</TableHead>
                    <TableHead className="text-white">Description</TableHead>
                    <TableHead className="text-white text-right">Amount</TableHead>
                    <TableHead className="text-white">Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map(tx => (
                    <TableRow key={tx.id} className="border-gray-700 hover:bg-gray-700/50">
                      <TableCell>{tx.date}</TableCell>
                      <TableCell>{tx.description}</TableCell>
                      <TableCell className={`text-right ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: accountDetails.currency }).format(tx.amount)}
                      </TableCell>
                       <TableCell>{tx.type}</TableCell>
                    </TableRow>
                  ))}
                   {filteredTransactions.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center text-gray-400 py-4">No transactions found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </section>

          <section className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Account Actions</h3>
             <div className="flex gap-4">
                <Button variant="outline" className="text-white border-gray-700 hover:bg-gray-700">View Statements</Button>
                <Button variant="outline" className="text-white border-gray-700 hover:bg-gray-700">Manage Cards</Button>
             </div>
          </section>

        </main>
      </ScrollArea>
      <NavigationMenu items={navItems} onNavigate={handleNavigation} />
    </div>
  );
};

export default AccountDetailsScreen;