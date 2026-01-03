"use client";

import React from 'react';
import { 
    Compass, Target, Layers, Terminal, GraduationCap, Code2
} from 'lucide-react';

import { ChapterLayout } from '@/components/ChapterLayout';
import { AssessmentEngine } from '@/components/content/AssessmentEngine';

// רכיבי המעבדות המקומיים (UI בלבד, ללא שינוי)
import { VectorLab } from './components/VectorLab';
import { DistanceSim } from './components/DistanceSim';
import { LiveCodeEditor } from '@/components/content/LiveCodeEditor';

// הרכיב החדש שלנו


export default function Chapter1() {

  // --- Quiz Questions (ללא שינוי) ---
  const chapterQuestions = [
    {
        id: 1,
        question: "מהי המשמעות המעשית של 'מיקום וקטורי' עבור מודל AI?",
        options: [
            "כמות הזיכרון שהמילה תופסת בשרת",
            "כתובת גיאומטרית במרחב סמנטי המגדירה את ה'משמעות'",
            "המספר הסידורי של המילה במילון",
            "דירוג הפופולריות של המילה"
        ],
        correctAnswer: 1,
        explanation: "וקטור הוא הדרך של המודל לייצג משמעות כמיקום גיאומטרי. פריטים קרובים במרחב נתפסים כדומים רעיונית."
    },
    {
        id: 2,
        question: "כיצד 'דמיון קוסינוס' עוזר לנו מעבר למרחק רגיל (אוקלידי)?",
        options: [
            "הוא מהיר יותר לחישוב בפייתון",
            "הוא בוחן את כיוון הוקטור (הקשר סמנטי) ולא רק את המרחק הפיזי",
            "הוא מוחק נתונים מיותרים מהוקטור",
            "הוא תמיד נותן תוצאה חיובית"
        ],
        correctAnswer: 1,
        explanation: "דמיון קוסינוס בודק את הזווית. אם שני וקטורים מצביעים לאותו כיוון, הם חולקים את אותו הקשר נושאי, גם אם האורך (העוצמה) שלהם שונה."
    },
    {
        id: 3,
        question: "מדוע מודלים 'לומדים מטעויות' ולא מהצלחות?",
        options: [
            "כי הצלחות לא מייצרות שינוי בערכי הנוירונים",
            "כי פונקציית ה-Loss מודדת את הפער מהיעד, והפער הזה הוא הדלק לשינוי המשקולות",
            "כי מודלים פסימיים מטבעם",
            "זה לא נכון, מודלים לומדים רק כשהם צודקים"
        ],
        correctAnswer: 1,
        explanation: "הלמידה (Gradient Descent) מבוססת על הקטנת הטעות. ה-Loss מכמת את הטעות למספר, והמודל משנה את עצמו כדי להקטין את המספר הזה."
    },
    {
        id: 4,
        question: "כאשר מודל שפה בוחר את המילה הבאה, על מה הוא מסתמך?",
        options: [
            "על חוקי דקדוק נוקשים שהוזנו מראש",
            "על התפלגות הסתברויות - הוא בוחר את המילה בעלת הסבירות המתאימה ביותר",
            "על זיכרון מוחלט של כל הטקסטים שקרא",
            "על בחירה אקראית לחלוטין"
        ],
        correctAnswer: 1,
        explanation: "מודלים הם מכונות הסתברותיות. הם מחשבים סיכוי לכל מילה אפשרית ובוחרים (דוגמים) מתוך ההתפלגות הזו."
    },
    {
        id: 5,
        question: "מהו תפקידו של ה-Gradient Descent (הירידה בשיפוע)?",
        options: [
            "למחוק נתונים לא רלוונטיים",
            "למצוא את הכיוון שבו הטעות גדלה כדי להתרחק ממנו (להקטין את ה-Loss)",
            "להגדיל את ה-Loss כדי לאתגר את המודל",
            "לחשב את הממוצע של כל הנתונים"
        ],
        correctAnswer: 1,
        explanation: "זהו מנוע הלמידה. הוא בודק את שיפוע הטעות ומבצע צעדים קטנים בכיוון ההפוך לשיפוע כדי להגיע למינימום טעות."
    }
  ];

  return (
    <ChapterLayout courseId="mathProbabilistic" currentChapterId={1}>
        
        {/* --- Hero Section --- */}
        <section className="space-y-6">
            <div className="flex items-center gap-3 text-blue-400 mb-2">
                <Terminal size={24} />
                <span className="font-mono text-sm tracking-wider uppercase">Applied Intuition 01</span>
            </div>
            <h1 className="text-4xl font-black text-white leading-tight text-right">
                למה אנחנו צריכים מתמטיקה יישומית בעולם של AI?
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed text-right">
                בכל פעולה שהמודל מבצע - מסכם טקסט או מסווג תמונה - מתרחש משחק מתמטי מדויק. 
                כאן נלמד להפסיק לראות במודל &quot;קופסה שחורה&quot; ולהבין את חוקי הגיאומטריה שמניעים אותו.
            </p>
        </section>

        {/* --- 1. וקטורים --- */}
        <section className="mt-16 space-y-8">
            <h3 className="text-2xl font-bold text-white border-r-4 border-blue-500 pr-4 flex items-center gap-2 text-right">
                <Layers size={24} className="text-blue-500"/>
                1. וקטורים: ה-DNA של המידע
            </h3>
            
            <p className="text-slate-300 leading-loose text-right">
                המודל מתרגם כל פיסת מידע לוקטור - רשימה מסודרת של מספרים המייצגת משמעות במרחב רב-ממדי.
            </p>
            
            <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                <VectorLab />
            </div>

            <div className="mt-8">
                <p className="text-slate-400 text-sm mb-4 text-right">
                    נסה לשנות את ערכי הוקטור בקוד למטה ולחץ על <strong>הרץ קוד</strong>. שים לב איך הייצוג מודפס למסך.
                </p>
                <LiveCodeEditor 
                    initialCode={`import numpy as np

# וקטור המייצג תכונות של מילה
v = np.array([0.3, 1.2, 4.8])

print("Vector Representation:")
print(v)
print(f"Vector dimensions: {v.shape}")`}
                />
            </div>
        </section>

        {/* --- 2. נורמות ומרחקים --- */}
        <section className="mt-20 space-y-8">
            <h3 className="text-2xl font-bold text-white border-r-4 border-emerald-500 pr-4 flex items-center gap-2 text-right">
                <Compass size={24} className="text-emerald-400"/>
                2. נורמות ומרחקים: הגיאומטריה של הדמיון
            </h3>

            <div className="grid md:grid-cols-2 gap-8 text-right">
                <div className="space-y-4">
                    <div className="flex flex-row-reverse items-center gap-2 text-emerald-400 mb-2 font-mono text-xs uppercase tracking-widest">
                        <Code2 size={14} /> <span>Euclidean Distance</span>
                    </div>
                    <LiveCodeEditor 
                        initialCode={`import numpy as np

a = np.array([1.0, 2.0, 3.0])
b = np.array([1.5, 2.3, 2.7])

# חישוב מרחק אוקלידי (המרחק הפיזי בין הנקודות)
dist = np.linalg.norm(a - b)

print(f"Distance: {dist:.3f}")`}
                    />
                </div>
                <div className="space-y-4">
                    <div className="flex flex-row-reverse items-center gap-2 text-blue-400 mb-2 font-mono text-xs uppercase tracking-widest">
                        <Code2 size={14} /> <span>Cosine Similarity</span>
                    </div>
                    <LiveCodeEditor 
                        initialCode={`import numpy as np

a = np.array([1.0, 2.0, 3.0])
b = np.array([1.0, 2.0, 2.5])

# חישוב מכפלה סקלרית ונורמות
dot = np.dot(a, b)
norm_a = np.linalg.norm(a)
norm_b = np.linalg.norm(b)

# חישוב דמיון קוסינוס
sim = dot / (norm_a * norm_b)
print(f"Similarity: {sim:.3f}")`}
                    />
                </div>
            </div>

            <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm mt-12">
                <DistanceSim />
            </div>
        </section>

        {/* --- 3. לוס --- */}
        <section className="mt-24 space-y-8">
            <h3 className="text-2xl font-bold text-white border-r-4 border-red-500 pr-4 flex items-center gap-2 text-right">
                <Target size={24} className="text-red-500"/>
                3. לוס: למה מודלים לומדים מטעויות?
            </h3>
            
            <p className="text-slate-300 text-right">
                כאן נראה סימולציה של צעד אחד בתהליך ה-Gradient Descent. המודל מחשב את השגיאה, ואז מתקן את עצמו בכיוון ההפוך לנגזרת.
            </p>

            <LiveCodeEditor 
                initialCode={`# פרמטרים ללמידה
x = -1.0 
learning_rate = 0.1 
target = 3.0

print(f"Initial x: {x}")

# חישוב הנגזרת של הפונקציה (x-3)^2
# הנגזרת היא: 2 * (x - 3)
gradient = 2 * (x - target)

# עדכון הפרמטר (צעד נגד כיוון השיפוע)
x_new = x - learning_rate * gradient

# חישוב הלוס החדש
new_loss = (x_new - target)**2

print(f"Gradient: {gradient}")
print(f"New x after update: {x_new}")
print(f"New Loss: {new_loss:.4f}")`}
            />
        </section>

        {/* --- Quiz Section --- */}
        <section className="mt-32 border-t border-white/5 pt-10 text-right">
            <div className="max-w-4xl mx-auto">
               <div dir="rtl" className="flex items-center gap-4 justify-start mb-16 pr-6 border-r-4 border-blue-400/30">
                    <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 shadow-inner">
                        <GraduationCap size={28} className="text-blue-400 opacity-80" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-3xl font-black text-white tracking-tight">בוחן הסמכה: פרק 1</h2>
                        <p className="text-slate-500 text-base font-medium opacity-70">הוכח שליטה באבני היסוד של ה-AI</p>
                    </div>
                </div>
                
                <div className="bg-[#0a0f1a]/50 p-4 rounded-[4rem] border border-white/5 backdrop-blur-3xl shadow-2xl">
                    <AssessmentEngine 
                        title="מבדק אינטואיציה מתמטית" 
                        subtitle="ענה על השאלות בעיון כדי לקבל הסמכה להמשך" 
                        questions={chapterQuestions} 
                    />
                </div>
            </div>
        </section>

    </ChapterLayout>
  );
}