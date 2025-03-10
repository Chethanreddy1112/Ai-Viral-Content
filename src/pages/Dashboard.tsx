
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui-custom/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import GlassMorphism from '@/components/ui-custom/GlassMorphism';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BarChart2Icon, Edit3Icon, PlusIcon, RefreshCwIcon, TrendingUpIcon } from 'lucide-react';

interface Engagement {
  id: string;
  contentId: string;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  totalEngagement: number;
  platform: string;
  lastUpdated: Date;
}

interface GeneratedContent {
  id: string;
  requestId: string;
  content: string;
  status: 'posted' | 'approved' | 'generated';
  createdAt: Date;
  updatedAt: Date;
  engagement?: Engagement;
}

const Dashboard = () => {
  const [recentContent, setRecentContent] = useState<GeneratedContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock data
      setRecentContent([
        {
          id: '1',
          requestId: 'req1',
          content: 'Just discovered how AI is transforming content creation! The potential for creators is mind-blowing. #AIContent #CreatorEconomy',
          status: 'posted',
          createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
          updatedAt: new Date(Date.now() - 86400000 * 2),
          engagement: {
            id: 'eng1',
            contentId: '1',
            views: 1240,
            likes: 89,
            shares: 15,
            comments: 7,
            totalEngagement: 111,
            platform: 'twitter',
            lastUpdated: new Date()
          }
        },
        {
          id: '2',
          requestId: 'req2',
          content: "The future of blockchain technology isn't just about cryptocurrencies - it's about transforming how we think about digital ownership and value exchange. Excited to see where this goes in the next few years!",
          status: 'approved',
          createdAt: new Date(Date.now() - 86400000), // 1 day ago
          updatedAt: new Date(Date.now() - 86400000),
          engagement: {
            id: 'eng2',
            contentId: '2',
            views: 520,
            likes: 42,
            shares: 8,
            comments: 3,
            totalEngagement: 53,
            platform: 'twitter',
            lastUpdated: new Date()
          }
        },
        {
          id: '3',
          requestId: 'req3',
          content: '[Image description: A meme about programming and machine learning with a humorous tone. The image shows a developer looking confused while the AI confidently solves a complex problem.]',
          status: 'generated',
          createdAt: new Date(Date.now() - 3600000 * 5), // 5 hours ago
          updatedAt: new Date(Date.now() - 3600000 * 5)
        }
      ]);
      
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  // Get trending topics (mock data)
  const trendingTopics = [
    { id: 1, name: 'Artificial Intelligence', count: 12540 },
    { id: 2, name: 'Machine Learning', count: 8730 },
    { id: 3, name: 'Blockchain', count: 5290 },
    { id: 4, name: 'Web Development', count: 4250 },
    { id: 5, name: 'Data Science', count: 3180 }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage your content and track performance
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button 
                variant="glass-solid"
                className="shadow-sm"
                onClick={() => setIsLoading(true)}
              >
                <RefreshCwIcon className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              
              <Link to="/create">
                <Button>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create Content
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <GlassMorphism 
              className="rounded-xl p-6"
              intensity="medium"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Content</p>
                  <h3 className="text-3xl font-bold mt-1">3</h3>
                </div>
                <div className="p-3 rounded-full bg-primary/10">
                  <Edit3Icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-muted-foreground">
                <TrendingUpIcon className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500 font-medium">+33%</span>
                <span className="ml-1">since last week</span>
              </div>
            </GlassMorphism>
            
            <GlassMorphism 
              className="rounded-xl p-6"
              intensity="medium"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Engagement</p>
                  <h3 className="text-3xl font-bold mt-1">164</h3>
                </div>
                <div className="p-3 rounded-full bg-primary/10">
                  <BarChart2Icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-muted-foreground">
                <TrendingUpIcon className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500 font-medium">+27%</span>
                <span className="ml-1">since last week</span>
              </div>
            </GlassMorphism>
            
            <GlassMorphism 
              className="rounded-xl p-6"
              intensity="medium"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rewards Earned</p>
                  <h3 className="text-3xl font-bold mt-1">0.5 APT</h3>
                </div>
                <div className="p-3 rounded-full bg-primary/10">
                  <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-muted-foreground">
                <TrendingUpIcon className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500 font-medium">+0.2 APT</span>
                <span className="ml-1">since last week</span>
              </div>
            </GlassMorphism>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent Content</h2>
                <Link 
                  to="/analytics" 
                  className="text-sm text-primary hover:underline flex items-center"
                >
                  View All
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <CardHeader>
                        <div className="h-6 bg-primary/10 rounded w-1/3 mb-2"></div>
                        <div className="h-4 bg-primary/5 rounded w-1/4"></div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="h-4 bg-primary/5 rounded w-full"></div>
                          <div className="h-4 bg-primary/5 rounded w-full"></div>
                          <div className="h-4 bg-primary/5 rounded w-2/3"></div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="h-8 bg-primary/10 rounded w-1/4"></div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                recentContent.length > 0 ? (
                  <div className="space-y-4">
                    {recentContent.map((content) => (
                      <Card key={content.id} glass hover>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">
                              {content.content.substring(0, 40)}...
                            </CardTitle>
                            <span 
                              className={`text-xs px-2 py-1 rounded-full ${
                                content.status === 'posted' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                  : content.status === 'approved' 
                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                              }`}
                            >
                              {content.status.charAt(0).toUpperCase() + content.status.slice(1)}
                            </span>
                          </div>
                          <CardDescription>
                            Created {new Date(content.createdAt).toLocaleDateString()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-foreground/90 line-clamp-3">
                            {content.content}
                          </p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Link to={`/content/${content.id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                          
                          {content.engagement && (
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <svg className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                                <span className="text-xs font-medium">{content.engagement.likes}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <span className="text-xs font-medium">{content.engagement.comments}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span className="text-xs font-medium">{content.engagement.shares}</span>
                              </div>
                            </div>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="border-dashed bg-muted/50">
                    <CardContent className="pt-6 text-center">
                      <p className="text-muted-foreground mb-4">
                        You haven't created any content yet.
                      </p>
                      <Link to="/create">
                        <Button variant="outline" size="sm">
                          Create Your First Content
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              )}
              
              {!isLoading && recentContent.length > 0 && (
                <Link to="/analytics">
                  <Button 
                    variant="ghost" 
                    className="w-full text-muted-foreground hover:text-foreground"
                  >
                    View All Content
                  </Button>
                </Link>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending Topics */}
              <Card glass>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Trending Topics
                  </CardTitle>
                  <CardDescription>
                    Popular topics to create content about
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trendingTopics.map((topic) => (
                      <div 
                        key={topic.id}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/5 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                            <span className="text-xs font-medium text-primary">
                              {topic.id}
                            </span>
                          </div>
                          <span className="font-medium">{topic.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Intl.NumberFormat('en-US', { notation: 'compact' }).format(topic.count)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">
                    Explore All Topics
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Quick Actions */}
              <Card glass>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link to="/create">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Create New Content
                    </Button>
                  </Link>
                  <Link to="/analytics">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      <BarChart2Icon className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
