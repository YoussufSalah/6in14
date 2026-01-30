"use client";

import React, { useState } from "react";
import { Plus, X, Lock, AlertTriangle } from "lucide-react";
import { WarTask, canLockWeek } from "@/lib/warMapLogic";
import { Button } from "@/components/universal/Button";
import { cn } from "@/lib/utils";

interface PlanningViewProps {
  tasks: WarTask[];
  onSetTaskName: (index: number, name: string) => void;
  onAddSubtask: (taskIndex: number, name: string) => void;
  onRemoveSubtask: (taskIndex: number, subtaskIndex: number) => void;
  onUpdateSubtaskName: (taskIndex: number, subtaskIndex: number, name: string) => void;
  onCommit: () => void;
}

export const PlanningView = ({
  tasks,
  onSetTaskName,
  onAddSubtask,
  onRemoveSubtask,
  onUpdateSubtaskName,
  onCommit
}: PlanningViewProps) => {
  const [newSubtaskValues, setNewSubtaskValues] = useState<string[]>(["", "", ""]);
  
  const handleAddSubtask = (taskIndex: number) => {
    const val = newSubtaskValues[taskIndex].trim();
    if (!val) return;
    onAddSubtask(taskIndex, val);
    const updated = [...newSubtaskValues];
    updated[taskIndex] = "";
    setNewSubtaskValues(updated);
  };

  const isLockable = canLockWeek(tasks);

  return (
    <div className="mx-auto max-w-[1000px] px-8 py-16">
      <div className="mb-12 text-center">
        <h2 className="font-display text-3xl font-bold text-white">Your 3 Priorities This Week</h2>
        <p className="mt-2 text-text-secondary italic">
          Choose wisely. Once committed, no changes until the week ends.
        </p>
      </div>

      <div className="space-y-8">
        {tasks.map((task, taskIdx) => (
          <div 
            key={task.id}
            className="rounded-2xl border-2 border-border-subtle bg-bg-secondary p-8 transition-all hover:border-app-3/50"
          >
            <div className="mb-6 inline-flex rounded-lg border border-app-3/50 bg-bg-tertiary px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-app-3 uppercase">
              Priority {taskIdx + 1}
            </div>

            <input
              type="text"
              maxLength={80}
              placeholder="e.g., Launch MVP, Complete Core Module"
              value={task.name}
              onChange={(e) => onSetTaskName(taskIdx, e.target.value)}
              className="mb-8 w-full rounded-xl border border-border-subtle bg-bg-tertiary px-5 py-4 font-display text-xl font-bold text-white transition-all focus:border-app-3 focus:outline-none focus:ring-4 focus:ring-app-3/10"
            />

            <div className="space-y-4">
              <label className="text-sm font-semibold text-text-secondary">Subtasks (Max 5)</label>
              
              <div className="space-y-3">
                {task.subtasks.map((st, stIdx) => (
                  <div key={st.id} className="group relative">
                    <input
                      type="text"
                      value={st.name}
                      onChange={(e) => onUpdateSubtaskName(taskIdx, stIdx, e.target.value)}
                      className="w-full rounded-lg border border-border-subtle bg-bg-tertiary px-4 py-3 pr-12 text-sm text-white transition-all focus:border-app-3 focus:outline-none"
                    />
                    <button
                      onClick={() => onRemoveSubtask(taskIdx, stIdx)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary opacity-0 transition-all hover:text-error group-hover:opacity-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}

                {task.subtasks.length < 5 && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add subtask..."
                      value={newSubtaskValues[taskIdx]}
                      onChange={(e) => {
                        const updated = [...newSubtaskValues];
                        updated[taskIdx] = e.target.value;
                        setNewSubtaskValues(updated);
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleAddSubtask(taskIdx)}
                      className="flex-1 rounded-lg border border-border-subtle bg-bg-tertiary px-4 py-2 text-sm text-white focus:border-app-3 focus:outline-none"
                    />
                    <button
                      onClick={() => handleAddSubtask(taskIdx)}
                      className="flex aspect-square h-10 items-center justify-center rounded-lg border-2 border-dashed border-border-strong text-text-tertiary transition-all hover:border-app-3 hover:bg-app-3/5 hover:text-app-3"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Button
          onClick={onCommit}
          disabled={!isLockable}
          className={cn(
            "h-16 w-full max-w-[500px] gap-3 text-lg font-bold shadow-lg transition-all",
            isLockable 
              ? "bg-gradient-to-r from-app-3 to-app-3-light hover:scale-[1.02] shadow-app-3/20" 
              : "opacity-50 grayscale cursor-not-allowed"
          )}
        >
          <Lock className="h-5 w-5" /> Commit Week — Lock These Priorities
        </Button>
        
        <div className="mx-auto mt-6 flex max-w-[500px] items-center justify-center gap-2 font-mono text-sm text-warning">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>Once locked, you cannot edit or add tasks until next week or completion.</span>
        </div>
      </div>
    </div>
  );
};
