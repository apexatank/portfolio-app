'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Quote, ChevronDown } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

interface Testimonial {
  name: string;
  role: string;
  text: string;
}

interface TestimonialsSliderProps {
  testimonials: Testimonial[];
  darkMode?: boolean;
  accent: {
    bg: string;
    text: string;
    lightBg: string;
    lightBorder: string;
  };
}

export function TestimonialsSlider({ testimonials, accent, darkMode = false }: TestimonialsSliderProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      
      if (direction === 'right') {
        if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      } else {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      scroll('right');
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative group/parent">
      {/* Manual Navigation Buttons */}
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 hidden md:block opacity-0 group-hover/parent:opacity-100 transition-opacity">
        <Button 
          variant="outline" 
          size="icon" 
          className={`h-10 w-10 rounded-full shadow-lg border-transparent transition-colors ${darkMode ? 'bg-slate-900 hover:bg-slate-800 text-white border-slate-700' : 'bg-white hover:bg-slate-50 border-slate-100'}`}
          onClick={() => scroll('left')}
        >
          <ChevronDown className="h-6 w-6 rotate-90" />
        </Button>
      </div>
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 hidden md:block opacity-0 group-hover/parent:opacity-100 transition-opacity">
        <Button 
          variant="outline" 
          size="icon" 
          className={`h-10 w-10 rounded-full shadow-lg border-transparent transition-colors ${darkMode ? 'bg-slate-900 hover:bg-slate-800 text-white border-slate-700' : 'bg-white hover:bg-slate-50 border-slate-100'}`}
          onClick={() => scroll('right')}
        >
          <ChevronDown className="h-6 w-6 -rotate-90" />
        </Button>
      </div>

      <div 
        ref={scrollRef}
        id="testimonial-slider" 
        className="flex overflow-x-auto overflow-y-hidden gap-8 py-6 px-4 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing scroll-smooth"
      >
        {testimonials.map((t, idx) => (
          <div key={idx} className="min-w-[300px] md:min-w-[400px] snap-center">
            <ScrollReveal delay={0.1 + (idx * 0.1)} direction="up">
              <div className={`p-8 rounded-3xl border relative shadow-sm hover:shadow-xl transition-all duration-500 min-h-[240px] flex flex-col group ${darkMode ? 'bg-slate-900/60 backdrop-blur-md border-slate-800/50' : 'bg-white/60 backdrop-blur-sm border-slate-100'}`}>
                <Quote className={`absolute top-4 right-4 h-12 w-12 ${accent.text} opacity-5 transition-opacity group-hover:opacity-10`} />
                
                <p
                  className={`mb-6 italic leading-relaxed grow relative z-10 break-words break-all whitespace-normal overflow-hidden
                  transition-colors duration-500 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}
                >
                  "{t.text}"
                </p>
                
                <div className="flex items-center gap-3">
                  <div className={`h-12 w-12 rounded-full ${accent.bg} flex items-center justify-center text-white font-bold shadow-md text-xl`}>
                     {t.name[0]}
                  </div>
                  <div className="text-left">
                    <div className={`font-bold transition-colors duration-500 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.name}</div>
                    <div className={`text-xs font-medium transition-colors duration-500 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>{t.role}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        ))}
      </div>
    </div>
  );
}
