"use client";


import { Button } from "@/components/ui/button";
import { 
    Terminal, ChevronLeft, 
    Code2, Box, Cpu, Layers,
    Map, Rocket
} from "lucide-react";
import Link from 'next/link';
import { motion } from "framer-motion";

import { ChapterLayout } from '@/components/ChapterLayout';

// פתרון Hydration - טעינה דינמית לבלוק הקוד למניעת שגיאות קונסול

// ייבוא הרכיבים מהתיקיות שבנית (וודא שהם מיוצאים כראוי ב-index)
import { 
    AILeverageHero, 
    IndustrialRoadmap, 
    CapabilityExplorer,
    XRayCard, 
    CodeEvolutionDemo,
    TechScannerImage,
    FireText
} from "@/components/demos/python-intro";

export default function PythonIntroPage() {
  return (
    <ChapterLayout courseId="python" currentChapterId={0}>
          
          {/* --- Hero Section --- */}
          <section className="space-y-6 pt-40">
            <div className="flex items-center gap-3 text-emerald-400 mb-2">
                <Terminal size={24} />
                <span className="font-mono text-sm tracking-wider uppercase">Python for AI Engineers</span>
            </div>
                  
            <FireText text="המנוע השקט" suffix="של ה-AI" />
           
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                פייתון היא לא רק שפת סקריפטים. היא השפה שבה נבנים המודלים הגדולים בעולם. השליטה בה פותחת את הדלת מחשיבת מימוש לחשיבת ארכיטקטורת בינה, אלא בונה ארכיטקטורת בינה.
            </p>
            <div className="mt-3">
                <TechScannerImage />
            </div>
          </section>
          

          {/* --- ה-Hook ההנדסי (AILeverage) --- */}
          <section className="border-b border-slate-800/50">
             <AILeverageHero />
          </section>

          {/* --- מפת הדרכים המלאה --- */}
          <section className="max-w-5xl mx-auto space-y-12 py-20 px-4 text-right" dir="rtl">
                <div className="flex items-center gap-3 border-r-4 border-emerald-500 pr-4">
                    <Map className="text-emerald-500" size={24} />
                    <h2 className="text-2xl font-bold text-white uppercase tracking-wide">מפת הדרכים: מהיסודות לארכיטקטורה</h2>
                </div>
                <IndustrialRoadmap />
          </section>

          {/* --- למה פייתון? (הטקסט המלא) --- */}
          <section className="max-w-3xl mx-auto space-y-8 mb-28 relative z-20 px-4 text-right" dir="rtl">
            <h2 className="text-3xl font-bold text-white border-r-4 border-yellow-500 pr-6 leading-tight">
                למה מתכנתים מנוסים <br /> צריכים את הספר הזה?
            </h2>
            <div className="prose prose-invert prose-lg text-slate-300 leading-8">
                <p>אתה כבר יודע לכתוב קוד. אתה מכיר משתנים, לולאות, מחלקות ו-Design Patterns. אז למה פייתון מרגישה לפעמים... מוזרה?</p>
                <p>האמת היא שרוב המפתחים שמגיעים משפות כמו Java או C# כותבים פייתון במבטא זר. הקוד עובד, אבל הוא מסורבל, איטי וקשה לתחזוקה. בעולם ה-AI, אי יעילות כזו היא קריטית.</p>
                <div className="bg-slate-900/80 p-8 rounded-3xl border border-slate-700/50 shadow-2xl my-10 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 opacity-50" />
                    <p className="font-bold text-2xl text-white mb-4">לא עוד &quot;Hello World&quot;</p>
                    <p className="text-slate-400 leading-relaxed text-lg">אנחנו לא נלמד כאן תחביר בסיסי. אנחנו נצלול ישר לעומק: ניהול זיכרון, עיבוד מקבילי, Type Hints, וארכיטקטורה של פרויקטים מורכבים.</p>
                </div>
            </div>
          </section>

          {/* --- Capability Explorer: אינטראקטיביות --- */}
          <section className="py-20 border-y border-slate-800/50">
             <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">הנדסה במהירות האור</h2>
                <p className="text-slate-400">גלה איך פייתון הופכת משימות מורכבות לקוד אלגנטי וקריא.</p>
             </div>
             <CapabilityExplorer />
          </section>

          {/* --- מושגי X-Ray (הגרסה המלאה) --- */}
          <section className="relative mb-28 text-right" dir="rtl">
             <div className="text-center mb-14">
                <h2 className="text-3xl font-bold text-white mb-4 font-sans uppercase tracking-widest opacity-90">Under the Hood</h2>
                <p className="text-slate-400 text-lg italic font-sans">רחף כדי לראות מה מסתתר מאחורי ה-Buzzwords</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                <XRayCard 
                    icon={<Layers size={32} />} 
                    term="Decorators" 
                    reality="פונקציה שעוטפת פונקציה אחרת ומוסיפה לה כוחות על מבלי לשנות את קוד המקור. כלי קריטי לניהול לוגיקה רוחבית." 
                    color="blue" 
                />
                <XRayCard 
                    icon={<Cpu size={32} />} 
                    term="GIL" 
                    reality="Global Interpreter Lock - מנגנון שמונע מפייתון לנצל ריבוי ליבות ב-Threads. הבנתו קריטית לביצועי AI גבוהים." 
                    color="rose" 
                />
                <XRayCard 
                    icon={<Code2 size={32} />} 
                    term="Type Hints" 
                    reality="הוספת טיפוסים לקוד דינמי. הופך את הקוד לבטוח, קריא וקל לניהול בצוותים גדולים ובפרויקטי Enterprise." 
                    color="emerald" 
                />
                <XRayCard 
                    icon={<Box size={32} />} 
                    term="Virtual Env" 
                    reality="ניהול סביבות מבודד המונע 'גיהנום של תלויות' ומאפשר ניהול גרסאות מדויק והרמטי לכל פרויקט." 
                    color="amber" 
                />
             </div>
          </section>

          {/* --- השינוי בתפיסה (Evolution Demo) --- */}
          <section className="max-w-5xl mx-auto py-16 space-y-14 px-4 text-right" dir="rtl">
             <div className="text-center">
                 <h2 className="text-3xl font-bold text-white mb-3">השינוי בתפיסה (The Shift)</h2>
                 <p className="text-slate-400 text-lg">זה לא רק Syntax, זו דרך חשיבה הנדסית אחרת.</p>
             </div>
             <div className="grid md:grid-cols-2 gap-16 items-center">
                 <div className="h-full">
                    <CodeEvolutionDemo />
                 </div>
                 <div className="space-y-8">
                     <div className="flex gap-5">
                         <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 shrink-0 font-mono text-lg border border-slate-700">1</div>
                         <div>
                             <h4 className="font-bold text-slate-200 text-lg mb-1">סקריפטים (The Old View)</h4>
                             <p className="text-slate-400 leading-relaxed">פייתון היא &quot;דבק&quot; מהיר. כותבים קובץ אחד ארוך, בלי מבנה. גישה שמתרסקת בפרויקטים גדולים וקשה לתחזוקה.</p>
                         </div>
                     </div>
                     <div className="flex gap-5">
                         <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 font-mono text-lg border border-emerald-500/30">2</div>
                         <div>
                             <h4 className="font-bold text-white text-lg mb-1">הנדסה (The New View)</h4>
                             <p className="text-slate-300 leading-relaxed">פייתון היא פלטפורמה הנדסית יציבה. עם בדיקות, טיפוסים, ומבנה מודולרי שמאפשר סקילביליות וביצועים.</p>
                         </div>
                     </div>
                     <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 mt-10 shadow-lg relative overflow-hidden">
                        <h5 className="text-sm font-bold text-emerald-400 mb-2 flex items-center gap-2"><Rocket size={16} />הפרויקט המלווה: Mini Text Analyzer</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">במהלך הקורס נבנה כלי CLI מקצועי שמיישם ניהול גרסאות, בדיקות אוטומטיות וארכיטקטורה מתקדמת בסטנדרט של 2026.</p>
                     </div>
                 </div>
             </div>
          </section>

          {/* --- CTA סופי --- */}
          <section className="py-24 text-center border-t border-slate-800 mt-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-500/5 blur-[120px] rounded-full" />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="relative z-10">
                    <Link href="/python/chapter-1">
                        <Button size="lg" className="h-24 px-20 text-2xl bg-linear-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 rounded-full font-black shadow-[0_0_60px_rgba(16,185,129,0.3)] group transition-all">
                            בוא נתחיל להנדס
                            <ChevronLeft className="mr-4 group-hover:-translate-x-2 transition-transform duration-300" size={28} />
                        </Button>
                    </Link>
                </motion.div>
                <p className="mt-8 text-slate-500 text-sm font-mono tracking-widest uppercase opacity-60">Syllabus 2026 • AI Production Standards</p>
          </section>

    </ChapterLayout>
  );
}