export interface Campaign {
  id: string;
  name: string;
  advertiser: string;
  status: 'Active' | 'Paused' | 'Completed';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  startDate: string;
  endDate: string;
  creativeIds: string[];
}

export const campaigns: Campaign[] = [
  {
    id: 'campaign-1',
    name: 'Summer Refresh Campaign',
    advertiser: 'Coca-Cola',
    status: 'Active',
    budget: 50000,
    spent: 34250,
    impressions: 1250000,
    clicks: 15625,
    ctr: 1.25,
    conversions: 891,
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    creativeIds: ['creative-1']
  },
  {
    id: 'campaign-2',
    name: 'Air Max Revolution Launch',
    advertiser: 'Nike',
    status: 'Active',
    budget: 75000,
    spent: 42100,
    impressions: 980000,
    clicks: 19600,
    ctr: 2.0,
    conversions: 1274,
    startDate: '2024-05-15',
    endDate: '2024-09-15',
    creativeIds: ['creative-2']
  },
  {
    id: 'campaign-3',
    name: 'iPhone 15 Pro Launch',
    advertiser: 'Apple',
    status: 'Paused',
    budget: 100000,
    spent: 12500,
    impressions: 345000,
    clicks: 5175,
    ctr: 1.5,
    conversions: 207,
    startDate: '2024-07-01',
    endDate: '2024-10-31',
    creativeIds: ['creative-3']
  },
  {
    id: 'campaign-4',
    name: 'Happy Meal Adventure',
    advertiser: 'McDonald\'s',
    status: 'Active',
    budget: 30000,
    spent: 18900,
    impressions: 750000,
    clicks: 11250,
    ctr: 1.5,
    conversions: 675,
    startDate: '2024-06-15',
    endDate: '2024-09-30',
    creativeIds: ['creative-4']
  },
  {
    id: 'campaign-5',
    name: 'Back to School Special',
    advertiser: 'Apple',
    status: 'Completed',
    budget: 45000,
    spent: 45000,
    impressions: 890000,
    clicks: 13350,
    ctr: 1.5,
    conversions: 801,
    startDate: '2024-07-15',
    endDate: '2024-08-31',
    creativeIds: ['creative-3']
  }
];
