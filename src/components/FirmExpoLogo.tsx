import React from 'react';

interface FirmExpoLogoProps {
  className?: string;
  showTagline?: boolean;
  variant?: 'light' | 'dark' | 'on-dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const FirmExpoLogo: React.FC<FirmExpoLogoProps> = ({
  className = '',
  showTagline = true,
  variant = 'on-dark',
  size = 'md',
}) => {
  // Color configuration: Solid colors, no gradients per specification
  const navyColor = variant === 'on-dark' ? '#FFFFFF' : '#111A24';
  const orangeColor = '#FF6B00';
  const taglineColor = variant === 'on-dark' ? '#94A3B8' : '#475569';

  const dimensions = {
    sm: { iconWidth: 28, iconHeight: 28, textClass: 'text-lg', taglineClass: 'text-[9px]' },
    md: { iconWidth: 38, iconHeight: 38, textClass: 'text-2xl', taglineClass: 'text-[11px]' },
    lg: { iconWidth: 54, iconHeight: 54, textClass: 'text-3xl', taglineClass: 'text-xs' },
    xl: { iconWidth: 72, iconHeight: 72, textClass: 'text-4xl', taglineClass: 'text-sm' },
  }[size];

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      {/* Icon and Wordmark Lockup */}
      <div className="flex items-center gap-2.5">
        {/* Vector representation matching the original FirmExpo logo emblem */}
        <svg
          width={dimensions.iconWidth}
          height={dimensions.iconHeight}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 select-none"
          aria-hidden="true"
        >
          {/* Main Top Arch / Cantilever Canopy (Navy / White in dark mode) */}
          <path
            d="M25 80 L25 35 Q25 15 45 15 L95 15 L72 32 L46 32 Q38 32 38 40 L38 72 Z"
            fill={variant === 'on-dark' ? '#FFFFFF' : '#111A24'}
          />
          {/* Secondary Upper Wing */}
          <path
            d="M48 38 L98 38 L82 54 L48 54 Z"
            fill={variant === 'on-dark' ? '#E2E8F0' : '#1E293B'}
          />
          {/* Center Stage Platform - Solid Vivid Orange */}
          <path
            d="M44 48 L65 48 L65 85 L44 72 Z"
            fill={orangeColor}
          />
        </svg>

        {/* Wordmark */}
        <div className="flex items-baseline tracking-tight font-extrabold select-none">
          <span
            className={dimensions.textClass}
            style={{ color: navyColor, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Firm
          </span>
          <span
            className={dimensions.textClass}
            style={{ color: orangeColor, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Expo
          </span>
        </div>
      </div>

      {/* Official Tagline */}
      {showTagline && (
        <span
          className={`${dimensions.taglineClass} tracking-[0.14em] font-medium lowercase select-none mt-0.5`}
          style={{ color: taglineColor }}
        >
          your business on display
        </span>
      )}
    </div>
  );
};
