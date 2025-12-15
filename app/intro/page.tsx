"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Terminal, BookOpen, Quote, Check, X, ChevronLeft, Lightbulb } from "lucide-react";
import { CourseSidebar } from "@/components/CourseSidebar";
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";

export default function IntroPage() {
  return (
    <div className="flex min-h-screen bg-[#020617] font-sans text-slate-100 selection:bg-blue-500/30" dir="rtl">
      
      <CourseSidebar />

      <div className="flex-1 h-screen overflow-y-auto relative custom-scrollbar scroll-smooth">
        
        {/* --- COMPACT HEADER (כמו בפרקים 1 ו-2) --- */}
        <header className="py-8 px-8 md:px-12 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
             <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs text-blue-400 font-bold mb-1 tracking-wider">
                        <span className="bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">מבוא</span>
                        <ChevronLeft size={10} />
                        <span>ברוכים הבאים</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">
                        מתמטיקה אינטואיטיבית למתכנתים לעידן ה-AI
                    </h1>
                </div>
                <p className="text-sm text-slate-400 max-w-sm leading-relaxed md:text-right border-r-2 border-slate-800 pr-4 hidden md:block">
                    הספר הזה לא מנסה להפוך אותך למתמטיקאי, אלא לתת לך שליטה במודלים שאתה בונה.
                </p>
             </div>
        </header>

        <main className="relative z-10 max-w-4xl mx-auto p-8 md:p-12 pb-32 space-y-24">
          
          {/* --- סעיף 1: הבעיה --- */}
          <section className="scroll-mt-24">
            <div className="relative bg-slate-900/40 border border-slate-800 rounded-3xl p-8 md:p-10 backdrop-blur-sm overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full group-hover:bg-blue-500/20 transition-all"></div>
                
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Quote className="text-blue-500 rotate-180" size={24} />
                    מה באמת קורה מאחורי הוילון?
                </h2>
                
                <div className="prose prose-invert text-slate-400 text-base leading-relaxed max-w-none space-y-4">
                    <p>
                        כשנכנסים לעולם של בינה מלאכותית, יש רגע מסוים שבו מרגישים שכל התהליך קורה מאחורי &quot;וילון סגור&quot;. 
                        אנחנו מורידים מודל מ-Hugging Face, מחברים לו API, והוא מייצר תוצאות מרשימות. אבל הדרך שבה הוא הגיע לתוצאות האלו נראית מסתורית, כמעט כמו כישוף.
                    </p>
                    <p>
                        התחושה הזו לא מגיעה בגלל שהחומר קשה מדי. היא מגיעה בגלל <strong>פער שפה</strong>.
                        אנחנו רגילים לחשוב שמתמטיקה שייכת לאקדמיה, למחברות משובצות ולמבחנים. אנחנו לא רגילים לחשוב עליה כעל כלי עבודה יומיומי של מתכנת.
                    </p>
                    <div className="bg-slate-950/50 p-4 border-r-4 border-purple-500 rounded-r text-slate-300 mt-4">
                        <strong className="text-white block mb-1">המציאות שונה לגמרי.</strong>
                        מאחורי כל מודל AI, מתוחכם ככל שיהיה, עומדים רעיונות פשוטים ואינטואיטיביים: מרחק, כיוון, שינוי וסיכוי. ברגע שמבינים אותם, הוילון נפתח.
                    </div>
                </div>
            </div>
          </section>


          {/* --- סעיף 2: הפתרון (השפה החדשה) --- */}
          <section>
            <div className="flex items-center gap-4 mb-8">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Lightbulb size={20} /></div>
                <div>
                    <h2 className="text-2xl font-bold text-white">השפה החדשה שלך</h2>
                    <p className="text-slate-400 text-sm">אנחנו הולכים לפרק את המושגים המפחידים לרכיבים שאתה כבר מכיר.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ConceptCard 
                    title="אבני הבניין"
                    content="במקום נוסחאות אינסופיות, נתמקד במושגים: ממוצע (המרכז), שונות (הרעש), ווקטורים (המידע)."
                    icon={<Brain className="text-fuchsia-400" />}
                />
                <ConceptCard 
                    title="שינוי תפיסה"
                    content="טקסט הוא כבר לא רצף של תווים, אלא נקודה במרחב. ברגע שהשינוי הזה קורה בראש, הכל נראה אחרת."
                    icon={<Sparkles className="text-amber-400" />}
                />
                <ConceptCard 
                    title="הקוד הוא המלך"
                    content="אנחנו לא נפתור משוואות על דף. אנחנו נראה איך Python ו-NumPy עושים את העבודה השחורה בשבילנו."
                    icon={<Terminal className="text-blue-400" />}
                />
                <ConceptCard 
                    title="חיבור לפרקטיקה"
                    content="כל מושג מתמטי ילווה מיד בדוגמה מהעולם האמיתי: זיהוי ספאם, המלצת מוצרים, או ניתוח תמונות."
                    icon={<BookOpen className="text-emerald-400" />}
                />
            </div>
          </section>


          {/* --- סעיף 3: ההבטחה וחידון --- */}
          <section id="quiz-section" className="mt-16 pt-8 border-t border-slate-800">
             <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-white mb-2">מוכן לצאת לדרך?</h2>
                <p className="text-slate-400 text-sm max-w-xl mx-auto">
                    לפני שצוללים לפרק הראשון, בוא נוודא שאנחנו מתחילים מאותה נקודת מוצא. ענה על 3 שאלות קצרות כדי לפתוח את הקורס.
                </p>
             </div>
             
             <IntroQuiz />
          </section>

        </main>
      </div>
    </div>
  );
}

