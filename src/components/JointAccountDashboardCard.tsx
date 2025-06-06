import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, ArrowRight } from 'lucide-react';

interface JointAccountDashboardCardProps {
  accountId: string;
  accountName: string;
  balance: number;
  currency?: string;
  membersCount: number;
  onViewDetails: (accountId: string) => void;
}

const JointAccountDashboardCard: React.FC<JointAccountDashboardCardProps> = ({
  accountId,
  accountName,
  balance,
  currency = "USD",
  membersCount,
  onViewDetails,
}) => {
  console.log("Rendering JointAccountDashboardCard for:", accountName);
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{accountName}</span>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="mr-1 h-4 w-4" />
            {membersCount}
          </div>
        </CardTitle>
        <CardDescription>Joint Account</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold">
          {new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(balance)}
        </p>
        <p className="text-sm text-muted-foreground">Available Balance</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => onViewDetails(accountId)}>
          View Details <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JointAccountDashboardCard;