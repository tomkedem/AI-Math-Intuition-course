import React from "react";

interface FormulaDisplayProps {
  title?: string;
  content: string;
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
    <div className="font-mono text-blue-300 text-xl mb-2">{content}</div>
    {explanation && (
      <div className="text-slate-400 text-sm mt-2">{explanation}</div>
    )}
  </div>
);