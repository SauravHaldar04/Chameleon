export interface WebsiteAnalysis {
  id: string;
  url: string;
  title: string;
  analyzedAt: string;
  status: 'analyzing' | 'completed' | 'failed';
  trends: TrendInsight[];
  contentAnalysis: ContentAnalysis;
  recommendations: Recommendation[];
  score: number; // Overall content score 0-100
}

export interface TrendInsight {
  id: string;
  trend: string;
  relevance: number; // 0-100
  category: 'technology' | 'lifestyle' | 'business' | 'entertainment' | 'health' | 'fashion' | 'gaming' | 'other';
  description: string;
  potentialReach: number;
  confidenceLevel: number; // 0-100
}

export interface ContentAnalysis {
  wordCount: number;
  readingTime: number; // in minutes
  sentiment: 'positive' | 'neutral' | 'negative';
  topics: string[];
  keyPhrases: string[];
  language: string;
  contentType: 'article' | 'blog' | 'news' | 'product' | 'landing' | 'other';
}

export interface Recommendation {
  id: string;
  type: 'content' | 'seo' | 'engagement' | 'monetization';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
}

class WebsiteAnalysisService {
  private analyses: Map<string, WebsiteAnalysis> = new Map();

  async analyzeWebsite(url: string): Promise<WebsiteAnalysis> {
    const analysisId = `analysis_${Date.now()}`;
    
    // Create initial analysis record
    const analysis: WebsiteAnalysis = {
      id: analysisId,
      url,
      title: 'Analyzing...',
      analyzedAt: new Date().toISOString(),
      status: 'analyzing',
      trends: [],
      contentAnalysis: {
        wordCount: 0,
        readingTime: 0,
        sentiment: 'neutral',
        topics: [],
        keyPhrases: [],
        language: 'en',
        contentType: 'article'
      },
      recommendations: [],
      score: 0
    };

    this.analyses.set(analysisId, analysis);

    // Simulate analysis process
    setTimeout(() => {
      this.completeAnalysis(analysisId, url);
    }, 3000); // 3 second delay to simulate processing

    return analysis;
  }

  private completeAnalysis(analysisId: string, url: string): void {
    const mockTrends = this.generateMockTrends(url);
    const mockContentAnalysis = this.generateMockContentAnalysis(url);
    const mockRecommendations = this.generateMockRecommendations(url);

    const analysis: WebsiteAnalysis = {
      id: analysisId,
      url,
      title: this.extractTitleFromUrl(url),
      analyzedAt: new Date().toISOString(),
      status: 'completed',
      trends: mockTrends,
      contentAnalysis: mockContentAnalysis,
      recommendations: mockRecommendations,
      score: this.calculateOverallScore(mockTrends, mockContentAnalysis)
    };

    this.analyses.set(analysisId, analysis);
  }

  private generateMockTrends(url: string): TrendInsight[] {
    const trends = [
      {
        id: '1',
        trend: 'AI-Powered Content Creation',
        relevance: 85,
        category: 'technology' as const,
        description: 'Growing trend in automated content generation and AI writing tools',
        potentialReach: 2500000,
        confidenceLevel: 78
      },
      {
        id: '2', 
        trend: 'Sustainable Living',
        relevance: 72,
        category: 'lifestyle' as const,
        description: 'Increasing interest in eco-friendly products and sustainable practices',
        potentialReach: 1800000,
        confidenceLevel: 81
      },
      {
        id: '3',
        trend: 'Remote Work Solutions',
        relevance: 68,
        category: 'business' as const,
        description: 'Tools and strategies for distributed teams and digital workspaces',
        potentialReach: 3200000,
        confidenceLevel: 75
      },
      {
        id: '4',
        trend: 'Health & Wellness Tech',
        relevance: 79,
        category: 'health' as const,
        description: 'Wearable devices, fitness apps, and digital health monitoring',
        potentialReach: 2100000,
        confidenceLevel: 83
      }
    ];

    // Randomize which trends to return based on URL
    const urlHash = url.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const selectedTrends = trends.filter((_, index) => (urlHash + index) % 3 !== 0);
    
    return selectedTrends.slice(0, 3); // Return top 3 trends
  }

  private generateMockContentAnalysis(url: string): ContentAnalysis {
    const contentTypes = ['article', 'blog', 'news', 'product', 'landing'] as const;
    const sentiments = ['positive', 'neutral', 'negative'] as const;
    const topics = [
      'Technology', 'Business', 'Marketing', 'Design', 'Innovation',
      'Productivity', 'Leadership', 'Strategy', 'Growth', 'Digital Transformation'
    ];

    const urlHash = url.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    return {
      wordCount: 800 + (urlHash % 1200),
      readingTime: Math.ceil((800 + (urlHash % 1200)) / 200),
      sentiment: sentiments[urlHash % 3],
      topics: topics.slice(0, 3 + (urlHash % 3)),
      keyPhrases: [
        'digital marketing',
        'content strategy', 
        'user engagement',
        'brand awareness',
        'market trends'
      ].slice(0, 3 + (urlHash % 3)),
      language: 'en',
      contentType: contentTypes[urlHash % contentTypes.length]
    };
  }

  private generateMockRecommendations(url: string): Recommendation[] {
    return [
      {
        id: '1',
        type: 'content',
        title: 'Optimize Content Structure',
        description: 'Add more subheadings and bullet points to improve readability and engagement',
        impact: 'medium',
        effort: 'low'
      },
      {
        id: '2', 
        type: 'seo',
        title: 'Improve Meta Descriptions',
        description: 'Write compelling meta descriptions to increase click-through rates from search results',
        impact: 'high',
        effort: 'low'
      },
      {
        id: '3',
        type: 'engagement',
        title: 'Add Interactive Elements',
        description: 'Include polls, quizzes, or interactive content to boost user engagement',
        impact: 'high',
        effort: 'medium'
      },
      {
        id: '4',
        type: 'monetization',
        title: 'Optimize Ad Placement',
        description: 'Strategic ad positioning could increase revenue by 25-40%',
        impact: 'high',
        effort: 'medium'
      }
    ];
  }

  private extractTitleFromUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname.replace('www.', '');
      return `Analysis for ${domain}${urlObj.pathname !== '/' ? urlObj.pathname : ''}`;
    } catch {
      return `Analysis for ${url}`;
    }
  }

  private calculateOverallScore(trends: TrendInsight[], content: ContentAnalysis): number {
    const avgTrendRelevance = trends.reduce((sum, trend) => sum + trend.relevance, 0) / trends.length;
    const contentScore = Math.min(100, (content.wordCount / 10) + (content.topics.length * 10));
    const sentimentBonus = content.sentiment === 'positive' ? 10 : content.sentiment === 'neutral' ? 5 : 0;
    
    return Math.round((avgTrendRelevance * 0.4 + contentScore * 0.4 + sentimentBonus * 0.2));
  }

  getAnalysis(id: string): WebsiteAnalysis | undefined {
    return this.analyses.get(id);
  }

  getAllAnalyses(): WebsiteAnalysis[] {
    return Array.from(this.analyses.values()).sort(
      (a, b) => new Date(b.analyzedAt).getTime() - new Date(a.analyzedAt).getTime()
    );
  }

  deleteAnalysis(id: string): boolean {
    return this.analyses.delete(id);
  }
}

export const websiteAnalysisService = new WebsiteAnalysisService();
