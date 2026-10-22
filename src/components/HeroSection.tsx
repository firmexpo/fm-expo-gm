import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Factory, Box, Layers, ExternalLink, CheckCircle2 } from 'lucide-react';
import heroVisualPath from '../assets/images/hero_firmexpo_brand_stage_1790276850445.jpg';
import hallVisualPath from '../assets/images/firmexpo_exhibition_hall_1790276861742.jpg';

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
  const [activeVisualTab, setActiveVisualTab] = useState<'brand' | 'hall' | 'specs'>('brand');
  const heroVisualUrl = typeof heroVisualPath === 'object' && heroVisualPath !== null ? (heroVisualPath as { src: string }).src : String(heroVisualPath);
  const hallVisualUrl = typeof hallVisualPath === 'object' && hallVisualPath !== null ? (hallVisualPath as { src: string }).src : String(hallVisualPath);

  return (
    <section id="hero-overview" className="relative w-full bg-[#0B1118] text-white pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Kicker - Solid and Unboxed */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-4 tracking-wider uppercase"
        >
          <span className="text-[#FF6B00] font-semibold">GLOBAL B2B CONVENTIONAL HUB</span>
          <span aria-hidden="true">·</span>
          <span>EST. 2026</span>
          <span aria-hidden="true">·</span>
          <span className="text-white font-bold">YOUR BUSINESS ON DISPLAY</span>
        </motion.div>

        {/* Primary Headline & Supporting Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.08] text-balance font-heading">
              YOUR BUSINESS <br />
              <span className="text-[#FF6B00]">ON DISPLAY.</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl font-medium text-slate-200 max-w-2xl leading-relaxed">
              The digital stage for production businesses.
            </p>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl leading-normal">
              Transforming overlooked manufacturers into globally visible, highly presented enterprises. Where CNC precision, heavy engineering, medical implants, and advanced fabricators showcase real capabilities to world-class procurement teams 365 days a year.
            </p>
          </motion.div>

          {/* Right Action & Verification Pod */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4 flex flex-col gap-3"
          >
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onExploreBooths}
                className="py-3.5 px-6 text-sm font-bold text-white bg-[#FF6B00] hover:bg-[#E55F00] rounded transition-all text-center cursor-pointer uppercase tracking-wider font-heading flex items-center justify-center gap-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span>Explore Demo Exhibition</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onRegisterClick}
                className="py-3.5 px-4 text-sm font-semibold text-slate-200 bg-[#16212E] hover:bg-[#1E2E40] border border-[#2B3E54] rounded transition-colors cursor-pointer text-center uppercase tracking-wider"
              >
                Exhibit Facility
              </motion.button>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300 border border-[#1E2A38] bg-[#0E1620] px-3.5 py-2.5 rounded">
              <span className="flex items-center gap-1.5 text-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B00]" />
                Audited Manufacturing Standards
              </span>
              <span className="font-mono tabular-nums text-slate-400">800×600 LAYOUT SPEC</span>
            </div>
          </motion.div>
        </div>

        {/* 4 Quantitative Top Metric Anchors */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="p-4 sm:p-5 bg-[#111A24] border border-[#223142] rounded-lg">
            <div className="text-xs text-slate-400 font-mono uppercase">Staged Facilities</div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-white mt-1 tabular-nums font-heading">
              1,420+
            </div>
            <div className="text-xs text-[#FF6B00] font-mono mt-1 font-semibold">↑ +122% YoY Expansion</div>
          </div>
          <div className="p-4 sm:p-5 bg-[#111A24] border border-[#223142] rounded-lg">
            <div className="text-xs text-slate-400 font-mono uppercase">Direct Technical RFQs</div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-[#FF6B00] mt-1 tabular-nums font-heading">
              9,940+
            </div>
            <div className="text-xs text-slate-400 font-mono mt-1">Zero intermediary margins</div>
          </div>
          <div className="p-4 sm:p-5 bg-[#111A24] border border-[#223142] rounded-lg">
            <div className="text-xs text-slate-400 font-mono uppercase">Standard Blueprint</div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-white mt-1 tabular-nums font-heading">
              800×600
            </div>
            <div className="text-xs text-slate-400 font-mono mt-1">Uniform 4:3 Machine Ratio</div>
          </div>
          <div className="p-4 sm:p-5 bg-[#111A24] border border-[#223142] rounded-lg">
            <div className="text-xs text-slate-400 font-mono uppercase">Active Nations</div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-white mt-1 tabular-nums font-heading">
              42 Global
            </div>
            <div className="text-xs text-slate-400 font-mono mt-1">Enterprise buyer network</div>
          </div>
        </div>

        {/* Conventional Showcase Preview Frame */}
        <div className="relative rounded-lg overflow-hidden border border-[#223142] bg-[#111A24] shadow-2xl">
          {/* Top Control Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#0E1622] border-b border-[#223142] text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="text-white flex items-center gap-1.5 font-bold">
                <Box className="w-3.5 h-3.5 text-[#FF6B00]" />
                FIRMEXPO EXHIBITION ARCHITECTURE
              </span>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <span className="text-slate-400 hidden sm:inline text-[11px]">
                PRODUCTION FACILITIES PRESENTED AS INDUSTRY LEADERS
              </span>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 bg-[#090F16] p-1 rounded border border-[#1E2B3A]">
              <button
                type="button"
                onClick={() => setActiveVisualTab('brand')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer text-xs ${
                  activeVisualTab === 'brand'
                    ? 'bg-[#FF6B00] text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Brand Hero
              </button>
              <button
                type="button"
                onClick={() => setActiveVisualTab('hall')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer text-xs ${
                  activeVisualTab === 'hall'
                    ? 'bg-[#FF6B00] text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Convention Hall
              </button>
              <button
                type="button"
                onClick={() => setActiveVisualTab('specs')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer text-xs ${
                  activeVisualTab === 'specs'
                    ? 'bg-[#FF6B00] text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                800×600 Specs
              </button>
            </div>
          </div>

          {/* Main Visual Display Canvas */}
          <div className="relative aspect-[16/9] w-full bg-[#080D13] overflow-hidden min-h-[380px] sm:min-h-[460px]">
            {/* View 1: Brand Hero Stage */}
            {activeVisualTab === 'brand' && (
              <div className="relative w-full h-full">
                <img
                  src={heroVisualUrl}
                  alt="FirmExpo Master Exhibition Stage Visual - Real manufacturing and production businesses on display"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {/* Monolithic Title Inscription inside the visual */}
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-[#0B1118]/90 border border-[#223142]/90 backdrop-blur-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-[#FF6B00] mb-1 font-bold">
                      OFFICIAL HERO BRAND VISUAL
                    </div>
                    <div className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase font-heading">
                      YOUR BUSINESS ON DISPLAY.
                    </div>
                    <div className="text-xs sm:text-sm text-slate-300 mt-0.5">
                      The digital stage for production businesses. High-precision manufacturing in the spotlight.
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={onOpenBrandKit}
                      className="px-4 py-2 text-xs font-mono font-bold bg-[#FF6B00] hover:bg-[#E55F00] text-white rounded transition-colors cursor-pointer uppercase tracking-wider"
                    >
                      Export Brand Visuals
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* View 2: Exhibition Pavilion Hall */}
            {activeVisualTab === 'hall' && (
              <div className="relative w-full h-full">
                <img
                  src={hallVisualUrl}
                  alt="FirmExpo Global Conventional Hall - 365 Days Industrial Pavilion"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                <div className="absolute bottom-6 left-6 right-6 p-6 bg-[#0B1118]/90 border border-[#223142]/90 backdrop-blur-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-[#FF6B00] mb-1 font-bold">
                      PERMANENT INDUSTRIAL PAVILION
                    </div>
                    <div className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase font-heading">
                      1,420+ PRODUCTION BOOTHS ACTIVE
                    </div>
                    <div className="text-xs sm:text-sm text-slate-300 mt-0.5">
                      Standardized 800×600 booths for CNC shops, forging facilities, robotics, and cleanrooms.
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onExploreBooths}
                    className="px-4 py-2 text-xs font-mono font-bold bg-[#FF6B00] hover:bg-[#E55F00] text-white rounded transition-colors cursor-pointer uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>Browse All Booths</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* View 3: 800x600 Blueprint Standardization Spec */}
            {activeVisualTab === 'specs' && (
              <div className="w-full h-full flex flex-col justify-between p-8 bg-[#0B1118]">
                <div>
                  <div className="text-xs font-mono text-[#FF6B00] uppercase tracking-widest font-bold mb-2">
                    SPECIFICATION STANDARD // 800 × 600 PIXELS
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight font-heading">
                    Uniform Geometric Presentation
                  </h3>
                  <p className="text-slate-300 text-sm max-w-2xl mt-2 leading-relaxed">
                    Every production facility is presented on an identical 800×600 canvas. No subjective marketing distortion—buyers compare verified machine axes, materials, and dimensional tolerances side-by-side.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                  <div className="p-4 bg-[#111A24] border border-[#223142] rounded">
                    <div className="text-xs font-mono text-slate-400">CANVAS PROPORTIONS</div>
                    <div className="text-lg font-bold text-white mt-1">4:3 Aspect Ratio</div>
                    <div className="text-xs text-[#FF6B00] font-mono mt-0.5">800px × 600px</div>
                  </div>
                  <div className="p-4 bg-[#111A24] border border-[#223142] rounded">
                    <div className="text-xs font-mono text-slate-400">COLOR PALETTE</div>
                    <div className="text-lg font-bold text-white mt-1">Navy #0B1118 & Orange #FF6B00</div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">Zero AI gradients</div>
                  </div>
                  <div className="p-4 bg-[#111A24] border border-[#223142] rounded">
                    <div className="text-xs font-mono text-slate-400">PROCUREMENT FLOW</div>
                    <div className="text-lg font-bold text-white mt-1">Direct Engineering RFQ</div>
                    <div className="text-xs text-emerald-400 font-mono mt-0.5">0% Intermediary cut</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-[#1C2836]">
                  <button
                    type="button"
                    onClick={onExploreBooths}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-[#FF6B00] hover:bg-[#E55F00] rounded transition-colors uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                  >
                    <span>Launch Demo Exhibition</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={onRegisterClick}
                    className="px-4 py-2.5 text-xs font-bold text-slate-200 bg-[#16212E] hover:bg-[#1E2E40] border border-[#2A3C4F] rounded transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    Submit Facility Specs
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
