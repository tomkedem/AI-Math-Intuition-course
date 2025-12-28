"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Compass, Zap, MoveRight, Scale } from "lucide-react";

export const DistanceSim = () => {
    const [valA, setValA] = useState(2.0);
    const [valB, setValB] = useState(2.8);

    const a = [1.0, valA, 3.0];
    const b = [1.0, valB, 2.5];

    // חישוב דמיון קוסינוס פשוט לצורך המחשה
    const dot = a[0]*b[0] + a[1]*b[1] + a[2]*b[2];
    const normA = Math.sqrt(a[0]**2 + a[1]**2 + a[2]**2);
    const normB = Math.sqrt(b[0]**2 + b[1]**2 + b[2]**2);
    const similarity = (dot / (normA * normB)).toFixed(3);

    return (
        <div className="w-full bg-slate-900/60 border border-blue-500/30 rounded-[2.5rem] p-10 shadow-2xl backdrop-blur-md text-right mb-16 overflow-hidden" dir="rtl">
            <div className="flex items-center gap-4 justify-end mb-8">
                <h4 className="text-white font-black text-2xl tracking-tighter">סימולטור הגיאומטריה של הדמיון</h4>
                <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-400"><Compass size={24} /></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-black/40 p-10 rounded-[2rem] border border-slate-800">
                <div className="space-y-10 order-2 lg:order-1">
                    <div className="space-y-4">
                        <div className="flex justify-between text-xs font-black text-slate-500 uppercase">
                            <span className="font-mono text-blue-400">{valA}</span>
                            <span>Vector A (Concept 1)</span>
                        </div>
                        <input type="range" min="0" max="5" step="0.1" value={valA} onChange={(e) => setValA(parseFloat(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between text-xs font-black text-slate-500 uppercase">
                            <span className="font-mono text-emerald-400">{valB}</span>
                            <span>Vector B (Concept 2)</span>
                        </div>
                        <input type="range" min="0" max="5" step="0.1" value={valB} onChange={(e) => setValB(parseFloat(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center p-8 bg-slate-950/50 rounded-3xl border border-blue-500/20 order-1 lg:order-2">
                    <div className="text-[10px] text-slate-500 font-black uppercase mb-2 tracking-[0.2em]">Cosine Similarity</div>
                    <motion.div 
                        key={similarity}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-7xl font-mono font-black text-white"
                    >
                        {similarity}
                    </motion.div>
                    <div className="mt-4 text-sm text-blue-400 font-bold italic">
                        {Number(similarity) > 0.98 ? "זהות סמנטית כמעט מוחלטת" : "קיים קשר רעיוני חלקי"}
                    </div>
                </div>
            </div>
            
            <div className="mt-8 p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl text-right">
                <p className="text-slate-400 leading-relaxed text-sm">
                    <span className="text-blue-400 font-bold ml-2">הסבר הנדסי:</span>
                    ככל ששני הוקטורים מצביעים לאותו כיוון (זווית קטנה), הדימיון מתקרב ל-1.0. זהו המנגנון שמאפשר למודל להבין ש&quot;מלך&quot; ו&quot;מלכה&quot; הם מושגים דומים, למרות שהן מילים שונות לחלוטין.
                </p>
            </div>
        </div>
    );
};