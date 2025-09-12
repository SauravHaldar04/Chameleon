import React from 'react';
import { 
  EyeIcon, 
  CursorArrowRaysIcon, 
  ChartBarIcon,
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline';
import { StatCard } from '../components/dashboard/StatCard';
import { PerformanceChart } from '../components/dashboard/PerformanceChart';
import { ActiveCampaignsTable } from '../components/dashboard/ActiveCampaignsTable';
import { QuickActions } from '../components/dashboard/QuickActions';
import { campaigns } from '../data/campaigns';

export const Dashboard: React.FC = () => {
  // Calculate dashboard stats
  const totalImpressions = campaigns.reduce((sum, campaign) => sum + campaign.impressions, 0);
  const totalClicks = campaigns.reduce((sum, campaign) => sum + campaign.clicks, 0);
  const totalSpend = campaigns.reduce((sum, campaign) => sum + campaign.spent, 0);
  const totalConversions = campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0);
  const overallCTR = totalClicks / totalImpressions * 100;

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
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="animate-slide-up">
        <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
          Welcome back! 👋
        </h2>
        <p className="text-secondary-600 dark:text-secondary-400">
          Here's what's happening with your campaigns today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <StatCard
            title="Total Impressions"
            value={formatNumber(totalImpressions)}
            change={{ value: 12.5, type: 'increase' }}
            icon={EyeIcon}
          />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <StatCard
            title="Overall CTR"
            value={`${overallCTR.toFixed(2)}%`}
            change={{ value: 8.1, type: 'increase' }}
            icon={CursorArrowRaysIcon}
          />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <StatCard
            title="Total Conversions"
            value={totalConversions.toString()}
            change={{ value: 15.3, type: 'increase' }}
            icon={ChartBarIcon}
          />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <StatCard
            title="Ad Spend"
            value={formatCurrency(totalSpend)}
            change={{ value: 3.2, type: 'decrease' }}
            icon={CurrencyDollarIcon}
          />
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <PerformanceChart />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <QuickActions />
        </div>
      </div>

      {/* Active Campaigns */}
      <div className="animate-slide-up" style={{ animationDelay: '0.7s' }}>
        <ActiveCampaignsTable />
      </div>
    </div>
  );
};
