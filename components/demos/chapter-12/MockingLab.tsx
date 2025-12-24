"use client";

import React, { useState } from 'react';
import { Cloud, Zap, ShieldCheck } from 'lucide-react';
import { DemoContainer } from '@/components/demos/ui/DemoShell';

export const MockingLab = () => {
    const [mode, setMode] = useState<'real' | 'mock'>('mock');
    const [status, setStatus] = useState("Idle");
    const [result, setResult] = useState("");

    const runCall = async () => {
        setStatus(mode === 'real' ? "Connecting to OpenAI API..." : "Using Mock Object...");
        setResult("");

        const delay = mode === 'real' ? 2500 : 200; // Real is slow, Mock is fast

        setTimeout(() => {
            if (mode === 'real') {
                setResult("Error: API Key missing / Rate Limit (Real API call failed)");
            } else {
                setResult("✅ Success: {'text': 'Mocked Response'}");
            }
            setStatus("Done");
        }, delay);
    };

    return (
        <DemoContainer title="test_llm_client.py" output={result || "Waiting for execution..."} dir="ltr">
            <div className="flex flex-col gap-8">
                
                {/* Mode Selector */}
                <div className="grid grid-cols-2 gap-4">
                    <button 
                        onClick={() => setMode('real')}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${mode === 'real' ? 'bg-orange-500/10 border-orange-500 text-orange-300' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                    >
                        <Cloud size={24} />
                        <span className="font-bold text-sm">Real API</span>
                        <span className="text-[10px]">Slow, Costly, Flaky</span>
                    </button>

                    <button 
                        onClick={() => setMode('mock')}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${mode === 'mock' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                    >
                        <ShieldCheck size={24} />
                        <span className="font-bold text-sm">Mock Object</span>
                        <span className="text-[10px]">Instant, Free, Stable</span>
                    </button>
                </div>

                {/* Visualization */}
                <div className="relative h-24 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center overflow-hidden">
                    {/* The Test Function */}
                    <div className="absolute left-4 bg-slate-700 px-3 py-1 rounded text-xs text-white z-10">Test Function</div>
                    
                    {/* The Target */}
                    <div className={`absolute right-4 px-3 py-1 rounded text-xs text-white z-10 flex items-center gap-2 ${mode === 'real' ? 'bg-orange-600' : 'bg-emerald-600'}`}>
                        {mode === 'real' ? <Cloud size={14}/> : <ShieldCheck size={14}/>}
                        {mode === 'real' ? 'OpenAI Server' : 'Mock Object'}
                    </div>

                    {/* Connection Line */}
                    <div className="absolute left-24 right-24 h-0.5 bg-slate-600"></div>
                    
                    {/* Signal */}
                    {status.includes("...") && (
                        <div className="absolute left-24 p-1 bg-white rounded-full shadow-[0_0_10px_white] animate-slide-right">
                            <Zap size={12} className="text-black" />
                        </div>
                    )}
                </div>

                <div className="flex justify-center">
                    <button 
                        onClick={runCall}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-2 rounded-full font-bold shadow-lg shadow-indigo-900/50 transition-transform active:scale-95"
                    >
                        Run Test
                    </button>
                </div>

            </div>
        </DemoContainer>
    );
};