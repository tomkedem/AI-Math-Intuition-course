"use client";

import React, { useState } from 'react';
import { DemoContainer, CodeInput } from '@/components/demos/ui/DemoShell';

export const AgeDemo = () => {
    const [name, setName] = useState("Tomer");
    const [age, setAge] = useState(32);

    return (
        <DemoContainer 
            title="interactive_f_string.py" 
            output={`Hello ${name}, next year you will be ${age + 1}.`}
        >
            <div className="space-y-2">
                {/* שורה 1: הגדרת שם */}
                <div className="flex items-center gap-2">
                    <span className="text-blue-400">name</span>
                    <span className="text-slate-400">=</span>
                    <div className="flex items-center">
                        <span className="text-green-400">&quot;</span>
                        <CodeInput 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="text-green-400 w-24"
                        />
                        <span className="text-green-400">&quot;</span>
                    </div>
                </div>

                {/* שורה 2: הגדרת גיל */}
                <div className="flex items-center gap-2">
                    <span className="text-blue-400">age</span>
                    <span className="text-slate-400">=</span>
                    <CodeInput 
                        type="number" 
                        value={age} 
                        onChange={(e) => setAge(Number(e.target.value))} 
                        className="text-orange-400 w-16"
                    />
                </div>

                <div className="text-slate-500 py-2"># f-string calculation:</div>

                {/* שורה 3: הדפסה עם אינטרפולציה */}
                <div>
                    <span className="text-yellow-400">print</span>
                    <span className="text-purple-400">(</span>
                    <span className="text-green-400">
                        f&quot;Hello <span className="text-indigo-400">{`{name}`}</span>, 
                        next year you will be <span className="text-indigo-400">{`{age + 1}`}</span>.&quot;
                    </span>
                    <span className="text-purple-400">)</span>
                </div>
            </div>
        </DemoContainer>
    );
};