"use client";

import React from 'react';
import { Terminal, Clock, Activity } from "lucide-react";

interface CourseHeaderProps {
    chapterNum: string;
    title: string;
    description: string;
    readTime?: string;
    isScrolled: boolean;
    colorFrom?: string;
    colorTo?: string;
}

export const CourseHeader: React.FC<CourseHeaderProps> = ({ 
    chapterNum, 
    title, 
    description,
    readTime = "10 דקות", 
    isScrolled,
    colorFrom = "indigo-500",
}) => {
    
    return (
        // שינוי קריטי: sticky במקום fixed
        // זה גורם ל-Header להישאר בתוך גבולות ה-Main (מסך פחות סרגל צד)
        <header 
            className={`
                sticky top-0 z-40 w-full transition-all duration-300
                border-b border-white/10
                ${isScrolled 
                    ? 'py-3 bg-[#02040a]/95 backdrop-blur-xl shadow-2xl' 
                    : 'py-6 bg-[#02040a]' 
                }
            `}
        >
            {/* --- רקע רשת (Grid) --- */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div 
                    className="absolute inset-0" 
                    style={{ 
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                ></div>
                {/* Gradient Fade to improve text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-transparent to-transparent"></div>
            </div>

            {/* --- קו עליון זוהר --- */}
            <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-${colorFrom} to-transparent opacity-80 shadow-[0_0_15px_${colorFrom}]`}></div>

            {/* --- Layout Container --- */}
            {/* Flexbox: Justify Between דוחף את הכותרת לימין ואת הזמן לשמאל הקיצוני */}
            <div className="w-full h-full px-6 md:px-10 relative z-10 flex items-start justify-between">
                
                {/* -------------------------------
                    צד ימין: כותרת + תיאור
                   ------------------------------- */}
                <div className="flex flex-col items-start justify-center max-w-3xl">
                    
                    {/* Meta Tag: פרק 5 */}
                    <div className={`flex items-center gap-3 text-[11px] font-mono font-bold tracking-widest text-${colorFrom} mb-2`}>
                        <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded border border-white/10">
                            <Terminal size={10} />
                            <span>פרק {chapterNum.replace(/\D/g, '')}</span>
                        </span>
                    </div>

                    {/* כותרת ראשית */}
                    <h1 className={`font-black text-white leading-tight transition-all duration-300 ${isScrolled ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
                        {title}
                    </h1>

                    {/* תיאור (נעלם בגלילה) */}
                    <div className={`transition-all duration-500 overflow-hidden ${isScrolled ? 'max-h-0 opacity-0 mt-0' : 'max-h-32 opacity-80 mt-2'}`}>
                        <p className="text-sm text-slate-400 leading-relaxed font-medium max-w-2xl">
                            {description}
                        </p>
                    </div>
                </div>

                {/* -------------------------------
                    צד שמאל: הערכת זמן (תמיד גלוי!)
                   ------------------------------- */}
                <div className="flex items-center pl-2 pt-1 shrink-0">
                    <div className={`
                        flex items-center gap-4 px-5 py-2
                        bg-[#0B1221] border border-slate-700/60 rounded-lg
                        shadow-[0_4px_20px_-5px_rgba(0,0,0,0.5)]
                    `}>
                        {/* מידע טקסטואלי */}
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mb-0.5 whitespace-nowrap">
                                זמן קריאה
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="text-base font-bold text-white font-mono whitespace-nowrap">{readTime}</span>
                                <Clock size={16} className={`text-${colorFrom}`} />
                            </div>
                        </div>

                        {/* מפריד אנכי */}
                        <div className="w-[1px] h-8 bg-slate-700 mx-1 hidden sm:block"></div>

                        {/* אינדיקטור */}
                        <Activity size={18} className="text-slate-500 hidden sm:block" />
                    </div>
                </div>

            </div>
        </header>
    );
};