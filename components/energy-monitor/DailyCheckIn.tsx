"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/universal/Button";
import { EnergyLog } from "@/lib/energyLogic";

interface DailyCheckInProps {
  onLog: (sleep: number, mood: number, fatigue: number) => void;
  existingLog: EnergyLog | null;
}

const MOODS = [
  { value: 1, emoji: "😫", label: "Terrible" },
  { value: 2, emoji: "😕", label: "Low" },
  { value: 3, emoji: "😐", label: "Okay" },
  { value: 4, emoji: "😊", label: "Good" },
  { value: 5, emoji: "🔥", label: "Excellent" },
];

const FATIGUE_DESC = [
  { range: [1, 2], text: "Energized and ready" },
  { range: [3, 4], text: "Slightly tired but functional" },
  { range: [5, 6], text: "Moderately fatigued" },
  { range: [7, 8], text: "Very tired, need rest soon" },
  { range: [9, 10], text: "Exhausted, rest immediately" },
];

export const DailyCheckIn = ({ onLog, existingLog }: DailyCheckInProps) => {
  const [sleep, setSleep] = useState(8);
  const [mood, setMood] = useState(3);
  const [fatigue, setFatigue] = useState(5);

  useEffect(() => {
    if (existingLog) {
      setSleep(existingLog.sleep);
      setMood(existingLog.mood);
      setFatigue(existingLog.fatigue);
    }
  }, [existingLog]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLog(sleep, mood, fatigue);
  };

  const currentFatigueDesc = FATIGUE_DESC.find(d => fatigue >= d.range[0] && fatigue <= d.range[1])?.text;

  return (
    <div className="mx-auto max-w-[800px] rounded-2xl border border-border-subtle bg-bg-secondary p-8 sm:p-12">
      <div className="mb-10">
        <h2 className="font-display text-2xl font-bold">Today's Energy Check-In</h2>
        <p className="font-mono text-sm text-text-secondary">
          {format(new Date(), "MMMM do, yyyy")} • Log your recovery metrics
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Sleep Input */}
        <div className="metric-group">
          <label className="mb-2 block text-base font-semibold text-white">Sleep</label>
          <p className="mb-6 text-sm text-text-secondary">How many hours did you sleep last night?</p>
          
          <div className="flex flex-col items-center">
            <div className={cn(
              "mb-4 font-display text-5xl font-black transition-colors hover:cursor-default",
              sleep < 6 ? "text-error" : sleep < 7 ? "text-warning" : sleep <= 9 ? "text-app-4" : "text-app-3"
            )}>
              {sleep}h
            </div>
            
            <input 
              type="range"
              min="0"
              max="12"
              step="0.5"
              value={sleep}
              onChange={(e) => setSleep(parseFloat(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-bg-tertiary accent-app-4"
            />
            
            <p className="mt-4 font-mono text-xs italic text-text-tertiary">Ideal: 7-9 hours</p>
          </div>
        </div>

        {/* Mood Input */}
        <div className="metric-group">
          <label className="mb-2 block text-base font-semibold text-white">Mood</label>
          <p className="mb-6 text-sm text-text-secondary">How are you feeling today?</p>
          
          <div className="grid grid-cols-5 gap-3 sm:gap-4">
            {MOODS.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => setMood(m.value)}
                className={cn(
                  "flex flex-col items-center justify-center rounded-xl border-2 p-4 transition-all hover:-translate-y-1",
                  mood === m.value 
                    ? "border-app-4 bg-app-4/10" 
                    : "border-border-subtle bg-bg-tertiary opacity-60 hover:border-app-4/50 hover:opacity-100"
                )}
              >
                <span className="mb-2 text-3xl sm:text-4xl">{m.emoji}</span>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-wider",
                  mood === m.value ? "text-app-4" : "text-text-tertiary"
                )}>
                  {m.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Fatigue Input */}
        <div className="metric-group">
          <label className="mb-2 block text-base font-semibold text-white">Fatigue Level</label>
          <p className="mb-6 text-sm text-text-secondary">How tired do you feel right now? (1-10)</p>
          
          <div className="space-y-6">
            <div className="flex justify-between gap-1 sm:gap-2">
              {Array.from({ length: 10 }).map((_, i) => {
                const val = i + 1;
                const isSelected = fatigue === val;
                const isFull = fatigue >= val;
                
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setFatigue(val)}
                    className={cn(
                      "flex h-10 w-full items-center justify-center rounded border-2 transition-all hover:scale-110",
                      isSelected && "scale-110 ring-2 ring-app-4 ring-offset-2 ring-offset-bg-primary",
                      isFull 
                        ? (val <= 3 ? "bg-success border-success" : val <= 6 ? "bg-warning border-warning" : "bg-error border-error")
                        : "bg-bg-tertiary border-border-subtle text-text-tertiary hover:border-app-4"
                    )}
                  >
                    <span className={cn("text-xs font-bold", isFull ? "text-white" : "text-transparent")}>{val}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="text-center">
              <div className={cn(
                "font-display text-2xl font-bold",
                fatigue <= 4 ? "text-success" : fatigue <= 7 ? "text-warning" : "text-error"
              )}>
                {fatigue}/10
              </div>
              <p className="mt-1 text-sm italic text-text-tertiary">{currentFatigueDesc}</p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit" fullWidth className="h-14 text-lg shadow-xl shadow-app-4/20">
            {existingLog ? "Update Today's Metrics" : "Log Today's Metrics"}
          </Button>
          
          {existingLog && (
            <div className="mt-4 rounded-lg border border-app-4/20 bg-app-4/5 p-3 text-center font-mono text-xs text-app-4">
              ✓ Logged at {existingLog.timestamp}. You can update them anytime today.
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
