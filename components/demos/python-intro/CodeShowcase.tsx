"use client";

import React from 'react';

export const CodeShowcase = () => {
  return (
    <div className="w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center mb-8">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
          הנדסת AI בתמציתה
        </h3>
        <p className="text-slate-400 max-w-2xl mx-auto">
          במקום לנהל זיכרון ולבנות אלגוריתמים מורכבים ב-++C, אנחנו משתמשים בפייתון כדי לנצח על מודלים של טריליוני פרמטרים ב-3 שורות קוד.
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#0d1117] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="bg-[#161b22] px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
            production_ai_pipeline.py
          </div>
          <div className="w-12" />
        </div>

        <div className="p-10 md:p-12 overflow-x-hidden" dir="ltr">
          <pre className="text-xl md:text-2xl font-mono leading-relaxed tracking-tight">
            <div className="flex gap-4">
              <span className="text-slate-600 select-none">1</span>
              <p>
                <span className="text-[#ff7b72]">from</span> <span className="text-white">transformers</span> <span className="text-[#ff7b72]">import</span> <span className="text-white">pipeline</span>
              </p>
            </div>
            
            <div className="h-6" />
            
            <div className="flex gap-4">
              <span className="text-slate-600 select-none">2</span>
              <span className="text-[#8b949e] italic"># Orchestrating massive intelligence with 3 lines</span>
            </div>

            <div className="flex gap-4">
              <span className="text-slate-600 select-none">3</span>
              <p>
                <span className="text-white">agent = pipeline(</span><span className="text-[#a5d6ff]">{"\"sentiment-analysis\""}</span><span className="text-white">)</span>
              </p>
            </div>

            <div className="flex gap-4">
              <span className="text-slate-600 select-none">4</span>
              <p>
                <span className="text-white">insight = agent(</span><span className="text-[#a5d6ff]">{"\"This architectural shift is massive.\""}</span><span className="text-white">)</span>
              </p>
            </div>

            <div className="h-6" />

            <div className="flex gap-4">
              <span className="text-slate-600 select-none">5</span>
              <p>
                <span className="text-[#ff7b72]">print</span><span className="text-white">(f</span><span className="text-[#a5d6ff]">{"\"Confidence: {insight[0]['score']}\""}</span><span className="text-white">)</span>
              </p>
            </div>
          </pre>
        </div>
      </div>
    </div>
  );
};