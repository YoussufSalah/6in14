"use client";

import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceArea,
  Legend
} from "recharts";
import { EnergyLog, prepareChartData } from "@/lib/energyLogic";

interface TrendChartProps {
  logs: EnergyLog[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border-subtle bg-bg-primary p-4 shadow-2xl">
        <p className="mb-2 font-mono text-xs text-text-tertiary">{label}</p>
        <div className="space-y-1">
          <p className="text-sm font-bold text-app-4">Sleep: {payload[0].value}h</p>
          <p className="text-sm font-bold text-app-3">Mood: {payload[0].payload.rawMood}/5</p>
          <p className="text-sm font-bold text-warning">Fatigue: {payload[0].payload.rawFatigue}/10</p>
        </div>
      </div>
    );
  }
  return null;
};

export const TrendChart = ({ logs }: TrendChartProps) => {
  const data = prepareChartData(logs);
  const hasEnoughData = logs.length >= 3;

  if (!hasEnoughData) {
    return (
      <div className="mx-auto mt-8 max-w-[1200px]">
        <h3 className="mb-8 font-display text-2xl font-bold">30-Day Recovery Trends</h3>
        <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-border-subtle bg-bg-secondary p-8 italic text-text-tertiary">
          Not enough data yet. Log for 3+ days to see trends.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-16 max-w-[1200px]">
      <div className="mb-8">
        <h3 className="font-display text-2xl font-bold">30-Day Recovery Trends</h3>
        <p className="text-text-secondary">Track patterns. Spot burnout before it hits.</p>
      </div>

      <div className="rounded-2xl border border-border-subtle bg-bg-secondary p-4 sm:p-8">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="date" 
                stroke="rgba(255,255,255,0.3)" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                interval={4}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.3)" 
                fontSize={10} 
                tickLine={false}
                axisLine={false}
                domain={[0, 12]}
                ticks={[0, 4, 8, 12]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top" 
                align="right" 
                iconType="plainline"
                wrapperStyle={{ paddingTop: 0, paddingBottom: 20, fontSize: 10, fontFamily: "monospace" }}
              />
              
              {/* Danger Zones */}
              <ReferenceArea y1={0} y2={4} fill="rgba(239, 68, 68, 0.05)" />
              <ReferenceArea y1={4} y2={8} fill="rgba(245, 158, 11, 0.02)" />

              <Line 
                name="Sleep (h)"
                type="monotone" 
                dataKey="sleep" 
                stroke="#10b981" 
                strokeWidth={3} 
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
                connectNulls
              />
              <Line 
                name="Mood (1-5)"
                type="monotone" 
                dataKey="mood" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
                connectNulls
              />
              <Line 
                name="Energy (Fatigue Inverted)"
                type="monotone" 
                dataKey="fatigue" 
                stroke="#f59e0b" 
                strokeWidth={3} 
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border-subtle pt-6">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-error" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-text-tertiary">Danger Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-warning" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-text-tertiary">Watch Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-success" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-text-tertiary">Healthy Zone</span>
          </div>
        </div>
      </div>
    </div>
  );
};
