import { create } from "zustand";
import { persist } from "zustand/middleware";
import { EnergyLog, calculateEnergyInsights } from "@/lib/energyLogic";
import { format } from "date-fns";

interface EnergyMonitorState {
  logs: EnergyLog[];
  logToday: (sleep: number, mood: number, fatigue: number) => void;
  getTodayLog: () => EnergyLog | null;
  getInsights: () => ReturnType<typeof calculateEnergyInsights>;
  getStreak: () => number;
}

export const useEnergyMonitorStore = create<EnergyMonitorState>()(
  persist(
    (set, get) => ({
      logs: [],

      logToday: (sleep, mood, fatigue) => set((state) => {
        const date = format(new Date(), "yyyy-MM-dd");
        const existingIndex = state.logs.findIndex(l => l.date === date);
        const newLog: EnergyLog = {
          date,
          sleep,
          mood,
          fatigue,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        let updatedLogs = [...state.logs];
        if (existingIndex !== -1) {
          updatedLogs[existingIndex] = newLog;
        } else {
          updatedLogs.push(newLog);
        }

        return { logs: updatedLogs };
      }),

      getTodayLog: () => {
        const today = format(new Date(), "yyyy-MM-dd");
        return get().logs.find(l => l.date === today) || null;
      },

      getInsights: () => {
        return calculateEnergyInsights(get().logs);
      },

      getStreak: () => {
        const sortedLogs = [...get().logs].sort((a, b) => b.date.localeCompare(a.date));
        if (sortedLogs.length === 0) return 0;

        let streak = 0;
        let currentDate = new Date();
        const todayStr = format(currentDate, "yyyy-MM-dd");
        const yesterdayStr = format(subDays(currentDate, 1), "yyyy-MM-dd");

        // If no log today or yesterday, streak is broken
        if (!sortedLogs.some(l => l.date === todayStr || l.date === yesterdayStr)) return 0;

        // Count backwards
        for (let i = 0; i < 365; i++) {
          const dateStr = format(subDays(new Date(), i), "yyyy-MM-dd");
          const hasLog = sortedLogs.some(l => l.date === dateStr);
          if (hasLog) {
            streak++;
          } else {
            // Allow skip today if not yet logged
            if (i === 0) continue;
            break;
          }
        }
        return streak;
      }
    }),
    {
      name: "energy-monitor-storage",
    }
  )
);

function subDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}
