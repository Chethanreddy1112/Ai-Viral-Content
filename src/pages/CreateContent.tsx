
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/hooks/use-toast';
import ContentRequestForm, { ContentFormData, ContentType, ContentTone } from '@/components/content/ContentRequestForm';
import ContentPreview, { GeneratedContent } from '@/components/content/ContentPreview';
import { ContentCreationService } from '@/services/ContentCreationService';

const CreateContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState<ContentFormData>({
    title: '',
    contentType: 'tweet',
    contentTone: 'professional',
    keywords: '',
    audience: '',
    additionalInfo: ''
  });
  
  // Process state
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  
  const handleFormChange = (field: keyof ContentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleGenerate = async () => {
    if (!formData.title || !formData.contentType || !formData.contentTone || !formData.keywords) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const content = await ContentCreationService.generateContent(
        formData.title,
        formData.contentType as ContentType,
        formData.contentTone as ContentTone,
        formData.keywords,
        formData.audience,
        formData.additionalInfo
      );
      
      setGeneratedContent(content);
      
      toast({
        title: "Content generated",
        description: "Your content has been successfully created!",
      });
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

  const handleGenerateImage = async () => {
    if (!generatedContent) return;
    
    setIsGeneratingImage(true);
    
    try {
      const imageUrl = await ContentCreationService.generateImage(
        formData.title,
        formData.keywords
      );
      
      setGeneratedContent({
        ...generatedContent,
        imageUrl,
        updatedAt: new Date()
      });
      
      toast({
        title: "Image generated",
        description: "Your image has been successfully created!",
      });
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: "Image generation failed",
        description: "There was an error generating your image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingImage(false);
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
      const content = await ContentCreationService.generateContent(
        formData.title,
        formData.contentType as ContentType,
        formData.contentTone as ContentTone,
        formData.keywords,
        formData.audience,
        formData.additionalInfo + " Make this version different from previous attempts."
      );
      
      if (generatedContent) {
        // Preserve the existing imageUrl if there is one
        content.imageUrl = generatedContent.imageUrl;
      }
      
      setGeneratedContent(content);
      
      toast({
        title: "Content regenerated",
        description: "Your content has been regenerated with new variations.",
      });
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
              <ContentRequestForm 
                formData={formData}
                onChange={handleFormChange}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
                isDisabled={generatedContent !== null}
              />
            </div>
            
            {/* Generated Content Preview */}
            <div>
              <ContentPreview 
                content={generatedContent}
                title={formData.title}
                onRegenerate={handleRegenerate}
                onApprove={handleApprove}
                onGenerateImage={handleGenerateImage}
                isGenerating={isGenerating}
                isGeneratingImage={isGeneratingImage}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateContent;
