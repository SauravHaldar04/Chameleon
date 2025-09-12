import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Select } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { analyticsData, abTestResults } from '../data/analytics';
import { useTheme } from '../contexts/ThemeContext';

export const Analytics: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [dateRange, setDateRange] = useState('30');
  const [campaignFilter, setCampaignFilter] = useState('all');

  // Define colors based on theme
  const chartColors = {
    grid: isDark ? '#374151' : '#e5e7eb',
    text: isDark ? '#9ca3af' : '#6b7280',
    tooltipBg: isDark ? '#1f2937' : '#ffffff',
    tooltipBorder: isDark ? '#374151' : '#e5e7eb',
    tooltipText: isDark ? '#f9fafb' : '#111827',
  };

  const filterOptions = [
    { value: '7', label: 'Last 7 days' },
    { value: '14', label: 'Last 14 days' },
    { value: '30', label: 'Last 30 days' }
  ];

  const campaignOptions = [
    { value: 'all', label: 'All Campaigns' },
    { value: 'coca-cola', label: 'Coca-Cola' },
    { value: 'nike', label: 'Nike' },
    { value: 'apple', label: 'Apple' }
  ];

  const chartData = analyticsData.slice(-parseInt(dateRange)).map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    impressions: item.impressions / 1000, // Convert to thousands
    ctr: item.ctr,
    conversions: item.conversions,
    spend: item.spend
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-slideIn">
        <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">Analytics Dashboard</h2>
        <p className="text-secondary-600 dark:text-secondary-400 mt-1">Track performance and A/B test results</p>
      </div>

      {/* Filters */}
      <Card className="animate-slideIn animation-delay-100">
        <CardContent className="flex flex-wrap gap-4">
          <Select
            label="Date Range"
            options={filterOptions}
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-48"
          />
          <Select
            label="Campaign"
            options={campaignOptions}
            value={campaignFilter}
            onChange={(e) => setCampaignFilter(e.target.value)}
            className="w-48"
          />
        </CardContent>
      </Card>

      {/* Main Analytics Chart */}
      <Card className="animate-slideIn animation-delay-200">
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis 
                  dataKey="date" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: chartColors.text }}
                />
                <YAxis 
                  yAxisId="left"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}K`}
                  tick={{ fill: chartColors.text }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                  tick={{ fill: chartColors.text }}
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div 
                          className="p-3 border rounded-lg shadow-sm"
                          style={{
                            backgroundColor: chartColors.tooltipBg,
                            borderColor: chartColors.tooltipBorder,
                            color: chartColors.tooltipText
                          }}
                        >
                          <p className="font-medium" style={{ color: chartColors.tooltipText }}>{label}</p>
                          {payload.map((entry, index) => (
                            <p key={index} style={{ color: entry.color }}>
                              {entry.name}: {entry.value}
                              {entry.dataKey === 'impressions' ? 'K' : 
                               entry.dataKey === 'ctr' ? '%' : 
                               entry.dataKey === 'spend' ? '$' : ''}
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="impressions" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Impressions"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="ctr" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="CTR"
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="conversions" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name="Conversions"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-primary-500 rounded-full mr-2"></div>
              <span className="text-sm text-secondary-600 dark:text-secondary-400">Impressions (K)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-accent-500 rounded-full mr-2"></div>
              <span className="text-sm text-secondary-600 dark:text-secondary-400">CTR (%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-secondary-500 rounded-full mr-2"></div>
              <span className="text-sm text-secondary-600 dark:text-secondary-400">Conversions</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* A/B Testing Results */}
      <Card className="animate-slideIn animation-delay-300">
        <CardHeader>
          <CardTitle>A/B Testing Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Context</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Variation A</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Variation B</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Winner</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Confidence</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Duration</th>
                </tr>
              </thead>
              <tbody>
                {abTestResults.map((test) => (
                  <tr key={test.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{test.context}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <div className="font-medium">{test.variationA.name}</div>
                        <div className="text-gray-600">
                          CTR: {test.variationA.ctr}% | Conv: {test.variationA.conversions}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <div className="font-medium">{test.variationB.name}</div>
                        <div className="text-gray-600">
                          CTR: {test.variationB.ctr}% | Conv: {test.variationB.conversions}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={test.winner === 'B' ? 'success' : 'info'}
                        size="sm"
                      >
                        Variation {test.winner}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">{test.confidence}%</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-600">{test.testDuration}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Performance by Context */}
      <Card>
        <CardHeader>
          <CardTitle>Performance by Context Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { context: 'Sports', ctr: 1.8, conversions: 67 },
                { context: 'Family', ctr: 1.7, conversions: 58 },
                { context: 'Tech', ctr: 1.9, conversions: 51 },
                { context: 'Lifestyle', ctr: 1.4, conversions: 45 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="context" tick={{ fill: chartColors.text }} />
                <YAxis tick={{ fill: chartColors.text }} />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div 
                          className="p-3 border rounded-lg shadow-sm"
                          style={{
                            backgroundColor: chartColors.tooltipBg,
                            borderColor: chartColors.tooltipBorder,
                            color: chartColors.tooltipText
                          }}
                        >
                          <p className="font-medium" style={{ color: chartColors.tooltipText }}>{label}</p>
                          {payload.map((entry, index) => (
                            <p key={index} style={{ color: entry.color }}>
                              {entry.name}: {entry.value}%
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="ctr" fill="#3b82f6" name="CTR (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
