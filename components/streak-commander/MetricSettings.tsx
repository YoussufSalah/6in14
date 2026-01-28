"use client";

import React from "react";
import { Edit2, Trash2, Plus } from "lucide-react";
import { Metric } from "@/lib/streakLogic";
import { Button } from "@/components/universal/Button";

interface MetricSettingsProps {
  metrics: Metric[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export const MetricSettings = ({ metrics, onEdit, onDelete, onAdd }: MetricSettingsProps) => {
  return (
    <section className="mx-auto max-w-[800px] py-16">
      <h2 className="mb-8 font-display text-2xl font-bold">Your Metrics</h2>
      
      <div className="space-y-3">
        {metrics.map((metric) => (
          <div 
            key={metric.id}
            className="flex items-center justify-between rounded-xl border border-border-subtle bg-bg-tertiary px-6 py-4 transition-all hover:border-border-strong"
          >
            <span className="font-semibold text-white">{metric.name}</span>
            <div className="flex gap-2">
              <button 
                onClick={() => onEdit(metric.id)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-subtle text-text-secondary transition-all hover:border-app-2 hover:bg-app-2/10 hover:text-app-2"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button 
                onClick={() => onDelete(metric.id)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-subtle text-text-secondary transition-all hover:border-error hover:bg-error/10 hover:text-error"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={onAdd}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border-strong py-4 text-text-secondary transition-all hover:border-app-2 hover:bg-app-2/5 hover:text-app-2"
        >
          <Plus className="h-5 w-5" />
          <span className="font-bold">Add New Metric</span>
        </button>
      </div>
    </section>
  );
};
