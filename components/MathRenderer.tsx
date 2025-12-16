// src/components/MathRenderer.tsx

"use client";

import React, { useRef, useEffect } from 'react';
import katex from 'katex';
// 'katex/dist/katex.min.css' - הוסר מכאן!

interface MathRendererProps {
  latex: string;
  displayMode?: boolean;
}

const MathRenderer: React.FC<MathRendererProps> = ({ latex, displayMode = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        // רנדור הנוסחה לתוך ה-DOM באמצעות KaTeX
        katex.render(latex, containerRef.current, {
          throwOnError: false,
          displayMode: displayMode,
          output: 'html',
        });
      } catch (e) {
        console.error("KaTeX Error:", e);
      }
    }
  }, [latex, displayMode]);

  return <div ref={containerRef} dir="ltr" className="py-2 text-white"></div>;
};

export default MathRenderer;