
import { ContentRequest, ContentType, ContentTone, GeneratedContent } from '@/types';

// Simulating API calls for demonstration
export const openaiService = {
  // Generate content based on user request
  generateContent: async (request: ContentRequest): Promise<GeneratedContent> => {
    console.log('Generating content for request:', request);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create a prompt based on the request
    const prompt = createPromptFromRequest(request);
    
    // In a real app, this would call the OpenAI API
    // const response = await callOpenAI(prompt);
    
    // For demonstration, generate mock content based on the request
    const mockContent = generateMockContent(request);
    
    return {
      id: generateRandomId(),
      requestId: request.id || generateRandomId(),
      content: mockContent,
      status: 'generated',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  },
  
  // Generate content variations
  generateVariations: async (content: string, count: number = 3): Promise<string[]> => {
    console.log('Generating variations for content:', content);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, this would call the OpenAI API
    // const response = await callOpenAIForVariations(content, count);
    
    // For demonstration, generate variations
    const variations = Array.from({ length: count }, (_, i) => {
      return `${content} (Variation ${i + 1})`;
    });
    
    return variations;
  },
  
  // Analyze content for engagement prediction
  analyzeContent: async (content: string): Promise<{ score: number; feedback: string }> => {
    console.log('Analyzing content for engagement:', content);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demonstration, generate a random score and feedback
    const score = Math.floor(Math.random() * 100);
    let feedback = '';
    
    if (score > 80) {
      feedback = 'This content has high viral potential. Great word choice and engagement hooks.';
    } else if (score > 60) {
      feedback = 'Good content with moderate engagement potential. Consider adding more emotion or controversy.';
    } else {
      feedback = 'This content might not perform well. Try adding more engaging elements, questions, or stronger hooks.';
    }
    
    return { score, feedback };
  }
};

// Helper functions
const createPromptFromRequest = (request: ContentRequest): string => {
  const { type, keywords, tone, targetAudience, additionalInfo } = request;
  
  let prompt = `Generate a ${tone} ${type}`;
  
  if (keywords && keywords.length > 0) {
    prompt += ` about ${keywords.join(', ')}`;
  }
  
  if (targetAudience) {
    prompt += ` targeting ${targetAudience}`;
  }
  
  if (additionalInfo) {
    prompt += `. Additional requirements: ${additionalInfo}`;
  }
  
  return prompt;
};

const generateMockContent = (request: ContentRequest): string => {
  const { type, keywords, tone } = request;
  
  // Realistic mock content based on content type
  switch (type) {
    case 'tweet':
      return generateMockTweet(keywords, tone);
    case 'blog':
      return generateMockBlogPost(keywords, tone);
    case 'meme':
      return generateMockMemeDescription(keywords, tone);
    case 'article':
      return generateMockArticle(keywords, tone);
    default:
      return 'Generated content would appear here.';
  }
};

const generateMockTweet = (keywords: string[], tone: ContentTone): string => {
  const tweetTemplates = {
    professional: [
      "Our latest analysis on #KEYWORD1 reveals surprising insights for #KEYWORD2 professionals. Learn how to leverage these findings for better results.",
      "Breaking: New data shows #KEYWORD1 is transforming the #KEYWORD2 landscape. Here's what industry leaders need to know.",
      "Just published: 5 evidence-based strategies to optimize your #KEYWORD1 approach while maximizing #KEYWORD2 outcomes."
    ],
    casual: [
      "Just stumbled upon this amazing #KEYWORD1 hack and it's totally changing my #KEYWORD2 game! Anyone else tried this?",
      "Can't believe I didn't know about #KEYWORD1 before! Makes dealing with #KEYWORD2 so much easier. Life changing!",
      "That moment when #KEYWORD1 meets #KEYWORD2 and your mind is blown 🤯 Have you experienced this yet?"
    ],
    humorous: [
      "When they said #KEYWORD1 would solve my #KEYWORD2 problems, I didn't expect it to create 99 new ones! 😂 #TheStruggleIsReal",
      "My relationship with #KEYWORD1 is more complicated than my relationship status. #KEYWORD2 isn't helping either!",
      "Tried to use #KEYWORD1 to fix my #KEYWORD2 situation. Now I need therapy for both me AND my computer."
    ],
    inspirational: [
      "The journey through #KEYWORD1 teaches us that every #KEYWORD2 challenge is actually an opportunity in disguise. Keep pushing forward!",
      "Never let your #KEYWORD1 limitations define your #KEYWORD2 potential. You are capable of extraordinary things!",
      "Remember: Your #KEYWORD1 story might be the #KEYWORD2 inspiration someone else needs today. Share your truth boldly!"
    ],
    controversial: [
      "Hot take: Most people completely misunderstand #KEYWORD1 and are dangerously wrong about #KEYWORD2. Here's why...",
      "Unpopular opinion: #KEYWORD1 is overrated and #KEYWORD2 is being ignored for all the wrong reasons.",
      "Let's be honest: The conventional wisdom about #KEYWORD1 and #KEYWORD2 is not just wrong, it's harmful. Time for a reality check."
    ],
    educational: [
      "Did you know? #KEYWORD1 actually originated from early attempts to solve #KEYWORD2 problems in the 1980s. A fascinating evolution!",
      "The relationship between #KEYWORD1 and #KEYWORD2 explained: 🧵 1/5 It all begins with understanding the fundamental principles...",
      "Today's #KEYWORD1 lesson: How it intersects with #KEYWORD2 and why this knowledge is essential for modern applications."
    ]
  };

  // Select a random template for the given tone
  const templates = tweetTemplates[tone] || tweetTemplates.casual;
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  // Replace keywords in the template
  let result = template;
  keywords.forEach((keyword, index) => {
    result = result.replace(`KEYWORD${index + 1}`, keyword);
  });
  
  // Ensure all placeholder keywords are replaced even if not enough real keywords
  for (let i = keywords.length + 1; i <= 5; i++) {
    result = result.replace(`KEYWORD${i}`, keywords[0] || "topic");
  }
  
  return result;
};

const generateMockBlogPost = (keywords: string[], tone: ContentTone): string => {
  // Just return a short excerpt for the blog post preview
  const title = `${capitalizeFirstLetter(tone)} Guide to ${keywords[0] || 'Success'}: Mastering ${keywords[1] || 'Strategies'}`;
  
  const intro = `
# ${title}

In today's fast-paced world of ${keywords[0] || 'innovation'}, understanding how to leverage ${keywords[1] || 'strategies'} has become essential for success. This comprehensive guide will walk you through everything you need to know.

## Why ${keywords[0] || 'This Topic'} Matters

The landscape of ${keywords[0] || 'this field'} is constantly evolving. With recent developments in ${keywords[1] || 'related areas'}, professionals need to stay ahead of the curve to remain competitive...

[Continue reading for full article]
`;

  return intro;
};

const generateMockMemeDescription = (keywords: string[], tone: ContentTone): string => {
  return `[Image description: A meme about ${keywords[0] || 'topic'} and ${keywords[1] || 'another topic'} with a ${tone} tone. The image would show a humorous situation that people familiar with these topics would recognize and find entertaining.]`;
};

const generateMockArticle = (keywords: string[], tone: ContentTone): string => {
  // Similar to blog post but with a more formal structure
  const title = `${capitalizeFirstLetter(tone)} Analysis: The Intersection of ${keywords[0] || 'Innovation'} and ${keywords[1] || 'Technology'}`;
  
  return `
# ${title}

## Executive Summary
This article explores the critical relationship between ${keywords[0] || 'subject one'} and ${keywords[1] || 'subject two'}, providing key insights for stakeholders and decision-makers.

## Introduction
In recent years, ${keywords[0] || 'the primary topic'} has emerged as a dominant force in shaping how we approach ${keywords[1] || 'the secondary topic'}. This article examines the implications and opportunities presented by this evolving landscape.

## Key Findings
Our analysis reveals several important trends that organizations should consider when developing their strategies:

1. The growth rate of ${keywords[0] || 'the primary topic'} has exceeded projections by 37%
2. Implementation of ${keywords[1] || 'the secondary topic'} solutions has reduced operational costs for early adopters
3. Market leaders are increasingly investing in the intersection of these domains

[Continue reading for full article]
`;
};

const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const generateRandomId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};
