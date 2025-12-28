"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Fingerprint, Zap, Sparkles, Info } from "lucide-react";

export const VectorLab = () => {
    const [word, setWord] = useState("AI Intuition");
    
    const vector = useMemo(() => {
        const seed = word.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 1;
        return Array.from({ length: 15 }, (_, i) => {
            const val = (Math.sin(seed * (i + 1) * 0.5) + 1) / 2;
            return parseFloat(val.toFixed(2));
        });
    }, [word]);

    // גודל פונט מעודכן - קטן ואלגנטי יותר
    const getFontSize = () => {
        if (word.length > 20) return 'text-sm';
        if (word.length > 12) return 'text-base';
        return 'text-lg';
    };

    return (
        <div className="w-full bg-slate-950/40 border border-white/5 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-2xl text-right relative overflow-hidden" dir="rtl">
            <div className="mb-8">
                <div className="flex items-center gap-3 justify-end flex-row-reverse mb-4 pr-4 border-r-4 border-blue-500/50">
                    <Fingerprint className="text-emerald-400" size={24} />
                    <h4 className="text-white font-bold text-2xl tracking-tight text-right">
                        מעבדה: DNA וקטורי
                    </h4>
                </div>
                
                <div className="bg-emerald-500/5 border border-emerald-500/10 p-5 rounded-2xl text-right" dir="rtl">
                    <p className="text-emerald-400 font-bold mb-1 flex items-center justify-end flex-row-reverse gap-2 text-sm italic">
                        <Zap size={14}/> <span>הנחיה ללומד:</span>
                    </p>
                    <p className="text-base text-slate-400 font-light">
                        הקלד מילה או משפט. המערכת תתרגם את הטקסט למיקום מתמטי ייחודי במרחב ה-Embeddings.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-white/2 p-6 rounded-[2rem] border border-white/5">
                <div className="lg:col-span-1 space-y-4">
                    <div className="space-y-2 text-right">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pr-1">
                            Input Token
                        </label>
                        <input 
                            type="text" 
                            value={word} 
                            onChange={(e) => setWord(e.target.value)} 
                            className={`w-full bg-slate-900/50 border border-white/10 p-4 text-white text-right font-mono ${getFontSize()} outline-none focus:border-emerald-500/50 transition-all rounded-xl shadow-inner`}
                            placeholder="הקלד טקסט..."
                        />
                    </div>
                </div>

                <div className="lg:col-span-2 flex items-end justify-between gap-1.5 h-48 w-full px-2">
                    {vector.map((val, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                            <AnimatePresence mode="wait">
                                <motion.span 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    key={word + i}
                                    className="text-[9px] text-emerald-400/60 font-mono"
                                >
                                    {val}
                                </motion.span>
                            </AnimatePresence>

                            <motion.div 
                                animate={{ height: `${val * 100}%` }}
                                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                                className="w-full bg-emerald-500/20 border-t border-emerald-400/30 rounded-t-sm relative group-hover:bg-emerald-500/40 transition-colors"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};