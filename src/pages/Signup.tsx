import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { SignupForm } from '../components/auth/SignupForm';

export const Signup: React.FC = () => {
  return (
    <AuthLayout
      title="Join Chameleon"
      subtitle="Create your account and start transforming your advertising"
    >
      <SignupForm />
    </AuthLayout>
  );
};
