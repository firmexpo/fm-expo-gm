import React, { useState } from 'react';
import { Eye, Layers, Maximize2 } from 'lucide-react';

interface DummyImage800x600Props {
  title?: string;
  subtitle?: string;
  sector?: string;
  imageSrc?: string;
  aspectRatioClass?: string;
  showToggle?: boolean;
  className?: string;
  onExpand?: () => void;
}

export const DummyImage800x600: React.FC<DummyImage800x600Props> = ({
  title = 'Industrial Production Stage',
  subtitle = 'Digital Conventional Showcase',
  sector = 'MANUFACTURING',
  imageSrc,
  aspectRatioClass = 'aspect-[4/3]',
  showToggle = true,
  className = '',
  onExpand,
}) => {
  const [viewMode, setViewMode] = useState<'dummy' | 'stage'>('dummy');
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`relative w-full ${aspectRatioClass} bg-[#111A24] border border-[#223142] overflow-hidden group select-none ${className}`}
      style={{ aspectRatio: '800 / 600' }}
    >
      {/* 1. DUMMY 800x600 BLUEPRINT VIEW */}
      {viewMode === 'dummy' || !imageSrc || imageError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-between p-4 text-[#94A3B8]">
          {/* Top Header Information Bar */}
          <div className="w-full flex items-center justify-between text-[11px] font-mono border-b border-[#1E2C3D] pb-2">
            <span className="text-[#FF6B00] font-semibold tracking-wider">{sector}</span>
            <span className="tabular-nums text-slate-400">800 × 600 PX</span>
          </div>

          {/* Central Precision Crosshairs and 800 x 600 Identifier */}
          <div className="relative w-full flex flex-col items-center justify-center my-auto">
            {/* SVG Engineering Wireframe Crosshairs */}
            <svg
              className="absolute inset-0 w-full h-32 opacity-20 pointer-events-none"
              viewBox="0 0 400 200"
              preserveAspectRatio="none"
            >
              <line x1="0" y1="0" x2="400" y2="200" stroke="#94A3B8" strokeWidth="1" />
              <line x1="0" y1="200" x2="400" y2="0" stroke="#94A3B8" strokeWidth="1" />
              <circle cx="200" cy="100" r="40" stroke="#94A3B8" strokeWidth="1" fill="none" />
              <line x1="200" y1="0" x2="200" y2="200" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="100" x2="400" y2="100" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" />
            </svg>

            <div className="relative z-10 text-center px-4 py-2">
              <span className="text-3xl md:text-4xl font-light text-slate-200 tracking-tight font-mono tabular-nums">
                800 × 600
              </span>
              <div className="text-xs text-slate-300 font-medium mt-1 truncate max-w-[280px]">
                {title}
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5 tracking-wider uppercase">
                {subtitle}
              </div>
            </div>
          </div>

          {/* Bottom Precision Spec Bar */}
          <div className="w-full flex items-center justify-between text-[10px] font-mono border-t border-[#1E2C3D] pt-2 text-slate-500">
            <span>FIRMEXPO DIGITAL STAGE</span>
            <span className="text-slate-400">STAGE SPEC RATIO 4:3</span>
          </div>
        </div>
      ) : (
        /* 2. PHOTOGRAPHIC DIGITAL STAGE VIEW */
        <div className="absolute inset-0">
          <img
            src={imageSrc}
            alt={title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          {/* Subtle bottom informational scrim for legibility */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-[#0B1118]/80 backdrop-blur-xs border-t border-[#223142]/60 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-200 truncate">{title}</span>
            <span className="text-[10px] font-mono text-slate-400 tabular-nums">800 × 600</span>
          </div>
        </div>
      )}

      {/* Floating Action Controls */}
      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-90 transition-opacity">
        {showToggle && imageSrc && !imageError && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setViewMode((prev) => (prev === 'dummy' ? 'stage' : 'dummy'));
            }}
            className="px-2 py-1 text-[10px] font-mono uppercase bg-[#0B1118]/90 hover:bg-[#1E293B] text-slate-200 border border-[#223142] rounded flex items-center gap-1 transition-colors"
            title="Toggle between 800x600 layout spec and digital stage render"
          >
            {viewMode === 'dummy' ? (
              <>
                <Eye className="w-3 h-3 text-[#FF6B00]" />
                <span>Stage Photo</span>
              </>
            ) : (
              <>
                <Layers className="w-3 h-3 text-[#FF6B00]" />
                <span>800×600 Spec</span>
              </>
            )}
          </button>
        )}

        {onExpand && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onExpand();
            }}
            className="p-1.5 bg-[#0B1118]/90 hover:bg-[#1E293B] text-slate-300 hover:text-white border border-[#223142] rounded transition-colors"
            title="Expand exhibition display"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
