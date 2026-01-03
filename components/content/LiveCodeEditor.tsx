"use client";

import React, { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-python';
import { motion, AnimatePresence } from "framer-motion";
import { 
    Play, RotateCcw, Terminal, Loader2, 
    CheckCircle2, AlertCircle, Code2, Sparkles 
} from 'lucide-react';

// --- 1. הגדרת טיפוסים (כדי ש-TypeScript לא יצעק) ---
interface PyodideInterface {
    loadPackage: (packages: string | string[]) => Promise<unknown>;
    runPython: (code: string) => string;
    runPythonAsync: (code: string) => Promise<unknown>;
}

// הרחבת האובייקט window כדי להכיר את הפונקציה שתגיע מה-CDN
declare global {
    interface Window {
        loadPyodide: (config: { indexURL: string }) => Promise<PyodideInterface>;
    }
}

// --- 2. לוגיקת טעינה חיצונית (עוקף את Turbopack) ---
let pyodideReadyPromise: Promise<PyodideInterface> | null = null;

// פונקציה שטוענת את הסקריפט לראש העמוד
const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });
};

const getPyodide = async (): Promise<PyodideInterface> => {
    // אם כבר התחלנו טעינה, מחזירים את ה-Promise הקיים
    if (pyodideReadyPromise) {
        return pyodideReadyPromise;
    }

    pyodideReadyPromise = (async () => {
        // שלב א: טעינת הסקריפט הראשי מ-CDN
        // אנחנו לא משתמשים ב-import רגיל כדי למנוע שגיאות Bundler
        if (!window.loadPyodide) {
            await loadScript("https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js");
        }

        // שלב ב: אתחול המנוע
        const pyodide = await window.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
        });

        // שלב ג: טעינת ספריות חובה
        await pyodide.loadPackage("numpy");
        
        return pyodide;
    })();

    return pyodideReadyPromise;
};

interface LiveCodeEditorProps {
    initialCode: string;
    onSuccess?: (output: string) => void;
}

