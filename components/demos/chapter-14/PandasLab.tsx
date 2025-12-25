"use client";

import React, { useState } from 'react';
import { Filter, Brush, Trash2 } from 'lucide-react';
import { DemoContainer } from '@/components/demos/ui/DemoShell';

// סוגי הנתונים לדוגמה
type Row = { id: number, name: string, age: number | null, city: string };

const initialData: Row[] = [
    { id: 1, name: "Dana", age: 29, city: "Tel Aviv" },
    { id: 2, name: "Roi", age: 34, city: "Haifa" },
    { id: 3, name: "Noa", age: null, city: "Jerusalem" },
    { id: 4, name: "Gal", age: 22, city: "Tel Aviv" },
    { id: 5, name: "Yoni", age: null, city: "Haifa" },
];

export const PandasLab = () => {
    const [data, setData] = useState<Row[]>(initialData);
    const [history, setHistory] = useState<string[]>([]);

    const addLog = (cmd: string) => setHistory(prev => [...prev, cmd]);

    const handleFilter = () => {
        setData(prev => prev.filter(r => (r.age || 0) > 25));
        addLog('df[df["age"] > 25]');
    };

    const handleFillNa = () => {
        setData(prev => prev.map(r => ({ ...r, age: r.age ?? 30 })));
        addLog('df["age"].fillna(30)');
    };

    const handleDropNa = () => {
        setData(prev => prev.filter(r => r.age !== null));
        addLog('df.dropna()');
    };

    const handleReset = () => {
        setData(initialData);
        setHistory([]);
        addLog('df = pd.read_csv("data.csv")');
    };

    return (
        <DemoContainer title="pandas_playground.py" output={history.map(l => `>>> ${l}`).join('\n')} dir="ltr">
            <div className="flex flex-col gap-6">
                
                {/* Toolbar */}
                <div className="flex flex-wrap justify-center gap-2">
                    <button onClick={handleFilter} className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 border border-slate-600 px-3 py-1.5 rounded text-xs text-blue-300 transition-colors">
                        <Filter size={14} /> Filter Age {'>'} 25
                    </button>
                    <button onClick={handleFillNa} className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 border border-slate-600 px-3 py-1.5 rounded text-xs text-emerald-300 transition-colors">
                        <Brush size={14} /> fillna(30)
                    </button>
                    <button onClick={handleDropNa} className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 border border-slate-600 px-3 py-1.5 rounded text-xs text-red-300 transition-colors">
                        <Trash2 size={14} /> dropna()
                    </button>
                    <button onClick={handleReset} className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded text-xs font-bold transition-colors ml-auto">
                        Reset
                    </button>
                </div>

                {/* Table View */}
                <div className="border border-slate-700 rounded-lg overflow-hidden">
                    <table className="w-full text-left text-sm font-mono">
                        <thead className="bg-slate-800 text-slate-400">
                            <tr>
                                <th className="p-3 border-b border-slate-700"></th>
                                <th className="p-3 border-b border-slate-700">id</th>
                                <th className="p-3 border-b border-slate-700">name</th>
                                <th className="p-3 border-b border-slate-700">age</th>
                                <th className="p-3 border-b border-slate-700">city</th>
                            </tr>
                        </thead>
                        <tbody className="bg-slate-900 text-slate-300">
                            {data.map((row, idx) => (
                                <tr key={row.id} className="border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors">
                                    <td className="p-3 text-slate-600 text-xs">{idx}</td>
                                    <td className="p-3">{row.id}</td>
                                    <td className="p-3">{row.name}</td>
                                    <td className={`p-3 ${row.age === null ? 'text-slate-500 italic' : ''}`}>
                                        {row.age === null ? 'NaN' : row.age}
                                    </td>
                                    <td className="p-3">{row.city}</td>
                                </tr>
                            ))}
                            {data.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-500 italic">
                                        DataFrame is empty
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Shape Info */}
                <div className="flex justify-between text-xs text-slate-500 font-mono px-1">
                    <span>{data.length} rows × 4 columns</span>
                    <span>dtypes: int64, object, float64, object</span>
                </div>

            </div>
        </DemoContainer>
    );
};