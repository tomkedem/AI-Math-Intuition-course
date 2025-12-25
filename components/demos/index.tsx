"use client";

import React, { useState } from 'react';
import { Play, Clock, Lock, FileText} from 'lucide-react';
import { DemoContainer } from '@/components/demos/ui/DemoShell';

export const DecoratorBuilder = () => {
    const [useLogger, setUseLogger] = useState(false);
    const [useTimer, setUseTimer] = useState(false);
    const [useAuth, setUseAuth] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);

    const runSimulation = () => {
        const newLogs: string[] = [];
        
        // 1. Auth Logic (Pre-check)
        if (useAuth) {
            newLogs.push("🔒 Auth: Checking user permissions...");
            newLogs.push("✅ Auth: Access granted.");
        }

        // 2. Timer Start
        let startTime = 0;
        if (useTimer) {
            startTime = Date.now();
            newLogs.push("⏱️ Timer: Started...");
        }

        // 3. Logger (Before)
        if (useLogger) {
            newLogs.push("📝 Logger: Calling function 'process_data' with args: [100]");
        }

        // --- Actual Function Execution ---
        newLogs.push("⚙️ CORE FUNCTION: Processing data...");
        // ---------------------------------

        // 4. Logger (After)
        if (useLogger) {
            newLogs.push("📝 Logger: Function returned 'Success'");
        }

        // 5. Timer End
        if (useTimer) {
            const duration = Date.now() - startTime;
            newLogs.push(`⏱️ Timer: Finished in ${(duration / 1000).toFixed(3)}s`);
        }

        setLogs(newLogs);
    };

    // בניית המחשת הקוד הדינמית
    const renderCode = () => {
        let code = "";
        if (useAuth) code += "@require_auth\n";
        if (useTimer) code += "@measure_time\n";
        if (useLogger) code += "@log_execution\n";
        code += "def process_data(n):\n    return 'Success'";
        return code;
    };

    return (
        <DemoContainer title="decorator_stack.py" output={logs.join('\n')} dir="ltr">
            <div className="flex flex-col gap-6">
                
                {/* Toggles */}
                <div className="flex justify-center gap-4">
                    <button 
                        onClick={() => setUseLogger(!useLogger)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${useLogger ? 'bg-blue-500/20 border-blue-500 text-blue-300' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                    >
                        <FileText size={16} /> @log
                    </button>
                    <button 
                        onClick={() => setUseTimer(!useTimer)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${useTimer ? 'bg-yellow-500/20 border-yellow-500 text-yellow-300' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                    >
                        <Clock size={16} /> @time
                    </button>
                    <button 
                        onClick={() => setUseAuth(!useAuth)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${useAuth ? 'bg-red-500/20 border-red-500 text-red-300' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                    >
                        <Lock size={16} /> @auth
                    </button>
                </div>

                {/* Code Preview */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 relative flex items-center justify-between">
                    <pre className="font-mono text-sm text-slate-300 whitespace-pre">
                        {renderCode()}
                    </pre>
                    <button 
                        onClick={runSimulation}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-emerald-900/50 transition-transform active:scale-95"
                    >
                        <Play size={18} /> Run
                    </button>
                </div>

                {/* Visual Stack */}
                <div className="flex flex-col-reverse items-center gap-1 opacity-80">
                    <div className="bg-slate-800 text-slate-300 px-6 py-2 rounded border border-slate-600 text-xs font-mono w-48 text-center">
                        def process_data()
                    </div>
                    {useLogger && (
                        <div className="bg-blue-900/40 text-blue-300 px-6 py-1 rounded border border-blue-500/30 text-xs font-mono w-52 text-center animate-in slide-in-from-bottom-2">
                            @log_execution wrapper
                        </div>
                    )}
                    {useTimer && (
                        <div className="bg-yellow-900/40 text-yellow-300 px-6 py-1 rounded border border-yellow-500/30 text-xs font-mono w-56 text-center animate-in slide-in-from-bottom-2">
                            @measure_time wrapper
                        </div>
                    )}
                    {useAuth && (
                        <div className="bg-red-900/40 text-red-300 px-6 py-1 rounded border border-red-500/30 text-xs font-mono w-60 text-center animate-in slide-in-from-bottom-2">
                            @require_auth wrapper
                        </div>
                    )}
                </div>

            </div>
        </DemoContainer>
    );
};