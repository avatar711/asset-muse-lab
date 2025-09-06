import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number;
  onChange: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  onChange,
  size = 'md',
  readonly = false,
}) => {
  const sizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            sizes[size],
            'transition-colors',
            star <= rating
              ? 'fill-primary text-primary'
              : 'text-muted-foreground hover:text-primary',
            !readonly && 'cursor-pointer'
          )}
          onClick={() => !readonly && onChange(star)}
        />
      ))}
    </div>
  );
};