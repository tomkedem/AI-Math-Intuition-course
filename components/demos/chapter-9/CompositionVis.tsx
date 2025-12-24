"use client";

import React from 'react';
import { Scissors, Wand2 } from 'lucide-react';

export const CompositionVis = () => {
    return (
        <div className="my-8 p-6 bg-slate-900/50 border border-slate-700 rounded-xl relative overflow-hidden" dir="ltr">
            <div className="absolute top-0 right-0 bg-slate-800 px-3 py-1 rounded-bl-lg text-xs font-mono text-slate-400 border-l border-b border-slate-700">
                TextProcessor (Main Object)
            </div>

            <div className="flex flex-col items-center gap-6 mt-4">
                
                {/* Input */}
                <div className="text-xs text-slate-500 font-mono">Input: &quot; Hello World &quot;</div>

                {/* Internal Components */}
                <div className="flex gap-4 w-full max-w-md justify-center">
                    {/* Cleaner */}
                    <div className="flex-1 bg-indigo-900/20 border border-indigo-500/30 p-4 rounded-lg flex flex-col items-center gap-2 text-indigo-300">
                        <Wand2 size={20} />
                        <span className="text-xs font-bold font-mono">self.cleaner</span>
                        <div className="text-[10px] text-indigo-400/60 bg-indigo-950/50 px-2 py-1 rounded w-full text-center">
                            .clean()
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center text-slate-600">→</div>

                    {/* Tokenizer */}
                    <div className="flex-1 bg-emerald-900/20 border border-emerald-500/30 p-4 rounded-lg flex flex-col items-center gap-2 text-emerald-300">
                        <Scissors size={20} />
                        <span className="text-xs font-bold font-mono">self.tokenizer</span>
                        <div className="text-[10px] text-emerald-400/60 bg-emerald-950/50 px-2 py-1 rounded w-full text-center">
                            .tokenize()
                        </div>
                    </div>
                </div>

                {/* Output */}
                <div className="text-xs text-slate-500 font-mono">Output: [&apos;hello&apos;, &apos;world&apos;]</div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-center text-[10px] text-slate-400">
                האובייקט הגדול <strong>מכיל</strong> (Has-A) את האובייקטים הקטנים, ולא יורש מהם.
            </div>
        </div>
    );
};