"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, Flame, Moon, Smile, Zap } from "lucide-react";
import { EnergyLog } from "@/lib/energyLogic";

interface CurrentStatusProps {
  todayLog: EnergyLog | null;
  streakDays: number;
}

export const CurrentStatus = ({ todayLog, streakDays }: CurrentStatusProps) => {
  if (!todayLog) {
    return (
      <div className="mx-auto mt-8 max-w-[1000px] rounded-2xl border border-border-subtle bg-bg-secondary p-10 text-center italic text-text-tertiary">
        No metrics logged yet today. Log your check-in above to start tracking.
      </div>
    );
  }

  const alerts = [];
  if (todayLog.sleep < 6) alerts.push({ title: "Low Sleep", text: "You've slept less than 6 hours. Recovery is compromised." });
  if (todayLog.fatigue >= 9) alerts.push({ title: "High Fatigue", text: "Fatigue level is critical (9-10). Rest is not optional." });

  const moodInfo = [
    { value: 1, emoji: "😫", label: "Terrible", status: "Poor" },
    { value: 2, emoji: "😕", label: "Low", status: "Poor" },
    { value: 3, emoji: "😐", label: "Okay", status: "Fair" },
    { value: 4, emoji: "😊", label: "Good", status: "Good" },
    { value: 5, emoji: "🔥", label: "Excellent", status: "Good" },
  ].find(m => m.value === todayLog.mood);

  return (
    <div className="mx-auto mt-8 max-w-[1000px] space-y-6">
      <div className="rounded-2xl border border-border-subtle bg-bg-secondary p-8">
        <h3 className="mb-6 font-display text-xl font-bold">Today's Summary</h3>
        
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Sleep Card */}
          <div className="flex flex-col items-center rounded-xl border border-border-subtle bg-bg-tertiary p-5">
            <span className="mb-2 font-mono text-[10px] uppercase tracking-widest text-text-tertiary">Sleep</span>
            <div className="mb-3 flex items-center gap-2">
              <Moon className="h-5 w-5 text-app-4" />
              <span className="font-display text-3xl font-black text-app-4">{todayLog.sleep}h</span>
            </div>
            <span className={cn(
              "rounded-md px-3 py-1 text-xs font-bold",
              todayLog.sleep >= 7 ? "bg-success/10 text-success" : todayLog.sleep >= 6 ? "bg-warning/10 text-warning" : "bg-error/10 text-error"
            )}>
              {todayLog.sleep >= 7 ? "Good" : todayLog.sleep >= 6 ? "Fair" : "Poor"}
            </span>
          </div>

          {/* Mood Card */}
          <div className="flex flex-col items-center rounded-xl border border-border-subtle bg-bg-tertiary p-5">
            <span className="mb-2 font-mono text-[10px] uppercase tracking-widest text-text-tertiary">Mood</span>
            <div className="mb-3 flex items-center gap-2">
              <Smile className="h-5 w-5 text-app-3" />
              <span className="font-display text-3xl font-black text-app-3">{moodInfo?.emoji}</span>
            </div>
            <span className={cn(
              "rounded-md px-3 py-1 text-xs font-bold",
              moodInfo?.status === "Good" ? "bg-success/10 text-success" : moodInfo?.status === "Fair" ? "bg-warning/10 text-warning" : "bg-error/10 text-error"
            )}>
              {moodInfo?.status}
            </span>
          </div>

          {/* Fatigue Card */}
          <div className="flex flex-col items-center rounded-xl border border-border-subtle bg-bg-tertiary p-5">
            <span className="mb-2 font-mono text-[10px] uppercase tracking-widest text-text-tertiary">Fatigue</span>
            <div className="mb-3 flex items-center gap-2">
              <Zap className="h-5 w-5 text-warning" />
              <span className="font-display text-3xl font-black text-warning">{todayLog.fatigue}/10</span>
            </div>
            <span className={cn(
              "rounded-md px-3 py-1 text-xs font-bold",
              todayLog.fatigue <= 4 ? "bg-success/10 text-success" : todayLog.fatigue <= 7 ? "bg-warning/10 text-warning" : "bg-error/10 text-error"
            )}>
              {todayLog.fatigue <= 4 ? "Low" : todayLog.fatigue <= 7 ? "Moderate" : "Critical"}
            </span>
          </div>
        </div>

        {alerts.length > 0 && (
          <div className="mt-8 space-y-3">
            {alerts.map((alert, i) => (
              <div key={i} className="flex gap-4 rounded-lg border-l-4 border-error bg-error/10 p-4">
                <AlertCircle className="h-5 w-5 shrink-0 text-error" />
                <div>
                  <h4 className="font-bold text-error">{alert.title}</h4>
                  <p className="text-sm text-white/90">{alert.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-4 rounded-xl border border-app-4/20 bg-app-4/5 p-4 text-app-4">
          <Flame className="h-6 w-6 animate-pulse" />
          <div className="font-mono">
            <span className="text-xl font-bold">{streakDays}</span> day logging streak
            <p className="text-[10px] uppercase tracking-wider opacity-70">Keep tracking to spot patterns early.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
