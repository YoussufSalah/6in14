"use client";

import React from "react";
import { format } from "date-fns";
import { Check, X, Coffee, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Metric, MetricStatus } from "@/lib/streakLogic";

interface CheckInListProps {
  metrics: Metric[];
  onCheckIn: (id: string, status: MetricStatus) => void;
  completedCount: number;
  totalMetrics: number;
  percentage: number;
}

export const CheckInList = ({ metrics, onCheckIn, completedCount, totalMetrics, percentage }: CheckInListProps) => {
  const today = format(new Date(), "yyyy-MM-dd");

  return (
    <div className="mx-auto max-w-[800px] rounded-2xl border border-border-subtle bg-bg-secondary p-6 sm:p-10">
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold">Today's Check-In</h2>
        <p className="font-mono text-sm text-text-secondary">
          {format(new Date(), "MMMM do, yyyy")} • {completedCount}/{totalMetrics} complete
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-10">
        <div className="h-2 w-full overflow-hidden rounded-full bg-bg-tertiary">
          <div 
            className="h-full bg-gradient-to-r from-app-2 to-app-2-light transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="mt-2 text-center font-mono text-xs font-bold text-app-2">
          {Math.round(percentage)}% COMPLETE
        </p>
      </div>

      <div className="space-y-4">
        {metrics.map((metric) => {
          const todaysEntry = metric.history.find(h => h.date === today);
          const isAnswered = !!todaysEntry;
          const status = todaysEntry?.status || "none";

          return (
            <div 
              key={metric.id}
              className={cn(
                "flex flex-col gap-4 rounded-xl border border-border-subtle bg-bg-tertiary p-5 transition-all sm:flex-row sm:items-center sm:justify-between",
                status === "done" && "border-success/30 bg-success/5",
                status === "missed" && "border-error/30 bg-error/5",
                status === "rest" && "border-warning/30 bg-warning/5"
              )}
            >
              <div>
                <h3 className="font-semibold text-white">{metric.name}</h3>
                <p className="font-mono text-[10px] text-text-tertiary uppercase tracking-tighter">
                  Current Streak: {metric.currentStreak} days
                </p>
              </div>

              <div className="flex gap-2">
                {!isAnswered ? (
                  <>
                    <button
                      onClick={() => onCheckIn(metric.id, "done")}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border-subtle bg-bg-secondary px-4 py-2 text-sm font-bold text-text-secondary transition-all hover:border-success hover:bg-success/10 hover:text-success sm:flex-none"
                    >
                      <Check className="h-4 w-4" /> Yes
                    </button>
                    <button
                      onClick={() => onCheckIn(metric.id, "missed")}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border-subtle bg-bg-secondary px-4 py-2 text-sm font-bold text-text-secondary transition-all hover:border-error hover:bg-error/10 hover:text-error sm:flex-none"
                    >
                      <X className="h-4 w-4" /> No
                    </button>
                    <button
                      onClick={() => onCheckIn(metric.id, "rest")}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border-subtle bg-bg-secondary px-4 py-2 text-sm font-bold text-text-secondary transition-all hover:border-warning hover:bg-warning/10 hover:text-warning sm:flex-none"
                    >
                      <Coffee className="h-4 w-4" /> Rest
                    </button>
                  </>
                ) : (
                  <div className={cn(
                    "flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider",
                    status === "done" && "bg-success/10 text-success",
                    status === "missed" && "bg-error/10 text-error",
                    status === "rest" && "bg-warning/10 text-warning"
                  )}>
                    {status === "done" && <Check className="h-4 w-4" />}
                    {status === "missed" && <X className="h-4 w-4" />}
                    {status === "rest" && <Coffee className="h-4 w-4" />}
                    {status}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center sm:mt-12">
        {percentage < 100 ? (
          <p className="flex items-center justify-center gap-2 text-sm text-text-tertiary">
            <Clock className="h-4 w-4" />
            Complete today's check-in to maintain your streak!
          </p>
        ) : (
          <p className="text-sm font-bold text-success animate-bounce">
            ✅ All done for today! Come back tomorrow.
          </p>
        )}
      </div>
    </div>
  );
};
