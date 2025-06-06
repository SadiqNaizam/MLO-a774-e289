import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress'; // shadcn progress
import { Input } from '@/components/ui/input'; // shadcn input
import { Label } from '@/components/ui/label'; // shadcn label
import PermissionsToggleSuite, { PermissionItem } from './PermissionsToggleSuite'; // Custom component
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'; // shadcn alert-dialog

// Define steps
const WIZARD_STEPS = [
  { id: 'nameAccount', title: 'Name Your Account' },
  { id: 'invitePartner', title: 'Invite Partner' },
  { id: 'setPermissions', title: 'Set Permissions' },
  { id: 'reviewConfirm', title: 'Review & Confirm' },
];

interface JointAccountSetupWizardProps {
  onSetupComplete: (formData: any) => void; // Callback when wizard finishes
  initialPermissions?: PermissionItem[];
}

const defaultPermissions: PermissionItem[] = [
    { id: 'viewBalance', label: 'View Balance', description: 'Allows partner to see the account balance.', enabled: true },
    { id: 'makeTransactions', label: 'Make Transactions', description: 'Allows partner to initiate payments and transfers.', enabled: false },
    { id: 'setAlerts', label: 'Manage Alerts', description: 'Allows partner to set up and modify account alerts.', enabled: true },
];

const JointAccountSetupWizard: React.FC<JointAccountSetupWizardProps> = ({ onSetupComplete, initialPermissions = defaultPermissions }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [accountName, setAccountName] = useState('');
  const [partnerIdentifier, setPartnerIdentifier] = useState(''); // email or phone
  const [permissions, setPermissions] = useState<PermissionItem[]>(initialPermissions);
  const [showInviteConfirm, setShowInviteConfirm] = useState(false);
  const [showFinalConfirm, setShowFinalConfirm] = useState(false);

  console.log("Rendering JointAccountSetupWizard, current step:", WIZARD_STEPS[currentStep].title);

  const progressValue = ((currentStep + 1) / WIZARD_STEPS.length) * 100;

  const handleNext = () => {
    if (WIZARD_STEPS[currentStep].id === 'invitePartner' && partnerIdentifier) {
        setShowInviteConfirm(true); // Show invite confirmation dialog
        // In a real app, send invite here
    } else if (currentStep < WIZARD_STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
    } else {
        // Last step, trigger final confirmation
        setShowFinalConfirm(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePermissionChange = (id: string, enabled: boolean) => {
    setPermissions(prev => prev.map(p => p.id === id ? { ...p, enabled } : p));
  };
  
  const handleFinalizeSetup = () => {
    const formData = { accountName, partnerIdentifier, permissions };
    console.log("Finalizing Joint Account Setup:", formData);
    onSetupComplete(formData);
    setShowFinalConfirm(false);
    // Reset or navigate away
  };


  const renderStepContent = () => {
    switch (WIZARD_STEPS[currentStep].id) {
      case 'nameAccount':
        return (
          <div className="space-y-2">
            <Label htmlFor="accountName">Account Name</Label>
            <Input id="accountName" value={accountName} onChange={(e) => setAccountName(e.target.value)} placeholder="e.g., Holiday Fund" />
            {accountName.length > 0 && accountName.length < 3 && <p className="text-xs text-destructive">Name too short.</p>}
          </div>
        );
      case 'invitePartner':
        return (
          <div className="space-y-2">
            <Label htmlFor="partnerIdentifier">Partner's Email or Phone</Label>
            <Input id="partnerIdentifier" value={partnerIdentifier} onChange={(e) => setPartnerIdentifier(e.target.value)} placeholder="partner@example.com" />
             {/* Potentially show InvitationStatusIndicator here if invite was sent */}
          </div>
        );
      case 'setPermissions':
        return <PermissionsToggleSuite permissions={permissions} onPermissionChange={handlePermissionChange} title="Define Partner's Access"/>;
      case 'reviewConfirm':
        return (
          <div className="space-y-3 text-sm">
            <h4 className="font-medium">Review Your Setup:</h4>
            <p><strong>Account Name:</strong> {accountName || '(Not set)'}</p>
            <p><strong>Invited Partner:</strong> {partnerIdentifier || '(Not set)'}</p>
            <div><strong>Permissions:</strong>
              <ul className="list-disc pl-5 mt-1">
                {permissions.filter(p => p.enabled).map(p => <li key={p.id}>{p.label}</li>)}
                {permissions.filter(p => p.enabled).length === 0 && <li>No permissions enabled.</li>}
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    if (WIZARD_STEPS[currentStep].id === 'nameAccount' && accountName.length < 3) return true;
    if (WIZARD_STEPS[currentStep].id === 'invitePartner' && !partnerIdentifier) return true; // Basic validation
    return false;
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>{WIZARD_STEPS[currentStep].title}</CardTitle>
        <CardDescription>Step {currentStep + 1} of {WIZARD_STEPS.length}</CardDescription>
        <Progress value={progressValue} className="mt-2" />
      </CardHeader>
      <CardContent className="min-h-[200px]">
        {renderStepContent()}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={isNextDisabled()}>
          {currentStep === WIZARD_STEPS.length - 1 ? 'Review & Create Account' : 'Next'}
        </Button>
      </CardFooter>

        {/* Invitation Sent Confirmation Dialog */}
        <AlertDialog open={showInviteConfirm} onOpenChange={setShowInviteConfirm}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Invitation Sent!</AlertDialogTitle>
                    <AlertDialogDescription>
                        An invitation has been sent to {partnerIdentifier}. They will need to accept it to join the account. You can configure their permissions now or later.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => {
                        setShowInviteConfirm(false);
                        if (currentStep < WIZARD_STEPS.length - 1) setCurrentStep(currentStep + 1); // Move to next step after closing
                    }}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        {/* Final Confirmation Dialog */}
        <AlertDialog open={showFinalConfirm} onOpenChange={setShowFinalConfirm}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Create Joint Account?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are about to create a joint account named "{accountName}" {partnerIdentifier ? `and invite ${partnerIdentifier}` : ''}. Review the details before proceeding.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleFinalizeSetup}>Create Account</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </Card>
  );
};

export default JointAccountSetupWizard;