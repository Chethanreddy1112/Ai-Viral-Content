
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui-custom/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import GlassMorphism from '@/components/ui-custom/GlassMorphism';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, ResponsiveContainer, XAxis, YAxis, Bar, Tooltip, Legend } from 'recharts';
import { BarChart2Icon, PieChartIcon, TrendingUpIcon, ListFilterIcon, DownloadIcon, CalendarIcon } from 'lucide-react';

const Analytics = () => {
  const [activeView, setActiveView] = useState<'overview' | 'content' | 'engagement'>('overview');
  const [timeFrame, setTimeFrame] = useState<'week' | 'month' | 'year'>('week');

  // Mock data for analytics
  const overviewData = [
    { name: 'Mon', posts: 2, engagement: 12, views: 80 },
    { name: 'Tue', posts: 3, engagement: 24, views: 140 },
    { name: 'Wed', posts: 1, engagement: 18, views: 90 },
    { name: 'Thu', posts: 4, engagement: 36, views: 220 },
    { name: 'Fri', posts: 2, engagement: 28, views: 150 },
    { name: 'Sat', posts: 0, engagement: 12, views: 60 },
    { name: 'Sun', posts: 1, engagement: 8, views: 70 },
  ];

  const contentPerformance = [
    { 
      id: '1', 
      preview: 'Just discovered how AI is transforming content creation!...',
      platform: 'Twitter',
      likes: 89,
      comments: 7,
      shares: 15,
      views: 1240,
      engagement: 111,
      date: '2023-10-12'
    },
    { 
      id: '2', 
      preview: 'The future of blockchain technology isn\'t just about...',
      platform: 'Twitter',
      likes: 42,
      comments: 3,
      shares: 8,
      views: 520,
      engagement: 53,
      date: '2023-10-15'
    },
    { 
      id: '3', 
      preview: 'A meme about programming and machine learning...',
      platform: 'Instagram',
      likes: 124,
      comments: 12,
      shares: 28,
      views: 1780,
      engagement: 164,
      date: '2023-10-18'
    },
  ];

  // Calculate summary statistics
  const totalViews = contentPerformance.reduce((sum, item) => sum + item.views, 0);
  const totalEngagement = contentPerformance.reduce((sum, item) => sum + item.engagement, 0);
  const avgEngagementRate = (totalEngagement / totalViews * 100).toFixed(1);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
              <p className="text-muted-foreground mt-1">
                Analyze your content performance across platforms
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button variant="outline">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Oct 12 - Oct 18
              </Button>
              
              <Button>
                <DownloadIcon className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
          
          {/* Analytics Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <GlassMorphism 
              className="rounded-xl p-6"
              intensity="medium"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                  <h3 className="text-3xl font-bold mt-1">{totalViews.toLocaleString()}</h3>
                </div>
                <div className="p-3 rounded-full bg-primary/10">
                  <BarChart2Icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-muted-foreground">
                <TrendingUpIcon className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500 font-medium">+12%</span>
                <span className="ml-1">vs previous period</span>
              </div>
            </GlassMorphism>
            
            <GlassMorphism 
              className="rounded-xl p-6"
              intensity="medium"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Engagement</p>
                  <h3 className="text-3xl font-bold mt-1">{totalEngagement.toLocaleString()}</h3>
                </div>
                <div className="p-3 rounded-full bg-primary/10">
                  <PieChartIcon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-muted-foreground">
                <TrendingUpIcon className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500 font-medium">+8%</span>
                <span className="ml-1">vs previous period</span>
              </div>
            </GlassMorphism>
            
            <GlassMorphism 
              className="rounded-xl p-6"
              intensity="medium"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Engagement Rate</p>
                  <h3 className="text-3xl font-bold mt-1">{avgEngagementRate}%</h3>
                </div>
                <div className="p-3 rounded-full bg-primary/10">
                  <TrendingUpIcon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-muted-foreground">
                <TrendingUpIcon className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500 font-medium">+2.3%</span>
                <span className="ml-1">vs previous period</span>
              </div>
            </GlassMorphism>
          </div>
          
          {/* Main Analytics Content */}
          <div className="space-y-8">
            {/* Tabs for different views */}
            <Tabs value={activeView} onValueChange={(v) => setActiveView(v as any)}>
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="content">Content Performance</TabsTrigger>
                  <TabsTrigger value="engagement">Engagement</TabsTrigger>
                </TabsList>
                
                <div className="flex gap-2">
                  <Button 
                    variant={timeFrame === 'week' ? 'primary' : 'outline'} 
                    size="sm"
                    onClick={() => setTimeFrame('week')}
                  >
                    Week
                  </Button>
                  <Button 
                    variant={timeFrame === 'month' ? 'primary' : 'outline'} 
                    size="sm"
                    onClick={() => setTimeFrame('month')}
                  >
                    Month
                  </Button>
                  <Button 
                    variant={timeFrame === 'year' ? 'primary' : 'outline'} 
                    size="sm"
                    onClick={() => setTimeFrame('year')}
                  >
                    Year
                  </Button>
                </div>
              </div>
              
              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Overview</CardTitle>
                    <CardDescription>Summary of your content performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={overviewData}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="posts" fill="#8884d8" name="Posts" />
                          <Bar dataKey="engagement" fill="#82ca9d" name="Engagement" />
                          <Bar dataKey="views" fill="#ffc658" name="Views" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="content" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Content Performance</CardTitle>
                      <CardDescription>How your individual posts are performing</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <ListFilterIcon className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {contentPerformance.map((content) => (
                        <Card key={content.id} className="hover:bg-accent/5 transition-colors">
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                                    {content.platform}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {content.date}
                                  </span>
                                </div>
                                <p className="text-sm font-medium mt-2">{content.preview}</p>
                              </div>
                              
                              <div className="flex flex-wrap gap-4 justify-between md:justify-end">
                                <div className="flex flex-col items-center">
                                  <span className="text-lg font-bold">{content.views}</span>
                                  <span className="text-xs text-muted-foreground">Views</span>
                                </div>
                                <div className="flex flex-col items-center">
                                  <span className="text-lg font-bold">{content.likes}</span>
                                  <span className="text-xs text-muted-foreground">Likes</span>
                                </div>
                                <div className="flex flex-col items-center">
                                  <span className="text-lg font-bold">{content.comments}</span>
                                  <span className="text-xs text-muted-foreground">Comments</span>
                                </div>
                                <div className="flex flex-col items-center">
                                  <span className="text-lg font-bold">{content.shares}</span>
                                  <span className="text-xs text-muted-foreground">Shares</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to="/dashboard">
                      <Button variant="outline">View All Content</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="engagement" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Engagement Breakdown</CardTitle>
                    <CardDescription>Analysis of how users interact with your content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={contentPerformance}
                          layout="vertical"
                        >
                          <XAxis type="number" />
                          <YAxis dataKey="preview" type="category" width={150} tick={{fontSize: 12}} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="likes" fill="#8884d8" name="Likes" />
                          <Bar dataKey="comments" fill="#82ca9d" name="Comments" />
                          <Bar dataKey="shares" fill="#ffc658" name="Shares" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Analytics;
