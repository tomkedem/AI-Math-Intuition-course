"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Activity, BarChart3, Calculator, Brain, Terminal, Users, TrendingUp, Check, X } from "lucide-react";
import { CourseSidebar } from "@/components/CourseSidebar";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';

// --- רכיבים ויזואליים פנימיים (Mean/Median & StdDev) ---

// 1. המחשה: ממוצע מול חציון (הטיית המיליונר)
const MeanMedianLab = () => {
  const [hasOutlier, setHasOutlier] = useState(false);
  
  // נתונים בסיסיים: 5 עובדים שמרוויחים 10K-12K
  const baseData = [10, 10, 11, 12, 10];
  // נתונים עם חריג: מוסיפים מנכ"ל שמרוויח 100K
  const currentData = hasOutlier ? [...baseData, 100] : baseData;

  // חישובים
  const sum = currentData.reduce((a, b) => a + b, 0);
  const mean = sum / currentData.length;
  
  const sorted = [...currentData].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col gap-8 relative overflow-hidden group">
      <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors duration-500"></div>
      
      <div className="flex flex-col md:flex-row gap-8 items-center justify-between z-10">
          
          {/* גרף עמודות פשוט */}
          <div className="flex items-end gap-2 h-40 w-full max-w-md border-b border-slate-700 pb-2 px-4 relative">
             {currentData.map((val, i) => {
                 const isOutlier = val === 100;
                 return (
                    <motion.div 
                        key={i}
                        layout
                        initial={{ height: 0 }}
                        animate={{ height: isOutlier ? "100%" : `${(val / 100) * 100 * (hasOutlier ? 1 : 4)}%` }} // סקייל דינמי
                        className={`w-12 rounded-t-md relative group/bar ${isOutlier ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-blue-500'}`}
                    >
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 opacity-0 group-hover/bar:opacity-100 transition-opacity">
                            {val}K
                        </span>
                    </motion.div>
                 )
             })}
             
             {/* קו הממוצע */}
             <motion.div 
                animate={{ bottom: hasOutlier ? "30%" : "45%" }} 
                className="absolute left-0 w-full h-0.5 bg-yellow-400 z-20 border-t border-dashed border-yellow-200"
             >
                 <span className="absolute right-0 -top-5 text-xs text-yellow-400 font-bold bg-slate-900 px-1 rounded">
                     ממוצע: {mean.toFixed(1)}K
                 </span>
             </motion.div>

             {/* קו החציון */}
             <motion.div 
                animate={{ bottom: hasOutlier ? "10%" : "40%" }} 
                className="absolute left-0 w-full h-0.5 bg-green-400 z-20"
             >
                 <span className="absolute left-0 -bottom-5 text-xs text-green-400 font-bold bg-slate-900 px-1 rounded">
                     חציון: {median.toFixed(1)}K
                 </span>
             </motion.div>
          </div>

          {/* שליטה והסבר */}
          <div className="flex flex-col gap-4 min-w-62.5">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                      <Users size={16} className="text-blue-400"/> המשרד
                  </h4>
                  <p className="text-sm text-slate-400 mb-4">
                      {hasOutlier 
                        ? "המנכ\"ל נכנס לחדר. הממוצע קפץ לשמיים, אבל החציון כמעט ולא זז." 
                        : "מצב רגיל: כולם מרוויחים דומה. הממוצע והחציון קרובים מאוד."}
                  </p>
                  <Button 
                    onClick={() => setHasOutlier(!hasOutlier)}
                    variant={hasOutlier ? "destructive" : "default"}
                    className="w-full"
                  >
                      {hasOutlier ? "הסר את המנכ\"ל (נרמול)" : "הכנס מנכ\"ל (חריג)"}
                  </Button>
              </div>
          </div>
      </div>
    </div>
  )
}

