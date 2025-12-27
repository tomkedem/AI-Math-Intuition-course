"use client";

import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, Terminal, Play, Check, Brain, 
  Target, Zap, Activity, Fingerprint, Compass, Eye, 
  ShieldAlert, TrendingUp, Cpu, Layers, AlertTriangle,
  Info, Sparkles, Scale, Code2, Database,
  Binary, Gauge, X, Lightbulb, MousePointer2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { ChapterLayout } from '@/components/ChapterLayout';

// --- רכיבים פנימיים משופרים עם הנעה לפעולה ---

const VectorDNAModule = () => {
    const [word, setWord] = useState("AI");
    const vector = useMemo(() => {
        const seed = word.length || 1;
        return Array.from({ length: 8 }, (_, i) => {
            const val = (Math.sin(seed * (i + 1)) + 1) / 2;
            return parseFloat(val.toFixed(2));
        });
    }, [word]);

    return (
        <div className="bg-slate-900/60 border border-emerald-500/30 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-4 right-4 text-emerald-500/20 rotate-12 pointer-events-none"><MousePointer2 size={64}/></div>
            <div className="flex items-center gap-3 justify-end mb-4">
                <h4 className="text-emerald-400 font-black text-xl tracking-tighter">מעבדה 01: יצירת DNA וקטורי</h4>
                <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-400"><Fingerprint size={20} /></div>
            </div>
            
            <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-2xl mb-6 text-right">
                <p className="text-xs text-emerald-300 font-bold flex items-center justify-end gap-2 italic">
                    <Zap size={14}/> הוראות למפעיל:
                </p>
                <p className="text-[13px] text-slate-400 mt-1">
                    הקלד מילים בעלות אופי שונה (למשל: &quot;שמחה&quot; לעומת &quot;מחשב&quot;) וצפה כיצד חתימת המספרים של המודל משתנה בזמן אמת.
                </p>
            </div>

            <div className="bg-black/40 p-6 rounded-2xl border border-slate-800 space-y-6 relative z-10">
                <div className="text-right">
                    <input 
                        type="text" value={word} onChange={(e) => setWord(e.target.value)}
                        className="w-full bg-slate-950 border-b-2 border-emerald-500/30 py-2 text-white text-right font-mono text-xl outline-none focus:border-emerald-400 transition-colors"
                        placeholder="כתוב כאן..."
                    />
                </div>
                <div className="flex items-end justify-center gap-2 h-24">
                    {vector.map((val, i) => (
                        <motion.div key={i} animate={{ height: `${val * 100}%` }}
                            className="w-4 bg-emerald-500/40 border-t border-emerald-400 rounded-t-sm" />
                    ))}
                </div>
            </div>
        </div>
    );
};

