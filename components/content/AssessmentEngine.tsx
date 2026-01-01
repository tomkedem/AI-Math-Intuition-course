"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, X, RotateCcw, Lightbulb, 
  Trophy, ChevronRight, ChevronLeft, 
   Timer, Eye, EyeOff, Flame
} from "lucide-react";

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
    // States
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isReviewMode, setIsReviewMode] = useState(false);
    const [direction, setDirection] = useState(0);
    const [showExplanation, setShowExplanation] = useState(true);
    const [streak, setStreak] = useState(0);
    
    // Timer State
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isActive && !isSubmitted) {
            timerRef.current = setInterval(() => {
                setSeconds(s => s + 1);
            }, 1000);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, isSubmitted]);

    const formatTime = (s: number) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const currentQuestion = questions[currentIndex];
    const isAnswered = answers[currentQuestion.id] !== undefined;
    const progress = ((currentIndex + 1) / questions.length) * 100;

    const handleAnswer = useCallback((oIdx: number) => {
        if (isAnswered && !isReviewMode) return;
        
        const isCorrect = oIdx === currentQuestion.correctAnswer;
        if (isCorrect) setStreak(prev => prev + 1);
        else setStreak(0);

        setAnswers(prev => ({ ...prev, [currentQuestion.id]: oIdx }));
    }, [currentQuestion, isAnswered, isReviewMode]);

    const handleNext = useCallback(() => {
        if (currentIndex < questions.length - 1) {
            setDirection(1);
            setCurrentIndex(prev => prev + 1);
        } else if (!isReviewMode) {
            setIsSubmitted(true);
            setIsActive(false);
        }
    }, [currentIndex, questions.length, isReviewMode]);

    const handleBack = useCallback(() => {
        if (currentIndex > 0) {
            setDirection(-1);
            setCurrentIndex(prev => prev - 1);
        }
    }, [currentIndex]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isSubmitted && !isReviewMode) return;
            
            if (e.key >= '1' && e.key <= '4') {
                const idx = parseInt(e.key) - 1;
                if (currentQuestion.options[idx]) handleAnswer(idx);
            }
            if (e.key === 'ArrowRight') handleBack();
            if (e.key === 'ArrowLeft' && (isAnswered || isReviewMode)) handleNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentQuestion, isAnswered, handleAnswer, handleNext, handleBack, isSubmitted, isReviewMode]);

    const correctCount = questions.reduce((acc, q) => 
        answers[q.id] === q.correctAnswer ? acc + 1 : acc, 0);
    const scoreValue = Math.round((correctCount / questions.length) * 100);

    const slideVariants = {
        enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir < 0 ? 50 : -50, opacity: 0 })
    };

    if (isSubmitted && !isReviewMode) {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto p-8 rounded-3xl bg-slate-950 border border-white/10 text-right backdrop-blur-xl"
                dir="rtl"
            >
                <div className="text-center space-y-6">
                    <div className="flex justify-center mb-4">
                        <div className="p-4 bg-blue-500/10 rounded-full text-blue-400">
                            <Trophy size={48} />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-white">הושלם: {title}</h2>
                    <p className="text-slate-400">{subtitle}</p>
                    
                    <div className="grid grid-cols-3 gap-4 py-6">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <div className="text-slate-400 text-xs mb-1">ציון סופי</div>
                            <div className="text-2xl font-bold text-white">{scoreValue}%</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <div className="text-slate-400 text-xs mb-1">זמן כולל</div>
                            <div className="text-2xl font-bold text-white">{formatTime(seconds)}</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <div className="text-slate-400 text-xs mb-1">תשובות</div>
                            <div className="text-2xl font-bold text-white">{correctCount}/{questions.length}</div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                        <button 
                            onClick={() => setIsReviewMode(true)}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"
                        >
                            <Eye size={18} /> סקירת תשובות
                        </button>
                        <button 
                            onClick={() => {
                                setIsSubmitted(false);
                                setAnswers({});
                                setCurrentIndex(0);
                                setSeconds(0);
                                setIsActive(true);
                            }}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all font-bold"
                        >
                            <RotateCcw size={18} /> ניסיון חוזר
                        </button>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="w-full max-w-3xl mx-auto px-4 font-sans text-sm sm:text-base" dir="rtl">
            <div className="mb-4 space-y-1 text-right">
                <h1 className="text-xl font-bold text-white">{title}</h1>
                <p className="text-slate-400 text-xs">{subtitle}</p>
            </div>

            {/* Compact Header */}
            <div className="mb-6 flex items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/10">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                        <Timer size={14} />
                        <span className="font-mono text-xs font-bold">{formatTime(seconds)}</span>
                    </div>
                    {streak > 1 && (
                        <div className="flex items-center gap-1 text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                            <Flame size={14} />
                            <span className="text-xs font-bold">{streak} Streak</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400">{currentIndex + 1} / {questions.length}</span>
                    <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                            animate={{ width: `${progress}%` }} 
                            className="h-full bg-blue-500" 
                        />
                    </div>
                </div>
            </div>

            <div className="relative">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div 
                        key={currentIndex} 
                        custom={direction} 
                        variants={slideVariants} 
                        initial="enter" animate="center" exit="exit" 
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <div className="bg-slate-900 border border-white/10 p-5 sm:p-8 rounded-3xl backdrop-blur-md shadow-2xl">
                            <h4 className="text-lg sm:text-xl font-semibold text-white mb-6 leading-snug">
                                {currentQuestion.question}
                            </h4>

                            <div className="grid gap-3">
                                {currentQuestion.options.map((opt, oIdx) => {
                                    const isSelected = answers[currentQuestion.id] === oIdx;
                                    const isCorrect = oIdx === currentQuestion.correctAnswer;
                                    const showResult = isAnswered || isReviewMode;

                                    let btnClass = "border-white/5 bg-white/5 text-slate-300 hover:bg-white/10";
                                    if (showResult) {
                                        if (isCorrect) btnClass = "border-emerald-500/50 bg-emerald-500/20 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]";
                                        else if (isSelected) btnClass = "border-red-500/50 bg-red-500/20 text-white shadow-[0_0_15px_rgba(239,68,68,0.1)]";
                                        else btnClass = "opacity-40 border-white/5";
                                    }

                                    return (
                                        <button 
                                            key={oIdx} 
                                            disabled={showResult && !isReviewMode}
                                            onClick={() => handleAnswer(oIdx)} 
                                            className={`w-full p-4 rounded-xl text-right transition-all border flex items-center justify-between group ${btnClass}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold group-hover:bg-blue-500/20 transition-colors">
                                                    {oIdx + 1}
                                                </span>
                                                <span className="font-medium">{opt}</span>
                                            </div>
                                            {showResult && isCorrect && <Check size={18} className="text-emerald-400" />}
                                            {showResult && isSelected && !isCorrect && <X size={18} className="text-red-400" />}
                                        </button>
                                    );
                                })}
                            </div>

                            <AnimatePresence>
                                {(isAnswered || isReviewMode) && showExplanation && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }} 
                                        animate={{ height: "auto", opacity: 1 }}
                                        className="mt-6 pt-6 border-t border-white/10"
                                    >
                                        <div className="flex items-start gap-3 bg-blue-500/5 p-4 rounded-2xl border border-blue-500/10">
                                            <Lightbulb size={18} className="text-blue-400 shrink-0 mt-1" />
                                            <p className="text-sm text-blue-100/80 leading-relaxed italic">
                                                {currentQuestion.explanation}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
                <button 
                    onClick={handleBack} 
                    disabled={currentIndex === 0} 
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-white'}`}
                >
                    <ChevronRight size={18} /> קודם
                </button>

                <div className="flex items-center gap-2">
                   {isAnswered && (
                     <button 
                        onClick={() => setShowExplanation(!showExplanation)}
                        className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-colors border border-white/10"
                        title="הסתר/הצג הסבר"
                    >
                        {showExplanation ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                   )}
                    
                    <button 
                        onClick={handleNext} 
                        disabled={!isAnswered && !isReviewMode} 
                        className={`px-8 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
                            (!isAnswered && !isReviewMode)
                            ? 'bg-white/5 text-slate-600 cursor-not-allowed border border-white/5' 
                            : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20'
                        }`}
                    >
                        <span>
                            {isReviewMode && currentIndex === questions.length - 1 ? "סיים סקירה" : 
                             currentIndex === questions.length - 1 ? "סיום בחינה" : "המשך"}
                        </span>
                        <ChevronLeft size={18} />
                    </button>
                </div>
            </div>

            <div className="hidden md:flex justify-center mt-8 gap-6 text-[10px] text-slate-500 font-mono uppercase tracking-widest opacity-50">
                <span className="flex items-center gap-1"><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white">1-4</kbd> בחירה</span>
                <span className="flex items-center gap-1"><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white">←</kbd> הבא</span>
                <span className="flex items-center gap-1"><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white">→</kbd> קודם</span>
            </div>
        </div>
    );
};