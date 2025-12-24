"use client";

import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { DemoContainer } from '@/components/demos/ui/DemoShell';

export const PipelineBuilderDemo = () => {
    const [input, setInput] = useState("  The AI   of Python is AMAZING.  ");
    
    // Step 1: Normalize
    const normalized = input.trim().toLowerCase();
    
    // Step 2: Tokenize (simplified logic)
    const tokens = normalized.replace(/[^\w\s]/g, "").split(/\s+/).filter(w => w);
    
    // Step 3: Stats
    const stats = {
        num_words: tokens.length,
        most_common: tokens.length > 0 ? tokens.sort((a,b) =>
              tokens.filter(v => v===a).length - tokens.filter(v => v===b).length
        ).pop() : null
    };

    return (
        <DemoContainer 
            title="text_processing_pipeline.py" 
            output={JSON.stringify(stats, null, 2).replace(/"/g, "'").replace(/null/, "None")}
            dir="ltr"
        >
            <div className="space-y-4 relative">
                {/* קו מחבר ברקע */}
                <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-indigo-500/20 -z-10"></div>

                {/* שלב 1: קלט */}
                <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xs font-mono text-slate-400 shrink-0 z-10">
                        Input
                    </div>
                    <div className="flex-1">
                        <label className="text-[10px] text-slate-500 uppercase font-bold">Raw Text</label>
                        <input 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded px-3 py-2 text-sm text-green-300 font-mono mt-1 focus:border-indigo-500 outline-none"
                        />
                    </div>
                </div>

                {/* חץ */}
                <div className="pl-5 text-indigo-500/50"><ArrowDown size={14} /></div>

                {/* שלב 2: פונקציה 1 */}
                <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/50 flex items-center justify-center text-[10px] font-mono text-indigo-300 shrink-0 z-10 text-center leading-tight">
                        func<br/>norm
                    </div>
                    <div className="flex-1 bg-slate-800/30 p-2 rounded border border-slate-700/50">
                        <div className="text-[10px] text-purple-400 font-mono mb-1">def normalize(text):</div>
                        <div className="text-sm text-slate-300 font-mono">&quot;{normalized}&quot;</div>
                    </div>
                </div>

                {/* חץ */}
                <div className="pl-5 text-indigo-500/50"><ArrowDown size={14} /></div>

                {/* שלב 3: פונקציה 2 */}
                <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/50 flex items-center justify-center text-[10px] font-mono text-indigo-300 shrink-0 z-10 text-center leading-tight">
                        func<br/>token
                    </div>
                    <div className="flex-1 bg-slate-800/30 p-2 rounded border border-slate-700/50">
                        <div className="text-[10px] text-purple-400 font-mono mb-1">def tokenize(text):</div>
                        <div className="text-sm text-slate-300 font-mono">[&apos;{tokens.join("', '")}&apos;]</div>
                    </div>
                </div>

                 {/* חץ */}
                 <div className="pl-5 text-indigo-500/50"><ArrowDown size={14} /></div>

                {/* שלב 4: פונקציה 3 (הפלט) */}
                <div className="flex gap-4 items-center">
                     <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/50 flex items-center justify-center text-[10px] font-mono text-emerald-300 shrink-0 z-10 text-center leading-tight">
                        func<br/>stats
                    </div>
                    <div className="flex-1 text-slate-500 text-xs italic">
                        Calculates final stats (see Output below)
                    </div>
                </div>

            </div>
        </DemoContainer>
    );
};