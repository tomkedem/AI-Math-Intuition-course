"use client";

import React, { useState } from 'react';
import { Bot, Layers } from 'lucide-react';
import { DemoContainer } from '@/components/demos/ui/DemoShell';

export const ClassVsInstance = () => {
    // משתנה מחלקה (משותף)
    const [classVersion, setClassVersion] = useState("1.0");
    
    // משתני מופע (אישיים)
    const [robot1Name, setRobot1Name] = useState("Robo-A");
    const [robot2Name, setRobot2Name] = useState("Robo-B");

    const updateClassVar = () => {
        const next = (parseFloat(classVersion) + 0.1).toFixed(1);
        setClassVersion(next);
    };

    return (
        <DemoContainer title="class_attributes.py" output={`Robot.version = ${classVersion}`} dir="ltr">
            <div className="flex flex-col gap-8">
                
                {/* Class Level */}
                <div className="bg-indigo-900/20 border border-indigo-500/30 p-4 rounded-xl flex flex-col items-center gap-2 relative">
                    <div className="absolute -top-3 bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wide uppercase">
                        Class Level (Shared)
                    </div>
                    <Layers className="text-indigo-400 mb-1" />
                    <div className="font-mono text-sm text-indigo-300">class Robot:</div>
                    <div className="flex items-center gap-2 bg-slate-900 px-3 py-1 rounded border border-indigo-500/20">
                        <span className="text-slate-400 text-xs">version = </span>
                        <span className="text-yellow-400 font-bold">{classVersion}</span>
                    </div>
                    <button 
                        onClick={updateClassVar}
                        className="mt-2 text-[10px] bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded transition-colors"
                    >
                        Robot.version += 0.1
                    </button>
                </div>

                {/* Instances Level */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Robot 1 */}
                    <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl flex flex-col items-center gap-2 relative">
                        <span className="absolute top-2 left-2 text-[10px] text-slate-500 font-mono">r1</span>
                        <Bot className="text-emerald-400" size={32} />
                        <input 
                            value={robot1Name}
                            onChange={(e) => setRobot1Name(e.target.value)}
                            className="bg-slate-900 text-center text-xs text-white border-b border-slate-600 w-20 focus:border-emerald-500 outline-none"
                        />
                        <div className="text-[10px] text-slate-400 mt-1">
                            r1.version: <span className="text-yellow-400">{classVersion}</span>
                        </div>
                    </div>

                    {/* Robot 2 */}
                    <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl flex flex-col items-center gap-2 relative">
                        <span className="absolute top-2 left-2 text-[10px] text-slate-500 font-mono">r2</span>
                        <Bot className="text-pink-400" size={32} />
                        <input 
                            value={robot2Name}
                            onChange={(e) => setRobot2Name(e.target.value)}
                            className="bg-slate-900 text-center text-xs text-white border-b border-slate-600 w-20 focus:border-pink-500 outline-none"
                        />
                        <div className="text-[10px] text-slate-400 mt-1">
                            r2.version: <span className="text-yellow-400">{classVersion}</span>
                        </div>
                    </div>
                </div>

                <div className="text-center text-xs text-slate-500">
                    * שינוי המשתנה במחלקה מעדכן מיד את כל המופעים. שינוי שם הוא ייחודי לכל רובוט.
                </div>
            </div>
        </DemoContainer>
    );
};