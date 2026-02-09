import { create } from "zustand";
import { EnergyLog, EnergyInsights, calculateEnergyInsights } from "@/lib/energyLogic";
import * as api from "@/lib/api/energy";
import { format, subDays, isSameDay } from "date-fns";

interface EnergyMonitorState {
  logs: EnergyLog[];
  loading: boolean;
  error: string | null;
  
  fetchEntries: () => Promise<void>;
  logToday: (entry: Omit<EnergyLog, "timestamp">) => Promise<void>;
  deleteEntry: (date: string) => Promise<void>;
  getTodayLog: () => EnergyLog | undefined;
  getInsights: () => EnergyInsights;
  getStreak: () => number;
}

export const useEnergyMonitorStore = create<EnergyMonitorState>()(
  (set, get) => ({
    logs: [],
    loading: false,
    error: null,

    fetchEntries: async () => {
      set({ loading: true, error: null });
      try {
        const endDate = format(new Date(), "yyyy-MM-dd");
        const startDate = format(subDays(new Date(), 90), "yyyy-MM-dd");
        const entries = await api.fetchEntries(startDate, endDate);
        set({ logs: entries, loading: false });
      } catch (err: any) {
        set({ error: err.message, loading: false });
      }
    },

    logToday: async (entry) => {
      const previousLogs = get().logs;
      const index = previousLogs.findIndex(e => e.date === entry.date);
      const newEntry: EnergyLog = { ...entry, timestamp: new Date().toISOString() };
      
      let newLogs;
      if (index >= 0) {
        newLogs = [...previousLogs];
        newLogs[index] = newEntry;
      } else {
        newLogs = [...previousLogs, newEntry];
      }
      set({ logs: newLogs });

      try {
        await api.upsertEntry(entry);
      } catch (err: any) {
        set({ logs: previousLogs, error: err.message });
      }
    },

    deleteEntry: async (date) => {
      const previousLogs = get().logs;
      set({ logs: previousLogs.filter(e => e.date !== date) });
      try {
        await api.deleteEntry(date);
      } catch (err: any) {
        set({ logs: previousLogs, error: err.message });
      }
    },

    getTodayLog: () => {
      const todayStr = format(new Date(), "yyyy-MM-dd");
      return get().logs.find((e) => e.date === todayStr);
    },

    getInsights: () => {
      return calculateEnergyInsights(get().logs);
    },

    getStreak: () => {
      const sortedLogs = [...get().logs]
        .sort((a, b) => b.date.localeCompare(a.date));
      
      if (sortedLogs.length === 0) return 0;
      
      let streak = 0;
      let checkDate = new Date();
      
      // If today is not logged, start checking from yesterday
      const todayStr = format(new Date(), "yyyy-MM-dd");
      if (sortedLogs[0].date !== todayStr) {
        checkDate = subDays(checkDate, 1);
      }

      while (true) {
        const dateStr = format(checkDate, "yyyy-MM-dd");
        const entry = sortedLogs.find(l => l.date === dateStr);
        if (entry) {
          streak++;
          checkDate = subDays(checkDate, 1);
        } else {
          break;
        }
      }
      return streak;
    }
  })
);
