"use client";

import React, { useState } from 'react';
import { DoorOpen, DoorClosed, AlertOctagon, FileCheck } from 'lucide-react';
import { DemoContainer } from '@/components/demos/ui/DemoShell';

export const ContextManagerVis = () => {
    const [step, setStep] = useState(0);
    const [hasError, setHasError] = useState(false);

    const nextStep = () => {
        if (step >= 3) {
            setStep(0);
            setHasError(false);
        } else {
            setStep(step + 1);
        }
    };

    const steps = [
        { title: "Idle", desc: "Waiting to start..." },
        { title: "__enter__", desc: "Opening file, acquiring resource..." },
        { title: "Inside Block", desc: hasError ? "❌ Error occurred!" : "Writing data to file..." },
        { title: "__exit__", desc: "Closing file (Cleanup), even if error." }
    ];

    return (
        <DemoContainer title="with_statement_flow.py" output={`Current State: ${steps[step].title}\n> ${steps[step].desc}`} dir="ltr">
            <div className="flex flex-col gap-6">
                
                {/* Visualization */}
                <div className="relative h-32 bg-slate-900 rounded-xl border border-slate-700 overflow-hidden flex items-center justify-center p-6">
                    
                    {/* The "Room" (Resource) */}
                    <div className={`w-24 h-24 border-4 rounded-lg flex flex-col items-center justify-center transition-all duration-500 ${
                        step > 0 && step < 3 ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-600 bg-slate-800'
                    }`}>
                        {step === 0 && <DoorClosed size={32} className="text-slate-500" />}
                        {step === 1 && <DoorOpen size={32} className="text-emerald-400 animate-pulse" />}
                        {step === 2 && (
                            hasError 
                            ? <AlertOctagon size={32} className="text-red-500 animate-bounce" />
                            : <FileCheck size={32} className="text-blue-400 animate-pulse" />
                        )}
                        {step === 3 && <DoorClosed size={32} className="text-emerald-600" />}
                        
                        <span className="text-[10px] mt-1 font-bold text-slate-400">RESOURCE</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 h-1 bg-indigo-500 transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }}></div>
                </div>

                {/* Controls */}
                <div className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg">
                    <div className="flex gap-2">
                        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={hasError} 
                                onChange={(e) => setHasError(e.target.checked)}
                                disabled={step > 0}
                                className="accent-red-500"
                            />
                            Simulate Error
                        </label>
                    </div>

                    <button 
                        onClick={nextStep}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-full font-bold text-sm transition-transform active:scale-95"
                    >
                        {step === 3 ? "Reset" : "Next Step ->"}
                    </button>
                </div>

                {/* Code Highlight */}
                <div className="font-mono text-sm space-y-1 bg-slate-950 p-4 rounded border border-slate-800">
                    <div className={step === 1 ? "bg-yellow-500/20 text-yellow-200 px-1 rounded" : "text-slate-500"}>
                        with open(&quot;file.txt&quot;) as f:
                    </div>
                    <div className={`pl-4 ${step === 2 ? (hasError ? "bg-red-500/20 text-red-200" : "bg-blue-500/20 text-blue-200") : "text-slate-600"} px-1 rounded`}>
                        {hasError ? "raise ValueError('Crash!')" : "f.write('Hello')"}
                    </div>
                    <div className={step === 3 ? "bg-emerald-500/20 text-emerald-200 px-1 rounded" : "text-slate-500"}>
                        # __exit__ runs automatically here
                    </div>
                </div>

            </div>
        </DemoContainer>
    );
};