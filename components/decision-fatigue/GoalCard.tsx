"use client";

import React from "react";
import { Edit2, Trash2, Calendar } from "lucide-react";
import { Card } from "@/components/universal/Card";
import { Goal, getDaysLeft } from "@/lib/scoring";
import { cn } from "@/lib/utils";

interface GoalCardProps {
  goal: Goal & { score: number };
  rank: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const GoalCard = ({ goal, rank, onEdit, onDelete }: GoalCardProps) => {
  const daysLeft = getDaysLeft(goal.deadline);
  
  const getRankStyle = (r: number) => {
    if (r === 1) return "bg-gradient-to-br from-yellow-400 to-yellow-600 border-yellow-300 text-yellow-950";
    if (r === 2) return "bg-gradient-to-br from-gray-300 to-gray-500 border-gray-200 text-gray-900";
    if (r === 3) return "bg-gradient-to-br from-amber-600 to-amber-800 border-amber-500 text-amber-100";
    return "bg-bg-tertiary border-border-subtle text-text-secondary";
  };

  return (
    <Card className="group relative flex flex-col hover:border-app-1 hover:-translate-y-1 transition-all duration-200">
      {/* Rank Badge */}
      <div className={cn(
        "absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold shadow-inner",
        getRankStyle(rank)
      )}>
        #{rank}
      </div>

      <h3 className="mb-2 pr-10 font-sans text-lg font-bold text-white leading-tight">
        {goal.name}
      </h3>

      <div className="mb-4 space-y-1">
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <span className="font-medium text-text-tertiary uppercase">Priority:</span>
          <span className="text-text-secondary">{goal.priority}</span>
          <span className="text-text-tertiary">•</span>
          <span className="font-medium text-text-tertiary uppercase">Impact:</span>
          <span className="text-text-secondary">{goal.impact}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <Calendar className="h-3 w-3 text-app-1" />
          <span className={cn(daysLeft < 0 ? "text-error font-bold" : "text-text-secondary")}>
            {daysLeft < 0 ? "OVERDUE" : `${daysLeft} days left`}
          </span>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <div className="font-mono text-sm font-bold text-app-1">
          {goal.score.toFixed(2)} pts
        </div>
        
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(goal.id)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border-subtle bg-bg-tertiary text-text-secondary hover:border-app-1 hover:text-app-1 hover:bg-app-1/5 transition-all"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button 
            onClick={() => onDelete(goal.id)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border-subtle bg-bg-tertiary text-text-secondary hover:border-error hover:text-error hover:bg-error/5 transition-all"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Card>
  );
};
