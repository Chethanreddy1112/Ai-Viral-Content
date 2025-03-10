
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui-custom/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  UserIcon, 
  BellIcon, 
  ShieldIcon, 
  PaletteIcon, 
  GlobeIcon, 
  CreditCardIcon, 
  Save, 
  AlertTriangleIcon 
} from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile settings
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Content creator passionate about AI and blockchain technology.',
    website: 'https://example.com',
    twitter: '@johndoe',
    location: 'San Francisco, CA',
  });
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    contentCreated: true,
    contentPerformance: true,
    newFeatures: false,
    marketing: false,
    email: true,
    push: true,
  });
  
  // Appearance settings
  const [appearance, setAppearance] = useState({
    theme: 'system',
    fontSize: 'medium',
    reducedMotion: false,
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    shareAnalytics: false,
    contentIndexing: true,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (setting: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleSaveSettings = () => {
    // Simulate saving settings
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your account preferences and application settings
            </p>
          </div>
          
          {/* Settings Content */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-64">
              <Tabs 
                orientation="vertical" 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="flex flex-col h-auto bg-transparent space-y-1 p-0">
                  <TabsTrigger 
                    value="profile" 
                    className="w-full justify-start px-3 py-2 text-left"
                  >
                    <UserIcon className="h-4 w-4 mr-2" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                    className="w-full justify-start px-3 py-2 text-left"
                  >
                    <BellIcon className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="appearance" 
                    className="w-full justify-start px-3 py-2 text-left"
                  >
                    <PaletteIcon className="h-4 w-4 mr-2" />
                    Appearance
                  </TabsTrigger>
                  <TabsTrigger 
                    value="privacy" 
                    className="w-full justify-start px-3 py-2 text-left"
                  >
                    <ShieldIcon className="h-4 w-4 mr-2" />
                    Privacy & Security
                  </TabsTrigger>
                  <TabsTrigger 
                    value="integrations" 
                    className="w-full justify-start px-3 py-2 text-left"
                  >
                    <GlobeIcon className="h-4 w-4 mr-2" />
                    Integrations
                  </TabsTrigger>
                  <TabsTrigger 
                    value="billing" 
                    className="w-full justify-start px-3 py-2 text-left"
                  >
                    <CreditCardIcon className="h-4 w-4 mr-2" />
                    Billing
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <Card>
                <TabsContent value="profile" className="mt-0">
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>
                      Manage your public profile information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          name="name"
                          value={profile.name} 
                          onChange={handleProfileChange} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email" 
                          value={profile.email} 
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        name="bio"
                        value={profile.bio} 
                        onChange={handleProfileChange}
                        rows={4}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input 
                          id="website" 
                          name="website"
                          value={profile.website} 
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twitter">Twitter</Label>
                        <Input 
                          id="twitter" 
                          name="twitter"
                          value={profile.twitter} 
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        name="location"
                        value={profile.location} 
                        onChange={handleProfileChange}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="justify-between">
                    <Button variant="outline">Reset</Button>
                    <Button onClick={handleSaveSettings}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </TabsContent>
                
                <TabsContent value="notifications" className="mt-0">
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Manage how and when you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Notification Types</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="content-created" className="flex-1">
                            Content Creation Notifications
                            <p className="text-xs text-muted-foreground mt-1">
                              Receive notifications when your content is created
                            </p>
                          </Label>
                          <Switch 
                            id="content-created"
                            checked={notifications.contentCreated}
                            onCheckedChange={() => handleNotificationChange('contentCreated')}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="performance" className="flex-1">
                            Performance Updates
                            <p className="text-xs text-muted-foreground mt-1">
                              Receive notifications about your content performance
                            </p>
                          </Label>
                          <Switch 
                            id="performance"
                            checked={notifications.contentPerformance}
                            onCheckedChange={() => handleNotificationChange('contentPerformance')}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="new-features" className="flex-1">
                            New Features
                            <p className="text-xs text-muted-foreground mt-1">
                              Receive notifications about new features and updates
                            </p>
                          </Label>
                          <Switch 
                            id="new-features"
                            checked={notifications.newFeatures}
                            onCheckedChange={() => handleNotificationChange('newFeatures')}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="marketing" className="flex-1">
                            Marketing & Promotions
                            <p className="text-xs text-muted-foreground mt-1">
                              Receive marketing and promotional emails
                            </p>
                          </Label>
                          <Switch 
                            id="marketing"
                            checked={notifications.marketing}
                            onCheckedChange={() => handleNotificationChange('marketing')}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Notification Channels</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-notifications" className="flex-1">
                            Email Notifications
                          </Label>
                          <Switch 
                            id="email-notifications"
                            checked={notifications.email}
                            onCheckedChange={() => handleNotificationChange('email')}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="push-notifications" className="flex-1">
                            Push Notifications
                          </Label>
                          <Switch 
                            id="push-notifications"
                            checked={notifications.push}
                            onCheckedChange={() => handleNotificationChange('push')}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveSettings} className="ml-auto">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </TabsContent>
                
                <TabsContent value="appearance" className="mt-0">
                  <CardHeader>
                    <CardTitle>Appearance Settings</CardTitle>
                    <CardDescription>
                      Customize how the application looks
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <Select 
                        defaultValue={appearance.theme}
                        onValueChange={(value) => setAppearance(prev => ({ ...prev, theme: value }))}
                      >
                        <SelectTrigger id="theme">
                          <SelectValue placeholder="Select a theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="font-size">Font Size</Label>
                      <Select 
                        defaultValue={appearance.fontSize}
                        onValueChange={(value) => setAppearance(prev => ({ ...prev, fontSize: value }))}
                      >
                        <SelectTrigger id="font-size">
                          <SelectValue placeholder="Select a font size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="reduced-motion" className="flex-1">
                        Reduced Motion
                        <p className="text-xs text-muted-foreground mt-1">
                          Minimize animations throughout the interface
                        </p>
                      </Label>
                      <Switch 
                        id="reduced-motion"
                        checked={appearance.reducedMotion}
                        onCheckedChange={(checked) => setAppearance(prev => ({ ...prev, reducedMotion: checked }))}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveSettings} className="ml-auto">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </TabsContent>
                
                <TabsContent value="privacy" className="mt-0">
                  <CardHeader>
                    <CardTitle>Privacy & Security</CardTitle>
                    <CardDescription>
                      Manage your privacy settings and security preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Privacy Settings</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="public-profile" className="flex-1">
                            Public Profile
                            <p className="text-xs text-muted-foreground mt-1">
                              Allow others to view your profile
                            </p>
                          </Label>
                          <Switch 
                            id="public-profile"
                            checked={privacy.publicProfile}
                            onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, publicProfile: checked }))}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="share-analytics" className="flex-1">
                            Share Analytics
                            <p className="text-xs text-muted-foreground mt-1">
                              Share anonymous usage data to help improve the service
                            </p>
                          </Label>
                          <Switch 
                            id="share-analytics"
                            checked={privacy.shareAnalytics}
                            onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, shareAnalytics: checked }))}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="content-indexing" className="flex-1">
                            Content Indexing
                            <p className="text-xs text-muted-foreground mt-1">
                              Allow search engines to index your content
                            </p>
                          </Label>
                          <Switch 
                            id="content-indexing"
                            checked={privacy.contentIndexing}
                            onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, contentIndexing: checked }))}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Security</h3>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          Change Password
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Enable Two-Factor Authentication
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Manage Connected Devices
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="pt-2">
                      <Button variant="destructive" size="sm">
                        <AlertTriangleIcon className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveSettings} className="ml-auto">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </TabsContent>
                
                <TabsContent value="integrations" className="mt-0">
                  <CardHeader>
                    <CardTitle>Integrations</CardTitle>
                    <CardDescription>
                      Connect with other services and platforms
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">Twitter</CardTitle>
                            <Button variant="outline" size="sm">Connect</Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Connect your Twitter account to automate posting your content.
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">Instagram</CardTitle>
                            <Button variant="outline" size="sm">Connect</Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Connect your Instagram account to share visual content.
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">Medium</CardTitle>
                            <Button variant="outline" size="sm">Connect</Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Connect your Medium account to publish longer articles.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </TabsContent>
                
                <TabsContent value="billing" className="mt-0">
                  <CardHeader>
                    <CardTitle>Billing & Subscription</CardTitle>
                    <CardDescription>
                      Manage your subscription plan and payment methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-primary/5 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Pro Plan</h3>
                          <p className="text-sm text-muted-foreground">$15.00 per month</p>
                        </div>
                        <Button variant="outline" size="sm">Change Plan</Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Your next billing date is November 15, 2023</p>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Payment Methods</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-12 bg-primary/10 rounded flex items-center justify-center">
                              <span className="text-xs font-medium">VISA</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">•••• 4242</p>
                              <p className="text-xs text-muted-foreground">Expires 12/24</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm">Remove</Button>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Add Payment Method
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Billing History</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="text-sm font-medium">October 15, 2023</p>
                            <p className="text-xs text-muted-foreground">Pro Plan - Monthly</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-medium">$15.00</span>
                            <Button variant="ghost" size="sm">Receipt</Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="text-sm font-medium">September 15, 2023</p>
                            <p className="text-xs text-muted-foreground">Pro Plan - Monthly</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-medium">$15.00</span>
                            <Button variant="ghost" size="sm">Receipt</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveSettings} className="ml-auto">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </TabsContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
