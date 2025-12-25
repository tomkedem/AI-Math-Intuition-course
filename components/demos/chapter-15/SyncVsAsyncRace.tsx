"use client";

import React, { useState } from 'react';
import { Play, Zap, Snail } from 'lucide-react';
import { DemoContainer } from '@/components/demos/ui/DemoShell';

export const SyncVsAsyncRace = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [syncProgress, setSyncProgress] = useState([0, 0, 0]);
    const [asyncProgress, setAsyncProgress] = useState([0, 0, 0]);
    const [syncTime, setSyncTime] = useState(0);
    const [asyncTime, setAsyncTime] = useState(0);

    const runRace = async () => {
        setIsRunning(true);
        setSyncProgress([0, 0, 0]);
        setAsyncProgress([0, 0, 0]);
        setSyncTime(0);
        setAsyncTime(0);

        // --- ASYNC LANE (Parallel) ---
        const startAsync = Date.now();
        const asyncInterval = setInterval(() => {
            setAsyncTime((Date.now() - startAsync) / 1000);
        }, 100);

        // מדמה הרצה במקביל: מעדכנים את כל ה-3 בו זמנית
        const animateAsync = (idx: number) => {
            return new Promise<void>(resolve => {
                let p = 0;
                const int = setInterval(() => {
                    p += 5;
                    setAsyncProgress(prev => {
                        const newP = [...prev];
                        newP[idx] = p;
                        return newP;
                    });
                    if (p >= 100) {
                        clearInterval(int);
                        resolve();
                    }
                }, 50); // מהיר יותר כי זה "רשת"
            });
        };

        // מריצים את כולם יחד (gather)
        Promise.all([animateAsync(0), animateAsync(1), animateAsync(2)]).then(() => {
            clearInterval(asyncInterval);
        });


        // --- SYNC LANE (Sequential) ---
        const startSync = Date.now();
        const syncIntervalTimer = setInterval(() => {
            setSyncTime((Date.now() - startSync) / 1000);
        }, 100);

        // מריצים אחד אחרי השני
        for (let i = 0; i < 3; i++) {
            await new Promise<void>(resolve => {
                let p = 0;
                const int = setInterval(() => {
                    p += 5;
                    setSyncProgress(prev => {
                        const newP = [...prev];
                        newP[i] = p;
                        return newP;
                    });
                    if (p >= 100) {
                        clearInterval(int);
                        resolve();
                    }
                }, 50);
            });
        }
        clearInterval(syncIntervalTimer);
        setIsRunning(false);
    };

    return (
        <DemoContainer title="benchmark_requests.py" output="" dir="ltr">
            <div className="flex flex-col gap-8 py-2">
                
                {/* Sync Lane */}
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2 text-orange-400 font-bold">
                            <Snail size={20} />
                            <span>Synchronous (requests)</span>
                        </div>
                        <div className="font-mono text-sm text-slate-400">Time: {syncTime.toFixed(1)}s</div>
                    </div>
                    <div className="space-y-3">
                        {syncProgress.map((p, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="text-xs text-slate-500 w-16">Req {i+1}</span>
                                <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-500 transition-all duration-75" style={{ width: `${p}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Async Lane */}
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold">
                            <Zap size={20} />
                            <span>Asynchronous (aiohttp)</span>
                        </div>
                        <div className="font-mono text-sm text-slate-400">Time: {asyncTime.toFixed(1)}s</div>
                    </div>
                    <div className="space-y-3">
                        {asyncProgress.map((p, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="text-xs text-slate-500 w-16">Req {i+1}</span>
                                <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 transition-all duration-75" style={{ width: `${p}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center">
                    <button 
                        onClick={runRace}
                        disabled={isRunning}
                        className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-indigo-900/50 transition-transform active:scale-95 flex items-center gap-2"
                    >
                        <Play size={18} /> Start Race
                    </button>
                </div>

                <div className="text-center text-xs text-slate-500">
                    * שים לב: ב-Sync כל בקשה מחכה לקודמת. ב-Async כולן רצות במקביל.
                </div>

            </div>
        </DemoContainer>
    );
};