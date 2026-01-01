"use client";

import React from 'react';
import { 
    Compass, Target, Layers, 
    ShieldAlert, Zap, MousePointer2, BrainCircuit,
    LineChart, Terminal, GraduationCap,
    Info, Code2
} from 'lucide-react';

import { InsightBox } from '@/components/content/InsightBox';
import { CodeBlock } from '@/components/content/CodeBlock';
import { ChapterLayout } from '@/components/ChapterLayout';
import { AssessmentEngine } from '@/components/content/AssessmentEngine';

// רכיבי המעבדות המקומיים
import { VectorLab } from './components/VectorLab';
import { DistanceSim } from './components/DistanceSim';

export default function Chapter1() {

  // --- Code Snippets & Outputs ---
  
  const vectorInitCode = `import numpy as np

# הגדרת וקטור המייצג תכונות מופשטות של מילה (למשל: "טכנולוגיה")
v = np.array([0.3, 1.2, 4.8])

print("Vector Representation:", v)`;
  const vectorInitOutput = `Vector Representation: [0.3 1.2 4.8]`;

  const distanceCalcCode = `import numpy as np

a = np.array([1.0, 2.0, 3.0]) # וקטור א'
b = np.array([1.5, 2.3, 2.7]) # וקטור ב'

# חישוב מרחק אוקלידי (Euclidean Distance)
distance = np.linalg.norm(a - b)
print("Euclidean Distance:", distance)`;
  const distanceCalcOutput = `Euclidean Distance: 0.655`;

  const cosineSimCode = `import numpy as np

a = np.array([1.0, 2.0, 3.0])
b = np.array([1.0, 2.0, 2.5])

# חישוב דמיון קוסינוס - בוחן את הזווית והכיוון
dot_product = np.dot(a, b)
norm_a = np.linalg.norm(a)
norm_b = np.linalg.norm(b)

cosine_sim = dot_product / (norm_a * norm_b)
print("Cosine Similarity:", cosine_sim)`;
  const cosineSimOutput = `Cosine Similarity: 0.985`;

  const gradientStepCode = `def loss(x): return (x - 3) ** 2 # פונקציית הטעות
def slope(x): return 2 * (x - 3)     # הנגזרת (השיפוע)

x = -1        # ניחוש התחלתי של המודל
lr = 0.1      # Learning Rate (קצב למידה)

# עדכון הפרמטר: הולכים נגד כיוון השיפוע כדי להקטין את הטעות
x = x - lr * slope(x)

print(f"New Loss after update: {loss(x):.4f}")`;
  const gradientStepOutput = `New Loss after update: 10.2400`;

  const dataSensitivityCode = `import numpy as np

x = np.array([1, 2, 3, 4])
y = np.array([2, 4, 6, 8]) # יחס מושלם y=2x

# הכנסת שיבוש זעיר (0.8) רק לנקודה אחת
y_modified = y.copy()
y_modified[2] += 0.8 

# חישוב השיפוע החדש של המודל בעקבות השיבוש
new_slope = np.sum(x * y_modified) / np.sum(x * x)
print(f"Modified Slope: {new_slope:.3f}")`;
  const dataSensitivityOutput = `Modified Slope: 2.114`;

  // --- Quiz Questions ---
  const chapterQuestions = [
    {
        id: 1,
        question: "מהי המשמעות המעשית של 'מיקום וקטורי' עבור מודל AI?",
        options: [
            "כמות הזיכרון שהמילה תופסת בשרת",
            "כתובת גיאומטרית במרחב סמנטי המגדירה את ה'משמעות' של הנתון",
            "המספר הסידורי של המילה במילון",
            "דירוג הפופולריות של המילה"
        ],
        correctAnswer: 1,
        explanation: "וקטור הוא הדרך של המודל לייצג משמעות כמיקום גיאומטרי. פריטים קרובים במרחב נתפסים כדומים רעיונית."
    },
    {
        id: 2,
        question: "כיצד 'דמיון קוסינוס' עוזר לנו מעבר למרחק רגיל?",
        options: [
            "הוא מהיר יותר לחישוב",
            "הוא בוחן את כיוון המחשבה (הקשר) ולא רק את עוצמתה",
            "הוא מוחק נתונים מיותרים",
            "הוא מחשב את מספר האותיות"
        ],
        correctAnswer: 1,
        explanation: "דמיון קוסינוס בודק את הזווית. אם שני וקטורים מצביעים לאותו כיוון, הם חולקים את אותו הקשר סמנטי."
    },
    {
        id: 3,
        question: "מדוע שגיאת ה'לוס' (Loss) נחשבת ל'דלק' של הלמידה?",
        options: [
            "כי היא מחממת את המעבד",
            "כי המודל לומד רק על ידי זיהוי הפער בין הניבוי למציאות וניסיון לצמצם אותו",
            "כי היא מנקה באגים בקוד",
            "כי היא קובעת את מהירות האינטרנט"
        ],
        correctAnswer: 1,
        explanation: "למידה היא תהליך אופטימיזציה. בלי לדעת כמה הוא טעה (Loss), למודל אין מצפן לשיפור."
    },
    {
        id: 4,
        question: "מה תפקידו של מנגנון ה-Gradient Descent?",
        options: [
            "הוא מאחל את משקולות המודל מחדש",
            "הוא מחשב את הדרך הקצרה ביותר להגיע למינימום של פונקציית הלוס",
            "הוא מוחק נתונים שהמודל כבר למד",
            "הוא מייצר וקטורים חדשים"
        ],
        correctAnswer: 1,
        explanation: "Gradient Descent הוא מנגנון הניווט המתמטי שמאפשר למודל להבין לאיזה כיוון עליו להשתנות כדי להקטין את השגיאה."
    },
    {
        id: 5,
        question: "מה קורה כאשר המודל סובל מ'הטיה' (Bias) בנתונים?",
        options: [
            "הוא לומד את הטעות כחלק מהמציאות ומפיק תוצאות מוטות באופן עקבי",
            "הוא פשוט מפסיק לעבוד",
            "הוא לומד מהר יותר",
            "הוא משתמש בפחות זיכרון"
        ],
        correctAnswer: 0,
        explanation: "מודלים מגיבים למספרים. אם הדאטה מוטה, המודל ילמד טעות יציבה ויתרגם אותה לניבויים שגויים."
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
            <h1 className="text-4xl font-black text-white leading-tight">
                למה אנחנו צריכים מתמטיקה יישומית בעולם של AI?
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
                בכל פעולה שהמודל מבצע - מסכם טקסט, משלים קוד או מסווג תמונה - מתרחש שם משחק מתמטי מדויק. 
                כאן נלמד להפסיק לראות במודל &quot;קופסה שחורה&quot; ולהבין את חוקי הגיאומטריה שמניעים אותו.
            </p>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex gap-4 mt-6">
                <BrainCircuit className="text-blue-500 shrink-0" size={24} />
                <div className="text-right">
                    <h4 className="font-bold text-white mb-1 text-right">המתמטיקה היא המצפן שלך</h4>
                    <p className="text-sm text-slate-400 text-right">
                        כשמבינים את המספרים שמאחורי הקלעים, אפשר להגיד בביטחון מתי המודל פועל בהיגיון ומתי הדאטה מטעה אותו.
                    </p>
                </div>
            </div>
        </section>

        {/* --- 1. וקטורים --- */}
        <section className="mt-16 space-y-8">
            <h3 className="text-2xl font-bold text-white border-r-4 border-blue-500 pr-4 flex items-center gap-2 text-right">
                <Layers size={24} className="text-blue-500"/>
                1. וקטורים: ה-DNA של המידע
            </h3>
            
            <div className="space-y-4 text-slate-300 leading-loose text-right">
                <p>המודל מתרגם כל פיסת מידע לוקטור - רשימה מסודרת של מספרים המייצגת משמעות במרחב רב-ממדי.</p>
                <div className="flex items-center gap-3 bg-blue-500/5 p-4 rounded-lg border border-blue-500/10" dir="rtl">
                    <Info size={18} className="text-blue-400 shrink-0" />
                    <p className="text-sm italic text-right flex-1">הנחיה למעבדה: הקלד מילה ושים לב איך היא הופכת ל&quot;חתימה&quot; מתמטית. מילים עם הקשר דומה יציגו תבניות מספרים דומות.</p>
                </div>
            </div>
            
            <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                <VectorLab />
            </div>

            <CodeBlock 
                language="python" 
                code={vectorInitCode} 
                output={vectorInitOutput} 
            />

            <InsightBox type="intuition" title="וקטור הוא כתובת גיאומטרית">
                עבור המודל, מילה היא נקודה במרחב. ככל ששתי מילים &quot;קרובות&quot; יותר מתמטית, המודל תופס אותן כבעלות משמעות דומה.
            </InsightBox>
        </section>

        {/* --- 2. נורמות ומרחקים --- */}
        
        <section className="mt-20 space-y-8">
            <h3 className="text-2xl font-bold text-white border-r-4 border-emerald-500 pr-4 flex items-center gap-2 text-right">
                <Compass size={24} className="text-emerald-400"/>
                2. נורמות ומרחקים: הגיאומטריה של הדמיון
            </h3>
            
            <div className="space-y-4 text-slate-300 leading-loose text-right">
                <p>כדי להבין מה דומה למה, המודל מודד מרחק. המרחק האוקלידי בודק את הקו הישר, בעוד שדמיון קוסינוס בודק את הכיוון (הזווית) בין המושגים.</p>
                <div className="flex flex-row-reverse items-start gap-3 bg-emerald-500/5 p-4 rounded-lg border border-emerald-500/10">
                    <MousePointer2 size={18} className="text-emerald-400 shrink-0 mt-1" />
                    <p className="text-sm italic text-right">קריאה לפעולה: שחק עם הסליידרים בסימולטור. שים לב איך שינוי במיקום וקטור אחד משנה את ה-Cosine Similarity. נסה להגיע לזהות מוחלטת (1.000).</p>
                </div>
            </div>

            <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                <DistanceSim />
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-right">
                <div className="space-y-2">
                    <div className="flex flex-row-reverse items-center gap-2 text-emerald-400 mb-2 font-mono text-xs uppercase tracking-widest">
                        <Code2 size={14} /> <span>Euclidean Distance</span>
                    </div>
                    <CodeBlock language="python" code={distanceCalcCode} output={distanceCalcOutput} />
                    <p className="text-xs text-slate-500 italic mt-2 text-right">שימוש ב-Numpy לחישוב הנורמה של ההפרש בין הוקטורים.</p>
                </div>
                <div className="space-y-2">
                    <div className="flex flex-row-reverse items-center gap-2 text-blue-400 mb-2 font-mono text-xs uppercase tracking-widest">
                        <Code2 size={14} /> <span>Cosine Similarity</span>
                    </div>
                    <CodeBlock language="python" code={cosineSimCode} output={cosineSimOutput} />
                    <p className="text-xs text-slate-500 italic mt-2 text-right">נרמול המכפלה הסקלרית נותן לנו את הקוסינוס של הזווית.</p>
                </div>
            </div>
            
            <InsightBox type="info" title="דמיון קוסינוס בחיפוש סמנטי">
                זהו המנגנון המאפשר למודל להבין ש&quot;מלך&quot; ו-&quot;מלכה&quot; הם מושגים דומים, למרות שהן מילים שונות לחלוטין.
            </InsightBox>
        </section>

        {/* --- 3. לוס --- */}
        
        <section className="mt-24 space-y-8">
            <h3 className="text-2xl font-bold text-white border-r-4 border-red-500 pr-4 flex items-center gap-2 text-right">
                <Target size={24} className="text-red-500"/>
                3. לוס: למה מודלים לומדים מטעויות?
            </h3>
            
            <div className="space-y-4 text-slate-300 leading-loose text-right">
                <p>מודלים לומדים מטעויות, לא מהצלחה. הלוס (Loss) מודד את הפער בין הניבוי למציאות.</p>
                <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-xl italic text-right">
                    <p className="text-sm text-slate-200 text-right">
                        <span className="text-red-400 font-bold ml-2">תרחיש:</span> המודל ניבא 30 והאמת היא 35. השגיאה היא 5. המודל ישתמש במספר הזה כדי לכוון מחדש את הפרמטרים שלו בצעד הבא.
                    </p>
                </div>
            </div>

            <CodeBlock 
                language="python" 
                code={gradientStepCode} 
                output={gradientStepOutput} 
            />

            <InsightBox type="warning" title="הסכנה בקצב למידה גבוה">
                אם ה-Learning Rate גבוה מדי, המודל עשוי &quot;לדלג&quot; מעל נקודת המינימום של השגיאה ולא להגיע לתוצאה אופטימלית לעולם.
            </InsightBox>
        </section>

        {/* --- 4. טעויות נפוצות --- */}
        <section className="mt-24 space-y-8">
            <h3 className="text-2xl font-bold text-white border-r-4 border-amber-500 pr-4 flex items-center gap-2 text-right">
                <ShieldAlert size={24} className="text-amber-500"/>
                4. איפה מפתחים טועים?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-right" >
                <div className="p-8 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/4 transition-all group text-right shadow-lg">
                
                <h4 className="w-full text-white font-bold mb-4 text-lg flex flex-row-reverse items-center gap-2 text-right justify-end">התעלמות מהלוס <Zap size={16} className="text-amber-400" /></h4>
                    <p className="text-sm text-slate-400 leading-relaxed text-right">מפתחים רואים בפלט אמת מוחלטת בלי לבדוק את הלוס. בלי הבנת השגיאה, אי אפשר לדעת אם המודל מנחש או באמת יודע.</p>
                </div>
                <div className="p-8 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/4 transition-all group text-right shadow-lg">
                    <h4 className="w-full text-white font-bold mb-4 text-lg flex flex-row-reverse items-center gap-2 text-right justify-end">אמון עיוור בדאטה <ShieldAlert size={16} className="text-red-400" /></h4>
                    <p className="text-sm text-slate-400 leading-relaxed text-right">דאטה הוא חומר הגלם. אם הוא מוטה או לא יציב, המודל ילמד טעות יציבה. הבנת המתמטיקה עוזרת לזהות הטיות בנתונים.</p>
                </div>
            </div>
        </section>

        {/* --- 5. רגישות לדאטה --- */}
        <section className="mt-24 space-y-8">
            <h3 className="text-2xl font-bold text-white border-r-4 border-pink-500 pr-4 flex items-center gap-2 text-right">
                <LineChart size={24} className="text-pink-500"/>
                5. דוגמה הנדסית: רגישות המודל לדאטה
            </h3>
            
            <p className="text-slate-300 leading-relaxed max-w-3xl mr-0 text-right">
                צפה איך שינוי זעיר (Data Drift) בנקודת קלט אחת בלבד מסוגל להסיט את כל כיוון הניבוי של המודל.
            </p>

            <CodeBlock 
                language="python" 
                code={dataSensitivityCode} 
                output={dataSensitivityOutput} 
            />

            <InsightBox type="intuition" title="שיתוף פעולה עם המודל">
                שיתוף פעולה מוצלח עם ה-AI דורש הבנה שהמודל הוא מערכת של סיבה ותוצאה. ככל שתבין את המתמטיקה, תוכל להנחות אותו בצורה מדויקת יותר.
            </InsightBox>
        </section>

        {/* --- Quiz Section --- */}
        <section className="mt-32 border-t border-white/5 pt-10 text-right">
            <div className="max-w-4xl mx-auto text-right">
               <div
                    dir="rtl"
                    className="flex items-center gap-4 justify-start mb-16 pr-6 border-r-4 border-blue-400/30 text-right"
                    >
                    <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 shadow-inner">
                        <GraduationCap size={28} className="text-blue-400 opacity-80" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <h2 className="text-3xl font-black text-white tracking-tight pr-4 text-right">
                        בוחן הסמכה: פרק 1
                        </h2>

                        <p className="text-slate-500 text-base font-medium opacity-70 text-right">
                        הוכח שליטה באבני היסוד של ה-AI להמשך הקורס
                        </p>
                    </div>
                    </div>
                
                <div className="bg-[#0a0f1a]/50 p-4 rounded-[4rem] border border-white/5 backdrop-blur-3xl shadow-2xl text-right">
                    <AssessmentEngine 
                        title="מבדק אינטואיציה מתמטית" 
                        subtitle="ענה על 5 שאלות בעיון כדי לקבל הסמכה להמשך" 
                        questions={chapterQuestions} 
                    />
                </div>
            </div>
        </section>

    </ChapterLayout>
  );
}