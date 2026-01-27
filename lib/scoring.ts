import { differenceInDays, startOfDay } from "date-fns";

export type PriorityLevel = "low" | "medium" | "high" | number;
export type ImpactLevel = "low" | "medium" | "high" | number;

export interface Goal {
  id: string;
  name: string;
  priority: PriorityLevel;
  deadline: string;
  impact: ImpactLevel;
  completed?: boolean;
  skippedAt?: string; // ISO date string
}

const WEIGHTS = {
  priority: 0.3,
  deadline: 0.5,
  impact: 0.2,
};

function normalizeValue(value: PriorityLevel | ImpactLevel): number {
  if (typeof value === "number") return value / 100;

  const map: Record<string, number> = {
    low: 0.33,
    medium: 0.66,
    high: 1.0,
  };

  return map[value.toLowerCase()] || 0.5;
}

function calculateUrgency(deadlineDate: string): number {
  const today = startOfDay(new Date());
  const deadline = startOfDay(new Date(deadlineDate));
  
  const daysLeft = differenceInDays(deadline, today);
  
  if (daysLeft < 0) return 1.0;
  if (daysLeft <= 3) return 0.9;
  if (daysLeft <= 7) return 0.75;
  if (daysLeft <= 14) return 0.6;
  if (daysLeft <= 30) return 0.4;
  if (daysLeft <= 60) return 0.25;
  return 0.1;
}

export function calculateGoalScore(goal: Goal): number {
  const priorityScore = normalizeValue(goal.priority);
  const urgencyScore = calculateUrgency(goal.deadline);
  const impactScore = normalizeValue(goal.impact);
  
  const finalScore = (
    (priorityScore * WEIGHTS.priority) +
    (urgencyScore * WEIGHTS.deadline) +
    (impactScore * WEIGHTS.impact)
  ) * 100;
  
  return Math.round(finalScore * 100) / 100;
}

export function getDaysLeft(deadlineDate: string): number {
  return differenceInDays(startOfDay(new Date(deadlineDate)), startOfDay(new Date()));
}
