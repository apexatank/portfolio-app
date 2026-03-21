'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { AlertCircle, User, Mail, Lock, Hexagon } from 'lucide-react';

const themeAccentClasses: Record<string, string> = {
  blue: 'bg-blue-500 border-blue-500 hover:bg-blue-600',
  indigo: 'bg-indigo-600 border-indigo-600 hover:bg-indigo-700',
  violet: 'bg-violet-600 border-violet-600 hover:bg-violet-700',
  emerald: 'bg-emerald-600 border-emerald-600 hover:bg-emerald-700',
  rose: 'bg-rose-600 border-rose-600 hover:bg-rose-700',
  amber: 'bg-amber-600 border-amber-600 hover:bg-amber-700'
};

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/dashboard');
      } else {
        setError(data.message || 'Error signing up');
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
          <CardTitle className={`text-2xl font-bold transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>Create an Account</CardTitle>
          <CardDescription className={darkMode ? 'text-slate-400' : ''}>
            Join our platform to start building amazing apps
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm flex items-center gap-2 mb-4 animate-in fade-in zoom-in duration-200">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className={darkMode ? 'text-slate-400' : ''}>Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  className={`pl-9 transition-colors duration-500 ${darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500' : ''}`}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className={darkMode ? 'text-slate-400' : ''}>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  className={`pl-9 transition-colors duration-500 ${darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className={darkMode ? 'text-slate-400' : ''}>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className={`pl-9 transition-colors duration-500 ${darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500' : ''}`}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className={darkMode ? 'text-slate-400' : ''}>Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                className={`transition-colors duration-500 ${darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500' : ''}`}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className={`w-full h-11 text-lg font-bold rounded-xl active:scale-95 transition-all ${themeAccentClasses[theme]}`} disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className={`flex flex-wrap justify-center gap-1 text-sm pt-0 mt-2 transition-colors ${darkMode ? 'text-slate-500' : 'text-muted-foreground'}`}>
          <span>Already have an account?</span>
          <Link href="/login" className={`font-medium hover:underline transition-colors ${darkMode ? 'text-slate-300' : 'text-primary'}`}>
            Log in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
