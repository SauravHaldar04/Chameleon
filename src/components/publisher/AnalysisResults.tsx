import React from 'react';
import { WebsiteAnalysis } from '../../services/websiteAnalysis';
import { 
  ChartBarIcon, 
  EyeIcon, 
  SparklesIcon,
  LightBulbIcon,
  ArrowTrendingUpIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface AnalysisResultsProps {
  analysis: WebsiteAnalysis;
  onClose?: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis, onClose }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technology': return '💻';
      case 'lifestyle': return '🌱';
      case 'business': return '💼';
      case 'health': return '🏥';
      case 'entertainment': return '🎬';
      case 'fashion': return '👗';
      case 'gaming': return '🎮';
      default: return '📝';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'content': return <SparklesIcon className="w-4 h-4" />;
      case 'seo': return <ChartBarIcon className="w-4 h-4" />;
      case 'engagement': return <EyeIcon className="w-4 h-4" />;
      case 'monetization': return <ArrowTrendingUpIcon className="w-4 h-4" />;
      default: return <LightBulbIcon className="w-4 h-4" />;
    }
  };

  if (analysis.status === 'analyzing') {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Analyzing Content...</h3>
          {onClose && (
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span>Processing your website content...</span>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>• Extracting content structure</p>
          <p>• Analyzing trends and relevance</p>
          <p>• Generating recommendations</p>
        </div>
      </div>
    );
  }

  if (analysis.status === 'failed') {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Analysis Failed</h3>
          {onClose && (
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-3 text-destructive">
          <ExclamationCircleIcon className="w-6 h-6" />
          <span>Unable to analyze the provided URL. Please try again.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-foreground">Analysis Complete</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{analysis.title}</p>
            <p className="text-xs text-muted-foreground">
              Analyzed on {new Date(analysis.analyzedAt).toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className={`px-4 py-2 rounded-lg border ${getScoreBgColor(analysis.score)}`}>
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(analysis.score)}`}>
                  {analysis.score}
                </div>
                <div className="text-xs text-muted-foreground">Overall Score</div>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content Analysis */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h4 className="text-md font-semibold text-foreground mb-4 flex items-center gap-2">
          <ChartBarIcon className="w-5 h-5 text-primary" />
          Content Analysis
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-background rounded-lg">
            <div className="text-lg font-bold text-foreground">{analysis.contentAnalysis.wordCount.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Words</div>
          </div>
          <div className="text-center p-3 bg-background rounded-lg">
            <div className="text-lg font-bold text-foreground">{analysis.contentAnalysis.readingTime}</div>
            <div className="text-xs text-muted-foreground">Min Read</div>
          </div>
          <div className="text-center p-3 bg-background rounded-lg">
            <div className={`text-lg font-bold ${
              analysis.contentAnalysis.sentiment === 'positive' ? 'text-green-600' :
              analysis.contentAnalysis.sentiment === 'negative' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {analysis.contentAnalysis.sentiment.charAt(0).toUpperCase() + analysis.contentAnalysis.sentiment.slice(1)}
            </div>
            <div className="text-xs text-muted-foreground">Sentiment</div>
          </div>
          <div className="text-center p-3 bg-background rounded-lg">
            <div className="text-lg font-bold text-foreground">{analysis.contentAnalysis.topics.length}</div>
            <div className="text-xs text-muted-foreground">Topics</div>
          </div>
        </div>
        <div className="mt-4">
          <h5 className="text-sm font-medium text-foreground mb-2">Key Topics:</h5>
          <div className="flex flex-wrap gap-2">
            {analysis.contentAnalysis.topics.map((topic, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Trend Insights */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h4 className="text-md font-semibold text-foreground mb-4 flex items-center gap-2">
          <ArrowTrendingUpIcon className="w-5 h-5 text-primary" />
          Trending Topics
        </h4>
        <div className="space-y-4">
          {analysis.trends.map((trend) => (
            <div key={trend.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getCategoryIcon(trend.category)}</span>
                  <h5 className="font-medium text-foreground">{trend.trend}</h5>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-primary">{trend.relevance}%</div>
                  <div className="text-xs text-muted-foreground">Relevance</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{trend.description}</p>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">
                    <EyeIcon className="w-3 h-3 inline mr-1" />
                    {trend.potentialReach.toLocaleString()} potential reach
                  </span>
                  <span className="text-muted-foreground">
                    Confidence: {trend.confidenceLevel}%
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  trend.category === 'technology' ? 'bg-blue-100 text-blue-700' :
                  trend.category === 'lifestyle' ? 'bg-green-100 text-green-700' :
                  trend.category === 'business' ? 'bg-purple-100 text-purple-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {trend.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h4 className="text-md font-semibold text-foreground mb-4 flex items-center gap-2">
          <LightBulbIcon className="w-5 h-5 text-primary" />
          Recommendations
        </h4>
        <div className="grid gap-4 md:grid-cols-2">
          {analysis.recommendations.map((rec) => (
            <div key={rec.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start gap-3 mb-2">
                <div className="text-primary mt-0.5">
                  {getRecommendationIcon(rec.type)}
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground">{rec.title}</h5>
                  <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs ${getImpactColor(rec.impact)}`}>
                    {rec.impact} impact
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {rec.effort} effort
                  </span>
                </div>
                <span className="text-xs text-muted-foreground capitalize">
                  {rec.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Partnership CTA */}
      <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-lg border border-primary/20 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🤝</span>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-foreground mb-2">
              Ready for Brand Partnerships?
            </h4>
            <p className="text-muted-foreground mb-4">
              Your content analysis shows great potential! We'll use these insights to match you with brands that align perfectly with your content and audience.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Content quality: <strong className="text-foreground">{analysis.score}/100</strong></span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>Trending topics: <strong className="text-foreground">{analysis.trends.length} identified</strong></span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span>Target audience: <strong className="text-foreground">{analysis.contentAnalysis.sentiment} sentiment</strong></span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span>Monetization potential: <strong className="text-foreground">High</strong></span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <span className="text-lg">🎯</span>
                Connect with Brands
              </button>
              <button className="flex-1 border border-primary text-primary hover:bg-primary/5 px-6 py-3 rounded-lg font-medium transition-colors">
                View Brand Matches
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-card/50 rounded-lg border border-border/50">
          <h5 className="text-sm font-medium text-foreground mb-2">What happens next?</h5>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <span className="text-primary font-bold">1.</span>
              <span>We analyze your content themes and audience demographics</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary font-bold">2.</span>
              <span>Match you with relevant brands in your niche</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary font-bold">3.</span>
              <span>Negotiate the best partnership deals for you</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
