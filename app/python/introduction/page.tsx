"use client";

import { 
    Terminal, 
    ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { motion } from "framer-motion";
import { ChapterLayout } from '@/components/ChapterLayout';

// ייבוא הרכיבים מהתיקיות שבנית
import { 
    IndustrialRoadmap, 
    TechScannerImage,
    FireText,
    CodeShowcase 
} from "@/components/demos/python-intro";

// שים לב לשורה הזו - היא חייבת לכלול export default
export default function PythonIntroPage() {
  return (
    <ChapterLayout courseId="python" currentChapterId={0}>
          
          {/* --- Hero Section --- */}
          <section className="pt-40 flex flex-col text-center">
            <div className="flex items-center gap-3 text-emerald-400 mb-2">
                <Terminal size={20} />
                <span className="font-mono text-xs tracking-wider uppercase">Introduction</span>
            </div>
            
            <div className="-mb-3.75"> 
                <FireText text="המנוע השקט" suffix="של ה-AI" />
            </div>
            
            <div className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto px-4 mt-6 space-y-4 text-right" dir="rtl">
                <p>
                עולם ה-AI רץ קדימה, ופייתון היא הכלי שמחזיק את הכול מאחורי הקלעים. היא לא תמיד הכי מהירה, אבל היא תמיד הכי שימושית. קלה לכתיבה, ברורה, ומאפשרת לבנות דברים שעובדים באמת.
                </p>
                <p className="text-lg text-slate-400">
                ספר זה נכתב למפתחים שמגיעים משפות פיתוח אחרות ורוצים להבין סוף סוף למה כל מה שקשור ל-AI קורה דווקא בפייתון.
                </p>
            </div>

            <div className="w-full max-w-4xl px-4 mt-10">
                <TechScannerImage />
            </div>
          </section>

          {/* --- הוכחת היכולת: הסבר + קוד --- */}
          <section className="w-full py-16 bg-slate-950/30 border-y border-slate-900 mt-12 text-right" dir="rtl">
             <div className="max-w-5xl mx-auto px-6 mb-10">
                <h3 className="text-2xl font-bold text-white mb-4 italic underline underline-offset-8 decoration-emerald-500/50">למה פייתון? הוכחת המהירות (Velocity)</h3>
                <p className="text-slate-400 text-lg leading-relaxed">
                מה שאתה רואה כאן הוא לא רק קוד - זו **הפשטה הנדסית**. מה שדרש בעבר חודשי פיתוח ב-C++, ניהול זיכרון ידני ועבודה מול דרייברים של GPU, קורה היום ב-3 שורות פייתון המשתמשות ב-Ecosystem העצום של השפה.
                </p>
             </div>

             <CodeShowcase /> 

             <div className="max-w-5xl mx-auto px-6 mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 text-right">
                    <span className="text-blue-400 font-bold block mb-1">ה-Ecosystem</span>
                    <p className="text-slate-500">שימוש בספריות כמו Transformers מאפשר גישה למודלים המתקדמים בעולם בייבוא אחד.</p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-right">
                    <span className="text-emerald-400 font-bold block mb-1">Orchestration</span>
                    <p className="text-slate-500">פייתון מנהלת את ה-Pipeline: טעינת המודל ל-VRAM והרצת חישובי מטריצות מאחורי הקלעים.</p>
                </div>
                <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 text-right">
                    <span className="text-orange-400 font-bold block mb-1">Production Ready</span>
                    <p className="text-slate-500">זהו קוד אמיתי שיכול לרוץ על שרתים ולהגיב למשתמשים בזמן אמת.</p>
                </div>
             </div>
          </section>

          {/* --- Industrial Pipeline --- */}
          <section className="w-full max-w-7xl mx-auto py-16 px-6 text-right" dir="rtl">
                <div className="relative inline-flex flex-col mb-10 pr-6">
                    <div className="absolute right-0 top-0 w-1.5 h-full bg-emerald-500 rounded-full" />
                    <h2 className="text-3xl font-black text-white uppercase tracking-wider leading-none">
                        Industrial Pipeline
                    </h2>
                    <p className="text-emerald-400/90 text-lg font-medium mt-2 italic">
                        {"\"אתה כבר יודע לחשוב כמו מפתח - פייתון מביאה דרך חשיבה אחרת\""}
                    </p>
                </div>
                
                <div className="prose prose-invert max-w-none mb-12 text-slate-300 leading-8">
                    <p>
                    אתה כבר מכיר משתנים, תנאים, לולאות וזרימות. אבל פייתון מביאה איתה דרך חשיבה קצרה יותר, נקייה יותר, ולעיתים אפילו מפתיעה. זו הסיבה שאנחנו מתחילים מהיסודות, אך בצורה שמתאימה למי שכבר מתכנת ביומיום.
                    </p>
                </div>

                <div className="w-full">
                    <IndustrialRoadmap />
                </div>
          </section>

          {/* --- סיכום ו-CTA --- */}
          <section className="py-24 text-center border-t border-slate-900 mt-12 bg-radial-gradient from-emerald-500/5 to-transparent px-4" dir="rtl">
                <div className="max-w-3xl mx-auto mb-16 space-y-6">
                    <h3 className="text-3xl font-bold text-white italic">פייתון היא רק ההתחלה.</h3>
                    <p className="text-xl text-slate-300 leading-relaxed">
                    להראות איך להשתמש בפייתון בצורה ברורה ונכונה, כדי שתוכל להמשיך למסע הגדול של הסדרה: הבנה מתמטית אינטואיטיבית, הנדסת נתונים ופרויקטי AI מלאים.
                    </p>
                    <p className="text-emerald-400 font-bold text-2xl">
                    וזו התחלה מצוינת.
                    </p>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link href="/python/chapter-1">
                        <Button size="lg" className="h-24 px-20 text-3xl bg-linear-to-r from-emerald-500 to-cyan-500 text-slate-950 rounded-full font-black shadow-xl group transition-all">
                            מתחילים את המסע
                            <ChevronLeft className="mr-6 group-hover:-translate-x-3 transition-transform duration-300" size={32} />
                        </Button>
                    </Link>
                </motion.div>
          </section>

    </ChapterLayout>
  );
}