import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { currentUser } from '../data/user';

export const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-slideIn">
        <h2 className="text-2xl font-bold text-secondary-900 dark:text-black">Settings</h2>
        <p className="text-secondary-600 dark:text-secondary-700 mt-1">Manage your account and platform preferences</p>
      </div>

      {/* User Profile */}
      <Card className="animate-slideIn animation-delay-100">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <Input
                defaultValue={currentUser.name}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <Input
                type="email"
                defaultValue={currentUser.email}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Company</label>
              <Input
                defaultValue={currentUser.company}
                placeholder="Enter your company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Role</label>
              <Input
                defaultValue={currentUser.role}
                placeholder="Enter your role"
              />
            </div>
          </div>
          <div className="mt-6">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      {/* Platform Settings */}
      <Card className="animate-slideIn animation-delay-200">
        <CardHeader>
          <CardTitle>Platform Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Notifications */}
            <div>
              <h4 className="font-medium text-secondary-900 dark:text-secondary-100 mb-3">Notifications</h4>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-secondary-300 dark:border-secondary-600 text-primary-500 focus:ring-primary-500 dark:bg-secondary-800" defaultChecked />
                  <span className="ml-2 text-sm text-secondary-700 dark:text-secondary-300">Email notifications for campaign updates</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-secondary-300 dark:border-secondary-600 text-primary-500 focus:ring-primary-500 dark:bg-secondary-800" defaultChecked />
                  <span className="ml-2 text-sm text-secondary-700 dark:text-secondary-300">A/B test result notifications</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-secondary-300 dark:border-secondary-600 text-primary-500 focus:ring-primary-500 dark:bg-secondary-800" />
                  <span className="ml-2 text-sm text-secondary-700 dark:text-secondary-300">Weekly performance reports</span>
                </label>
              </div>
            </div>

            {/* AI Settings */}
            <div>
              <h4 className="font-medium text-secondary-900 dark:text-secondary-100 mb-3">AI Generation Settings</h4>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">Enable automatic contextual variations</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">Generate accessibility packages by default</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">Real-time A/B testing optimization</span>
                </label>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button>Save Preferences</Button>
          </div>
        </CardContent>
      </Card>

      {/* API Settings */}
      <Card>
        <CardHeader>
          <CardTitle>API & Integrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">API Key</h4>
              <div className="flex space-x-2">
                <Input
                  value="ch_test_sk_1234567890abcdef"
                  readOnly
                  className="font-mono text-sm"
                />
                <Button variant="outline">Regenerate</Button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Use this API key to integrate Chameleon with your existing ad management tools.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
