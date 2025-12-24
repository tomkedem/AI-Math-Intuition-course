"use client";

import React, { useState } from 'react';
import { DemoContainer, CodeInput } from '@/components/demos/ui/DemoShell';

export const SlicingDemo = () => {
    const [text, setText] = useState("PythonEngineering");
    const [start, setStart] = useState<number | string>(0);
    const [end, setEnd] = useState<number | string>(6);

    // לוגיקה: המרת הקלט למספרים, או שימוש בברירת מחדל אם הקלט ריק
    const sIdx = start === '' ? 0 : Number(start);
    const eIdx = end === '' ? text.length : Number(end);
    
    const result = text.slice(sIdx, eIdx);

    return (
        <DemoContainer 
            title="slicing_lab.py" 
            output={`'${result}'`}
        >
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className="text-blue-400">text</span>
                    <span className="text-slate-400">=</span>
                    <div className="flex items-center w-full">
                        <span className="text-green-400">&quot;</span>
                        <CodeInput 
                            value={text} 
                            onChange={(e) => setText(e.target.value)} 
                            className="text-green-400 w-full max-w-62.5 text-left"
                        />
                        <span className="text-green-400">&quot;</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-1">
                    <span className="text-yellow-400">print</span>
                    <span className="text-purple-400">(</span>
                    <span className="text-blue-400">text</span>
                    <span className="text-white">[</span>
                    <CodeInput 
                        value={start} 
                        placeholder="0"
                        onChange={(e) => setStart(e.target.value)} 
                        className="text-orange-400 w-10"
                    />
                    <span className="text-white">:</span>
                    <CodeInput 
                        value={end} 
                        placeholder="end"
                        onChange={(e) => setEnd(e.target.value)} 
                        className="text-orange-400 w-10"
                    />
                    <span className="text-white">]</span>
                    <span className="text-purple-400">)</span>
                </div>
                
                <div className="text-slate-500 text-[10px] mt-2">
                    * נסה לשנות את המספרים (למשל 0 ו-6) או את הטקסט למעלה.
                </div>
            </div>
        </DemoContainer>
    );
};