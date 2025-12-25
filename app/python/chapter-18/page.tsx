"use client";

import React from 'react';
import { ChapterLayout } from '@/components/ChapterLayout';
import { CodeBlock } from '@/components/content/CodeBlock';
import { Quiz } from '@/components/content/Quiz';
import { 
    FolderTree, Archive, 
    GitBranch, CheckCircle2, Share2, 
    ShieldCheck, Globe, 
    Folder, File, Cpu
} from 'lucide-react';

// רכיב שורת קובץ/תיקייה מעוצב - פתרון הנדסי ליישור
interface FileNodeProps {
  name: string;
  comment: string;
  level?: number;
  isFolder?: boolean;
}

const FileNode = ({ name, comment, level = 0, isFolder = true }: FileNodeProps) => (
  <div className="flex items-center group py-2 px-4 hover:bg-slate-800/50 transition-all border-b border-slate-800/50 last:border-0" dir="ltr">
    <div className="flex items-center flex-1">
      {Array(level).fill(0).map((_, i) => (
        <div key={i} className="w-6 h-6 border-l border-slate-700 ml-2 opacity-50" />
      ))}
      {isFolder ? (
        <Folder size={18} className="text-blue-400 mr-2 shrink-0" />
      ) : (
        <File size={18} className="text-slate-500 mr-2 shrink-0" />
      )}
      <span className="text-slate-200 font-mono text-sm font-medium tracking-tight">
        {name}
      </span>
    </div>
    <div className="flex-1 text-right" dir="rtl">
      <span className="text-slate-500 text-xs font-sans group-hover:text-slate-400 transition-colors italic">
        {comment}
      </span>
    </div>
  </div>
);

