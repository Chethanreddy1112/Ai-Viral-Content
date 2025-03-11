
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui-custom/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui-custom/Card';
import { useToast } from '@/hooks/use-toast';
import { LogInIcon, LockIcon, MailIcon, UserPlusIcon } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isLogin) {
        // Demo login - in a real app, you would validate these credentials against a database
        if (email === 'demo@example.com' && password === 'password') {
          // Store some demo user data in localStorage
          localStorage.setItem('user', JSON.stringify({
            id: '1',
            email: 'demo@example.com',
            name: 'Demo User'
          }));
          
          toast({
            title: "Login successful",
            description: "Welcome back to ArtificialContent!",
          });
          
          navigate('/dashboard');
        } else {
          toast({
            title: "Login failed",
            description: "Invalid email or password. Try demo@example.com / password",
            variant: "destructive",
          });
        }
      } else {
        // Demo signup - in a real app, you would save this to a database
        localStorage.setItem('user', JSON.stringify({
          id: '1',
          email,
          name: 'New User'
        }));
        
        toast({
          title: "Account created",
          description: "Welcome to ArtificialContent!",
        });
        
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast({
        title: "Authentication error",
        description: "An error occurred during authentication.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-secondary/30">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
              <span className="animate-pulse-soft">A</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            {isLogin ? 'Sign in to ArtificialContent' : 'Create your account'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isLogin 
              ? 'Enter your credentials to access your account' 
              : 'Fill in the details below to get started'}
          </p>
        </div>

        <Card glass className="p-6">
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <MailIcon size={18} />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {isLogin && (
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <LockIcon size={18} />
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              loading={loading}
            >
              {isLogin ? (
                <>
                  <LogInIcon size={18} />
                  Sign in
                </>
              ) : (
                <>
                  <UserPlusIcon size={18} />
                  Create account
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                className="ml-1 text-primary hover:underline font-medium"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Demo credentials: demo@example.com / password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
