"use client";

import React from 'react';
import { Terminal, Clock, Activity, Zap, Percent } from "lucide-react";

interface CourseHeaderProps {
    chapterNum: string;
    title: string;
    description: string;
    readTime?: string;
    isScrolled: boolean;
    scrollProgress: number;
    colorFrom?: string;
    colorTo?: string;
}

export const CourseHeader: React.FC<CourseHeaderProps> = ({ 
    chapterNum, 
    title, 
    description,
    readTime = "10 דקות", 
    isScrolled,
    scrollProgress,
    colorFrom = "indigo-500",
    colorTo = "purple-600",
}) => {
    
    const safeProgress = (typeof scrollProgress === 'number' && Number.isFinite(scrollProgress)) 
        ? Math.round(Math.max(0, Math.min(100, scrollProgress))) 
        : 0;

    return (
        <header 
            className={`
                sticky top-0 z-40 w-full transition-all duration-500
                border-b border-indigo-500/20
                ${isScrolled 
                    ? 'py-3 bg-[#0B1121]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
                    : 'py-6 bg-[#0F172A]' 
                }
            `}
        >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0F172A] to-[#02040a]"></div>

            {/* --- שינוי 1: הגדלת המשבצות --- */}
            <div className="absolute inset-0 pointer-events-none opacity-60"> 
                <div 
                    className="absolute inset-0" 
                    style={{ 
                        backgroundImage: `
                            linear-gradient(to right, rgba(99, 102, 241, 0.15) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(99, 102, 241, 0.15) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px' // הוגדל מ-30 ל-60
                    }}
                ></div>
                <div 
                    className="absolute inset-0 opacity-30"
                    style={{ 
                        backgroundImage: `
                            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '300px 300px' // הוגדל מ-150 ל-300
                    }}
                ></div>
            </div>

            {/* --- שינוי 2: הסרת "ראש הלייזר" הלבן --- */}
            <div className={`absolute bottom-0 left-0 w-full h-[3px] bg-slate-900/80 transition-opacity duration-300 ${safeProgress > 0 ? 'opacity-100' : 'opacity-0'}`}>
                <div 
                    // הקו עצמו נשאר, אבל הוא נקי עכשיו
                    className={`relative h-full bg-gradient-to-r from-${colorFrom} via-cyan-400 to-${colorTo} shadow-[0_0_20px_${colorFrom}] transition-all duration-100 ease-out`}
                    style={{ width: `${safeProgress}%` }} 
                >
                    {/* האלמנטים הלבנים שהיו כאן נמחקו */}
                </div>
            </div>

            <div className="w-full h-full px-6 md:px-10 relative z-10 flex items-start justify-between">
                
                {/* צד ימין: כותרת */}
                <div className="flex flex-col items-start justify-center max-w-3xl">
                    <div className={`flex items-center gap-3 text-[11px] font-mono font-bold tracking-widest text-${colorFrom} mb-2`}>
                        <span className={`flex items-center gap-1.5 bg-[#0F172A] px-3 py-1.5 rounded border border-${colorFrom}/40 text-cyan-300 shadow-lg shadow-indigo-900/20`}>
                            <Terminal size={12} />
                            <span>פרק {chapterNum.replace(/\D/g, '')}</span>
                        </span>
                    </div>

                    <h1 className={`font-black text-white leading-tight transition-all duration-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] ${isScrolled ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
                        {title}
                    </h1>

                    <div className={`transition-all duration-500 overflow-hidden ${isScrolled ? 'max-h-0 opacity-0 mt-0' : 'max-h-32 opacity-90 mt-2'}`}>
                        <p className="text-sm text-slate-300 leading-relaxed font-medium max-w-2xl drop-shadow-md bg-[#0F172A]/40 p-2 rounded-md border border-white/5 backdrop-blur-sm">
                            {description}
                        </p>
                    </div>
                </div>

                {/* צד שמאל: נתונים */}
                <div className="flex items-center pl-2 pt-1 shrink-0">
                    <div className={`
                        relative overflow-hidden
                        flex items-center gap-4 px-6 py-3
                        rounded-xl transition-all duration-500
                        ${isScrolled 
                            ? 'bg-[#0f172a] border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
                            : 'bg-[#1E293B] border border-slate-600/50 shadow-xl' 
                        }
                    `}>
                        <div className="flex flex-col items-end relative z-10">
                            <span className={`text-[10px] font-mono uppercase tracking-wider mb-0.5 whitespace-nowrap ${isScrolled ? 'text-emerald-400' : 'text-slate-400'}`}>
                                {isScrolled ? "התקדמות בשיעור" : "זמן קריאה משוער"}
                            </span>
                            
                            <div className="flex items-center gap-2">
                                <span className={`text-lg font-bold font-mono whitespace-nowrap transition-colors duration-300 ${isScrolled ? 'text-emerald-400' : 'text-white'}`}>
                                    {isScrolled ? safeProgress : readTime}
                                </span>
                                
                                {isScrolled ? (
                                    <Percent size={16} className="text-emerald-500" />
                                ) : (
                                    <Clock size={18} className={`text-${colorTo}`} />
                                )}
                            </div>
                        </div>

                        <div className={`w-[1px] h-10 mx-2 hidden sm:block transition-colors ${isScrolled ? 'bg-emerald-900' : 'bg-slate-600'}`}></div>

                        {isScrolled ? (
                             <Activity size={20} className="text-emerald-500" />
                        ) : (
                             <Zap size={20} className="text-amber-400 hidden sm:block drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                        )}
                    </div>
                </div>

            </div>
        </header>
    );
};