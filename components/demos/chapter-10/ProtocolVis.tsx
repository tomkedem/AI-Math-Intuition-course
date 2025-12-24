"use client";

import { Check, X, Box, FileText, Settings } from 'lucide-react';

export const ProtocolVis = () => {
    // הגדרת הפרוטוקול
    const protocolCode = `class Cleaner(Protocol):
    def clean(self, text: str) -> str:
        ...`;

    // המועמדים
    const candidates = [
        {
            name: "TextCleaner",
            icon: FileText,
            methods: ["clean(text: str) -> str"],
            fits: true
        },
        {
            name: "HtmlStripper",
            icon: Box,
            methods: ["clean(text: str) -> str", "remove_tags()"],
            fits: true // מתאים כי יש לו את clean, לא משנה שיש עוד
        },
        {
            name: "VacuumCleaner",
            icon: Settings,
            methods: ["suck_dust()", "power_on()"],
            fits: false
        }
    ];

    return (
        <div className="my-8 bg-slate-900/50 border border-slate-700 rounded-xl p-6" dir="ltr">
            <h4 className="text-slate-300 font-bold mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                <Box className="text-purple-400" size={18}/> Duck Typing Visualizer
            </h4>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                
                {/* The Shape (Protocol) */}
                <div className="bg-slate-800 p-4 rounded-lg border-2 border-dashed border-purple-500/50 flex flex-col items-center text-center relative">
                    <div className="absolute -top-3 bg-purple-600 text-white text-[10px] px-2 py-0.5 rounded font-bold">
                        PROTOCOL DEFINITION
                    </div>
                    <pre className="text-xs font-mono text-purple-200 mt-2 whitespace-pre-wrap">
                        {protocolCode}
                    </pre>
                    <div className="mt-4 text-xs text-slate-400">
                        &quot;I accept anything that has a <span className="text-yellow-400 font-mono">clean</span> method.&quot;
                    </div>
                </div>

                {/* The Candidates */}
                <div className="space-y-3">
                    {candidates.map((c, idx) => (
                        <div key={idx} className={`flex items-center justify-between p-3 rounded-lg border ${c.fits ? 'bg-emerald-900/10 border-emerald-500/30' : 'bg-red-900/10 border-red-500/30'}`}>
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${c.fits ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                                    <c.icon size={16} />
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-slate-200">{c.name}</div>
                                    <div className="text-[10px] font-mono text-slate-500">
                                        {c.methods.map(m => <div key={m}>{m}</div>)}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                {c.fits ? (
                                    <div className="flex items-center gap-1 text-xs text-emerald-400 font-bold">
                                        <Check size={14} /> Fits
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1 text-xs text-red-400 font-bold">
                                        <X size={14} /> Rejects
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};