"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';
import { ChevronDown } from "lucide-react"; // הייבוא שהיה חסר
import { CodeBlock } from "@/components/content/CodeBlock";

// הגדרת טיפוסים למניעת שגיאת any
interface XRayCardProps {
    icon: React.ReactNode;
    term: string;
    reality: string;
    color: string;
}

export const TechScannerImage = () => (
    <div className="flex flex-col items-center">
        <div className="relative w-full max-w-5xl mx-auto h-55 md:h-70 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl group mt-8 mb-4">
            <Image 
                src="/python-hero.png" 
                alt="Python Engineering" 
                fill 
                priority 
                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" 
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#020617] via-transparent to-[#020617] opacity-80" />
            <motion.div 
                animate={{ left: ['0%', '100%', '0%'] }} 
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }} 
                className="absolute top-0 w-0.5 h-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)] z-10 opacity-70" 
            />
        </div>

        {/* חץ אנימציה ורמז גלילה ללומד */}
        <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col items-center gap-2 mb-8"
        >
            <span className="text-slate-500 text-xs font-mono tracking-widest uppercase">
                גוללים למטה כדי להמשיך במסע
            </span>
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
                className="text-emerald-500/70"
            >
                <ChevronDown size={32} strokeWidth={1} />
            </motion.div>
        </motion.div>
    </div>
);

export const XRayCard = ({ icon, term, reality, color }: XRayCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="relative h-44 w-full cursor-pointer group perspective-1000" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <motion.div animate={{ rotateX: isHovered ? 180 : 0, opacity: isHovered ? 0 : 1 }} transition={{ duration: 0.6 }} className="absolute inset-0 bg-slate-900/80 border border-slate-700 rounded-2xl flex flex-col items-center justify-center p-4 backface-hidden">
                <div className="p-3 rounded-full bg-slate-800 text-slate-400 mb-3 group-hover:scale-110 transition-transform">{icon}</div>
                <h3 className="text-xl font-bold text-slate-200 font-mono">{term}</h3>
            </motion.div>
            <motion.div initial={{ rotateX: -180, opacity: 0 }} animate={{ rotateX: isHovered ? 0 : -180, opacity: isHovered ? 1 : 0 }} transition={{ duration: 0.6 }} className={`absolute inset-0 bg-slate-900/95 border border-${color}-500/50 rounded-2xl flex flex-col items-center justify-center p-4 backdrop-blur-md shadow-2xl shadow-black/50`}>
                <p className="text-center text-slate-200 text-sm font-medium leading-relaxed" dir="rtl">{reality}</p>
            </motion.div>
        </div>
    );
};

export const CodeEvolutionDemo = () => {
    const [mode, setMode] = useState<'old' | 'pythonic'>('old');
    const codes = {
        old: `numbers = [1, 2, 3]\ndoubled = []\nfor i in range(len(numbers)):\n    doubled.append(numbers[i] * 2)`,
        pythonic: `numbers = [1, 2, 3]\ndoubled = [n * 2 for n in numbers]`
    };
    return (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-1 overflow-hidden shadow-2xl">
            <div className="flex bg-slate-900/50 border-b border-slate-800">
                <button onClick={() => setMode('old')} className={`flex-1 py-3 text-xs font-bold transition-colors ${mode === 'old' ? 'text-white bg-slate-800' : 'text-slate-500 hover:text-slate-300'}`}>Legacy Style</button>
                <button onClick={() => setMode('pythonic')} className={`flex-1 py-3 text-xs font-bold transition-colors ${mode === 'pythonic' ? 'text-emerald-400 bg-slate-800' : 'text-slate-500 hover:text-slate-300'}`}>Pythonic</button>
            </div>
            <div className="p-4" dir="ltr"><CodeBlock language="python" code={codes[mode]} /></div>
        </div>
    );
};

export const CapabilityExplorer = () => {
    const [active, setActive] = useState(0);
    const caps = [
        { title: 'Data Cleaning', desc: 'ניקוי טקסט ב-5 שורות.', code: 'clean = "".join(c for c in text if c.isalpha())' },
        { title: 'AI Logic', desc: 'חישובים וקטוריים מהירים.', code: 'scaled = [x * 1.1 for x in data if x > 0]' }
    ];
    return (
        <div className="grid lg:grid-cols-2 gap-8 my-10 px-4">
            <div className="space-y-4">
                {caps.map((c, i) => (
                    <button key={i} onClick={() => setActive(i)} className={`w-full p-6 rounded-2xl border text-right transition-all group ${active === i ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/5' : 'border-slate-800 bg-slate-900/30 hover:border-slate-700'}`}>
                        <h4 className={`font-bold mb-1 transition-colors ${active === i ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>{c.title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
                    </button>
                ))}
            </div>
            <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-inner flex flex-col justify-center" dir="ltr">
                <CodeBlock language="python" code={caps[active].code} />
            </div>
        </div>
    );
};