import { NextResponse } from 'next/server';
import { findUser, createUser } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Check if user exists
    if (await findUser(email)) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 400 });
    }

    // Create the new user
    // Note: In a production app, this password should be hashed securely (e.g., using bcrypt).
    await createUser({ name, email, password });

    const response = NextResponse.json({ 
      message: 'Sign up successful',
      user: { name, email }
    }, { status: 201 });

    // Set genuine session token
    response.cookies.set('auth_token', 'token_' + Buffer.from(email).toString('base64'), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600, // 1 hour
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
