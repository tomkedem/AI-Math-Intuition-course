"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Compass, Info } from "lucide-react";

export const DistanceSim = () => {
    const [valA, setValA] = useState(1.0);
    const [valB, setValB] = useState(4.5);

    const similarity = (1 - Math.abs(valA - valB) / 5).toFixed(3);

    return (
        <div className="w-full bg-slate-900/80 border border-blue-500/20 rounded-[3rem] p-10 text-right" dir="rtl">
            <div className="flex items-center gap-4 mb-8">
                <Compass className="text-blue-500" size={32} />
                <h4 className="text-white font-bold text-2xl tracking-tight">ניסוי 2: מבחן הקירבה</h4>
            </div>

            <div className="bg-blue-600/10 border-r-4 border-blue-500 p-4 rounded-lg mb-10">
                <p className="text-blue-100 text-sm">
                    <strong>אתגר בשבילך:</strong> הזז את הסליידרים כך שתגיע לציון דמיון של <strong>0.950</strong> בדיוק. שים לב כמה קרובים המושגים צריכים להיות בשביל שה-AI יחשוב שהם כמעט זהים.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-12">
                    {[ {v: valA, s: setValA, label: "מיקום מושג א'"}, {v: valB, s: setValB, label: "מיקום מושג ב'"} ].map((item, idx) => (
                        <div key={idx} className="space-y-4">
                            <label className="text-slate-400 font-bold block">{item.label}</label>
                            <input type="range" min="0" max="5" step="0.1" value={item.v} onChange={(e) => item.s(parseFloat(e.target.value))} className="w-full accent-blue-500 h-2 bg-slate-800 rounded-lg" />
                        </div>
                    ))}
                </div>

                <div className="relative flex flex-col items-center justify-center p-12 bg-black/40 rounded-3xl border border-blue-500/20">
                    <span className="text-blue-400 text-[10px] font-black tracking-widest uppercase mb-4">מדד דמיון קוסינוס</span>
                    <motion.div className="text-6xl font-black text-white">{similarity}</motion.div>
                </div>
            </div>

            <div className="mt-8 flex gap-4 bg-white/5 p-4 rounded-xl">
                <Info className="text-blue-400 shrink-0" size={20} />
                <p className="text-xs text-slate-400 leading-relaxed">
                    <strong>הבנה עמוקה:</strong> כשהזזת את הסליידרים, לא שינית &quot;מילים&quot;, שינית את הכתובת שלהן במרחב. ככל שהמרחק קטן, ה-AI יציע את מושג ב&apos; כתחליף למושג א&apos;. כך עובד מנגנון ה&quot;השלמה האוטומטית&quot;.
                </p>
            </div>
        </div>
    );
};