"use client";

import React, { useEffect, useMemo } from "react";
import { Layout } from "@/components/universal/Layout";
import { WeekHeader } from "@/components/weekly-war-map/WeekHeader";
import { PlanningView } from "@/components/weekly-war-map/PlanningView";
import { ExecutionView } from "@/components/weekly-war-map/ExecutionView";
import { CompletedView } from "@/components/weekly-war-map/CompletedView";
import { useWarMapStore } from "@/store/warMapStore";
import { getCurrentWeekInfo, determineWeekState } from "@/lib/warMapLogic";
import { differenceInDays } from "date-fns";

export default function WeeklyWarMapPage() {
  const {
    weeklyData,
    checkAndInitialize,
    setTaskName,
    addSubtask,
    removeSubtask,
    updateSubtaskName,
    toggleSubtask,
    commitWeek,
    resetForNewWeek
  } = useWarMapStore();

  useEffect(() => {
    checkAndInitialize();
  }, [checkAndInitialize]);

  const weekInfo = useMemo(() => getCurrentWeekInfo(), []);
  
  const state = useMemo(() => 
    determineWeekState(weeklyData, weekInfo.weekId), 
  [weeklyData, weekInfo.weekId]);

  if (!weeklyData) return null;

  const completedTasks = weeklyData.tasks.filter(t => 
    t.subtasks.length > 0 && t.subtasks.every(st => st.completed)
  ).length;

  const totalSubtasks = weeklyData.tasks.reduce((acc, t) => acc + t.subtasks.length, 0);
  const completedSubtasks = weeklyData.tasks.reduce((acc, t) => acc + t.subtasks.filter(s => s.completed).length, 0);
  const daysLeft = differenceInDays(weekInfo.end, new Date());

  return (
    <Layout 
      appName="Weekly War Map" 
      appAccent="var(--app-3-accent)"
    >
      <div className="pb-24">
        <WeekHeader 
          startDate={weekInfo.startDateStr}
          endDate={weekInfo.endDateStr}
          state={state}
          completedTasks={completedTasks}
          completedSubtasks={completedSubtasks}
          totalSubtasks={totalSubtasks}
          daysLeft={daysLeft}
        />

        {state === "PLANNING" && (
          <PlanningView 
            tasks={weeklyData.tasks}
            onSetTaskName={setTaskName}
            onAddSubtask={addSubtask}
            onRemoveSubtask={removeSubtask}
            onUpdateSubtaskName={updateSubtaskName}
            onCommit={commitWeek}
          />
        )}

        {state === "EXECUTION" && (
          <ExecutionView 
            tasks={weeklyData.tasks}
            onToggleSubtask={toggleSubtask}
            completedTasks={completedTasks}
          />
        )}

        {state === "COMPLETED" && (
          <CompletedView 
            totalSubtasks={totalSubtasks}
            onReset={resetForNewWeek}
          />
        )}
      </div>
    </Layout>
  );
}
