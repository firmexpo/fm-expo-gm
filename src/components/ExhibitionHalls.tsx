import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, Building2, MapPin, Award, ExternalLink, ChevronRight, CheckCircle2, Sparkles } from 'lucide-react';
import { PRODUCTION_COMPANIES, ProductionCompany } from '../data/companies';
import { DummyImage800x600 } from './DummyImage800x600';
import cncPhotoPath from '../assets/images/firmexpo_cnc_precision_1790276873230.jpg';
import hallPhotoPath from '../assets/images/firmexpo_exhibition_hall_1790276861742.jpg';

interface ExhibitionHallsProps {
  onSelectCompany: (company: ProductionCompany) => void;
  onOpenRegister: () => void;
}

const SECTORS = [
  'All Sectors',
  'CNC Machining',
  'Industrial Machinery',
  'Steel & Metals',
  'Medical Equipment',
  'Automotive',
  'Electronics',
];

export const ExhibitionHalls: React.FC<ExhibitionHallsProps> = ({
  onSelectCompany,
  onOpenRegister,
}) => {
  const [selectedSector, setSelectedSector] = useState<string>('All Sectors');
  const [searchQuery, setSearchQuery] = useState('');
  const [globalLayoutMode, setGlobalLayoutMode] = useState<'blueprint' | 'photo'>('blueprint');

  const filteredCompanies = PRODUCTION_COMPANIES.filter((company) => {
    const matchesSector =
      selectedSector === 'All Sectors' || company.sector === selectedSector;
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.capabilities.some((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.detail.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      company.equipment.some((eq) =>
        eq.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesSector && matchesSearch;
  });

  return (
    <section id="exhibition-halls" className="w-full bg-slate-100/70 dark:bg-[#0B1118] py-16 sm:py-20 border-b border-slate-200 dark:border-[#1E293B] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#FF6B00] mb-2 font-semibold">
              VIRTUAL CONVENTIONAL PAVILION
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight uppercase font-heading">
              Production Exhibition Stages
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-xl text-sm sm:text-base">
              Explore audited manufacturing partners. Standardized 800×600 stage layouts provide honest, direct visibility into real machines, materials, and tolerances.
            </p>
          </div>

          {/* Global Layout Switch & Register CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-white dark:bg-[#111A24] border border-slate-300 dark:border-[#223142] rounded shadow-2xs">
              <button
                type="button"
                onClick={() => setGlobalLayoutMode('blueprint')}
                className={`px-3 py-1.5 text-xs font-mono uppercase transition-colors cursor-pointer rounded ${
                  globalLayoutMode === 'blueprint'
                    ? 'bg-[#FF6B00] text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                800×600 Dummy Layouts
              </button>
              <button
                type="button"
                onClick={() => setGlobalLayoutMode('photo')}
                className={`px-3 py-1.5 text-xs font-mono uppercase transition-colors cursor-pointer rounded ${
                  globalLayoutMode === 'photo'
                    ? 'bg-[#FF6B00] text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Stage Renders
              </button>
            </div>

            <button
              type="button"
              onClick={onOpenRegister}
              className="px-4 py-2 text-xs font-bold text-slate-800 dark:text-white bg-white dark:bg-[#172230] hover:bg-slate-50 dark:hover:bg-[#1E2D3E] border border-slate-300 dark:border-[#2A3C4F] rounded transition-colors uppercase tracking-wider cursor-pointer shadow-2xs"
            >
              Add Your Facility
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-[#1E293B]">
          
          {/* Sector Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {SECTORS.map((sector) => {
              const isSelected = selectedSector === sector;
              return (
                <button
                  key={sector}
                  type="button"
                  onClick={() => setSelectedSector(sector)}
                  className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap rounded transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-[#0B1118] font-bold shadow-xs'
                      : 'bg-white dark:bg-[#121B25] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#172330] border border-slate-300 dark:border-[#1E2A38]'
                  }`}
                >
                  {sector}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search equipment, alloys, tolerances..."
              className="w-full pl-9 pr-4 py-1.5 text-xs text-slate-900 dark:text-slate-200 bg-white dark:bg-[#111A24] border border-slate-300 dark:border-[#223142] rounded placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#FF6B00]"
            />
          </div>
        </div>

        {/* Company Booth Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => {
            // Assign photograph for render mode
            const photo = company.sector === 'CNC Machining' ? cncPhotoPath : hallPhotoPath;

            return (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  boxShadow: '0 0 25px rgba(255, 107, 0, 0.22), 0 10px 30px rgba(0, 0, 0, 0.08)',
                  borderColor: '#FF6B00',
                  transition: { duration: 0.22, ease: 'easeOut' },
                }}
                className="group flex flex-col bg-white dark:bg-[#111A24] border border-slate-200 dark:border-[#223142] rounded-lg overflow-hidden transition-colors shadow-2xs dark:shadow-none"
              >
                {/* 800x600 Standardized Dummy Image Frame */}
                <div className="relative">
                  <DummyImage800x600
                    title={company.name}
                    subtitle={`${company.sector.toUpperCase()} // ${company.capabilities[0]?.metric || '±0.002 MM'}`}
                    sector={company.sector.toUpperCase()}
                    imageSrc={globalLayoutMode === 'photo' ? photo : undefined}
                    showToggle={true}
                    onExpand={() => onSelectCompany(company)}
                  />
                </div>

                {/* Booth Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata Line with typographic separators */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono mb-2">
                      <span className="text-[#FF6B00] font-semibold">{company.sector}</span>
                      <span aria-hidden="true">·</span>
                      <span>Est. {company.established}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate max-w-[120px]">{company.location.split('&')[0]}</span>
                    </div>

                    {/* Company Name */}
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-[#FF6B00] transition-colors font-heading">
                      {company.name}
                    </h3>

                    {/* Tagline */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-1 line-clamp-1">
                      {company.tagline}
                    </p>

                    {/* Key Technical Capabilities Matrix */}
                    <div className="mt-4 pt-3 border-t border-slate-200 dark:border-[#1C2836] space-y-2">
                      {company.capabilities.slice(0, 2).map((cap, i) => (
                        <div key={i} className="flex items-baseline justify-between text-xs">
                          <span className="text-slate-500 dark:text-slate-400 truncate max-w-[170px]">{cap.name}:</span>
                          <span className="font-mono text-slate-800 dark:text-slate-200 text-[11px] font-semibold tabular-nums ml-2">
                            {cap.metric}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Verified Certifications Line (Unboxed Text, No Pills) */}
                    <div className="mt-3.5 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                      <span className="truncate">{company.certifications.join(' · ')}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-4 border-t border-slate-200 dark:border-[#1C2836] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectCompany(company)}
                      className="w-full py-2 px-3 text-xs font-semibold text-slate-800 dark:text-white bg-slate-100 dark:bg-[#172230] group-hover:bg-[#FF6B00] group-hover:text-white border border-slate-300 dark:border-[#293B4E] group-hover:border-[#FF6B00] rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-none"
                    >
                      <span>Enter Digital Booth</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#FF6B00] group-hover:text-white transition-colors" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-16 bg-[#111A24] border border-[#223142] rounded-lg">
            <Building2 className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <div className="text-base font-bold text-white">No Production Facilities Found</div>
            <div className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              We couldn't find matches for "{searchQuery}". Try browsing by another manufacturing sector or reset your search.
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedSector('All Sectors');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-mono text-white bg-[#FF6B00] hover:bg-[#E55F00] rounded cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
