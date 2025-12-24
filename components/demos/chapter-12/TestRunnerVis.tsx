"use client";

import React, { useState } from 'react';
import { Play, CheckCircle, XCircle, Beaker } from 'lucide-react';
import { DemoContainer } from '@/components/demos/ui/DemoShell';

export const TestRunnerVis = () => {
    const [running, setRunning] = useState(false);
    const [results, setResults] = useState<{name: string, status: 'pending'|'pass'|'fail'}[]>([
        { name: 'test_tokenize_simple', status: 'pending' },
        { name: 'test_normalize_lowercase', status: 'pending' },
        { name: 'test_tokenize_empty', status: 'pending' },
        { name: 'test_invalid_input', status: 'pending' }
    ]);

    const runTests = async () => {
        setRunning(true);
        // Reset
        setResults(prev => prev.map(t => ({ ...t, status: 'pending' })));

        for (let i = 0; i < results.length; i++) {
            await new Promise(r => setTimeout(r, 600)); // Delay for effect
            setResults(prev => {
                const next = [...prev];
                // Simulate failure on the last one for demo
                next[i].status = i === 3 ? 'fail' : 'pass';
                return next;
            });
        }
        setRunning(false);
    };

    return (
        <DemoContainer title="pytest session" output="" dir="ltr">
            <div className="flex flex-col gap-6">
                
                {/* Header */}
                <div className="flex justify-between items-center bg-slate-800 p-3 rounded-lg border border-slate-700">
                    <div className="flex items-center gap-2 text-slate-300 font-mono text-sm">
                        <Beaker size={16} className="text-emerald-400" />
                        <span>tests/test_core.py</span>
                    </div>
                    <button 
                        onClick={runTests}
                        disabled={running}
                        className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-4 py-1.5 rounded text-xs font-bold flex items-center gap-2 transition-colors"
                    >
                        <Play size={12} /> {running ? 'Running...' : 'Run Tests'}
                    </button>
                </div>

                {/* Test List */}
                <div className="space-y-2">
                    {results.map((test, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-900 rounded border border-slate-800 font-mono text-sm">
                            <div className="flex items-center gap-3">
                                {test.status === 'pending' && <div className="w-4 h-4 rounded-full border-2 border-slate-600" />}
                                {test.status === 'pass' && <CheckCircle size={16} className="text-emerald-400 animate-in zoom-in" />}
                                {test.status === 'fail' && <XCircle size={16} className="text-red-400 animate-in zoom-in" />}
                                <span className={test.status === 'fail' ? 'text-red-300' : 'text-slate-300'}>
                                    {test.name}
                                </span>
                            </div>
                            <span className="text-xs text-slate-500">
                                {test.status === 'pass' ? '0.02s' : test.status === 'fail' ? 'FAILED' : '...'}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                {!running && results.some(r => r.status !== 'pending') && (
                    <div className="bg-red-900/20 border border-red-500/30 p-3 rounded text-xs font-mono text-red-300">
                        === 1 failed, 3 passed in 2.45s ===
                    </div>
                )}

            </div>
        </DemoContainer>
    );
};