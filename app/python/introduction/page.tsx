"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
    Terminal, ChevronLeft, 
    Code2, Box, Cpu, Layers,  Wand2, ScanLine
} from "lucide-react";
import Link from 'next/link';
import Image from 'next/image'; 
import { motion } from "framer-motion";

import { CodeBlock } from '@/components/content/CodeBlock';
import { ChapterLayout } from '@/components/ChapterLayout';

// --- רכיב תמונה עם אנימציית סריקה (גרסה צרה וסינמטית) ---
const TechScannerImage = () => {
    return (
        // שינוי קריטי: הגובה ירד מ-500px ל-220px/280px
        // זה יוצר את אפקט ה"רצועה" (Middle 1/3) שביקשת
        <div className="relative w-full max-w-5xl mx-auto h-55 md:h-70 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl group my-8">
            
            <Image 
                src="/python-hero.png" 
                alt="Python Engineering"
                fill
                // object-cover + center = חותך אוטומטית את הלמעלה והלמטה ומשאיר את האמצע
                className="object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity duration-700"
            />
            
            {/* גריד עדין מעל */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30 pointer-events-none"></div>
            
            {/* גרדיאנטים בצדדים להשתלבות חלקה */}
            <div className="absolute inset-0 bg-linear-to-r from-[#020617] via-transparent to-[#020617] opacity-80"></div>

            {/* סורק לייזר */}
            <motion.div 
                animate={{ left: ['0%', '100%', '0%'] }} // שיניתי לתנועה אופקית שמתאימה לפורמט רחב
                transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                className="absolute top-0 w-0.5 h-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)] z-10 opacity-70"
            />
            
            {/* טקסט צף - הזזתי שמאלה שיהיה מאוזן */}
            <div className="absolute bottom-4 left-6 z-20 text-left hidden md:block">
                <div className="flex items-center gap-2 text-blue-400 font-mono text-xs mb-1">
                    <ScanLine size={14} className="animate-pulse" />
                    <span>ENGINE_CORE_V4</span>
                </div>
                <div className="text-xs text-slate-500 font-mono">10101010...PROCESS</div>
            </div>
        </div>
    );
};

// --- שאר הרכיבים נשארים ללא שינוי (XRayCard, CodeEvolutionDemo) ---
const XRayCard = ({ icon, term, reality, color }: { icon: React.ReactNode, term: string, reality: string, color: string }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="relative h-44 w-full cursor-pointer group perspective-1000"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsHovered(!isHovered)}
        >
            <motion.div 
                animate={{ rotateX: isHovered ? 180 : 0, opacity: isHovered ? 0 : 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="absolute inset-0 bg-slate-900/80 border border-slate-700 rounded-2xl flex flex-col items-center justify-center p-4 shadow-xl z-20 backface-hidden"
            >
                <div className={`p-3 rounded-full bg-slate-800 text-slate-400 mb-3 group-hover:scale-110 transition-transform duration-500`}>
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-slate-200 tracking-wider font-mono">{term}</h3>
                <span className="text-xs text-slate-500 mt-2">רחף כדי לגלות</span>
            </motion.div>

            <motion.div 
                initial={{ rotateX: -180, opacity: 0 }}
                animate={{ rotateX: isHovered ? 0 : -180, opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                className={`absolute inset-0 bg-slate-900/95 border border-${color}-500/50 rounded-2xl flex flex-col items-center justify-center p-4 shadow-[0_0_30px_rgba(0,0,0,0.3)] z-10 backdrop-blur-md`}
                style={{ borderColor: `var(--${color}-500)` }} 
            >
                <h3 className={`text-lg font-bold mb-2 text-${color}-400`}>בתכל&apos;ס...</h3>
                <p className="text-center text-slate-200 text-sm font-medium leading-relaxed">
                    {reality}
                </p>
            </motion.div>
        </div>
    );
};

const CodeEvolutionDemo = () => {
    const [mode, setMode] = useState<'old' | 'pythonic'>('old');

    const oldCode = `
# Java/C Style
numbers = [1, 2, 3, 4, 5]
doubled = []

for i in range(len(numbers)):
    if numbers[i] % 2 == 0:
        doubled.append(numbers[i] * 2)
    `;

    const pythonicCode = `
# The Pythonic Way
numbers = [1, 2, 3, 4, 5]

# Readable, Concise, Faster
doubled = [n * 2 for n in numbers if n % 2 == 0]
    `;

    return (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-1 shadow-2xl relative overflow-hidden flex flex-col w-full h-full min-h-87.5">
            <div className="flex border-b border-slate-800 bg-slate-900/50">
                <button 
                    onClick={() => setMode('old')}
                    className={`flex-1 py-3 text-sm font-mono transition-colors flex items-center justify-center gap-2 ${mode === 'old' ? 'text-slate-200 bg-slate-800' : 'text-slate-500 hover:text-slate-300'}`}
                >
                    <Code2 size={16} /> Old School
                </button>
                <button 
                    onClick={() => setMode('pythonic')}
                    className={`flex-1 py-3 text-sm font-mono transition-colors flex items-center justify-center gap-2 ${mode === 'pythonic' ? 'text-yellow-400 bg-slate-800 border-b-2 border-yellow-500' : 'text-slate-500 hover:text-slate-300'}`}
                >
                    <Wand2 size={16} /> Pythonic
                </button>
            </div>

            <div className="flex-1 relative p-4 font-mono text-sm overflow-hidden" dir="ltr">
                <motion.div
                    key={mode}
                    initial={{ opacity: 0, x: mode === 'pythonic' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 p-4"
                >
                     <CodeBlock 
                        language="python" 
                        code={mode === 'old' ? oldCode : pythonicCode} 
                        filename={mode === 'old' ? 'script.py' : 'engineering.py'}
                    />
                </motion.div>
            </div>

            <div className={`p-3 text-center text-xs font-bold transition-colors duration-500 ${mode === 'pythonic' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-slate-800 text-slate-500'}`}>
                {mode === 'pythonic' ? "✨ 40% Less Code, 100% More Readable" : "⚠️ Verbose, Harder to maintain"}
            </div>
        </div>
    );
};

export default function PythonIntroPage() {
  return (
   <ChapterLayout courseId="python" currentChapterId={0}>
          
          {/* --- HERO SECTION --- */}
          {/* שינוי 1: הסרנו את -mt-12 והוספנו pt-8 כדי שהטקסט לא ייחתך */}
          {/* שינוי 2: min-h-60vh במקום 85vh כדי שיראו שיש המשך */}
          <section className="relative min-h-[60vh] flex flex-col justify-start items-center text-center space-y-6 pt-38 pb-12">
            
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-900/30 via-[#020617] to-[#020617]"></div>
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-top opacity-10 mask-[linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
            </div>    

            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full px-4"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-medium mb-4 backdrop-blur-sm">
                    <Terminal size={14} />
                    <span>פייתון פרקטי למתכנתים</span>
                </div>
                
                {/* כותרת קצת יותר קומפקטית */}
                <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-linear-to-b from-white via-slate-200 to-slate-500 leading-tight mb-4 drop-shadow-lg">
                    המנוע השקט <br/>
                    <span className="bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">של ה-AI</span>
                </h1>

                <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
                    היא לא רק שפת סקריפטים. היא השפה שבה נבנים המודלים הגדולים בעולם. 
                </p>

                {/* --- כאן התמונה החדשה והצרה --- */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mt-6 px-4"
                >
                    <TechScannerImage />
                </motion.div>

            </motion.div>
          </section>

          {/* --- THE PROBLEM --- */}
          {/* הוספנו z-20 ורקע כדי שזה "יעלה" על ה-Hero בצורה יפה */}
          <section className="max-w-3xl mx-auto space-y-8 mb-24 relative z-20 px-4 -mt-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white border-r-4 border-yellow-500 pr-6">
                למה מתכנתים מנוסים צריכים את הספר הזה?
            </h2>
            
            <div className="prose prose-invert prose-lg text-slate-300 leading-8">
                <p>
                    אתה כבר יודע לכתוב קוד. אתה מכיר משתנים, לולאות, מחלקות ו-Design Patterns.
                    אז למה פייתון מרגישה לפעמים... מוזרה?
                </p>
                <p>
                    האמת היא שרוב המפתחים שמגיעים משפות כמו Java או C# כותבים פייתון במבטא זר.
                    הקוד עובד, אבל הוא מסורבל, איטי וקשה לתחזוקה. בעולם ה-AI, אי יעילות כזו היא קריטית.
                </p>
                <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-700/50 shadow-inner my-8">
                    <p className="font-bold text-xl text-white mb-2">לא עוד &quot;Hello World&quot;</p>
                    <p className="text-slate-400">
                        אנחנו לא נלמד כאן תחביר בסיסי. אנחנו נצלול ישר לעומק: ניהול זיכרון, 
                        עיבוד מקבילי, Type Hints, וארכיטקטורה של פרויקטים מורכבים.
                    </p>
                </div>
            </div>
          </section>

          {/* --- X-RAY SECTION --- */}
          <section className="relative">
             <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">מושגים שתפגוש בדרך</h2>
                <p className="text-slate-400">רחף כדי לראות מה מסתתר מאחורי ה-Buzzwords</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                <XRayCard 
                    icon={<Layers size={32} />}
                    term="Decorators"
                    reality="פונקציה שעוטפת פונקציה אחרת ומוסיפה לה כוחות על."
                    color="blue"
                />
                <XRayCard 
                    icon={<Cpu size={32} />}
                    term="GIL"
                    reality="מנגנון בטיחות שמונע מפייתון להריץ שני דברים *באמת* בו זמנית."
                    color="rose"
                />
                <XRayCard 
                    icon={<Code2 size={32} />}
                    term="Type Hints"
                    reality="תיעוד חי שה-IDE קורא כדי לצעוק עליך לפני שיש באג."
                    color="emerald"
                />
                <XRayCard 
                    icon={<Box size={32} />}
                    term="Virtual Env"
                    reality="בועה מבודדת ששומרת על הפרויקט שלך שלא יתנגש עם אחרים."
                    color="amber"
                />
             </div>
          </section>

          {/* --- THE SHIFT DEMO --- */}
          <section className="max-w-5xl mx-auto py-16 space-y-12 px-4">
             <div className="text-center">
                 <h2 className="text-3xl font-bold text-white mb-2">השינוי בתפיסה (Shift)</h2>
                 <p className="text-slate-400">זה לא רק Syntax, זו דרך חשיבה אחרת.</p>
             </div>

             <div className="grid md:grid-cols-2 gap-12 items-center">
                 <div className="h-full">
                    <CodeEvolutionDemo />
                 </div>

                 <div className="space-y-6 text-right">
                     <div className="flex gap-4">
                         <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 shrink-0 font-mono">1</div>
                         <div>
                             <h4 className="font-bold text-slate-300">סקריפטים (The Old View)</h4>
                             <p className="text-sm text-slate-500">
                                 פייתון היא &quot;דבק&quot; מהיר. כותבים קובץ אחד ארוך, בלי מבנה, העיקר שזה רץ.
                             </p>
                         </div>
                     </div>
                     <div className="flex gap-4">
                         <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 shrink-0 font-mono">2</div>
                         <div>
                             <h4 className="font-bold text-white">הנדסה (The New View)</h4>
                             <p className="text-sm text-slate-400">
                                 פייתון היא פלטפורמה הנדסית יציבה. עם בדיקות, טיפוסים, ומבנה מודולרי.
                             </p>
                         </div>
                     </div>
                     
                     <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 mt-6">
                        <h5 className="text-sm font-bold text-yellow-500 mb-1 flex items-center gap-2">
                            <Terminal size={14} />
                            הפרויקט המלווה
                        </h5>
                        <p className="text-xs text-slate-400">
                            במהלך הקורס נבנה את <strong>Mini Text Analyzer</strong> - כלי CLI אמיתי שמיישם את כל עקרונות ההנדסה האלו.
                        </p>
                     </div>
                 </div>
             </div>
          </section>

          {/* --- CTA --- */}
          <section className="py-20 text-center">
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link href="/python/chapter-1">
                        <Button size="lg" className="h-20 px-16 text-xl bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black rounded-full shadow-[0_0_60px_rgba(234,179,8,0.4)] border-t border-yellow-300/50 group">
                            <span className="font-black tracking-wide ml-3">בוא נתחיל להנדס</span>
                            <div className="bg-black/10 p-2 rounded-full group-hover:bg-black/20 transition-colors">
                                <ChevronLeft size={24} className="text-black" />
                            </div>
                        </Button>
                    </Link>
                </motion.div>
                <p className="mt-6 text-slate-500 text-sm">
                    פרק 1: למה פייתון חשובה בעידן ה-AI?
                </p>
          </section>

    </ChapterLayout>
  );
}