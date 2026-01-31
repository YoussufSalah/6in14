import { format, subDays, isSameDay } from "date-fns";

export interface EnergyLog {
  date: string; // YYYY-MM-DD
  sleep: number; // 0-12
  mood: number; // 1-5
  fatigue: number; // 1-10
  timestamp: string;
}

export interface EnergyInsights {
  avgSleep: number;
  avgMood: number;
  avgFatigue: number;
  bestDay: EnergyLog | null;
  worstDay: EnergyLog | null;
  patterns: string[];
  consistencyScore: number;
}

/**
 * Calculates insights based on the last 30 days of logs.
 */
export function calculateEnergyInsights(logs: EnergyLog[]): EnergyInsights {
  const last30 = logs
    .filter(log => new Date(log.date) >= subDays(new Date(), 30))
    .sort((a, b) => b.date.localeCompare(a.date));

  if (last30.length === 0) {
    return {
      avgSleep: 0,
      avgMood: 0,
      avgFatigue: 0,
      bestDay: null,
      worstDay: null,
      patterns: [],
      consistencyScore: 0
    };
  }

  const totalSleep = last30.reduce((acc, log) => acc + log.sleep, 0);
  const totalMood = last30.reduce((acc, log) => acc + log.mood, 0);
  const totalFatigue = last30.reduce((acc, log) => acc + log.fatigue, 0);

  const avgSleep = totalSleep / last30.length;
  const avgMood = totalMood / last30.length;
  const avgFatigue = totalFatigue / last30.length;

  // Best day: High sleep, High mood, Low fatigue
  // We can use a simple composite score: sleep (normalized) + mood + (11-fatigue)
  const calculateScore = (log: EnergyLog) => (log.sleep * 0.8) + (log.mood * 2) + (11 - log.fatigue);
  
  const sortedByQuality = [...last30].sort((a, b) => calculateScore(b) - calculateScore(a));
  const bestDay = sortedByQuality[0];
  const worstDay = sortedByQuality[sortedByQuality.length - 1];

  const patterns: string[] = [];
  
  // Pattern 1: Sleep Deficit
  if (avgSleep < 7) {
    patterns.push(`⚠️ Sleep Deficit: Average sleep is ${avgSleep.toFixed(1)}h. You're ${(7 - avgSleep).toFixed(1)}h below the minimum.`);
  }

  // Pattern 2: Chronic Fatigue
  if (avgFatigue >= 7) {
    patterns.push(`⚠️ High Fatigue: Average fatigue is ${avgFatigue.toFixed(1)}/10. Pattern suggests burnout risk.`);
  }

  // Pattern 3: Mood Trend (last 3 entries)
  if (last30.length >= 3) {
    const recentMoods = last30.slice(0, 3).every(log => log.mood <= 2);
    if (recentMoods) {
      patterns.push("⚠️ Poor Mood Pattern: Low mood for 3+ days. Recovery prioritized.");
    }
  }

  // Pattern 4: Healthy state
  if (patterns.length === 0 && avgSleep >= 7 && avgMood >= 3.5 && avgFatigue <= 4) {
    patterns.push("✅ Healthy Recovery: Metrics look good. Keep protecting the machine.");
  }

  const consistencyScore = Math.round((last30.length / 30) * 100);

  return {
    avgSleep: Number(avgSleep.toFixed(1)),
    avgMood: Number(avgMood.toFixed(1)),
    avgFatigue: Number(avgFatigue.toFixed(1)),
    bestDay,
    worstDay,
    patterns,
    consistencyScore
  };
}

/**
 * Normalizes values for 30-day chart display.
 * Sleep: 0-12 -> 0-12
 * Mood: 1-5 -> mapped to scale
 * Fatigue: 1-10 -> inverted (10 becomes 1) for higher = better on chart
 */
export function prepareChartData(logs: EnergyLog[]) {
  const last30 = Array.from({ length: 30 }).map((_, i) => {
    const date = subDays(new Date(), 29 - i);
    const dateStr = format(date, "yyyy-MM-dd");
    const log = logs.find(l => l.date === dateStr);
    
    if (!log) return { date: format(date, "MMM dd"), sleep: null, mood: null, energy: null };

    return {
      date: format(date, "MMM dd"),
      sleep: log.sleep,
      mood: log.mood * 2.4, // Normalize 1-5 to 0-12 scale
      fatigue: 12 - (log.fatigue * 1.2), // Invert fatigue and normalize to 0-12
      rawMood: log.mood,
      rawFatigue: log.fatigue
    };
  });

  return last30;
}
