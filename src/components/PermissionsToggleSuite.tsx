import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


export interface PermissionItem {
  id: string;
  label: string;
  description?: string;
  enabled: boolean;
}

interface PermissionsToggleSuiteProps {
  title?: string;
  permissions: PermissionItem[];
  onPermissionChange: (id: string, enabled: boolean) => void;
}

const PermissionsToggleSuite: React.FC<PermissionsToggleSuiteProps> = ({
  title = "Partner Permissions",
  permissions,
  onPermissionChange,
}) => {
  console.log("Rendering PermissionsToggleSuite with permissions:", permissions.length);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <TooltipProvider>
          {permissions.map((permission) => (
            <div key={permission.id} className="flex items-center justify-between space-x-2 p-3 border rounded-md hover:bg-muted/50 transition-colors">
              <div className="flex flex-col">
                <Label htmlFor={permission.id} className="font-medium">
                  {permission.label}
                </Label>
                {permission.description && (
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 mr-1 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <p>{permission.description}</p>
                      </TooltipContent>
                    </Tooltip>
                    <span>{permission.description.length > 40 ? permission.description.substring(0,37) + "..." : permission.description}</span>
                  </div>
                )}
              </div>
              <Switch
                id={permission.id}
                checked={permission.enabled}
                onCheckedChange={(enabled) => onPermissionChange(permission.id, enabled)}
                aria-label={permission.label}
              />
            </div>
          ))}
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default PermissionsToggleSuite;