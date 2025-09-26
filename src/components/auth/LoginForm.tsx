import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['brand', 'publisher']).optional().refine((val) => val !== undefined, {
    message: 'Please select your role'
  })
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signIn, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    try {
      const result = await signIn(data.email, data.password, data.role!);
      
      if (result.error) {
        setError(result.error);
        return;
      }
      
      // Navigate to role-specific dashboard
      const redirectPath = data.role === 'publisher' ? '/publisher/dashboard' : '/app/dashboard';
      navigate(redirectPath);
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Role Selection */}
      <div>
        <label className="text-sm font-medium text-foreground block mb-3">
          I am a:
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setValue('role', 'brand')}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selectedRole === 'brand'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-border hover:border-primary/50 hover:bg-muted'
            }`}
          >
            <div className="font-medium">Brand</div>
            <div className="text-xs text-muted-foreground mt-1">
              Advertiser looking to create campaigns
            </div>
          </button>
          <button
            type="button"
            onClick={() => setValue('role', 'publisher')}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selectedRole === 'publisher'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-border hover:border-primary/50 hover:bg-muted'
            }`}
          >
            <div className="font-medium">Publisher</div>
            <div className="text-xs text-muted-foreground mt-1">
              Website owner showing ads
            </div>
          </button>
        </div>
        {errors.role && (
          <p className="mt-1 text-sm text-destructive">
            {errors.role.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Email address
        </label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          {...register('email')}
          className={errors.email ? 'border-destructive' : ''}
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            {...register('password')}
            className={`pr-10 ${errors.password ? 'border-destructive' : ''}`}
            placeholder="Enter your password"
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

      {/* Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link
            to="/auth/forgot-password"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Forgot your password?
          </Link>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
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
        {loading ? 'Signing in...' : 'Sign in'}
      </Button>

      {/* Sign Up Link */}
      <div className="text-center">
        <span className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link
            to="/auth/signup"
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Sign up
          </Link>
        </span>
      </div>
    </form>
  );
};
