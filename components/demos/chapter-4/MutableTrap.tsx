"use client";

import React, { useState } from 'react';
import { RefreshCw, Bug, ShieldCheck } from 'lucide-react';
import { DemoContainer } from '@/components/demos/ui/DemoShell';

export const MutableTrapDemo = () => {
    // סימולציה של זיכרון "גלובלי" עבור הפונקציה הבאגית (כדי להמחיש את הבעיה בפייתון)
    const [buggyMemory, setBuggyMemory] = useState<string[]>([]);
    
    // סימולציה של תוצאה תקינה
    const [fixedResult, setFixedResult] = useState<string[]>([]);

    // הפונקציה ה"מסוכנת" בפייתון
    const runBuggy = () => {
        // בפייתון: def add(item, list=[]): list.append(item); return list
        // הרשימה נשמרת בזיכרון של הגדרת הפונקציה
        const newMemory = [...buggyMemory, "Item"];
        setBuggyMemory(newMemory);
    };

    // הפונקציה המתוקנת
    const runFixed = () => {
        // בפייתון: def add(item, list=None): if list is None: list = [] ...
        // כל קריאה יוצרת רשימה חדשה
        setFixedResult(["Item"]); 
    };

    const reset = () => {
        setBuggyMemory([]);
        setFixedResult([]);
    };

    return (
        <DemoContainer 
            title="mutable_defaults_trap.py" 
            output=""
            dir="ltr"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* צד שמאל: המלכודת */}
                <div className="space-y-3 border-r border-slate-700/50 pr-4">
                    <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                        <Bug size={16} />
                        The Trap (Mutable Default)
                    </div>
                    <div className="text-xs text-slate-500 font-mono bg-slate-900 p-2 rounded">
                        def add(item, <span className="text-red-400">items=[]</span>):<br/>
                        &nbsp;&nbsp;items.append(item)<br/>
                        &nbsp;&nbsp;return items
                    </div>
                    <button 
                        onClick={runBuggy}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs px-3 py-1.5 rounded w-full transition-colors"
                    >
                        Run add(&quot;Item&quot;)
                    </button>
                    <div className="mt-2">
                        <span className="text-xs text-slate-400">Result:</span>
                        <div className="font-mono text-green-400 bg-slate-950 p-2 rounded mt-1 h-20 overflow-auto">
                            {JSON.stringify(buggyMemory).replace(/"/g, "'")}
                        </div>
                        {buggyMemory.length > 1 && (
                            <p className="text-[10px] text-red-400 mt-1 animate-pulse">
                                ⚠ שים לב! הרשימה זוכרת היסטוריה!
                            </p>
                        )}
                    </div>
                </div>

                {/* צד ימין: התיקון */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                        <ShieldCheck size={16} />
                        The Fix (None Default)
                    </div>
                    <div className="text-xs text-slate-500 font-mono bg-slate-900 p-2 rounded">
                        def add(item, <span className="text-emerald-400">items=None</span>):<br/>
                        &nbsp;&nbsp;if items is None: items = []<br/>
                        &nbsp;&nbsp;...
                    </div>
                    <button 
                        onClick={runFixed}
                        className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1.5 rounded w-full transition-colors"
                    >
                        Run add(&quot;Item&quot;)
                    </button>
                    <div className="mt-2">
                        <span className="text-xs text-slate-400">Result:</span>
                        <div className="font-mono text-green-400 bg-slate-950 p-2 rounded mt-1 h-20 overflow-auto">
                            {JSON.stringify(fixedResult).length > 2 ? JSON.stringify(fixedResult).replace(/"/g, "'") : "[]"}
                        </div>
                        {fixedResult.length > 0 && (
                            <p className="text-[10px] text-emerald-500 mt-1">
                                ✓ תמיד רשימה חדשה.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <button onClick={reset} className="mt-4 flex items-center gap-1 text-[10px] text-slate-500 hover:text-white transition-colors mx-auto">
                <RefreshCw size={10} /> Reset Memory
            </button>
        </DemoContainer>
    );
};