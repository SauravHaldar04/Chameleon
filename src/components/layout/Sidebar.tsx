import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  MegaphoneIcon,
  PhotoIcon,
  ChartBarIcon,
  CogIcon,
  SunIcon,
  MoonIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../../contexts/ThemeContext';

const navigation = [
  { name: 'Dashboard', href: '/app/dashboard', icon: HomeIcon },
  { name: 'Campaigns', href: '/app/campaigns', icon: MegaphoneIcon },
  { name: 'Creative Library', href: '/app/creatives', icon: PhotoIcon },
  { name: 'Upload Creative', href: '/app/creatives/upload', icon: CloudArrowUpIcon },
  { name: 'Analytics', href: '/app/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/app/settings', icon: CogIcon },
];

export const Sidebar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col w-64 bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark h-full shadow-lg dark:shadow-dark-lg backdrop-blur-sm transition-all duration-300">
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-border-light dark:border-border-dark">
        <div className="flex items-center animate-bounce-in">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="ml-3 text-xl font-bold text-secondary-900 dark:text-secondary-100 tracking-tight">
            Chameleon
          </span>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item, index) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 animate-slide-up ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 border-r-2 border-primary-600 shadow-sm'
                  : 'text-secondary-600 dark:text-secondary-400 hover:bg-secondary-50 dark:hover:bg-secondary-800/50 hover:text-secondary-900 dark:hover:text-secondary-200'
              }`
            }
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <item.icon
              className={`mr-3 h-5 w-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110`}
              aria-hidden="true"
            />
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      {/* Theme Toggle */}
      <div className="px-4 py-4 border-t border-border-light dark:border-border-dark">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-50 dark:hover:bg-secondary-800/50 hover:text-secondary-900 dark:hover:text-secondary-200 group"
        >
          {theme === 'light' ? (
            <>
              <MoonIcon className="h-5 w-5 mr-2 transition-transform duration-200 group-hover:rotate-12" />
              Dark Mode
            </>
          ) : (
            <>
              <SunIcon className="h-5 w-5 mr-2 transition-transform duration-200 group-hover:rotate-12" />
              Light Mode
            </>
          )}
        </button>
      </div>
      
      {/* Footer */}
      <div className="px-4 py-4 border-t border-border-light dark:border-border-dark">
        <div className="text-xs text-secondary-500 dark:text-secondary-400 text-center">
          © 2024 Chameleon Platform
        </div>
      </div>
    </div>
  );
};
