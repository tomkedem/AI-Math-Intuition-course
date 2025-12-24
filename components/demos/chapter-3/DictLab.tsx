"use client";

import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { DemoContainer, CodeInput } from '@/components/demos/ui/DemoShell';

export const DictLabDemo = () => {
    const [dict, setDict] = useState<Record<string, string | number>>({ name: "תמר", age: 29 });
    const [newKey, setNewKey] = useState("city");
    const [newVal, setNewVal] = useState("TLV");

    const updateDict = () => {
        if (newKey) {
            // בדיקה האם הערך הוא מספר או מחרוזת
            const value = isNaN(Number(newVal)) ? newVal : Number(newVal);
            setDict(prev => ({ ...prev, [newKey]: value }));
        }
    };

    const deleteKey = (key: string) => {
        const newDict = { ...dict };
        delete newDict[key];
        setDict(newDict);
    };

    // המרת המילון למחרוזת פייתון יפה לתצוגה
    const dictOutput = "{\n" + Object.entries(dict).map(([k, v]) => 
        `    "${k}": ${typeof v === 'string' ? `"${v}"` : v}`
    ).join(",\n") + "\n}";

    return (
        <DemoContainer 
            title="dict_operations.py" 
            output={dictOutput} 
            dir="ltr"  // <--- התיקון החשוב: זה חייב להיות ltr עבור מבני קוד
        >
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className="text-blue-400">person</span>
                    <span className="text-slate-400">=</span>
                    <span className="text-yellow-400">{`{ ... }`}</span>
                </div>
                
                {/* הצגת איברי המילון עם אפשרות מחיקה */}
                <div className="pl-4 border-l border-slate-700 space-y-1">
                    {Object.entries(dict).map(([k, v]) => (
                        <div key={k} className="flex items-center gap-2 group text-sm">
                            <span className="text-green-400">&quot;{k}&quot;</span>: 
                            <span className={typeof v === 'number' ? "text-orange-400" : "text-green-400"}>
                                {typeof v === 'string' ? `"${v}"` : v}
                            </span>
                            <button 
                                onClick={() => deleteKey(k)} 
                                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity p-1"
                                title="Delete key"
                            >
                                <Trash2 size={12} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* אזור הוספה/עדכון */}
                <div className="flex items-center gap-1 pt-2 flex-wrap text-sm">
                    <span className="text-blue-400">person</span>
                    <span className="text-yellow-400">[</span>
                    <span className="text-green-400">&quot;</span>
                    <CodeInput 
                        value={newKey} 
                        onChange={(e) => setNewKey(e.target.value)} 
                        className="text-green-400 w-16" 
                        placeholder="key"
                    />
                    <span className="text-green-400">&quot;</span>
                    <span className="text-yellow-400">]</span>
                    <span className="text-slate-400">=</span>
                    <CodeInput 
                        value={newVal} 
                        onChange={(e) => setNewVal(e.target.value)} 
                        className="text-orange-400 w-16" 
                        placeholder="val"
                    />
                    <button 
                        onClick={updateDict} 
                        className="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] px-2 py-1 rounded ml-2 transition-colors"
                    >
                        Update
                    </button>
                </div>
                <div className="text-slate-500 text-[10px] mt-1">
                    * הכנס מפתח וערך ולחץ Update. אם המפתח קיים הוא יעודכן, אחרת יתווסף.
                </div>
            </div>
        </DemoContainer>
    );
};