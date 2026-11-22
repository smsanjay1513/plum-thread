import { useState } from 'react';
import { Factory } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle: string;
  fallbackSubtitle?: string;
  aspectClassName?: string;
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  fallbackSubtitle,
  aspectClassName = 'aspect-video',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-[#f6eef5] dark:from-slate-900 dark:via-slate-900 dark:to-[#231120] border border-slate-200 dark:border-slate-800 text-center p-6 ${aspectClassName} ${className}`}
      >
        <Factory
          className="w-8 h-8 text-[#581C4C] dark:text-[#E29AD3] mb-3"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <p className="font-display text-sm font-semibold text-slate-900 dark:text-slate-100">
          {fallbackTitle}
        </p>
        {fallbackSubtitle && (
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xs">
            {fallbackSubtitle}
          </p>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
