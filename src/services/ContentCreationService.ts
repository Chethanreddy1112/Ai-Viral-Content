
import { openai } from './openai';
import { ContentType, ContentTone } from '@/components/content/ContentRequestForm';
import { GeneratedContent } from '@/components/content/ContentPreview';

export class ContentCreationService {
  static async generateContent(
    title: string,
    contentType: ContentType,
    contentTone: ContentTone,
    keywords: string,
    audience: string = '',
    additionalInfo: string = ''
  ): Promise<GeneratedContent> {
    const keywordsList = keywords.split(',').map(k => k.trim());
    
    const prompt = `Create a ${contentTone} ${contentType} about "${title}". 
      Keywords: ${keywordsList.join(', ')}. 
      ${audience ? `Target audience: ${audience}.` : ''}
      ${additionalInfo ? `Additional information: ${additionalInfo}` : ''}
      Keep it concise and engaging.`;

    const response = await openai.generateText(prompt);
    
    return {
      id: Math.random().toString(36).substring(2, 9),
      content: response,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  static async generateImage(title: string, keywords: string): Promise<string> {
    const prompt = `Create an image related to: ${title}. Keywords: ${keywords}`;
    return await openai.generateImage(prompt);
  }
}
