"use client";

import React from "react";
import { Metric } from "@/lib/streakLogic";
import { MetricHeatmap } from "./MetricHeatmap";
import { Card } from "@/components/universal/Card";

interface IndividualStreaksProps {
  metrics: Metric[];
}

export const IndividualStreaks = ({ metrics }: IndividualStreaksProps) => {
  if (metrics.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1200px] space-y-8 py-16">
      <div>
        <h2 className="font-display text-2xl font-bold">Individual Streaks</h2>
        <p className="text-sm text-text-secondary">Each metric's performance over the last 30 days</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {metrics.map((metric) => {
          const historyArray = Object.values(metric.history);
          const doneCount = historyArray.filter(s => s === "done").length;
          const restCount = historyArray.filter(s => s === "rest").length;
          const missedCount = historyArray.filter(s => s === "missed").length;
          const totalAnswered = historyArray.filter(s => s !== "pending" && s !== "none").length;
          const completionRate = totalAnswered > 0 
            ? Math.round(((doneCount + restCount) / totalAnswered) * 100)
            : 0;

          return (
            <Card key={metric.id} className="group hover:border-app-2">
              <h3 className="mb-6 font-display text-xl font-bold text-white">{metric.name}</h3>
              
              <div className="mb-8 flex gap-8">
                <div>
                  <div className="font-display text-3xl font-black text-app-2 leading-none">
                    {metric.currentStreak}
                  </div>
                  <div className="mt-1 font-mono text-[10px] text-text-tertiary uppercase tracking-wider">
                    Current
                  </div>
                </div>
                <div>
                  <div className="font-display text-3xl font-black text-white/40 leading-none">
                    {metric.bestStreak}
                  </div>
                  <div className="mt-1 font-mono text-[10px] text-text-tertiary uppercase tracking-wider">
                    Best
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="mb-3 flex justify-between font-mono text-[10px] text-text-tertiary uppercase">
                  <span>Last 30 Days</span>
                  <span className={
                    completionRate >= 80 ? "text-success" : 
                    completionRate >= 50 ? "text-warning" : "text-error"
                  }>
                    {completionRate}% Completion
                  </span>
                </div>
                <MetricHeatmap history={metric.history} />
              </div>

              <div className="flex gap-4 font-mono text-[10px] text-text-tertiary">
                <span className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-success" /> {doneCount} Done</span>
                <span className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-warning opacity-60" /> {restCount} Rest</span>
                <span className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-error opacity-40" /> {missedCount} Missed</span>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
