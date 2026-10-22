'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FirmExpoLogo } from '@/src/components/FirmExpoLogo';
import {
  Compass,
  Box,
  MapPin,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Search,
  ExternalLink,
  ChevronRight,
  Ticket
} from 'lucide-react';

const HALLS = [
  {
    id: 'hall-1',
    name: 'Hall 1: Advanced Precision & CNC Machining',
    status: 'ACTIVE · DOORS OPEN',
    boothCount: 42,
    leadExhibitor: 'NovaPrecision Manufacturing (Booth #A-104)',
    link: '/demo/nova-precision',
    description: '5-axis milling, aerospace superalloys, surgical micro-machining, sub-micron CMM metrology.',
    highlight: true,
  },
  {
    id: 'hall-2',
    name: 'Hall 2: Heavy Machinery, Forging & Foundry',
    status: 'SCHEDULED SESSIONS',
    boothCount: 28,
    leadExhibitor: 'Titan Heavy Forging & Die (Booth #B-201)',
    link: '/#exhibition-halls',
    description: 'Open-die drop forging, high-tonnage hydraulic presses, heat-treatment autoclaves.',
    highlight: false,
  },
  {
    id: 'hall-3',
    name: 'Hall 3: Industrial Robotics & Automation Systems',
    status: 'ACTIVE DEMOS',
    boothCount: 35,
    leadExhibitor: 'Apex Precision Gears & Drives (Booth #C-102)',
    link: '/#exhibition-halls',
    description: 'Planetary gearheads, automated workholding, cobot machine-tending cells.',
    highlight: false,
  },
];

export default function DemoDirectoryPage() {
  const [badgeChecked, setBadgeChecked] = useState(true);

  return (
    <div className="min-h-screen bg-[#04070D] text-[#E2E8F0] font-sans selection:bg-[#FF6B00] selection:text-white">
      
      {/* Convention Grand Concourse Header */}
      <header className="sticky top-0 z-40 bg-[#090E17]/95 backdrop-blur-md border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <FirmExpoLogo variant="on-dark" size="md" showTagline={true} />
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>DELEGATE BADGE ACTIVE · VIP BUYER</span>
            </div>

            <Link
              href="/"
              className="px-3.5 py-1.5 rounded text-xs font-mono uppercase bg-[#172230] hover:bg-[#1E2D3E] text-slate-200 border border-[#2B3B4E] transition-colors"
            >
              FirmExpo Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Main Concourse Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        
        {/* Concourse Welcome Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0E1622] via-[#090F16] to-[#04070D] border border-[#223142] p-6 sm:p-10 shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF6B00] uppercase font-bold tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
              INTERNATIONAL INDUSTRIAL FAIR · CONVENTION DIRECTORY
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              Virtual Trade Show Grand Concourse
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Welcome to the digital trade fair floor. Step through the entrance turnstiles to explore manufacturer stands with live 3D turntable plinths, overhead truss stage lighting, interactive brochure dispensers, and live engineering dialogs.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/demo/nova-precision"
                className="px-6 py-3 rounded bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-transform hover:scale-102 cursor-pointer"
              >
                <Box className="w-4 h-4" />
                <span>Enter Live Demo Stand (Booth #A-104)</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <Link
                href="/#exhibition-halls"
                className="px-5 py-3 rounded bg-[#172230] hover:bg-[#1E2D3E] text-slate-200 border border-[#2B3B4E] font-semibold text-xs uppercase tracking-wider transition-colors"
              >
                Browse All Production Companies
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Hall Pavilions Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
            <div>
              <div className="text-xs font-mono text-[#FF6B00] font-bold uppercase tracking-wider">
                EXPO PAVILION GATES
              </div>
              <h2 className="text-2xl font-extrabold text-white uppercase tracking-tight">
                Convention Exhibition Halls
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
              FIRMEXPO 2026 // ADMISSION INCLUDED
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {HALLS.map((hall) => (
              <div
                key={hall.id}
                className={`relative rounded-xl p-6 flex flex-col justify-between border transition-all ${
                  hall.highlight
                    ? 'bg-[#0E1622] border-[#FF6B00] shadow-[0_0_25px_rgba(255,107,0,0.18)]'
                    : 'bg-[#090F16] border-[#1E2B3A] hover:border-slate-500'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        hall.highlight
                          ? 'bg-[#FF6B00] text-white'
                          : 'bg-[#15202D] text-slate-300'
                      }`}
                    >
                      {hall.status}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {hall.boothCount} Booths
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                      {hall.name}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {hall.description}
                    </p>
                  </div>

                  <div className="pt-2 text-xs font-mono text-[#FF6B00]">
                    Featured Stand: <strong className="text-white">{hall.leadExhibitor}</strong>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#1C2836] mt-6">
                  <Link
                    href={hall.link}
                    className={`w-full py-2.5 px-4 rounded text-xs font-mono uppercase font-bold flex items-center justify-center gap-2 transition-colors ${
                      hall.highlight
                        ? 'bg-[#FF6B00] hover:bg-[#E55F00] text-white'
                        : 'bg-[#15202D] hover:bg-[#1E2E40] text-slate-200'
                    }`}
                  >
                    <span>Enter {hall.name.split(':')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delegate Pass & Accreditation Security Notice */}
        <div className="bg-[#090F17] border border-[#1E293B] rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#141F2D] border border-[#223348] flex items-center justify-center text-[#FF6B00] shrink-0">
              <Ticket className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-[#FF6B00] font-bold uppercase">
                ATTENDEE ACCREDITATION
              </div>
              <div className="text-sm font-bold text-white">
                Engineering Procurement & Specifier Badge Assigned
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Full access to all 3 halls, technical PDF brochures, 3D turntable inspection, and live RFQ submission.
              </div>
            </div>
          </div>

          <Link
            href="/demo/nova-precision"
            className="px-5 py-2.5 rounded bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Proceed to Booth #A-104 Stand</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>

    </div>
  );
}
