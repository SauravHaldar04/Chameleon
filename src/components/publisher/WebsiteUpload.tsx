import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { LinkIcon, GlobeAltIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { websiteAnalysisService, WebsiteAnalysis } from '../../services/websiteAnalysis';

const urlSchema = z.object({
  url: z.string().url('Please enter a valid URL'),
  description: z.string().optional()
});

type UrlFormData = z.infer<typeof urlSchema>;

interface WebsiteUploadProps {
  onAnalysisStart: (analysis: WebsiteAnalysis) => void;
}

export const WebsiteUpload: React.FC<WebsiteUploadProps> = ({ onAnalysisStart }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UrlFormData>({
    resolver: zodResolver(urlSchema)
  });

  const onSubmit = async (data: UrlFormData) => {
    setError(null);
    setIsAnalyzing(true);

    try {
      const analysis = await websiteAnalysisService.analyzeWebsite(data.url);
      onAnalysisStart(analysis);
      reset();
    } catch (error) {
      console.error('Analysis error:', error);
      setError('Failed to start analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <SparklesIcon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Website Analysis</h2>
          <p className="text-sm text-muted-foreground">
            Get AI-powered insights and trend analysis for your content
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-foreground mb-2">
            Website or Article URL
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              id="url"
              type="url"
              placeholder="https://your-website.com/article"
              className={`pl-10 ${errors.url ? 'border-destructive' : ''}`}
              {...register('url')}
              disabled={isAnalyzing}
            />
          </div>
          {errors.url && (
            <p className="mt-1 text-sm text-destructive">{errors.url.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
            Additional Context (Optional)
          </label>
          <Textarea
            id="description"
            placeholder="Briefly describe your content focus or target audience..."
            rows={3}
            className={errors.description ? 'border-destructive' : ''}
            {...register('description')}
            disabled={isAnalyzing}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-destructive">{errors.description.message}</p>
          )}
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={isAnalyzing}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          {isAnalyzing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Analyzing Content...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <GlobeAltIcon className="w-4 h-4" />
              Start Analysis
            </div>
          )}
        </Button>
      </form>

      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
        <h3 className="text-sm font-medium text-primary mb-2">What we analyze:</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Content trends and relevance</li>
          <li>• SEO optimization opportunities</li>
          <li>• Audience engagement potential</li>
          <li>• Monetization recommendations</li>
        </ul>
      </div>
    </div>
  );
};
