"use client";

import React, { useState } from 'react';
import { Database, FileText, Grid } from 'lucide-react';
import { DemoContainer } from '@/components/demos/ui/DemoShell';

export const DataFrameVis = () => {
    const [mode, setMode] = useState<'list' | 'numpy' | 'pandas'>('pandas');

    return (
        <DemoContainer title="data_structure_comparison.py" output="" dir="ltr">
            <div className="flex flex-col gap-6">
                
                {/* Mode Selector */}
                <div className="flex justify-center gap-4">
                    <button 
                        onClick={() => setMode('list')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${mode === 'list' ? 'bg-orange-500/20 border-orange-500 text-orange-300' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                    >
                        <FileText size={16} /> Python List
                    </button>
                    <button 
                        onClick={() => setMode('numpy')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${mode === 'numpy' ? 'bg-blue-500/20 border-blue-500 text-blue-300' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                    >
                        <Grid size={16} /> NumPy
                    </button>
                    <button 
                        onClick={() => setMode('pandas')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${mode === 'pandas' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                    >
                        <Database size={16} /> Pandas DF
                    </button>
                </div>

                {/* Visualization */}
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 font-mono text-sm min-h-50 flex items-center justify-center">
                    
                    {mode === 'list' && (
                        <div className="text-orange-200">
                            [<br/>
                            &nbsp;&nbsp;{`{"name": "Dana", "age": 29, ...},`}<br/>
                            &nbsp;&nbsp;{`{"name": "Roi", "age": 34, ...},`}<br/>
                            &nbsp;&nbsp;{`{"name": "Noa", "age": None, ...}`}<br/>
                            ]
                            <div className="mt-4 text-xs text-slate-500 text-center">
                                * רשימה של מילונים. גמיש אבל איטי. אין וקטוריזציה.
                            </div>
                        </div>
                    )}

                    {mode === 'numpy' && (
                        <div className="text-blue-200 text-center">
                            array([<br/>
                            &nbsp;&nbsp;[&apos;Dana&apos;, &apos;29&apos;, &apos;Tel Aviv&apos;],<br/>
                            &nbsp;&nbsp;[&apos;Roi&apos;, &apos;34&apos;, &apos;Haifa&apos;],<br/>
                            &nbsp;&nbsp;[&apos;Noa&apos;, &apos;nan&apos;, &apos;Jerusalem&apos;]<br/>
                            ], dtype=&apos;<span className="text-red-400">object</span>&apos;)
                            <div className="mt-4 text-xs text-slate-500 text-center max-w-xs mx-auto">
                                * המרה ל-object כי יש סוגים מעורבים (מספר ומחרוזת). מאבד את יתרון המהירות.
                            </div>
                        </div>
                    )}

                    {mode === 'pandas' && (
                        <div className="w-full">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-emerald-400 border-b border-slate-700">
                                        <th className="p-2">index</th>
                                        <th className="p-2">name (obj)</th>
                                        <th className="p-2">age (float)</th>
                                        <th className="p-2">city (obj)</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-300">
                                    <tr className="border-b border-slate-800">
                                        <td className="p-2 text-slate-500">0</td>
                                        <td className="p-2">Dana</td>
                                        <td className="p-2">29.0</td>
                                        <td className="p-2">Tel Aviv</td>
                                    </tr>
                                    <tr className="border-b border-slate-800">
                                        <td className="p-2 text-slate-500">1</td>
                                        <td className="p-2">Roi</td>
                                        <td className="p-2">34.0</td>
                                        <td className="p-2">Haifa</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 text-slate-500">2</td>
                                        <td className="p-2">Noa</td>
                                        <td className="p-2 text-slate-500 italic">NaN</td>
                                        <td className="p-2">Jerusalem</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="mt-4 text-xs text-slate-500 text-center">
                                * טבלה חכמה עם אינדקס וטיפוסים לכל עמודה. שילוב של נוחות וביצועים.
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </DemoContainer>
    );
};