// 2. המחשה: סטיית תקן (רעש במערכת)
const StdDevSimulator = () => {
    const [spread, setSpread] = useState(2); // 1 (low) to 10 (high)
    
    // יצירת נקודות דמי (Latency)
    // אנחנו יוצרים 30 נקודות שמתפזרות סביב המרכז (50ms) בהתאם ל-Spread
    const points = Array.from({ length: 30 }).map((_, i) => {
        const offset = (Math.sin(i * 132.1) * spread * 8); 
        return 50 + offset;
    });

    const stdDev = spread * 2.5; // חישוב דמה לויזואליזציה

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 relative overflow-hidden">
            <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-white flex items-center gap-2">
                    <Activity size={18} className="text-purple-400" /> 
                    סימולטור רעש (Latency)
                </h3>
                <div className="text-xs font-mono bg-black/40 px-3 py-1 rounded text-slate-400" dir="ltr">
                    std_dev = {stdDev.toFixed(1)}
                </div>
            </div>
            
            {/* אזור הגרף - ציר זמן */}
            <div className="h-32 w-full bg-slate-950/50 rounded-xl relative border-b border-slate-700 mb-6 flex items-center px-8 overflow-hidden">
                {/* קו האמצע (הממוצע) */}
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-600 border-r border-dashed border-slate-500/30 z-0"></div>
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] text-slate-500">Target (50ms)</div>

                {/* הנקודות */}
                {points.map((pt, i) => {
                    const distance = Math.abs(pt - 50);
                    // צבע: ירוק אם קרוב, אדום אם רחוק
                    const colorClass = distance < 15 ? 'bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]' : 
                                       distance < 30 ? 'bg-yellow-400' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]';
                    
                    return (
                        <motion.div
                            key={i}
                            animate={{ left: `${pt}%` }}
                            transition={{ type: "spring", stiffness: 50, damping: 10 }}
                            className={`absolute w-3 h-3 rounded-full ${colorClass}`}
                            style={{ top: `${30 + (i % 3) * 20}%` }} // פיזור קל לגובה שלא יעלו אחד על השני
                        />
                    )
                })}
            </div>

            {/* בקרה */}
            <div className="space-y-4">
                <div className="flex justify-between text-xs text-slate-400">
                    <span>יציב (Low Std)</span>
                    <span>רועש (High Std)</span>
                </div>
                <input 
                    type="range" min="1" max="10" step="0.1" value={spread}
                    onChange={(e) => setSpread(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                
                <div className="bg-black/20 p-3 rounded-lg border border-slate-800/50 text-center">
                    <span className="text-sm text-slate-300">
                        {spread < 3 ? "המערכת יציבה. קל לזהות דפוסים." : 
                         spread < 7 ? "יש רעש, המודל יתקשה לדייק." : 
                         "כאוס מוחלט. הממוצע לא אומר כלום."}
                    </span>
                </div>
            </div>
        </div>
    )
}

// --- העמוד הראשי ---

