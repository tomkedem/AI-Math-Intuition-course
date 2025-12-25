"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { 
    Terminal, ChevronLeft, 
    Code2, Box, Cpu, Layers, Wand2, ScanLine,
    Map, ShieldCheck, Microscope, Rocket, LucideIcon
} from "lucide-react";
import Link from 'next/link';
import Image from 'next/image'; 
import { motion, AnimatePresence } from "framer-motion";

import { ChapterLayout } from '@/components/ChapterLayout';

// פתרון Hydration - טעינה דינמית לבלוק הקוד למניעת שגיאות קונסול
const CodeBlock = dynamic(() => import('@/components/content/CodeBlock').then(mod => mod.CodeBlock), { 
  ssr: false,
  loading: () => <div className="h-24 w-full bg-slate-900/50 animate-pulse rounded-xl" />
});

// --- רכיב תמונה עם אנימציית סריקה (גרסה צרה וסינמטית) ---
const TechScannerImage = () => {
    return (
        <div className="relative w-full max-w-5xl mx-auto h-55 md:h-70 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl group my-8">
            <Image 
                src="/python-hero.png" 
                alt="Python Engineering"
                fill
                priority
                className="object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30 pointer-events-none"></div>
            <div className="absolute inset-0 bg-linear-to-r from-[#020617] via-transparent to-[#020617] opacity-80"></div>
            <motion.div 
                animate={{ left: ['0%', '100%', '0%'] }} 
                transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                className="absolute top-0 w-0.5 h-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)] z-10 opacity-70"
            />
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

// --- רכיב XRayCard (לוגיקה מלאה כולל הצד האחורי) ---
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
                <h3 className="text-xl font-bold text-slate-200 tracking-wider font-mono text-center">{term}</h3>
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
                <p className="text-center text-slate-200 text-sm font-medium leading-relaxed px-2" dir="rtl">
                    {reality}
                </p>
            </motion.div>
        </div>
    );
};

