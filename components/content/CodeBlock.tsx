"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; 
import 'prismjs/components/prism-python';
import { FileCode, Play, Terminal, Lightbulb, AlertCircle } from 'lucide-react';

interface CodeBlockProps {
    code: string;
    language?: string;
    output?: string;
    chapterContext?: string;
    onCalculate?: (numbers: number[]) => string | number;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ 
    code: initialCode, 
    language = 'python', 
    output: initialOutput = "",
    chapterContext,
    onCalculate
}) => {
    const codeRef = useRef<HTMLElement>(null);
    const [dynamicOutput, setDynamicOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [showOutput, setShowOutput] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    // תיקון השגיאה: הסרת 'code' והתמקדות ב-showOutput וב-isMounted
    useEffect(() => {
        if (isMounted && codeRef.current) {
            Prism.highlightElement(codeRef.current);
        }
    }, [isMounted, showOutput, language]);

    const executeSimulation = () => {
        setIsRunning(true);
        const currentContent = codeRef.current?.innerText || "";
        
        setTimeout(() => {
            try {
                const numbers = currentContent.match(/-?\d+(\.\d+)?/g)?.map(Number) || [];
                let result: string | number = "";

                if (onCalculate) {
                    result = onCalculate(numbers);
                } else if (currentContent.includes('norm') || currentContent.includes('array')) {
                    const sumSq = numbers.reduce((acc: number, n: number) => acc + n * n, 0);
                    result = `Vector Norm: ${Math.sqrt(sumSq).toFixed(2)}`;
                } else {
                    result = initialOutput || "Execution finished.";
                }

                setDynamicOutput(result.toString());
                setShowOutput(true);
                
                requestAnimationFrame(() => {
                    if (codeRef.current) Prism.highlightElement(codeRef.current);
                });
            } catch {
                setDynamicOutput("Error: Calculation failed.");
            }
            setIsRunning(false);
        }, 600);
    };

    if (!isMounted) {
        return <div className="my-8 rounded-2xl bg-slate-900/50 h-32 animate-pulse border border-slate-800" />;
    }

    return (
        <div className="my-8 rounded-2xl overflow-hidden border border-slate-700/50 bg-[#0F172A] shadow-2xl text-right font-sans" dir="rtl">
            <div className="bg-blue-500/10 px-4 py-2 border-b border-blue-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-400">
                    <AlertCircle size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-tight">סימולטור מתמטי אינטראקטיבי</span>
                </div>
                <span className="text-[10px] text-blue-300/60 font-medium tracking-tight">הסימולציה מגיבה לשינויי ערכים מספריים</span>
            </div>

            <div className="flex items-center justify-between px-5 py-3 bg-slate-800/80 border-b border-slate-700/50" dir="ltr">
                <div className="flex items-center gap-3">
                    <FileCode size={16} className="text-blue-400" />
                    <span className="text-xs font-mono text-slate-300">{language}_experiment.py</span>
                </div>
                <button 
                    onClick={executeSimulation}
                    disabled={isRunning}
                    className="flex items-center gap-2 text-[10px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-lg hover:bg-emerald-500/20 transition-all disabled:opacity-50 shadow-sm"
                >
                    <Play size={10} fill="currentColor" className={isRunning ? "animate-spin" : ""} />
                    {isRunning ? 'מחשב...' : 'הרץ ניסוי'}
                </button>
            </div>

            <div className="relative overflow-x-auto" dir="ltr">
                <pre className={`m-0 p-0 bg-transparent text-sm leading-relaxed language-${language}`}>
                    <code 
                        ref={codeRef}
                        contentEditable
                        suppressContentEditableWarning
                        className="block p-8 outline-none min-h-25 focus:bg-white/5 transition-all"
                    >
                        {initialCode.trim()}
                    </code>
                </pre>
            </div>

            <AnimatePresence mode="wait">
                {showOutput && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }} 
                        animate={{ height: 'auto', opacity: 1 }} 
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-slate-700 bg-black/60 overflow-hidden font-mono"
                    >
                        <div className="flex items-center gap-2 px-5 py-2 border-b border-white/5 text-[10px] text-slate-500 font-bold uppercase tracking-widest" dir="ltr">
                            <Terminal size={12} /> Console Output
                        </div>
                        <pre className="p-8 text-sm text-emerald-400 whitespace-pre-wrap text-left" dir="ltr">
                            {dynamicOutput}
                        </pre>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="px-6 py-4 bg-blue-500/5 border-t border-white/5 flex gap-4">
                <Lightbulb className="text-blue-400 shrink-0" size={18} />
                <div className="text-right">
                    <p className="text-xs text-slate-400 italic leading-relaxed">
                        {chapterContext || "שנה את המספרים בתוך ה-array ולחץ על 'הרץ ניסוי'. התוצאה בטרמינל תתעדכן בהתאם לערכים החדשים."}
                    </p>
                </div>
            </div>
        </div>
    );
};