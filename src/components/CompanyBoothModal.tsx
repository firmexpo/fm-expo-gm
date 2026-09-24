import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Cpu, Send, Layers, MapPin, Calendar, FileText, ChevronRight, Box } from 'lucide-react';
import { ProductionCompany } from '../data/companies';
import { DummyImage800x600 } from './DummyImage800x600';
import { ComponentModel3D } from './ComponentModel3D';
import cncPhotoPath from '../assets/images/firmexpo_cnc_precision_1790276873230.jpg';

interface CompanyBoothModalProps {
  company: ProductionCompany | null;
  onClose: () => void;
}

export const CompanyBoothModal: React.FC<CompanyBoothModalProps> = ({ company, onClose }) => {
  const [rfqSubmitted, setRfqSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    buyerName: '',
    buyerEmail: '',
    partNumber: '',
    materialSpec: '',
    estimatedQuantity: '500',
    notes: '',
  });

  if (!company) return null;

  const handleSubmitRfq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.buyerName || !formData.buyerEmail) return;
    setRfqSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-5xl bg-[#0E1622] border border-[#223142] rounded-lg shadow-2xl text-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#090F16] border-b border-[#202E3E]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#FF6B00] font-semibold tracking-wider uppercase">
              DIGITAL EXHIBITION BOOTH #{company.id.toUpperCase()}
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              FIRMEXPO CONVENTIONAL PLATFORM
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-[#1E293B] rounded transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Company Header Block */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-[#1E2A3A]">
            <div>
              {/* Unboxed Metadata Line */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                <span className="text-[#FF6B00] font-bold">{company.sector}</span>
                <span aria-hidden="true">·</span>
                <span>{company.location}</span>
                <span aria-hidden="true">·</span>
                <span>Facility: {company.facilitySize}</span>
                <span aria-hidden="true">·</span>
                <span>Est. {company.established}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {company.name}
              </h2>
              <p className="text-sm font-medium text-slate-300 mt-1">
                {company.tagline}
              </p>
            </div>

            {/* Certifications Box */}
            <div className="bg-[#121B26] border border-[#223142] p-3.5 rounded text-xs font-mono shrink-0">
              <div className="text-[#FF6B00] font-semibold mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
                AUDITED CERTIFICATIONS
              </div>
              <div className="text-slate-300 space-y-0.5">
                {company.certifications.map((c, i) => (
                  <div key={i}>✓ {c}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Standardized 800x600 Stage Showcase Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <div className="p-2 bg-[#090F16] border border-[#202E3E] rounded">
                <DummyImage800x600
                  title={company.name}
                  subtitle={`${company.sector} // MACHINE PARK ACTIVE`}
                  sector={company.sector.toUpperCase()}
                  imageSrc={cncPhotoPath}
                  showToggle={true}
                />
              </div>
              <div className="mt-2 text-xs font-mono text-slate-400 flex items-center justify-between px-1">
                <span>LAYOUT SPEC: 800 × 600 PIXEL VIEWPORT</span>
                <span>TOLERANCE: {company.capabilities[0]?.metric || '±0.002 MM'}</span>
              </div>
            </div>

            {/* Overview & Engineering Ambition */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-5">
              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Company Mission & Capabilities
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {company.overview}
                </p>
              </div>

              <div className="p-4 bg-[#14202E] border-l-2 border-[#FF6B00] border-y border-r border-[#223142] rounded-r">
                <div className="text-xs font-mono text-[#FF6B00] font-semibold mb-1 uppercase">
                  Manufacturing Ambition
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {company.ambition}
                </p>
              </div>

              <div className="pt-2">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Active Machine Park
                </div>
                <div className="space-y-1.5">
                  {company.equipment.map((eq, i) => (
                    <div key={i} className="text-xs text-slate-300 flex items-center gap-2 font-mono">
                      <span className="w-1.5 h-1.5 bg-[#FF6B00] rounded-none shrink-0" />
                      <span>{eq}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Key Components on Stage (800x600 ratio cards & 3D Interactive CAD) */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#FF6B00]" />
                <span>Flagship Manufactured Components (Interactive 3D Stage)</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">ROTATABLE CAD SPEC</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {company.keyProducts.map((prod, idx) => {
                const modelType =
                  company.sector === 'CNC Machining'
                    ? 'cnc-blisk'
                    : company.sector === 'Steel & Metals'
                    ? 'titanium-ring'
                    : company.sector === 'Medical Equipment'
                    ? 'surgical-implant'
                    : 'stamping-die';

                return (
                  <div
                    key={prod.id}
                    className="bg-[#111A24] border border-[#223142] p-4 rounded-lg flex flex-col justify-between"
                  >
                    <div>
                      {/* Interactive 3D Component Viewer */}
                      <div className="mb-3">
                        <ComponentModel3D
                          modelType={modelType}
                          title={prod.name}
                          material={prod.material}
                          tolerance={prod.tolerance}
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                        <span className="text-[#FF6B00] font-semibold">{prod.category}</span>
                        <span className="tabular-nums">SPEC: {prod.spec}</span>
                      </div>
                      <div className="text-base font-bold text-white">{prod.name}</div>
                      
                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono bg-[#0B1118] p-2.5 rounded border border-[#1C2836]">
                        <div>
                          <span className="text-slate-400">Material:</span>
                          <div className="text-slate-200 font-semibold">{prod.material}</div>
                        </div>
                        <div>
                          <span className="text-slate-400">Tolerance:</span>
                          <div className="text-[#FF6B00] font-semibold">{prod.tolerance}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Technical RFQ / Direct Inquiry Form */}
          <div className="bg-[#111A24] border border-[#223142] p-6 rounded-lg">
            <h3 className="text-base font-bold text-white uppercase tracking-tight mb-1 flex items-center gap-2">
              <Send className="w-4 h-4 text-[#FF6B00]" />
              <span>Direct Engineering RFQ Channel</span>
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Submit your RFQ specifications directly to {company.name}'s chief estimator without intermediary commissions.
            </p>

            {rfqSubmitted ? (
              <div className="p-4 bg-[#0F2018] border border-[#1E4D2B] rounded text-emerald-300 text-xs">
                <div className="font-bold text-sm mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  RFQ Inbound Dispatched to Engineering Team
                </div>
                Your request for quotation has been delivered to {company.name}. The estimation desk responds within 24 business hours. A confirmation was sent to {formData.buyerEmail}.
              </div>
            ) : (
              <form onSubmit={handleSubmitRfq} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.buyerName}
                      onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                      placeholder="e.g. Sarah Jenkins (Procurement Mgr)"
                      className="w-full px-3 py-2 text-xs text-white bg-[#0B1118] border border-[#223142] rounded focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.buyerEmail}
                      onChange={(e) => setFormData({ ...formData, buyerEmail: e.target.value })}
                      placeholder="s.jenkins@aerodyne.com"
                      className="w-full px-3 py-2 text-xs text-white bg-[#0B1118] border border-[#223142] rounded focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Component Name / Part #
                    </label>
                    <input
                      type="text"
                      value={formData.partNumber}
                      onChange={(e) => setFormData({ ...formData, partNumber: e.target.value })}
                      placeholder="e.g. Turbine Impeller A-402"
                      className="w-full px-3 py-2 text-xs text-white bg-[#0B1118] border border-[#223142] rounded focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Alloy / Material
                    </label>
                    <input
                      type="text"
                      value={formData.materialSpec}
                      onChange={(e) => setFormData({ ...formData, materialSpec: e.target.value })}
                      placeholder="e.g. Titanium Gr 5 / 316L"
                      className="w-full px-3 py-2 text-xs text-white bg-[#0B1118] border border-[#223142] rounded focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Estimated Batch Qty
                    </label>
                    <input
                      type="text"
                      value={formData.estimatedQuantity}
                      onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                      placeholder="e.g. 500 pcs/year"
                      className="w-full px-3 py-2 text-xs text-white bg-[#0B1118] border border-[#223142] rounded focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Technical Scope & Drawing Specs
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Provide tolerance constraints, delivery timeframe, or CAD transfer link..."
                    className="w-full px-3 py-2 text-xs text-white bg-[#0B1118] border border-[#223142] rounded focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-mono text-slate-300 hover:text-white bg-[#16212E] rounded cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-[#FF6B00] hover:bg-[#E55F00] rounded transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    Transmit RFQ to Facility
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
