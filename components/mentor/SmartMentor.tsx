"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';

interface MentorPoint {
  id: string;
  text: string;
  x: number;
  y: number;
}

export const SmartMentor = ({ activeSection }: { activeSection: string }) => {
  // הגדרת "תחנות" למנטור לפי חלקי הדף
  const scripts: Record<string, MentorPoint> = {
    hero: { id: 'hero', text: "ברוך הבא! אני כאן כדי להראות לך איך פייתון הופכת אותך לארכיטקט AI.", x: 20, y: 150 },
    code: { id: 'code', text: "שים לב - רק 3 שורות קוד כדי להפעיל בינה מלאכותית עוצמתית!", x: window.innerWidth > 1000 ? 50 : 10, y: 450 },
    roadmap: { id: 'roadmap', text: "זה המסלול שלנו. כל שלב כאן הוא קריטי לבניית מערכות Production.", x: 20, y: 700 }
  };

  const currentPoint = scripts[activeSection] || scripts.hero;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <motion.div 
        animate={{ 
          x: currentPoint.x, 
          y: currentPoint.y,
          scale: [1, 1.02, 1] 
        }}
        transition={{ 
          type: "spring", 
          stiffness: 40, 
          damping: 12,
          scale: { repeat: Infinity, duration: 3 }
        }}
        className="absolute pointer-events-auto flex flex-col items-center"
      >
        {/* בועת טקסט */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentPoint.text}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-slate-900/95 border border-emerald-500/40 p-4 rounded-2xl mb-4 max-w-[240px] shadow-2xl backdrop-blur-xl"
            dir="rtl"
          >
            <p className="text-white text-sm font-medium leading-relaxed">
              {currentPoint.text}
            </p>
            <div className="absolute top-full right-6 w-3 h-3 bg-slate-900 border-r border-b border-emerald-500/40 rotate-45 -mt-1.5" />
          </motion.div>
        </AnimatePresence>

        {/* האווטר שלך (האיש הקטן) */}
        <div className="relative w-28 h-28 rounded-full border-2 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)] bg-slate-950 overflow-hidden">
          <Image 
            src="/assets/mentor-avatar.png" 
            alt="AI Mentor" 
            fill 
            className="object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
};