import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

interface DashboardSwitcherProps {
  currentDashboard: 'publisher' | 'brand';
  onSwitch: (dashboard: 'publisher' | 'brand') => void;
}

export const DashboardSwitcher: React.FC<DashboardSwitcherProps> = ({ 
  currentDashboard, 
  onSwitch 
}) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors border border-primary/20"
      >
        <ArrowsRightLeftIcon className="w-4 h-4" />
        <span className="text-sm font-medium">
          {currentDashboard === 'publisher' ? 'Publisher View' : 'Brand View'}
        </span>
        <span className="text-xs bg-primary/20 px-2 py-1 rounded-full">
          DEMO
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg z-20">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-foreground">Switch Dashboard View</span>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                  Temporary
                </span>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onSwitch('publisher');
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    currentDashboard === 'publisher'
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 text-sm">📊</span>
                    </div>
                    <div>
                      <div className="font-medium">Publisher Dashboard</div>
                      <div className="text-xs text-muted-foreground">
                        Content analysis & brand matching
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onSwitch('brand');
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    currentDashboard === 'brand'
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 text-sm">🎯</span>
                    </div>
                    <div>
                      <div className="font-medium">Brand Dashboard</div>
                      <div className="text-xs text-muted-foreground">
                        Campaign management & creatives
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              <div className="mt-3 pt-3 border-t border-border">
                <div className="text-xs text-muted-foreground">
                  <div className="flex items-center gap-2 mb-1">
                    <span>Current user:</span>
                    <span className="font-medium">{user?.firstName} {user?.lastName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Actual role:</span>
                    <span className="capitalize font-medium text-primary">
                      {user?.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
