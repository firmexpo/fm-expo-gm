import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VisualJourney } from './components/VisualJourney';
import { ExhibitionHalls } from './components/ExhibitionHalls';
import { BlueprintSpecsSection } from './components/BlueprintSpecsSection';
import { ExhibitionInsights } from './components/ExhibitionInsights';
import { BrandKitStudio } from './components/BrandKitStudio';
import { RegisterBoothSection } from './components/RegisterBoothSection';
import { Footer } from './components/Footer';
import { CompanyBoothModal } from './components/CompanyBoothModal';
import { PRODUCTION_COMPANIES, ProductionCompany } from './data/companies';

export default function App() {
  const [selectedCompany, setSelectedCompany] = useState<ProductionCompany | null>(null);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenRegister = () => {
    handleNavigate('register-booth');
  };

  const handleSelectBoothDetail = (companyId: string) => {
    const found = PRODUCTION_COMPANIES.find((c) => c.id === companyId);
    if (found) {
      setSelectedCompany(found);
    } else {
      handleNavigate('exhibition-halls');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1118] text-slate-900 dark:text-[#E2E8F0] flex flex-col font-sans selection:bg-[#FF6B00] selection:text-white transition-colors">
      {/* 1-Row 3-Zone Top Bar Navigation */}
      <Navbar
        onNavigate={handleNavigate}
        onOpenRegister={handleOpenRegister}
      />

      <main className="flex-1">
        {/* Master Stage Hero: "YOUR BUSINESS ON DISPLAY" */}
        <HeroSection
          onExploreBooths={() => handleNavigate('exhibition-halls')}
          onRegisterClick={handleOpenRegister}
          onOpenBrandKit={() => handleNavigate('brand-kit')}
          onSelectBoothDetail={handleSelectBoothDetail}
        />

        {/* 5-Phase Visual Journey: Business → Visibility → Presentation → Opportunity → Growth */}
        <VisualJourney />

        {/* Digital Exhibition Halls (with 800x600 dummy layout standard) */}
        <ExhibitionHalls
          onSelectCompany={(company) => setSelectedCompany(company)}
          onOpenRegister={handleOpenRegister}
        />

        {/* Blueprint & 800x600 Dimensional Layout Architecture */}
        <BlueprintSpecsSection />

        {/* Data-Driven Exhibition Insights Section (Recharts) */}
        <ExhibitionInsights />

        {/* High-Resolution Social-Media-Ready Brand Visual Studio */}
        <BrandKitStudio />

        {/* Production Business Onboarding & Registration */}
        <RegisterBoothSection />
      </main>

      {/* Quiet Corporate Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenRegister={handleOpenRegister}
      />

      {/* Interactive Company Booth Inspection Modal */}
      <CompanyBoothModal
        company={selectedCompany}
        onClose={() => setSelectedCompany(null)}
      />
    </div>
  );
}
