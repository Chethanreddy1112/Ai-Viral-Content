
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui-custom/Button';
import { Card } from '@/components/ui-custom/Card';
import GlassMorphism from '@/components/ui-custom/GlassMorphism';
import Footer from '@/components/layout/Footer';
import { ArrowRightIcon, BrainIcon, TrendingUpIcon, ZapIcon } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  
  // Animation on scroll effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach((el) => observer.observe(el));
    
    return () => {
      animateElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="min-h-screen flex flex-col items-center justify-center px-4 py-20 mt-10"
      >
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3 space-y-6 text-center lg:text-left">
              <div className="animate-on-scroll">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
                  AI-Powered Content Platform
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                  Create viral content with <span className="text-primary">AI</span> in seconds
                </h1>
                <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                  Generate high-performing tweets, memes, blogs, and more. Analyze trends, track engagement, and earn rewards all in one place.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8 animate-on-scroll">
                <Button 
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                  className="group"
                >
                  Get Started
                  <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  variant="glass"
                  size="lg"
                  onClick={() => navigate('/about')}
                >
                  Learn More
                </Button>
              </div>
              
              <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 animate-on-scroll">
                <div className="flex flex-col items-center lg:items-start">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-1 bg-primary rounded-full" />
                    <div className="w-1 h-1 bg-primary rounded-full ml-1" />
                  </div>
                  <p className="text-sm text-muted-foreground">AI-Generated Content</p>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-1 bg-primary rounded-full" />
                    <div className="w-1 h-1 bg-primary rounded-full ml-1" />
                  </div>
                  <p className="text-sm text-muted-foreground">Engagement Analysis</p>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-1 bg-primary rounded-full" />
                    <div className="w-1 h-1 bg-primary rounded-full ml-1" />
                  </div>
                  <p className="text-sm text-muted-foreground">Reward System</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2 relative animate-on-scroll">
              <GlassMorphism 
                className="rounded-2xl p-6 relative z-10 animate-float"
                intensity="high"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                    <div className="flex-1" />
                  </div>
                  
                  <div className="space-y-3 py-2">
                    <div className="h-4 bg-primary/10 rounded-full w-3/4" />
                    <div className="h-4 bg-primary/10 rounded-full w-full" />
                    <div className="h-4 bg-primary/10 rounded-full w-5/6" />
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="bg-primary/10 p-3 rounded-md">
                      <div className="h-4 bg-white/20 rounded-full w-full mb-2" />
                      <div className="h-4 bg-white/20 rounded-full w-1/2" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2">
                    <div className="h-8 bg-primary/20 w-20 rounded-md" />
                    <div className="h-8 bg-primary/80 w-24 rounded-md" />
                  </div>
                </div>
              </GlassMorphism>
              
              {/* Decorative elements */}
              <div className="absolute top-1/4 -left-8 -z-10 w-24 h-24 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 -right-8 -z-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section
        ref={featuresRef}
        className="py-20 px-4"
      >
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
              Platform Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Everything you need to create viral content
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform gives you all the tools to generate, optimize, and track your content's performance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card 
              glass 
              hover 
              className="animate-on-scroll"
            >
              <div className="p-4 rounded-full bg-primary/10 w-fit mb-4">
                <BrainIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Content Generation</h3>
              <p className="text-muted-foreground">
                Generate tweets, memes, blogs, and more using advanced AI models trained on viral content.
              </p>
            </Card>
            
            <Card 
              glass 
              hover 
              className="animate-on-scroll"
            >
              <div className="p-4 rounded-full bg-primary/10 w-fit mb-4">
                <TrendingUpIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trend Analysis</h3>
              <p className="text-muted-foreground">
                Stay ahead with real-time trend analysis from Twitter, Telegram, and Discord.
              </p>
            </Card>
            
            <Card 
              glass 
              hover 
              className="animate-on-scroll"
            >
              <div className="p-4 rounded-full bg-primary/10 w-fit mb-4">
                <ZapIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Engagement Rewards</h3>
              <p className="text-muted-foreground">
                Earn Aptos Tokens automatically when your content performs well on social platforms.
              </p>
            </Card>
          </div>
          
          <div className="mt-16 text-center animate-on-scroll">
            <Button 
              size="lg"
              onClick={() => navigate('/dashboard')}
            >
              Start Creating Now
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <GlassMorphism 
            className="rounded-2xl p-8 md:p-12 animate-on-scroll"
            intensity="medium"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Ready to create viral content?
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Join thousands of content creators who are already using our platform to generate high-performing content.
                </p>
              </div>
              <div className="flex justify-center md:justify-end">
                <Button 
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                >
                  Get Started For Free
                </Button>
              </div>
            </div>
          </GlassMorphism>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
