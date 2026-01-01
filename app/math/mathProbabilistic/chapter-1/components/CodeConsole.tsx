"use client";

import React, { useState } from 'react';
import { Terminal, Play, Brain, Info, RotateCcw, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeConsoleProps {
    title: string;
    code: string;
    output: string;
    explanation: string;
}

export const CodeConsole: React.FC<CodeConsoleProps> = ({ title, code, output, explanation }) => {
    const [status, setStatus] = useState<'idle' | 'executing' | 'finished'>('idle');

    const handleRun = () => {
        setStatus('executing');
        setTimeout(() => {
            setStatus('finished');
        }, 1500);
    };

    const handleReset = () => {
        setStatus('idle');
    };

    return (
        <div className="w-full my-8 rounded-2xl border border-slate-800 bg-[#0d1117] overflow-hidden shadow-2xl text-right" dir="rtl">
            {/* Top Insight Bar */}
            <div className="bg-amber-400/5 p-4 border-b border-amber-400/10">
                <div className="flex items-center gap-2 text-amber-400 mb-1 justify-end">
                    <span className="font-bold text-xs uppercase tracking-wider">תובנה לימודית</span>
                    <Brain size={16} />
                </div>
                <p className="text-slate-400 text-sm italic leading-relaxed">
                    שים לב לערכי ה-Loss בקוד. הנגזרת (Gradient) היא המצפן שמורה למודל לאן להשתפר.
                </p>
            </div>
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-6 py-3 bg-[#161b22] border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5 ml-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                    </div>
                    <Terminal size={16} className="text-slate-500" />
                    <span className="text-xs font-mono text-slate-400">{title.toLowerCase().replace(/\s+/g, '_')}.py</span>
                </div>

                <div className="flex gap-2">
                    {status === 'finished' && (
                        <button 
                            onClick={handleReset}
                            className="p-2 text-slate-400 hover:text-white transition-colors"
                            title="איפוס"
                        >
                            <RotateCcw size={16} />
                        </button>
                    )}
                    <button 
                        onClick={handleRun} 
                        disabled={status !== 'idle'}
                        className={`h-8 px-5 rounded-lg font-bold text-xs flex items-center gap-2 transition-all ${
                            status === 'idle' 
                            ? "bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer shadow-lg shadow-emerald-900/20" 
                            : "bg-slate-800 text-slate-500 cursor-not-allowed"
                        }`}
                    >
                        {status === 'executing' ? (
                            <><Loader2 size={14} className="animate-spin" /> מריץ...</>
                        ) : (
                            <><Play size={12} fill="currentColor" /> הרץ קוד</>
                        )}
                    </button>
                </div>
            </div>

            {/* Main Content: Code & Console */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Code Side with Syntax Highlighting - Fixed max-h for Tailwind */}
                <div className="max-h-100 overflow-auto border-l border-slate-800 bg-[#0d1117] text-left" dir="ltr">
                    <SyntaxHighlighter 
                        language="python" 
                        style={atomDark}
                        customStyle={{
                            margin: 0,
                            padding: '1.5rem',
                            fontSize: '0.85rem',
                            lineHeight: '1.6',
                            background: 'transparent'
                        }}
                    >
                        {code}
                    </SyntaxHighlighter>
                </div>

                {/* Terminal Side - Fixed min-h for Tailwind */}
                <div className="bg-black/20 p-8 flex flex-col min-h-62.5 relative">
                    <div className="absolute top-3 right-4 text-[10px] font-mono text-slate-600 uppercase tracking-widest">Output Terminal</div>
                    
                    <AnimatePresence mode="wait">
                        {status === 'idle' ? (
                            <motion.div 
                                key="idle"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center h-full text-slate-600"
                            >
                                <Play size={40} className="mb-4 opacity-10" />
                                <div className="text-xs italic">לחץ על Play כדי לראות את הקוד בפעולה</div>
                            </motion.div>
                        ) : status === 'executing' ? (
                            <motion.div 
                                key="executing"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="font-mono text-sm text-blue-400 flex items-center gap-2" dir="ltr"
                            >
                                <span className="animate-pulse">_</span>
                                <span>python3 {title.toLowerCase()}.py</span>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="finished"
                                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                                className="font-mono text-sm text-left" dir="ltr"
                            >
                                <div className="text-slate-500 mb-2">$ python3 {title.toLowerCase()}.py</div>
                                <div className="text-emerald-400 bg-emerald-500/5 p-4 rounded-lg border border-emerald-500/10 whitespace-pre-wrap">
                                    {output}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            
            {/* Footer Explanation */}
            <div className="p-5 bg-blue-500/5 border-t border-slate-800 flex flex-row-reverse items-start gap-4">
                <div className="p-2 bg-blue-500/10 rounded-lg shrink-0">
                    <Info className="text-blue-400" size={18} />
                </div>
                <div className="text-right">
                    <span className="text-blue-400 font-bold text-xs block mb-1 uppercase tracking-wider">ניתוח תוצאות:</span>
                    <p className="text-sm text-slate-400 leading-relaxed font-light italic">
                        {explanation}
                    </p>
                </div>
            </div>
        </div>
    );
};