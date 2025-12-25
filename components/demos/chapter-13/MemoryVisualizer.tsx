"use client";

import React, { useState } from 'react';
import { Box, Play, RefreshCw, Cpu } from 'lucide-react';
import { DemoContainer } from '@/components/demos/ui/DemoShell';

export const MemoryVisualizer = () => {
    const [mode, setMode] = useState<'list' | 'generator'>('list');
    const [memoryUsage, setMemoryUsage] = useState(0);
    const [processed, setProcessed] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [, setItems] = useState<number[]>([]);

    const totalItems = 20;

    const runSimulation = () => {
        setIsRunning(true);
        setMemoryUsage(0);
        setProcessed(0);
        setItems([]);

        if (mode === 'list') {
            // List: טוען הכל לזיכרון מיד
            let currentMem = 0;
            const interval = setInterval(() => {
                currentMem++;
                setMemoryUsage(prev => prev + 1);
                setItems(prev => [...prev, currentMem]);
                
                if (currentMem >= totalItems) {
                    clearInterval(interval);
                    // אחרי הטעינה, מתחילים לעבד
                    startProcessing();
                }
            }, 100);
        } else {
            // Generator: מייצר ומעבד אחד אחד
            let currentItem = 0;
            const interval = setInterval(() => {
                currentItem++;
                setMemoryUsage(1); // תמיד 1
                setItems([currentItem]); // רק הנוכחי קיים
                setProcessed(currentItem);
                
                if (currentItem >= totalItems) {
                    clearInterval(interval);
                    setIsRunning(false);
                    setMemoryUsage(0);
                    setItems([]);
                }
            }, 200);
        }
    };

    const startProcessing = () => {
        let currentProc = 0;
        const interval = setInterval(() => {
            currentProc++;
            setProcessed(currentProc);
            if (currentProc >= totalItems) {
                clearInterval(interval);
                setIsRunning(false);
            }
        }, 100);
    };

    return (
        <DemoContainer title={mode === 'list' ? "memory_hog.py" : "efficient_gen.py"} output="" dir="ltr">
            <div className="flex flex-col gap-6">
                
                {/* Controls */}
                <div className="flex justify-center gap-4">
                    <button 
                        onClick={() => { setMode('list'); setMemoryUsage(0); setProcessed(0); setItems([]); }}
                        className={`px-4 py-2 rounded-lg border transition-all text-sm font-bold ${mode === 'list' ? 'bg-red-500/20 border-red-500 text-red-300' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                    >
                        Python List []
                    </button>
                    <button 
                        onClick={() => { setMode('generator'); setMemoryUsage(0); setProcessed(0); setItems([]); }}
                        className={`px-4 py-2 rounded-lg border transition-all text-sm font-bold ${mode === 'generator' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                    >
                        Generator ()
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* RAM Visualization */}
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 relative h-48 overflow-hidden flex flex-col justify-end">
                        <div className="absolute top-2 left-2 text-xs font-mono text-slate-500 flex items-center gap-2">
                            <Box size={14} /> RAM Usage
                        </div>
                        <div className="flex flex-wrap content-end gap-1">
                            {mode === 'list' ? (
                                // בשיטת הרשימה, כל הפריטים נשארים בזיכרון
                                Array.from({ length: memoryUsage }).map((_, i) => (
                                    <div key={i} className="w-3 h-3 bg-red-500/50 border border-red-500/30 rounded-sm animate-in zoom-in duration-200"></div>
                                ))
                            ) : (
                                // בשיטת הגנרטור, רק אחד קיים
                                isRunning && <div className="w-3 h-3 bg-emerald-500 border border-emerald-400 rounded-sm animate-pulse"></div>
                            )}
                        </div>
                        
                        {/* Memory Meter */}
                        <div className="absolute top-2 right-2 text-xs font-mono font-bold">
                            {mode === 'list' ? 
                                <span className={memoryUsage > 15 ? "text-red-500" : "text-slate-300"}>{memoryUsage * 50} MB</span> : 
                                <span className="text-emerald-400">~1 MB (Constant)</span>
                            }
                        </div>
                    </div>

                    {/* CPU Processing */}
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 relative h-48 flex items-center justify-center">
                        <div className="absolute top-2 left-2 text-xs font-mono text-slate-500 flex items-center gap-2">
                            <Cpu size={14} /> Processing
                        </div>
                        
                        <div className="text-center">
                            <div className="text-4xl font-black text-slate-200 mb-2">{processed} / {totalItems}</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Items Processed</div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button 
                        onClick={runSimulation}
                        disabled={isRunning}
                        className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-8 py-2 rounded-full font-bold shadow-lg shadow-indigo-900/50 transition-transform active:scale-95 flex items-center gap-2"
                    >
                        {isRunning ? <RefreshCw size={16} className="animate-spin" /> : <Play size={16} />}
                        Start Simulation
                    </button>
                </div>

            </div>
        </DemoContainer>
    );
};