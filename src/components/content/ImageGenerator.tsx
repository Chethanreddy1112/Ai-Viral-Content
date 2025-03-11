
import { Button } from '@/components/ui-custom/Button';
import { ImageIcon } from 'lucide-react';

interface ImageGeneratorProps {
  onGenerateImage: () => void;
  isGenerating: boolean;
}

const ImageGenerator = ({ onGenerateImage, isGenerating }: ImageGeneratorProps) => {
  if (isGenerating) {
    return (
      <div className="mt-4 p-4 border border-dashed rounded-md flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Generating image...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <Button
        variant="outline"
        onClick={onGenerateImage}
        className="w-full"
      >
        <ImageIcon className="h-4 w-4 mr-2" />
        Generate Image
      </Button>
    </div>
  );
};

export default ImageGenerator;
