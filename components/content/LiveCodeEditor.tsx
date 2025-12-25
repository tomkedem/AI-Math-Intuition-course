"use client";

import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-python';
import { Play, RotateCcw, Terminal } from 'lucide-react';

interface LiveCodeEditorProps {
    initialCode: string;
    onRun: (code: string) => string;
}

export const LiveCodeEditor: React.FC<LiveCodeEditorProps> = ({ initialCode, onRun }) => {
    const [code, setCode] = useState(initialCode.trim());
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        Prism.highlightAll();
    }, [code]);

    const handleRun = () => {
        setIsRunning(true);
        // השהייה קלה בשביל האפקט של ה"הרצה"
        setTimeout(() => {
            const result = onRun(code);
            setOutput(result);
            setIsRunning(false);
        }, 400);
    };

    const handleReset = () => {
        setCode(initialCode.trim());
        setOutput(""); // איפוס הפלט
        setIsRunning(false);
    };

    return (
        <div className="my-8 rounded-xl overflow-hidden border border-slate-700 bg-[#0F172A] shadow-2xl" dir="ltr">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-slate-700" dir="rtl">
                <div className="flex items-center gap-2">
                   <Terminal size={14} className="text-blue-400" />
                   <span className="text-xs font-mono text-slate-400">interactive_playground.py</span>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={handleReset}
                        className="p-1.5 text-slate-400 hover:text-white transition-colors hover:bg-slate-700 rounded-md"
                        title="Reset Code"
                    >
                        <RotateCcw size={14} />
                    </button>
                    <button 
                        onClick={handleRun}
                        disabled={isRunning}
                        className="flex items-center gap-2 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-md transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isRunning ? <RotateCcw size={12} className="animate-spin" /> : <Play size={12} />}
                        <span>Run Code</span>
                    </button>
                </div>
            </div>

            {/* Editor Area */}
            <div className="relative bg-[#0F172A]">
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="absolute inset-0 w-full h-full p-4 font-mono text-sm bg-transparent text-transparent caret-white resize-none outline-none z-10"
                    spellCheck={false}
                    style={{ lineHeight: '1.5' }}
                />
                <pre className="m-0 p-4 font-mono text-sm min-h-37.5 pointer-events-none overflow-auto">
                    <code className="language-python" style={{ lineHeight: '1.5' }}>{code}</code>
                </pre>
            </div>

            {/* Terminal Output Area */}
            {output && (
                <div className="border-t border-slate-700 bg-black/60 p-4 font-mono text-sm animate-in slide-in-from-top-2" dir="ltr">
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase mb-2 tracking-widest border-b border-slate-800 pb-1" dir="rtl">
                        <Terminal size={12} />
                        פלט הרצה (Terminal)
                    </div>
                    <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed">{output}</pre>
                </div>
            )}
        </div>
    );
};