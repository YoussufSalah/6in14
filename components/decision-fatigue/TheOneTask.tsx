"use client";

import React from "react";
import { CheckCircle, ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/universal/Button";
import { Goal, getDaysLeft } from "@/lib/scoring";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

interface TheOneTaskProps {
  goal: (Goal & { score: number }) | null;
  onComplete: (id: string) => void;
  onSkip: (id: string) => void;
}

export const TheOneTask = ({ goal, onComplete, onSkip }: TheOneTaskProps) => {
  if (!goal) return null;

  const daysLeft = getDaysLeft(goal.deadline);

  const handleComplete = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#ffffff', '#22c55e']
    });
    onComplete(goal.id);
  };

  return (
    <div className="relative mx-auto w-full max-w-[800px] animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-app-1 via-app-1-light to-app-1 opacity-20 blur-xl animate-pulse" />
      
      <div className="relative rounded-2xl border-2 border-app-1/30 bg-bg-secondary/80 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
        <div className="mb-6 font-mono text-xs font-bold uppercase tracking-[0.2em] text-app-1-light opacity-80">
          YOUR MISSION TODAY
        </div>

        <h2 className="mb-6 font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
          {goal.name}
        </h2>

        <div className="mb-8 flex flex-wrap gap-x-6 gap-y-3 font-body text-sm text-text-secondary">
          <div className="flex items-center gap-2">
            <span className="text-text-tertiary">Priority:</span>
            <span className="font-semibold text-white">{goal.priority}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-text-tertiary">Deadline:</span>
            <span className={cn("font-semibold", daysLeft < 0 ? "text-error" : "text-white")}>
              {daysLeft < 0 ? "OVERDUE" : `${daysLeft} days`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-text-tertiary">Impact:</span>
            <span className="font-semibold text-white">{goal.impact}</span>
          </div>
        </div>

        <div className="mb-10 flex items-center gap-4">
          <div className="h-[2px] flex-1 bg-border-subtle" />
          <div className="font-mono text-lg font-bold text-app-1">
            Score: {goal.score.toFixed(2)} / 100
          </div>
          <div className="h-[2px] flex-1 bg-border-subtle" />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button 
            size="large" 
            fullWidth 
            className="h-16 text-xl shadow-[0_0_30px_rgba(168,85,247,0.3)]"
            onClick={handleComplete}
          >
            <CheckCircle className="mr-2 h-6 w-6" />
            Mark Complete
          </Button>
          <Button 
            variant="secondary" 
            size="large" 
            fullWidth
            className="h-16 text-xl"
            onClick={() => onSkip(goal.id)}
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Skip Today
          </Button>
        </div>
      </div>
    </div>
  );
};
