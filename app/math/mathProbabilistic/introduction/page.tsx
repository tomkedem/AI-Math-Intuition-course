"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Brain, Target, MessageCircle, ShieldCheck } from "lucide-react";
import Link from 'next/link';
import { ChapterLayout } from "@/components/ChapterLayout";

export default function ProbabilisticIntroPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "הפער שבין קוד למתמטיקה",
      content: "עולם ה-AI מתקדם בקצב שקשה לעקוב אחריו, ויש רגעים שזה מרגיש כאילו כולם מבינים משהו שאתה 'כמעט' מבין. מתמטיקה, הסתברות, פונקציות עלות... המילים האלה נשמעות מורכב, אבל בפועל אתה צריך רק שכבת הבנה דקה ומדויקת שמחברת בין מה שאתה כבר יודע לבין מה שהמודלים מצפים שתבין.",
      icon: <Brain className="text-emerald-400" size={32} />,
      label: "הבנה מדויקת"
    },
    {
      title: "הגישה: אינטואיציה קודם",
      content: "במקום הסברים כבדים, אנחנו נלך על קו אחר: אינטואיציה קודם, נוסחאות אחר כך, ורק כשצריך. כל מושג ייכנס לחיים דרך דוגמת פייתון קטנה, דרך סיפור קצר, או דרך חיבור ישיר לעולם שאתה כבר חי בו כמתכנת.",
      icon: <Target className="text-blue-400" size={32} />,
      label: "קוד וסיפורים"
    },
    {
      title: "למה זה חשוב?",
      content: "היום מודל לא רק 'מריץ קוד'. הוא מחשב וקטורים, מודד זוויות, משווה הסתברויות ומכוון את עצמו על בסיס שגיאות שהוא יודע למדוד. אם אתה מבין את השפה הזו, אתה לא עובד מול קופסה שחורה. אתה מנהל שיחה.",
      icon: <MessageCircle className="text-purple-400" size={32} />,
      label: "לנהל שיחה"
    },
    {
      title: "מה תקבל מהמסלול הזה?",
      content: "הבנה ברורה של וקטורים ומטריצות, אינטואיציה חדה להסתברות, והיכרות עם הדרך שבה מודלים לומדים משגיאות. אבל בעיקר: ביטחון. להרגיש שאתה שולט במה שקורה מאחורי הקלעים, גם בלי דוקטורט.",
      icon: <ShieldCheck className="text-amber-400" size={32} />,
      label: "ביטחון מקצועי"
    }
  ];

  const isLastStep = currentStep === steps.length - 1;

  return (
    <ChapterLayout 
      courseId="mathProbabilistic"
      currentChapterId={0} 
      lang="he"
    >
      {/* הוספנו pt-8 כדי להרחיק מה-Header והורדנו את ה-Center הכפוי */}
      <div className="max-w-4xl mx-auto pt-8 pb-12 px-4" dir="rtl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-slate-900/40 border border-slate-700/50 p-8 md:p-12 rounded-[2.5rem] shadow-2xl backdrop-blur-md relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              
              <div className="flex-1 text-right order-2 md:order-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-slate-800 rounded-2xl border border-slate-700 shadow-inner shrink-0">
                    {steps[currentStep].icon}
                  </div>
                  <div>
                    <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest block mb-1">
                      {steps[currentStep].label}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black text-white">
                      {steps[currentStep].title}
                    </h2>
                  </div>
                </div>

                <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8">
                  {steps[currentStep].content}
                </p>
              </div>

              {/* מנטור */}
              <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 self-center md:self-start order-1 md:order-2">
                 <motion.div 
                   animate={{ y: [0, -8, 0] }}
                   transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                   className="w-full h-full rounded-full bg-linear-to-b from-emerald-500/10 to-transparent border border-emerald-500/20 p-2 shadow-2xl"
                 >
                   <img 
                     src="/assets/mentor-hero.png" 
                     alt="Mentor" 
                     className="w-full h-full object-contain rounded-full"
                   />
                 </motion.div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-800/50">
              <div className="flex gap-2">
                {steps.map((_, index) => (
                  <div key={index} className={`h-1 rounded-full transition-all duration-500 ${index === currentStep ? 'w-8 bg-emerald-500' : 'w-2 bg-slate-800'}`} />
                ))}
              </div>

              {isLastStep ? (
                <Link href="/math/mathProbabilistic/chapter-1" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 px-8 rounded-xl transition-all shadow-lg no-underline flex items-center gap-2">
                  קדימה, לפרק 1
                  <ChevronLeft size={18} />
                </Link>
              ) : (
                <button onClick={() => setCurrentStep(currentStep + 1)} className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-xl border border-slate-700 transition-all flex items-center gap-2">
                  המשך
                  <ChevronLeft size={18} />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </ChapterLayout>
  );
}