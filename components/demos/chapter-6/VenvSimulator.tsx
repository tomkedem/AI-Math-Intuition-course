"use client";

import React, { useState } from 'react';
import { Terminal, Package, Box, ShieldCheck, Play } from 'lucide-react';
import { DemoContainer } from '@/components/demos/ui/DemoShell';

export const VenvSimulator = () => {
    const [isVenvCreated, setIsVenvCreated] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [globalPackages, setGlobalPackages] = useState<string[]>(['pip', 'setuptools']);
    const [venvPackages, setVenvPackages] = useState<string[]>(['pip', 'setuptools']);
    const [logs, setLogs] = useState<string[]>(['Welcome to the terminal. Ready to start.']);

    const addLog = (msg: string) => setLogs(prev => [...prev.slice(-4), msg]);

    const handleCreate = () => {
        setIsVenvCreated(true);
        addLog('$ python -m venv .venv');
        addLog('> Created .venv directory');
    };

    const handleActivate = () => {
        if (!isVenvCreated) return;
        setIsActive(!isActive);
        if (!isActive) {
            addLog('$ source .venv/bin/activate');
            addLog('> (.venv) Activated!');
        } else {
            addLog('$ deactivate');
            addLog('> Deactivated.');
        }
    };

    const handleInstall = (pkg: string) => {
        addLog(`$ pip install ${pkg}`);
        if (isActive) {
            if (!venvPackages.includes(pkg)) {
                setVenvPackages([...venvPackages, pkg]);
                addLog(`> Installing ${pkg} in .venv... Done.`);
            } else {
                addLog(`> ${pkg} already satisfied in .venv`);
            }
        } else {
            if (!globalPackages.includes(pkg)) {
                setGlobalPackages([...globalPackages, pkg]);
                addLog(`> Installing ${pkg} Globally... Done.`);
            } else {
                addLog(`> ${pkg} already satisfied Globally`);
            }
        }
    };

    return (
        <DemoContainer title="virtual_env_simulation" output={logs.join('\n')} dir="ltr">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                
                {/* Visual Representation */}
                <div className="space-y-4">
                    {/* Global System */}
                    <div className={`border p-4 rounded-xl transition-all ${isActive ? 'border-slate-700 opacity-50' : 'border-red-500/50 bg-red-500/5'}`}>
                        <div className="flex items-center gap-2 mb-2 text-slate-400">
                            <Box size={16} />
                            <span className="text-sm font-bold">Global System (Computer)</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {globalPackages.map(p => (
                                <span key={p} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 border border-slate-700">{p}</span>
                            ))}
                        </div>
                    </div>

                    {/* Venv */}
                    {isVenvCreated && (
                        <div className={`border p-4 rounded-xl transition-all ${isActive ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10' : 'border-slate-700 opacity-60'}`}>
                            <div className="flex items-center gap-2 mb-2 text-emerald-400">
                                <ShieldCheck size={16} />
                                <span className="text-sm font-bold">.venv (Isolated Project)</span>
                                {isActive && <span className="text-[10px] bg-emerald-500/20 px-2 rounded-full animate-pulse">Active</span>}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {venvPackages.map(p => (
                                    <span key={p} className="px-2 py-1 bg-slate-900 rounded text-xs text-emerald-300 border border-emerald-500/30">{p}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Controls */}
                <div className="space-y-3 flex flex-col justify-center">
                    {!isVenvCreated ? (
                        <button 
                            onClick={handleCreate}
                            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 transition-all"
                        >
                            <Play size={16} className="text-yellow-400"/> Create Environment
                        </button>
                    ) : (
                        <button 
                            onClick={handleActivate}
                            className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${isActive ? 'bg-slate-800 border-slate-600 text-slate-400' : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400'}`}
                        >
                            <Terminal size={16} /> {isActive ? 'Deactivate' : 'Activate Environment'}
                        </button>
                    )}

                    <div className="h-px bg-slate-700 my-2"></div>

                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => handleInstall('numpy')} className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 px-3 py-2 rounded text-sm flex items-center gap-2 justify-center">
                            <Package size={14}/> Install NumPy
                        </button>
                        <button onClick={() => handleInstall('fastapi')} className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 px-3 py-2 rounded text-sm flex items-center gap-2 justify-center">
                            <Package size={14}/> Install FastAPI
                        </button>
                    </div>
                    
                    <p className="text-[10px] text-slate-500 text-center mt-2">
                        {isActive ? "עכשיו חבילות יותקנו בבידוד (.venv)" : "זהירות: חבילות מותקנות גלובלית!"}
                    </p>
                </div>
            </div>
        </DemoContainer>
    );
};