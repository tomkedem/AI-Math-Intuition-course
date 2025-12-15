"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ScanLine } from 'lucide-react';

export function ImageToVectorVisual() {
  const [isScanning, setIsScanning] = useState(false);
  
  // ייצוג פשוט של תמונה 5x5 (0=שחור, 1=צבע)
  // זה מצייר פרצוף סמיילי פשוט
  const pixels = [
    0, 1, 0, 1, 0,
    0, 1, 0, 1, 0,
    0, 0, 0, 0, 0,
    1, 0, 0, 0, 1,
    0, 1, 1, 1, 0
  ];

  return (
    <div className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-8 flex flex-col md:flex-row items-center justify-center gap-12 relative overflow-hidden">
      
      {/* רקע דקורטיבי */}
      <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />
      
      {/* צד שמאל: התמונה (גריד של פיקסלים) */}
      <div className="relative group">
        <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 bg-slate-950 p-2 rounded-lg border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-5 gap-1 w-32 h-32">
            {pixels.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.5 }}
                animate={{ 
                  backgroundColor: val ? '#3b82f6' : '#1e293b',
                  opacity: isScanning ? [1, 0.5, 1] : 1,
                  scale: isScanning ? [1, 0.9, 1] : 1
                }}
                transition={{ delay: i * 0.02, duration: 0.5 }}
                className="rounded-sm"
              />
            ))}
          </div>
          
          {/* אפקט הסריקה */}
          <AnimatePresence>
            {isScanning && (
              <motion.div
                initial={{ top: 0 }}
                animate={{ top: "100%" }}
                transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                className="absolute left-0 right-0 h-1 bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.8)] z-20"
              />
            )}
          </AnimatePresence>
        </div>
        <div className="text-center mt-3 text-xs font-mono text-slate-400">Input: Image (5x5)</div>
      </div>

      {/* חץ מעבר */}
      <div className="flex flex-col items-center gap-2">
         <button 
            onClick={() => setIsScanning(!isScanning)}
            className="p-3 rounded-full bg-slate-800 hover:bg-blue-600 hover:text-white transition-all border border-slate-700 shadow-lg group"
         >
            {isScanning ? <ScanLine className="animate-pulse" /> : <ArrowRight />}
         </button>
         <span className="text-[10px] text-slate-500 uppercase tracking-widest">Flatten</span>
      </div>

      {/* צד ימין: הוקטור */}
      <div className="relative">
        <div className="absolute -inset-4 bg-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 bg-slate-950 p-4 rounded-lg border border-slate-800 w-48 shadow-2xl h-64 overflow-hidden flex flex-col items-center">
            <div className="text-xs text-purple-400 font-mono mb-2 border-b border-slate-800 w-full text-center pb-2">Vector Tensor</div>
            <div className="font-mono text-sm space-y-1 w-full overflow-y-auto custom-scrollbar pr-2">
                <span className="text-slate-500 block text-[10px]">[</span>
                {pixels.map((val, i) => (
                    <motion.div 
                        key={i}
                        animate={{ 
                            color: isScanning && val ? '#a855f7' : '#94a3b8',
                            x: isScanning ? [0, 5, 0] : 0
                        }}
                        transition={{ delay: i * 0.05 + 0.5 }}
                        className="flex justify-between hover:bg-slate-900 px-1 rounded"
                    >
                        <span className="text-slate-600 text-[10px]">{i}:</span>
                        <span className={val ? "font-bold" : "opacity-50"}>
                            {val === 1 ? "255" : "0"}
                        </span>
                    </motion.div>
                ))}
                <span className="text-slate-500 block text-[10px]">]</span>
            </div>
        </div>
        <div className="text-center mt-3 text-xs font-mono text-slate-400">Output: Vector (1x25)</div>
      </div>

    </div>
  );
}