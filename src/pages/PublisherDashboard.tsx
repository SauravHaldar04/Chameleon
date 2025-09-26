import React, { useState, useEffect } from 'react';
import { WebsiteUpload } from '../components/publisher/WebsiteUpload';
import { AnalysisResults } from '../components/publisher/AnalysisResults';
import { WebsiteAnalysis, websiteAnalysisService } from '../services/websiteAnalysis';
import { 
  GlobeAltIcon, 
  ChartBarIcon, 
  ClockIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

export const PublisherDashboard: React.FC = () => {
  const [currentAnalysis, setCurrentAnalysis] = useState<WebsiteAnalysis | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<WebsiteAnalysis[]>([]);

  useEffect(() => {
    // Load existing analyses
    const analyses = websiteAnalysisService.getAllAnalyses();
    setAnalysisHistory(analyses);
  }, []);

  useEffect(() => {
    // Poll for analysis updates if we have an active analysis
    if (currentAnalysis && currentAnalysis.status === 'analyzing') {
      const interval = setInterval(() => {
        const updatedAnalysis = websiteAnalysisService.getAnalysis(currentAnalysis.id);
        if (updatedAnalysis && updatedAnalysis.status !== 'analyzing') {
          setCurrentAnalysis(updatedAnalysis);
          setAnalysisHistory(websiteAnalysisService.getAllAnalyses());
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentAnalysis]);

  const handleAnalysisStart = (analysis: WebsiteAnalysis) => {
    setCurrentAnalysis(analysis);
    setAnalysisHistory(websiteAnalysisService.getAllAnalyses());
  };

  const handleCloseAnalysis = () => {
    setCurrentAnalysis(null);
  };

  const handleSelectHistoryItem = (analysis: WebsiteAnalysis) => {
    setCurrentAnalysis(analysis);
  };

  const getAnalysisStats = () => {
    const completed = analysisHistory.filter(a => a.status === 'completed');
    const avgScore = completed.length > 0 
      ? completed.reduce((sum, a) => sum + a.score, 0) / completed.length 
      : 0;
    
    return {
      totalAnalyses: analysisHistory.length,
      completedAnalyses: completed.length,
      averageScore: Math.round(avgScore),
      lastAnalyzed: completed.length > 0 ? completed[0].analyzedAt : null
    };
  };

  const stats = getAnalysisStats();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Publisher Dashboard 📊
          </h1>
          <p className="text-muted-foreground">
            Analyze your content and discover trending opportunities
          </p>
        </div>
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Analyses</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalAnalyses}</p>
              </div>
              <ChartBarIcon className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-foreground">{stats.completedAnalyses}</p>
              </div>
              <EyeIcon className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Score</p>
                <p className="text-2xl font-bold text-foreground">{stats.averageScore}/100</p>
              </div>
              <GlobeAltIcon className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Last Analysis</p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.lastAnalyzed ? new Date(stats.lastAnalyzed).toLocaleDateString() : 'None'}
                </p>
              </div>
              <ClockIcon className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upload Form */}
          <div className="lg:col-span-1">
            <WebsiteUpload onAnalysisStart={handleAnalysisStart} />

            {/* Analysis History */}
            {analysisHistory.length > 0 && (
              <div className="mt-8 bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Analyses</h3>
                <div className="space-y-3">
                  {analysisHistory.slice(0, 5).map((analysis) => (
                    <div
                      key={analysis.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        currentAnalysis?.id === analysis.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-muted/50'
                      }`}
                      onClick={() => handleSelectHistoryItem(analysis)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {analysis.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(analysis.analyzedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {analysis.status === 'completed' && (
                            <span className="text-sm font-bold text-primary">
                              {analysis.score}/100
                            </span>
                          )}
                          <div className={`w-2 h-2 rounded-full ${
                            analysis.status === 'completed' ? 'bg-green-500' :
                            analysis.status === 'analyzing' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Analysis Results */}
          <div className="lg:col-span-2">
            {currentAnalysis ? (
              <AnalysisResults 
                analysis={currentAnalysis} 
                onClose={handleCloseAnalysis}
              />
            ) : (
              <div className="bg-card rounded-lg border border-border p-8 text-center">
                <GlobeAltIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No Analysis Selected
                </h3>
                <p className="text-muted-foreground mb-6">
                  Upload a website URL to start analyzing your content for trends and optimization opportunities.
                </p>
                <div className="text-sm text-muted-foreground">
                  <p>• Get AI-powered content insights</p>
                  <p>• Discover trending topics in your niche</p>
                  <p>• Receive actionable recommendations</p>
                  <p>• Track performance over time</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
