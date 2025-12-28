"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw, AlertCircle, Lightbulb, ArrowLeft, Trophy, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

interface AssessmentProps {
    title: string;
    subtitle: string;
    questions: Question[];
}

export const AssessmentEngine = ({ title, subtitle, questions }: AssessmentProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [direction, setDirection] = useState(0);

    const currentQuestion = questions[currentIndex];
    const isAnswered = answers[currentQuestion.id] !== undefined;
    const progress = ((currentIndex + 1) / questions.length) * 100;

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setDirection(1);
            setCurrentIndex(prev => prev + 1);
        } else {
            setIsSubmitted(true);
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setDirection(-1);
            setCurrentIndex(prev => prev - 1);
        }
    };

    const correctCount = Object.entries(answers).reduce((acc, [qId, ansIdx]) => {
        const question = questions.find(q => q.id === Number(qId));
        return question?.correctAnswer === ansIdx ? acc + 1 : acc;
    }, 0);

    const scoreValue = Math.round((correctCount / questions.length) * 100);
    const isSuccess = correctCount === questions.length;
    const needsReview = scoreValue < 80;

    // אנימציות "גלישה" משופרות עם Scale
    const slideVariants = {
        enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, y: 10, opacity: 0, scale: 0.95, rotateY: dir > 0 ? 10 : -10 }),
        center: { x: 0, y: 0, opacity: 1, scale: 1, rotateY: 0 },
        exit: (dir: number) => ({ x: dir < 0 ? 100 : -100, y: -10, opacity: 0, scale: 0.95, rotateY: dir < 0 ? 10 : -10 })
    };

    if (isSubmitted) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="max-w-3xl mx-auto p-16 rounded-[3rem] bg-slate-900/40 border border-white/10 text-right backdrop-blur-2xl shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden"
                dir="rtl"
            >
                {/* אפקט תאורה אחורי */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />

                <div className="relative z-10 w-full text-right flex flex-col items-center font-sans">
                    {isSuccess ? (
                        <div className="space-y-10 text-center w-full">
                            <motion.div 
                                initial={{ scale: 0, rotate: -20 }} 
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", damping: 10 }}
                                className="w-32 h-32 bg-linear-to-tr from-emerald-500/20 to-teal-500/20 rounded-[2.5rem] flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_60px_rgba(16,185,129,0.3)] border border-emerald-500/30"
                            >
                                <Trophy size={64} />
                            </motion.div>
                            <div className="space-y-4">
                                <h2 className="text-5xl font-black text-white tracking-tighter">מאסטר הסמכה!</h2>
                                <p className="text-2xl text-emerald-400 font-mono tracking-widest uppercase">ענית נכון על: {correctCount} / {questions.length} • ציון {scoreValue}</p>
                            </div>
                            <p className="text-xl text-slate-400 max-w-lg mx-auto leading-relaxed font-light">
                                רמת השליטה שהפגנת בפרק זה היא יוצאת דופן. המוח שלך מסונכרן לחלוטין עם המתמטיקה שמאחורי המודל.
                            </p>
                            <button className="group relative px-12 py-6 bg-white text-black font-black rounded-2xl flex items-center gap-4 mx-auto overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl">
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                <span className="text-xl">המשך לפרק הבא</span>
                                <ArrowLeft size={24} />
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-8 text-center w-full">
                            <div className={`w-28 h-28 rounded-[2.5rem] flex items-center justify-center mx-auto border transition-all ${needsReview ? 'bg-red-500/10 text-red-500 border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.2)]' : 'bg-amber-500/10 text-amber-500 border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.2)]'}`}>
                                <AlertCircle size={56} />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-4xl font-black text-white tracking-tight">כמעט שם...</h2>
                                <p className={`text-2xl font-mono ${needsReview ? 'text-red-400' : 'text-amber-400'}`}>ענית נכון על: {correctCount} / {questions.length} • ציון {scoreValue}</p>
                            </div>
                            <p className="text-lg text-slate-400 max-w-lg mx-auto leading-relaxed italic">
                                {needsReview 
                                    ? "הבסיס עדיין דורש חיזוק. מומלץ לחזור על המעבדות והדוגמאות כדי להבטיח הבנה עמוקה של הוקטורים והלוס." 
                                    : "דיוק מרשים, אך ישנן כמה נקודות קטנות שדורשות ליטוש. עבור על ההסברים ונסה להגיע ל-100%."}
                            </p>
                            <button onClick={() => { setIsSubmitted(false); setAnswers({}); setCurrentIndex(0); }} className="px-10 py-5 bg-white/5 text-white font-bold rounded-2xl flex items-center gap-3 mx-auto hover:bg-white/10 transition-all border border-white/10 shadow-xl">
                                <RotateCcw size={20} /> נסה שוב
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto px-4 font-sans relative" dir="rtl">
            {/* Header משופר */}
            <div className="mb-16 text-right flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-blue-400 font-mono text-xs tracking-[0.3em] uppercase opacity-70">
                        <Sparkles size={16} />
                        <span>Final Phase Certification</span>
                    </div>
                    <h3 className="text-5xl font-black text-white tracking-tighter">{title}</h3>
                    <p className="text-slate-500 text-lg font-light leading-relaxed">{subtitle}</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-sm font-mono text-slate-400 tracking-widest uppercase">Progress</span>
                    <div className="flex items-center gap-4">
                        <span className="text-3xl font-black text-white font-mono">{currentIndex + 1}<span className="text-slate-600 text-xl mx-1">/</span>{questions.length}</span>
                        <div className="w-48 h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 relative">
                            <motion.div 
                                initial={{ width: 0 }} 
                                animate={{ width: `${progress}%` }} 
                                className="absolute inset-y-0 right-0 bg-linear-to-l from-blue-600 via-indigo-400 to-purple-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]" 
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* מעטפת הסליידר עם עומק */}
            <div className="relative min-h-140 perspective-2000">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div 
                        key={currentIndex} 
                        custom={direction} 
                        variants={slideVariants} 
                        initial="enter" 
                        animate="center" 
                        exit="exit" 
                        transition={{ type: "spring", stiffness: 200, damping: 25 }} 
                        className="w-full"
                    >
                        <div className="bg-linear-to-br from-white/[0.06] to-transparent border border-white/[0.12] p-12 rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.4)] backdrop-blur-xl relative group">
                            {/* מספר שאלה ברקע */}
                            <span className="absolute top-8 left-12 text-8xl font-black text-white/[0.02] select-none pointer-events-none">0{currentIndex + 1}</span>

                            <h4 className="text-3xl font-bold text-white mb-12 leading-[1.2] max-w-[90%] text-right relative z-10">
                                {currentQuestion.question}
                            </h4>

                            <div className="grid gap-5 relative z-10">
                                {currentQuestion.options.map((opt, oIdx) => {
                                    const isSelected = answers[currentQuestion.id] === oIdx;
                                    const isCorrect = oIdx === currentQuestion.correctAnswer;
                                    return (
                                        <button 
                                            key={oIdx} 
                                            disabled={isAnswered} 
                                            onClick={() => setAnswers({...answers, [currentQuestion.id]: oIdx})} 
                                            className={`w-full p-6 rounded-2xl text-right transition-all duration-300 border-2 flex flex-row-reverse items-center justify-between cursor-pointer relative overflow-hidden ${
                                                isAnswered 
                                                ? (isCorrect ? 'border-emerald-500/50 bg-emerald-500/10 text-white shadow-[0_0_20px_rgba(16,185,129,0.1)]' : (isSelected ? 'border-red-500/50 bg-red-500/10 text-white shadow-[0_0_20px_rgba(239,68,68,0.1)]' : 'border-white/5 bg-transparent opacity-40 grayscale-[0.5]')) 
                                                : 'border-white/[0.08] bg-white/[0.02] text-slate-300 hover:border-white/20 hover:bg-white/[0.05] hover:-translate-x-1'
                                            }`}
                                        >
                                            <span className="text-xl font-medium flex-1 text-right">{opt}</span>
                                            <div className="shrink-0 mr-6">
                                                {isAnswered && isCorrect && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><Check size={28} className="text-emerald-400" /></motion.div>}
                                                {isAnswered && isSelected && !isCorrect && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><X size={28} className="text-red-400" /></motion.div>}
                                                {!isAnswered && <div className="w-6 h-6 rounded-full border border-white/20 group-hover:border-blue-400/50 transition-colors" />}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            <AnimatePresence>
                                {isAnswered && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 30 }} 
                                        animate={{ opacity: 1, y: 0 }} 
                                        className={`mt-12 p-8 rounded-3xl border flex flex-row-reverse items-start gap-6 text-right shadow-inner ${answers[currentQuestion.id] === currentQuestion.correctAnswer ? 'bg-emerald-500/[0.03] border-emerald-500/20 text-emerald-300/90' : 'bg-red-500/[0.03] border-red-500/20 text-red-300/90'}`}
                                    >
                                        <div className="p-3 bg-current/10 rounded-2xl shrink-0"><Lightbulb size={24} /></div>
                                        <p className="text-lg leading-relaxed font-light italic text-right flex-1">{currentQuestion.explanation}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* כפתורי ניווט יוקרתיים */}
            <div className="mt-16 flex items-center justify-between">
                <button 
                    onClick={handleBack} 
                    disabled={currentIndex === 0} 
                    className={`group flex items-center gap-3 font-bold text-lg transition-all ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-500 hover:text-white cursor-pointer'}`}
                >
                    <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" /> 
                    <span>שאלה קודמת</span>
                </button>
                
                <button 
                    onClick={handleNext} 
                    disabled={!isAnswered} 
                    className={`group relative px-12 py-5 rounded-[1.5rem] font-black text-xl flex items-center gap-4 transition-all ${
                        !isAnswered 
                        ? 'bg-white/5 text-slate-600 cursor-not-allowed border border-white/5' 
                        : 'bg-linear-to-br from-blue-600 to-indigo-600 text-white hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] active:scale-95 cursor-pointer'
                    }`}
                >
                    <span>{currentIndex === questions.length - 1 ? "חשב ציון סופי" : "השאלה הבאה"}</span>
                    <ChevronLeft size={24} className={isAnswered ? "group-hover:-translate-x-1 transition-transform" : ""} />
                </button>
            </div>
        </div>
    );
};