import { format, subDays, isSameDay, startOfDay } from "date-fns";

export type MetricStatus = "done" | "missed" | "rest" | "none";

export interface HistoryEntry {
  date: string; // YYYY-MM-DD
  status: MetricStatus;
}

export interface Metric {
  id: string;
  name: string;
  createdAt: string;
  history: HistoryEntry[];
  currentStreak: number;
  bestStreak: number;
}

/**
 * Calculates a single metric's streak.
 * Rules:
 * - 'done' and 'rest' maintain/build the streak.
 * - 'missed' breaks the streak.
 */
export function calculateMetricStreak(history: HistoryEntry[]): { current: number; best: number } {
  if (history.length === 0) return { current: 0, best: 0 };

  const sortedHistory = [...history].sort((a, b) => b.date.localeCompare(a.date));
  let current = 0;
  let best = 0;
  let tempBest = 0;

  // Best streak calculation
  const ascendingHistory = [...history].sort((a, b) => a.date.localeCompare(b.date));
  let runningBest = 0;
  for (const entry of ascendingHistory) {
    if (entry.status === "done" || entry.status === "rest") {
      runningBest++;
    } else {
      runningBest = 0;
    }
    if (runningBest > best) best = runningBest;
  }

  // Current streak calculation (backwards from latest entry)
  // Note: Only count if consecutive starting from today or yesterday
  const today = format(new Date(), "yyyy-MM-dd");
  const yesterday = format(subDays(new Date(), 1), "yyyy-MM-dd");

  let latestEntryDate = sortedHistory[0].date;
  if (latestEntryDate !== today && latestEntryDate !== yesterday) {
    // Streak is already broken if no entry today AND no entry yesterday
    return { current: 0, best };
  }

  for (let i = 0; i < sortedHistory.length; i++) {
    const entry = sortedHistory[i];
    
    // Check for gaps
    if (i > 0) {
      const prevEntryDate = sortedHistory[i-1].date;
      const expectedDate = format(subDays(new Date(prevEntryDate), 1), "yyyy-MM-dd");
      if (entry.date !== expectedDate) break; // Gap found
    }

    if (entry.status === "done" || entry.status === "rest") {
      current++;
    } else {
      break; // Missed breaks the current streak
    }
  }

  return { current, best };
}

/**
 * Calculates the main overall streak.
 * Rule: 50% or more metrics must be 'done' or 'rest' to count the day toward the streak.
 */
export function calculateMainStreak(metrics: Metric[]): { current: number; best: number } {
  if (metrics.length === 0) return { current: 0, best: 0 };

  // 1. Get all unique dates from all metrics
  const allDatesSet = new Set<string>();
  metrics.forEach(m => m.history.forEach(h => allDatesSet.add(h.date)));
  const allDates = Array.from(allDatesSet).sort((a, b) => b.localeCompare(a));

  if (allDates.length === 0) return { current: 0, best: 0 };

  const dayScores = allDates.map(date => {
    let score = 0;
    metrics.forEach(m => {
      const entry = m.history.find(h => h.date === date);
      if (entry && (entry.status === "done" || entry.status === "rest")) {
        score++;
      }
    });
    return { date, isPassing: (score / metrics.length) >= 0.5 };
  });

  // Calculate best
  const ascendingScores = [...dayScores].reverse();
  let best = 0;
  let runningBest = 0;
  for (const day of ascendingScores) {
    if (day.isPassing) {
      runningBest++;
    } else {
      runningBest = 0;
    }
    if (runningBest > best) best = runningBest;
  }

  // Calculate current
  const today = format(new Date(), "yyyy-MM-dd");
  const yesterday = format(subDays(new Date(), 1), "yyyy-MM-dd");
  
  if (!dayScores[0].isPassing || (dayScores[0].date !== today && dayScores[0].date !== yesterday)) {
    // If latest relevant day didn't pass or is too old
    // Exception: if today hasn't been checked yet, yesterday should still count.
    if (dayScores[0].isPassing && dayScores[0].date === yesterday) {
      // Current streak continues from yesterday
    } else {
      return { current: 0, best };
    }
  }

  let current = 0;
  for (let i = 0; i < dayScores.length; i++) {
    const day = dayScores[i];
    
    // Check for gaps
    if (i > 0) {
      const prevDate = dayScores[i-1].date;
      const expectedDate = format(subDays(new Date(prevDate), 1), "yyyy-MM-dd");
      if (day.date !== expectedDate) break;
    }

    if (day.isPassing) {
      current++;
    } else {
      break;
    }
  }

  return { current, best };
}
