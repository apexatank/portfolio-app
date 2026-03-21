import React from 'react';
import { getPortfolio } from '@/lib/db';
import PortfolioLanding from '@/components/PortfolioLanding';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  // Safe to call fs/db here because this is a Server Component
  const portfolio = await getPortfolio();
  
  return (
    <PortfolioLanding portfolio={portfolio} />
  );
}
