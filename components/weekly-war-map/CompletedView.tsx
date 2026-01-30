"use client";

import React from "react";
import { Trophy, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/universal/Button";
import { format, addDays, startOfWeek } from "date-fns";

interface CompletedViewProps {
  totalSubtasks: number;
  onReset: () => void;
}

export const CompletedView = ({ totalSubtasks, onReset }: CompletedViewProps) => {
  const nextSunday = format(addDays(startOfWeek(new Date(), { weekStartsOn: 0 }), 7), "MMMM do");

  return (
    <div className="mx-auto max-w-[700px] px-8 py-20 text-center">
      <div className="mb-6 flex justify-center">
        <div className="animate-bounce">
          <Trophy className="h-32 w-32 text-success" />
        </div>
      </div>

      <h2 className="mb-4 font-display text-5xl font-black text-success uppercase">
        Week Conquered.
      </h2>
      <p className="mb-12 text-xl text-text-secondary leading-relaxed">
        All 3 priorities executed. {totalSubtasks} subtasks completed. Strategic dominance maintained.
      </p>

      <div className="mb-12 rounded-2xl border border-border-subtle bg-bg-secondary p-10 shadow-2xl shadow-success/5">
        <h3 className="mb-8 font-mono text-sm font-bold uppercase tracking-[0.2em] text-text-tertiary">
          Week Performance Summary
        </h3>

        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col items-center">
            <span className="font-display text-4xl font-black text-success leading-none">3/3</span>
            <span className="mt-2 font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary">
              Tasks Conquered
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display text-4xl font-black text-success leading-none">100%</span>
            <span className="mt-2 font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary">
              Execution Rate
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display text-4xl font-black text-success leading-none">{totalSubtasks}</span>
            <span className="mt-2 font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary">
              Battles Won
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display text-4xl font-black text-success leading-none">7/7</span>
            <span className="mt-2 font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary">
              Days Deployed
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Button
          onClick={onReset}
          className="h-16 w-full max-w-[400px] gap-3 text-lg font-bold bg-gradient-to-r from-success to-success/80 shadow-lg shadow-success/20 hover:scale-[1.02]"
        >
          Start Next Week <ArrowRight className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center justify-center gap-2 font-mono text-sm text-text-tertiary">
          <Calendar className="h-4 w-4" />
          <span>Next week formal planning opens on {nextSunday}</span>
        </div>
      </div>
    </div>
  );
};
