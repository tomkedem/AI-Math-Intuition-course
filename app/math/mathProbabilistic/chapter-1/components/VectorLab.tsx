"use client";

import React, { useState, useMemo } from 'react';
import { motion } from "framer-motion";
import { Fingerprint, MousePointer2, Info, ArrowLeftRight } from "lucide-react";

// מילון "סמנטי" בסיסי כדי לדמות למידה אמיתית
const SEMANTIC_THEMES: Record<string, number[]> = {
    tech: [0.8, -0.4, 0.9, 0.1, -0.7],
    nature: [-0.6, 0.8, -0.2, 0.9, 0.4],
    emotion: [0.3, 0.1, -0.8, -0.4, 0.9],
    default: [0.1, -0.1, 0.2, -0.2, 0.1]
};

const getTheme = (word: string) => {
    const w = word.toLowerCase();
    if (/מחשב|לפטופ|קוד|טכנולוגיה|שרת|ai|data/.test(w)) return SEMANTIC_THEMES.tech;
    if (/עץ|פרח|ים|טבע|שמש|אוקיינוס|הרים/.test(w)) return SEMANTIC_THEMES.nature;
    if (/שמח|עצוב|אהבה|כעס|מרגש|פחד/.test(w)) return SEMANTIC_THEMES.emotion;
    return SEMANTIC_THEMES.default;
};

export const VectorLab = () => {
    const [word, setWord] = useState("מחשב");
    const [prevWord, setPrevWord] = useState("");
    const [prevVector, setPrevVector] = useState<number[]>([]);

    const vector = useMemo(() => {
        const themeBase = getTheme(word);
        // יצירת וקטור של 20 ממדים מבוסס תמה + רעש מבוסס אותיות (כדי שכל מילה תהיה טיפה שונה)
        const seed = word.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        
        return Array.from({ length: 20 }, (_, i) => {
            const base = themeBase[i % themeBase.length];
            const noise = Math.sin(seed * (i + 1)) * 0.2; // רעש קטן
            const val = Math.max(-1, Math.min(1, base + noise));
            return parseFloat(val.toFixed(2));
        });
    }, [word]);

    // חישוב דמיון בסיסי (Dot Product מפושט) להמחשה
    const similarity = useMemo(() => {
        if (!prevVector.length) return null;
        const dotProduct = vector.reduce((acc, val, i) => acc + (val * (prevVector[i] || 0)), 0);
        const sim = (dotProduct / 10 + 1) / 2; // נרמול ל-0 עד 1
        return Math.round(sim * 100);
    }, [vector, prevVector]);

    const handleProcess = () => {
        setPrevWord(word);
        setPrevVector(vector);
    };

    return (
        <div className="w-full bg-slate-950 border border-emerald-500/20 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-3xl text-right" dir="rtl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3 pr-4 border-r-4 border-emerald-500/50">
                    <Fingerprint className="text-emerald-400" size={28} />
                    <h4 className="text-white font-black text-2xl">מעבדה סמנטית: Embeddings</h4>
                </div>
                <div className="bg-white/5 px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-slate-400 font-mono uppercase">Vector Space Simulator</span>
                </div>
            </div>

            {/* משימה אינטראקטיבית משופרת */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl mb-8 flex items-start gap-4">
                <MousePointer2 className="text-emerald-400 shrink-0 mt-1" size={20} />
                <div className="space-y-1">
                    <p className="text-sm text-emerald-100">
                        <strong>ניסוי סמנטי:</strong> הקלד &quot;מחשב&quot;, לחץ על &quot;שמור להשוואה&quot;, ואז הקלד &quot;לפטופ&quot;. 
                    </p>
                    <p className="text-[11px] text-emerald-400/80">
                        שים לב איך האלגוריתם מזהה שהן מאותה &quot;משפחה&quot; ומייצר וקטורים דומים.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start bg-black/20 p-6 rounded-[2rem] border border-white/5">
                <div className="lg:col-span-1 space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-emerald-500/70 uppercase tracking-widest block">מילה נוכחית:</label>
                        <input 
                            type="text" 
                            value={word} 
                            onChange={(e) => setWord(e.target.value)} 
                            className="w-full bg-slate-900 border-2 border-white/5 p-4 text-white text-right font-mono text-lg rounded-2xl focus:border-emerald-500/50 outline-none transition-all"
                        />
                    </div>
                    
                    <button 
                        onClick={handleProcess}
                        className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                    >
                        <ArrowLeftRight size={14} /> שמור להשוואה
                    </button>

                    {similarity !== null && (
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-center">
                            <div className="text-[10px] text-emerald-500 uppercase font-black">דמיון סמנטי</div>
                            <div className="text-3xl font-black text-white">{similarity}%</div>
                            <div className="text-[10px] text-slate-400 mt-1">מול המילה: {prevWord}</div>
                        </motion.div>
                    )}
                </div>

                <div className="lg:col-span-3 h-56 flex items-center justify-between gap-1 border-b border-white/10 relative">
                    {/* קו האפס */}
                    <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 pointer-events-none" />
                    
                    {vector.map((val, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center justify-center h-full relative group">
                            <motion.div 
                                animate={{ 
                                    height: `${Math.abs(val) * 50}%`,
                                    y: val > 0 ? "-50%" : "50%",
                                    backgroundColor: val > 0 ? "rgb(52, 211, 153)" : "rgb(248, 113, 113)"
                                }}
                                className="w-full rounded-sm opacity-60 group-hover:opacity-100 transition-opacity"
                            />
                            {/* וקטור קודם להשוואה (רפאים) */}
                            {prevVector.length > 0 && (
                                <div 
                                    className="absolute w-full bg-white/10 rounded-sm pointer-events-none transition-all"
                                    style={{ 
                                        height: `${Math.abs(prevVector[i]) * 50}%`,
                                        y: prevVector[i] > 0 ? "-50%" : "50%",
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer עם גילוי נאות חינוכי */}
            <div className="mt-8 p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 flex gap-4">
                <Info className="text-blue-400 shrink-0" size={20} />
                <div className="text-xs text-slate-400 leading-relaxed">
                    <span className="text-blue-400 font-bold ml-1 italic">דיוק מדעי:</span> 
                    זוהי סימולציה מפושטת. במודלים אמיתיים כמו GPT-4, כל מילה מיוצגת על ידי אלפי ממדים שנלמדו ממיליארדי טקסטים. כאן אנו משתמשים ב-20 ממדים ובמפה סמנטית קבועה מראש כדי להמחיש את העיקרון: <strong>מילים דומות תופסות מקום דומה במרחב.</strong>
                </div>
            </div>
        </div>
    );
};