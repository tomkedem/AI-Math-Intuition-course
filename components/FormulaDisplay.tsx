// src/components/FormulaDisplay.tsx - גרסה מתוקנת

import React from "react";
// נניח ש-MathRenderer מיובא באופן גלובלי או שאתה מייבא אותו כאן
import MathRenderer from "./MathRenderer"; 

interface FormulaDisplayProps {
  title?: string;
  content: string; // מכיל כעת קוד LaTeX גולמי
  explanation?: string;
  icon?: React.ReactNode;
}

export const FormulaDisplay: React.FC<FormulaDisplayProps> = ({
  title,
  content,
  explanation,
  icon,
}) => (
  <div className="bg-slate-900 border-l-4 border-blue-500 p-4 rounded-r-xl my-4 text-center">
    {icon && <div className="flex justify-center mb-2">{icon}</div>}
    {title && <div className="font-bold text-lg text-white mb-2">{title}</div>}
    
    {/* **התיקון:** שימוש ב-MathRenderer כדי לעבד את קוד ה-LaTeX שהועבר כ-content */}
    <div className="mb-2">
        <MathRenderer latex={content} displayMode={true} />
    </div>
    
    {explanation && (
      <div className="text-slate-400 text-sm mt-2">{explanation}</div>
    )}
  </div>
);