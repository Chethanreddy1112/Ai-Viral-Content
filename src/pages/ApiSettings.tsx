
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui-custom/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { openai } from '@/services/openai';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import { KeyRound, Save } from 'lucide-react';

const ApiSettings = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('');
  
  useEffect(() => {
    // Get the current API key from localStorage (for demonstration purposes)
    const currentKey = localStorage.getItem('openai_api_key');
    if (currentKey) {
      setApiKey(currentKey);
    }
  }, []);
  
  const handleSaveApiKey = () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter a valid OpenAI API key.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      openai.setApiKey(apiKey);
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been saved successfully."
      });
    } catch (error) {
      toast({
        title: "Error Saving API Key",
        description: "There was an error saving your API key. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">API Settings</h1>
            <p className="text-muted-foreground mt-1">
              Configure your API keys for external services
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyRound className="h-5 w-5" />
                OpenAI API Key
              </CardTitle>
              <CardDescription>
                Enter your OpenAI API key to enable content generation features.
                You can get an API key from the <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenAI dashboard</a>.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-2">
                <label htmlFor="apiKey" className="text-sm font-medium">
                  API Key
                </label>
                <Textarea 
                  id="apiKey" 
                  value={apiKey} 
                  onChange={(e) => setApiKey(e.target.value)} 
                  placeholder="Enter your OpenAI API key (starts with 'sk-')"
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Your API key is stored locally in your browser for demo purposes. 
                  In a production environment, this should be securely stored on a server.
                </p>
              </div>
            </CardContent>
            
            <CardFooter className="justify-between">
              <Link to="/settings">
                <Button variant="outline">
                  Cancel
                </Button>
              </Link>
              
              <Button onClick={handleSaveApiKey}>
                <Save className="h-4 w-4 mr-2" />
                Save API Key
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ApiSettings;
