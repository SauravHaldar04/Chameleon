import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AutosaveProvider } from './contexts/AutosaveContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Campaigns } from './pages/Campaigns';
import { CreativeLibrary } from './pages/CreativeLibrary';
import { CreativeDetail } from './pages/CreativeDetail';
import { UploadCreative } from './pages/UploadCreative';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { PublisherDashboard } from './pages/PublisherDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import Landing from './pages/Landing';

// Component to redirect to appropriate dashboard based on user role
const RoleDashboardRedirect: React.FC = () => {
  const { user } = useAuth();
  const redirectPath = user?.role === 'publisher' ? '/publisher/dashboard' : '/app/dashboard';
  return <Navigate to={redirectPath} replace />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AutosaveProvider>
          <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
            <Router>
              <Routes>
                <Route path="/" element={<Landing />} />
                
                {/* Authentication Routes */}
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<Signup />} />
                
                {/* Brand Dashboard Routes */}
                <Route path="/app/*" element={
                  <ProtectedRoute requiredRole="brand">
                    <Layout>
                      <Routes>
                        <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/campaigns" element={<Campaigns />} />
                        <Route path="/creatives" element={<CreativeLibrary />} />
                        <Route path="/creatives/upload" element={<UploadCreative />} />
                        <Route path="/creatives/:creativeId" element={<CreativeDetail />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/settings" element={<Settings />} />
                      </Routes>
                    </Layout>
                  </ProtectedRoute>
                } />
                
                {/* Publisher Dashboard Routes */}
                <Route path="/publisher/*" element={
                  <ProtectedRoute requiredRole="publisher">
                    <Layout>
                      <Routes>
                        <Route path="/" element={<Navigate to="/publisher/dashboard" replace />} />
                        <Route path="/dashboard" element={<PublisherDashboard />} />
                        <Route path="/settings" element={<Settings />} />
                      </Routes>
                    </Layout>
                  </ProtectedRoute>
                } />
                
                {/* Catch-all redirect based on user role */}
                <Route path="/dashboard" element={<ProtectedRoute><RoleDashboardRedirect /></ProtectedRoute>} />
              </Routes>
            </Router>
          </div>
        </AutosaveProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
