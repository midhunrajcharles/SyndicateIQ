'use client';

import { PremiumHero } from '@/components/premium-hero';
import { FloatingStats } from '@/components/floating-stats';
import { AnalyticsPreview } from '@/components/analytics-preview';
import { FeatureGrid } from '@/components/feature-grid';
import { TrustStrip } from '@/components/trust-strip';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <PremiumHero />
      <FloatingStats />
      <AnalyticsPreview />
      <FeatureGrid />
      <TrustStrip />
    </div>
  );
}
