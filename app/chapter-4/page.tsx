"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, CloudRain, Sun, Filter, Table2, Search, GitCommit, Check, X, Umbrella, AlertOctagon, Terminal } from "lucide-react";
import { CourseSidebar } from "@/components/CourseSidebar";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';

// --- רכיבים ויזואליים פנימיים ---

// 1. סימולטור הקשר (גשם ועננים)
const ContextSimulator = () => {
  const [context, setContext] = useState<'general' | 'cloudy'>('general');

  // נתונים (ימים בחודש)
  // כללי: הרבה שמש, קצת גשם
  // עננים: הרוב גשם, קצת סתם מעונן
  const totalDays = 20;
  
  // יצירת ימים לסימולציה
  const renderDays = () => {
    let rainCount = 0;
    const days = Array.from({ length: totalDays }).map((_, i) => {
        let isRaining = false;
        let isCloudy = false;

        if (context === 'general') {
            // באופן כללי: יורד גשם ב-20% מהימים
            isRaining = i < 4; 
            isCloudy = i < 6; // קצת עננים
        } else {
            // בהינתן עננים שחורים: יורד גשם ב-80% מהימים
            isCloudy = true;
            isRaining = i < 16;
        }

        if (isRaining) rainCount++;

        return (
            <motion.div 
                key={i}
                layout
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`
                    w-8 h-8 rounded-lg flex items-center justify-center border transition-colors duration-500
                    ${isRaining ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 
                      isCloudy ? 'bg-slate-700/50 border-slate-600 text-slate-400' : 
                      'bg-yellow-500/10 border-yellow-500/30 text-yellow-500'}
                `}
            >
                {isRaining ? <CloudRain size={16} /> : isCloudy ? <Filter size={16} /> : <Sun size={16} />}
            </motion.div>
        );
    });

    return { elements: days, rainCount };
  };

  const { elements, rainCount } = renderDays();
  const probability = rainCount / totalDays;

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-10 relative">
          <div>
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <Umbrella size={20} className="text-blue-400"/>
                  המעבדה: כוחו של ההקשר
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                  מה הסיכוי לגשם? תלוי איזה מידע יש לך.
              </p>
          </div>
          
          <div className="flex gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button 
                onClick={() => setContext('general')}
                className={`px-4 py-2 rounded text-xs font-bold transition-all ${context === 'general' ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
              >
                  שאלה כללית
              </button>
              <button 
                onClick={() => setContext('cloudy')}
                className={`px-4 py-2 rounded text-xs font-bold transition-all ${context === 'cloudy' ? 'bg-blue-600 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
              >
                  יש עננים שחורים (Condition)
              </button>
          </div>
      </div>

      <div className="bg-slate-950/50 rounded-xl border border-slate-800 p-6 flex flex-col items-center">
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-6">
              {elements}
          </div>
          
          <div className="flex items-center gap-4 text-sm font-mono bg-black/40 px-4 py-2 rounded border border-slate-800">
              <span className="text-slate-400">
                  {context === 'general' ? 'P(Rain)' : 'P(Rain | Clouds)'} = 
              </span>
              <span className={`text-xl font-bold ${probability > 0.5 ? 'text-blue-400' : 'text-yellow-400'}`}>
                  {probability.toFixed(2)}
              </span>
          </div>
          <p className="text-xs text-slate-500 mt-3 text-center max-w-md">
              {context === 'general' 
                ? "בלי הקשר, הסיכוי לגשם נמוך (20%). זה ה-'Prior' שלך." 
                : "ברגע שיש הקשר (עננים), מרחב המדגם משתנה וההסתברות קופצת (80%). זו הסתברות מותנית."}
          </p>
      </div>
    </div>
  );
};

