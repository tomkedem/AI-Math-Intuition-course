"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Plus, Server, CheckCircle2 } from 'lucide-react';
import { DemoContainer } from '@/components/demos/ui/DemoShell';

type TaskStatus = 'waiting' | 'processing' | 'done';
type Task = { id: number; status: TaskStatus };

export const SemaphoreVis = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [activeCount, setActiveCount] = useState(0);
    const limit = 3;
    const nextId = useRef(1);

    const addTask = () => {
        setTasks(prev => [...prev, { id: nextId.current++, status: 'waiting' }]);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTasks(prevTasks => {
                let currentActive = prevTasks.filter(t => t.status === 'processing').length;
                
                const newTasks: Task[] = prevTasks.map(t => {
                    // קידום משימות ממתינות לעיבוד
                    if (t.status === 'waiting' && currentActive < limit) {
                        currentActive++;
                        return { ...t, status: 'processing' as TaskStatus };
                    }
                    // סיום משימות באופן אקראי
                    if (t.status === 'processing' && Math.random() > 0.8) {
                        return { ...t, status: 'done' as TaskStatus };
                    }
                    return t;
                });

                setActiveCount(newTasks.filter(t => t.status === 'processing').length);
                
                // הסרת משימות שסיימו מזמן כדי לא להעמיס
                return newTasks.filter(t => !(t.status === 'done' && Math.random() > 0.9));
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <DemoContainer title="asyncio_semaphore.py" output={`Active Tasks: ${activeCount} / ${limit}`} dir="ltr">
            <div className="flex flex-col gap-6">
                
                {/* Control */}
                <div className="flex justify-center">
                    <button 
                        onClick={addTask}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-blue-900/50 transition-transform active:scale-95"
                    >
                        <Plus size={18} /> Add Task Request
                    </button>
                </div>

                {/* System View */}
                <div className="flex gap-4 min-h-40">
                    
                    {/* Queue */}
                    <div className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl p-3 flex flex-col items-center">
                        <span className="text-xs text-slate-500 font-bold uppercase mb-2">Waiting Queue</span>
                        <div className="flex flex-col-reverse gap-2 w-full">
                            {tasks.filter(t => t.status === 'waiting').map(t => (
                                <div key={t.id} className="bg-slate-800 p-2 rounded text-center text-xs text-slate-400 border border-slate-700 animate-in slide-in-from-top-2">
                                    Task #{t.id}
                                </div>
                            ))}
                            {tasks.filter(t => t.status === 'waiting').length === 0 && <span className="text-xs text-slate-600 italic mt-4">Empty</span>}
                        </div>
                    </div>

                    {/* The Gate (Semaphore) */}
                    <div className="w-12 flex items-center justify-center">
                        <div className="h-full w-1 bg-slate-700 rounded-full relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-slate-900 text-[10px] font-bold px-2 py-1 rounded border border-yellow-400 whitespace-nowrap z-10">
                                Limit: {limit}
                            </div>
                        </div>
                    </div>

                    {/* Active Processing */}
                    <div className="flex-1 bg-emerald-900/10 border border-emerald-500/30 rounded-xl p-3 flex flex-col items-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-5"></div>
                        <span className="text-xs text-emerald-400 font-bold uppercase mb-2 flex items-center gap-2">
                            <Server size={14}/> Processing
                        </span>
                        <div className="grid grid-cols-2 gap-2 w-full">
                            {tasks.filter(t => t.status === 'processing').map(t => (
                                <div key={t.id} className="bg-emerald-600/20 border border-emerald-500/50 p-2 rounded text-center text-xs text-emerald-200 animate-pulse">
                                    Task #{t.id}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Done Pile */}
                    <div className="w-24 bg-slate-900/50 border border-slate-700 rounded-xl p-3 flex flex-col items-center">
                        <span className="text-xs text-slate-500 font-bold uppercase mb-2">Done</span>
                        <div className="flex flex-col gap-1 w-full overflow-hidden h-32 justify-end">
                            {tasks.filter(t => t.status === 'done').slice(-5).map(t => (
                                <div key={t.id} className="text-[10px] text-slate-500 flex items-center gap-1 opacity-50">
                                    <CheckCircle2 size={10} /> Task #{t.id}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                <div className="text-center text-xs text-slate-500">
                    * הסמפור מאפשר רק ל-{limit} משימות לעבור בו זמנית. השאר ממתינות בתור.
                </div>

            </div>
        </DemoContainer>
    );
};