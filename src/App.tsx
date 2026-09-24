import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VisualJourney } from './components/VisualJourney';
import { ExhibitionHalls } from './components/ExhibitionHalls';
import { BlueprintSpecsSection } from './components/BlueprintSpecsSection';
import { BrandKitStudio } from './components/BrandKitStudio';
import { RegisterBoothSection } from './components/RegisterBoothSection';
import { Footer } from './components/Footer';
import { CompanyBoothModal } from './components/CompanyBoothModal';
import { ProductionCompany } from './data/companies';

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

  return (
    <div className="min-h-screen bg-[#0B1118] text-[#E2E8F0] flex flex-col font-sans selection:bg-[#FF6B00] selection:text-white">
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
