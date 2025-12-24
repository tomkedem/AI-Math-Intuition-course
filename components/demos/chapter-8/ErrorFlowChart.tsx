import React from 'react';
import { ArrowDown, Diamond } from 'lucide-react';

export const ErrorFlowChart = () => {
    return (
        <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-700 flex flex-col items-center gap-2 font-sans my-8">
            <h4 className="text-slate-300 font-bold mb-4 uppercase tracking-wider text-sm">תרשים זרימה: מנגנון השגיאות</h4>
            
            {/* Start */}
            <div className="bg-slate-800 px-6 py-3 rounded-lg border border-slate-600 text-slate-200 text-sm font-bold shadow-lg">
                התחלת בלוק TRY
            </div>
            
            <ArrowDown className="text-slate-600" />

            {/* Decision */}
            <div className="relative">
                <div className="bg-indigo-900/30 border border-indigo-500/50 text-indigo-300 px-8 py-4 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg shadow-indigo-500/10">
                    <Diamond size={16} /> האם קרתה שגיאה?
                </div>
                
                {/* YES Path */}
                <div className="absolute top-1/2 right-full w-12 h-0.5 bg-red-500/30"></div>
                <div className="absolute top-1/2 right-full -translate-y-1/2 -translate-x-14 text-xs text-red-400 font-bold bg-slate-950 px-1 rounded">כן</div>
                
                {/* NO Path */}
                <div className="absolute top-1/2 left-full w-12 h-0.5 bg-emerald-500/30"></div>
                <div className="absolute top-1/2 left-full -translate-y-1/2 translate-x-2 text-xs text-emerald-400 font-bold bg-slate-950 px-1 rounded">לא</div>
            </div>

            <div className="flex justify-between w-full max-w-md mt-2">
                {/* Error Side */}
                <div className="flex flex-col items-center">
                    <ArrowDown className="text-red-500/30 h-8" />
                    <div className="bg-red-900/20 border border-red-500/30 text-red-300 px-4 py-3 rounded text-sm w-32 text-center">
                        <span className="block font-mono text-xs text-red-500 mb-1">except:</span>
                        טיפול בשגיאה
                    </div>
                </div>

                {/* Success Side */}
                <div className="flex flex-col items-center">
                    <ArrowDown className="text-emerald-500/30 h-8" />
                    <div className="bg-emerald-900/20 border border-emerald-500/30 text-emerald-300 px-4 py-3 rounded text-sm w-32 text-center">
                        <span className="block font-mono text-xs text-emerald-500 mb-1">else:</span>
                        המשך ריצה
                    </div>
                </div>
            </div>

            <div className="flex justify-center w-full max-w-xs mt-4 relative h-8">
                <div className="absolute top-0 left-8 right-8 h-4 border-b-2 border-slate-700 rounded-b-xl"></div>
                <div className="absolute bottom-0 left-1/2 h-4 border-l-2 border-slate-700"></div>
            </div>

            {/* Finally */}
            <div className="bg-slate-800 px-6 py-3 rounded-lg border border-blue-500/30 text-blue-200 text-sm font-bold shadow-lg shadow-blue-500/5 mt-1 w-48 text-center">
                <span className="block font-mono text-xs text-blue-400 mb-1">finally:</span>
                ניקוי משאבים (תמיד)
            </div>
        </div>
    );
};