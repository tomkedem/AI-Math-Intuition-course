"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Brain, Target, MessageCircle, ShieldCheck } from "lucide-react";
import Link from 'next/link';
import { ChapterLayout } from "@/components/ChapterLayout";

interface IntroductionProps {
  nextPath: string;
  courseId: string;
}

export const IntroductionComponent = ({ nextPath, courseId }: IntroductionProps) => {
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
      courseId={courseId}
      currentChapterId={0} 
      lang="he"
    >
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 max-w-5xl mx-auto" dir="rtl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-slate-900/80 border border-slate-700 p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-md w-full relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
              <div className="flex-1 w-full text-right">
                <div className="flex items-center gap-5 mb-8 flex-row">
                  <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-inner shrink-0">
                    {steps[currentStep].icon}
                  </div>
                  <div className="flex flex-col items-start text-right">
                    <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest block mb-1">
                      {steps[currentStep].label}
                    </span>
                    <h2 className="text-3xl font-extrabold text-white tracking-tight">
                      {steps[currentStep].title}
                    </h2>
                  </div>
                </div>

                <p className="text-xl text-slate-300 leading-relaxed mb-10 min-h-30">
                  {steps[currentStep].content}
                </p>
              </div>

              <div className="w-48 h-48 relative shrink-0">
                 <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                   className="w-full h-full rounded-full bg-linear-to-b from-emerald-500/20 to-transparent border border-emerald-500/30 p-2 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                 >
                   <img 
                     src="/assets/mentor-hero.png" 
                     alt="Mentor" 
                     className="w-full h-full object-contain rounded-full"
                   />
                 </motion.div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-800">
              <div className="flex gap-3 flex-row-reverse">
                {steps.map((_, index) => (
                  <div key={index} className={`h-1.5 rounded-full transition-all duration-500 ${index === currentStep ? 'w-10 bg-emerald-500' : 'w-3 bg-slate-700'}`} />
                ))}
              </div>

              {isLastStep ? (
                <Link href={nextPath} className="group flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4 px-10 rounded-2xl transition-all shadow-lg active:scale-95 no-underline">
                  קדימה, לפרק 1
                  <ChevronLeft className="group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
              ) : (
                <button onClick={() => setCurrentStep(currentStep + 1)} className="group flex items-center gap-3 bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-10 rounded-2xl transition-all border border-slate-700 active:scale-95">
                  המשך
                  <ChevronLeft className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </ChapterLayout>
  );
};