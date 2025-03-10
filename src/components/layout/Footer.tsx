
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ExternalLinkIcon, GithubIcon, TwitterIcon } from 'lucide-react';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn('py-8 px-4 md:px-6 mt-auto', className)}>
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-semibold text-xs">
              A
            </div>
            <span className="text-sm font-medium">ArtificialContent</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              Twitter <ExternalLinkIcon size={12} />
            </a>
          </div>
          
          <div className="flex gap-4">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <TwitterIcon size={18} />
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} ArtificialContent. All rights reserved.</p>
          <p className="mt-1">Made with precision and care.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
