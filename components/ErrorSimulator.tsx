// src/components/ErrorSimulator.tsx
"use client";

import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ReferenceLine, ResponsiveContainer } from 'recharts';
import { Slider } from "@/components/ui/slider";

const data = [
  { x: 10, y: 30 }, { x: 30, y: 50 }, { x: 50, y: 70 }, 
  { x: 70, y: 80 }, { x: 90, y: 100 }
];

export function ErrorSimulator() {
  const [slope, setSlope] = useState(0.5);
  
  const error = data.reduce((acc, point) => {
    const predictedY = point.x * slope + 10;
    return acc + Math.abs(point.y - predictedY);
  }, 0).toFixed(0);

  const isGoodFit = Number(error) < 50;
  const errorColor = isGoodFit ? "text-green-600" : "text-red-500";

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-bold text-lg">סימולטור: המודל מנסה לצמצם טעות</h3>
          {/* תוקן: השימוש ב-&quot; במקום גרשיים רגילים */}
          <p className="text-sm text-slate-500 max-w-md mt-1">
            הזז את הסליידר כדי לשנות את השיפוע (ה&quot;דעה&quot; של המודל) עד שהטעות תהיה מינימלית.
          </p>
        </div>
        <div className={`text-right ${errorColor} transition-colors duration-500`}>
          <div className="text-sm font-medium">סך הטעות (Loss)</div>
          <div className="text-4xl font-black">{error}</div>
        </div>
      </div>

      <div className="h-64 w-full bg-slate-50 rounded-lg mb-6 relative border border-slate-100">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="x" name="input" unit="" domain={[0, 100]} hide />
            <YAxis type="number" dataKey="y" name="output" unit="" domain={[0, 120]} hide />
            <Scatter name="Data" data={data} fill="#8884d8" />
            <ReferenceLine 
              segment={[{ x: 0, y: 10 }, { x: 100, y: 100 * slope + 10 }]} 
              stroke={isGoodFit ? "#16a34a" : "#ef4444"} 
              strokeWidth={3} 
              strokeDasharray={isGoodFit ? "" : "5 5"}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-sm font-medium">
          <span>שיפוע הקו (Weight)</span>
          <span className="font-mono bg-slate-100 px-2 rounded">{slope.toFixed(2)}</span>
        </div>
        {/* תוקן: הוספת טיפוס (val: number[]) כדי ש-TS יהיה מרוצה */}
        <Slider 
          value={[slope]} 
          min={0.1} 
          max={1.5} 
          step={0.01} 
          onValueChange={(val: number[]) => setSlope(val[0])}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}