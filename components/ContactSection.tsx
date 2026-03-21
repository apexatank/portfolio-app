'use client';

import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ScrollReveal';

export function ContactSection({ accentBg, accentText, accentShadow, darkMode = false }: { accentBg: string, accentText: string, accentShadow: string, darkMode?: boolean }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <ScrollReveal direction="left">
            <h2 className={`text-4xl font-extrabold mb-6 transition-colors duration-500 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Let's build something <span className={accentText}>together.</span></h2>
            <p className={`text-lg mb-8 transition-colors duration-500 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Ready to start your next big project? Send me a message and let's discuss how I can help.</p>
            
            <div className="space-y-4">
               {[
                 { icon: Mail, label: 'Email', value: 'hello@example.com' },
                 { icon: Send, label: 'Location', value: 'San Francisco, CA' }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-4">
                   <div className={`h-12 w-12 rounded-xl flex items-center justify-center transition-colors duration-500 ${darkMode ? 'bg-slate-800' : (accentBg + '/10')}`}>
                      <item.icon className={`h-6 w-6 ${accentText}`} />
                   </div>
                   <div>
                     <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
                     <p className={`font-semibold transition-colors duration-500 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.value}</p>
                   </div>
                 </div>
               ))}
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="right">
          <form onSubmit={handleSubmit} className={`p-8 rounded-3xl shadow-xl space-y-4 border transition-all duration-500 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-100'}`}>
            {status === 'success' ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in">
                <div className={`h-16 w-16 ${accentBg} text-white rounded-full flex items-center justify-center mx-auto shadow-lg`}>
                   <Send className="h-8 w-8" />
                </div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Message Sent!</h3>
                <p className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Thanks for reaching out. I'll get back to you soon.</p>
                <Button type="button" variant="outline" onClick={() => setStatus('idle')} className={darkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}>Send another</Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className={`text-sm font-bold ${darkMode ? 'text-slate-400' : 'text-slate-700'}`}>Your Name</label>
                    <input 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={`w-full h-12 px-4 rounded-xl transition-all border duration-500 ${darkMode ? 'bg-slate-900 border-slate-800 text-white focus:ring-slate-700' : 'bg-slate-50 border-slate-100 focus:ring-primary/20'}`} 
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-sm font-bold ${darkMode ? 'text-slate-400' : 'text-slate-700'}`}>Email Address</label>
                    <input 
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full h-12 px-4 rounded-xl transition-all border duration-500 ${darkMode ? 'bg-slate-900 border-slate-800 text-white focus:ring-slate-700' : 'bg-slate-50 border-slate-100 focus:ring-primary/20'}`} 
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={`text-sm font-bold ${darkMode ? 'text-slate-400' : 'text-slate-700'}`}>Message</label>
                  <textarea 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className={`w-full h-32 p-4 rounded-xl transition-all border duration-500 ${darkMode ? 'bg-slate-900 border-slate-800 text-white focus:ring-slate-700' : 'bg-slate-50 border-slate-100 focus:ring-primary/20'} resize-none`} 
                    placeholder="Tell me about your project..."
                  />
                </div>
                <Button 
                  disabled={status === 'loading'}
                  className={`w-full h-12 text-lg font-bold rounded-xl shadow-lg ${accentShadow} ${accentBg} transition-all active:scale-95`}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </Button>
                {status === 'error' && <p className="text-red-500 text-sm py-2">Failed to send message. Please try again.</p>}
              </>
            )}
          </form>
        </ScrollReveal>
      </div>
    </div>
  );
}
