import React, { useState } from 'react';
import { Layers, CheckCircle2, Ruler, Cpu, Wrench, Shield, Zap } from 'lucide-react';
import { DummyImage800x600 } from './DummyImage800x600';
import cncPhotoPath from '../assets/images/firmexpo_cnc_precision_1790276873230.jpg';
import hallPhotoPath from '../assets/images/firmexpo_exhibition_hall_1790276861742.jpg';

interface BlueprintSpecItem {
  id: string;
  title: string;
  category: string;
  tolerance: string;
  material: string;
  aspect: string;
  description: string;
}

const BLUEPRINT_ITEMS: BlueprintSpecItem[] = [
  {
    id: 'b1',
    title: '5-Axis Simultaneous Machining Cell',
    category: 'CNC AEROSPACE',
    tolerance: '±0.002 mm True Position',
    material: 'Inconel 718 / Titanium Grade 5',
    aspect: '800 × 600 PX (4:3)',
    description: 'Precision wireframe blueprint showing envelope limits of 650 × 600 × 500 mm with dual laser toolsetter calibration points.',
  },
  {
    id: 'b2',
    title: 'High-Tonnage Progressive Stamping Die',
    category: 'HEAVY AUTOMOTIVE PRESS',
    tolerance: 'Parallelism 0.010 mm',
    material: 'D2 Tool Steel / Bronze Wear Plates',
    aspect: '800 × 600 PX (4:3)',
    description: 'Standardized 800×600 layout capturing 12-station strip layout, nitrogen spring cavities, and punch clearances.',
  },
  {
    id: 'b3',
    title: 'Micron-Tolerance Bio-Surgical Implant',
    category: 'CLEANROOM MEDICAL',
    tolerance: 'Sphericity 0.001 mm',
    material: 'Ti-6Al-4V ELI (ASTM F136)',
    aspect: '800 × 600 PX (4:3)',
    description: 'Optical inspection frame calibrated for cleanroom biocompatible surface roughness and sterile barrier packaging.',
  },
  {
    id: 'b4',
    title: 'Explosion-Proof Telemetry Enclosure',
    category: 'INDUSTRIAL ELECTRONICS',
    tolerance: 'IP69K Submersible Seal',
    material: '316L Stainless Steel Casting',
    aspect: '800 × 600 PX (4:3)',
    description: 'Hardened ATEX Zone 0 instrumentation staging with Hermetic O-ring grooves and PCB conformal coating boundary.',
  },
];

export const BlueprintSpecsSection: React.FC = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const activeItem = BLUEPRINT_ITEMS[selectedItemIndex];

  return (
    <section id="blueprint-specs" className="w-full bg-[#0B1118] py-16 sm:py-20 border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#FF6B00] mb-2 font-semibold">
              LAYOUT STANDARDIZATION ARCHITECTURE
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              The 800 × 600 Layout Standard
            </h2>
            <p className="mt-2 text-slate-300 max-w-2xl text-sm sm:text-base">
              Consistent dummy size images maintain flawless layout proportions across all manufacturing sectors. Every machine, tool, component, and schematic shares an authoritative 4:3 canvas.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-[#111A24] border border-[#223142] px-4 py-2 rounded shrink-0">
            <Ruler className="w-4 h-4 text-[#FF6B00]" />
            <span>UNIFORM RATIO: 800PX WIDTH × 600PX HEIGHT</span>
          </div>
        </div>

        {/* Blueprint Interactive Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Blueprint Selector Column */}
          <div className="lg:col-span-5 space-y-3">
            {BLUEPRINT_ITEMS.map((item, idx) => {
              const isSelected = idx === selectedItemIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedItemIndex(idx)}
                  className={`w-full p-4 text-left rounded border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#14202D] border-[#FF6B00] text-white shadow-none'
                      : 'bg-[#111A24] border-[#1E2A38] text-slate-400 hover:text-slate-200 hover:border-[#2C3E52]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className={isSelected ? 'text-[#FF6B00] font-bold' : 'text-slate-500'}>
                      {item.category}
                    </span>
                    <span className="tabular-nums text-slate-400">{item.aspect}</span>
                  </div>
                  <div className="text-sm font-bold text-white">{item.title}</div>
                  <div className="mt-2 text-xs text-slate-400 line-clamp-2">
                    {item.description}
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-[#1C2836] flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Tolerance: {item.tolerance}</span>
                    <span className="text-slate-300 font-semibold">{item.material.split('/')[0]}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live 800x600 Blueprint Display */}
          <div className="lg:col-span-7 bg-[#111A24] border border-[#223142] p-6 rounded-lg">
            
            {/* Visual Header */}
            <div className="flex items-center justify-between text-xs font-mono pb-4 mb-4 border-b border-[#1C2836]">
              <span className="text-white font-bold flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#FF6B00]" />
                {activeItem.title}
              </span>
              <span className="text-[#FF6B00]">ACTIVE 800 × 600 CANVAS</span>
            </div>

            {/* Standardized 800x600 Component */}
            <div className="p-2 bg-[#090F16] border border-[#1E2A38] rounded">
              <DummyImage800x600
                title={activeItem.title}
                subtitle={`${activeItem.category} // ${activeItem.tolerance}`}
                sector={activeItem.category}
                imageSrc={cncPhotoPath}
                showToggle={true}
              />
            </div>

            {/* Architectural Highlights */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1C2836]">
              <div className="bg-[#0B1118] p-3 rounded border border-[#1E2A38]">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Aspect Geometry</div>
                <div className="text-sm font-bold font-mono text-white mt-0.5">800 × 600 px</div>
                <div className="text-[11px] text-slate-400 mt-1">4:3 exact dimensional symmetry</div>
              </div>
              <div className="bg-[#0B1118] p-3 rounded border border-[#1E2A38]">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Layout Integrity</div>
                <div className="text-sm font-bold font-mono text-white mt-0.5">Zero Shift</div>
                <div className="text-[11px] text-slate-400 mt-1">Flawless responsive masonry alignment</div>
              </div>
              <div className="bg-[#0B1118] p-3 rounded border border-[#1E2A38]">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Dual-Mode Spec</div>
                <div className="text-sm font-bold font-mono text-[#FF6B00] mt-0.5">Blueprint & Render</div>
                <div className="text-[11px] text-slate-400 mt-1">Instant toggle between wireframe & photo</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