export const LiveCodeEditor: React.FC<LiveCodeEditorProps> = ({ initialCode, onSuccess }) => {
    const [code, setCode] = useState(initialCode.trim());
    const [output, setOutput] = useState("");
    const [isPyodideLoading, setIsPyodideLoading] = useState(true);
    const [isRunning, setIsRunning] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    
    const pyodideRef = useRef<PyodideInterface | null>(null);

    // אתחול חד פעמי
    useEffect(() => {
        let mounted = true;

        const initPython = async () => {
            try {
                const pyodide = await getPyodide();
                if (mounted) {
                    pyodideRef.current = pyodide;
                    setIsPyodideLoading(false);
                }
            } catch (err) {
                console.error("Failed to load Pyodide:", err);
                if (mounted) {
                    setError("שגיאה בטעינת המנוע. בדוק חיבור לאינטרנט.");
                    setIsPyodideLoading(false);
                }
            }
        };
        initPython();

        return () => { mounted = false; };
    }, []);

    // הדגשת קוד
    useEffect(() => {
        Prism.highlightAll();
    }, [code, output, error]);

    const handleRun = async () => {
        if (!pyodideRef.current || isRunning) return;
        setIsRunning(true);
        setError(null);
        setOutput("");

        try {
            // לכידת הפלט (stdout capture)
            pyodideRef.current.runPython(`
                import sys
                import io
                sys.stdout = io.StringIO()
            `);
            
            await pyodideRef.current.runPythonAsync(code);
            const stdout = pyodideRef.current.runPython("sys.stdout.getvalue()");
            
            setOutput(stdout);
            if (onSuccess) onSuccess(stdout);

        } catch (err) {
            const errorMsg = String(err).split('PythonError:').pop() || "שגיאה לא ידועה";
            setOutput(errorMsg.trim());
            setError("Runtime Error");
        } finally {
            setIsRunning(false);
        }
    };

    const handleReset = () => {
        setCode(initialCode.trim());
        setOutput("");
        setError(null);
    };

    return (
        <div 
            className={`
                relative my-10 rounded-3xl overflow-hidden transition-all duration-500
                bg-[#0B1120] border 
                ${isFocused ? 'border-blue-500/40 shadow-[0_0_40px_-10px_rgba(59,130,246,0.2)]' : 'border-white/10 shadow-2xl'}
            `}
            dir="ltr"
        >
            {/* Background Gradient Mesh */}
            <div className="absolute top-0 right-0 w-75 h-75 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-50 h-50 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />

            {/* Loading Overlay */}
            <AnimatePresence>
                {isPyodideLoading && (
                    <motion.div 
                        initial={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-[#0B1120]/90 z-50 flex flex-col items-center justify-center backdrop-blur-md"
                    >
                        <Loader2 size={40} className="text-blue-500 animate-spin mb-4" />
                        <span className="text-sm font-mono text-blue-200/70 tracking-widest uppercase">Initializing Neural Engine...</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Futuristic Header */}
            <div className="flex items-center justify-between px-5 py-3 bg-white/5 border-b border-white/5 backdrop-blur-xl" dir="rtl">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg transition-colors ${isRunning ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
                        {isRunning ? <Sparkles size={16} className="animate-pulse" /> : <Code2 size={16} />}
                    </div>
                    <div>
                        <div className="text-xs font-bold text-white tracking-wide">Python Lab</div>
                        <div className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">Interactive Environment</div>
                    </div>
                </div>

                <div className="flex items-center gap-2 pl-2">
                     <button 
                        onClick={handleReset}
                        className="p-2 text-slate-500 hover:text-white transition-all hover:bg-white/10 rounded-lg"
                        title="אפס קוד"
                    >
                        <RotateCcw size={16} />
                    </button>
                    
                    <button 
                        onClick={handleRun}
                        disabled={isRunning || isPyodideLoading}
                        className={`
                            relative overflow-hidden flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all
                            ${isRunning 
                                ? 'bg-slate-800 text-slate-400 cursor-wait' 
                                : 'bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:scale-[1.02] active:scale-95'
                            }
                        `}
                    >
                        {isRunning ? (
                            <>
                                <Loader2 size={14} className="animate-spin" />
                                <span>מעבד...</span>
                            </>
                        ) : (
                            <>
                                <Play size={14} fill="currentColor" />
                                <span>הרץ קוד</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Editor Area with Focus Glow */}
            <div className="relative min-h-55 group">
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="absolute inset-0 w-full h-full p-6 font-mono text-sm bg-transparent text-transparent caret-blue-400 resize-none outline-none z-10 leading-relaxed"
                    spellCheck={false}
                    style={{ fontFamily: '"Fira Code", "JetBrains Mono", monospace' }}
                />
                
                {/* --- התיקון הקודם (Hydration Mismatch) --- */}
                <pre 
                    suppressHydrationWarning={true}
                    className="m-0 p-6 h-full font-mono text-sm overflow-auto pointer-events-none leading-relaxed"
                >
                    <code 
                        suppressHydrationWarning={true}
                        className="language-python bg-transparent! text-slate-300!" 
                        style={{ fontFamily: '"Fira Code", "JetBrains Mono", monospace' }}
                    >
                        {code}
                    </code>
                </pre>
            </div>

            {/* Terminal Output - Animated Reveal */}
            <AnimatePresence>
                {(output || error) && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-white/10 bg-black/40 backdrop-blur-md overflow-hidden"
                    >
                        <div className="p-4" dir="ltr">
                            <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2" dir="rtl">
                                <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                                    <Terminal size={12} />
                                    פלט מערכת
                                </div>
                                {error ? (
                                    <span className="flex items-center gap-1.5 text-[10px] text-rose-400 font-bold bg-rose-500/10 px-2 py-1 rounded-md border border-rose-500/20">
                                        <AlertCircle size={12} /> שגיאת הרצה
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
                                        <CheckCircle2 size={12} /> הושלם בהצלחה
                                    </span>
                                )}
                            </div>
                            
                            <div className={`font-mono text-sm whitespace-pre-wrap leading-relaxed p-2 rounded-lg border ${
                                error 
                                    ? 'text-rose-300 bg-rose-950/20 border-rose-500/20' 
                                    : 'text-emerald-300 bg-emerald-950/20 border-emerald-500/20'
                            }`}>
                                {output || "No output returned."}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};