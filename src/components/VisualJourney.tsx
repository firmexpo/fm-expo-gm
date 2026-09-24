import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, ChevronRight, Layers, TrendingUp, Users, Target, Shield } from 'lucide-react';
import { DummyImage800x600 } from './DummyImage800x600';
import cncPhotoPath from '../assets/images/firmexpo_cnc_precision_1790276873230.jpg';

interface JourneyStep {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  challenge: string;
  solutionOnStage: string;
  unlockedMetric: string;
  unlockedDetail: string;
  tags: string[];
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 'business',
    stepNumber: '01',
    title: 'The Overlooked Production Business',
    subtitle: 'Exceptional Engineering, Limited Global Discoverability',
    challenge: 'World-class 5-axis CNC centers, cleanrooms, and robotic cells tucked away in regional industrial zones, relying solely on local brokers and word-of-mouth.',
    solutionOnStage: 'FirmExpo digitizes the complete machine park, material certs, and production capacity onto a centralized high-authority stage.',
    unlockedMetric: '100% Machine Park Audited',
    unlockedDetail: 'Complete documentation of machinery tolerances, ISO compliance, and plant throughput.',
    tags: ['Regional Hidden Champion', 'Unrealized Capacity', 'Legacy Trade Shows'],
  },
  {
    id: 'visibility',
    stepNumber: '02',
    title: 'Digital Stage Visibility',
    subtitle: 'From Regional Workshop to Global Radar',
    challenge: 'Procurement officers in aerospace, automotive, and medical industries struggle to verify smaller tier-2/3 manufacturers.',
    solutionOnStage: 'Immediate 24/7 inclusion in FirmExpo searchable conventional hub with real-time capacity and tolerance filtering.',
    unlockedMetric: '24/7 Global Accessibility',
    unlockedDetail: 'Visible to enterprise procurement teams across 40+ industrialized nations continuously.',
    tags: ['Zero Physical Travel Cost', 'Global SEO Indexing', 'Continuous Stage Presence'],
  },
  {
    id: 'presentation',
    stepNumber: '03',
    title: 'High-Impact Presentation',
    subtitle: '800×600 Standardized Precision Component Showcases',
    challenge: 'Inconsistent, blurry mobile snapshots and outdated static PDF brochures fail to communicate actual manufacturing rigor.',
    solutionOnStage: 'Standardized 800×600 layout specs showcasing raw alloy billets, surface finishes, CMM inspection reports, and engineering leads.',
    unlockedMetric: '800 × 600 Layout Spec',
    unlockedDetail: 'Harmonized visual standard giving equal high-grade presentation to both boutique shops and heavy industrial plants.',
    tags: ['Consistent Aspect Ratio', 'Verified CAD Specs', 'Hero Engineering Photography'],
  },
  {
    id: 'opportunity',
    stepNumber: '04',
    title: 'Direct OEM Inbound Opportunity',
    challenge: 'Third-party brokers taking 15-25% margins while obfuscating direct dialogue between the engineering shop and the design team.',
    subtitle: 'Engineering-to-Procurement Direct Connections',
    solutionOnStage: 'Direct RFQ pipeline with encrypted drawings, CAD step files, NDA handshakes, and immediate quote requests.',
    unlockedMetric: '+140% Qualified Inquiries',
    unlockedDetail: 'High-intent technical RFQs received directly by your chief manufacturing engineer within 90 days.',
    tags: ['Direct Contract Negotiation', 'No Middleman Commission', 'Technical RFQ Engine'],
  },
  {
    id: 'growth',
    stepNumber: '05',
    title: 'Enterprise Capital & Growth',
    subtitle: 'Long-Term OEM Supply Chain Integration',
    challenge: 'Cyclical revenue and dangerous dependence on 1-2 legacy regional clients.',
    solutionOnStage: 'Diversified global client portfolio across aerospace, medical devices, energy, and robotics leading to multi-year framework agreements.',
    unlockedMetric: '$3.8M Avg Pipeline Impact',
    unlockedDetail: 'Multi-year production allocations enabling plant expansion and robotic cell automation investments.',
    tags: ['Framework Contracts', 'Predictable Volume', 'Capital Investment Justified'],
  },
];

