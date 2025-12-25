"use client";

import React, { useRef, useEffect } from 'react';

export const FireText = ({ text, suffix }: { text: string; suffix: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;

    const render = (t: number) => {
      // התאמת גודל הקנבס בדיוק לגודל הקונטיינר
      if (canvas.width !== container.offsetWidth || canvas.height !== container.offsetHeight) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // מציאת מיקום המילים "המנוע השקט" בתוך הקונטיינר
      // אנחנו נצייר את האש באזור הימני (כי הטקסט ב-RTL)
      const fireAreaWidth = canvas.width * 0.6; // הערכה של אזור המילים הראשונות
      
      ctx.globalCompositeOperation = 'screen';
      ctx.filter = 'blur(12px)';

      for (let i = 0; i < 20; i++) {
        const x = canvas.width - (Math.random() * fireAreaWidth);
        const yRise = (t * 0.12 + i * 10) % 80;
        const size = 15 + Math.sin(t * 0.005 + i) * 10;
        
        const hue = 15 + Math.sin(t * 0.002 + i) * 15;
        ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${0.2 - i / 100})`;
        
        ctx.beginPath();
        ctx.arc(x, canvas.height / 2 + 10 - yRise, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(render);
    };

    render(0);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative inline-block w-full text-right py-1"
      dir="rtl"
    >
      {/* הקנבס כרקע לאש */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* הטקסט האמיתי - עכשיו אתה שולט בגודל דרך ה-className כאן! */}
      <h1 className="relative z-10 text-3xl md:text-4xl font-black tracking-tighter inline-flex gap-4">
        <span className="bg-gradient-to-b from-white via-yellow-400 to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
          {text}
        </span>
        <span className="text-white">
          {suffix}
        </span>
      </h1>
    </div>
  );
};