export default function ChapterTwo() {
  return (
    <div className="flex min-h-screen bg-[#020617] font-sans text-slate-100 selection:bg-emerald-500/30" dir="rtl">
      
      <CourseSidebar />

      <div className="flex-1 h-screen overflow-y-auto custom-scrollbar scroll-smooth">
        
        {/* --- COMPACT HEADER --- */}
        <header className="py-8 px-8 md:px-12 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
             <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold mb-1">
                        <span className="bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">פרק 2</span>
                        <ChevronLeft size={10} />
                        <span>סטטיסטיקה למפתחים</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">
                        ממוצע, חציון וסטיית תקן – <br/>
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-400">
                            בלי סיבוכים
                        </span>
                    </h1>
                </div>
                <p className="text-sm text-slate-400 max-w-sm leading-relaxed md:text-right border-r-2 border-slate-800 pr-4 hidden md:block">
                    איך מוצאים את ה&quot;מרכז&quot;, למה ממוצע הוא לפעמים שקרן, ואיך מודדים &quot;רעש&quot; בצורה שמחשב מבין.
                </p>
             </div>
        </header>

        <main className="max-w-4xl mx-auto px-8 md:px-12 py-12 space-y-24 pb-48">
          
          {/* סעיף 1: המרכז (ממוצע וחציון) */}
          <section id="part-1" className="scroll-mt-24">
            <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><BarChart3 size={20} /></div>
                    <h2 className="text-2xl font-bold text-white">1. מה זה &quot;מרכז&quot; של דאטה?</h2>
                </div>
                
                <div className="prose prose-invert text-slate-400 text-base leading-relaxed max-w-none space-y-4">
                    <p>
                        תאר לעצמך שיש לך מסד נתונים עם מיליון שורות של משכורות. הבוס שואל: &quot;כמה אנשים מרוויחים אצלנו?&quot;.
                        אתה לא יכול להקריא לו מיליון מספרים. אתה צריך מספר אחד שמסכם את הכל. למספר הזה קוראים <strong>מדד מרכזי</strong>.
                    </p>
                    <p>
                        רוב האנשים הולכים ישר ל<strong>ממוצע (Mean)</strong>. זה אינטואיטיבי: מחברים הכל ומחלקים בכמות.
                        אבל לממוצע יש חולשה קריטית: הוא &quot;דמוקרטי מדי&quot;. הוא מתחשב בכולם, גם בערכים לא הגיוניים.
                    </p>
                    <p className="bg-slate-900/50 p-4 border-r-4 border-blue-500 rounded-r text-sm">
                        כאן נכנס ה<strong>חציון (Median)</strong>. החציון לא מחשב חישובים. הוא פשוט מסדר את כולם בשורה ובוחר את האדם שעומד בדיוק באמצע.
                        למה זה גאוני? כי אם ביל גייטס נכנס לחדר, הממוצע יקפוץ בטירוף, אבל החציון בקושי יזוז.
                    </p>
                </div>
            </div>

            {/* ויזואליזציה: ממוצע מול חציון */}
            <MeanMedianLab />

          </section>


          {/* סעיף 2: פיזור וסטיית תקן */}
          <section id="part-2" className="scroll-mt-24">
            <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><TrendingUp size={20} /></div>
                    <h2 className="text-2xl font-bold text-white">2. מה זה &quot;פיזור&quot; ולמה זה משנה?</h2>
                </div>
                
                <div className="prose prose-invert text-slate-400 text-base leading-relaxed max-w-none space-y-4">
                    <p>
                        אחרי שהבנו איפה המרכז, השאלה הבאה היא: <strong>עד כמה המצב יציב?</strong>
                        <br/>
                        תחשוב על שני שרתים. שניהם עונים בממוצע תוך 50ms.
                        שרת א&#39; עונה תמיד בין 49ms ל-51ms. שרת ב&#39; עונה פעם ב-1ms ופעם ב-99ms.
                    </p>
                    <p>
                        הממוצע שלהם זהה, אבל המציאות שונה לגמרי. בשרת ב&#39; אי אפשר לסמוך על כלום.
                        כדי למדוד את &quot;רמת הבלגן&quot; הזו, אנחנו משתמשים ב<strong>סטיית תקן (Standard Deviation)</strong>.
                    </p>
                    <div className="flex gap-4 text-sm mt-2">
                        <div className="text-green-400 font-bold bg-green-900/20 px-2 py-1 rounded">סטייה נמוכה = המידע אמין</div>
                        <div className="text-red-400 font-bold bg-red-900/20 px-2 py-1 rounded">סטייה גבוהה = רעש וכאוס</div>
                    </div>
                </div>
            </div>

            {/* ויזואליזציה: סטיית תקן */}
            <StdDevSimulator />

          </section>


          {/* סעיף 3: דוגמאות מהעולם האמיתי */}
          <section id="part-3" className="scroll-mt-24">
             <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><Users size={20} /></div>
                <div>
                    <h2 className="text-2xl font-bold text-white">3. דוגמאות על נתונים אמיתיים</h2>
                    <p className="text-slate-400 text-sm">
                        איפה תפגוש את המספרים האלה ביום יום שלך?
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ExampleCard 
                    title="זמני תגובה (Latency)" 
                    scenario="ניטור שרתים"
                    desc="אם הממוצע תקין אבל סטיית התקן עולה, זה סימן שיש לך 'Spikes' (קפיצות) של עומס. זה הבאג הכי קשה לאיתור."
                    icon={<Activity size={18} />} color="blue"
                />
                <ExampleCard 
                    title="מחירי דירות" 
                    scenario="ניקוי דאטה"
                    desc="דירות יוקרה בודדות יכולות להקפיץ את המחיר הממוצע בעיר שלמה. מודל למידת מכונה חייב להשתמש בחציון כדי לא להתבלבל."
                    icon={<Calculator size={18} />} color="purple"
                />
                <ExampleCard 
                    title="דירוג באפליקציה" 
                    scenario="מערכות המלצה"
                    desc="מוצר עם ממוצע 4.0 יכול להיות שכולם נתנו לו 4 (יציב), או שחצי נתנו 1 וחצי נתנו 5 (שנוי במחלוקת). הפיזור מספר את הסיפור."
                    icon={<Brain size={18} />} color="emerald"
                />
            </div>
          </section>


          {/* סעיף 4: NumPy Demo */}
          <section id="part-4" className="scroll-mt-24 bg-slate-900/40 border border-slate-800 rounded-2xl p-8 relative overflow-hidden">
             <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 shrink-0">
                    <Terminal className="text-yellow-400 w-6 h-6" />
                </div>
                <div className="space-y-4 w-full">
                    <h2 className="text-2xl font-bold text-white">4. איך זה נראה בקוד?</h2>
                    <div className="prose prose-invert text-slate-400 text-base leading-relaxed max-w-none">
                        <p>
                            בעולם ה-Python וה-AI, אנחנו כמעט אף פעם לא נכתוב לולאות כדי לחשב ממוצע. זה איטי.
                            אנחנו משתמשים בספרייה <strong>NumPy</strong> שעושה את זה ב-C++ וטסה במהירות.
                        </p>
                    </div>
                    
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-sm relative overflow-hidden group shadow-lg" dir="ltr">
                        <div className="absolute top-0 right-0 p-2 opacity-50 text-xs text-slate-500">main.py</div>
                        
                        <div className="space-y-2 text-xs md:text-sm">
                            <span className="text-purple-400">import</span> numpy <span className="text-purple-400">as</span> np<br/><br/>
                            
                            <span className="text-slate-500"># 1. המערך שלנו (למשל: זמני תגובה במילי-שניות)</span><br/>
                            latencies = np.array([98, 102, 100, 101, 99, 103])<br/><br/>
                            
                            <span className="text-slate-500"># 2. פקודות הקסם</span><br/>
                            <span className="text-blue-400">print</span>(np.<span className="text-yellow-300">mean</span>(latencies))   <span className="text-slate-600">{'// 100.5 (הממוצע)'}</span><br/>
                            <span className="text-blue-400">print</span>(np.<span className="text-yellow-300">median</span>(latencies)) <span className="text-slate-600">{'// 100.5 (החציון)'}</span><br/>
                            <span className="text-blue-400">print</span>(np.<span className="text-yellow-300">std</span>(latencies))    <span className="text-slate-600">{'// 1.70  (סטיית התקן - נמוכה ויציבה)'}</span><br/>
                        </div>
                    </div>
                </div>
             </div>
          </section>


          {/* Quiz */}
          <section id="quiz" className="mt-16 pt-8 border-t border-slate-800">
             <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">בדיקת הבנה: סיכום פרק 2</h2>
                <p className="text-slate-400 text-sm">האם הבנת את ההבדל בין ממוצע לחציון?</p>
             </div>
             <ChapterTwoQuiz />
          </section>

        </main>
      </div>
    </div>
  );
}


