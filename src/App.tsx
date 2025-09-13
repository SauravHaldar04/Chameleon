import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AutosaveProvider } from './contexts/AutosaveContext';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Campaigns } from './pages/Campaigns';
import { CreativeLibrary } from './pages/CreativeLibrary';
import { CreativeDetail } from './pages/CreativeDetail';
import { UploadCreative } from './pages/UploadCreative';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import Landing from './pages/Landing';

function App() {
  return (
    <ThemeProvider>
      <AutosaveProvider>
        <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/app/*" element={
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
              } />
            </Routes>
          </Router>
        </div>
      </AutosaveProvider>
    </ThemeProvider>
  );
}

export default App;
