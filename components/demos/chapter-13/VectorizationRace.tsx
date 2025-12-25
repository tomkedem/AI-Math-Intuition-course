"use client";

import React, { useState } from 'react';
import { Play, Zap, Snail } from 'lucide-react';
import { DemoContainer } from '@/components/demos/ui/DemoShell';

export const VectorizationRace = () => {
    const [pythonProgress, setPythonProgress] = useState(0);
    const [numpyProgress, setNumpyProgress] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);

    const startRace = () => {
        setIsRunning(true);
        setPythonProgress(0);
        setNumpyProgress(0);
        setWinner(null);

        // NumPy (SIMD) - Fast and "Chunked"
        setTimeout(() => {
            const interval = setInterval(() => {
                setNumpyProgress(prev => {
                    const next = prev + 25;
                    if (next >= 100) {
                        clearInterval(interval);
                        setWinner("NumPy"); // קביעת המנצח ישירות בסיום
                        return 100;
                    }
                    return next;
                });
            }, 100);
        }, 200);

        // Python Loop - Slow and Steady
        const pyInterval = setInterval(() => {
            setPythonProgress(prev => {
                if (prev >= 100) {
                    clearInterval(pyInterval);
                    return 100;
                }
                return prev + 2; // Tiny steps
            });
        }, 50);
    };

    return (
        <DemoContainer title="benchmark.py" output={winner ? `🏆 Winner: ${winner}!` : "Running..."} dir="ltr">
            <div className="flex flex-col gap-8 py-4">
                
                {/* Python Lane */}
                <div className="relative">
                    <div className="flex justify-between text-xs text-slate-400 mb-1 font-mono">
                        <span className="flex items-center gap-1"><Snail size={14}/> Python Loop</span>
                        <span>{Math.round(pythonProgress)}%</span>
                    </div>
                    <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-orange-500 transition-all duration-50 ease-linear" // תוקן duration-50
                            style={{ width: `${pythonProgress}%` }}
                        ></div>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">for i in range(len(arr)): arr[i] * 2</div>
                </div>

                {/* NumPy Lane */}
                <div className="relative">
                    <div className="flex justify-between text-xs text-slate-400 mb-1 font-mono">
                        <span className="flex items-center gap-1"><Zap size={14} className="text-yellow-400"/> NumPy Vectorization</span>
                        <span>{Math.round(numpyProgress)}%</span>
                    </div>
                    <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-emerald-500 transition-all duration-100 ease-out"
                            style={{ width: `${numpyProgress}%` }}
                        ></div>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">arr * 2 (SIMD Operation)</div>
                </div>

                <div className="flex justify-center mt-4">
                    <button 
                        onClick={startRace}
                        disabled={isRunning && pythonProgress < 100}
                        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-8 py-2 rounded-full font-bold shadow-lg shadow-blue-900/50 transition-transform active:scale-95 flex items-center gap-2"
                    >
                        <Play size={16} /> Start Benchmark
                    </button>
                </div>

            </div>
        </DemoContainer>
    );
};