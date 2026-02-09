"use client";

import React from "react";
import { TrendingUp, TrendingDown, Minus, Edit2 } from "lucide-react";
import { WeeklyEntry, calculateWoW } from "@/lib/progressRadarLogic";
import { cn } from "@/lib/utils";

interface WeekSummaryCardProps {
  entry: WeeklyEntry;
  prevEntry?: WeeklyEntry;
  onEdit: () => void;
}

export const WeekSummaryCard = ({ entry, prevEntry, onEdit }: WeekSummaryCardProps) => {
  const metrics = [
    { label: "Users", value: entry.metrics.users, key: 'users' },
    { label: "Revenue", value: `$${entry.metrics.revenue}`, key: 'revenue' },
    { label: "Posts", value: entry.metrics.posts, key: 'posts' },
    { label: "Training", value: entry.metrics.training, key: 'training' },
  ];

  const getComparison = (key: keyof WeeklyEntry['metrics']) => {
    if (!prevEntry) return null;
    const change = calculateWoW(entry.metrics[key], prevEntry.metrics[key]);
    return change;
  };

  return (
    <div className="mx-auto max-w-[1000px] rounded-2xl border border-border-subtle bg-bg-secondary p-8 sm:p-10">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-white">This Week's Numbers</h2>
        <button 
          onClick={onEdit}
          className="flex items-center gap-2 rounded-lg border border-app-6/50 px-4 py-2 font-mono text-sm font-bold text-app-6 transition-all hover:bg-app-6/10"
        >
          <Edit2 className="h-4 w-4" /> Edit This Week
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="relative rounded-xl border border-border-subtle bg-bg-tertiary p-6 text-center transition-all hover:border-app-6/30">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
              {m.label}
            </span>
            <div className="font-display text-3xl font-black text-app-6">
              {m.value}
            </div>
          </div>
        ))}
      </div>

      {prevEntry && (
        <div className="mt-10 border-top border-border-subtle pt-8">
          <h3 className="mb-6 font-mono text-sm font-bold uppercase tracking-widest text-text-secondary">
            vs. Last Week
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {metrics.map((m) => {
              const change = getComparison(m.key as keyof WeeklyEntry['metrics']);
              if (change === null) return null;

              return (
                <div key={`${m.key}-comp`} className="flex items-center justify-between rounded-lg bg-bg-tertiary/50 px-4 py-3">
                  <span className="text-sm text-text-secondary">{m.label}</span>
                  <div className={cn(
                    "flex items-center gap-1.5 font-mono text-sm font-bold",
                    change > 0 ? "text-success" : change < 0 ? "text-error" : "text-text-tertiary"
                  )}>
                    {change > 0 && <TrendingUp className="h-4 w-4" />}
                    {change < 0 && <TrendingDown className="h-4 w-4" />}
                    {change === 0 && <Minus className="h-4 w-4" />}
                    {change > 0 ? `+${change}%` : `${change}%`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
