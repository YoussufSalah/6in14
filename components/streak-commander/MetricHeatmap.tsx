"use client";

import React from "react";
import { format, subDays, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { MetricStatus } from "@/lib/streakLogic";

interface MetricHeatmapProps {
  history: Record<string, MetricStatus>;
}

export const MetricHeatmap = ({ history }: MetricHeatmapProps) => {
  // Generate last 30 days
  const last30Days = Array.from({ length: 30 }).map((_, i) => {
    const date = subDays(new Date(), 29 - i);
    const dateStr = format(date, "yyyy-MM-dd");
    const status = history[dateStr] || "none";
    return {
      date: dateStr,
      status,
      dayName: format(date, "EEE, MMM do")
    };
  });

  return (
    <div className="grid grid-cols-10 gap-2 sm:grid-cols-[repeat(15,1fr)]">
      {last30Days.map((day, i) => (
        <div 
          key={day.date}
          title={`${day.dayName}: ${day.status === 'pending' ? 'Pending — not yet answered today' : day.status}`}
          className={cn(
            "aspect-square rounded-sm border border-border-subtle transition-all hover:scale-125 hover:z-10",
            day.status === "none" && "bg-bg-tertiary opacity-30",
            day.status === "done" && "bg-success shadow-[0_0_8px_rgba(34,197,150,0.3)]",
            day.status === "rest" && "bg-warning opacity-60",
            day.status === "missed" && "bg-error opacity-40",
            day.status === "pending" && "bg-bg-tertiary border-dashed border-border-strong opacity-60"
          )}
        />
      ))}
    </div>
  );
};
