import React from "react";

interface SimpleCodeDisplayProps {
  title: string;
  code: string;
  output: string;
  description: string;
}

const SimpleCodeDisplay: React.FC<SimpleCodeDisplayProps> = ({
  title,
  code,
  output,
  description,
}) => (
  <div className="bg-slate-900 rounded-lg p-4 my-4">
    <div className="font-bold text-white mb-2">{title}</div>
    <div className="text-slate-400 mb-2">{description}</div>
    <pre className="bg-slate-800 rounded p-2 mb-2 overflow-x-auto">
      <code>{code}</code>
    </pre>
    <div className="text-green-400 font-mono">Output: {output}</div>
  </div>
);

export default SimpleCodeDisplay;