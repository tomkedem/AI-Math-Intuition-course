"use client";

import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, TrendingDown, RefreshCcw, Activity, Zap, Play, Pause, Terminal, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { ChapterLayout } from '@/components/ChapterLayout';

// --- רכיבים ויזואליים פנימיים ---

// 1. סימולטור Learning Rate: ההשפעה של גודל הצעד
const LearningRateLab = () => {
  const [learningRate, setLearningRate] = useState(0.1);
  const [history, setHistory] = useState<number[]>([-8]);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTraining = () => {
    if (isRunning) return;
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setHistory(prevHistory => {
        const prev = prevHistory[prevHistory.length - 1];
        // נגזרת של x^2 היא 2x
        const slope = 2 * prev;
        const nextPos = prev - (learningRate * slope);

        const newHistory = [...prevHistory, nextPos];

        // עצירה אם מתרחקים מדי (התפוצצות) או מתכנסים
        if (Math.abs(nextPos) > 20 || Math.abs(nextPos) < 0.01 || newHistory.length > 50) {
          stopTraining();
        }
        return newHistory;
      });
    }, 200);
  };

  const stopTraining = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const reset = () => {
    stopTraining();
    setHistory([-8]);
  };

  // נרמול לתצוגה בגרף (ממינוס 10 עד 10)
  const normalize = (val: number) => Math.min(Math.max(((val + 10) / 20) * 100, 0), 100);

  // קביעת טקסט הסבר לפי ה-LR
  let statusText = "מאוזן ויציב";
  let statusColor = "text-green-400";
  
  if (learningRate < 0.05) {
      statusText = "איטי מדי (זחילה)";
      statusColor = "text-yellow-400";
  } else if (learningRate > 0.9) {
      statusText = "גבוה מדי (התפוצצות)";
      statusColor = "text-red-500";
  } else if (learningRate > 0.5) {
      statusText = "גבוה (קפיצות/אוסילציות)";
      statusColor = "text-orange-400";
  }

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col gap-8 relative overflow-hidden mt-8">
      <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors duration-500"></div>
      
      <div className="flex justify-between items-start z-10 relative">
          <div>
            <h3 className="text-white font-bold flex items-center gap-2 text-lg">
                <Activity size={20} className="text-blue-400"/> מעבדת קצב הלמידה
            </h3>
            <p className="text-xs text-slate-400 mt-1">נסה לשנות את הקצב ולראות איך המודל מתנהג</p>
          </div>
          <div className="text-right bg-slate-950 px-4 py-2 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Status</div>
              <div className={`font-bold text-sm ${statusColor}`}>{statusText}</div>
          </div>
      </div>

      {/* הגרף */}
      <div className="relative h-64 w-full border-b border-slate-700 bg-slate-950/50 rounded-xl overflow-hidden">
          {/* הפרבולה */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              <path 
                  d="M0,0 Q50,200 100,0" 
                  fill="none" 
                  stroke="#475569" 
                  strokeWidth="2" 
                  strokeDasharray="4 4"
                  vectorEffect="non-scaling-stroke"
                  transform="scale(1, -1) translate(0, -200)"
              />
          </svg>

          {/* היסטוריית הצעדים */}
          {history.map((pos, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: i === history.length - 1 ? 1 : 0.3 }}
                className={`absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 ${i === history.length - 1 ? 'bg-blue-500 w-4 h-4 shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10' : 'bg-slate-500'}`}
                style={{ 
                    left: `${normalize(pos)}%`, 
                    bottom: `${100 - (Math.pow(pos, 2) / 100 * 100)}%` // חישוב גובה על הפרבולה
                }}
              />
          ))}
          
          {/* קו המינימום */}
          <div className="absolute bottom-0 left-1/2 w-px h-full border-r border-dashed border-green-500/20"></div>
      </div>

      {/* שליטה */}
      <div className="flex flex-col gap-4 z-10 relative">
          <div className="space-y-2">
              <div className="flex justify-between text-xs text-blue-400 font-bold">
                  <span>Learning Rate</span>
                  <span>{learningRate.toFixed(2)}</span>
              </div>
              <input 
                type="range" min="0.01" max="1.1" step="0.05" value={learningRate}
                onChange={(e) => {
                    setLearningRate(parseFloat(e.target.value));
                    reset();
                }}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 px-1">
                  <span>איטי (בטוח)</span>
                  <span>מהיר (מסוכן)</span>
              </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={isRunning ? stopTraining : startTraining} className={`flex-1 ${isRunning ? 'bg-orange-600 hover:bg-orange-500' : 'bg-blue-600 hover:bg-blue-500'}`}>
                {isRunning ? <Pause size={16} className="mr-2"/> : <Play size={16} className="mr-2"/>}
                {isRunning ? "עצור אימון" : "התחל אימון"}
            </Button>
            <Button onClick={reset} variant="outline" className="border-slate-700">
                <RefreshCcw size={16}/>
            </Button>
          </div>
      </div>
    </div>
  )
}

