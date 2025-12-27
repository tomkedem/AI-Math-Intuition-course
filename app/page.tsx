"use client";

import React, { useCallback } from 'react';
import Link from 'next/link';
import { courses } from "@/lib/courseData";
// עדכון אייקונים: הוספנו את CodeXml ו-BrainCog
import { ArrowLeft, CodeXml, Sigma, BrainCog, BookOpen } from "lucide-react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine, ISourceOptions } from "tsparticles-engine";
import { Tilt } from 'react-tilt';

export default function HomePage() {

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions: ISourceOptions = {
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    fpsLimit: 120,
    interactivity: {
        events: { onHover: { enable: true, mode: "grab" }, resize: true },
        modes: { grab: { distance: 150, links: { opacity: 0.5, color: "#6366f1" } } },
    },
    particles: {
        color: { value: ["#4f46e5", "#60a5fa", "#a78bfa"] },
        links: { color: "#4f46e5", distance: 150, enable: true, opacity: 0.2, width: 1 },
        move: { enable: true, speed: 0.8, direction: "none", random: true, straight: false, outModes: { default: "bounce" } },
        number: { density: { enable: true, area: 800 }, value: 100 },
        opacity: { value: 0.5, random: true },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  // --- הגדרות מעודכנות לאפקט "דחיפה" חזק יותר ---
  const tiltOptions = {
    reverse:        true,   // נשאר true לדחיפה
    max:            20,     // הגדלנו את הזווית לאפקט חזק יותר
    perspective:    500,    // הקטנו את הפרספקטיבה לעומק דרמטי יותר
    scale:          0.98,   // הקטנה קלה במקום הגדלה - תורם לתחושת דחיפה פנימה
    speed:          1000,
    transition:     true,
    axis:           null,
    reset:          true,
    easing:         "cubic-bezier(.03,.98,.52,.99)",
  };

  // פונקציית האייקונים החדשה
  const getIcon = (id: string) => {
    switch(id) {
        case 'python': return <CodeXml size={32} />; // אייקון קוד חדש
        case 'probability': return <BrainCog size={32} />; // אייקון מוח-מכונה חדש
        default: return <Sigma size={32} />;
    }
  };

  // פונקציית הצבעים החדשה - סגנון זוהר (Glow)
  const getIconColor = (id: string) => {
    switch(id) {
        case 'python':
            // צהוב/כתום זוהר עם גרדיאנט וצללית
            return 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20 text-yellow-300 border-yellow-400/30 shadow-[0_0_15px_rgba(250,204,21,0.3)]';
        case 'probability':
            // ורוד/סגול זוהר
            return 'bg-gradient-to-br from-pink-400/20 to-purple-500/20 text-pink-300 border-pink-400/30 shadow-[0_0_15px_rgba(232,121,249,0.3)]';
        default: // math
            // כחול/תכלת זוהר
            return 'bg-gradient-to-br from-blue-400/20 to-cyan-500/20 text-blue-300 border-blue-400/30 shadow-[0_0_15px_rgba(96,165,250,0.3)]';
    }
  };

  const heroCards = [
    {
        id: 'python',
        title: "פייתון פרקטי למתכנתים לעידן ה-AI",
        description: "מעבר מכתיבת סקריפטים להנדסת מערכות AI יציבות (Production-Ready). הספר מתמקד בשיטות עבודה מודרניות, Type Hints, ניהול תלויות, עיבוד מקבילי וארכיטקטורה נכונה לבסיס קוד סקיילבילי."
    },
    {
        id: 'mathIntuitive',
        title: "מתמטיקה אינטואיטיבית למתכנתים לעידן ה-AI",
        description: 'בניית האינטואיציה הנדרשת כדי להבין ולדבג את מה שקורה בתוך "הקופסה השחורה". הספר עוסק בוקטורים, מרחבים, מטריצות וההיגיון הגיאומטרי שעומד בבסיס ה-Embeddings והמודלים הגדולים.'
    },
    {
        id: 'mathProbabilistic',
        title: "מתמטיקה והיגיון הסתברותי למתכנתים בעידן ה-AI",
        description: "שליטה בלוגיקה שמניעה את קבלת ההחלטות ותהליכי האופטימיזציה של המודל. הספר מתמקד בניהול אי-ודאות, סטטיסטיקה, חוק בייס, פונקציות Loss והמכניקה של Gradient Descent."
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30 relative overflow-hidden" dir="rtl">

        {/* --- כרטיס קרדיט צף (ימין למעלה) --- */}
        <div className="fixed top-6 right-6 z-50 hidden md:flex animate-fade-in-down">
            <div className="group flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-[#0B1121]/60 backdrop-blur-xl border border-slate-700/50 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:border-indigo-500/50 transition-all duration-500 hover:scale-105 cursor-default hover:shadow-indigo-500/20">
                <div className="relative">
                     <div className="w-10 h-10 rounded-full bg-linear-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-lg border border-white/10">
                        תק
                     </div>
                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#0B1121] rounded-full animate-pulse"></div>
                </div>
                <div className="flex flex-col items-start gap-0.5">
                    <span className="text-[10px] text-slate-400 font-medium group-hover:text-indigo-300 transition-colors uppercase tracking-wider">נבנה על ידי</span>
                    <span className="text-sm font-black text-white tracking-wide leading-none">תומר קדם</span>
                </div>
            </div>
        </div>

        {/* רקעים */}
        <div className="fixed inset-0 z-0 pointer-events-none">
             <Particles id="tsparticles" init={particlesInit} options={particlesOptions} className="absolute inset-0 h-full w-full" />
        </div>
        <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-900/20 via-[#020617]/80 to-[#020617]"></div>

        <main className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col items-center">

            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-mono text-slate-400 mb-4 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_10px_#6366f1]"></span>
                    Core Foundations v1.0
                </div>

               <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-b from-white via-indigo-100 to-slate-500 tracking-tight leading-tight drop-shadow-sm px-4">
                    הליבה ההנדסית של מערכות AI
                </h1>

                <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                    להבין את מה שמתחת למכסה המנוע:
                    <strong> המתמטיקה</strong>, <strong>ההסתברות</strong> ו-<strong>קוד הפייתון</strong> שמניעים את המודלים.
                    לומדה אינטראקטיבית למתכנתים.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full relative z-20 pb-20">
                {heroCards.map((card) => {
                    const originalCourseData = courses[card.id];
                    if (!originalCourseData) return null;

                    const firstChapterHref = originalCourseData.chapters[0]?.href || '#';

                    return (
                        <Tilt key={card.id} options={tiltOptions} className="h-full">
                            <Link
                                href={firstChapterHref}
                                className="group relative h-full block"
                            >
                                <div className="absolute inset-0 bg-linear-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-3xl transform transition-transform duration-300 group-hover:shadow-2xl shadow-black/50"></div>
                                <div className="absolute inset-0 rounded-3xl border border-slate-700/50 group-hover:border-indigo-500/50 transition-colors duration-300"></div>

                                <div className="relative h-full p-8 flex flex-col items-start">
                                    {/* שימוש באייקון ובצבע החדשים */}
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border mb-6 transition-all duration-300 ${getIconColor(card.id)} group-hover:scale-110`}>
                                        {getIcon(card.id)}
                                    </div>

                                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                                        {card.title}
                                    </h2>

                                    <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                                        {card.description}
                                    </p>

                                    <div className="w-full pt-6 border-t border-slate-700/50 flex items-center justify-between mt-auto">
                                        <span className="text-xs font-mono text-slate-500 flex items-center gap-2">
                                            <BookOpen size={14} />
                                            {originalCourseData.chapters.length} פרקים
                                        </span>

                                        <span className="flex items-center gap-2 text-sm font-bold text-white group-hover:-translate-x-1 transition-transform">
                                            התחל ללמוד
                                            <ArrowLeft size={16} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </Tilt>
                    );
                })}
            </div>

            {/* Footer מינימלי למטה */}
            <footer className="mt-auto py-8 text-center text-slate-600 text-xs font-mono relative z-20">
                <p>© 2026 AI Dev Track. כל הזכויות שמורות.</p>
            </footer>

        </main>
    </div>
  );
}