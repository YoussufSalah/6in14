"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Trash2, Edit3 } from "lucide-react";
import { format } from "date-fns";
import { WeeklyEntry, calculateWoW } from "@/lib/progressRadarLogic";
import { cn } from "@/lib/utils";

interface WeeklyHistoryProps {
  entries: WeeklyEntry[];
  onEdit: (entry: WeeklyEntry) => void;
  onDelete: (id: string) => void;
}

export const WeeklyHistory = ({ entries, onEdit, onDelete }: WeeklyHistoryProps) => {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  if (entries.length === 0) return null;

  return (
    <div className="mx-auto mt-16 max-w-[1000px] px-8 sm:px-0 pb-24">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-display text-xl font-bold text-white">
          All Weeks <span className="ml-2 font-mono text-sm text-text-tertiary opacity-50">({entries.length})</span>
        </h3>
      </div>

      <div className="space-y-4">
        {entries.map((entry, index) => {
          const isExpanded = expandedIds.includes(entry.id);
          const prevEntry = entries[index + 1];

          return (
            <div 
              key={entry.id}
              className={cn(
                "overflow-hidden rounded-xl border border-border-subtle bg-bg-secondary transition-all",
                isExpanded && "border-app-6/30 ring-1 ring-app-6/10"
              )}
            >
              {/* Header */}
              <div 
                className="flex cursor-pointer items-center justify-between p-5 hover:bg-bg-tertiary/30"
                onClick={() => toggleExpand(entry.id)}
              >
                <div>
                  <h4 className="font-bold text-white">
                    {format(new Date(entry.weekStart), "MMM d")} - {format(new Date(entry.weekEnd), "MMM d, yyyy")}
                  </h4>
                  <p className="mt-1 font-mono text-[10px] text-text-tertiary uppercase tracking-wider">
                    U: {entry.metrics.users} | R: ${entry.metrics.revenue} | P: {entry.metrics.posts} | T: {entry.metrics.training}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onEdit(entry); }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-subtle text-text-tertiary transition-all hover:border-app-6 hover:text-app-6"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(entry.id); }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-subtle text-text-tertiary transition-all hover:border-error hover:text-error"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="ml-2 text-text-tertiary">
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="border-t border-border-subtle bg-bg-tertiary/20 p-6">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {Object.entries(entry.metrics).map(([key, val]) => {
                      const change = prevEntry ? calculateWoW(val, prevEntry.metrics[key as keyof WeeklyEntry['metrics']]) : null;
                      return (
                        <div key={key}>
                          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-text-tertiary">{key}</p>
                          <div className="flex flex-col gap-1">
                            <span className="font-mono text-lg font-bold text-white">
                              {key === 'revenue' ? `$${val}` : val}
                            </span>
                            {change !== null && (
                              <span className={cn(
                                "font-mono text-[10px] font-bold",
                                change > 0 ? "text-success" : change < 0 ? "text-error" : "text-text-tertiary"
                              )}>
                                {change > 0 ? `+${change}% ↑` : change < 0 ? `${change}% ↓` : "0% →"}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
