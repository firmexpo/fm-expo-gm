import React from 'react';
import { FirmExpoLogo } from './FirmExpoLogo';
import { Sparkles, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenRegister: () => void;
  onOpenDemoExhibition?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onOpenRegister,
  onOpenDemoExhibition,
}) => {
  const handleDemoClick = () => {
    if (onOpenDemoExhibition) {
      onOpenDemoExhibition();
    } else {
      onNavigate('exhibition-halls');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B1118]/95 backdrop-blur-md border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Zone 1: Brand title with official FirmExpo lockup */}
        <button
          type="button"
          onClick={() => onNavigate('stage-3d')}
          className="flex items-center text-left focus-visible:outline-2 focus-visible:outline-[#FF6B00] rounded py-1 cursor-pointer"
        >
          <FirmExpoLogo variant="on-dark" size="md" showTagline={true} />
        </button>

        {/* Zone 2: Navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            type="button"
            onClick={() => onNavigate('stage-3d')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5"
          >
            <span>3D Stage</span>
            <span className="text-[10px] font-mono px-1 py-0.2 bg-[#FF6B00] text-white rounded font-bold">LIVE</span>
          </button>

          {/* Prominent Direct Link to Demo Exhibition on Homepage */}
          <button
            type="button"
            onClick={handleDemoClick}
            className="text-white hover:text-[#FF6B00] transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
            <span>Demo Exhibition</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/40 rounded font-bold">
              DEMO
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('journey')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Visual Journey
          </button>
          <button
            type="button"
            onClick={() => onNavigate('exhibition-halls')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Exhibition Halls
          </button>
          <button
            type="button"
            onClick={() => onNavigate('blueprint-specs')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            800×600 Layouts
          </button>
          <button
            type="button"
            onClick={() => onNavigate('exhibition-insights')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Insights
          </button>
          <button
            type="button"
            onClick={() => onNavigate('brand-kit')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Brand Assets
          </button>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={handleDemoClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-100 bg-[#172230] hover:bg-[#1E2D3D] hover:text-white border border-[#2B3B4E] rounded transition-colors whitespace-nowrap cursor-pointer shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Demo Exhibition</span>
          </button>
          <button
            type="button"
            onClick={onOpenRegister}
            className="px-3.5 sm:px-4 py-2 text-xs font-semibold text-white bg-[#FF6B00] hover:bg-[#E55F00] rounded transition-colors whitespace-nowrap cursor-pointer shadow-sm font-heading"
          >
            Exhibit Your Business
          </button>
        </div>
      </div>
    </header>
  );
};