// 2. המחשה בקוד: צעד אימון בודד
const CodeStepLab = () => {
    return (
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 font-mono text-sm relative overflow-hidden mt-8 shadow-2xl" dir="ltr">
            <div className="absolute top-0 right-0 p-2 opacity-50 text-xs text-slate-500">training_loop.py</div>
            
            <div className="space-y-4">
                {/* הגדרות */}
                <div className="space-y-1 opacity-60">
                    <span className="text-purple-400">learning_rate</span> = 0.1<br/>
                    <span className="text-purple-400">x</span> = -1 <span className="text-slate-500"># Starting point</span>
                </div>

                {/* הלולאה */}
                <div className="pl-4 border-l-2 border-slate-800">
                    <span className="text-blue-400">for</span> step <span className="text-blue-400">in</span> range(10):<br/>
                    
                    {/* שלב 1: חישוב השיפוע */}
                    <div className="pl-4 mt-2 group relative">
                        <div className="absolute -left-6 top-1 w-2 h-2 bg-yellow-500/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="text-slate-500"># 1. Calculate gradient (direction)</span><br/>
                        slope = 2 * (x - 3)
                    </div>

                    {/* שלב 2: העדכון */}
                    <div className="pl-4 mt-2 group relative">
                        <div className="absolute -left-6 top-1 w-2 h-2 bg-green-500/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="text-slate-500"># 2. Update weights (move against slope)</span><br/>
                        x = x - (learning_rate * slope)
                    </div>
                </div>
            </div>
        </div>
    )
}

// --- העמוד הראשי ---

export default function ChapterTen() {
  return (
    
          
            <ChapterLayout currentChapterId={10}>
          
          {/* סעיף 1: מנגנון ירידת המפל */}
          <section id="part-1" className="scroll-mt-24">
            <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><TrendingDown size={20} /></div>
                    <h2 className="text-2xl font-bold text-white">1. ירידת המפל: המנגנון שמוריד את הטעות</h2>
                </div>
                
                <div className="prose prose-invert text-slate-400 text-base leading-relaxed max-w-none space-y-4">
                    <p>
                        זה השלב שבו המודל מפסיק &quot;לבהות&quot; בדאטה ומתחיל ללמוד.
                        <strong>Gradient Descent</strong> הוא פשוט רעיון מתמטי שמדמה ירידה על מדרון.
                    </p>
                    <p>
                        המודל לא מנסה לנחש איפה המינימום. הוא משתמש במידע מקומי (השיפוע) כדי להחליט על הצעד הבא.
                        הוא גולש לאורך העקומה, צעד אחרי צעד, עד שהוא מגיע למקום שנוח לו.
                    </p>
                </div>
            </div>
          </section>


          {/* סעיף 2: קצב הלמידה (Learning Rate) */}
          <section id="part-2" className="scroll-mt-24">
            <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Zap size={20} /></div>
                    <h2 className="text-2xl font-bold text-white">2. הסכנה: מה קורה כשרצים מהר מדי?</h2>
                </div>
                
                <div className="prose prose-invert text-slate-400 text-base leading-relaxed max-w-none space-y-4">
                    <p>
                        הפרמטר הכי חשוב באימון הוא <strong>קצב הלמידה (Learning Rate)</strong>.
                        זה המספר שקובע כמה גדול יהיה הצעד.
                    </p>
                    <ul className="list-disc list-inside space-y-2 marker:text-purple-500">
                        <li><strong>גדול מדי:</strong> המודל יקפוץ מעל המינימום ויתרסק בצד השני (Overshooting).</li>
                        <li><strong>קטן מדי:</strong> המודל יזחול וייקח לו נצח להגיע לפתרון.</li>
                        <li><strong>מאוזן:</strong> המודל ירד בצורה חלקה ויעצור בול במקום.</li>
                    </ul>
                </div>
            </div>

            <LearningRateLab />

          </section>


          {/* סעיף 3: הקוד מאחורי הקלעים */}
          <section id="part-3" className="scroll-mt-24">
             <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><Terminal size={20} /></div>
                    <h2 className="text-2xl font-bold text-white">3. איך זה נראה בקוד?</h2>
                </div>
                <div className="prose prose-invert text-slate-400 text-base leading-relaxed max-w-none">
                    <p>
                        זה הקסם: כל התיאוריה המורכבת הזו מתמצה בשתי שורות קוד בתוך לולאה.
                        חישוב השיפוע, ועדכון המיקום. זה הכל.
                    </p>
                </div>
            </div>

            <CodeStepLab />

          </section>


          {/* Quiz */}
          <section id="quiz" className="mt-16 pt-8 border-t border-slate-800">
             <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">בדיקת הבנה: סיכום פרק 10</h2>
                <p className="text-slate-400 text-sm">האם הבנת איך המודל לומד?</p>
             </div>
             <ChapterTenQuiz />
          </section>

        </ChapterLayout>
   
  );
}


// --- קומפוננטות עזר ---

function ChapterTenQuiz() {
    const [answers, setAnswers] = useState<Record<number, number>>({});
    
    const questions = [
        {
            id: 1,
            text: "לאיזה כיוון המודל זז ביחס לשיפוע?",
            options: [
                { id: 1, text: "עם השיפוע (למעלה)" },
                { id: 2, text: "נגד השיפוע (למטה)", correct: true },
                { id: 3, text: "הוא נשאר במקום" }
            ]
        },
        {
            id: 2,
            text: "מה קורה אם קצב הלמידה (Learning Rate) גבוה מדי?",
            options: [
                { id: 1, text: "המודל לומד מהר מאוד ומסיים מוקדם" },
                { id: 2, text: "המודל מדלג מעל המינימום ולא מצליח להתכנס", correct: true },
                { id: 3, text: "המודל נתקע" }
            ]
        },
        {
            id: 3,
            text: "מהו Gradient Descent במשפט אחד?",
            options: [
                { id: 1, text: "תהליך איטרטיבי למציאת מינימום של פונקציה", correct: true },
                { id: 2, text: "שיטה למיון נתונים" },
                { id: 3, text: "סוג של רשת נוירונים" }
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
                        <Link href="/chapter-11">
                            <Button size="lg" className="h-14 px-10 text-base bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full shadow-[0_0_40px_rgba(37,99,235,0.5)] border-t border-blue-400/30 hover:scale-105 transition-transform">
                                <span className="font-bold">המשך לפרק 11: פרויקט סיום</span> <ChevronLeft className="mr-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}