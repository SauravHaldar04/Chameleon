import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

const signupSchema = z.object({
  // Common fields
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.enum(['brand', 'publisher']).optional().refine((val) => val !== undefined, {
    message: 'Please select your role'
  }),
  
  // Brand-specific fields
  companyName: z.string().optional(),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  
  // Publisher-specific fields
  websiteName: z.string().optional(),
  websiteUrl: z.string().optional(),
  websiteCategory: z.string().optional(),
  monthlyPageViews: z.string().optional(),
  description: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

export const SignupForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signUp, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: SignupFormData) => {
    setError(null);
    try {
      const result = await signUp({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role!,
        companyName: data.companyName,
        industry: data.industry,
        companySize: data.companySize,
        websiteName: data.websiteName,
        websiteUrl: data.websiteUrl,
        websiteCategory: data.websiteCategory,
        monthlyPageViews: data.monthlyPageViews,
        description: data.description,
      });
      
      if (result.error) {
        setError(result.error);
        return;
      }
      
      // Navigate to role-specific dashboard
      const redirectPath = data.role === 'publisher' ? '/publisher/dashboard' : '/app/dashboard';
      navigate(redirectPath);
    } catch (error) {
      console.error('Signup error:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Role Selection */}
      <div>
        <label className="text-sm font-medium text-foreground block mb-3">
          I want to join as a:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setValue('role', 'brand')}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selectedRole === 'brand'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-border hover:border-primary/50 hover:bg-primary/5'
            }`}
          >
            <div className="font-medium">Brand / Advertiser</div>
            <div className="text-xs text-muted-foreground mt-1">
              Create AI-powered ad campaigns
            </div>
          </button>
          <button
            type="button"
            onClick={() => setValue('role', 'publisher')}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selectedRole === 'publisher'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-border hover:border-primary/50 hover:bg-primary/5'
            }`}
          >
            <div className="font-medium">Publisher</div>
            <div className="text-xs text-muted-foreground mt-1">
              Monetize your website with contextual ads
            </div>
          </button>
        </div>
        {errors.role && (
          <p className="mt-1 text-sm text-destructive">
            {errors.role.message}
          </p>
        )}
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
            First Name
          </label>
          <Input
            id="firstName"
            type="text"
            {...register('firstName')}
            className={errors.firstName ? 'border-destructive' : ''}
            placeholder="John"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-destructive">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
            Last Name
          </label>
          <Input
            id="lastName"
            type="text"
            {...register('lastName')}
            className={errors.lastName ? 'border-destructive' : ''}
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-destructive">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Email Address
        </label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          {...register('email')}
          className={errors.email ? 'border-destructive' : ''}
          placeholder="john@company.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className={`pr-10 ${errors.password ? 'border-destructive' : ''}`}
              placeholder="Min. 8 characters"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-muted-foreground" />
              ) : (
                <EyeIcon className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
              className={`pr-10 ${errors.confirmPassword ? 'border-destructive' : ''}`}
              placeholder="Confirm password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-muted-foreground" />
              ) : (
                <EyeIcon className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-destructive">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      {/* Role-specific fields */}
      {selectedRole === 'brand' && (
        <div className="space-y-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <h3 className="text-sm font-medium text-primary">Brand Information</h3>
          
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-foreground mb-2">
              Company Name
            </label>
            <Input
              id="companyName"
              type="text"
              {...register('companyName')}
              placeholder="Your Company Inc."
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-foreground mb-2">
                Industry
              </label>
              <select
                id="industry"
                {...register('industry')}
                className="w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
              >
                <option value="">Select Industry</option>
                <option value="technology">Technology</option>
                <option value="retail">Retail</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="food-beverage">Food & Beverage</option>
                <option value="automotive">Automotive</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="companySize" className="block text-sm font-medium text-foreground mb-2">
                Company Size
              </label>
              <select
                id="companySize"
                {...register('companySize')}
                className="w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
              >
                <option value="">Select Size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="500+">500+ employees</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {selectedRole === 'publisher' && (
        <div className="space-y-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <h3 className="text-sm font-medium text-primary">Website Information</h3>
          
          <div>
            <label htmlFor="websiteName" className="block text-sm font-medium text-foreground mb-2">
              Website Name
            </label>
            <Input
              id="websiteName"
              type="text"
              {...register('websiteName')}
              placeholder="My Awesome Blog"
            />
          </div>
          
          <div>
            <label htmlFor="websiteUrl" className="block text-sm font-medium text-foreground mb-2">
              Website URL
            </label>
            <Input
              id="websiteUrl"
              type="url"
              {...register('websiteUrl')}
              placeholder="https://mywebsite.com"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="websiteCategory" className="block text-sm font-medium text-foreground mb-2">
                Category
              </label>
              <select
                id="websiteCategory"
                {...register('websiteCategory')}
                className="w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
              >
                <option value="">Select Category</option>
                <option value="gaming">Gaming</option>
                <option value="fitness">Fitness & Sports</option>
                <option value="family">Family & Lifestyle</option>
                <option value="cooking">Food & Cooking</option>
                <option value="news">News & Media</option>
                <option value="technology">Technology</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="monthlyPageViews" className="block text-sm font-medium text-foreground mb-2">
                Monthly Page Views
              </label>
              <select
                id="monthlyPageViews"
                {...register('monthlyPageViews')}
                className="w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
              >
                <option value="">Select Range</option>
                <option value="0-1k">0 - 1,000</option>
                <option value="1k-10k">1,000 - 10,000</option>
                <option value="10k-100k">10,000 - 100,000</option>
                <option value="100k-1m">100,000 - 1M</option>
                <option value="1m+">1M+</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
              Website Description
            </label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Brief description of your website content and audience"
              rows={3}
            />
          </div>
        </div>
      )}

      {/* Terms and Conditions */}
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="h-4 w-4 text-primary focus:ring-primary border-input rounded"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="terms" className="text-muted-foreground">
            I agree to the{' '}
            <Link to="/terms" className="text-primary hover:text-primary/80 transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary hover:text-primary/80 transition-colors">
              Privacy Policy
            </Link>
          </label>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        size="lg"
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </Button>

      {/* Sign In Link */}
      <div className="text-center">
        <span className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Sign in
          </Link>
        </span>
      </div>
    </form>
  );
};
