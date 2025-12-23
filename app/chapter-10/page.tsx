"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { 
    TrendingDown, RefreshCcw, Activity, Play, Pause, 
    ArrowRight, Zap, CheckCircle2, MoveDown
} from "lucide-react";
import { motion } from "framer-motion";
import Link from 'next/link';
import { ChapterLayout } from '@/components/ChapterLayout';

// --- קומפוננטת עזר: הסבר מתמטי חי ---
const MathLive = ({ x, slope, lr }: { x: number, slope: number, lr: number }) => {
    const step = lr * slope;
    const nextX = x - step;
    
    return (
        <div className="font-mono text-sm md:text-base bg-black/40 p-4 rounded-xl border border-slate-700/50 shadow-inner" dir="ltr">
            <div className="flex flex-wrap items-center justify-center gap-2 opacity-80 mb-2 text-xs uppercase tracking-widest text-slate-500">
                הנוסחה בזמן אמת
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-purple-400 font-bold">New_X</span>
                <span>=</span>
                <span className="text-slate-300">{x.toFixed(2)}</span>
                <span className="text-slate-500">-</span>
                <span>(</span>
                <span className="text-yellow-400 font-bold" title="Learning Rate">{lr}</span>
                <span>×</span>
                <span className={`font-bold ${slope > 0 ? 'text-red-400' : 'text-green-400'}`} title="Slope">
                    {slope.toFixed(2)}
                </span>
                <span>)</span>
                <span>=</span>
                <span className="text-white font-bold bg-blue-600/20 px-2 rounded border border-blue-500/30">
                    {nextX.toFixed(2)}
                </span>
            </div>
            <div className="text-center mt-2 text-xs text-slate-400">
                המודל זז <span className="text-white font-bold">{Math.abs(step).toFixed(2)}</span> צעדים 
                {step > 0 ? ' שמאלה (להקטנת X)' : ' ימינה (להגדלת X)'}
            </div>
        </div>
    );
};

