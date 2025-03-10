
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui-custom/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Check, ChevronDown, Clock, Edit3Icon, Sparkles } from 'lucide-react';
import { ContentRequest, ContentTone, ContentType, GeneratedContent } from '@/types';
import { openaiService } from '@/services/openai';
import { useToast } from '@/components/ui/use-toast';

const CreateContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form state
  const [title, setTitle] = useState('');
  const [contentType, setContentType] = useState<ContentType>('tweet');
  const [contentTone, setContentTone] = useState<ContentTone>('professional');
  const [keywords, setKeywords] = useState('');
  const [audience, setAudience] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  
  // Process state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  
  const handleGenerate = async () => {
    if (!title || !contentType || !contentTone || !keywords) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const request: ContentRequest = {
        title,
        type: contentType,
        tone: contentTone,
        keywords: keywords.split(',').map(k => k.trim()),
        targetAudience: audience,
        additionalInfo,
      };
      
      const content = await openaiService.generateContent(request);
      setGeneratedContent(content);
      setEditedContent(content.content);
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Generation failed",
        description: "There was an error generating your content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleApprove = () => {
    // In a real app, this would call an API to approve the content
    toast({
      title: "Content approved",
      description: "Your content has been approved and will be scheduled for posting.",
    });
    
    // Navigate back to dashboard
    navigate('/dashboard');
  };
  
  const handleRegenerate = async () => {
    setIsGenerating(true);
    
    try {
      // In a real app, this would call the API with the same request parameters
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock a slightly different content
      if (generatedContent) {
        const newContent = {...generatedContent};
        newContent.content = `${generatedContent.content} (Regenerated version)`;
        newContent.updatedAt = new Date();
        
        setGeneratedContent(newContent);
        setEditedContent(newContent.content);
      }
    } catch (error) {
      toast({
        title: "Regeneration failed",
        description: "There was an error regenerating your content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleSaveEdit = () => {
    if (generatedContent) {
      setGeneratedContent({
        ...generatedContent,
        content: editedContent,
        updatedAt: new Date()
      });
      setIsEditing(false);
      
      toast({
        title: "Changes saved",
        description: "Your edits have been saved.",
      });
    }
  };
  
  // Content type options
  const contentTypeOptions: {value: ContentType; label: string}[] = [
    { value: 'tweet', label: 'Tweet' },
    { value: 'meme', label: 'Meme' },
    { value: 'blog', label: 'Blog Post' },
    { value: 'article', label: 'Article' }
  ];
  
  // Content tone options
  const contentToneOptions: {value: ContentTone; label: string}[] = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'humorous', label: 'Humorous' },
    { value: 'inspirational', label: 'Inspirational' },
    { value: 'controversial', label: 'Controversial' },
    { value: 'educational', label: 'Educational' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Create Content</h1>
            <p className="text-muted-foreground mt-1">
              Generate AI-powered content for your social media platforms
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Content Request Form */}
            <div>
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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-input bg-background"
                      placeholder="E.g., AI Benefits for Content Creators"
                      disabled={isGenerating || generatedContent !== null}
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
                          value={contentType}
                          onChange={(e) => setContentType(e.target.value as ContentType)}
                          className="w-full appearance-none px-3 py-2 rounded-md border border-input bg-background pr-10"
                          disabled={isGenerating || generatedContent !== null}
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
                          value={contentTone}
                          onChange={(e) => setContentTone(e.target.value as ContentTone)}
                          className="w-full appearance-none px-3 py-2 rounded-md border border-input bg-background pr-10"
                          disabled={isGenerating || generatedContent !== null}
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
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-input bg-background"
                      placeholder="E.g., AI, content creation, automation (comma separated)"
                      disabled={isGenerating || generatedContent !== null}
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
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-input bg-background"
                      placeholder="E.g., content creators, marketers, tech enthusiasts"
                      disabled={isGenerating || generatedContent !== null}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="additionalInfo" className="block text-sm font-medium mb-1">
                      Additional Information
                    </label>
                    <textarea
                      id="additionalInfo"
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-input bg-background"
                      rows={3}
                      placeholder="Any specific information or requirements you'd like to include"
                      disabled={isGenerating || generatedContent !== null}
                    />
                  </div>
                </CardContent>
                
                <CardFooter className="justify-between">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/dashboard')}
                    disabled={isGenerating}
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    onClick={handleGenerate}
                    loading={isGenerating}
                    disabled={isGenerating || generatedContent !== null || !title || !contentType || !contentTone || !keywords}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Content
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Generated Content Preview */}
            <div>
              {generatedContent ? (
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Generated Content</CardTitle>
                      {!isEditing && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setIsEditing(true);
                          }}
                        >
                          <Edit3Icon className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      )}
                    </div>
                    <CardDescription>
                      Review and approve your generated content
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-1">
                    {isEditing ? (
                      <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="w-full h-full min-h-[200px] px-3 py-2 rounded-md border border-input bg-background"
                        rows={10}
                      />
                    ) : (
                      <div className="bg-muted/30 rounded-md p-4">
                        <p className="whitespace-pre-wrap">{generatedContent.content}</p>
                      </div>
                    )}
                    
                    <div className="mt-4 flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>
                        Generated {new Date(generatedContent.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex-wrap gap-2">
                    {isEditing ? (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsEditing(false);
                            setEditedContent(generatedContent.content);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSaveEdit}
                        >
                          Save Changes
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          onClick={handleRegenerate}
                          loading={isGenerating}
                          disabled={isGenerating}
                        >
                          Regenerate
                        </Button>
                        <Button
                          onClick={handleApprove}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Approve Content
                        </Button>
                      </>
                    )}
                  </CardFooter>
                </Card>
              ) : (
                <Card className="h-full flex flex-col items-center justify-center text-center p-6 bg-muted/20 border-dashed">
                  <div className="p-4 rounded-full bg-primary/10 mb-4">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Content Generated Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Fill out the form and click "Generate Content" to create AI-powered content
                  </p>
                  <div className="w-full max-w-xs bg-muted/30 rounded-md p-3 text-left text-sm space-y-2">
                    <p>✅ Specify content type and tone</p>
                    <p>✅ Include relevant keywords</p>
                    <p>✅ Define your target audience</p>
                    <p>✅ Provide any additional context</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateContent;
