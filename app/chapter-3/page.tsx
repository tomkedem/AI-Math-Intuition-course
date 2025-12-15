"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Activity, Brain, Terminal, TrendingUp, Check, X, ShieldAlert, Mail, Search, MousePointer2, AlertTriangle, RefreshCcw } from "lucide-react";
import { CourseSidebar } from "@/components/CourseSidebar";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';

// --- רכיבים ויזואליים פנימיים ---

// 1. מעבדת תדירות: יצירת הסתברות מתוך מציאות
const FrequencyLab = () => {
  const [requests, setRequests] = useState<{status: 'success' | 'fail'}[]>([]);
  
  const addRequest = () => {
    // סימולציה: 80% הצלחה (כמו שרת יציב)
    const isSuccess = Math.random() > 0.2;
    setRequests(prev => [...prev, { status: isSuccess ? 'success' : 'fail' }]);
  };

  const reset = () => setRequests([]);

  const total = requests.length;
  const fails = requests.filter(r => r.status === 'fail').length;
  const probability = total === 0 ? 0 : fails / total;

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden group">
      <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors duration-500"></div>
      
      <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
          
          {/* Controls */}
          <div className="flex flex-col gap-4 w-full md:w-1/3">
              <h3 className="text-white font-bold flex items-center gap-2">
                  <Activity size={18} className="text-blue-400"/> סימולטור שרת
              </h3>
              <p className="text-xs text-slate-400">
                  לחץ על הכפתור כדי לשלוח בקשות לשרת. חלקן יכשלו באקראי.
              </p>
              
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-sm">
                  <div className="flex justify-between mb-2">
                      <span className="text-slate-500">Total Requests:</span>
                      <span className="text-white">{total}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                      <span className="text-red-400">Failures:</span>
                      <span className="text-red-400">{fails}</span>
                  </div>
                  <div className="h-px bg-slate-800 my-2"></div>
                  <div className="flex justify-between items-center">
                      <span className="text-blue-400">P(Fail):</span>
                      <span className="text-xl font-bold text-blue-400">
                          {probability.toFixed(3)}
                      </span>
                  </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={addRequest} className="flex-1 bg-blue-600 hover:bg-blue-500">
                    שלח בקשה
                </Button>
                <Button onClick={reset} variant="outline" className="border-slate-700">
                    <RefreshCcw size={16}/>
                </Button>
              </div>
          </div>

          {/* Visual Grid */}
          <div className="flex-1 bg-slate-950/50 rounded-xl border border-slate-800 p-4 min-h-50">
              <div className="text-xs text-slate-500 mb-2 text-center">היסטוריית בקשות (ריבועים)</div>
              <div className="flex flex-wrap gap-1 content-start">
                  <AnimatePresence>
                    {requests.map((r, i) => (
                        <motion.div 
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`w-3 h-3 rounded-sm ${r.status === 'success' ? 'bg-emerald-500/40' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'}`}
                        />
                    ))}
                  </AnimatePresence>
                  {requests.length === 0 && (
                      <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs italic pt-10">
                          אין נתונים עדיין... שלח בקשה!
                      </div>
                  )}
              </div>
          </div>
      </div>
    </div>
  )
}

