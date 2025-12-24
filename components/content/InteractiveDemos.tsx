"use client";

import React, { useState } from 'react';
import { Play, Plus, Trash2 } from 'lucide-react';

// --- רכיב עזר כללי למעטפת של הדגמה ---
const DemoContainer = ({ title, children, output }: { title: string, children: React.ReactNode, output: string }) => {
    const isOutputHebrew = /[\u0590-\u05FF]/.test(output);

    return (
        <div className="my-8 rounded-xl overflow-hidden border border-indigo-500/30 bg-[#0F172A] shadow-lg shadow-indigo-500/10" dir="ltr">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-indigo-500/20">
                <span className="text-xs font-mono text-indigo-400 font-bold">{title}</span>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 text-[10px] border border-indigo-500/20">
                    <Play size={10} />
                    <span>Interactive</span>
                </div>
            </div>
            
            <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto text-left">
                {children}
            </div>

            <div className="border-t border-slate-700/50 bg-[#020617] p-4">
                <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-2 text-left">Output</div>
                <pre 
                    dir={isOutputHebrew ? "rtl" : "ltr"}
                    className={`text-emerald-400 font-mono text-sm whitespace-pre-wrap transition-all duration-300 ${isOutputHebrew ? "text-right font-sans" : "text-left"}`}
                >
                    {output}
                </pre>
            </div>
        </div>
    );
};

// --- Input מעוצב וברור ---
const CodeInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input 
        {...props}
        className={`bg-slate-800 border-b-2 border-indigo-500/50 text-center rounded-t-sm focus:bg-slate-700 focus:border-indigo-400 outline-none px-1 min-w-8 transition-colors ${props.className || ""}`}
    />
);

// --- 1. הדגמת f-string ---
export const AgeDemo = () => {
    const [name, setName] = useState("Tomer");
    const [age, setAge] = useState(32);

    return (
        <DemoContainer 
            title="interactive_f_string.py"
            output={`Hello ${name}, next year you will be ${age + 1}.`}
        >
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <span className="text-blue-400">name</span>
                    <span className="text-slate-400">=</span>
                    <div className="flex items-center">
                        <span className="text-green-400">&quot;</span>
                        <CodeInput 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="text-green-400 w-24"
                        />
                        <span className="text-green-400">&quot;</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-blue-400">age</span>
                    <span className="text-slate-400">=</span>
                    <CodeInput 
                        type="number" 
                        value={age} 
                        onChange={(e) => setAge(Number(e.target.value))} 
                        className="text-orange-400 w-16"
                    />
                </div>
                <div className="text-slate-500 py-2"># f-string calculation:</div>
                <div>
                    <span className="text-yellow-400">print</span>
                    <span className="text-purple-400">(</span>
                    <span className="text-green-400">f&quot;Hello <span className="text-indigo-400">{`{name}`}</span>, next year you will be <span className="text-indigo-400">{`{age + 1}`}</span>.&quot;</span>
                    <span className="text-purple-400">)</span>
                </div>
            </div>
        </DemoContainer>
    );
};

// --- 2. הדגמת Slicing ---
export const SlicingDemo = () => {
    const [text, setText] = useState("PythonEngineering");
    const [start, setStart] = useState<number | string>(0);
    const [end, setEnd] = useState<number | string>(6);

    const sIdx = start === '' ? 0 : Number(start);
    const eIdx = end === '' ? text.length : Number(end);
    
    const result = text.slice(sIdx, eIdx);

    return (
        <DemoContainer 
            title="slicing_lab.py"
            output={`'${result}'`}
        >
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className="text-blue-400">text</span>
                    <span className="text-slate-400">=</span>
                    <div className="flex items-center w-full">
                        <span className="text-green-400">&quot;</span>
                        <CodeInput 
                            value={text} 
                            onChange={(e) => setText(e.target.value)} 
                            className="text-green-400 w-full max-w-62.5 text-left"
                        />
                        <span className="text-green-400">&quot;</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-1">
                    <span className="text-yellow-400">print</span>
                    <span className="text-purple-400">(</span>
                    <span className="text-blue-400">text</span>
                    <span className="text-white">[</span>
                    <CodeInput 
                        value={start} 
                        placeholder="0"
                        onChange={(e) => setStart(e.target.value)} 
                        className="text-orange-400 w-10"
                    />
                    <span className="text-white">:</span>
                    <CodeInput 
                        value={end} 
                        placeholder="end"
                        onChange={(e) => setEnd(e.target.value)} 
                        className="text-orange-400 w-10"
                    />
                    <span className="text-white">]</span>
                    <span className="text-purple-400">)</span>
                </div>
            </div>
        </DemoContainer>
    );
};