// --- קומפוננטות עזר ---

interface ExampleCardProps {
    title: string;
    scenario: string;
    desc: string;
    icon: React.ReactNode;
    color: string;
}

function ExampleCard({ title, scenario, desc, icon, color }: ExampleCardProps) {
    const colors: Record<string, string> = {
        blue: "text-blue-400 border-blue-500/20 bg-blue-500/5",
        purple: "text-purple-400 border-purple-500/20 bg-purple-500/5",
        emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    };

    return (
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 relative hover:border-slate-700 transition-colors">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 border ${colors[color]}`}>
                {icon}
            </div>
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">{scenario}</div>
            <h3 className="text-base font-bold text-white mb-2">{title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
        </div>
    )
}

function ChapterTwoQuiz() {
    const [answers, setAnswers] = useState<Record<number, number>>({});
    
    const questions = [
        {
            id: 1,
            text: "מתי עדיף להשתמש בחציון (Median) על פני ממוצע?",
            options: [
                { id: 1, text: "תמיד, הממוצע הוא מדד מיושן" },
                { id: 2, text: "כשיש בנתונים ערכים קיצוניים (Outliers) שמעוותים את התמונה", correct: true },
                { id: 3, text: "כשהנתונים מסודרים מהקטן לגדול" }
            ]
        },
        {
            id: 2,
            text: "מה מספרת לנו סטיית התקן?",
            options: [
                { id: 1, text: "כמה הנתונים מפוזרים ורחוקים מהמרכז (רעש)", correct: true },
                { id: 2, text: "כמה נתונים חסרים בטבלה" },
                { id: 3, text: "את הערך הגבוה ביותר במערך" }
            ]
        },
        {
            id: 3,
            text: "למה כדאי להשתמש ב-NumPy?",
            options: [
                { id: 1, text: "כי זה נראה יפה בקוד" },
                { id: 2, text: "כי היא מבצעת חישובים מתמטיים במהירות וביעילות", correct: true },
                { id: 3, text: "כי אי אפשר לחשב ממוצע בפייתון רגיל" }
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
                <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
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
                                btnClass += "bg-slate-950 border-slate-800 hover:bg-slate-800 text-slate-400";
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
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="sticky bottom-8 z-50 flex justify-center pt-4"
                    >
                        <Link href="/chapter-3">
                            <Button size="lg" className="h-14 px-8 text-base bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-xl hover:scale-105 transition-transform">
                                המשך לפרק 3: הסתברות <ChevronLeft className="mr-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}