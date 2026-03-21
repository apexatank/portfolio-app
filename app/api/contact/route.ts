import { NextResponse } from 'next/server';
import { getPortfolio, updatePortfolio } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const portfolio = await getPortfolio();
    const messages = portfolio.messages || [];
    
    const newMessage = {
      name,
      email,
      message,
      date: new Date().toISOString()
    };
    
    messages.unshift(newMessage); // Add to the beginning
    
    await updatePortfolio({ messages });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
