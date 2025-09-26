import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  showBackToHome?: boolean;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  showBackToHome = true
}) => {
  return (
    <div className="min-h-screen bg-background dark:bg-background flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-8 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <span className="text-2xl font-bold text-foreground">Chameleon</span>
          </Link>
          
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {subtitle}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-card dark:bg-card shadow-2xl rounded-2xl px-8 py-8 border border-border">
          {children}
        </div>

        {/* Back to Home */}
        {showBackToHome && (
          <div className="text-center">
            <Link 
              to="/" 
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
