"use client";

import React, { useState } from 'react';
import { Lock, Unlock, Eye, EyeOff, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { DemoContainer } from '@/components/demos/ui/DemoShell';

export const EnvConfigLab = () => {
    const [method, setMethod] = useState<'hardcoded' | 'env'>('hardcoded');
    const [showSecret, setShowSecret] = useState(false);

    const apiKey = "sk-proj-123456789";

    const hardcodedSnippet = `import os

def connect_to_gpt():
    # ❌ רע מאוד: המפתח חשוף בקוד
    api_key = "${apiKey}"
    return client.connect(api_key)`;

    const envSnippet = `import os
from dotenv import load_dotenv

# ✅ מצוין: המפתח נטען מהסביבה
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise ValueError("Missing API Key")`;

    return (
        <DemoContainer 
            title="secrets_management.py" 
            output={method === 'hardcoded' ? "Connected (WARNING: Key exposed in git history!)" : "Connected (Securely loaded from environment)"} 
            dir="ltr"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Sidebar Controls */}
                <div className="space-y-4 col-span-1">
                    <button 
                        onClick={() => setMethod('hardcoded')}
                        className={`w-full p-3 rounded-lg border text-left flex items-center gap-2 transition-all ${method === 'hardcoded' ? 'bg-red-500/10 border-red-500 text-red-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                    >
                        <Unlock size={16} /> Hardcoded (Bad)
                    </button>
                    <button 
                        onClick={() => setMethod('env')}
                        className={`w-full p-3 rounded-lg border text-left flex items-center gap-2 transition-all ${method === 'env' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                    >
                        <Lock size={16} /> Environment (Good)
                    </button>
                </div>

                {/* Code Preview */}
                <div className="col-span-2 space-y-4">
                    <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 font-mono text-sm relative">
                        <pre className="text-slate-300 whitespace-pre-wrap">
                            {method === 'hardcoded' ? hardcodedSnippet : envSnippet}
                        </pre>
                        
                        {/* Status Badge */}
                        <div className={`absolute top-2 right-2 px-2 py-1 rounded text-[10px] flex items-center gap-1 ${method === 'hardcoded' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}>
                            {method === 'hardcoded' ? <ShieldAlert size={10} /> : <CheckCircle2 size={10} />}
                            {method === 'hardcoded' ? 'INSECURE' : 'SECURE'}
                        </div>
                    </div>

                    {/* Env File Simulation (Only shown in env mode) */}
                    {method === 'env' && (
                        <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50">
                            <div className="text-[10px] text-slate-500 font-bold mb-1 uppercase flex justify-between">
                                <span>.env file (Not in git)</span>
                                <button onClick={() => setShowSecret(!showSecret)} className="text-slate-400 hover:text-white">
                                    {showSecret ? <EyeOff size={12}/> : <Eye size={12}/>}
                                </button>
                            </div>
                            <div className="font-mono text-xs text-yellow-400">
                                OPENAI_API_KEY={showSecret ? apiKey : "••••••••••••••••"}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DemoContainer>
    );
};