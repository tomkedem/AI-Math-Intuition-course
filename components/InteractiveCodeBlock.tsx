import React from "react";

export interface InteractiveCodeBlockProps {
  title?: string;
  code: string;
  language?: string;
  description?: string;
  children?: React.ReactNode;
}

export const InteractiveCodeBlock: React.FC<InteractiveCodeBlockProps> = ({
  title,
  code, 
  description,
  children,
}) => (
  <div className="bg-slate-800 rounded-lg p-4 my-4">
    {title && <div className="font-bold text-white mb-2">{title}</div>}
    {description && <div className="text-slate-400 mb-2">{description}</div>}
    <pre>
      <code>
        {code}
      </code>
    </pre>
    {children}
  </div>
);