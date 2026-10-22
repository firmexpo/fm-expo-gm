'use client';

import React from 'react';
import { ExpoConventionHall } from '@/src/components/ExpoConventionHall';

export default function NovaPrecisionPage() {
  return (
    <div className="min-h-screen bg-[#04070D]">
      <ExpoConventionHall isStandalonePage={true} />
    </div>
  );
}
