"use client";

import React from 'react';
import { ChapterLayout } from '@/components/ChapterLayout';
import { InsightBox } from '@/components/content/InsightBox';
import { CodeBlock } from '@/components/content/CodeBlock';
import { LiveCodeEditor } from '@/components/content/LiveCodeEditor';
import { Quiz } from '@/components/content/Quiz';
import { ProjectStructureTree, TheBigAssembler } from '@/components/demos/chapter-17';
import { 
    Rocket, Layout, Cpu, Layers, Settings, ShieldCheck, 
    Box, Activity, Zap, Microscope, Terminal, GitBranch, 
    CheckCircle2
} from 'lucide-react';

export default function Chapter17() {

  return (
    <ChapterLayout courseId="python" currentChapterId={17}>
        
        {/* --- Hero Section --- */}
        <section className="space-y-6 mb-20 text-right" dir="rtl">
            <div className="flex items-center justify-start gap-3 text-emerald-400">
                <Rocket size={32} className="animate-bounce" />
                <span className="font-mono text-lg tracking-widest uppercase">The Capstone Mission</span>
            </div>
            <h1 className="text-5xl font-black text-white leading-tight">
                בניית mini_text_analyzer
            </h1>
            <p className="text-xl text-slate-300 max-w-4xl leading-relaxed">
                ברוכים הבאים למעבדת ההרכבה. כאן לא רק תכתבו קוד, אלא תבנו **מערכת**. 
                כל תרגיל הוא לבנה נוספת בבניין. קראו את ההסבר ההנדסי לפני שתתחילו לכתוב.
            </p>
        </section>

        <div className="space-y-32 text-right" dir="rtl">

            {/* --- Exercise 1 --- */}
            <section className="space-y-6 bg-slate-900/30 p-8 rounded-3xl border border-slate-800">
                <div className="flex items-center gap-4 border-r-4 border-blue-500 pr-6">
                    <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400"><Layout size={28}/></div>
                    <div>
                        <h2 className="text-3xl font-bold text-white">תרגיל 1: ארכיטקטורת ספריות</h2>
                        <p className="text-blue-400 font-mono text-sm uppercase">Phase: Environment Setup</p>
                    </div>
                </div>
                <div className="space-y-4 text-slate-300 leading-relaxed">
                    <p>
                        בעולם ה-AI, אנחנו עובדים עם המון נתונים (Data) והמון ניסויים (Notebooks/Tests). 
                        אם נזרוק הכל לתיקייה אחת, נאבד שליטה. 
                    </p>
                    <p className="bg-blue-500/10 p-4 rounded-lg border-r-2 border-blue-400 italic">
                        <strong>ההסבר ההנדסי:</strong> הפרדת ה-<code>src</code> מה-<code>tests</code> מאפשרת לנו להפיץ רק את הקוד הנחוץ ללקוח, מבלי להכביד עליו עם קבצי בדיקה ונתוני גלם.
                    </p>
                    <h4 className="font-bold text-white mt-4">המשימה:</h4>
                    <ul className="list-disc list-inside space-y-2">
                        <li>צרו תיקיית שורש בשם <code>mini_text_analyzer</code>.</li>
                        <li>בתוכה, צרו <code>src</code> לקוד המקור ו-<code>data</code> לקבצי הטקסט.</li>
                        <li>צרו קובץ <code>requirements.txt</code> עם הספריות: <code>typer, pandas, pytest</code>.</li>
                    </ul>
                </div>
                <ProjectStructureTree />
            </section>

            {/* --- Exercise 2 --- */}
            <section className="space-y-6">
                <div className="flex items-center gap-4 border-r-4 border-indigo-500 pr-6">
                    <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400"><Cpu size={28}/></div>
                    <div>
                        <h2 className="text-3xl font-bold text-white">תרגיל 2: ליבת ה-NLP</h2>
                        <p className="text-indigo-400 font-mono text-sm uppercase">Phase: Data Processing</p>
                    </div>
                </div>
                <div className="space-y-4 text-slate-300">
                    <p>לפני שכל מודל AI (כמו GPT) נוגע בטקסט, הוא עובר תהליך של <strong>Preprocessing</strong>.</p>
                    <p className="bg-indigo-500/10 p-4 rounded-lg border-r-2 border-indigo-400">
                        <strong>ההסבר ההנדסי:</strong> מחשבים לא מבינים &quot;שלום&quot; ו-&quot;שלום!&quot; כשני דברים שונים. נירמול (Normalization) מסיר סימני פיסוק ורווחים מיותרים כדי שהניתוח הסטטיסטי יהיה מדויק.
                    </p>
                </div>
                <LiveCodeEditor 
                    initialCode={`import re

def normalize(text: str) -> str:
    # 1. הפוך לאותיות קטנות (lower)
    # 2. הסר רווחים מיותרים מהקצוות (strip)
    return text.lower().strip()

def tokenize(text: str) -> list[str]:
    # 3. השתמש בביטוי רגולרי r'\\w+' כדי לחלץ מילים בלבד
    return re.findall(r'\\w+', text)`}
                    onRun={() => "Core NLP logic verified. Ready to process raw strings."}
                />
            </section>

            {/* --- Exercise 3 --- */}
            <section className="space-y-6">
                <div className="flex items-center gap-4 border-r-4 border-purple-500 pr-6">
                    <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400"><Layers size={28}/></div>
                    <div>
                        <h2 className="text-3xl font-bold text-white">תרגיל 3: חוק המודולריות</h2>
                        <p className="text-purple-400 font-mono text-sm uppercase">Phase: Refactoring</p>
                    </div>
                </div>
                <div className="space-y-4 text-slate-300">
                    <p>כשפרויקט גדל, קובץ אחד הופך למפלצת. אנחנו מפרידים לוגיקה לעזרים (Utils).</p>
                    <InsightBox type="info" title="למה זה קריטי?">
                        דמיין שתרצה להשתמש ב-<code>tokenize</code> בפרויקט אחר. אם היא קבורה בתוך סקריפט ה-Pipeline, תצטרך להעתיק-הדבק. אם היא ב-<code>text_utils.py</code>, פשוט תייבא אותה.
                    </InsightBox>
                    <p className="font-bold text-white">המשימה:</p>
                    <p>העבר את פונקציות הניקוי לקובץ <code>src/text_utils.py</code> וודא שיש קובץ <code>__init__.py</code> בתיקייה כדי לאפשר ייבוא.</p>
                </div>
            </section>

            {/* --- Exercise 4 --- */}
            <section className="space-y-6">
                <div className="flex items-center gap-4 border-r-4 border-yellow-500 pr-6">
                    <div className="p-3 bg-yellow-500/20 rounded-xl text-yellow-400"><Settings size={28}/></div>
                    <div>
                        <h2 className="text-3xl font-bold text-white">תרגיל 4: הפרדת הגדרות (Config)</h2>
                        <p className="text-yellow-400 font-mono text-sm uppercase">Phase: Configuration</p>
                    </div>
                </div>
                <div className="space-y-4 text-slate-300">
                    <p>לעולם אל תכתוב נתיבי קבצים או API Keys בתוך הקוד (Hardcoding)!</p>
                    <p className="bg-yellow-500/10 p-4 rounded-lg border-r-2 border-yellow-400">
                        <strong>ההסבר ההנדסי:</strong> שימוש ב-JSON מאפשר לנו לשנות את שפת הניתוח או את קובץ הקלט בלי &quot;לפתוח את המנוע&quot; (הקוד). זה מאפשר לאנשים שהם לא מתכנתים להגדיר את המערכת.
                    </p>
                </div>
                <LiveCodeEditor 
                    initialCode={`import json, pathlib

def load_config(path: str = "config.json") -> dict:
    # 1. השתמש ב-pathlib לקריאת הקובץ
    # 2. השתמש ב-json.loads להפיכה למילון
    content = pathlib.Path(path).read_text(encoding="utf-8")
    return json.loads(content)`}
                    onRun={() => "Config loader implemented. System is now data-driven."}
                />
            </section>

            {/* --- Exercise 5 --- */}
            <section className="space-y-6">
                <div className="flex items-center gap-4 border-r-4 border-red-500 pr-6">
                    <div className="p-3 bg-red-500/20 rounded-xl text-red-400"><ShieldCheck size={28}/></div>
                    <div>
                        <h2 className="text-3xl font-bold text-white">תרגיל 5: חוסן (Robustness)</h2>
                        <p className="text-red-400 font-mono text-sm uppercase">Phase: Error Handling</p>
                    </div>
                </div>
                <div className="space-y-4 text-slate-300">
                    <p>במערכות AI, נתונים יכולים להיות פגומים או חסרים. אסור למערכת &quot;להתרסק&quot;.</p>
                    <p className="bg-red-500/10 p-4 rounded-lg border-r-2 border-red-400">
                        <strong>ההסבר ההנדסי:</strong> <code>logging</code> הוא הקופסה השחורה של המהנדס. כשהמערכת תרוץ על שרת בענן ב-3 בלילה, הלוגים יהיו הדרך היחידה שלך לדעת למה היא נכשלה.
                    </p>
                </div>
                <CodeBlock language="python" dir="ltr" code={`import logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

try:
    config = load_config()
except FileNotFoundError:
    logging.error("Critical failure: config.json not found.")
    raise`} />
            </section>

            {/* --- Exercise 6 --- */}
            <section className="space-y-6">
                <div className="flex items-center gap-4 border-r-4 border-emerald-500 pr-6">
                    <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400"><Box size={28}/></div>
                    <div>
                        <h2 className="text-3xl font-bold text-white">תרגיל 6: ה-Pipeline כאובייקט</h2>
                        <p className="text-emerald-400 font-mono text-sm uppercase">Phase: OOP Design</p>
                    </div>
                </div>
                <div className="space-y-4 text-slate-300">
                    <p>אנחנו בונים &quot;מכונת עיבוד&quot; אחת שמרכזת הכל. אובייקט (Class) הוא הדרך לאגד את ההגדרות (Config) יחד עם הפעולות (Methods).</p>
                    
                </div>
                <LiveCodeEditor 
                    initialCode={`class TextPipeline:
    def __init__(self, config: dict):
        self.config = config
        self.results = {}

    def run_clean(self, raw_text: str) -> str:
        # השתמש ב-normalize וב-tokenize
        return " ".join(tokenize(normalize(raw_text)))`}
                    onRun={() => "Pipeline engine blueprint created successfully."}
                />
            </section>

            {/* --- Exercise 7 & 8 --- */}
            <section className="space-y-6 bg-slate-900/30 p-8 rounded-3xl border border-slate-800">
                <div className="flex items-center gap-4 border-r-4 border-orange-500 pr-6">
                    <div className="p-3 bg-orange-500/20 rounded-xl text-orange-400"><Zap size={28}/></div>
                    <div>
                        <h2 className="text-3xl font-bold text-white">תרגיל 7-8: טיפוסים ומדידה</h2>
                        <p className="text-orange-400 font-mono text-sm uppercase">Phase: Pro Code Standards</p>
                    </div>
                </div>
                <div className="space-y-4 text-slate-300">
                    <p><strong>טיפוסים:</strong> הוסף <code>-&gt; dict</code> ו-<code>: list[str]</code>. זה מונע 90% משגיאות הריצה בצוותים גדולים.</p>
                    <p><strong>מדידה:</strong> ב-AI, זמן זה כסף. השתמש בדקורטור <code>@measure_time</code> כדי לגלות אילו קבצים לוקחים יותר מדי זמן לעיבוד.</p>
                </div>
            </section>

            {/* --- Exercise 9 --- */}
            <section className="space-y-6">
                <div className="flex items-center gap-4 border-r-4 border-pink-500 pr-6">
                    <div className="p-3 bg-pink-500/20 rounded-xl text-pink-400"><Microscope size={28}/></div>
                    <div>
                        <h2 className="text-3xl font-bold text-white">תרגיל 9: חסינות בעזרת Pytest</h2>
                        <p className="text-pink-400 font-mono text-sm uppercase">Phase: Quality Assurance</p>
                    </div>
                </div>
                <div className="space-y-4 text-slate-300">
                    <p>בדיקות הן לא מטרד, הן תעודת הביטוח שלך. מה יקרה אם תעדכן את ה-Regex ותהרוס בטעות את הניקוי?</p>
                </div>
                <LiveCodeEditor 
                    initialCode={`def test_text_normalization():
    # המשימה: כתוב בדיקה שמוודאת ש-normalize הופך ל-lower case
    sample = " DATA SCieNCE "
    expected = "data science"
    assert normalize(sample) == expected`}
                    onRun={() => "Pytest unit verified. 1 test passed."}
                />
            </section>

            {/* --- Exercise 10 --- */}
            <section className="space-y-6">
                <div className="flex items-center gap-4 border-r-4 border-slate-400 pr-6">
                    <div className="p-3 bg-slate-500/20 rounded-xl text-slate-400"><Activity size={28}/></div>
                    <div>
                        <h2 className="text-3xl font-bold text-white">תרגיל 10: כוחו של Pandas</h2>
                        <p className="text-slate-400 font-mono text-sm uppercase">Phase: Data Science Integration</p>
                    </div>
                </div>
                <p className="text-slate-300 leading-relaxed">
                    למה לעבור בלולאה על מילים אם אפשר להשתמש ב-Pandas? המשימה: הפוך את ה-Tokens ל-Series וחשב את אורך המילים הממוצע (Mean) והמילים הכי נפוצות (Value Counts).
                </p>
                <LiveCodeEditor 
                    initialCode={`import pandas as pd

def analyze_tokens(tokens: list[str]) -> dict:
    s = pd.Series(tokens)
    return {
        "word_count": len(s),
        "avg_length": s.str.len().mean(),
        "unique_words": s.nunique()
    }`}
                    onRun={() => "Pandas stats engine operational."}
                />
            </section>

            {/* --- Exercise 11 --- */}
            <section className="space-y-6">
                <div className="flex items-center gap-4 border-r-4 border-orange-600 pr-6">
                    <div className="p-3 bg-orange-600/20 rounded-xl text-orange-500"><Terminal size={28}/></div>
                    <div>
                        <h2 className="text-3xl font-bold text-white">תרגיל 11: ממשק המשתמש (CLI)</h2>
                        <p className="text-orange-500 font-mono text-sm uppercase">Phase: Application Delivery</p>
                    </div>
                </div>
                <div className="space-y-4 text-slate-300">
                    <p>בנה את <code>mintx.py</code>. המטרה היא שכל משתמש יוכל להפעיל את הניתוח שלך מבלי לפתוח את העורך.</p>
                    <div className="bg-black/60 p-4 rounded-lg font-mono text-emerald-400 border border-slate-700" dir="ltr">
                        $ python mintx.py clean input.txt --output clean.txt
                    </div>
                </div>
            </section>

            {/* --- Exercise 12 --- */}
            <section className="space-y-6">
                <div className="flex items-center gap-4 border-r-4 border-blue-600 pr-6">
                    <div className="p-3 bg-blue-600/20 rounded-xl text-blue-500"><GitBranch size={28}/></div>
                    <div>
                        <h2 className="text-3xl font-bold text-white">תרגיל 12: המהנדס המלא (CI/CD)</h2>
                        <p className="text-blue-500 font-mono text-sm uppercase">Phase: Final Release</p>
                    </div>
                </div>
                <p className="text-slate-300 leading-relaxed">
                    זהו רגע ההרכבה הסופי. המערכת שלך מוכנה. לחץ על הכפתור כדי לראות איך הנתון זורם דרך כל השכבות שבנית ב-12 השלבים האחרונים.
                </p>
                <TheBigAssembler />
            </section>

        </div>

        {/* --- Master AI Engineer Quiz --- */}
        <section className="mt-40 border-t border-slate-800 pt-20">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl font-black text-white">מבחן הסמכה: 12 עקרונות הליבה</h2>
                <p className="text-slate-400">הוכח שליטה בכל אחד משלבי בניית המערכת</p>
            </div>
            
            <Quiz 
                title="Capstone Exam"
                questions={[
                    {
                        id: 1,
                        question: "מדוע מפרידים את ה-Config לקובץ JSON חיצוני?",
                        options: ["כדי להסתיר את הקוד", "כדי לאפשר שינוי פרמטרים בלי צורך לשנות את קוד המקור", "כי פייתון לא יודעת לשמור משתנים", "כדי להאט את הריצה"],
                        correctAnswer: 1,
                        explanation: "הפרדת תצורה מאפשרת גמישות מרבית במעבר בין סביבות (פיתוח, ענן וכו')."
                    },
                    {
                        id: 2,
                        question: "מה תפקידו של normalize בתהליך ה-NLP?",
                        options: ["להוסיף צבעים לטקסט", "להפוך טקסט לפורמט אחיד (למשל lowercase) למניעת כפילויות בניתוח", "למחוק את כל הקובץ", "לתרגם את הטקסט"],
                        correctAnswer: 1,
                        explanation: "ללא נירמול, המחשב יתייחס למילים 'Apple' ו-'apple' כשתי ישויות שונות."
                    },
                    {
                        id: 3,
                        question: "איזו ספרייה משמשת לביצוע חישובים סטטיסטיים מהירים על אוספי נתונים?",
                        options: ["Requests", "Typer", "Pandas", "Logging"],
                        correctAnswer: 2,
                        explanation: "Pandas היא הסטנדרט בתעשייה לעיבוד נתונים מהיר ומבוסס טבלאות."
                    },
                    {
                        id: 4,
                        question: "מדוע נשתמש ב-logging במקום ב-print במערכת AI אמיתית?",
                        options: ["כי print לא עובד", "כדי לאפשר תיעוד מסודר לקבצים ושליטה ברמות פירוט (INFO/ERROR)", "כדי לחסוך חשמל", "כי logging יפה יותר"],
                        correctAnswer: 1,
                        explanation: "לוגים הם הכרחיים לניטור תקלות במערכות שרצות בשרתים מרוחקים."
                    },
                    {
                        id: 5,
                        question: "מהו היתרון של שימוש ב-Type Hints (למשל list[str])?",
                        options: ["זה חובה בפייתון", "זה עוזר למנוע שגיאות לוגיות בזמן הפיתוח ומשפר את התיעוד", "זה גורם לקוד להיות איטי יותר", "אין לזה שום יתרון"],
                        correctAnswer: 1,
                        explanation: "טיפוסים עוזרים לכלים (כמו ה-IDE) להבין מה אנחנו מצפים לקבל."
                    },
                    {
                        id: 6,
                        question: "מה התפקיד של raise typer.Exit(code=1)?",
                        options: ["לכבות את המחשב", "לסמן למערכת שהתהליך נכשל", "לפתוח תפריט עזרה", "להדפיס 'שלום'"],
                        correctAnswer: 1,
                        explanation: "קודי יציאה (Exit Codes) הם הדרך של תוכנות לדבר עם מערכת ההפעלה."
                    },
                    {
                        id: 7,
                        question: "מתי נשתמש בדקורטור (Decorator)?",
                        options: ["כדי לשנות את שם הפונקציה", "כדי להוסיף לוגיקה משותפת (כמו מדידת זמן) לכמה פונקציות בלי לשכפל קוד", "כדי למחוק קבצים", "כדי להפוך את הקוד ל-HTML"],
                        correctAnswer: 1,
                        explanation: "דקורטורים הם כלי חזק לשמירה על עקרון ה-DRY (Don't Repeat Yourself)."
                    },
                    {
                        id: 8,
                        question: "מה המטרה של בדיקות יחידה (Unit Tests)?",
                        options: ["למצוא באגים באינטרנט", "לוודא שכל חלק קטן בקוד (פונקציה) עובד בדיוק כפי שתכננו", "להאריך את זמן הפרויקט", "להחליף את המתכנת"],
                        correctAnswer: 1,
                        explanation: "בדיקות יחידה מבטיחות ששינוי עתידי לא יהרוס פונקציונליות קיימת."
                    },
                    {
                        id: 9,
                        question: "מה המשמעות של מודולריות בקוד?",
                        options: ["כתיבת הכל בקובץ אחד", "פירוק המערכת ליחידות עצמאיות (מודולים) הניתנות לשימוש חוזר ובדיקה", "מחיקת פונקציות ישנות", "שימוש רק בטיפוסים בסיסיים"],
                        correctAnswer: 1,
                        explanation: "מודולריות הופכת את הקוד לקריא, נקי וקל לתחזוקה."
                    },
                    {
                        id: 10,
                        question: "מדוע מחלקת TextPipeline מחזיקה את ה-config כאטריביוט?",
                        options: ["כי זה יפה", "כדי שכל הפעולות במחלקה יוכלו לגשת להגדרות המערכת בקלות (State)", "כדי למנוע שינוי של ההגדרות", "כדי להפוך את הקוד ל-JSON"],
                        correctAnswer: 1,
                        explanation: "המחלקה שומרת על ה-State (המצב) של המערכת לאורך כל שלבי ה-Pipeline."
                    },
                    {
                        id: 11,
                        question: "איזה כלי מאפשר להפוך את הפרויקט לפקודה בטרמינל?",
                        options: ["Pandas", "Typer", "Regex", "Logging"],
                        correctAnswer: 1,
                        explanation: "Typer (או argparse) בונים את ממשק המשתמש של הכלי שלנו."
                    },
                    {
                        id: 12,
                        question: "מהו CI/CD?",
                        options: ["שיטת כתיבה של פייתון", "אוטומציה המריצה בדיקות ופורסת קוד באופן רציף", "שם של פונקציית Pandas", "סוג של קובץ טקסט"],
                        correctAnswer: 1,
                        explanation: "CI/CD מבטיח שכל שינוי קוד נבדק אוטומטית לפני שהוא מגיע למשתמש."
                    }
                ]} 
            />
        </section>

        {/* --- Final Finale --- */}
        <section className="mt-40 mb-20 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-3xl -mr-48 -mt-48"></div>
             <div className="bg-linear-to-r from-emerald-500/20 via-blue-500/20 to-indigo-600/20 rounded-3xl p-20 border border-slate-700/50 shadow-2xl relative z-10">
                <CheckCircle2 size={80} className="text-emerald-400 mx-auto mb-8 animate-pulse" />
                <h2 className="text-5xl font-black text-white mb-6 tracking-tighter">המשימה הושלמה.</h2>
                <p className="text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed italic">
                    &quot;סיימת את המסע מסטודנט למהנדס. mini_text_analyzer הוא כבר לא קוד על המסך, הוא מוצר הנדסי שבנית במו ידיך.&quot;
                </p>
                <div className="mt-12">
                    <p className="text-emerald-400 font-mono text-sm tracking-[0.3em] uppercase">Master AI Software Engineer Certified</p>
                </div>
            </div>
        </section>

    </ChapterLayout>
  );
}