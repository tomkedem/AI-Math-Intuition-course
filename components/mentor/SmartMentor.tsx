"use client";
import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';

interface MentorPoint {
  id: string;
  text: string;
  x: number;
  y: number;
}

export const SmartMentor = ({ activeSection }: { activeSection: string }) => {
  const scripts: Record<string, MentorPoint> = {
    hero: { id: 'hero', text: "ברוך הבא! אני כאן כדי להראות לך איך פייתון הופכת אותך לארכיטקט AI.", x: 20, y: 150 },
    code: { id: 'code', text: "שים לב - רק 3 שורות קוד כדי להפעיל בינה מלאכותית עוצמתית!", x: 20, y: 350 },
    roadmap: { id: 'roadmap', text: "זה המסלול שלנו. כל שלב כאן הוא קריטי לבניית מערכות Production.", x: 20, y: 600 }
  };

  const currentPoint = scripts[activeSection] || scripts.hero;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <motion.div 
        initial={{ x: 20, y: 150 }}
        animate={{ 
          x: currentPoint.x, 
          y: currentPoint.y,
        }}
        transition={{ type: "spring", stiffness: 45, damping: 15 }}
        className="absolute left-0 top-0 pointer-events-auto flex flex-col items-center" 
      >
        {/* בועת טקסט מעוצבת ושקופה למחצה */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentPoint.text}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-slate-900/90 border border-emerald-500/30 p-4 rounded-2xl mb-4 max-w-[240px] shadow-2xl backdrop-blur-md"
            dir="rtl"
          >
            <p className="text-white text-sm font-medium leading-relaxed">
              {currentPoint.text}
            </p>
            {/* השפיץ של הבועה */}
            <div className="absolute top-full right-8 w-3 h-3 bg-slate-900 border-r border-b border-emerald-500/30 rotate-45 -mt-1.5" />
          </motion.div>
        </AnimatePresence>

        {/* האווטר שלך - נקי ללא רקע חיצוני */}
        <div className="relative w-28 h-28 rounded-full border-2 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)] bg-slate-950 overflow-hidden">
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