import React from 'react';
import { UserCircle, Bell } from 'lucide-react'; // Example icons
import { Button } from '@/components/ui/button';

interface HeaderProps {
  title: string;
  showNotifications?: boolean;
  showUserAvatar?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showNotifications = true, showUserAvatar = true }) => {
  console.log("Rendering Header with title:", title);
  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            {/* Placeholder for a logo */}
            <span className="hidden font-bold sm:inline-block text-primary">{title || 'AppTitle'}</span>
          </a>
        </div>
        {/* Mobile Title */}
        <div className="flex flex-1 items-center justify-center md:hidden">
            <span className="font-bold text-primary">{title || 'AppTitle'}</span>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {showNotifications && (
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>
          )}
          {showUserAvatar && (
            <Button variant="ghost" size="icon" aria-label="User Account">
              <UserCircle className="h-6 w-6" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;