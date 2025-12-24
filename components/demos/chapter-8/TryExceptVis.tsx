"use client";

import React, { useState } from 'react';
import { Play, AlertTriangle, ArrowDown } from 'lucide-react';
import { DemoContainer } from '@/components/demos/ui/DemoShell';

export const TryExceptVis = () => {
    const [scenario, setScenario] = useState<'success' | 'error'>('success');
    const [activeBlock, setActiveBlock] = useState<string>('');
    const [logs, setLogs] = useState<string[]>([]);

    const runSimulation = async () => {
        setLogs([]);
        
        // 1. TRY
        setActiveBlock('try');
        setLogs(prev => [...prev, "Started 'try' block..."]);
        await new Promise(r => setTimeout(r, 800));

        if (scenario === 'error') {
            setLogs(prev => [...prev, "❌ Error occurred!"]);
            
            // 2. EXCEPT
            setActiveBlock('except');
            await new Promise(r => setTimeout(r, 800));
            setLogs(prev => [...prev, "⚠️ Caught exception in 'except' block."]);
        } else {
            setLogs(prev => [...prev, "✅ Operation successful."]);
            
            // 2. ELSE
            setActiveBlock('else');
            await new Promise(r => setTimeout(r, 800));
            setLogs(prev => [...prev, "✨ Running 'else' block (no errors)."]);
        }

        // 3. FINALLY
        setActiveBlock('finally');
        await new Promise(r => setTimeout(r, 800));
        setLogs(prev => [...prev, "🧹 Running 'finally' (Cleanup)."]);
        
        await new Promise(r => setTimeout(r, 800));
        setActiveBlock('');
    };

    const getBlockStyle = (blockName: string) => {
        const base = "p-3 rounded border text-sm font-mono transition-all duration-500 ";
        if (activeBlock === blockName) {
            return base + "bg-yellow-500/20 border-yellow-500 text-yellow-200 scale-105 shadow-lg shadow-yellow-500/10";
        }
        return base + "bg-slate-800 border-slate-700 text-slate-400 opacity-50";
    };

    return (
        <DemoContainer title="error_handling_flow.py" output={logs.join('\n')} dir="ltr">
            <div className="flex flex-col gap-6">
                
                {/* Controls */}
                <div className="flex justify-center gap-4">
                    <button 
                        onClick={() => { setScenario('success'); runSimulation(); }}
                        disabled={!!activeBlock}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 rounded hover:bg-emerald-500/20 disabled:opacity-50 transition-colors"
                    >
                        <Play size={16} /> Run Success Path
                    </button>
                    <button 
                        onClick={() => { setScenario('error'); runSimulation(); }}
                        disabled={!!activeBlock}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/50 text-red-400 rounded hover:bg-red-500/20 disabled:opacity-50 transition-colors"
                    >
                        <AlertTriangle size={16} /> Run Error Path
                    </button>
                </div>

                {/* Diagram */}
                <div className="grid grid-cols-2 gap-4 relative max-w-md mx-auto w-full">
                    
                    {/* Try Block */}
                    <div className={`col-span-2 ${getBlockStyle('try')}`}>
                        <span className="text-purple-400 font-bold">try:</span>
                        <div className="pl-4 text-xs">load_model()</div>
                    </div>

                    {/* Arrows */}
                    <div className="col-span-2 flex justify-between px-10 text-slate-600">
                        <ArrowDown size={20} className={scenario === 'error' && activeBlock ? "text-red-500 animate-bounce" : ""} />
                        <ArrowDown size={20} className={scenario === 'success' && activeBlock ? "text-emerald-500 animate-bounce" : ""} />
                    </div>

                    {/* Except Block */}
                    <div className={getBlockStyle('except')}>
                        <span className="text-purple-400 font-bold">except:</span>
                        <div className="pl-4 text-xs">handle_error()</div>
                        <div className="mt-1 text-[10px] text-red-400 font-bold uppercase tracking-wider text-center">If Error</div>
                    </div>

                    {/* Else Block */}
                    <div className={getBlockStyle('else')}>
                        <span className="text-purple-400 font-bold">else:</span>
                        <div className="pl-4 text-xs">process_data()</div>
                        <div className="mt-1 text-[10px] text-emerald-400 font-bold uppercase tracking-wider text-center">If Success</div>
                    </div>

                    {/* Finally Block */}
                    <div className={`col-span-2 mt-2 ${getBlockStyle('finally')}`}>
                        <span className="text-purple-400 font-bold">finally:</span>
                        <div className="pl-4 text-xs">close_files()</div>
                        <div className="mt-1 text-[10px] text-blue-400 font-bold uppercase tracking-wider text-center">Always Runs</div>
                    </div>

                </div>
            </div>
        </DemoContainer>
    );
};