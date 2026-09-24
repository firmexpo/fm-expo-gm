import React from 'react';
import { FirmExpoLogo } from './FirmExpoLogo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenRegister }) => {
  return (
    <footer className="w-full bg-[#080D13] border-t border-[#1C2836] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <FirmExpoLogo variant="on-dark" size="md" showTagline={true} />
            <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed mt-2">
              The digital conventional hub for production businesses. Connecting precision manufacturing, engineering, and industrial enterprises to global procurement decision-makers.
            </p>
            <div className="text-[11px] font-mono text-slate-500">
              PLATFORM OPERATED BY FIRMEXPO GLOBAL CONVENTIONAL NETWORK
            </div>
          </div>

          {/* Col 2: Navigation Mirror */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="text-xs font-mono uppercase text-white font-semibold tracking-wider">
              Conventional Hub
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('stage-visual')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Brand Hero Stage
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('journey')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Visual Transformation Journey
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('exhibition-halls')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Audited Production Facilities
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('blueprint-specs')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  800×600 Layout Architecture
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('brand-kit')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Brand Visual Assets
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Manufacturing Sectors */}
          <div className="md:col-span-4 space-y-2.5">
            <div className="text-xs font-mono uppercase text-white font-semibold tracking-wider">
              Audited Sectors
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
              <div>CNC Machining & EDM</div>
              <div>Industrial Machinery</div>
              <div>Steel, Metals & Forging</div>
              <div>Medical Implants</div>
              <div>EV & Auto Powertrains</div>
              <div>Industrial Electronics</div>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={onOpenRegister}
                className="px-3.5 py-1.5 text-xs font-mono uppercase bg-[#16212E] hover:bg-[#1E2E40] text-slate-200 border border-[#2B3E52] rounded transition-colors cursor-pointer"
              >
                Apply for Booth Reservation
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Unboxed Separation */}
        <div className="mt-12 pt-6 border-t border-[#16202C] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} FirmExpo. All rights reserved. Your business on display.
          </div>
          <div className="flex items-center gap-3">
            <span>ISO 9001 Audited</span>
            <span aria-hidden="true">·</span>
            <span>AS9100D Staged</span>
            <span aria-hidden="true">·</span>
            <span>800×600 Pixel Standard</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
