"use client";

import React, { useState } from 'react';
import { Terminal, Play, Brain, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// הגדרת טיפוסים (Interface) לתיקון שגיאת ESLint
interface CodeConsoleProps {
    title: string;
    code: string;
    output: string;
    explanation: string;
}

export const CodeConsole: React.FC<CodeConsoleProps> = ({ title, code, output, explanation }) => {
    const [isRun, setIsRun] = useState(false);

    return (
        <div className="w-full my-12 rounded-[2rem] border border-slate-800 bg-[#0d1117] overflow-hidden shadow-2xl text-right" dir="rtl">
            <div className="bg-slate-800/20 p-5 border-b border-white/5">
                <div className="flex items-center gap-3 text-amber-400 mb-2 justify-end">
                    <span className="font-bold text-sm">התבונן בקוד:</span>
                    <Brain size={18} />
                </div>
                <p className="text-slate-300 text-sm italic">
                    שים לב איך המודל לוקח את ה-Loss (הטעות) ומשתמש בנגזרת כדי להשתפר. נסה לחזות מה תהיה השגיאה אחרי התיקון.
                </p>
            </div>
            
            <div className="flex items-center justify-between px-8 py-4 bg-[#161b22] border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <Terminal size={18} className="text-slate-500" />
                    <span className="text-xs font-mono text-slate-400">{title}.py</span>
                </div>
                <button 
                    onClick={() => setIsRun(true)} 
                    className="bg-emerald-600 hover:bg-emerald-500 text-white h-9 px-6 rounded-full font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                    <Play size={14} fill="currentColor" /> הרץ סימולציה
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-10 font-mono text-sm leading-relaxed text-blue-300 text-left bg-black/10" dir="ltr">
                    <pre>{code}</pre>
                </div>
                {/* תיקון Tailwind: min-h-50 במקום min-h-[200px] */}
                <div className="bg-black/40 p-10 flex flex-col justify-center min-h-50 border-t lg:border-t-0 lg:border-r border-slate-800">
                    <AnimatePresence mode="wait">
                        {isRun ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-emerald-400 text-left" dir="ltr">
                                <span className="text-slate-600">$ python3 executing...</span><br/>
                                <span className="block mt-4 text-xl">{output}</span>
                            </motion.div>
                        ) : (
                            <div className="text-slate-600 italic text-center text-sm">ממתין להרצה...</div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            
            <div className="p-6 bg-blue-500/5 border-t border-slate-800 text-right flex flex-row-reverse gap-3">
                <Info className="text-blue-400 shrink-0" size={20} />
                <p className="text-sm text-slate-400 leading-relaxed italic"><span className="text-blue-400 font-bold ml-2">מה קרה כאן?</span> {explanation}</p>
            </div>
        </div>
    );
};