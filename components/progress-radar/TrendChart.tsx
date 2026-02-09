"use client";

import React, { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { WeeklyEntry, normalizeData } from "@/lib/progressRadarLogic";
import { cn } from "@/lib/utils";

interface TrendChartProps {
  entries: WeeklyEntry[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const rawData = payload[0].payload.raw;
    return (
      <div className="rounded-lg border-2 border-app-6 bg-bg-primary p-4 shadow-xl">
        <p className="mb-3 font-mono text-xs text-text-tertiary">{payload[0].payload.fullWeek}</p>
        <div className="space-y-2">
          {payload.map((entry: any) => (
            <div key={entry.name} className="flex flex-col items-start gap-0.5">
              <span className="text-[10px] uppercase tracking-wider" style={{ color: entry.color }}>
                {entry.name}
              </span>
              <span className="font-mono text-sm font-bold text-white">
                {entry.name === "Revenue" ? `$${rawData[entry.dataKey.toLowerCase()]}` : rawData[entry.dataKey.toLowerCase()]}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const TrendChart = ({ entries }: TrendChartProps) => {
  const [hiddenLines, setHiddenLines] = useState<string[]>([]);
  const data = normalizeData(entries);
  const hasEnoughData = entries.length >= 2;

  const toggleLine = (dataKey: string) => {
    setHiddenLines(prev => 
      prev.includes(dataKey) ? prev.filter(k => k !== dataKey) : [...prev, dataKey]
    );
  };

  const metrics = [
    { key: "users", name: "Users", color: "#3b82f6" },
    { key: "revenue", name: "Revenue", color: "#10b981" },
    { key: "posts", name: "Posts", color: "#f59e0b" },
    { key: "training", name: "Training", color: "#ec4899" },
  ];

  if (!hasEnoughData) {
    return (
      <div className="mx-auto mt-12 max-w-[1200px] py-20 text-center">
        <h3 className="mb-2 font-display text-xl font-bold text-white">12-Week Trend</h3>
        <p className="italic text-text-tertiary">
          Not enough data yet. Log at least 2 weeks to see your trend visualized.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-12 max-w-[1400px] px-8 sm:px-12">
      <div className="mb-8">
        <h2 className="mb-2 font-display text-2xl font-bold text-white">12-Week Trend</h2>
        <p className="text-sm text-text-secondary">
          Your progress visualized. All metrics normalized to show relative growth.
        </p>
      </div>

      <div className="h-[500px] w-full rounded-2xl border border-border-subtle bg-bg-secondary p-8">
        <div className="mb-6 flex flex-wrap justify-end gap-x-6 gap-y-2">
          {metrics.map((m) => {
            const isHidden = hiddenLines.includes(m.key);
            return (
              <button
                key={m.key}
                onClick={() => toggleLine(m.key)}
                className={cn(
                  "flex items-center gap-2 transition-all",
                  isHidden ? "opacity-30 line-through" : "opacity-100"
                )}
              >
                <div 
                  className="h-[3px] w-6 rounded-full" 
                  style={{ backgroundColor: m.color }} 
                />
                <span className="font-mono text-xs font-bold text-text-secondary uppercase tracking-wider">
                  {m.name}
                </span>
              </button>
            );
          })}
        </div>

        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={data}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="var(--border-subtle)" 
              opacity={0.5} 
            />
            <XAxis 
              dataKey="weekLabel" 
              stroke="var(--text-tertiary)" 
              fontSize={10} 
              tickLine={false}
              axisLine={false}
              dy={10}
              fontFamily="var(--font-mono)"
            />
            {/* Normalized Y Axis (0-100) */}
            <YAxis hide domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            
            {metrics.map((m) => (
              <Line
                key={m.key}
                type="monotone"
                dataKey={m.key}
                name={m.name}
                stroke={m.color}
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: "var(--bg-secondary)" }}
                activeDot={{ r: 8, strokeWidth: 0 }}
                hide={hiddenLines.includes(m.key)}
                animationDuration={1500}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
