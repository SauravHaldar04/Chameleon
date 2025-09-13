import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ClipboardDocumentIcon, PlayIcon } from '@heroicons/react/24/outline';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { creatives } from '../data/creatives';

export const CreativeDetail: React.FC = () => {
  const { creativeId } = useParams<{ creativeId: string }>();
  const navigate = useNavigate();
  const [selectedContext, setSelectedContext] = useState(0);
  
  const creative = creatives.find(c => c.id === creativeId);
  
  if (!creative) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">Creative not found</h2>
        <Button onClick={() => navigate('/creatives')} className="mt-4">
          Back to Library
        </Button>
      </div>
    );
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'default' as const;
      case 'Pending':
        return 'secondary' as const;
      case 'Rejected':
        return 'destructive' as const;
      default:
        return 'outline' as const;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/creatives')}
            className="p-2"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">{creative.name}</h1>
            <p className="text-secondary-600 dark:text-secondary-400">{creative.advertiser}</p>
          </div>
          <Badge variant={getStatusVariant(creative.status)}>
            Policy Check: {creative.status}
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="chameleon" className="w-full">
        <TabsList>
          <TabsTrigger value="chameleon">AI Creative Generation</TabsTrigger>
          <TabsTrigger value="accessibility">Alt Text & Captioning</TabsTrigger>
          <TabsTrigger value="original">Original Assets</TabsTrigger>
        </TabsList>

        {/* Tab 1: Chameleon Contextual Preview */}
        <TabsContent value="chameleon">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Context List */}
            <Card>
              <CardHeader>
                <CardTitle>Context Variations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {creative.contextualVariations.map((variation, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedContext(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedContext === index 
                        ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-200 dark:border-primary-800' 
                        : 'bg-secondary-50 dark:bg-secondary-800 hover:bg-secondary-100 dark:hover:bg-secondary-700 border-2 border-transparent'
                    }`}
                  >
                    <div className="font-medium text-secondary-900 dark:text-secondary-100">{variation.context}</div>
                    <div className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">AI-Generated Variation</div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Preview */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Preview: {creative.contextualVariations[selectedContext]?.context}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Image Preview */}
                    <div className="aspect-video rounded-lg mb-6 overflow-hidden bg-secondary-100 dark:bg-secondary-800 flex items-center justify-center">
                    {creative.contextualVariations[selectedContext]?.generatedImageUrl ? (
                      <img 
                      src={creative.contextualVariations[selectedContext].generatedImageUrl} 
                      alt={`AI-generated ad variation for ${creative.contextualVariations[selectedContext]?.context}`}
                      className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-4">🎨</div>
                        <div className="text-lg font-medium text-secondary-700 dark:text-secondary-300">
                        AI-Generated Variation
                        </div>
                        <div className="text-sm text-secondary-500 dark:text-secondary-400 mt-2">
                        {creative.contextualVariations[selectedContext]?.context}
                        </div>
                      </div>
                      </div>
                    )}
                    </div>

                  {/* Generated Copy */}
                  <div className="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-secondary-900 dark:text-secondary-100">AI-Generated Copy</h4>
                      <Badge variant="secondary">Generated</Badge>
                    </div>
                    <p className="text-secondary-700 dark:text-secondary-300 text-lg leading-relaxed">
                      "{creative.contextualVariations[selectedContext]?.generatedCopy}"
                    </p>
                  </div>

                  {/* Comparison with Original */}
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Original Copy</h4>
                    <p className="text-blue-700 dark:text-blue-300">"{creative.seedAd.copy}"</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: AdForAll Accessibility Report */}
        <TabsContent value="accessibility">
          <div className="space-y-6">
            {/* Alt Text */}
            <Card>
              <CardHeader>
                <CardTitle>Alt Text Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-secondary-900 dark:text-secondary-100">Generated Alt Text</h4>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(creative.accessibilityPackage.altText)}
                    >
                      <ClipboardDocumentIcon className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <p className="text-secondary-700 dark:text-secondary-300">{creative.accessibilityPackage.altText}</p>
                </div>
              </CardContent>
            </Card>

            {/* Audio Description */}
            {creative.seedAd.type === 'video' && creative.accessibilityPackage.audioDescriptionUrl && (
              <Card>
                <CardHeader>
                  <CardTitle>Audio Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      <Button variant="outline" size="sm">
                        <PlayIcon className="h-4 w-4 mr-2" />
                        Play Audio Description
                      </Button>
                      <span className="text-sm text-secondary-600 dark:text-secondary-400">
                        Generated audio description for visually impaired users
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Color Contrast Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Color Contrast Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-secondary-900 dark:text-secondary-100">Contrast Score</h4>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400">WCAG 2.1 AA Compliance</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                        {creative.accessibilityPackage.colorContrastReport.score}
                      </div>
                      <Badge 
                        variant={creative.accessibilityPackage.colorContrastReport.status === 'Pass' ? 'default' : 'destructive'}
                      >
                        {creative.accessibilityPackage.colorContrastReport.status}
                      </Badge>
                    </div>
                  </div>

                  {creative.accessibilityPackage.colorContrastReport.suggestions.length > 0 && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4">
                      <h5 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Accessibility Suggestions</h5>
                      <ul className="space-y-1">
                        {creative.accessibilityPackage.colorContrastReport.suggestions.map((suggestion, index) => (
                          <li key={index} className="text-sm text-amber-700 dark:text-amber-400">
                            • {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-4 border-t border-border-light dark:border-border-dark">
                    <Button variant="outline" size="sm">
                      View Full Accessibility Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 3: Original Assets & Guidelines */}
        <TabsContent value="original">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Original Asset */}
            <Card>
              <CardHeader>
                <CardTitle>Original Seed Ad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="aspect-video bg-secondary-100 dark:bg-secondary-800 rounded-lg overflow-hidden flex items-center justify-center">
                    {creative.seedAd.url ? (
                      <img 
                        src={creative.seedAd.url} 
                        alt={`Original ${creative.seedAd.type} for ${creative.name}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="text-3xl mb-2">
                            {creative.seedAd.type === 'video' ? '🎬' : '🖼️'}
                          </div>
                          <div className="text-sm text-secondary-600 dark:text-secondary-400">
                            Original {creative.seedAd.type}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-4">
                    <h4 className="font-medium text-secondary-900 dark:text-secondary-100 mb-2">Original Copy</h4>
                    <p className="text-secondary-700 dark:text-secondary-300">"{creative.seedAd.copy}"</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Brand Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Brand Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Logo */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Brand Logo</h4>
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🏢</span>
                    </div>
                  </div>

                  {/* Color Palette */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Color Palette</h4>
                    <div className="flex space-x-2">
                      {creative.brandGuidelines.colorPalette.map((color, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div 
                            className="w-12 h-12 rounded-lg border border-gray-200 dark:border-gray-700"
                            style={{ backgroundColor: color }}
                          ></div>
                          <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fonts */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Approved Fonts</h4>
                    <div className="space-y-1">
                      {creative.brandGuidelines.approvedFonts.map((font, index) => (
                        <div key={index} className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded px-3 py-2">
                          {font}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
