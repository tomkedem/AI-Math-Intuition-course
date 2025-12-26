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

// ייבוא הרכיבים - וודא שהנתיבים האלו קיימים אצלך בפרויקט
import { 
    AILeverageHero, 
    IndustrialRoadmap, 
    CapabilityExplorer,
    XRayCard, 
    CodeEvolutionDemo,
    TechScannerImage,
    FireText,
    CodeShowcase 
} from "@/components/demos/python-intro";

// השורה הקריטית: export default function
export default function PythonIntroPage() {
  return (
    <ChapterLayout courseId="python" currentChapterId={0}>
          
          {/* --- Hero Section --- */}
          <section className="space-y-6 pt-40  flex flex-col">
            <div className="flex items-center gap-3 text-emerald-400 mb-2">
                <Terminal size={24} />
                <span className="font-mono text-sm tracking-wider uppercase">Python for AI Engineers</span>
            </div>
                  
            {/* כותרת האש המרכזית */}
            <FireText text="המנוע השקט" suffix="של ה-AI" />
           
            <p className="text-xl text-slate-300 leading-relaxed " dir="rtl">
                פייתון היא לא רק שפת סקריפטים. היא השפה שבה נבנים המודלים הגדולים בעולם. השליטה בה פותחת את הדלת מחשיבת מימוש לחשיבת ארכיטקטורת בינה.
            </p>
            
            <div className="w-full max-w-5xl">
                <TechScannerImage />
            </div>
          </section>

          {/* --- דוגמת הקוד (Showcase) מיושרת לשמאל ופרוסה לרוחב --- */}
          <section className="w-full py-20 bg-slate-950/30 border-y border-slate-900">
             <CodeShowcase /> 
          </section>

          {/* --- שאר התוכן המקורי ללא שינוי לוגי --- */}
          <section className="border-b border-slate-800/50">
             <AILeverageHero />
          </section>

          <section className="max-w-5xl mx-auto space-y-12 py-24 px-4 text-right" dir="rtl">
                <div className="flex items-center gap-3 border-r-4 border-emerald-500 pr-4">
                    <Map className="text-emerald-500" size={24} />
                    <h2 className="text-2xl font-bold text-white uppercase tracking-wide">מפת הדרכים: מהיסודות לארכיטקטורה</h2>
                </div>
                <IndustrialRoadmap />
          </section>

          <section className="max-w-3xl mx-auto space-y-8 mb-28 relative z-20 px-4 text-right" dir="rtl">
            <h2 className="text-3xl font-bold text-white border-r-4 border-yellow-500 pr-6 leading-tight">
                למה מתכנתים מנוסים <br /> צריכים את הספר הזה?
            </h2>
            <div className="prose prose-invert prose-lg text-slate-300 leading-8 text-right">
                <p>האמת היא שרוב המפתחים שמגיעים משפות כמו Java או C# כותבים פייתון במבטא זר. הקוד עובד, אבל הוא מסורבל. בעולם ה-AI, אי יעילות כזו היא קריטית.</p>
                
                <div className="bg-slate-900/80 p-8 rounded-3xl border border-slate-700/50 shadow-2xl my-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-1 h-full bg-emerald-500 opacity-50" />
                    <p className="font-bold text-2xl text-white mb-4 text-right">לא עוד {"\"Hello World\""}</p>
                    <p className="text-slate-400 leading-relaxed text-lg italic text-right">
                        אנחנו לא נבזבז זמן על תחביר בסיסי. אנחנו נצלול ישר לעומק: ניהול זיכרון, עיבוד מקבילי וארכיטקטורה של פרויקטים מורכבים.
                    </p>
                </div>
            </div>
          </section>

          <section className="py-24 border-y border-slate-800/50 bg-slate-900/20">
             <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-white mb-4">הנדסה במהירות האור</h2>
                <p className="text-slate-400 text-lg">גלה איך פייתון הופכת לוגיקה מורכבת למציאות הנדסית.</p>
             </div>
             <CapabilityExplorer />
          </section>

          <section className="relative py-24 text-right px-4" dir="rtl">
             <div className="text-center mb-16 text-center">
                <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-widest opacity-90">Under the Hood</h2>
                <p className="text-slate-400 text-lg italic font-mono">Deep Dive into Python Core</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                <XRayCard icon={<Layers size={32} />} term="Decorators" reality="מנגנון Meta-programming המאפשר הזרקת לוגיקה רוחבית בצורה נקייה." color="blue" />
                <XRayCard icon={<Cpu size={32} />} term="GIL" reality="Global Interpreter Lock - הבנת המחסום בדרך לביצועי Multi-core אמיתיים." color="rose" />
                <XRayCard icon={<Code2 size={32} />} term="Type Hints" reality="הפיכת פייתון לשפה Type-safe עבור מערכות Enterprise מורכבות." color="emerald" />
                <XRayCard icon={<Box size={32} />} term="Virtual Env" reality="בידוד הרמטי של סביבות עבודה למניעת התנגשויות ב-Production." color="amber" />
             </div>
          </section>

          <section className="max-w-6xl mx-auto py-24 px-4 text-right border-t border-slate-900" dir="rtl">
             <div className="mb-16">
                 <h2 className="text-3xl font-bold text-white mb-3">השינוי בתפיסה (The Shift)</h2>
             </div>
             <div className="grid lg:grid-cols-2 gap-20 items-center">
                 <div className="w-full">
                    <CodeEvolutionDemo />
                 </div>
                 <div className="space-y-10">
                     <div className="flex gap-6">
                         <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500/20 font-black text-xl">2</div>
                         <div>
                             <h4 className="font-bold text-white text-xl mb-2">הנדסה (The New View)</h4>
                             <p className="text-slate-300 text-lg leading-relaxed text-right">
                                פייתון ב-2026 היא פלטפורמה הנדסית לכל דבר. אנחנו בונים מערכות מבוססות טסטים, טיפוסים ומבנה מודולרי ששורד Scale.
                             </p>
                         </div>
                     </div>
                     <div className="bg-slate-900/40 p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden group">
                        <h5 className="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2 justify-end"><Rocket size={20} /> הפרויקט המלווה: Mini Text Analyzer</h5>
                        <p className="text-slate-400 leading-relaxed text-right">
                            לאורך הפרקים נבנה כלי CLI מקצועי המיישם ארכיטקטורה מתקדמת בסטנדרטים המחמירים ביותר של התעשייה.
                        </p>
                     </div>
                 </div>
             </div>
          </section>

          <section className="py-32 text-center border-t border-slate-900 mt-12 relative overflow-hidden bg-radial-gradient from-emerald-500/5 to-transparent">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <Link href="/python/chapter-1">
                        <Button size="lg" className="h-24 px-20 text-3xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 rounded-full font-black shadow-xl group">
                            בוא נתחיל להנדס
                            <ChevronLeft className="mr-6 group-hover:-translate-x-3 transition-transform duration-300" size={32} />
                        </Button>
                    </Link>
                    <p className="mt-12 text-slate-500 text-sm font-mono tracking-[0.3em] uppercase opacity-50">Syllabus 2026 • AI Production Standards</p>
                </motion.div>
          </section>

    </ChapterLayout>
  );
}