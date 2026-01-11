"use client";

/**
 * StaticCodeBlock - Static code display component with syntax highlighting
 *
 * Features:
 * - Syntax highlighting for multiple languages (Python, JavaScript, Bash, YAML, JSON, etc.)
 * - Optional output display
 * - Copy to clipboard functionality
 * - Line numbers
 * - Custom filename display
 * - RTL/LTR support
 * - Responsive design
 * - Beautiful dark theme
 *
 * @example
 * ```tsx
 * <StaticCodeBlock
 *   language="python"
 *   code="print('Hello World')"
 *   output="Hello World"
 *   filename="example.py"
 * />
 * ```
 */

import React, { useState, useMemo } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import { Copy, Check, Terminal, Code2, FileCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface StaticCodeBlockProps {
    /** Programming language for syntax highlighting */
    language?: 'python' | 'javascript' | 'typescript' | 'bash' | 'yaml' | 'json' | string;

    /** Code to display */
    code: string;

    /** Optional output/result to display below the code */
    output?: string;

    /** Optional filename to display in header */
    filename?: string;

    /** Text direction (ltr or rtl) */
    dir?: 'ltr' | 'rtl';

    /** Show line numbers */
    showLineNumbers?: boolean;

    /** Custom height class */
    heightClass?: string;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const StaticCodeBlock: React.FC<StaticCodeBlockProps> = ({
    language = 'python',
    code,
    output,
    filename,
    dir = 'ltr',
    showLineNumbers = true,
    heightClass
}) => {
    const [copied, setCopied] = useState(false);

    // Syntax highlight the code
    const highlightedCode = useMemo(() => {
        try {
            const lang = Prism.languages[language];
            if (!lang) {
                console.warn(`Language "${language}" not found in Prism, using plain text`);
                return code;
            }
            return Prism.highlight(code, lang, language);
        } catch (error) {
            console.error('Syntax highlighting error:', error);
            return code;
        }
    }, [code, language]);

    // Generate line numbers
    const lineNumbers = useMemo(
        () => code.split('\n').map((_, i) => i + 1).join('\n'),
        [code]
    );

    // Copy to clipboard handler
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Get language icon color
    const getLanguageColor = () => {
        switch (language) {
            case 'python':
                return 'text-blue-400';
            case 'javascript':
            case 'typescript':
                return 'text-yellow-400';
            case 'bash':
                return 'text-green-400';
            case 'yaml':
            case 'json':
                return 'text-purple-400';
            default:
                return 'text-slate-400';
        }
    };

    return (
        <div
            className="relative my-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0B1120]"
            dir={dir}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#1e293b]/50 border-b border-white/5 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-slate-800/50 ${getLanguageColor()}`}>
                        {filename ? <FileCode size={16} /> : <Code2 size={16} />}
                    </div>
                    {filename ? (
                        <span className="text-xs font-mono text-slate-200">{filename}</span>
                    ) : (
                        <span className="text-xs font-bold text-slate-200 tracking-wide uppercase">
                            {language}
                        </span>
                    )}
                </div>

                {/* Copy Button */}
                <button
                    onClick={handleCopy}
                    className="p-2 text-slate-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors relative"
                    title="Copy code"
                    aria-label="Copy code to clipboard"
                >
                    <AnimatePresence mode="wait">
                        {copied ? (
                            <motion.div
                                key="check"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                            >
                                <Check size={16} className="text-emerald-400" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="copy"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                            >
                                <Copy size={16} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Code Area */}
            <div className={`relative ${heightClass || 'max-h-[500px]'} bg-[#0B1120] overflow-auto flex`}>
                {/* Line Numbers */}
                {showLineNumbers && (
                    <div
                        className="border-r border-white/5 bg-[#0B1120] text-slate-600 select-none text-right py-4 px-3"
                        aria-hidden="true"
                        style={{
                            fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                            fontSize: '14px',
                            lineHeight: '1.5',
                            minWidth: '48px'
                        }}
                    >
                        {lineNumbers}
                    </div>
                )}

                {/* Code Display */}
                <pre
                    className="flex-1 m-0 p-4 overflow-auto"
                    style={{
                        fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                        fontSize: '14px',
                        lineHeight: '1.5',
                    }}
                >
                    <code
                        className={`language-${language} text-slate-300`}
                        dangerouslySetInnerHTML={{ __html: highlightedCode }}
                    />
                </pre>
            </div>

            {/* Output Panel */}
            {output && (
                <div className="border-t border-white/10 bg-black/50 backdrop-blur-xl">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/5">
                        <Terminal size={12} className="text-emerald-400" />
                        <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                            Output
                        </span>
                    </div>
                    <div
                        className="p-4 font-mono text-sm text-emerald-300 whitespace-pre-wrap"
                        role="log"
                        aria-label="Code output"
                    >
                        {output}
                    </div>
                </div>
            )}
        </div>
    );
};

// Set display name for debugging
StaticCodeBlock.displayName = 'StaticCodeBlock';
