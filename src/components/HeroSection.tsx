import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, SlidersHorizontal, ArrowRight, ShieldCheck, Factory, Box, Compass } from 'lucide-react';
import heroVisualPath from '../assets/images/hero_firmexpo_brand_stage_1790276850445.jpg';
import hallVisualPath from '../assets/images/firmexpo_exhibition_hall_1790276861742.jpg';
import { InteractiveStage } from './InteractiveStage';
import { Stage3DCanvas } from './Stage3DCanvas';

interface HeroSectionProps {
  onExploreBooths: () => void;
  onRegisterClick: () => void;
  onOpenBrandKit: () => void;
  onSelectBoothDetail?: (companyId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreBooths,
  onRegisterClick,
  onOpenBrandKit,
  onSelectBoothDetail,
}) => {
  const [activeStageView, setActiveStageView] = useState<'3d-stage' | 'brand' | 'hall' | 'blueprint'>('3d-stage');
  const [stageSpotlight, setStageSpotlight] = useState(true);

  return (
    <section id="stage-visual" className="relative w-full bg-white dark:bg-[#0B1118] text-slate-900 dark:text-white pt-8 pb-16 lg:pt-12 lg:pb-24 border-b border-slate-200 dark:border-[#1E293B] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Kicker - Solid and Unboxed with subtle fade */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-4 tracking-wider uppercase"
        >
          <span className="text-[#FF6B00] font-semibold">GLOBAL B2B CONVENTIONAL HUB</span>
          <span aria-hidden="true">·</span>
          <span>EST. 2026</span>
          <span aria-hidden="true">·</span>
          <span>THREE.JS ARCHITECTURAL STAGING</span>
        </motion.div>

        {/* Primary Headline & Supporting Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white uppercase leading-[1.08] text-balance font-heading">
              YOUR BUSINESS <br />
              <span className="text-[#FF6B00]">ON DISPLAY.</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-200 max-w-2xl leading-relaxed">
              The digital stage for production businesses.
            </p>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-normal">
              Transforming overlooked manufacturers into globally visible, highly presented enterprises. Where CNC precision, heavy engineering, medical implants, and advanced fabricators showcase real capabilities to world-class procurement teams.
            </p>
          </motion.div>

          {/* Right Action & Verification Pod */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4 flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onRegisterClick}
                className="w-full py-3.5 px-6 text-sm font-bold text-white bg-[#FF6B00] hover:bg-[#E55F00] rounded transition-colors text-center cursor-pointer uppercase tracking-wider font-heading shadow-xs"
              >
                Exhibit Your Business
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onExploreBooths}
                className="py-3.5 px-4 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-[#16212E] hover:bg-slate-200 dark:hover:bg-[#1E2E40] border border-slate-300 dark:border-[#2B3E54] rounded transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap"
              >
                <span>Tour Hub</span>
                <ArrowRight className="w-4 h-4 text-[#FF6B00]" />
              </motion.button>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1E2A38] bg-slate-50 dark:bg-[#0E1620] px-3.5 py-2.5 rounded">
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B00]" />
                Interactive 3D Stage Engine
              </span>
              <span className="font-mono tabular-nums text-slate-500 dark:text-slate-400">800×600 LAYOUT SPEC</span>
            </div>
          </motion.div>
        </div>

        {/* Master Exhibition Stage Visual Frame */}
        <div className="relative rounded-lg overflow-hidden border border-slate-300 dark:border-[#223142] bg-slate-900 shadow-xl">
          {/* Top Stage Control Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#0A0F16] border-b border-[#223142] text-xs">
            <div className="flex items-center gap-3">
              <span className="font-mono text-slate-200 flex items-center gap-1.5 font-semibold">
                <Box className="w-3.5 h-3.5 text-[#FF6B00]" />
                FIRMEXPO MASTER STAGE
              </span>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <span className="text-slate-400 font-mono text-[11px] hidden sm:inline">
                STATUS: LIVE CONVENTIONAL BROADCAST
              </span>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 bg-[#05080C] p-1 rounded border border-[#1E2B3A]">
              <button
                type="button"
                onClick={() => setActiveStageView('3d-stage')}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeStageView === '3d-stage'
                    ? 'bg-[#FF6B00] text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Interactive 3D Stage</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveStageView('brand')}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  activeStageView === 'brand'
                    ? 'bg-[#FF6B00] text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Brand Hero
              </button>
              <button
                type="button"
                onClick={() => setActiveStageView('hall')}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  activeStageView === 'hall'
                    ? 'bg-[#FF6B00] text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Pavilion
              </button>
              <button
                type="button"
                onClick={() => setActiveStageView('blueprint')}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  activeStageView === 'blueprint'
                    ? 'bg-[#FF6B00] text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                800×600 Blueprint
              </button>
            </div>
          </div>

          {/* Main Visual Display Canvas */}
          <div className="relative aspect-[16/9] w-full bg-[#080D13] overflow-hidden min-h-[440px] sm:min-h-[540px]">
            {/* View 0: React Three Fiber & Drei Interactive 3D Stage */}
            {activeStageView === '3d-stage' && (
              <div className="w-full h-full">
                <InteractiveStage
                  onSelectBooth={(booth) => {
                    if (onSelectBoothDetail && booth.companyId) {
                      onSelectBoothDetail(booth.companyId);
                    } else {
                      onExploreBooths();
                    }
                  }}
                />
              </div>
            )}

            {/* View 1: Brand Hero Stage */}
            {activeStageView === 'brand' && (
              <div className="relative w-full h-full">
                <img
                  src={heroVisualPath}
                  alt="FirmExpo Master Exhibition Stage Visual - Real manufacturing and production businesses on display"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {/* Refined solid stage lighting overlay (when enabled) */}
                {stageSpotlight && (
                  <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 bg-[#FF6B00]/15" />
                )}

                {/* Monolithic Title Inscription inside the visual */}
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-[#0B1118]/85 border border-[#223142]/80 backdrop-blur-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-[#FF6B00] mb-1">
                      OFFICIAL HERO BRAND VISUAL
                    </div>
                    <div className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                      YOUR BUSINESS ON DISPLAY.
                    </div>
                    <div className="text-xs sm:text-sm text-slate-300 mt-0.5">
                      The digital stage for production businesses. High-precision manufacturing in the spotlight.
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStageSpotlight((prev) => !prev)}
                      className="px-3 py-1.5 text-xs font-mono bg-[#16212E] hover:bg-[#202E3E] text-slate-200 border border-[#2B3E52] rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
                      <span>{stageSpotlight ? 'Spotlights: ON' : 'Spotlights: OFF'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={onOpenBrandKit}
                      className="px-3 py-1.5 text-xs font-mono bg-[#FF6B00] hover:bg-[#E55F00] text-white rounded transition-colors flex items-center gap-1.5 cursor-pointer font-semibold"
                    >
                      <span>Social Media Assets</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* View 2: Exhibition Hall */}
            {activeStageView === 'hall' && (
              <div className="relative w-full h-full">
                <img
                  src={hallVisualPath}
                  alt="FirmExpo Digital Conventional Pavilion and Exhibition Hall"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 left-6 p-4 bg-[#0B1118]/85 border border-[#223142] max-w-md">
                  <div className="text-xs font-mono text-[#FF6B00] uppercase mb-1">
                    CONVENTIONAL PAVILION VIEW
                  </div>
                  <div className="text-lg font-bold text-white uppercase">
                    365-Day Digital Conventional Pavilion
                  </div>
                  <div className="text-xs text-slate-300 mt-1">
                    Individual company stages equipped with real-time equipment specs, interactive 3D component showcases, and direct procurement channels.
                  </div>
                </div>
              </div>
            )}

            {/* View 3: 800x600 Blueprint Spec */}
            {activeStageView === 'blueprint' && (
              <div className="relative w-full h-full p-8 flex flex-col justify-between bg-[#0E1722] text-slate-300">
                <div className="flex items-center justify-between border-b border-[#223348] pb-4 font-mono text-xs">
                  <span className="text-[#FF6B00] font-bold">FIRMEXPO 800×600 EXHIBITION BLUEPRINT ARCHITECTURE</span>
                  <span className="text-slate-400">RATIO: 4:3 STANDARD SPECIFICATION</span>
                </div>

                <div className="relative flex flex-col items-center justify-center my-auto text-center py-10">
                  <svg className="w-full max-w-xl h-48 opacity-30" viewBox="0 0 800 600">
                    <rect x="10" y="10" width="780" height="580" fill="none" stroke="#FF6B00" strokeWidth="2" strokeDasharray="6 6" />
                    <line x1="10" y1="10" x2="790" y2="590" stroke="#94A3B8" strokeWidth="1" />
                    <line x1="10" y1="590" x2="790" y2="10" stroke="#94A3B8" strokeWidth="1" />
                    <circle cx="400" cy="300" r="120" stroke="#94A3B8" strokeWidth="1" fill="none" />
                  </svg>
                  <div className="mt-2 text-3xl font-mono font-bold text-white tracking-widest">
                    800 × 600 PIXEL GRID
                  </div>
                  <p className="mt-2 text-sm text-slate-300 max-w-lg">
                    Consistent layout discipline across all manufacturing booths. Ensures equal visual prominence for CNC tooling, laser fabrication, and heavy machinery without UI distortion.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between border-t border-[#223348] pt-4 font-mono text-xs text-slate-400">
                  <span>CANVAS CALIBRATION: ACTIVE</span>
                  <span>UNIFORM MULTI-DEVICE VIEWPORT: 1440PX BASELINE</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Metric Anchors (Quantitative Rigor) */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#223142] bg-[#0E1622] border-t border-[#223142]">
            <div className="p-4 sm:p-5">
              <div className="text-xs text-slate-400 font-mono uppercase">Key Production Sectors</div>
              <div className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">06</div>
              <div className="text-xs text-slate-400 mt-0.5">CNC, Steel, Medical, Auto, Heavy & Electronics</div>
            </div>
            <div className="p-4 sm:p-5">
              <div className="text-xs text-slate-400 font-mono uppercase">Display Format Standard</div>
              <div className="text-2xl font-bold font-mono text-[#FF6B00] mt-1 tabular-nums">800 × 600</div>
              <div className="text-xs text-slate-400 mt-0.5">Precision layout discipline across all booths</div>
            </div>
            <div className="p-4 sm:p-5">
              <div className="text-xs text-slate-400 font-mono uppercase">Global Conventional Reach</div>
              <div className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">365 Days</div>
              <div className="text-xs text-slate-400 mt-0.5">Continuous digital presence without teardown</div>
            </div>
            <div className="p-4 sm:p-5">
              <div className="text-xs text-slate-400 font-mono uppercase">Verified Precision Specs</div>
              <div className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">±0.001 mm</div>
              <div className="text-xs text-slate-400 mt-0.5">Full machine park and CMM traceability</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
