"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Brain, ScanFace, FileText, UserCircle, MoveRight, Layers, Sparkles, Check, X, Code, Hash, Palette } from "lucide-react";
import { CourseSidebar } from "@/components/CourseSidebar";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';

// --- רכיבים ויזואליים פנימיים ---

// 1. מעבדת וקטורים: תרגום אובייקטים למספרים
const VectorizationLab = () => {
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'user'>('text');

  // דוגמאות לנתונים
  const data = {
    text: {
        input: "המבורגר",
        vector: [0.12, 0.83, 1.44, -0.5, 0.21],
        desc: "משמעות: אוכל, שומן, מסעדה, טעם"
    },
    image: {
        input: "Pixel (RGB)",
        vector: [255, 0, 0, 128, 64],
        desc: "צבעים: אדום חזק, ירוק אפס, כחול אפס"
    },
    user: {
        input: "User Profile",
        vector: [3.1, 0.8, 12.4, 0.02, 5.0],
        desc: "התנהגות: ביקורים, זמן שהייה, קליקים"
    }
  };

  const current = data[activeTab];

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col gap-8 relative overflow-hidden group">
      <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors duration-500"></div>
      
      <div className="flex gap-4 border-b border-slate-800 pb-4 z-10 relative">
          <button onClick={() => setActiveTab('text')} className={`flex items-center gap-2 px-3 py-1 rounded text-sm transition-all ${activeTab === 'text' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
              <FileText size={16} /> מילה
          </button>
          <button onClick={() => setActiveTab('image')} className={`flex items-center gap-2 px-3 py-1 rounded text-sm transition-all ${activeTab === 'image' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}>
              <Palette size={16} /> פיקסל
          </button>
          <button onClick={() => setActiveTab('user')} className={`flex items-center gap-2 px-3 py-1 rounded text-sm transition-all ${activeTab === 'user' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}>
              <UserCircle size={16} /> משתמש
          </button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 z-10 relative">
          
          {/* Input Side */}
          <div className="flex flex-col items-center gap-4 w-1/3">
              <div className="w-24 h-24 bg-slate-950 rounded-2xl border border-slate-700 flex items-center justify-center text-3xl shadow-xl">
                  {activeTab === 'text' ? '🍔' : activeTab === 'image' ? <div className="w-16 h-16 bg-red-500 rounded-lg shadow-[0_0_20px_rgba(239,68,68,0.6)]"></div> : '👤'}
              </div>
              <div className="text-sm font-bold text-slate-300">{current.input}</div>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center text-slate-500 gap-2">
              <span className="text-[10px] uppercase tracking-wider">Embedding</span>
              <MoveRight size={32} className="animate-pulse text-blue-500" />
          </div>

          {/* Vector Side */}
          <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-6 relative font-mono w-full">
              <div className="absolute top-0 right-0 px-3 py-1 bg-slate-900 text-[10px] text-slate-500 rounded-bl-xl border-l border-b border-slate-800">
                  Vector Representation
              </div>
              <div className="text-blue-400 text-lg mb-2 tracking-widest">
                  [ {current.vector.join(', ')}, ... ]
              </div>
              <p className="text-xs text-slate-500 mt-2 border-t border-slate-800 pt-2">
                  {current.desc}
              </p>
          </div>
      </div>
    </div>
  )
}

// 2. המרחב הסמנטי (Semantic Space Visualization)
const SemanticSpace = () => {
    // מילים ומיקומן במרחב (דמיוני)
    const words = [
        { text: "מלך", x: 20, y: 20, type: "royal" },
        { text: "מלכה", x: 25, y: 25, type: "royal" },
        { text: "נסיך", x: 15, y: 30, type: "royal" },
        
        { text: "המבורגר", x: 80, y: 80, type: "food" },
        { text: "פיצה", x: 85, y: 75, type: "food" },
        { text: "צ'יפס", x: 75, y: 85, type: "food" },

        { text: "מחשב", x: 20, y: 80, type: "tech" },
        { text: "מקלדת", x: 25, y: 85, type: "tech" },
    ];

    return (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 h-75 relative overflow-hidden mt-8">
            <div className="absolute top-4 right-4 text-xs text-slate-500 flex items-center gap-2">
                <Brain size={14} /> המרחב הסמנטי (Semantic Space)
            </div>
            
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px]"></div>

            {words.map((w, i) => {
                let color = "bg-slate-500";
                if (w.type === "royal") color = "bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]";
                if (w.type === "food") color = "bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]";
                if (w.type === "tech") color = "bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]";

                return (
                    <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, x: 0, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="absolute flex flex-col items-center gap-1 cursor-pointer hover:scale-110 transition-transform z-10"
                        style={{ left: `${w.x}%`, top: `${w.y}%` }}
                    >
                        <div className={`w-3 h-3 rounded-full ${color}`}></div>
                        <span className="text-[10px] text-slate-300 bg-slate-900/80 px-1 rounded">{w.text}</span>
                    </motion.div>
                )
            })}

            {/* Connecting Line Example */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <line x1="20%" y1="20%" x2="25%" y2="25%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
        </div>
    )
}

// --- העמוד הראשי ---

export default function ChapterFive() {
  return (
    <div className="flex min-h-screen bg-[#020617] font-sans text-slate-100 selection:bg-blue-500/30" dir="rtl">
      
      <CourseSidebar />

      <div className="flex-1 h-screen overflow-y-auto custom-scrollbar scroll-smooth">
        
        {/* HEADER */}
        <header className="py-8 px-8 md:px-12 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
             <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs text-blue-400 font-bold mb-1 tracking-wider">
                        <span className="bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">פרק 5</span>
                        <ChevronLeft size={10} />
                        <span>וקטורים למפתחים</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">
                        וקטורים – הלב של כל מודל
                    </h1>
                </div>
                <p className="text-sm text-slate-400 max-w-sm leading-relaxed md:text-right border-r-2 border-slate-800 pr-4 hidden md:block">
                    AI לא עובד על תוכן. הוא עובד על רשימות של מספרים שמייצגות תוכן.
                </p>
             </div>
        </header>

        <main className="max-w-4xl mx-auto px-8 md:px-12 py-12 space-y-24 pb-48">
          
          {/* סעיף 1: איך אובייקט הופך לוקטור */}
          <section id="part-1" className="scroll-mt-24">
            <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Hash size={20} /></div>
                    <h2 className="text-2xl font-bold text-white">1. איך מציגים אובייקט כסדרה של מספרים?</h2>
                </div>
                
                <div className="prose prose-invert text-slate-400 text-base leading-relaxed max-w-none space-y-4">
                    <p>
                        אם יש משהו אחד שמשנה את הדרך שבה מפתח מבין AI, זה הרעיון שכל אובייקט בעולם – טקסט, תמונה, משתמש – יכול להפוך לוקטור.
                        <strong>וקטור הוא פשוט רשימה של מספרים.</strong>
                    </p>
                    <p>
                        למשל: <code>[0.2, 1.7, 3.4]</code>.
                        למה זה מעניין? כי זה הדרך היחידה שבה המודל יכול &quot;לראות&quot; דברים.
                        אי אפשר לתת למודל תמונה ישירות. צריך לתרגם אותה למספרים.
                    </p>
                </div>
            </div>

            <VectorizationLab />

          </section>


          {/* סעיף 2: למה דווקא וקטורים? */}
          <section id="part-2" className="scroll-mt-24">
            <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Layers size={20} /></div>
                    <h2 className="text-2xl font-bold text-white">2. למה כמעט כל AI עובד על וקטורים?</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                            <Sparkles size={16} className="text-yellow-400"/> מדידת דמיון
                        </h4>
                        <p className="text-sm text-slate-400">
                            כדי להבין ש&quot;חתול&quot; ו&quot;גור&quot; קרובים, המודל צריך למדוד מרחק. 
                            על וקטורים אפשר לעשות מתמטיקה: לחשב מרחק, זווית ודמיון.
                        </p>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                            <Code size={16} className="text-green-400"/> יעילות חישובית
                        </h4>
                        <p className="text-sm text-slate-400">
                            מעבדים מודרניים (GPU) בנויים לטחון וקטורים. הם יכולים לבצע מיליארדי פעולות כפל וחיבור בשנייה.
                        </p>
                    </div>
                </div>
            </div>
          </section>


          {/* סעיף 3: המרחב הסמנטי */}
          <section id="part-3" className="scroll-mt-24">
             <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><Brain size={20} /></div>
                    <h2 className="text-2xl font-bold text-white">3. הוקטור כמשמעות (Embeddings)</h2>
                </div>
                <div className="prose prose-invert text-slate-400 text-base leading-relaxed max-w-none">
                    <p>
                        הקסם האמיתי קורה כשהמודל לומד לסדר את הוקטורים במרחב לפי המשמעות שלהם.
                        מילים בעלות משמעות דומה יקבלו וקטורים קרובים מתמטית.
                    </p>
                    <p>
                        במרחב הזה, המרחק בין &quot;מלך&quot; ל&quot;מלכה&quot; הוא קטן מאוד, והמרחק בינם לבין &quot;המבורגר&quot; הוא עצום.
                        המודל לא מבין עברית – הוא מבין גיאומטריה.
                    </p>
                </div>
            </div>

            <SemanticSpace />

          </section>


          {/* סעיף 4: תהליך ההמרה בפועל */}
          <section id="part-4" className="scroll-mt-24 bg-slate-900/40 border border-slate-800 rounded-2xl p-8 relative overflow-hidden">
             <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-950 rounded-lg border border-slate-800"><ScanFace className="text-yellow-400" size={20} /></div>
                    <h2 className="text-2xl font-bold text-white">4. איך הופכים מידע לוקטור?</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ProcessCard title="טקסט" desc="לכל מילה יש וקטור משמעות. מילים בהקשר דומה מקבלות מספרים דומים." color="blue" />
                    <ProcessCard title="תמונה" desc="המודל סורק קווים, צבעים וצורות, וממיר אותם לרשימת מאפיינים." color="red" />
                    <ProcessCard title="משתמש" desc="היסטוריית הפעולות הופכת לוקטור התנהגות שמאפשר המלצות." color="green" />
                </div>
             </div>
          </section>


          {/* Quiz */}
          <section id="quiz" className="mt-16 pt-8 border-t border-slate-800">
             <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">בדיקת הבנה: סיכום פרק 5</h2>
                <p className="text-slate-400 text-sm">האם תפסת את כוחם של הוקטורים?</p>
             </div>
             <ChapterFiveQuiz />
          </section>

        </main>
      </div>
    </div>
  );
}


// --- קומפוננטות עזר ---

interface ProcessCardProps {
    title: string;
    desc: string;
    color: string;
}

function ProcessCard({ title, desc, color }: ProcessCardProps) {
    const colors: Record<string, string> = {
        blue: "border-blue-500/30 bg-blue-500/10 text-blue-400",
        red: "border-red-500/30 bg-red-500/10 text-red-400",
        green: "border-green-500/30 bg-green-500/10 text-green-400",
    };

    return (
        <div className={`p-5 rounded-xl border ${colors[color]} relative`}>
            <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{desc}</p>
        </div>
    )
}

function ChapterFiveQuiz() {
    const [answers, setAnswers] = useState<Record<number, number>>({});
    
    const questions = [
        {
            id: 1,
            text: "מהו וקטור בהקשר של AI?",
            options: [
                { id: 1, text: "חץ שמצביע לכיוון מסוים" },
                { id: 2, text: "רשימה מסודרת של מספרים שמייצגת אובייקט", correct: true },
                { id: 3, text: "סוג של וירוס מחשב" }
            ]
        },
        {
            id: 2,
            text: "למה משתמשים בוקטורים לייצוג מילים?",
            options: [
                { id: 1, text: "כדי לאפשר חישוב מתמטי של דמיון ומשמעות", correct: true },
                { id: 2, text: "כי זה חוסך מקום בזיכרון" },
                { id: 3, text: "כדי להצפין את המידע" }
            ]
        },
        {
            id: 3,
            text: "מה קורה לוקטורים של מילים דומות (כמו 'כלב' ו'חתול')?",
            options: [
                { id: 1, text: "הם יהיו רחוקים מאוד זה מזה" },
                { id: 2, text: "הם יהיו קרובים במרחב הוקטורי", correct: true },
                { id: 3, text: "הם יהיו זהים לחלוטין" }
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
                        <Link href="/chapter-6">
                            <Button size="lg" className="h-14 px-10 text-base bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full shadow-[0_0_40px_rgba(37,99,235,0.5)] border-t border-blue-400/30 hover:scale-105 transition-transform">
                                <span className="font-bold">המשך לפרק 6: מרחקים</span> <ChevronLeft className="mr-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}