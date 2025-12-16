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
    
    // --- הגנה מוחלטת: מוודא שהמספר הוא תקין, אחרת מציג 0 ---
    const safeProgress = (typeof scrollProgress === 'number' && Number.isFinite(scrollProgress)) 
        ? Math.round(Math.max(0, Math.min(100, scrollProgress))) 
        : 0;

    return (
        <header 
            className={`
                sticky top-0 z-40 w-full transition-all duration-500
                border-b 
                ${isScrolled 
                    ? 'py-3 bg-[#02040a]/95 backdrop-blur-xl border-indigo-500/30 shadow-[0_0_30px_rgba(79,70,229,0.2)]' 
                    : 'py-6 bg-[#02040a] border-white/5' 
                }
            `}
        >
            {/* רקע רשת פנימי */}
            <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(99,102,241,0.1)_50%,transparent_100%)] animate-[shimmer_3s_infinite]"></div>
            </div>

            {/* קו התקדמות עליון */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-slate-800">
                <div 
                    className={`h-full bg-gradient-to-r from-${colorFrom} via-white to-${colorTo} shadow-[0_0_15px_${colorFrom}] transition-all duration-100 ease-out`}
                    style={{ width: `${safeProgress}%` }} 
                ></div>
            </div>

            <div className="w-full h-full px-6 md:px-10 relative z-10 flex items-start justify-between">
                
                {/* צד ימין: כותרת */}
                <div className="flex flex-col items-start justify-center max-w-3xl">
                    <div className={`flex items-center gap-3 text-[11px] font-mono font-bold tracking-widest text-${colorFrom} mb-2`}>
                        <span className={`flex items-center gap-1.5 bg-${colorFrom}/10 px-2 py-1 rounded border border-${colorFrom}/20 text-${colorFrom}`}>
                            <Terminal size={10} />
                            <span>פרק {chapterNum.replace(/\D/g, '')}</span>
                        </span>
                    </div>

                    <h1 className={`font-black text-white leading-tight transition-all duration-300 ${isScrolled ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
                        {title}
                    </h1>

                    <div className={`transition-all duration-500 overflow-hidden ${isScrolled ? 'max-h-0 opacity-0 mt-0' : 'max-h-32 opacity-80 mt-2'}`}>
                        <p className="text-sm text-slate-400 leading-relaxed font-medium max-w-2xl">
                            {description}
                        </p>
                    </div>
                </div>

                {/* צד שמאל: נתונים משתנים */}
                <div className="flex items-center pl-2 pt-1 shrink-0">
                    <div className={`
                        relative overflow-hidden
                        flex items-center gap-4 px-5 py-2
                        rounded-lg transition-all duration-500
                        ${isScrolled 
                            ? 'bg-[#0f172a] border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                            : 'bg-[#0B1221] border border-slate-700/60'
                        }
                    `}>
                        <div className="flex flex-col items-end relative z-10">
                            <span className={`text-[9px] font-mono uppercase tracking-wider mb-0.5 whitespace-nowrap ${isScrolled ? 'text-emerald-400' : 'text-slate-400'}`}>
                                {isScrolled ? "התקדמות בשיעור" : "זמן קריאה משוער"}
                            </span>
                            
                            <div className="flex items-center gap-2">
                                <span className={`text-base font-bold font-mono whitespace-nowrap transition-colors duration-300 ${isScrolled ? 'text-emerald-400' : 'text-white'}`}>
                                    {isScrolled ? safeProgress : readTime}
                                </span>
                                
                                {isScrolled ? (
                                    <Percent size={14} className="text-emerald-500" />
                                ) : (
                                    <Clock size={16} className={`text-${colorTo}`} />
                                )}
                            </div>
                        </div>

                        <div className={`w-[1px] h-8 mx-1 hidden sm:block transition-colors ${isScrolled ? 'bg-emerald-900' : 'bg-slate-700'}`}></div>

                        {isScrolled ? (
                             <Activity size={18} className="text-emerald-500" />
                        ) : (
                             <Zap size={18} className="text-slate-500 hidden sm:block" />
                        )}
                    </div>
                </div>

            </div>
        </header>
    );
};