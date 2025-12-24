"use client";

import React from 'react';
import { Play } from 'lucide-react';

interface DemoContainerProps {
    title: string;
    children: React.ReactNode;
    output: string;
    dir?: "ltr" | "rtl" | "auto"; 
}

export const DemoContainer = ({ title, children, output, dir = "auto" }: DemoContainerProps) => {
    
    // זיהוי אוטומטי
    const isOutputHebrew = /[\u0590-\u05FF]/.test(output);

    // חישוב כיוון סופי: אם המשתמש קבע ידנית - זה קובע. אחרת לפי התוכן.
    const finalDir = dir !== "auto" ? dir : (isOutputHebrew ? "rtl" : "ltr");
    
    // בוליאני לעיצוב
    const isRtl = finalDir === "rtl";

    return (
        <div className="my-8 rounded-xl overflow-hidden border border-indigo-500/30 bg-[#0F172A] shadow-lg shadow-indigo-500/10" dir="ltr">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-indigo-500/20">
                <span className="text-xs font-mono text-indigo-400 font-bold">{title}</span>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 text-[10px] border border-indigo-500/20">
                    <Play size={10} />
                    <span>Interactive</span>
                </div>
            </div>
            
            <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto text-left">
                {children}
            </div>

            <div className="border-t border-slate-700/50 bg-[#020617] p-4">
                <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-2 text-left">Output</div>
                <pre 
                    // שימוש ב-Style ישיר כדי להכריח את הדפדפן
                    style={{ 
                        direction: finalDir, 
                        textAlign: isRtl ? 'right' : 'left',
                        unicodeBidi: 'plaintext' // עוזר לדפדפן להתמודד עם ערבוב שפות
                    }}
                    className={`text-emerald-400 font-mono text-sm whitespace-pre-wrap transition-all duration-300 ${isRtl ? "font-sans" : ""}`}
                >
                    {output}
                </pre>
            </div>
        </div>
    );
};

export const CodeInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input 
        {...props}
        className={`bg-slate-800 border-b-2 border-indigo-500/50 text-center rounded-t-sm focus:bg-slate-700 focus:border-indigo-400 outline-none px-1 min-w-8 transition-colors ${props.className || ""}`}
    />
);