// --- Helper Components ---

function ConceptCard({ title, content, icon }: { title: string, content: string, icon: React.ReactNode }) {
    return (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:bg-slate-800/80 hover:border-slate-700 transition-all duration-300 group">
            <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 group-hover:scale-110 transition-transform duration-300 shrink-0 shadow-lg">
                    {icon}
                </div>
                <div>
                    <h4 className="text-lg font-bold text-slate-200 mb-2">{title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        {content}
                    </p>
                </div>
            </div>
        </div>
    );
}

// --- Quiz Component ---
function IntroQuiz() {
    const [answers, setAnswers] = useState<Record<number, number>>({});

    const questions = [
        {
            id: 1,
            text: "מהי הסיבה העיקרית לתחושה ש-AI הוא \"קופסה שחורה\"?",
            options: [
                { id: 1, text: "האלגוריתמים סודיים ואף אחד לא מכיר אותם" },
                { id: 2, text: "יש פער בהבנת השפה המתמטית הבסיסית", correct: true },
                { id: 3, text: "המחשבים חושבים מהר מדי לבני אדם" }
            ]
        },
        {
            id: 2,
            text: "מהי המטרה העיקרית של הספר הזה?",
            options: [
                { id: 1, text: "ללמד אותך לכתוב ספריות Python מאפס" },
                { id: 2, text: "לתת אינטואיציה מתמטית מעשית למפתחים", correct: true },
                { id: 3, text: "להכין אותך למבחן באוניברסיטה" }
            ]
        },
        {
            id: 3,
            text: "איך המודל רואה את העולם בסופו של דבר?",
            options: [
                { id: 1, text: "כאוסף של מספרים (וקטורים)", correct: true },
                { id: 2, text: "הוא קורא טקסט כמו בן אדם" },
                { id: 3, text: "הוא משתמש במילון מוגדר מראש" }
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
        <div className="space-y-6 max-w-2xl mx-auto text-right">
            {questions.map((q) => (
                <div key={q.id} className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
                    <h4 className="font-bold text-white mb-4 text-sm flex items-center gap-2">
                        <span className="bg-slate-800 text-slate-400 w-6 h-6 rounded flex items-center justify-center text-xs">{q.id}</span>
                        {q.text}
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                        {q.options.map((opt) => {
                            const isSelected = answers[q.id] === opt.id;
                            const isCorrect = opt.correct;
                            
                            let btnClass = "w-full text-right px-4 py-3 rounded-lg border transition-all text-xs flex items-center justify-between group ";
                            
                            if (isSelected) {
                                if (isCorrect) btnClass += "bg-green-500/10 border-green-500/50 text-green-300";
                                else btnClass += "bg-red-500/10 border-red-500/50 text-red-300";
                            } else {
                                btnClass += "bg-slate-900 border-slate-800 hover:bg-slate-800 hover:border-blue-500/30 text-slate-300";
                            }

                            return (
                                <button 
                                    key={opt.id}
                                    onClick={() => handleSelect(q.id, opt.id)}
                                    className={btnClass}
                                >
                                    <span>{opt.text}</span>
                                    {isSelected && (isCorrect ? <Check size={16} className="text-green-400" /> : <X size={16} className="text-red-400" />)}
                                </button>
                            )
                        })}
                    </div>
                </div>
            ))}

            <AnimatePresence>
                {allCorrect && Object.keys(answers).length === 3 && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="sticky bottom-8 z-50 flex justify-center pt-8"
                    >
                        <Link href="/chapter-1">
                            <Button size="lg" className="h-16 px-12 text-lg bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full shadow-[0_0_50px_rgba(37,99,235,0.5)] border-t border-blue-400/30 hover:scale-105 transition-transform group">
                                <div className="text-center">
                                    <div className="font-bold flex items-center gap-2 justify-center">
                                        <Sparkles className="text-yellow-300" size={20} />
                                        כל התשובות נכונות!
                                    </div>
                                    <div className="text-xs text-blue-100 opacity-90 mt-1 font-normal">
                                        בוא נצלול לפרק הראשון
                                    </div>
                                </div>
                                <ChevronLeft size={20} className="mr-4 group-hover:-translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}