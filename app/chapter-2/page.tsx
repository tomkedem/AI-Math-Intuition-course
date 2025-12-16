"use client";

import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
// ייבוא מלא של כל האייקונים הנדרשים:
import { 
    ChevronLeft, Activity, BarChart3, Calculator, Brain, Terminal, Users, TrendingUp, Check, X, Play, RefreshCcw, RotateCcw,
    BookOpen 
} from "lucide-react";
import { CourseSidebar } from "@/components/CourseSidebar";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';

// --- קומפוננטת תצוגת קוד אינטראקטיבית (Codepen Style) ---
type RunStatus = 'idle' | 'running' | 'done';

interface InteractiveCodeBlockProps {
    filename: string;
    code: string;
    output: string;
    explanation: string;
}

const InteractiveCodeBlock: React.FC<InteractiveCodeBlockProps> = ({ filename, code, output, explanation }) => {
    const [status, setStatus] = useState<RunStatus>('idle');
    const [visualContent, setVisualContent] = useState<React.ReactNode | null>(null);

    const run = useCallback(() => {
        setStatus('running');
        setVisualContent(null);

        // סימולציה של זמן ריצה קצר
        setTimeout(() => {
            setStatus('done');
        }, 800); 
    }, []);

    const reset = useCallback(() => {
        setStatus('idle');
        setVisualContent(null);
    }, []);
    
    // פונקציה שמדגישה תחביר (מאוד בסיסי)
    const highlightCode = (rawCode: string) => {
        const displayCode = rawCode
            .replace(/(import|as|print|np\.(?:array|mean|median|std))/g, '<span class="text-purple-400 font-bold">$1</span>')
            .replace(/(=|:)/g, '<span class="text-white">$1</span>')
            .replace(/('[^']*'|"[^"]*")/g, '<span class="text-orange-400">$1</span>') // תיקון לטיפול בגרשיים בודדים וכפולים
            .replace(/(\d+\.\d+|\d+)/g, '<span class="text-blue-400">$1</span>')
            .replace(/#.*$/gm, '<span class="text-slate-500 italic">$0</span>');
        
        return displayCode;
    }

    const highlightedCode = highlightCode(code);

    return (
        <div className="my-8 border border-slate-800 rounded-xl overflow-hidden bg-[#0d1117] shadow-2xl relative group">
            
            {/* Control Bar */}
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
                    {status === 'running' ? <RefreshCcw size={12} className="animate-spin"/> : status === 'done' ? <RotateCcw size={12}/> : <Play size={12} fill="currentColor"/>}
                    {status === 'done' ? 'נקה פלט' : status === 'running' ? 'מריץ...' : 'הרץ קוד'}
                </Button>
            </div>

            {/* Code and Terminal Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Code Editor */}
                <div className="p-5 font-mono text-sm text-slate-300 border-b lg:border-b-0 lg:border-l border-slate-800 overflow-x-auto leading-relaxed" dir="ltr">
                    {/* *** הפתרון הסופי: משתמשים במחרוזת HTML שהוכנה *** */}
                    <pre className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
                </div>
                
                {/* Terminal Output */}
                <div className="bg-[#090c10] p-5 font-mono text-sm relative min-h-[200px] flex flex-col justify-between">
                    <div className="absolute top-2 right-2 text-[10px] text-slate-600 uppercase tracking-widest font-bold select-none">Terminal Output</div>
                    <AnimatePresence mode="wait">
                        {status === 'idle' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex items-center justify-center text-slate-600 italic text-xs">
                                לחץ על &quot;הרץ קוד&quot; כדי לראות את התוצאה...
                            </motion.div>
                        )}
                        {status === 'running' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center text-blue-400 gap-3">
                                <RefreshCcw size={24} className="animate-spin opacity-50" />
                                <span className="text-xs tracking-wider">EXECUTING SCRIPT...</span>
                            </motion.div>
                        )}
                        {status === 'done' && (
                            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-green-400 whitespace-pre-wrap leading-relaxed w-full pt-4" dir="ltr">
                                <span className="text-slate-500 block mb-2 select-none">$ python3 {filename}</span>
                                {output}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    {/* Explanation / Analysis Area */}
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
// --- סוף קומפוננטת קוד אינטראקטיבית ---


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
          <div className="flex flex-col gap-4 min-w-[250px]">
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
                    className="w-full bg-blue-600 hover:bg-blue-500"
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

    const stdDev = spread * 2.5; 

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
                        כשאנחנו אוספים נתונים, הדבר הראשון שאנחנו מנסים
                        להבין הוא איפה &quot;מרוכז&quot; רוב המידע. אנשים עושים את זה אינטואיטיבית כל הזמן: כששואלים אותך כמה זמן לוקח להגיע לעבודה, אתה לא מחשב נוסחה. אתה זורק מספר שקרוב לתחושת הבטן שלך. זו תפיסה של מרכז.
                    </p>
                    <p>
                        במתמטיקה, המרכז הזה נקרא <strong>מדד מרכזי</strong>, והוא עוזר לנו
                        להבין את הדאטה בלי להסתכל על כל ערך בנפרד. יש שני מדדים מרכזיים
                        שבדרך כלל מספיקים לרוב עבודת ה-AI: <strong>ממוצע</strong> ו<strong>חציון</strong>.
                        שניהם מתארים את אותה שאלה: &quot;מה הערך שמסכם את הדאטה בצורה
                        הטובה ביותר?&quot; אבל כל אחד מהם עושה את זה בדרך אחרת לגמרי.
                    </p>
                    
                    <h4 className="text-xl font-bold text-white mt-8 border-r-4 border-blue-500 pr-3">ממוצע – הקול של כולם</h4>
                    <p>
                        הממוצע מספר לנו מה הערך שמתקבל אם &quot;נפזר את העומס&quot;
                        שווה בשווה בין כל הנקודות. הוא נותן משקל לכולם – כולל לחריגים.
                    </p>
                    <p>
                        לכן אם רוב האנשים מרוויחים 10,000 ש&quot;ח וחמישה
                        מנהלים מרוויחים חצי מיליון, הממוצע &quot;נמשך&quot; למעלה, למרות שהוא
                        לא מייצג אף אדם אמיתי. הממוצע טוב כשאין ערכים חריגים. הוא פחות טוב כשיש פיזור קיצוני.
                    </p>

                    <h4 className="text-xl font-bold text-white mt-8 border-r-4 border-green-500 pr-3">חציון – הקול של האמצע</h4>
                    <p>
                        החציון לא מבצע חישובים מסובכים. הוא פשוט שואל:
                        &quot;מה הערך שנמצא בדיוק באמצע הרשימה?&quot; זו דרך מדויקת ויציבה יותר להבין מה רוב
                        האנשים מרגישים, והיא
                        לא מושפעת ממיעוט קיצוני.
                    </p>
                    <p className="bg-slate-950/50 p-4 border-r-4 border-green-500 rounded-r text-sm">
                        לכן בשכר, בזמן תגובה של שרתים, במספר ביקורים באתר
                        או בכל דאטה עם &quot;זנב ארוך&quot;, חציון הוא כלי הרבה יותר שימושי מממוצע.
                    </p>

                    {/* **הוראות שימוש למעבדה** */}
                    <div className="bg-slate-950/50 p-4 border border-slate-700 rounded-lg mt-8">
                        <h5 className="text-sm font-bold text-white mb-2">מעבדה 1: בחינת הטיית הממוצע</h5>
                        <p className="text-xs text-slate-400">
                            לחץ על כפתור <strong>&quot;הכנס מנכ&quot;ל (חריג)&quot;</strong>.
                            שים לב איך קו <strong>הממוצע (צהוב)</strong> קופץ למעלה באופן דרסטי עקב הערך הקיצוני (100K), בעוד שקו <strong>החציון (ירוק)</strong> נשאר קרוב לערך האמיתי של רוב הנתונים.
                        </p>
                    </div>

                </div>
            </div>

            {/* ויזואליזציה: ממוצע מול חציון */}
            <MeanMedianLab />

             <div className="prose prose-invert text-slate-400 text-base leading-relaxed max-w-none space-y-4 mt-8">
                <h3 className="text-xl font-bold text-white mt-8 border-r-4 border-emerald-500 pr-3">למה זה חשוב למפתחי AI?</h3>
                 <p>
                    כי מודלים לומדים מתוך המספרים שאנחנו מזינים להם. אם הנתונים מוטים, אם הם מעוותים, ואם יש בהם ערכים חריגים, המודל ילמד דפוס
                    שגוי. הוא לא יודע להתעלם מרעש, הוא פשוט לומד את מה שהוא
                    רואה.
                </p>
                 <p>
                    לכן השאלה &quot;מהו המרכז?&quot; היא לא שאלה אקדמית. זו שאלה
                    פרקטית לגמרי שיכולה לקדם מודל קדימה – או להפיל אותו.
                </p>
             </div>

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
                        שני datasets יכולים לקבל
                        אותו ממוצע ואותו חציון, ועדיין להיות שונים לגמרי. לדוגמה:
                    </p>
                    <ul className="list-disc pr-6 space-y-1">
                        <li>קבוצה אחת שבה כל הערכים כמעט זהים (דאטה יציב).</li>
                        <li>קבוצה שנייה שבה חלק מהערכים נמוכים מאוד וחלק קופצים לשמים (דאטה רועש).</li>
                    </ul>
                    
                    <h4 className="text-xl font-bold text-white mt-8 border-r-4 border-purple-500 pr-3">פיזור – כמה הדאטה &quot;רועש&quot;</h4>
                    <p>
                        פיזור הוא מושג פשוט: כמה רחוקות הנקודות מהמרכז?
                        אם רוב הנקודות צמודות למרכז – זה דאטה יציב וצפוי. אם הן מתפזרות לכל הכיוונים – יש רעש שמקשה על מודל ללמוד דפוס ברור.
                    </p>
                    <p>
                        דמיין שרתים: שרת א&apos; עונה תמיד בין 49ms ל-51ms. שרת ב&apos; עונה פעם ב-1ms ופעם ב-99ms.
                        הממוצע שלהם זהה (50ms), אבל הפיזור שונה לחלוטין. במערכת
                        אמיתית – הקבוצה השנייה תהיה סיוט תפעולי.
                    </p>

                    <h4 className="text-xl font-bold text-white mt-8 border-r-4 border-red-500 pr-3">סטיית תקן – המדד הפשוט לפיזור</h4>
                    <p>
                        כאן מגיע הכלי שנשמע מסובך אבל הוא הכי פשוט בסיפור: <strong>סטיית תקן (Standard Deviation)</strong>.
                        זו דרך למדוד במדויק כמה רחוקות הנקודות מהממוצע. היא לוקחת את כל הפיזור, &quot;ממירה&quot; אותו למספר אחד, ומאפשרת להשוות datasets שונים בצורה ברורה.
                    </p>
                    <div className="flex gap-4 text-sm mt-2">
                        <div className="text-green-400 font-bold bg-green-900/20 px-2 py-1 rounded">סטייה נמוכה = המידע אמין</div>
                        <div className="text-red-400 font-bold bg-red-900/20 px-2 py-1 rounded">סטייה גבוהה = רעש וכאוס</div>
                    </div>
                    
                    {/* **הוראות שימוש לסימולטור** */}
                    <div className="bg-slate-950/50 p-4 border border-slate-700 rounded-lg mt-8">
                        <h5 className="text-sm font-bold text-white mb-2">סימולטור 2: רעש וסטיית תקן</h5>
                        <p className="text-xs text-slate-400">
                            גרור את הסליידר משמאל לימין (High Std).
                            שים לב: ככל שאתה מגדיל את הפיזור (Spread), הנקודות מתרחקות מקו האמצע (50ms) וסטיית התקן עולה (std_dev). 
                            **תובנה:** פיזור גדול מדי אומר שהמודל יתקשה להבחין בדפוסים, והתוצאות יהיו לא יציבות.
                        </p>
                    </div>
                </div>
            </div>

            {/* ויזואליזציה: סטיית תקן */}
            <StdDevSimulator />

             <div className="prose prose-invert text-slate-400 text-base leading-relaxed max-w-none space-y-4 mt-8">
                <h3 className="text-xl font-bold text-white mt-8 border-r-4 border-emerald-500 pr-3">למה פיזור חשוב ל-AI?</h3>
                 <p>
                    כי מודל לומד מהממוצע והחציון – אבל חי בתוך הפיזור. פיזור
                    גדול מדי אומר:
                </p>
                <ul className="list-disc pr-6 space-y-1">
                    <li>המודל יתקשה להבחין בדפוסים.</li>
                    <li>התוצאות יהיו לא יציבות.</li>
                    <li>המודל &quot;יתבלבל&quot; ויזוז לכיוונים אקראיים בזמן האימון.</li>
                </ul>
                <p>
                    סטטיסטיקה בסיסית היא לא &quot;קישוט&quot;. היא
                    חלק מהאיכות של המודל.
                </p>
             </div>

          </section>


          {/* סעיף 3: דוגמאות מהעולם האמיתי */}
          <section id="part-3" className="scroll-mt-24">
             <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><Users size={20} /></div>
                <div>
                    <h2 className="text-2xl font-bold text-white">3. דוגמאות על נתונים אמיתיים</h2>
                    <p className="text-slate-400 text-sm">
                        איפה תפגוש את המדדים האלה ביום יום שלך?
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
                    title="מחירי דירות/מוצרים" 
                    scenario="ניקוי דאטה"
                    desc="ערכי קיצון בודדים (כמו מוצר יקר בטעות או סייל קיצוני) יכולים להקפיץ את הממוצע. מודל חייב להשתמש בחציון כדי לא להתבלבל."
                    icon={<Calculator size={18} />} color="purple"
                />
                <ExampleCard 
                    title="דירוג באפליקציה" 
                    scenario="מערכות המלצה"
                    desc="הפיזור מספר את הסיפור: מוצר שבו הסטייה נמוכה אומר שרוב הדירוגים עקביים. סטייה גבוהה מעידה על מחלוקת או התנהגות חשודה."
                    icon={<Brain size={18} />} color="emerald"
                />
            </div>
          </section>


          {/* סעיף 4: NumPy Demo - שימוש ב-CodeBlockDisplay המשודרג */}
          <section id="part-4" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-white mb-4">4. הדגמה קצרה ב-NumPy</h2>
            <div className="prose prose-invert text-slate-400 text-base leading-relaxed max-w-none space-y-4">
                <p>
                    אחרי שהבנו את הרעיונות מאחורי ממוצע, חציון וסטיית
                    תקן דרך דוגמאות מהעולם האמיתי, הגיע הזמן לראות איך זה נראה בקוד.
                    NumPy נועדה לעבוד עם מספרים במהירות וביעילות. 
                </p>
                <p>
                    בכל מה שקשור לדאטה – היא הכלי שהופך מתמטיקה &quot;על נייר&quot; למשהו שמתחבר ישירות למערכות
                    אמיתיות.
                </p>
            </div>
             
             {/* CodeBlockDisplay מחליף את SimpleCodeDisplay */}
             <InteractiveCodeBlock
                filename="stat_analysis.py"
                code={`import numpy as np

# דאטה: זמני תגובה במילי-שניות
latencies = np.array([98, 102, 100, 101, 99, 103])

# חישובים:
avg = np.mean(latencies)      # ממוצע
med = np.median(latencies)    # חציון
std = np.std(latencies)       # סטיית תקן

print(f'Average: {avg}')
print(f'Std Dev: {std:.2f}')`}
                output={`Average: 100.5
Std Dev: 1.70`}
                explanation="תוצאה: ממוצע וחציון קרובים (דאטה מאוזן). סטיית תקן נמוכה (מערכת יציבה). NumPy מחשבת את המדדים במהירות הנדרשת ל-AI."
            />

            <div className="prose prose-invert text-slate-400 text-base leading-relaxed max-w-none space-y-4 mt-8">
                <h3 className="text-xl font-bold text-white mt-8 border-r-4 border-red-500 pr-3">למה זה קריטי לראות את זה בקוד?</h3>
                 <p>
                    כי ברגע שמפעילים את זה על נתונים אמיתיים בפרויקט שלך, המספרים מפסיקים להיות &quot;מושגים
                    מתמטיים&quot;, והופכים לכלים אמיתיים שעוזרים:
                 </p>
                <ul className="list-disc pr-6 space-y-1">
                    <li>לנקות דאטה ולזהות בעיות.</li>
                    <li>להבין דפוסים ולשפר מודלים.</li>
                    <li>לשפר מודלים על ידי טיפול נכון בפיזור ובערכים קיצוניים.</li>
                </ul>
                <p className="font-bold text-white">
                    זוהי אנליזה בסיסית, אבל כזו שכל מפתח AI משתמש בה כמעט בכל פרויקט.
                </p>
             </div>
          </section>


          {/* Quiz */}
          <section id="quiz" className="mt-16 pt-8 border-t border-slate-800">
             <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">בדיקת הבנה: סיכום פרק 2</h2>
                <p className="text-slate-400 text-sm">האם הבנת את ההבדל בין ממוצע, חציון וסטיית תקן?</p>
             </div>
             {/* Quiz component */}
              <ChapterTwoQuiz />
          </section>

        </main>
      </div>
    </div>
  );
}


// --- קומפוננטות עזר (ExampleCard ו-ChapterTwoQuiz) ---

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
                                המשך לפרק 3: הסתברות <ChevronLeft className="mr-2 h-4 w-4 rotate-180" />
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}