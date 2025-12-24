"use client";

import React, { useState } from 'react';
import { Play, ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';
import { DemoContainer } from '@/components/demos/ui/DemoShell';

export const TypeSafetyLab = () => {
    const [mode, setMode] = useState<'dynamic' | 'static'>('dynamic');
    const [output, setOutput] = useState("");
    const [status, setStatus] = useState<'idle' | 'running' | 'error' | 'checked'>('idle');

    const runCheck = () => {
        setStatus('running');
        setTimeout(() => {
            if (mode === 'dynamic') {
                setStatus('error');
                setOutput(`Traceback (most recent call last):
  File "main.py", line 4, in <module>
    print(add(10, "5"))
  File "main.py", line 2, in add
    return a + b
TypeError: unsupported operand type(s) for +: 'int' and 'str'`);
            } else {
                setStatus('checked');
                setOutput(`Found 1 error in 1 file (checked 1 source file):
main.py:4: error: Argument 2 to "add" has incompatible type "str"; expected "int"`);
            }
        }, 800);
    };

    return (
        <DemoContainer title={mode === 'dynamic' ? "unsafe_code.py" : "safe_code.py"} output={output} dir="ltr">
            <div className="flex flex-col gap-6">
                
                {/* Mode Toggles */}
                <div className="flex justify-center gap-4">
                    <button 
                        onClick={() => { setMode('dynamic'); setOutput(""); setStatus('idle'); }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${mode === 'dynamic' ? 'bg-orange-500/20 border-orange-500 text-orange-300' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                    >
                        <AlertTriangle size={16} /> Dynamic Python
                    </button>
                    <button 
                        onClick={() => { setMode('static'); setOutput(""); setStatus('idle'); }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${mode === 'static' ? 'bg-blue-500/20 border-blue-500 text-blue-300' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                    >
                        <ShieldCheck size={16} /> Static Typing
                    </button>
                </div>

                {/* Code Preview */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 relative font-mono text-sm">
                    {mode === 'dynamic' ? (
                        <pre className="text-slate-300">
<span className="text-purple-400">def</span> <span className="text-yellow-300">add</span>(a, b):
    <span className="text-purple-400">return</span> a + b

<span className="text-slate-500"># הכל נראה בסדר, אבל...</span>
<span className="text-yellow-300">print</span>(add(<span className="text-orange-400">10</span>, <span className="text-green-300">&quot;5&quot;</span>))
                        </pre>
                    ) : (
                        <pre className="text-slate-300">
<span className="text-purple-400">def</span> <span className="text-yellow-300">add</span>(a: <span className="text-blue-400">int</span>, b: <span className="text-blue-400">int</span>) -&gt; <span className="text-blue-400">int</span>:
    <span className="text-purple-400">return</span> a + b

<span className="text-slate-500"># העורך מזהה את הבעיה מיד!</span>
<span className="text-yellow-300">print</span>(add(<span className="text-orange-400">10</span>, <span className="text-green-300 underline decoration-wavy decoration-red-500 decoration-2">&quot;5&quot;</span>))
                        </pre>
                    )}
                </div>

                {/* Action Button */}
                <div className="flex justify-center">
                    {mode === 'dynamic' ? (
                        <button 
                            onClick={runCheck}
                            className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-red-900/50"
                        >
                            <Play size={18} /> Run Code (Runtime)
                        </button>
                    ) : (
                        <button 
                            onClick={runCheck}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-blue-900/50"
                        >
                            <ShieldAlert size={18} /> Run Mypy (Static Check)
                        </button>
                    )}
                </div>

                {/* Feedback */}
                {status === 'error' && (
                    <div className="text-center text-xs text-red-400 animate-pulse">
                        הקוד קרס בזמן ריצה! המשתמש כבר קיבל שגיאה.
                    </div>
                )}
                {status === 'checked' && (
                    <div className="text-center text-xs text-blue-400">
                        השגיאה זוהתה בזמן הפיתוח. שום דבר לא נשבר ב-Production.
                    </div>
                )}

            </div>
        </DemoContainer>
    );
};