"use client";

import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; 
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript'; 
import { Check, Copy, FileCode, Play, Terminal } from 'lucide-react';

interface CodeBlockProps {
    code: string;
    language?: 'python' | 'bash' | 'javascript';
    filename?: string;
    output?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'python', filename, output }) => {
    const [copied, setCopied] = useState(false);
    const [showOutput, setShowOutput] = useState(false);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        Prism.highlightAll();
    }, [code, language, showOutput]);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleRun = () => {
        if (showOutput) {
            setShowOutput(false);
            return;
        }
        setIsRunning(true);
        setTimeout(() => {
            setIsRunning(false);
            setShowOutput(true);
        }, 800);
    };

    // --- פונקציה לזיהוי עברית ---
    // בודקת האם יש תווים בטווח היוניקוד של עברית
    const isHebrew = (text: string) => /[\u0590-\u05FF]/.test(text);

    return (
        <div className="my-6 rounded-xl overflow-hidden border border-slate-700/50 bg-[#0F172A] shadow-lg group" dir="ltr">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700/50">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <FileCode size={14} className="text-blue-400" />
                    <span>{filename || language}</span>
                </div>
                
                <div className="flex items-center gap-2">
                    {output && (
                        <button 
                            onClick={handleRun}
                            className={`flex items-center gap-1.5 text-[10px] font-medium transition-all px-2 py-1 rounded-md border ${
                                showOutput 
                                ? 'bg-slate-700 text-slate-300 border-slate-600' 
                                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                            }`}
                        >
                            <Play size={10} className={isRunning ? "animate-spin" : ""} />
                            <span>{isRunning ? 'Running...' : showOutput ? 'Hide Output' : 'Run Code'}</span>
                        </button>
                    )}
                    
                    <button 
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 hover:text-white transition-colors bg-slate-700/50 hover:bg-slate-700 px-2 py-1 rounded-md"
                    >
                        {copied ? (
                            <>
                                <Check size={12} className="text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                            </>
                        ) : (
                            <>
                                <Copy size={12} />
                                <span>Copy</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Code Area */}
            <div className="relative overflow-x-auto custom-scrollbar">
                <pre className="m-0! p-4! bg-transparent! text-sm! leading-relaxed font-mono">
                    <code className={`language-${language}`}>
                        {code.trim()}
                    </code>
                </pre>
            </div>

            {/* Output Area (With RTL Support) */}
            {showOutput && (
                <div className="border-t border-slate-700/50 bg-[#020617] animate-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border-b border-slate-800 text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                        <Terminal size={12} />
                        Output
                    </div>
                    {/* בדיקת כיוון הטקסט לפי תוכן הפלט */}
                    <pre 
                        dir={isHebrew(output || "") ? "rtl" : "ltr"}
                        className={`p-4 text-sm font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap ${isHebrew(output || "") ? "text-right font-sans" : "text-left"}`}
                    >
                        {output}
                    </pre>
                </div>
            )}
        </div>
    );
};