import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

const pageNames: Record<string, string> = {
  '/app/dashboard': 'Dashboard',
  '/app/campaigns': 'Campaigns',
  '/app/creatives': 'Creative Library',
  '/app/analytics': 'Analytics',
  '/app/settings': 'Settings'
};

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, signOut } = useAuth();
  
  const pageName = pageNames[location.pathname] || 'Chameleon';
  
  return (
    <header className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark h-16 shadow-sm dark:shadow-dark-sm backdrop-blur-sm transition-all duration-300">
      <div className="flex items-center justify-between h-full px-6">
        {/* Page Title */}
        <div className="animate-slide-up">
          <h1 className="text-2xl font-semibold text-secondary-900 dark:text-secondary-100 tracking-tight">
            {pageName}
          </h1>
        </div>
        
        {/* Right side */}
        <div className="flex items-center space-x-4 animate-fade-in">
          {/* Notifications */}
          <button className="p-2 text-secondary-400 dark:text-secondary-500 hover:text-secondary-600 dark:hover:text-secondary-300 relative rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800/50 transition-all duration-200 transform hover:scale-110">
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          
          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-xl hover:bg-secondary-50 dark:hover:bg-secondary-800/50 transition-all duration-200 transform hover:scale-105"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-md">
                <UserCircleIcon className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
                  {user ? `${user.firstName} ${user.lastName}` : 'User'}
                </div>
                <div className="text-xs text-secondary-500 dark:text-secondary-400">
                  {user?.role === 'brand' ? 'Brand Manager' : 'Publisher'}
                </div>
              </div>
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg dark:shadow-dark-lg border border-border-light dark:border-border-dark py-1 z-50 backdrop-blur-sm animate-slide-up">
                <div className="px-4 py-3 border-b border-border-light dark:border-border-dark">
                  <div className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
                    {user ? `${user.firstName} ${user.lastName}` : 'User'}
                  </div>
                  <div className="text-sm text-secondary-500 dark:text-secondary-400">
                    {user?.email}
                  </div>
                </div>
                <button className="block w-full text-left px-4 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800/50 transition-colors duration-200">
                  Profile Settings
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800/50 transition-colors duration-200">
                  Account Settings
                </button>
                <div className="border-t border-border-light dark:border-border-dark">
                  <button 
                    onClick={signOut}
                    className="block w-full text-left px-4 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800/50 transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
