
// Content Types
export type ContentType = 'tweet' | 'meme' | 'blog' | 'article';

export type ContentTone = 
  | 'professional' 
  | 'casual' 
  | 'humorous' 
  | 'inspirational'
  | 'controversial'
  | 'educational';

export interface ContentRequest {
  id?: string;
  title: string;
  type: ContentType;
  keywords: string[];
  tone: ContentTone;
  targetAudience?: string;
  additionalInfo?: string;
  createdAt?: Date;
  userId?: string;
}

export interface GeneratedContent {
  id: string;
  requestId: string;
  content: string;
  imageUrl?: string;
  status: 'pending' | 'generated' | 'approved' | 'posted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
  postingDate?: Date;
  engagement?: ContentEngagement;
}

export interface ContentEngagement {
  id: string;
  contentId: string;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  totalEngagement: number;
  platform: 'twitter' | 'telegram' | 'discord' | 'all';
  lastUpdated: Date;
}

// User Related Types
export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  createdAt: Date;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  preferredContentTypes: ContentType[];
  preferredTones: ContentTone[];
  interests: string[];
  autoPost: boolean;
  notificationSettings: {
    email: boolean;
    push: boolean;
    contentGenerated: boolean;
    highEngagement: boolean;
  };
}

// Analytics Types
export interface AnalyticsData {
  period: 'day' | 'week' | 'month' | 'year';
  contentPerformance: {
    type: ContentType;
    averageEngagement: number;
    totalPosts: number;
    bestPerforming: GeneratedContent;
  }[];
  totalEngagement: number;
  engagementTrend: {
    date: Date;
    value: number;
  }[];
  topKeywords: {
    keyword: string;
    count: number;
    averageEngagement: number;
  }[];
}

// Theme and UI Types
export interface ThemeConfig {
  colorMode: 'light' | 'dark' | 'system';
  animationsEnabled: boolean;
  reducedMotion: boolean;
}
