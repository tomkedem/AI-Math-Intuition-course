"use client";

import React, { useState } from 'react';
import { DemoContainer, CodeInput } from '@/components/demos/ui/DemoShell';

export const ComprehensionDemo = () => {
    const [limit, setLimit] = useState(10);
    const [divider, setDivider] = useState(2);

    const range = Array.from({ length: limit }, (_, i) => i);
    const result = range.filter(n => n % divider === 0);

    return (
        <DemoContainer 
            title="comprehension_builder.py" 
            output={`[${result.join(', ')}]`}
        >
            <div className="space-y-2">
                <div className="text-slate-500 mb-2"># Build a list of numbers divisible by {divider}:</div>
                <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-blue-400">numbers</span>
                    <span className="text-slate-400">=</span>
                    <span className="text-yellow-400">[</span>
                    <span className="text-white">n</span>
                    <span className="text-purple-400">for</span>
                    <span className="text-white">n</span>
                    <span className="text-purple-400">in</span>
                    <span className="text-yellow-400">range</span>
                    <span className="text-purple-400">(</span>
                    <CodeInput 
                        type="number" 
                        value={limit} 
                        min="1" max="50" 
                        onChange={(e) => setLimit(Number(e.target.value))} 
                        className="text-orange-400 w-12"
                    />
                    <span className="text-purple-400">)</span>
                    
                    <span className="text-purple-400">if</span>
                    <span className="text-white">n</span>
                    <span className="text-slate-400">%</span>
                    <CodeInput 
                        type="number" 
                        value={divider} 
                        min="1" 
                        onChange={(e) => setDivider(Number(e.target.value))} 
                        className="text-orange-400 w-10"
                    />
                    <span className="text-slate-400">==</span>
                    <span className="text-orange-400">0</span>
                    <span className="text-yellow-400">]</span>
                </div>
                
                <div className="mt-2">
                    <span className="text-yellow-400">print</span>
                    <span className="text-purple-400">(</span>
                    <span className="text-blue-400">numbers</span>
                    <span className="text-purple-400">)</span>
                </div>
            </div>
        </DemoContainer>
    );
};