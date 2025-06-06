import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Home, Users, CreditCard, ArrowRight, ArrowLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/' },
  { id: 'joint-hub', label: 'Joint Hub', icon: Users, path: '/joint-account-hub' },
  { id: 'payments', label: 'Payments', icon: CreditCard, path: '/payment-initiation', isActive: true },
];

const STEPS = {
  SELECT_PAYEE: 1,
  ENTER_AMOUNT: 2,
  CHOOSE_SOURCE: 3,
  REVIEW_CONFIRM: 4,
};

const PaymentInitiationFlow: React.FC = () => {
  console.log('PaymentInitiationFlow loaded');
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(STEPS.SELECT_PAYEE);
  const [payee, setPayee] = useState('');
  const [amount, setAmount] = useState('');
  const [sourceAccount, setSourceAccount] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleNext = () => {
    if (currentStep < STEPS.REVIEW_CONFIRM) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowConfirmDialog(true);
    }
  };

  const handleBack = () => {
    if (currentStep > STEPS.SELECT_PAYEE) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handlePaymentConfirm = () => {
    console.log('Payment Confirmed:', { payee, amount, sourceAccount });
    setShowConfirmDialog(false);
    alert('Payment Successful!'); // Placeholder for actual success feedback
    navigate('/'); // Navigate to dashboard after payment
  };

  const isNextDisabled = (): boolean => {
    if (currentStep === STEPS.SELECT_PAYEE && !payee) return true;
    if (currentStep === STEPS.ENTER_AMOUNT && (!amount || parseFloat(amount) <= 0)) return true;
    if (currentStep === STEPS.CHOOSE_SOURCE && !sourceAccount) return true;
    return false;
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case STEPS.SELECT_PAYEE:
        return (
          <div className="space-y-4">
            <Label htmlFor="payee" className="text-lg">Select or Add Payee</Label>
            <Input id="payee" value={payee} onChange={(e) => setPayee(e.target.value)} placeholder="Enter payee name or select" className="bg-white text-black" />
            {/* In a real app, this could be a Select with existing payees or an Input to add new */}
          </div>
        );
      case STEPS.ENTER_AMOUNT:
        return (
          <div className="space-y-4">
            <Label htmlFor="amount" className="text-lg">Enter Amount</Label>
            <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="bg-white text-black" />
          </div>
        );
      case STEPS.CHOOSE_SOURCE:
        return (
          <div className="space-y-4">
            <Label htmlFor="sourceAccount" className="text-lg">Choose Source Account</Label>
            <Select onValueChange={setSourceAccount} value={sourceAccount}>
              <SelectTrigger className="bg-white text-black">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal-checking">Personal Checking (***1234) - $5,000.00</SelectItem>
                <SelectItem value="joint-vacation">Joint Vacation Fund (***5678) - $1,200.50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case STEPS.REVIEW_CONFIRM:
        return (
          <div className="space-y-3 text-gray-700">
            <h3 className="text-xl font-semibold text-gray-800">Review Payment Details</h3>
            <p><strong>Payee:</strong> {payee}</p>
            <p><strong>Amount:</strong> ${parseFloat(amount || '0').toFixed(2)}</p>
            <p><strong>Source Account:</strong> {sourceAccount.replace('-', ' ')}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header title="Make a Payment" />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto px-4 py-8">
          <form onSubmit={(e) => e.preventDefault()} className="max-w-lg mx-auto p-6 sm:p-8 bg-white rounded-xl shadow-2xl space-y-8">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Step {currentStep}: {
                currentStep === STEPS.SELECT_PAYEE ? "Select Payee" :
                currentStep === STEPS.ENTER_AMOUNT ? "Enter Amount" :
                currentStep === STEPS.CHOOSE_SOURCE ? "Choose Source Account" : "Review & Confirm"
              }
            </h2>
            
            <div className="min-h-[150px]">
              {renderStepContent()}
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <Button 
                variant="outline" 
                onClick={handleBack} 
                disabled={currentStep === STEPS.SELECT_PAYEE}
                className="text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button 
                onClick={handleNext} 
                disabled={isNextDisabled()}
                className="bg-[#0051B4] hover:bg-[#004193] text-white"
              >
                {currentStep === STEPS.REVIEW_CONFIRM ? 'Confirm Payment' : 'Next'} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </main>
      </ScrollArea>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to send ${parseFloat(amount || '0').toFixed(2)} to {payee} from account {sourceAccount.replace('-', ' ')}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handlePaymentConfirm} className="bg-[#0051B4] hover:bg-[#004193]">
              Yes, Send Payment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <NavigationMenu items={navItems} onNavigate={handleNavigation} />
    </div>
  );
};

export default PaymentInitiationFlow;