import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, UserProfile } from '../lib/supabase';

// Types for user and authentication
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'brand' | 'publisher';
  
  // Brand-specific fields
  companyName?: string;
  industry?: string;
  companySize?: string;
  
  // Publisher-specific fields
  websiteName?: string;
  websiteUrl?: string;
  websiteCategory?: string;
  monthlyPageViews?: string;
  description?: string;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  // State
  user: User | null;
  loading: boolean;
  
  // Actions
  signUp: (data: SignUpData) => Promise<{ user: User | null; error: string | null }>;
  signIn: (email: string, password: string, role: 'brand' | 'publisher') => Promise<{ user: User | null; error: string | null }>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<{ user: User | null; error: string | null }>;
}

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'brand' | 'publisher';
  
  // Brand-specific fields
  companyName?: string;
  industry?: string;
  companySize?: string;
  
  // Publisher-specific fields
  websiteName?: string;
  websiteUrl?: string;
  websiteCategory?: string;
  monthlyPageViews?: string;
  description?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state (check for existing session)
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get existing session from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Fetch user profile from profiles table
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (profile && !error) {
            const user: User = {
              id: profile.id,
              email: profile.email,
              firstName: profile.first_name,
              lastName: profile.last_name,
              role: profile.role,
              companyName: profile.company_name,
              industry: profile.industry,
              companySize: profile.company_size,
              websiteName: profile.website_name,
              websiteUrl: profile.website_url,
              websiteCategory: profile.website_category,
              monthlyPageViews: profile.monthly_page_views,
              description: profile.description,
              createdAt: profile.created_at,
              updatedAt: profile.updated_at,
            };
            setUser(user);
          }
        }

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
              // Fetch user profile when signed in
              const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
                
              if (profile) {
                const user: User = {
                  id: profile.id,
                  email: profile.email,
                  firstName: profile.first_name,
                  lastName: profile.last_name,
                  role: profile.role,
                  companyName: profile.company_name,
                  industry: profile.industry,
                  companySize: profile.company_size,
                  websiteName: profile.website_name,
                  websiteUrl: profile.website_url,
                  websiteCategory: profile.website_category,
                  monthlyPageViews: profile.monthly_page_views,
                  description: profile.description,
                  createdAt: profile.created_at,
                  updatedAt: profile.updated_at,
                };
                setUser(user);
              }
            } else if (event === 'SIGNED_OUT') {
              setUser(null);
            }
          }
        );

        return () => subscription.unsubscribe();
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signUp = async (data: SignUpData): Promise<{ user: User | null; error: string | null }> => {
    setLoading(true);
    
    try {
      // Sign up user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            role: data.role,
          }
        }
      });

      if (authError) {
        return { user: null, error: authError.message };
      }

      if (!authData.user) {
        return { user: null, error: 'Failed to create account' };
      }

      // Create user profile in profiles table
      const profileData: Partial<UserProfile> = {
        id: authData.user.id,
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        role: data.role,
        company_name: data.companyName,
        industry: data.industry,
        company_size: data.companySize,
        website_name: data.websiteName,
        website_url: data.websiteUrl,
        website_category: data.websiteCategory,
        monthly_page_views: data.monthlyPageViews,
        description: data.description,
      };

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert(profileData)
        .select()
        .single();

      if (profileError) {
        // If profile creation fails, still return success for auth
        console.error('Profile creation error:', profileError);
      }

      const newUser: User = {
        id: authData.user.id,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        companyName: data.companyName,
        industry: data.industry,
        companySize: data.companySize,
        websiteName: data.websiteName,
        websiteUrl: data.websiteUrl,
        websiteCategory: data.websiteCategory,
        monthlyPageViews: data.monthlyPageViews,
        description: data.description,
        createdAt: profile?.created_at || new Date().toISOString(),
        updatedAt: profile?.updated_at || new Date().toISOString(),
      };
      
      setUser(newUser);
      return { user: newUser, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { user: null, error: 'Failed to create account. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (
    email: string, 
    password: string, 
    role: 'brand' | 'publisher'
  ): Promise<{ user: User | null; error: string | null }> => {
    setLoading(true);
    
    try {
      // Sign in with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        return { user: null, error: authError.message };
      }

      if (!authData.user) {
        return { user: null, error: 'Sign in failed' };
      }

      // Fetch user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        return { user: null, error: 'Failed to fetch user profile' };
      }

      // Validate role matches (optional check)
      if (profile.role !== role) {
        return { user: null, error: `This account is registered as a ${profile.role}, not a ${role}` };
      }

      const user: User = {
        id: profile.id,
        email: profile.email,
        firstName: profile.first_name,
        lastName: profile.last_name,
        role: profile.role,
        companyName: profile.company_name,
        industry: profile.industry,
        companySize: profile.company_size,
        websiteName: profile.website_name,
        websiteUrl: profile.website_url,
        websiteCategory: profile.website_category,
        monthlyPageViews: profile.monthly_page_views,
        description: profile.description,
        createdAt: profile.created_at,
        updatedAt: profile.updated_at,
      };
      
      setUser(user);
      return { user, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { user: null, error: 'Invalid email or password. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
      }
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updates: Partial<User>): Promise<{ user: User | null; error: string | null }> => {
    if (!user) {
      return { user: null, error: 'No user logged in' };
    }
    
    setLoading(true);
    
    try {
      // Prepare update data for Supabase
      const updateData: Partial<UserProfile> = {
        first_name: updates.firstName,
        last_name: updates.lastName,
        company_name: updates.companyName,
        industry: updates.industry,
        company_size: updates.companySize,
        website_name: updates.websiteName,
        website_url: updates.websiteUrl,
        website_category: updates.websiteCategory,
        monthly_page_views: updates.monthlyPageViews,
        description: updates.description,
        updated_at: new Date().toISOString(),
      };

      // Remove undefined values
      const cleanUpdateData = Object.fromEntries(
        Object.entries(updateData).filter(([_, value]) => value !== undefined)
      );

      const { data: profile, error } = await supabase
        .from('profiles')
        .update(cleanUpdateData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Update user error:', error);
        return { user: null, error: 'Failed to update profile' };
      }

      const updatedUser: User = {
        ...user,
        firstName: profile.first_name,
        lastName: profile.last_name,
        companyName: profile.company_name,
        industry: profile.industry,
        companySize: profile.company_size,
        websiteName: profile.website_name,
        websiteUrl: profile.website_url,
        websiteCategory: profile.website_category,
        monthlyPageViews: profile.monthly_page_views,
        description: profile.description,
        updatedAt: profile.updated_at,
      };

      setUser(updatedUser);
      return { user: updatedUser, error: null };
    } catch (error) {
      console.error('Update user error:', error);
      return { user: null, error: 'Failed to update user. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
