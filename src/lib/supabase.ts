import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'brand' | 'publisher';
  created_at: string;
  updated_at: string;
  
  // Brand-specific fields
  company_name?: string;
  industry?: string;
  company_size?: string;
  
  // Publisher-specific fields
  website_name?: string;
  website_url?: string;
  website_category?: string;
  monthly_page_views?: string;
  description?: string;
}
