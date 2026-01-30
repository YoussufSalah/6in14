"use client";

import React from "react";
import { Lock, Check, CheckCircle2 } from "lucide-react";
import { WarTask } from "@/lib/warMapLogic";
import { cn } from "@/lib/utils";

interface ExecutionViewProps {
  tasks: WarTask[];
  onToggleSubtask: (taskIndex: number, subtaskIndex: number) => void;
  completedTasks: number;
}

export const ExecutionView = ({
  tasks,
  onToggleSubtask,
  completedTasks
}: ExecutionViewProps) => {
  return (
    <div className="mx-auto max-w-[1200px] px-8 py-16">
      <div className="mb-12 text-center">
        <h2 className="font-display text-3xl font-bold text-white">This Week's Battles</h2>
        <div className="mt-2 flex items-center justify-center gap-2 font-mono text-base text-error">
          <Lock className="h-4 w-4" />
          <span>Week is locked. Focus on execution.</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task, taskIdx) => {
          const completedSubtasks = task.subtasks.filter(s => s.completed).length;
          const totalSubtasks = task.subtasks.length;
          const isComplete = totalSubtasks > 0 && completedSubtasks === totalSubtasks;
          const percentage = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

          return (
            <div 
              key={task.id}
              className={cn(
                "group relative flex flex-col rounded-2xl border-2 border-border-subtle bg-bg-secondary p-6 transition-all hover:border-app-3/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-app-3/5",
                isComplete && "border-success bg-gradient-to-b from-success/5 to-transparent"
              )}
            >
              <div className="mb-4 inline-flex self-start rounded-lg border border-app-3/30 bg-bg-tertiary px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-app-3 uppercase">
                Priority {taskIdx + 1}
              </div>

              <h3 className="mb-6 font-display text-xl font-bold leading-tight text-white line-clamp-2 min-h-[3.25rem]">
                {task.name}
              </h3>

              <div className="mb-8">
                <div className="mb-2 flex justify-between font-mono text-[10px] text-text-tertiary uppercase">
                  <span>Progress</span>
                  <span>{completedSubtasks}/{totalSubtasks} Subtasks</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-tertiary">
                  <div 
                    className={cn(
                      "h-full transition-all duration-500",
                      isComplete ? "bg-success" : "bg-app-3"
                    )}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              <div className={cn(
                "mb-6 inline-flex self-start items-center gap-2 rounded-lg border px-3 py-1 font-mono text-[10px] font-bold uppercase transition-all",
                isComplete 
                  ? "border-success/30 bg-success/10 text-success" 
                  : "border-app-3/30 bg-app-3/10 text-app-3"
              )}>
                {isComplete ? (
                  <>
                    <CheckCircle2 className="h-3 w-3" />
                    Complete
                  </>
                ) : (
                  <>
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-app-3" />
                    In Progress
                  </>
                )}
              </div>

              <div className="space-y-3">
                {task.subtasks.map((st, stIdx) => (
                  <button
                    key={st.id}
                    onClick={() => onToggleSubtask(taskIdx, stIdx)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-xl border border-border-subtle bg-bg-tertiary p-3 text-left transition-all hover:bg-app-3/5",
                      st.completed && "border-success/20 bg-success/5 opacity-60"
                    )}
                  >
                    <div className={cn(
                      "mt-0.5 flex h-5 w-5 min-w-[1.25rem] items-center justify-center rounded border-2 transition-all",
                      st.completed 
                        ? "border-success bg-success text-white" 
                        : "border-border-strong bg-transparent"
                    )}>
                      {st.completed && <Check className="h-3.5 w-3.5" />}
                    </div>
                    <span className={cn(
                      "text-sm leading-relaxed transition-all",
                      st.completed ? "text-text-tertiary line-through" : "text-white"
                    )}>
                      {st.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 rounded-2xl border border-app-3/20 bg-app-3/5 p-8 text-center">
        <div className="font-mono text-xl font-bold text-app-3">
          Week Progress: {completedTasks}/3 Tasks • {tasks.reduce((acc, t) => acc + t.subtasks.filter(s => s.completed).length, 0)}/{tasks.reduce((acc, t) => acc + t.subtasks.length, 0)} Subtasks
        </div>
      </div>
    </div>
  );
};
