"use client";

import React, { useState } from 'react';
import { FileText, FileJson, Check, X } from 'lucide-react';
import { DemoContainer } from '@/components/demos/ui/DemoShell';

export const ConfigComparator = () => {
    const [mode, setMode] = useState<'txt' | 'toml'>('toml');

    const reqTxtContent = `fastapi==0.115.0
numpy==2.1.1
uvicorn==0.23.2
pydantic==2.4.2
idna==3.4
typing-extensions==4.8.0
# ... עוד 20 שורות של תלויות משנה ...`;

    const tomlContent = `[tool.poetry]
name = "mini_text_analyzer"
version = "0.1.0"
description = "כלי לניתוח טקסט"

[tool.poetry.dependencies]
python = "^3.12"
fastapi = "^0.115"
numpy = "^2.1"

[tool.poetry.group.dev.dependencies]
pytest = "^8.3"
black = "^24.8"`;

    return (
        <DemoContainer title="Dependency Management Style" output="" dir="ltr">
            <div className="flex flex-col h-full">
                <div className="flex border-b border-slate-700 mb-4">
                    <button 
                        onClick={() => setMode('txt')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-mono border-b-2 transition-colors ${mode === 'txt' ? 'border-orange-500 text-orange-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                    >
                        <FileText size={14} /> requirements.txt
                    </button>
                    <button 
                        onClick={() => setMode('toml')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-mono border-b-2 transition-colors ${mode === 'toml' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                    >
                        <FileJson size={14} /> pyproject.toml (Modern)
                    </button>
                </div>

                <div className="relative">
                    <pre className="bg-[#0F172A] p-4 rounded-lg font-mono text-sm leading-relaxed text-slate-300 h-64 overflow-auto border border-slate-800">
                        {mode === 'txt' ? reqTxtContent : tomlContent}
                    </pre>

                    {/* Annotations Overlay */}
                    <div className="absolute top-4 right-4 space-y-2">
                        {mode === 'txt' ? (
                            <>
                                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-1.5 rounded flex items-center gap-2">
                                    <X size={12} /> רשימה שטוחה ועיוורת
                                </div>
                                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-1.5 rounded flex items-center gap-2">
                                    <X size={12} /> מערבב הכל (Pro & Dev)
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-3 py-1.5 rounded flex items-center gap-2">
                                    <Check size={12} /> מטא-דאטה של הפרויקט
                                </div>
                                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-3 py-1.5 rounded flex items-center gap-2">
                                    <Check size={12} /> הפרדת קבוצות (Dev)
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </DemoContainer>
    );
};