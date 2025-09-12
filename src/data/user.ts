export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  avatar: string;
}

export const currentUser: User = {
  id: 'user-1',
  name: 'Sarah Chen',
  email: 'sarah.chen@advertiser.com',
  company: 'Global Advertising Agency',
  role: 'Campaign Manager',
  avatar: '/images/avatar-sarah.jpg'
};
