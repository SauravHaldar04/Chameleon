import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Slider } from '../components/ui/Slider';
import { Badge } from '../components/ui/Badge';
import { 
  CloudArrowUpIcon, 
  PhotoIcon, 
  SparklesIcon, 
  Cog6ToothIcon,
  CheckCircleIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

// Import local images
import cokeOriginal from '../images/coke-original.png';
import cokeGaming from '../images/coke-gaming.png';
import cokeMarathon from '../images/coke-marathon.png';
import cokeFamily from '../images/coke-family.png';
import cokeCooking from '../images/coke-cooking.png';

export const UploadCreative: React.FC = () => {
  const [temperature, setTemperature] = useState(0.7);
  const [prompt, setPrompt] = useState('');
  const [brandName, setBrandName] = useState('');
  const [selectedSiteTypes, setSelectedSiteTypes] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);
  const [uploadedAsset, setUploadedAsset] = useState<string | null>(null);
  const [generatedResults, setGeneratedResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Site types for generation
  const siteTypes = [
    { id: 'gaming', name: 'Gaming Websites', description: 'Gaming communities and esports platforms' },
    { id: 'fitness', name: 'Fitness & Sports', description: 'Health and fitness websites' },
    { id: 'family', name: 'Family & Lifestyle', description: 'Family-oriented content sites' },
    { id: 'cooking', name: 'Food & Cooking', description: 'Recipe and cooking websites' },
    { id: 'news', name: 'News & Media', description: 'News and media platforms' }
  ];

  // Mock generation results mapping
  const generationResults = {
    gaming: { image: cokeGaming, context: 'Gaming Community', description: 'Energizing gamers during intense sessions' },
    fitness: { image: cokeMarathon, context: 'Sports & Fitness', description: 'Refreshing athletes after workouts' },
    family: { image: cokeFamily, context: 'Family Time', description: 'Bringing families together over meals' },
    cooking: { image: cokeCooking, context: 'Cooking Shows', description: 'Perfect companion for cooking enthusiasts' },
    news: { image: cokeOriginal, context: 'News & Media', description: 'Classic refreshment for news readers' }
  };

  const generationSteps = [
    'Analyzing brand identity...',
    'Processing contextual requirements...',
    'Generating creative variations...',
    'Optimizing for accessibility...',
    'Finalizing outputs...'
  ];

  const handleLogoUpload = () => {
    // Simulate upload - use Coca Cola logo (you can replace with actual logo path)
    setUploadedLogo(cokeOriginal);
    setBrandName('Coca-Cola');
  };

  const handleAssetUpload = () => {
    // Simulate upload - use Coca Cola original asset
    setUploadedAsset(cokeOriginal);
  };

  const toggleSiteType = (siteId: string) => {
    setSelectedSiteTypes(prev => 
      prev.includes(siteId) 
        ? prev.filter(id => id !== siteId)
        : [...prev, siteId]
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationStep(0);
    setShowResults(false);
    
    // Simulate generation process with steps
    for (let i = 0; i < generationSteps.length; i++) {
      setGenerationStep(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    // Generate results based on selected site types
    const results = selectedSiteTypes.map(siteId => ({
      id: siteId,
      ...generationResults[siteId as keyof typeof generationResults]
    }));
    
    setGeneratedResults(results);
    setIsGenerating(false);
    setShowResults(true);
  };

  const presetPrompts = [
    "Create engaging social media ad variations for different demographics",
    "Generate contextual ads for different seasons and holidays", 
    "Adapt the creative for different platforms (Instagram, Facebook, TikTok)",
    "Create accessibility-friendly versions with alt text and captions"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Upload Creative</h1>
          <p className="text-muted-foreground mt-1">
            Upload your brand assets and generate AI-powered creative variations
          </p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          <SparklesIcon className="h-4 w-4 mr-1" />
          AI-Powered
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Upload & Brand Identity */}
        <div className="space-y-6">
          {/* Brand Identity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PhotoIcon className="h-5 w-5 mr-2" />
                Brand Identity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Brand Name
                </label>
                <Input
                  placeholder="Enter your brand name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Brand Logo
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6">
                  {uploadedLogo ? (
                    <div className="flex flex-col items-center space-y-2">
                      <img src={uploadedLogo} alt="Brand Logo" className="h-16 w-auto" />
                      <p className="text-sm text-muted-foreground">Logo uploaded successfully</p>
                      <Button variant="outline" size="sm" onClick={handleLogoUpload}>
                        Replace Logo
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-2">
                      <CloudArrowUpIcon className="h-12 w-12 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Upload your brand logo</p>
                      <Button onClick={handleLogoUpload}>
                        Upload Logo (Demo: Coca-Cola)
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Creative Asset
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6">
                  {uploadedAsset ? (
                    <div className="flex flex-col items-center space-y-2">
                      <img src={uploadedAsset} alt="Creative Asset" className="h-24 w-auto rounded" />
                      <p className="text-sm text-muted-foreground">Asset uploaded successfully</p>
                      <Button variant="outline" size="sm" onClick={handleAssetUpload}>
                        Replace Asset
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-2">
                      <PhotoIcon className="h-12 w-12 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Upload your creative asset</p>
                      <Button onClick={handleAssetUpload}>
                        Upload Asset (Demo: Coca-Cola Ad)
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Generation Settings */}
        <div className="space-y-6">
          {/* Prompt Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <SparklesIcon className="h-5 w-5 mr-2" />
                Generation Prompt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Describe what you want to generate
                </label>
                <Textarea
                  placeholder="Enter your generation prompt here..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Quick Prompts
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {presetPrompts.map((preset, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="justify-start text-left h-auto py-2 px-3"
                      onClick={() => setPrompt(preset)}
                    >
                      {preset}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Site Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GlobeAltIcon className="h-5 w-5 mr-2" />
                Target Website Types
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">
                  Select the types of websites where this ad will appear
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {siteTypes.map((siteType) => (
                    <div
                      key={siteType.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedSiteTypes.includes(siteType.id)
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }`}
                      onClick={() => toggleSiteType(siteType.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{siteType.name}</h4>
                          <p className="text-sm text-muted-foreground">{siteType.description}</p>
                        </div>
                        {selectedSiteTypes.includes(siteType.id) && (
                          <CheckCircleIcon className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generation Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cog6ToothIcon className="h-5 w-5 mr-2" />
                Generation Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-foreground">
                    Creativity Temperature
                  </label>
                  <span className="text-sm text-muted-foreground">{temperature}</span>
                </div>
                <Slider
                  value={temperature}
                  onValueChange={setTemperature}
                  min={0}
                  max={1}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Conservative</span>
                  <span>Creative</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Output Count
                  </label>
                  <Input type="number" defaultValue="4" min="1" max="10" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Aspect Ratio
                  </label>
                  <select className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>16:9 (Landscape)</option>
                    <option>9:16 (Portrait)</option>
                    <option>1:1 (Square)</option>
                    <option>4:5 (Instagram)</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generation Button */}
          <Card>
            <CardContent className="pt-6">
              {isGenerating && (
                <div className="mb-4 p-4 rounded-lg bg-muted/50 border">
                  <div className="flex items-center space-x-3">
                    <SparklesIcon className="h-5 w-5 animate-spin text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {generationSteps[generationStep]}
                      </p>
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${((generationStep + 1) / generationSteps.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handleGenerate}
                disabled={!uploadedLogo || !uploadedAsset || !prompt || selectedSiteTypes.length === 0 || isGenerating}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <SparklesIcon className="h-5 w-5 mr-2 animate-spin" />
                    Generating Creative Variations...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="h-5 w-5 mr-2" />
                    Generate AI Creative Variations
                  </>
                )}
              </Button>
              
              {(!uploadedLogo || !uploadedAsset || !prompt || selectedSiteTypes.length === 0) && (
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Please upload assets, enter a prompt, and select target website types
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Feature Highlights */}
      <Card>
        <CardHeader>
          <CardTitle>What You'll Get</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground">Contextual Variations</h4>
                <p className="text-sm text-muted-foreground">
                  AI-generated ads adapted for different contexts and audiences
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground">Alt Text Generation</h4>
                <p className="text-sm text-muted-foreground">
                  Automatic accessibility descriptions for visually impaired users
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground">Smart Captioning</h4>
                <p className="text-sm text-muted-foreground">
                  AI-powered captions and descriptions for better engagement
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generation Results */}
      {showResults && generatedResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <SparklesIcon className="h-5 w-5 mr-2 text-green-500" />
              Generated Creative Variations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedResults.map((result, index) => (
                <Card key={result.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted">
                    <img 
                      src={result.image} 
                      alt={`Generated ad for ${result.context}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{result.context}</Badge>
                      <span className="text-xs text-muted-foreground">#{index + 1}</span>
                    </div>
                    <p className="text-sm text-foreground">{result.description}</p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="flex-1">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
                <h4 className="font-medium text-green-800 dark:text-green-200">
                  Generation Complete!
                </h4>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                Successfully generated {generatedResults.length} creative variations with accessibility features included.
              </p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" className="text-green-700 border-green-300 hover:bg-green-100">
                  View All in Library
                </Button>
                <Button size="sm" variant="outline" className="text-green-700 border-green-300 hover:bg-green-100">
                  Generate More Variations
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
