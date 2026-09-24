import React from 'react';
import { FirmExpoLogo } from './FirmExpoLogo';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenRegister }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B1118] border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Zone 1: Brand title, one line with official FirmExpo lockup */}
        <button
          type="button"
          onClick={() => onNavigate('hero')}
          className="flex items-center text-left focus-visible:outline-2 focus-visible:outline-[#FF6B00] rounded py-1"
        >
          <FirmExpoLogo variant="on-dark" size="md" showTagline={true} />
        </button>

        {/* Zone 2: 4-6 nav links, 1-2 word labels, single line */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            type="button"
            onClick={() => onNavigate('stage-visual')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5"
          >
            <span>3D Stage</span>
            <span className="text-[10px] font-mono px-1 py-0.2 bg-[#FF6B00] text-white rounded font-bold">LIVE</span>
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

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('exhibition-halls')}
            className="hidden sm:inline-flex px-3.5 py-2 text-xs font-semibold text-slate-200 bg-[#172230] hover:bg-[#1E2D3D] border border-[#2B3B4E] rounded transition-colors whitespace-nowrap cursor-pointer"
          >
            Browse Exhibits
          </button>
          <button
            type="button"
            onClick={onOpenRegister}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#FF6B00] hover:bg-[#E55F00] rounded transition-colors whitespace-nowrap cursor-pointer shadow-none"
          >
            Exhibit Your Business
          </button>
        </div>
      </div>
    </header>
  );
};
