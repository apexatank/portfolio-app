'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { AlertCircle, Hexagon } from 'lucide-react';

const themeAccentClasses: Record<string, string> = {
  blue: 'bg-blue-500 border-blue-500 hover:bg-blue-600',
  indigo: 'bg-indigo-600 border-indigo-600 hover:bg-indigo-700',
  violet: 'bg-violet-600 border-violet-600 hover:bg-violet-700',
  emerald: 'bg-emerald-600 border-emerald-600 hover:bg-emerald-700',
  rose: 'bg-rose-600 border-rose-600 hover:bg-rose-700',
  amber: 'bg-amber-600 border-amber-600 hover:bg-amber-700'
};

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('blue');
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  React.useEffect(() => {
    fetch('/api/portfolio').then(r => r.json()).then(data => {
      if (data.theme) setTheme(data.theme);
      if (data.darkMode !== undefined) setDarkMode(data.darkMode);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/dashboard');
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 transition-colors duration-500 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <Link href="/" className="mb-8 flex items-center gap-2 group">
        <div className={`h-10 w-10 ${themeAccentClasses[theme].split(' ')[0]} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
           <Hexagon className="h-6 w-6" />
        </div>
        <span className={`text-2xl font-black tracking-tighter transition-colors duration-500 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Portfolio Editor</span>
      </Link>

      <Card className={`w-full max-w-sm shadow-2xl border-t-4 transition-all duration-500 ${themeAccentClasses[theme].split(' ')[1]} ${darkMode ? 'bg-slate-900 border-x-slate-800 border-b-slate-800' : 'bg-white border-slate-100'}`}>
        <CardHeader className="space-y-1 text-center">
          <CardTitle className={`text-2xl font-bold transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>Welcome Back</CardTitle>
          <CardDescription className={darkMode ? 'text-slate-400' : ''}>
            Enter your credentials to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}
          
          <div className={`p-3 rounded-md border text-xs transition-colors ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-muted text-slate-600'}`}>
            <p className="font-semibold mb-1">Testing Credentials:</p>
            <p>You can use your newly registered account, or login with:</p>
            <p>Email: <span className="font-mono">test@example.com</span></p>
            <p>Pass: <span className="font-mono">password123</span></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className={darkMode ? 'text-slate-400' : ''}>Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                className={`transition-colors duration-500 ${darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500' : ''}`}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className={darkMode ? 'text-slate-400' : ''}>Password</Label>
                <Link href="#" className={`text-xs hover:underline transition-colors ${darkMode ? 'text-slate-500' : 'text-primary'}`}>
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className={`transition-colors duration-500 ${darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500' : ''}`}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className={`w-full h-11 text-lg font-bold rounded-xl active:scale-95 transition-all ${themeAccentClasses[theme]}`} disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className={`flex flex-wrap justify-center gap-1 text-sm pt-0 transition-colors ${darkMode ? 'text-slate-500' : 'text-muted-foreground'}`}>
          <span>Don't have an account?</span>
          <Link href="/signup" className={`font-medium hover:underline transition-colors ${darkMode ? 'text-slate-300' : 'text-primary'}`}>
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
