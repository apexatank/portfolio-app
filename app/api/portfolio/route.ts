import { NextResponse } from 'next/server';
import { getPortfolio, updatePortfolio } from '@/lib/db';

export async function GET() {
  const data = await getPortfolio();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const updated = await updatePortfolio(data);
    return NextResponse.json({ message: 'Portfolio updated successfully', portfolioData: updated });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating portfolio' }, { status: 500 });
  }
}
