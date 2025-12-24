"use client";

import React, { useState } from 'react';
import { Folder, FileCode, Monitor, Server, ArrowRight } from 'lucide-react';
import { DemoContainer } from '@/components/demos/ui/DemoShell';

export const PathNavigator = () => {
    const [osType, setOsType] = useState<'win' | 'unix'>('unix');
    const [folder, setFolder] = useState("data");
    const [filename, setFilename] = useState("dataset.csv");

    // סימולציה של איך פייתון רואה את הנתיב
    const root = osType === 'win' ? "C:\\Projects\\AI" : "/home/user/ai";
    const separator = osType === 'win' ? "\\" : "/";
    
    // בניית הנתיב המלא
    const fullPath = `${root}${separator}${folder}${separator}${filename}`;

    return (
        <DemoContainer title="pathlib_explorer.py" output={`PosixPath('${fullPath}')`} dir="ltr">
            <div className="space-y-6">
                
                {/* OS Toggle */}
                <div className="flex justify-center gap-4">
                    <button 
                        onClick={() => setOsType('win')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${osType === 'win' ? 'bg-blue-500/20 border-blue-500 text-blue-300' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                    >
                        <Monitor size={16} /> Windows
                    </button>
                    <button 
                        onClick={() => setOsType('unix')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${osType === 'unix' ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                    >
                        <Server size={16} /> Linux / Mac
                    </button>
                </div>

                {/* Path Construction */}
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 font-mono text-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-slate-800 px-2 py-1 text-[10px] text-slate-400 rounded-bl">Python Code</div>
                    
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-purple-400">from</span> 
                            <span className="text-white">pathlib</span> 
                            <span className="text-purple-400">import</span> 
                            <span className="text-yellow-300">Path</span>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-blue-400">base_dir</span>
                            <span className="text-slate-400">=</span>
                            <span className="text-yellow-300">Path</span>
                            <span className="text-white">(</span>
                            <span className="text-green-300">&quot;{root}&quot;</span>
                            <span className="text-white">)</span>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap group">
                            <span className="text-blue-400">full_path</span>
                            <span className="text-slate-400">=</span>
                            <span className="text-blue-400">base_dir</span>
                            
                            {/* Folder Part */}
                            <span className="text-slate-400">/</span>
                            <div className="relative">
                                <input 
                                    value={folder}
                                    onChange={(e) => setFolder(e.target.value)}
                                    className="bg-slate-800 text-green-300 border-b border-slate-600 focus:border-green-500 outline-none w-20 text-center px-1"
                                />
                                <Folder size={12} className="absolute -top-4 left-1/2 -translate-x-1/2 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* File Part */}
                            <span className="text-slate-400">/</span>
                            <div className="relative">
                                <input 
                                    value={filename}
                                    onChange={(e) => setFilename(e.target.value)}
                                    className="bg-slate-800 text-orange-300 border-b border-slate-600 focus:border-orange-500 outline-none w-28 text-center px-1"
                                />
                                <FileCode size={12} className="absolute -top-4 left-1/2 -translate-x-1/2 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-yellow-300">print</span>
                            <span className="text-white">(</span>
                            <span className="text-blue-400">full_path</span>
                            <span className="text-white">)</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400 bg-slate-800/50 p-3 rounded border border-slate-700">
                    <ArrowRight size={14} className="text-emerald-400" />
                    <p>שים לב: הקוד משתמש ב-<code>/</code> לחיבור, אך פייתון מתרגם זאת אוטומטית ל-<code>{separator}</code> בהתאם למערכת ההפעלה.</p>
                </div>
            </div>
        </DemoContainer>
    );
};