// --- 3. הדגמת Comprehension ---
export const ComprehensionDemo = () => {
    const [limit, setLimit] = useState(10);
    const [divider, setDivider] = useState(2);

    const range = Array.from({ length: limit }, (_, i) => i);
    const result = range.filter(n => n % divider === 0);

    return (
        <DemoContainer 
            title="comprehension_builder.py"
            output={`[${result.join(', ')}]`}
        >
            <div className="space-y-2">
                <div className="text-slate-500 mb-2"># Build a list of numbers divisible by {divider}:</div>
                <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-blue-400">numbers</span>
                    <span className="text-slate-400">=</span>
                    <span className="text-yellow-400">[</span>
                    <span className="text-white">n</span>
                    <span className="text-purple-400">for</span>
                    <span className="text-white">n</span>
                    <span className="text-purple-400">in</span>
                    <span className="text-yellow-400">range</span>
                    <span className="text-purple-400">(</span>
                    <CodeInput 
                        type="number"
                        value={limit} 
                        min="1" max="50"
                        onChange={(e) => setLimit(Number(e.target.value))} 
                        className="text-orange-400 w-12"
                    />
                    <span className="text-purple-400">)</span>
                    
                    <span className="text-purple-400">if</span>
                    <span className="text-white">n</span>
                    <span className="text-slate-400">%</span>
                    <CodeInput 
                        type="number"
                        value={divider} 
                        min="1"
                        onChange={(e) => setDivider(Number(e.target.value))} 
                        className="text-orange-400 w-10"
                    />
                    <span className="text-slate-400">==</span>
                    <span className="text-orange-400">0</span>
                    <span className="text-yellow-400">]</span>
                </div>
                
                <div className="mt-2">
                    <span className="text-yellow-400">print</span>
                    <span className="text-purple-400">(</span>
                    <span className="text-blue-400">numbers</span>
                    <span className="text-purple-400">)</span>
                </div>
            </div>
        </DemoContainer>
    );
};

// --- 4. הדגמת Clean Sentences (החדשה!) ---
export const CleanSentencesDemo = () => {
    // רשימה התחלתית של משפטים
    const [sentences, setSentences] = useState([
        "  שלום עולם!  ",
        "",
        "   זה מבחן קטן  ",
        "   ",
        "AI משנה הכול"
    ]);

    const handleEdit = (index: number, val: string) => {
        const newSentences = [...sentences];
        newSentences[index] = val;
        setSentences(newSentences);
    };

    const addSentence = () => setSentences([...sentences, " טקסט חדש "]);
    const removeSentence = (index: number) => {
        const newSentences = sentences.filter((_, i) => i !== index);
        setSentences(newSentences);
    };

    // הלוגיקה של הפייתון (סימולציה ב-JS)
    const cleaned = sentences
        .map(s => s.trim())
        .filter(s => s.length > 0);

    const outputString = `['${cleaned.join("', '")}']`;

    return (
        <DemoContainer 
            title="clean_data_interactive.py"
            output={outputString}
        >
            <div className="space-y-1">
                <div className="text-purple-400 italic mb-2">def clean_sentences(raw_list):</div>
                <div className="text-slate-400 ml-4 mb-4">
                    return [s.strip() for s in raw_list if s.strip()]
                </div>

                <div className="text-blue-400 mb-1">raw = [</div>
                <div className="flex flex-col gap-2 ml-4 border-l border-slate-700 pl-4 py-2">
                    {sentences.map((s, i) => (
                        <div key={i} className="flex items-center gap-2 group">
                            <span className="text-green-400 text-lg leading-none">&quot;</span>
                            <input 
                                type="text"
                                value={s}
                                onChange={(e) => handleEdit(i, e.target.value)}
                                className="bg-slate-800 border-b border-indigo-500/30 w-full text-green-300 font-sans text-right px-2 outline-none focus:bg-slate-700 focus:border-indigo-400 rounded-sm"
                                dir="auto"
                            />
                            <span className="text-green-400 text-lg leading-none">&quot;,</span>
                            
                            <button onClick={() => removeSentence(i)} className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-opacity">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                    <button 
                        onClick={addSentence}
                        className="flex items-center gap-2 text-xs text-slate-500 hover:text-indigo-400 mt-2 transition-colors w-fit"
                    >
                        <Plus size={14} /> הוסף משפט לרשימה
                    </button>
                </div>
                <div className="text-blue-400">]</div>

                <div className="mt-4 text-yellow-400">
                    print<span className="text-purple-400">(</span>clean_sentences(raw)<span className="text-purple-400">)</span>
                </div>
            </div>
        </DemoContainer>
    );
};