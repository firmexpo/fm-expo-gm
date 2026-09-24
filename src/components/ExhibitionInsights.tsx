import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { TrendingUp, Globe2, Layers, ShieldCheck, Factory, ArrowUpRight, BarChart3, Users } from 'lucide-react';

// 1. Participation Growth Data (Production Businesses Staged over Time)
const PARTICIPATION_GROWTH_DATA = [
  { quarter: 'Q1 2024', facilities: 64, directRFQs: 280, volumeUSD: 8.2 },
  { quarter: 'Q2 2024', facilities: 118, directRFQs: 540, volumeUSD: 16.5 },
  { quarter: 'Q3 2024', facilities: 195, directRFQs: 920, volumeUSD: 28.0 },
  { quarter: 'Q4 2024', facilities: 280, directRFQs: 1450, volumeUSD: 44.5 },
  { quarter: 'Q1 2025', facilities: 390, directRFQs: 2180, volumeUSD: 68.0 },
  { quarter: 'Q2 2025', facilities: 520, directRFQs: 3100, volumeUSD: 98.4 },
  { quarter: 'Q3 2025', facilities: 690, directRFQs: 4250, volumeUSD: 135.0 },
  { quarter: 'Q4 2025', facilities: 890, directRFQs: 5800, volumeUSD: 182.5 },
  { quarter: 'Q1 2026', facilities: 1140, directRFQs: 7600, volumeUSD: 245.0 },
  { quarter: 'Q2 2026', facilities: 1420, directRFQs: 9940, volumeUSD: 318.0 },
];

// 2. Categories of Represented Manufacturing
const CATEGORY_DISTRIBUTION_DATA = [
  { name: '5-Axis CNC & Precision EDM', value: 34, count: 482, color: '#FF6B00' },
  { name: 'Industrial Machinery & Presses', value: 22, count: 312, color: '#FFFFFF' },
  { name: 'Forging, Steel & Superalloys', value: 16, count: 227, color: '#E2E8F0' },
  { name: 'Cleanroom Medical Implants', value: 12, count: 170, color: '#38BDF8' },
  { name: 'Automotive & EV Powertrains', value: 10, count: 142, color: '#F97316' },
  { name: 'Industrial Electronics & IoT', value: 6, count: 87, color: '#94A3B8' },
];