// 2. חוקר בייס (טבלת הספאם האינטראקטיבית)
const BayesTableExplorer = () => {
    const [focus, setFocus] = useState<'all' | 'free'>('all');

    // נתונים מהטקסט
    const data = {
        free: { spam: 42, ham: 3 },
        noFree: { spam: 1158, ham: 797 }
    };

    const totalSpam = data.free.spam + data.noFree.spam; // 1200
    const totalHam = data.free.ham + data.noFree.ham;   // 800
    
    // חישוב אחוז ספאם בהינתן המילה free
    const probSpamGivenFree = data.free.spam / (data.free.spam + data.free.ham);

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 mt-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl -z-10"></div>
            
            <div className="mb-6">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <Table2 size={20} className="text-purple-400"/>
                    בייס בטבלה: המילה &quot;Free&quot;
                </h3>
                <p className="text-sm text-slate-400">
                    לחץ על השורה הראשונה כדי לראות מה קורה כשהמודל מזהה את המילה.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* הטבלה */}
                <div className="lg:col-span-2 space-y-2">
                    {/* Header */}
                    <div className="grid grid-cols-3 text-xs text-slate-500 uppercase tracking-wider px-4 pb-2 border-b border-slate-800">
                        <div>המילה &quot;Free&quot;?</div>
                        <div className="text-center text-red-400">ספאם</div>
                        <div className="text-center text-emerald-400">הודעה רגילה</div>
                    </div>

                    {/* Row 1: Word Exists */}
                    <button 
                        onClick={() => setFocus(focus === 'free' ? 'all' : 'free')}
                        className={`w-full grid grid-cols-3 items-center px-4 py-4 rounded-xl border transition-all duration-300 text-sm group
                        ${focus === 'free' 
                            ? 'bg-purple-900/20 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.1)] scale-[1.02]' 
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700 opacity-50'}`}
                    >
                        <div className="flex items-center gap-2 font-bold text-white">
                            <Check size={16} className="text-purple-400" /> מופיעה
                        </div>
                        <div className="text-center font-mono font-bold text-red-400 text-lg">
                            {data.free.spam}
                        </div>
                        <div className="text-center font-mono font-bold text-emerald-400 text-lg">
                            {data.free.ham}
                        </div>
                    </button>

                    {/* Row 2: Word Missing */}
                    <div className={`grid grid-cols-3 items-center px-4 py-4 rounded-xl border border-slate-800 bg-slate-950 text-sm transition-all duration-500
                        ${focus === 'free' ? 'opacity-30 blur-[1px]' : 'opacity-100'}`}
                    >
                        <div className="flex items-center gap-2 text-slate-400">
                            <X size={16} /> לא מופיעה
                        </div>
                        <div className="text-center font-mono text-slate-500">
                            {data.noFree.spam}
                        </div>
                        <div className="text-center font-mono text-slate-500">
                            {data.noFree.ham}
                        </div>
                    </div>
                </div>

                {/* התובנה (פאנל צד) */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-center relative overflow-hidden">
                    <div className={`transition-all duration-500 absolute inset-0 bg-linear-to-b from-purple-500/10 to-transparent ${focus === 'free' ? 'opacity-100' : 'opacity-0'}`}></div>
                    
                    <div className="relative z-10 text-center">
                        <div className="text-xs text-slate-500 uppercase mb-2 font-bold">ההסתברות לספאם</div>
                        
                        {focus === 'all' ? (
                            <div className="space-y-2">
                                <div className="text-3xl font-mono font-bold text-slate-300">
                                    {((totalSpam / (totalSpam + totalHam)) * 100).toFixed(0)}%
                                </div>
                                <p className="text-xs text-slate-500">
                                    באופן כללי (בלי לדעת כלום), רוב ההודעות הן ספאם (1200 מתוך 2000).
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <motion.div 
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-4xl font-mono font-bold text-purple-400"
                                >
                                    {(probSpamGivenFree * 100).toFixed(1)}%
                                </motion.div>
                                <p className="text-xs text-purple-200">
                                    ברגע שראינו &quot;Free&quot;, אנחנו מתעלמים משאר הטבלה.
                                    מסתכלים רק על השורה העליונה: 42 מול 3.
                                    <br/>
                                    <strong>החשד הפך לכמעט ודאות.</strong>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- העמוד הראשי ---

export default function ChapterFour() {
  return (
    <div className="flex min-h-screen bg-[#020617] font-sans text-slate-100 selection:bg-purple-500/30" dir="rtl">
      
      <CourseSidebar />

      <div className="flex-1 h-screen overflow-y-auto custom-scrollbar scroll-smooth">
        
        {/* HEADER */}
        <header className="py-8 px-8 md:px-12 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
             <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs text-purple-400 font-bold mb-1 tracking-wider">
                        <span className="bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">פרק 4</span>
                        <ChevronLeft size={10} />
                        <span>הסתברות מותנית ובייס</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">
                        הגרסה האנושית לנוסחאות
                    </h1>
                </div>
                <p className="text-sm text-slate-400 max-w-sm leading-relaxed md:text-right border-r-2 border-slate-800 pr-4 hidden md:block">
                    למה השאלה היא לא &quot;האם זה נכון&quot;, אלא &quot;כמה זה סביר בהינתן מה שאני רואה עכשיו&quot;?
                </p>
             </div>
        </header>

        <main className="max-w-4xl mx-auto px-8 md:px-12 py-12 space-y-24 pb-48">
          
          {/* סעיף 1: מהי הסתברות מותנית */}
          <section id="part-1" className="scroll-mt-24">
            <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><GitCommit size={20} /></div>
                    <h2 className="text-2xl font-bold text-white">1. מה זו באמת הסתברות מותנית?</h2>
                </div>
                
                <div className="prose prose-invert text-slate-400 text-base leading-relaxed max-w-none space-y-4">
                    <p>
                        בפרק הקודם שאלנו &quot;כמה פעמים משהו קורה?&quot;. זו שאלה חשובה, אבל היא כללית מדי.
                        בחיים האמיתיים, ובוודאי ב-AI, השאלה האמיתית היא: <strong>&quot;כמה פעמים משהו קורה בתוך קבוצה מסוימת?&quot;</strong>
                    </p>
                    <p>
                        אם אתה שואל &quot;מה הסיכוי לגשם?&quot;, התשובה היא אולי 20%. 
                        אבל אם אתה שואל &quot;מה הסיכוי לגשם <strong>בהינתן שיש עננים שחורים</strong>?&quot;, המספר משתנה דרמטית.
                        זהו הכוח של <strong>הקשר (Context)</strong>.
                    </p>
                </div>
            </div>

            <ContextSimulator />

            <div className="mt-6 flex gap-4 text-sm text-slate-400 bg-slate-900 p-4 rounded-xl border border-slate-800">
                <AlertOctagon className="text-yellow-500 shrink-0" size={20} />
                <p>
                    מודלים לא עובדים על עיוור. הם תמיד שואלים: &quot;מה הסיכוי שהמשתמש יעזוב, <strong>בהינתן</strong> שזו הפנייה השלישית שלו החודש?&quot;.
                    המילה הקטנה הזו &quot;בהינתן&quot; (Given) היא כל ההבדל.
                </p>
            </div>
          </section>


          {/* סעיף 2: בייס דרך טבלאות */}
          <section id="part-2" className="scroll-mt-24">
            <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Table2 size={20} /></div>
                    <h2 className="text-2xl font-bold text-white">2. בייס דרך טבלאות (בלי נוסחאות)</h2>
                </div>
                
                <div className="prose prose-invert text-slate-400 text-base leading-relaxed max-w-none space-y-4">
                    <p>
                        כדי להבין את &quot;חוק בייס&quot; המפורסם, לא צריך מתמטיקה כבדה. צריך פשוט להסתכל על טבלה.
                        בייס אומר דבר פשוט: <strong>כשמגיע מידע חדש (ראיות), צריך לעדכן את האמונות שלנו.</strong>
                    </p>
                    <p>
                        בוא ניקח את הדוגמה הקלאסית: זיהוי ספאם. ספרנו כמה פעמים המילה <code>free</code> מופיעה במיילים רגילים ובמיילי ספאם.
                        הנה הנתונים האמיתיים:
                    </p>
                </div>
            </div>

            <BayesTableExplorer />

          </section>


          {/* סעיף 3: סבירות ולא ודאות */}
          <section id="part-3" className="scroll-mt-24">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><Search size={20} /></div>
                <div>
                    <h2 className="text-2xl font-bold text-white">3. מה מסתתר מאחורי &quot;כמה סביר?&quot;</h2>
                </div>
            </div>

            <div className="prose prose-invert text-slate-400 text-base leading-relaxed max-w-none mb-8">
                <p>
                    המוח האנושי אוהב שחור ולבן. מודלים עובדים באפור.
                    הם לא אומרים &quot;זו הודעת ספאם&quot;. הם אומרים: &quot;בהקשר הזה, יש יותר ראיות לספאם מאשר להודעה רגילה&quot;.
                </p>
                <p>
                    הבנה של <strong>Likelihood (סבירות)</strong> היא קריטית למפתח. אחוזים הם לא סתם מספרים, הם רמזים למבנה הדאטה.
                    כשאתה מבין שהמודל בודק סבירות ולא אמת מוחלטת, אתה פתאום מבין למה הוא טועה לפעמים, ואיך אפשר לתקן אותו ע&quot;י שיפור הדאטה.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl">
                    <h4 className="font-bold text-white mb-2">חשיבה של מתכנת רגיל</h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                        <li className="flex gap-2"><X size={16} className="text-red-500"/> אם יש &quot;Free&quot;, זה ספאם (True).</li>
                        <li className="flex gap-2"><X size={16} className="text-red-500"/> אם אין, זה תקין (False).</li>
                    </ul>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl border-l-4 border-l-purple-500">
                    <h4 className="font-bold text-white mb-2">חשיבה של מפתח AI</h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                        <li className="flex gap-2"><Check size={16} className="text-green-500"/> הנוכחות של &quot;Free&quot; מעלה את הסבירות ב-90%.</li>
                        <li className="flex gap-2"><Check size={16} className="text-green-500"/> המודל מחפש ראיות נוספות לחיזוק.</li>
                    </ul>
                </div>
            </div>
          </section>


          {/* סעיף 4: Code Demo */}
          <section id="part-4" className="scroll-mt-24 bg-slate-900/40 border border-slate-800 rounded-2xl p-8 relative overflow-hidden">
             <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-950 rounded-lg border border-slate-800"><Terminal className="text-yellow-400" size={20} /></div>
                    <h2 className="text-2xl font-bold text-white">4. הדגמה בקוד: לתרגם טבלה לפייתון</h2>
                </div>
                
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 font-mono text-sm shadow-xl" dir="ltr">
                    <div className="flex justify-between text-xs text-slate-500 border-b border-slate-800 pb-2 mb-4">
                        <span>bayes_demo.py</span>
                        <span>Python</span>
                    </div>
                    <div className="space-y-1 text-slate-300 leading-relaxed">
                        <span className="text-purple-400"># Frequency table data</span><br/>
                        spam_with_free = <span className="text-yellow-300">42</span><br/>
                        total_spam = <span className="text-yellow-300">1200</span><br/><br/>
                        
                        <span className="text-slate-500"># The conditional probability calculation</span><br/>
                        <span className="text-slate-500"># P(Free | Spam)</span><br/>
                        p_free_given_spam = spam_with_free / total_spam<br/><br/>
                        
                        <span className="text-blue-400">print</span>(f<span className="text-green-400">&quot;Probability to see &#39;free&#39; inside spam: &#123;p_free_given_spam:.3f&#125;&quot;</span>)<br/>
                        <span className="text-slate-500"># Output: 0.035 (3.5%)</span>
                    </div>
                </div>
                <p className="text-sm text-slate-400">
                    זה נראה נמוך (3.5%), אבל כשמשווים את זה להסתברות של המילה &quot;Free&quot; בהודעות רגילות (שהיא כמעט 0), 
                    היחס ביניהם הוא זה שגורם למודל לצעוק &quot;ספאם!&quot;.
                </p>
             </div>
          </section>


          {/* Quiz */}
          <section id="quiz" className="mt-16 pt-8 border-t border-slate-800">
             <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">בדיקת הבנה: סיכום פרק 4</h2>
                <p className="text-slate-400 text-sm">האם תפסת את כוחו של ההקשר?</p>
             </div>
             <ChapterQuiz />
          </section>

        </main>
      </div>
    </div>
  );
}


// --- קומפוננטת המבחן ---

function ChapterQuiz() {
    const [answers, setAnswers] = useState<Record<number, number>>({});
    
    const questions = [
        {
            id: 1,
            text: "מהו ההבדל העיקרי בין הסתברות רגילה להסתברות מותנית?",
            options: [
                { id: 1, text: "הסתברות מותנית משתמשת במספרים גדולים יותר" },
                { id: 2, text: "הסתברות מותנית מתייחסת למידע נוסף (הקשר/Context) שכבר ידוע לנו", correct: true },
                { id: 3, text: "אין הבדל, זה רק שם אחר" }
            ]
        },
        {
            id: 2,
            text: "מהו עקרון בייס במשפט אחד פשוט?",
            options: [
                { id: 1, text: "נוסחה לחישוב ממוצעים" },
                { id: 2, text: "כשמגיע מידע חדש, צריך לעדכן את האמונה שלנו לגבי הסבירות של אירוע", correct: true },
                { id: 3, text: "דרך למחוק נתוני ספאם מהמערכת" }
            ]
        },
        {
            id: 3,
            text: "איך מודל מחליט אם הודעה היא ספאם?",
            options: [
                { id: 1, text: "הוא בודק אם המילה Free מופיעה, וזה מספיק" },
                { id: 2, text: "הוא משווה את הסבירות של המילים תחת 'ספאם' מול הסבירות שלהן תחת 'הודעה רגילה'", correct: true },
                { id: 3, text: "הוא מנחש באופן אקראי" }
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
                        <Link href="/chapter-5">
                            <Button size="lg" className="h-14 px-10 text-base bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-full shadow-[0_0_40px_rgba(168,85,247,0.5)] border-t border-purple-400/30 hover:scale-105 transition-transform">
                                <span className="font-bold">המשך לפרק 5: וקטורים</span> <ChevronLeft className="mr-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}