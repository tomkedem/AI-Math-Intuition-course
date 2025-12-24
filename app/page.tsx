"use client";

import React, { useCallback } from 'react';
import Link from 'next/link';
import { courses } from "@/lib/courseData"; 
import { ArrowLeft, Terminal, Sigma, BrainCircuit, BookOpen } from "lucide-react";
// ייבואים עבור הרקע המונפש
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine, ISourceOptions } from "tsparticles-engine"; // <--- הוספנו את ISourceOptions

export default function HomePage() {
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // הגדרת הטיפוס בצורה מפורשת
  const particlesOptions: ISourceOptions = {
    fullScreen: { enable: false },
    background: {
        color: { value: "transparent" },
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "grab",
            },
            resize: true,
        },
        modes: {
            grab: {
                distance: 150,
                links: {
                    opacity: 0.5,
                    color: "#6366f1"
                }
            },
        },
    },
    particles: {
        color: {
            value: ["#4f46e5", "#60a5fa", "#a78bfa"],
        },
        links: {
            color: "#4f46e5",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "bounce",
            },
            random: true,
            speed: 1,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 800,
            },
            value: 100,
        },
        opacity: {
            value: 0.5,
            random: true,
        },
        shape: {
            type: "circle",
        },
        size: {
            value: { min: 1, max: 3 },
        },
    },
    detectRetina: true,
  };

  const getIcon = (id: string) => {
    switch(id) {
        case 'python': return <Terminal size={32} />;
        case 'probability': return <BrainCircuit size={32} />;
        default: return <Sigma size={32} />;
    }
  };

  const getIconColor = (id: string) => {
    switch(id) {
        case 'python': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
        case 'probability': return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
        default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30 relative overflow-hidden" dir="rtl">
        
        {/* --- רקע חלקיקים מונפש --- */}
        <div className="fixed inset-0 z-0 pointer-events-none">
             <Particles
                id="tsparticles"
                init={particlesInit}
                options={particlesOptions} // <--- עכשיו זה תקין ללא as any
                className="absolute inset-0 h-full w-full"
            />
        </div>

        {/* שכבת גרדיאנט עדינה מעל החלקיקים */}
        <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-900/20 via-[#020617]/80 to-[#020617]"></div>

        <main className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col items-center">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-mono text-slate-400 mb-4 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_10px_#6366f1]"></span>
                    Core Foundations v1.0
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-b from-white via-indigo-100 to-slate-500 tracking-tight leading-tight drop-shadow-sm">
                    הליבה ההנדסית <br/>
                    של מערכות AI
                </h1>
                
                <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                    להבין את מה שמתחת למכסה המנוע: 
                    <strong> המתמטיקה</strong>, <strong>ההסתברות</strong> ו-<strong>קוד הפייתון</strong> שמניעים את המודלים.
                    לומדה אינטראקטיבית למתכנתים שרוצים לבנות הבנה עמוקה.
                </p>
            </div>

            {/* Grid הקורסים */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full relative z-20">
                {Object.values(courses).map((course) => {
                    const firstChapterHref = course.chapters[0]?.href || '#';

                    return (
                        <Link 
                            key={course.id} 
                            href={firstChapterHref}
                            className="group relative h-full"
                        >
                            <div className="absolute inset-0 bg-linear-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-3xl transform transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl shadow-black/50"></div>
                            
                            <div className="absolute inset-0 rounded-3xl border border-slate-700/50 group-hover:border-indigo-500/50 transition-colors duration-300"></div>

                            <div className="relative h-full p-8 flex flex-col items-start">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border mb-6 transition-colors duration-300 ${getIconColor(course.id)} shadow-lg`}>
                                    {getIcon(course.id)}
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                                    {course.title.he}
                                </h2>
                                
                                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                                    {course.description.he}
                                </p>

                                <div className="w-full pt-6 border-t border-slate-700/50 flex items-center justify-between mt-auto">
                                    <span className="text-xs font-mono text-slate-500 flex items-center gap-2">
                                        <BookOpen size={14} />
                                        {course.chapters.length} פרקים
                                    </span>
                                    
                                    <span className="flex items-center gap-2 text-sm font-bold text-white group-hover:-translate-x-1 transition-transform">
                                        התחל ללמוד
                                        <ArrowLeft size={16} />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

        
            <footer className="w-full mt-32 py-12 border-t border-slate-800/60 bg-[#0B1121]/50 backdrop-blur-sm relative z-20">
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    
                 
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-slate-400 text-base font-medium">נבנה ופותח ע&quot;י</span>
                        <span className="text-3xl font-black text-white tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            תומר קדם
                        </span>
                    </div>

                  
                    <div className="flex items-center gap-3 text-slate-500 text-sm mt-2 font-mono">
                        <span>© 2025</span>
                        <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                        <span>עבור מפתחי AI</span>
                        <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                        <span>גרסה 4.0</span>
                    </div>
                    
                </div>
            </footer>
        </main>
    </div>
  );
}