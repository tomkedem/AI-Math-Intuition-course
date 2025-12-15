"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
// ייבוא נקי
import { ChevronLeft, Ruler, Maximize2, AlertTriangle, ArrowRight, X, Check, MapPin, Play, RefreshCcw, RotateCw, Search } from "lucide-react"; 
import { CourseSidebar } from "@/components/CourseSidebar";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';

// --- רכיבים ויזואליים פנימיים ---

// 4. קומפוננטת תצוגת נוסחה (משתמשת בטקסט קריא בלבד - ASCII Safe)
const FormulaDisplay = ({ formula, description }: { formula: string, description: string }) => (
    <div className="bg-slate-900 border-l-4 border-blue-500 p-4 rounded-r-xl my-4 text-center">
        <p className="font-bold text-white mb-2">{description}</p>
        {/* שימוש בייצוג טקסטואלי קריא: SQRT, ^2 */}
        <div className="text-xl font-mono text-blue-300 overflow-x-auto p-2 bg-slate-950 rounded-lg whitespace-pre-wrap" dir="ltr">
            {formula}
        </div>
    </div>
);


// 1. מעבדת הנורמה: המחשת אורך וקטור
const NormLab = () => {
  const [x, setX] = useState(3);
  const [y, setY] = useState(4);

  // חישוב הנורמה (פיתגורס)
  const norm = Math.sqrt(x * x + y * y).toFixed(2);

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col gap-8 relative overflow-hidden group">
      <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors duration-500"></div>
      
      <div className="flex flex-col md:flex-row gap-8 items-center justify-between z-10 relative">
          
          {/* גרף וקטור */}
          <div className="w-full md:w-1/2 h-64 bg-slate-950 rounded-xl border border-slate-800 relative flex items-center justify-center overflow-hidden">
                {/* רשת רקע */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                
                {/* צירים */}
                <div className="absolute w-full h-px bg-slate-700"></div>
                <div className="absolute h-full w-px bg-slate-700"></div>

                {/* הוקטור */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                        </marker>
                    </defs>
                    <line 
                        x1="50%" y1="50%" 
                        x2={`${50 + x * 5}%`} y2={`${50 - y * 5}%`} 
                        stroke="#3b82f6" 
                        strokeWidth="4" 
                        markerEnd="url(#arrowhead)"
                    />
                    
                    {/* קו הנורמה (האורך) */}
                    <line 
                        x1="50%" y1="50%" 
                        x2={`${50 + x * 5}%`} y2={`${50 - y * 5}%`} 
                        stroke="white" 
                        strokeWidth="1" 
                        strokeDasharray="4 4"
                        opacity="0.5"
                    />
                </svg>

                {/* תווית הנורמה */}
                <div 
                    className="absolute bg-slate-900 text-blue-400 text-xs font-bold px-2 py-1 rounded border border-blue-500/30 shadow-lg"
                    style={{ left: `${50 + x * 2.5}%`, top: `${50 - y * 2.5}%` }}
                >
                    Norm: {norm}
                </div>
            </div>

          {/* בקרה */}
          <div className="flex flex-col gap-6 w-full md:w-1/2">
              <h3 className="text-white font-bold flex items-center gap-2">
                  <Ruler size={18} className="text-blue-400"/> בקרת וקטור
              </h3>
              
              <div className="space-y-4">
                  <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-2">
                          <span>ציר X (תכונה 1)</span>
                          <span className="text-white font-mono">{x.toFixed(1)}</span>
                      </div>
                      <input 
                        type="range" min="-8" max="8" step="0.1" value={x}
                        onChange={(e) => setX(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                  </div>
                  <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-2">
                          <span>ציר Y (תכונה 2)</span>
                          <span className="text-white font-mono">{y.toFixed(1)}</span>
                      </div>
                      <input 
                        type="range" min="-8" max="8" step="0.1" value={y}
                        onChange={(e) => setY(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                  </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-sm">
                  <p className="text-slate-400 mb-2">
                      הנורמה של וקטור $v$ מחושבת על ידי חוק פיתגורס המורחב:
                  </p>
                    {/* נוסחה טקסטואלית ברורה */}
                    <FormulaDisplay
                        description={`נוסחת הנורמה (אורך):`}
                        formula={`||v|| = SQRT(x1^2 + x2^2 + ...)`}
                    />
                  <div className="flex gap-2">
                      <span className="bg-blue-500/10 text-blue-300 px-2 py-1 rounded text-xs">נורמה גבוהה = עוצמה גבוהה</span>
                      <span className="bg-slate-800 text-slate-400 px-2 py-1 rounded text-xs">נורמה נמוכה = עוצמה חלשה</span>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

// 2. המחשת הבעיה במרחק: "אני מאחר לעבודה"
const DistanceProblemLab = () => {
    const [scenario, setScenario] = useState<'similar' | 'different'>('similar');

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 mt-8 relative overflow-hidden">
            <div className="flex flex-col gap-6 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><AlertTriangle size={20} /></div>
                    <h3 className="text-xl font-bold text-white">למה מרחק זה לא מספיק?</h3>
                </div>
                
                <div className="flex gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800 self-start">
                    <button 
                        onClick={() => setScenario('similar')}
                        className={`px-4 py-2 rounded text-xs font-bold transition-all ${scenario === 'similar' ? 'bg-purple-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        משמעות דומה, מרחק גדול
                    </button>
                    <button 
                        onClick={() => setScenario('different')}
                        className={`px-4 py-2 rounded text-xs font-bold transition-all ${scenario === 'different' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        מילים דומות, משמעות שונה
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative h-64 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center">
                    {/* The primary SVG container (fixed structure) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <defs>
                            <marker id="arrow-p" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#a855f7" />
                            </marker>
                            <marker id="arrow-b" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                            </marker>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                            </marker>
                        </defs>
                        
                        {/* Conditional SVG lines */}
                        {scenario === 'similar' ? (
                            <>
                                {/* V1 (Purple, long) */}
                                <line x1="40" y1="216" x2="150" y2="100" stroke="#a855f7" strokeWidth="3" markerEnd="url(#arrow-p)" />
                                {/* V2 (Blue, short, same direction) */}
                                <line x1="40" y1="216" x2="100" y2="150" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrow-b)" />
                                {/* Distance Line */}
                                <line x1="150" y1="100" x2="100" y2="150" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
                            </>
                        ) : (
                            <>
                                {/* V1 (Red) */}
                                <line x1="40" y1="216" x2="150" y2="150" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow-p)" />
                                {/* V2 (Green) */}
                                <line x1="40" y1="216" x2="160" y2="140" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrow-b)" />
                            </>
                        )}
                    </svg>
                    
                    {/* Origin point (circle) */}
                    <div className="absolute bottom-10 left-10 w-2 h-2 bg-white rounded-full z-10" />

                    {/* Text labels for endpoints - outside SVG, correctly positioned */}
                    {scenario === 'similar' ? (
                        <>
                            <div className="absolute top-24 left-36 bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded border border-purple-500/50">
                                &quot;מאחר לעבודה&quot;
                            </div>
                            <div className="absolute top-40 left-24 bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded border border-blue-500/50">
                                &quot;מתקשה להגיע בזמן&quot;
                            </div>
                            <div className="absolute top-32 left-40 text-xs text-slate-500 bg-slate-900 px-1">מרחק גדול</div>
                        </>
                    ) : (
                        <>
                            <div className="absolute top-40 left-40 bg-red-500/20 text-red-300 text-xs px-2 py-1 rounded border border-red-500/50">
                                &quot;אוהב לשרוף גשרים&quot;
                            </div>
                            <div className="absolute top-32 left-44 bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded border border-green-500/50">
                                &quot;אוהב קפה&quot;
                            </div>
                            <div className="absolute top-20 right-4 text-xs text-slate-500 max-w-30 text-right">
                                מרחק קטן (בגלל מילים משותפות).
                            </div>
                        </>
                    )}
                </div>

                <div className="space-y-4">
                    <h4 className="text-white font-bold">מה הבעיה כאן?</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        {scenario === 'similar' 
                            ? "המרחק הגיאומטרי (הקו המקווקו) גדול, ולכן המודל עלול לחשוב שהמשפטים שונים. בפועל, הם מצביעים לאותו כיוון (אותה משמעות)."
                            : "המרחק הגיאומטרי קטן כי יש מילים משותפות, אבל המשמעות הפוכה! מדד המרחק מטעה אותנו."}
                    </p>
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 flex gap-2 items-center">
                        <Check size={16} className="text-green-500" />
                        הפתרון: למדוד את הזווית (כיוון) ולא את המרחק.
                    </div>
                </div>
            </div>
        </div>
    )
}

// 3. רכיב קוד אינטראקטיבי
const InteractiveCodeBlock = ({ filename, code, output, explanation }: { filename: string, code: string, output: string, explanation: string }) => {
    const [status, setStatus] = useState<'idle' | 'running' | 'done'>('idle');

    const run = () => {
        setStatus('running');
        setTimeout(() => setStatus('done'), 1200); 
    };

    const reset = () => setStatus('idle');

    return (
        <div className="my-8 border border-slate-800 rounded-xl overflow-hidden bg-[#0d1117] shadow-2xl relative group">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-[#161b22]">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                    </div>
                    <span className="text-xs text-slate-400 font-mono ml-3">{filename}</span>
                </div>
                <Button 
                    onClick={status === 'done' ? reset : run}
                    disabled={status === 'running'}
                    size="sm"
                    className={`h-7 text-xs font-bold gap-2 transition-all ${status === 'done' ? 'bg-slate-700 hover:bg-slate-600' : 'bg-green-600 hover:bg-green-500'}`}
                >
                    {status === 'running' ? <RefreshCcw size={12} className="animate-spin"/> : status === 'done' ? <RotateCw size={12}/> : <Play size={12} fill="currentColor"/>}
                    {status === 'done' ? 'נקה פלט' : status === 'running' ? 'מריץ...' : 'הרץ קוד'}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-5 font-mono text-sm text-slate-300 border-b lg:border-b-0 lg:border-l border-slate-800 overflow-x-auto leading-relaxed" dir="ltr">
                    <pre dangerouslySetInnerHTML={{ __html: code }} />
                </div>
                <div className="bg-[#090c10] p-5 font-mono text-sm relative min-h-50 flex flex-col justify-between">
                    <div className="absolute top-2 right-2 text-[10px] text-slate-600 uppercase tracking-widest font-bold select-none">Terminal Output</div>
                    <AnimatePresence mode="wait">
                        {status === 'idle' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex items-center justify-center text-slate-600 italic text-xs">
                                לחץ על &quot;הרץ קוד&quot; כדי לראות את המרחק
                            </motion.div>
                        )}
                        {status === 'running' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center text-blue-400 gap-3">
                                <RefreshCcw size={24} className="animate-spin opacity-50" />
                                <span className="text-xs tracking-wider">מחשב מרחק גיאומטרי...</span>
                            </motion.div>
                        )}
                        {status === 'done' && (
                            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-green-400 whitespace-pre-wrap leading-relaxed w-full" dir="ltr">
                                <span className="text-slate-500 block mb-2 select-none">$ python3 {filename}</span>
                                {output}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {status === 'done' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
                            <span className="text-blue-400 font-bold">ניתוח:</span> {explanation}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};


// --- העמוד הראשי ---

export default function ChapterSix() {
  return (
    <div className="flex min-h-screen bg-[#020617] font-sans text-slate-100 selection:bg-blue-500/30" dir="rtl">
      
      <CourseSidebar />

      <div className="flex-1 h-screen overflow-y-auto custom-scrollbar scroll-smooth">
        
        {/* HEADER */}
        <header className="py-8 px-8 md:px-12 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
             <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs text-blue-400 font-bold mb-1 tracking-wider">
                        <span className="bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">פרק 6</span>
                        <ChevronLeft size={10} />
                        <span>נורמה ומרחק</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">
                        נורמה ומרחק – מודדים את העולם
                    </h1>
                </div>
                <p className="text-sm text-slate-400 max-w-sm leading-relaxed md:text-right border-r-2 border-slate-800 pr-4 hidden md:block">
                    איך יודעים אם משהו &quot;גדול&quot;, &quot;קרוב&quot; או &quot;דומה&quot;? הכל מתחיל במדידה מתמטית.
                </p>
             </div>
        </header>

        <main className="max-w-4xl mx-auto px-8 md:px-12 py-12 space-y-24 pb-48">
          
          {/* סעיף 1: נורמה (אורך) */}
          <section id="part-1" className="scroll-mt-24">
            <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Maximize2 size={20} /></div>
                    <h2 className="text-2xl font-bold text-white">1. מה זה &quot;אורך&quot; (נורמה) של וקטור?</h2>
                </div>
                
                <div className="prose prose-invert text-slate-300 text-lg leading-relaxed max-w-none space-y-6">
                    <p>
                        אם פרק 5 עסק בשאלה איך מייצגים דברים כוקטורים, הפרק הזה עוסק בשאלה הבאה: <strong>איך מודל יודע כמה הוקטור הזה &quot;גדול&quot;, &quot;חזק&quot; או &quot;קיצוני&quot;?</strong> וזו בדיוק הנורמה.
                    </p>
                    <h3 className="text-xl font-bold text-white">מהי נורמה?</h3>
                    <p>
                        נורמה היא מספר <strong>אחד</strong> שמסכם את &quot;הגודל&quot; של הוקטור. אפשר לחשוב עליה כעל אורך. אם תצייר וקטור על לוח כקווים, הנורמה היא האורך של הקו.
                    </p>
                    <div className="bg-slate-900 border-l-4 border-blue-500 p-6 rounded-r-xl">
                        <p className="font-bold text-white mb-2">דוגמה קלאסית (לפי חוק פיתגורס):</p>
                        <code className="font-mono text-sm text-blue-400 block mb-2">v = [3, 4]</code>
                        <p className="text-sm text-slate-400">
                           הנורמה מחושבת כך: $$\sqrt{3^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5$$ 
                           זה הופך את הוקטור למספר אחד שקל להשוות.
                        </p>
                    </div>
                </div>
            </div>

            <NormLab />

            <div className="prose prose-invert text-slate-300 text-lg leading-relaxed max-w-none space-y-6 mt-8">
                <h3 className="text-xl font-bold text-white">למה אכפת למודל מהאורך?</h3>
                <p>
                    כי נורמה מציגה למודל כמה חזק או קיצוני אובייקט מסוים ביחס לאחרים.
                </p>
                <ul className="list-disc list-inside space-y-2 marker:text-blue-400">
                    <li>משתמש עם פעילות ענקית יקבל וקטור ארוך יותר.</li>
                    <li>תמונה שיש בה המון פרטים לפעמים יוצרת וקטור ארוך יותר.</li>
                    <li>הנורמה הופכת את העולם המרובה ממדים למספר אחד שקל להשוות.</li>
                </ul>
                <p>
                    <strong>נורמה עוזרת למודל להבין את עוצמת המידע.</strong>
                </p>
                <div className="bg-slate-900 border-l-4 border-indigo-500 p-4 rounded-r">
                    <p className="text-sm text-slate-400">
                        בפרקטיקה, הנורמה משמשת ל: <strong>לנרמל דאטה</strong>, להבין חריגות, לקבוע גבולות במערכות זיהוי אנומליות, ולהכין את הוקטורים להשוואה אמיתית.
                    </p>
                </div>
            </div>
          </section>


          {/* סעיף 2: מרחק (דמיון) */}
          <section id="part-2" className="scroll-mt-24">
            <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><MapPin size={20} /></div>
                    <h2 className="text-2xl font-bold text-white">2. איך מודלים מודדים כמה דברים דומים או שונים (מרחק)?</h2>
                </div>
                
                <div className="prose prose-invert text-slate-300 text-lg leading-relaxed max-w-none space-y-6">
                    <p>
                        אחרי שהבנו מהו האורך של וקטור, מגיעה שאלה בסיסית שכל מודל חייב להתמודד איתה: איך יודעים אם שני אובייקטים דומים או שונים, כשהכול מיוצג כוקטורים?
                    </p>
                    <p>
                        בגלל שכל מודל עובד על רשימות מספרים, הוא צריך דרך להשוות בין שתי נקודות במרחב ולתרגם את ההשוואה הזאת ל&quot;קרבה&quot; או &quot;מרחק&quot;.
                    </p>
                    <h3 className="text-xl font-bold text-white">הצעד הראשון: מרחק אוקלידי</h3>
                    <p>
                        המדד הכי פשוט לדמיון הוא מרחק בין וקטורים. העיקרון מאוד אינטואיטיבי: מרחק קטן ← הוקטורים דומים. מרחק גדול ← הוקטורים שונים.
                    </p>
                    
                        <FormulaDisplay
                            description={`נוסחת המרחק בין שני וקטורים (v₁ ו-v₂):`}
                            formula={`Distance = SQRT((x1 - x2)^2 + (y1 - y2)^2 + ...)`}
                        />
                </div>
            </div>

            {/* Code Block: Distance Calculation */}
            <InteractiveCodeBlock
                filename="distance_calc.py"
                code={`<span class="text-purple-400">import</span> numpy <span class="text-purple-400">as</span> np

v1 = np.array([1, 2])
v2 = np.array([2, 3])

<span class="text-slate-500"># np.linalg.norm(v1 - v2) מחשב את המרחק הגיאומטרי</span>
distance = np.linalg.norm(v1 - v2)

<span class="text-blue-400">print</span>(f"Distance: {distance:.4f}")`}
                output={`Distance: 1.4142`}
                explanation="המרחק 1.4142 מייצג את ההפרדה הגיאומטרית בין שתי הנקודות במרחב הדו-ממדי. זהו כלי שימושי לאיתור חריגות וקיבוץ נתונים דומים."
            />

            <div className="prose prose-invert text-slate-300 text-lg leading-relaxed max-w-none space-y-6 mt-8">
                <h3 className="text-xl font-bold text-white">אבל מרחק הוא רק חלק מהסיפור (הנקודה הקריטית)</h3>
                <p>
                    מרחק <strong>לא יודע להבין משמעות</strong>.
                </p>
                <p>
                    <strong>בטקסט זה קריטי:</strong> שני משפטים יכולים להיות שונים לגמרי מבחינת המילים, אבל מאוד דומים מבחינת המשמעות. מרחק גיאומטרי לא יודע לעשות את ההבחנה הזו.
                </p>
                <div className="bg-slate-900 border-l-4 border-red-500 p-4 rounded-r">
                    <p className="text-base text-slate-300">
                        <strong>הבעיה:</strong> מרחק מודד שונות גיאומטרית, לא שונות רעיונית. שני משפטים בעלי משמעות דומה יכולים להיות רחוקים מדי. שניים בעלי משמעות שונה יכולים להיות קרובים מדי (בגלל מילים משותפות).
                    </p>
                </div>
            </div>

            <DistanceProblemLab />

            {/* סעיף 3: הפתרון (הכנה לפרק הבא) */}
            <section id="part-3" className="scroll-mt-24 bg-slate-900/40 border border-slate-800 rounded-2xl p-8 relative overflow-hidden">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="p-4 bg-slate-950 rounded-full border border-slate-800 shrink-0">
                        <Search className="text-green-400 w-8 h-8" />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-white">הכלי החסר: מדידת כיוון</h2>
                        <p className="text-slate-400 text-base leading-relaxed">
                            מרחק עונה רק על &quot;כמה רחוקים הוקטורים?&quot;. הוא לא עונה על: &quot;האם הכיוון שלהם דומה?&quot;.
                            מודלים צריכים כלי נוסף שמבין כיוון ורעיון משותף.
                        </p>
                        <p className="text-white font-bold">
                            זה בדיוק מה שמוביל אותנו לשיטה שחייבים להכיר בעולם ה-NLP: מדידת <strong>הזווית</strong> בין וקטורים.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-blue-400 mt-2">
                            <ArrowRight size={16} /> בפרק הבא: דמיון קוסינוס (Cosine Similarity)
                        </div>
                    </div>
                </div>
            </section>
          </section>


          {/* Quiz */}
          <section id="quiz" className="mt-16 pt-8 border-t border-slate-800">
             <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">בדיקת הבנה: סיכום פרק 6</h2>
                <p className="text-slate-400 text-sm">האם הבנת את ההבדל בין גודל למרחק?</p>
             </div>
             <ChapterSixQuiz />
          </section>

        </main>
      </div>
    </div>
  );
}


// --- קומפוננטות עזר ---

function ChapterSixQuiz() {
    const [answers, setAnswers] = useState<Record<number, number>>({});
    
    const questions = [
        {
            id: 1,
            text: "מה מייצגת הנורמה (Norm) של וקטור?",
            options: [
                { id: 1, text: "את הכיוון שלו" },
                { id: 2, text: "את האורך או ה'עוצמה' שלו", correct: true },
                { id: 3, text: "את מספר המימדים שלו" }
            ]
        },
        {
            id: 2,
            text: "מה הבעיה העיקרית של שימוש במרחק רגיל לטקסט?",
            options: [
                { id: 1, text: "זה לוקח יותר מדי זמן לחשב" },
                { id: 2, text: "מרחק לא מתחשב במשמעות (כיוון), אלא רק בערכים המספריים", correct: true },
                { id: 3, text: "אי אפשר לחשב מרחק על מילים" }
            ]
        },
        {
            id: 3,
            text: "אם שני וקטורים מצביעים לאותו כיוון אבל באורך שונה, האם המשמעות שלהם דומה?",
            options: [
                { id: 1, text: "כן, בדרך כלל ב-AI כיוון מעיד על משמעות", correct: true },
                { id: 2, text: "לא, הם חייבים להיות באותו אורך" },
                { id: 3, text: "אי אפשר לדעת" }
            ]
        }
    ];

    const handleSelect = (qId: number, oId: number) => {
        setAnswers(prev => ({ ...prev, [qId]: oId }));
    };

    const allCorrect = questions.every(q => {
        const selected = answers[q.id];
        const correctOption = q.options.find(o => o.correct);
        return selected === correctOption?.id;
    });

    return (
        <div className="space-y-4 max-w-xl mx-auto text-right relative z-10">
            {questions.map((q) => (
                <div key={q.id} className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors">
                    <h4 className="font-bold text-white mb-3 text-sm flex items-center gap-2">
                        <span className="bg-slate-800 text-slate-400 w-5 h-5 rounded flex items-center justify-center text-[10px]">{q.id}</span>
                        {q.text}
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                        {q.options.map((opt) => {
                            const isSelected = answers[q.id] === opt.id;
                            const isCorrect = opt.correct;
                            
                            let btnClass = "w-full text-right px-3 py-2 rounded-lg border transition-all text-xs flex items-center justify-between ";
                            
                            if (isSelected) {
                                if (isCorrect) btnClass += "bg-green-500/10 border-green-500/50 text-green-300";
                                else btnClass += "bg-red-500/10 border-red-500/50 text-red-300";
                            } else {
                                btnClass += "bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-400";
                            }

                            return (
                                <button key={opt.id} onClick={() => handleSelect(q.id, opt.id)} className={btnClass}>
                                    <span>{opt.text}</span>
                                    {isSelected && (isCorrect ? <Check size={14} className="text-green-400" /> : <X size={14} className="text-red-400" />)}
                                </button>
                            )
                        })}
                    </div>
                </div>
            ))}

            <AnimatePresence>
                {allCorrect && Object.keys(answers).length === 3 && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="sticky bottom-8 z-50 flex justify-center pt-6"
                    >
                        <Link href="/chapter-7">
                            <Button size="lg" className="h-14 px-10 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full shadow-[0_0_40px_rgba(37,99,235,0.5)] border-t border-blue-400/30 hover:scale-105 transition-transform">
                                <span className="font-bold">המשך לפרק 7: קוסינוס</span> <ChevronLeft className="mr-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}