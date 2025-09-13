import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { PlusIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { creatives } from '../data/creatives';

export const CreativeLibrary: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCreativeIndex, setSelectedCreativeIndex] = useState(0);
  const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(0);

  const selectedCreative = creatives[selectedCreativeIndex];

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

  const nextCreative = () => {
    if (selectedCreativeIndex !== null) {
      setSelectedCreativeIndex((prev) => prev !== null ? (prev + 1) % creatives.length : 0);
    }
    setSelectedPreviewIndex(0);
  };

  const prevCreative = () => {
    if (selectedCreativeIndex !== null) {
      setSelectedCreativeIndex((prev) => prev !== null ? (prev - 1 + creatives.length) % creatives.length : 0);
    }
    setSelectedPreviewIndex(0);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center animate-slide-up">
        <div>
          <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
            Creative Library 🎨
          </h2>
          <p className="text-secondary-600 dark:text-secondary-400">
            Browse and manage your ad creatives and contextual variations
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            onClick={() => navigate('/app/creatives/upload')}
            className="flex items-center shadow-lg"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Upload New Creative
          </Button>
        </div>
      </div>

      {/* Creative Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
        {creatives.map((creative, index) => (
          <Card 
            key={creative.id} 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedCreativeIndex === index 
                ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                : ''
            }`}
            onClick={() => setSelectedCreativeIndex(index)}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-secondary-900 dark:text-secondary-100">
                    {creative.name}
                  </CardTitle>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    {creative.advertiser}
                  </p>
                </div>
                <Badge 
                  variant={creative.status === 'Approved' ? 'default' : 
                          creative.status === 'Pending' ? 'secondary' : 'destructive'}
                >
                  {creative.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-4">
                <img
                  src={creative.seedAd.url}
                  alt={creative.accessibilityPackage.altText}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-sm text-secondary-600 dark:text-secondary-400 line-clamp-2 mb-3">
                "{creative.seedAd.copy}"
              </p>
              <div className="flex justify-between items-center text-xs text-secondary-500 dark:text-secondary-400">
                <span>{creative.contextualVariations.length} AI variations</span>
                <span>A11y: {creative.accessibilityPackage.colorContrastReport.score}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed View Section */}
      {selectedCreativeIndex !== null && (
        <div className="border-t pt-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
              Detailed View
            </h3>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={prevCreative}
                disabled={creatives.length <= 1}
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <span className="text-sm text-secondary-600 dark:text-secondary-400">
                {selectedCreativeIndex !== null ? selectedCreativeIndex + 1 : 0} of {creatives.length}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={nextCreative}
                disabled={creatives.length <= 1}
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {selectedCreative && (
            <div className="space-y-8">
          {/* Creative Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
                    {selectedCreative.name}
                  </h3>
                  <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-4">
                    {selectedCreative.advertiser}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={getStatusVariant(selectedCreative.status)}>
                    {selectedCreative.status}
                  </Badge>
                  <Button 
                    variant="outline"
                    onClick={() => navigate(`/creatives/${selectedCreative.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Seed Image */}
          <Card>
            <CardHeader>
              <CardTitle>Original Seed Advertisement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Large Image Display */}
                <div className="lg:col-span-2">
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden flex items-center justify-center shadow-lg">
                    {selectedCreative.seedAd.url ? (
                      <img 
                        src={selectedCreative.seedAd.url} 
                        alt={selectedCreative.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="text-6xl mb-4">
                          {selectedCreative.seedAd.type === 'video' ? '🎬' : '🖼️'}
                        </div>
                        <div className="text-xl font-medium text-secondary-600 dark:text-secondary-400">
                          Original {selectedCreative.seedAd.type}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Seed Info */}
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                    <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                      Original Copy
                    </h4>
                    <p className="text-secondary-700 dark:text-secondary-300 text-lg leading-relaxed">
                      "{selectedCreative.seedAd.copy}"
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                    <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                      Brand Colors
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCreative.brandGuidelines.colorPalette.map((color, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div 
                            className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600"
                            style={{ backgroundColor: color }}
                          ></div>
                          <span className="text-xs text-secondary-600 dark:text-secondary-400 mt-1">
                            {color}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      AI Variations
                    </h4>
                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                      {selectedCreative.contextualVariations.length} contextual variations generated
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contextual Variations Preview */}
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Contextual Variations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {selectedCreative.contextualVariations.map((variation, index) => (
                  <div 
                    key={index}
                    className={`cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                      selectedPreviewIndex === index 
                        ? 'border-primary-500 shadow-lg' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => setSelectedPreviewIndex(index)}
                  >
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-t-lg overflow-hidden flex items-center justify-center">
                      {variation.generatedImageUrl ? (
                        <img 
                          src={variation.generatedImageUrl} 
                          alt={`AI variation for ${variation.context}`}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <div className="text-center">
                          <div className="text-2xl mb-2">🎨</div>
                          <div className="text-xs text-secondary-500 dark:text-secondary-400">
                            AI Generated
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h5 className="font-medium text-secondary-900 dark:text-secondary-100 text-sm mb-2">
                        {variation.context}
                      </h5>
                      <p className="text-xs text-secondary-600 dark:text-secondary-400 line-clamp-2">
                        "{variation.generatedCopy}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Expanded Preview Section */}
          {selectedCreative.contextualVariations[selectedPreviewIndex] && (
            <Card>
              <CardHeader>
                <CardTitle>
                  Selected Variation: {selectedCreative.contextualVariations[selectedPreviewIndex].context}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Large Preview */}
                  <div>
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center shadow-md">
                      {selectedCreative.contextualVariations[selectedPreviewIndex].generatedImageUrl ? (
                        <img 
                          src={selectedCreative.contextualVariations[selectedPreviewIndex].generatedImageUrl} 
                          alt={`AI variation for ${selectedCreative.contextualVariations[selectedPreviewIndex].context}`}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <div className="text-center">
                          <div className="text-4xl mb-4">🎨</div>
                          <div className="text-lg font-medium text-secondary-600 dark:text-secondary-400">
                            AI-Generated Variation
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description and Details */}
                  <div className="space-y-6">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                      <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">
                        AI-Generated Copy
                      </h4>
                      <p className="text-green-800 dark:text-green-200 text-lg leading-relaxed">
                        "{selectedCreative.contextualVariations[selectedPreviewIndex].generatedCopy}"
                      </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                      <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                        Context Information
                      </h4>
                      <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                        This variation is optimized for: <strong>{selectedCreative.contextualVariations[selectedPreviewIndex].context}</strong>
                      </p>
                      <div className="text-sm text-secondary-600 dark:text-secondary-400">
                        <p>✨ AI-powered contextual adaptation</p>
                        <p>🎯 Audience-specific messaging</p>
                        <p>🔄 Automatically generated from seed content</p>
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                        Comparison with Original
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Original:</span>
                          <p className="text-blue-700 dark:text-blue-300 text-sm">
                            "{selectedCreative.seedAd.copy}"
                          </p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Adapted:</span>
                          <p className="text-blue-700 dark:text-blue-300 text-sm">
                            "{selectedCreative.contextualVariations[selectedPreviewIndex].generatedCopy}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Accessibility Information */}
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                    <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                      Alt Text Description
                    </h4>
                    <p className="text-secondary-700 dark:text-secondary-300">
                      {selectedCreative.accessibilityPackage.altText}
                    </p>
                  </div>

                  {selectedCreative.seedAd.type === 'video' && selectedCreative.accessibilityPackage.audioDescriptionUrl && (
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                      <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-3">
                        Audio Description
                      </h4>
                      <p className="text-purple-700 dark:text-purple-300 text-sm mb-3">
                        Available for visually impaired users
                      </p>
                      <Button variant="outline" size="sm">
                        Play Audio Description
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-secondary-900 dark:text-secondary-100">
                        Color Contrast Score
                      </h4>
                      <Badge 
                        variant={selectedCreative.accessibilityPackage.colorContrastReport.status === 'Pass' ? 'default' : 'destructive'}
                      >
                        {selectedCreative.accessibilityPackage.colorContrastReport.status}
                      </Badge>
                    </div>
                    <div className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
                      {selectedCreative.accessibilityPackage.colorContrastReport.score}
                    </div>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      WCAG 2.1 AA Compliance Score
                    </p>
                  </div>

                  {selectedCreative.accessibilityPackage.colorContrastReport.suggestions.length > 0 && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6">
                      <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-3">
                        Accessibility Suggestions
                      </h4>
                      <ul className="space-y-2">
                        {selectedCreative.accessibilityPackage.colorContrastReport.suggestions.map((suggestion, index) => (
                          <li key={index} className="text-amber-800 dark:text-amber-200 text-sm">
                            • {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
        </div>
      )}

      {/* No Selection State */}
      {selectedCreativeIndex === null && (
        <div className="text-center py-12">
          <p className="text-secondary-500 dark:text-secondary-400 text-lg">
            Select a creative above to view detailed information and variations
          </p>
        </div>
      )}

      {/* Empty State */}
      {creatives.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="text-8xl mb-6 animate-bounce">🎨</div>
          <h3 className="text-xl font-medium text-secondary-900 dark:text-secondary-100 mb-3">
            No creatives yet
          </h3>
          <p className="text-secondary-600 dark:text-secondary-400 mb-6 max-w-md mx-auto">
            Start by uploading your first creative asset and let our AI generate contextual variations
          </p>
          <Button onClick={() => alert('Upload creative functionality')} size="lg">
            <PlusIcon className="h-5 w-5 mr-2" />
            Upload Your First Creative
          </Button>
        </div>
      )}
    </div>
  );
};
