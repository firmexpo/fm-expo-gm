import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Factory, Clock, ArrowRight } from 'lucide-react';

export const RegisterBoothSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    industrySector: 'CNC Machining',
    facilityLocation: '',
    contactName: '',
    businessEmail: '',
    phone: '',
    certifications: 'ISO 9001:2015',
    primaryMachines: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.businessEmail || !formData.contactName) return;
    setSubmitted(true);
  };

  return (
    <section id="register-booth" className="w-full bg-slate-50 dark:bg-[#0E1622] py-16 sm:py-20 border-b border-slate-200 dark:border-[#1E293B] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Value Proposition & Criteria */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#FF6B00] mb-2 font-semibold">
                STAGE APPLICATION & ONBOARDING
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight uppercase leading-tight font-heading">
                Put Your Production Business On Display.
              </h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Join a curated global ecosystem of verified precision manufacturers, fabricators, and engineering firms. Bring your machine park, team, and components into direct view of global tier-1 buyers.
              </p>
            </div>

            {/* Checklist of what's provided on FirmExpo */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-none bg-[#FF6B00] text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">Dedicated 800×600 Digital Exhibition Stage</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Standardized engineering showcase highlighting your tightest tolerances and flagship components.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-none bg-[#FF6B00] text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">Direct-to-Engineering Inbound RFQ Engine</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    No middleman commissions. CAD files and drawings delivered straight to your estimating team.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-none bg-[#FF6B00] text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">Global Procurement Visibility 365 Days a Year</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Continuous searchability by machine type, alloy capability, and ISO certifications.
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Guarantee */}
            <div className="p-4 bg-white dark:bg-[#111A24] border border-slate-200 dark:border-[#223142] rounded text-xs text-slate-600 dark:text-slate-300 shadow-2xs dark:shadow-none">
              <div className="text-[#FF6B00] font-mono font-semibold mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
                ADMISSION STANDARDS
              </div>
              FirmExpo reviews machine tolerances, physical facility footprints, and quality management accreditations before publishing any company to the master conventional floor.
            </div>
          </div>

          {/* Right Column: Lead Capture Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#111A24] border border-slate-200 dark:border-[#223142] p-6 sm:p-8 rounded-lg shadow-sm dark:shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 bg-[#142A1D] border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto rounded">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
                  Facility Application Received
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{formData.contactName}</span>. Your facility application for <span className="text-[#FF6B00] font-semibold">{formData.companyName}</span> has been queued for engineering audit.
                </p>
                <div className="p-4 bg-[#0B1118] border border-[#1E293B] rounded max-w-md mx-auto text-left font-mono text-xs text-slate-400 space-y-1">
                  <div>APPLICATION ID: <span className="text-slate-200">FX-STAGE-2026-9481</span></div>
                  <div>AUDIT WINDOW: <span className="text-slate-200">2 Business Days</span></div>
                  <div>CORRESPONDENCE: <span className="text-slate-200">{formData.businessEmail}</span></div>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2 text-xs font-mono uppercase bg-[#16212E] hover:bg-[#202E3E] text-slate-200 border border-[#2B3E52] rounded cursor-pointer"
                >
                  Submit Another Facility
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-200 dark:border-[#1E2A38] pb-4 mb-4">
                  <div className="text-xs font-mono text-[#FF6B00] uppercase font-semibold">
                    REGISTRATION PROTOCOL
                  </div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight mt-0.5 font-heading">
                    Exhibit on FirmExpo Digital Stage
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1 font-semibold">
                      Production Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Apex Precision Machining Ltd."
                      className="w-full px-3.5 py-2.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-[#0B1118] border border-slate-300 dark:border-[#223142] rounded focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1 font-semibold">
                      Primary Industry Sector *
                    </label>
                    <select
                      value={formData.industrySector}
                      onChange={(e) => setFormData({ ...formData, industrySector: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-[#0B1118] border border-slate-300 dark:border-[#223142] rounded focus:outline-none focus:border-[#FF6B00]"
                    >
                      <option value="CNC Machining">CNC Machining & Milling</option>
                      <option value="Industrial Machinery">Industrial Machinery & Automation</option>
                      <option value="Steel & Metals">Steel, Forging & Fabrication</option>
                      <option value="Medical Equipment">Medical Equipment & Cleanrooms</option>
                      <option value="Automotive">Automotive & Powertrains</option>
                      <option value="Electronics">Electronics & Hardware Telemetry</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1 font-semibold">
                      Facility Location / City & Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.facilityLocation}
                      onChange={(e) => setFormData({ ...formData, facilityLocation: e.target.value })}
                      placeholder="e.g. Stuttgart, Germany"
                      className="w-full px-3.5 py-2.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-[#0B1118] border border-slate-300 dark:border-[#223142] rounded focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1 font-semibold">
                      Quality Certifications
                    </label>
                    <input
                      type="text"
                      value={formData.certifications}
                      onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                      placeholder="e.g. ISO 9001, AS9100D, ISO 13485"
                      className="w-full px-3.5 py-2.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-[#0B1118] border border-slate-300 dark:border-[#223142] rounded focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1 font-semibold">
                      Technical / Executive Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="e.g. Marcus Weber (Head of Operations)"
                      className="w-full px-3.5 py-2.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-[#0B1118] border border-slate-300 dark:border-[#223142] rounded focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1 font-semibold">
                      Corporate Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.businessEmail}
                      onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                      placeholder="m.weber@apex-precision.com"
                      className="w-full px-3.5 py-2.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-[#0B1118] border border-slate-300 dark:border-[#223142] rounded focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1 font-semibold">
                    Key Machinery & Production Capabilities
                  </label>
                  <textarea
                    rows={2}
                    value={formData.primaryMachines}
                    onChange={(e) => setFormData({ ...formData, primaryMachines: e.target.value })}
                    placeholder="List core equipment (e.g. 5-axis CNC centers, fiber lasers, press tonnage, CMM inspection, maximum envelope)..."
                    className="w-full px-3.5 py-2.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-[#0B1118] border border-slate-300 dark:border-[#223142] rounded focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 text-xs sm:text-sm font-bold text-white bg-[#FF6B00] hover:bg-[#E55F00] rounded transition-colors uppercase tracking-wider cursor-pointer shadow-xs font-heading"
                  >
                    Submit Production Facility for Stage Review
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
