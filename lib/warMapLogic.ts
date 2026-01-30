import { startOfWeek, endOfWeek, format, isWithinInterval, startOfDay, endOfDay } from "date-fns";

export type WeekState = "PLANNING" | "EXECUTION" | "COMPLETED";

export interface Subtask {
  id: string;
  name: string;
  completed: boolean;
}

export interface WarTask {
  id: string;
  name: string;
  subtasks: Subtask[];
}

export interface WeeklyData {
  weekId: string; // YYYY-MM-DD (Sunday)
  locked: boolean;
  tasks: WarTask[];
}

/**
 * Returns the current week's range and unique ID.
 * Week starts on Sunday.
 */
export function getCurrentWeekInfo() {
  const now = new Date();
  const start = startOfWeek(now, { weekStartsOn: 0 });
  const end = endOfWeek(now, { weekStartsOn: 0 });
  
  return {
    start,
    end,
    weekId: format(start, "yyyy-MM-dd"),
    startDateStr: format(start, "MMM do"),
    endDateStr: format(end, "MMM do"),
  };
}

/**
 * Determines the current state of a week based on data.
 */
export function determineWeekState(weekData: WeeklyData | null, currentWeekId: string): WeekState {
  if (!weekData || weekData.weekId !== currentWeekId) {
    return "PLANNING";
  }

  if (!weekData.locked) {
    return "PLANNING";
  }

  const allTasksDone = weekData.tasks.every(task => 
    task.name && task.subtasks.length > 0 && task.subtasks.every(st => st.completed)
  );

  if (allTasksDone) {
    return "COMPLETED";
  }

  return "EXECUTION";
}

/**
 * Validates if a week can be locked.
 * Must have 3 tasks, and each must have at least 1 subtask.
 */
export function canLockWeek(tasks: WarTask[]): boolean {
  const validTasks = tasks.filter(t => t.name.trim() !== "");
  if (validTasks.length !== 3) return false;
  
  return validTasks.every(t => t.subtasks.length > 0 && t.subtasks.every(st => st.name.trim() !== ""));
}
