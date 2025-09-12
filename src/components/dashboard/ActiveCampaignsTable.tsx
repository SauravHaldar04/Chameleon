import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { campaigns } from '../../data/campaigns';

export const ActiveCampaignsTable: React.FC = () => {
  const activeCampaigns = campaigns.filter(campaign => campaign.status === 'Active').slice(0, 5);

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
    <Card>
      <CardHeader>
        <CardTitle>Active Campaigns</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm">Campaign</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm">Budget</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm">Impressions</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm">CTR</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm">Conversions</th>
              </tr>
            </thead>
            <tbody>
              {activeCampaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">{campaign.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{campaign.advertiser}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="success" size="sm">
                      {campaign.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900 dark:text-gray-100">{formatCurrency(campaign.spent)}</div>
                      <div className="text-gray-500 dark:text-gray-400">of {formatCurrency(campaign.budget)}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                    {formatNumber(campaign.impressions)}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                    {campaign.ctr.toFixed(1)}%
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                    {campaign.conversions}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