const CosineSimilarityModule = () => {
    const [angle, setAngle] = useState(45);
    const similarity = Math.cos((angle * Math.PI) / 180).toFixed(3);

    return (
        <div className="bg-slate-900/60 border border-blue-500/30 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-md text-right">
            <h4 className="text-blue-400 font-black text-xl mb-4 flex items-center gap-2 justify-end">
                מעבדה 02: ניווט סמנטי <Compass size={20} />
            </h4>
            
            <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-2xl mb-6">
                <p className="text-xs text-blue-300 font-bold flex items-center justify-end gap-2 italic">
                    <Zap size={14}/> הוראות למפעיל:
                </p>
                <p className="text-[13px] text-slate-400 mt-1">
                    גרור את הסליידר כדי לשנות את הזווית בין שני רעיונות. שים לב כיצד ב-NLP, זווית של 0 מעידה על זהות מוחלטת בכוונות המודל.
                </p>
            </div>

            <div className="flex flex-col items-center gap-6 py-4 bg-black/40 rounded-3xl border border-slate-800">
                <div className="text-5xl font-mono font-black text-white">{similarity}</div>
                <div className="w-full px-6 space-y-4">
                    <input 
                        type="range" min="0" max="180" value={angle} onChange={(e) => setAngle(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-black">
                        <span>180° (מנוגד)</span>
                        <span>0° (זהה)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- רכיב מבחן משודרג עם משוב לכל שאלה ---
const CertificationQuiz = () => {
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [showFeedback, setShowFeedback] = useState<Record<number, boolean>>({});
    const [submitted, setSubmitted] = useState(false);
    
    const questions = [
        {
            id: 1,
            q: "מדוע המודל מתרגם טקסט ותמונות לוקטורים של מספרים?",
            options: [
                "כדי לחסוך מקום בזיכרון השרת",
                "כדי שיוכל לבצע חישובים מתמטיים כמו מרחק וזווית להבנת דמיון",
                "כדי שהמשתמשים לא יוכלו להעתיק את קוד המקור"
            ],
            correct: 1,
            explanation: "נכון מאוד! מחשבים לא מבינים 'משמעות' אנושית, הם מבינים רק פעולות חשבוניות על רשימות של מספרים (וקטורים)."
        },
        {
            id: 2,
            q: "מהי המשמעות המעשית של 'לוס' (Loss) עבור מפתח AI?",
            options: [
                "מדד לכמות הנתונים שנמחקו בטעות",
                "חישוב של זמן התגובה של ה-API",
                "מדד לשגיאה שאומר למודל כמה הוא רחוק מהמטרה ואיך להשתפר"
            ],
            correct: 2,
            explanation: "בדיוק. הלוס הוא ה'דלק' של הלמידה. ללא מדידת טעות, למודל אין דרך לדעת לאיזה כיוון לעדכן את המשקולות שלו."
        },
        {
            id: 3,
            q: "מתי נעדיף להשתמש בדמיון קוסינוס על פני מרחק אוקלידי?",
            options: [
                "בכל פעם שאנו עובדים עם קבצי Excel",
                "כשהכיוון הרעיוני חשוב לנו יותר מגודל הוקטור האבסולוטי (NLP)",
                "כשאנו רוצים שהמודל ירוץ מהר יותר על המעבד"
            ],
            correct: 1,
            explanation: "נכון. בטקסט (Embeddings), הכיוון של הוקטור מייצג את הקונספט, בעוד שהאורך יכול להשתנות בגלל אורך המשפט בלבד."
        }
    ];

    const score = Object.keys(answers).filter(id => answers[Number(id)] === questions[Number(id)-1].correct).length;

    return (
        <div className="max-w-3xl mx-auto py-24 border-t border-slate-800 mt-32">
            <div className="text-center mb-16 space-y-4">
                <div className="inline-block p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 mb-2 border border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.1)]"><Gauge size={32} /></div>
                <h3 className="text-4xl font-black text-white tracking-tight">מבחן הסמכה: פרק 1</h3>
                <p className="text-slate-400 text-sm">הפעל את האינטואיציה שצברת וענה על השאלות כדי להתקדם.</p>
            </div>

            <div className="space-y-10">
                {questions.map((q) => {
                    const isAnswered = answers[q.id] !== undefined;
                    const isCorrect = answers[q.id] === q.correct;
                    
                    return (
                        <div key={q.id} className={`bg-slate-900/40 border p-8 rounded-[2.5rem] text-right transition-all duration-500 ${isAnswered ? (isCorrect ? 'border-green-500/30 shadow-[0_0_40px_rgba(34,197,94,0.05)]' : 'border-red-500/30 shadow-[0_0_40px_rgba(239,68,68,0.05)]') : 'border-slate-800'}`}>
                            <p className="text-white font-bold text-lg mb-6 leading-tight">{q.q}</p>
                            <div className="grid gap-3">
                                {q.options.map((opt, oIdx) => (
                                    <button 
                                        key={oIdx} 
                                        onClick={() => {
                                            if (!submitted) {
                                                setAnswers({...answers, [q.id]: oIdx});
                                                setShowFeedback({...showFeedback, [q.id]: true});
                                            }
                                        }}
                                        className={`p-4 rounded-2xl text-right transition-all border text-sm cursor-pointer relative overflow-hidden group
                                            ${answers[q.id] === oIdx 
                                                ? (oIdx === q.correct ? 'border-green-500 bg-green-500/10 text-white' : 'border-red-500 bg-red-500/10 text-white') 
                                                : 'border-slate-800 bg-black/20 text-slate-400 hover:border-slate-600'}`}
                                        disabled={submitted}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{opt}</span>
                                            {answers[q.id] === oIdx && (oIdx === q.correct ? <Check size={18} className="text-green-400"/> : <X size={18} className="text-red-400"/>)}
                                        </div>
                                    </button>
                                ))}
                            </div>
                            
                            <AnimatePresence>
                                {showFeedback[q.id] && (
                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`mt-6 p-5 rounded-2xl border flex items-start gap-3 justify-end ${isCorrect ? 'bg-green-500/5 border-green-500/20 text-green-400/90' : 'bg-red-500/5 border-red-500/20 text-red-400/90'}`}>
                                        <div className="text-sm font-medium leading-relaxed italic">{isCorrect ? q.explanation : "לא בדיוק. נסה לחשוב שוב על הצורך של המחשב לתרגם משמעות לשפה שהוא מכיר - מספרים."}</div>
                                        <Lightbulb size={18} className="shrink-0 mt-1"/>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
            
            <div className="mt-16 text-center">
                {!submitted ? (
                    <Button 
                        onClick={() => setSubmitted(true)} 
                        disabled={Object.keys(answers).length < 3}
                        className="h-16 px-16 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-black text-xl shadow-2xl shadow-indigo-500/20 cursor-pointer disabled:opacity-30 transition-all"
                    >
                        סיום והסמכה
                    </Button>
                ) : (
                    <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="p-10 bg-slate-900 border-2 border-indigo-500/30 rounded-[3rem] shadow-3xl">
                        <div className="mb-6">
                            <span className="text-slate-500 uppercase tracking-widest text-[10px] font-black">Final Score</span>
                            <div className="text-6xl font-black text-white">{Math.round((score/3)*100)}%</div>
                        </div>
                        {score === 3 ? (
                            <Link href="/math/mathProbabilistic/chapter-2">
                                <Button className="h-16 px-12 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold cursor-pointer gap-3 text-lg transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-emerald-500/20">
                                    מעולה! המשך לפרק 2 <ChevronLeft size={22}/>
                                </Button>
                            </Link>
                        ) : (
                            <Button onClick={() => {setSubmitted(false); setAnswers({}); setShowFeedback({});}} className="h-14 px-10 bg-red-600/20 text-red-400 rounded-full font-bold cursor-pointer border border-red-500/20 hover:bg-red-600/30 transition-all">
                                נסה שוב - נדרשים 100% למעבר
                            </Button>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default function ChapterOne() {
  return (
    <ChapterLayout courseId="mathProbabilistic" currentChapterId={1}>
        
        {/* פתיחה דרמטית (תוכן מקורי) */}
        <section className="relative pt-16 pb-20 text-right">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto px-4">
                <div className="flex items-center gap-3 justify-end mb-8">
                    <span className="bg-emerald-500/10 text-emerald-400 px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border border-emerald-500/20">Learning Protocol: Alpha</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tighter leading-tight">
                    המתמטיקה היא המנוע, <br/>
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-emerald-400 to-indigo-500">לא הקישוט</span>
                </h1>
                
                <div className="prose prose-invert text-slate-300 text-base max-w-3xl ml-auto leading-relaxed space-y-6">
                    <p className="border-r-4 border-emerald-500 pr-6 py-2 bg-emerald-500/5 rounded-l-2xl font-medium italic">
                        &quot;יש משפט שמסתובב כבר שנים בעולם הפיתוח: AI זה מתמטיקה. אבל כשאתה עובד עם מודלים ביום יום, זה בכלל לא מרגיש ככה.&quot;
                    </p>
                    <p>
                        אתה שולח שאילתה, מחכה רגע, מקבל תשובה. אין משוואות על המסך. אבל בתוך המודל – הכל נעלם. לא נשארת שפה, לא נשארת תמונה. הכל מתורגם לצורה אחת בלבד: <strong>מספרים</strong>.
                    </p>
                </div>
            </motion.div>
        </section>

        {/* שלב 1: וקטורים + מעבדה */}
        <section className="py-24 border-t border-slate-800/50 text-right">
            <div className="max-w-5xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div className="space-y-8 order-2 lg:order-1">
                        <div className="flex items-center gap-4 justify-end">
                            <h2 className="text-3xl font-black text-white tracking-tight text-right">וקטורים: ה-DNA של המשמעות</h2>
                            <Cpu className="text-emerald-500" size={32} />
                        </div>
                        <div className="prose prose-invert text-slate-300 text-[15px] leading-relaxed space-y-6">
                            <p>
                                המודל מקבל <strong>וקטור</strong> – רשימה של מספרים שמייצגים משמעות. משפט אחד יקבל וקטור מסוים, ומשפט אחר יקבל וקטור אחר.
                            </p>
                            <p>
                                כשאתה מבין איך מודל רואה מידע, אתה מבין למה משפטים דומים מקבלים תחזיות דומות, ולמה &quot;רעש&quot; בנתונים מרסק ביצועים.
                            </p>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2">
                        <VectorDNAModule />
                    </div>
                </div>
            </div>
        </section>

        {/* שלב 2: גיאומטריה ומרחקים + מעבדה */}
        <section className="py-24 bg-slate-950/40 text-right">
            <div className="max-w-5xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        <CosineSimilarityModule />
                    </div>
                    <div className="space-y-8 order-1 lg:order-2">
                        <div className="flex items-center gap-4 justify-end">
                            <h2 className="text-3xl font-black text-white tracking-tight">הגיאומטריה של הדמיון</h2>
                            <Compass className="text-blue-500" size={32} />
                        </div>
                        <div className="prose prose-invert text-slate-300 text-[15px] leading-relaxed space-y-6">
                            <p>
                                כדי להבין מה דומה למה, המודל צריך מדד מספרי. כאן נכנסות לתמונה <strong>הנורמות</strong> (גודל הוקטור) ו<strong>המרחקים</strong>.
                            </p>
                            <p>
                                דמיון אמיתי בין שני וקטורים נקבע לפי הכיוון שלהם. אם שני משפטים מצביעים לאותו כיוון (גם אם הם רחוקים), זווית קטנה ביניהם מספרת למודל: &quot;זה דומה במהות&quot;.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* שלב 3: לוס וצמצום טעות */}
        <section className="py-24 border-t border-slate-800/50 text-right">
            <div className="max-w-5xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div className="space-y-8 order-2 lg:order-1">
                        <div className="flex items-center gap-4 justify-end">
                            <h2 className="text-3xl font-black text-white tracking-tighter">לוס: הדלק שמניע למידה</h2>
                            <AlertTriangle className="text-red-500" size={32} />
                        </div>
                        <div className="prose prose-invert text-slate-300 text-[15px] leading-relaxed space-y-6">
                            <p>
                                מודלים לא לומדים מ״הצלחה״. הם לומדים מטעויות. ה-<strong>Loss</strong> הוא הפער בין התחזית למציאות.
                            </p>
                            <p>
                                נניח שהמודל מנבא 30, אבל הערך האמיתי הוא 35. המודל רואה את הסטייה הזו, מפרש אותה כטעות, ומשתמש בה כדי לכוון מחדש את ההתנהגות שלו.
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden order-1 lg:order-2">
                        <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50 opacity-20 animate-pulse"></div>
                        <h5 className="text-slate-500 font-mono text-[10px] uppercase mb-4 tracking-widest italic">Simulation Context: Numeric Regression</h5>
                         <div className="font-mono text-sm text-red-400 bg-black/60 p-6 rounded-xl border border-slate-800 mb-6 text-left" dir="ltr">
                            y_true = np.array([<span className="text-white">35</span>])<br/>
                            y_pred = np.array([<span className="text-white">30</span>])<br/><br/>
                            error = y_true - y_pred<br/>
                            <span className="text-slate-500"># Output: 5 (The mistake fuel)</span>
                         </div>
                    </div>
                </div>
            </div>
        </section>

        {/* בוחן סופי */}
        <CertificationQuiz />

    </ChapterLayout>
  );
}