export default function Chapter18() {
  return (
    <ChapterLayout courseId="python" currentChapterId={18}>
        
        {/* --- Hero Section --- */}
        <section className="relative py-20 mb-20 overflow-hidden rounded-[2.5rem] bg-slate-900/40 border border-slate-800">
            <div className="absolute top-0 right-0 w-full h-full bg-linear-to-br from-emerald-500/5 via-transparent to-blue-500/5" />
            <div className="relative z-10 px-10 text-right" dir="rtl">
                <div className="flex items-center justify-start gap-3 text-emerald-400 mb-6">
                    <Cpu size={32} className="animate-pulse" />
                    <span className="font-mono text-sm tracking-[0.3em] uppercase">Architecture Capstone</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                    ממתכנת לארכיטקט <span className="text-emerald-400">AI</span>
                </h1>
                <p className="text-xl text-slate-300 max-w-4xl leading-relaxed">
                    זהו רגע השיא. כאן תלמדו איך לארוז את כל מה שלמדתם לשלד הנדסי מלא. 
                    אנחנו לא בונים עוד &quot;סקריפט&quot;, אלא <strong>מוצר</strong> שמוכן לעבודה בצוות אמיתי.
                </p>
            </div>
        </section>

        <div className="space-y-32 text-right" dir="rtl">

            {/* --- Project Anatomy Explorer --- */}
            <section className="space-y-8">
                <div className="flex items-center gap-4 border-r-4 border-blue-500 pr-6">
                    <FolderTree className="text-blue-500" size={32} />
                    <h2 className="text-3xl font-bold text-white">אנטומיה של פרויקט מקצועי</h2>
                </div>

                <div className="bg-slate-900/80 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="bg-slate-800/50 px-6 py-3 border-b border-slate-700 flex justify-between items-center">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/30" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500/30" />
                        </div>
                        <span className="text-slate-400 font-mono text-xs uppercase tracking-widest">Project Explorer</span>
                    </div>

                    <div className="p-2">
                        <FileNode name="project_root/" comment="שורש הפרויקט - נקודת המוצא" level={0} />
                        <FileNode name="config/" comment="ניהול הגדרות ותצורה (YAML/JSON)" level={1} />
                        <FileNode name="data/" comment="אחסון דאטהסטים (לא נשמר ב-Git)" level={1} />
                        <FileNode name="raw/" comment="נתונים מקוריים (בלתי ניתנים לשינוי)" level={2} />
                        <FileNode name="processed/" comment="נתונים נקיים לאחר Preprocessing" level={2} />
                        <FileNode name="domain/" comment="ליבת הלוגיקה העסקית וה-ML" level={1} />
                        <FileNode name="entities/" comment="הגדרת מבני הנתונים שלכם" level={2} />
                        <FileNode name="src/" comment="מימוש האפליקציה (CLI / API)" level={1} />
                        <FileNode name="infrastructure/" comment="חיבור לשירותים חיצוניים ו-DB" level={2} />
                        <FileNode name="notebooks/" comment="מרחב המחקר והניסויים (Jupyter)" level={1} />
                        <FileNode name="models/" comment="ארכיון המודלים המאומנים" level={1} />
                        <FileNode name="tests/" comment="בדיקות אוטומטיות (Safety Gate)" level={1} />
                        <FileNode name="pyproject.toml" comment="ניהול חבילות וגרסאות" level={1} isFolder={false} />
                    </div>
                </div>
            </section>
            
            

            {/* --- Engineering Pillars --- */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group bg-slate-900/50 p-8 rounded-[2rem] border border-slate-800 hover:border-orange-500/30 transition-all shadow-lg">
                    <div className="bg-orange-500/10 w-14 h-14 rounded-2xl flex items-center justify-center text-orange-400 mb-6 group-hover:scale-110 transition-transform">
                        <Archive size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">אריזה ב-Docker</h3>
                    <p className="text-slate-400 leading-relaxed text-sm mb-6">
                        כדי שהפרויקט יעבוד זהה בכל מחשב, אנחנו אורזים אותו בתוך &quot;קונטיינר&quot;. זה מבטיח שהמודל שאימנתם יעבוד על השרת בדיוק כפי שעבד בלפטופ.
                    </p>
                    <CodeBlock language="bash" dir="ltr" code={`# Building the image\ndocker build -t ai-project .`} />
                </div>

                <div className="group bg-slate-900/50 p-8 rounded-[2rem] border border-slate-800 hover:border-blue-500/30 transition-all shadow-lg">
                    <div className="bg-blue-500/10 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                        <GitBranch size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">אוטומציית CI/CD</h3>
                    <p className="text-slate-400 leading-relaxed text-sm mb-6">
                        אף אחד לא בודק קוד ידנית. בצוות מקצועי, כל &quot;Push&quot; מפעיל Pipeline שבודק איכות, מריץ בדיקות יחידה ומוודא שהכל תקין לפני הפריסה.
                    </p>
                    <CodeBlock language="yaml" dir="ltr" code={`name: CI\non: [push]\njobs:\n  test: { run: pytest }`} />
                </div>
            </section>

            {/* --- Strategic Insights --- */}
            <section className="space-y-12">
                <div className="flex items-center gap-4 border-r-4 border-purple-500 pr-6">
                    <ShieldCheck className="text-purple-500" size={32} />
                    <h2 className="text-3xl font-bold text-white">השכבה החכמה: Domain Logic</h2>
                </div>
                <div className="bg-linear-to-br from-indigo-950/20 to-purple-950/20 p-10 rounded-[2.5rem] border border-indigo-500/20 shadow-inner">
                    <p className="text-xl text-slate-200 leading-relaxed italic mb-8">
                        &quot;הסוד של מערכות AI גדולות הוא לא המודל - אלא היכולת להחליף אותו בלי לשבור את המערכת.&quot;
                    </p>
                    <div className="text-slate-300 space-y-4 text-lg">
                        <p>
                            שימו לב לתיקיית ה-<code>domain</code>. היא חייבת להיות נקייה מתלויות טכניות. היא לא יודעת אם אתם משתמשים ב-AWS או ב-Azure. היא מכילה רק את ה&quot;אמת המדעית&quot; של הפרויקט שלכם.
                        </p>
                        <p>
                            זה מאפשר לכם להחליף את בסיס הנתונים או את המודל עצמו בלי לשנות את קוד האפליקציה המרכזי. זה נקרא <strong>Decoupling</strong>.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- Course Finale --- */}
            <section className="py-32 text-center border-t border-slate-800">
                <div className="relative inline-block mb-10">
                    <div className="absolute -inset-10 bg-emerald-500/20 blur-3xl rounded-full" />
                    <CheckCircle2 size={100} className="relative text-emerald-400 mx-auto animate-pulse" />
                </div>
                
                <h2 className="text-5xl font-black text-white tracking-tight mb-8">המסע הושלם. המשימה מתחילה.</h2>
                <p className="text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed mb-16">
                    עברתם משורת הקוד הראשונה לבניית מערכות AI הנדסיות מלאות. 
                    מהיום, אתם לא רק כותבים קוד — אתם מעצבים את העתיד.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <button className="flex items-center justify-center gap-3 px-12 py-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-black text-2xl transition-all shadow-2xl hover:scale-105 active:scale-95">
                        <Share2 size={24} /> שתפו את תעודת הסיום
                    </button>
                    <button className="flex items-center justify-center gap-3 px-12 py-6 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-black text-2xl transition-all border border-slate-700 hover:scale-105">
                        <Globe size={24} /> צפו בפרויקטים נוספים
                    </button>
                </div>
            </section>

        </div>

        {/* --- Final Quiz --- */}
        <section className="mt-32">
            <Quiz 
                title="מבדק אדריכלות סופי"
                questions={[
                    {
                        id: 1,
                        question: "מדוע הפרדת ה-Domain לתיקייה נפרדת היא קריטית?",
                        options: [
                            "כדי שהקוד ייראה ארוך יותר ומקצועי",
                            "כדי לבודד את הלוגיקה המדעית מטכנולוגיות משתנות כמו ענן או בסיסי נתונים",
                            "כי פייתון דורשת זאת",
                            "אין לזה חשיבות ממשית"
                        ],
                        correctAnswer: 1,
                        explanation: "בידוד הלוגיקה מאפשר תחזוקה קלה והחלפת רכיבי תשתית ללא סיכון הליבה של ה-AI."
                    }
                ]} 
            />
        </section>

    </ChapterLayout>
  );
}