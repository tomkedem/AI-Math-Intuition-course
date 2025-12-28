"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, RotateCcw, Award, AlertCircle, Lightbulb } from "lucide-react";

export const ChapterQuiz = () => {
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const questions = [
        {
            id: 1,
            q: "מדוע המודל מתרגם טקסט ותמונות לוקטורים של מספרים?",
            options: [
                "כדי לחסוך מקום בזיכרון השרת ולהאיץ את המערכת",
                "כדי לבצע חישובים גיאומטריים של מרחק וזווית להבנת דמיון",
                "כדי להצפין את המידע ולהגן עליו מפני האקרים"
            ],
            correct: 1,
            explanation: "מחשבים לא מבינים שפה. הפיכת מידע לוקטורים מאפשרת למודל למדוד כמה מושגים קרובים זה לזה במרחב מתמטי."
        },
        {
            id: 2,
            q: "מה המשמעות של 'דמיון קוסינוס' (Cosine Similarity) שקרוב ל-1.0?",
            options: [
                "שהוקטורים מצביעים לכיוונים הפוכים לגמרי",
                "שיש שגיאה קריטית בנתונים שהוזנו",
                "שיש דמיון רעיוני גבוה מאוד והוקטורים מצביעים לאותו כיוון"
            ],
            correct: 2,
            explanation: "קוסינוס 1.0 מעיד על זווית אפס בין הוקטורים - הם מצביעים לאותה נקודה רעיונית במרחב."
        },
        {
            id: 3,
            q: "מהו תפקידו המרכזי של ה'לוס' (Loss) בתהליך הלמידה?",
            options: [
                "מדד לגודל הטעות שמנחה את המודל איך לתקן את עצמו",
                "כלי למחיקת נתונים ישנים מהזיכרון לטובת חדשים",
                "מדד לבדיקת המהירות שבה המודל מייצר תשובה"
            ],
            correct: 0,
            explanation: "הלוס הוא ה'מצפן' של המודל. הוא מודד את הפער בין הניבוי לאמת, ודוחף את המודל להשתפר."
        }
    ];

    const score = Object.entries(answers).reduce((acc, [qId, ansIdx]) => {
        return questions[Number(qId) - 1].correct === ansIdx ? acc + 1 : acc;
    }, 0);

    const allCorrect = score === questions.length;

    if (isSubmitted) {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto p-16 rounded-[2.5rem] bg-slate-900/40 border border-slate-800 text-right backdrop-blur-sm"
                dir="rtl"
            >
                {allCorrect ? (
                    <div className="space-y-8 w-full text-right">
                        <div className="w-20 h-20 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-8 mr-0">
                            <Award size={40} />
                        </div>
                        <h2 className="text-5xl font-black text-white leading-tight">הסמכה הושלמה בהצלחה</h2>
                        <p className="text-xl text-slate-400 font-medium">
                            מצוין. השגת ציון מושלם ({score}/{questions.length}). הבנת את ארבע אבני היסוד של ה-AI.
                        </p>
                        <div className="pt-10 flex justify-start">
                            <button className="px-10 py-5 bg-white text-black font-bold rounded-2xl flex items-center gap-3 hover:bg-slate-200 transition-all cursor-pointer">
                                המשך לפרק 2 <ArrowRight size={20} className="rotate-180" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8 w-full text-right">
                        <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 mb-8 mr-0">
                            <AlertCircle size={40} />
                        </div>
                        <h2 className="text-4xl font-black text-white">נדרש ריענון פקודות</h2>
                        <p className="text-xl text-slate-400">
                            הציון שלך הוא {score}/{questions.length}. כדי להבטיח בסיס מתמטי איתן, עליך להשיג ציון מושלם.
                        </p>
                        <button 
                            onClick={() => { setIsSubmitted(false); setAnswers({}); }}
                            className="mt-8 px-10 py-5 bg-slate-800 text-white font-bold rounded-2xl flex items-center gap-3 hover:bg-slate-700 transition-all cursor-pointer"
                        >
                             נסה שוב <RotateCcw size={20} />
                        </button>
                    </div>
                )}
            </motion.div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto px-6 text-right" dir="rtl">
            <header className="mb-24 w-full">
                <div className="inline-block px-4 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-slate-500 mb-6 tracking-widest">FINAL ASSESSMENT 01</div>
                <h3 className="text-5xl font-black text-white tracking-tighter mb-4">בוחן הסמכה לפרק 1</h3>
                <p className="text-slate-400 text-xl font-medium">הוכח שליטה בארבע אבני היסוד של ה-AI</p>
            </header>

            <div className="space-y-12 w-full">
                {questions.map((q, qIdx) => (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                        key={q.id} 
                        className="bg-white/[0.02] border border-white/[0.05] p-12 rounded-[2rem] text-right group"
                    >
                        <div className="flex flex-row-reverse items-start gap-6 mb-12 w-full text-right">
                            <span className="text-lg font-mono text-slate-600 mt-1">0{q.id}</span>
                            <p className="text-2xl font-bold text-white leading-[1.3] flex-1 text-right">{q.q}</p>
                        </div>

                        <div className="grid gap-3 w-full">
                            {q.options.map((opt, oIdx) => (
                                <button 
                                    key={oIdx} 
                                    disabled={answers[q.id] !== undefined}
                                    onClick={() => setAnswers({...answers, [q.id]: oIdx})}
                                    className={`w-full p-6 rounded-2xl text-right transition-all border-2 flex flex-row-reverse items-center justify-between cursor-pointer ${
                                        answers[q.id] === oIdx 
                                        ? (oIdx === q.correct ? 'border-emerald-500/50 bg-emerald-500/10 text-white' : 'border-red-500/50 bg-red-500/10 text-white') 
                                        : 'border-white/5 bg-white/[0.02] text-slate-400 hover:border-white/20'
                                    }`}
                                >
                                    <span className="text-lg font-medium flex-1 text-right">{opt}</span>
                                    <div className="mr-4 shrink-0">
                                        {answers[q.id] === oIdx && (oIdx === q.correct ? <Check size={24} className="text-emerald-500" /> : <X size={24} className="text-red-500" />)}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <AnimatePresence>
                            {answers[q.id] !== undefined && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                    className={`mt-10 p-8 rounded-2xl border flex flex-row-reverse items-start gap-6 text-right ${answers[q.id] === q.correct ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400/90' : 'bg-red-500/5 border-red-500/10 text-red-400/90'}`}
                                >
                                    <Lightbulb size={24} className="shrink-0 mt-1 opacity-60" />
                                    <p className="text-lg leading-relaxed font-medium italic text-right flex-1">{q.explanation}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {Object.keys(answers).length === 3 && (
                <div className="mt-24 pb-20 w-full text-right flex justify-end">
                    <button 
                        onClick={() => setIsSubmitted(true)}
                        className="px-16 py-6 bg-white text-black text-xl font-black rounded-2xl hover:bg-slate-200 transition-all cursor-pointer"
                    >
                        שלח תשובות להערכה
                    </button>
                </div>
            )}
        </div>
    );
};