"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Flame, Ghost, Target } from "lucide-react";
import { Button } from "@/components/universal/Button";

interface StreakHeroProps {
  streak: number;
  bestStreak: number;
  completedToday: number;
  totalMetrics: number;
  onAddMetric: () => void;
}

export const StreakHero = ({ streak, bestStreak, completedToday, totalMetrics, onAddMetric }: StreakHeroProps) => {
  const isActive = streak > 0;
  const noMetrics = totalMetrics === 0;
  const isNeverStarted = streak === 0 && bestStreak === 0;

  if (noMetrics) {
    return (
      <div className="relative mx-auto max-w-[600px] py-16 text-center">
        <div className="mb-6 flex justify-center">
          <Flame className="h-24 w-24 text-text-tertiary" />
        </div>
        <h2 className="mb-2 font-display text-3xl font-bold text-white">Build your streak.</h2>
        <p className="mb-8 text-text-secondary">
          Add metrics you want to track daily. Training, posting, coding—whatever moves you forward.
        </p>
        <Button onClick={onAddMetric} className="h-14 px-10 text-lg bg-[var(--app-2-accent)] hover:shadow-[0_8px_24px_rgba(251,146,60,0.3)]">
          Add First Metric
        </Button>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-[600px] py-16 text-center">
      {/* Background Glow */}
      <div 
        className={cn(
          "absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.15),transparent_70%)]",
          !isActive && !isNeverStarted && "bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1),transparent_70%)]",
          isNeverStarted && "bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.1),transparent_70%)]"
        )} 
      />

      <div className="mb-6 flex justify-center">
        {isActive ? (
          <div className="relative">
            <Flame 
              className="h-32 w-32 animate-pulse text-app-2 transition-all duration-1000"
              style={{ filter: "drop-shadow(0 0 20px rgba(251, 146, 60, 0.5))" }}
            />
            <div className="absolute inset-0 animate-ping opacity-20">
              <Flame className="h-32 w-32 text-app-2" />
            </div>
          </div>
        ) : isNeverStarted ? (
          <Target className="h-24 w-24 text-app-2 opacity-60 animate-bounce" />
        ) : (
          <Ghost className="h-24 w-24 text-error opacity-60" />
        )}
      </div>

      <div className="flex flex-col items-center">
        <span className={cn(
          "font-display text-7xl font-black leading-none sm:text-8xl",
          isActive ? "text-app-2" : isNeverStarted ? "text-app-2/60" : "text-error"
        )}>
          {streak}
        </span>
        <span className="mt-2 font-mono text-xl tracking-wider text-text-secondary uppercase">
          day streak
        </span>
      </div>

      <div className="mt-8 space-y-2">
        <h3 className={cn(
          "text-xl font-bold",
          isActive || isNeverStarted ? "text-white" : "text-error"
        )}>
          {isActive 
            ? "The chain is alive. Don't break it." 
            : isNeverStarted 
              ? "Start your first streak."
              : "You broke the chain."
          }
        </h3>
        <p className="font-mono text-sm text-text-tertiary">
          {isActive 
            ? `${completedToday}/${totalMetrics} tasks completed today`
            : isNeverStarted
              ? "Everything starts with day one. Do it today."
              : "Start again today. Every champion has restart days."
          }
        </p>
      </div>

      {!isActive && (
        <div className="mt-8">
          <Button 
            onClick={onAddMetric} 
            className={cn(
              "h-12",
              isNeverStarted ? "bg-bg-tertiary hover:bg-border-subtle text-text-primary hover:shadow-[0_8px_24px_rgba(251,146,60,0.3)]" : "bg-app-2 hover:bg-app-2-light"
            )}
          >
            {isNeverStarted ? "Add More Metrics" : "Start New Streak"}
          </Button>
        </div>
      )}
    </div>
  );
};

