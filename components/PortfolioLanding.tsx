"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/ScrollReveal';
import { AnimatedText } from '@/components/AnimatedText';
import { 
  Hexagon, 
  Sparkles,
  User,
  Coffee,
  Briefcase,
  Lightbulb,
  Plus,
  Square,
  Twitter,
  Github,
  Linkedin,
  Instagram,
  Mail,
  Quote,
  Send,
  ExternalLink,
  Calendar,
  History as HistoryIcon,
  Palette,
  Video,
  PenTool,
  Camera,
  Layout,
  ChevronDown,
  Eye, 
  TrendingUp,
  Loader2,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactSection } from '@/components/ContactSection';
import { TestimonialsSlider } from '@/components/TestimonialsSlider';

export default function PortfolioLanding({ portfolio }: { portfolio: any }) {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [message, setMessage] = React.useState({ text: '', type: '' });
  // Format arrays
  const skillsList = portfolio.skills ? portfolio.skills.split(',').map((s: string) => s.trim()).filter(Boolean) : [];
  const projectsList = Array.isArray(portfolio.projects) ? portfolio.projects : [];
  const experienceList = Array.isArray(portfolio.experience) ? portfolio.experience : [];
  const testimonialsList = Array.isArray(portfolio.testimonials) ? portfolio.testimonials : [];
  const socials = portfolio.socials || {};
  const theme = portfolio.theme || 'blue';

  const themeColors: Record<string, string> = {
    blue: 'primary',
    indigo: 'indigo-600',
    violet: 'violet-600',
    emerald: 'emerald-600',
    rose: 'rose-600',
    amber: 'amber-600'
  };

  const accentColor = themeColors[theme] || 'primary';
  const themeAccentClasses: Record<string, { bg: string, hover: string, text: string, hoverText: string, shadow: string, from: string, to: string, lightBg: string, lightBorder: string, glowFrom: string }> = {
    blue: { bg: 'bg-blue-500', hover: 'hover:bg-blue-600', text: 'text-blue-500', hoverText: 'hover:text-blue-500', shadow: 'shadow-blue-500/20', from: 'from-blue-400', to: 'to-sky-300', lightBg: 'bg-blue-50', lightBorder: 'border-blue-100', glowFrom: 'from-blue-500/5' },
    indigo: { bg: 'bg-indigo-600', hover: 'hover:bg-indigo-700', text: 'text-indigo-600', hoverText: 'hover:text-indigo-600', shadow: 'shadow-indigo-600/20', from: 'from-indigo-600', to: 'to-indigo-400', lightBg: 'bg-indigo-50', lightBorder: 'border-indigo-100', glowFrom: 'from-indigo-500/5' },
    violet: { bg: 'bg-violet-600', hover: 'hover:bg-violet-700', text: 'text-violet-600', hoverText: 'hover:text-violet-600', shadow: 'shadow-violet-600/20', from: 'from-violet-600', to: 'to-violet-400', lightBg: 'bg-violet-50', lightBorder: 'border-violet-100', glowFrom: 'from-violet-500/5' },
    emerald: { bg: 'bg-emerald-600', hover: 'hover:bg-emerald-700', text: 'text-emerald-600', hoverText: 'hover:text-emerald-600', shadow: 'shadow-emerald-600/20', from: 'from-emerald-600', to: 'to-emerald-400', lightBg: 'bg-emerald-50', lightBorder: 'border-emerald-100', glowFrom: 'from-emerald-500/5' },
    rose: { bg: 'bg-rose-600', hover: 'hover:bg-rose-700', text: 'text-rose-600', hoverText: 'hover:text-rose-600', shadow: 'shadow-rose-600/20', from: 'from-rose-600', to: 'to-rose-400', lightBg: 'bg-rose-50', lightBorder: 'border-rose-100', glowFrom: 'from-rose-500/5' },
    amber: { bg: 'bg-amber-600', hover: 'hover:bg-amber-700', text: 'text-amber-600', hoverText: 'hover:text-amber-600', shadow: 'shadow-amber-600/20', from: 'from-amber-600', to: 'to-amber-400', lightBg: 'bg-amber-50', lightBorder: 'border-amber-100', glowFrom: 'from-amber-500/5' }
  };

  const accent = themeAccentClasses[theme] || themeAccentClasses.blue;
  const darkMode = portfolio.darkMode || false;
  const vSec = portfolio.visibleSections || { about: true, experience: true, skills: true, projects: true, testimonials: true, contact: true };

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-500 ${darkMode ? 'dark bg-slate-950 text-slate-100 selection:bg-primary/40' : 'bg-slate-50 text-slate-900 selection:bg-primary/20'}`}>
      {/* Header */}
      <header className={`border-b sticky top-0 backdrop-blur-md z-50 transition-colors duration-500 ${darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`${accent.bg} h-8 w-8 rounded-md flex items-center justify-center text-white font-bold shadow-md`}>
              <Hexagon className="h-5 w-5" />
            </div>
            <span className={`font-bold text-xl tracking-tight hidden sm:block ${darkMode ? 'text-white' : 'text-slate-900'}`}>Portfolio</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {vSec.about && <Link href="#about" className={`text-sm font-medium transition-colors ${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 ' + accent.hoverText}`}>About</Link>}
            {vSec.skills && <Link href="#skills" className={`text-sm font-medium transition-colors ${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 ' + accent.hoverText}`}>Skills</Link>}
            {vSec.projects && <Link href="#projects" className={`text-sm font-medium transition-colors ${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 ' + accent.hoverText}`}>Projects</Link>}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="outline" size="sm" className={`hidden sm:inline-flex transition-colors ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white' : 'bg-white border-slate-200 text-slate-600 ' + accent.hoverText}`}>
                Login / Edit
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Notification Toast */}
      <AnimatePresence>
        {message.text && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-100 px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-4 border-2 transition-all"
            style={{ 
              backgroundColor: message.type === 'error' ? '#fff1f2' : '#f0fdf4',
              borderColor: message.type === 'error' ? '#fecdd3' : '#bbf7d0',
              color: message.type === 'error' ? '#be123c' : '#15803d'
            }}
          >
            <div className={`p-2 rounded-xl ${message.type === 'error' ? 'bg-rose-100' : 'bg-green-100'}`}>
               {message.type === 'error' ? <HistoryIcon className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
            </div>
            <p className="font-black text-sm uppercase tracking-wider">{message.text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="grow">
        {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 border-b transition-colors duration-500">
        {/* Creative Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden z-0 opacity-20">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              x: [-20, 20, -20],
              y: [-10, 10, -10]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className={`absolute top-[10%] left-[10%] w-[30vw] h-[30vw] rounded-full blur-[120px] ${accent.bg}`}
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -45, 0],
              x: [30, -30, 30],
              y: [20, -20, 20]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className={`absolute bottom-[10%] right-[10%] w-[25vw] h-[25vw] rounded-full blur-[100px] bg-sky-400`}
            style={{ animationDelay: '2s' }}
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              x: [0, 50, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[150px] ${darkMode ? 'bg-indigo-900/30' : 'bg-indigo-100'}`}
          />
        </div>

        <div className={`container mx-auto px-4 relative z-10 flex flex-col items-center text-center py-20 ${darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-100'}`}>
          <div className="absolute inset-0 z-0 opacity-[0.03] bg-dot-pattern"></div>

          {/* Floating Decorative Elements */}
          <div className="absolute inset-0 z-10 pointer-events-none hidden lg:block overflow-hidden">
             {/* Left side elements */}
             <div className="absolute top-[15%] left-[5%] animate-float opacity-30">
               <Palette className={`h-16 w-16 ${accent.text}`} />
             </div>
             <div className="absolute top-[45%] left-[8%] animate-float-delayed opacity-20">
               <PenTool className={`h-12 w-12 ${accent.text}`} />
             </div>
             <div className="absolute bottom-[20%] left-[5%] animate-float opacity-40">
               <Camera className={`h-20 w-20 ${accent.text}`} />
             </div>
             <div className="absolute top-[60%] left-[12%] animate-pulse opacity-10">
               <Sparkles className={`h-10 w-10 ${accent.text}`} />
             </div>

             {/* Right side elements */}
             <div className="absolute top-[20%] right-[5%] animate-float-delayed opacity-30">
               <Video className={`h-16 w-16 ${accent.text}`} />
             </div>
             <div className="absolute top-[40%] right-[10%] animate-float opacity-20">
               <Layout className={`h-12 w-12 ${accent.text}`} />
             </div>
             <div className="absolute bottom-[25%] right-[5%] animate-float-delayed opacity-40">
               <Hexagon className={`h-24 w-24 ${accent.text}`} />
             </div>
             <div className="absolute bottom-[45%] right-[12%] animate-pulse opacity-10">
               <Plus className={`h-10 w-10 ${accent.text}`} />
             </div>

             {/* Subtle Side Glows */}
             <div className={`absolute -left-20 top-1/4 h-[400px] w-[400px] rounded-full ${accent.bg} opacity-[0.05] blur-[120px]`}></div>
             <div className={`absolute -right-20 bottom-1/4 h-[400px] w-[400px] rounded-full ${accent.bg} opacity-[0.05] blur-[120px]`}></div>
          </div>
          
          <div className="container relative mx-auto px-4 text-center z-10 max-w-4xl">
            <ScrollReveal delay={0.1} direction="down">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold tracking-wider mb-8 transition-colors ${darkMode ? 'bg-primary/20 text-white' : 'bg-primary/10 text-primary'}`}>
                <Sparkles className="h-4 w-4" />
                {(() => {
                  const hour = new Date().getHours();
                  if (hour < 12) return "Good Morning! Explore my work";
                  if (hour < 18) return "Good Afternoon! Explore my work";
                  return "Good Evening! Explore my work";
                })()}
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <h1 className={`text-5xl sm:text-7xl font-extrabold tracking-tight pb-2 leading-[1.1] relative z-20 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                 <AnimatedText text="Hi, I'm " highlightText={portfolio.name || 'Anonymous'} delay={0.3} accent={accent} darkMode={darkMode} />
              </h1>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <p className={`mt-6 mx-auto max-w-2xl text-xl sm:text-2xl font-medium transition-colors ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {portfolio.title || 'Developer'}
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.4}>
          
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">

  {/* 🔥 VIEW WORK */}
  <Link href="#projects">
    <Button
      size="lg"
      className={`group relative px-10 h-16 rounded-2xl text-lg font-bold text-white overflow-hidden
      bg-gradient-to-r ${accent.from} ${accent.to}
      shadow-2xl ${accent.shadow}
      transition-all duration-300 hover:scale-110 active:scale-95`}
    >
      {/* Shine */}
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
        <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 animate-[shine_2s_linear_infinite]" />
      </span>

      {/* Content */}
      <span className="relative flex items-center gap-2">
        <Eye className="h-5 w-5 group-hover:rotate-12 transition" />
        View My Work
      </span>
    </Button>
  </Link>


  {/* ✨ GET IN TOUCH */}
<Link href="#contact">
  <Button
    variant="outline"
    size="lg"
 className={`group relative px-10 h-16 rounded-2xl text-lg font-semibold overflow-hidden
backdrop-blur-xl transition-all duration-300



${
  darkMode
    ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white hover:text-white'
    : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-white'
}

hover:scale-105 active:scale-95`}
  >
    {/* Glow Layer */}
    <span
      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500
      ${
        darkMode
          ? 'bg-gradient-to-r from-white/10 via-transparent to-white/10'
          : 'bg-gradient-to-r from-black/5 via-transparent to-black/5'
      }`}
    />

    {/* Border Glow */}
    <span className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/20 transition" />

    {/* Content */}
    <span className="relative flex items-center gap-2 z-10">
      <Mail className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
      Get In Touch
    </span>
  </Button>
</Link>

<Button
  onClick={async () => {
    setIsGenerating(true);
    setMessage({ text: 'Generating your CV...', type: 'success' });
    try {
      const response = await fetch('/api/resume/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: portfolio.name,
          title: portfolio.title,
          bio: portfolio.bio,
          skills: portfolio.skills,
          experience: experienceList,
          projects: projectsList,
          socials: socials,
          theme: theme
        })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Resume-${(portfolio.name || 'Portfolio').replace(/\s+/g, '-')}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setMessage({ text: 'Download started!', type: 'success' });
      } else {
        const err = await response.json();
        setMessage({ text: err.details || 'Generation failed.', type: 'error' });
      }
    } catch (error) {
      console.error('Download error:', error);
      setMessage({ text: 'Network connection issue.', type: 'error' });
    } finally {
      setIsGenerating(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    }
  }}
  disabled={isGenerating}
  size="lg"
  className={`group relative px-10 h-16 rounded-2xl text-lg font-semibold overflow-hidden
  transition-all duration-300 hover:scale-105 active:scale-95

  ${
    darkMode
      ? 'bg-slate-900 border border-slate-700 text-white hover:bg-slate-800'
      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
  }`}
>

  {/* Content */}
  <span className="relative flex items-center gap-2 z-10">
    {isGenerating ? (
      <Loader2 className="h-5 w-5 animate-spin" />
    ) : (
      <Download className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1 group-hover:scale-110" />
    )}
    {isGenerating ? 'Downloading...' : 'Download Resume'}
  </span>
</Button>
          
          </div>
            </ScrollReveal>
            
            {/* Social Links Hero */}
            <ScrollReveal delay={0.5}>
              <div className={`flex flex-wrap justify-center gap-6 mt-12 transition-colors ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {socials.twitter && (
                  <Link href={socials.twitter} className={`${accent.hoverText} transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900`}>
                    <Twitter className="h-6 w-6" />
                  </Link>
                )}
                {socials.github && (
                  <Link href={socials.github} className={`${accent.hoverText} transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900`}>
                    <Github className="h-6 w-6" />
                  </Link>
                )}
                {socials.linkedin && (
                  <Link href={socials.linkedin} className={`${accent.hoverText} transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900`}>
                    <Linkedin className="h-6 w-6" />
                  </Link>
                )}
                {socials.instagram && (
                  <Link href={socials.instagram} className={`${accent.hoverText} transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900`}>
                    <Instagram className="h-6 w-6" />
                  </Link>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* About Section */}
      {vSec.about && (
      <section id="about" className={`py-6 border-t relative overflow-hidden transition-colors duration-500 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
        <div className={`absolute -right-20 -top-20 h-96 w-96 rounded-full ${accent.bg} opacity-[0.05] blur-[120px] animate-pulse`}></div>
        <div className={`absolute -left-20 bottom-0 h-80 w-80 rounded-full ${accent.bg} opacity-[0.03] blur-[100px]`}></div>
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3 flex justify-center">
              <ScrollReveal direction="left" delay={0.1}>
                <div className={`relative h-64 w-64 rounded-[48px] overflow-hidden border-4 shadow-2xl transition-colors ${darkMode ? 'border-slate-800 shadow-primary/20' : 'border-white shadow-slate-200'}`}>
                  {portfolio.avatarUrl ? (
                    <img src={portfolio.avatarUrl} alt="About" className="h-full w-full object-cover" />
                  ) : (
                    <div className={`h-full w-full flex items-center justify-center transition-colors ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                      <User className={`h-20 w-20 text-slate-300 transition-colors ${darkMode ? 'text-slate-600' : 'text-slate-300'}`} />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>
            <div className="md:w-2/3 space-y-4">
              <ScrollReveal direction="right" delay={0.2}>
                <h2 className={`text-3xl font-bold flex items-center gap-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  <Coffee className={`h-8 w-8 ${accent.text}`} />
                  About Me
                </h2>
                <div className={`relative text-lg leading-relaxed whitespace-pre-wrap mt-4 backdrop-blur-md p-6 rounded-3xl border shadow-xl overflow-hidden group transition-colors ${darkMode ? 'bg-slate-950/40 border-slate-800 text-slate-300' : 'bg-white/40 border-white/60 text-slate-600'}`}>
                   <div className={`absolute top-0 left-0 w-1 h-full ${accent.bg} opacity-30`}></div>
                  {portfolio.bio || "No bio provided yet."}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Experience Section */}
      {vSec.experience && experienceList.length > 0 && (
        <section id="experience" className={`py-6 border-t relative overflow-hidden transition-colors ${darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-100'}`}>
          <div className={`absolute -left-20 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full ${accent.bg} opacity-[0.04] blur-[120px]`}></div>
          <div className={`absolute -right-20 top-10 h-80 w-80 rounded-full ${accent.bg} opacity-[0.02] blur-[100px]`}></div>
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <ScrollReveal direction="down" delay={0.1}>
              <h2 className={`text-3xl font-bold mb-10 flex items-center justify-center gap-3 text-center relative mx-auto w-full ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                <HistoryIcon className={`h-8 w-8 ${accent.text}`} />
                Work Experience
                <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 ${accent.bg} rounded-full opacity-20`}></div>
              </h2>
            </ScrollReveal>
            
            <div className="relative before:absolute before:inset-0 before:left-5 md:before:left-1/2 before:-translate-x-px before:h-full before:w-[2px] before:bg-linear-to-b before:from-transparent before:via-slate-100 dark:before:via-slate-800 before:to-transparent">
              <div className="space-y-12">
                {experienceList.map((exp: any, idx: number) => (
                  <ScrollReveal key={idx} delay={0.1 + (idx * 0.1)} direction={idx % 2 === 0 ? 'left' : 'right'}>
                    <div className={`relative flex items-center group ${idx % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                      {/* Space on the other side */}
                      <div className="hidden md:block md:w-1/2"></div>
                      
                      {/* Dot on the center line */}
                      <div className={`absolute left-5 md:left-1/2 md:-translate-x-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full border-4 ${darkMode ? 'border-slate-950 bg-slate-900' : 'border-white bg-white'} shadow-xl transition-all duration-500 group-hover:scale-110`}>
                         <div className={`h-3 w-3 rounded-full ${accent.bg} ${accent.shadow} animate-pulse`} />
                      </div>
                      
                      {/* Content Card area */}
                      <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${idx % 2 === 0 ? 'md:pr-8 text-right' : 'md:pl-8 text-left'}`}>
                        <div className={`p-6 rounded-3xl border transition-all duration-500 hover:shadow-2xl group relative ${darkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'}`}>
                          {/* Decorative line connector */}
                          <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-0.5 opacity-30 md:block hidden ${idx % 2 === 0 ? '-right-4' : '-left-4'} ${accent.bg}`}></div>
                          
                          <div className={`flex flex-col ${idx % 2 === 0 ? 'md:items-end' : 'md:items-start'} gap-1 mb-3`}>
                            <Badge variant="outline" className={`${accent.bg} text-white border-transparent px-3 py-0.5 text-[9px] font-black uppercase tracking-widest`}>{exp.period}</Badge>
                            <h3 className={`font-black text-lg tracking-tight mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{exp.role}</h3>
                            <div className={`text-xs font-bold tracking-wide uppercase ${accent.text}`}>{exp.company}</div>
                          </div>
                          <p className={`text-sm leading-relaxed font-medium transition-colors duration-500 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{exp.desc}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {vSec.skills && skillsList.length > 0 && (
        <section id="skills" className={`py-8 border-t relative overflow-hidden transition-colors ${darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-100'}`}>
          <div className={`absolute right-[5%] top-1/2 h-16 w-16 ${accent.text} opacity-5 animate-float`}>
            <Sparkles className="h-full w-full" />
          </div>
          <div className={`absolute left-[5%] top-1/3 h-12 w-12 ${accent.text} opacity-5 animate-float-delayed`}>
            <Lightbulb className="h-full w-full" />
          </div>
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <ScrollReveal direction="down" delay={0.1}>
              <h2 className={`text-3xl font-bold mb-10 flex items-center justify-center gap-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                <Lightbulb className={`h-8 w-8 ${accent.text}`} />
                Professional Skills
              </h2>
            </ScrollReveal>
            <div className="flex flex-wrap justify-center gap-4">
              {skillsList.map((skill: string, idx: number) => (
                <ScrollReveal key={idx} delay={idx * 0.05} direction="up">
                  <div className={`px-6 py-3 rounded-2xl font-bold text-sm shadow-sm transition-all hover:scale-105 border ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50'}`}>
                    {skill}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {vSec.projects && projectsList.length > 0 && (
        <section id="projects" className={`py-6 border-t relative overflow-hidden transition-colors ${darkMode ? 'bg-slate-900 border-slate-900' : 'bg-slate-50 border-slate-100'}`}>
          <div className={`absolute right-1/4 -bottom-20 h-96 w-96 rounded-full ${accent.bg} opacity-[0.03] blur-[120px]`}></div>
          <div className={`absolute left-0 top-0 h-64 w-64 rounded-full ${accent.bg} opacity-[0.02] blur-[80px]`}></div>
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <ScrollReveal delay={0.1} direction="down">
              <h2 className={`text-3xl font-bold mb-10 flex items-center justify-center gap-3 text-center relative mx-auto w-full ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                <Briefcase className={`h-8 w-8 ${accent.text}`} />
                Featured Projects
                <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 ${accent.bg} rounded-full opacity-20`}></div>
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsList.map((project: any, idx: number) => {
                const title = project.title || `Project ${idx + 1}`;
                const desc = project.desc || 'Click to learn more about this project.';
                const image = project.image || null;

                return (
                  <ScrollReveal key={idx} delay={0.2 + (idx * 0.15)} className="h-full">
                    <Card key={idx} className={`overflow-hidden border group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 rounded-3xl ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-100'}`}>
                      <div className="lg:h-56 h-48 bg-slate-100 relative overflow-hidden">
                        {project.image ? (
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        ) : (
                          <div className={`w-full h-full flex flex-col items-center justify-center transition-colors ${darkMode ? 'bg-slate-900' : 'bg-slate-100 bg-dot-pattern'}`}>
                             <Plus className={`h-12 w-12 mb-2 transition-colors ${darkMode ? 'text-slate-700' : 'text-slate-300'}`} />
                             <span className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>Visual Coming Soon</span>
                          </div>
                        )}
                        <div className={`absolute top-0 left-0 w-full h-1/2 bg-linear-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${darkMode ? 'from-slate-950' : 'from-black/10'}`}></div>
                      </div>
                      <div className="p-6">
                        <h3 className={`text-xl font-bold mb-2 group-hover:text-primary transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>{project.title}</h3>
                        <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{project.desc}</p>
                        <Link href="#" className={`text-sm font-bold flex items-center gap-2 group/link ${accent.text}`}>
                          View Details
                          <ExternalLink className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </div>
                    </Card>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {vSec.testimonials && testimonialsList.length > 0 && (
        <section className={`py-6 border-t overflow-hidden relative transition-colors ${darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-100'}`}>
          <div className={`absolute -left-10 -top-10 h-64 w-64 rounded-full ${accent.bg} opacity-[0.03] blur-3xl`}></div>
          <div className="container mx-auto px-4 max-w-7xl text-center relative z-10">
            <ScrollReveal direction="down" delay={0.1}>
              <h2 className={`text-3xl font-bold mb-10 flex items-center justify-center gap-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                <Quote className={`h-8 w-8 ${accent.text}`} />
                Client Reviews
                <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 ${accent.bg} rounded-full opacity-20`}></div>
              </h2>
            </ScrollReveal>
            
            <TestimonialsSlider 
              testimonials={testimonialsList} 
              darkMode={darkMode}
              accent={{
                bg: accent.bg,
                text: accent.text,
                lightBg: accent.lightBg,
                lightBorder: accent.lightBorder
              }} 
            />
          </div>
        </section>
      )}

      {/* Contact Section */}
      {vSec.contact && (
      <section id="contact" className={`py-6 border-t relative overflow-hidden transition-colors ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-100'}`}>
         <div className={`absolute right-0 top-0 h-full w-1/3 bg-linear-to-l ${accent.glowFrom} to-transparent`}></div>
         <ContactSection accentBg={accent.bg} accentText={accent.text} accentShadow={accent.shadow} darkMode={darkMode} />
      </section>
      )}
      </main>

      {/* Footer */}
      <footer className={`py-12 border-t transition-colors duration-500 ${darkMode ? 'bg-slate-950 border-slate-900 text-slate-400' : 'bg-white border-slate-100 text-slate-500'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <div className={`${accent.bg} h-6 w-6 rounded flex items-center justify-center text-white`}>
                <Hexagon className="h-4 w-4" />
              </div>
              <span className={`font-black text-lg tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>{(portfolio.name || 'Portfolio').split(' ')[0]}<span className={accent.text}>.</span></span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              {socials.twitter && <Link href={socials.twitter} className={`${accent.hoverText} transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900`}><Twitter className="h-5 w-5" /></Link>}
              {socials.github && <Link href={socials.github} className={`${accent.hoverText} transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900`}><Github className="h-5 w-5" /></Link>}
              {socials.linkedin && <Link href={socials.linkedin} className={`${accent.hoverText} transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900`}><Linkedin className="h-5 w-5" /></Link>}
              {socials.instagram && <Link href={socials.instagram} className={`${accent.hoverText} transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900`}><Instagram className="h-5 w-5" /></Link>}
              <Link href="mailto:contact@example.com" className={`${accent.hoverText} transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900`}><Mail className="h-5 w-5" /></Link>
            </div>

            <div className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 border rounded-lg ${darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-slate-50'}`}>Based in London, UK</div>
          </div>

          <div className="flex justify-center flex-wrap gap-4 text-xs font-bold uppercase tracking-widest opacity-60">
            <span>© {new Date().getFullYear()} {portfolio.name || 'Anonymous'}</span>
            <span className="hidden sm:inline">•</span>
            <Link href="/login" className={`${accent.hoverText} transition-colors`}>Admin Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
