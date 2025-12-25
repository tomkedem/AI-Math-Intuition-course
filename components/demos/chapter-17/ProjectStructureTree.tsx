"use client";

import React, { useState } from 'react';
import { Folder, FileCode, FileJson, ShieldCheck, Terminal, Info } from 'lucide-react';

const files = [
    { name: 'config.json', icon: <FileJson size={16} className="text-yellow-400" />, desc: 'הגדרות המערכת: נתיבים, שפה ופרמטרים.' },
    { name: 'src/text_utils.py', icon: <FileCode size={16} className="text-blue-400" />, desc: 'פונקציות עזר (Normalize, Tokenize) - פרקים 2-5.' },
    { name: 'src/pipeline.py', icon: <FileCode size={16} className="text-indigo-400" />, desc: 'ליבת המערכת (OOP): מחלקת TextPipeline המאחדת הכל.' },
    { name: 'tests/test_pipeline.py', icon: <ShieldCheck size={16} className="text-emerald-400" />, desc: 'בדיקות אוטומטיות עם Pytest - פרק 12.' },
    { name: 'mintx.py', icon: <Terminal size={16} className="text-slate-300" />, desc: 'ממשק שורת הפקודה (CLI) עם Typer - פרקים 15-16.' },
];

export const ProjectStructureTree = () => {
    const [selected, setSelected] = useState(files[0]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">מבנה הפרויקט</h4>
                <div className="font-mono text-sm space-y-1">
                    <div className="flex items-center gap-2 text-slate-300"><Folder size={16} /> mini_text_analyzer/</div>
                    {files.map((file) => (
                        <div 
                            key={file.name}
                            onClick={() => setSelected(file)}
                            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${selected.name === file.name ? 'bg-indigo-500/20 text-white border-r-2 border-indigo-500' : 'text-slate-500 hover:bg-slate-800'}`}
                        >
                            <span className="ml-4 opacity-50">└──</span>
                            {file.icon}
                            {file.name}
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-indigo-400 mb-2">
                    <Info size={18} />
                    <span className="font-bold">מה זה עושה?</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                    {selected.desc}
                </p>
            </div>
        </div>
    );
};