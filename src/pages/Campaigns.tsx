import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { PlusIcon } from '@heroicons/react/24/outline';
import { campaigns } from '../data/campaigns';

export const Campaigns: React.FC = () => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'default' as const;
      case 'Paused':
        return 'secondary' as const;
      case 'Completed':
        return 'outline' as const;
      default:
        return 'secondary' as const;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center animate-slideIn">
        <div>
          <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">Campaigns</h2>
          <p className="text-secondary-600 dark:text-secondary-400 mt-1">Manage your advertising campaigns</p>
        </div>
        <Button className="animate-bounceIn animation-delay-200">
          <PlusIcon className="h-5 w-5 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Campaigns Table */}
      <Card className="animate-slideIn animation-delay-100">
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary-200 dark:border-secondary-700">
                  <th className="text-left py-3 px-4 font-medium text-secondary-500 dark:text-secondary-400 text-sm">Campaign</th>
                  <th className="text-left py-3 px-4 font-medium text-secondary-500 dark:text-secondary-400 text-sm">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-secondary-500 dark:text-secondary-400 text-sm">Budget</th>
                  <th className="text-left py-3 px-4 font-medium text-secondary-500 dark:text-secondary-400 text-sm">Spent</th>
                  <th className="text-left py-3 px-4 font-medium text-secondary-500 dark:text-secondary-400 text-sm">Impressions</th>
                  <th className="text-left py-3 px-4 font-medium text-secondary-500 dark:text-secondary-400 text-sm">CTR</th>
                  <th className="text-left py-3 px-4 font-medium text-secondary-500 dark:text-secondary-400 text-sm">Conversions</th>
                  <th className="text-left py-3 px-4 font-medium text-secondary-500 dark:text-secondary-400 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign, index) => (
                  <tr key={campaign.id} className={`border-b border-secondary-100 dark:border-secondary-800 hover:bg-secondary-50 dark:hover:bg-secondary-800/50 transition-colors duration-200 animate-fadeIn`} style={{ animationDelay: `${(index + 2) * 100}ms` }}>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-secondary-900 dark:text-secondary-100">{campaign.name}</div>
                        <div className="text-sm text-secondary-500 dark:text-secondary-400">{campaign.advertiser}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={getStatusVariant(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-medium text-secondary-900 dark:text-secondary-100">
                      {formatCurrency(campaign.budget)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <div className="font-medium text-secondary-900 dark:text-secondary-100">{formatCurrency(campaign.spent)}</div>
                        <div className="text-secondary-500 dark:text-secondary-400">
                          {((campaign.spent / campaign.budget) * 100).toFixed(1)}% used
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-secondary-900 dark:text-secondary-100">
                      {formatNumber(campaign.impressions)}
                    </td>
                    <td className="py-3 px-4 font-medium text-secondary-900 dark:text-secondary-100">
                      {campaign.ctr.toFixed(1)}%
                    </td>
                    <td className="py-3 px-4 font-medium text-secondary-900 dark:text-secondary-100">
                      {campaign.conversions}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="ghost">
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
