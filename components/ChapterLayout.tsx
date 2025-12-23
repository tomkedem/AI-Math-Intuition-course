"use client";

import React, { useState, ReactNode } from 'react';
import Link from 'next/link';
import { CourseHeader } from "@/components/CourseHeader";
import { CourseSidebar } from "@/components/CourseSidebar";
import { chapters } from "@/lib/courseData"; 
import { ChevronRight, ChevronLeft, BookOpen } from "lucide-react";

interface ChapterLayoutProps {
    children: ReactNode;
    currentChapterId: number;
}

export const ChapterLayout: React.FC<ChapterLayoutProps> = ({ 
    children, 
    currentChapterId
}) => {
    // 1. שליפת הפרק הנוכחי
    const chapterIndex = chapters.findIndex(c => c.id === currentChapterId);
    const activeChapter = chapters[chapterIndex] || {
        num: `פרק ${currentChapterId}`,
        title: "פרק לא נמצא",
        description: "לא נמצא מידע עבור פרק זה.",
        readTime: "0 דקות",
        color: "slate" 
    };

    // בדיקה האם זה המבוא
    const isIntro = currentChapterId === 0;

    // 2. חישוב פרק הבא ופרק קודם
    const prevChapter = chapters[chapterIndex - 1];
    const nextChapter = chapters[chapterIndex + 1];

    // ניהול גלילה
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (!isScrolled && scrollTop > 50) setIsScrolled(true);
        else if (isScrolled && scrollTop < 30) setIsScrolled(false);

        const totalScroll = scrollHeight - clientHeight;
        if (totalScroll <= 0) {
            setScrollProgress(0);
            return;
        }
        const currentProgress = (scrollTop / totalScroll) * 100;
        setScrollProgress(currentProgress);
    };

    const themeColor = activeChapter.color;

    return (
        <div className="flex min-h-screen bg-[#050B14] font-sans text-slate-100 selection:bg-indigo-500/30 overflow-hidden relative" dir="rtl">
            
            {/* --- רקע גלובלי --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                 <div className="absolute inset-0 bg-[#050B14]"></div>
                 
                 <div className="absolute inset-0 opacity-40"> 
                    <div className="absolute inset-0" 
                        style={{ 
                            backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`,
                            backgroundSize: '40px 40px' 
                        }}
                    ></div>
                 </div>

                 <div className={`absolute top-[-20%] right-[-10%] w-150 h-150 bg-${themeColor}-500/20 blur-[120px] rounded-full mix-blend-screen animate-pulse`}></div>
                 <div className={`absolute bottom-[-20%] left-[-10%] w-125 h-125 bg-${themeColor}-600/10 blur-[100px] rounded-full mix-blend-screen`}></div>
                 
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050B14_120%)]"></div>
            </div>

            <CourseSidebar />

            <div 
                className="flex-1 h-screen overflow-y-auto custom-scrollbar scroll-smooth relative z-10"
                onScroll={handleScroll}
            >
                <CourseHeader 
                    chapterLable={activeChapter.label}
                    chapterNum={activeChapter.num}
                    title={activeChapter.title}
                    description={activeChapter.description}
                    readTime={activeChapter.readTime}
                    isScrolled={isScrolled}
                    scrollProgress={scrollProgress}
                    colorFrom={`${themeColor}-400`} 
                    colorTo={`${themeColor}-600`}
                />

                {/* --- התיקון נמצא כאן --- */}
                {/* אם זה המבוא, אנחנו נותנים פחות Padding למעלה (pt-4) */}
                {/* אם זה פרק רגיל, אנחנו שומרים על המרווח הגדול (pt-32) כדי לא להסתיר טקסט */}
                
                <main className={`max-w-4xl mx-auto px-8 md:px-12 pb-32 space-y-24 
                    ${isIntro ? 'pt-0' : 'pt-8 py-3'} 
                `}>
                    
                    {/* תוכן הפרק */}
                    <div className="min-h-[50vh]">
                        {children}
                    </div>

                    {/* --- אזור ניווט תחתון (Footer) --- */}
                    <div className="border-t border-slate-800/60 pt-12 mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {prevChapter ? (
                            <Link href={prevChapter.href} className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:bg-slate-800 hover:border-slate-700">
                                <div className="flex flex-col items-start gap-2 relative z-10">
                                    <span className="text-xs font-mono text-slate-500 group-hover:text-slate-400 transition-colors flex items-center gap-2">
                                        <ChevronRight size={14} /> הקודם
                                    </span>
                                    <div className="font-bold text-lg text-slate-300 group-hover:text-white transition-colors">
                                        {prevChapter.title}
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <div></div>
                        )}

                        {nextChapter ? (
                            <Link href={nextChapter.href} className={`group relative overflow-hidden rounded-2xl border border-${themeColor}-500/30 bg-${themeColor}-900/10 p-6 transition-all hover:bg-${themeColor}-900/20 hover:border-${themeColor}-500/50 text-left`}>
                                <div className={`absolute inset-0 bg-linear-to-r from-transparent via-${themeColor}-500/5 to-${themeColor}-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                
                                <div className="flex flex-col items-end gap-2 relative z-10">
                                    <span className={`text-xs font-mono font-bold text-${themeColor}-400 group-hover:text-${themeColor}-300 transition-colors flex items-center gap-2`}>
                                        הבא: פרק {nextChapter.id} <ChevronLeft size={14} />
                                    </span>
                                    <div className="font-bold text-xl text-white group-hover:scale-[1.02] transition-transform origin-right">
                                        {nextChapter.title}
                                    </div>
                                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                                        <BookOpen size={12} />
                                        {nextChapter.readTime}
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 flex flex-col items-center justify-center text-center text-slate-500">
                                <span className="text-sm">סיימת את כל הפרקים! 🚀</span>
                            </div>
                        )}

                    </div>

                </main>
            </div>
        </div>
    );
};