// --- רכיב CodeEvolutionDemo (לוגיקה מלאה) ---
const CodeEvolutionDemo = () => {
    const [mode, setMode] = useState<'old' | 'pythonic'>('old');

    const oldCode = `\n# Java/C Style\nnumbers = [1, 2, 3, 4, 5]\ndoubled = []\n\nfor i in range(len(numbers)):\n    if numbers[i] % 2 == 0:\n        doubled.append(numbers[i] * 2)\n    `;

    const pythonicCode = `\n# The Pythonic Way\nnumbers = [1, 2, 3, 4, 5]\n\n# Readable, Concise, Faster\ndoubled = [n * 2 for n in numbers if n % 2 == 0]\n    `;

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
                <AnimatePresence mode="wait">
                    <motion.div
                        key={mode}
                        initial={{ opacity: 0, x: mode === 'pythonic' ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: mode === 'pythonic' ? -20 : 20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 p-4"
                    >
                         <CodeBlock 
                            language="python" 
                            code={mode === 'old' ? oldCode : pythonicCode} 
                            filename={mode === 'old' ? 'script.py' : 'engineering.py'}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className={`p-3 text-center text-xs font-bold transition-colors duration-500 ${mode === 'pythonic' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-slate-800 text-slate-500'}`}>
                {mode === 'pythonic' ? "✨ 40% Less Code, 100% More Readable" : "⚠️ Verbose, Harder to maintain"}
            </div>
        </div>
    );
};

interface RoadmapStepProps {
    icon: LucideIcon;
    title: string;
    desc: string;
    phase: string;
}

const RoadmapStep = ({ icon: Icon, title, desc, phase }: RoadmapStepProps) => (
    <div className="relative flex flex-col items-center text-center p-6 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-emerald-500/30 transition-all group shadow-lg">
        <div className="absolute -top-3 right-4 px-2 py-0.5 bg-slate-800 rounded-md border border-slate-700 text-[10px] font-mono text-slate-400 uppercase tracking-tighter">
            {phase}
        </div>
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform shadow-inner">
            <Icon size={24} />
        </div>
        <h4 className="text-white font-bold text-sm mb-2">{title}</h4>
        <p className="text-[11px] text-slate-400 leading-relaxed">{desc}</p>
    </div>
);

export default function PythonIntroPage() {
  return (
   <ChapterLayout courseId="python" currentChapterId={0}>
          
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-emerald-400 mb-2">
                <Terminal size={24} />
                <span className="font-mono text-sm tracking-wider uppercase">Python for AI Engineers</span>
            </div>
            <h1 className="text-4xl font-black text-white leading-tight">
                המנוע השקט של ה-AI
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
                היא לא רק שפת סקריפטים. היא השפה שבה נבנים המודלים הגדולים בעולם.
            </p>
            <div className="mt-6">
                <TechScannerImage />
            </div>
          </section>

          <section className="max-w-5xl mx-auto space-y-12 mb-28 px-4 text-right" dir="rtl">
                <div className="flex items-center gap-3 border-r-4 border-emerald-500 pr-4">
                    <Map className="text-emerald-500" size={24} />
                    <h2 className="text-lg font-bold text-white uppercase tracking-wide">מפת הדרכים: מהיסודות לארכיטקטורה</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <RoadmapStep phase="Phase 01" icon={Terminal} title="יסודות התחביר" desc="שליטה במשתנים, לוגיקה ומבני נתונים שיניעו את המערכת." />
                    <RoadmapStep phase="Phase 02" icon={Code2} title="תכנות מונחה עצמים" desc="בניית ארכיטקטורה מודולרית (Classes) לניהול פרויקטים." />
                    <RoadmapStep phase="Phase 03" icon={Microscope} title="ניתוח נתונים" desc="שימוש בספריות AI מתקדמות להכנת דאטהסטים למודלים." />
                    <RoadmapStep phase="Phase 04" icon={ShieldCheck} title="ארכיטקטורת ייצור" desc="בניית פרויקט סיום עם CI/CD, Docker וניהול גרסאות." />
                </div>
                          </section>

          <section className="max-w-3xl mx-auto space-y-8 mb-28 relative z-20 px-4 text-right" dir="rtl">
            <h2 className="text-2xl md:text-3xl font-bold text-white border-r-4 border-yellow-500 pr-6">
                למה מתכנתים מנוסים צריכים את הספר הזה?
            </h2>
            <div className="prose prose-invert prose-lg text-slate-300 leading-8">
                <p>אתה כבר יודע לכתוב קוד. אתה מכיר משתנים, לולאות, מחלקות ו-Design Patterns. אז למה פייתון מרגישה לפעמים... מוזרה?</p>
                <p>האמת היא שרוב המפתחים שמגיעים משפות כמו Java או C# כותבים פייתון במבטא זר. הקוד עובד, אבל הוא מסורבל, איטי וקשה לתחזוקה. בעולם ה-AI, אי יעילות כזו היא קריטית.</p>
                <div className="bg-slate-900/80 p-7 rounded-2xl border border-slate-700/50 shadow-inner my-10">
                    <p className="font-bold text-xl text-white mb-3">לא עוד &quot;Hello World&quot;</p>
                    <p className="text-slate-400 leading-relaxed text-base">אנחנו לא נלמד כאן תחביר בסיסי. אנחנו נצלול ישר לעומק: ניהול זיכרון, עיבוד מקבילי, Type Hints, וארכיטקטורה של פרויקטים מורכבים.</p>
                </div>
            </div>
          </section>

          <section className="relative mb-28 text-right" dir="rtl">
             <div className="text-center mb-14">
                <h2 className="text-3xl font-bold text-white mb-4">מושגים שתפגוש בדרך</h2>
                <p className="text-slate-400 text-lg italic font-sans">רחף כדי לראות מה מסתתר מאחורי ה-Buzzwords</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                <XRayCard 
                    icon={<Layers size={32} />} 
                    term="Decorators" 
                    reality="פונקציה שעוטפת פונקציה אחרת ומוסיפה לה כוחות על מבלי לשנות את קוד המקור." 
                    color="blue" 
                />
                <XRayCard 
                    icon={<Cpu size={32} />} 
                    term="GIL" 
                    reality="Global Interpreter Lock - מנגנון שמונע מפייתון לנצל ריבוי ליבות ב-Threads, אתגר קריטי בחישובי AI." 
                    color="rose" 
                />
                <XRayCard 
                    icon={<Code2 size={32} />} 
                    term="Type Hints" 
                    reality="הוספת טיפוסים לקוד דינמי. הופך את הקוד לבטוח, קריא וקל לניהול בצוותים גדולים." 
                    color="emerald" 
                />
                <XRayCard 
                    icon={<Box size={32} />} 
                    term="Virtual Env" 
                    reality="ניהול סביבות מבודד המונע 'גיהנום של תלויות' ומאפשר ניהול גרסאות מדויק לכל פרויקט." 
                    color="amber" 
                />
             </div>
          </section>

          <section className="max-w-5xl mx-auto py-16 space-y-14 px-4 text-right" dir="rtl">
             <div className="text-center">
                 <h2 className="text-3xl font-bold text-white mb-3">השינוי בתפיסה (The Shift)</h2>
                 <p className="text-slate-400 text-lg">זה לא רק Syntax, זו דרך חשיבה הנדסית אחרת.</p>
             </div>
             <div className="grid md:grid-cols-2 gap-16 items-center">
                 <div className="h-full"><CodeEvolutionDemo /></div>
                 <div className="space-y-8">
                     <div className="flex gap-5">
                         <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 shrink-0 font-mono text-lg border border-slate-700">1</div>
                         <div>
                             <h4 className="font-bold text-slate-200 text-lg mb-1">סקריפטים (The Old View)</h4>
                             <p className="text-slate-400 leading-relaxed">פייתון היא &quot;דבק&quot; מהיר. כותבים קובץ אחד ארוך, בלי מבנה. גישה שמתרסקת בפרויקטים גדולים.</p>
                         </div>
                     </div>
                     <div className="flex gap-5">
                         <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 shrink-0 font-mono text-lg border border-yellow-500/30">2</div>
                         <div>
                             <h4 className="font-bold text-white text-lg mb-1">הנדסה (The New View)</h4>
                             <p className="text-slate-300 leading-relaxed">פייתון היא פלטפורמה הנדסית יציבה. עם בדיקות, טיפוסים, ומבנה מודולרי שמאפשר סקילביליות.</p>
                         </div>
                     </div>
                     <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800 mt-10 shadow-lg">
                        <h5 className="text-sm font-bold text-yellow-500 mb-2 flex items-center gap-2"><Rocket size={16} />הפרויקט המלווה: Mini Text Analyzer</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">במהלך הקורס נבנה כלי CLI מקצועי שמיישם ניהול גרסאות, בדיקות אוטומטיות וארכיטקטורה מתקדמת.</p>
                     </div>
                 </div>
             </div>
          </section>

          <section className="py-24 text-center border-t border-slate-800 mt-12">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Link href="/python/chapter-1">
                        <Button size="lg" className="h-20 px-16 text-xl bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black rounded-full shadow-[0_0_60px_rgba(234,179,8,0.4)] border-t border-yellow-300/50 group font-black">
                            <span className="tracking-wide ml-4 italic">בוא נתחיל להנדס</span>
                            <div className="bg-black/10 p-2 rounded-full group-hover:bg-black/20 transition-colors">
                                <ChevronLeft size={24} className="text-black" />
                            </div>
                        </Button>
                    </Link>
                </motion.div>
                <p className="mt-8 text-slate-500 text-sm font-mono tracking-widest uppercase opacity-60">Syllabus 2025 • 18 Modules</p>
          </section>

    </ChapterLayout>
  );
}