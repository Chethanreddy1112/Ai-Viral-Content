
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui-custom/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import { Sparkles, ChevronDown } from 'lucide-react';

// Define types
export type ContentType = 'tweet' | 'meme' | 'blog' | 'article';
export type ContentTone = 'professional' | 'casual' | 'humorous' | 'inspirational' | 'controversial' | 'educational';

export interface ContentFormData {
  title: string;
  contentType: ContentType;
  contentTone: ContentTone;
  keywords: string;
  audience: string;
  additionalInfo: string;
}

interface ContentRequestFormProps {
  formData: ContentFormData;
  onChange: (field: keyof ContentFormData, value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  isDisabled: boolean;
}

const ContentRequestForm = ({
  formData,
  onChange,
  onGenerate,
  isGenerating,
  isDisabled
}: ContentRequestFormProps) => {
  // Content type options
  const contentTypeOptions: { value: ContentType; label: string }[] = [
    { value: 'tweet', label: 'Tweet' },
    { value: 'meme', label: 'Meme' },
    { value: 'blog', label: 'Blog Post' },
    { value: 'article', label: 'Article' }
  ];
  
  // Content tone options
  const contentToneOptions: { value: ContentTone; label: string }[] = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'humorous', label: 'Humorous' },
    { value: 'inspirational', label: 'Inspirational' },
    { value: 'controversial', label: 'Controversial' },
    { value: 'educational', label: 'Educational' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Request</CardTitle>
        <CardDescription>
          Fill out the details to generate your content
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => onChange('title', e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-input bg-background"
            placeholder="E.g., AI Benefits for Content Creators"
            disabled={isDisabled}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contentType" className="block text-sm font-medium mb-1">
              Content Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="contentType"
                value={formData.contentType}
                onChange={(e) => onChange('contentType', e.target.value as ContentType)}
                className="w-full appearance-none px-3 py-2 rounded-md border border-input bg-background pr-10"
                disabled={isDisabled}
              >
                {contentTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          
          <div>
            <label htmlFor="contentTone" className="block text-sm font-medium mb-1">
              Tone <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="contentTone"
                value={formData.contentTone}
                onChange={(e) => onChange('contentTone', e.target.value as ContentTone)}
                className="w-full appearance-none px-3 py-2 rounded-md border border-input bg-background pr-10"
                disabled={isDisabled}
              >
                {contentToneOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="keywords" className="block text-sm font-medium mb-1">
            Keywords <span className="text-red-500">*</span>
          </label>
          <input
            id="keywords"
            type="text"
            value={formData.keywords}
            onChange={(e) => onChange('keywords', e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-input bg-background"
            placeholder="E.g., AI, content creation, automation (comma separated)"
            disabled={isDisabled}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Separate keywords with commas
          </p>
        </div>
        
        <div>
          <label htmlFor="audience" className="block text-sm font-medium mb-1">
            Target Audience
          </label>
          <input
            id="audience"
            type="text"
            value={formData.audience}
            onChange={(e) => onChange('audience', e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-input bg-background"
            placeholder="E.g., content creators, marketers, tech enthusiasts"
            disabled={isDisabled}
          />
        </div>
        
        <div>
          <label htmlFor="additionalInfo" className="block text-sm font-medium mb-1">
            Additional Information
          </label>
          <textarea
            id="additionalInfo"
            value={formData.additionalInfo}
            onChange={(e) => onChange('additionalInfo', e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-input bg-background"
            rows={3}
            placeholder="Any specific information or requirements you'd like to include"
            disabled={isDisabled}
          />
        </div>
      </CardContent>
      
      <CardFooter className="justify-between">
        <Link to="/dashboard">
          <Button
            variant="outline"
            disabled={isGenerating}
          >
            Cancel
          </Button>
        </Link>
        
        <Button
          onClick={onGenerate}
          loading={isGenerating}
          disabled={isGenerating || isDisabled || !formData.title || !formData.contentType || !formData.contentTone || !formData.keywords}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Generate Content
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContentRequestForm;
