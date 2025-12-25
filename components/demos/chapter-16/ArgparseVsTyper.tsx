"use client";

import React from 'react';

export const ArgparseVsTyper = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8" dir="ltr">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-bold">Standard argparse (Python Internal)</div>
                <pre className="text-xs text-blue-300">
{`parser = argparse.ArgumentParser()
parser.add_argument("input", type=str)
parser.add_argument("--lang", default="he")
args = parser.parse_args()

clean(args.input, args.lang)`}
                </pre>
                <div className="mt-4 text-[10px] text-slate-500 italic">Manual definition of types and defaults.</div>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-4">
                <div className="text-[10px] uppercase tracking-widest text-emerald-500 mb-2 font-bold">Modern Typer (Decorator Based)</div>
                <pre className="text-xs text-emerald-300">
{`@app.command()
def clean(input: Path, lang: str = "he"):
    # Code uses variables directly
    do_work(input, lang)`}
                </pre>
                <div className="mt-4 text-[10px] text-emerald-500 italic">Typer uses native Type Hints automatically.</div>
            </div>
        </div>
    );
};