// 2. גלאי ספאם חי (מבוסס מילים)
const SpamDetectorLab = () => {
    const [input, setInput] = useState("Hello click here for free money urgent");
    
    // מילון מילים והמשקל שלהן (מבוסס על הטבלה בטקסט שלך)
    // הערך מייצג כמה המילה "מושכת" לכיוון ספאם (0-1)
    const wordWeights: Record<string, { weight: number, label: string, color: string }> = {
        "free": { weight: 0.95, label: "Spam Heavy", color: "text-red-500" },
        "urgent": { weight: 0.85, label: "Spam Heavy", color: "text-red-400" },
        "money": { weight: 0.70, label: "Suspicious", color: "text-orange-400" },
        "click": { weight: 0.60, label: "Common", color: "text-yellow-400" },
        "hello": { weight: 0.05, label: "Safe", color: "text-green-400" },
        "project": { weight: 0.10, label: "Safe", color: "text-green-400" },
    };

    const words = input.toLowerCase().split(/\s+/);
    
    // חישוב פשטני להדגמה (ממוצע משוקלל)
    let spamScore = 0;
    let detectedWords = 0;

    words.forEach(w => {
        // ניקוי סימני פיסוק בסיסי
        const cleanW = w.replace(/[^a-z]/g, '');
        if (wordWeights[cleanW]) {
            spamScore += wordWeights[cleanW].weight;
            detectedWords++;
        }
    });

    // נרמול (אם לא זוהו מילים, נניח ניטרליות 0.1)
    const finalProbability = detectedWords > 0 ? (spamScore / detectedWords) : 0.1;
    const isSpam = finalProbability > 0.5;

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 mt-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Mail size={20} /></div>
                <h3 className="text-xl font-bold text-white">מעבדה: איך המודל רואה ספאם?</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <label className="text-sm text-slate-400 block">הזן טקסט לבדיקה:</label>
                    <textarea 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white font-mono focus:ring-2 focus:ring-blue-500 outline-none h-32"
                    />
                    <div className="text-xs text-slate-500">
                        * נסה מילים כמו: free, urgent, hello, money, project
                    </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
                    {/* Gauge Visual */}
                    <div className="absolute top-0 right-0 w-1 h-full bg-linear-to-b from-green-500 via-yellow-500 to-red-500 opacity-20"></div>
                    
                    <div className="mb-6">
                        <div className="text-sm text-slate-400 mb-1">הסתברות לספאם (Spam Probability)</div>
                        <div className="flex items-end gap-2">
                            <span className={`text-4xl font-bold font-mono transition-colors duration-500 ${isSpam ? 'text-red-500' : 'text-green-500'}`}>
                                {(finalProbability * 100).toFixed(1)}%
                            </span>
                            <span className={`text-sm font-bold px-2 py-1 rounded mb-1 ${isSpam ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                                {isSpam ? "SPAM DETECTED" : "HAM (SAFE)"}
                            </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="h-2 w-full bg-slate-800 rounded-full mt-3 overflow-hidden">
                            <motion.div 
                                animate={{ width: `${finalProbability * 100}%` }}
                                className={`h-full ${isSpam ? 'bg-red-500' : 'bg-green-500'}`}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">ניתוח מילים (Evidence):</div>
                        <div className="flex flex-wrap gap-2">
                            {words.map((w, i) => {
                                const cleanW = w.replace(/[^a-z]/g, '');
                                const data = wordWeights[cleanW];
                                if (!data) return null;
                                return (
                                    <span key={i} className={`text-xs px-2 py-1 rounded border border-slate-800 bg-slate-900 ${data.color}`}>
                                        {w} ({data.weight})
                                    </span>
                                )
                            })}
                            {detectedWords === 0 && <span className="text-slate-600 text-xs italic">לא זוהו מילות מפתח מוכרות</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// --- העמוד הראשי ---

export default function ChapterThree() {
  return (
    <div className="flex min-h-screen bg-[#020617] font-sans text-slate-100 selection:bg-blue-500/30" dir="rtl">
      
      <CourseSidebar />

      <div className="flex-1 h-screen overflow-y-auto custom-scrollbar scroll-smooth">
        
        {/* HEADER */}
        <header className="py-8 px-8 md:px-12 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
             <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs text-blue-400 font-bold mb-1 tracking-wider">
                        <span className="bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">פרק 3</span>
                        <ChevronLeft size={10} />
                        <span>הסתברות למפתחים</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">
                        הסתברות שמדברת בשפה של מתכנת
                    </h1>
                </div>
                <p className="text-sm text-slate-400 max-w-sm leading-relaxed md:text-right border-r-2 border-slate-800 pr-4 hidden md:block">
                    למה הסתברות היא לא קסם, אלא בסך הכל ספירה של תרחישים בעולם האמיתי.
                </p>
             </div>
        </header>

        <main className="max-w-4xl mx-auto px-8 md:px-12 py-12 space-y-24 pb-48">
          
          {/* סעיף 1: הסתברות כתדירות */}
          <section id="part-1" className="scroll-mt-24">
            <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><TrendingUp size={20} /></div>
                    <h2 className="text-2xl font-bold text-white">1. הסתברות = תדירות בעולם האמיתי</h2>
                </div>
                
                <div className="prose prose-invert text-slate-400 text-base leading-relaxed max-w-none space-y-4">
                    <p>
                        לפני שמדברים על נוסחאות, חשוב להבין משהו פשוט: <strong>הסתברות היא לא מתמטיקה מופשטת. היא תיאור של המציאות.</strong>
                    </p>
                    <p>
                        כשאומרים &quot;הסתברות של 0.2&quot;, מתכנת מבין שזה אומר: &quot;זה קורה בערך 20% מהפעמים&quot;.
                        אם מתוך 100 בקשות לשרת, 20 נכשלות – ההסתברות לכישלון היא 0.2. זהו. אין פה קסם. זו פשוט ספירה.
                    </p>
                    <div className="bg-slate-900/50 p-4 border-r-4 border-blue-500 rounded-r text-sm">
                        <strong>למה זה חשוב ל-AI?</strong> כי מודלים לא &quot;מנחשים&quot;. הם משווים תדירויות שהם ראו בעבר.
                        אם המודל ראה שב-90% מהמקרים אחרי המילה &quot;היה&quot; מגיעה המילה &quot;טוב&quot;, הוא ישלים את המשפט בהתאם.
                    </div>
                </div>
            </div>

            {/* מעבדת תדירות */}
            <FrequencyLab />

          </section>


          {/* סעיף 2: דוגמאות ותרחישים */}
          <section id="part-2" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Search size={20} /></div>
                <div>
                    <h2 className="text-2xl font-bold text-white">2. למה דברים קורים? זיהוי דפוסים</h2>
                    <p className="text-slate-400 text-sm">כשמסתכלים על העולם דרך תדירויות, מתחילים לראות את הסיבות.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PatternCard 
                    title="הטיית יום ראשון"
                    icon={<MousePointer2 size={18} />}
                    desc="המודל זיהה שמשתמשים לוחצים על כתבות 'כספים' בעיקר ביום ראשון בבוקר. הוא למד לקשר בין הזמן לתוכן."
                    color="blue"
                />
                <PatternCard 
                    title="מילות מפתח (Spam)"
                    icon={<ShieldAlert size={18} />}
                    desc="אם המילה 'Free' מופיעה פי 14 יותר בספאם מאשר בהודעות רגילות, המודל לא צריך להבין אנגלית. הוא מבין מספרים."
                    color="red"
                />
                <PatternCard 
                    title="אנומליה ברמזורים"
                    icon={<AlertTriangle size={18} />}
                    desc="בדרך כלל מגיעות 300 מכוניות בשעה. פתאום הגיעו 200 ב-5 דקות. ההסתברות הנמוכה מסמנת למערכת: משהו חריג קורה."
                    color="orange"
                />
                <PatternCard 
                    title="השלמת מילים (NLP)"
                    icon={<Terminal size={18} />}
                    desc="למה המודל משלים 'מזג' ב-'אוויר'? כי ב-80% מהטקסטים שהוא קרא, זה מה שקרה. הוא פשוט סופר תדירויות."
                    color="green"
                />
            </div>
          </section>


          {/* סעיף 3: סיווג והדגמה מעשית */}
          <section id="part-3" className="scroll-mt-24">
             <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><Brain size={20} /></div>
                    <h2 className="text-2xl font-bold text-white">3. איך זה עובד בפועל? (סיווג Spam/Ham)</h2>
                </div>
                <div className="prose prose-invert text-slate-400 text-base leading-relaxed max-w-none">
                    <p>
                        אחד היישומים הראשונים של כל מתכנת AI הוא <strong>סיווג (Classification)</strong>.
                        האם המייל הוא ספאם? האם התמונה היא חתול?
                    </p>
                    <p>
                        למרות שהמשימות נראות שונות, המנגנון זהה: המודל מחפש תדירויות.
                        הנה טבלה פשוטה שמדגימה איך מודל &quot;לומד&quot; מילים:
                    </p>
                </div>
            </div>

            {/* טבלת מילים */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden mb-8">
                <table className="w-full text-sm text-left text-slate-400" dir="ltr">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-900 border-b border-slate-800">
                        <tr>
                            <th className="px-6 py-3">Word</th>
                            <th className="px-6 py-3">Spam Count</th>
                            <th className="px-6 py-3">Normal Count</th>
                            <th className="px-6 py-3">Conclusion</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-slate-800/50 hover:bg-slate-900/50">
                            <td className="px-6 py-4 font-mono text-white">free</td>
                            <td className="px-6 py-4 text-red-400 font-bold">42</td>
                            <td className="px-6 py-4 text-emerald-400">3</td>
                            <td className="px-6 py-4 text-red-300 text-xs">High Risk (Spam)</td>
                        </tr>
                        <tr className="border-b border-slate-800/50 hover:bg-slate-900/50">
                            <td className="px-6 py-4 font-mono text-white">urgent</td>
                            <td className="px-6 py-4 text-red-400 font-bold">17</td>
                            <td className="px-6 py-4 text-emerald-400">1</td>
                            <td className="px-6 py-4 text-orange-300 text-xs">Suspicious</td>
                        </tr>
                        <tr className="hover:bg-slate-900/50">
                            <td className="px-6 py-4 font-mono text-white">hello</td>
                            <td className="px-6 py-4 text-red-400">2</td>
                            <td className="px-6 py-4 text-emerald-400 font-bold">58</td>
                            <td className="px-6 py-4 text-emerald-300 text-xs">Safe</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p className="text-slate-400 text-sm mb-4">
                המודל רואה ש-<code>free</code> מופיעה כמעט תמיד בספאם. הוא לא צריך להבין שיווק. הוא מבין מספרים.
                <br/> בוא נראה את זה קורה בזמן אמת:
            </p>

            {/* מעבדת הספאם */}
            <SpamDetectorLab />

          </section>


          {/* Quiz */}
          <section id="quiz" className="mt-24 pt-12 border-t border-slate-800">
             <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-white mb-2">בדיקת הבנה: סיכום פרק 3</h2>
                <p className="text-slate-400 text-sm">האם תפסת את הקונספט של הסתברות כתדירות?</p>
             </div>
             <ChapterThreeQuiz />
          </section>

        </main>
      </div>
    </div>
  );
}


// --- קומפוננטות עזר ---

interface PatternCardProps {
    title: string;
    desc: string;
    icon: React.ReactNode;
    color: string;
}

function PatternCard({ title, desc, icon, color }: PatternCardProps) {
    const colors: Record<string, string> = {
        blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
        red: "text-red-400 bg-red-500/10 border-red-500/20",
        orange: "text-orange-400 bg-orange-500/10 border-orange-500/20",
        green: "text-green-400 bg-green-500/10 border-green-500/20",
    };

    return (
        <div className={`p-5 rounded-xl border border-slate-800 bg-slate-900 relative hover:border-slate-700 transition-colors`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 border ${colors[color]}`}>
                {icon}
            </div>
            <h3 className="text-base font-bold text-white mb-2">{title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
        </div>
    )
}

