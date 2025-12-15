// src/components/MatrixRain.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

export function MatrixRain() {
  const [drops, setDrops] = useState<{ char: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newDrops = Array.from({ length: 150 }).map(() => ({
        char: Math.floor(Math.random() * 10),
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 2
      }));
      setDrops(newDrops);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 bg-black p-2 font-mono text-[10px] leading-3 text-green-500 overflow-hidden opacity-90 break-all flex flex-wrap content-start">
      {drops.map((drop, i) => (
        <motion.span 
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: drop.duration, repeat: Infinity, delay: drop.delay }}
          className="inline-block w-4 text-center"
        >
          {drop.char}
        </motion.span>
      ))}
    </div>
  );
}