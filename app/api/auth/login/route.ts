import { NextResponse } from 'next/server';
import { findUser } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Look up user in local JSON db
    const user = findUser(email);

    if (user && user.password === password) {
      const response = NextResponse.json({ 
        message: 'Login successful',
        user: { name: user.name, email: user.email }
      }, { status: 200 });

      // Set cookie based on email
      response.cookies.set('auth_token', 'token_' + Buffer.from(email).toString('base64'), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600, // 1 hour
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
