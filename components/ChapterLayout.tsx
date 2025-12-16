"use client";

import React, { useState, ReactNode } from 'react';
import { CourseHeader } from "@/components/CourseHeader";
import { CourseSidebar } from "@/components/CourseSidebar";
import { chapters } from "@/lib/courseData"; // ייבוא הנתונים המרכזיים

interface ChapterLayoutProps {
    children: ReactNode;
    currentChapterId: number; // השינוי הגדול: מקבלים רק מזהה פרק
}

export const ChapterLayout: React.FC<ChapterLayoutProps> = ({ 
    children, 
    currentChapterId
}) => {
    // 1. שליפת הנתונים של הפרק מתוך הקובץ המרכזי
    const chapter = chapters.find(c => c.id === currentChapterId);

    // הגדרת ברירת מחדל למקרה של תקלה (לא אמור לקרות)
    const activeChapter = chapter || {
        num: `פרק ${currentChapterId}`,
        title: "פרק לא נמצא",
        description: "לא נמצא מידע עבור פרק זה.",
        readTime: "0 דקות",
        color: "slate" 
    };

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

    return (
        <div className="flex min-h-screen bg-[#050B14] font-sans text-slate-100 selection:bg-indigo-500/30 overflow-hidden relative" dir="rtl">
            
            {/* רקע נקודות */}
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
                 {/* תאורה דינמית לפי צבע הפרק! */}
                 <div className={`absolute top-[-20%] right-[-10%] w-150 h-150 bg-${activeChapter.color}-500/20 blur-[120px] rounded-full mix-blend-screen animate-pulse`}></div>
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050B14_120%)]"></div>
            </div>

            <CourseSidebar />

            <div 
                className="flex-1 h-screen overflow-y-auto custom-scrollbar scroll-smooth relative z-10"
                onScroll={handleScroll}
            >
                {/* הזרקת הנתונים ל-Header באופן אוטומטי */}
                <CourseHeader 
                    chapterNum={activeChapter.num}
                    title={activeChapter.title}
                    description={activeChapter.description}
                    readTime={activeChapter.readTime}
                    isScrolled={isScrolled}
                    scrollProgress={scrollProgress}
                    // בניית גוונים לפי הצבע שהוגדר ב-courseData
                    colorFrom={`${activeChapter.color}-400`} 
                    colorTo={`${activeChapter.color}-600`}
                />

                <main className="max-w-4xl mx-auto px-8 md:px-12 py-12 space-y-24 pb-48 pt-32">
                    {children}
                </main>
            </div>
        </div>
    );
};