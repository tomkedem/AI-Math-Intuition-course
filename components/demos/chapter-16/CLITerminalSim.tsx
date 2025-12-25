"use client";

import React, { useState } from 'react';
import { Terminal } from 'lucide-react';

export const CLITerminalSim = () => {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<string[]>(["Welcome to mintx CLI. Type --help for options."]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim();
        let response = "";

        if (cmd === "--help" || cmd === "mintx --help") {
            response = "Commands:\n  clean [FILE]  Clean text data\n  stats [FILE]  Show file statistics\n  --help        Show this help";
        } else if (cmd.startsWith("mintx clean")) {
            response = "✨ Cleaning process started...\n✅ Data normalized successfully (Exit Code: 0)";
        } else if (cmd.startsWith("mintx stats")) {
            response = "📊 Analyzing file...\nTokens: 1,240\nAvg Length: 4.2 words\n(Exit Code: 0)";
        } else {
            response = `Error: Command '${cmd}' not recognized. (Exit Code: 1)`;
        }

        setHistory(prev => [...prev, `> ${cmd}`, response]);
        setInput("");
    };

    return (
        <div className="bg-[#020617] border border-slate-700 rounded-xl overflow-hidden shadow-2xl font-mono text-sm max-w-2xl mx-auto" dir="ltr">
            <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center gap-2">
                <Terminal size={14} className="text-emerald-400" />
                <span className="text-slate-400 text-xs italic">mintx_terminal_v1.0</span>
            </div>
            <div className="p-4 h-64 overflow-y-auto custom-scrollbar flex flex-col gap-2">
                {history.map((line, i) => (
                    <pre key={i} className={line.startsWith(">") ? "text-blue-400" : line.startsWith("Error") ? "text-red-400" : "text-slate-300"}>
                        {line}
                    </pre>
                ))}
            </div>
            <form onSubmit={handleCommand} className="p-4 bg-slate-900/50 border-t border-slate-800 flex gap-2">
                <span className="text-emerald-500">$</span>
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="bg-transparent border-none outline-none text-slate-200 flex-1"
                    placeholder="Type command..."
                    autoFocus
                />
            </form>
        </div>
    );
};