"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Circle, PlayCircle, Menu, X, Terminal, Sigma, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { courses } from "@/lib/courseData"; // ייבוא הנתונים האמיתיים

export function CourseSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // 1. זיהוי הקורס הנוכחי מתוך ה-URL
  const segments = pathname?.split('/').filter(Boolean) || [];
  const currentCourseId = segments[0]; // "math", "python", "probability"
  
  // שליפת הנתונים מהקובץ המרכזי
  const course = courses[currentCourseId];

  // אם אנחנו לא בתוך קורס מוכר, לא נציג סרגל (או שנציג ריק)
  if (!course) return null;

  // חישוב התקדמות
  const currentChapterIndex = course.chapters.findIndex(c => c.href === pathname);
  // אם לא מצאנו פרק (למשל במבוא), נניח שאנחנו ב-0% או לפי ההיגיון
  const safeIndex = currentChapterIndex === -1 ? 0 : currentChapterIndex;
  const progress = Math.round(((safeIndex + 1) / course.chapters.length) * 100);

  // בחירת אייקון ראשי לפי הקורס
  const getCourseIcon = () => {
      switch(currentCourseId) {
          case 'python': return <Terminal size={20} />;
          case 'probability': return <BrainCircuit size={20} />;
          default: return <Sigma size={20} />; // math
      }
  };

  const getCourseColor = () => {
      switch(currentCourseId) {
          case 'python': return 'text-yellow-400';
          case 'probability': return 'text-pink-400';
          default: return 'text-sky-400'; // math
      }
  };

  // תוכן הסרגל
  const sidebarContent = (
      <div className="flex flex-col h-full bg-[#0f172a]">
          {/* Header - שם הקורס */}
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white font-bold shadow-lg shadow-black/20 border border-slate-700">
                    <span className={getCourseColor()}>{getCourseIcon()}</span>
                </div>
                <div className="flex flex-col min-w-0">
                    <h1 className="font-bold text-white text-base truncate leading-tight">
                        {course.title.he}
                    </h1>
                    <span className="text-gray-500 text-[12px] mt-0.5 truncate">
                        {course.description.he}
                    </span>
                </div>
                
                {/* כפתור סגירה למובייל */}
                {isOpen && (
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="p-1 rounded-full text-slate-400 hover:text-white mr-auto md:hidden"
                    >
                        <X size={24} />
                    </button>
                )}
            </div>

            {/* User Card - העיצוב המקורי שלך */}
            <div className="flex items-center bg-[#1E293B] rounded-2xl p-3 gap-3 w-full shadow-lg border border-slate-700/50 relative overflow-hidden group">
                {/* אפקט ברק עדין ברקע */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md border-2 border-blue-400">
                        תק
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#1E293B] rounded-full"></div>
                </div>

                <div className="flex flex-col text-right min-w-0 relative z-10">
                    <span className="text-white font-bold text-sm leading-tight">תומר קדם</span>
                    <span className="text-slate-400 text-[12px]">מחבר הלומדה</span>
                    <span className="text-indigo-400 text-[16px] mt-0.5 font-medium">AI Developer Series</span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-5">
                <div className="flex justify-between text-[10px] text-slate-400 mb-1.5 font-mono">
                    <span>התקדמות בקורס</span>
                    <span className={progress === 100 ? 'text-emerald-400' : ''}>{progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                    <div 
                        className={`h-full transition-all duration-700 ease-out ${progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                        style={{ width: `${Math.max(2, progress)}%` }}
                    />
                </div>
            </div>
          </div>

          {/* Navigation List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-0.5">
              <div className="text-[10px] font-bold text-slate-500 mb-2 px-2 uppercase tracking-widest opacity-70 mt-2">
                  תוכן העניינים
              </div>
              
              {course.chapters.map((chapter) => {
                  // נשתמש ב-href מה-data
                  const isActive = pathname === chapter.href;
                  
                  // גזירת צבע ייחודי לפרק הפעיל (למשל מכחול לטקסט כחול)
                  const activeTextColor = chapter.labelColor || "text-blue-400";
                  
                  // בחירת אייקון
                  const Icon = isActive ? PlayCircle : Circle;

                  return (
                    <Link 
                        key={chapter.id} 
                        href={chapter.href || "#"}
                        onClick={() => setIsOpen(false)}
                    >
                        <div className={`
                            relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group mb-1
                            ${isActive 
                                ? 'bg-slate-800 text-white shadow-md shadow-black/10 border border-slate-700' 
                                : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 border border-transparent'
                            }
                        `}>
                            {/* פס צבע צדדי לפרק פעיל */}
                            {isActive && (
                                <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-l-full bg-current ${activeTextColor} opacity-80`}></div>
                            )}

                            <Icon 
                                size={isActive ? 18 : 14} 
                                className={`shrink-0 transition-colors ${isActive ? activeTextColor : "text-slate-600 group-hover:text-slate-400"}`} 
                            />
                            
                            <div className="flex flex-col min-w-0">
                                <span className={`text-[10px] font-mono leading-none mb-0.5 opacity-80 ${isActive ? activeTextColor : ''}`}>
                                    {chapter.id === 0 ? "מבוא" : `פרק ${chapter.id}`}
                                </span>
                                <span className={`truncate leading-tight font-medium ${isActive ? 'text-white' : ''}`}>
                                    {chapter.label.he}
                                </span>
                            </div>
                        </div>
                    </Link>
                  );
              })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800/80 bg-[#0B1121] text-[10px] text-slate-600 text-center shrink-0">
              <div className="flex justify-center items-center gap-2">
                  <span>v4.6</span>
                  <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                  <span>AI Math Primer</span>
              </div>
          </div>
      </div>
  );

  return (
      <>
          {/* כפתור תפריט מובייל (צף) */}
          <button
              onClick={() => setIsOpen(true)}
              className="fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-[#0F172A]/90 text-white shadow-lg backdrop-blur-md border border-slate-700 md:hidden hover:scale-105 transition-transform"
          >
              <Menu size={20} />
          </button>
          
          {/* Desktop Sidebar */}
          <aside className="hidden md:flex w-80 bg-[#0f172a] border-l border-slate-800/60 flex-col h-screen shrink-0 sticky top-0 shadow-2xl z-30" dir="rtl">
              {sidebarContent}
          </aside>

          {/* Mobile Sidebar Modal */}
          <AnimatePresence>
              {isOpen && (
                  <>
                      {/* רקע כהה */}
                      <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.6 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          onClick={() => setIsOpen(false)}
                          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-90 md:hidden"
                      />
                      
                      {/* הסרגל עצמו */}
                      <motion.div
                          initial={{ x: '100%' }}
                          animate={{ x: 0 }}
                          exit={{ x: '100%' }}
                          transition={{ type: "spring", damping: 25, stiffness: 200 }}
                          className="fixed top-0 right-0 h-full w-[85%] max-w-xs z-100 border-l border-slate-700 shadow-2xl md:hidden bg-[#0f172a]"
                          dir="rtl"
                      >
                          {sidebarContent}
                      </motion.div>
                  </>
              )}
          </AnimatePresence>
      </>
  );
}