// 3. Global Reach Statistics (Procurement Inbound by Major Industrial Hubs)
const GLOBAL_REACH_DATA = [
  { region: 'DACH (Germany, Austria, CH)', procurementOfficers: 3820, activeRFQs: 2140, share: '32%' },
  { region: 'North America (US & Canada)', procurementOfficers: 3450, activeRFQs: 1980, share: '29%' },
  { region: 'Nordics & Western Europe', procurementOfficers: 2120, activeRFQs: 1250, share: '18%' },
  { region: 'Japan & South Korea', procurementOfficers: 1420, activeRFQs: 860, share: '12%' },
  { region: 'Australia & Others', procurementOfficers: 1080, activeRFQs: 610, share: '9%' },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomChartTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0B1118] border border-[#223142] p-3 rounded shadow-2xl text-xs font-mono">
        <div className="text-white font-bold mb-1.5 pb-1 border-b border-[#1E293B]">
          {label}
        </div>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4 py-0.5">
            <span style={{ color: entry.color || '#FF6B00' }}>{entry.name}:</span>
            <span className="text-slate-200 font-bold tabular-nums">
              {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
              {entry.unit || ''}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const ExhibitionInsights: React.FC = () => {
  const [metricTab, setMetricTab] = useState<'facilities' | 'rfqs' | 'volume'>('facilities');

  return (
    <section id="exhibition-insights" className="w-full bg-slate-50 dark:bg-[#0E1622] py-16 sm:py-20 border-b border-slate-200 dark:border-[#1E293B] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#FF6B00] mb-2 font-semibold">
              QUANTITATIVE ECOSYSTEM RIGOR
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight uppercase font-heading">
              Exhibition Platform Insights
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-2xl text-sm sm:text-base">
              Verified analytics tracking production business onboarding, represented industrial categories, and global enterprise procurement traffic across the 365-day conventional hub.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-[#111A24] border border-slate-300 dark:border-[#223142] px-4 py-2.5 rounded shrink-0 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
            <span>AUDITED CONVENTIONAL DATA · UPDATED Q2 2026</span>
          </div>
        </div>

        {/* 4 Quantitative Top Metric Anchors */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="p-5 bg-white dark:bg-[#111A24] border border-slate-200 dark:border-[#223142] rounded-lg shadow-2xs dark:shadow-none">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono uppercase">Staged Facilities</div>
            <div className="text-3xl font-black font-mono text-slate-900 dark:text-white mt-1 tabular-nums font-heading">1,420+</div>
            <div className="text-xs text-[#FF6B00] font-mono mt-1 font-semibold">↑ +122% YoY Expansion</div>
          </div>
          <div className="p-5 bg-white dark:bg-[#111A24] border border-slate-200 dark:border-[#223142] rounded-lg shadow-2xs dark:shadow-none">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono uppercase">Direct Technical RFQs</div>
            <div className="text-3xl font-black font-mono text-[#FF6B00] mt-1 tabular-nums font-heading">9,940+</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">Zero intermediary margins</div>
          </div>
          <div className="p-5 bg-white dark:bg-[#111A24] border border-slate-200 dark:border-[#223142] rounded-lg shadow-2xs dark:shadow-none">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono uppercase">Enterprise Procurement Teams</div>
            <div className="text-3xl font-black font-mono text-slate-900 dark:text-white mt-1 tabular-nums font-heading">11,890</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">From aerospace, medical & energy</div>
          </div>
          <div className="p-5 bg-white dark:bg-[#111A24] border border-slate-200 dark:border-[#223142] rounded-lg shadow-2xs dark:shadow-none">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono uppercase">Estimated Inbound Value</div>
            <div className="text-3xl font-black font-mono text-slate-900 dark:text-white mt-1 tabular-nums font-heading">$318M</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">Contract allocations staged</div>
          </div>
        </div>

        {/* Visual Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          
          {/* Chart 1: Participation Growth Over Time (8 Cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-[#111A24] border border-slate-200 dark:border-[#223142] p-6 rounded-lg shadow-2xs dark:shadow-none">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-[#1E293B]">
              <div>
                <div className="text-xs font-mono uppercase text-[#FF6B00] font-semibold">
                  CHART 01 // TRAJECTORY
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight mt-0.5 font-heading">
                  Production Facility Growth & Procurement Flow
                </h3>
              </div>

              {/* Metric Switcher */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#090F16] p-1 rounded border border-slate-300 dark:border-[#1E2B3A] text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setMetricTab('facilities')}
                  className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                    metricTab === 'facilities'
                      ? 'bg-[#FF6B00] text-white font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Facilities
                </button>
                <button
                  type="button"
                  onClick={() => setMetricTab('rfqs')}
                  className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                    metricTab === 'rfqs'
                      ? 'bg-[#FF6B00] text-white font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Direct RFQs
                </button>
                <button
                  type="button"
                  onClick={() => setMetricTab('volume')}
                  className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                    metricTab === 'volume'
                      ? 'bg-[#FF6B00] text-white font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Volume ($M)
                </button>
              </div>
            </div>

            {/* Recharts Area / Bar Chart */}
            <div className="w-full h-72 sm:h-80 select-none">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={PARTICIPATION_GROWTH_DATA}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2A38" vertical={false} />
                  <XAxis
                    dataKey="quarter"
                    stroke="#64748B"
                    tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'monospace' }}
                    tickLine={false}
                    axisLine={{ stroke: '#223142' }}
                  />
                  <YAxis
                    stroke="#64748B"
                    tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'monospace' }}
                    tickLine={false}
                    axisLine={{ stroke: '#223142' }}
                  />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey={
                      metricTab === 'facilities'
                        ? 'facilities'
                        : metricTab === 'rfqs'
                        ? 'directRFQs'
                        : 'volumeUSD'
                    }
                    name={
                      metricTab === 'facilities'
                        ? 'Staged Facilities'
                        : metricTab === 'rfqs'
                        ? 'Direct Technical RFQs'
                        : 'Contract Volume ($M)'
                    }
                    stroke="#FF6B00"
                    strokeWidth={2.5}
                    fill="#FF6B00"
                    fillOpacity={0.15}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1C2836] flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#FF6B00] rounded-none inline-block" />
                <span>CONTINUOUS CONVENTIONAL INGESTION ENGINE</span>
              </span>
              <span>DATA SOURCE: FIRMEXPO AUDITED LEDGER</span>
            </div>
          </div>

          {/* Chart 2: Categories of Represented Manufacturing (4 Cols) */}
          <div className="lg:col-span-4 bg-white dark:bg-[#111A24] border border-slate-200 dark:border-[#223142] p-6 rounded-lg shadow-2xs dark:shadow-none">
            <div className="mb-4 pb-4 border-b border-slate-200 dark:border-[#1E293B]">
              <div className="text-xs font-mono uppercase text-[#FF6B00] font-semibold">
                CHART 02 // SECTORS
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight mt-0.5 font-heading">
                Represented Manufacturing
              </h3>
            </div>

            {/* Donut Chart */}
            <div className="w-full h-52 relative select-none">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_DISTRIBUTION_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {CATEGORY_DISTRIBUTION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#111A24" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black font-mono text-slate-900 dark:text-white font-heading">100%</span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-semibold">AUDITED</span>
              </div>
            </div>

            {/* Category Breakdown Legend */}
            <div className="space-y-2 mt-4 pt-3 border-t border-slate-200 dark:border-[#1C2836]">
              {CATEGORY_DISTRIBUTION_DATA.map((cat, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate max-w-[190px]">
                    <span
                      className="w-2 h-2 shrink-0 rounded-none"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-slate-700 dark:text-slate-300 truncate font-medium">{cat.name}</span>
                  </div>
                  <div className="font-mono text-slate-900 dark:text-slate-200 tabular-nums font-semibold">
                    {cat.value}% <span className="text-slate-400 dark:text-slate-500 font-normal">({cat.count})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Global Reach Statistics Table & Bar Breakdown */}
        <div className="bg-white dark:bg-[#111A24] border border-slate-200 dark:border-[#223142] p-6 rounded-lg shadow-2xs dark:shadow-none">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-[#1E293B]">
            <div>
              <div className="text-xs font-mono uppercase text-[#FF6B00] font-semibold">
                CHART 03 // GLOBAL LOGISTICS & INBOUND
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight mt-0.5 font-heading">
                Global Procurement Reach by Industrial Region
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400">
              <Globe2 className="w-4 h-4 text-[#FF6B00]" />
              <span>42 NATIONS ENGAGED</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Recharts Horizontal Bar */}
            <div className="lg:col-span-6 h-64 select-none">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={GLOBAL_REACH_DATA}
                  margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#94A3B8" opacity={0.25} horizontal={false} />
                  <XAxis
                    type="number"
                    stroke="#64748B"
                    tick={{ fill: '#64748B', fontSize: 10, fontFamily: 'monospace' }}
                    tickLine={false}
                    axisLine={{ stroke: '#CBD5E1' }}
                  />
                  <YAxis
                    type="category"
                    dataKey="region"
                    stroke="#64748B"
                    width={130}
                    tick={{ fill: '#334155', fontSize: 11, fontWeight: 500 }}
                    tickLine={false}
                    axisLine={{ stroke: '#CBD5E1' }}
                  />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Bar
                    dataKey="procurementOfficers"
                    name="Procurement Officers"
                    fill="#FF6B00"
                    radius={[0, 2, 2, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Quantitative Region Breakdown Table */}
            <div className="lg:col-span-6">
              <div className="divide-y divide-slate-200 dark:divide-[#1C2836] font-mono text-xs">
                {GLOBAL_REACH_DATA.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <div>
                      <div className="text-slate-900 dark:text-white font-bold">{item.region}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {item.activeRFQs.toLocaleString()} Live Active RFQ Drawings
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-700 dark:text-slate-200 font-semibold">{item.procurementOfficers.toLocaleString()} Officers</div>
                      <div className="text-[#FF6B00] font-bold">{item.share} Volume</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
