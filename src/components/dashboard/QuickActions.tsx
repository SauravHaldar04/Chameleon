import React from 'react';
import { PlusIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

export const QuickActions: React.FC = () => {
  return (
    <Card>
      <CardContent className="space-y-4">
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">Quick Actions</h3>
        
        <Button 
          className="w-full justify-start" 
          variant="default"
          onClick={() => alert('Navigate to create new campaign')}
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create New Campaign
        </Button>
        
        <Button 
          className="w-full justify-start" 
          variant="outline"
          onClick={() => alert('Navigate to upload creative')}
        >
          <CloudArrowUpIcon className="h-5 w-5 mr-2" />
          Upload Creative
        </Button>
        
        <div className="pt-4 border-t border-border-light dark:border-border-dark">
          <h4 className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2">Recent Activity</h4>
          <div className="space-y-2">
            <div className="text-sm text-secondary-600 dark:text-secondary-400">
              ✅ Nike campaign approved
            </div>
            <div className="text-sm text-secondary-600 dark:text-secondary-400">
              📊 Analytics report generated
            </div>
            <div className="text-sm text-secondary-600 dark:text-secondary-400">
              🎨 New creative uploaded
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
