// Import a placeholder image for the avatar
import cokeOriginal from '../images/coke-original.png';

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
  avatar: cokeOriginal
};
