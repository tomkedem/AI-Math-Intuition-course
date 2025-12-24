"use client";

import React, { useState } from 'react';
import { Check, Snowflake, ArrowDownUp } from 'lucide-react';
import { DemoContainer } from '@/components/demos/ui/DemoShell';

export const DataclassLab = () => {
    const [isFrozen, setIsFrozen] = useState(false);
    const [isOrdered, setIsOrdered] = useState(false);

    const codePreview = `from dataclasses import dataclass

@dataclass(${isFrozen ? 'frozen=True' : ''}${isFrozen && isOrdered ? ', ' : ''}${isOrdered ? 'order=True' : ''})
class Product:
    name: str
    price: float`;

    const methodsPreview = [
        "__init__",
        "__repr__",
        "__eq__",
        ...(isOrdered ? ["__lt__ (<)", "__gt__ (>)", "__le__", "__ge__"] : []),
        ...(isFrozen ? ["__setattr__ (Blocked 🚫)"] : [])
    ];

    return (
        <DemoContainer title="smart_data.py" output="" dir="ltr">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Controls */}
                <div className="space-y-4">
                    <div 
                        onClick={() => setIsFrozen(!isFrozen)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${isFrozen ? 'bg-blue-500/10 border-blue-500 text-blue-300' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                    >
                        <div className="flex items-center gap-2">
                            <Snowflake size={18} />
                            <span className="font-bold text-sm">frozen=True</span>
                        </div>
                        {isFrozen ? <Check size={16} /> : <div className="w-4 h-4 rounded-full border border-slate-600" />}
                    </div>
                    
                    <div 
                        onClick={() => setIsOrdered(!isOrdered)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${isOrdered ? 'bg-purple-500/10 border-purple-500 text-purple-300' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                    >
                        <div className="flex items-center gap-2">
                            <ArrowDownUp size={18} />
                            <span className="font-bold text-sm">order=True</span>
                        </div>
                        {isOrdered ? <Check size={16} /> : <div className="w-4 h-4 rounded-full border border-slate-600" />}
                    </div>

                    <div className="text-xs text-slate-500 mt-2 p-2 bg-slate-900 rounded">
                        {isFrozen ? "✅ האובייקט נעול לשינויים (Immutable)." : "✏️ ניתן לשנות שדות אחרי היצירה."}
                        <br/>
                        {isOrdered ? "✅ ניתן למיין ולהשוות (p1 > p2)." : "🚫 אין תמיכה בהשוואת גודל."}
                    </div>
                </div>

                {/* Code & Impact */}
                <div className="space-y-4">
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-green-400 whitespace-pre">
                        {codePreview}
                    </div>

                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-bold">Auto-Generated Methods</div>
                        <div className="flex flex-wrap gap-2">
                            {methodsPreview.map(m => (
                                <span key={m} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700 font-mono">
                                    {m}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DemoContainer>
    );
};