// --- קומפוננטת הסימולטור המרשימה ---
const GradientSimulator = () => {
    const [lr, setLr] = useState(0.1);
    const [x, setX] = useState(-8); // מתחילים רחוק
    const [isRunning, setIsRunning] = useState(false);
    const [steps, setSteps] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // פונקציית הטעות: y = x^2 / 4
    const f = (val: number) => (val * val) / 4;
    const df = (val: number) => val / 2; // הנגזרת

    // המרה מקואורדינטות מתמטיות לאחוזים במסך
    const toPercentX = (val: number) => ((val + 10) / 20) * 100;
    const toPercentY = (val: number) => 100 - ((val / 25) * 100);

    const step = () => {
        setX(prev => {
            const slope = df(prev);
            const next = prev - (lr * slope);
            
            // בדיקת עצירה
            if (Math.abs(next) > 20 || Math.abs(slope) < 0.01 || steps > 100) {
                stop();
                return prev; 
            }
            return next;
        });
        setSteps(s => s + 1);
    };

    const run = () => {
        if (isRunning) return;
        setIsRunning(true);
        if (Math.abs(x) < 0.1 || Math.abs(x) > 10) {
             setX(-8); setSteps(0); // ריסט אם סיימנו
        }
        intervalRef.current = setInterval(step, 200);
    };

    const stop = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsRunning(false);
    };

    const reset = () => {
        stop();
        setX(-8);
        setSteps(0);
    };

    // ניקוי זיכרון ביציאה מהרכיב
    useEffect(() => {
        return () => stop();
    }, []);

    // חישוב המשיק לויזואליזציה
    const slope = df(x);
    const y = f(x);
    const tangentLength = 3; 
    const x1 = x - tangentLength;
    const y1 = y - slope * tangentLength;
    const x2 = x + tangentLength;
    const y2 = y + slope * tangentLength;

    return (
        <div className="w-full bg-[#0B1221] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative group">
            
            {/* רקע רשת דינמי */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                 style={{ 
                     backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`, 
                     backgroundSize: '40px 40px' 
                 }}>
            </div>

            {/* כותרת צפה */}
            <div className="absolute top-4 right-4 z-10 bg-slate-900/80 backdrop-blur border border-slate-700 px-4 py-2 rounded-full flex items-center gap-3 shadow-lg">
                <div className={`w-2 h-2 rounded-full ${Math.abs(x) < 0.2 ? 'bg-green-500 animate-ping' : 'bg-yellow-500'}`}></div>
                <span className="text-xs font-bold text-slate-300">
                    {Math.abs(x) < 0.2 ? "הגענו למינימום! 🎉" : `צעד מספר: ${steps}`}
                </span>
            </div>

            {/* איזור הגרף */}
            <div className="relative h-100 w-full mt-8">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    {/* ציר ה-X וה-Y */}
                    <line x1="0" y1="90%" x2="100%" y2="90%" stroke="#334155" strokeWidth="2" />
                    <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#334155" strokeWidth="2" strokeDasharray="4" />

                    {/* הפרבולה עצמה */}
                    <path 
                        d="M0,20 Q50,400 100,20" 
                        fill="none" 
                        stroke="url(#gradientLine)" 
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    />
                    <defs>
                        <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* קו המשיק (השיפוע) */}
                    <line 
                        x1={`${toPercentX(x1)}%`} y1={`${toPercentY(y1)}%`}
                        x2={`${toPercentX(x2)}%`} y2={`${toPercentY(y2)}%`}
                        stroke={slope > 0 ? "#f87171" : "#4ade80"} 
                        strokeWidth="2"
                        strokeDasharray="4"
                        className="opacity-70 transition-all duration-200 ease-linear"
                    />

                    {/* הכדור (המודל) */}
                    <circle 
                        cx={`${toPercentX(x)}%`} 
                        cy={`${toPercentY(y)}%`} 
                        r="8" 
                        fill="white"
                        className="drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-200 ease-linear"
                    />
                    
                    {/* טקסט השיפוע ליד הכדור */}
                    <text 
                        x={`${toPercentX(x) + 2}%`} 
                        y={`${toPercentY(y) - 5}%`} 
                        fill="white" 
                        fontSize="12"
                        className="font-mono bg-black"
                    >
                        Slope: {slope.toFixed(2)}
                    </text>
                </svg>
            </div>

            {/* פאנל שליטה תחתון */}
            <div className="bg-slate-900 border-t border-slate-800 p-6 space-y-6">
                
                {/* ויזואליזציה של המתמטיקה */}
                <MathLive x={x} slope={slope} lr={lr} />

                {/* סליידר וכפתורים */}
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                    
                    <div className="w-full md:w-1/2 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">גודל הצעד (Learning Rate)</span>
                            <span className={`font-mono font-bold ${lr > 0.8 ? 'text-red-400' : 'text-blue-400'}`}>{lr}</span>
                        </div>
                        <input 
                            type="range" min="0.05" max="1.2" step="0.05"
                            value={lr}
                            onChange={(e) => {
                                setLr(parseFloat(e.target.value));
                                reset();
                            }}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-colors"
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 px-1">
                            <span>זחילה בטוחה</span>
                            <span>קפיצות ענק</span>
                        </div>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                        <Button 
                            onClick={step}
                            disabled={isRunning}
                            className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                        >
                            <MoveDown className="mr-2 h-4 w-4" /> צעד אחד
                        </Button>
                        <Button 
                            onClick={isRunning ? stop : run} 
                            className={`flex-1 min-w-35 font-bold shadow-lg transition-all ${isRunning ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'}`}
                        >
                            {isRunning ? <Pause className="ml-2 h-4 w-4" /> : <Play className="ml-2 h-4 w-4" />}
                            {isRunning ? "עצור" : "רוץ למטה!"}
                        </Button>
                        <Button onClick={reset} variant="ghost" className="text-slate-400 hover:text-white">
                            <RefreshCcw className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ChapterTen() {
  return (
    <ChapterLayout currentChapterId={10}>
      
      {/* --- Intro Section: The Story --- */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-linear-to-br from-blue-600 to-violet-600 rounded-2xl shadow-lg shadow-blue-900/20">
                <TrendingDown size={32} className="text-white" />
            </div>
            <div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
                    הלמידה עצמה
                </h1>
                <p className="text-xl text-blue-200 font-medium">Gradient Descent: המנוע של הבינה המלאכותית</p>
            </div>
        </div>

        <div className="prose prose-xl prose-invert text-slate-300 leading-relaxed max-w-3xl">
            <p>
                בפרקים הקודמים בנינו את המכונית: דיברנו על וקטורים, על פונקציות טעות, ועל שיפועים.
                <br/>
                <span className="text-white font-bold bg-blue-500/10 px-1 rounded">עכשיו הגיע הזמן להתניע.</span>
            </p>
            <p>
                Gradient Descent הוא הרגע שבו הקסם קורה. זה התהליך שהופך מודל &quot;טיפש&quot; שלא יודע כלום,
                למודל שלומד, משתפר, ובסוף - מבין. זה האלגוריתם שמניע כל מודל שתפגוש, מרגרסיה ליניארית פשוטה ועד ChatGPT.
            </p>
        </div>
      </motion.section>

      {/* --- Analogy Section: The Hiker --- */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="my-20 relative"
      >
          <div className="absolute inset-0 bg-linear-to-r from-blue-900/10 to-purple-900/10 rounded-3xl -z-10 blur-xl"></div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                      <span className="text-3xl">🏔️</span> האנלוגיה: המטייל העיוור
                  </h2>
                  <p className="text-slate-400 text-lg leading-relaxed">
                      תאר לעצמך שאתה עומד על פסגת הר גבוה, באמצע הלילה, בערפל כבד. אתה לא רואה כלום.
                      המטרה שלך היא להגיע לעמק למטה (המינימום של הטעות).
                  </p>
                  <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700 border-l-4 border-l-blue-500">
                      <h4 className="font-bold text-white mb-2">מה האסטרטגיה שלך?</h4>
                      <ul className="space-y-3 text-slate-300">
                          <li className="flex items-start gap-3">
                              <span className="bg-slate-800 p-1 rounded text-sm">1</span>
                              <span>אתה מרגיש עם הרגליים את שיפוע הקרקע כרגע.</span>
                          </li>
                          <li className="flex items-start gap-3">
                              <span className="bg-slate-800 p-1 rounded text-sm">2</span>
                              <span>אתה מזהה איזה כיוון יורד למטה הכי חזק.</span>
                          </li>
                          <li className="flex items-start gap-3">
                              <span className="bg-slate-800 p-1 rounded text-sm">3</span>
                              <span>אתה עושה <strong>צעד אחד</strong> בכיוון הזה.</span>
                          </li>
                          <li className="flex items-start gap-3">
                              <span className="bg-slate-800 p-1 rounded text-sm">4</span>
                              <span>אתה חוזר על התהליך, שוב ושוב.</span>
                          </li>
                      </ul>
                  </div>
              </div>
              
              {/* כרטיס המחשה ויזואלי */}
              <div className="relative group perspective-1000">
                  <div className="absolute inset-0 bg-linear-to-tr from-blue-600 to-purple-600 rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"></div>
                  <div className="bg-[#0B1221] border border-slate-700 p-8 rounded-3xl relative overflow-hidden">
                        {/* גרפיקה אבסטרקטית של הר */}
                        <svg viewBox="0 0 200 100" className="w-full h-40 opacity-80">
                            <path d="M0,100 L40,40 L80,80 L120,20 L160,60 L200,0 V100 H0 Z" fill="url(#mount-grad)" opacity="0.3" />
                            <path d="M0,100 Q100,0 200,100" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4" />
                            <circle cx="40" cy="55" r="4" fill="#facc15" className="animate-bounce" />
                            <defs>
                                <linearGradient id="mount-grad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0" stopColor="#3b82f6" />
                                    <stop offset="1" stopColor="transparent" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="text-center mt-4">
                            <p className="text-sm font-mono text-blue-300">
                                while (slope != 0) &#123; step_down() &#125;
                            </p>
                        </div>
                  </div>
              </div>
          </div>
      </motion.section>

      {/* --- Core Concept: Against the Slope --- */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="scroll-mt-32"
      >
          <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-white mb-4">למה &quot;נגד&quot; השיפוע?</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                  זה החלק הכי מבלבל, אבל גם הכי הגיוני ברגע שרואים אותו.
                  השיפוע (Derivative) מצביע תמיד לכיוון העלייה. אנחנו רוצים לרדת.
              </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-2xl flex items-center gap-4 transition-transform hover:scale-[1.02]">
                  <div className="bg-red-500/20 p-3 rounded-full">
                      <TrendingDown size={32} className="text-red-400 rotate-180" />
                  </div>
                  <div>
                      <h3 className="font-bold text-red-100 text-lg">שיפוע חיובי (+)</h3>
                      <p className="text-red-300/80 text-sm">ההר עולה ימינה. כדי לרדת, צריך ללכת <strong>שמאלה</strong> (מינוס).</p>
                  </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-2xl flex items-center gap-4 transition-transform hover:scale-[1.02]">
                  <div className="bg-green-500/20 p-3 rounded-full">
                      <TrendingDown size={32} className="text-green-400" />
                  </div>
                  <div>
                      <h3 className="font-bold text-green-100 text-lg">שיפוע שלילי (-)</h3>
                      <p className="text-green-300/80 text-sm">ההר יורד ימינה. כדי להמשיך לרדת, צריך ללכת <strong>ימינה</strong> (פלוס).</p>
                  </div>
              </div>
          </div>
          
          <div className="text-center mt-8">
              <div className="inline-block bg-slate-800 rounded-lg px-6 py-3 border border-slate-700 shadow-xl">
                  <span className="font-mono text-lg text-slate-400">new_position = old_position <span className="text-red-400 font-bold">-</span> (learning_rate * slope)</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">המינוס הזה הוא כל הסוד.</p>
          </div>
      </motion.section>

      {/* --- The Simulator --- */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="my-24 scroll-mt-20"
      >
          <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
              <div>
                  <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                      <Activity className="text-blue-500" /> המעבדה האינטראקטיבית
                  </h2>
                  <p className="text-slate-400 mt-2">
                      בוא נראה את זה קורה. נסה להביא את הכדור לתחתית העמק במינימום צעדים.
                  </p>
              </div>
              <div className="hidden md:flex gap-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> טעות גדולה</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> טעות קטנה</span>
              </div>
          </div>

          <GradientSimulator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                      <Zap size={16} className="text-yellow-400" /> קצב למידה גבוה (0.9+)
                  </h4>
                  <p className="text-sm text-slate-400">
                      המודל ישתגע. הוא יקפוץ מצד לצד (&quot;אוסילציות&quot;) ואולי אפילו יעוף לחלל. נסה את זה בסימולטור.
                  </p>
              </div>
              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                      <div className="bg-slate-700 w-4 h-4 rounded flex items-center justify-center text-[10px]">🐌</div> קצב למידה נמוך (0.05)
                  </h4>
                  <p className="text-sm text-slate-400">
                      בטוח מאוד, אבל איטי להחריד. דמיין לאמן ככה מודל במשך חודשים במקום שעות.
                  </p>
              </div>
              <div className="bg-blue-900/20 p-5 rounded-xl border border-blue-500/30">
                  <h4 className="font-bold text-blue-200 mb-2 flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-blue-400" /> הקצב המושלם
                  </h4>
                  <p className="text-sm text-blue-300/70">
                      מאפשר ירידה מהירה בהתחלה (כשהשיפוע תלול) והאטה אלגנטית בסוף (כשהשיפוע מתמתן).
                  </p>
              </div>
          </div>
      </motion.section>

      {/* --- Summary & Next Steps --- */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-linear-to-b from-slate-900 to-[#050B14] border-t border-slate-800 py-16 text-center"
      >
          <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">אז מה באמת קרה פה?</h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                  לא היה פה קסם. לא הייתה פה &quot;אינטליגנציה&quot;.
                  הייתה פה רק <strong>מדידת שיפוע</strong> וצעד קטן בכיוון ההפוך.
                  <br className="hidden md:block"/>
                  וזה בדיוק, אבל בדיוק, מה שמניע את המודלים הכי גדולים בעולם היום.
              </p>
              
              <Link href="/chapter-11">
                  <Button size="lg" className="h-16 px-10 text-lg bg-white text-black hover:bg-slate-200 hover:scale-105 transition-all rounded-full shadow-[0_0_40px_rgba(255,255,255,0.15)] font-bold group">
                      הבנתי, בוא נבנה את זה בקוד! (פרק 11)
                      <ArrowRight className="mr-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
              </Link>
              <p className="mt-4 text-sm text-slate-600">
                  בפרק הבא: פרויקט מעשי בפייתון
              </p>
          </div>
      </motion.section>

    </ChapterLayout>
  );
}