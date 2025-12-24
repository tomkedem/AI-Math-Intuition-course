"use client";

import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; 
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript'; 
import { Check, Copy, FileCode } from 'lucide-react';

interface CodeBlockProps {
    code: string;
    language?: 'python' | 'bash' | 'javascript';
    filename?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'python', filename }) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        Prism.highlightAll();
    }, [code, language]);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="my-6 rounded-xl overflow-hidden border border-slate-700/50 bg-[#0F172A] shadow-lg group" dir="ltr">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700/50">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <FileCode size={14} className="text-blue-400" />
                    <span>{filename || language}</span>
                </div>
                
                <button 
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 hover:text-white transition-colors bg-slate-700/50 hover:bg-slate-700 px-2 py-1 rounded-md"
                >
                    {copied ? (
                        <>
                            <Check size={12} className="text-emerald-400" />
                            <span className="text-emerald-400">הועתק!</span>
                        </>
                    ) : (
                        <>
                            <Copy size={12} />
                            <span>העתק</span>
                        </>
                    )}
                </button>
            </div>

            {/* Code Area */}
            <div className="relative overflow-x-auto custom-scrollbar">
                <pre className="m-0! p-4! bg-transparent! text-sm! leading-relaxed font-mono">
                    <code className={`language-${language}`}>
                        {code.trim()}
                    </code>
                </pre>
            </div>
        </div>
    );
};