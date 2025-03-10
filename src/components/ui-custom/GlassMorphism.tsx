
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassMorphismProps {
  children: ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  border?: boolean;
  hover?: boolean;
}

const GlassMorphism = ({
  children,
  className,
  intensity = 'medium',
  border = true,
  hover = false,
}: GlassMorphismProps) => {
  const intensityMap = {
    low: 'bg-white/5 backdrop-blur-sm',
    medium: 'bg-white/10 backdrop-blur-md',
    high: 'bg-white/20 backdrop-blur-lg',
  };

  const borderStyle = border 
    ? 'border border-white/20 dark:border-white/10' 
    : '';
  
  const hoverEffect = hover 
    ? 'transition-all duration-300 hover:bg-white/30 dark:hover:bg-white/15' 
    : '';

  return (
    <div
      className={cn(
        intensityMap[intensity],
        borderStyle,
        hoverEffect,
        'shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassMorphism;
