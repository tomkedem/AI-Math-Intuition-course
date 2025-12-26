"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';

export const FloatingMentor = ({ script }: { script: Record<string, string> }) => {
  const [currentText, setCurrentText] = useState("");
  const [position, setPosition] = useState({ x: 50, y: 150 });

  // פונקציה להפעלת קול וטקסט
  const speak = async (text: string) => {
    setCurrentText(text);
    // כאן יבוא חיבור ה-API של ElevenLabs להשמעת סאונד
    console.log("Mentor saying:", text);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-100">
      <motion.div 
        animate={{ x: position.x, y: position.y }}
        className="absolute pointer-events-auto flex flex-col items-center"
      >
        {/* בועת דיבור */}
        <AnimatePresence>
          {currentText && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900/90 border border-emerald-500/50 p-4 rounded-2xl mb-4 max-w-xs text-right text-white shadow-2xl backdrop-blur-md"
              dir="rtl"
            >
              {currentText}
            </motion.div>
          )}
        </AnimatePresence>

        {/* האווטר שלך */}
        <div className="relative w-24 h-24 rounded-full border-2 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] overflow-hidden bg-slate-950">
          <Image 
            src="./assets/mentor-avatar.png" 
            alt="Mentor" 
            fill 
            className="object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
};