"use client";

import React, { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-python';
import { motion, AnimatePresence } from "framer-motion";
import { 
    Play, RotateCcw, Terminal, Loader2, 
    CheckCircle2, AlertCircle, Code2,
    Copy, Check, Clock
} from 'lucide-react';

// --- Types ---
interface PyodideInterface {
    loadPackage: (packages: string | string[]) => Promise<unknown>;
    runPython: (code: string) => string;
    runPythonAsync: (code: string) => Promise<unknown>;
}

declare global {
    interface Window {
        loadPyodide: (config: { indexURL: string }) => Promise<PyodideInterface>;
    }
}

// --- Loading Logic ---
let pyodideReadyPromise: Promise<PyodideInterface> | null = null;

const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (typeof document !== 'undefined' && document.querySelector(`script[src="${src}"]`)) {
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
    if (pyodideReadyPromise) return pyodideReadyPromise;
    pyodideReadyPromise = (async () => {
        if (typeof window !== 'undefined' && !window.loadPyodide) {
            await loadScript("https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js");
        }
        const pyodide = await window.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
        });
        await pyodide.loadPackage("numpy");
        return pyodide;
    })();
    return pyodideReadyPromise;
};

// --- Config ---
const COMMON_STYLES: React.CSSProperties = {
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '14px',
    lineHeight: '1.5',
    padding: '20px',
    letterSpacing: '0px',
    whiteSpace: 'pre',
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
    const [copied, setCopied] = useState(false);
    const [executionTime, setExecutionTime] = useState<number | null>(null);
    
    // Refs for Scroll Sync
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const preRef = useRef<HTMLPreElement>(null);
    const lineNumberRef = useRef<HTMLDivElement>(null);
    
    const pyodideRef = useRef<PyodideInterface | null>(null);

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
                console.error(err);
                if (mounted) setError("שגיאה בטעינת המנוע.");
            }
        };
        initPython();
        return () => { mounted = false; };
    }, []);

    useEffect(() => {
        Prism.highlightAll();
    }, [code, output, error]);

    // --- Sync Scroll ---
    const handleScroll = () => {
        if (!textareaRef.current) return;
        const { scrollTop, scrollLeft } = textareaRef.current;

        if (preRef.current) {
            preRef.current.scrollTop = scrollTop;
            preRef.current.scrollLeft = scrollLeft;
        }

        if (lineNumberRef.current) {
            lineNumberRef.current.scrollTop = scrollTop;
        }
    };

    const handleRun = async () => {
        if (!pyodideRef.current || isRunning) return;
        setIsRunning(true);
        setError(null);
        setOutput("");
        setExecutionTime(null);
        const startTime = performance.now();

        try {
            pyodideRef.current.runPython(`
                import sys
                import io
                sys.stdout = io.StringIO()
            `);
            await pyodideRef.current.runPythonAsync(code);
            const stdout = pyodideRef.current.runPython("sys.stdout.getvalue()");
            const endTime = performance.now();
            setExecutionTime((endTime - startTime) / 1000);
            setOutput(stdout);
            if (onSuccess) onSuccess(stdout);
        } catch (err: unknown) { 
            const errorMsg = String(err).split('PythonError:').pop() || "Unknown Error";
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

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            handleRun();
        }
        if (e.key === 'Tab') {
            e.preventDefault();
            const target = e.target as HTMLTextAreaElement;
            const start = target.selectionStart;
            const end = target.selectionEnd;
            const newCode = code.substring(0, start) + "    " + code.substring(end);
            setCode(newCode);
            setTimeout(() => {
                target.selectionStart = target.selectionEnd = start + 4;
            }, 0);
        }
    };

    const lineNumbers = code.split('\n').map((_, i) => i + 1).join('\n');

    return (
        <div 
            className={`
                relative my-12 rounded-2xl overflow-hidden transition-all duration-500
                bg-[#0B1120] border group/container text-left
                ${isFocused ? 'border-blue-500/50 shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)]' : 'border-white/10 shadow-2xl'}
            `}
            dir="ltr"
        >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
            
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#1e293b]/50 border-b border-white/5 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                        {isRunning ? <Loader2 size={16} className="animate-spin" /> : <Code2 size={16} />}
                    </div>
                    <span className="text-xs font-bold text-slate-200 tracking-wide">Python Lab</span>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={handleRun}
                        disabled={isRunning || isPyodideLoading}
                        className={`
                            flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all
                            ${isRunning ? 'bg-slate-700 text-slate-400' : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg'}
                        `}
                    >
                        <Play size={12} fill="currentColor" /> {isRunning ? 'Running...' : 'Run'}
                    </button>
                    <button onClick={handleReset} className="p-2 text-slate-500 hover:text-white rounded-lg hover:bg-white/5"><RotateCcw size={16} /></button>
                    <button onClick={handleCopy} className="p-2 text-slate-500 hover:text-white rounded-lg hover:bg-white/5 relative">
                        {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                    </button>
                </div>
            </div>

            {/* Editor Area */}
            <div className="relative h-64 bg-[#0B1120] text-left flex">
                {/* Line Numbers */}
                <div 
                    ref={lineNumberRef}
                    className="h-full border-r border-white/5 bg-[#0B1120] text-slate-600 select-none overflow-hidden text-right"
                    aria-hidden="true"
                    style={{
                        ...COMMON_STYLES,
                        width: '48px',
                        paddingRight: '12px',
                        paddingLeft: '0',
                    }}
                >
                    {lineNumbers}
                </div>

                {/* Code Container */}
                <div className="relative flex-1 h-full group">
                    {/* Layer 0: Visible Code */}
                    <pre
                        ref={preRef}
                        suppressHydrationWarning={true}
                        aria-hidden="true"
                        className="absolute inset-0 m-0 overflow-hidden pointer-events-none text-left w-full h-full"
                        style={COMMON_STYLES}
                    >
                        <code 
                            // התיקון: נוסף suppressHydrationWarning גם כאן
                            suppressHydrationWarning={true}
                            className="language-python bg-transparent! text-slate-300!" 
                            style={{
                                fontFamily: COMMON_STYLES.fontFamily,
                                fontSize: COMMON_STYLES.fontSize,
                                lineHeight: COMMON_STYLES.lineHeight,
                                padding: 0, margin: 0, display: 'block'
                            }}
                        >
                            {code}
                        </code>
                    </pre>

                    {/* Layer 1: Input */}
                    <textarea
                        ref={textareaRef}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onScroll={handleScroll}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        spellCheck={false}
                        className="absolute inset-0 w-full h-full resize-none bg-transparent text-transparent caret-blue-400 outline-none overflow-auto z-10"
                        style={{
                            ...COMMON_STYLES,
                            color: 'transparent',
                            top: '8px',
                             
                        }}
                    />
                </div>
            </div>

            {/* Output Panel */}
            <AnimatePresence>
                {(output || error) && (
                    <motion.div 
                        initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                        className="border-t border-white/10 bg-black/50 backdrop-blur-xl overflow-hidden"
                    >
                        <div className="flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/5">
                             {/* Left: Title */}
                            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-slate-400">
                                <Terminal size={12} />
                                <span>Output</span>
                            </div>

                            {/* Right: Status & Time */}
                            <div className="flex items-center gap-3">
                                {executionTime && !error && (
                                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                                        <Clock size={10} />
                                        <span>{executionTime.toFixed(3)}s</span>
                                    </div>
                                )}
                                
                                {error ? (
                                    <div className="flex items-center gap-1.5 text-[10px] text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                                        <AlertCircle size={10} />
                                        <span>Failed</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                        <CheckCircle2 size={10} />
                                        <span>Success</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className={`p-4 font-mono text-sm whitespace-pre-wrap ${error ? 'text-rose-300' : 'text-emerald-300'}`}>
                            {output}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};