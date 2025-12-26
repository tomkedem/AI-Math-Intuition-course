"use client";

export const CodeShowcase = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-6" dir="ltr">
      <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#0d1117] shadow-2xl">
        <div className="bg-[#161b22] px-6 py-3 flex items-center justify-between border-b border-slate-800">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-slate-500 font-mono text-xs">production_ai_pipeline.py</span>
        </div>
        <div className="p-10 text-left">
          <pre className="text-xl md:text-2xl font-mono leading-relaxed text-white">
            <span className="text-[#ff7b72]">from</span> transformers <span className="text-[#ff7b72]">import</span> pipeline<br /><br />
            <span className="text-[#8b949e]"># Orchestrating massive intelligence with 3 lines</span><br />
            agent = pipeline(<span className="text-[#a5d6ff]">{"\"sentiment-analysis\""}</span>)<br />
            insight = agent(<span className="text-[#a5d6ff]">{"\"This architectural shift is massive.\""}</span>)<br /><br />
            <span className="text-[#ff7b72]">print</span>(f<span className="text-[#a5d6ff]">{"\"Confidence: {insight[0]['score']}\""}</span>)
          </pre>
        </div>
      </div>
    </div>
  );
};