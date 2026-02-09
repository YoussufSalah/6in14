"use client";

import React from "react";
import { format } from "date-fns";
import { TrendingUp, TrendingDown, Target, Info, AlertTriangle, CheckCircle2 } from "lucide-react";
import { WeeklyEntry, calculateMomentumScore, detectPatterns, calculateWoW } from "@/lib/progressRadarLogic";
import { cn } from "@/lib/utils";

interface InsightsSectionProps {
  entries: WeeklyEntry[];
}

export const InsightsSection = ({ entries }: InsightsSectionProps) => {
  if (entries.length < 2) return null;

  const score = calculateMomentumScore(entries);
  const patterns = detectPatterns(entries);
  
  const sorted = [...entries].sort((a, b) => b.weekStart.localeCompare(a.weekStart));
  const current = sorted[0];
  const last12 = sorted.slice(0, 12);

  // Best/Worst Week Logic
  const bestWeek = [...last12].sort((a, b) => {
    const scoreA = a.metrics.users + a.metrics.revenue + a.metrics.posts + a.metrics.training;
    const scoreB = b.metrics.users + b.metrics.revenue + b.metrics.posts + b.metrics.training;
    return scoreB - scoreA;
  })[0];

  const worstWeek = [...last12].sort((a, b) => {
    const scoreA = a.metrics.users + a.metrics.revenue + a.metrics.posts + a.metrics.training;
    const scoreB = b.metrics.users + b.metrics.revenue + b.metrics.posts + b.metrics.training;
    return scoreA - scoreB;
  })[0];

  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-success";
    if (s >= 60) return "text-app-6";
    if (s >= 40) return "text-warning";
    return "text-error";
  };

  const getScoreDescription = (s: number) => {
    if (s >= 80) return "Elite momentum. You're growing aggressively and consistently.";
    if (s >= 60) return "Strong momentum. Most metrics are trending up and logging is consistent.";
    if (s >= 40) return "Decent momentum. Look for ways to stabilize your habits or push for growth.";
    return "Momentum is low. Consistency and focus are needed to restart the growth engine.";
  };

  return (
    <div className="mx-auto mt-16 max-w-[1400px] px-8 sm:px-12">
      <h2 className="mb-8 font-display text-2xl font-bold text-white">Insights (Last 12 Weeks)</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Momentum Score Card */}
        <div className="rounded-2xl border border-border-subtle bg-bg-secondary p-8">
          <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
            Momentum Score
          </span>
          <div className={cn("mb-4 font-display text-6xl font-black", getScoreColor(score))}>
            {score}<span className="text-2xl opacity-50">/100</span>
          </div>
          <p className="text-sm leading-relaxed text-text-secondary">
            {getScoreDescription(score)}
          </p>
        </div>

        {/* Patterns List */}
        <div className="space-y-4">
          <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
            Trend Patterns Detected
          </span>
          <div className="flex flex-col gap-3">
             {patterns.map((p, i) => (
              <div 
                key={i} 
                className={cn(
                  "rounded-xl border-l-4 p-5 transition-all",
                  p.type === 'growth' && "border-l-success bg-success/5",
                  p.type === 'warning' && "border-l-warning bg-warning/5",
                  p.type === 'critical' && "border-l-error bg-error/5",
                  p.type === 'info' && "border-l-app-6 bg-app-6/5",
                )}
              >
                <h4 className="flex items-center gap-2 font-bold text-white mb-2">
                  {p.title}
                </h4>
                <p className="text-sm text-text-secondary">{p.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Best Week Card */}
        <div className="rounded-2xl border border-border-subtle bg-bg-secondary p-8">
           <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
            Best Week
          </span>
          <h3 className="mb-4 text-lg font-bold text-white">Week of {format(new Date(bestWeek.weekStart), "MMM d, yyyy")}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-bg-tertiary/50 p-3">
              <p className="text-[10px] uppercase text-text-tertiary font-bold mb-1">Users</p>
              <p className="font-mono text-sm font-bold text-white">{bestWeek.metrics.users}</p>
            </div>
            <div className="rounded-lg bg-bg-tertiary/50 p-3">
              <p className="text-[10px] uppercase text-text-tertiary font-bold mb-1">Revenue</p>
              <p className="font-mono text-sm font-bold text-white">${bestWeek.metrics.revenue}</p>
            </div>
            <div className="rounded-lg bg-bg-tertiary/50 p-3">
              <p className="text-[10px] uppercase text-text-tertiary font-bold mb-1">Posts</p>
              <p className="font-mono text-sm font-bold text-white">{bestWeek.metrics.posts}</p>
            </div>
            <div className="rounded-lg bg-bg-tertiary/50 p-3">
              <p className="text-[10px] uppercase text-text-tertiary font-bold mb-1">Training</p>
              <p className="font-mono text-sm font-bold text-white">{bestWeek.metrics.training}</p>
            </div>
          </div>
        </div>

        {/* Worst Week (Needs Improvement) */}
        <div className="rounded-2xl border border-border-subtle bg-bg-secondary p-8">
           <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
            Needs Improvement
          </span>
          <h3 className="mb-4 text-lg font-bold text-white">Week of {format(new Date(worstWeek.weekStart), "MMM d, yyyy")}</h3>
           <div className="grid grid-cols-2 gap-4 opacity-70">
            <div className="rounded-lg bg-bg-tertiary/50 p-3">
              <p className="text-[10px] uppercase text-text-tertiary font-bold mb-1">Users</p>
              <p className="font-mono text-sm text-white">{worstWeek.metrics.users}</p>
            </div>
            <div className="rounded-lg bg-bg-tertiary/50 p-3">
              <p className="text-[10px] uppercase text-text-tertiary font-bold mb-1">Revenue</p>
              <p className="font-mono text-sm text-white">${worstWeek.metrics.revenue}</p>
            </div>
            <div className="rounded-lg bg-bg-tertiary/50 p-3">
              <p className="text-[10px] uppercase text-text-tertiary font-bold mb-1">Posts</p>
              <p className="font-mono text-sm text-white">{worstWeek.metrics.posts}</p>
            </div>
            <div className="rounded-lg bg-bg-tertiary/50 p-3">
              <p className="text-[10px] uppercase text-text-tertiary font-bold mb-1">Training</p>
              <p className="font-mono text-sm text-white">{worstWeek.metrics.training}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
