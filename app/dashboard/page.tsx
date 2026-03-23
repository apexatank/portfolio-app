'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  LogOut, 
  User, 
  Bell, 
  Search,
  CheckCircle2,
  Clock,
  Loader2,
  Save,
  Briefcase,
  Wrench,
  Eye,
  Settings,
  Mail,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Quote,
  History,
  Trash2,
  Plus,
  Hexagon,
  Sparkles,
  Layout,
  FileText,
  Download,
  Share2
} from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [activeTab, setActiveTab] = useState('profile');
  const [projectsList, setProjectsList] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    skills: '',
    avatarUrl: '',
    socials: { twitter: '', github: '', linkedin: '', instagram: '' },
    theme: 'blue',
    darkMode: false,
    resumeTemplate: 'modern',
    visibleSections: {
      about: true,
      experience: true,
      skills: true,
      projects: true,
      testimonials: true,
      contact: true
    }
  });

  const [experienceList, setExperienceList] = useState<any[]>([]);
  const [testimonialsList, setTestimonialsList] = useState<any[]>([]);
  const [messagesList, setMessagesList] = useState<any[]>([]);

  const themeAccentClasses: Record<string, { bg: string, hover: string, text: string, lightBg: string, border: string, ring: string, lightBorder: string, shadow: string }> = {
    blue: { bg: 'bg-blue-500', hover: 'hover:bg-blue-600', text: 'text-blue-500', lightBg: 'bg-blue-50', border: 'border-blue-500', ring: 'ring-blue-500/20', lightBorder: 'border-blue-100', shadow: 'shadow-blue-500/20' },
    indigo: { bg: 'bg-indigo-600', hover: 'hover:bg-indigo-700', text: 'text-indigo-600', lightBg: 'bg-indigo-50', border: 'border-indigo-600', ring: 'ring-indigo-600/20', lightBorder: 'border-indigo-100', shadow: 'shadow-indigo-600/20' },
    violet: { bg: 'bg-violet-600', hover: 'hover:bg-violet-700', text: 'text-violet-600', lightBg: 'bg-violet-50', border: 'border-violet-600', ring: 'ring-violet-600/20', lightBorder: 'border-violet-100', shadow: 'shadow-violet-600/20' },
    emerald: { bg: 'bg-emerald-600', hover: 'hover:bg-emerald-700', text: 'text-emerald-600', lightBg: 'bg-emerald-50', border: 'border-emerald-600', ring: 'ring-emerald-600/20', lightBorder: 'border-emerald-100', shadow: 'shadow-emerald-600/20' },
    rose: { bg: 'bg-rose-600', hover: 'hover:bg-rose-700', text: 'text-rose-600', lightBg: 'bg-rose-50', border: 'border-rose-600', ring: 'ring-rose-600/20', lightBorder: 'border-rose-100', shadow: 'shadow-rose-600/20' },
    amber: { bg: 'bg-amber-600', hover: 'hover:bg-amber-700', text: 'text-amber-600', lightBg: 'bg-amber-50', border: 'border-amber-600', ring: 'ring-amber-600/20', lightBorder: 'border-amber-100', shadow: 'shadow-amber-600/20' }
  };

  const accent = themeAccentClasses[formData.theme] || themeAccentClasses.blue;

  useEffect(() => {
    // Fetch current portfolio data
    const fetchData = async () => {
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const data = await res.json();
          setFormData({
            name: data.name || '',
            title: data.title || '',
            bio: data.bio || '',
            skills: data.skills || '',
            avatarUrl: data.avatarUrl || '',
            socials: data.socials || { twitter: '', github: '', linkedin: '', instagram: '' },
            theme: data.theme || 'blue',
            darkMode: data.darkMode || false,
            resumeTemplate: data.resumeTemplate || 'modern',
            visibleSections: data.visibleSections || {
              about: true,
              experience: true,
              skills: true,
              projects: true,
              testimonials: true,
              contact: true
            }
          });

          setExperienceList(data.experience || []);
          setTestimonialsList(data.testimonials || []);
          setMessagesList(data.messages || []);

          let parsedProjects = data.projects || [];
          if (typeof parsedProjects === 'string') {
            parsedProjects = parsedProjects.split('\n').filter(Boolean).map((p: string) => {
               const parts = p.split(/ - |:|—/);
               return { title: parts[0]?.trim() || '', desc: parts.slice(1).join(' - ').trim() || '', image: '' };
            });
          }
          setProjectsList(parsedProjects);
        }
      } catch (err) {
        console.error('Failed to load portfolio data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Apply dark mode class to HTML element
  useEffect(() => {
    if (formData.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [formData.darkMode]);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (response.ok) {
        router.push('/login');
      }
    } catch (err) {
      console.error('Logout failed');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const socialKey = name.split('_')[1];
      setFormData(prev => ({
        ...prev,
        socials: { ...prev.socials, [socialKey]: value }
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const form = new FormData();
    form.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: form
      });
      if (res.ok) {
        const data = await res.json();
        setFormData(prev => ({ ...prev, avatarUrl: data.url }));
        setMessage({ text: 'Image uploaded successfully. Remember to publish changes!', type: 'success' });
        router.refresh();
        setTimeout(() => setMessage({ text: '', type: '' }), 5000);
      } else {
        setMessage({ text: 'Failed to upload image.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Upload error.', type: 'error' });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: '', type: '' });

    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          projects: projectsList,
          experience: experienceList,
          testimonials: testimonialsList
        })
      });

      if (res.ok) {
        setMessage({ text: 'Portfolio updated successfully! Check your live site.', type: 'success' });
        router.refresh();
        setTimeout(() => setMessage({ text: '', type: '' }), 5000); // clear after 5s
      } else {
        setMessage({ text: 'Failed to update portfolio.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'An error occurred while saving.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  // Nav Items configuration
  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: Sparkles, desc: 'Analytics and site status' },
    { id: 'profile', label: 'Personal Info', icon: User, desc: 'Name, title, and your bio' },
    { id: 'experience', label: 'Work Experience', icon: Briefcase, desc: 'Your career timeline' },
    { id: 'skills', label: 'Skills & Tools', icon: Wrench, desc: 'Software and abilities' },
    { id: 'projects', label: 'Portfolio Projects', icon: Layout, desc: 'Your featured work' },
    { id: 'testimonials', label: 'Testimonials', icon: Quote, desc: 'What clients say' },
    { id: 'socials', label: 'Social & Contact', icon: History, desc: 'Connect with you' },
    { id: 'messages', label: 'Messages Inbox', icon: Mail, desc: 'Site inquiries' },
    { id: 'resume', label: 'Resume Generator', icon: FileText, desc: 'Professional PDF CV' },
    { id: 'settings', label: 'Site Settings', icon: Settings, desc: 'SEO and themes' },
  ];

  const handleSave = async () => {
    // This function is called by the new header's "Publish Changes" button
    // It should trigger the same logic as handleSubmit
    setSaving(true);
    setMessage({ text: '', type: '' });

    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          projects: projectsList,
          experience: experienceList,
          testimonials: testimonialsList
        })
      });

      if (res.ok) {
        setMessage({ text: 'Portfolio updated successfully! Check your live site.', type: 'success' });
        router.refresh();
        setTimeout(() => setMessage({ text: '', type: '' }), 5000); // clear after 5s
      } else {
        setMessage({ text: 'Failed to update portfolio.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'An error occurred while saving.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${formData.darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b px-8 backdrop-blur-md ${formData.darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className={`h-8 w-8 rounded-lg ${accent.bg} flex items-center justify-center text-white shadow-lg transition-transform group-hover:rotate-12`}>
              <Hexagon className="h-5 w-5" />
            </div>
            <span className={`text-xl font-black tracking-tight ${formData.darkMode ? 'text-white' : 'text-slate-900'}`}>{formData.name.split(' ')[0]}<span className={accent.text}>.</span></span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
           <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">
             <div className={`h-2 w-2 rounded-full ${accent.bg} animate-pulse`} />
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Dashboard Active</span>
           </div>
           <Button
            size="sm"
            className={`${accent.bg} ${accent.hover} shadow-lg text-white font-bold h-9 px-4 rounded-full transition-all active:scale-95`}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Publish Changes"}
          </Button>
        </div>
      </header>
      <div className={`flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden transition-colors duration-500 ${formData.darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
        {/* Sidebar Navigation */}
        <aside className={`w-full md:w-72 shrink-0 flex flex-col gap-6 p-6 overflow-y-auto border-r transition-colors duration-500 ${formData.darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div>
            <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 px-3 ${formData.darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Content Manager</h3>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-start gap-3 p-3 text-left rounded-xl transition-all duration-200 group ${
                      isActive 
                        ? `${accent.bg} text-white shadow-lg ${accent.shadow}` 
                        : `${formData.darkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-100' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-transparent hover:border-slate-100'}`
                    }`}
                  >
                    <Icon className={`h-5 w-5 mt-0.5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : (formData.darkMode ? 'text-slate-500' : 'text-slate-400')}`} />
                    <div>
                      <div className="font-bold text-sm">
                        {item.label}
                      </div>
                      <div className={`text-[10px] mt-0.5 font-medium opacity-70`}>
                        {item.desc}
                      </div>
                    </div>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Quick Actions Card */}
          <div className={`p-5 rounded-2xl border transition-colors duration-500 ${formData.darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-linear-to-b from-white to-slate-50 border-slate-200 shadow-sm'}`}>
             <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${formData.darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Quick Actions</h3>
             <Button
              variant="default" 
              className={`w-full justify-start gap-2 h-11 text-white rounded-xl shadow-md mb-3 transition-colors ${formData.darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-900 hover:bg-slate-800'}`}
              onClick={() => window.open('/', '_blank')}
            >
              <Eye className="h-4 w-4" />
              Preview Live Site
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className={`w-full justify-start gap-2 h-11 ${accent.bg} ${accent.hover} text-white rounded-xl shadow-md ${accent.shadow} active:scale-95 transition-all`}
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Publish Changes
            </Button>
          </div>
        </aside>

        {/* Main Editor Area */}
        <main className="grow flex flex-col gap-6 p-6 !pb-6 h-full min-h-0 overflow-y-auto">
          <header className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border shadow-sm transition-colors duration-500 ${formData.darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div>
              <h1 className={`text-2xl font-extrabold tracking-tight ${formData.darkMode ? 'text-white' : 'text-slate-900'}`}>
                {navItems.find(i => i.id === activeTab)?.label || 'Editor'}
              </h1>
              <p className={`text-sm mt-1 font-medium ${formData.darkMode ? 'text-slate-500' : 'text-slate-500'}`}>Updates made here will be instantly available on your live portfolio.</p>
            </div>
            {message.text && (
              <div className={`px-4 py-2.5 text-xs font-bold rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 ${
                message.type === 'success' ? (formData.darkMode ? 'bg-green-900/30 text-green-400 border-green-800 border' : 'bg-green-100 text-green-800 border-green-200 border') : (formData.darkMode ? 'bg-red-900/30 text-red-400 border-red-800 border' : 'bg-red-100 text-red-800 border-red-200 border')
              }`}>
                {message.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                {message.text}
              </div>
            )}
          </header>

          <Card className={`overflow-auto border shadow-lg rounded-2xl transition-colors duration-500 ${formData.darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-transparent'}`}>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex justify-center items-center py-32">
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="font-medium text-sm">Loading your content...</p>
                  </div>
                </div>
              ) : (
                <form id="portfolio-form" onSubmit={handleSubmit} className={`divide-y pb-12 transition-colors duration-500 ${formData.darkMode ? 'divide-slate-800' : 'divide-slate-100'}`}>
                  
                  {/* TAB 0: Overview */}
                  <div className={`p-8 space-y-8 ${activeTab === 'overview' ? 'block animate-in fade-in' : 'hidden'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className={`p-6 rounded-3xl border transition-all hover:scale-[1.02] ${formData.darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-4 ${formData.darkMode ? 'bg-slate-800' : accent.lightBg} ${accent.text}`}>
                          <Layout className="h-6 w-6" />
                        </div>
                        <h4 className={`text-sm font-bold opacity-60 ${formData.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Total Projects</h4>
                        <div className={`text-3xl font-black mt-1 ${formData.darkMode ? 'text-white' : 'text-slate-900'}`}>{projectsList.length}</div>
                      </div>
                      
                      <div className={`p-6 rounded-3xl border transition-all hover:scale-[1.02] ${formData.darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-4 ${formData.darkMode ? 'bg-slate-800' : accent.lightBg} ${accent.text}`}>
                          <Mail className="h-6 w-6" />
                        </div>
                        <h4 className={`text-sm font-bold opacity-60 ${formData.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>New Messages</h4>
                        <div className={`text-3xl font-black mt-1 ${formData.darkMode ? 'text-white' : 'text-slate-900'}`}>{messagesList.length}</div>
                      </div>

                      <div className={`p-6 rounded-3xl border transition-all hover:scale-[1.02] ${formData.darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-4 ${formData.darkMode ? 'bg-slate-800' : accent.lightBg} ${accent.text}`}>
                          <Sparkles className="h-6 w-6" />
                        </div>
                        <h4 className={`text-sm font-bold opacity-60 ${formData.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Theme Mode</h4>
                        <div className={`text-3xl font-black mt-1 ${formData.darkMode ? 'text-white' : 'text-slate-900'}`}>{formData.darkMode ? 'Dark' : 'Light'}</div>
                      </div>

                      <div className={`p-6 rounded-3xl border transition-all hover:scale-[1.02] ${formData.darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-4 ${formData.darkMode ? 'bg-slate-800' : accent.lightBg} ${accent.text}`}>
                          <Settings className="h-6 w-6" />
                        </div>
                        <h4 className={`text-sm font-bold opacity-60 ${formData.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Accent Theme</h4>
                        <div className={`text-3xl font-black mt-1 capitalize ${accent.text}`}>{formData.theme}</div>
                      </div>
                    </div>

                    <div className={`p-8 rounded-3xl border flex flex-col items-center text-center justify-center space-y-4 ${formData.darkMode ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50/50 border-slate-100 shadow-inner'}`}>
                      <div className={`h-16 w-16 rounded-3xl flex items-center justify-center ${accent.bg} text-white shadow-xl rotate-6`}>
                         <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className={`text-xl font-black ${formData.darkMode ? 'text-white' : 'text-slate-900'}`}>All Systems Go!</h3>
                        <p className={`mt-1 text-sm ${formData.darkMode ? 'text-slate-500' : 'text-slate-500'}`}>Your portfolio is currently live and performing at peak potential.</p>
                      </div>
                      <Button onClick={() => window.open('/', '_blank')} variant="outline" className={`mt-4 rounded-xl px-8 transition-all hover:scale-105 ${formData.darkMode ? 'border-slate-800 text-slate-300 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-50'}`}>
                         Preview Live Portfolio
                      </Button>
                    </div>
                  </div>

                  {/* TAB 1: Profile Info */}
                  <div className={`p-8 space-y-8 ${activeTab === 'profile' ? 'block animate-in fade-in' : 'hidden'}`}>
                    {/* Image Upload section */}
                    <div className={`space-y-3 pb-6 border-b transition-colors duration-500 ${formData.darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                      <Label className={`text-sm font-bold ${formData.darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Profile Picture</Label>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                        <div className={`shrink-0 h-24 w-24 rounded-full border overflow-hidden transition-colors duration-500 flex items-center justify-center shadow-sm ${formData.darkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-50'}`}>
                          {formData.avatarUrl ? (
                            <img src={formData.avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                          ) : (
                            <User className={`h-8 w-8 ${formData.darkMode ? 'text-slate-600' : 'text-slate-300'}`} />
                          )}
                        </div>
                        <div className="grow space-y-2">
                           <Input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageUpload} 
                            disabled={uploadingImage}
                            className={`max-w-sm transition-colors duration-500 ${formData.darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200'}`}
                           />
                           <p className="text-xs text-slate-400 font-medium">Upload a square image for best results (Max 5MB).</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label htmlFor="name" className={`text-sm font-bold ${formData.darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Jane Doe"
                          className={`h-12 border focus-visible:ring-primary rounded-xl transition-colors duration-500 ${formData.darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                          required
                        />
                        <p className="text-xs text-slate-400 font-medium">This will be the main header on your hero section.</p>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="title" className={`text-sm font-bold ${formData.darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Professional Title</Label>
                        <Input
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="e.g. Graphic Designer / Video Editor"
                          className={`h-12 border focus-visible:ring-primary rounded-xl transition-colors duration-500 ${formData.darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                          required
                        />
                        <p className="text-xs text-slate-400 font-medium">Displayed prominently below your name.</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="bio" className={`text-sm font-bold ${formData.darkMode ? 'text-slate-300' : 'text-slate-700'}`}>About Me (Bio)</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Write a highly engaging summary about yourself..."
                        rows={6}
                        className={`border focus-visible:ring-primary rounded-xl resize-y min-h-[140px] transition-colors duration-500 ${formData.darkMode ? 'bg-slate-800 border-slate-700 text-white italic' : 'bg-slate-50 border-slate-200'}`}
                      />
                      <p className="text-xs text-slate-400 font-medium">This forms the core of your "About Me" section.</p>
                    </div>
                  </div>

                  {/* TAB 2: Skills */}
                  <div className={`p-8 space-y-6 ${activeTab === 'skills' ? 'block animate-in fade-in' : 'hidden'}`}>
                    <div className={`p-6 rounded-2xl border transition-colors duration-500 ${formData.darkMode ? (accent.bg.replace('bg-', 'bg-').replace('-600', '-900/20') + ' ' + (accent.bg.replace('bg-', 'border-').replace('-600', '-900/50'))) : (accent.lightBg + '/50 ' + accent.lightBg.replace('bg-', 'border-').replace('50', '200'))}`}>
                      <h4 className={`font-bold mb-2 flex items-center gap-2 ${formData.darkMode ? 'text-white' : accent.text.replace('text-', 'text-').replace('-600', '-900')}`}>
                         <Wrench className="h-5 w-5" /> Let your tools shine
                      </h4>
                      <p className={`text-sm mb-6 ${formData.darkMode ? 'text-slate-400' : (accent.text.replace('text-', 'text-').replace('-600', '-700') + '/80')}`}>List out the abilities, software, and tools you excel at. They'll be converted into beautiful badges on your site.</p>
                      
                      <div className="space-y-3">
                        <Label htmlFor="skills" className={`text-sm font-bold ${formData.darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Professional Skills (Comma separated)</Label>
                        <Input
                          id="skills"
                          name="skills"
                          value={formData.skills}
                          onChange={handleChange}
                          placeholder="e.g. Adobe Premiere, Figma, SEO Copywriting, Next.js"
                          className={`h-12 border rounded-xl transition-colors duration-500 ${formData.darkMode ? 'bg-slate-800 border-slate-700 text-white focus-visible:ring-slate-600' : 'bg-white ' + accent.lightBg.replace('bg-', 'border-').replace('50', '200') + ' focus-visible:ring-primary'}`}
                        />
                      </div>
                      
                      {/* Live Preview of Badges */}
                      {formData.skills && (
                        <div className="mt-6">
                           <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 ${formData.darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Live Preview</p>
                           <div className="flex flex-wrap gap-2">
                             {formData.skills.split(',').map((s: string, i: number) => s.trim() && (
                               <Badge key={i} variant="secondary" className={`px-3 py-1.5 text-sm font-bold border transition-colors ${formData.darkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-white text-slate-700 border-slate-200 shadow-sm'}`}>{s.trim()}</Badge>
                             ))}
                           </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* TAB 3: Projects */}
                  <div className={`p-8 space-y-6 ${activeTab === 'projects' ? 'block animate-in fade-in' : 'hidden'}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                      <Label className={`text-sm font-bold ${formData.darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Featured Projects</Label>
                      <Button type="button" variant="outline" size="sm" onClick={() => setProjectsList([{ title: '', desc: '', image: '', category: '', link: '' }, ...projectsList])} className={`transition-colors duration-500 ${formData.darkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white' : 'bg-white'}`}>
                        + Add New Project
                      </Button>
                    </div>
                    
                    <div className="space-y-6">
                      {projectsList.length === 0 && <p className="text-sm text-slate-500 text-center py-8">No projects added yet.</p>}
                      {projectsList.map((project, idx) => (
                        <div key={idx} className={`border rounded-xl p-5 relative group transition-colors duration-500 ${formData.darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                           <Button type="button" variant="destructive" size="icon" className="absolute -top-3 -right-3 h-[28px] w-[28px] rounded-full sm:opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center p-0 m-0 z-10" onClick={() => {
                             const newP = [...projectsList];
                             newP.splice(idx, 1);
                             setProjectsList(newP);
                           }} aria-label="Delete"><Trash2 className="h-4 w-4" /></Button>
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                             <div className="space-y-2">
                               <Label className={`text-xs font-bold ${formData.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Project Title</Label>
                               <Input value={project.title} onChange={(e) => {
                                 const newP = [...projectsList];
                                 newP[idx].title = e.target.value;
                                 setProjectsList(newP);
                               }} placeholder="e.g. Graphic Rebrand" className={`transition-colors duration-500 ${formData.darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white'}`} />
                             </div>
                             <div className="space-y-2">
                               <Label className={`text-xs font-bold ${formData.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Project Image (Optional)</Label>
                               <div className="flex items-center gap-3">
                                 {project.image && <img src={project.image} alt="preview" className={`h-10 w-10 min-w-10 rounded-md object-cover border ${formData.darkMode ? 'border-slate-700' : ''}`} />}
                                 <Input type="file" accept="image/*" onChange={async (e) => {
                                   const file = e.target.files?.[0];
                                   if (!file) return;
                                   const form = new FormData();
                                   form.append('file', file);
                                   const res = await fetch('/api/upload', { method: 'POST', body: form });
                                   if (res.ok) {
                                     const pData = await res.json();
                                     const newP = [...projectsList];
                                     newP[idx].image = pData.url;
                                     setProjectsList(newP);
                                   }
                                 }} className={`grow text-xs file:h-full cursor-pointer min-w-0 transition-colors duration-500 ${formData.darkMode ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-white'}`} />
                               </div>
                             </div>
                           </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="space-y-2">
                                <Label className={`text-xs font-bold ${formData.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Category</Label>
                                <Input value={project.category || ''} onChange={(e) => {
                                  const newP = [...projectsList];
                                  newP[idx].category = e.target.value;
                                  setProjectsList(newP);
                                }} placeholder="e.g. Branding, UI/UX" className={`transition-colors duration-500 ${formData.darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white'}`} />
                              </div>
                              <div className="space-y-2">
                                <Label className={`text-xs font-bold ${formData.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Live Link</Label>
                                <Input value={project.link || ''} onChange={(e) => {
                                  const newP = [...projectsList];
                                  newP[idx].link = e.target.value;
                                  setProjectsList(newP);
                                }} placeholder="https://..." className={`transition-colors duration-500 ${formData.darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white'}`} />
                              </div>
                            </div>
                           <div className="space-y-2">
                             <Label className={`text-xs font-bold ${formData.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Description</Label>
                             <Textarea value={project.desc} onChange={(e) => {
                                 const newP = [...projectsList];
                                 newP[idx].desc = e.target.value;
                                 setProjectsList(newP);
                             }} placeholder="Describe your project here..." className={`h-22 resize-none transition-colors duration-500 ${formData.darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white'}`} />
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* TAB 5: Experience */}
                  <div className={`p-8 space-y-6 ${activeTab === 'experience' ? 'block animate-in fade-in' : 'hidden'}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                      <Label className={`text-sm font-bold ${formData.darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Career History</Label>
                      <Button type="button" variant="outline" size="sm" onClick={() => setExperienceList([{ company: '', role: '', period: '', desc: '' }, ...experienceList])} className={`transition-colors duration-500 ${formData.darkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white'}`}>
                        + Add Experience
                      </Button>
                    </div>
                    
                    <div className="space-y-6">
                      {experienceList.length === 0 && <p className={`text-sm text-center py-8 ${formData.darkMode ? 'text-slate-500' : 'text-slate-500'}`}>No experience added yet.</p>}
                      {experienceList.map((exp, idx) => (
                        <div key={idx} className={`border rounded-xl p-5 relative group transition-colors duration-500 ${formData.darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                           <Button type="button" variant="destructive" size="icon" className="absolute -top-3 -right-3 h-[28px] w-[28px] rounded-full sm:opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center p-0 m-0 z-10" onClick={() => {
                             const newE = [...experienceList];
                             newE.splice(idx, 1);
                             setExperienceList(newE);
                           }} aria-label="Delete"><Trash2 className="h-4 w-4" /></Button>
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                             <div className="space-y-2">
                               <Label className={`text-xs font-bold ${formData.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Company Name</Label>
                               <Input value={exp.company} onChange={(e) => {
                                 const newE = [...experienceList];
                                 newE[idx].company = e.target.value;
                                 setExperienceList(newE);
                               }} placeholder="e.g. Google" className={`transition-colors duration-500 ${formData.darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white'}`} />
                             </div>
                             <div className="space-y-2">
                               <Label className={`text-xs font-bold ${formData.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Position/Role</Label>
                               <Input value={exp.role} onChange={(e) => {
                                 const newE = [...experienceList];
                                 newE[idx].role = e.target.value;
                                 setExperienceList(newE);
                               }} placeholder="e.g. Senior Developer" className={`transition-colors duration-500 ${formData.darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white'}`} />
                             </div>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                             <div className="space-y-2">
                               <Label className={`text-xs font-bold ${formData.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Period</Label>
                               <Input value={exp.period} onChange={(e) => {
                                 const newE = [...experienceList];
                                 newE[idx].period = e.target.value;
                                 setExperienceList(newE);
                               }} placeholder="e.g. 2020 - 2024" className={`transition-colors duration-500 ${formData.darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white'}`} />
                             </div>
                           </div>
                           <div className="space-y-2">
                             <Label className={`text-xs font-bold ${formData.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Key Achievements / Description</Label>
                             <Textarea value={exp.desc} onChange={(e) => {
                                 const newE = [...experienceList];
                                 newE[idx].desc = e.target.value;
                                 setExperienceList(newE);
                             }} placeholder="Describe your impact..." className={`h-22 resize-none transition-colors duration-500 ${formData.darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white'}`} />
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* TAB 6: Testimonials */}
                  <div className={`p-8 space-y-6 ${activeTab === 'testimonials' ? 'block animate-in fade-in' : 'hidden'}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                      <Label className={`text-sm font-bold ${formData.darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Client Testimonials</Label>
                      <Button type="button" variant="outline" size="sm" onClick={() => setTestimonialsList([{ name: '', role: '', text: '' }, ...testimonialsList])} className={`transition-colors duration-500 ${formData.darkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white'}`}>
                        + Add Testimonial
                      </Button>
                    </div>
                    
                    <div className="space-y-6">
                      {testimonialsList.length === 0 && <p className={`text-sm text-center py-8 ${formData.darkMode ? 'text-slate-500' : 'text-slate-500'}`}>No testimonials added yet.</p>}
                      {testimonialsList.map((t, idx) => (
                        <div key={idx} className={`border rounded-xl p-5 relative group transition-colors duration-500 ${formData.darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                           <Button type="button" variant="destructive" size="icon" className="absolute -top-3 -right-3 h-[28px] w-[28px] rounded-full sm:opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center p-0 m-0 z-10" onClick={() => {
                             const newT = [...testimonialsList];
                             newT.splice(idx, 1);
                             setTestimonialsList(newT);
                           }} aria-label="Delete"><Trash2 className="h-4 w-4" /></Button>
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                             <div className="space-y-2">
                               <Label className={`text-xs font-bold ${formData.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Client Name</Label>
                               <Input value={t.name} onChange={(e) => {
                                 const newT = [...testimonialsList];
                                 newT[idx].name = e.target.value;
                                 setTestimonialsList(newT);
                               }} placeholder="e.g. John Smith" className={`transition-colors duration-500 ${formData.darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white'}`} />
                             </div>
                             <div className="space-y-2">
                               <Label className={`text-xs font-bold ${formData.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Company / Role</Label>
                               <Input value={t.role} onChange={(e) => {
                                 const newT = [...testimonialsList];
                                 newT[idx].role = e.target.value;
                                 setTestimonialsList(newT);
                               }} placeholder="e.g. CEO at TechFlow" className={`transition-colors duration-500 ${formData.darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white'}`} />
                             </div>
                           </div>
                           <div className="space-y-2">
                             <Label className={`text-xs font-bold ${formData.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Testimonial Quote</Label>
                             <Textarea value={t.text} onChange={(e) => {
                                 const newT = [...testimonialsList];
                                 newT[idx].text = e.target.value;
                                 setTestimonialsList(newT);
                             }} placeholder="What did they say about you?" className={`h-22 resize-none transition-colors duration-500 ${formData.darkMode ? 'bg-slate-900 border-slate-700 text-white italic' : 'bg-white'}`} />
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* TAB 7: Socials */}
                  <div className={`p-8 space-y-8 ${activeTab === 'socials' ? 'block animate-in fade-in' : 'hidden'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label className={`text-sm font-bold flex items-center gap-2 ${formData.darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                          <Twitter className="h-4 w-4" /> Twitter URL
                        </Label>
                        <Input
                          name="social_twitter"
                          value={formData.socials.twitter}
                          onChange={handleChange}
                          placeholder="https://twitter.com/yourhandle"
                          className={`h-12 border rounded-xl transition-colors duration-500 ${formData.darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className={`text-sm font-bold flex items-center gap-2 ${formData.darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                          <Github className="h-4 w-4" /> GitHub URL
                        </Label>
                        <Input
                          name="social_github"
                          value={formData.socials.github}
                          onChange={handleChange}
                          placeholder="https://github.com/yourhandle"
                          className={`h-12 border rounded-xl transition-colors duration-500 ${formData.darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className={`text-sm font-bold flex items-center gap-2 ${formData.darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                          <Linkedin className="h-4 w-4" /> LinkedIn URL
                        </Label>
                        <Input
                          name="social_linkedin"
                          value={formData.socials.linkedin}
                          onChange={handleChange}
                          placeholder="https://linkedin.com/in/yourhandle"
                          className={`h-12 border rounded-xl transition-colors duration-500 ${formData.darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className={`text-sm font-bold flex items-center gap-2 ${formData.darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                          <Instagram className="h-4 w-4" /> Instagram URL
                        </Label>
                        <Input
                          name="social_instagram"
                          value={formData.socials.instagram}
                          onChange={handleChange}
                          placeholder="https://instagram.com/yourhandle"
                          className={`h-12 border rounded-xl transition-colors duration-500 ${formData.darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* TAB 8: Messages */}
                  <div className={`p-8 space-y-6 ${activeTab === 'messages' ? 'block animate-in fade-in' : 'hidden'}`}>
                    <div className="space-y-4">
                      {messagesList.length === 0 ? (
                        <div className={`text-center py-20 rounded-2xl border-2 border-dashed transition-colors duration-500 ${formData.darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                          <Mail className="h-12 w-12 text-slate-300 mx-auto mb-4 opacity-20" />
                          <h4 className={`font-bold transition-colors duration-500 ${formData.darkMode ? 'text-slate-400' : 'text-slate-600'}`}>No messages yet</h4>
                          <p className="text-sm text-slate-400 font-medium">Inquiries from your contact form will appear here.</p>
                        </div>
                      ) : (
                        messagesList.map((msg, idx) => (
                          <div key={idx} className={`border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 ${formData.darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className={`font-bold transition-colors duration-500 ${formData.darkMode ? 'text-white' : 'text-slate-900'}`}>{msg.name}</h4>
                                <p className={`text-xs font-bold ${accent.text}`}>{msg.email}</p>
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{new Date(msg.date || Date.now()).toLocaleDateString()}</span>
                            </div>
                            <p className={`text-sm p-3 rounded-lg border italic transition-colors duration-500 ${formData.darkMode ? 'text-slate-300 bg-slate-900/50 border-slate-700' : 'text-slate-600 bg-slate-50 border-slate-100'}`}>"{msg.message}"</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>                  {/* TAB: Resume Generator */}
                  <div className={`p-8 space-y-6 ${activeTab === 'resume' ? 'block animate-in fade-in' : 'hidden'}`}>
                  {activeTab === 'resume' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                          <Badge variant="outline" className={`mb-2 ${accent.text} ${accent.border} bg-white shadow-sm font-bold uppercase tracking-widest text-[10px] px-3 py-1`}>
                            Premium Feature
                          </Badge>
                          <h2 className={`text-4xl font-black ${formData.darkMode ? 'text-white' : 'text-slate-900'} tracking-tight`}>
                            Resume <span className={accent.text}>Generator</span>
                          </h2>
                          <p className={`mt-2 text-lg ${formData.darkMode ? 'text-slate-400' : 'text-slate-500'} font-medium`}>
                            Generate a high-converting, professional PDF from your profile data.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        {/* Left Side: Controls */}
                        <div className="lg:col-span-4 space-y-6">
                          <div className={`p-6 rounded-3xl border transition-all duration-500 ${formData.darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                            <h3 className={`font-black text-lg mb-6 flex items-center gap-2 ${formData.darkMode ? 'text-white' : 'text-slate-900'}`}>
                              <Settings className="h-5 w-5 opacity-50" />
                              Customization
                            </h3>
                            
                            <div className="space-y-6">
                              <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Template Style</label>
                                <div className="grid grid-cols-1 gap-3">
                                  <button 
                                    type="button" 
                                    onClick={() => setFormData({...formData, resumeTemplate: 'modern'})}
                                    className={`p-4 rounded-2xl border-2 text-left transition-all group relative overflow-hidden ${formData.resumeTemplate === 'modern' ? `${accent.border} ${accent.lightBg} ring-2 ${accent.ring}` : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'}`}
                                  >
                                    <div className={`font-bold text-sm ${formData.resumeTemplate === 'modern' ? accent.text : 'text-slate-600'}`}>Modern Professional</div>
                                    <div className="text-[10px] opacity-60">Clean sidebar with theme accents</div>
                                    {formData.resumeTemplate === 'modern' && <div className={`absolute right-3 top-3 h-2 w-2 rounded-full ${accent.bg}`}></div>}
                                  </button>
                                  
                                  <button 
                                    type="button"
                                    onClick={() => setFormData({...formData, resumeTemplate: 'creative'})}
                                    className={`p-4 rounded-2xl border-2 text-left transition-all group relative overflow-hidden ${formData.resumeTemplate === 'creative' ? `${accent.border} ${accent.lightBg} ring-2 ${accent.ring}` : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'}`}
                                  >
                                    <div className={`font-bold text-sm ${formData.resumeTemplate === 'creative' ? accent.text : 'text-slate-600'}`}>Creative Grid</div>
                                    <div className="text-[10px] opacity-60">Bold centered header & full width</div>
                                    {formData.resumeTemplate === 'creative' && <div className={`absolute right-3 top-3 h-2 w-2 rounded-full ${accent.bg}`}></div>}
                                  </button>
                                </div>
                              </div>
                              
                              <div className={`p-5 rounded-2xl border bg-slate-50 border-slate-100 text-xs leading-relaxed text-slate-500 font-medium`}>
                                💡 <b className="text-slate-700">Pro Tip:</b> Your <b>{formData.theme}</b> theme color is synced across your website and PDF export for a cohesive brand.
                              </div>
                            </div>
                          </div>

                          <div className={`p-6 rounded-3xl border transition-all duration-500 ${formData.darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                            <h3 className={`font-black text-lg mb-4 ${formData.darkMode ? 'text-white' : 'text-slate-900'}`}>Export Actions</h3>
                            <Button 
                              onClick={async () => {
                                setGenerating(true);
                                setMessage({ text: 'Generating your professional PDF...', type: 'success' });
                                try {
                                  const response = await fetch('/api/resume/download', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                      name: formData.name,
                                      title: formData.title,
                                      bio: formData.bio,
                                      skills: formData.skills,
                                      experience: experienceList,
                                      projects: projectsList,
                                      socials: formData.socials,
                                      theme: formData.theme,
                                      template: formData.resumeTemplate
                                    })
                                  });
                                  
                                  if (response.ok) {
                                    const blob = await response.blob();
                                    const url = window.URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = `Resume-${(formData.name || 'Portfolio').replace(/\s+/g, '-')}.pdf`;
                                    document.body.appendChild(a);
                                    a.click();
                                    a.remove();
                                    setMessage({ text: 'Resume downloaded successfully!', type: 'success' });
                                  } else {
                                    const resData = await response.json();
                                    setMessage({ text: resData.details || 'Failed to generate resume.', type: 'error' });
                                  }
                                } catch (error) {
                                  console.error('Download error:', error);
                                  setMessage({ text: 'Network error occurred.', type: 'error' });
                                } finally {
                                  setGenerating(false);
                                  setTimeout(() => setMessage({ text: '', type: '' }), 5000);
                                }
                              }}
                              disabled={generating}
                              className={`w-full h-14 rounded-2xl flex items-center justify-center gap-3 font-black text-lg shadow-2xl ${accent.bg} ${accent.hover} ${accent.shadow} text-white active:scale-95 transition-all`}
                            >
                              {generating ? <Loader2 className="h-6 w-6 animate-spin" /> : <Download className="h-6 w-6" />}
                              {generating ? 'Exporting...' : 'Download PDF'}
                            </Button>
                          </div>
                        </div>

                        {/* Right Side: Preview */}
                        <div className="lg:col-span-8 space-y-6">
                          <div className="flex items-center justify-between px-2">
                             <div className="flex items-center gap-3">
                               <div className={`p-2 rounded-xl ${accent.lightBg} ${accent.text}`}>
                                 <FileText className="h-5 w-5" />
                               </div>
                               <div>
                                 <h3 className={`font-bold ${formData.darkMode ? 'text-white' : 'text-slate-900'}`}>Live A4 Preview</h3>
                                 <p className="text-xs text-slate-500">Real-time content sync</p>
                               </div>
                             </div>
                             <div className="flex gap-2">
                               <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-2">
                                 <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                 LIVE SYNC
                               </span>
                             </div>
                          </div>

                          <div className={`relative group w-full rounded-[2.5rem] border-4 transition-all duration-500 bg-slate-100 p-4 sm:p-8 ${formData.darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100 shadow-inner'}`}>
                             <div className="w-full max-w-[800px] mx-auto overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/5 bg-white aspect-[1/1.414] scale-100 origin-top">
                                <div className="h-full w-full bg-white p-8 sm:p-12 text-slate-900 overflow-y-auto no-scrollbar">
                                  {/* Template 1: Modern Professional */}
                                  {formData.resumeTemplate === 'modern' && (
                                    <>
                                      <div className="border-b-2 border-slate-100 pb-6 mb-8 text-left">
                                         <h4 className={`text-3xl font-black tracking-tighter ${accent.text}`}>{formData.name || 'Your Name'}</h4>
                                         <p className="text-lg font-bold text-slate-600 mt-1">{formData.title || 'Professional Title'}</p>
                                         <div className="flex flex-wrap gap-4 mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <span className="flex items-center gap-2 text-left"><Mail className="h-3.5 w-3.5" /> {formData.socials.linkedin || 'linkedin.com/yourhandle'}</span>
                                            <span className="flex items-center gap-2 text-left"><Layout className="h-3.5 w-3.5" /> {formData.socials.github || 'github.com/yourhandle'}</span>
                                         </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-12 gap-8 text-left">
                                         <div className="col-span-8 space-y-10">
                                            <div>
                                               <h5 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-6 ${accent.text}`}>Professional Profile</h5>
                                               <p className="text-[12px] leading-relaxed font-medium text-slate-600 italic">
                                                  "{formData.bio || 'Your professional bio will appear here to introduce you to recruiters.'}"
                                               </p>
                                            </div>

                                            <div>
                                               <h5 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-6 ${accent.text}`}>Relevant Experience</h5>
                                               <div className="space-y-8">
                                                  {experienceList.length > 0 ? experienceList.map((exp: any, i: number) => (
                                                     <div key={i} className="border-l-3 border-slate-50 pl-6 relative">
                                                        <div className={`absolute -left-[6px] top-1.5 h-2.5 w-2.5 rounded-full ${accent.bg} border-2 border-white`}></div>
                                                        <div className="flex justify-between items-start mb-1">
                                                           <h6 className="font-black text-[14px] text-slate-900">{exp.role}</h6>
                                                           <span className="text-[10px] font-black text-slate-400">{exp.period}</span>
                                                        </div>
                                                        <div className={`text-[11px] font-bold ${accent.text} mb-3`}>{exp.company}</div>
                                                        <p className="text-[11px] text-slate-500 leading-relaxed font-medium line-clamp-4">{exp.desc}</p>
                                                     </div>
                                                  )) : (
                                                    <p className="text-xs text-slate-400 italic">Add your experience in the "Work Experience" tab.</p>
                                                  )}
                                               </div>
                                            </div>

                                            <div>
                                               <h5 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-6 ${accent.text}`}>Key Projects</h5>
                                               <div className="space-y-6">
                                                  {projectsList.length > 0 ? projectsList.slice(0, 3).map((p: any, i: number) => (
                                                     <div key={i} className="group border-l-2 border-slate-50 pl-4 py-1 hover:border-blue-100 transition-colors">
                                                        <h6 className="font-black text-[13px] text-slate-900 group-hover:text-blue-600 transition-colors uppercase">{p.title}</h6>
                                                         <p className="text-[11px] text-slate-500 leading-relaxed font-medium mt-1">{p.desc}</p>
                                                     </div>
                                                  )) : (
                                                    <p className="text-xs text-slate-400 italic font-medium">Add your projects in the "Projects" tab.</p>
                                                  )}
                                               </div>
                                            </div>
                                         </div>

                                         <div className="col-span-4 space-y-10 border-l border-slate-50 pl-8">
                                            <div>
                                               <h5 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-6 ${accent.text}`}>Expertise</h5>
                                               <div className="flex flex-wrap gap-2">
                                                  {formData.skills ? formData.skills.split(',').map((s: string, i: number) => s.trim() && (
                                                     <span key={i} className={`px-3 py-1.5 rounded-lg text-[9px] font-black tracking-tight ${accent.lightBg} ${accent.text} border border-transparent shadow-sm`}>
                                                       {s.trim()}
                                                     </span>
                                                  )) : (
                                                     ['React', 'Design', 'Strategy'].map((s, i) => (
                                                       <span key={i} className="px-3 py-1.5 rounded-lg text-[9px] font-black bg-slate-50 text-slate-300">
                                                         {s}
                                                       </span>
                                                     ))
                                                   )}
                                               </div>
                                            </div>
                                         </div>
                                      </div>
                                    </>
                                  )}

                                  {/* Template 2: Creative Grid (Centered Full Width) */}
                                  {formData.resumeTemplate === 'creative' && (
                                    <div className="space-y-10">
                                       <div className="text-center pb-8 border-b-4 border-slate-50">
                                          <div className={`inline-block px-4 py-1.5 rounded-full ${accent.lightBg} ${accent.text} text-[10px] font-black uppercase tracking-[0.3em] mb-4`}>
                                             Portfolio Resume
                                          </div>
                                          <h4 className={`text-4xl font-black tracking-tight ${formData.darkMode ? 'text-slate-900' : 'text-slate-900'}`}>{formData.name || 'Your Name'}</h4>
                                          <p className={`text-xl font-bold ${accent.text} mt-2`}>{formData.title || 'Professional Title'}</p>
                                          <div className="flex justify-center flex-wrap gap-8 mt-6 text-[11px] font-bold text-slate-400">
                                             <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> linkedin.com/in/{formData.socials.linkedin || 'handle'}</span>
                                             <span className="flex items-center gap-2"><Layout className="h-4 w-4" /> github.com/{formData.socials.github || 'handle'}</span>
                                          </div>
                                       </div>

                                       <div className="grid grid-cols-12 gap-10">
                                          <div className="col-span-12">
                                             <h5 className={`text-[12px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-3 ${accent.text}`}>
                                                <div className={`h-1 w-10 ${accent.bg}`}></div>
                                                Personal Narrative
                                             </h5>
                                             <p className="text-[13px] leading-relaxed font-medium text-slate-600">
                                                {formData.bio || 'Your professional story here.'}
                                             </p>
                                          </div>

                                          <div className="col-span-7 space-y-10">
                                             <div>
                                                <h5 className={`text-[12px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-3 ${accent.text}`}>
                                                   <div className={`h-1 w-10 ${accent.bg}`}></div>
                                                   Work History
                                                </h5>
                                                <div className="space-y-8">
                                                   {experienceList.map((exp: any, i: number) => (
                                                      <div key={i} className="group">
                                                         <div className="flex justify-between items-baseline mb-1">
                                                            <h6 className="font-extrabold text-[15px] text-slate-900">{exp.role}</h6>
                                                            <span className={`text-[10px] font-black px-2 py-0.5 rounded ${accent.lightBg} ${accent.text}`}>{exp.period}</span>
                                                         </div>
                                                         <div className="text-[12px] font-bold text-slate-500 mb-2">{exp.company}</div>
                                                         <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3">{exp.desc}</p>
                                                      </div>
                                                   ))}
                                                </div>
                                             </div>

                                             <div>
                                                <h5 className={`text-[12px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-3 ${accent.text}`}>
                                                   <div className={`h-1 w-10 ${accent.bg}`}></div>
                                                   Selected Works
                                                </h5>
                                                <div className="space-y-6">
                                                   {projectsList.slice(0, 3).map((p: any, i: number) => (
                                                      <div key={i} className={`p-5 rounded-2xl border-2 border-slate-50 bg-slate-50/30 group hover:border-blue-100 transition-all`}>
                                                         <div className="font-black text-[13px] text-slate-900 mb-2 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{p.title}</div>
                                                         <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{p.desc}</p>
                                                      </div>
                                                   ))}
                                                </div>
                                             </div>
                                          </div>

                                          <div className="col-span-5 space-y-10">
                                             <div>
                                                <h5 className={`text-[12px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-3 ${accent.text}`}>
                                                   <div className={`h-1 w-10 ${accent.bg}`}></div>
                                                   Core Tech
                                                </h5>
                                                <div className="flex flex-wrap gap-2">
                                                   {formData.skills?.split(',').map((s: string, i: number) => s.trim() && (
                                                      <span key={i} className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold bg-slate-900 text-white`}>
                                                         {s.trim()}
                                                      </span>
                                                   ))}
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                  )}
                                </div>
                             </div>
                             <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-slate-900/10 to-transparent pointer-events-none"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  </div>

                  {/* TAB 4: Settings */}
                  <div className={`p-8 space-y-8 ${activeTab === 'settings' ? 'block animate-in fade-in' : 'hidden'}`}>
                     <div className="space-y-6">
                       <div>
                         <h3 className={`text-lg font-bold mb-4 ${formData.darkMode ? 'text-white' : 'text-slate-900'}`}>Site Appearance</h3>
                         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {['blue', 'indigo', 'violet', 'emerald', 'rose', 'amber'].map((color) => (
                              <button
                                key={color}
                                type="button"
                                className={`h-12 rounded-xl flex items-center justify-center border-2 transition-all duration-300 focus:outline-none ${
                                  formData.theme === color 
                                    ? `${accent.border} ring-4 ${accent.ring} scale-[1.02] ${formData.darkMode ? 'bg-slate-800' : 'bg-white'}` 
                                    : `border-transparent ${formData.darkMode ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-slate-50 hover:bg-slate-100'}`
                                }`}
                                onClick={() => setFormData({...formData, theme: color})}
                              >
                                {color === 'blue' && <div className="h-4 w-4 rounded-full mr-2 shadow-sm bg-blue-500" />}
                                {color === 'indigo' && <div className="h-4 w-4 rounded-full mr-2 shadow-sm bg-indigo-600" />}
                                {color === 'violet' && <div className="h-4 w-4 rounded-full mr-2 shadow-sm bg-violet-600" />}
                                {color === 'emerald' && <div className="h-4 w-4 rounded-full mr-2 shadow-sm bg-emerald-600" />}
                                {color === 'rose' && <div className="h-4 w-4 rounded-full mr-2 shadow-sm bg-rose-600" />}
                                {color === 'amber' && <div className="h-4 w-4 rounded-full mr-2 shadow-sm bg-amber-600" />}
                                <span className={`text-xs font-bold capitalize transition-colors ${formData.theme === color ? (formData.darkMode ? 'text-white' : 'text-slate-900') : 'text-slate-500'}`}>{color}</span>
                              </button>
                            ))}
                         </div>
                       </div>
                       
                       <div className={`pt-6 border-t transition-colors duration-500 ${formData.darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                         <h3 className={`text-lg font-bold mb-4 ${formData.darkMode ? 'text-white' : 'text-slate-900'}`}>Site Mode</h3>
                         <div className="flex gap-4">
                            <button
                              type="button"
                              className={`flex-1 h-14 rounded-xl flex items-center justify-center border-2 transition-all duration-300 focus:outline-none ${
                                !formData.darkMode 
                                  ? `${accent.border} ring-4 ${accent.ring} scale-[1.02] bg-white shadow-lg` 
                                  : `border-transparent bg-slate-800 hover:bg-slate-700 text-slate-400`
                              }`}
                              onClick={() => setFormData({...formData, darkMode: false})}
                            >
                              <Sparkles className={`h-5 w-5 mr-3 transition-colors ${!formData.darkMode ? 'text-amber-500' : 'text-slate-600'}`} />
                              <div className="text-left">
                                <div className={`text-xs font-bold leading-tight ${!formData.darkMode ? 'text-slate-900' : 'text-slate-400'}`}>Light Mode</div>
                                <div className="text-[10px] opacity-60">Clean & Bright</div>
                              </div>
                            </button>
                            <button
                              type="button"
                              className={`flex-1 h-14 rounded-xl flex items-center justify-center border-2 transition-all duration-300 focus:outline-none ${
                                formData.darkMode 
                                  ? `${accent.border} ring-4 ${accent.ring} scale-[1.02] bg-slate-900 text-white shadow-lg` 
                                  : `border-transparent bg-slate-50 hover:bg-slate-100 text-slate-500`
                              }`}
                              onClick={() => setFormData({...formData, darkMode: true})}
                            >
                              <Hexagon className={`h-5 w-5 mr-3 transition-colors ${formData.darkMode ? 'text-indigo-400' : 'text-slate-400'}`} />
                              <div className="text-left">
                                <div className={`text-xs font-bold leading-tight ${formData.darkMode ? 'text-white' : 'text-slate-600'}`}>Dark Mode</div>
                                <div className="text-[10px] opacity-60">Premium & Sleek</div>
                              </div>
                            </button>
                         </div>
                       </div>
                       
                       <div className={`pt-6 border-t transition-colors duration-500 ${formData.darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                        <h3 className={`text-lg mb-4 font-bold ${formData.darkMode ? 'text-white' : 'text-slate-900'}`}>Inbox Overview</h3>
                        <p className={`text-sm mb-4 transition-colors ${formData.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Total messages received: <span className={`font-bold ${accent.text}`}>{messagesList.length}</span></p>
                       </div>
                       
                       <div className={`pt-6 border-t transition-colors duration-500 ${formData.darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                         <h3 className={`text-lg mb-4 font-bold ${formData.darkMode ? 'text-white' : 'text-slate-900'}`}>Section Visibility</h3>
                         <p className={`text-sm mb-6 ${formData.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Choose which sections to display on your live portfolio.</p>
                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                           {Object.entries(formData.visibleSections).map(([key, value]) => (
                             <label key={key} className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${value ? `${accent.border} ${formData.darkMode ? 'bg-slate-800/50' : accent.lightBg}` : `${formData.darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}`}`}>
                               <input 
                                 type="checkbox" 
                                 className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                                 checked={value}
                                 onChange={(e) => {
                                   setFormData({
                                     ...formData,
                                     visibleSections: {
                                       ...formData.visibleSections,
                                       [key]: e.target.checked
                                     }
                                   });
                                 }}
                               />
                               <span className={`font-bold capitalize ${formData.darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{key}</span>
                             </label>
                           ))}
                         </div>
                       </div>
                     </div>
                  </div>

                </form>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
