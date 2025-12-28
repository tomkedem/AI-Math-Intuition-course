"use client";

import React, { useState } from 'react';
import { Terminal, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
    title: string;
    code: string;
    output: string;
    explanation: string;
}

export const CodeConsole = ({ title, code, output, explanation }: Props) => {
    const [isRun, setIsRun] = useState(false);

    return (
        <div className="w-full my-12 rounded-[2rem] border border-slate-800 bg-[#0d1117] overflow-hidden shadow-2xl" dir="rtl">
            <div className="flex items-center justify-between px-8 py-4 bg-[#161b22] border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <Terminal size={18} className="text-slate-500" />
                    <span className="text-xs font-mono font-bold text-slate-400 tracking-tight">{title}.py</span>
                </div>
                <Button 
                    onClick={() => setIsRun(true)} 
                    className="bg-emerald-600 hover:bg-emerald-500 text-white h-9 px-6 rounded-full font-bold text-xs gap-2 cursor-pointer"
                >
                    <Play size={14} fill="currentColor" /> הרץ סימולציה
                </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-10 font-mono text-base leading-relaxed text-blue-300/90 text-left" dir="ltr">
                    <pre>{code}</pre>
                </div>
                <div className="bg-black/40 p-10 border-t lg:border-t-0 lg:border-r border-slate-800 flex flex-col justify-center min-h-50">
                    <AnimatePresence>
                        {isRun ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-emerald-400 text-left" dir="ltr">
                                <span className="text-slate-600">$ python3 execution...</span><br/>
                                <span className="block mt-4">{output}</span>
                            </motion.div>
                        ) : (
                            <div className="text-slate-600 italic text-sm text-center">ממתין להרצה...</div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            {isRun && (
                <div className="p-6 bg-blue-500/5 border-t border-slate-800 text-right">
                    <p className="text-sm text-slate-400 leading-relaxed"><span className="text-blue-400 font-bold ml-2">הסבר הנדסי:</span> {explanation}</p>
                </div>
            )}
        </div>
    );
};