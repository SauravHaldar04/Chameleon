import React from 'react';
import { Card, CardContent } from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon?: React.ComponentType<{ className?: string }>;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon }) => {
  return (
    <Card className="border-l-4 border-l-primary hover:shadow-lg transition-shadow duration-300">
      <CardContent className="flex items-center p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-foreground mb-1">
            {value}
          </p>
          {change && (
            <div className="flex items-center">
              <span className={`text-sm font-medium ${
                change.type === 'increase' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {change.type === 'increase' ? '↗' : '↘'} {Math.abs(change.value)}%
              </span>
              <span className="text-muted-foreground text-sm ml-2">
                vs last month
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="p-4 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg">
            <Icon className="h-8 w-8 text-primary-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
