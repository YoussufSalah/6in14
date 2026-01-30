"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Lock, Unlock, CheckCircle2, Clock } from "lucide-react";
import { WeekState } from "@/lib/warMapLogic";

interface WeekHeaderProps {
  startDate: string;
  endDate: string;
  state: WeekState;
  completedTasks: number;
  completedSubtasks: number;
  totalSubtasks: number;
  daysLeft: number;
}

export const WeekHeader = ({ 
  startDate, 
  endDate, 
  state, 
  completedTasks, 
  completedSubtasks, 
  totalSubtasks,
  daysLeft
}: WeekHeaderProps) => {
  return (
    <header className="mx-auto max-w-[1200px] border-b border-border-subtle px-8 py-6">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">
            Week of {startDate} - {endDate}
          </h1>
          
          <div className="mt-3 flex items-center gap-4">
            <div className={cn(
              "inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-mono text-sm font-semibold",
              state === "PLANNING" && "border-app-3/30 bg-app-3/10 text-app-3",
              state === "EXECUTION" && "border-error/30 bg-error/10 text-error",
              state === "COMPLETED" && "border-success/30 bg-success/10 text-success"
            )}>
              {state === "PLANNING" && <Unlock className="h-4 w-4" />}
              {state === "EXECUTION" && <Lock className="h-4 w-4" />}
              {state === "COMPLETED" && <CheckCircle2 className="h-4 w-4" />}
              {state.charAt(0) + state.slice(1).toLowerCase()} Mode
            </div>

            {state === "EXECUTION" && (
              <div className="flex items-center gap-2 font-mono text-xs text-text-tertiary">
                <Clock className="h-4 w-4" />
                {daysLeft} days remaining
              </div>
            )}
          </div>
        </div>

        {state !== "PLANNING" && (
          <div className="flex flex-col items-end gap-1">
            <div className="font-mono text-sm text-text-secondary">
              <span className="font-bold text-app-3">{completedTasks}</span>/3 Tasks • <span className="font-bold text-app-3">{completedSubtasks}</span>/{totalSubtasks} Subtasks
            </div>
            <div className="h-1.5 w-48 overflow-hidden rounded-full bg-bg-tertiary">
              <div 
                className="h-full bg-app-3 transition-all duration-700"
                style={{ width: `${(completedSubtasks / totalSubtasks) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
      
      <p className="mt-4 text-sm text-text-secondary">
        {state === "PLANNING" && "Set your 3 priorities. Lock them in."}
        {state === "EXECUTION" && "The map is set. Execute without distraction."}
        {state === "COMPLETED" && "All battle objectives achieved. Strategic victory."}
      </p>
    </header>
  );
};
