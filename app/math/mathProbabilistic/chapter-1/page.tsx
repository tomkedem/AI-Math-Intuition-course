"use client";

import React from 'react';
import { 
    Binary, Compass, Target, Layers, 
    ShieldAlert, Zap, MousePointer2, BrainCircuit,
    LineChart, Terminal, GraduationCap, ArrowRightLeft
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

# וקטור המייצג תכונות מופשטות של מילה
v = np.array([0.3, 1.2, 4.8])

print("Vector:", v)`;
  const vectorInitOutput = `Vector: [0.3 1.2 4.8]`;

  const distanceCalcCode = `import numpy as np

a = np.array([1.0, 2.0, 3.0])
b = np.array([1.5, 2.3, 2.7])

# חישוב מרחק אוקלידי (Euclidean Distance)
distance = np.linalg.norm(a - b)
print("Distance:", distance)`;
  const distanceCalcOutput = `Distance: 0.655`;

  const cosineSimCode = `import numpy as np

a = np.array([1.0, 2.0, 3.0])
b = np.array([1.0, 2.0, 2.5])

dot_product = np.dot(a, b)
norm_a = np.linalg.norm(a)
norm_b = np.linalg.norm(b)

# דמיון קוסינוס - בוחן את הזווית בין הוקטורים
cosine_sim = dot_product / (norm_a * norm_b)
print("Cosine Similarity:", cosine_sim)`;
  const cosineSimOutput = `Cosine Similarity: 0.985`;

  const gradientStepCode = `def loss(x): return (x - 3) ** 2
def slope(x): return 2 * (x - 3)

x = -1        # ניחוש התחלתי
lr = 0.1      # קצב למידה (Learning Rate)

# צעד אחד של Gradient Descent להקטנת השגיאה
x = x - lr * slope(x)

print(f"Loss after step: {loss(x):.4f}")`;
  const gradientStepOutput = `Loss after step: 10.2400`;

  const dataSensitivityCode = `import numpy as np

x = np.array([1, 2, 3, 4])
y = np.array([2, 4, 6, 8]) # יחס מושלם y=2x

# הוספת שינוי זעיר (0.8) לנקודה אחת
y_modified = y.copy()
y_modified[2] += 0.8 

slope_modified = np.sum(x * y_modified) / np.sum(x * x)
print(f"Modified slope: {slope_modified:.3f}")`;
  const dataSensitivityOutput = `Modified slope: 2.114`;

  // --- Quiz Questions (5 Standardized Questions) ---
  const questions = [
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
                <span className="font-mono text-sm tracking-wider uppercase">Math Foundations 01</span>
            </div>
            <h1 className="text-4xl font-black text-white leading-tight">
                למה אנחנו צריכים מתמטיקה יישומית בעולם של AI?
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
                בכל פעולה שהמודל מבצע - מסכם טקסט, משלים קוד או מסווג תמונה - מתרחש שם משחק מתמטי מדויק. 
                כאן נבין איך משמעות הופכת לגיאומטריה ושגיאות הופכות ללמידה.
            </p>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex gap-4 mt-6">
                <BrainCircuit className="text-blue-500 shrink-0" size={24} />
                <div>
                    <h4 className="font-bold text-white mb-1">הקופסה השחורה נפתחת</h4>
                    <p className="text-sm text-slate-400">
                        כשמבינים את ההיגיון שמאחורי המספרים, המודל מפסיק להיות קסם. במקום לנחש, תוכל להגיד בביטחון אם התוצאה הגיונית או שהדאטה מטעה.
                    </p>
                </div>
            </div>
        </section>

        {/* --- 1. וקטורים --- */}
        <section className="mt-16 space-y-8">
            <h3 className="text-2xl font-bold text-white border-r-4 border-blue-500 pr-4 flex items-center gap-2 text-right">
                <Layers size={24} className="text-blue-500"/>
                וקטורים: ה-DNA של המידע
            </h3>
            
            <p className="text-slate-300">
                המודל מתרגם כל פיסת מידע לוקטור - רשימה מסודרת של מספרים המייצגת משמעות במרחב רב-ממדי.
            </p>
            
            <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                <VectorLab />
            </div>

            <CodeBlock 
                language="python" 
                code={vectorInitCode} 
                output={vectorInitOutput} 
            />

            <InsightBox type="intuition" title="וקטור הוא כתובת">
                תחשוב על וקטור כעל כתובת GPS במרחב ה&quot;משמעות&quot;. מושגים דומים יגורו באותה שכונה מתמטית.
            </InsightBox>
        </section>

        {/* --- 2. נורמות ומרחקים --- */}
        <section className="mt-20 space-y-8">
            <h3 className="text-2xl font-bold text-white border-r-4 border-emerald-500 pr-4 flex items-center gap-2 text-right">
                <Compass size={24} className="text-emerald-400"/>
                נורמות ומרחקים: הגיאומטריה של הדמיון
            </h3>
            
            <p className="text-slate-300">
                כדי להבין מה דומה למה, המודל מודד מרחק. המרחק האוקלידי בודק את הקו הישר, בעוד שדמיון קוסינוס בודק את כיוון הוקטורים.
            </p>

            <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                <DistanceSim />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <CodeBlock 
                    language="python" 
                    code={distanceCalcCode} 
                    output={distanceCalcOutput} 
                />
                <CodeBlock 
                    language="python" 
                    code={cosineSimCode} 
                    output={cosineSimOutput} 
                />
            </div>
            
            <InsightBox type="info" title="דמיון קוסינוס">
                כשהמספר קרוב ל-1, הוקטורים מצביעים לאותו כיוון. זהו הבסיס לחיפוש סמנטי ו-Embeddings.
            </InsightBox>
        </section>

        {/* --- 3. לוס (Loss) --- */}
        <section className="mt-20 space-y-8">
            <h3 className="text-2xl font-bold text-white border-r-4 border-red-500 pr-4 flex items-center gap-2 text-right">
                <Target size={24} className="text-red-500"/>
                לוס: למה מודלים לומדים מטעויות?
            </h3>
            
            <p className="text-slate-300">
                מודלים לא לומדים מ&quot;הצלחה&quot;, אלא מטעויות. הלוס מודד את הפער בין הניבוי למציאות, והוא המצפן שמוביל את המודל לשיפור.
            </p>

            <CodeBlock 
                language="python" 
                code={gradientStepCode} 
                output={gradientStepOutput} 
            />

            <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-xl flex gap-4">
                <Zap className="text-red-400 shrink-0" size={24} />
                <p className="text-sm text-slate-300 italic leading-relaxed">
                    נניח שהמודל ניבא 30 והאמת היא 35. השגיאה (5) משמשת את ה-Gradient Descent כדי לכוון מחדש את הפרמטרים ולהקטין את הלוס בצעד הבא.
                </p>
            </div>
        </section>

        {/* --- 4. טעויות נפוצות --- */}
        <section className="mt-20 space-y-8">
            <h3 className="text-2xl font-bold text-white border-r-4 border-amber-500 pr-4 flex items-center gap-2 text-right">
                <ShieldAlert size={24} className="text-amber-500"/>
                בורות נפוצים של מפתחים
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-800/40 rounded-xl border border-slate-700">
                    <h4 className="text-white font-bold mb-2">התעלמות מגודל השגיאה</h4>
                    <p className="text-slate-400 text-sm">ראיית הפלט כאמת מוחלטת בלי לשאול מה הלוס סיפר למודל על הביטחון שלו בתוצאה.</p>
                </div>
                <div className="p-6 bg-slate-800/40 rounded-xl border border-slate-700">
                    <h4 className="text-white font-bold mb-2">קצב למידה שגוי</h4>
                    <p className="text-slate-400 text-sm">בחירת Learning Rate גבוה מדי גורמת למודל לדלג מעל הפתרון הנכון ולא להתכנס לעולם.</p>
                </div>
            </div>
        </section>

        {/* --- 5. רגישות לדאטה --- */}
        <section className="mt-20 space-y-8">
            <h3 className="text-2xl font-bold text-white border-r-4 border-pink-500 pr-4 flex items-center gap-2 text-right">
                <LineChart size={24} className="text-pink-500"/>
                דוגמה הנדסית: רגישות המודל לדאטה
            </h3>
            
            <p className="text-slate-300">
                צפה איך שינוי זעיר (Data Drift) בנקודת קלט אחת מסוגל להסיט את כל כיוון הניבוי של המודל.
            </p>

            <CodeBlock 
                language="python" 
                code={dataSensitivityCode} 
                output={dataSensitivityOutput} 
            />
            
            <InsightBox type="warning" title="כלל הברזל">
                מודלים מגיבים בצורה מדויקת ועקבית למספרים. אם הדאטה מוטה או לא יציב, הלמידה תנוע בכיוון שגוי.
            </InsightBox>
        </section>

        {/* --- Quiz Section --- */}
        <section className="mt-32 border-t border-white/5 pt-20">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 justify-center mb-16">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                        <GraduationCap size={24} />
                    </div>
                    <h2 className="text-3xl font-black text-white">בוחן הסמכה: פרק 1</h2>
                </div>
                
                <div className="bg-[#0a0f1a]/50 p-1 rounded-[3rem] border border-white/5 backdrop-blur-3xl shadow-2xl">
                    <AssessmentEngine 
                        title="הוכח שליטה באבני היסוד" 
                        subtitle="ענה על 5 שאלות בעיון כדי לקבל הסמכה להמשך" 
                        questions={questions} 
                    />
                </div>
            </div>
        </section>

    </ChapterLayout>
  );
}