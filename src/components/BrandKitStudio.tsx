import React, { useState, useRef } from 'react';
import { Download, Share2, Eye, Sliders, Check, Sparkles, Monitor, Smartphone, Grid } from 'lucide-react';
import { FirmExpoLogo } from './FirmExpoLogo';
import heroVisualPath from '../assets/images/hero_firmexpo_brand_stage_1790276850445.jpg';

type AspectRatioType = '16:9' | '1:1' | '9:16' | '4:3';

interface AspectRatioConfig {
  id: AspectRatioType;
  label: string;
  sublabel: string;
  dimensions: string;
  containerClass: string;
}

const RATIOS: AspectRatioConfig[] = [
  {
    id: '16:9',
    label: 'Landscape Hero / LinkedIn',
    sublabel: 'Web Banners & B2B Feed',
    dimensions: '1920 × 1080 PX',
    containerClass: 'aspect-[16/9] max-w-4xl',
  },
  {
    id: '1:1',
    label: 'Square Corporate / Instagram',
    sublabel: 'Social Showcase & Avatars',
    dimensions: '1080 × 1080 PX',
    containerClass: 'aspect-[1/1] max-w-xl',
  },
  {
    id: '9:16',
    label: 'Vertical Story / Mobile',
    sublabel: 'Digital Kiosks & Stories',
    dimensions: '1080 × 1920 PX',
    containerClass: 'aspect-[9/16] max-w-xs',
  },
  {
    id: '4:3',
    label: 'Standard Conventional / 800×600',
    sublabel: 'Exhibition Catalog & Print',
    dimensions: '1600 × 1200 PX',
    containerClass: 'aspect-[4/3] max-w-2xl',
  },
];

