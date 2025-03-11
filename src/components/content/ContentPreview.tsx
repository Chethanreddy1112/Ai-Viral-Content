
import { useState } from 'react';
import { Button } from '@/components/ui-custom/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import { Check, Edit3Icon, Clock, Sparkles } from 'lucide-react';
import ImageGenerator from './ImageGenerator';

export interface GeneratedContent {
  id: string;
  content: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ContentPreviewProps {
  content: GeneratedContent | null;
  title: string;
  onRegenerate: () => void;
  onApprove: () => void;
  onGenerateImage: () => void;
  isGenerating: boolean;
  isGeneratingImage: boolean;
}

const ContentPreview = ({
  content,
  title,
  onRegenerate,
  onApprove,
  onGenerateImage,
  isGenerating,
  isGeneratingImage
}: ContentPreviewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content?.content || '');

  const handleSaveEdit = () => {
    if (content) {
      // We update the content through its parent component
      const updatedContent = {
        ...content,
        content: editedContent,
        updatedAt: new Date()
      };
      
      // Pass back the updated content to the parent
      onApprove();
      setIsEditing(false);
    }
  };

  if (!content) {
    return (
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
    );
  }

  return (
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
                setEditedContent(content.content);
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
            <p className="whitespace-pre-wrap">{content.content}</p>
            
            {content.imageUrl && (
              <div className="mt-4">
                <img 
                  src={content.imageUrl} 
                  alt={title}
                  className="rounded-md w-full object-cover max-h-[300px]"
                />
              </div>
            )}
            
            {!content.imageUrl && !isGeneratingImage && (
              <ImageGenerator 
                onGenerateImage={onGenerateImage}
                isGenerating={isGeneratingImage}
              />
            )}
            
            {isGeneratingImage && (
              <ImageGenerator 
                onGenerateImage={onGenerateImage}
                isGenerating={isGeneratingImage}
              />
            )}
          </div>
        )}
        
        <div className="mt-4 flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          <span>
            Generated {new Date(content.createdAt).toLocaleString()}
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
                setEditedContent(content.content);
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
              onClick={onRegenerate}
              loading={isGenerating}
              disabled={isGenerating}
            >
              Regenerate
            </Button>
            <Button
              onClick={onApprove}
            >
              <Check className="h-4 w-4 mr-2" />
              Approve Content
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default ContentPreview;
