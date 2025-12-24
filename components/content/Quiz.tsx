"use client";

import React, { useState } from 'react';
import { CheckCircle2, XCircle, Trophy, RefreshCcw, HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

interface QuizProps {
    questions: Question[];
    title?: string;
}

export const Quiz: React.FC<QuizProps> = ({ questions, title = "בחינת ידע" }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const handleOptionSelect = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);
        if (index === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowResults(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setScore(0);
        setShowResults(false);
    };

    // --- מסך תוצאות ---
    if (showResults) {
        return (
            <div className="my-10 bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500/20">
                    <Trophy size={32} className="text-yellow-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">כל הכבוד! סיימת את המבחן</h3>
                <p className="text-slate-400 mb-6">
                    הציון שלך: <span className="text-white font-bold text-lg">{score}</span> מתוך <span className="text-white font-bold text-lg">{questions.length}</span>
                </p>
                
                {/* פס התקדמות */}
                <div className="w-full bg-slate-800 h-2 rounded-full mb-8 overflow-hidden max-w-xs mx-auto">
                    <div 
                        className="bg-linear-to-r from-yellow-500 to-orange-500 h-full transition-all duration-1000"
                        style={{ width: `${(score / questions.length) * 100}%` }}
                    ></div>
                </div>

                {/* תיקון: כפתור עם טקסט שחור מפורש על רקע לבן */}
                <Button 
                    onClick={resetQuiz} 
                    className="gap-2 bg-white text-black hover:bg-slate-200 border-transparent font-bold"
                >
                    <RefreshCcw size={16} />
                    נסה שוב
                </Button>
            </div>
        );
    }

    const q = questions[currentQuestion];

    // --- מסך שאלה ---
    return (
        <div className="my-10 bg-[#0F172A] border border-slate-800 rounded-2xl overflow-hidden shadow-xl" dir="rtl">
            {/* כותרת עליונה */}
            <div className="bg-slate-900/80 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-2 text-slate-200 font-bold">
                    <HelpCircle size={18} className="text-indigo-400" />
                    {title}
                </div>
                <span className="text-xs font-mono text-slate-500 bg-slate-800 px-2 py-1 rounded border border-slate-700">
                    שאלה {currentQuestion + 1} / {questions.length}
                </span>
            </div>

            <div className="p-6 md:p-8">
                <h4 className="text-xl font-bold text-white mb-6 leading-relaxed">
                    {q.question}
                </h4>

                <div className="space-y-3">
                    {q.options.map((option, index) => {
                        let style = "border-slate-700 bg-slate-800/30 hover:bg-slate-800 text-slate-300";
                        
                        if (isAnswered) {
                            if (index === q.correctAnswer) {
                                style = "border-emerald-500/50 bg-emerald-500/10 text-emerald-300";
                            } else if (index === selectedOption) {
                                style = "border-rose-500/50 bg-rose-500/10 text-rose-300";
                            } else {
                                style = "border-slate-800 opacity-50";
                            }
                        } else if (selectedOption === index) {
                            style = "border-indigo-500 bg-indigo-500/10 text-white";
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleOptionSelect(index)}
                                disabled={isAnswered}
                                className={`w-full text-right p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group ${style}`}
                            >
                                <span>{option}</span>
                                {isAnswered && index === q.correctAnswer && <CheckCircle2 size={18} className="text-emerald-400" />}
                                {isAnswered && index === selectedOption && index !== q.correctAnswer && <XCircle size={18} className="text-rose-400" />}
                            </button>
                        );
                    })}
                </div>

                {/* אזור הסבר וכפתור הבא */}
                <AnimatePresence>
                    {isAnswered && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 pt-6 border-t border-slate-800"
                        >
                            <div className="mb-4 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                                <span className="text-sm font-bold text-slate-400 block mb-1">הסבר:</span>
                                <p className="text-slate-300 text-sm leading-relaxed">{q.explanation}</p>
                            </div>
                            
                            {/* תיקון: כפתור עם טקסט לבן מפורש */}
                            <Button 
                                onClick={nextQuestion} 
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-12 text-lg shadow-lg shadow-indigo-500/20"
                            >
                                {currentQuestion < questions.length - 1 ? "השאלה הבאה" : "סיים מבחן וצפה בתוצאות"}
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};