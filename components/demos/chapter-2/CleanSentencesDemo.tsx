"use client";

import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { DemoContainer } from '@/components/demos/ui/DemoShell';

export const CleanSentencesDemo = () => {
    const [sentences, setSentences] = useState([
        "  שלום עולם!  ",
        "",
        "   זה מבחן קטן  ",
        "   ",
        "AI משנה הכול"
    ]);

    const handleEdit = (index: number, val: string) => {
        const newSentences = [...sentences];
        newSentences[index] = val;
        setSentences(newSentences);
    };

    const addSentence = () => setSentences([...sentences, " טקסט חדש "]);
    const removeSentence = (index: number) => {
        const newSentences = sentences.filter((_, i) => i !== index);
        setSentences(newSentences);
    };

    // סימולציה של הלוגיקה בפייתון
    const cleaned = sentences
        .map(s => s.trim())
        .filter(s => s.length > 0);

    const outputString = `['${cleaned.join("', '")}']`;

    return (
        <DemoContainer 
            title="clean_data_interactive.py" 
            output={outputString}
        >
            <div className="space-y-1">
                <div className="text-purple-400 italic mb-2">def clean_sentences(raw_list):</div>
                <div className="text-slate-400 ml-4 mb-4">
                    return [s.strip() for s in raw_list if s.strip()]
                </div>

                <div className="text-blue-400 mb-1">raw = [</div>
                <div className="flex flex-col gap-2 ml-4 border-l border-slate-700 pl-4 py-2">
                    {sentences.map((s, i) => (
                        <div key={i} className="flex items-center gap-2 group">
                            <span className="text-green-400 text-lg leading-none">&quot;</span>
                            <input 
                                type="text"
                                value={s}
                                onChange={(e) => handleEdit(i, e.target.value)}
                                className="bg-slate-800 border-b border-indigo-500/30 w-full text-green-300 font-sans text-right px-2 outline-none focus:bg-slate-700 focus:border-indigo-400 rounded-sm"
                                dir="auto"
                            />
                            <span className="text-green-400 text-lg leading-none">&quot;,</span>
                            
                            <button 
                                onClick={() => removeSentence(i)} 
                                className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-opacity"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                    <button 
                        onClick={addSentence}
                        className="flex items-center gap-2 text-xs text-slate-500 hover:text-indigo-400 mt-2 transition-colors w-fit"
                    >
                        <Plus size={14} /> הוסף משפט לרשימה
                    </button>
                </div>
                <div className="text-blue-400">]</div>

                <div className="mt-4 text-yellow-400">
                    print<span className="text-purple-400">(</span>clean_sentences(raw)<span className="text-purple-400">)</span>
                </div>
            </div>
        </DemoContainer>
    );
};