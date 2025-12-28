"use client";

import React, { useState, useMemo } from 'react';
import { motion } from "framer-motion";
import { Fingerprint, Zap } from "lucide-react";

export const VectorLab = () => {
    const [word, setWord] = useState("AI");
    const vector = useMemo(() => {
        const seed = word.length || 1;
        return Array.from({ length: 12 }, (_, i) => {
            const val = (Math.sin(seed * (i + 1)) + 1) / 2;
            return parseFloat(val.toFixed(2));
        });
    }, [word]);

    return (
        <div className="w-full bg-slate-900/60 border border-emerald-500/30 rounded-[3rem] p-12 shadow-2xl backdrop-blur-xl text-right" dir="rtl">
            <h4 className="text-white font-black text-3xl mb-6 flex items-center gap-4 justify-end">
                מעבדה: DNA וקטורי <Fingerprint className="text-emerald-400" size={32} />
            </h4>
            
            <div className="bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-3xl mb-12 text-right">
                <p className="text-emerald-400 font-black mb-2 flex items-center justify-end gap-2 italic">
                    <Zap size={18}/> פקודת המפעיל:
                </p>
                <p className="text-lg text-slate-400 leading-relaxed">הקלד מילה וראה כיצד המערכת מתרגמת אותה ל&quot;כתובת&quot; מתמטית במרחב.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center bg-black/50 p-10 rounded-[2.5rem] border border-slate-800">
                <div className="lg:col-span-1 space-y-4">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest block text-right">קלט טקסטואלי</label>
                    <input type="text" value={word} onChange={(e) => setWord(e.target.value)} className="w-full bg-slate-950 border-b-4 border-emerald-500/30 py-6 text-white text-center font-mono font-bold text-4xl outline-none focus:border-emerald-500 transition-all" />
                </div>
                <div className="lg:col-span-2 flex items-end justify-center gap-3 h-56 w-full">
                    {vector.map((val, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
                            <motion.div animate={{ height: `${val * 100}%` }} className="w-full bg-linear-to-t from-emerald-600 to-emerald-400 rounded-t-lg shadow-lg" />
                            <span className="text-[10px] text-slate-500 font-mono font-bold">{val}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};