"use client";

import React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { EnergyInsights } from "@/lib/energyLogic";

interface InsightsSectionProps {
  insights: EnergyInsights;
}

const DaySmallCard = ({ title, log, variant }: { title: string, log: any, variant: "best" | "worst" }) => {
  if (!log) return null;
  
  const moodEmojis = ["", "😫", "😕", "😐", "😊", "🔥"];

  return (
    <div className={cn(
      "rounded-xl border border-border-subtle bg-bg-secondary p-6 transition-all hover:scale-[1.02]",
      variant === "best" ? "border-l-4 border-l-success" : "border-l-4 border-l-error"
    )}>
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary">{title}</span>
      <h4 className="mb-4 text-lg font-bold text-white">{format(new Date(log.date), "MMMM do")}</h4>
      <div className="space-y-2 font-mono text-sm text-text-secondary">
        <p>Sleep: <span className="font-bold text-white">{log.sleep}h</span></p>
        <p>Mood: <span className="font-bold text-white">{moodEmojis[log.mood]}</span></p>
        <p>Fatigue: <span className="font-bold text-white">{log.fatigue}/10</span></p>
      </div>
    </div>
  );
};

export const InsightsSection = ({ insights }: InsightsSectionProps) => {
  const { avgSleep, avgMood, avgFatigue, bestDay, worstDay, patterns, consistencyScore } = insights;

  if (consistencyScore === 0) return null;

  return (
    <div className="mx-auto mt-16 max-w-[1200px] pb-24">
      <h3 className="mb-10 font-display text-2xl font-bold">Insights (Last 30 Days)</h3>

      {/* Averages */}
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border-subtle bg-bg-secondary p-6 text-center">
          <div className="mb-1 font-display text-4xl font-black text-app-4">{avgSleep}h</div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">Avg Sleep</span>
        </div>
        <div className="rounded-xl border border-border-subtle bg-bg-secondary p-6 text-center">
          <div className="mb-1 font-display text-4xl font-black text-app-3">{avgMood}/5</div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">Avg Mood</span>
        </div>
        <div className="rounded-xl border border-border-subtle bg-bg-secondary p-6 text-center">
          <div className="mb-1 font-display text-4xl font-black text-warning">{avgFatigue}/10</div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">Avg Fatigue</span>
        </div>
      </div>

      {/* Best/Worst Days */}
      <div className="mb-10 grid gap-6 sm:grid-cols-2">
        <DaySmallCard title="Best Recovery Day" log={bestDay} variant="best" />
        <DaySmallCard title="Worst Recovery Day" log={worstDay} variant="worst" />
      </div>

      {/* Patterns & Consistency */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="sm:col-span-2 space-y-3">
          <h4 className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary">Patterns Detected</h4>
          {patterns.length > 0 ? (
            patterns.map((pattern, i) => (
              <div 
                key={i} 
                className={cn(
                  "rounded-lg border p-4 text-sm font-medium",
                  pattern.startsWith("✅") 
                    ? "border-success/30 bg-success/5 text-success" 
                    : "border-warning/30 bg-warning/5 text-warning"
                )}
              >
                {pattern}
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-border-subtle bg-bg-secondary p-4 text-sm text-text-tertiary italic">
              Continue logging to unlock pattern detection.
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center rounded-xl border border-app-4/20 bg-app-4/5 p-8 text-center">
          <span className="mb-2 font-mono text-[10px] uppercase tracking-widest text-app-4">Consistency Score</span>
          <div className="mb-2 font-display text-6xl font-black text-app-4">{consistencyScore}%</div>
          <p className="text-[10px] text-text-tertiary leading-relaxed">
            Based on tracking frequency and metric stability.
          </p>
        </div>
      </div>
    </div>
  );
};
