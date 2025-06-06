import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, XCircle, HelpCircle } from 'lucide-react';

type InvitationStatus = 'pending' | 'accepted' | 'declined' | 'expired' | 'unknown';

interface InvitationStatusIndicatorProps {
  status: InvitationStatus;
}

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, variant: 'outline', color: 'text-yellow-600 border-yellow-600' },
  accepted: { label: 'Accepted', icon: CheckCircle, variant: 'default', color: 'bg-green-100 text-green-700 border-green-700' },
  declined: { label: 'Declined', icon: XCircle, variant: 'destructive', color: 'bg-red-100 text-red-700 border-red-700' },
  expired: { label: 'Expired', icon: Clock, variant: 'outline', color: 'text-gray-500 border-gray-500' },
  unknown: { label: 'Unknown', icon: HelpCircle, variant: 'secondary', color: '' },
};

const InvitationStatusIndicator: React.FC<InvitationStatusIndicatorProps> = ({ status }) => {
  console.log("Rendering InvitationStatusIndicator with status:", status);
  const config = statusConfig[status] || statusConfig.unknown;
  const IconComponent = config.icon;

  return (
    <Badge variant={config.variant as any} className={`inline-flex items-center gap-1.5 ${config.color}`}>
      <IconComponent className="h-3.5 w-3.5" />
      {config.label}
    </Badge>
  );
};

export default InvitationStatusIndicator;