"use client";

import React, { useState } from 'react';
import { Play, Trash2 } from 'lucide-react';
import { DemoContainer, CodeInput } from '@/components/demos/ui/DemoShell';

export const ListLabDemo = () => {
    // מצב התחלתי של הרשימה
    const [items, setItems] = useState<string[]>(["10", "20", "30", "40"]);
    const [newItem, setNewItem] = useState("50");

    // הוספת פריט לרשימה
    const addItem = () => { 
        if(newItem.trim()) { 
            setItems([...items, newItem]); 
            setNewItem(""); // איפוס השדה אחרי הוספה
        }
    };

    // מחיקת פריט לפי אינדקס
    const removeItem = (idx: number) => { 
        setItems(items.filter((_, i) => i !== idx)); 
    };

    return (
        <DemoContainer 
            title="list_operations.py" 
            output={`[${items.join(', ')}]`}
        >
            <div className="space-y-4">
                {/* שורה 1: הצגת הרשימה הנוכחית */}
                <div className="flex flex-wrap items-center gap-2 font-mono text-sm">
                    <span className="text-blue-400">data</span>
                    <span className="text-slate-400">=</span>
                    <span className="text-yellow-400">[</span>
                    
                    {items.map((item, i) => (
                        <div key={i} className="group relative flex items-center">
                            {/* הערך עצמו */}
                            <span className="text-orange-400">{item}</span>
                            
                            {/* פסיק מפריד (חוץ מהאחרון) */}
                            {i < items.length - 1 && <span className="text-slate-400 mr-2">,</span>}
                            
                            {/* כפתור מחיקה שמופיע רק ב-Hover */}
                            <button 
                                onClick={() => removeItem(i)} 
                                className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 border border-red-500/30 text-red-400 rounded px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/10 hover:scale-110 shadow-lg"
                                title="Delete item"
                            >
                                <Trash2 size={10} />
                            </button>
                        </div>
                    ))}
                    
                    <span className="text-yellow-400">]</span>
                </div>

                {/* שורה 2: פעולת Append */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-700/50">
                    <span className="text-blue-400">data</span>
                    <span className="text-slate-400">.</span>
                    <span className="text-yellow-400">append</span>
                    <span className="text-purple-400">(</span>
                    <CodeInput 
                        value={newItem} 
                        onChange={(e) => setNewItem(e.target.value)} 
                        className="text-orange-400 w-12"
                        placeholder="val"
                        onKeyDown={(e) => e.key === 'Enter' && addItem()}
                    />
                    <span className="text-purple-400">)</span>
                    
                    <button 
                        onClick={addItem} 
                        className="ml-auto bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors shadow-lg shadow-indigo-500/20"
                    >
                        <Play size={10}/> Run Code
                    </button>
                </div>
                
                <div className="text-slate-500 text-[10px]">
                    * רחף מעל מספר כדי למחוק אותו, או הקלד מספר ולחץ Run כדי להוסיף.
                </div>
            </div>
        </DemoContainer>
    );
};