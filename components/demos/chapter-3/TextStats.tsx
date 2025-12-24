"use client";

import React, { useState } from 'react';
import { DemoContainer } from '@/components/demos/ui/DemoShell';

export const TextStatsDemo = () => {
    const [text, setText] = useState("AI is amazing. AI changes everything!");
    
    // סימולציית לוגיקה של פייתון (Counter וניקוי טקסט)
    const cleanText = text.replace(/[^\w\s]/g, ""); // הסרת פיסוק פשוטה
    const words = cleanText.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    
    // Counter logic implementation
    const counts: Record<string, number> = {};
    words.forEach(w => counts[w] = (counts[w] || 0) + 1);
    
    // Find most common
    let mostCommonWord = "";
    let maxCount = 0;
    Object.entries(counts).forEach(([w, c]) => {
        if (c > maxCount) { maxCount = c; mostCommonWord = w; }
    });

    // הרכבת ה-Output כמחרוזת שמדמה מילון פייתון
    const output = JSON.stringify({
        "num_words": wordCount,
        "num_chars": text.length,
        "most_common": mostCommonWord || null
    }, null, 2)
    .replace(/"([^"]+)":/g, "'$1':") // שינוי מפתחות לגרש בודד
    .replace(/"/g, "'") // שינוי מחרוזות לגרש בודד
    .replace(/null/g, "None"); // שינוי null ל-None של פייתון

    return (
        <DemoContainer title="text_analyzer.py" output={output}>
            <div className="space-y-3">
                <div className="text-slate-500 text-xs"># נסה לשנות את הטקסט ולראות את הסטטיסטיקה מתעדכנת:</div>
                <div className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">text</span>
                    <span className="text-slate-400 mt-1">=</span>
                    <div className="w-full relative">
                        <span className="text-green-400 absolute top-1 left-0 text-lg">&quot;</span>
                        <textarea 
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="bg-slate-800/50 border-b border-indigo-500/30 w-full text-green-300 font-sans px-3 py-2 outline-none focus:bg-slate-800 focus:border-indigo-400 rounded resize-none h-20"
                            dir="auto"
                        />
                        <span className="text-green-400 absolute bottom-1 right-0 text-lg">&quot;</span>
                    </div>
                </div>
                <div className="text-yellow-400">
                    print<span className="text-purple-400">(</span>simple_word_stats(text)<span className="text-purple-400">)</span>
                </div>
            </div>
        </DemoContainer>
    );
};