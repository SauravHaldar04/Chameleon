export interface AnalyticsData {
  date: string;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  spend: number;
  cpm: number;
}

export interface ABTestResult {
  id: string;
  context: string;
  variationA: {
    name: string;
    ctr: number;
    conversions: number;
    imageUrl: string;
  };
  variationB: {
    name: string;
    ctr: number;
    conversions: number;
    imageUrl: string;
  };
  winner: 'A' | 'B';
  confidence: number;
  testDuration: string;
}

// Mock analytics data for the last 30 days
export const analyticsData: AnalyticsData[] = [
  { date: '2024-08-15', impressions: 45000, clicks: 675, ctr: 1.5, conversions: 34, spend: 2250, cpm: 50 },
  { date: '2024-08-16', impressions: 48000, clicks: 720, ctr: 1.5, conversions: 36, spend: 2400, cpm: 50 },
  { date: '2024-08-17', impressions: 52000, clicks: 832, ctr: 1.6, conversions: 42, spend: 2600, cpm: 50 },
  { date: '2024-08-18', impressions: 49000, clicks: 735, ctr: 1.5, conversions: 37, spend: 2450, cpm: 50 },
  { date: '2024-08-19', impressions: 51000, clicks: 765, ctr: 1.5, conversions: 38, spend: 2550, cpm: 50 },
  { date: '2024-08-20', impressions: 53000, clicks: 848, ctr: 1.6, conversions: 42, spend: 2650, cpm: 50 },
  { date: '2024-08-21', impressions: 55000, clicks: 880, ctr: 1.6, conversions: 44, spend: 2750, cpm: 50 },
  { date: '2024-08-22', impressions: 47000, clicks: 705, ctr: 1.5, conversions: 35, spend: 2350, cpm: 50 },
  { date: '2024-08-23', impressions: 50000, clicks: 750, ctr: 1.5, conversions: 38, spend: 2500, cpm: 50 },
  { date: '2024-08-24', impressions: 52000, clicks: 832, ctr: 1.6, conversions: 42, spend: 2600, cpm: 50 },
  { date: '2024-08-25', impressions: 54000, clicks: 864, ctr: 1.6, conversions: 43, spend: 2700, cpm: 50 },
  { date: '2024-08-26', impressions: 48000, clicks: 720, ctr: 1.5, conversions: 36, spend: 2400, cpm: 50 },
  { date: '2024-08-27', impressions: 51000, clicks: 765, ctr: 1.5, conversions: 38, spend: 2550, cpm: 50 },
  { date: '2024-08-28', impressions: 53000, clicks: 848, ctr: 1.6, conversions: 42, spend: 2650, cpm: 50 },
  { date: '2024-08-29', impressions: 56000, clicks: 896, ctr: 1.6, conversions: 45, spend: 2800, cpm: 50 },
  { date: '2024-08-30', impressions: 49000, clicks: 735, ctr: 1.5, conversions: 37, spend: 2450, cpm: 50 },
  { date: '2024-08-31', impressions: 52000, clicks: 832, ctr: 1.6, conversions: 42, spend: 2600, cpm: 50 },
  { date: '2024-09-01', impressions: 54000, clicks: 864, ctr: 1.6, conversions: 43, spend: 2700, cpm: 50 },
  { date: '2024-09-02', impressions: 50000, clicks: 750, ctr: 1.5, conversions: 38, spend: 2500, cpm: 50 },
  { date: '2024-09-03', impressions: 53000, clicks: 848, ctr: 1.6, conversions: 42, spend: 2650, cpm: 50 },
  { date: '2024-09-04', impressions: 55000, clicks: 880, ctr: 1.6, conversions: 44, spend: 2750, cpm: 50 },
  { date: '2024-09-05', impressions: 48000, clicks: 720, ctr: 1.5, conversions: 36, spend: 2400, cpm: 50 },
  { date: '2024-09-06', impressions: 51000, clicks: 765, ctr: 1.5, conversions: 38, spend: 2550, cpm: 50 },
  { date: '2024-09-07', impressions: 57000, clicks: 912, ctr: 1.6, conversions: 46, spend: 2850, cpm: 50 },
  { date: '2024-09-08', impressions: 52000, clicks: 832, ctr: 1.6, conversions: 42, spend: 2600, cpm: 50 },
  { date: '2024-09-09', impressions: 54000, clicks: 864, ctr: 1.6, conversions: 43, spend: 2700, cpm: 50 },
  { date: '2024-09-10', impressions: 50000, clicks: 750, ctr: 1.5, conversions: 38, spend: 2500, cpm: 50 },
  { date: '2024-09-11', impressions: 53000, clicks: 848, ctr: 1.6, conversions: 42, spend: 2650, cpm: 50 },
  { date: '2024-09-12', impressions: 55000, clicks: 880, ctr: 1.6, conversions: 44, spend: 2750, cpm: 50 }
];

export const abTestResults: ABTestResult[] = [
  {
    id: 'test-1',
    context: 'Sports Articles',
    variationA: {
      name: 'Original Coca-Cola Ad',
      ctr: 1.2,
      conversions: 45,
      imageUrl: '/images/coke-original.jpg'
    },
    variationB: {
      name: 'Marathon-Optimized',
      ctr: 1.8,
      conversions: 67,
      imageUrl: '/images/coke-marathon.jpg'
    },
    winner: 'B',
    confidence: 95,
    testDuration: '14 days'
  },
  {
    id: 'test-2',
    context: 'Family Lifestyle',
    variationA: {
      name: 'Generic Nike Ad',
      ctr: 1.5,
      conversions: 52,
      imageUrl: '/images/nike-original.jpg'
    },
    variationB: {
      name: 'Street Style Variant',
      ctr: 2.1,
      conversions: 73,
      imageUrl: '/images/nike-street.jpg'
    },
    winner: 'B',
    confidence: 98,
    testDuration: '21 days'
  },
  {
    id: 'test-3',
    context: 'Tech Reviews',
    variationA: {
      name: 'Standard iPhone Ad',
      ctr: 1.4,
      conversions: 38,
      imageUrl: '/images/iphone-original.jpg'
    },
    variationB: {
      name: 'Tech-Focused Variant',
      ctr: 1.9,
      conversions: 51,
      imageUrl: '/images/iphone-tech.jpg'
    },
    winner: 'B',
    confidence: 92,
    testDuration: '10 days'
  },
  {
    id: 'test-4',
    context: 'Parenting Blogs',
    variationA: {
      name: 'Standard Happy Meal',
      ctr: 1.3,
      conversions: 41,
      imageUrl: '/images/mcdonalds-original.jpg'
    },
    variationB: {
      name: 'Family-Optimized',
      ctr: 1.7,
      conversions: 58,
      imageUrl: '/images/mcdonalds-family.jpg'
    },
    winner: 'B',
    confidence: 89,
    testDuration: '18 days'
  }
];
