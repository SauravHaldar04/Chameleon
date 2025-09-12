import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { analyticsData } from '../../data/analytics';
import { useTheme } from '../../contexts/ThemeContext';

export const PerformanceChart: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const chartData = analyticsData.slice(-14).map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    ctr: item.ctr,
    conversions: item.conversions
  }));

  // Define colors based on theme
  const chartColors = {
    grid: isDark ? '#374151' : '#e5e7eb',
    text: isDark ? '#9ca3af' : '#6b7280',
    tooltipBg: isDark ? '#1f2937' : '#ffffff',
    tooltipBorder: isDark ? '#374151' : '#e5e7eb',
    tooltipText: isDark ? '#f9fafb' : '#111827',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Trends (Last 14 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
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
                tick={{ fill: chartColors.text }}
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                fontSize={12}
                tickLine={false}
                axisLine={false}
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
                        <p className="text-primary-600">
                          CTR: {payload[0]?.value}%
                        </p>
                        <p className="text-green-600">
                          Conversions: {payload[1]?.value}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="ctr" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="conversions" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-primary-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Click-through Rate (%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Conversions</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
