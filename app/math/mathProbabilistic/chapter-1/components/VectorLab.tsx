"use client";

import React, { useState, useMemo } from 'react';
import { motion } from "framer-motion";
import { Fingerprint, MousePointer2 } from "lucide-react";

export const VectorLab = () => {
    const [word, setWord] = useState("בינה מלאכותית");
    
    const vector = useMemo(() => {
        const seed = word.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 1;
        return Array.from({ length: 20 }, (_, i) => {
            const val = (Math.sin(seed * (i + 1) * 0.8) + 1) / 2;
            return parseFloat(val.toFixed(2));
        });
    }, [word]);

    return (
        <div className="w-full bg-slate-950/60 border border-emerald-500/20 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-3xl text-right relative" dir="rtl">
            <div className="flex items-center gap-3 mb-6 pr-4 border-r-4 border-emerald-500/50">
                <Fingerprint className="text-emerald-400" size={28} />
                <h4 className="text-white font-black text-2xl">ניסוי 1: חתימה וקטורית</h4>
            </div>

            {/* הנחיה אקטיבית */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl mb-8 flex items-start gap-4">
                <MousePointer2 className="text-emerald-400 shrink-0 mt-1" size={20} />
                <p className="text-sm text-emerald-100 italic">
                    <strong>משימה עבורך:</strong> נסה להקליד שתי מילים דומות (למשל &quot;מחשב&quot; ו&quot;לפטופ&quot;) ואז שתי מילים שונות לגמרי. האם אתה מזהה תבנית דומה בגרפים של המילים הקרובות?
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center bg-black/20 p-6 rounded-[2rem]">
                <div className="lg:col-span-1 space-y-4">
                    <label className="text-[10px] font-black text-emerald-500/70 uppercase tracking-widest block">הקלד מילה לניתוח:</label>
                    <input 
                        type="text" 
                        value={word} 
                        onChange={(e) => setWord(e.target.value)} 
                        className="w-full bg-slate-900 border-2 border-white/5 p-4 text-white text-right font-mono text-lg rounded-2xl focus:border-emerald-500/50 outline-none"
                    />
                </div>

                <div className="lg:col-span-3 flex items-end justify-between gap-1 h-40">
                    {vector.map((val, i) => (
                        <motion.div 
                            key={i}
                            animate={{ height: `${val * 100}%`, opacity: val + 0.2 }}
                            className="flex-1 bg-emerald-500/40 rounded-t-full"
                        />
                    ))}
                </div>
            </div>

            <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10 text-xs text-slate-400">
                <span className="text-white font-bold ml-2">מה ללמוד מזה?</span>
                כל עמודה היא &quot;מאפיין&quot; סמנטי. המודל לא מבין את המילה, הוא מבין את הצירוף הייחודי של הערכים בגרף הזה.
            </div>
        </div>
    );
};