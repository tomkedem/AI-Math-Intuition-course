"use client";

import React, { useState } from 'react';
import { Play, Settings, Cpu, FileText, Activity, Terminal } from 'lucide-react';
import { DemoContainer } from '@/components/demos/ui/DemoShell';

export const TheBigAssembler = () => {
    const [step, setStep] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);

    const steps = [
        { label: "Config", icon: <Settings />, text: "Loading settings from config.json...", log: "INFO: Config loaded. Language: HE" },
        { label: "Input", icon: <FileText />, text: "Reading raw text file...", log: "INFO: Reading data/sample.txt" },
        { label: "Process", icon: <Cpu />, text: "Normalizing and Tokenizing...", log: "DEBUG: Text normalized. Tokens: 42" },
        { label: "Analysis", icon: <Activity />, text: "Calculating statistics with Pandas...", log: "INFO: Metrics computed: avg_len=5.2" },
        { label: "CLI", icon: <Terminal />, text: "Formatting output for User...", log: "SUCCESS: CLI execution finished with Exit Code 0" }
    ];

    const runNext = () => {
        if (step < steps.length) {
            setLogs(prev => [...prev, steps[step].log]);
            setStep(prev => prev + 1);
        }
    };

    const reset = () => {
        setStep(0);
        setLogs([]);
    };

    return (
        <DemoContainer title="mini_text_analyzer_run" output={logs.join('\n')}>
            <div className="flex flex-col gap-8">
                <div className="flex justify-between items-center px-4 relative">
                    {/* Progress Line */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 z-0"></div>
                    
                    {steps.map((s, i) => (
                        <div key={i} className={`relative z-10 flex flex-col items-center gap-2 transition-all duration-500 ${i < step ? 'text-emerald-400' : i === step ? 'text-indigo-400 scale-110' : 'text-slate-600'}`}>
                            <div className={`p-3 rounded-full border-2 ${i < step ? 'bg-emerald-500/20 border-emerald-500' : i === step ? 'bg-indigo-500 border-indigo-400 animate-pulse' : 'bg-slate-900 border-slate-800'}`}>
                                {s.icon}
                            </div>
                            <span className="text-[10px] font-bold uppercase">{s.label}</span>
                        </div>
                    ))}
                </div>

                <div className="text-center min-h-10">
                    <p className="text-slate-300 font-medium italic">
                        {step < steps.length ? steps[step].text : "🎉 Pipeline execution completed successfully!"}
                    </p>
                </div>

                <div className="flex justify-center gap-4">
                    {step < steps.length ? (
                        <button onClick={runNext} className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 transition-transform active:scale-95">
                            <Play size={16} /> Execute Next Step
                        </button>
                    ) : (
                        <button onClick={reset} className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-2 rounded-full font-bold transition-transform active:scale-95">
                            Run Again
                        </button>
                    )}
                </div>
            </div>
        </DemoContainer>
    );
};