export const BrandKitStudio: React.FC = () => {
  const [selectedRatio, setSelectedRatio] = useState<AspectRatioType>('16:9');
  const [showHeadline, setShowHeadline] = useState(true);
  const [showSupportingLine, setShowSupportingLine] = useState(true);
  const [logoPosition, setLogoPosition] = useState<'bottom-left' | 'top-left' | 'top-right'>('bottom-left');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const activeRatioConfig = RATIOS.find((r) => r.id === selectedRatio)!;

  const handleDownload = () => {
    // Direct download of the high-res master brand asset
    const link = document.createElement('a');
    link.href = heroVisualPath;
    link.download = `FirmExpo_Brand_Visual_${selectedRatio.replace(':', '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <section id="brand-kit" className="w-full bg-[#0E1622] py-16 sm:py-20 border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#FF6B00] mb-2 font-semibold">
              BRAND VISUAL ASSET STUDIO
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              Social-Media-Ready Brand Visuals
            </h2>
            <p className="mt-2 text-slate-300 max-w-2xl text-sm sm:text-base">
              The official FirmExpo brand visual formatted for LinkedIn, Instagram, advertising, and digital exhibition kiosks. Solid corporate colors, zero gradients, and high international credibility.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownload}
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#FF6B00] hover:bg-[#E55F00] rounded transition-colors uppercase tracking-wider flex items-center gap-2 cursor-pointer shrink-0 self-start md:self-auto"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Downloaded Asset</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-white" />
                <span>Download Asset Package</span>
              </>
            )}
          </button>
        </div>

        {/* Studio Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual Customizer Controls */}
          <div className="lg:col-span-4 bg-[#111A24] border border-[#223142] p-6 rounded-lg space-y-6">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3 font-semibold">
                01. Format & Aspect Ratio
              </label>
              <div className="space-y-2">
                {RATIOS.map((ratio) => {
                  const isSelected = selectedRatio === ratio.id;
                  return (
                    <button
                      key={ratio.id}
                      type="button"
                      onClick={() => setSelectedRatio(ratio.id)}
                      className={`w-full p-3 text-left rounded border transition-colors cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#182432] border-[#FF6B00] text-white'
                          : 'bg-[#0B1118] border-[#1E2A38] text-slate-300 hover:border-[#2C3E52]'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold uppercase">{ratio.label}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{ratio.sublabel}</div>
                      </div>
                      <span className="text-[10px] font-mono text-[#FF6B00] tabular-nums font-semibold">
                        {ratio.dimensions}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Typography Overlays */}
            <div className="pt-4 border-t border-[#1C2836]">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3 font-semibold">
                02. Brand Headline Inscription
              </label>
              <div className="space-y-2.5">
                <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showHeadline}
                    onChange={(e) => setShowHeadline(e.target.checked)}
                    className="w-4 h-4 rounded text-[#FF6B00] bg-[#0B1118] border-[#223142] focus:ring-0"
                  />
                  <span>Headline: "YOUR BUSINESS ON DISPLAY."</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showSupportingLine}
                    onChange={(e) => setShowSupportingLine(e.target.checked)}
                    className="w-4 h-4 rounded text-[#FF6B00] bg-[#0B1118] border-[#223142] focus:ring-0"
                  />
                  <span>Supporting: "The digital stage for production businesses."</span>
                </label>
              </div>
            </div>

            {/* Logo Placement */}
            <div className="pt-4 border-t border-[#1C2836]">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3 font-semibold">
                03. Official Logo Placement
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['bottom-left', 'top-left', 'top-right'] as const).map((pos) => (
                  <button
                    key={pos}
                    type="button"
                    onClick={() => setLogoPosition(pos)}
                    className={`py-2 px-1 text-[11px] font-mono uppercase rounded border transition-colors cursor-pointer text-center ${
                      logoPosition === pos
                        ? 'bg-[#FF6B00] text-white border-[#FF6B00] font-bold'
                        : 'bg-[#0B1118] text-slate-400 border-[#1E2A38] hover:text-white'
                    }`}
                  >
                    {pos.replace('-', ' ')}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-2 font-mono">
                *FirmExpo logo rendered in exactly one primary position per brand standards.
              </p>
            </div>

            {/* Color Standards Info */}
            <div className="pt-4 border-t border-[#1C2836] text-[11px] font-mono text-slate-400 space-y-1">
              <div className="flex items-center justify-between">
                <span>CANVAS DEEP NAVY:</span>
                <span className="text-white font-bold">#0B1118</span>
              </div>
              <div className="flex items-center justify-between">
                <span>INDUSTRIAL ACCENT:</span>
                <span className="text-[#FF6B00] font-bold">#FF6B00</span>
              </div>
              <div className="flex items-center justify-between">
                <span>GRADIENT STATUS:</span>
                <span className="text-slate-300 font-bold">0% (PURE SOLID)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Responsive Canvas Stage */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center bg-[#090F16] border border-[#202E3E] p-4 sm:p-8 rounded-lg min-h-[520px]">
            
            <div
              ref={previewRef}
              className={`relative w-full ${activeRatioConfig.containerClass} bg-[#080D13] border border-[#223142] overflow-hidden shadow-2xl transition-all duration-300 mx-auto`}
            >
              {/* Master Photograph */}
              <img
                src={heroVisualPath}
                alt="FirmExpo Master Brand Campaign Visual"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* Logo Layer (One primary location strictly) */}
              <div
                className={`absolute p-4 sm:p-6 pointer-events-none ${
                  logoPosition === 'top-left'
                    ? 'top-0 left-0'
                    : logoPosition === 'top-right'
                    ? 'top-0 right-0'
                    : 'bottom-0 left-0'
                }`}
              >
                <div className="p-3 bg-[#0B1118]/90 border border-[#223142]/80 backdrop-blur-xs rounded">
                  <FirmExpoLogo variant="on-dark" size="md" showTagline={true} />
                </div>
              </div>

              {/* Headline Inscription (When enabled and not conflicting with logo) */}
              {(showHeadline || showSupportingLine) && logoPosition !== 'bottom-left' && (
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-6 bg-[#0B1118]/90 border border-[#223142]/80 backdrop-blur-xs">
                  {showHeadline && (
                    <div className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight">
                      YOUR BUSINESS ON DISPLAY.
                    </div>
                  )}
                  {showSupportingLine && (
                    <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                      The digital stage for production businesses.
                    </div>
                  )}
                </div>
              )}

              {/* If logo is bottom-left, place headline on bottom-right or top-left */}
              {(showHeadline || showSupportingLine) && logoPosition === 'bottom-left' && (
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 max-w-md p-4 bg-[#0B1118]/90 border border-[#223142]/80 backdrop-blur-xs text-right">
                  {showHeadline && (
                    <div className="text-base sm:text-xl font-black text-white uppercase tracking-tight">
                      YOUR BUSINESS ON DISPLAY.
                    </div>
                  )}
                  {showSupportingLine && (
                    <div className="text-xs text-slate-300 font-medium mt-0.5">
                      The digital stage for production businesses.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Spec Bar underneath canvas */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 w-full max-w-4xl text-xs font-mono text-slate-400 px-2">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF6B00] rounded-none" />
                <span>FORMAT: {activeRatioConfig.dimensions}</span>
              </span>
              <span>RENDER ENGINE: HIGH-RES 8K COMMERCIAL ART DIRECTION</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
