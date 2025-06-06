import React from 'react';
import { Home, Users, CreditCard, Settings } from 'lucide-react'; // Example icons
import { Button } from '@/components/ui/button'; // Using Button for clickable areas

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string; // Assuming react-router-dom or similar for navigation
  isActive?: boolean;
}

interface NavigationMenuProps {
  items: NavItem[];
  onNavigate: (path: string) => void; // Callback for navigation
}

const defaultNavItems: NavItem[] = [
  { id: 'home', label: 'Dashboard', icon: Home, path: '/dashboard', isActive: true },
  { id: 'joint', label: 'Joint Hub', icon: Users, path: '/joint-hub' },
  { id: 'payments', label: 'Payments', icon: CreditCard, path: '/payments' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
];

const NavigationMenu: React.FC<NavigationMenuProps> = ({ items = defaultNavItems, onNavigate }) => {
  console.log("Rendering NavigationMenu (Tab Bar style)");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="container mx-auto grid h-16 max-w-md grid-cols-4 items-center px-4 text-sm font-medium">
        {items.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={`flex h-full flex-col items-center justify-center gap-1 rounded-none ${
              item.isActive ? 'text-primary' : 'text-muted-foreground'
            }`}
            onClick={() => onNavigate(item.path)}
            aria-label={item.label}
          >
            <item.icon className={`h-5 w-5 ${item.isActive ? 'text-primary' : ''}`} />
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default NavigationMenu;