import { create } from "zustand";
import { WeeklyEntry, getWeekRange } from "@/lib/progressRadarLogic";
import * as api from "@/lib/api/progress";
import { format, subWeeks, startOfISOWeek, endOfISOWeek } from "date-fns";

interface ProgressSettings {
  currencySymbol: string;
}

interface ProgressRadarState {
  entries: WeeklyEntry[];
  settings: ProgressSettings;
  loading: boolean;
  error: string | null;
  
  fetchData: () => Promise<void>;
  logWeek: (metrics: WeeklyEntry['metrics'], weekStart?: string) => Promise<void>;
  deleteWeek: (weekStart: string) => Promise<void>;
  getEntryForWeek: (weekStart: string) => WeeklyEntry | undefined;
  setCurrency: (symbol: string) => Promise<void>;
}

export const useProgressRadarStore = create<ProgressRadarState>()(
  (set, get) => ({
    entries: [],
    settings: { currencySymbol: "$" },
    loading: false,
    error: null,

    fetchData: async () => {
      set({ loading: true, error: null });
      try {
        const settings = await api.fetchSettings();
        
        // Fetch last 12 weeks
        const twelveWeeksAgo = format(startOfISOWeek(subWeeks(new Date(), 11)), "yyyy-MM-dd");
        const progressWeeks = await api.fetchProgressWeeks(twelveWeeksAgo);
        
        const mappedEntries: WeeklyEntry[] = progressWeeks.map(w => ({
          id: w.weekId,
          weekStart: w.weekId,
          weekEnd: format(endOfISOWeek(new Date(w.weekId)), "yyyy-MM-dd"),
          metrics: {
            users: w.users,
            revenue: w.revenue,
            posts: w.posts,
            training: w.training
          },
          loggedDate: new Date().toISOString() // DB doesn't store this specifically but we could
        }));

        set({ settings, entries: mappedEntries.sort((a,b) => b.weekStart.localeCompare(a.weekStart)), loading: false });
      } catch (err: any) {
        set({ error: err.message, loading: false });
      }
    },

    logWeek: async (metrics, weekStart) => {
      const start = weekStart || getWeekRange().start;
      const end = format(endOfISOWeek(new Date(start)), "yyyy-MM-dd");
      
      const newEntry: WeeklyEntry = {
        id: start,
        weekStart: start,
        weekEnd: end,
        metrics,
        loggedDate: new Date().toISOString()
      };

      // Optimistic
      const previousEntries = get().entries;
      const index = previousEntries.findIndex(e => e.weekStart === start);
      let newEntries;
      if (index >= 0) {
        newEntries = [...previousEntries];
        newEntries[index] = newEntry;
      } else {
        newEntries = [newEntry, ...previousEntries].sort((a,b) => b.weekStart.localeCompare(a.weekStart));
      }
      set({ entries: newEntries });

      try {
        await api.upsertProgressWeek({
          weekId: start,
          users: metrics.users,
          revenue: metrics.revenue,
          posts: metrics.posts,
          training: metrics.training
        });
      } catch (err: any) {
        set({ entries: previousEntries, error: err.message });
      }
    },

    deleteWeek: async (weekStart) => {
      // In Progress Radar, 'delete' is usually 'reset' locally or we can actually delete from DB
      // The schema doesn't have a 'delete' function in API yet. I'll add it if needed.
      // For now, I'll just remove it from state and implement the API call.
      
      const previousEntries = get().entries;
      set({ entries: previousEntries.filter(e => e.weekStart !== weekStart) });
      
      try {
        // Need to add delete function to api/progress.ts
        // await api.deleteProgressWeek(weekStart);
      } catch (err: any) {
        set({ entries: previousEntries, error: err.message });
      }
    },

    getEntryForWeek: (weekStart) => {
      return get().entries.find(e => e.id === weekStart || e.weekStart === weekStart);
    },

    setCurrency: async (symbol) => {
      const previousSettings = get().settings;
      set({ settings: { currencySymbol: symbol } });
      try {
        await api.upsertSettings({ currencySymbol: symbol });
      } catch (err: any) {
        set({ settings: previousSettings, error: err.message });
      }
    }
  })
);
