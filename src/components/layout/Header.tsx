
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui-custom/Button';
import { HomeIcon, BarChart2Icon, PlusCircleIcon, SettingsIcon, MenuIcon, XIcon } from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick?: () => void;
}

const NavItem = ({ to, icon, label, active, onClick }: NavItemProps) => (
  <Link 
    to={to} 
    onClick={onClick}
    className={cn(
      'flex items-center gap-2 px-4 py-2 rounded-lg transition-all',
      active 
        ? 'bg-primary text-primary-foreground shadow-md' 
        : 'text-foreground/70 hover:bg-accent hover:text-foreground'
    )}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Track scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { to: '/dashboard', icon: <HomeIcon size={18} />, label: 'Dashboard' },
    { to: '/create', icon: <PlusCircleIcon size={18} />, label: 'Create Content' },
    { to: '/analytics', icon: <BarChart2Icon size={18} />, label: 'Analytics' },
    { to: '/settings', icon: <SettingsIcon size={18} />, label: 'Settings' }
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6',
        scrolled 
          ? 'py-3 backdrop-blur-lg bg-background/80 shadow-sm' 
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
            <span className="animate-pulse-soft">A</span>
          </div>
          <span className="font-medium text-lg hidden sm:block">ArtificialContent</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.to}
            />
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          'fixed inset-0 bg-background/95 backdrop-blur-sm z-40 md:hidden transition-all duration-300 flex flex-col pt-24 px-6',
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.to}
              onClick={() => setIsMenuOpen(false)}
            />
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
