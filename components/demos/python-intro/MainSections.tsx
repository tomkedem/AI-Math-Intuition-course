"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Terminal, Zap, Box, Layers, ShieldCheck } from "lucide-react";
import { StaticCodeBlock } from "@/components/content/StaticCodeBlock";

// --- רכיב ה-Hook המרכזי: הכוח של פייתון כ-Leverage ---
export const AILeverageHero = () => (
    <div className="grid lg:grid-cols-2 gap-12 items-center py-16 border-b border-slate-800/50">
        <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                <Zap size={14} className="fill-current" />
                <span>AI ENGINEERING LEVERAGE</span>
            </div>
            <h2 className="text-4xl font-black text-white leading-tight">
                אל תלמד רק שפה. <br />
                <span className="bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">תלמד לשלוט ב-Stack.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed text-right" dir="rtl">
                ב-2026, פייתון היא ה-Orchestrator של עולם ה-AI. היא לא רק &quot;שפת סקריפטים&quot;, היא הצינור שמחבר בין אלגוריתמים ב-++C, ליבות CUDA וגרפים של טריליוני פרמטרים. שליטה בה מאפשרת למפתח לחשוב ולהתנהג כארכיטקט בינה.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800 text-center">
                    <div className="text-2xl font-black text-emerald-500">10X</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Development Velocity</div>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800 text-center">
                    <div className="text-2xl font-black text-cyan-500">Native</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">LLM Ecosystem</div>
                </div>
            </div>
        </div>

        <div className="relative group" dir="ltr">
            <div className="absolute -inset-1 bg-linear-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-2xl">
                <div className="text-xs text-slate-500 font-mono mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                    <span className="ml-2">production_ai_pipeline.py</span>
                </div>
                <StaticCodeBlock
                    language="python"
                    code={`# מה שדרש פעם שבועות ב-C++, קורה היום ב-3 שורות
from transformers import pipeline

# Orchestrating massive intelligence with one call
agent = pipeline("sentiment-analysis", model="bert-base-multilingual-cased")
insight = agent("This architectural shift is a game changer.")

print(f"Confidence: {insight[0]['score']:.4f}")`}
                />
            </div>
        </div>
    </div>
);

// --- רכיב ה-Roadmap ההנדסי: ה-Pipeline ---
export const IndustrialRoadmap = () => {
    const steps = [
        { icon: Terminal, title: "The Foundation", desc: "שליטה בתחביר לא כפקודות, אלא כבסיס לארכיטקטורה מודרנית.", phase: "01" },
        { icon: Box, title: "Modern OOP", desc: "בניית רכיבים מודולריים (Classes) שניתן להרחיב ולתחזק ב-Production.", phase: "02" },
        { icon: Layers, title: "Data Engines", desc: "עיבוד נתונים מאסיבי בזיכרון בעזרת Numpy ו-Vectorization.", phase: "03" },
        { icon: ShieldCheck, title: "Production Ready", desc: "חיבור למודלים, ניהול תלויות וארכיטקטורת שכבות מתקדמת.", phase: "04" },
    ];

    return (
        <div className="grid md:grid-cols-4 gap-6 mt-4">
            {steps.map((step, i) => (
                <motion.div key={i} className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl transition-all shadow-xl group">
                    <div className="text-[10px] font-mono text-emerald-500 mb-4 uppercase opacity-60">Phase {step.phase}</div>
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 mb-4 group-hover:text-emerald-400">
                        <step.icon size={24} />
                    </div>
                    <h4 className="text-white font-bold mb-2 text-right" dir="rtl">{step.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed text-right" dir="rtl">{step.desc}</p>
                </motion.div>
            ))}
        </div>
    );
};