export const VisualJourney: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(1);
  const activeStep = JOURNEY_STEPS[activeStepIndex];

  return (
    <section id="journey" className="w-full bg-[#0E1622] py-16 sm:py-20 border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[#FF6B00] mb-2 font-semibold">
            THE STRATEGIC TRANSFORMATION
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            The FirmExpo Visual Journey
          </h2>
          <p className="mt-3 text-slate-300 max-w-2xl text-base">
            How production businesses transition from ordinary, overlooked operations into celebrated, high-capacity global manufacturing partners.
          </p>
        </div>

        {/* 5-Step Pipeline Progress Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 bg-[#090F16] border border-[#202E3E] rounded-lg mb-10">
          {JOURNEY_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`flex flex-col text-left p-3 rounded transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#182330] border border-[#FF6B00] text-white shadow-none'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#121B26] border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className={isActive ? 'text-[#FF6B00] font-bold' : 'text-slate-500'}>
                    {step.stepNumber}
                  </span>
                  {idx < JOURNEY_STEPS.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 hidden sm:inline" />
                  )}
                </div>
                <div className="text-xs sm:text-sm font-semibold truncate capitalize">
                  {step.id}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Stage Transformation Canvas */}
        <div className="bg-[#111A24] border border-[#223142] p-6 sm:p-8 rounded-lg overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Stage Narrative */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full">
                <div>
                  {/* Unboxed Metadata Header */}
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
                    <span className="text-[#FF6B00] font-bold">PHASE {activeStep.stepNumber}</span>
                    <span aria-hidden="true">·</span>
                    <span className="uppercase">{activeStep.id.toUpperCase()}</span>
                    <span aria-hidden="true">·</span>
                    <span>FIRMEXPO ECOSYSTEM</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug font-heading">
                    {activeStep.title}
                  </h3>
                  <p className="text-sm font-semibold text-[#FF6B00] mt-1">
                    {activeStep.subtitle}
                  </p>

                  {/* Challenge vs Solution comparison */}
                  <div className="mt-6 space-y-4">
                    <div className="p-4 bg-[#0B1118] border border-[#1E293B] rounded">
                      <div className="text-xs font-mono uppercase text-slate-300 font-semibold mb-1">
                        The Traditional Limitation:
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {activeStep.challenge}
                      </p>
                    </div>

                    <div className="p-4 bg-[#14202C] border-l-2 border-[#FF6B00] border-y border-r border-[#223142] rounded-r">
                      <div className="text-xs font-mono uppercase text-[#FF6B00] mb-1 font-bold">
                        The FirmExpo Digital Stage Transformation:
                      </div>
                      <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                        {activeStep.solutionOnStage}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Unlocked Metric Callout */}
                <div className="mt-8 pt-6 border-t border-[#1E2A3A] flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums font-heading">
                      {activeStep.unlockedMetric}
                    </div>
                    <div className="text-xs text-slate-300 mt-0.5 max-w-sm">
                      {activeStep.unlockedDetail}
                    </div>
                  </div>

                  {/* Step Navigation Controls */}
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      disabled={activeStepIndex === 0}
                      onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                      className="px-3 py-1.5 text-xs font-mono bg-[#16212E] hover:bg-[#1E2E40] text-slate-200 disabled:opacity-30 rounded border border-[#26374A] cursor-pointer"
                    >
                      Previous
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      disabled={activeStepIndex === JOURNEY_STEPS.length - 1}
                      onClick={() => setActiveStepIndex((prev) => Math.min(JOURNEY_STEPS.length - 1, prev + 1))}
                      className="px-3.5 py-1.5 text-xs font-mono bg-[#FF6B00] hover:bg-[#E55F00] text-white disabled:opacity-30 rounded cursor-pointer font-bold"
                    >
                      Next Phase
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Right Column: 800x600 Standardized Visual Blueprint & Stage Render */}
              <div className="lg:col-span-6">
                <div className="p-2 bg-[#090F16] border border-[#1E2A38] rounded shadow-xl">
                  <DummyImage800x600
                    title={activeStep.title}
                    subtitle={`JOURNEY PHASE ${activeStep.stepNumber} // STAGE SPEC`}
                    sector="TRANSFORMATION ENGINE"
                    imageSrc={cncPhotoPath}
                    showToggle={true}
                  />
                  <div className="mt-2.5 px-2 py-1.5 flex items-center justify-between text-[11px] font-mono text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3 h-3 text-[#FF6B00]" />
                      <span>800 × 600 PX UNIFORM EXHIBITION ASSET</span>
                    </span>
                    <span className="text-slate-400">ISO 9001 / AS9100D</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