function ChapterThreeQuiz() {
    const [answers, setAnswers] = useState<Record<number, number>>({});
    
    const questions = [
        {
            id: 1,
            text: "מה המשמעות של 'הסתברות 0.9' עבור מפתח AI?",
            options: [
                { id: 1, text: "מספר קסם אבסטרקטי" },
                { id: 2, text: "האירוע קורה בערך ב-90% מהמקרים (תדירות גבוהה)", correct: true },
                { id: 3, text: "המודל בטוח ב-100% שזה נכון" }
            ]
        },
        {
            id: 2,
            text: "איך מודל לומד לזהות ספאם?",
            options: [
                { id: 1, text: "הוא משווה תדירות הופעה של מילים בהודעות ספאם מול הודעות רגילות", correct: true },
                { id: 2, text: "הוא קורא את המייל ומבין את הכוונה הזדונית" },
                { id: 3, text: "מישהו מתכנת לו ידנית את כל חוקי הספאם" }
            ]
        },
        {
            id: 3,
            text: "מה קורה כשיש 'רעש' או חוסר עקביות בנתונים?",
            options: [
                { id: 1, text: "המודל מדלג על הנתונים האלו" },
                { id: 2, text: "המודל לא מצליח לזהות דפוס ברור (ההסתברות מתפזרת)", correct: true },
                { id: 3, text: "המודל ממציא נתונים חדשים" }
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
        <div className="space-y-6 max-w-xl mx-auto text-right">
            {questions.map((q) => (
                <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                    <h4 className="font-bold text-white mb-3 text-sm">{q.text}</h4>
                    <div className="grid grid-cols-1 gap-2">
                        {q.options.map((opt) => {
                            const isSelected = answers[q.id] === opt.id;
                            const isCorrect = opt.correct;
                            
                            let btnClass = "w-full text-right px-4 py-3 rounded-lg border transition-all text-xs flex items-center justify-between ";
                            
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
                        <Link href="/chapter-4">
                            <Button size="lg" className="h-14 px-8 text-md bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-xl hover:scale-105 transition-transform">
                                המשך לפרק 4: הסתברות מותנית <ChevronLeft className="mr-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}