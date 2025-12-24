"use client";

import React, { useState } from 'react';
import { Play, ArrowRight, Share2 } from 'lucide-react';
import { DemoContainer } from '@/components/demos/ui/DemoShell';

export const NameMainDemo = () => {
    const [mode, setMode] = useState<'direct' | 'imported'>('direct');

    const outputDirect = `This always runs (Module Loaded)
Running Demo...
Hello`;

    const outputImported = `This always runs (Module Loaded)`;

    return (
        <DemoContainer 
            title="execution_context.py" 
            output={mode === 'direct' ? outputDirect : outputImported}
            dir="ltr"
        >
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    {/* כפתור הרצה ישירה */}
                    <button 
                        onClick={() => setMode('direct')}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${
                            mode === 'direct' 
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                            : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800'
                        }`}
                    >
                        <Play size={24} />
                        <div className="text-center">
                            <span className="block font-bold text-sm">Run Directly</span>
                            <span className="text-[10px] font-mono">python text_utils.py</span>
                        </div>
                    </button>

                    {/* כפתור ייבוא */}
                    <button 
                        onClick={() => setMode('imported')}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${
                            mode === 'imported' 
                            ? 'bg-blue-500/10 border-blue-500 text-blue-400' 
                            : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800'
                        }`}
                    >
                        <Share2 size={24} />
                        <div className="text-center">
                            <span className="block font-bold text-sm">Import as Module</span>
                            <span className="text-[10px] font-mono">import text_utils</span>
                        </div>
                    </button>
                </div>

                {/* ויזואליזציה של הקוד */}
                <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm relative border border-slate-700/50">
                    <div className="text-slate-500 mb-2"># text_utils.py</div>
                    <div className="text-pink-400">def <span className="text-yellow-300">clean</span>(text):</div>
                    <div className="pl-4 text-slate-300">return text.strip()</div>
                    <br/>
                    
                    {/* החלק שרץ תמיד */}
                    <div className="relative">
                        <div className="text-yellow-300">print(<span className="text-green-300">&quot;This always runs...&quot;</span>)</div>
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 flex items-center">
                            <ArrowRight size={12} /> Always
                        </div>
                    </div>
                    <br/>
                    
                    {/* החלק שרץ רק ב-Main */}
                    <div className={`transition-opacity duration-300 ${mode === 'imported' ? 'opacity-30 grayscale' : 'opacity-100'}`}>
                        <div className="text-purple-400">if <span className="text-blue-300">__name__</span> == <span className="text-green-300">&quot;__main__&quot;</span>:</div>
                        <div className="pl-4 text-yellow-300">print(<span className="text-green-300">&quot;Running Demo...&quot;</span>)</div>
                        <div className="pl-4 text-yellow-300">print(clean(<span className="text-green-300">&quot; Hello &quot;</span>))</div>
                    </div>
                    
                    {/* חיווי ויזואלי למצב מושתק */}
                    {mode === 'imported' && (
                        <div className="absolute bottom-4 right-4 text-xs text-red-400 flex items-center gap-1 font-bold bg-slate-950/80 px-2 py-1 rounded border border-red-500/30">
                            Skipped on Import
                        </div>
                    )}
                </div>
            </div>
        </DemoContainer>
    );
};