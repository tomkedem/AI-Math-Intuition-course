// src/components/CourseSidebar.tsx - גרסה סופית, גלויה בדסקטופ, מודאל במובייל

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Circle, PlayCircle, Home, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CourseSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // מצב המובייל

  // רשימת הפרקים המלאה לפי הסילבוס שלך
  const chapters = [
    { id: 'intro', title: 'מבוא', path: '/intro', icon: Home },
    { id: 'chapter-1', title: 'פרק 1: למה מתמטיקה היא חלק מהעבודה', path: '/chapter-1' },
    { id: 'chapter-2', title: 'פרק 2: ממוצע, חציון וסטיית תקן', path: '/chapter-2' },
    { id: 'chapter-3', title: 'פרק 3: הסתברות שמדברת בשפה של מתכנת', path: '/chapter-3' },
    { id: 'chapter-4', title: 'פרק 4: הסתברות מותנית ובייס', path: '/chapter-4' },
    { id: 'chapter-5', title: 'פרק 5: וקטורים – הלב של כל מודל', path: '/chapter-5' },
    { id: 'chapter-6', title: 'פרק 6: נורמה ומרחק', path: '/chapter-6' },
    { id: 'chapter-7', title: 'פרק 7: זווית ודמיון קוסינוס', path: '/chapter-7' },
    { id: 'chapter-8', title: 'פרק 8: פונקציות – איך מודל חושב', path: '/chapter-8' },
    { id: 'chapter-9', title: 'פרק 9: שיפוע – המנוע של הלמידה', path: '/chapter-9' },
    { id: 'chapter-10', title: 'פרק 10: Gradient Descent', path: '/chapter-10' },
    { id: 'chapter-11', title: 'פרק 11: פרויקט סיום', path: '/chapter-11' },
    { id: 'chapter-12', title: 'פרק 12: איך זה מתחבר ל-NLP', path: '/chapter-12' },
  ];

  const currentIndex = chapters.findIndex(c => c.path === pathname);
  const progress = Math.round(((currentIndex + 1) / chapters.length) * 100);
  
  // תוכן ה-Sidebar המלא (כדי שנוכל להשתמש בו ב-Modal וב-Desktop)
  const sidebarContent = (
      <div className="flex flex-col h-full">
          {/* Header - User Profile */}
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/20">
                    <BookOpen size={20} />
                </div>
                <div>
                    <h1 className="font-bold text-sky-600 text-lg">AI Math</h1>
                    
                    <span className="text-gray-500 text-xs">מסע אל הלב המתמטי של הבינה המלאכותית</span>

                </div>
                {/* כפתור סגירה למובייל בלבד */}
                {isOpen && (
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="p-1 rounded-full text-slate-400 hover:text-white mr-auto md:hidden"
                    >
                        <X size={24} />
                    </button>
                )}
            </div>

            {/* User Card */}
            <div className="flex items-center bg-slate-900 rounded-2xl px-6 py-3 gap-4 w-fit shadow-lg">
  <div className="flex flex-col text-right">
    <span className="text-white font-bold text-base leading-tight">תומר קדם</span>
    <span className="text-slate-400 text-xs">מתכנן ומפתח הלומדה</span>
    
    <span className="text-slate-500 text-xs mt-1">
  הופך את המתמטיקה של ה-AI לשפה פשוטה ונגישה לכל אחד
</span>
  </div>
  <div className="w-10 h-10 rounded-full bg-fuchsia-600 flex items-center justify-center text-white font-bold text-lg shadow-md border-2 border-fuchsia-400">
    תק
  </div>
</div>

            {/* Progress Bar */}
            <div className="mt-4">
                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>התקדמות</span>
                    <span>{Math.max(0, progress)}%</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-blue-500 transition-all duration-500" 
                        style={{ width: `${Math.max(5, progress)}%` }}
                    />
                </div>
            </div>
          </div>

          {/* Navigation List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-1">
              <div className="text-xs font-bold text-slate-500 mb-3 px-2 uppercase tracking-wider">תוכן העניינים</div>
              
              {chapters.map((chapter) => {
                  const isActive = pathname === chapter.path;
                  const Icon = chapter.icon || (isActive ? PlayCircle : Circle);

                  return (
                    <Link 
                        key={chapter.id} 
                        href={chapter.path}
                        onClick={() => setIsOpen(false)} // סגור את התפריט אחרי ניווט במובייל
                    >
                        <div className={`
                            flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-all duration-200 group
                            ${isActive 
                                ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' 
                                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 hover:translate-x-1'
                            }
                        `}>
                            <Icon size={16} className={isActive ? "text-blue-400" : "text-slate-600 group-hover:text-slate-400"} />
                            <span className="truncate">{chapter.title}</span>
                            
                            {/* Active Indicator */}
                            {isActive && (
                                <div className="mr-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_currentColor]"></div>
                            )}
                        </div>
                    </Link>
                  );
              })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800 text-[10px] text-slate-600 text-center shrink-0">
              v1.0.0 • AI Math Primer
          </div>
      </div>
  );

  return (
      <>
          {/* כפתור פתיחה למובייל בלבד (מוצג בראש הדף) */}
          <button
              onClick={() => setIsOpen(true)}
              className="fixed top-4 left-4 z-99 p-3 rounded-full bg-blue-600 text-white shadow-lg md:hidden"
          >
              <Menu size={24} />
          </button>
          
          {/* Side Bar ל-Desktop (רוחב קבוע, גלוי תמיד) */}
          {/* הסייד-בר צריך להיות 'as is' כדי להישאר גלוי ב-Desktop. הוא מופיע ב-Desktop כ-w-80 */}
          <aside className="hidden md:flex w-80 bg-[#0f172a] border-l border-slate-800 flex-col h-screen shrink-0 sticky top-0" dir="rtl">
              {sidebarContent}
          </aside>

          {/* Side Bar Modal (מובייל) */}
          <AnimatePresence>
              {isOpen && (
                  <motion.div
                      initial={{ x: '100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '100%' }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="fixed top-0 right-0 h-full w-full max-w-xs z-100 bg-[#0f172a] border-l border-slate-700 shadow-2xl md:hidden"
                      dir="rtl"
                  >
                      {sidebarContent}
                  </motion.div>
              )}
          </AnimatePresence>
          
          {/* כיסוי רקע למובייל */}
          <AnimatePresence>
              {isOpen && (
                  <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setIsOpen(false)}
                      className="fixed inset-0 bg-black z-99 md:hidden"
                  />
              )}
          </AnimatePresence>
      </>
  );
}