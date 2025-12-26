"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';

export const SmartMentor = ({ activeSection }: { activeSection: string }) => {
  const [mounted, setMounted] = useState(false);
  
  // פתרון לשגיאת ה-setState: נשתמש בטיימר קצרצר כדי להוציא את זה מה-Synchronous flow
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const scripts: Record<string, string> = {
    hero: "ברוך הבא! אני כאן כדי להראות לך איך פייתון הופכת אותך לארכיטקט AI.",
    code: "שים לב - רק 3 שורות קוד כדי להפעיל בינה מלאכותית עוצמתית!",
    roadmap: "זה המסלול שלנו. כל שלב כאן הוא קריטי לבניית מערכות Production."
  };

  if (!mounted) return null;

  return (
    // שימוש ב-z-100 לפי המלצת Tailwind ו-inset-0 כדי לכסות את המסך
    <div className="fixed inset-0 pointer-events-none z-100">
      
      {/* המנטור - נמקם אותו לפי אחוזים מגובה המסך (vh) כדי שיהיה גלוי בכל רזולוציה */}
      <motion.div 
        animate={{ 
            top: activeSection === 'hero' ? '20vh' : activeSection === 'code' ? '45vh' : '70vh',
            right: '350px',
            // הוספת אפקט ציפה עדין
            y: [0, -10, 0] 
        }}
        transition={{ 
            top: { type: "spring", stiffness: 50, damping: 15 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" } // הציפה חוזרת על עצמה לנצח
        }}
        className="absolute pointer-events-auto flex flex-col items-center"
        >
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            // שימוש ב-max-w-60 לפי המלצת Tailwind
            className="bg-slate-900/95 border border-emerald-500/30 p-4 rounded-2xl mb-4 max-w-60 shadow-2xl backdrop-blur-md"
            dir="rtl"
          >
            <p className="text-white text-sm font-medium leading-relaxed">
              {scripts[activeSection]}
            </p>
            <div className="absolute top-full right-1/2 translate-x-1/2 w-3 h-3 bg-slate-900 border-r border-b border-emerald-500/30 rotate-45 -mt-1.5" />
          </motion.div>
        </AnimatePresence>

        {/* האווטר שלך */}
        <div className="relative w-28 h-28 rounded-full border-2 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)] bg-slate-950 overflow-hidden">
          <Image 
            src="/assets/mentor-avatar.png" 
            alt="AI Mentor" 
            fill 
            sizes="112px"
            className="object-cover"
            priority
          />
        </div>
      </motion.div>
    </div>
  );
};