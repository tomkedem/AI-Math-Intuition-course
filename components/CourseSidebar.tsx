"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Circle, PlayCircle, CheckCircle, Home } from 'lucide-react';

export function CourseSidebar() {
  const pathname = usePathname();

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

  // חישוב אחוזי התקדמות (פיקטיבי כרגע, מבוסס על המיקום הנוכחי)
  const currentIndex = chapters.findIndex(c => c.path === pathname);
  const progress = Math.round(((currentIndex + 1) / chapters.length) * 100);

  return (
    <aside className="w-80 bg-[#0f172a] border-l border-slate-800 flex flex-col h-screen shrink-0 sticky top-0">
      
      {/* Header - User Profile */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/20">
                <BookOpen size={20} />
            </div>
            <div>
                <h2 className="font-bold text-white text-sm">AI Developer Series</h2>
                <span className="text-xs text-slate-500">Interactive Course</span>
            </div>
        </div>

        {/* User Card */}
        <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs text-white font-bold">
                תק
            </div>
            <div className="flex-1">
                <div className="text-xs font-bold text-slate-200">תומר קדם</div>
                <div className="text-[10px] text-slate-500">ארכיטקט תוכנה</div>
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
                <Link key={chapter.id} href={chapter.path}>
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
      <div className="p-4 border-t border-slate-800 text-[10px] text-slate-600 text-center">
          v1.0.0 • AI Math Primer
      </div>
    </aside>
  );
}