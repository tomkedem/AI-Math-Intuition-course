"use client";

import React, { useState } from 'react';
import { Filter, AlertCircle, Info, Bug, XCircle } from 'lucide-react';
import { DemoContainer } from '@/components/demos/ui/DemoShell';

type LogLevel = 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR';

const logMessages = [
    { level: 'DEBUG', msg: "Connecting to DB at 127.0.0.1:5432...", icon: Bug, color: "text-slate-400" },
    { level: 'DEBUG', msg: "Payload size: 24kb", icon: Bug, color: "text-slate-400" },
    { level: 'INFO', msg: "System initialized successfully.", icon: Info, color: "text-blue-400" },
    { level: 'INFO', msg: "User 'tomer' logged in.", icon: Info, color: "text-blue-400" },
    { level: 'WARNING', msg: "Response time > 500ms (High Latency)", icon: AlertCircle, color: "text-yellow-400" },
    { level: 'ERROR', msg: "Failed to save file: Permission Denied", icon: XCircle, color: "text-red-400" },
    { level: 'CRITICAL', msg: "System Out of Memory! Shutting down.", icon: XCircle, color: "text-red-600 font-bold" },
];

const levels: LogLevel[] = ['DEBUG', 'INFO', 'WARNING', 'ERROR'];

export const LoggerLab = () => {
    const [minLevel, setMinLevel] = useState<LogLevel>('INFO');

    const filterLogs = (lvl: string) => {
        const priority = ['DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL'];
        return priority.indexOf(lvl) >= priority.indexOf(minLevel);
    };

    return (
        <DemoContainer title="logging_levels.py" output="" dir="ltr">
            <div className="flex flex-col gap-4">
                
                {/* Level Selector */}
                <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-lg border border-slate-700">
                    <Filter size={16} className="text-slate-400 ml-2" />
                    <span className="text-xs text-slate-400 mr-2">Set Log Level:</span>
                    <div className="flex gap-1">
                        {levels.map(lvl => (
                            <button
                                key={lvl}
                                onClick={() => setMinLevel(lvl)}
                                className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                                    minLevel === lvl 
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                                    : 'bg-slate-800 text-slate-500 hover:bg-slate-700'
                                }`}
                            >
                                {lvl}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Log Console */}
                <div className="bg-[#0c0c0c] p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto border border-slate-800 shadow-inner">
                    {logMessages.filter(l => filterLogs(l.level)).map((log, idx) => (
                        <div key={idx} className="flex items-start gap-3 mb-2 animate-in slide-in-from-left-2 duration-300">
                            <span className="text-slate-600 text-xs mt-0.5 w-12 shrink-0">10:45:{12 + idx}</span>
                            <span className={`text-xs font-bold w-16 shrink-0 ${log.color}`}>{log.level}</span>
                            <span className="text-slate-300 flex-1">{log.msg}</span>
                        </div>
                    ))}
                    {logMessages.filter(l => filterLogs(l.level)).length === 0 && (
                        <div className="text-slate-600 italic text-center mt-10">No logs visible at this level.</div>
                    )}
                </div>
                
                <p className="text-[10px] text-slate-500 text-center">
                    * שים לב: כשאתה בוחר רמה (למשל WARNING), כל ההודעות שמתחתיה (DEBUG, INFO) מסוננות.
                </p>
            </div>
        </DemoContainer>
    );
};